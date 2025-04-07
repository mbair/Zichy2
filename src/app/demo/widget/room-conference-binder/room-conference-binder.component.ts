import { Component, EventEmitter, Input, Output, isDevMode } from '@angular/core';
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
    @Input() visible: boolean = isDevMode() ? true : false // TODO: Set to false
    @Output() close = new EventEmitter<void>()
    @Output() assign = new EventEmitter<{
        selectedConferences: Conference[]
        selectedRooms: number[]
    }>()

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
    selectedRooms: number[] = [];
    canBindRoomToConference: boolean = true      // User has permission to bind Room to Conference
    selectFirstOption: boolean
    numberOfBeds: number = 0                     // Number of beds
    numberOfGuests: number = 0                   // Number of guests


    private roomObs$: Observable<any> | undefined
    private conferenceObs$: Observable<any> | undefined

    constructor(
        private roomService: RoomService,
        private conferenceService: ConferenceService,
        private userService: UserService
    ) { }

    ngOnInit() {
        // Permissions
        this.userService.hasRole(['Super Admin', 'Nagy Admin', 'Kis Admin']).subscribe(canBindRoomToConference => this.canBindRoomToConference = canBindRoomToConference)
        
        // Conferences
        this.setConferences()

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

    setConferences() {
        this.conferenceService.getConferencesForSelector().subscribe((conferences: any) => {
            this.conferences = conferences
            if (this.selectFirstOption && this.conferences.length > 0) {
                this.selectedConferences = this.conferences[0] // First conference
                // this.getFormControl()?.setValue(this.selectedConference?.name || null)
            }
        })
    }

    // loadAvailableRooms() {
    //     if (!this.selectedConferences) return;
    //     console.log('selectedConferences', this.selectedConferences)
    //     this.roomService
    //         .getAvailableRooms(this.selectedConferences)
    //         .subscribe((rooms) => {
    //             this.tableData = rooms
    //         })
    // }

    showDialog() {
        // this.loadAvailableRooms();
        this.canBindRoomToConference = true;
        this.visible = true;
    }

    /**
     * Load filtered room data into the Table
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
        const noWaitFields = ['roomNum', 'building', 'bedType', 'spareBeds', 'conferences']
        let filterValue = ''

        // Conference field is filtering by Conference Id
        if (field === 'conferences') {
            let conferenceIds = event.map((conference: any) => conference.id).join(',')
            filterValue = conferenceIds
        }
        
        // Room field is filtering by Room Id
        if (field === 'roomNum') {
            filterValue = event[0]?.id.toString() || ''
        }

        // Calendar date as String
        if (event instanceof Date) {
            const date = moment(event);
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

    onConferenceSelection(selectedConferences: Conference[]) {
        // Reset calculations when no Conference is selected
        if (selectedConferences.length == 0) {
            this.numberOfGuests = 0
            this.numberOfBeds = 0
        }

        // Calculate guests
        selectedConferences.forEach((conference: Conference) => {
            this.numberOfGuests += conference.guestsNumber || 0
        })
        
        // Calculate beds
        selectedConferences.forEach((conference: Conference) => {
            conference?.rooms?.forEach((room: Room) => {
                this.numberOfBeds += room.beds || 0
            })
        })
    }

    onAssign() {

        const conferenceId = Number(this.selectedConferences[0].id)
        const roomIds = this.selectedRooms.map((r: any) => Number(r.id))

        this.conferenceService.assignRoomsToConference(conferenceId, roomIds)
        this.selectedRooms = []
        this.selectedConferences = []
        // this.loadAvailableRooms()

        setTimeout(() => {
            this.doQuery()
        }, 100)
    }

    onRemove(conference: any, room: any) {
        this.conferenceService.removeRoomsFromConference(conference.id, [room.id])
    }
}
