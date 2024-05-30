import { Component, OnInit, HostListener, isDevMode } from '@angular/core';
import { Observable } from 'rxjs';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { Message, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { GuestService } from '../../service/guest.service';
import { DietService } from '../../service/diet.service';
import { LogService } from '../../service/log.service';
import { ApiResponse } from '../../api/ApiResponse';
import { Guest } from '../../api/guest';
import { Tag } from '../../api/tag';

@Component({
    selector: 'guests',
    templateUrl: './vendegek.component.html',
    providers: [MessageService]
})

// Makes unsubscribe automatically, don't need to do manually in ngOnDestroy
// BUT!!! Don't delete ngOnDestroy, it has to stay here!
@AutoUnsubscribe()

export class VendegekComponent implements OnInit {

    loading: boolean = true;                   // Loading overlay trigger value
    tableData: Guest[] = [];                   // Data set displayed in a table
    messages: Message[] = [];                  // A message used for notifications and displaying errors
    successfulMessage: Message[] = [];         // Message displayed on success
    tag: Tag = {};                             // NFC tag
    tagDialog: boolean = false;                // Tag assignment popup
    conferences: any[];                        // Optional conferences
    selectedConference: any;                   // Conference chosen by user
    guest: Guest = {};                         // One guest object
    guests: Guest[] = [];                      // All guests who appear in the table
    guestDialog: boolean = false;              // Guests maintenance popup
    deleteGuestDialog: boolean = false;        // Popup for deleting guest
    deleteGuestsDialog: boolean = false;       // Popup for deleting guests
    selectedGuests: Guest[] = [];              // Guest chosen by user
    cols: any[] = [];                          // Table columns
    diets: any[] = [];                         // Possible diets
    scanTemp: string = '';                     // Temporary storage used during NFC reading
    scannedCode: string = '';                  // Scanned Tag Id
    rowsPerPageOptions = [20, 50, 100];        // Possible rows per page
    rowsPerPage: number = 20;                  // Default rows per page
    totalRecords: number = 0;                  // Total number of rows in the table
    page: number = 0;                          // Current page
    sortField: string = '';                    // Current sort field
    sortOrder: number = 1;                     // Current sort order
    globalFilter: string = '';                 // Global filter
    filterValues: {[key: string]: string} = {} // Table filter conditions

    private guestObs$: Observable<any> | undefined;
    private dietObs$: Observable<any> | undefined;
    private serviceMessageObs$: Observable<any> | undefined;
    private debounce: {[key: string]: any} = {};

    constructor(private guestService: GuestService,
                private dietService: DietService,
                private messageService: MessageService,
                private logService: LogService) { }

    ngOnInit() {
        // Guests
        this.guestObs$ = this.guestService.guestObs;
        this.guestObs$.subscribe((data: ApiResponse) => {
            this.loading = false
            if (data) {
                this.guests = data.rows || [];
                this.totalRecords = data.totalItems || 0;
                this.page = data.currentPage || 0;

                // Filter out test users on production
                // TODO: add test column to Guest
                if (!isDevMode()) {
                    this.guests = data.rows?.filter((guest: any) => guest.lastName !== "Gábris") || []
                }
            }
        })

        // Diets
        this.dietObs$ = this.dietService.dietObs;
        this.dietObs$.subscribe((data: ApiResponse) => {
            this.loading = false
            if (data && data.rows) {
                this.diets = data.rows
            }
        })
        this.dietService.getDiets(0, 999, '')

        // Message
        this.serviceMessageObs$ = this.guestService.serviceMessageObs;
        this.serviceMessageObs$.subscribe((data) => {
            this.loading = false;
            if (data) {
                this.messages = this.successfulMessage
            }
        })

        // Actual conferences
        // TODO: Get conferences from DB with service
        this.conferences = [
            { name: '20240530-20240531 - Zöldliget Iskola osztálykirándulás' },
        ]

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
            this.guestService.getGuestsBySearch(this.globalFilter, { sortField: this.sortField, sortOrder: this.sortOrder })
            return
        }
        if (queryParams.length > 0) {
            this.guestService.getGuestsBySearchQuery(queryParams)
            return
        }

        this.guestService.getGuests(this.page, this.rowsPerPage, { sortField: this.sortField, sortOrder: this.sortOrder })
    }

    onFilter(event: any, field: string) {
        this.filterValues[field] = event.value || event.target.value

        if (this.debounce[field]) {
            clearTimeout(this.debounce[field])
        }

        this.debounce[field] = setTimeout(() => {
            if (this.filterValues[field] === (event.value || event.target.value)) {
                this.doQuery()
            }
        }, 500)
    }

    onLazyLoad(event: any) {
        this.page = event.first! / event.rows!;
        this.rowsPerPage = event.rows ?? 20;
        this.sortField = event.sortField ?? '';
        this.sortOrder = event.sortOrder ?? 1;
        this.globalFilter = event.globalFilter ?? '';
        this.doQuery();
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
        this.guests = this.guests.filter(val => !this.selectedGuests.includes(val))
        this.messageService.add({ severity: 'success', summary: 'Sikeres törlés', detail: 'Vendégek törölve', life: 3000 })
        this.selectedGuests = []
        this.loading = false;
    }

    confirmDelete() {
        this.loading = true;
        this.deleteGuestDialog = false;
        this.guests = this.guests.filter(val => val.id !== this.guest.id);
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
            if (this.guest.id) {
                this.guestService.updateGuest(this.guest)
                this.guests[this.findIndexById(this.guest.id)] = this.guest;
                this.successfulMessage = [{
                    severity: 'success',
                    summary: '',
                    detail: 'Sikeres vendégmódosítás!'
                }]
            } else {
                this.guestService.createGuest(this.guest)
                this.guests.push(this.guest)
                this.successfulMessage = [{
                    severity: 'success',
                    summary: '',
                    detail: 'Sikeres vendég rögzítés!'
                }]
            }

            this.guests = [...this.guests]
            this.guestDialog = false
            this.guest = {}
        }
    }

    findIndexById(id: string | undefined): number {
        let index = -1;
        for (let i = 0; i < this.guests.length; i++) {
            if (this.guests[i].id === id) {
                index = i;
                break;
            }
        }

        return index;
    }

    createId(): string {
        let id = '';
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < 5; i++) {
            id += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return id;
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
            { severity: 'info', summary: '', detail: 'Tartsa az RFID címkét az olvasóhoz...' },
        ]
        this.tagDialog = true;
    }

    unAssignTag() {
        this.guest.rfid = '';
        this.guest.lastRfidUsage = '';
        this.guestService.updateGuest(this.guest);
        let guestsClone = JSON.parse(JSON.stringify(this.guests))
        guestsClone[this.findIndexById(this.guest.id)] = this.guest;
        this.guests = guestsClone
        this.successfulMessage = [{
            severity: 'success',
            summary: '',
            detail: 'A címkét eltávolítottuk a vendégtől!'
        }]
        setTimeout(() => {
            this.tagDialog = false
        }, 200)

        // Logging
        this.logService.createLog({
            name: "Unassign Tag from " + this.guest.lastName + " " + this.guest.firstName,
            capacity: 0
        })
    }

    save() {
        if (!this.scannedCode) return;
        this.guest.rfid = this.scannedCode;
        // this.guestService.updateGuest({ id: this.guest.id, rfid: this.scannedCode})
        this.guestService.updateGuest2(this.guest).subscribe(() => {
            let guestsClone = JSON.parse(JSON.stringify(this.guests))
            guestsClone[this.findIndexById(this.guest.id)] = this.guest;
            this.guests = guestsClone
            this.successfulMessage = [{
                severity: 'success',
                summary: '',
                detail: 'Sikeresen hozzárendelte a címkét a vendéghez!'
            }]
            setTimeout(() => {
                this.tagDialog = false
            }, 200);

            // Logging
            this.logService.createLog({
                name: "Assign Tag " + this.guest.rfid + " to " + this.guest.lastName + " " + this.guest.firstName,
                capacity: 0
            })

            this.scannedCode = '';
            this.guest = {}
        })
    }

    getDietColor(diet: string): string {
        return this.dietService.getDietColor(diet)
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
            if (event.key === 'ö') {
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