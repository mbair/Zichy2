import { Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-payment-selector',
    templateUrl: './payment-selector.component.html'
})
export class PaymentSelectorComponent {
    @Input() parentForm: FormGroup
    @Input() controlName: string
    @Input() showClear: boolean
    
    payments: any[] = []            // Available payments
    selectedPayment: string = ''    // Selected payment

    constructor(private translate: TranslateService) {
        this.setPayments()

        // Set the accommodation options when the language changes
        this.translate.onLangChange.subscribe(() => {
            this.setPayments()
        })
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
}