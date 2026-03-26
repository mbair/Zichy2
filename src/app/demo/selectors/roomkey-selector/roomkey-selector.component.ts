import { CommonModule } from '@angular/common';
import { AfterViewChecked, ChangeDetectorRef, Component, EventEmitter, Input, Output, ViewChild, forwardRef } from '@angular/core';
import { ControlValueAccessor, FormControl, FormGroup, FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { Dropdown, DropdownChangeEvent, DropdownModule } from 'primeng/dropdown';

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
    standalone: true,
    imports: [CommonModule, FormsModule, ReactiveFormsModule, DropdownModule],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => RoomKeySelectorComponent),
            multi: true
        }
    ]
})
export class RoomKeySelectorComponent implements AfterViewChecked, ControlValueAccessor {
    @Input() parentForm: FormGroup
    @Input() controlName: string
    @Input() showClear: boolean = true
    @Input() placeholder: string = 'Válassz...'
    @Output() change = new EventEmitter<RoomKeySelectorChangeEvent>()
    @ViewChild(Dropdown) private dropdown?: Dropdown

    selectedValue: string = ''
    disabled = false

    readonly options: RoomKeyOption[] = [
        { label: 'Visszaadva', value: 'returned', color: 'green', icon: 'pi pi-sign-in' },
        { label: 'Kiadva', value: 'issued', color: 'orange', icon: 'pi pi-sign-out' },
        { label: 'Nincs', value: 'none', color: 'indigo', icon: 'pi pi-times' }
    ]

    constructor(private cdRef: ChangeDetectorRef) { }

    ngAfterViewChecked(): void {
        this.syncValueFromWidget()
    }

    getFormControl(): FormControl | null {
        if (!this.parentForm || !this.controlName) {
            return null
        }
        return this.parentForm.get(this.controlName) as FormControl
    }

    handleOnChange(event: DropdownChangeEvent): void {
        this.applySelection(event.value)
        this.change.emit({ value: event.value, field: this.controlName })
    }

    writeValue(value: any): void {
        this.applySelection(value || '', false, false)
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

    private syncValueFromWidget(): void {
        const widgetValue = this.dropdown?.value
        if (widgetValue === undefined || widgetValue === null || widgetValue === this.selectedValue) {
            return
        }

        this.applySelection(widgetValue, false)
    }

    private applySelection(value: string, emitTouch = true, emitCva = true): void {
        const normalized = value ?? ''
        const control = this.getFormControl()
        const currentControlValue = control?.value ?? ''

        if (this.selectedValue !== normalized) {
            this.selectedValue = normalized
        }

        if (control && currentControlValue !== normalized) {
            control.setValue(normalized, { emitEvent: false })
        }

        if (emitCva) {
            this.onChange(normalized)
        }

        if (emitTouch) {
            this.onTouched()
        }
    }
}
