import { ChangeDetectorRef, Component, EventEmitter, Input, Output, forwardRef } from '@angular/core';
import { ControlValueAccessor, FormControl, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
import { DropdownChangeEvent } from 'primeng/dropdown';

export interface RoomKeySelectorChangeEvent {
    value: string;
    field: string;
}

interface RoomKeyOption {
    label: string;
    value: string;
    color: string;
    icon: string;
}

@Component({
    selector: 'app-roomkey-selector',
    templateUrl: './roomkey-selector.component.html',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => RoomKeySelectorComponent),
            multi: true
        }
    ]
})
export class RoomKeySelectorComponent implements ControlValueAccessor {
    @Input() parentForm: FormGroup
    @Input() controlName: string
    @Input() showClear: boolean = true
    @Input() placeholder: string = 'Válassz...'
    @Output() change = new EventEmitter<RoomKeySelectorChangeEvent>()

    selectedValue: string = ''
    disabled = false

    readonly options: RoomKeyOption[] = [
        { label: 'Visszaadva', value: 'returned', color: 'green', icon: 'pi pi-sign-in' },
        { label: 'Kiadva', value: 'issued', color: 'orange', icon: 'pi pi-sign-out' },
        { label: 'Nincs', value: 'none', color: 'indigo', icon: 'pi pi-times' }
    ]

    constructor(private cdRef: ChangeDetectorRef) { }

    getFormControl(): FormControl | null {
        if (!this.parentForm || !this.controlName) {
            return null
        }
        return this.parentForm.get(this.controlName) as FormControl
    }

    handleOnChange(event: DropdownChangeEvent): void {
        this.selectedValue = event.value
        this.onChange(event.value)
        this.onTouched()
        this.change.emit({ value: event.value, field: this.controlName })
    }

    writeValue(value: any): void {
        this.selectedValue = value || ''
        this.cdRef.detectChanges()
    }

    registerOnChange(fn: any): void {
        this.onChange = fn
    }

    registerOnTouched(fn: any): void {
        this.onTouched = fn
    }

    setDisabledState(isDisabled: boolean): void {
        this.disabled = isDisabled
        this.cdRef.detectChanges()
    }

    onChange = (_: any) => { }
    onTouched = () => { }
}
