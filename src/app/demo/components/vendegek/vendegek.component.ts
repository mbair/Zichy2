import { Component, OnInit, HostListener, isDevMode } from '@angular/core';
import { Observable } from 'rxjs';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { Product } from 'src/app/demo/api/product';
import { GuestService } from 'src/app/demo/service/guest.service';
import { LogService } from 'src/app/demo/service/log.service';
import { Message, MessageService, LazyLoadEvent } from 'primeng/api';
import { Table, TableRowCollapseEvent, TableRowExpandEvent } from 'primeng/table';
import { Tag } from 'src/app/demo/api/tag';
import { Guest } from 'src/app/demo/api/guest';
import { Response } from '../../api/ApiResponse';

interface TagColor {
    name: string;
    code: string;
}
@Component({
    selector: 'guests',
    templateUrl: './vendegek.component.html',
    providers: [MessageService]
})

// Makes unsubscribe automatically, don't need to do manually in ngOnDestroy
// BUT!!! Don't delete ngOnDestroy, it has to stay here!
@AutoUnsubscribe()

export class VendegekComponent implements OnInit {

    loading: boolean = true;           // Loading overlay trigger value
    tag: Tag = {};
    tagDialog: boolean = false;
    selectedTagColor: TagColor | undefined;
    guestDialog: boolean = false;
    deleteGuestDialog: boolean = false;
    deleteGuestsDialog: boolean = false;
    guests: Guest[] = [];
    guest: Guest = {};
    selectedGuests: Guest[] = [];
    submitted: boolean = false;
    cols: any[] = [];
    diets: any[] = [];
    statuses: any[] = [];
    tagColors: TagColor[] = []
    messages1: Message[] = [];
    successfullMessage: Message[] = [];
    scanTemp: string = '';
    scannedCode: string = '';
    tableData: any;
    expandedRows = {};
    filteredGuests: Guest[] = [...this.guests];

    conferences: any[];
    selectedConference: any;

    //pagination and sortin g and seraching:
    rowsPerPageOptions = [20, 50, 100];
    rowsPerPage: number = 10; // Default rows per page
    totalRecords: number = 0;
    page: number = 0;
    sortField: string = ''; // Current sort field
    sortOrder: number = 1; // Current sort order
    globalFilter: string = ''; // Global filter
    filterValues: { [key: string]: string } = {};

    guestsObs$: Observable<any> | undefined;
    serviceMessageObs$: Observable<any> | undefined;

    constructor(private guestService: GuestService, private messageService: MessageService, private logService: LogService) { }

    ngOnInit() {
        this.guestsObs$ = this.guestService.guestObs;
        this.guestsObs$.subscribe((data: Response) => {
            this.loading = false
            if (data) {
                // this.guests = data
                // this.filteredGuests = data
                this.guests = data.rows || [];
                this.totalRecords = data.totalItems || 0;
                this.page = data.currentPage || 0;

                // Filter out test users on production
                if (!isDevMode()) {
                    this.guests = data.rows?.filter((guest: any) => guest.lastName !== "Gábris") || []
                }
            }
        })

        // Get all Guests
        // this.loading = true;
        // this.guestService.getGuests()

        // Message
        this.serviceMessageObs$ = this.guestService.serviceMessageObs;
        this.serviceMessageObs$.subscribe((data) => {
            this.loading = false;
            if (data) {
                this.messages1 = this.successfullMessage
            }
        })

        // Actual conferences
        this.conferences = [
            { name: '20240518-20240520 - KMGY Pünkösdi Hétvége' },
            { name: '20240518-20240520 - Észak-Buda Golgota' },
            { name: '20240518-20240520 - Esztergomi Golgota gyülekezeti hétvége' },
            { name: '20240517-20240519 - Szegedi Gimi 10B osztálykirándulás' }
        ];

        this.cols = [
            { field: 'name', header: 'Név' },  // lastName + firstName
            { field: 'roomNum', header: 'Szoba' },
            { field: 'diet', header: 'Étrend' },
            { field: 'rfid', header: 'RFID' },
            { field: 'lastRfidUsage', header: 'RFID használat' },
            { field: 'dateOfArrival', header: 'Érkezés' },
            { field: 'dateOfDeparture', header: 'Távozás' }
        ]

        this.tagColors = [
            { name: 'fekete', code: 'black' },
            { name: 'sárga', code: 'yellow' },
            { name: 'piros', code: 'red' },
            { name: 'zöld', code: 'green' },
            { name: 'kék', code: 'blue' }
        ]

        this.diets = [
            { label: 'normál', value: 'normál' },
            { label: 'tejmentes', value: 'tejmentes' },
            { label: 'laktózmentes', value: 'laktózmentes' },
            { label: 'gluténmentes', value: 'gluténmentes' },
            { label: 'glutén-, laktóz-, tejmentes', value: 'glutén-, laktóz-, tejmentes' },
            { label: 'vegetáriánus', value: 'vegetáriánus' },
            { label: 'nem kér étkezést', value: 'nem kér étkezést' }
        ]
    }

