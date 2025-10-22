import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { auditTime, BehaviorSubject, debounceTime, distinctUntilChanged, map, Observable, Subject, Subscription, switchMap, filter } from 'rxjs';
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

                // reset per-room warning state (ne vigyük át az előző szobából)
                if (first?.id != null) {
                    // induláskor vegyük a mostani kiválasztást alapnak
                    const currentGuestIds: number[] = Array.isArray(this.guestIds?.value)
                        ? this.guestIds!.value as number[]
                        : [];

                    this.lastSelectionByRoom.set(Number(first?.id), currentGuestIds);

                    // töröljük az ehhez a szobához tartozó korábbi vendég-figyelmeztetéseket
                    [...this.bedFullWarnedByGuest]
                        .filter(k => k.startsWith(`${first.id}:`))
                        .forEach(k => this.bedFullWarnedByGuest.delete(k));
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
            const room = this.getSelectedRoom();
            if (room) {
                this.onGuestsSelectionChange(room, guestsArr);
            }
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
        const isNew = !this.id?.value;
        const headerConf = this.selectedConferences?.[0];

        if (isNew && headerConf) {
            // Optional: pass to child selector as well (if it uses preselectIds internally)
            this.preselectConferenceId = headerConf.id;

            // IMPORTANT: write an array (CVA MultiSelect expects an array)
            // emitEvent: true -> triggers your existing valueChanges pipeline
            this.reservationForm.patchValue(
                { conference: [headerConf] },
                { emitEvent: true }
            );
        } else {
            this.preselectConferenceId = undefined;
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
        this.preselectRoomIds = undefined
        this.preselectGuestIds = []

        // Clean form state
        this.preselectConferenceId = undefined
        this.reservationForm.markAsPristine()
        this.reservationForm.markAsUntouched()

        // Re-enable emissions on the next tick (after hide finishes)
        queueMicrotask(() => this.suppressEmits = false)
    }

    private onGuestsSelectionChange(room: Room, nextGuests: Guest[]): void {
        const roomId = Number(room?.id);
        const beds = Number(room?.beds ?? 0);

        const prevIds = this.lastSelectionByRoom.get(roomId) ?? [];
        const nextIds = nextGuests.map(g => g.id);

        // Determine which IDs were newly added
        const prevSet = new Set(prevIds);
        const addedIds = nextIds.filter(id => !prevSet.has(id));

        // How many guests were already selected before this change
        const countBefore = prevIds.length;

        // For each newly added guest, compute their "position" after addition
        // If position > beds => this guest is over capacity -> warn (once per guest)
        let index = 0;
        for (const addedId of addedIds) {
            index += 1;
            const position = countBefore + index; // 1-based position after adding this guest
            if (position > beds) {
                const warnKey = `${roomId}:${addedId}`;
                if (!this.bedFullWarnedByGuest.has(warnKey)) {
                    const g = nextGuests.find(x => x.id === addedId);
                    const name = g ? `${g.lastName ?? ''} ${g.firstName ?? ''}`.trim() || 'A vendég' : 'A vendég';
                    this.bedFullWarnedByGuest.add(warnKey);

                    this.confirmationService.confirm({
                        header: 'Figyelmeztetés',
                        message: `${name} már nem fér ágyra! Matracra,\n vagy gyerekágyra kerülhet.`,
                        icon: 'pi pi-exclamation-triangle',
                        acceptLabel: 'OK',
                        rejectVisible: false
                    });
                }
            }
        }

        // Persist new selection for this room
        this.lastSelectionByRoom.set(roomId, nextIds);

        // Optional: if user removed down to <= beds, clear per-guest warned set for this room
        if (nextIds.length <= beds) {
            // clear all warn flags for this room to allow warnings again in future
            [...this.bedFullWarnedByGuest]
                .filter(k => k.startsWith(`${roomId}:`))
                .forEach(k => this.bedFullWarnedByGuest.delete(k));
        }
    }

    /**
     * Create new Reservation
     */
    create() {
        // keep it clean: no events on reset
        this.reservationForm.reset(this.initialFormValues, { emitEvent: false })
        this.sidebar = true // onSidebarShow() will prefill the conference if possible
    }

    /**
     * Edit the Reservation
     * @param reservation
     */
    edit(reservation: Reservation) {
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

    // Get Age by birthdate
    getAge(birthDate: string): string {
        if (!birthDate) return "";
        const birth = moment(birthDate)
        const today = moment()
        return today.diff(birth, 'years').toString()
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
        if (cap < 0) return `Túlfoglava ${Math.abs(cap)} fővel`
        return `Szabad ágy ${cap} fő részére`
    }

    // Returns a signed label, e.g. "+2", "-1"
    formatCapacityLabel(cap: number): string {
        return cap > 0 ? `+${cap}` : `${cap}`
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

    // Build a stable key for the warning memory (roomId + beds)
    private buildWarnKey(roomId: number | string | null | undefined, beds: number): string {
        const idPart = roomId != null ? String(roomId) : 'noRoom'
        return `${idPart}|beds:${beds}`
    }

    // Get currently selected room (first item from the MultiSelect)
    private getSelectedRoom(): Room | null {
        const val = this.room?.value
        return Array.isArray(val) && val.length ? (val[0] as Room) : null
    }

    // Don't delete this, its needed from a performance point of view,
    ngOnDestroy(): void {
    }
}
