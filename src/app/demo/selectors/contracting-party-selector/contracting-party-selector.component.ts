import { CommonModule } from '@angular/common';
import { AfterViewChecked, ChangeDetectorRef, Component, EventEmitter, Input, Output, SimpleChanges, ViewChild, forwardRef } from '@angular/core';
import { ControlValueAccessor, FormControl, FormGroup, FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { Dropdown, DropdownChangeEvent, DropdownModule } from 'primeng/dropdown';
import { OrganizerContractingParty } from '../../api/contracting-party';

@Component({
    selector: 'app-contracting-party-selector',
    templateUrl: './contracting-party-selector.component.html',
    standalone: true,
    imports: [CommonModule, FormsModule, ReactiveFormsModule, TranslateModule, DropdownModule],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => ContractingPartySelectorComponent),
            multi: true
        }
    ]
})
export class ContractingPartySelectorComponent implements AfterViewChecked, ControlValueAccessor {
    @Input() parentForm: FormGroup
    @Input() controlName: string
    @Input() options: OrganizerContractingParty[] = []
    @Input() showClear: boolean = true
    @Input() placeholder: string = 'Válassz szerződőt...'
    @Input() inputId: string = 'contractingPartySelector'
    @Output() change = new EventEmitter<any>()
    @ViewChild(Dropdown) private dropdown?: Dropdown

    disabled = false
    selectedContractingParty: string | number | null = null

    constructor(private cdRef: ChangeDetectorRef) {}

    ngAfterViewChecked(): void {
        this.syncValueFromWidget()
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['options'] && !changes['options'].firstChange) {
            const currentValue = this.selectedContractingParty
            if (currentValue != null && !this.options.some(option => Number(option.contractingPartyId) === Number(currentValue))) {
                this.applySelection(null, false)
            }
            this.cdRef.detectChanges()
        }
    }

    getFormControl(): FormControl | null {
        return this.parentForm ? this.parentForm.get(this.controlName) as FormControl : null
    }

    handleOnChange(event: DropdownChangeEvent): void {
        this.applySelection(event.value)
        this.change.emit({ value: event.value, field: this.controlName })
    }

    setDisabledState(isDisabled: boolean): void {
        this.disabled = isDisabled
        this.cdRef.detectChanges()
    }

    writeValue(value: any): void {
        this.applySelection(value ?? null, false, false)
        this.cdRef.detectChanges()
    }

    registerOnChange(fn: any): void {
        this.onChange = fn
    }

    registerOnTouched(fn: any): void {
        this.onTouched = fn
    }

    describeOption(option: OrganizerContractingParty | null | undefined): string {
        if (!option) return ''
        const taxNumber = option.taxNumber?.trim()
        const address = option.address?.trim()

        if (taxNumber && address) {
            return `${taxNumber} | ${address}`
        }
        return taxNumber || address || ''
    }

    onChange = (_: any) => {}
    onTouched = () => {}

    private syncValueFromWidget(): void {
        const widgetValue = this.dropdown?.value
        if (
            widgetValue === undefined ||
            this.isSameSelection(widgetValue, this.selectedContractingParty)
        ) {
            return
        }

        this.applySelection(widgetValue, false)
    }

    private applySelection(value: string | number | null, emitTouch = true, emitCva = true): void {
        const normalized = value ?? null
        const control = this.getFormControl()
        const currentControlValue = control?.value ?? null

        if (!this.isSameSelection(this.selectedContractingParty, normalized)) {
            this.selectedContractingParty = normalized
        }

        if (control && !this.isSameSelection(currentControlValue, normalized)) {
            control.setValue(normalized, { emitEvent: false })
        }

        if (emitCva) {
            this.onChange(normalized)
        }

        if (emitTouch) {
            this.onTouched()
        }
    }

    private isSameSelection(a: unknown, b: unknown): boolean {
        return String(a ?? '') === String(b ?? '')
    }
}
