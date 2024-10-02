import { Component, OnInit, HostListener, isDevMode } from '@angular/core';
import { Observable } from 'rxjs';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { Table } from 'primeng/table';
import { ApiResponse } from '../../api/ApiResponse';
import { Conference } from '../../api/conference';
import { ConferenceService } from '../../service/conference.service';
import { GuestService } from '../../service/guest.service';
import { MealService } from '../../service/meal.service';
import * as moment from 'moment';
moment.locale('hu')

@Component({
    templateUrl: './conferencelist.component.html',
    providers: [MessageService]
})

// Makes unsubscribe automatically, don't need to do manually in ngOnDestroy
// BUT!!! Don't delete ngOnDestroy, it has to stay here!
@AutoUnsubscribe()

export class ConferenceListComponent implements OnInit {

    loading: boolean = true;                     // Loading overlay trigger value
    cols: any[] = [];                            // Table columns
    tableItem: Conference = {};                  // One conference object
    tableData: Conference[] = [];                // Data set displayed in a table
    rowsPerPageOptions = [20, 50, 100];          // Possible rows per page
    rowsPerPage: number = 20;                    // Default rows per page
    totalRecords: number = 0;                    // Total number of rows in the table
    page: number = 0;                            // Current page
    sortField: string = '';                      // Current sort field
    sortOrder: number = 1;                       // Current sort order
    globalFilter: string = '';                   // Global filter
    filterValues: { [key: string]: string } = {} // Table filter conditions
    debounce: { [key: string]: any } = {}        // Search delay in filter field
    dialog: boolean = false;                     // Table item maintenance modal
    deleteDialog: boolean = false;               // Popup for deleting table item
    bulkDeleteDialog: boolean = false;           // Popup for deleting table items
    selected: Conference[] = [];                 // Table items chosen by user
    meals: any[] = [];                           // Possible meals

    private conferenceObs$: Observable<any> | undefined;
    private guestObs$: Observable<any> | undefined;
    private serviceMessageObs$: Observable<any> | undefined;

    constructor(
        private conferenceService: ConferenceService,
        private guestService: GuestService,
        private mealService: MealService,
        private messageService: MessageService,
        private router: Router) { }

    ngOnInit() {
        // Table columns
        this.cols = [
            { field: 'name', header: 'Név' },
            { field: 'beginDate', header: 'Kezdete' },
            { field: 'endDate', header: 'Vége' },
            { field: 'guestsNumber', header: 'Létszám' }, // Ötlet: Jelentkezettek / létszám
        ]

        // Conferences
        this.conferenceObs$ = this.conferenceService.conferenceObs;
        this.conferenceObs$.subscribe((data: ApiResponse) => {
            this.loading = false
            if (data) {
                this.tableData = data.rows || [];
                this.totalRecords = data.totalItems || 0;
                this.page = data.currentPage || 0;
            }
        })

        // Get meals for selector
        this.meals = this.mealService.getMealsForSelector()

        // Guests
        this.guestObs$ = this.guestService.guestObs;
        this.guestObs$.subscribe((data: ApiResponse) => {
            this.loading = false
            if (data) {
                // Filter out test users on production
                if (!isDevMode()) {
                    let notTestGuests = data.rows?.filter((guest: any) => guest.is_test == false) || []
                }
            }
        })

        // Message
        this.serviceMessageObs$ = this.conferenceService.messageObs;
        this.serviceMessageObs$.subscribe((data) => {
            this.loading = false;
            if (data == 'ERROR') {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: 'Hiba történt!'
                })
            } else {
                // Show service response message
                this.messageService.add(data)

                // Reset selected table Item(s)
                this.tableItem = {}
                this.selected = []

                // Query for data changes
                this.doQuery()
            }
        })
    }

    // Load filtered data into the Table
    doQuery() {
        this.loading = true;

        const filters = Object.keys(this.filterValues)
            .map(key => this.filterValues[key].length > 0 ? `${key}=${this.filterValues[key]}` : '')
        const queryParams = filters.filter(x => x.length > 0).join('&')

        if (this.globalFilter !== '') {
            return this.conferenceService.getBySearch(this.globalFilter, { sortField: this.sortField, sortOrder: this.sortOrder })
        }

        return this.conferenceService.get(this.page, this.rowsPerPage, { sortField: this.sortField, sortOrder: this.sortOrder }, queryParams)
    }

    onFilter(event: any, field: string) {
        const noWaitFields = ['beginDate','endDate','firstMeal', 'lastMeal']
        let filterValue = '';

        // Calendar date as String
        if (event instanceof Date) {
            const date = moment(event);
            const formattedDate = date.format('YYYY.MM.DD')
            filterValue = formattedDate
        } else {
            if (event && (event.value || event.target?.value)) {
                if (field == "rfid" && event.target?.value.length == 10) {
                    filterValue = event.target?.value.replaceAll('ö', '0')
                } else {
                    filterValue = event.value || event.target?.value
                }
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

    onLazyLoad(event: any) {
        this.page = event.first! / event.rows!;
        this.rowsPerPage = event.rows ?? this.rowsPerPage;
        this.sortField = event.sortField ?? '';
        this.sortOrder = event.sortOrder ?? 1;
        this.globalFilter = event.globalFilter ?? '';
        this.doQuery()
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains')
    }

    setFormUrl() {
        let formUrl = this.tableItem.name || ''
            formUrl = this.slugify(formUrl)
        this.tableItem.formUrl = `/conference-form/${formUrl}`
    }

    navigateToConferenceForm(conference: any) {
        console.log('navigateToConferenceForm', conference)
        // TODO: use real slug
        conference.slug = 'test_conference'
        this.router.navigateByUrl(`/conference-form/${conference.slug}`)
    }

    navigateToCreateConference(){
        this.router.navigate(['conference/create'])
    }

    delete() {
        this.loading = true;
        this.deleteDialog = false;
        this.conferenceService.delete(this.tableItem)
    }

    deleteSelected() {
        this.loading = true;
        this.deleteDialog = false;
        this.conferenceService.bulkdelete(this.selected)
    }

    save() {
        if (this.tableItem.name?.trim()) {
            // UPDATE
            if (this.tableItem.id) {
                this.conferenceService.update(this.tableItem)
            // INSERT
            } else {
                this.conferenceService.create(this.tableItem)
            }
            this.dialog = false
        }
    }

    /**
     * Converts a string to its slug form
     * @param str string to be slugified
     * @returns slugified string
     */
    slugify(str: string) {
        str = str.trim()                        // trim leading/trailing white space
        str = str.toLowerCase();                // convert string to lowercase
        str = str.replace(/[^a-z0-9 -]/g, '')   // remove any non-alphanumeric characters
                 .replace(/\s+/g, '-')          // replace spaces with hyphens
                 .replace(/-+/g, '-')           // remove consecutive hyphens
        
        return str
      }

    // Don't delete this, its needed from a performance point of view,
    ngOnDestroy(): void {
    }
}
