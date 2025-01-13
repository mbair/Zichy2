import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DropdownChangeEvent } from 'primeng/dropdown';
import { UserService } from '../../service/user.service';
import { RoleService } from '../../service/role.service';
import { Role } from '../../api/role';

@Component({
    selector: 'app-user-selector',
    templateUrl: './user-selector.component.html'
})
export class UserSelectorComponent {
    @Input() parentForm: FormGroup
    @Input() controlName: string
    @Input() user_rolesid: number
    @Input() showClear: boolean
    @Output() change = new EventEmitter<any>()

    users: any[] = []               // Available users
    selecteduser: string = ''       // Selected user
    roles: Role[] = []              // Fetched roles

    constructor(private userService: UserService, public roleService: RoleService) {}

    /**
     * OnInit lifecycle hook
     *
     * Fetches users for the selector based on the given user_rolesid.
     * If user_rolesid is given, filters the users by that role.
     * Fetches roles for users.
     */
    ngOnInit() {
        // Get users for selector
        this.userService.getUsersForSelector(this.user_rolesid).subscribe({
            next: (data) => {
                if (data) {
                    this.users = this.user_rolesid ? data.filter(user => user.user_rolesid === this.user_rolesid) : data
                    // Fetch roles for users
                    this.fetchRolesForUsers()
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
     * Fetches roles from the RoleService and updates the component's roles property with the retrieved roles.
     */
    fetchRolesForUsers() {
        this.roleService.fetchRoles().subscribe({
            next: (roles) => {
                this.roles = roles
            }
        })
    }

    /**
     * Returns the FormControl object for the user selector.
     * @returns {FormControl} the FormControl object if the parent form and the control name are valid, otherwise null
     */
    getFormControl(): FormControl | null {
        return this.parentForm ? this.parentForm.get(this.controlName) as FormControl : null
    }
    /**
     * Handles the change event of the user selector and emits a new value with the
     * changed field name.
     * @param event the change event of the user selector
     */
    handleOnChange(event: DropdownChangeEvent) {
        this.change.emit({ value: event.value, field: this.controlName })
    }


    /**
     * Returns the style class for a user role badge.
     * The style class is in the format "user-role-badge role-<role-name>".
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
