import { Component, OnDestroy, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MessageService, ConfirmationService } from 'primeng/api';
import { EMPTY, Observable, Subject, Subscription, catchError, filter, firstValueFrom, map, switchMap, tap } from 'rxjs';
import { Table } from 'primeng/table';
import { Room } from '../../api/room';
import { Conference } from '../../api/conference';
import { ApiResponse } from '../../api/ApiResponse';
import { RoomService } from '../../service/room.service';
import { UserService } from '../../service/user.service';
import { ConferenceService, ConferenceStatsMap } from '../../service/conference.service';
import { ReservationService } from '../../service/reservation.service';
import { formatDateCompact, formatDateDots, toEpoch as toDateEpoch } from '../../utils/date.utils';
import { saveBlobAsFile } from '../../utils/file-saver.utils';
import { mapRoomForExport } from '../../utils/room-export.utils';

@Component({
    selector: 'app-room-conference-binder',
    templateUrl: './room-conference-binder.component.html',
    styleUrls: ['./room-conference-binder.component.scss'],
    providers: [MessageService, ConfirmationService]
})
export class RoomConferenceBinderComponent implements OnInit, OnDestroy {
    visible: boolean = false                     // Visibility of the component
    loading: boolean = false                     // Loading overlay trigger value
    tableData: Room[] = []                       // Data set displayed in a table
    rowsPerPageOptions = [20, 50, 100, 9999]     // Possible rows per page
    rowsPerPage: number = 20                     // Default rows per page
    totalRecords: number = 0                     // Total number of rows in the table
    page: number = 0                             // Current page
    sortField: string = ''                       // Current sort field
    sortOrder: number = 1                        // Current sort order
    globalFilter: string = ''                    // Global filter
    filterValues: { [key: string]: string } = {} // Table filter conditions
    debounce: { [key: string]: any } = {}        // Search delay in filter field
    selectedConferences: Conference[] = []
    selectedFilterConferences: Conference[] = []
    selectedRooms: Room[] = []                   // Selected rooms
    canBindRoomToConference: boolean = true      // User has permission to bind Room to Conference
    numberOfBeds: number = 0                     // Number of beds
    numberOfGuests: number = 0                   // Number of guests
    numberOfGuestsWaitingForRoom: number = 0     // Guests without assigned room
    numberOfAssignableBeds: number = 0           // Beds in the full currently assignable result set
    numberOfFilteredBeds: number = 0             // Number of filtered beds
    numberOfFilteredGuests: number = 0           // Number of filtered guests
    showOnlyFreeRooms: boolean = false           // Toggle: show only rooms which are free (no overlap with selected conferences)
    selectedStatsLoading: boolean = false
    private readonly FULL_FETCH_ROWS = 9999
    private readonly queryTrigger$ = new Subject<{ force: boolean }>()
    private readonly subs = new Subscription()
    private lastQueryKey = ''
    private assignableBedsRequestId = 0
    private selectedStatsRequestId = 0
    private filteredStatsRequestId = 0
    private assignableBedsLastSuccessKey = ''
    private selectedStatsLastSuccessKey = ''
    private filteredStatsLastSuccessKey = ''
    private pendingSummaryRefreshAfterTableReload = false

    get guestSummaryTooltip(): string {
        return `Vendég összesen: ${this.numberOfGuests} Ebből szobára vár: ${this.numberOfGuestsWaitingForRoom}`
    }

    get filteredGuestSummaryTooltip(): string {
        return `Szobához rendelt konferenciák vendégei: ${this.numberOfFilteredGuests}`
    }

    get bedAvailabilityValue(): number {
        return this.numberOfMissingBeds > 0 ? this.numberOfMissingBeds : this.numberOfFreeBeds
    }

    get bedAvailabilityTooltip(): string {
        if (this.numberOfMissingBeds > 0) {
            return `Ágyak összesen: ${this.numberOfBeds} Hiányzó ágyak: ${this.numberOfMissingBeds}`
        }

        return `Ágyak összesen: ${this.numberOfBeds} Szabad ágyak: ${this.numberOfFreeBeds}`
    }

