import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BehaviorSubject, debounceTime, distinctUntilChanged, map, Observable, Subject } from 'rxjs';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { ReservationService } from '../../service/reservation.service';
import { UserService } from '../../service/user.service';
import { ResponsiveService } from '../../service/responsive.service';
import { ConferenceService } from '../../service/conference.service';
import { ApiResponse } from '../../api/ApiResponse';
import { Conference } from '../../api/conference';
import { Reservation } from '../../api/reservation';
import * as FileSaver from 'file-saver';
import * as moment from 'moment';
moment.locale('hu')

@Component({
    selector: 'reservation-component',
    templateUrl: './reservation.component.html',
    providers: [MessageService]
})

// Makes unsubscribe automatically, don't need to do manually in ngOnDestroy
// BUT!!! Don't delete ngOnDestroy, it has to stay here!
@AutoUnsubscribe()

export class ReservationComponent implements OnInit {

    loading: boolean = true                      // Loading overlay trigger value
    tableItem: Reservation = {}                         // One reservation object
    tableData: Reservation[] = []                       // Data set displayed in a table
    rowsPerPageOptions = [20, 50, 100, 200]      // Possible rows per page
    rowsPerPage: number = 20                     // Default rows per page
    totalRecords: number = 0                     // Total number of rows in the table
    page: number = 0                             // Current page
    sortField: string = 'reservationNum'                // Current sort field
    sortOrder: number = 1                        // Current sort order
    globalFilter: string = ''                    // Global filter
    filterValues: { [key: string]: string } = {} // Table filter conditions
    debounce: { [key: string]: any } = {}        // Search delay in filter field
    reservationForm: FormGroup                          // Form for reservation creation and modification
    originalFormValues: any                      // The original values ​​of the form
    sidebar: boolean = false                     // Table item maintenance sidebar
    deleteDialog: boolean = false                // Popup for deleting table item
    bulkDeleteDialog: boolean = false            // Popup for deleting table items
    selected: Reservation[] = []                        // Table items chosen by reservation
    canCreate: boolean = false                   // User has permission to create new reservation
    canEdit: boolean = false                     // User has permission to update reservation
    canDelete: boolean = false                   // User has permission to delete reservation
    isMobile: boolean = false                    // Mobile screen detection
    isOrganizer: boolean = false                 // User has organizer role
    occupancyFilter: any                         // TODO: Not used yet  
    selectedConferences: Conference[] = []       // Selected conferences
    numberOfBeds: number = 0                     // Number of beds
    statusOptions: any[] = []                   // Possible status options

    private initialFormValues = {
        id: null,
        reservationNum: '',
        reservationCode: '',
        beds: '',
        spareBeds: '',
        bathreservation: '',
        building: '',
        floor: '',
        bedType: '',
        climate: 0,
        familyReservation: 0,
        comment: '',
        extraBeds: 0
    }

    private isFormValid$: Observable<boolean>
    private formChanges$: Subject<void> = new Subject()
    private reservationObs$: Observable<any> | undefined
    private serviceMessageObs$: Observable<any> | undefined
    private conferenceMessageObs$: Observable<any> | undefined

    constructor(
        private reservationService: ReservationService,
        private userService: UserService,
        private conferenceService: ConferenceService,
        private messageService: MessageService,
        private responsiveService: ResponsiveService,
        private fb: FormBuilder) {

        // Reservation form fields and validators
        this.reservationForm = this.fb.group({
            id: [this.initialFormValues.id],
            reservationNum: [this.initialFormValues.reservationNum, Validators.required],
            reservationCode: [this.initialFormValues.reservationCode, Validators.required],
            beds: [this.initialFormValues.beds, Validators.required],
            spareBeds: [this.initialFormValues.spareBeds],
            bathreservation: [this.initialFormValues.bathreservation],
            building: [this.initialFormValues.building, Validators.required],
            floor: [this.initialFormValues.floor],
            bedType: [this.initialFormValues.bedType],
            climate: [this.initialFormValues.climate],
            familyReservation: [this.initialFormValues.familyReservation],
            comment: [this.initialFormValues.comment],
            extraBeds: [this.initialFormValues.extraBeds]
        })

        // Prepaid options
        this.statusOptions = [
            { name: 'Aktív', value: 'active' },
            { name: 'Lemondott', value: 'cancelled' },
            { name: 'Teljesített', value: 'completed' }
        ]

        this.isFormValid$ = new BehaviorSubject<boolean>(false)
    }

