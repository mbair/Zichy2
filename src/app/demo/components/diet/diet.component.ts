import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BehaviorSubject, debounceTime, distinctUntilChanged, map, Observable, Subject } from 'rxjs';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { DietService } from '../../service/diet.service';
import { UserService } from '../../service/user.service';
import { ColorService } from '../../service/color.service';
import { ApiResponse } from '../../api/ApiResponse';
import { Diet } from '../../api/diet';
import * as moment from 'moment';
moment.locale('hu')

@Component({
    templateUrl: './diet.component.html',
    providers: [MessageService]
})

// Makes unsubscribe automatically, don't need to do manually in ngOnDestroy
// BUT!!! Don't delete ngOnDestroy, it has to stay here!
@AutoUnsubscribe()

export class DietComponent implements OnInit {

    loading: boolean = true                      // Loading overlay trigger value
    tableItem: Diet = {}                         // One diet object
    tableData: Diet[] = []                       // Data set displayed in a table
    rowsPerPageOptions = [20, 50, 100]           // Possible rows per page
    rowsPerPage: number = 20                     // Default rows per page
    totalRecords: number = 0                     // Total number of rows in the table
    page: number = 0                             // Current page
    sortField: string = ''                       // Current sort field
    sortOrder: number = 1                        // Current sort order
    globalFilter: string = ''                    // Global filter
    filterValues: { [key: string]: string } = {} // Table filter conditions
    debounce: { [key: string]: any } = {}        // Search delay in filter field
    dietForm: FormGroup                          // Form for diet creation and modification
    originalFormValues: any                      // The original values ​​of the form
    sidebar: boolean = false                     // Table item maintenance sidebar
    deleteDialog: boolean = false                // Popup for deleting table item
    bulkDeleteDialog: boolean = false            // Popup for deleting table items
    selected: Diet[] = []                        // Table items chosen by diet
    canCreate: boolean = false                   // User has permission to create new diet
    canEdit: boolean = false                     // User has permission to update diet
    canDelete: boolean = false                   // User has permission to delete diet
    colors: any = {}                             // PrimeNG colors

    private isFormValid$: Observable<boolean>
    private formChanges$: Subject<void> = new Subject()
    private dietObs$: Observable<any> | undefined
    private serviceMessageObs$: Observable<any> | undefined

    constructor(
        private dietService: DietService,
        private userService: UserService,
        private colorService: ColorService,
        private messageService: MessageService,
        private fb: FormBuilder) {

        // Diet form fields and validators
        this.dietForm = this.fb.group({
            id: [''],
            name: ['', Validators.required],
            color: ['', Validators.required],
            enabled: ['', []],
        })

        this.isFormValid$ = new BehaviorSubject<boolean>(false)
    }

    ngOnInit() {
        // Permissions
        this.userService.hasRole(['Super Admin', 'Nagy Admin']).subscribe(canCreate => this.canCreate = canCreate)
        this.userService.hasRole(['Super Admin', 'Nagy Admin']).subscribe(canEdit => this.canEdit = canEdit)
        this.userService.hasRole(['Super Admin', 'Nagy Admin']).subscribe(canDelete => this.canDelete = canDelete)

        // Diets
        this.dietObs$ = this.dietService.dietObs;
        this.dietObs$.subscribe((data: ApiResponse) => {
            this.loading = false
            if (data) {
                this.tableData = data.rows || []
                this.totalRecords = data.totalItems || 0
                this.page = data.currentPage || 0
            }
        })

        // Form validation
        this.isFormValid$ = this.formChanges$.pipe(
            debounceTime(300),
            distinctUntilChanged(),
            map(() => this.dietForm.valid)
        )

        // Message
        this.serviceMessageObs$ = this.dietService.messageObs
        this.serviceMessageObs$.subscribe(message => this.handleMessage(message))
    }

    // Getters for form validation
    get name() { return this.dietForm.get('name') }
    get color() { return this.dietForm.get('color') }
    get enabled() { return this.dietForm.get('enabled') }

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
            return this.dietService.getBySearch(this.globalFilter, { sortField: this.sortField, sortOrder: this.sortOrder })
        }

        return this.dietService.get(this.page, this.rowsPerPage, { sortField: this.sortField, sortOrder: this.sortOrder }, queryParams)
    }

    /**
     * Filter table by column
     * @param event
     * @param field
     */
    onFilter(event: any, field: string) {
        const noWaitFields: string[] = []
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
     * Create new Diet
     */
    create() {
        this.dietForm.reset()
        this.sidebar = true
    }

    /**
     * Edit the Diet
     * @param diet
     */
    edit(diet: Diet) {
        this.dietForm.reset()
        this.dietForm.patchValue(diet)
        this.originalFormValues = this.dietForm.value
        this.sidebar = true
    }

    /**
     * Delete the Diet
     */
    delete() {
        this.loading = true
        this.deleteDialog = false
        this.dietService.delete(this.tableItem)
    }

    /**
     * Delete selected Diets
     */
    deleteSelected() {
        this.loading = true
        this.bulkDeleteDialog = false
        this.dietService.bulkdelete(this.selected)
    }

    /**
     * Saving the form
     */
    save() {
        if (this.dietForm.valid) {
            this.loading = true
            const formValues = this.dietForm.value

            // If the password field is empty, it is deleted from the object
            if (!formValues.password) {
                delete formValues.password
            }

            // Create
            if (!formValues.id) {
                this.dietService.create(formValues)

            // Update
            } else {
                this.dietService.update(formValues)
            }

            this.sidebar = false
        }
    }

    /**
     * Cancel saving the form
     */
    cancel() {
        this.dietForm.reset(this.originalFormValues)
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

    getStyleByColor(color: string) {
        return this.colorService.getStyleByColor(color)
    }

    // Don't delete this, its needed from a performance point of view,
    ngOnDestroy(): void {
    }
}
