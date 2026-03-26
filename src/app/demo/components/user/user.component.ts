import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { emailDomainValidator } from 'src/app/demo/utils/email-validator';
import { BehaviorSubject, debounceTime, distinctUntilChanged, map, Observable, Subject } from 'rxjs';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { UserService } from '../../service/user.service';
import { RoleService } from '../../service/role.service';
import { ResponsiveService } from '../../service/responsive.service';
import { ApiResponse } from '../../api/ApiResponse';
import { User } from '../../api/user';
import { OrganizerContractingParty } from '../../api/contracting-party';
import { formatDateDots } from '../../utils/date.utils';
import { replaceTableRowById, shouldRequeryAfterTableRowUpdate } from '../../utils/table-row-update.utils';

@Component({
    templateUrl: './user.component.html',
    providers: [MessageService]
})

// Makes unsubscribe automatically, don't need to do manually in ngOnDestroy
// BUT!!! Don't delete ngOnDestroy, it has to stay here!
@AutoUnsubscribe()

export class UserComponent implements OnInit {

    loading: boolean = true                      // Loading overlay trigger value
    tableItem: User = {}                         // One user object
    tableData: User[] = []                       // Data set displayed in a table
    rowsPerPageOptions = [20, 50, 100]           // Possible rows per page
    rowsPerPage: number = 20                     // Default rows per page
    totalRecords: number = 0                     // Total number of rows in the table
    page: number = 0                             // Current page
    sortField: string = ''                       // Current sort field
    sortOrder: number = 1                        // Current sort order
    globalFilter: string = ''                    // Global filter
    filterValues: { [key: string]: string } = {} // Table filter conditions
    debounce: { [key: string]: any } = {}        // Search delay in filter field
    userForm: FormGroup                          // Form for user registration and modification
    originalFormValues: any                      // The original values ​​of the form
    sidebar: boolean = false                     // Table item maintenance sidebar
    deleteDialog: boolean = false                // Popup for deleting table item
    bulkDeleteDialog: boolean = false            // Popup for deleting table items
    selected: User[] = []                        // Table items chosen by user
    selectedUserRole: string                     // User Role chosen by user
    canCreate: boolean = false                   // User has permission to create new user
    canEdit: boolean = false                     // User has permission to update user
    canDelete: boolean = false                   // User has permission to delete user
    isMobile: boolean = false                    // Mobile screen detection
    readonly organizerRoleId: number = 4

    private initialFormValues = {
        id: null,
        username: '',
        fullname: '',
        user_rolesid: '',
        email: '',
        phone: '',
        password: '',
        organizerContractingParties: [] as OrganizerContractingParty[],
    }
    
    private isFormValid$: Observable<boolean>
    private formChanges$: Subject<void> = new Subject()
    private userObs$: Observable<any> | undefined
    private serviceMessageObs$: Observable<any> | undefined

    constructor(
        public userService: UserService,
        private roleService: RoleService,
        private messageService: MessageService,
        private responsiveService: ResponsiveService,
        private fb: FormBuilder) {

        // User form fields and validators
        this.userForm = this.fb.group({
            id: [this.initialFormValues.id],
            username: [this.initialFormValues.username],
            fullname: [this.initialFormValues.fullname, Validators.required],
            user_rolesid: [this.initialFormValues.user_rolesid, [Validators.required]],
            email: [this.initialFormValues.email, [Validators.required, emailDomainValidator()]],
            phone: [this.initialFormValues.phone, [Validators.required]],
            password: [this.initialFormValues.password, [Validators.required]],
            organizerContractingParties: this.fb.array([]),
        })

        this.isFormValid$ = new BehaviorSubject<boolean>(false)
    }

    ngOnInit() {
        // Permissions
        this.userService.hasRole(['Super Admin', 'Nagy Admin']).subscribe(canCreate => this.canCreate = canCreate)
        this.userService.hasRole(['Super Admin', 'Nagy Admin']).subscribe(canEdit => this.canEdit = canEdit)
        this.userService.hasRole(['Super Admin', 'Nagy Admin']).subscribe(canDelete => this.canDelete = canDelete)

        // Users
        this.userObs$ = this.userService.userObs;
        this.userObs$.subscribe((data: ApiResponse) => {
            this.loading = false
            if (data) {
                this.tableData = data.rows || []
                this.totalRecords = data.totalItems || 0
                this.page = data.currentPage || 0
            }
        })

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

        // Monitor the changes of the window size
        this.responsiveService.isMobile$.subscribe((isMobile) => {
            this.isMobile = isMobile
        })

        // Form validation
        this.isFormValid$ = this.formChanges$.pipe(
            debounceTime(300),
            distinctUntilChanged(),
            map(() => this.userForm.valid)
        )

        // Message
        this.serviceMessageObs$ = this.userService.messageObs
        this.serviceMessageObs$.subscribe(message => this.handleMessage(message))
    }

