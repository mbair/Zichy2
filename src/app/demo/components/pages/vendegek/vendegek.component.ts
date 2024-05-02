import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { Observable } from 'rxjs';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { Product } from 'src/app/demo/api/product';
import { Vendeg } from 'src/app/demo/api/vendeg';
import { GuestService } from 'src/app/demo/service/guest.service';
import { Message, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { Tag } from 'src/app/demo/api/tag';



interface TagColor {
    name: string;
    code: string;
}
@Component({
    selector: 'guests',
    templateUrl: './vendegek.component.html',
    providers: [MessageService]
})

@AutoUnsubscribe()

export class VendegekComponent implements OnInit {

    loading: boolean = true;           // Loading overlay trigger value
    tag: Tag = {};
    tagDialog: boolean = false;
    selectedTagColor: TagColor | undefined;
    productDialog: boolean = false;
    deleteGuestDialog: boolean = false;
    deleteGuestsDialog: boolean = false;
    products: Product[] = [];
    product: Product = {};
    guests: Vendeg[] = [];
    guest: Vendeg = {};
    selectedGuests: Product[] = [];
    submitted: boolean = false;
    cols: any[] = [];
    statuses: any[] = [];
    rowsPerPageOptions = [20, 50, 100];
    tagColors: TagColor[] = []
    messages1: Message[] = [];
    successfullMessage: Message[] = [];
    scanTemp: string = '';
    scannedCode: string = '';

    guestsObs$: Observable<any> | undefined;
    serviceMessageObs$: Observable<any> | undefined;

    constructor(private guestService: GuestService, private messageService: MessageService) { }

    ngOnInit() {
        this.guestsObs$ = this.guestService.guestObs;
        this.guestsObs$.subscribe((data) => {
            this.loading = false;
            if (data) {
                this.guests = data;
            }
        })

        // Get all Guests
        this.loading = true;
        this.guestService.getGuests()

        this.serviceMessageObs$ = this.guestService.serviceMessageObs;
        this.serviceMessageObs$.subscribe((data) => {
            this.loading = false;
            if (data) {
                this.messages1 = this.successfullMessage
            }
        })


        this.cols = [
            { field: 'product', header: 'Product' },
            { field: 'price', header: 'Price' },
            { field: 'category', header: 'Category' },
            { field: 'rating', header: 'Reviews' },
            { field: 'inventoryStatus', header: 'Status' }
        ];

        this.tagColors = [
            { name: 'fekete', code: 'black' },
            { name: 'sárga', code: 'yellow' },
            { name: 'piros', code: 'red' },
            { name: 'zöld', code: 'green' },
            { name: 'kék', code: 'blue' }
        ]



        this.statuses = [
            { label: 'FOGLALHATO', value: 'FOGLALHATO' },
            { label: 'MAJDNEMTELE', value: 'MAJDNEMTELE' },
            { label: 'MEGTELT', value: 'MEGTELT' }
        ];

        this.guests = [
            {
                vezeteknev: 'Szabó',
                keresztnev: 'Dóra',
                szoba: 'L13B',
                fizmod: 'Banki',
                etrend: 'vegetáriánus',
                gyulekezet: 'Golgota Budapest',
                nem: 'nő',
                email: 'szabodora@gmail.com',
                telefon: '06201234567',
                szuldatum: '1989.01.01.',
                korcsoport: '18 év feletti',
                allampolgarsag: 'HU',
                orszag: 'Hungary',
                irsz: '2233',
                erkezesDate: '2022.08.07.',
                elsoEtkezes: 'vacsora',
                tavozasDate: '2022.08.12.',
                utolsoEtkezes: 'ebéd',
                pentekEbed: 'Igen, kérek',
                szallasTipus: 'Apartman',
                szobaIgeny: '',
                babaAgy: 'nem',
                tamogatas: 'teljes',
                indok: 'szervező'
            }
        ]
    }

    openNew() {
        this.product = {};
        this.submitted = false;
        this.productDialog = true;
    }

    deleteSelectedGuests() {
        this.deleteGuestsDialog = true;
    }

    editProduct(product: Product) {
        this.product = { ...product };
        this.productDialog = true;
    }

    deleteGuest(guest: Vendeg) {
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
        this.productDialog = false;
        this.submitted = false;
    }

    hideTagDialog() {
        this.tagDialog = false;
        this.submitted = false;
    }

    saveProduct() {
        this.submitted = true;

        if (this.product.name?.trim()) {
            if (this.product.id) {
                // @ts-ignore
                this.product.inventoryStatus = this.product.inventoryStatus.value ? this.product.inventoryStatus.value : this.product.inventoryStatus;
                this.products[this.findIndexById(this.product.id)] = this.product;
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000 });
            } else {
                this.product.id = this.createId();
                this.product.code = this.createId();
                this.product.image = 'product-placeholder.svg';
                // @ts-ignore
                this.product.inventoryStatus = this.product.inventoryStatus ? this.product.inventoryStatus.value : 'FOGLALHATO';
                this.products.push(this.product);
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Created', life: 3000 });
            }

            this.products = [...this.products];
            this.productDialog = false;
            this.product = {};
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
    }

    save() {
        if (!this.scannedCode) return;
        this.guest.rfid = this.scannedCode;
        // this.guestService.updateGuest({ id: this.guest.id, rfid: this.scannedCode})
        this.guestService.updateGuest2(this.guest).subscribe(() => {
            let guestsClone = JSON.parse(JSON.stringify(this.guests))
            guestsClone[this.findIndexById(this.guest.id)] = this.guest;
            this.guests = guestsClone
            this.submitted = true;
            this.scannedCode = '';
            this.guest = {}
            this.successfullMessage = [{
                severity: 'success',
                summary: '',
                detail: 'Sikeresen hozzárendelte a címkét a vendéghez!'
            }]
            setTimeout(() => {
                this.tagDialog = false
            }, 200);
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
            if (event.key === 'ö'){
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

    ngOnDestroy(): void {
    }
}
