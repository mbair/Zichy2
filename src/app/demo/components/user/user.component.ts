import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { emailDomainValidator } from 'src/app/demo/utils/email-validator';
import { Observable } from 'rxjs';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { UserService } from '../../service/user.service';
import { RoleService } from '../../service/role.service';
import { ApiResponse } from '../../api/ApiResponse';
import { User } from '../../api/user';
import { Role } from '../../api/role';
import * as moment from 'moment';
moment.locale('hu')

@Component({
    templateUrl: './user.component.html',
    providers: [MessageService]
})

// Makes unsubscribe automatically, don't need to do manually in ngOnDestroy
// BUT!!! Don't delete ngOnDestroy, it has to stay here!
@AutoUnsubscribe()

export class UserComponent implements OnInit {

    loading: boolean = true;                     // Loading overlay trigger value
    tableItem: User = {};                        // One user object
    tableData: User[] = [];                      // Data set displayed in a table
    rowsPerPageOptions = [20, 50, 100];          // Possible rows per page
    rowsPerPage: number = 20;                    // Default rows per page
    totalRecords: number = 0;                    // Total number of rows in the table
    page: number = 0;                            // Current page
    sortField: string = '';                      // Current sort field
    sortOrder: number = 1;                       // Current sort order
    globalFilter: string = '';                   // Global filter
    filterValues: { [key: string]: string } = {} // Table filter conditions
    debounce: { [key: string]: any } = {}        // Search delay in filter field
    dialog: boolean = false;                     // Table item maintenance modal
    deleteDialog: boolean = false;               // Popup for deleting table item
    bulkDeleteDialog: boolean = false;           // Popup for deleting table items
    selected: User[] = [];                       // Table items chosen by user
    selectedUserRole: string;                    // User Role chosen by user
    roles: Role[] = []                            // Possible roles
    userForm: FormGroup;                         // Form for user registration and modification

    private userObs$: Observable<any> | undefined;
    private serviceMessageObs$: Observable<any> | undefined;

    constructor(
        public userService: UserService,
        public roleService: RoleService,
        private messageService: MessageService,
        private fb: FormBuilder) { }

    ngOnInit() {
        // User form
        this.userForm = this.fb.group({
            id: [''],
            username: [''],
            fullname: ['', Validators.required],
            user_rolesid: ['', [Validators.required]],
            email: ['', [Validators.required, emailDomainValidator()]],
            phone: ['', [Validators.required]],
            password: ['', [Validators.required]],
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

        // Users
        this.userObs$ = this.userService.userObs;
        this.userObs$.subscribe((data: ApiResponse) => {
            this.loading = false
            if (data) {
                this.tableData = data.rows || [];
                this.totalRecords = data.totalItems || 0;
                this.page = data.currentPage || 0;
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

                // Reset selected table Item(s)
                this.tableItem = {}
                this.selected = []

                // Query for data changes
                this.doQuery()
            }
        })
    }

    /**
     * Load filtered data into the Table
     * @returns
     */
    doQuery() {
        this.loading = true;

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
            const date = moment(event)
            const formattedDate = date.format('YYYY.MM.DD')
            filterValue = formattedDate
        } else {
            if (event && (event.value || event.target?.value)) {
                filterValue = event.value || event.target?.value
                filterValue = filterValue.toString()
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
        this.page = event.first! / event.rows!;
        this.rowsPerPage = event.rows ?? this.rowsPerPage;
        this.sortField = event.sortField ?? '';
        this.sortOrder = event.sortOrder ?? 1;
        this.globalFilter = event.globalFilter ?? '';
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
        this.userForm.reset()
        this.dialog = true
    }

    /**
     * Edit the User
     * @param user
     */
    edit(user: User) {
        this.userForm.patchValue(user)
        this.dialog = true
    }

    /**
     * Delete the User
     */
    delete() {
        this.loading = true;
        this.deleteDialog = false;
        this.userService.delete(this.tableItem)
    }

    /**
     * Delete selected Users
     */
    deleteSelected() {
        this.loading = true;
        this.bulkDeleteDialog = false;
        this.userService.bulkdelete(this.selected)
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

            // UPDATE
            if (formValues.id) {
                this.userService.update(formValues)
                // INSERT
            } else {
                this.userService.create(formValues)
            }
            this.dialog = false
        }
    }

    /**
     * Cancel saving the form
     */
    cancel() {
        this.userForm.reset()
        this.dialog = false
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
