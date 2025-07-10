import { Component, EventEmitter, Input, Output, SimpleChanges, ChangeDetectorRef, forwardRef, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormControl, FormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { DropdownChangeEvent } from 'primeng/dropdown';

export interface changeEvent {
    value: string;
    field: string;
}

@Component({
    selector: 'app-building-selector',
    templateUrl: './building-selector.component.html',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => BuildingSelectorComponent),
            multi: true
        }
    ]
})
export class BuildingSelectorComponent implements OnInit, ControlValueAccessor {
    @Input() parentForm: FormGroup
    @Input() controlName: string
    @Input() placeholder: string
    @Input() showClear: boolean
    @Output() change = new EventEmitter<changeEvent>()
    
    buildings: any[] = []            // Available buildings
    selectedBuilding: string = ''    // Selected building
    disabled = false

    constructor(private translate: TranslateService, 
                private cdRef: ChangeDetectorRef) {
        
        if (!this.placeholder) {
            this.placeholder = 'Válasszon...'
        }
    }

    /**
     * Lifecycle hook: called when the component is initialized.
     * Subscribes to language change events and sets the buildings
     * for the selector when the language changes.
     */
    ngOnInit() {
        this.translate.onLangChange.subscribe(() => {
            this.setBuildings()
        })
        this.setBuildings()
    }

    /**
     * Lifecycle hook: called when any data-bound property of a directive changes.
     * Updates the available building options when input properties change.
     * @param changes An object of key-value pairs for the changed properties.
     */
    ngOnChanges(changes: SimpleChanges) {
        this.setBuildings()
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
    setBuildings() {
        this.buildings = [
            { label: this.translate.instant('BUILDINGS.CASTLE'), value: 'castle' },
            { label: this.translate.instant('BUILDINGS.MARANATHA'), value: 'maranatha' },
            { label: this.translate.instant('BUILDINGS.CORNERHOUSE'), value: 'cornerhouse' },
            { label: this.translate.instant('BUILDINGS.LOGOSHOUSE'), value: 'logoshouse' },
            { label: this.translate.instant('BUILDINGS.GATEHOUSE'), value: 'gatehouse' },
            { label: this.translate.instant('BUILDINGS.CARETAKERHOUSE'), value: 'caretakerhouse' },
            { label: this.translate.instant('BUILDINGS.HUNTINGLODGE'), value: 'huntinglodge' },
        ]
    }

    /**
     * Handles the change event of the building selector and emits a new value with the
     * changed field name.
     * @param event the change event of the building selector
     */
    handleOnChange(event: DropdownChangeEvent) {
        this.selectedBuilding = event.value
        this.onChange(event.value)
        this.onTouched()
        this.change.emit({ value: event.value, field: this.controlName })
    }

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
        this.selectedBuilding = value
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