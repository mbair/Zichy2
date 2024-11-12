import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DropdownChangeEvent } from 'primeng/dropdown';
import { RoleService } from '../../service/role.service';
import { Role } from '../../api/role';

@Component({
    selector: 'app-role-selector',
    templateUrl: './role-selector.component.html'
})
export class RoleSelectorComponent {
    @Input() parentForm: FormGroup
    @Input() controlName: string
    @Input() showClear: boolean
    @Output() change = new EventEmitter<any>()

    roles: Role[] = []              // Available roles
    selectedRole: string = ''       // Selected role

    constructor(private roleService: RoleService) {}

    /**
     * OnInit lifecycle hook
     * Fetches roles for the selector and updates the component's roles property with the retrieved roles.
     */
    ngOnInit() {
        // Get roles for selector
        this.roleService.getRolesForSelector().subscribe({
            next: (data) => {
                if (data) {
                    this.roles = data
                }
            }
        })
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
}
