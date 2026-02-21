import { Component } from '@angular/core';
import { MessageService, ConfirmationService } from 'primeng/api';
import { Observable } from 'rxjs';
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
export class RoomConferenceBinderComponent {
    visible: boolean = false                     // Visibility of the component
    apiURL: string                               // API URL depending on whether we are working on test or production
    loading: boolean = true                      // Loading overlay trigger value
    loadingConferences: boolean = true           // Loading overlay trigger value
    tableItem: Room = {}                         // One guest object
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
    conferences: any[] = []
    rooms: any[] = []
    selected: Room[] = []                        // Table items chosen by user
    selectedConferences: Conference[] = []
    selectedFilterConferences: Conference[] = []
    selectedRooms: Room[] = []                   // Selected rooms
    canBindRoomToConference: boolean = true      // User has permission to bind Room to Conference
    selectFirstOption: boolean
    numberOfBeds: number = 0                     // Number of beds
    numberOfGuests: number = 0                   // Number of guests
    numberOfFilteredBeds: number = 0             // Number of filtered beds
    numberOfFilteredGuests: number = 0           // Number of filtered guests
    showOnlyFreeRooms: boolean = false           // Toggle: show only rooms which are free (no overlap with selected conferences)

    private roomObs$: Observable<any> | undefined

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

    ngOnInit() {
        // Permissions
        this.userService.hasRole(['Super Admin', 'Nagy Admin', 'Kis Admin']).subscribe(canBindRoomToConference => this.canBindRoomToConference = canBindRoomToConference)

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
    }

    showDialog() {
        this.visible = true
    }

    /**
     * Load filtered room data into the Table
     * @returns
     */
    doQuery() {
        this.loading = true

        if (this.selectedConferences) {
            this.filterValues['notAssignedConferences'] = this.selectedConferences.map((item: any) => item.id).join(',')
        }

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
    onFilter(event: any, field: string): void {
        const noWaitFields = ['building', 'bedType', 'spareBeds', 'conferences']
        let filterValue = ''

        // For enabled field convert true to "1" and false to "0"
        if (field === 'conferences') {
            filterValue = event.map((item: any) => item.id).join(',')
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

    onConferenceSelection(selectedConferences: Conference[]) {
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
                this.doQuery()
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
                this.doQuery()                        // reload table
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
        // If no cenference are selected we return with 0
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
        return this.selectedConferences.some(selected => {
            if (!selected.beginDate || !selected.endDate) {
                return false
            }

            // Convert string values ​​to Date objects
            const conferenceBegin = new Date(conference.beginDate!)
            const conferenceEnd = new Date(conference.endDate!)
            const selectedBegin = new Date(selected.beginDate!)
            const selectedEnd = new Date(selected.endDate!)

            return conferenceBegin < selectedEnd && conferenceEnd > selectedBegin
        })
    }

    /** Date overlap helper (zárt, lokális segédfv.) */
    private overlaps(a: Conference, b: Conference): boolean {
        if (!a?.beginDate || !a?.endDate || !b?.beginDate || !b?.endDate) return false;
        const aStart = new Date(a.beginDate);
        const aEnd = new Date(a.endDate);
        const bStart = new Date(b.beginDate);
        const bEnd = new Date(b.endDate);
        return aStart < bEnd && aEnd > bStart; // strict overlap
    }

    /** Room has ANY enabled conference overlapping with ANY selected conference? */
    private roomHasOverlapWithSelected(room: Room): boolean {
        if (!this.selectedConferences?.length) return false;
        const enabledConfs = (room?.conferences ?? []).filter((c: any) => c?.enabled);
        return enabledConfs.some((rc: any) => this.selectedConferences.some(sc => this.overlaps(rc, sc)));
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