    get filteredBedSummaryTooltip(): string {
        if (this.numberOfFilteredFreeBeds > 0) {
            return `Szobához rendelt konferenciák ágyai: ${this.numberOfFilteredBeds}\nSzabad ágyak: ${this.numberOfFilteredFreeBeds}`
        }

        return `Szobához rendelt konferenciák ágyai: ${this.numberOfFilteredBeds}`
    }

    get assignableBedSelectionTooltip(): string {
        return `Hozzárendelhető ágyak: ${this.numberOfAssignableBeds}\nKijelölt szobák ágya: ${this.numberOfSelectedRoomBeds}\nMég hozzáadható: ${this.numberOfRemainingAssignableBeds}`
    }

    get numberOfFreeBeds(): number {
        return Math.max(this.numberOfBeds - this.numberOfGuests, 0)
    }

    get numberOfMissingBeds(): number {
        return Math.max(this.numberOfGuests - this.numberOfBeds, 0)
    }

    get numberOfFilteredFreeBeds(): number {
        return Math.max(this.numberOfFilteredBeds - this.numberOfFilteredGuests, 0)
    }

    get numberOfSelectedRoomBeds(): number {
        return this.sumRoomBeds(this.selectedRooms)
    }

    get numberOfRemainingAssignableBeds(): number {
        return Math.max(this.numberOfAssignableBeds - this.numberOfSelectedRoomBeds, 0)
    }

    get bedAvailabilityLabel(): string {
        if (this.numberOfMissingBeds > 0) {
            return `Hiány: ${this.numberOfMissingBeds}`
        }

        return `Szabad: ${this.numberOfFreeBeds}`
    }

    get assignmentAdvice(): string {
        if (!this.selectedConferences?.length) {
            return 'Válasszon konferenciát, majd rendeljen hozzá szobákat. A felső számok mutatják a kapacitást és a szobára váró vendégeket.'
        }

        if (this.numberOfMissingBeds > 0) {
            if (this.numberOfGuestsWaitingForRoom > 0) {
                return `Még ${this.numberOfMissingBeds} ágy hozzárendelése szükséges, és ${this.numberOfGuestsWaitingForRoom} vendég még szobára vár.`
            }

            return `Még ${this.numberOfMissingBeds} ágy hozzárendelése szükséges.`
        }

        if (this.numberOfGuestsWaitingForRoom > 0) {
            if (this.numberOfFreeBeds > 0) {
                return `A kapacitás elegendő, még ${this.numberOfFreeBeds} szabad ágy marad, de ${this.numberOfGuestsWaitingForRoom} vendég még szobára vár.`
            }

            return `A kapacitás elegendő, de ${this.numberOfGuestsWaitingForRoom} vendég még szobára vár.`
        }

        if (this.numberOfFreeBeds > 0) {
            return `A kapacitás elegendő, még ${this.numberOfFreeBeds} szabad ágy marad.`
        }

        return 'A kapacitás pontosan kitöltött.'
    }

    get assignmentAdviceVariant(): 'info' | 'warning' | 'attention' | 'success' {
        if (!this.selectedConferences?.length) {
            return 'info'
        }

        if (this.numberOfMissingBeds > 0) {
            return 'warning'
        }

        if (this.numberOfGuestsWaitingForRoom > 0) {
            return 'attention'
        }

        return 'success'
    }

    get isAssignmentAdviceLoading(): boolean {
        if (!this.selectedConferences?.length) {
            return false
        }

        return this.selectedStatsLoading
    }

    constructor(
        private roomService: RoomService,
        private conferenceService: ConferenceService,
        private reservationService: ReservationService,
        private userService: UserService,
        private messageService: MessageService,
        private confirmationService: ConfirmationService,
        private translate: TranslateService
    ) { }

    /** The array actually shown in the table (original or filtered by "free") */
    get displayedRooms(): Room[] {
        if (!this.showOnlyFreeRooms || !this.selectedConferences?.length) return this.tableData;
        return this.tableData.filter(room => !this.roomHasOverlapWithSelected(room));
    }

    /** Table rows: hide stale rows while a fresh query is in-flight */
    get tableRows(): Room[] {
        return this.loading ? [] : this.displayedRooms;
    }

    /** Keep paginator/report consistent with the currently rendered list */
    get tableTotalRecords(): number {
        if (this.loading) return 0;
        return this.showOnlyFreeRooms ? this.displayedRooms.length : this.totalRecords;
    }

