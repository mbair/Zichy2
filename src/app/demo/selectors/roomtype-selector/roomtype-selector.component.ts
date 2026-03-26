import { CommonModule } from '@angular/common';
import {
    AfterViewChecked,
    Component,
    EventEmitter,
    Input,
    Output,
    SimpleChanges,
    ChangeDetectorRef,
    ViewChild,
    forwardRef,
    OnInit,
} from '@angular/core';
import {
    ControlValueAccessor,
    NG_VALUE_ACCESSOR,
    FormControl,
    FormGroup,
    FormsModule,
    ReactiveFormsModule,
} from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Dropdown, DropdownChangeEvent, DropdownModule } from 'primeng/dropdown';
import { MultiSelect, MultiSelectChangeEvent, MultiSelectModule } from 'primeng/multiselect';
import {
    BackendRoomType,
    getRoomTypeOptions,
    mapLegacyRoomTypeIdToBackendId,
    mapBackendRoomTypeToOption,
    RoomTypeOption,
} from '../../utils/room-type.utils';
import { ApiService } from '../../service/api.service';

export interface changeEvent {
    value: any;
    field: string;
}

@Component({
    selector: 'app-roomtype-selector',
    templateUrl: './roomtype-selector.component.html',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        TranslateModule,
        DropdownModule,
        MultiSelectModule,
    ],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => RoomTypeSelectorComponent),
            multi: true,
        },
    ],
})
export class RoomTypeSelectorComponent
    implements OnInit, AfterViewChecked, ControlValueAccessor
{
    @Input() parentForm: FormGroup;
    @Input() controlName: string;
    @Input() showClear: boolean;
    @Input() optionValue: 'value' | 'id' = 'value';
    @Input() multiple = false;
    @Input() includeNoAccommodation: boolean = true;
    @Input() allowedRoomTypeIds: number[] | null | undefined = undefined;
    @Output() change = new EventEmitter<changeEvent>();
    @ViewChild(Dropdown) private dropdown?: Dropdown;
    @ViewChild(MultiSelect) private multiSelect?: MultiSelect;

    roomTypes: RoomTypeOption[] = []; // Available room types
    selectedRoomType: any = null; // Selected room type
    disabled = false;
    lastWrittenValue: any = null;
    private backendRoomTypes: BackendRoomType[] | null = null;
    private backendRoomTypesLoading = false;

    constructor(
        private translate: TranslateService,
        private cdRef: ChangeDetectorRef,
        private apiService: ApiService,
    ) {}

    /**
     * Lifecycle hook: called when the component is initialized.
     * Subscribes to language change events and sets the meals
     * for the selector when the language changes.
     */
    ngOnInit() {
        this.translate.onLangChange.subscribe(() => {
            this.setRoomTypes();
        });
        this.setRoomTypes();
        this.syncControlValueWithModeAndAllowed();
    }

    ngAfterViewChecked(): void {
        this.syncValueFromWidget();
    }

    /**
     * Lifecycle hook: called when any data-bound property of a directive changes.
     * Updates the available meal options when input properties change.
     * @param changes An object of key-value pairs for the changed properties.
     */
    ngOnChanges(changes: SimpleChanges) {
        this.setRoomTypes();
        if (this.multiple && !Array.isArray(this.selectedRoomType)) {
            this.selectedRoomType =
                this.selectedRoomType == null ? [] : [this.selectedRoomType];
        }
        if (!this.multiple && Array.isArray(this.selectedRoomType)) {
            this.selectedRoomType =
                this.selectedRoomType.length > 0
                    ? this.selectedRoomType[0]
                    : null;
        }
        this.syncControlValueWithModeAndAllowed();
    }

    /**
     * Returns the FormControl object for the accommodation selector.
     * @returns {FormControl} the FormControl object
     */
    getFormControl(): FormControl | null {
        if (!this.parentForm || !this.controlName) {
            return null;
        }
        return this.parentForm.get(this.controlName) as FormControl;
    }

    /**
     * Sets the available accommodation options for the accommodation selector component.
     * Translates the accommodation labels to the current language and maps them to their respective values.
     */
    private buildAllowedOptionValuesSet(): Set<number | string> | null {
        if (
            this.allowedRoomTypeIds === undefined ||
            this.allowedRoomTypeIds === null
        ) {
            return null;
        }

        if (this.optionValue === 'id') {
            return new Set(
                this.allowedRoomTypeIds
                    .map((roomTypeId) =>
                        this.normalizeIncomingOptionValue(roomTypeId),
                    )
                    .filter(
                        (value): value is number | string => value !== null,
                    ),
            );
        }

        return new Set(
            this.roomTypes.map((roomType) => this.getOptionValue(roomType)),
        );
    }

    private getOptionValue(roomType: RoomTypeOption): number | string {
        return this.optionValue === 'id' ? roomType.id : roomType.value;
    }

    private normalizeIncomingOptionValue(value: any): number | string | null {
        if (value == null || value === '') {
            return null;
        }

        if (this.optionValue !== 'id') {
            return value;
        }

        const mappedId = mapLegacyRoomTypeIdToBackendId(
            value,
            this.backendRoomTypes,
        );
        if (mappedId !== null) {
            return mappedId;
        }

        const numericValue = Number(value);
        return Number.isFinite(numericValue) ? numericValue : null;
    }

    private normalizeToSelectorValue(
        raw: any,
    ): number | string | Array<number | string> | null {
        const allowedValues = this.buildAllowedOptionValuesSet();

        if (this.multiple) {
            const values = Array.isArray(raw) ? raw : raw == null ? [] : [raw];
            const normalized = values
                .map((value) => this.normalizeIncomingOptionValue(value))
                .filter(
                    (value): value is number | string =>
                        value !== null &&
                        (allowedValues ? allowedValues.has(value) : true),
                );
            return Array.from(new Set(normalized));
        }

        const normalized = this.normalizeIncomingOptionValue(raw);
        if (normalized == null) {
            return null;
        }

        if (allowedValues && !allowedValues.has(normalized)) {
            return null;
        }

        return normalized;
    }

    private syncControlValueWithModeAndAllowed(): void {
        const control = this.getFormControl();
        if (!control) {
            this.selectedRoomType = this.normalizeToSelectorValue(
                this.lastWrittenValue,
            );
            return;
        }

        const source = this.lastWrittenValue ?? control.value;
        const normalized = this.normalizeToSelectorValue(source);
        this.applySelection(normalized, false, false);
    }

    setRoomTypes() {
        if (this.optionValue === 'id') {
            this.setBackendRoomTypes();
            return;
        }

        const allRoomTypes = getRoomTypeOptions(this.translate);
        const visibleRoomTypes = this.includeNoAccommodation
            ? allRoomTypes
            : allRoomTypes.filter((roomType) => roomType.id !== 0);

        if (Array.isArray(this.allowedRoomTypeIds)) {
            const allowed = new Set(
                this.allowedRoomTypeIds
                    .map((id) => Number(id))
                    .filter((id) => Number.isFinite(id)),
            );

            this.roomTypes = visibleRoomTypes.filter(
                (roomType) =>
                    (this.includeNoAccommodation && roomType.id === 0) ||
                    allowed.has(roomType.id),
            );
        } else {
            this.roomTypes = visibleRoomTypes;
        }
    }

    private getLegacyFallbackRoomTypes(): RoomTypeOption[] {
        const allRoomTypes = getRoomTypeOptions(this.translate);
        const visibleRoomTypes = this.includeNoAccommodation
            ? allRoomTypes
            : allRoomTypes.filter((roomType) => roomType.id !== 0);

        return this.filterBackendRoomTypes(visibleRoomTypes);
    }

    private setBackendRoomTypes(): void {
        if (this.backendRoomTypes) {
            const options = this.backendRoomTypes
                .map((roomType) =>
                    mapBackendRoomTypeToOption(roomType, this.translate),
                )
                .filter((option): option is RoomTypeOption => option !== null);

            this.roomTypes =
                options.length > 0
                    ? this.filterBackendRoomTypes(options)
                    : this.getLegacyFallbackRoomTypes();
            this.syncControlValueWithModeAndAllowed();
            return;
        }

        if (this.backendRoomTypesLoading) {
            return;
        }

        this.backendRoomTypesLoading = true;
        this.apiService
            .get<{ rows?: BackendRoomType[] }>('roomtype/get/0/1000', {
                params: { sort: 'id', order: 'ASC' },
            })
            .subscribe({
                next: (response) => {
                    const rows = response?.rows ?? [];
                    const options = rows
                        .map((roomType) =>
                            mapBackendRoomTypeToOption(roomType, this.translate),
                        )
                        .filter((option): option is RoomTypeOption => option !== null);

                    this.backendRoomTypes = rows.length > 0 ? rows : null;
                    this.roomTypes =
                        options.length > 0
                            ? this.filterBackendRoomTypes(options)
                            : this.getLegacyFallbackRoomTypes();
                    this.backendRoomTypesLoading = false;
                    this.syncControlValueWithModeAndAllowed();
                    this.cdRef.detectChanges();
                },
                error: () => {
                    this.backendRoomTypesLoading = false;
                    this.backendRoomTypes = null;
                    this.roomTypes = this.getLegacyFallbackRoomTypes();
                    this.syncControlValueWithModeAndAllowed();
                    this.cdRef.detectChanges();
                },
            });
    }

    private filterBackendRoomTypes(options: RoomTypeOption[]): RoomTypeOption[] {
        if (!Array.isArray(this.allowedRoomTypeIds)) {
            return options;
        }

        const allowed = new Set(
            this.allowedRoomTypeIds
                .map((id) => Number(id))
                .filter((id) => Number.isFinite(id)),
        );

        const filtered = options.filter((roomType) =>
            allowed.has(roomType.id),
        );

        // Conference editor fallback: legacy room-bound IDs may be stale or invalid,
        // but we still want the operator to be able to pick a valid room type.
        return filtered.length > 0 ? filtered : options;
    }

    /**
     * Handles the change event of the roomtype selector and emits a new value with the
     * changed field name.
     * @param event the change event of the roomtype selector
     */
    handleOnChange(event: DropdownChangeEvent | MultiSelectChangeEvent) {
        const normalized = this.normalizeToSelectorValue((event as any).value);
        this.applySelection(normalized);
        this.change.emit({ value: normalized, field: this.controlName });
    }

    /**
     * Sets the disabled state of the component.
     * Used by Angular forms to enable/disable the input dynamically.
     *
     * @param isDisabled - Boolean indicating whether the component should be disabled.
     */
    setDisabledState(isDisabled: boolean): void {
        this.disabled = isDisabled;
        this.cdRef.detectChanges();
    }

    // ===========================
    // ControlValueAccessor Methods
    // ===========================

    /**
     * Writes the value from the parent form into the component.
     * Used when the form initializes or updates externally.
     *
     * @param value - The selected conferences coming from the form.
     */
    writeValue(value: any): void {
        this.lastWrittenValue = value;
        this.applySelection(this.normalizeToSelectorValue(value), false, false);
        this.cdRef.detectChanges();
    }

    /**
     * Registers a callback function that is called when the value changes.
     * This is part of the ControlValueAccessor implementation.
     *
     * @param fn - The callback function to be triggered on value change.
     */
    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    /**
     * Registers a callback function that is called when the input is touched.
     * This is part of the ControlValueAccessor implementation.
     *
     * @param fn - The callback function to be triggered on input touch.
     */
    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    /**
     * Callback function to handle value changes from the parent form.
     * Initially set as an empty function, but will be assigned dynamically.
     */
    onChange = (_: any) => {};

    /**
     * Callback function to handle when the input is touched.
     * Initially set as an empty function, but will be assigned dynamically.
     */
    onTouched = () => {};

    private syncValueFromWidget(): void {
        const widgetValue = this.readWidgetValue();
        if (widgetValue === undefined) {
            return;
        }

        const normalizedWidgetValue = this.normalizeToSelectorValue(widgetValue);
        if (this.isSameSelection(normalizedWidgetValue, this.selectedRoomType)) {
            return;
        }

        this.applySelection(normalizedWidgetValue, false);
    }

    private readWidgetValue():
        | number
        | string
        | Array<number | string>
        | null
        | undefined {
        if (this.multiple) {
            return this.multiSelect?.value;
        }

        return this.dropdown?.value;
    }

    private applySelection(
        value: number | string | Array<number | string> | null,
        emitTouch = true,
        emitCva = true,
    ): void {
        const normalized = this.normalizeToSelectorValue(value);
        const control = this.getFormControl();
        const currentControlValue = control?.value ?? null;

        if (!this.isSameSelection(this.selectedRoomType, normalized)) {
            this.selectedRoomType = normalized;
        }

        if (control && !this.isSameSelection(currentControlValue, normalized)) {
            control.setValue(normalized, { emitEvent: false });
        }

        this.lastWrittenValue = normalized;

        if (emitCva) {
            this.onChange(normalized);
        }

        if (emitTouch) {
            this.onTouched();
        }
    }

    private isSameSelection(a: any, b: any): boolean {
        return JSON.stringify(a) === JSON.stringify(b);
    }

    getSelectedOptions(
        values: Array<number | string> | null | undefined,
    ): RoomTypeOption[] {
        const selectedValues = new Set(Array.isArray(values) ? values : []);
        return this.roomTypes.filter((roomType) =>
            selectedValues.has(this.getOptionValue(roomType)),
        );
    }
}
