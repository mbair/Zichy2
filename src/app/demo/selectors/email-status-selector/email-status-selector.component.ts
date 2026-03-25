import { CommonModule } from '@angular/common';
import { AfterViewChecked, ChangeDetectorRef, Component, EventEmitter, Input, Output, ViewChild, forwardRef } from '@angular/core';
import { ControlValueAccessor, FormControl, FormGroup, FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { Dropdown, DropdownChangeEvent, DropdownModule } from 'primeng/dropdown';

export interface EmailStatusSelectorChangeEvent {
    value: string;
    field: string;
}

interface EmailStatusOption {
    label: string;
    value: string;
    color: string;
    icon: string;
}

@Component({
    selector: 'app-email-status-selector',
    templateUrl: './email-status-selector.component.html',
    standalone: true,
    imports: [CommonModule, FormsModule, ReactiveFormsModule, DropdownModule],
    styles: [`
        :host ::ng-deep .email-status-dropdown {
            width: 100%;
        }

        :host ::ng-deep .email-status-badge {
            display: inline-flex;
            align-items: center;
            gap: 0.45rem;
            min-height: 2rem;
            padding: 0.35rem 0.8rem;
            border-radius: 999px;
            font-weight: 600;
            line-height: 1;
            white-space: nowrap;
            box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.35);
        }

        :host ::ng-deep .email-status-badge .pi {
            font-size: 0.875rem;
        }
    `],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => EmailStatusSelectorComponent),
            multi: true
        }
    ]
})
export class EmailStatusSelectorComponent implements AfterViewChecked, ControlValueAccessor {
    @Input() parentForm!: FormGroup
    @Input() controlName!: string
    @Input() showClear = true
    @Input() placeholder = 'Válasszon...'
    @Output() change = new EventEmitter<EmailStatusSelectorChangeEvent>()
    @ViewChild(Dropdown) private dropdown?: Dropdown

    selectedValue = ''
    disabled = false

    readonly options: EmailStatusOption[] = [
        { label: 'Küldésre vár', value: 'queued', color: 'indigo', icon: 'pi pi-clock' },
        { label: 'Küldés folyamatban', value: 'processing', color: 'blue', icon: 'pi pi-spin pi-spinner' },
        { label: 'Elküldve', value: 'sent', color: 'green', icon: 'pi pi-check-circle' },
        { label: 'Sikertelen', value: 'failed', color: 'pink', icon: 'pi pi-times-circle' },
        { label: 'Nem küldött', value: 'skipped', color: 'orange', icon: 'pi pi-ban' },
        { label: 'Ismeretlen', value: 'unknown', color: 'gray', icon: 'pi pi-question-circle' }
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
        this.applySelection(event.value || '')
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
