import { Component, OnDestroy, OnInit } from '@angular/core';
import { MessageService, ConfirmationService } from 'primeng/api';
import { EMPTY, Observable, Subject, Subscription, catchError, filter, map, switchMap, tap } from 'rxjs';
import { Table } from 'primeng/table';
import { Room } from '../../api/room';
import { Conference } from '../../api/conference';
import { ApiResponse } from '../../api/ApiResponse';
import { RoomService } from '../../service/room.service';
import { UserService } from '../../service/user.service';
import { ConferenceService, ConferenceStatsMap } from '../../service/conference.service';
import * as moment from 'moment';
moment.locale('hu')

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
    numberOfFilteredBeds: number = 0             // Number of filtered beds
    numberOfFilteredGuests: number = 0           // Number of filtered guests
    showOnlyFreeRooms: boolean = false           // Toggle: show only rooms which are free (no overlap with selected conferences)
    private readonly FULL_FETCH_ROWS = 9999
    private readonly queryTrigger$ = new Subject<{ force: boolean }>()
    private readonly subs = new Subscription()
    private lastQueryKey = ''

    constructor(
        private roomService: RoomService,
        private conferenceService: ConferenceService,
        private userService: UserService,
        private messageService: MessageService,
        private confirmationService: ConfirmationService
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
                })
        )
    }

    ngOnDestroy(): void {
        this.subs.unsubscribe()
        Object.keys(this.debounce).forEach(key => clearTimeout(this.debounce[key]))
    }

    showDialog() {
        this.visible = true
        this.doQuery(true)
    }

    /**
     * Load filtered room data into the Table
     * @returns
     */
    doQuery(force = false) {
        this.queryTrigger$.next({ force })
    }

    private buildQueryRequest(): { key: string, request$: Observable<ApiResponse> } {
        if (this.selectedConferences) {
            this.filterValues['notAssignedConferences'] = this.selectedConferences.map((item: any) => item.id).join(',')
        }

        const filters = Object.keys(this.filterValues)
            .map(key => this.filterValues[key].length > 0 ? `${key}=${this.filterValues[key]}` : '')
        const queryParams = filters.filter(x => x.length > 0).join('&')

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
            const date = moment(event)
            filterValue = date.format('YYYY.MM.DD')
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
                accept: () => this.executeAssign(selectedConferenceId, rooms, roomIds)
            })
            return
        }

        this.executeAssign(selectedConferenceId, rooms, roomIds)
    }

    /**
     * Executes the room-to-conference assignment call and updates the UI state on success/failure.
     *
     * - Calls backend to bind the given roomIds to the given conferenceId
     * - Shows a success/error toast
     * - On success: recalculates and increments the displayed bed count, clears selection,
     *   refreshes conference stats, and reloads the table data
     *
     * @param conferenceId Target conference ID to which rooms will be assigned
     * @param rooms        The selected Room objects (used for local bed count recalculation)
     * @param roomIds      The selected room IDs sent to the backend
     */
    private executeAssign(conferenceId: number, rooms: Room[], roomIds: number[]): void {
        this.conferenceService.assignRoomsToConference(conferenceId, roomIds).subscribe({
            next: () => {
                this.messageService.add({
                    severity: 'success',
                    summary: 'Sikeres szoba-konferencia összerendelés',
                    detail: 'Szobák hozzárendelve',
                })

                // Recalculate beds
                let additionalBeds = 0
                rooms.forEach((room: Room) => {
                    additionalBeds += room.beds || 0
                })

                this.numberOfBeds += additionalBeds
                this.selectedRooms = []
                this.refreshSelectedConferenceStats()
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
                this.refreshSelectedConferenceStats() // update Guests/Beds from /stats
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

    /**
     * Calculate Conference Guests and Beds
     * @param selectedConferences
     * @returns
     */
    private calculateConferenceGuestsAndBeds(selectedConferences: Conference[]): { guests: number, beds: number } {
        // If no conference are selected we return with 0
        if (!selectedConferences || selectedConferences.length === 0) {
            return { guests: 0, beds: 0 }
        }

        // Calculate Guests number
        const guests = selectedConferences.reduce((total, conference) =>
            total + (conference.guestsNumber || 0), 0)

        // Calculate Beds number
        const beds = selectedConferences.reduce((total, conference) => {
            const conferenceBeds = conference?.rooms?.reduce((roomTotal, room) =>
                roomTotal + (room.beds || 0), 0) || 0
            return total + conferenceBeds
        }, 0)

        return { guests, beds }
    }

    /** Sum stats coming from /conference/stats for the given ids */
    private applyStatsToTarget(stats: ConferenceStatsMap, ids: number[], target: 'selected' | 'filter'): void {
        const totals = ids.reduce((acc, id) => {
            const s = stats[id] ?? stats[String(id)];
            acc.guests += s?.guests ?? 0;
            acc.beds += s?.beds ?? 0;
            return acc;
        }, { guests: 0, beds: 0 });

        if (target === 'selected') {
            this.numberOfGuests = totals.guests;
            this.numberOfBeds = totals.beds;
        } else {
            this.numberOfFilteredGuests = totals.guests;
            this.numberOfFilteredBeds = totals.beds;
        }
    }

    /** Load stats from backend for conference list and write into the proper target fields. */
    private loadConferenceStats(confs: Conference[] | null | undefined, target: 'selected' | 'filter'): void {
        const ids = (confs ?? []).map(c => Number(c?.id)).filter(Boolean);

        if (!ids.length) {
            if (target === 'selected') {
                this.numberOfGuests = 0;
                this.numberOfBeds = 0;
            } else {
                this.numberOfFilteredGuests = 0;
                this.numberOfFilteredBeds = 0;
            }
            return;
        }

        this.conferenceService.getConferenceStatsByIds(ids).subscribe({
            next: (stats) => this.applyStatsToTarget(stats, ids, target),
            error: () => {
                // Safe fallback: keep old client-side calc if API fails for any reason
                const calc = this.calculateConferenceGuestsAndBeds(confs as Conference[]);
                if (target === 'selected') {
                    this.numberOfGuests = calc.guests;
                    this.numberOfBeds = calc.beds;
                } else {
                    this.numberOfFilteredGuests = calc.guests;
                    this.numberOfFilteredBeds = calc.beds;
                }
            }
        });
    }

    /** Convenience refresher for currently selected conference(s) */
    private refreshSelectedConferenceStats(): void {
        this.loadConferenceStats(this.selectedConferences, 'selected');
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

        // Parse date-only values as local midnight (half-open interval compatibility).
        const dateOnly = moment(dateValue, 'YYYY-MM-DD', true)
        if (dateOnly.isValid()) {
            return dateOnly.startOf('day').valueOf()
        }

        const iso = moment(dateValue, moment.ISO_8601, true)
        if (iso.isValid()) return iso.valueOf()

        const fallback = moment(new Date(dateValue))
        return fallback.isValid() ? fallback.valueOf() : null
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