    ngOnInit() {
        // Permissions
        this.subs.add(
            this.userService.hasRole(['Super Admin', 'Nagy Admin', 'Kis Admin']).subscribe(canBindRoomToConference => this.canBindRoomToConference = canBindRoomToConference)
        )

        // Query pipeline with switchMap: latest query wins and stale responses are ignored
        this.subs.add(
            this.queryTrigger$
                .pipe(
                    map(trigger => ({
                        trigger,
                        request: this.buildQueryRequest()
                    })),
                    filter(({ trigger, request }) =>
                        trigger.force || request.key !== this.lastQueryKey
                    ),
                    tap(({ request }) => {
                        this.lastQueryKey = request.key
                        this.loading = true
                    }),
                    switchMap(({ request }) => request.request$.pipe(
                        catchError((error: any) => {
                            this.loading = false
                            this.lastQueryKey = ''
                            this.pendingSummaryRefreshAfterTableReload = false
                            this.messageService.add({
                                severity: 'error',
                                summary: 'Szobák lekérdezése sikertelen',
                                detail: `Hiba: ${error?.message || error}`,
                            })
                            return EMPTY
                        })
                    ))
                )
                .subscribe((data: ApiResponse) => {
                    this.loading = false
                    if (!data) return

                    this.tableData = data.rows || []
                    this.totalRecords = data.totalItems || 0
                    this.page = data.currentPage || 0
                    this.syncSelectedRoomsWithCurrentData()

                    if (this.pendingSummaryRefreshAfterTableReload) {
                        this.refreshConferenceSummaries(true)
                        this.pendingSummaryRefreshAfterTableReload = false
                    }
                })
        )
    }

    ngOnDestroy(): void {
        this.subs.unsubscribe()
        Object.keys(this.debounce).forEach(key => clearTimeout(this.debounce[key]))
    }

    showDialog() {
        this.visible = true
        this.selectedRooms = []
        this.refreshConferenceSummaries()
        this.doQuery(true)
    }

    /**
     * Load filtered room data into the Table
     * @returns
     */
    doQuery(force = false) {
        this.loadAssignableBedStats(force)
        this.queryTrigger$.next({ force })
    }

    private buildQueryRequest(): { key: string, request$: Observable<ApiResponse> } {
        const queryParams = this.buildRoomQueryParams()

        if (this.globalFilter !== '') {
            const key = JSON.stringify({
                mode: 'search',
                globalFilter: this.globalFilter,
                sortField: this.sortField,
                sortOrder: this.sortOrder
            })

            return {
                key,
                request$: this.roomService.getBySearch$(this.globalFilter, { sortField: this.sortField, sortOrder: this.sortOrder })
            }
        }

        const shouldFetchFullSetForFreeFilter =
            this.showOnlyFreeRooms && !!this.selectedConferences?.length

        const fetchPage = shouldFetchFullSetForFreeFilter ? 0 : this.page
        const fetchRows = shouldFetchFullSetForFreeFilter ? this.FULL_FETCH_ROWS : this.rowsPerPage

        const key = JSON.stringify({
            mode: 'list',
            fetchPage,
            fetchRows,
            sortField: this.sortField,
            sortOrder: this.sortOrder,
            queryParams
        })

        return {
            key,
            request$: this.roomService.get$(fetchPage, fetchRows, { sortField: this.sortField, sortOrder: this.sortOrder }, queryParams)
        }
    }

    private buildRoomQueryParams(): string {
        this.filterValues['notAssignedConferences'] = this.selectedConferences?.map((item: any) => item.id).join(',') ?? ''

        const filters = Object.keys(this.filterValues)
            .map(key => this.filterValues[key].length > 0 ? `${key}=${this.filterValues[key]}` : '')

        return filters.filter(x => x.length > 0).join('&')
    }

