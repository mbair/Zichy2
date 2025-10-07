import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { emailDomainValidator } from 'src/app/demo/utils/email-validator';
import { passwordMatchValidator } from 'src/app/demo/utils/password-match-validator';
import { Observable } from 'rxjs';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { MessageService } from 'primeng/api';
import { UserService } from '../../service/user.service';
import { RoleService } from '../../service/role.service';
import { Role } from '../../api/role';
import { User } from '../../api/user';

@Component({
    templateUrl: './profile.component.html',
    providers: [MessageService]
})

// Makes unsubscribe automatically, don't need to do manually in ngOnDestroy
// BUT!!! Don't delete ngOnDestroy, it has to stay here!
@AutoUnsubscribe()

export class ProfileComponent implements OnInit {

    loading: boolean = true             // Loading overlay trigger value
    roles: Role[] = []                  // Possible roles
    userForm: FormGroup                 // Form for User whose profile we are currently editing
    originalFormValues: any             // The original values ​​of the form
    canEditRoles: boolean = false       // Can the user change the roles of the user

    private initialFormValues = {
        id: null,
        username: '',
        fullname: '',
        user_rolesid: '',
        email: '',
        phone: '',
        password: '',
        password_again: '',
    }

    private userObs$: Observable<any> | undefined;
    private serviceMessageObs$: Observable<any> | undefined;

    constructor(
        public userService: UserService,
        public roleService: RoleService,
        private messageService: MessageService,
        private cdRef: ChangeDetectorRef,
        private fb: FormBuilder) { }

    ngOnInit() {
        // Permissions
        this.userService.hasRole(['Super Admin', 'Nagy Admin']).subscribe(canEditRoles => {
            this.canEditRoles = canEditRoles
            this.userForm.get('user_rolesid')?.disable();
            this.cdRef.detectChanges();
        })
        
        // Get User data
        this.userService.getOwnData()

        // User form
        this.userForm = this.fb.group({
            id: [this.initialFormValues.id],
            username: [this.initialFormValues.username],
            fullname: [this.initialFormValues.fullname, Validators.required],
            user_rolesid: [{ value: this.initialFormValues.user_rolesid, disabled: true }, Validators.required],
            email: [this.initialFormValues.email, [Validators.required, emailDomainValidator()]],
            phone: [this.initialFormValues.phone, [Validators.required]],
            password: ['', Validators.required],
            password_again: ['', Validators.required],
        }, { validators: passwordMatchValidator() })

        // Enabling/Disabling userrole dropdown by actual user role
        if (this.userService.hasRole(['Super Admin', 'Nagy Admin'])) {
            this.userForm.get('user_rolesid')?.enable()
        } else {
            this.userForm.get('user_rolesid')?.disable()
        }

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
        this.userObs$.subscribe((user: User) => {
            this.loading = false
            if (user) {
                // Filling out a form with the user's data
                this.userForm.patchValue(user)

                // Store original form data
                this.originalFormValues = this.userForm.value
            }
        })

        // Get roles for selector
        this.roleService.getRolesForSelector().subscribe({
            next: (data) => {
                this.roles = data
            }
        })

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
            }

            delete formValues.password_again

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

    // Don't delete this, its needed from a performance point of view,
    ngOnDestroy(): void {
    }
}