    ngOnInit() {
        // Permissions
        this.userService.hasRole(['Super Admin', 'Nagy Admin']).subscribe(canCreate => this.canCreate = canCreate)
        this.userService.hasRole(['Super Admin', 'Nagy Admin']).subscribe(canEdit => this.canEdit = canEdit)
        this.userService.hasRole(['Super Admin', 'Nagy Admin']).subscribe(canDelete => this.canDelete = canDelete)
        this.userService.hasRole(['Szervezo']).subscribe(isOrganizer => this.isOrganizer = isOrganizer)

        // Reservations
        this.reservationObs$ = this.reservationService.reservationObs
        this.reservationObs$.subscribe((data: ApiResponse) => {
            this.loading = false
            if (data) {
                this.tableData = data.rows || []
                this.totalRecords = data.totalItems || 0
                this.page = data.currentPage || 0
                this.numberOfBeds = data.numberOfBeds || 0
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
            map(() => this.reservationForm.valid)
        )

        // Message
        this.serviceMessageObs$ = this.reservationService.messageObs
        this.conferenceMessageObs$ = this.conferenceService.messageObs
        this.serviceMessageObs$.subscribe(message => this.handleMessage(message))
        this.conferenceMessageObs$.subscribe(message => this.handleMessage(message))
    }

    // Getters for form validation
    get id() { return this.reservationForm.get('id') }
    get reservationNum() { return this.reservationForm.get('reservationNum') }
    get reservationCode() { return this.reservationForm.get('reservationCode') }
    get beds() { return this.reservationForm.get('beds') }
    get spareBeds() { return this.reservationForm.get('spareBeds') }
    get bathreservation() { return this.reservationForm.get('bathreservation') }
    get building() { return this.reservationForm.get('building') }
    get floor() { return this.reservationForm.get('floor') }
    get bedType() { return this.reservationForm.get('bedType') }
    get climate() { return this.reservationForm.get('climate') }
    get familyReservation() { return this.reservationForm.get('familyReservation') }
    get comment() { return this.reservationForm.get('comment') }
    get extraBeds() { return this.reservationForm.get('extraBeds') }

    /**
     * Load filtered data into the Table
     * @returns
     */
    doQuery() {
        // Organizer need select conference
        if (this.isOrganizer && !this.selectedConferences.length) return

        this.loading = true
        this.filterValues['conferences'] = this.selectedConferences.map(conference => conference.id).join(',')

        const filters = Object.keys(this.filterValues)
            .map(key => this.filterValues[key].length > 0 ? `${key}=${this.filterValues[key]}` : '')
        const queryParams = filters.filter(x => x.length > 0).join('&')

        if (this.globalFilter !== '') {
            return this.reservationService.getBySearch(this.globalFilter, { sortField: this.sortField, sortOrder: this.sortOrder })
        }

        return this.reservationService.get(this.page, this.rowsPerPage, { sortField: this.sortField, sortOrder: this.sortOrder }, queryParams)
    }

    /**
     * Filter table by column
     * @param event
     * @param field
     */
    onFilter(event: any, field: string) {
        // Organizer need select conference
        if (this.isOrganizer && !this.selectedConferences) return

        const noWaitFields: string[] = ['conferenceName', 'building', 'bedType', 'spareBeds']
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
     * Create new Reservation
     */
    create() {
        this.reservationForm.reset(this.initialFormValues)
        this.sidebar = true
    }

    /**
     * Edit the Reservation
     * @param reservation
     */
    edit(reservation: Reservation) {
        this.reservationForm.reset(this.initialFormValues)
        this.reservationForm.patchValue(reservation)
        this.originalFormValues = this.reservationForm.value
        this.sidebar = true
    }

    /**
     * Delete the Reservation
     */
    delete() {
        this.loading = true
        this.deleteDialog = false
        this.reservationService.delete(this.tableItem)
    }

    /**
     * Delete selected Reservations
     */
    deleteSelected() {
        this.loading = true
        this.bulkDeleteDialog = false
        this.reservationService.bulkdelete(this.selected)
    }

    /**
     * Saving the form
     */
    save() {
        if (this.reservationForm.valid) {
            this.loading = true
            const formValues = this.reservationForm.value

            // Create
            if (!formValues.id) {
                this.reservationService.create(formValues)

                // Update
            } else {
                this.reservationService.update(formValues)
            }

            this.sidebar = false
        }
    }

    /**
     * Cancel saving the form
     */
    cancel() {
        this.reservationForm.reset(this.originalFormValues)
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

    onConferenceRemove(conference: any, reservation: any) {
        // this.conferenceService.removeReservationsFromConference(conference.id, [reservation.id])
    }

    /**
     * Exports the currently selected table rows (or filtered rows, or all rows if no selection is made) to an Excel file.
     * The file is named "reservations.xlsx" and is saved in the user's Downloads folder.
     * The export uses the xlsx library and is done asynchronously.
     * @export
     */
    exportExcel() {
        import("xlsx").then(xlsx => {
            // Hungarian header
            const headerMap = [
                { key: 'reservationNum', label: 'Szoba-szám' },
                { key: 'reservationCode', label: 'Szoba kód' },
                { key: 'beds', label: 'Ágyak száma' },
                { key: 'spareBeds', label: 'Matrac / gyerekágy' },
                { key: 'building', label: 'Épület / folyosó' },
                { key: 'bedType', label: 'Ágy típus' },
                { key: 'bathreservation', label: 'Fürdőszoba' },
                { key: 'comment', label: 'Megjegyzés' }
            ]

            let rows = this.selected.length > 0 ? this.selected : this.tableData
        
            // Extract only the desired fields and Hungarian headers
            const data = rows.map((row: any) => {
                let obj: any = {}
                headerMap.forEach(col => {
                    obj[col.label] = row[col.key] ?? ''
                })
                return obj
            })

            // The first row will be the Hungarian headers (by label)
            const worksheet = xlsx.utils.json_to_sheet(data, { header: headerMap.map(h => h.label) })
            const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] }
            const excelBuffer = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' })
            this.saveAsExcelFile(excelBuffer, "reservations")
        })
    }

    /**
     * Saves the provided buffer as an Excel file with the specified file name.
     * The file is saved in the 'xlsx' format and is named with a timestamp suffix.
     *
     * @param buffer - The data buffer to be saved as an Excel file.
     * @param fileName - The base name of the file to be saved, without extension.
     */
    saveAsExcelFile(buffer: any, fileName: string): void {
        let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8'
        let EXCEL_EXTENSION = '.xlsx'
        const data: Blob = new Blob([buffer], {
            type: EXCEL_TYPE
        })
        FileSaver.saveAs(data, fileName + '_export_' + moment().format('YYYYMMDD') + EXCEL_EXTENSION)
    }

    // Don't delete this, its needed from a performance point of view,
    ngOnDestroy(): void {
    }
}
