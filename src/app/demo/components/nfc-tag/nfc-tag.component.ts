import { Component, OnInit, HostListener } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BehaviorSubject, debounceTime, distinctUntilChanged, map, Observable, Subject } from 'rxjs';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { TagService } from '../../service/tag.service';
import { UserService } from '../../service/user.service';
import { ResponsiveService } from '../../service/responsive.service';
import { ApiResponse } from '../../api/ApiResponse';
import { Tag } from '../../api/tag';
import * as moment from 'moment';
moment.locale('hu')

@Component({
    templateUrl: './nfc-tag.component.html',
    providers: [MessageService]
})

// Makes unsubscribe automatically, don't need to do manually in ngOnDestroy
// BUT!!! Don't delete ngOnDestroy, it has to stay here!
@AutoUnsubscribe()

export class NFCTagComponent implements OnInit {

    loading: boolean = true                      // Loading overlay trigger value
    tableItem: Tag = {}                          // One tag object
    tableData: Tag[] = []                        // Data set displayed in a table
    rowsPerPageOptions = [20, 50, 100]           // Possible rows per page
    rowsPerPage: number = 20                     // Default rows per page
    totalRecords: number = 0                     // Total number of rows in the table
    page: number = 0                             // Current page
    sortField: string = ''                       // Current sort field
    sortOrder: number = 1                        // Current sort order
    globalFilter: string = ''                    // Global filter
    filterValues: { [key: string]: string } = {} // Table filter conditions
    nfcFilterValue: any                         // Store for RFID filter value
    debounce: { [key: string]: any } = {}        // Search delay in filter field
    tagForm: FormGroup                           // Form for creating new tag
    originalFormValues: any                      // Original form values
    sidebar: boolean = false                     // Popup for creating new tag
    deleteDialog: boolean = false                // Popup for deleting table item
    bulkDeleteDialog: boolean = false            // Popup for deleting table items
    selected: Tag[] = []                         // Table items chosen by user
    selectedTagColor: any | undefined;           // Tag color chosen by user
    scanTemp: string = ''                        // Temporary storage used during NFC reading
    scannedCode: string = ''                     // Scanned Tag Id
    canCreate: boolean = false                   // User has permission to create new diet
    canEdit: boolean = false                     // User has permission to update diet
    canDelete: boolean = false                   // User has permission to delete diet
    colors: any = {}                             // PrimeNG colors
    isMobile: boolean = false                    // Mobile screen detection

    private isFormValid$: Observable<boolean>
    private formChanges$: Subject<void> = new Subject()
    private tagObs$: Observable<any> | undefined
    private serviceMessageObs$: Observable<any> | undefined

    constructor(
        private tagService: TagService,
        private userService: UserService,
        private messageService: MessageService,
        private responsiveService: ResponsiveService,
        private fb: FormBuilder) { 

            // Diet form fields and validators
        this.tagForm = this.fb.group({
            id: [''],
            rfid: ['', Validators.required],
            color: ['', Validators.required],
            enabled: [true, []],
        })

        this.isFormValid$ = new BehaviorSubject<boolean>(false)
    }

    ngOnInit() {
        // Permissions
        this.userService.hasRole(['Super Admin', 'Nagy Admin']).subscribe(canCreate => this.canCreate = canCreate)
        this.userService.hasRole(['Super Admin', 'Nagy Admin']).subscribe(canEdit => this.canEdit = canEdit)
        this.userService.hasRole(['Super Admin', 'Nagy Admin']).subscribe(canDelete => this.canDelete = canDelete)

        // Diets
        this.tagObs$ = this.tagService.tagObs
        this.tagObs$.subscribe((data: ApiResponse) => {
            this.loading = false
            if (data) {
                this.tableData = data.rows || []
                this.totalRecords = data.totalItems || 0
                this.page = data.currentPage || 0
            }
        })

        // Monitor the changes of the window size
        this.responsiveService.isMobile$.subscribe((isMobile) => {
            this.isMobile = isMobile
        })

        // Form validation
        this.isFormValid$ = this.formChanges$.pipe(
            debounceTime(300),
            distinctUntilChanged(),
            map(() => this.tagForm.valid)
        )

        // Message
        this.serviceMessageObs$ = this.tagService.messageObs
        this.serviceMessageObs$.subscribe(message => this.handleMessage(message))
    }

