import { Component, EventEmitter, Input, Output, SimpleChanges, ChangeDetectorRef, forwardRef, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormControl, FormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { DropdownChangeEvent } from 'primeng/dropdown';

export interface changeEvent {
    value: string;
    field: string;
}

@Component({
    selector: 'app-roomtype-selector',
    templateUrl: './roomtype-selector.component.html',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => RoomTypeSelectorComponent),
            multi: true
        }
    ]
})
export class RoomTypeSelectorComponent implements OnInit, ControlValueAccessor {
    @Input() parentForm: FormGroup
    @Input() controlName: string
    @Input() showClear: boolean
    @Output() change = new EventEmitter<changeEvent>()
    
    roomTypes: any[] = []           // Available room types
    selectedRoomType: string = ''   // Selected room type
    disabled = false

    constructor(private translate: TranslateService, 
                private cdRef: ChangeDetectorRef) {}

    /**
     * Lifecycle hook: called when the component is initialized.
     * Subscribes to language change events and sets the meals
     * for the selector when the language changes.
     */
    ngOnInit() {
        this.translate.onLangChange.subscribe(() => {
            this.setRoomTypes()
        })
        this.setRoomTypes()
    }

    /**
     * Lifecycle hook: called when any data-bound property of a directive changes.
     * Updates the available meal options when input properties change.
     * @param changes An object of key-value pairs for the changed properties.
     */
    ngOnChanges(changes: SimpleChanges) {
        this.setRoomTypes()
    }

    /**
     * Returns the FormControl object for the accommodation selector.
     * @returns {FormControl} the FormControl object
     */
    getFormControl(): FormControl | null {
        if (!this.parentForm || !this.controlName) {
            return null
        }
        return this.parentForm.get(this.controlName) as FormControl
    }

    /**
     * Sets the available accommodation options for the accommodation selector component.
     * Translates the accommodation labels to the current language and maps them to their respective values.
     */
    setRoomTypes() {
        this.roomTypes = [
            { 
                label: this.translate.instant('ROOMTYPES.NOTHING'), 
                value: 'Nem kérek szállást', 
                color: 'gray' 
            },
            { 
                label: this.translate.instant('ROOMTYPES.CASTLE'), 
                description: this.translate.instant('ROOMTYPES.4-BED-ROOM'), 
                value: 'Kastély szállás 4 ágyas szoba', 
                color: 'teal' 
            },
            { 
                label: this.translate.instant('ROOMTYPES.CASTLE'), 
                description: this.translate.instant('ROOMTYPES.6-BED-ROOM'), 
                value: 'Kastély szállás 6 ágyas szoba', 
                color: 'teal' 
            },
            { 
                label: this.translate.instant('ROOMTYPES.CASTLE'), 
                description: this.translate.instant('ROOMTYPES.8-BED-ROOM'), 
                value: 'Kastély szállás 8 ágyas szoba', 
                color: 'teal' 
            },
            { 
                label: this.translate.instant('ROOMTYPES.MARANATHA-PENSION-HOUSE'), 
                description: this.translate.instant('ROOMTYPES.2-BED-ROOM'), 
                value: 'Maranatha Panzióház 2 ágyas szoba (külön fürdős)', 
                color: 'yellow' 
            },
            { 
                label: this.translate.instant('ROOMTYPES.MARANATHA-PENSION-HOUSE'), 
                description: this.translate.instant('ROOMTYPES.DOUBLE-BED-ROOM'), 
                value: 'Maranatha Panzióház franciaágyas szoba (külön fürdős)', 
                color: 'yellow' 
            },
            { 
                label: this.translate.instant('ROOMTYPES.MARANATHA-PENSION-HOUSE'), 
                description: this.translate.instant('ROOMTYPES.M-4-BED-ROOM'), 
                value: 'Maranatha Panzióház 4 ágyas szoba (emeletes ágyas, külön fürdős)', 
                color: 'yellow' 
            },
            { 
                label: this.translate.instant('ROOMTYPES.FAMILY-ROOM'), 
                description: this.translate.instant('ROOMTYPES.WITH-KITCHEN'), 
                value: 'Családi szoba (közös konyhával, fürdővel és nappalival)', 
                color: 'orange' 
            },
        ]
    }

    /**
     * Handles the change event of the roomtype selector and emits a new value with the
     * changed field name.
     * @param event the change event of the roomtype selector
     */
    handleOnChange(event: DropdownChangeEvent) {
        this.selectedRoomType = event.value
        this.onChange(event.value)
        this.onTouched()
        this.change.emit({ value: event.value, field: this.controlName })
    }

    /**
     * Sets the disabled state of the component.
     * Used by Angular forms to enable/disable the input dynamically.
     * 
     * @param isDisabled - Boolean indicating whether the component should be disabled.
     */
    setDisabledState(isDisabled: boolean): void {
        this.disabled = isDisabled
        this.cdRef.detectChanges()
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
        this.selectedRoomType = value
        this.cdRef.detectChanges()
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