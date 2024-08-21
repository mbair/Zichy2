import { Component, OnInit, HostListener, isDevMode, ViewChild, ElementRef } from '@angular/core';
import { catchError, Observable, of, switchMap, tap } from 'rxjs';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { Message, MessageService } from 'primeng/api';
import { FileSendEvent, FileUpload, FileUploadErrorEvent } from 'primeng/fileupload';
import { Table } from 'primeng/table';
import { GuestService } from '../../service/guest.service';
import { ConferenceService } from '../../service/conference.service';
import { GenderService } from '../../service/gender.service';
import { TagService } from '../../service/tag.service';
import { DietService } from '../../service/diet.service';
import { MealService } from '../../service/meal.service';
import { CountryService } from '../../service/country.service';
import { LogService } from '../../service/log.service';
import { ApiResponse } from '../../api/ApiResponse';
import { Conference } from '../../api/conference';
import { Guest } from '../../api/guest';
import { Tag } from '../../api/tag';
import * as moment from 'moment';


moment.locale('hu')

@Component({
    selector: 'guests',
    templateUrl: './vendegek.component.html',
    providers: [MessageService]
})

// Makes unsubscribe automatically, don't need to do manually in ngOnDestroy
// BUT!!! Don't delete ngOnDestroy, it has to stay here!
@AutoUnsubscribe()

export class VendegekComponent implements OnInit {
    @ViewChild('identifier') identifierElement: ElementRef;

    apiURL: string;                            // API URL depending on whether we are working on test or production
    loading: boolean = true;                   // Loading overlay trigger value
    tableData: Guest[] = [];                   // Data set displayed in a table
    messages: Message[] = [];                  // A message used for notifications and displaying errors
    successfulMessage: Message[] = [];         // Message displayed on success
    tag: Tag = {};                             // NFC tag
    tagDialog: boolean = false;                // Tag assignment popup
    conferences: any[] = [];                   // Optional conferences
    selectedConference: any;                   // Conference chosen by user
    guest: Guest = {};                         // One guest object
    guestDialog: boolean = false;              // Guests maintenance popup
    deleteGuestDialog: boolean = false;        // Popup for deleting guest
    deleteGuestsDialog: boolean = false;       // Popup for deleting guests
    selectedGuests: Guest[] = [];              // Guest chosen by user
    cols: any[] = [];                          // Table columns
    diets: any[] = [];                         // Possible diets
    meals: any[] = [];                         // Possible meals
    genders: any[] = [];                       // Possible genders
    countries: any[] = [];                     // Possible countries
    scanTemp: string = '';                     // Temporary storage used during NFC reading
    scannedCode: string = '';                  // Scanned Tag Id
    rowsPerPageOptions = [20, 50, 100];        // Possible rows per page
    rowsPerPage: number = 20;                  // Default rows per page
    totalRecords: number = 0;                  // Total number of rows in the table
    totalTaggedGuests: number = 0;             // Total number of tagged Guests
    page: number = 0;                          // Current page
    sortField: string = '';                    // Current sort field
    sortOrder: number = 1;                     // Current sort order
    globalFilter: string = '';                 // Global filter
    filterValues: { [key: string]: string } = {} // Table filter conditions
    rfidFilterValue: any;                      // Store for RFID filter value
    debounce: { [key: string]: any } = {}      // Search delay in filter field

    private guestObs$: Observable<any> | undefined;
    private conferenceObs$: Observable<any> | undefined;
    private genderObs$: Observable<any> | undefined;
    private dietObs$: Observable<any> | undefined;
    private serviceMessageObs$: Observable<any> | undefined;

    constructor(private guestService: GuestService,
        private tagService: TagService,
        private conferenceService: ConferenceService,
        private genderService: GenderService,
        private dietService: DietService,
        private mealService: MealService,
        private countryService: CountryService,
        private messageService: MessageService,
        private logService: LogService) { }

