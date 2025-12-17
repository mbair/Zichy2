import { Component, forwardRef, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild, ChangeDetectionStrategy, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Subscription } from 'rxjs';
import { MultiSelect } from 'primeng/multiselect';
import { MessageService } from 'primeng/api';
import { Guest, GuestFilter } from '../../api/guest';
import { GuestService } from '../../service/guest.service';
import * as moment from 'moment';
moment.locale('hu')

export type ChangeSource = 'user' | 'auto-select-first' | 'preselect-id' | 'programmatic';

type GuestGroup = {
    label: string      // group header text
    groupId: number    // internal id
    items: Guest[]     // guests in this group
    explanation?: string // explanation of why these guests are grouped
}

@Component({
    selector: 'app-guest-selector',
    templateUrl: './guest-selector.component.html',
    styleUrls: ['./guest-selector.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => GuestSelectorComponent),
        multi: true
    }]
})
export class GuestSelectorComponent implements OnInit, OnChanges, OnDestroy, ControlValueAccessor {

    // static: false ensures that the ViewChild is dynamically updated when the template changes
    @ViewChild('guestSelector', { static: false })
    private guestSelectorRef?: MultiSelect

    @Input() filter: GuestFilter | null = null      // All Guest filters
    @Input() selectionLimit?: number                // Maximum number of selectable guests (optional)
    @Input() selectFirstOption: boolean = false     // Whether to automatically select the first available option
    @Input() placeholder: string                    // Placeholder text for the dropdown
    @Input() showClear: boolean = true              // Whether to show the clear button
    @Input() style: { [key: string]: string } = {}  // Custom style for the dropdown
    @Input() disabledOptions: Guest[] = []          // List of disabled guest IDs
    @Input() showOnlyNotReserved = false            // List only guest that don't have a reservation
    @Input() groupByRoomMate: boolean = false       // Optional grouping by roomMate chains
    @Input() emitOnSelectFirstOption = false        // only turn it on where you really need it
    @Input() emitOnPreselectId = false
    @Input() emitOnWriteValue = false
    @Input()
    set preselectIds(value: number | string | Array<number | string> | null | undefined) {
        const arr = Array.isArray(value) ? value : (value != null ? [value] : [])
        const nums = arr.map(v => typeof v === 'string' ? Number(v) : v)
            .filter((n): n is number => Number.isFinite(n))
        this._pendingSelectIds = nums.length ? nums : undefined
        this.preselectByIds()    // try to apply immediately if data already loaded
    }

    @Output() change = new EventEmitter<{ value: Guest[]; source: ChangeSource }>()

    loading: boolean = true                 // Loading state indicator
    disabled: boolean = false               // Whether the selector is disabled
    guests: Guest[] = []                    // List of available guest options
    originalGuests: Guest[] = []            // Original list of guest options
    selectedGuests: Guest[] = []            // List of currently selected guests
    groupedGuests: GuestGroup[] = []        // Groups for MultiSelect when grouping is enabled

    // Available room types
    readonly roomTypes: ReadonlyArray<{ value: string; color: string }> = [
        { value: 'Nem kérek szállást', color: 'gray' },
        { value: 'Kastély szállás 4 ágyas szoba', color: 'teal' },
        { value: 'Kastély szállás 6 ágyas szoba', color: 'teal' },
        { value: 'Kastély szállás 8 ágyas szoba', color: 'teal' },
        { value: 'Maranatha Panzióház 2 ágyas szoba (külön fürdős)', color: 'yellow' },
        { value: 'Maranatha Panzióház franciaágyas szoba (külön fürdős)', color: 'yellow' },
        { value: 'Maranatha Panzióház 4 ágyas szoba (emeletes ágyas, külön fürdős)', color: 'yellow' },
        { value: 'Családi szoba (közös konyhával, fürdővel és nappalival)', color: 'orange' },
    ]

    private _pendingSelectIds?: number[]
    private reloadSub?: Subscription
    private subscriptions: Subscription = new Subscription()
    private suppress = 0
    private runSilently<T>(fn: () => T): T { this.suppress++; try { return fn() } finally { this.suppress-- } }

    constructor(private guestService: GuestService,
        private messageService: MessageService,
        private cdr: ChangeDetectorRef
    ) { }

