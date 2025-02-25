import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { Table } from 'primeng/table';
import { Room } from '../../api/room';
import { Conference } from '../../api/conference';
import { ApiResponse } from '../../api/ApiResponse';
import { RoomService } from '../../service/room.service';
import { ConferenceService } from '../../service/conference.service';
import * as moment from 'moment';

moment.locale('hu')

@Component({
    selector: 'app-room-conference-binder',
    templateUrl: './room-conference-binder.component.html',
    providers: [MessageService]
})
export class RoomConferenceBinderComponent {
    @Input() visible: boolean = true // TODO: Set to false
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
    selectedRooms: number[] = [];
    canBindRoomToConference: boolean = true;

    private roomObs$: Observable<any> | undefined
    private conferenceObs$: Observable<any> | undefined

    constructor(
        private roomService: RoomService,
        private conferenceService: ConferenceService
    ) {}

    ngOnInit() {
        // Conferences
        this.conferenceObs$ = this.conferenceService.conferenceObs
        this.conferenceObs$.subscribe((data: ApiResponse) => {
            this.loading = false
            if (data) {
                this.conferences = data.rows || []
            }
        })

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

    loadAvailableRooms() {
        if (!this.selectedConferences) return;
        this.roomService
            .getAvailableRooms(this.selectedConferences)
            .subscribe((rooms) => {
                this.tableData = rooms;
            });
    }

    showDialog() {
        this.loadAvailableRooms();
        this.canBindRoomToConference = true;
        this.visible = true;
    }

    setSelectedConference(event: any) {
        // this.selectedConference = event.value ? event.value : null
        // this.filterValues['conferenceName'] = this.selectedConference?.name || ''
        // this.tableData = []
        // this.doQuery()
    }

    onConferenceChange() {
        this.selectedRooms = [];
        this.loadAvailableRooms();
    }

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
        const noWaitFields = ['roomNum', 'building', 'bedType', 'spareBeds']
        let filterValue = ''

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

    onAssign() {
        this.assign.emit({
            selectedConferences: this.selectedConferences,
            selectedRooms: this.selectedRooms,
        });
        this.close.emit()
    }
}
