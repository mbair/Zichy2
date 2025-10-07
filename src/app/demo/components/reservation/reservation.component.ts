import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { auditTime, BehaviorSubject, debounceTime, distinctUntilChanged, map, Observable, Subject, Subscription, switchMap, filter } from 'rxjs';
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
import { Room, RoomFilter } from '../../api/room';
import { Guest } from '../../api/guest';
import { dateRangeValidator } from '../../utils/date-range-validator';
import { distinctByIds } from '../../utils/rx-ops';
import { ChangeSource, ConferenceSelectorComponent } from '../../selectors/conference-selector/conference-selector.component';
import * as FileSaver from 'file-saver';
import * as moment from 'moment';
moment.locale('hu')

type SortDir = 1 | -1

@Component({
    selector: 'reservation-component',
    templateUrl: './reservation.component.html',
    providers: [MessageService]
})

// Makes unsubscribe automatically, don't need to do manually in ngOnDestroy
// BUT!!! Don't delete ngOnDestroy, it has to stay here!
@AutoUnsubscribe()

export class ReservationComponent implements OnInit {
    @ViewChild(ConferenceSelectorComponent) conferenceSelector!: ConferenceSelectorComponent;
    conferenceSelectorComponent!: ConferenceSelectorComponent;

    loading: boolean = true                      // Loading overlay trigger value
    tableItem: Reservation = {}                  // One reservation object
    tableData: Reservation[] = []                // Data set displayed in a table
    rowsPerPageOptions = [20, 50, 100, 200]      // Possible rows per page
    rowsPerPage: number = 20                     // Default rows per page
    totalRecords: number = 0                     // Total number of rows in the table
    page: number = 0                             // Current page
    sortField: string = 'id'                     // Current sort field
    sortOrder: SortDir = 1                       // Current sort order
    globalFilter: string = ''                    // Global filter
    filterValues: { [key: string]: string } = {} // Table filter conditions
    debounce: { [key: string]: any } = {}        // Search delay in filter field
    reservationForm: FormGroup                   // Form for reservation creation and modification
    originalFormValues: any                      // The original values ​​of the form
    sidebar: boolean = false                     // Table item maintenance sidebar
    deleteDialog: boolean = false                // Popup for deleting table item
    bulkDeleteDialog: boolean = false            // Popup for deleting table items
    selected: Reservation[] = []                 // Table items chosen by reservation
    canCreate: boolean = false                   // User has permission to create new reservation
    canEdit: boolean = false                     // User has permission to update reservation
    canDelete: boolean = false                   // User has permission to delete reservation
    isMobile: boolean = false                    // Mobile screen detection
    isOrganizer: boolean = false                 // User has organizer role
    selectedConferences: Conference[] = []       // Selected conferences
    numberOfBeds: number = 0                     // Number of beds

    preselectConferenceId?: number
    conferenceStart: Date | null = null
    conferenceEnd: Date | null = null

    roomFilter: RoomFilter = { enabled: true }
    guestFilter: RoomFilter = { enabled: true }

    suppressEmits = false;        // Guard: ignore programmatic changes

    private initialFormValues = {
        id: null,
        room: null,
        room_id: null,
        conference: null,
        conference_id: null,
        startDate: '',
        endDate: '',
        status: 'confirmed',
        notes: '',
        guests: [],
        guestIds: [],
    }

    private readonly INITIAL_FORM_STATE_CLOSED = {
        id: { value: null, disabled: false },
        room: { value: null, disabled: true },              // UI control (MultiSelect)
        room_id: { value: null, disabled: false },          // backend id
        conference: { value: [], disabled: false },         // UI control (MultiSelect)
        conference_id: { value: null, disabled: false },
        startDate: { value: null, disabled: true },
        endDate: { value: null, disabled: true },
        status: { value: 'confirmed', disabled: false },
        notes: { value: '', disabled: false },
        guests: { value: [], disabled: true },              // UI control (MultiSelect)
        guestIds: { value: [], disabled: false }
    }