    /**
     * Lifecycle hook: Called when the component is initialized.
     * Fetches the list of guests and selects the first option if required.
     */
    ngOnInit(): void {
        this.reload()
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['filter']) this.reload()
        if (changes['preselectIds']) this.preselectByIds()
    }

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe()
    }

    private reload() {
        this.loading = true

        // Build the effective filter passed to the backend.
        // If showOnlyNotReserved is true, request only guests without reservations for the given conference.
        const effective: GuestFilter = {
            ...(this.filter ?? {}),
            onlyNotReserved: this.showOnlyNotReserved || (this.filter?.onlyNotReserved ?? false)
        }

        // If "only free guests" but no conferenceId, don't ask
        if (effective.onlyNotReserved && !effective.conferenceId) {
            this.guests = []
            this.loading = false
            this.cdr.markForCheck()
            return
        }

        // Assemble includeGuestIds from already selected + preselect IDs
        const selectedIds = (this.selectedGuests ?? [])
            .map(g => this.toNumId((g as any)?.id))
            .filter((n): n is number => n != null)

        const pendingIds = (this._pendingSelectIds ?? []);
        const includeGuestIds = Array.from(new Set([...selectedIds, ...pendingIds]));

        const payload: GuestFilter = {
            ...effective,
            ...(includeGuestIds.length ? { includeGuestIds } : {}),
        }

        this.reloadSub?.unsubscribe()
        this.reloadSub = this.guestService.searchGuestsForSelector$(payload)
            .subscribe({
                next: list => {
                    let plainGuests = (list ?? []).map((g: Guest) => ({
                        ...g,
                        fullName: `${g.lastName ?? ''} ${g.firstName ?? ''}`.trim() // Create fullname
                    }))

                    this.guests = plainGuests

                    // OPTIONAL: smart grouping by roomMate chains
                    if (this.groupByRoomMate) {
                        this.groupedGuests = this.buildRoomMateGroups(plainGuests)
                    } else {
                        this.groupedGuests = []
                    }

                    this.loading = false
                    this.syncSelectedGuests()
                    this.preselectByIds()
                    this.handleSelectFirstOption()
                    this.cdr.markForCheck()
                },
                error: _ => {
                    this.guests = []
                    this.loading = false
                    this.cdr.markForCheck()
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Error',
                        detail: 'Failed to load guests.'
                    })
                }
            })

        this.subscriptions.add(this.reloadSub)
    }

    /**
     * Applies pending preselect IDs once the options list is available.
     * Mirrors the Room selector logic (supports multiple IDs).
     */
    private preselectByIds(): void {
        if (!this.guests?.length || !this._pendingSelectIds?.length) return;

        const idSet = new Set(this._pendingSelectIds); // number[]
        const resolved = this.guests.filter(g => {
            const gid = this.toNumId((g as any)?.id);
            return gid != null && idSet.has(gid);
        });

        // Respect selectionLimit if present
        const limitIsSet = Number.isFinite(this.selectionLimit as number) && (this.selectionLimit as number) > 0;
        const limit = limitIsSet ? (this.selectionLimit as number) : resolved.length;
        const nextSelection = resolved.slice(0, limit);

        this.runSilently(() => {
            this.selectedGuests = nextSelection;
            this.guestSelectorRef?.writeValue(this.selectedGuests);
        });

        // Notify CVA + optional external emit
        this.onChange(this.selectedGuests);
        this.onTouched();
        if (this.emitOnPreselectId) this.emit(this.selectedGuests, 'preselect-id', true);

        this._pendingSelectIds = undefined;
    }

    // Build visible groups from guests based on roomMate chains
    private buildRoomMateGroups(guests: Guest[]): GuestGroup[] {
        interface NodeData {
            id: number;
            name: string;      // normalized full name
            mates: string;     // normalized roomMate text
            guest: Guest;
        }

        const normalize = (raw: string | null | undefined): string =>
            (raw ?? '')
                .normalize('NFD')
                .replace(/[\u0300-\u036f]/g, '')
                .toLowerCase()
                .replace(/\s+/g, ' ')
                .trim();

        const getDisplayName = (g: Guest): string =>
            (`${g.lastName ?? ''} ${g.firstName ?? ''}`.trim()) ||
            ((g as any).fullName ?? '');

        const nodes: NodeData[] = [];

        for (const g of guests) {
            const id = this.toNumId((g as any)?.id);
            if (id == null) {
                continue;
            }
            nodes.push({
                id,
                name: normalize(`${g.lastName ?? ''} ${g.firstName ?? ''}`),
                mates: normalize((g as any).roomMate),
                guest: g
            });
        }

        const graph = new Map<number, Set<number>>();
        const nodesById = new Map<number, NodeData>();
        nodes.forEach(n => nodesById.set(n.id, n));

        const ensureNode = (id: number): Set<number> => {
            let s = graph.get(id);
            if (!s) {
                s = new Set<number>();
                graph.set(id, s);
            }
            return s;
        };

        // Undirected graph: edge if either side mentions the other's name in roomMate
        for (let i = 0; i < nodes.length; i++) {
            const a = nodes[i];
            for (let j = i + 1; j < nodes.length; j++) {
                const b = nodes[j];

                if (!a.name || !b.name) {
                    continue;
                }

                const linked =
                    (!!a.mates && a.mates.includes(b.name)) ||
                    (!!b.mates && b.mates.includes(a.name));

                if (linked) {
                    ensureNode(a.id).add(b.id);
                    ensureNode(b.id).add(a.id);
                }
            }
        }

        const visited = new Set<number>();
        const inComponent = new Set<number>();
        const groups: GuestGroup[] = [];

        const dfs = (startId: number): number[] => {
            const stack = [startId];
            const component: number[] = [];
            visited.add(startId);

            while (stack.length) {
                const id = stack.pop() as number;
                component.push(id);
                const neighbors = graph.get(id);
                if (!neighbors) {
                    continue;
                }
                for (const n of neighbors) {
                    if (!visited.has(n)) {
                        visited.add(n);
                        stack.push(n);
                    }
                }
            }

            component.forEach(id => inComponent.add(id));
            return component;
        };

        // Components with edges (graph nodes)
        for (const id of graph.keys()) {
            if (visited.has(id)) {
                continue;
            }
            const comp = dfs(id);
            if (comp.length >= 2) {
                const compNodes = comp
                    .map(cid => nodesById.get(cid))
                    .filter((n): n is NodeData => !!n);

                // Find "leader" whose name appears most often in others' roomMate text
                let leader: NodeData | undefined;
                let bestScore = -1;

                for (const nd of compNodes) {
                    let score = 0;
                    for (const other of compNodes) {
                        if (other.id === nd.id) {
                            continue;
                        }
                        if (other.mates && other.mates.includes(nd.name)) {
                            score++;
                        }
                    }
                    if (
                        score > bestScore ||
                        (score === bestScore && leader && nd.id < leader.id)
                    ) {
                        bestScore = score;
                        leader = nd;
                    }
                }

                const leaderName = leader
                    ? getDisplayName(leader.guest)
                    : getDisplayName(compNodes[0].guest);

                const items = compNodes
                    .map(n => n.guest)
                    .sort((g1, g2) =>
                        normalize(getDisplayName(g1))
                            .localeCompare(normalize(getDisplayName(g2)))
                    );

                // Generate explanation
                const reasons: string[] = [];
                for (const node of compNodes) {
                    const rawMates = (node.guest as any).roomMate;
                    if (rawMates && typeof rawMates === 'string' && rawMates.trim().length > 0) {
                        const name = getDisplayName(node.guest);
                        reasons.push(`${name}: "${rawMates.trim()}"`);
                    }
                }
                const explanation = reasons.length > 0
                    ? reasons.join('\n')
                    : 'Közvetett kapcsolat révén';

                groups.push({
                    groupId: groups.length,
                    label: leaderName ? `${leaderName} csoport` : 'Szobatárs csoport',
                    items,
                    explanation
                });
            }
        }

        // Singles: everyone not in a multi-person component
        const singles: Guest[] = [];

        nodes.forEach(n => {
            if (!inComponent.has(n.id)) {
                singles.push(n.guest);
            }
        });

        if (singles.length) {
            singles.sort((g1, g2) =>
                normalize(getDisplayName(g1))
                    .localeCompare(normalize(getDisplayName(g2)))
            );
            groups.push({
                groupId: groups.length,
                label: 'Nincs megadott szobatárs / egyedül lakna',
                items: singles
            });
        }

        // Sort groups: bigger first, then label
        groups.sort((a, b) => {
            const diff = b.items.length - a.items.length;
            if (diff !== 0) {
                return diff;
            }
            return a.label.localeCompare(b.label);
        });

        return groups;
    }

    private getGroupIds(group: GuestGroup): number[] {
        return (group.items ?? [])
            .map(g => this.toNumId((g as any)?.id))
            .filter((id): id is number => id != null)
    }

    isGroupFullySelected(group: GuestGroup): boolean {
        const groupIds = this.getGroupIds(group)
        if (!groupIds.length || !this.selectedGuests?.length) {
            return false
        }
        const selectedIds = new Set(
            (this.selectedGuests ?? [])
                .map(g => this.toNumId((g as any)?.id))
                .filter((id): id is number => id != null)
        )
        return groupIds.every(id => selectedIds.has(id))
    }

    isGroupPartiallySelected(group: GuestGroup): boolean {
        const groupIds = this.getGroupIds(group)
        if (!groupIds.length || !this.selectedGuests?.length) {
            return false
        }
        const selectedIds = new Set(
            (this.selectedGuests ?? [])
                .map(g => this.toNumId((g as any)?.id))
                .filter((id): id is number => id != null)
        )
        const selectedCount = groupIds.filter(id => selectedIds.has(id)).length
        return selectedCount > 0 && selectedCount < groupIds.length
    }

    // Click on group header: toggle all guests in that group
    toggleGroupSelection(group: GuestGroup, event?: MouseEvent): void {
        if (event) {
            event.stopPropagation();
            event.preventDefault();
        }

        const groupItems = group.items ?? [];

        const current = this.selectedGuests ?? [];
        const selectedIds = new Set(
            current
                .map(g => this.toNumId((g as any)?.id))
                .filter((id): id is number => id != null)
        );
        const groupIds = this.getGroupIds(group);

        const allSelected = groupIds.length > 0 && groupIds.every(id => selectedIds.has(id));

        let next = current.slice();

        if (allSelected) {
            // Remove all guests from this group
            next = next.filter(g => {
                const id = this.toNumId((g as any)?.id);
                return id == null || !groupIds.includes(id);
            });
        } else {
            // Add all missing guests from this group
            for (const g of groupItems) {
                const id = this.toNumId((g as any)?.id);
                if (id != null && !selectedIds.has(id)) {
                    next.push(g);
                }
            }

            // Respect selectionLimit if present
            const hasLimit = Number.isFinite(this.selectionLimit as number) && (this.selectionLimit as number) > 0;
            const limit = hasLimit ? (this.selectionLimit as number) : next.length;
            if (next.length > limit) {
                next = next.slice(0, limit);
            }
        }

        this.runSilently(() => {
            this.selectedGuests = next;
            this.guestSelectorRef?.writeValue(this.selectedGuests);
        });

        this.emit(this.selectedGuests, 'user', true);
        this.cdr.markForCheck();
    }

    // Opcionális publikus setter programozott beállításhoz:
    public setSelection(value: Guest[], opts?: { emit?: boolean; source?: ChangeSource }) {
        const source = opts?.source ?? 'programmatic'
        this.runSilently(() => { this.selectedGuests = value?.slice(0, this.selectionLimit ?? value.length) ?? [] })
        if (opts?.emit) this.emit(this.selectedGuests, source, true)
    }

    /**
     * Selects the first available guest if the `selectFirstOption` flag is enabled.
     * This ensures that the component has an initial selection when loaded.
     */
    private handleSelectFirstOption(): void {
        if (this.selectFirstOption && this.selectedGuests.length === 0 && this.guests.length) {
            this.runSilently(() => {
                this.selectedGuests = this.guests.slice(0, this.selectionLimit ?? 1)
            })
            // if you specifically want this to trigger filtering:
            if (this.emitOnSelectFirstOption) this.emit(this.selectedGuests, 'auto-select-first', /*force*/ true);
        }
    }

    /**
     * Sets the disabled state of the component.
     * Used by Angular forms to enable/disable the input dynamically.
     * 
     * @param isDisabled - Boolean indicating whether the component should be disabled.
     */
    setDisabledState?(isDisabled: boolean): void {
        this.disabled = isDisabled
        if (this.guestSelectorRef) this.guestSelectorRef.disabled = isDisabled
    }

    /**
     * Synchronizes the selected guests with the available options.
     * Ensures that the selected values remain valid if the list of guests updates.
     */
    private syncSelectedGuests(): void {
        this.selectedGuests = this.guests.filter(opt => {
            const optId = this.toNumId((opt as any)?.id);
            if (optId == null) return false;
            return this.selectedGuests.some(sel => this.toNumId((sel as any)?.id) === optId);
        });
        this.onChange(this.selectedGuests);
    }

    /**
     * Handles the event when the selection changes.
     * Updates the selected guests and notifies the parent component.
     * 
     * @param event - The selection change event containing the selected values.
     */
    onSelectionChange(event: any): void {
        this.selectedGuests = event.value
        this.emit(this.selectedGuests, 'user')

        // Auto-close if max 1 can be selected and there is already a selection
        if (this.selectionLimit == 1 && this.selectedGuests?.length >= 1) {
            // small delay to let MultiSelect update its own state first
            setTimeout(() => this.guestSelectorRef?.hide())
        }
    }

    /**
     * Handles the clear selection event.
     * Resets the selected guests and notifies the parent component.
     */
    onSelectionClear(): void {
        this.runSilently(() => {
            this.selectedGuests = []
            this.guestSelectorRef?.writeValue([])
        });
        this.emit(this.selectedGuests, 'user', true)
    }

    private emit(value: Guest[], source: ChangeSource, force = false) {
        if (this.suppress && !force) return   // during mute we only allow it in case of force
        this.onChange(value); this.onTouched()
        this.change.emit({ value, source })
    }

    private toNumId(v: unknown): number | null {
        if (typeof v === 'number' && Number.isFinite(v)) return v
        if (typeof v === 'string' && v.trim() !== '' && Number.isFinite(+v)) return +v
        return null
    }

    getAge(birthDate: string): string {
        if (!birthDate) return ""
        const birth = moment(birthDate)
        const today = moment()
        return today.diff(birth, 'years').toString()
    }

    private roomTypeColorMap = new Map<string, string>(
        this.roomTypes.map(rt => [rt.value.toLowerCase(), rt.color])
    )

    getColorByRoomType(roomType: string): string {
        if (!roomType) return ''
        return this.roomTypeColorMap.get(roomType.trim().toLowerCase()) ?? ''
    }

    // Remove a single guest from selection (works with OnPush because we replace the array reference)
    removeGuest(guest: Guest): void {
        const next = (this.selectedGuests ?? []).filter(g => g.id !== guest.id)
        this.selectedGuests = next;
        // If this component is a ControlValueAccessor, notify the form as well:
        if (typeof this.onChange === 'function') {
            this.onChange(this.selectedGuests)
        }
    }

    // Optional: clear all selected guests
    clearAllGuests(): void {
        this.selectedGuests = [];
        if (typeof this.onChange === 'function') {
            this.onChange(this.selectedGuests)
        }
    }

    // TrackBy for better performance
    trackByGuestId(_index: number, g: Guest): number {
        return g.id
    }


    // ===========================
    // ControlValueAccessor Methods
    // ===========================

    /**
     * Writes the value from the parent form into the component.
     * Used when the form initializes or updates externally.
     * 
     * @param value - The selected guests coming from the form.
     */
    writeValue(value: Guest[] | Guest | null | undefined): void {
        // Normalize to array first
        const arr: Guest[] = Array.isArray(value) ? value : (value ? [value] : [])

        // When selectionLimit is undefined/null/NaN/<=0, treat as "no limit"
        const hasLimit = Number.isFinite(this.selectionLimit as number) && (this.selectionLimit as number) > 0
        const limit = hasLimit ? (this.selectionLimit as number) : arr.length

        this.runSilently(() => {
            this.selectedGuests = arr.slice(0, limit)
            this.guestSelectorRef?.writeValue(this.selectedGuests)
        })

        if (this.emitOnWriteValue) {
            this.emit(this.selectedGuests, 'programmatic', true)
        }
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
