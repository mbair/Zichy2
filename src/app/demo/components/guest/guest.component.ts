import { Component, OnInit, HostListener, isDevMode, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { BehaviorSubject, debounceTime, distinctUntilChanged, map, Observable, Subject } from 'rxjs';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { MenuItem, Message, MessageService } from 'primeng/api';
import { HttpClient } from '@angular/common/http';
import { FileSendEvent, FileUpload, FileUploadErrorEvent } from 'primeng/fileupload';
import { Table } from 'primeng/table';
import { dateRangeValidator } from '../../utils/date-range-validator';
import { GuestService } from '../../service/guest.service';
import { UserService } from '../../service/user.service';
import { ConferenceService } from '../../service/conference.service';
import { GenderService } from '../../service/gender.service';
import { TagService } from '../../service/tag.service';
import { DietService } from '../../service/diet.service';
import { MealService } from '../../service/meal.service';
import { CountryService } from '../../service/country.service';
import { LogService } from '../../service/log.service';
import { ColorService } from '../../service/color.service';
import { ApiResponse } from '../../api/ApiResponse';
import { Conference } from '../../api/conference';
import { Guest } from '../../api/guest';
import { Tag } from '../../api/tag';
import * as FileSaver from 'file-saver';
import * as moment from 'moment';
moment.locale('hu')

import { ConferenceSelectorComponent } from '../../selectors/conference-selector/conference-selector.component';


@Component({
    selector: 'guest-component',
    templateUrl: './guest.component.html',
    providers: [MessageService]
})

// Makes unsubscribe automatically, don't need to do manually in ngOnDestroy
// BUT!!! Don't delete ngOnDestroy, it has to stay here!
@AutoUnsubscribe()

export class GuestComponent implements OnInit {
    @ViewChild(ConferenceSelectorComponent) conferenceSelector!: ConferenceSelectorComponent;
    @ViewChild('identifier') identifierElement: ElementRef;
    @ViewChild('dt') table!: Table;

    apiURL: string;                              // API URL depending on whether we are working on test or production
    loading: boolean = true;                     // Loading overlay trigger value
    tableItem: Guest = {}                        // One guest object
    tableData: Guest[] = [];                     // Data set displayed in a table
    rowsPerPageOptions = [20, 50, 100, 9999]     // Possible rows per page
    rowsPerPage: number = 20                     // Default rows per page
    totalRecords: number = 0                     // Total number of rows in the table
    page: number = 0;                            // Current page
    sortField: string = '';                      // Current sort field
    sortOrder: number = 1;                       // Current sort order
    globalFilter: string = '';                   // Global filter
    filterValues: { [key: string]: string } = {} // Table filter conditions
    rfidFilterValue: any;                        // Store for RFID filter value
    prepaidFilterValue: any;                     // Store for Prepaid filter value
    debounce: { [key: string]: any } = {}        // Search delay in filter field
    guestForm: FormGroup                         // Form for guest creation and modification
    originalFormValues: any                      // The original values ​​of the form
    sidebar: boolean = false                     // Table item maintenance sidebar
    deleteDialog: boolean = false                // Popup for deleting table item
    bulkDeleteDialog: boolean = false            // Popup for deleting table items
    selected: Guest[] = []                       // Table items chosen by guest
    canCreate: boolean = false                   // User has permission to create new guest
    canEdit: boolean = false                     // User has permission to update guest
    canDelete: boolean = false                   // User has permission to delete guest
    canAssign: boolean = false                   // User has permission to assign Tag to guest
    canImport: boolean = false                   // User has permission to import Excel
    isMobile: boolean = false                    // Mobile screen detection
    messages: Message[] = []                     // A message used for notifications and displaying errors
    successfulMessage: Message[] = []            // Message displayed on success
    tag: Tag = {}                                // NFC tag
    tagDialog: boolean = false;                  // Tag assignment popup
    conferences: any[] = [];                     // Optional conferences
    selectedConferences: Conference[] = []       // Conference chosen by user
    guest: Guest = {};                           // One guest object
    guestDialog: boolean = false;                // Guests maintenance popup
    cols: any[] = [];                            // Table columns
    diets: any[] = [];                           // Possible diets
    meals: any[] = [];                           // Possible meals
    genders: any[] = [];                         // Possible genders
    countries: any[] = [];                       // Possible countries
    scanTemp: string = '';                       // Temporary storage used during NFC reading
    scannedCode: string = '';                    // Scanned Tag Id
    totalTaggedGuests: number = 0;               // Total number of tagged Guests
    birthDateMin: Date                           // Minimum birth date
    birthDateMax: Date                           // Maximum birth date
    beginDate: any                               // Conference begin date
    endDate: any                                 // Conference end date
    exportButtonItems: MenuItem[]                // Export button items
    isOrganizer: boolean = false                 // User has organizer role
    imageUrl: string | null = null               // idCard image URL
    guestConference: Conference | undefined      // Guest's conference
    earliestFirstMeal: string | undefined        // Earliest first meal
    latestFirstMeal: string | undefined          // Latest first meal
    earliestLastMeal: string | undefined         // Earliest last meal
    latestLastMeal: string | undefined           // Latest last meal
    prepaidOptions: any[] = []                   // Possible prepaid options

    private initialFormValues = {
        id: null,
        firstName: '',
        lastName: '',
        gender: '',
        nationality: 'HU',
        country: 'Hungary',
        zipCode: '',
        roomNum: '',
        dateOfArrival: '',
        firstMeal: '',
        dateOfDeparture: '',
        lastMeal: '',
        szepCard: '',
        accommodationExtra: '',
        birthDate: '',
        rfid: '',
        rfidColor: '',
        conference: [],
        conferenceName: '',
        conferenceid: '',
        diet: '',
        diet_id: '',
        lastRfidUsage: '',
        is_test: '',
        email: '',
        telephone: '',
        roomType: '',
        payment: '',
        babyBed: '',
        prepaid: '',
        roomMate: '',
        idCard: [null],
        climate: '',
        enabled: true,
    }

    public selectedFile: File;
    private isFormValid$: Observable<boolean>
    private formChanges$: Subject<void> = new Subject()
    private guestObs$: Observable<any> | undefined;
    private genderObs$: Observable<any> | undefined;
    private messageObs$: Observable<any> | undefined;

    constructor(private http: HttpClient,
        private guestService: GuestService,
        private userService: UserService,
        private tagService: TagService,
        private conferenceService: ConferenceService,
        private genderService: GenderService,
        private dietService: DietService,
        private countryService: CountryService,
        private messageService: MessageService,
        private logService: LogService,
        private cdRef: ChangeDetectorRef,
        private fb: FormBuilder) {

        // Guest form fields and validators
        this.guestForm = this.fb.group({
            id: [this.initialFormValues.id],
            firstName: [this.initialFormValues.firstName, Validators.required],
            lastName: [this.initialFormValues.lastName, Validators.required],
            gender: [this.initialFormValues.gender, Validators.required],
            nationality: [this.initialFormValues.nationality, Validators.required],
            country: [this.initialFormValues.country, Validators.required],
            zipCode: [this.initialFormValues.zipCode, Validators.required],
            roomNum: [this.initialFormValues.roomNum],
            dateOfArrival: [this.initialFormValues.dateOfArrival, Validators.required],
            firstMeal: [this.initialFormValues.firstMeal, Validators.required],
            dateOfDeparture: [this.initialFormValues.dateOfDeparture, Validators.required],
            lastMeal: [this.initialFormValues.lastMeal, Validators.required],
            szepCard: [this.initialFormValues.szepCard],
            accommodationExtra: [this.initialFormValues.accommodationExtra],
            birthDate: [this.initialFormValues.birthDate, Validators.required],
            rfid: [this.initialFormValues.rfid],
            rfidColor: [this.initialFormValues.rfidColor],
            enabled: [this.initialFormValues.enabled],
            conference: new FormControl(this.initialFormValues.conference),
            conferenceName: [this.initialFormValues.conferenceName],
            conferenceid: [this.initialFormValues.conferenceid],
            diet: [this.initialFormValues.diet, Validators.required],
            diet_id: [this.initialFormValues.diet_id],
            lastRfidUsage: [this.initialFormValues.lastRfidUsage],
            is_test: [this.initialFormValues.is_test],
            email: [this.initialFormValues.email],
            telephone: [this.initialFormValues.telephone],
            roomType: [this.initialFormValues.roomType],
            payment: [this.initialFormValues.payment],
            babyBed: [this.initialFormValues.babyBed],
            prepaid: [this.initialFormValues.prepaid],
            roomMate: [this.initialFormValues.roomMate],
            idCard: [this.initialFormValues.idCard],
            climate: [this.initialFormValues.climate]
        }, {
            validators: dateRangeValidator('dateOfArrival', 'dateOfDeparture')
        })

        this.exportButtonItems = [
            {
                label: 'Üres sablon',
                icon: 'pi pi-file-excel',
                command: () => {
                    this.downloadImportTemplate()
                }
            },
            {
                label: 'Táblázat Excel',
                icon: 'pi pi-file-excel',
                command: () => {
                    this.exportExcel()
                }
            }
        ]
    }

    ngOnInit() {
        // Set API URL
        this.apiURL = this.guestService.apiURL

        // Permissions
        this.userService.hasRole(['Super Admin', 'Nagy Admin', 'Kis Admin']).subscribe(canCreate => this.canCreate = canCreate)
        this.userService.hasRole(['Super Admin', 'Nagy Admin', 'Kis Admin', 'Szervezo']).subscribe(canEdit => this.canEdit = canEdit)
        this.userService.hasRole(['Super Admin', 'Nagy Admin', 'Kis Admin']).subscribe(canDelete => this.canDelete = canDelete)
        this.userService.hasRole(['Super Admin', 'Nagy Admin', 'Kis Admin']).subscribe(canAssign => this.canAssign = canAssign)
        this.userService.hasRole(['Super Admin', 'Nagy Admin', 'Kis Admin']).subscribe(canImport => this.canImport = canImport)
        this.userService.hasRole(['Szervezo']).subscribe(isOrganizer => this.isOrganizer = isOrganizer)

        // Guests
        this.guestObs$ = this.guestService.guestObs
        this.guestObs$.subscribe((data: ApiResponse) => {
            this.loading = false
            if (data && data.rows) {
                this.tableData = data.rows || []
                this.totalRecords = data.totalItems || 0
                this.page = data.currentPage || 0

                // Filter out test users on production
                if (!isDevMode()) {
                    this.tableData = data.rows?.filter((guest: any) => guest.is_test !== true) || []
                }

                // Define tagged users number
                this.totalTaggedGuests = data.rfidCount || 0
            }
        })

        // Genders
        this.genderObs$ = this.genderService.genderObs;
        this.genderObs$.subscribe((data: any) => {
            this.genders = data
        })
        // Get genders for selector
        this.genderService.getGenders(0, 999, { sortField: 'id', sortOrder: 1 })

        // Get diets for selector
        this.dietService.getDietsForSelector().subscribe({
            next: (data) => {
                this.diets = data
            }
        })

        // Get countries for flags
        this.countryService.getCountries().subscribe(countries => {
            this.countries = countries
        })

        // Message
        this.messageObs$ = this.guestService.messageObs;
        this.messageObs$.subscribe((data) => {
            this.loading = false;
            if (data == 'ERROR') {
                this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Hiba történt!' });
            } else {
                this.messages = this.successfulMessage
            }
        })

        // Table columns
        this.cols = [
            { field: 'name', header: 'Név' },  // lastName + firstName
            { field: 'roomNum', header: 'Szoba' },
            { field: 'diet', header: 'Étrend' },
            { field: 'rfid', header: 'NFC' },
            { field: 'lastRfidUsage', header: 'NFC használat' },
            { field: 'dateOfArrival', header: 'Érkezés' },
            { field: 'dateOfDeparture', header: 'Távozás' }
        ]

        // Prepaid options
        this.prepaidOptions = [
            { name: 'Igen', value: 'true' },
            { name: 'Nem', value: 'false' }
        ]

        this.isFormValid$ = this.formChanges$.pipe(
            debounceTime(300),
            distinctUntilChanged(),
            map(() => this.guestForm.valid)
        )

        // Monitor the changes of the form
        this.guestForm.valueChanges.pipe(
            debounceTime(300)
        ).subscribe(() => this.formChanges$.next())

        // On dateOfArrival change, update the firstMeal
        this.guestForm.get('dateOfArrival')?.valueChanges.subscribe(() => {
            this.getEarliestFirstMeal()
            this.getLatestFirstMeal()
            this.cdRef.detectChanges()
        })

        // On dateOfDeparture change, update the lastMeal
        this.guestForm.get('dateOfDeparture')?.valueChanges.subscribe(() => {
            this.getEarliestLastMeal()
            this.getLatestLastMeal()
            this.cdRef.detectChanges()
        })

        this.guestForm.get('diet')?.valueChanges.subscribe(() => {
            const selectedDietName = this.guestForm.get('diet')?.value
            const selectedDietId = this.diets.find(diet => diet.name === selectedDietName)?.id || null
            this.guestForm.patchValue({ diet_id: selectedDietId })
        })
    }

    // Getters for form validation
    get id() { return this.guestForm.get('id') }
    get firstName() { return this.guestForm.get('firstName') }
    get lastName() { return this.guestForm.get('lastName') }
    get gender() { return this.guestForm.get('gender') }
    get nationality() { return this.guestForm.get('nationality') }
    get country() { return this.guestForm.get('country') }
    get zipCode() { return this.guestForm.get('zipCode') }
    get roomNum() { return this.guestForm.get('roomNum') }
    get dateOfArrival() { return this.guestForm.get('dateOfArrival') }
    get firstMeal() { return this.guestForm.get('firstMeal') }
    get dateOfDeparture() { return this.guestForm.get('dateOfDeparture') }
    get lastMeal() { return this.guestForm.get('lastMeal') }
    get szepCard() { return this.guestForm.get('szepCard') }
    get accommodationExtra() { return this.guestForm.get('accommodationExtra') }
    get birthDate() { return this.guestForm.get('birthDate') }
    get rfidColor() { return this.guestForm.get('rfidColor') }
    get enabled() { return this.guestForm.get('enabled') }
    get conference() { return this.guestForm.get('conference') }
    get diet() { return this.guestForm.get('diet') }
    get lastRfidUsage() { return this.guestForm.get('lastRfidUsage') }
    get is_test() { return this.guestForm.get('is_test') }
    get email() { return this.guestForm.get('email') }
    get telephone() { return this.guestForm.get('telephone') }
    get roomType() { return this.guestForm.get('roomType') }
    get payment() { return this.guestForm.get('payment') }
    get babyBed() { return this.guestForm.get('babyBed') }
    get prepaid() { return this.guestForm.get('prepaid') }
    get roomMate() { return this.guestForm.get('roomMate') }
    get idCard() { return this.guestForm.get('idCard') }
    get climate() { return this.guestForm.get('climate') }

    /**
     * Load filtered data into the Table
     * @returns
     */
    doQuery() {
        // Organizer need select conference
        if (this.isOrganizer && !this.selectedConferences.length) return

        this.loading = true

        const filters = Object.keys(this.filterValues)
            .map(key => this.filterValues[key].length > 0 ? `${key}=${this.filterValues[key]}` : '')
        const queryParams = filters.filter(x => x.length > 0).join('&')

        if (this.globalFilter !== '') {
            return this.guestService.getBySearch(this.globalFilter, { sortField: this.sortField, sortOrder: this.sortOrder })
        }

        return this.guestService.get(this.page, this.rowsPerPage, { sortField: this.sortField, sortOrder: this.sortOrder }, queryParams)
    }

    onFilter(event: any, field: string) {

        // Organizer need select conference
        if (this.isOrganizer && !this.selectedConferences) return

        const noWaitFields = ['diet', 'lastRfidUsage', 'dateOfArrival', 'dateOfDeparture', 'prepaid']
        let filterValue = ''

        // Calendar date as String
        if (event instanceof Date) {
            const date = moment(event);
            const formattedDate = date.format('YYYY.MM.DD')
            filterValue = formattedDate
        } else {
            if (event && (event.value || event.target?.value)) {
                if (field == "rfid") {
                    filterValue = event.target?.value.replaceAll('ö', '0').replaceAll('Ö', '0')
                    this.rfidFilterValue = filterValue
                } else {
                    filterValue = event.value || event.target?.value
                }
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
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }

    /**
     * When a row is expanded, load the guest data.
     * If the conference has an guest, load the guest's data from the user service.
     * @param conference The guest object for the row that was expanded.
     */
    onRowExpand(guest: Guest): void {
        // Load idCard image
        this.imageUrl = null
        let idCard = guest.idcard || ''
        this.getIdCardURL(idCard)
    }

    /**
     * Create new Guest
     */
    create() {
        this.guestForm.reset(this.initialFormValues)
        this.sidebar = true
    }

    /**
     * Edit the Guest
     * @param guest
     */
    edit(guest: Guest) {
        this.guestForm.reset(this.initialFormValues)
        this.sidebar = true
        
        // Get guest conference details
        if (guest.conferenceid) {
            const selectedConf = this.conferenceSelector.conferences.find(conf => conf.id === guest.conferenceid)
            guest.conference = selectedConf ? [selectedConf] : []
            
            // Because side bar is not visible yet, we need to wait a bit
            setTimeout(() => {
                this.guestForm.patchValue(guest)
                this.originalFormValues = this.guestForm.value
            })
    
            // Set arrival and departure date limitations
            this.beginDate = selectedConf?.beginDate ? new Date(selectedConf.beginDate) : undefined
            this.endDate = selectedConf?.endDate ? new Date(selectedConf.endDate) : undefined

            this.getEarliestFirstMeal()
            this.getLatestFirstMeal()
            this.getEarliestLastMeal()
            this.getLatestLastMeal()
            this.cdRef.detectChanges()
        }
    }

    /**
     * Delete the Guest
     */
    delete() {
        this.loading = true
        this.deleteDialog = false
        this.guestService.delete(this.tableItem)
    }

    /**
     * Delete selected Guests
     */
    deleteSelected() {
        this.loading = true
        this.bulkDeleteDialog = false
        this.guestService.bulkdelete(this.selected)
    }

    hideDialog() {
        this.guestDialog = false;
    }

    hideTagDialog() {
        this.tagDialog = false;
    }

    /**
     * Saving the form
     */
    save() {
        if (this.guestForm.valid) {
            this.loading = true
            const formValues = this.guestForm.value

            // Create
            if (!formValues.id) {
                this.guestService.create(formValues, [])

            // Update
            } else {
                this.guestService.update(formValues)

                // Update Guest in the table and rowexpansion
                const index = this.tableData.findIndex(guest => guest.id === formValues.id)
                if (index !== -1) {
                    this.tableData[index] = { ...formValues }
                }
            }

            this.sidebar = false
        }
    }

    /**
     * Cancel saving the form
     */
    cancel() {
        this.guestForm.reset(this.originalFormValues)
    }

    findIndexById(id: string | undefined): number {
        let index = -1;
        for (let i = 0; i < this.tableData.length; i++) {
            if (this.tableData[i].id === id) {
                index = i;
                break;
            }
        }

        return index;
    }

    assignTag(guest: any) {
        // Empty previous scanned codes
        this.scanTemp = '';
        this.scannedCode = this.guest.rfid || '';
        this.guest = { ...guest };
        this.messages = [
            { severity: 'info', summary: '', detail: 'Tartsa a ' + guest.diet + ' étrendhez tartozó NFC címkét az olvasóhoz...' },
        ]
        this.tagDialog = true;
    }

    unAssignTag() {
        this.guest.rfid = null;
        this.guest.lastRfidUsage = null;
        this.guestService.update(this.guest);
        let guestsClone = JSON.parse(JSON.stringify(this.tableData))
        guestsClone[this.findIndexById(this.guest.id)] = this.guest;
        this.tableData = guestsClone
        this.successfulMessage = [{
            severity: 'success',
            summary: '',
            detail: 'A címkét eltávolítottuk a vendégtől!'
        }]
        this.totalTaggedGuests--;
        setTimeout(() => {
            this.tagDialog = false
        }, 200)

        // Logging
        this.logService.create({
            action_type: "unassign",
            table_name: "guest",
            original_data: "Unassign Tag from " + this.guest.lastName + " " + this.guest.firstName,
        })
    }

    saveTag() {
        if (!this.scannedCode) return;

        // Check if RFID is according to the diet
        this.tagService.getByRFID(this.scannedCode).subscribe({
            next: (data) => {
                
                if (data.rows && data.rows.length > 0) {

                    // Check if tag color is the same as the guest diet color
                    let tagColor = data.rows[0].color
                    let guestDietColor = this.diets.find(d => d.name == this.guest.diet).color

                    if (tagColor == 'gray') {
                        tagColor = 'black'
                    }

                    if (tagColor === 'green') {
                        tagColor = 'teal'
                    }

                    // Wrong color
                    if (guestDietColor !== tagColor) {
                        this.messages = [
                            { severity: 'error', summary: '', detail: 'Nem megfelelő a karszalag színe!' },
                        ]
                        this.identifierElement.nativeElement.focus()
                        return

                    // Right color
                    } else {

                        // Check if somebody has the same RFID number
                        this.guestService.getByRFID(this.scannedCode).subscribe({
                            next: (data) => {

                                // If there is data, then somebody is using this RFID
                                this.messages = [
                                    { severity: 'error', summary: '', detail: data.lastName + ' ' + data.firstName + ' már használja a karszalagot!' },
                                ]
                                // Logging
                                this.logService.create({
                                    action_type: "tag duplicate",
                                    table_name: "guest",
                                    original_data: "Tag duplicate: " + data.rfid + " is used by " + data.lastName + " " + data.firstName,
                                })
                                return
                            },
                            // Strange, but this is the OK way
                            error: (error) => {
                                this.guest.rfid = this.scannedCode;
                                // this.guestService.update({ id: this.guest.id, rfid: this.scannedCode})
                                this.guestService.updateGuest2(this.guest).subscribe(() => {
                                    let guestsClone = JSON.parse(JSON.stringify(this.tableData))
                                    guestsClone[this.findIndexById(this.guest.id)] = this.guest;
                                    this.tableData = guestsClone
                                    this.successfulMessage = [{
                                        severity: 'success',
                                        summary: '',
                                        detail: 'Sikeresen hozzárendelte a címkét a vendéghez!'
                                    }]
                                    this.totalTaggedGuests++;
                                    setTimeout(() => {
                                        this.tagDialog = false
                                    }, 200);

                                    // Logging
                                    this.logService.create({
                                        action_type: "assign Tag",
                                        table_name: "guest",
                                        original_data: "Assign Tag " + this.guest.rfid + " to " + this.guest.lastName + " " + this.guest.firstName,
                                    })

                                    this.scannedCode = '';
                                    this.guest = {}
                                })
                            }
                        })
                    }
                }
            },
            error: (error) => {
                console.log('tagService.getByRFID error', error)
            }
        })
    }

    /**
     * An event indicating that the request was sent to the server.
     * Useful when a request may be retried multiple times,
     * to distinguish between retries on the final event stream.
     * @param event
     */
    onSend(event: FileSendEvent) {
        this.loading = true
    }

    /**
     * Callback to invoke on upload error.
     * @param event
     */
    onExcelUploadError(event: FileUploadErrorEvent, fileUpload: FileUpload) {
        this.loading = false
        this.messageService.add({
            severity: 'error',
            summary: 'Hibás Excel!',
            detail: 'Kérlek próbáld a megfelelő Excelt importálni',
            life: 3000
        })

        // Clear wrong files from the uploading list
        fileUpload.clear()

        // Logging
        this.logService.create({
            action_type: "import",
            table_name: "guest",
            original_data: "Error while importing Excel | File: " + event.files[0].name + ", Size: " + event.files[0].size,
            status: 500,
        })
    }

    /**
     * Callback to invoke when file upload is complete.
     * @param event
     */
    onExcelUpload(event: any) {  // Files were missing from UploadEvent, although they are included
        this.loading = false
        this.doQuery()
        this.messageService.add({
            severity: 'success',
            summary: '',
            detail: 'Sikeres vendég importálás',
            life: 3000
        })

        // Logging
        this.logService.create({
            action_type: "import",
            table_name: "guest",
            original_data: event.files[0].name,
        })
    }

    onFileSelected(event: any): void {
        this.selectedFile = event.target.files[0]
    }

    getIdCardURL(idCardName: string) {
        if (!idCardName) return undefined

        // TODO: Use array instead of commas...
        const cleanedIdCardName = idCardName.endsWith(',') ? idCardName.slice(0, -1) : idCardName

        this.http.get(this.apiURL + '/guest/idcardimage/' + cleanedIdCardName, { responseType: 'blob' }).subscribe((blob) => {
            this.imageUrl = window.URL.createObjectURL(blob)
            return this.imageUrl
        })
    }

    downloadIdCard(idCardName: string) {
        if (!idCardName) return

        // TODO: Use array instead of commas...
        const cleanedIdCardName = idCardName.endsWith(',') ? idCardName.slice(0, -1) : idCardName

        this.http.get(this.apiURL + '/guest/idcardimage/' + cleanedIdCardName, { responseType: 'blob' }).subscribe((blob) => {
            const downloadUrl = window.URL.createObjectURL(blob)
            const a = document.createElement('a')
            a.href = downloadUrl
            a.download = cleanedIdCardName
            document.body.appendChild(a)
            a.click()
            document.body.removeChild(a)
        })
    }

    hasDietName(dietName: string): boolean {
        return this.diets.some(diet => diet.name === dietName)
    }

    getAge(birthDate: string): string {
        if (!birthDate) return "";
        const birth = moment(birthDate)
        const today = moment()
        return today.diff(birth, 'years').toString()
    }

    getCountryCode(countryName: string): string | null {
        const country = this.countries.find(c =>
            c.name.toLowerCase() === countryName?.toLowerCase()
        )
        return country ? country.code?.toLowerCase() : null
    }

    getNationalityInHungarian(nationality: string): string | null {
        return this.countryService.getHuNationality(nationality)
    }

    getCountryNameInHungarian(code: string): string | null {
        return this.countryService.getHuCountryName(code)
    }

    /**
     * Returns the earliest first meal of the conference, if the date of arrival is on the first day of the conference.
     * Otherwise, returns undefined.
     * @returns The earliest first meal of the conference, or undefined.
     */
    getEarliestFirstMeal() {
        const dateOfArrival = this.guestForm.get('dateOfArrival')?.value
        const formattedBeginDate = this.beginDate?.toISOString().split('T')[0]

        // If dateOfArrival is on the first day of the conference, the earliest first meal is the first meal of the conference
        if (dateOfArrival === formattedBeginDate) {
            this.earliestFirstMeal = this.guestConference?.firstMeal
        } else {
            this.earliestFirstMeal = undefined
        }
    }

    /**
     * Returns the latest first meal of the conference, if the date of arrival is on the last day of the conference.
     * Otherwise, returns undefined.
     * @returns The latest first meal of the conference, or undefined.
     */
    getLatestFirstMeal() {
        const dateOfArrival = this.guestForm.get('dateOfArrival')?.value
        const formattedEndDate = this.endDate?.toISOString().split('T')[0]

        // If dateOfArrival is on the last day of the conference, the latest first meal is the last meal of the conference
        if (dateOfArrival === formattedEndDate) {
            this.latestFirstMeal = this.guestConference?.lastMeal
        } else {
            this.latestFirstMeal = undefined
        }
    }

    /**
     * Returns the earliest last meal of the conference, if the date of departure is on the first day of the conference.
     * Otherwise, returns undefined.
     * @returns The earliest last meal of the conference, or undefined.
     */
    getEarliestLastMeal() {
        const dateOfDeparture = this.guestForm.get('dateOfDeparture')?.value
        const formattedBeginDate = this.beginDate?.toISOString().split('T')[0]

        // If dateOfDeparture is on the first day of the conference, the earliest last meal is the first meal of the conference
        if (dateOfDeparture === formattedBeginDate) {
            this.earliestLastMeal = this.guestConference?.firstMeal
        } else {
            this.earliestLastMeal = undefined
        }
    }

    /**
     * Returns the latest last meal of the conference, if the date of departure is on the last day of the conference.
     * Otherwise, returns undefined.
     * @returns The latest last meal of the conference, or undefined.
     */
    getLatestLastMeal() {
        const dateOfDeparture = this.guestForm.get('dateOfDeparture')?.value
        const formattedEndDate = this.endDate?.toISOString().split('T')[0]

        // If dateOfDeparture is on the last day of the conference, the latest last meal is the last meal of the conference
        if (dateOfDeparture === formattedEndDate) {
            this.latestLastMeal = this.guestConference?.lastMeal
        } else {
            this.latestLastMeal = undefined
        }
    }

    /**
     * Handle the selection of conferences in the conference selector.
     * Updates the selected conferences and the table data.
     * @param selectedConferences 
     */
    onConferenceSelectionChange(selectedConferences: Conference[]): void {
        this.selectedConferences = selectedConferences || []
        this.filterValues['conferenceName'] = this.selectedConferences.map(conf => conf.name).join(', ') || ''
    
        // Check if the user can edit the selected conferences
        if (this.isOrganizer && this.selectedConferences.length > 0) {
            this.canEdit = this.selectedConferences.some(conf => 
                conf.guestEditEndDate && moment().isSameOrBefore(moment(conf.guestEditEndDate), 'day')
            )
        }
    
        this.tableData = []
        this.doQuery()
    }

    /**
     * Exports the currently selected table rows (or filtered rows, or all rows if no selection is made) to an Excel file.
     * The file is named "guests.xlsx" and is saved in the user's Downloads folder.
     * The export uses the xlsx library and is done asynchronously.
     * @export
     */
    exportExcel() {
        import("xlsx").then(xlsx => {
            let data = this.selected.map(row => {
                // Remove id column and keep the rest columns
                const { id, answers, ...rest } = row
                const qnaColumns: { [key: string]: any } = {}
                let qaIndex = 1
    
                if (Array.isArray(answers)) {
                    answers.forEach(answer => {
                        if (Array.isArray(answer.translations)) {
                            answer.translations.forEach((translation: any) => {
                                // Add question mark at the end of the question
                                const question = translation.hu.trim().endsWith('?')
                                    ? translation.hu
                                    : translation.hu + '?';
                                // The "answers" cell contains the answer
                                const answerText = translation.answers
                                qnaColumns[`question_${qaIndex}`] = question
                                qnaColumns[`answer_${qaIndex}`] = answerText
                                qaIndex++
                            })
                        }
                    })
                }
    
                return {
                    ...rest,
                    ...qnaColumns
                } as { [key: string]: any }
            })
    
            // If the selected array is empty, we work from the filtered or full dataset as a fallback
            if (data.length === 0) {
                console.warn("No rows selected for export. Exporting filtered or full data.")
                data = (this.table.filteredValue || this.tableData).map(row => {
                    const { id, answers, ...rest } = row
                    const qnaColumns: { [key: string]: any } = {}
                    let qaIndex = 1
                    if (Array.isArray(answers)) {
                        answers.forEach(answer => {
                            if (Array.isArray(answer.translations)) {
                                answer.translations.forEach((translation: any) => {
                                    const question = translation.hu.trim().endsWith('?')
                                        ? translation.hu
                                        : translation.hu + '?'
                                    const answerText = translation.answers
                                    qnaColumns[`question_${qaIndex}`] = question
                                    qnaColumns[`answer_${qaIndex}`] = answerText
                                    qaIndex++
                                })
                            }
                        })
                    }
                    return {
                        ...rest,
                        ...qnaColumns
                    } as { [key: string]: any }
                })
            }
    
            // Find the maximum number of question/answer pairs in all rows
            let maxQA = 0
            data.forEach(row => {
                const qaCount = Object.keys(row).filter(key => key.startsWith('question_')).length
                if (qaCount > maxQA) {
                    maxQA = qaCount
                }
            })
    
            // For each row, we fill in the missing question/answer columns with an empty string so that the columns are identical in each row
            data = data.map(row => {
                const r = row as { [key: string]: any }
                for (let i = 1; i <= maxQA; i++) {
                    if (!r.hasOwnProperty(`question_${i}`)) {
                        r[`question_${i}`] = ''
                    }
                    if (!r.hasOwnProperty(`answer_${i}`)) {
                        r[`answer_${i}`] = ''
                    }
                }
                return r
            })
    
            // Delete unnecessary columns
            data.forEach((row: Guest) => {
                delete row.is_test
                delete row.userid
                delete row.rfid_id
                delete row.diet_id
                delete row.room_id
                delete row.conferenceid
                delete row.dietDetails
            })
    
            // Creating an Excel worksheet and file
            const worksheet = xlsx.utils.json_to_sheet(data)
            const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] }
            const excelBuffer = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' })
            this.saveAsExcelFile(excelBuffer, "guests")
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
        let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
        let EXCEL_EXTENSION = '.xlsx';
        const data: Blob = new Blob([buffer], {
            type: EXCEL_TYPE
        })
        FileSaver.saveAs(data, fileName + '_export_' + moment().format('YYYYMMDD') + EXCEL_EXTENSION);
    }

    downloadImportTemplate() {
        import("xlsx").then(xlsx => {
            const headers = Object.keys(this.tableData[0] || {}).filter(key => key !== 'id')
            const worksheet = xlsx.utils.aoa_to_sheet([headers])
            const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] }
            const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' })
            const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
            const EXCEL_EXTENSION = '.xlsx';
            const data: Blob = new Blob([excelBuffer], {
                type: EXCEL_TYPE
            })
            FileSaver.saveAs(data, 'NFCReserve_import_template' + EXCEL_EXTENSION)
        })
    }

    @HostListener('window:keypress', ['$event'])
    keyEvent(event: KeyboardEvent): void {
        if (event.key === 'Enter') {
            // The QR/Bar code is ready here
            // Do something here with the scanned code
            this.scannedCode = this.scanTemp
            this.scanTemp = ''
            console.log('scannedCode', this.scannedCode)
        } else {
            if (event.key === 'ö' || event.key === 'Ö') {
                this.scanTemp += '0'
            }
            else if (/^[0-9]$/i.test(event.key)) {
                this.scanTemp += event.key
            }
            else {
                return
            }
        }
    }

    // Don't delete this, its needed from a performance point of view,
    ngOnDestroy(): void {
    }
}