    private query$ = new Subject<{ force?: boolean }>()
    private querySub?: Subscription
    private isFormValid$: Observable<boolean>
    private formChanges$: Subject<void> = new Subject()
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
            id: [this.INITIAL_FORM_STATE_CLOSED.id],
            room: [{ value: this.INITIAL_FORM_STATE_CLOSED.room, disabled: true }, Validators.required], // UI
            room_id: [this.INITIAL_FORM_STATE_CLOSED.room_id, Validators.required],
            conference: [this.INITIAL_FORM_STATE_CLOSED.conference, Validators.required], // UI
            conference_id: [this.INITIAL_FORM_STATE_CLOSED.conference_id, Validators.required],                           // Backend
            startDate: [{ value: this.INITIAL_FORM_STATE_CLOSED.startDate, disabled: true }, Validators.required],
            endDate: [{ value: this.INITIAL_FORM_STATE_CLOSED.endDate, disabled: true }, Validators.required],
            status: [this.INITIAL_FORM_STATE_CLOSED.status, Validators.required],
            notes: [this.INITIAL_FORM_STATE_CLOSED.notes],
            guests: [{ value: this.INITIAL_FORM_STATE_CLOSED.guests, disabled: true }, Validators.required], // UI
            guestIds: [this.INITIAL_FORM_STATE_CLOSED.guestIds, Validators.required],
        }, {
            validators: dateRangeValidator('startDate', 'endDate')
        })

        this.isFormValid$ = new BehaviorSubject<boolean>(false)
    }

    ngOnInit() {
        // Permissions
        this.userService.hasRole(['Super Admin', 'Nagy Admin', 'Kis Admin', 'Szervezo']).subscribe(canCreate => this.canCreate = canCreate)
        this.userService.hasRole(['Super Admin', 'Nagy Admin', 'Kis Admin', 'Szervezo']).subscribe(canEdit => this.canEdit = canEdit)
        this.userService.hasRole(['Super Admin', 'Nagy Admin', 'Kis Admin', 'Szervezo']).subscribe(canDelete => this.canDelete = canDelete)
        this.userService.hasRole(['Szervezo']).subscribe(isOrganizer => this.isOrganizer = isOrganizer)

        // while there is no conference
        this.room?.disable({ emitEvent: false })

        // Reservations
        this.querySub = this.query$.pipe(
            // DO NOT query if there is no conference selected
            filter(() => (this.selectedConferences?.length ?? 0) > 0),
            map(tr => ({ key: this.buildQueryKey(), force: !!tr?.force })),
            distinctUntilChanged((prev, curr) => !curr.force && prev.key === curr.key),
            auditTime(50),
            switchMap(() => {
                this.loading = true

                this.filterValues['conference_id'] =
                    (this.selectedConferences ?? []).map(x => x.id).join(',')

                const filters = Object.keys(this.filterValues)
                    .map(k => this.filterValues[k]?.length ? `${k}=${this.filterValues[k]}` : '')
                    .filter(Boolean)
                    .join('&')

                const sortArg = this.sortField
                    ? { sortField: this.sortField, sortOrder: this.sortOrder }
                    : ''

                return (this.globalFilter !== '')
                    ? this.reservationService.getBySearch$(this.globalFilter, sortArg)
                    : this.reservationService.get$(this.page, this.rowsPerPage, sortArg, filters)
            })
        ).subscribe({
            next: (data: ApiResponse) => {
                this.loading = false
                this.tableData = data?.rows ?? []
                this.totalRecords = data?.totalItems ?? 0
                this.page = data?.currentPage ?? 0
                this.numberOfBeds = data?.numberOfBeds ?? 0
            },
            error: () => {
                this.loading = false
                this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Hiba történt!' })
            }
        })

        // Monitor conference change
        this.conference?.valueChanges
            .pipe(
                distinctByIds<Conference>(),
                // Do nothing if change is programmatic OR sidebar is closed
                filter(() => !this.suppressEmits && this.sidebar)
            )
            .subscribe(conf => {
                const first = conf?.[0]

                // Set form values by selected conference
                this.reservationForm.patchValue({
                    conference_id: first?.id ?? null,
                    startDate: first?.beginDate ?? null,
                    endDate: first?.endDate ?? null
                }, { emitEvent: false })

                // Filter rooms by selected conference
                this.roomFilter = { ...this.roomFilter, conferenceId: first?.id ?? null }

                // Filter guests by selected conference
                this.guestFilter = { ...this.guestFilter, conferenceId: first?.id ?? null }

                if (first) {
                    this.room?.reset(null, { emitEvent: false })
                    this.room_id?.reset(null, { emitEvent: false })
                    this.room?.enable({ emitEvent: false })

                    this.guests?.reset(null, { emitEvent: false })
                    this.guestIds?.reset(null, { emitEvent: false })
                    this.guests?.enable({ emitEvent: false })

                    this.startDate?.enable({ emitEvent: false })
                    this.endDate?.enable({ emitEvent: false })
                } else {
                    this.room?.reset(null, { emitEvent: false })
                    this.room_id?.reset(null, { emitEvent: false })
                    this.room?.disable({ emitEvent: false })

                    this.guests?.reset(null, { emitEvent: false })
                    this.guestIds?.reset(null, { emitEvent: false })
                    this.guests?.disable({ emitEvent: false })

                    this.startDate?.disable({ emitEvent: false })
                    this.endDate?.disable({ emitEvent: false })
                }
            })

        // Monitor room change
        this.room?.valueChanges
            .pipe(distinctByIds<Room>())
            .subscribe(room => {
                const first = room?.[0]
                this.reservationForm.patchValue({
                    room_id: first?.id ?? null,
                }, { emitEvent: false })
            })

        // Monitor guest change
        this.guests?.valueChanges.pipe(
            // Normalization: always be an array
            map((v: Guest | Guest[] | null | undefined) => Array.isArray(v) ? v : v ? [v] : []),
            // Extract only IDs + filter out nulls
            map(arr => arr
                .map(g => g?.id)
                .filter((id) => id != null)
            ),
            // Filter out duplicates
            map(ids => Array.from(new Set(ids))),
            // Avoid unnecessary patching (do not rewrite the same ID sequence)
            distinctUntilChanged((a, b) => a.length === b.length && a.every((x, i) => x === b[i]))
        ).subscribe(ids => {
            this.reservationForm.patchValue({ guestIds: ids }, { emitEvent: false })
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
    get room() { return this.reservationForm.get('room') }
    get room_id() { return this.reservationForm.get('room_id') }
    get conference() { return this.reservationForm.get('conference') }
    get conference_id() { return this.reservationForm.get('conference_id') }
    get startDate() { return this.reservationForm.get('startDate') }
    get endDate() { return this.reservationForm.get('endDate') }
    get status() { return this.reservationForm.get('status') }
    get notes() { return this.reservationForm.get('notes') }
    get guests() { return this.reservationForm.get('guests') }
    get guestIds() { return this.reservationForm.get('guestIds') }

    /**
     * Load filtered data into the Table
     * @returns
     */
    doQuery(force: boolean = false) {
        // Don't query if there is no conference selected
        if (!this.selectedConferences?.length) {
            this.tableData = []
            this.totalRecords = 0
            this.loading = false
            return
        }
        this.query$.next({ force })
    }

    /**
     * Filter table by column
     * @param event
     * @param field
     */
    onFilter(event: any, field: string) {
        // Organizer need select conference
        if (this.isOrganizer && this.selectedConferences.length === 0) return

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
        this.sortOrder = (event.sortOrder === -1 ? -1 : 1)
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
     * Sidebar visibility
     */
    onSidebarShow(): void {
        // Mark sidebar as visible before any reactive work
        this.sidebar = true

        // Optional: prefill from table-level selector
        const first = this.selectedConferences?.[0]
        if (first) {
            this.suppressEmits = true
            this.reservationForm.patchValue({
                conference: [first],
                conference_id: first.id
            }, { emitEvent: false })   // still programmatic, no emit
            queueMicrotask(() => this.suppressEmits = false)
        }
    }

    // Fires when the sidebar gets hidden by user (X button or backdrop click).
    // We clear the form-level conference selector and disable dependent controls,
    // so the next open starts from a clean, consistent state.
    onSidebarHide(): void {
        // Prevent subscribers from reacting to programmatic resets
        this.suppressEmits = true
        this.sidebar = false

        // One-shot reset to initial closed state: clears room/guests/dates, disables where needed
        this.reservationForm.reset(this.INITIAL_FORM_STATE_CLOSED, { emitEvent: false })
        this.preselectConferenceId = undefined

        // Clean form state
        this.preselectConferenceId = undefined
        this.reservationForm.markAsPristine()
        this.reservationForm.markAsUntouched()

        // Re-enable emissions on the next tick (after hide finishes)
        queueMicrotask(() => this.suppressEmits = false)
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
        // 0) Reset tisztán, események nélkül
        this.reservationForm.reset(this.initialFormValues, { emitEvent: false });

        // 1) Konferencia előkészítés (objektum + [objektum] a selectorhoz)
        const confObj =
            (reservation as any).conference ??
            ((reservation as any).conference_id ? { id: (reservation as any).conference_id } : null);

        // 1/a) Konferencia beállítása úgy, hogy FUSSON a valueChanges (engedi a room/guests-t és beállítja a filtereket)
        this.reservationForm.patchValue({
            conference: confObj ? [confObj] : [],
            conference_id: confObj?.id ?? null,
        }, { emitEvent: true });

        // 2) Szoba és vendégek előkészítése
        const roomObj =
            reservation.room ??
            ((reservation as any).room_id ? { id: (reservation as any).room_id } : null);

        const guestObjs: Guest[] = Array.isArray((reservation as any).guests)
            ? (reservation as any).guests
            : [];

        const guestIds = guestObjs
            .map(g => g?.id)
            .filter((id) => id != null);

        // 3) A konferencia-change utáni ciklusba időzítve patcheljük a room/guests-t és a REZERVÁCIÓ dátumait,
        //    mert a konferencia-subscriber különben felülírja/üríti őket.
        Promise.resolve().then(() => {
            // Gondoskodj róla, hogy a selectorokhoz TÖMB menjen (selectionLimit=1 esetén is)
            this.reservationForm.patchValue({
                id: reservation.id ?? null,
                room: roomObj ? [roomObj] : [],
                room_id: roomObj?.id ?? null,
                guests: guestObjs,            // UI-hoz teljes objektumok tömbje
                guestIds: Array.from(new Set(guestIds)), // backendhez csak ID-k
                startDate: reservation.startDate,        // konferencia-subscriber által kitöltött értékek felülírása
                endDate: reservation.endDate,
                status: (reservation as any).status ?? 'confirmed',
                notes: (reservation as any).notes ?? null,
            }, { emitEvent: false });

            // ha használsz preselectet, itt állítsd
            this.preselectConferenceId = confObj?.id ?? undefined;

            // eredeti állapot és panel megnyitása
            this.originalFormValues = this.reservationForm.getRawValue();
            this.sidebar = true;
            this.doQuery()
        })
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
        if (!this.reservationForm.valid) return
        this.loading = true

        const v = this.reservationForm.value

        const formValues = {
            room_id: v.room?.id ?? v.room_id ?? null,
            conference_id: v.conference?.id ?? v.conference_id ?? null,
            startDate: v.startDate,
            endDate: v.endDate,
            status: v.status ?? 'confirmed',
            notes: v.notes ?? null
        }

        // CREATE
        if (!v.id) {
            // we only send IDs from guests
            const guestIds: number[] = Array.isArray(v.guestIds)
                ? v.guestIds
                : Array.isArray(v.guest)
                    ? v.guest.map((g: any) => g?.id).filter((x: any) => x != null)
                    : v.guest?.id ? [v.guest.id] : [];

            const payload = { ...formValues, guestIds: Array.from(new Set(guestIds)) }

            console.log('payload', payload)

            // NEM küldünk: guest, guests
            this.reservationService.create(payload)

        } else {
            // UPDATE: NE küldj vendég-listát itt
            const payload = { id: v.id, ...formValues }

            console.log('payload', payload)

            this.reservationService.update(payload)

            // Vendég hozzáadás/levétel külön hívással:
            // this.reservationService.addGuests(v.id, [{ guestId: 123, is_primary: true }]).subscribe(...)
            // this.reservationService.removeGuest(v.id, 123).subscribe(...)
            // (Ezekhez a backend végpontok: POST /reservation/:id/guests, DELETE /reservation/:id/guests/:guestId) 
        }

        this.doQuery()
        this.sidebar = false
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

        if (message == 'ERROR' || message?.severity === 'error') {
            this.messageService.add({
                severity: 'error',
                summary: message?.summary ?? 'Error',
                detail: message?.detail ?? 'Hiba történt!'
            })
        } else {
            // Show service response message
            this.messageService.add(message)

            // Reset selected table Item(s)
            this.tableItem = {}
            this.selected = []

            // Forced Query after data changes
            this.doQuery(true)
        }
    }

    onConfChange(e: { value: Conference[]; source: ChangeSource }) {
        this.selectedConferences = e.value;
        // Csak a számodra értelmes forrásokra kérdezz le:
        if (e.source === 'user' || e.source === 'auto-select-first') {
            this.tableData = [];
            this.doQuery();
        }
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
                { key: 'notes', label: 'Megjegyzés' }
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

    // string "YYYY-MM-DD"  -> Date (timezone-secure)
    fromYMD(ymd: string): Date {
        const [y, m, d] = ymd.split('-').map(Number)
        return new Date(y, (m - 1), d)
    }

    // Date -> "YYYY-MM-DD"
    toYMD(d: Date): string {
        const y = d.getFullYear()
        const m = String(d.getMonth() + 1).padStart(2, '0')
        const day = String(d.getDate()).padStart(2, '0')
        return `${y}-${m}-${day}`
    }

    /**
     * 
     */
    private buildQueryKey(): string {
        const confIds = (this.selectedConferences ?? []).map(c => c.id).sort().join(',')
        const filters = Object.keys(this.filterValues)
            .map(k => this.filterValues[k] ? `${k}=${this.filterValues[k]}` : '')
            .filter(Boolean)
            .join('&')
        return [
            this.page, this.rowsPerPage, this.sortField, this.sortOrder,
            this.globalFilter || '', confIds, filters
        ].join('|')
    }

    // Don't delete this, its needed from a performance point of view,
    ngOnDestroy(): void {
    }
}
