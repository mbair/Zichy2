import { Component, forwardRef, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Subscription } from 'rxjs';
import { MultiSelect } from 'primeng/multiselect';
import { MessageService } from 'primeng/api';
import { Room } from '../../api/room';
import { RoomService } from '../../service/room.service';

export type ChangeSource = 'user' | 'auto-select-first' | 'preselect-id' | 'programmatic';

export type RoomFilter = {
    conferenceId?: number | null;
    building?: string | string[];
    minBeds?: number;
    climate?: boolean;   
    enabled?: boolean;
    // (optionel) startDate?: string; endDate?: string; onlyFree?: boolean;
}

@Component({
    selector: 'app-room-selector',
    templateUrl: './room-selector.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => RoomSelectorComponent),
        multi: true
    }]
})
export class RoomSelectorComponent implements OnInit, OnChanges, OnDestroy, ControlValueAccessor {

    // static: false ensures that the ViewChild is dynamically updated when the template changes
    @ViewChild('roomSelector', { static: false })
    private readonly roomSelectorRef: MultiSelect

    @Input() filter: RoomFilter | null = null       // All Room filters
    @Input() selectionLimit?: number                // Maximum number of selectable rooms (optional)
    @Input() selectFirstOption: boolean = false     // Whether to automatically select the first available option
    @Input() placeholder: string                    // Placeholder text for the dropdown
    @Input() showClear: boolean = true              // Whether to show the clear button
    @Input() style: { [key: string]: string } = {}  // Custom style for the dropdown
    @Input() disabledOptions: Room[] = []           // List of disabled room IDs
    @Input() emitOnSelectFirstOption = false        // only turn it on where you really need it
    @Input() emitOnPreselectId = false
    @Input() emitOnWriteValue = false
    @Input()
    set preselectRoomId(value: number | undefined) {
        this._pendingSelectId = value
        this.tryPreselectById()                      // Select predefined room by Id
    }

    @Output() change = new EventEmitter<{ value: Room[]; source: ChangeSource }>()

    loading: boolean = true                          // Loading state indicator
    disabled: boolean = false                        // Whether the selector is disabled
    rooms: Room[] = []                               // List of available room options
    originalRooms: Room[] = []                       // Original list of room options
    selectedRooms: Room[] = []                       // List of currently selected rooms

    private _pendingSelectId?: number
    private subscriptions: Subscription = new Subscription()
    private suppress = 0
    private runSilently<T>(fn: () => T): T { this.suppress++; try { return fn() } finally { this.suppress-- } }

    constructor(private roomService: RoomService,
        private messageService: MessageService
    ) { }

    /**
     * Lifecycle hook: Called when the component is initialized.
     * Fetches the list of rooms and selects the first option if required.
     */
    ngOnInit(): void {
        this.reload()
    }