    // Getters for form validation
    get id() { return this.tagForm.get('id') }
    get rfid() { return this.tagForm.get('rfid') }
    get color() { return this.tagForm.get('color') }
    get enabled() { return this.tagForm.get('enabled') }

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
            return this.tagService.getBySearch(this.globalFilter, { sortField: this.sortField, sortOrder: this.sortOrder })
        }

        return this.tagService.get(this.page, this.rowsPerPage, { sortField: this.sortField, sortOrder: this.sortOrder }, queryParams)
    }

    /**
     * Filter table by column
     * @param event
     * @param field
     */
    onFilter(event: any, field: string) {
        const noWaitFields: string[] = ['color', 'enabled']
        let filterValue = ''

        // Calendar date as String
        if (event instanceof Date) {
            const date = moment(event)
            const formattedDate = date.format('YYYY.MM.DD')
            filterValue = formattedDate
        } else {
            if (event && (event.value || event.target?.value)) {
                if (field == "rfid") {
                    filterValue = event.target?.value.replaceAll('ö', '0').replaceAll('Ö', '0')
                    this.nfcFilterValue = filterValue
                } else {
                    filterValue = event.value || event.target?.value
                    filterValue = filterValue.toString()
                }
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
     * Create new Tag
     */
    create() {
        this.tagForm.reset()
        this.sidebar = true
    }

    /**
     * Edit the Tag
     * @param tag
     */
    edit(tag: Tag) {
        this.tagForm.reset()
        this.tagForm.patchValue(tag)
        this.originalFormValues = this.tagForm.value
        this.sidebar = true
    }

    /**
     * Delete the Tag
     */
    delete() {
        this.loading = true
        this.deleteDialog = false
        this.tagService.delete(this.tableItem)
    }

    /**
     * Delete selected Tags
     */
    deleteSelected() {
        this.loading = true
        this.bulkDeleteDialog = false
        this.tagService.bulkdelete(this.selected)
    }

    /**
     * Saving the form
     */
    save() {
        if (this.tagForm.valid) {
            this.loading = true
            const formValues = this.tagForm.value

            // Create
            if (!formValues.id) {
                this.tagService.create(formValues)

            // Update
            } else {
                this.tagService.update(formValues)
            }

            this.sidebar = false
        }
    }

    /**
     * Cancel saving the form
     */
    cancel() {
        this.tagForm.reset(this.originalFormValues)
    }

    @HostListener('window:keypress', ['$event'])
    keyEvent(event: KeyboardEvent): void {
        if (event.key === 'Enter') {
            // The QR/Bar code is ready here
            // Do something here with the scanned code
            this.scannedCode = this.scanTemp

            // If the sidebar is open, update the form
            if (this.sidebar === true) {
                
                // Patch the form with the scanned code
                setTimeout(() => {
                    if (this.tagForm.get('rfid')) {
                        this.tagForm.patchValue({ rfid: this.scannedCode })
                    } else {
                        console.warn('RFID form control is not initialized yet.')
                    }
                })

            // If the sidebar is closed, filter for the scanned code
            } else {
                this.nfcFilterValue = this.scannedCode
                this.onFilter({ target: { value: this.scannedCode } }, 'rfid')
            }
            
            this.scanTemp = ''
            console.log('this.scannedCode', this.scannedCode)
        } else {
            if (event.key === 'ö' || event.key === 'Ö') {
                this.scanTemp += '0'
            }
            else if (/^[0-9]$/i.test(event.key)) {
                this.scanTemp += event.key
            }
            else {
                return
            }
        }
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

    // Don't delete this, its needed from a performance point of view,
    ngOnDestroy(): void {
    }
}