    // Getters for form validation
    get id() { return this.userForm.get('id') }
    get username() { return this.userForm.get('username') }
    get fullname() { return this.userForm.get('fullname') }
    get user_rolesid() { return this.userForm.get('user_rolesid') }
    get email() { return this.userForm.get('email') }
    get phone() { return this.userForm.get('phone') }
    get password() { return this.userForm.get('password') }
    get organizerContractingPartiesArray(): FormArray {
        return this.userForm.get('organizerContractingParties') as FormArray
    }

    /**
     * Load filtered data into the Table
     * @returns
     */
    doQuery() {
        this.loading = true

        const filters = Object.keys(this.filterValues)
            .map(key => this.filterValues[key].length > 0 ? `${key}=${this.filterValues[key]}` : '')
        const queryParams = filters.filter(x => x.length > 0).join('&')

        if (this.globalFilter !== '') {
            return this.userService.getBySearch(this.globalFilter, { sortField: this.sortField, sortOrder: this.sortOrder })
        }

        return this.userService.get(this.page, this.rowsPerPage, { sortField: this.sortField, sortOrder: this.sortOrder }, queryParams)
    }

    /**
     * Filter table by column
     * @param event
     * @param field
     */
    onFilter(event: any, field: string) {
        const noWaitFields = ['user_rolesid']
        let filterValue = ''

        // Calendar date as String
        if (event instanceof Date) {
            filterValue = formatDateDots(event)
        } else {
            if (event && (event.value || event.target?.value)) {
                filterValue = event.value || event.target?.value
                filterValue = filterValue.toString()
            } else {
                this.filterValues[field] = ''
            }
        }

        this.filterValues[field] = filterValue

        // If the field is a dropdown, run doQuery immediately
        if (noWaitFields.includes(field)) {
            if (this.filterValues[field] === filterValue) {
                this.doQuery()
            }
        // otherwise wait for the debounce time
        } else {
            if (this.debounce[field]) {
                clearTimeout(this.debounce[field])
            }

            this.debounce[field] = setTimeout(() => {
                if (this.filterValues[field] === filterValue) {
                    this.doQuery()
                }
            }, 500)
        }
    }

    /**
     * Lazy mode is handy to deal with large datasets, instead of loading
     * the entire data, small chunks of data is loaded by invoking onLazyLoad
     * callback every time paging, sorting and filtering happens.
     * @param event
     */
    onLazyLoad(event: any) {
        this.page = event.first! / event.rows!
        this.rowsPerPage = event.rows ?? this.rowsPerPage
        this.sortField = event.sortField ?? ''
        this.sortOrder = event.sortOrder ?? 1
        this.globalFilter = event.globalFilter ?? ''
        this.doQuery()
    }

