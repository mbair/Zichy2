import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { LogService } from 'src/app/demo/service/log.service';
import { UserService } from '../../service/user.service';
import { ApiResponse } from '../../api/ApiResponse';
import { Log } from '../../api/log';
import { User } from '../../api/user';
import * as moment from 'moment';
moment.locale('hu')

@Component({
    templateUrl: './logs.component.html',
    providers: [MessageService]
})

// Makes unsubscribe automatically, don't need to do manually in ngOnDestroy
// BUT!!! Don't delete ngOnDestroy, it has to stay here!
@AutoUnsubscribe()

export class LogsComponent implements OnInit {

    loading: boolean = true;                       // Loading overlay trigger value
    tableItem: Log = {};                           // One log object
    tableData: Log[] = [];                         // Data set displayed in a table
    rowsPerPageOptions = [20, 50, 100];            // Possible rows per page
    rowsPerPage: number = 20;                      // Default rows per page
    totalRecords: number = 0;                      // Total number of rows in the table
    page: number = 0;                              // Current page
    sortField: string = '';                        // Current sort field
    sortOrder: number = 1;                         // Current sort order
    globalFilter: string = '';                     // Global filter
    filterValues: { [key: string]: string } = {}   // Table filter conditions
    debounce: { [key: string]: any } = {}          // Search delay in filter field
    dialog: boolean = false;                       // Table item maintenance modal
    deleteDialog: boolean = false;                 // Popup for deleting table item
    bulkDeleteDialog: boolean = false;             // Popup for deleting table items
    selected: Log[] = [];                          // Table items chosen by user
    selectedUser: User | undefined;                // User chosen by user
    users: User[] = []                             // Possible users
    action_types: any[] = []                       // Possible action types
    modules: any[] = []                            // Possible modules
    statuses: any[] = []                           // Possible HTTP statuses
    logForm: FormGroup;                            // Form for log creation and modification

    private logObs$: Observable<any> | undefined;
    private serviceMessageObs$: Observable<any> | undefined;

    constructor(private logService: LogService,
        public userService: UserService,
        private messageService: MessageService,
        private fb: FormBuilder) { }

    ngOnInit() {
        // User form
        this.logForm = this.fb.group({
            id: [''],
            action_type: [''],
            fullname: ['', Validators.required],
            table_name: ['', [Validators.required]],
            original_data: ['', [Validators.required]],
            new_data: ['', [Validators.required]],
            response_data: ['', [Validators.required]],
            user_fullname: ['', [Validators.required]],
            user_email: ['', [Validators.required]],
            status: ['', [Validators.required]],
            userid: ['', [Validators.required]],
        })

        // Logs
        this.logObs$ = this.logService.logObs;
        this.logObs$.subscribe((data: ApiResponse) => {
            this.loading = false
            if (data) {
                this.tableData = data.rows || [];
                this.totalRecords = data.totalItems || 0;
                this.page = data.currentPage || 0;
            }
        })

        // Get users for selector
        this.userService.getUsersForSelector().subscribe({
            next: (data) => {
                this.users = data
            }
        })

        // Modules for selector
        this.modules = [
            { name: 'Ételpult', code: 'food_counter', icon: 'pi pi-tablet' },
            { name: 'Konferenciák', code: 'conference', icon: 'pi pi-calendar' },
            { name: 'Vendégek', code: 'guest', icon: 'pi pi-user' },
            { name: 'Szobák', code: 'room', icon: 'pi pi-building' },
            { name: 'Címkék', code: 'rfid', icon: 'pi pi-tags' },
            { name: 'Étrendek', code: 'diet', icon: 'pi pi-pencil' },
            { name: 'Felhasználók', code: 'users', icon: 'pi pi-users' },
            { name: 'Logok', code: 'logs', icon: 'pi pi-list' },
        ]

        // Action types for selector
        this.action_types = [
            'create',
            'update',
            'delete',
            'scanned code',
            'assign tag',
            'unassign',
            'same code',
            'already received food',
        ]

        // HTTP statuses for selector
        this.statuses = [
            { name: '200 - OK', code: '200', icon: 'pi pi-check' },
            { name: '201 - Created', code: '201', icon: 'pi pi-check' },
            { name: '400 - Bad request', code: '400', icon: 'pi pi-times' },
            { name: '500 - Internal server Error', code: '500', icon: 'pi pi-times' },
        ]

        // Message
        this.serviceMessageObs$ = this.logService.messageObs;
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
            return this.logService.getBySearch(this.globalFilter, { sortField: this.sortField, sortOrder: this.sortOrder })
        }

        return this.logService.get(this.page, this.rowsPerPage, { sortField: this.sortField, sortOrder: this.sortOrder }, queryParams)
    }

    /**
     * Filter table by column
     * @param event
     * @param field
     */
    onFilter(event: any, field: string) {
        const noWaitFields = ['action_type', 'status', 'userid', 'table_name']
        let filterValue = ''

        // Calendar date as String
        if (event instanceof Date) {
            const date = moment(event)
            const formattedDate = date.format('YYYY.MM.DD')
            filterValue = formattedDate
        } else {
            if (event && (event.value || event.target?.value)) {
                if (typeof event.value === 'object') {
                    filterValue = event.value.code
                } else {
                    filterValue = event.value || event.target?.value
                }
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
     * User selected
     * @param event
     */
    onUserSelected(event: any) {
        this.selectedUser = this.users.find(user => user.id === event.value)
    }

    /**
     * Create new Log
     */
    create() {
        this.logForm.reset()
        this.dialog = true
    }

    /**
     * Edit the Log
     * @param user
     */
    edit(log: Log) {
        this.logForm.patchValue(log)
        this.dialog = true
    }

    /**
     * Delete the Log
     */
    delete() {
        this.loading = true;
        this.deleteDialog = false;
        this.logService.delete(this.tableItem)
    }

    /**
     * Delete selected Logs
     */
    deleteSelected() {
        this.loading = true;
        this.bulkDeleteDialog = false;
        this.logService.bulkdelete(this.selected)
    }

    /**
     * Saving the form
     */
    save() {
        if (this.logForm.valid) {
            const formValues = this.logForm.value

            // UPDATE
            if (formValues.id) {
                this.logService.update(formValues)
                // INSERT
            } else {
                this.logService.create(formValues)
            }
            this.dialog = false
        }
    }

    /**
     * Cancel saving the form
     */
    cancel() {
        this.logForm.reset()
        this.dialog = false
    }

    /**
     * Get Status by code
     * @param code
     * @returns
     */
    getStatusByCode(code: string) {
        let status = this.statuses.find(s => s.code === code)
        return status ? status.name : null
    }

    /**
     * Get Module by Table name
     * @param tableName
     * @returns
     */
    getModuleByTableName(tableName: string) {
        let module = this.modules.find(mod => mod.code === tableName)
        return module ? module : null
    }

    /**
     * Transform a table from horizontal to vertical
     * @param obj
     * @returns
     */
    transformData(obj: any): any {
        if (obj && this.isValidJSON(obj)) {
            const data = JSON.parse(obj)
            const keys = Object.keys(data)

            return keys.map(key => {
                return { key: key, value: data[key] }
            })
        }
    }

    /**
     * JSON validator
     * @param str
     * @returns
     */
    isValidJSON(str: string): boolean {
        try {
            JSON.parse(str)
            return true
        } catch (e) {
            return false
        }
    }

    canRowBeExpanded(rowData: any): boolean {
        return rowData.expandable
    }

    // Don't delete this, its needed from a performance point of view,
    ngOnDestroy(): void {
    }
}
