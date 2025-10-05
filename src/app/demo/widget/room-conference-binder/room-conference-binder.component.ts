import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { Table } from 'primeng/table';
import { Room } from '../../api/room';
import { Conference } from '../../api/conference';
import { ApiResponse } from '../../api/ApiResponse';
import { RoomService } from '../../service/room.service';
import { UserService } from '../../service/user.service';
import { ConferenceService } from '../../service/conference.service';
import * as moment from 'moment';
moment.locale('hu')

@Component({
    selector: 'app-room-conference-binder',
    templateUrl: './room-conference-binder.component.html',
    providers: [MessageService]
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
    selectedRooms: number[] = []
    canBindRoomToConference: boolean = true      // User has permission to bind Room to Conference
    selectFirstOption: boolean
    numberOfBeds: number = 0                     // Number of beds
    numberOfGuests: number = 0                   // Number of guests
    numberOfFilteredBeds: number = 0             // Number of filtered beds
    numberOfFilteredGuests: number = 0           // Number of filtered guests

    private roomObs$: Observable<any> | undefined

    constructor(
        private roomService: RoomService,
        private conferenceService: ConferenceService,
        private userService: UserService,
        private messageService: MessageService
    ) { }

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
        const calculations = this.calculateConferenceGuestsAndBeds(selectedConferences)
        this.numberOfGuests = calculations.guests
        this.numberOfBeds = calculations.beds
        this.doQuery()
    }

    onConferenceFilterSelection(selectedConferences: Conference[]) {
        const calculations = this.calculateConferenceGuestsAndBeds(selectedConferences)
        this.numberOfFilteredGuests = calculations.guests
        this.numberOfFilteredBeds = calculations.beds
    }

    /**
     * Assign Rooms with Conference
     * @returns 
     */
    onAssign(): void {
        if (!this.selectedConferences || this.selectedConferences.length === 0) {
            return
        }

        const conferenceId = this.selectedConferences[0]
        const roomIds = this.selectedRooms.map((r: any) => Number(r.id))

        this.conferenceService.assignRoomsToConference(conferenceId, roomIds).subscribe({
            next: (response: any) => {
                this.messageService.add({
                    severity: 'success',
                    summary: 'Sikeres szoba-konferencia összerendelés',
                    detail: 'Szobák hozzárendelve',
                })

                // ReCalculate Beds number
                let additionalBeds = 0;
                (this.selectedRooms as Room[]).forEach((room: Room) => {
                    additionalBeds += room.beds || 0
                })

                this.numberOfBeds += additionalBeds;
                this.selectedRooms = []
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
        this.conferenceService.removeRoomsFromConference(conference.id, [room.id])
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

    // Used by Angular *ngFor to efficiently track list items by their unique ID.
    // This function handles both object and primitive (number/string) values safely.
    // If the item is an object, it returns its 'id'; otherwise, it returns the value itself.
    trackById = (_: number, item: { id?: number | string } | number | string) =>
        typeof item === 'object' ? (item as any)?.id ?? _ : item;
}