    ngOnChanges(changes: SimpleChanges): void {
        this.reload()
    }

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe()
    }

    private reload() {
        this.loading = true;
        this.roomService.searchRoomsForSelector$(this.filter ?? {})
            .subscribe({
                next: list => { 
                    this.rooms = list ?? []
                    this.loading = false
                },
                error: _ => { 
                    this.rooms = []
                    this.loading = false
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Error',
                        detail: 'Failed to load rooms.'
                    })
                }
            });
    }

    // Opcionális publikus setter programozott beállításhoz:
    public setSelection(value: Room[], opts?: { emit?: boolean; source?: ChangeSource }) {
        const source = opts?.source ?? 'programmatic'
        this.runSilently(() => { this.selectedRooms = value?.slice(0, this.selectionLimit ?? value.length) ?? [] })
        if (opts?.emit) this.emit(this.selectedRooms, source, true)
    }

    /**
     * Selects the first available room if the `selectFirstOption` flag is enabled.
     * This ensures that the component has an initial selection when loaded.
     */
    private handleSelectFirstOption(): void {
        if (this.selectFirstOption && this.selectedRooms.length === 0 && this.rooms.length) {
            this.runSilently(() => {
                this.selectedRooms = this.rooms.slice(0, this.selectionLimit ?? 1);
            })
            // ha kifejezetten szeretnéd, hogy ez indítson szűrést:
            if (this.emitOnSelectFirstOption) this.emit(this.selectedRooms, 'auto-select-first', /*force*/ true);
        }
    }

    /**
     * Applies any pending preselection once the options list is available.
     *
     * Finds the room matching `_pendingSelectId` in `rooms` and updates
     * `selectedRooms` accordingly (single-item array or empty). Idempotent:
     * safe to call multiple times, even with the same ID.
     *
     * Side effects:
     * - Invokes ControlValueAccessor hooks (`onChange`, `onTouched`) to sync the parent form.
     *
     * Notes:
     * - Selection is ID-based (use `dataKey="id"` on the MultiSelect), not by object reference.
     */
    private tryPreselectById(): void {
        if (!this.rooms?.length || this._pendingSelectId == null) return
        const c = this.rooms.find(x => x.id === this._pendingSelectId)
        this.runSilently(() => { this.selectedRooms = c ? [c] : [] })
        if (this.emitOnPreselectId) this.emit(this.selectedRooms, 'preselect-id', true)
    }

    /**
     * Sets the disabled state of the component.
     * Used by Angular forms to enable/disable the input dynamically.
     * 
     * @param isDisabled - Boolean indicating whether the component should be disabled.
     */
    setDisabledState?(isDisabled: boolean): void {
        this.disabled = isDisabled
    }

    /**
     * Synchronizes the selected rooms with the available options.
     * Ensures that the selected values remain valid if the list of rooms updates.
     */
    private syncSelectedRooms(): void {
        this.selectedRooms = this.rooms.filter(conf =>
            this.selectedRooms.some(sel => sel.id === conf.id)
        )
        this.onChange(this.selectedRooms)
    }

    /**
     * Handles the event when the selection changes.
     * Updates the selected rooms and notifies the parent component.
     * 
     * @param event - The selection change event containing the selected values.
     */
    onSelectionChange(event: any): void {
        this.selectedRooms = event.value
        this.emit(this.selectedRooms, 'user')

        // Auto-close if max 1 can be selected and there is already a selection
        if ((this.selectionLimit ?? 1) === 1 && this.selectedRooms?.length >= 1) {
            // small delay to let MultiSelect update its own state first
            setTimeout(() => this.roomSelectorRef?.hide())
        }
    }

    /**
     * Handles the clear selection event.
     * Resets the selected rooms and notifies the parent component.
     */
    onSelectionClear(): void {
        this.selectedRooms = []
        this.onChange(this.selectedRooms)
        this.onTouched()
    }

    private emit(value: Room[], source: ChangeSource, force = false) {
        if (this.suppress && !force) return   // during mute we only allow it in case of force
        this.onChange(value); this.onTouched()
        this.change.emit({ value, source })
    }

    // ===========================
    // ControlValueAccessor Methods
    // ===========================

    /**
     * Writes the value from the parent form into the component.
     * Used when the form initializes or updates externally.
     * 
     * @param value - The selected rooms coming from the form.
     */
    writeValue(value: Room[]): void {
        this.runSilently(() => {
            this.selectedRooms = value?.slice(0, this.selectionLimit ?? value.length) ?? []
        })
        if (this.emitOnWriteValue) this.emit(this.selectedRooms, 'programmatic', true)
    }

    /**
     * Registers a callback function that is called when the value changes.
     * This is part of the ControlValueAccessor implementation.
     * 
     * @param fn - The callback function to be triggered on value change.
     */
    registerOnChange(fn: any): void {
        this.onChange = fn
    }

    /**
     * Registers a callback function that is called when the input is touched.
     * This is part of the ControlValueAccessor implementation.
     * 
     * @param fn - The callback function to be triggered on input touch.
     */
    registerOnTouched(fn: any): void {
        this.onTouched = fn
    }

    /**
     * Callback function to handle value changes from the parent form.
     * Initially set as an empty function, but will be assigned dynamically.
     */
    onChange = (_: any) => { }

    /**
     * Callback function to handle when the input is touched.
     * Initially set as an empty function, but will be assigned dynamically.
     */
    onTouched = () => { }
}