    loadGuests() {
        this.loading = true;

        const filters = Object.keys(this.filterValues)
            .map(key => this.filterValues[key].length > 0 ? `${key}=${this.filterValues[key]}` : '');
        const queryParams = filters.filter(x => x.length > 0).join('&');

        if (this.globalFilter !== '') {
            return this.guestService.getGuestsBySearch(this.globalFilter, { sortField: this.sortField, sortOrder: this.sortOrder });
        }

        if (queryParams.length > 0) {
            return this.guestService.getGuestsBySearchQuery(queryParams);
        }

        return this.guestService.getGuests(this.page, this.rowsPerPage, { sortField: this.sortField, sortOrder: this.sortOrder });
    }

    onFilter(event: any, field: string) {
        this.filterValues[field] = event.target.value;
        this.loadGuests();
    }

    onLazyLoad(event: any) {
        this.page = event.first! / event.rows!;
        this.rowsPerPage = event.rows ?? 10;
        this.sortField = event.sortField ?? '';
        this.sortOrder = event.sortOrder ?? 1;
        this.globalFilter = event.globalFilter ?? '';
        this.loadGuests();
    }

    onConferenceChange() {
        this.filterValues['conferenceName'] = this.selectedConference?.name || ''
        this.loadGuests()
    }

    openNew() {
        this.guest = {};
        this.submitted = false;
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
        this.submitted = false;
    }

    hideTagDialog() {
        this.tagDialog = false;
        this.submitted = false;
    }

    saveGuest() {
        this.submitted = true;

        if (this.guest.firstName?.trim()) {
            if (this.guest.id) {
                this.guestService.updateGuest(this.guest)
                this.guests[this.findIndexById(this.guest.id)] = this.guest;
                this.submitted = true;
                this.successfullMessage = [{
                    severity: 'success',
                    summary: '',
                    detail: 'Sikeres vendégmódosítás!'
                }]
            } else {
                this.guestService.createGuest(this.guest)
                this.guests.push(this.guest)
                this.submitted = true;
                this.successfullMessage = [{
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
        this.messages1 = [
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
        this.submitted = true;
        this.successfullMessage = [{
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
            this.successfullMessage = [{
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

            this.submitted = true;
            this.scannedCode = '';
            this.guest = {}
        })
    }

    getDietColor(diet: string): string {
        switch (diet) {
            case 'tejmentes':
                return 'blue';
            case 'laktózmentes':
                return 'blue'
            case 'gluténmentes':
                return 'yellow'
            case 'glutén-, laktóz-, tejmentes':
                return 'red'
            case 'vegetáriánus':
                return 'green'
            case 'nem kér étkezést':
                return 'silver'
            default:
                return 'black'
        }
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
