import { CommonModule } from '@angular/common';
import { AfterViewChecked, ChangeDetectorRef, Component, EventEmitter, Input, Output, SimpleChanges, ViewChild, forwardRef, OnInit, OnDestroy } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { Dropdown, DropdownChangeEvent, DropdownModule } from 'primeng/dropdown';
import { RoleService } from '../../service/role.service';
import { Role } from '../../api/role';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-role-selector',
    templateUrl: './role-selector.component.html',
    standalone: true,
    imports: [CommonModule, FormsModule, ReactiveFormsModule, TranslateModule, DropdownModule],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => RoleSelectorComponent),
            multi: true
        }
    ]
})
export class RoleSelectorComponent implements OnInit, AfterViewChecked, ControlValueAccessor {
    @Input() parentForm: FormGroup
    @Input() controlName: string
    @Input() placeholder: string
    @Input() showClear: boolean
    @Output() change = new EventEmitter<any>()
    @ViewChild(Dropdown) private dropdown?: Dropdown

    roles: Role[] = []              // Available roles
    selectedRole: string | number | null = ''       // Selected role
    disabled = false

    private subs: Subscription

    constructor(private roleService: RoleService, 
                private cdRef: ChangeDetectorRef) {

        if (!this.placeholder) {
            this.placeholder = 'Válasszon...'
        }
    }

    /**
     * OnInit lifecycle hook
     * Fetches roles for the selector and updates the component's roles property with the retrieved roles.
     */
    ngOnInit() {
        this.subs = this.roleService.getRolesForSelector().subscribe({
            next: (data) => {
                if (data) {
                    this.roles = data
                    
                    // Invalidate selectedRole if not in new list
                    if (this.selectedRole && !this.roles.some(r => Number(r.id) === Number(this.selectedRole))) {
                        this.applySelection('', false)
                    }
                    this.cdRef.detectChanges()
                }
            }
        })
    }

    ngAfterViewChecked(): void {
        this.syncValueFromWidget()
    }

    /**
     * Cleans up all subscriptions when the component is destroyed,
     * preventing potential memory leaks.
     */
    ngOnDestroy() {
        this.subs.unsubscribe()
    }

    /**
     * Lifecycle hook: called when any data-bound property of a directive changes.
     * Updates the available role options when input properties change.
     * @param changes An object of key-value pairs for the changed properties.
     */
    ngOnChanges(changes: SimpleChanges) {}

    /**
     * Returns the FormControl object for the role selector.
     * @returns {FormControl} the FormControl object if the parent form and the control name are valid, otherwise null
     */
    getFormControl(): FormControl | null {
        return this.parentForm ? this.parentForm.get(this.controlName) as FormControl : null
    }
    /**
     * Handles the change event of the role selector and emits a new value with the
     * changed field name.
     * @param event the change event of the role selector
     */
    handleOnChange(event: DropdownChangeEvent) {
        this.applySelection(event.value)
        this.change.emit({ value: event.value, field: this.controlName })
    }

    /**
     * Returns the style class for a role role badge.
     * The style class is in the format "role-role-badge role-<role-name>".
     * If the role ID is not found, an empty string is returned.
     * @param roleId role ID
     * @returns style class
     */
    getRoleStyleClass(roleId: any): string {
        const role = this.roles.find(r => r.id == roleId)
        const roleStyleClass = role ? role?.name?.trim().toLowerCase().replace(/\s+/g, '') : ''
        return `user-role-badge role-${roleStyleClass}`
    }

    /**
     * Sets the disabled state of the component.
     * Used by Angular forms to enable/disable the input dynamically.
     * 
     * @param isDisabled - Boolean indicating whether the component should be disabled.
     */
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
        this.applySelection(value ?? '', false, false)
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
        const widgetValue = this.dropdown?.value
        if (
            widgetValue === undefined ||
            widgetValue === null ||
            this.isSameSelection(widgetValue, this.selectedRole)
        ) {
            return
        }

        this.applySelection(widgetValue, false)
    }

    private applySelection(value: string | number | null, emitTouch = true, emitCva = true): void {
        const normalized = value ?? ''
        const control = this.getFormControl()
        const currentControlValue = control?.value ?? ''

        if (!this.isSameSelection(this.selectedRole, normalized)) {
            this.selectedRole = normalized
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
