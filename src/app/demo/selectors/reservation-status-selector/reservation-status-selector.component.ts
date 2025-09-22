import { Component, EventEmitter, Input, Output, SimpleChanges, ChangeDetectorRef, forwardRef, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormControl, FormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { DropdownChangeEvent } from 'primeng/dropdown';

export interface changeEvent {
    value: string;
    field: string;
}

@Component({
    selector: 'app-reservation-status-selector',
    templateUrl: './reservation-status-selector.component.html',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => ReservationStatusSelectorComponent),
            multi: true
        }
    ]
})
export class ReservationStatusSelectorComponent implements OnInit, ControlValueAccessor {
    @Input() parentForm: FormGroup
    @Input() controlName: string
    @Input() placeholder: string
    @Input() showClear: boolean
    @Output() change = new EventEmitter<changeEvent>()
    
    statuses: any[] = []            // Available statuses
    selectedStatus: string = ''     // Selected status
    disabled = false

    constructor(private translate: TranslateService, 
                private cdRef: ChangeDetectorRef) {
        
        if (!this.placeholder) {
            this.placeholder = 'Válasszon...'
        }
    }

    /**
     * Lifecycle hook: called when the component is initialized.
     * Subscribes to language change events and sets the reservation statuses
     * for the selector when the language changes.
     */
    ngOnInit() {
        this.translate.onLangChange.subscribe(() => {
            this.setReservationStatuses()
        })
        this.setReservationStatuses()
    }

    /**
     * Lifecycle hook: called when any data-bound property of a directive changes.
     * Updates the available floor options when input properties change.
     * @param changes An object of key-value pairs for the changed properties.
     */
    ngOnChanges(changes: SimpleChanges) {
        this.setReservationStatuses()
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
     * Sets the available reservation status options for the reservation status selector component.
     * Translates the accommodation labels to the current language and maps them to their respective values.
     */
    setReservationStatuses() {
        this.statuses = [
            { label: this.translate.instant('RESERVATION_STATUSES.TENTATIVE'), value: 'feltételes', color: 'indigo' },
            { label: this.translate.instant('RESERVATION_STATUSES.CONFIRMED'), value: 'visszaigazolva', color: 'blue' },
            { label: this.translate.instant('RESERVATION_STATUSES.IN_HOUSE'), value: 'házon belül', color: 'cyan' },
            { label: this.translate.instant('RESERVATION_STATUSES.CHECKED_OUT'), value: 'kijelentkezett', color: 'green' },
            { label: this.translate.instant('RESERVATION_STATUSES.CANCELLED'), value: 'törölve', color: 'red' },
        ]
    }

    /**
     * Handles the change event of the reservation status selector and emits a new value with the
     * changed field name.
     * @param event the change event of the reservation status selector
     */
    handleOnChange(event: DropdownChangeEvent) {
        this.selectedStatus = event.value
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
        this.selectedStatus = value
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