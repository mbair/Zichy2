import { Component, EventEmitter, Input, Output, SimpleChanges, ChangeDetectorRef, forwardRef, OnInit } from '@angular/core'
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormControl, FormGroup } from '@angular/forms'
import { TranslateService } from '@ngx-translate/core'
import { DropdownChangeEvent } from 'primeng/dropdown'
import { MultiSelectChangeEvent } from 'primeng/multiselect'

export interface changeEvent {
    value: number | number[] | null
    field: string
}

interface PaymentOption {
    label: string
    value: number      // payment_method_id
    style: string
    icon: string
}

@Component({
    selector: 'app-payment-selector',
    templateUrl: './payment-selector.component.html',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => PaymentSelectorComponent),
            multi: true
        }
    ]
})
export class PaymentSelectorComponent implements OnInit, ControlValueAccessor {
    @Input() parentForm!: FormGroup
    @Input() controlName!: string
    @Input() showClear = false
    @Input() multiple = false        // If true, show checkbox-based multi-select and the value is number[]
    @Input() optionSelectable = true // If false, options are not selectable (read-only display)
    @Input() allowedPaymentMethodIds: number[] | null | undefined = undefined
    @Output() change = new EventEmitter<changeEvent>()

    payments: PaymentOption[] = []                    // Available payments
    selectedPayment: number | number[] | null = null  // Selected payment
    disabled = false
    lastWrittenValue: any = null

    constructor(private translate: TranslateService,
        private cdRef: ChangeDetectorRef) { }

    /**
     * Lifecycle hook: called when the component is initialized.
     * Subscribes to language change events and sets the payments
     * for the selector when the language changes.
     */
    ngOnInit() {
        this.translate.onLangChange.subscribe(() => this.setPayments())
        this.setPayments()
        this.syncDisabledState()

        // Ensure control value is numeric and respects allowedPaymentMethodIds
        this.syncControlValueWithModeAndAllowed()
    }

