import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { DropdownChangeEvent } from 'primeng/dropdown';

export interface changeEvent {
    value: string;
    field: string;
}

@Component({
    selector: 'app-payment-selector',
    templateUrl: './payment-selector.component.html'
})
export class PaymentSelectorComponent {
    @Input() parentForm: FormGroup
    @Input() controlName: string
    @Input() showClear: boolean
    @Output() change = new EventEmitter<changeEvent>()
    
    payments: any[] = []            // Available payments
    selectedPayment: string = ''    // Selected payment

    constructor(private translate: TranslateService) {}

    /**
     * Lifecycle hook: called when the component is initialized.
     * Subscribes to language change events and sets the payments
     * for the selector when the language changes.
     */
    ngOnInit() {
        this.translate.onLangChange.subscribe(() => {
            this.setPayments()
        })
    }

    /**
     * Lifecycle hook: called when any data-bound property of a directive changes.
     * Updates the available payment options when input properties change.
     * @param changes An object of key-value pairs for the changed properties.
     */
    ngOnChanges(changes: SimpleChanges) {
        this.setPayments()
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
    setPayments() {
        this.payments = [
            { label: this.translate.instant('PAYMENTS.BANK-TRANSFER'), value: 'Banki átutalás', style: 'bank-transfer', icon: 'pi pi-arrow-circle-right' },
            { label: this.translate.instant('PAYMENTS.SZEP-CARD'), value: 'SZÉP kártya', style: 'szep-card', icon: 'pi pi-id-card' },
            { label: this.translate.instant('PAYMENTS.CASH'), value: 'Készpénz', style: 'cash', icon: 'pi pi-money-bill' },
        ]
    }

    /**
     * Handles the change event of the payment selector and emits a new value with the
     * changed field name.
     * @param event the change event of the payment selector
     */
    handleOnChange(event: DropdownChangeEvent) {
        this.change.emit({ value: event.value, field: this.controlName })
    }
}