    /**
     * Filter table by any column
     * @param table
     * @param event
     */
    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains')
    }

    /**
     * Create new User
     */
    create() {
        this.userForm.reset(this.initialFormValues)
        this.resetOrganizerContractingParties([])
        this.originalFormValues = this.userForm.getRawValue()
        this.sidebar = true
    }

    /**
     * Edit the User
     * @param user
     */
    edit(user: User) {
        this.loading = true
        this.userForm.reset(this.initialFormValues)
        this.resetOrganizerContractingParties([])

        this.userService.getUserById(Number(user.id), true).subscribe({
            next: (detailedUser: User | null) => {
                const userData = detailedUser ?? user
                const organizerContractingParties = userData.organizerContractingParties ?? []

                this.userForm.patchValue({
                    id: userData.id ?? null,
                    username: userData.username ?? '',
                    fullname: userData.fullname ?? '',
                    user_rolesid: userData.user_rolesid ?? '',
                    email: userData.email ?? '',
                    phone: userData.phone ?? '',
                    password: '',
                })
                this.resetOrganizerContractingParties(organizerContractingParties)
                this.originalFormValues = this.userForm.getRawValue()
                this.sidebar = true
                this.loading = false
            },
            error: () => {
                this.userForm.patchValue(user)
                this.resetOrganizerContractingParties([])
                this.originalFormValues = this.userForm.getRawValue()
                this.sidebar = true
                this.loading = false
            }
        })
    }

    /**
     * Delete the User
     */
    delete() {
        this.loading = true
        this.deleteDialog = false
        this.userService.delete(this.tableItem)
    }

    /**
     * Delete selected Users
     */
    deleteSelected() {
        this.loading = true
        this.bulkDeleteDialog = false
        this.userService.bulkdelete(this.selected)
    }

    /**
     * Saving the form
     */
    save() {
        if (this.userForm.valid) {
            this.loading = true
            const formValues = this.userForm.getRawValue() as User

            // If the password field is empty, it is deleted from the object
            if (!formValues.password) {
                delete formValues.password
            }

            formValues.organizerContractingParties = (formValues.organizerContractingParties ?? [])
                .filter(relation => this.hasOrganizerContractingPartyData(relation))

            // Create
            if (!formValues.id) {
                this.userService.create(formValues)
                this.sidebar = false

            // Update
            } else {
                this.userService.update$(formValues)
                    .subscribe({
                        next: (updatedUser) => {
                            this.applyUpdatedUser(updatedUser)
                            this.messageService.add({
                                severity: 'success',
                                summary: 'Sikeres felhasználó módosítás',
                                detail: `${updatedUser.fullname} módosítva`,
                            })
                            this.tableItem = {}
                            this.selected = []
                            this.loading = false
                            this.sidebar = false
                        },
                        error: (error: any) => {
                            this.loading = false
                            this.messageService.add({
                                severity: 'error',
                                summary: 'Hiba',
                                detail: error?.error?.message || 'Hiba történt!'
                            })
                        }
                    })
            }
        }
    }

    /**
     * Cancel saving the form
     */
    cancel() {
        this.userForm.reset(this.originalFormValues ?? this.initialFormValues)
        this.resetOrganizerContractingParties(this.originalFormValues?.organizerContractingParties ?? [])
    }

    getRoleStyleClass(roleId: string): string {
        return this.roleService.getRoleStyleClass(roleId)
    }
    
    getRoleName(roleId: string): string {
        return this.roleService.getRoleName(roleId)
    }

    showOrganizerContractingPartiesSection(): boolean {
        return Number(this.user_rolesid?.value) === this.organizerRoleId || this.organizerContractingPartiesArray.length > 0
    }

    addOrganizerContractingParty(): void {
        this.organizerContractingPartiesArray.push(this.createOrganizerContractingPartyGroup({
            enabled: true,
            isDefault: this.organizerContractingPartiesArray.length === 0,
        }))

        if (this.organizerContractingPartiesArray.length === 1) {
            this.setDefaultOrganizerContractingParty(0)
        }
    }

    removeOrganizerContractingParty(index: number): void {
        const wasDefault = this.organizerContractingPartiesArray.at(index)?.get('isDefault')?.value === true
        this.organizerContractingPartiesArray.removeAt(index)

        if (wasDefault && this.organizerContractingPartiesArray.length > 0) {
            this.setDefaultOrganizerContractingParty(0)
        }
    }

    setDefaultOrganizerContractingParty(index: number): void {
        this.organizerContractingPartiesArray.controls.forEach((control, controlIndex) => {
            control.get('isDefault')?.setValue(controlIndex === index, { emitEvent: false })
        })
        this.organizerContractingPartiesArray.markAsDirty()
    }

    trackByIndex(index: number): number {
        return index
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

    private createOrganizerContractingPartyGroup(value?: OrganizerContractingParty): FormGroup {
        return this.fb.group({
            relationId: [value?.relationId ?? null],
            contractingPartyId: [value?.contractingPartyId ?? null],
            legalName: [value?.legalName ?? '', Validators.required],
            taxNumber: [value?.taxNumber ?? ''],
            address: [value?.address ?? ''],
            contactName: [value?.contactName ?? ''],
            contactEmail: [value?.contactEmail ?? '', Validators.email],
            contactPhone: [value?.contactPhone ?? ''],
            isDefault: [value?.isDefault ?? false],
            enabled: [value?.enabled ?? true],
        })
    }

    private resetOrganizerContractingParties(values: OrganizerContractingParty[] = []): void {
        this.organizerContractingPartiesArray.clear()
        values.forEach((value) => this.organizerContractingPartiesArray.push(this.createOrganizerContractingPartyGroup(value)))
    }

    private hasOrganizerContractingPartyData(value: OrganizerContractingParty): boolean {
        return Boolean(
            value?.legalName?.trim()
            || value?.taxNumber?.trim()
            || value?.address?.trim()
            || value?.contactName?.trim()
            || value?.contactEmail?.trim()
            || value?.contactPhone?.trim()
        )
    }

    /**
     * Handles service response messages and reset selected table item(s)
     * After the message is shown, query for data changes
     * @param message service response message
     */
    handleMessage(message: any) {
        if (!message) return

        this.loading = false

        if (message == 'ERROR') {
            this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Hiba történt!'
            })
        } else {
            // Show service response message
            this.messageService.add(message)

            // Reset selected table Item(s)
            this.tableItem = {}
            this.selected = []

            // Query for data changes
            this.doQuery()
        }
    }

    private applyUpdatedUser(updatedUser: User): void {
        const { rows, previousRow, replaced } = replaceTableRowById({
            rows: this.tableData,
            nextRow: updatedUser,
        })

        if (!replaced) {
            this.doQuery()
            return
        }

        this.tableData = rows

        if (shouldRequeryAfterTableRowUpdate({
            globalFilter: this.globalFilter,
            filterValues: this.filterValues,
            sortField: this.sortField,
            previousRow,
            nextRow: updatedUser,
        })) {
            this.doQuery()
        }
    }

    // Don't delete this, its needed from a performance point of view,
    ngOnDestroy(): void {
    }
}