    /**
     * Lifecycle hook: called when any data-bound property of a directive changes.
     * Updates the available payment options when input properties change.
     * @param changes An object of key-value pairs for the changed properties.
     */
    ngOnChanges(changes: SimpleChanges) {
        this.setPayments()
        this.syncDisabledState()

        // Ensure selected value matches the mode (single vs multi)
        if (this.multiple && !Array.isArray(this.selectedPayment)) {
            this.selectedPayment = this.selectedPayment == null ? [] : [this.selectedPayment as number]
        }
        if (!this.multiple && Array.isArray(this.selectedPayment)) {
            this.selectedPayment = this.selectedPayment.length > 0 ? this.selectedPayment[0] : null
        }

        // Ensure control value is numeric and respects allowedPaymentMethodIds
        this.syncControlValueWithModeAndAllowed()
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
     * For now this is hardcoded. Later you can load from backend (GET /payment-methods)
     * and map to these UI fields.
     */
    private setPayments(): void {
        const all: PaymentOption[] = [
            {
                label: this.translate.instant('PAYMENTS.BANK-TRANSFER'),
                value: 1,
                style: 'bank-transfer',
                icon: 'pi pi-arrow-circle-right'
            },
            {
                label: this.translate.instant('PAYMENTS.SZEP-CARD'),
                value: 2,
                style: 'szep-card',
                icon: 'pi pi-id-card'
            },
            {
                label: this.translate.instant('PAYMENTS.CASH'),
                value: 3,
                style: 'cash',
                icon: 'pi pi-money-bill'
            }
        ]

        // If allowedPaymentMethodIds is provided (even empty), restrict the options.
        // undefined / null -> show all
        if (Array.isArray(this.allowedPaymentMethodIds)) {
            const allowed = new Set(
                this.allowedPaymentMethodIds
                    .map((v) => Number(v))
                    .filter((n) => Number.isFinite(n))
            )

            this.payments = all.filter((p) => allowed.has(p.value))
        } else {
            this.payments = all
        }

        // If current selection is not allowed anymore, clear it
        const control = this.getFormControl()
        if (!control) {
            return
        }

        const allowedSet = new Set(this.payments.map((p) => p.value))
        const current = control.value

        if (this.multiple) {
            const ids = Array.isArray(current)
                ? current
                    .map((v: any) => Number(v))
                    .filter((n: number) => Number.isFinite(n))
                : []

            const filtered = ids.filter((id) => allowedSet.has(id))

            const changed =
                filtered.length !== ids.length ||
                filtered.some((v, i) => v !== ids[i])

            if (changed) {
                control.setValue(filtered, { emitEvent: false })
                this.selectedPayment = filtered
            }
        } else {
            const id = Number(current)

            if (Number.isFinite(id) && !allowedSet.has(id)) {
                control.setValue(null, { emitEvent: false })
                this.selectedPayment = null
            }
        }
    }

    private buildAllowedSet(): Set<number> | null {
        if (this.allowedPaymentMethodIds === undefined || this.allowedPaymentMethodIds === null) {
            return null // "no restriction"
        }

        const ids = this.allowedPaymentMethodIds
            .map((v) => Number(v))
            .filter((n) => Number.isFinite(n))

        return new Set(ids)
    }

    private normalizeToNumberValue(raw: any): number | number[] | null {
        const allowedSet = this.buildAllowedSet()

        if (this.multiple) {
            const arr = Array.isArray(raw) ? raw : (raw == null ? [] : [raw])

            const nums = arr
                .map((v) => Number(v))
                .filter((n) => Number.isFinite(n))

            const filtered = allowedSet ? nums.filter((n) => allowedSet.has(n)) : nums

            // Deduplicate for safety
            return Array.from(new Set(filtered))
        }

        // single
        if (raw == null || raw === '') {
            return null
        }

        const n = Number(raw)
        if (!Number.isFinite(n)) {
            return null
        }

        if (allowedSet && !allowedSet.has(n)) {
            return null
        }

        return n
    }

    private syncControlValueWithModeAndAllowed(): void {
        const control = this.getFormControl()
        if (!control) return

        const source = this.lastWrittenValue ?? control.value
        const normalized = this.normalizeToNumberValue(source)

        // Avoid infinite loops / extra emits
        const same = JSON.stringify(control.value) === JSON.stringify(normalized)
        if (!same) {
            control.setValue(normalized, { emitEvent: false })
        }

        this.selectedPayment = normalized
    }

    /**
     * Handles the change event of the payment selector and emits a new value with the
     * changed field name.
     * @param event the change event of the payment selector
     */
    handleOnChange(event: DropdownChangeEvent | MultiSelectChangeEvent) {
        const raw = (event as any).value
        const normalized = this.normalizeToNumberValue(raw)

        this.selectedPayment = normalized

        // If used with parentForm+controlName (reactive), enforce normalized value
        const control = this.getFormControl()
        if (control) {
            control.setValue(normalized, { emitEvent: false })
        }

        // CVA notify
        this.onChange(normalized)
        this.onTouched()

        // External notify
        this.change.emit({ value: normalized, field: this.controlName })
    }

    /**
     * Sets the disabled state of the component.
     * Used by Angular forms to enable/disable the input dynamically.
     * 
     * @param isDisabled - Boolean indicating whether the component should be disabled.
     */
    setDisabledState(isDisabled: boolean): void {
        this.disabled = isDisabled
        this.syncDisabledState()
        this.cdRef.detectChanges()
    }

    private syncDisabledState(): void {
        const control = this.getFormControl()
        if (!control) return

        const shouldDisable = this.disabled || !this.optionSelectable

        if (shouldDisable && control.enabled) {
            control.disable({ emitEvent: false })
        } else if (!shouldDisable && control.disabled) {
            control.enable({ emitEvent: false })
        }
    }

    getSelectedOptions(value: any): PaymentOption[] {
        const ids = Array.isArray(value)
            ? value
                .map((v: any) => Number(v))
                .filter((n: number) => Number.isFinite(n))
            : []

        if (ids.length === 0) {
            return []
        }

        const idSet = new Set(ids)
        return this.payments.filter((p) => idSet.has(p.value))
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
        this.lastWrittenValue = value

        const normalized = this.normalizeToNumberValue(value)
        this.selectedPayment = normalized

        const control = this.getFormControl()
        if (control) {
            control.setValue(normalized, { emitEvent: false })
        }

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