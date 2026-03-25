import { CommonModule } from '@angular/common'
import { AfterViewChecked, ChangeDetectorRef, Component, EventEmitter, Input, Output, SimpleChanges, ViewChild, forwardRef, OnInit } from '@angular/core'
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms'
import { TranslateModule, TranslateService } from '@ngx-translate/core'
import { Dropdown, DropdownChangeEvent, DropdownModule } from 'primeng/dropdown'
import { MultiSelect, MultiSelectChangeEvent, MultiSelectModule } from 'primeng/multiselect'

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
    styles: [`
        .payment-badge-list {
            display: flex;
            flex-wrap: wrap;
            gap: 0.5rem;
            align-items: center;
            padding: 0.125rem 0;
        }

        .payment-badge-list .payment-badge {
            display: inline-flex;
            align-items: center;
            white-space: nowrap;
        }
    `],
    standalone: true,
    imports: [CommonModule, FormsModule, ReactiveFormsModule, TranslateModule, DropdownModule, MultiSelectModule],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => PaymentSelectorComponent),
            multi: true
        }
    ]
})
export class PaymentSelectorComponent
    implements OnInit, AfterViewChecked, ControlValueAccessor
{
    @Input() parentForm!: FormGroup
    @Input() controlName!: string
    @Input() showClear = false
    @Input() multiple = false        // If true, show checkbox-based multi-select and the value is number[]
    @Input() optionSelectable = true // If false, options are not selectable (read-only display)
    @Input() allowedPaymentMethodIds: number[] | null | undefined = undefined
    @Output() change = new EventEmitter<changeEvent>()
    @ViewChild(Dropdown) private dropdown?: Dropdown
    @ViewChild(MultiSelect) private multiSelect?: MultiSelect

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

    ngAfterViewChecked(): void {
        this.syncValueFromWidget()
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
                this.applySelection(filtered, false, false)
            }
        } else {
            const id = Number(current)

            if (Number.isFinite(id) && !allowedSet.has(id)) {
                this.applySelection(null, false, false)
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

        this.applySelection(normalized, false, false)
    }

    /**
     * Handles the change event of the payment selector and emits a new value with the
     * changed field name.
     * @param event the change event of the payment selector
     */
    handleOnChange(event: DropdownChangeEvent | MultiSelectChangeEvent) {
        const raw = (event as any).value
        const normalized = this.normalizeToNumberValue(raw)

        this.applySelection(normalized)

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
        this.applySelection(normalized, false, false)

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

    private syncValueFromWidget(): void {
        const widgetValue = this.readWidgetValue()
        if (widgetValue === undefined) {
            return
        }

        const normalizedWidgetValue = this.normalizeToNumberValue(widgetValue)
        if (this.isSameSelection(normalizedWidgetValue, this.selectedPayment)) {
            return
        }

        this.applySelection(normalizedWidgetValue, false)
    }

    private readWidgetValue(): number | number[] | null | undefined {
        if (this.multiple) {
            return this.multiSelect?.value
        }

        return this.dropdown?.value
    }

    private applySelection(
        value: number | number[] | null,
        emitTouch = true,
        emitCva = true,
    ): void {
        const normalized = this.normalizeToNumberValue(value)
        const control = this.getFormControl()
        const currentControlValue = control?.value ?? null

        if (!this.isSameSelection(this.selectedPayment, normalized)) {
            this.selectedPayment = normalized
        }

        if (control && !this.isSameSelection(currentControlValue, normalized)) {
            control.setValue(normalized, { emitEvent: false })
        }

        this.lastWrittenValue = normalized

        if (emitCva) {
            this.onChange(normalized)
        }

        if (emitTouch) {
            this.onTouched()
        }
    }

    private isSameSelection(a: any, b: any): boolean {
        return JSON.stringify(a) === JSON.stringify(b)
    }
}
