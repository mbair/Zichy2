import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, EventEmitter, Input, Output, SimpleChanges, forwardRef } from '@angular/core';
import { ControlValueAccessor, FormControl, FormGroup, FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { DropdownChangeEvent, DropdownModule } from 'primeng/dropdown';
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
export class ContractingPartySelectorComponent implements ControlValueAccessor {
    @Input() parentForm: FormGroup
    @Input() controlName: string
    @Input() options: OrganizerContractingParty[] = []
    @Input() showClear: boolean = true
    @Input() placeholder: string = 'Válassz szerződőt...'
    @Input() inputId: string = 'contractingPartySelector'
    @Output() change = new EventEmitter<any>()

    disabled = false
    selectedContractingParty: string | number | null = null

    constructor(private cdRef: ChangeDetectorRef) {}

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['options'] && !changes['options'].firstChange) {
            const currentValue = this.selectedContractingParty
            if (currentValue != null && !this.options.some(option => Number(option.contractingPartyId) === Number(currentValue))) {
                this.selectedContractingParty = null
                this.onChange(null)
            }
            this.cdRef.detectChanges()
        }
    }

    getFormControl(): FormControl | null {
        return this.parentForm ? this.parentForm.get(this.controlName) as FormControl : null
    }

    handleOnChange(event: DropdownChangeEvent): void {
        this.selectedContractingParty = event.value
        this.onChange(event.value)
        this.onTouched()
        this.change.emit({ value: event.value, field: this.controlName })
    }

    setDisabledState(isDisabled: boolean): void {
        this.disabled = isDisabled
        this.cdRef.detectChanges()
    }

    writeValue(value: any): void {
        this.selectedContractingParty = value
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
}
