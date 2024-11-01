import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DropdownChangeEvent } from 'primeng/dropdown';
import { UserService } from '../../service/user.service';

export interface changeEvent {
    value: string;
    field: string;
}

@Component({
    selector: 'app-user-selector',
    templateUrl: './user-selector.component.html'
})
export class UserSelectorComponent {
    @Input() parentForm: FormGroup
    @Input() controlName: string
    @Input() user_rolesid: number
    @Input() showClear: boolean
    @Output() change = new EventEmitter<changeEvent>()

    users: any[] = []               // Available users
    selecteduser: string = ''       // Selected user

    constructor(private userService: UserService) {}

    /**
     * Lifecycle hook: called when the component is initialized.
     * Subscribes to language change events and sets the users
     * for the selector when the language changes.
     */
    ngOnInit() {
        // Get users for selector
        this.userService.getUsersForSelector(this.user_rolesid).subscribe({
            next: (data) => {
                if (data) {
                    if (!this.user_rolesid) {
                        this.users = data
                    } else {
                        this.users = data.filter((user: any) => user.user_rolesid == this.user_rolesid)
                    }
                }
            }
        })
    }

    /**
     * Lifecycle hook: called when any data-bound property of a directive changes.
     * Updates the available user options when input properties change.
     * @param changes An object of key-value pairs for the changed properties.
     */
    ngOnChanges(changes: SimpleChanges) {
    }

    /**
     * Returns the FormControl object for the user selector.
     * @returns {FormControl} the FormControl object
     */
    getFormControl(): FormControl | null {
        if (!this.parentForm || !this.controlName) {
            return null
        }
        return this.parentForm.get(this.controlName) as FormControl
    }

    /**
     * Handles the change event of the user selector and emits a new value with the
     * changed field name.
     * @param event the change event of the user selector
     */
    handleOnChange(event: DropdownChangeEvent) {
        this.change.emit({ value: event.value, field: this.controlName })
    }
}