    private buildAssignableBedStatsRequest(): { key: string, request$: Observable<ApiResponse> } | null {
        const conferenceIds = this.selectedConferences?.map((conference: any) => Number(conference?.id)).filter(id => Number.isFinite(id)) ?? []

        if (!conferenceIds.length) {
            return null
        }

        const queryParams = this.buildRoomQueryParams()

        if (this.globalFilter !== '') {
            const key = JSON.stringify({
                mode: 'assignable-search',
                globalFilter: this.globalFilter,
                sortField: this.sortField,
                sortOrder: this.sortOrder,
                queryParams
            })

            return {
                key,
                request$: this.roomService.getBySearch$(this.globalFilter, { sortField: this.sortField, sortOrder: this.sortOrder })
            }
        }

        const key = JSON.stringify({
            mode: 'assignable-list',
            sortField: this.sortField,
            sortOrder: this.sortOrder,
            queryParams
        })

        return {
            key,
            request$: this.roomService.get$(0, this.FULL_FETCH_ROWS, { sortField: this.sortField, sortOrder: this.sortOrder }, queryParams)
        }
    }

    /**
     * Filter table by column
     * @param event
     * @param field
     */
    onFilter(event: any, field: string): void {
        const noWaitFields = ['building', 'bedType', 'spareBeds', 'conferences']
        let filterValue = ''

        // For enabled field convert true to "1" and false to "0"
        if (field === 'conferences') {
            filterValue = Array.isArray(event) ? event.map((item: any) => item.id).join(',') : ''
        }

        // Calendar date as String
        else if (event instanceof Date) {
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
        this.page = 0

        // Handle immediate query or debounced query
        if (noWaitFields.includes(field)) {
            this.doQuery()
        } else {
            if (this.debounce[field]) {
                clearTimeout(this.debounce[field])
            }

            this.debounce[field] = setTimeout(() => {
                this.doQuery()
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

    onShowOnlyFreeRoomsChange(): void {
        this.page = 0
        this.doQuery()
    }

    onConferenceSelection(selectedConferences: Conference[]) {
        if (!selectedConferences?.length && this.showOnlyFreeRooms) {
            this.showOnlyFreeRooms = false
        }

        this.page = 0
        this.selectedRooms = []
        this.loadConferenceStats(selectedConferences, 'selected')
        this.doQuery()
    }

    onConferenceFilterSelection(selectedConferences: Conference[]) {
        this.loadConferenceStats(selectedConferences, 'filter')
    }

    /**
     * Assign Rooms with Conference
     * @returns
     */
    onAssign(): void {
        if (!this.selectedConferences || this.selectedConferences.length === 0) {
            return
        }

        const selectedConferenceId = Number(this.selectedConferences[0]?.id)
        if (!Number.isFinite(selectedConferenceId)) {
            return
        }

        const rooms = (this.selectedRooms ?? []) as Room[]
        const roomIds = rooms.map(r => Number(r?.id)).filter(id => Number.isFinite(id))
        if (!roomIds.length) {
            return
        }

        const hasAnyAlreadyAssignedElsewhere = rooms.some(r =>
            this.roomHasOtherEnabledConference(r, selectedConferenceId)
        )

        if (hasAnyAlreadyAssignedElsewhere) {
            this.confirmationService.confirm({
                header: 'Megerősítés',
                message: 'Az adott szoba már tartozik másik konfihoz. Biztosan kiválasztja?',
                icon: 'pi pi-exclamation-triangle',
                acceptLabel: 'Igen',
                rejectLabel: 'Mégsem',
                accept: () => this.executeAssign(selectedConferenceId, roomIds)
            })
            return
        }

        this.executeAssign(selectedConferenceId, roomIds)
    }

    exportExcel(): void {
        import("xlsx").then(xlsx => {
            this.getRowsForExport()
                .then((rows) => {
                    const data = rows.map((row: Room) => mapRoomForExport(row, this.translate))
                    const worksheet = xlsx.utils.json_to_sheet(data)
                    const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] }
                    const excelBuffer = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' })
                    this.saveAsExcelFile(excelBuffer, 'rooms')
                })
                .catch(() => {
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Export hiba',
                        detail: 'A szoba exportálása nem sikerült.'
                    })
                })
        })
    }

    /**
     * Executes the room-to-conference assignment call and updates the UI state on success/failure.
     *
     * - Calls backend to bind the given roomIds to the given conferenceId
     * - Shows a success/error toast
     * - On success: clears selection, refreshes conference-related header stats,
     *   and reloads the table data
     *
     * @param conferenceId Target conference ID to which rooms will be assigned
     * @param roomIds      The selected room IDs sent to the backend
     */
    private executeAssign(conferenceId: number, roomIds: number[]): void {
        this.conferenceService.assignRoomsToConference(conferenceId, roomIds).subscribe({
            next: () => {
                this.messageService.add({
                    severity: 'success',
                    summary: 'Sikeres szoba-konferencia összerendelés',
                    detail: 'Szobák hozzárendelve',
                })

                this.selectedRooms = []
                this.pendingSummaryRefreshAfterTableReload = true
                this.doQuery(true)
            },
            error: (error: any) => {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Sikertelen szoba-konferencia összerendelés',
                    detail: `Hiba: ${error}`,
                })
            }
        })
    }

    private saveAsExcelFile(buffer: any, fileName: string): void {
        const excelType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8'
        const excelExtension = '.xlsx'
        const data: Blob = new Blob([buffer], { type: excelType })
        saveBlobAsFile(data, fileName + '_export_' + formatDateCompact(new Date()) + excelExtension)
    }

    private async getRowsForExport(): Promise<Room[]> {
        if (this.selectedRooms.length > 0) {
            return this.selectedRooms
        }

        if (this.showOnlyFreeRooms) {
            return this.displayedRooms
        }

        if (this.globalFilter !== '') {
            const response = await firstValueFrom(
                this.roomService.getBySearch$(this.globalFilter, {
                    sortField: this.sortField,
                    sortOrder: this.sortOrder
                })
            )

            return response?.rows ?? []
        }

        const response = await firstValueFrom(
            this.roomService.get$(
                0,
                Math.max(this.totalRecords || 0, this.tableData.length || 0, 1),
                { sortField: this.sortField, sortOrder: this.sortOrder },
                this.buildRoomQueryParams()
            )
        )

        return response?.rows ?? []
    }

    /**
     * unAssign Rooms from Conference
     * @param conference
     * @param room
     */
    onRemove(conference: any, room: any) {
        this.conferenceService.removeRoomsFromConference(conference.id, [room.id]).subscribe({
            next: () => {
                this.messageService.add({
                    severity: 'success',
                    summary: 'Összerendelés törölve',
                    detail: `Szoba-konferencia összerendelés törölve`,
                })

                this.pendingSummaryRefreshAfterTableReload = true
                this.doQuery(true)                   // reload table
            },
            error: (error: any) => {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Eltávolítás sikertelen',
                    detail: `Hiba: ${error}`,
                })
            }
        })
    }

    /** Sum stats coming from /conference/stats for the given ids */
    private applyStatsToTarget(stats: ConferenceStatsMap, ids: number[], target: 'selected' | 'filter'): void {
        const totals = ids.reduce((acc, id) => {
            const s = stats[id] ?? stats[String(id)];
            acc.guests += s?.guests ?? 0;
            acc.beds += s?.beds ?? 0;
            return acc;
        }, { guests: 0, beds: 0 });

        if (target === 'filter') {
            this.numberOfFilteredGuests = totals.guests;
            this.numberOfFilteredBeds = totals.beds;
        }
    }

    /** Load stats from backend for conference list and write into the proper target fields. */
    private loadConferenceStats(
        confs: Conference[] | null | undefined,
        target: 'selected' | 'filter',
        forceRefresh = false
    ): void {
        if (target === 'selected') {
            this.loadSelectedConferenceSummary(confs)
            return
        }

        const requestId = ++this.filteredStatsRequestId
        const ids = (confs ?? []).map(c => Number(c?.id)).filter(Boolean)
        const statsKey = ids.join(',')

        if (!ids.length) {
            this.filteredStatsLastSuccessKey = ''
            this.numberOfFilteredGuests = 0
            this.numberOfFilteredBeds = 0
            return
        }

        this.conferenceService.getConferenceStatsByIds(ids, {
            forceRefresh
        }).subscribe({
            next: (stats) => {
                if (requestId !== this.filteredStatsRequestId) return
                this.applyStatsToTarget(stats, ids, target)
                this.filteredStatsLastSuccessKey = statsKey
            },
            error: () => {
                if (requestId !== this.filteredStatsRequestId) return
                if (this.filteredStatsLastSuccessKey !== statsKey) {
                    this.numberOfFilteredGuests = 0
                    this.numberOfFilteredBeds = 0
                }
            }
        })
    }

    private refreshConferenceSummaries(forceRefresh = false): void {
        this.loadAssignableBedStats(forceRefresh)
        this.loadConferenceStats(this.selectedConferences, 'selected')
        this.loadConferenceStats(this.selectedFilterConferences, 'filter', forceRefresh)
    }

    private loadAssignableBedStats(forceRefresh = false): void {
        const request = this.buildAssignableBedStatsRequest()
        const requestId = ++this.assignableBedsRequestId

        if (!request) {
            this.assignableBedsLastSuccessKey = ''
            this.numberOfAssignableBeds = 0
            return
        }

        if (!forceRefresh && request.key === this.assignableBedsLastSuccessKey) {
            return
        }

        request.request$.subscribe({
            next: (data) => {
                if (requestId !== this.assignableBedsRequestId) return

                const rooms = data?.rows ?? []
                const freeRooms = rooms.filter(room => !this.roomHasOverlapWithSelected(room))

                this.numberOfAssignableBeds = this.sumRoomBeds(freeRooms)
                this.assignableBedsLastSuccessKey = request.key
            },
            error: () => {
                if (requestId !== this.assignableBedsRequestId) return

                if (this.assignableBedsLastSuccessKey !== request.key) {
                    this.numberOfAssignableBeds = 0
                }
            }
        })
    }

    private loadSelectedConferenceSummary(confs: Conference[] | null | undefined): void {
        const requestId = ++this.selectedStatsRequestId
        const conferenceId = Number(confs?.[0]?.id)
        const statsKey = Number.isFinite(conferenceId) ? String(conferenceId) : ''

        if (!Number.isFinite(conferenceId)) {
            this.selectedStatsLoading = false
            this.selectedStatsLastSuccessKey = ''
            this.numberOfGuests = 0
            this.numberOfBeds = 0
            this.numberOfGuestsWaitingForRoom = 0
            return
        }

        this.selectedStatsLoading = true
        this.reservationService.getConferenceSummary$(conferenceId).subscribe({
            next: (summary) => {
                if (requestId !== this.selectedStatsRequestId) return

                this.numberOfGuests = summary.registeredGuests
                this.numberOfBeds = summary.totalBeds
                this.numberOfGuestsWaitingForRoom = summary.waitingForRoom
                this.selectedStatsLastSuccessKey = statsKey
                this.selectedStatsLoading = false
            },
            error: () => {
                if (requestId !== this.selectedStatsRequestId) return

                if (this.selectedStatsLastSuccessKey !== statsKey) {
                    this.numberOfGuests = 0
                    this.numberOfBeds = 0
                    this.numberOfGuestsWaitingForRoom = 0
                }
                this.selectedStatsLoading = false
            }
        })
    }

    getConferenceChipStyleClass(room: Room, conference: any): string {
        if (this.isConferenceOverlapping(conference)) {
            return 'bg-red-100'
        }

        if (this.isPotentiallyRemovableConference(room, conference)) {
            return 'binder-conference-chip--removable'
        }

        return ''
    }

    getConferenceChipTooltip(room: Room, conference: any): string | undefined {
        if (this.isConferenceOverlapping(conference)) {
            return 'Átfedés van a konferenciával, amihez szobát rendelne. Az X-re kattintva megszüntetheti ezt az összerendelést.'
        }

        if (this.isPotentiallyRemovableConference(room, conference)) {
            return 'A jelenlegi kapacitás alapján ez a szoba eltávolítható lehet erről a konferenciáról. Az X-re kattintva megszüntetheti az összerendelést.'
        }

        return 'Az X-re kattintva megszüntetheti a szoba és konferencia összerendelését.'
    }

    private isPotentiallyRemovableConference(room: Room, conference: any): boolean {
        const filterConferenceId = this.getSingleSelectedFilterConferenceId()
        const chipConferenceId = this.getConferenceId(conference)
        const roomBeds = Number(room?.beds) || 0

        if (!Number.isFinite(filterConferenceId) || !Number.isFinite(chipConferenceId)) return false
        if (filterConferenceId !== chipConferenceId) return false
        if (roomBeds <= 0 || this.numberOfFilteredFreeBeds <= 0) return false

        return (this.numberOfFilteredBeds - roomBeds) >= this.numberOfFilteredGuests
    }

    private getSingleSelectedFilterConferenceId(): number {
        if ((this.selectedFilterConferences?.length ?? 0) !== 1) return NaN
        return this.getConferenceId(this.selectedFilterConferences[0])
    }

    private getConferenceId(conference: any): number {
        const conferenceId = Number(conference?.id ?? conference?.conferenceId)
        return Number.isFinite(conferenceId) ? conferenceId : NaN
    }

    /**
     * Check if there is an overlap between the given conference and
     * the one for which we would like to assign the room
     * @param conference
     * @returns
     */
    isConferenceOverlapping(conference: Conference): boolean {
        // Check whether both dates are specified for the current conference
        if (!conference.beginDate || !conference.endDate) {
            return false
        }

        // Check whether both dates are specified for the selected conference
        return this.selectedConferences.some(selected => this.overlaps(conference, selected))
    }

    /** Date overlap helper (zárt, lokális segédfv.) */
    private overlaps(a: Conference, b: Conference): boolean {
        if (!a?.beginDate || !a?.endDate || !b?.beginDate || !b?.endDate) return false;
        const aStart = this.toEpoch(a.beginDate)
        const aEnd = this.toEpoch(a.endDate)
        const bStart = this.toEpoch(b.beginDate)
        const bEnd = this.toEpoch(b.endDate)

        if (aStart == null || aEnd == null || bStart == null || bEnd == null) return false;
        return aStart < bEnd && aEnd > bStart; // strict overlap
    }

    private toEpoch(dateValue: string | null | undefined): number | null {
        if (!dateValue) return null
        return toDateEpoch(dateValue)
    }

    /** Room has ANY enabled conference overlapping with ANY selected conference? */
    private roomHasOverlapWithSelected(room: Room): boolean {
        if (!this.selectedConferences?.length) return false;
        const enabledConfs = (room?.conferences ?? []).filter((c: any) => c?.enabled);
        return enabledConfs.some((rc: any) => this.selectedConferences.some(sc => this.overlaps(rc, sc)));
    }

    private syncSelectedRoomsWithCurrentData(): void {
        if (!this.selectedRooms?.length || !this.tableData?.length) {
            if (!this.tableData?.length) this.selectedRooms = []
            return
        }

        const byId = new Map<string, Room>(
            this.tableData
                .filter(room => room?.id != null)
                .map(room => [String(room.id), room] as [string, Room])
        )

        this.selectedRooms = this.selectedRooms
            .map(room => byId.get(String(room?.id)))
            .filter((room): room is Room => !!room)
    }

    private sumRoomBeds(rooms: Room[] | null | undefined): number {
        return (rooms ?? []).reduce((total, room) => total + Math.max(Number(room?.beds) || 0, 0), 0)
    }

    /**
     * Checks whether the given room is already assigned to ANY other enabled conference
     * than the currently selected one.
     *
     * Used to trigger a confirmation dialog before assigning a room to a conference,
     * because this action may result in the room being linked to multiple conferences.
     *
     * Note:
     * - Only conferences with `enabled === true` are considered.
     * - The conference id can come from different shapes (`c.id` or `c.conferenceId`),
     *   so we normalize it to a number before comparison.
     *
     * @param room                Room to inspect (expects `room.conferences` to be present)
     * @param selectedConferenceId Currently selected conference id (the "target" conference)
     * @returns true if the room has at least one enabled conference with a different id
     */
    private roomHasOtherEnabledConference(room: Room, selectedConferenceId: number): boolean {
        const enabledConfs = (room?.conferences ?? []).filter((c: any) => c?.enabled)

        // Find the currently selected conference object for overlap checking
        const selectedConf = this.selectedConferences.find(sc => Number(sc?.id) === selectedConferenceId)

        return enabledConfs.some((c: any) => {
            const cid = Number(c?.id ?? c?.conferenceId)
            // Must be a different conference AND must overlap with the selected one in time
            return Number.isFinite(cid) && cid !== selectedConferenceId && this.overlaps(c, selectedConf as Conference)
        })
    }

    // Used by Angular *ngFor to efficiently track list items by their unique ID.
    // This function handles both object and primitive (number/string) values safely.
    // If the item is an object, it returns its 'id'; otherwise, it returns the value itself.
    trackById = (_: number, item: { id?: number | string } | number | string) =>
        typeof item === 'object' ? (item as any)?.id ?? _ : item;
}
