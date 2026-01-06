import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { auditTime, BehaviorSubject, debounceTime, distinctUntilChanged, map, Observable, Subject, Subscription, switchMap, filter } from 'rxjs';
import { take } from 'rxjs/operators';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { ConfirmationService } from 'primeng/api';
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
import { Guest, GuestFilter } from '../../api/guest';
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
    providers: [MessageService, ConfirmationService]
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
    totalBeds: number = 0                        // Number of beds
    registeredGuests: number = 0                 // registeredGuests
    reservedGuests: number = 0                   // reservedGuests
    waitingForRoom: number = 0                   // waitingForRoom
    datesTouchedByUser = false                   // Track if user manually changed start/end dates

    preselectConferenceId?: number
    conferenceStart: Date | null = null
    conferenceEnd: Date | null = null

    preselectRoomIds?: number | undefined;
    preselectGuestIds: number[] = [];

    roomFilter: RoomFilter = { enabled: true }
    guestFilter: GuestFilter = { enabled: true }

    suppressEmits = false;        // Guard: ignore programmatic changes

    private initialFormValues = {
        id: null,
        room: null,
        room_id: null,
        conference: [],
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

    // Rooms where ONLY a baby bed fits (no mattress)
    private readonly BABY_ONLY_ROOM_NUMS = new Set<string>([
        '207', '212', '20A', 'G11B', 'K12B', 'L11A', 'L11D*', 'L11E*', 'S11A', 'S12A', 'S12C', 'V11A*'
    ])

    // Rooms where 1 baby bed + 1 mattress fits
    private readonly BABY_PLUS_MATTRESS_ROOM_NUMS = new Set<string>([
        'S11B*', 'S11C*', 'S11D*', 'S21A*', 'S21B*'
    ])

    private lastSelectionByRoom = new Map<number, number[]>() // roomId -> last selection (guest ids, in selection order)
    private bedFullWarnedByGuest = new Set<string>()          // roomId:guestId pairs we already warned for, to avoid duplicate prompts if user toggles UI

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
        private confirmationService: ConfirmationService,
        private messageService: MessageService,
        private responsiveService: ResponsiveService,
        private route: ActivatedRoute,
        private fb: FormBuilder) {

        // Reservation form fields and validators
        this.reservationForm = this.fb.group({
            id: this.INITIAL_FORM_STATE_CLOSED.id,
            room: [this.INITIAL_FORM_STATE_CLOSED.room, Validators.required], // UI
            room_id: [this.INITIAL_FORM_STATE_CLOSED.room_id, Validators.required],
            conference: [this.INITIAL_FORM_STATE_CLOSED.conference, Validators.required], // UI
            conference_id: [this.INITIAL_FORM_STATE_CLOSED.conference_id, Validators.required],
            startDate: [this.INITIAL_FORM_STATE_CLOSED.startDate, Validators.required],
            endDate: [this.INITIAL_FORM_STATE_CLOSED.endDate, Validators.required],
            status: this.INITIAL_FORM_STATE_CLOSED.status,
            notes: this.INITIAL_FORM_STATE_CLOSED.notes,
            guests: [this.INITIAL_FORM_STATE_CLOSED.guests, Validators.required], // UI
            guestIds: [this.INITIAL_FORM_STATE_CLOSED.guestIds, Validators.required],
        }, { validators: dateRangeValidator('startDate', 'endDate') })

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
                this.totalBeds = data?.summary?.totalBeds ?? 0
                this.registeredGuests = data?.summary?.registeredGuests ?? 0
                this.reservedGuests = data?.summary?.reservedGuests ?? 0
                this.waitingForRoom = data?.summary?.waitingForRoom ?? 0
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
                this.applyConferenceSideEffects(first)
            })

        // Monitor room change
        this.room?.valueChanges
            .pipe(distinctByIds<Room>())
            .subscribe(room => {
                const first = room?.[0]
                this.reservationForm.patchValue({
                    room_id: first?.id ?? null,
                }, { emitEvent: false })

                // reset per-room warning state (ne vigyük át az előző szobából)
                if (first?.id != null) {
                    // Validate current guest selection against the newly chosen room
                    this.validateCapacityForCurrentSelection(first)
                }
            })

        // Monitor guest change
        this.guests?.valueChanges.pipe(
            // Normalization: always be an array
            map((v: Guest | Guest[] | null | undefined) => Array.isArray(v) ? v : v ? [v] : []),
            // Extract only IDs + filter out nulls
            map(arr => ({
                guestsArr: arr,
                ids: Array.from(new Set(
                    arr.map(g => g?.id).filter((id): id is number => id != null)
                ))
            })),
            // Avoid unnecessary patching (do not rewrite the same ID sequence)
            distinctUntilChanged((a, b) =>
                a.ids.length === b.ids.length && a.ids.every((x, i) => x === b.ids[i])
            )
        ).subscribe(({ guestsArr, ids }) => {
            const room = this.getSelectedRoom()
            if (room) {
                const allowed = this.onGuestsSelectionChange(room, guestsArr)
                if (!allowed) {
                    // Selection was reverted inside onGuestsSelectionChange,
                    // do not continue with guestIds / date auto-adjust.
                    return
                }
            }
            // Keep guestIds in sync (IDs only)
            this.reservationForm.patchValue({ guestIds: ids }, { emitEvent: false })

            // Auto-adjust dates while:
            //  - sidebar is open
            //  - change is user driven (not suppressEmits)
            //  - user has not modified dates manually in this session
            if (!this.sidebar || this.suppressEmits || this.datesTouchedByUser) {
                return
            }

            // User already changed dates manually, do not overwrite
            if (this.datesTouchedByUser) {
                return
            }

            const range = this.computeGuestDateRange(guestsArr)
            const hasRange = !!range.minArrival && !!range.maxDeparture

            if (hasRange) {
                const nextStart = range.minArrival!.format('YYYY-MM-DD')
                const nextEnd = range.maxDeparture!.format('YYYY-MM-DD')

                const currentStart = this.startDate?.value
                const currentEnd = this.endDate?.value

                if (currentStart !== nextStart || currentEnd !== nextEnd) {
                    this.reservationForm.patchValue(
                        { startDate: nextStart, endDate: nextEnd },
                        { emitEvent: false }
                    )
                }
            } else {
                // No guests selected -> fall back to conference dates (if any)
                const confArr = Array.isArray(this.conference?.value)
                    ? (this.conference!.value as Conference[])
                    : [];
                const currentConf = confArr.length ? confArr[0] : null

                if (currentConf) {
                    const begin = (currentConf as any).beginDate
                        ? moment((currentConf as any).beginDate).format('YYYY-MM-DD')
                        : null;
                    const end = (currentConf as any).endDate
                        ? moment((currentConf as any).endDate).format('YYYY-MM-DD')
                        : null;

                    this.reservationForm.patchValue(
                        { startDate: begin, endDate: end },
                        { emitEvent: false }
                    )
                }
            }
        })

        // Track manual changes of start/end dates (only matters for new reservations)
        this.startDate?.valueChanges
            .pipe(filter(() => !this.suppressEmits && this.sidebar))
            .subscribe(() => {
                this.datesTouchedByUser = true
            })

        this.endDate?.valueChanges
            .pipe(filter(() => !this.suppressEmits && this.sidebar))
            .subscribe(() => {
                this.datesTouchedByUser = true
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

        // Navigated with reservation ID
        this.initDeepLinkFromReservationId()
    }

    /**
     * Deep link: /reservation?reservation_id=123&conference_id=45&open=1
     * - Preselect conference (to pass the guard)
     * - Filter table ONLY to that reservation
     * - Optionally open sidebar for editing
     * - Reacts to later param changes too
     */
    private initDeepLinkFromReservationId(): void {
        // Listen to param changes (also supports navigating to another reservation without full reload)
        this.route.queryParamMap.pipe(
            map(params => {
                const confIdRaw = params.get('conference_id')
                const resIdRaw = params.get('reservation_id')
                const openRaw = params.get('open')  // '1' to auto-open, anything else => no

                const conferenceId = confIdRaw != null ? Number(confIdRaw) : null
                const reservationId = resIdRaw != null ? Number(resIdRaw) : null
                const autoOpen = openRaw === '1' || openRaw === 'true' || openRaw === 'yes'

                return {
                    conferenceId: Number.isFinite(conferenceId as number) ? (conferenceId as number) : null,
                    reservationId: Number.isFinite(reservationId as number) ? (reservationId as number) : null,
                    autoOpen
                }
            }),
            distinctUntilChanged((a, b) =>
                a.conferenceId === b.conferenceId &&
                a.reservationId === b.reservationId &&
                a.autoOpen === b.autoOpen
            )
        ).subscribe(({ conferenceId, reservationId, autoOpen }) => {
            // 1) Ha nincs param, takarítsunk: töröljük az előző "id" szűrőt és zárjuk a sidebart
            if (!reservationId) {
                if (this.filterValues['id']) {
                    delete this.filterValues['id']
                    this.doQuery(true)
                }
                if (this.sidebar) {
                    this.closeSidebar()
                }
                return
            }

            // 2) Konferencia előválasztása (ha jött a param)
            if (conferenceId) {
                this.selectedConferences = [{ id: conferenceId } as Conference]
            }

            // 3) Kérjük le CSAK azt az 1 foglalást (nem kell megvárni a táblás lekérdezést)
            const sortArg: { sortField: string; sortOrder: SortDir } = { sortField: 'id', sortOrder: 1 }
            this.reservationService.get$(0, 1, sortArg, `id=${reservationId}`).pipe(
                map((resp: ApiResponse) => (resp?.rows?.[0] as Reservation) || null),
                take(1)
            ).subscribe({
                next: (res) => {
                    if (!res) {
                        this.messageService.add({ severity: 'warn', summary: 'Figyelem', detail: 'A megadott foglalás nem található.' });
                        return
                    }

                    // 3/a) Ha nem jött conference_id, vegyük a foglalásból
                    const confFromRes = (res as any).conference_id ?? (res as any).conference?.id ?? null
                    if (!conferenceId && confFromRes) {
                        this.selectedConferences = [{ id: confFromRes } as Conference]
                    }

                    // 4) Táblát szűrjük csak erre az egy id-re
                    this.filterValues = { ...this.filterValues, id: String(res.id) }
                    this.page = 0
                    this.doQuery(true) // guard most már átmegy (van selectedConferences)

                    // 5) Opcionálisan nyissuk is meg szerkesztésre
                    if (autoOpen) {
                        this.edit(res)
                    }
                },
                error: () => {
                    this.messageService.add({ severity: 'warn', summary: 'Figyelem', detail: 'A megadott foglalás nem található.' });
                }
            })
        })
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

        const noWaitFields: string[] = ['conferenceName', 'room.building', 'room.bedType', 'status']
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

        // If we are creating a NEW reservation (no id) and the header has a selected conference,
        // prefill the sidebar's conference selector to match the header selection.
        const isNew = !this.id?.value
        const headerConf = this.selectedConferences?.[0]

        if (isNew && headerConf) {
            // Optional: pass to child selector as well (if it uses preselectIds internally)
            this.preselectConferenceId = headerConf.id

            // IMPORTANT: write an array (CVA MultiSelect expects an array)
            // emitEvent: true -> triggers your existing valueChanges pipeline
            this.reservationForm.patchValue(
                { conference: [headerConf] },
                { emitEvent: true }
            )

            // Fallback: force side-effects even if valueChanges didn't fire
            queueMicrotask(() => this.applyConferenceSideEffects(headerConf))
        } else {
            this.preselectConferenceId = undefined

            // If there is already a value selected manually, also align state
            queueMicrotask(() => this.applyConferenceSideEffects())
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
        // IMPORTANT: emit so distinctByIds sees [] before the next open
        this.datesTouchedByUser = false
        this.reservationForm.reset(this.INITIAL_FORM_STATE_CLOSED, { emitEvent: true })
        this.preselectConferenceId = undefined
        this.preselectRoomIds = undefined
        this.preselectGuestIds = []

        // don't let next "cancel" resurrect an old edit state
        this.originalFormValues = undefined

        // Clean form state
        this.preselectConferenceId = undefined
        this.reservationForm.markAsPristine()
        this.reservationForm.markAsUntouched()

        // Re-enable emissions on the next tick (after hide finishes)
        queueMicrotask(() => this.suppressEmits = false)
    }

    private closeSidebar(): void {
        // Only toggle; p-sidebar (onHide) will call onSidebarHide()
        this.sidebar = false
    }

    /**
     * Handles guest selection changes for a given room.
     *
     * Behaviour:
     *  - Calculates room capacity:
     *      - hard beds: room.beds
     *      - total capacity: room.beds + room.extraBeds
     *  - For organizers (isOrganizer === true):
     *      - If the selected guest count exceeds total capacity, the selection is reverted
     *        to the last valid state and a warning toast is shown.
     *      - In this case the method returns false so callers can stop further processing.
     *  - For all users:
     *      - If the selected guest count exceeds the hard beds (but not total capacity),
     *        a confirm dialog is shown to indicate who / how many will not get a real bed
     *        and may need a mattress or baby bed.
     *  - The method also:
     *      - Tracks the last valid selection per room (lastSelectionByRoom),
     *      - Tracks which guests were already warned about (bedFullWarnedByGuest),
     *      - Clears warning flags when the selection goes back to within hard bed capacity.
     *
     * @param room       The currently selected room.
     * @param nextGuests The next guest selection (as Guest[] from the UI control).
     * @returns          true if the selection is accepted, false if it was reverted.
     */
    private onGuestsSelectionChange(room: Room, nextGuests: Guest[]): boolean {
        const roomId = Number(room?.id)
        const beds = Number(room?.beds ?? 0) // hard beds only
        const extra = Number(room?.extraBeds ?? 0)  // mattresses / baby beds
        const totalCapacity = beds + extra

        const prevIds = this.lastSelectionByRoom.get(roomId) ?? []
        const nextIds = nextGuests.map(g => g.id).filter((id): id is number => id != null)
        const guestsCount = nextIds.length

        const policyInfo = this.evaluateExtraGuests(room, nextGuests)

        // Special rooms: enforce total capacity for everyone (these rooms physically cannot be extended with more mattresses)
        if (policyInfo.policy.kind !== 'default' && policyInfo.totalCapacity > 0 && guestsCount > policyInfo.totalCapacity) {
            this.revertGuestsToPrevious(roomId, nextGuests, prevIds)

            this.messageService.add({
                severity: 'warn',
                summary: 'Szoba megtelt',
                detail: `A(z) ${policyInfo.roomNum} szoba maximális kapacitása ${policyInfo.totalCapacity} fő. Több vendég nem helyezhető el ebben a szobában.`,
                life: 8000
            })
            return false
        }

        // Special rooms: validate who can go to extra beds (based on selection order)
        if (policyInfo.policy.kind === 'babyOnly') {
            // Any adult/unknown in extra guests is forbidden
            if (policyInfo.adultExtraCount > 0) {
                this.revertGuestsToPrevious(roomId, nextGuests, prevIds)

                this.messageService.add({
                    severity: 'warn',
                    summary: 'Csak babaágy fér',
                    detail: `A(z) ${policyInfo.roomNum} szobában pótágy csak babaágy (0–3 év). 3 év feletti (vagy ismeretlen korú) vendég nem tehető pótágyra.`,
                    life: 10000
                })
                return false
            }
        } else if (policyInfo.policy.kind === 'babyPlusMattress') {
            // Only 1 adult/unknown is allowed among extra guests (mattress)
            if (policyInfo.adultExtraCount > policyInfo.policy.allowedAdultExtra) {
                this.revertGuestsToPrevious(roomId, nextGuests, prevIds)

                this.messageService.add({
                    severity: 'warn',
                    summary: 'Pótágy korlátozás',
                    detail: `A(z) ${policyInfo.roomNum} szobában legfeljebb 1 matrac használható; a további pótágy(ak) csak babaágy (0–3 év).`,
                    life: 10000
                })
                return false
            }
        }

        // --- HARD RULE FOR ORGANIZER: cannot exceed total capacity (beds + extraBeds) ---
        if (this.isOrganizer && totalCapacity > 0 && guestsCount > totalCapacity) {
            // Rebuild previous guests in the original order
            const guestsById = new Map(
                nextGuests
                    .filter(g => g && g.id != null)
                    .map(g => [g.id as number, g])
            )

            const prevGuests: Guest[] = prevIds
                .map(id => guestsById.get(id))
                .filter((g): g is Guest => !!g)

            // Revert selection programmatically without triggering valueChanges again
            this.suppressEmits = true
            this.reservationForm.patchValue(
                {
                    guests: prevGuests,
                    guestIds: prevIds
                },
                { emitEvent: false }
            )
            this.suppressEmits = false

            // Keep lastSelectionByRoom as the previous valid state
            this.lastSelectionByRoom.set(roomId, prevIds)

            // Warn organizer
            this.messageService.add({
                severity: 'warn',
                summary: 'Szoba megtelt',
                detail: `A szoba maximális kapacitása ${totalCapacity} fő. Több vendég nem helyezhető el ebben a szobában.`,
                life: 8000
            })

            return false
        }

        // --- Existing "hard bed" warning logic (allowed, but with warning) ---
        const prevSetForAdded = new Set(prevIds)
        const addedIds: number[] = nextIds.filter(id => !prevSetForAdded.has(id))
        const lastAddedId: number | null = addedIds.length ? addedIds[addedIds.length - 1] : null

        // Over hard beds
        const overBeds = Math.max(0, guestsCount - beds)

        // Mark newly over-bed guests so we don't warn about the same person repeatedly
        const newlyOverAdded = addedIds
            .map((id, idx) => ({ id, pos: prevIds.length + idx + 1 })) // 1-based index after add
            .filter(x => x.pos > beds)
            .map(x => x.id)
            .filter(id => !this.bedFullWarnedByGuest.has(`${roomId}:${id}`))

        newlyOverAdded.forEach(id => this.bedFullWarnedByGuest.add(`${roomId}:${id}`))

        // Show a single message:
        //  - if exactly 1 over-bed -> show the LAST added person's name
        //  - if 2+ over-bed       -> show count only
        if (overBeds > 0) {
            const p = this.getExtraBedPolicyByRoom(room)
            const roomNum = (room as any)?.roomNum

            const baseMsg = (() => {
                if (p.kind === 'babyOnly') {
                    return 'Csak babaágy használható (0–3 év).'
                }
                if (p.kind === 'babyPlusMattress') {
                    // First extra can be mattress OR baby; second extra must be baby
                    if (overBeds >= 2) return 'A 2. pótágy csak babaágy (0–3 év).'
                    return 'Matracra vagy babaágyra kerülhet (max 1 matrac).'
                }
                return 'Matracra vagy gyerekágyra kerülhet.'
            })()

            if (overBeds === 1 && lastAddedId != null) {
                const g = nextGuests.find(x => x.id === lastAddedId)
                const name = g ? `${g.lastName ?? ''} ${g.firstName ?? ''}`.trim() || 'A vendég' : 'A vendég'

                this.confirmationService.confirm({
                    header: 'Figyelmeztetés',
                    message: `${name} már nem fér ágyra! ${baseMsg}`,
                    icon: 'pi pi-exclamation-triangle',
                    acceptLabel: 'OK',
                    rejectVisible: false
                })
            } else {
                this.confirmationService.confirm({
                    header: 'Figyelmeztetés',
                    message: `${overBeds} fő már nem fér ágyra! ${baseMsg}`,
                    icon: 'pi pi-exclamation-triangle',
                    acceptLabel: 'OK',
                    rejectVisible: false
                })
            }
        }

        // Persist selection order for this room
        this.lastSelectionByRoom.set(roomId, nextIds)

        // If selection goes back to <= beds, clear warn flags for this room
        if (guestsCount <= beds) {
            [...this.bedFullWarnedByGuest]
                .filter(k => k.startsWith(`${roomId}:`))
                .forEach(k => this.bedFullWarnedByGuest.delete(k))
        }

        return true
    }

    /**
     * Create new Reservation
     */
    create() {
        // Hard reset to the CLOSED state so nothing leaks from a previous edit
        this.suppressEmits = true

        // Clear any preselects/state from last edit
        this.datesTouchedByUser = false
        this.preselectConferenceId = undefined
        this.preselectRoomIds = undefined
        this.preselectGuestIds = []
        this.bedFullWarnedByGuest.clear()
        this.lastSelectionByRoom.clear()

        // Reset filters that depend on the last edit
        this.roomFilter = { enabled: true }
        this.guestFilter = { enabled: true }

        // Reset the form to the CLOSED baseline (includes disabled controls)
        this.reservationForm.reset(this.INITIAL_FORM_STATE_CLOSED, { emitEvent: false })
        this.reservationForm.markAsPristine()
        this.reservationForm.markAsUntouched()

        // baseline for Cancel in "create" flow
        this.originalFormValues = this.reservationForm.getRawValue()

        this.suppressEmits = false
        this.sidebar = true // (onShow) prefill will run
    }

    /**
     * Edit the Reservation
     * @param reservation
     */
    edit(reservation: Reservation) {
        // New edit session: allow auto date adjustment until user changes dates manually
        this.datesTouchedByUser = false

        // 0) Reset tisztán, események nélkül
        this.reservationForm.reset(this.initialFormValues, { emitEvent: false })

        // 1) Konferencia előkészítés (objektum + [objektum] a selectorhoz)
        const confObj =
            (reservation as any).conference ??
            ((reservation as any).conference_id ? { id: reservation.conference_id } : null)

        // 1/a) Konferencia beállítása úgy, hogy FUSSON a valueChanges (engedi a room/guests-t és beállítja a filtereket)
        this.reservationForm.patchValue({
            conference: confObj ? [confObj] : [],
            conference_id: confObj?.id ?? null,
        }, { emitEvent: true })

        // 2) Szoba és vendégek előkészítése
        const roomObj =
            reservation.room ??
            ((reservation as any).room_id ? { id: (reservation as any).room_id } : null)

        const guestObjs: Guest[] = Array.isArray((reservation as any).guests)
            ? (reservation as any).guests
            : [];

        const guestIdsNum = Array.from(
            new Set(
                guestObjs
                    .map(g => (typeof g?.id === 'string' ? Number(g.id) : g?.id))
                    .filter((x): x is number => Number.isFinite(x as number))
            )
        )

        // 2) BLOKK: mindent programból állítunk be, nem engedünk subscriber-t futni
        this.suppressEmits = true

        // 2/a) Konferencia + belőle származtatott mezők, filterek, enable
        this.reservationForm.patchValue({
            conference: confObj ? [confObj] : [],
            conference_id: confObj?.id ?? null,
            guests: guestObjs,
            guestIds: guestIdsNum,
            startDate: reservation.startDate ?? null,   // szerkesztett foglalás dátumai
            endDate: reservation.endDate ?? null
        }, { emitEvent: false })

        this.preselectGuestIds = guestIdsNum;

        // A konferencia alapján szűrők (mi állítjuk, nem a subscriber)
        this.roomFilter = {
            ...this.roomFilter,
            conferenceId: confObj?.id ?? null,
            includeRoomIds: roomObj?.id ? [roomObj.id] : []
        }

        this.guestFilter = {
            ...this.guestFilter,
            conferenceId: confObj?.id ?? null,
            includeGuestIds: this.preselectGuestIds
        }

        // A kapcsolt kontrollokat aktiváljuk (nem várunk subscriberre)
        this.room?.enable({ emitEvent: false })
        this.guests?.enable({ emitEvent: false })
        this.startDate?.enable({ emitEvent: false })
        this.endDate?.enable({ emitEvent: false })

        // 2/b) UI-értékek (CVA) + backend ID-k
        this.reservationForm.patchValue({
            id: reservation.id ?? null,
            room: roomObj ? [roomObj] : [],
            room_id: roomObj?.id ?? null,
            guests: guestObjs,                         // UI-hoz objektumok
            guestIds: Array.from(new Set(guestIdsNum)),   // backendhez ID-k
            status: (reservation as any).status ?? 'confirmed',
            notes: (reservation as any).notes ?? null,
        }, { emitEvent: false })

        // 2/c) Gyerek selectornak átadott “pending” preselect ID-k
        this.preselectRoomIds = roomObj?.id ?? null
        this.preselectGuestIds = Array.from(new Set(guestIdsNum))

        // 3) Események újra engedése, állapotok
        this.suppressEmits = false
        this.originalFormValues = this.reservationForm.getRawValue()
        this.sidebar = true

        // populate lastSelectionByRoom for correct per-guest warnings on edit
        if (roomObj?.id) {
            this.lastSelectionByRoom.set(roomObj.id, this.preselectGuestIds ?? []);
        }
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

        const selectedRoom = this.getSelectedRoom()
        const selectedGuests: Guest[] = Array.isArray(this.guests?.value) ? (this.guests!.value as Guest[]) : []

        if (selectedRoom) {
            const info = this.evaluateExtraGuests(selectedRoom, selectedGuests)

            // Only for special rooms
            if (info.policy.kind !== 'default') {
                // Total capacity hard rule
                if (info.totalCapacity > 0 && selectedGuests.length > info.totalCapacity) {
                    this.messageService.add({
                        severity: 'warn',
                        summary: 'Szoba megtelt',
                        detail: `A(z) ${info.roomNum} szoba maximális kapacitása ${info.totalCapacity} fő. Több vendég nem menthető ebbe a szobába.`,
                        life: 10000
                    })
                    return
                }

                // Extra-bed policy rule
                const policyInvalid =
                    (info.policy.kind === 'babyOnly' && info.adultExtraCount > 0) ||
                    (info.policy.kind === 'babyPlusMattress' && info.adultExtraCount > info.policy.allowedAdultExtra)

                if (policyInvalid) {
                    const detail =
                        (selectedGuests.length === info.totalCapacity && info.requiredBabyExtra > 0)
                            ? this.buildRoomPolicySaveMessage(info.totalCapacity, info.requiredBabyExtra)
                            : (info.policy.kind === 'babyOnly'
                                ? `A(z) ${info.roomNum} szobában pótágy csak babaágy (0–3 év). 3+ vendég nem menthető pótágyra.`
                                : `A(z) ${info.roomNum} szobában legfeljebb 1 matrac használható; a további pótágy(ak) csak babaágy (0–3 év).`)

                    this.messageService.add({
                        severity: 'warn',
                        summary: 'Nem menthető',
                        detail,
                        life: 12000
                    })
                    return
                }
            }
        }

        this.loading = true

        const v = this.reservationForm.value

        // Helper: extract id from CVA MultiSelect (array or object)
        const extractId = (val: any): number | null => {
            if (Array.isArray(val)) return val[0]?.id ?? null
            return val?.id ?? null
        }

        // Normalize guestIds from form
        const normalizedGuestIds: number[] = Array.isArray(v.guestIds)
            ? Array.from(new Set(v.guestIds.map((x: any) => Number(x)).filter((n: any) => Number.isFinite(n))))
            : Array.isArray(v.guests)
                ? Array.from(new Set(
                    v.guests
                        .map((g: any) => Number(g?.id))
                        .filter((n: any) => Number.isFinite(n))
                ))
                : (v.guests?.id ? [Number(v.guests.id)] : [])

        const formValues = {
            room_id: extractId(v.room) ?? v.room_id ?? null,
            conference_id: extractId(v.conference) ?? v.conference_id ?? null,
            startDate: v.startDate,
            endDate: v.endDate,
            status: v.status ?? 'confirmed',
            notes: v.notes ?? null
        }

        // CREATE
        if (!v.id) {
            const payload = { ...formValues, guestIds: normalizedGuestIds }
            this.reservationService.create(payload)
        }
        // UPDATE
        else {
            const payload = { id: v.id, ...formValues, guestIds: normalizedGuestIds }
            this.reservationService.update(payload)
        }

        this.doQuery()
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
            return // keep sidebar open for fixing
        } else {
            // Show service response message
            this.messageService.add(message)

            // Reset selected table Item(s)
            this.tableItem = {}
            this.selected = []

            // Forced Query after data changes
            this.doQuery(true)

            // Close only on success:
            this.closeSidebar()
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

    // Get Age by birthdate
    getAge(birthDate?: string | null): string {
        if (!birthDate) return ""
        const birth = moment(birthDate)
        const today = moment()
        return today.diff(birth, 'years').toString()
    }

    // Returns how many guests are between 0–3 years old (need baby bed)
    getBabyBedCount(reservation: Reservation): number {
        if (!reservation?.guests || !reservation.guests.length) return 0

        const today = moment();
        return reservation.guests.reduce((count, guest) => {
            if (!guest?.birthDate) return count

            const ageYears = today.diff(moment(guest.birthDate), 'years')
            // 0–3 év közöttiek (3 év alatti / max 3 éves)
            if (ageYears >= 0 && ageYears < 3) {
                return count + 1
            }
            return count;
        }, 0)
    }

    // Returns guests between 0–3 years old (need baby bed)
    getBabyBedGuests(reservation: Reservation): Guest[] {
        if (!reservation?.guests || !reservation.guests.length) return []

        const today = moment();
        return reservation.guests.filter(guest => {
            if (!guest?.birthDate) return false

            const ageYears = today.diff(moment(guest.birthDate), 'years')
            // 0–3 years old
            return ageYears >= 0 && ageYears < 3
        })
    }

    // Returns free capacity (can be negative when overbooked)
    getFreeCapacity(reservation: Reservation) {
        const guestsNum = reservation?.guests?.length ?? 0
        const roomCapacity = (reservation?.room?.beds ?? 0) + (reservation?.room?.extraBeds ?? 0)
        return roomCapacity - guestsNum
    }

    // Style helper for the capacity avatar
    capacityStyle(cap: number): { [k: string]: string } {
        // Negative => red, Positive => green (0 won't render due to *ngIf)
        return {
            'background-color': cap < 0 ? '#EF4444' : '#22C55E',
            'color': '#ffffff'
        }
    }

    // Optional: clearer tooltip text
    capacityTooltip(cap: number): string {
        if (cap < 0) return `Túlfoglalva ${Math.abs(cap)} fővel`
        return `Szabad férőhely ${cap} fő részére`
    }

    // Returns a signed label for the capacity avatar.
    //  - Positive capacity -> "+2" (free beds)
    //  - Zero capacity     -> ""  (not shown because of *ngIf, but kept for safety)
    //  - Negative capacity -> "2" (overbooked by 2 persons, red background and tooltip explain it)
    formatCapacityLabel(cap: number): string {
        if (cap > 0) {
            return `+${cap}`
        } else if (cap < 0) {
            return `${Math.abs(cap)}`
        }
        return ''
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
     * Builds a deterministic “query signature” for the current table state.
     * Used by the reactive pipeline (distinctUntilChanged) to avoid redundant fetches.
     *
     * Encoded segments, in order:
     *  - page, rowsPerPage, sortField, sortOrder
     *  - globalFilter (empty string if not set)
     *  - selected conference IDs (sorted, then joined with “,” so order doesn’t matter)
     *  - column filters as k=v pairs joined with “&” (falsy/empty filters are omitted)
     *
     * The segments are joined with “|”, producing the same key for logically identical states.
     * NOTE: If you ever allow “|” inside segment values, make sure to escape it before joining.
     *
     * Example:
     *   "0|50|id|1||12,20|status=confirmed&room.building=A"
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

    // Get currently selected room (first item from the MultiSelect)
    private getSelectedRoom(): Room | null {
        const val = this.room?.value
        return Array.isArray(val) && val.length ? (val[0] as Room) : null
    }

    // Warn after a room change if current selection does not fit
    private validateCapacityForCurrentSelection(room: Room): void {
        const roomId = Number(room?.id);
        const beds = Number(room?.beds ?? 0);       // hard beds
        const extra = Number(room?.extraBeds ?? 0); // mattresses / baby beds

        // Current guest selection
        const guestsArr: Guest[] = Array.isArray(this.guests?.value) ? (this.guests!.value as Guest[]) : [];
        const ids: number[] = guestsArr.map(g => g?.id).filter((x): x is number => x != null);

        // Reset warn flags for this room (new room -> new context)
        [...this.bedFullWarnedByGuest]
            .filter(k => k.startsWith(`${roomId}:`))
            .forEach(k => this.bedFullWarnedByGuest.delete(k));

        // How many guests are over HARD beds right now?
        const overNow = Math.max(0, ids.length - beds);
        if (overNow <= 0) {
            this.lastSelectionByRoom.set(roomId, ids);
            return;
        }

        // Mark all over-bed guests as warned to avoid future duplicates
        for (let i = beds; i < ids.length; i++) {
            this.bedFullWarnedByGuest.add(`${roomId}:${ids[i]}`);
        }

        // If exactly 1 is over -> show that person's name (first over-bed at index 'beds').
        // If 2 or more are over -> show count-only message.
        if (overNow === 1) {
            const gid = ids[beds];
            const g = guestsArr.find(x => x.id === gid);
            const name = g ? `${g.lastName ?? ''} ${g.firstName ?? ''}`.trim() || 'A vendég' : 'A vendég';

            this.confirmationService.confirm({
                header: 'Figyelmeztetés',
                message: `${name} már nem fér ágyra! Matracra vagy gyerekágyra kerülhet.`,
                icon: 'pi pi-exclamation-triangle',
                acceptLabel: 'OK',
                rejectVisible: false,
                accept: () => {
                    // Optional toast for exceeding TOTAL capacity (beds + extra)
                    const totalCap = beds + extra;
                    if (ids.length > totalCap) {
                        const over = ids.length - totalCap;
                        this.messageService.add({
                            severity: 'warn',
                            summary: 'Kevés férőhely',
                            detail: `Összes kapacitás: ${totalCap} (ágy + matrac/gyerekágy), kijelölve: ${ids.length}. ${over} fő ténylegesen nem fér be.`,
                            life: 15000 // or key: 'capacityWarn' if you set a dedicated <p-toast>
                        });
                    }
                }
            });
        } else {
            this.confirmationService.confirm({
                header: 'Figyelmeztetés',
                message: `${overNow} fő már nem fér ágyra! Matracra vagy gyerekágyra kerülhet.`,
                icon: 'pi pi-exclamation-triangle',
                acceptLabel: 'OK',
                rejectVisible: false,
                accept: () => {
                    const totalCap = beds + extra;
                    if (ids.length > totalCap) {
                        const over = ids.length - totalCap;
                        this.messageService.add({
                            severity: 'warn',
                            summary: 'Kevés férőhely',
                            detail: `Összes kapacitás: ${totalCap} (ágy + matrac/gyerekágy), kijelölve: ${ids.length}. ${over} fő ténylegesen nem fér be.`,
                            life: 15000
                        });
                    }
                }
            })
        }

        // Persist selection snapshot for this room
        this.lastSelectionByRoom.set(roomId, ids)
    }

    private applyConferenceSideEffects(conf?: Conference | null): void {
        const current =
            conf ??
            (Array.isArray(this.conference?.value) && this.conference!.value.length
                ? (this.conference!.value as Conference[])[0]
                : null)

        const isNew = !this.id?.value
        const norm = (v: any) => (v ? moment(v).format('YYYY-MM-DD') : null)

        // Always keep conference_id and filters in sync
        this.reservationForm.patchValue({
            conference_id: current?.id ?? null
        }, { emitEvent: false })

        this.roomFilter = { ...this.roomFilter, conferenceId: current?.id ?? null }
        this.guestFilter = { ...this.guestFilter, conferenceId: current?.id ?? null }

        // Prefill dates only when creating or when the field is empty
        const curStart = this.startDate?.value
        const curEnd = this.endDate?.value
        const datePatch: any = {}

        if (current) {
            if (isNew || !curStart) {
                datePatch.startDate = norm((current as any).beginDate)
            }
            if (isNew || !curEnd) {
                datePatch.endDate = norm((current as any).endDate)
            }
            if (Object.keys(datePatch).length) {
                this.reservationForm.patchValue(datePatch, { emitEvent: false })
            }

            // Enable dependent controls
            this.room?.enable({ emitEvent: false })
            this.guests?.enable({ emitEvent: false })
            this.startDate?.enable({ emitEvent: false })
            this.endDate?.enable({ emitEvent: false })
        } else {
            // When there is no conference:
            // - in edit mode keep existing dates,
            // - in create mode clear dates.
            if (isNew) {
                this.reservationForm.patchValue({ startDate: null, endDate: null }, { emitEvent: false })
            }

            // Disable if no conference
            this.room?.disable({ emitEvent: false })
            this.guests?.disable({ emitEvent: false })
            this.startDate?.disable({ emitEvent: false })
            this.endDate?.disable({ emitEvent: false })
        }
    }

    // Calculates the earliest arrival and latest departure among the selected guests
    private computeGuestDateRange(
        guests: Guest[]
    ): { minArrival: moment.Moment | null; maxDeparture: moment.Moment | null } {
        let minArrival: moment.Moment | null = null
        let maxDeparture: moment.Moment | null = null

        for (const g of guests ?? []) {
            const rawArrival = (g as any).dateOfArrival
            const rawDeparture = (g as any).dateOfDeparture

            const arrival = rawArrival
                ? moment(rawArrival, 'YYYY-MM-DD', true)
                : null
            const departure = rawDeparture
                ? moment(rawDeparture, 'YYYY-MM-DD', true)
                : null

            if (arrival && arrival.isValid()) {
                if (!minArrival || arrival.isBefore(minArrival)) {
                    minArrival = arrival
                }
            }

            if (departure && departure.isValid()) {
                if (!maxDeparture || departure.isAfter(maxDeparture)) {
                    maxDeparture = departure
                }
            }
        }

        return { minArrival, maxDeparture }
    }

    /**
     * Returns true if the guest is considered a "baby-bed" guest (0–3 years old).
     *
     * Business rule:
     *  - A guest qualifies for a baby bed if their age (in full years) is >= 0 and < 3 at the time of evaluation.
     *  - If birthDate is missing/unknown, we treat the guest as NOT a baby (i.e., 3+),
     *    which is the safer default for rooms where extra capacity is baby-bed-only.
     *
     * Note:
     *  - Uses moment().diff(..., 'years') which returns full years (floored), not fractional years.
     */
    private isBabyGuest(guest: Guest | null | undefined): boolean {
        // Missing birthDate => treat as 3+ (safer for baby-bed-only rules)
        if (!guest?.birthDate) return false

        const today = moment()
        const ageYears = today.diff(moment(guest.birthDate), 'years')
        return ageYears >= 0 && ageYears < 3
    }

    // Builds a tooltip text for multiple baby-bed guests (0–3 years old)
    getBabyBedTooltip(babyGuests: Guest[]): string {
        if (!babyGuests?.length) return ''

        return babyGuests
            .map(baby => {
                const name = `${baby.lastName ?? ''} ${baby.firstName ?? ''}`.trim()
                const age = this.getAge(baby.birthDate)
                return age ? `${name} (${age})` : name
            })
            .join(', ')
    }

    // Returns how many 3+ years old guests will need a mattress due to overbooking of hard beds.
    // We intentionally do NOT identify who exactly will be on a mattress; we only show the count.
    getMattressCount(reservation: Reservation): number {
        const beds = Number(reservation?.room?.beds ?? 0)
        const guests = reservation?.guests ?? []
        if (!guests.length) return 0

        const babyCount = this.getBabyBedGuests(reservation).length

        // Guests who are NOT 0–3 years old (unknown birthDate counts as 3+ => safer)
        const olderCount = Math.max(0, guests.length - babyCount)

        // Overbooking relative to hard beds for 3+ guests
        return Math.max(0, olderCount - beds)
    }

    /**
     * Determines the "extra bed" policy for the given room based on roomNum.
     *
     * Policies:
     *  - 'babyOnly':
     *      Extra capacity (beds over the hard-bed count) can ONLY be used by 0–3 year old guests (baby bed).
     *      allowedAdultExtra = 0 means no 3+ (or unknown-age) guest is allowed among the extra guests.
     *
     *  - 'babyPlusMattress':
     *      Extra capacity can include at most one 3+ (or unknown-age) guest on a mattress,
     *      and any additional extra guests must be 0–3 (baby bed).
     *      allowedAdultExtra = 1.
     *
     *  - 'default':
     *      Existing logic applies; no special restriction is enforced here.
     *      allowedAdultExtra = Infinity effectively means "unlimited" adult extras from this policy perspective.
     *
     * Notes:
     *  - roomNum must match the normalized values stored in BABY_ONLY_ROOM_NUMS / BABY_PLUS_MATTRESS_ROOM_NUMS
     *    (e.g., trimming/uppercasing and stripping trailing '*' if you use that in your data).
     *
     * @param room The selected room (can be null).
     * @returns Policy kind + how many 3+ guests are allowed among the "extra" guests.
     */
    private getExtraBedPolicyByRoom(room: Room | null): { kind: 'default' | 'babyOnly' | 'babyPlusMattress'; allowedAdultExtra: number } {
        const roomNum = (room as any)?.roomNum

        if (this.BABY_ONLY_ROOM_NUMS.has(roomNum)) {
            return { kind: 'babyOnly', allowedAdultExtra: 0 }
        }

        if (this.BABY_PLUS_MATTRESS_ROOM_NUMS.has(roomNum)) {
            return { kind: 'babyPlusMattress', allowedAdultExtra: 1 }
        }

        return { kind: 'default', allowedAdultExtra: Number.POSITIVE_INFINITY }
    }

    /**
     * Computes derived capacity / extra-bed occupancy information for the currently selected room and guests.
     *
     * Key concept:
     *  - "Hard beds" = room.beds
     *  - "Extra beds" = room.extraBeds (baby beds and/or mattresses, depending on the room policy)
     *  - Guests are evaluated in the given order (guestsInOrder), and anyone beyond the first `beds`
     *    is considered an "extra guest" who will require an extra bed.
     *
     * What this method returns:
     *  - policy:             The extra-bed policy for this room (default / babyOnly / babyPlusMattress)
     *  - roomNum:            Room number string used for messaging/logging
     *  - beds:               Hard bed count
     *  - extraBeds:          Extra capacity count
     *  - totalCapacity:      beds + extraBeds
     *  - extraGuests:        Guests who overflow the hard beds (guestsInOrder.slice(beds))
     *  - babyExtraCount:     How many of the extra guests are 0–3 years old (need baby bed)
     *  - adultExtraCount:    How many of the extra guests are 3+ or unknown-age (need mattress or forbidden)
     *  - requiredBabyExtra:  Minimum number of baby guests required among extraGuests given the policy
     *
     * requiredBabyExtra calculation:
     *  - policy.allowedAdultExtra indicates how many 3+ (or unknown-age) guests are allowed among extraGuests
     *  - therefore, at least (extraGuests.length - allowedAdultExtra) must be baby guests
     *    Example:
     *      - babyOnly (allowedAdultExtra=0): requiredBabyExtra = extraGuests.length
     *      - babyPlusMattress (allowedAdultExtra=1): requiredBabyExtra = max(0, extraGuests.length - 1)
     *
     * Notes:
     *  - This method does NOT enforce rules; it only computes counts and requirements for use by validators
     *    (e.g., guest selection change handling and save-time guards).
     *  - Guests with missing birthDate are treated as 3+ via isBabyGuest() returning false.
     */
    private evaluateExtraGuests(room: Room, guestsInOrder: Guest[]): {
        policy: { kind: 'default' | 'babyOnly' | 'babyPlusMattress'; allowedAdultExtra: number },
        roomNum: string,
        beds: number,
        extraBeds: number,
        totalCapacity: number,
        extraGuests: Guest[],
        babyExtraCount: number,
        adultExtraCount: number,
        requiredBabyExtra: number
    } {
        const policy = this.getExtraBedPolicyByRoom(room)
        const roomNum = (room as any)?.roomNum

        const beds = Number(room?.beds ?? 0)
        const extraBeds = Number(room?.extraBeds ?? 0)
        const totalCapacity = beds + extraBeds

        const extraGuests = guestsInOrder.slice(beds)
        const babyExtraCount = extraGuests.filter(g => this.isBabyGuest(g)).length
        const adultExtraCount = extraGuests.length - babyExtraCount

        // How many babies are REQUIRED among the extra guests given the allowed adult-extra slots
        // Example:
        //  - babyOnly: allowedAdultExtra=0 => requiredBabyExtra = extrasCount
        //  - baby+mat: allowedAdultExtra=1 => requiredBabyExtra = max(0, extrasCount - 1)
        const requiredBabyExtra = Math.max(0, extraGuests.length - policy.allowedAdultExtra)

        return {
            policy,
            roomNum,
            beds,
            extraBeds,
            totalCapacity,
            extraGuests,
            babyExtraCount,
            adultExtraCount,
            requiredBabyExtra
        }
    }

    /**
     * Reverts the guest selection for a given room back to the last known valid state.
     *
     * Why this exists:
     *  - We validate guest selection while the user is clicking in the UI.
     * - If the new selection violates capacity/policy rules, we must roll back the UI control value
     *   (guests) and the backend payload field (guestIds) to the previous valid IDs.
     *
     * How it works:
     *  - Builds a lookup map from the current "nextGuests" array (id -> Guest object),
     *    then reconstructs the previous Guest[] in the exact order of prevIds.
     *  - Uses suppressEmits + emitEvent:false to avoid triggering valueChanges subscriptions again
     *    (prevents loops and double warnings).
     *  - Persists the restored state in lastSelectionByRoom for future diffs/warnings.
     *
     * Important:
     *  - This method assumes prevIds represent a valid selection for the room.
     *  - If a prevId is not found in nextGuests (should be rare), it is silently skipped.
     *
     * @param roomId    Current room id (key for lastSelectionByRoom).
     * @param nextGuests The latest Guest[] coming from the UI (may be invalid).
     * @param prevIds   The previous valid guest ID list (in selection order).
     */
    private revertGuestsToPrevious(roomId: number, nextGuests: Guest[], prevIds: number[]): void {
        const guestsById = new Map(
            nextGuests
                .filter(g => g && g.id != null)
                .map(g => [g.id as number, g])
        )

        const prevGuests: Guest[] = prevIds
            .map(id => guestsById.get(id))
            .filter((g): g is Guest => !!g)

        this.suppressEmits = true
        this.reservationForm.patchValue(
            { guests: prevGuests, guestIds: prevIds },
            { emitEvent: false }
        )
        this.suppressEmits = false

        this.lastSelectionByRoom.set(roomId, prevIds)
    }

    /**
     * Builds a human-friendly validation message for "special-policy" rooms when saving is blocked.
     *
     * Intended use:
     *  - When the room is filled up to total capacity (beds + extraBeds),
     *    and policy requires that some of the extra spots must be occupied by 0–3 year old guests.
     *  - Example (requiredBabyExtra = 1, totalCapacity = 5):
     *      "Ebbe a szobába összesen 5 fő kerülhet, amiből az egyik 0–3 év közötti!"
     *
     * Rules:
     *  - If requiredBabyExtra <= 0, no special requirement exists -> return empty string.
     *  - For 1 required baby, use the singular wording.
     *  - For 2+ required babies, use the plural wording with "legalább {requiredBabyExtra}".
     *
     * @param totalCapacity      Total allowed headcount in the room (beds + extraBeds).
     * @param requiredBabyExtra  Minimum number of 0–3 guests required among the extra guests.
     * @returns A Hungarian warning string suitable for toast/validation UI.
     */
    private buildRoomPolicySaveMessage(totalCapacity: number, requiredBabyExtra: number): string {
        if (requiredBabyExtra <= 0) return ''

        if (requiredBabyExtra === 1) {
            return `Ebbe a szobába összesen ${totalCapacity} fő kerülhet, amiből az egyik 0–3 év közötti!`
        }

        return `Ebbe a szobába összesen ${totalCapacity} fő kerülhet, amiből legalább ${requiredBabyExtra} fő 0–3 év közötti!`
    }

    // Don't delete this, its needed from a performance point of view,
    ngOnDestroy(): void {
    }
}
