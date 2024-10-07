import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription, Observable, Subject, BehaviorSubject } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, switchMap } from 'rxjs/operators';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { emailDomainValidator } from '../../utils/email-validator';
import { ConferenceService } from '../../service/conference.service';
import { MessageService } from 'primeng/api';
import { UserService } from '../../service/user.service';
import { MealService } from '../../service/meal.service';
import { ApiResponse } from '../../api/ApiResponse';
import { Conference } from '../../api/conference';

import { Table } from 'primeng/table';
import * as moment from 'moment';
moment.locale('hu')

@Component({
    selector: 'conferencelist',
    templateUrl: './conferencelist.component.html',
    styleUrls: ['./conferencelist.component.scss'],
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
    conferenceForm: FormGroup;                   // Form to create/update conference
    originalFormValues: any;                     // The original values ​​of the form
    dialog: boolean = false;                     // Table item maintenance modal
    sidebar: boolean = false;                    // Table item maintenance modal
    deleteDialog: boolean = false;               // Popup for deleting table item
    bulkDeleteDialog: boolean = false;           // Popup for deleting table items
    selected: Conference[] = [];                 // Table items chosen by user
    meals: any[] = [];                           // Possible meals

    private isFormValid$: Observable<boolean>;
    private formChanges$: Subject<void> = new Subject();
    private conferenceObs$: Observable<any> | undefined;
    private serviceMessageObs$: Observable<any> | undefined;

    constructor(
        public userService: UserService,
        private router: Router,
        private route: ActivatedRoute,
        private formBuilder: FormBuilder,
        private conferenceService: ConferenceService,
        private mealService: MealService,
        private messageService: MessageService) {

        this.conferenceForm = this.formBuilder.group({
            id: [''],
            name: ['', Validators.required],
            beginDate: ['', Validators.required],
            endDate: ['', Validators.required],
            firstMeal: ['', Validators.required],
            lastMeal: ['', Validators.required],
            contractorName: ['', Validators.required],
            contractorAdress: ['', Validators.required],
            contractorTaxNumber: ['', [Validators.required]],
            contactName: ['', Validators.required],
            contactEmail: ['', [Validators.required, emailDomainValidator()]],
            contactPhone: ['', Validators.required],
            formUrl: ['', Validators.required],
            registrationEndDate: ['', Validators.required],
        })

        this.isFormValid$ = new BehaviorSubject<boolean>(false)

        // Monitor the name field changes
        this.conferenceForm.get('name')?.valueChanges.subscribe(nameValue => {
            
            // Get the base URL
            const baseUrl = window.location.origin;

            // Create a slug from the name
            let slug = this.slugify(nameValue)
            
            // Set the slug in the form
            this.conferenceForm.patchValue({
                formUrl: `${baseUrl}/#/conference-form/${slug}`
            })
        })
    }

    ngOnInit() {
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

        // Form validation
        this.isFormValid$ = this.formChanges$.pipe(
            debounceTime(300),
            distinctUntilChanged(),
            map(() => this.conferenceForm.valid)
        )

        // Monitor the changes of the form
        this.conferenceForm.valueChanges.subscribe(() => this.formChanges$.next());

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

    // Getters for form validation
    get name() { return this.conferenceForm.get('name') }
    get beginDate() { return this.conferenceForm.get('beginDate') }
    get endDate() { return this.conferenceForm.get('endDate') }
    get firstMeal() { return this.conferenceForm.get('firstMeal') }
    get lastMeal() { return this.conferenceForm.get('lastMeal') }
    get contractorName() { return this.conferenceForm.get('contractorName') }
    get contractorAdress() { return this.conferenceForm.get('contractorAdress') }
    get contractorTaxNumber() { return this.conferenceForm.get('contractorTaxNumber') }
    get contactName() { return this.conferenceForm.get('contactName') }
    get contactEmail() { return this.conferenceForm.get('contactEmail') }
    get contactPhone() { return this.conferenceForm.get('contactPhone') }
    get formUrl() { return this.conferenceForm.get('formUrl') }
    get registrationEndDate() { return this.conferenceForm.get('registrationEndDate') }

    /**
     * Load filtered data into the Table
     * @returns
     */
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

    /**
     * Filter table by column
     * @param event
     * @param field
     */
    onFilter(event: any, field: string) {
        const noWaitFields = ['beginDate', 'endDate', 'firstMeal', 'lastMeal']
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

    /**
     * Lazy mode is handy to deal with large datasets, instead of loading
     * the entire data, small chunks of data is loaded by invoking onLazyLoad
     * callback every time paging, sorting and filtering happens.
     * @param event
     */
    onLazyLoad(event: any) {
        this.page = event.first! / event.rows!;
        this.rowsPerPage = event.rows ?? this.rowsPerPage;
        this.sortField = event.sortField ?? '';
        this.sortOrder = event.sortOrder ?? 1;
        this.globalFilter = event.globalFilter ?? '';
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

    setFormUrl() {
        let formUrl = this.tableItem.name || ''
        formUrl = this.slugify(formUrl)
        this.tableItem.formUrl = `/conference-form/${formUrl}`
    }

    navigateToConferenceForm(conference: any) {
        const formUrl = this.slugify(conference.name)
        this.router.navigate(['/conference-form', formUrl])
    }

    navigateToCreateConference() {
        this.router.navigate(['conference/create'])
    }

    /**
     * Create new Conference
     */
    create() {
        this.conferenceForm.reset()
        this.sidebar = true
    }

    /**
     * Edit the Conference
     * @param conference
     */
    edit(conference: Conference) {
        this.conferenceForm.patchValue(conference)
        this.originalFormValues = this.conferenceForm.value
        this.sidebar = true
    }

    /**
     * Delete the Conference
     */
    delete() {
        this.loading = true;
        this.deleteDialog = false;
        this.conferenceService.delete(this.tableItem)
    }

    /**
     * Delete selected Conferences
     */
    deleteSelected() {
        this.loading = true;
        this.deleteDialog = false;
        this.conferenceService.bulkdelete(this.selected)
    }

    /**
     * Saving the form
     */
    save() {
        if (this.conferenceForm.valid) {
            this.loading = true
            const formValues = this.conferenceForm.value

            // Create
            if (!formValues.id) {
                this.conferenceService.create(formValues)
            
            // Update
            } else {
                this.conferenceService.update(formValues)
            }

            this.sidebar = false
        }
    }

    /**
     * Cancel saving the form
     */
    cancel() {
        this.conferenceForm.reset(this.originalFormValues)
        // this.sidebar = false
    }

    /**
     * Converts a string to its slug form
     * @param str string to be slugified
     * @returns slugified string
     */
    slugify(str: string) {
        if (!str) return '';
        str = str.trim()                        // trim leading/trailing white space
        str = str.toLowerCase();                // convert string to lowercase
        str = str.replace(/[^a-z0-9 -]/g, '')   // remove any non-alphanumeric characters
            .replace(/\s+/g, '-')               // replace spaces with hyphens
            .replace(/-+/g, '-')                // remove consecutive hyphens

        return str
    }

    copyUrl(formUrl: string) {
        navigator.clipboard.writeText(formUrl)
    }

    // Don't delete this, its needed from a performance point of view,
    ngOnDestroy(): void {
    }
}
