import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BehaviorSubject, debounceTime, distinctUntilChanged, map, Observable, Subject } from 'rxjs';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { RoomService } from '../../service/room.service';
import { UserService } from '../../service/user.service';
import { ResponsiveService } from '../../service/responsive.service';
import { ApiResponse } from '../../api/ApiResponse';
import { Room } from '../../api/room';
import * as moment from 'moment';
moment.locale('hu')

@Component({
    templateUrl: './room.component.html',
    styleUrls: ['./room.component.scss'],
    providers: [MessageService]
})

// Makes unsubscribe automatically, don't need to do manually in ngOnDestroy
// BUT!!! Don't delete ngOnDestroy, it has to stay here!
@AutoUnsubscribe()

export class RoomComponent implements OnInit {

    loading: boolean = true                      // Loading overlay trigger value
    tableItem: Room = {}                         // One room object
    tableData: Room[] = []                       // Data set displayed in a table
    rowsPerPageOptions = [20, 50, 100]           // Possible rows per page
    rowsPerPage: number = 20                     // Default rows per page
    totalRecords: number = 0                     // Total number of rows in the table
    page: number = 0                             // Current page
    sortField: string = ''                       // Current sort field
    sortOrder: number = 1                        // Current sort order
    globalFilter: string = ''                    // Global filter
    filterValues: { [key: string]: string } = {} // Table filter conditions
    debounce: { [key: string]: any } = {}        // Search delay in filter field
    roomForm: FormGroup                          // Form for room creation and modification
    originalFormValues: any                      // The original values ​​of the form
    sidebar: boolean = false                     // Table item maintenance sidebar
    deleteDialog: boolean = false                // Popup for deleting table item
    bulkDeleteDialog: boolean = false            // Popup for deleting table items
    selected: Room[] = []                        // Table items chosen by room
    canCreate: boolean = false                   // User has permission to create new room
    canEdit: boolean = false                     // User has permission to update room
    canDelete: boolean = false                   // User has permission to delete room
    colors: any = {}                             // PrimeNG colors
    isMobile: boolean = false                    // Mobile screen detection

    private isFormValid$: Observable<boolean>
    private formChanges$: Subject<void> = new Subject()
    private roomObs$: Observable<any> | undefined
    private serviceMessageObs$: Observable<any> | undefined

    constructor(
        private roomService: RoomService,
        private userService: UserService,
        private messageService: MessageService,
        private responsiveService: ResponsiveService,
        private fb: FormBuilder) {

        // Room form fields and validators
        this.roomForm = this.fb.group({
            id: [''],
            roomNum: ['', Validators.required],
            roomCode: ['', Validators.required],
            beds: ['', Validators.required],
            matrace: ['', []],
            bathroom: ['', []],
            building: ['', []],
            bedType: ['', []],
            comment: ['', []],
        })

        this.isFormValid$ = new BehaviorSubject<boolean>(false)
    }

    ngOnInit() {
        // Permissions
        this.userService.hasRole(['Super Admin', 'Nagy Admin']).subscribe(canCreate => this.canCreate = canCreate)
        this.userService.hasRole(['Super Admin', 'Nagy Admin']).subscribe(canEdit => this.canEdit = canEdit)
        this.userService.hasRole(['Super Admin', 'Nagy Admin']).subscribe(canDelete => this.canDelete = canDelete)

        // Rooms
        this.roomObs$ = this.roomService.roomObs
        this.roomObs$.subscribe((data: ApiResponse) => {
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
            map(() => this.roomForm.valid)
        )

        // Message
        this.serviceMessageObs$ = this.roomService.messageObs
        this.serviceMessageObs$.subscribe(message => this.handleMessage(message))
    }

    // Getters for form validation
    get id() { return this.roomForm.get('id') }
    get roomNum() { return this.roomForm.get('roomNum') }
    get roomCode() { return this.roomForm.get('roomCode') }
    get beds() { return this.roomForm.get('beds') }
    get matrace() { return this.roomForm.get('matrace') }
    get bathroom() { return this.roomForm.get('bathroom') }
    get building() { return this.roomForm.get('building') }
    get bedType() { return this.roomForm.get('bedType') }
    get comment() { return this.roomForm.get('comment') }

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
            return this.roomService.getBySearch(this.globalFilter, { sortField: this.sortField, sortOrder: this.sortOrder })
        }

        return this.roomService.get(this.page, this.rowsPerPage, { sortField: this.sortField, sortOrder: this.sortOrder }, queryParams)
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
     * Create new Room
     */
    create() {
        this.roomForm.reset()
        this.sidebar = true
    }

    /**
     * Edit the Room
     * @param room
     */
    edit(room: Room) {
        this.roomForm.reset()
        this.roomForm.patchValue(room)
        this.originalFormValues = this.roomForm.value
        this.sidebar = true
    }

    /**
     * Delete the Room
     */
    delete() {
        this.loading = true
        this.deleteDialog = false
        this.roomService.delete(this.tableItem)
    }

    /**
     * Delete selected Rooms
     */
    deleteSelected() {
        this.loading = true
        this.bulkDeleteDialog = false
        this.roomService.bulkdelete(this.selected)
    }

    /**
     * Saving the form
     */
    save() {
        if (this.roomForm.valid) {
            this.loading = true
            const formValues = this.roomForm.value

            // Create
            if (!formValues.id) {
                this.roomService.create(formValues)

            // Update
            } else {
                this.roomService.update(formValues)
            }

            this.sidebar = false
        }
    }

    /**
     * Cancel saving the form
     */
    cancel() {
        this.roomForm.reset(this.originalFormValues)
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

    getRoomTypeByCode(code: string, beds: number) { 
        return this.roomService.getRoomTypeByCode(code, beds) 
    }

    // Don't delete this, its needed from a performance point of view,
    ngOnDestroy(): void {
    }
}