    ngOnInit() {
        // Set API URL
        this.apiURL = this.guestService.apiURL

        // Guests
        this.guestObs$ = this.guestService.guestObs;
        this.guestObs$.subscribe((data: ApiResponse) => {
            this.loading = false
            if (data) {
                this.tableData = data.rows || [];
                this.totalRecords = data.totalItems || 0;
                this.page = data.currentPage || 0;

                // Filter out test users on production
                if (!isDevMode()) {
                    this.tableData = data.rows?.filter((guest: any) => guest.is_test == false) || []
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

        // Diets
        this.dietObs$ = this.dietService.dietObs;
        this.dietObs$.subscribe((data: ApiResponse) => {
            this.loading = false
            if (data && data.rows) {
                data.rows.map((diet: any) => {
                    diet.name = diet.name.toLowerCase()
                    this.diets.push(diet)
                })
            }
        })
        // Get diets for selector
        this.dietService.getDiets(0, 999, { sortField: 'id', sortOrder: 1 })

        // Get meals for selector
        this.meals = this.mealService.getMealsForSelector()

        // Get countries for selector
        this.countryService.getCountries().subscribe(countries => {
            this.countries = countries
        })

        // Conferences
        this.conferenceObs$ = this.conferenceService.conferenceObs;
        this.conferenceObs$.subscribe((data: any) => {
            if (data && data.rows) {
                let conferencesArray: Conference[] = []
                data.rows.map((conference: Conference) => {
                    conferencesArray.push(conference)
                })
                this.conferences = conferencesArray
            }
        })
        // Get conferences for selector
        this.conferenceService.get(0, 999, '', '')

        // Message
        this.serviceMessageObs$ = this.guestService.serviceMessageObs;
        this.serviceMessageObs$.subscribe((data) => {
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
            { field: 'rfid', header: 'RFID' },
            { field: 'lastRfidUsage', header: 'RFID használat' },
            { field: 'dateOfArrival', header: 'Érkezés' },
            { field: 'dateOfDeparture', header: 'Távozás' }
        ]
    }

    // Load filtered Guests data into the Table
    doQuery() {
        this.loading = true;

        const filters = Object.keys(this.filterValues)
            .map(key => this.filterValues[key].length > 0 ? `${key}=${this.filterValues[key]}` : '')
        const queryParams = filters.filter(x => x.length > 0).join('&')

        if (this.globalFilter !== '') {
            return this.guestService.getGuestsBySearch(this.globalFilter, { sortField: this.sortField, sortOrder: this.sortOrder })
        }

        return this.guestService.getGuests(this.page, this.rowsPerPage, { sortField: this.sortField, sortOrder: this.sortOrder }, queryParams)
    }

    onFilter(event: any, field: string) {
        const noWaitFields = ['diet','lastRfidUsage','dateOfArrival','dateOfDeparture']
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

    onLazyLoad(event: any) {
        this.page = event.first! / event.rows!;
        this.rowsPerPage = event.rows ?? this.rowsPerPage;
        this.sortField = event.sortField ?? '';
        this.sortOrder = event.sortOrder ?? 1;
        this.globalFilter = event.globalFilter ?? '';
        this.doQuery()
    }

    onConferenceChange() {
        this.filterValues['conferenceName'] = this.selectedConference?.name || ''
        this.doQuery()
    }

    openNew() {
        this.guest = {};
        this.guestDialog = true;
    }

    deleteSelectedGuests() {
        this.deleteGuestsDialog = true;
    }

    editGuest(guest: Guest) {
        this.guest = { ...guest };
        this.guestDialog = true;
    }

    deleteGuest(guest: Guest) {
        this.deleteGuestDialog = true;
        this.guest = { ...guest };
    }

    confirmDeleteSelected() {
        this.loading = true;
        this.deleteGuestsDialog = false;
        this.guestService.deleteGuests(this.selectedGuests)
        // this.tableData = this.tableData.filter(val => !this.selectedGuests.includes(val))
        this.messageService.add({ severity: 'success', summary: 'Sikeres törlés', detail: 'Vendégek törölve', life: 3000 })
        this.selectedGuests = []
        this.loading = false;
        setTimeout(() => {
            this.doQuery()
        }, 300);
    }

    confirmDelete() {
        this.loading = true;
        this.deleteGuestDialog = false;
        this.tableData = this.tableData.filter(val => val.id !== this.guest.id);
        this.guestService.deleteGuest(this.guest)
        this.messageService.add({ severity: 'success', summary: 'Sikeres törlés', detail: 'Vendég törölve', life: 3000 });
        this.guest = {};
        this.loading = false;
    }

    hideDialog() {
        this.guestDialog = false;
    }

    hideTagDialog() {
        this.tagDialog = false;
    }

    saveGuest() {
        if (this.guest.firstName?.trim()) {
            // UPDATE
            if (this.guest.id) {
                this.guestService.updateGuest(this.guest)
                this.tableData[this.findIndexById(this.guest.id)] = this.guest;
                this.successfulMessage = [{
                    severity: 'success',
                    summary: '',
                    detail: 'Sikeres vendégmódosítás!'
                }]
                // INSERT
            } else {
                this.guestService.createGuest(this.guest)
                this.tableData.push(this.guest)
                this.successfulMessage = [{
                    severity: 'success',
                    summary: '',
                    detail: 'Sikeres vendég rögzítés!'
                }]
            }

            this.tableData = [...this.tableData]
            this.guestDialog = false
            this.guest = {}
        }
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

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }

    assignTag(guest: any) {
        // Empty previous scanned codes
        this.scanTemp = '';
        this.scannedCode = this.guest.rfid || '';
        this.guest = { ...guest };
        this.messages = [
            { severity: 'info', summary: '', detail: 'Tartsa a ' + guest.diet + ' étrendhez tartozó RFID címkét az olvasóhoz...' },
        ]
        this.tagDialog = true;
    }

    unAssignTag() {
        this.guest.rfid = null;
        this.guest.lastRfidUsage = null;
        this.guestService.updateGuest(this.guest);
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
        this.logService.createLog({
            name: "Unassign Tag from " + this.guest.lastName + " " + this.guest.firstName + " | Lang: " + navigator.language,
            capacity: 0
        })
    }

    save() {
        if (!this.scannedCode) return;

        // Check if RFID is according to the diet
        // this.tagService.getByRFID(this.scannedCode)
        //     .pipe(
        //         switchMap((tagResult) => {
        //             if (tagResult.rows && tagResult.rows.length > 0) {
        //                 let tag = tagResult.rows[0]
        //                 let dietColor = this.getDietColor(this.guest.diet || '')
        //                 dietColor = dietColor.split('-')[0]
        //                 if (dietColor == 'gray') {
        //                     dietColor = 'black'
        //                 }

        //                 // Wrong color
        //                 if (dietColor !== tag.color) {
        //                     this.messages = [
        //                         { severity: 'error', summary: '', detail: 'Nem megfelelő a karszalag színe!' },
        //                     ]
        //                     this.identifierElement.nativeElement.focus()

        //                     // Right color
        //                 }
        //             }


        //             if (tagResult.success) {
        //                 return this.guestService.getByRFID(this.scannedCode)
        //             } else {
        //                 throw new Error('Service 1 failed')
        //             }
        //         }),
        //         tap(guestResult => {
        //             if (guestResult.success) {
        //                 console.log('Both services completed successfully')
        //             } else {
        //                 throw new Error('Service 2 failed')
        //             }
        //         }),
        //         catchError(error => {
        //             console.error('Error occurred:', error)
        //             return of(null) // This ensures that the operation can be handled even in the event of an error
        //         })
        //     )
        //     .subscribe();

        // Check if RFID is according to the diet
        this.tagService.getByRFID(this.scannedCode).subscribe({
            next: (data) => {
                if (data.rows && data.rows.length > 0) {
                    let tag = data.rows[0]
                    let dietColor = this.getDietColor(this.guest.diet || '')
                    dietColor = dietColor.split('-')[0]
                    if (dietColor == 'gray') {
                        dietColor = 'black'
                    }
                    if (dietColor == 'teal') {
                        dietColor = 'green'
                    }

                    // Wrong color
                    if (dietColor !== tag.color) {
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
                                this.logService.createLog({
                                    name: "Tag duplicate: " + data.rfid + " is used by " + data.lastName + " " + data.firstName + " | Lang: " + navigator.language,
                                    capacity: 0
                                })
                                return
                            },
                            // Strange, but this is the OK way
                            error: (error) => {
                                this.guest.rfid = this.scannedCode;
                                // this.guestService.updateGuest({ id: this.guest.id, rfid: this.scannedCode})
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
                                    this.logService.createLog({
                                        name: "Assign Tag " + this.guest.rfid + " to " + this.guest.lastName + " " + this.guest.firstName + " | Lang: " + navigator.language,
                                        capacity: 0
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
    onUploadError(event: FileUploadErrorEvent, fileUpload: FileUpload) {
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
        this.logService.createLog({
            name: "Error while importing Excel | File: " + event.files[0].name + ", Size: " + event.files[0].size,
            capacity: 0
        })
    }

    /**
     * Callback to invoke when file upload is complete.
     * @param event
     */
    onUpload(event: any) {  // Files were missing from UploadEvent, although they are included
        this.loading = false
        this.doQuery()
        this.messageService.add({
            severity: 'success',
            summary: '',
            detail: 'Sikeres vendég importálás',
            life: 3000
        })

        // Logging
        this.logService.createLog({
            name: "Successful Excel importing | File: " + event.files[0].name + ", Size: " + event.files[0].size,
            capacity: 0
        })
    }

    hasDietName(dietName: string): boolean {
        return this.diets.some(diet => diet.name === dietName)
    }

    getDietColor(diet: string): string {
        return this.dietService.getDietColor(diet)
    }

    getAge(birthDate: string): string {
        if (!birthDate) return "";
        const birth = moment(birthDate)
        const today = moment()
        return today.diff(birth, 'years').toString()
    }

    getCountryCode(countryName: string): string | null {
        const country = this.countries.find(c =>
            c.name.toLowerCase() === countryName.toLowerCase()
        )
        return country ? country.code.toLowerCase() : null
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
