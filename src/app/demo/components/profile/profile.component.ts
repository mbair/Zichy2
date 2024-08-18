import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { emailDomainValidator } from 'src/app/demo/utils/email-validator';
import { passwordMatchValidator } from 'src/app/demo/utils/password-match-validator';
import { Observable } from 'rxjs';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { MessageService } from 'primeng/api';
import { UserService } from '../../service/user.service';
import { RoleService } from '../../service/role.service';
import { LogService } from '../../service/log.service';
import { ApiResponse } from '../../api/ApiResponse';

@Component({
    templateUrl: './profile.component.html',
    providers: [MessageService]
})

// Makes unsubscribe automatically, don't need to do manually in ngOnDestroy
// BUT!!! Don't delete ngOnDestroy, it has to stay here!
@AutoUnsubscribe()

export class ProfileComponent implements OnInit {

    loading: boolean = true;                     // Loading overlay trigger value
    roles: any[] = []                            // Possible roles
    userForm: FormGroup;                         // Form for User whose profile we are currently editing
    originalFormValues: any;                     // The original values ​​of the form

    private userObs$: Observable<any> | undefined;
    private roleObs$: Observable<any> | undefined;
    private serviceMessageObs$: Observable<any> | undefined;

    constructor(
        public userService: UserService,
        private roleService: RoleService,
        private messageService: MessageService,
        private logService: LogService,
        private fb: FormBuilder) { }

    ngOnInit() {
        // Get User data
        const fullName = localStorage.getItem('fullName')
        this.userService.getBySearchQuery(`fullName=${fullName}`)

        // User form
        this.userForm = this.fb.group({
            id: [''],
            username: [''],
            fullname: ['', Validators.required],
            user_rolesid: ['', [Validators.required]],
            email: ['', [Validators.required, emailDomainValidator()]],
            phone: ['', [Validators.required]],
            password: [''],
            password_again: [''],
        }, { validators: passwordMatchValidator() })

        // TODO: Remove username from backend
        // Monitoring the changes in the email field
        this.userForm.get('email')?.valueChanges.subscribe(value => {
            this.userForm.get('username')?.setValue(value, { emitEvent: false })
        })

        // Monitor the changes in the id field
        this.userForm.get('id')?.valueChanges.subscribe(idValue => {
            this.setPasswordValidators(idValue)
        })

        // Initialize the password validators according to the initial value of the id
        this.setPasswordValidators(this.userForm.get('id')?.value)

        // Users
        this.userObs$ = this.userService.userObs;
        this.userObs$.subscribe((data: ApiResponse) => {
            this.loading = false
            if (data && data.rows) {
                delete data.rows[0].password
                const user = data.rows[0]

                // Filling out a form with the user's data
                this.userForm.patchValue(user)

                // Store original form data
                this.originalFormValues = this.userForm.value
            }
        })

        // Roles
        this.roleObs$ = this.roleService.roleObs;
        this.roleObs$.subscribe((data: any) => {
            this.roles = data ? data.rows : []
        })
        // Get roles for selector
        this.roleService.get(0, 999, '', '')

        // Message
        this.serviceMessageObs$ = this.userService.messageObs;
        this.serviceMessageObs$.subscribe((data) => {
            this.loading = false;
            if (data == 'ERROR') {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: 'Hiba történt!'
                })
            } else {
                // Show service response message
                this.messageService.add(data)

                // Update originally stored form data
                this.originalFormValues = this.userForm.value
                this.userForm.reset(this.originalFormValues)
            }
        })
    }

    /**
     * Restore the original values of the form
     */
    cancel() {
        this.userForm.reset(this.originalFormValues)
    }

    /**
     * Saving the form
     */
    save() {
        if (this.userForm.valid) {
            const formValues = this.userForm.value

            // If the password field is empty, it is deleted from the object
            if (!formValues.password) {
                delete formValues.password
                delete formValues.password_again
            }

            // UPDATE
            if (formValues.id) {
                this.loading = true
                this.userService.update(formValues)
            }
        }
    }

    /**
     * Setting up password verification
     * @param idValue
     */
    setPasswordValidators(idValue: any) {
        const passwordControl = this.userForm.get('password')

        // At User create, it is mandatory to enter the password
        if (!idValue) {
            passwordControl?.setValidators([Validators.required])
            // It is not mandatory for modification
        } else {
            passwordControl?.clearValidators()
        }
        passwordControl?.updateValueAndValidity()
    }

    /**
     * Define the name associated with a user role
     * @param roleId
     * @returns
     */
    getRoleName(roleId: any): string {
        const role = this.roles.find(role => role.id === Number(roleId))
        return role ? role.name : ''
    }

    /**
     * Define the styleName for UserRole
     * @param role
     * @returns
     */
    getRoleStyleClass(roleId: any): string {
        let roleName: string = this.getRoleName(roleId),
            roleStyleClass = "";

        roleStyleClass = roleName.trim().toLowerCase().replace(/\s+/g, '')

        return `user-role-badge role-${roleStyleClass}`
    }

    // Don't delete this, its needed from a performance point of view,
    ngOnDestroy(): void {
    }
}
