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

    loading: boolean = false;           // Loading overlay trigger value
    tag: Tag = {};
    tagDialog: boolean = false;
    selectedTagColor: TagColor | undefined;
    productDialog: boolean = false;
    deleteProductDialog: boolean = false;
    deleteProductsDialog: boolean = false;
    products: Product[] = [];
    product: Product = {};
    vendegek: Vendeg[] = [];
    vendeg: Vendeg = {};
    selectedProducts: Product[] = [];
    submitted: boolean = false;
    cols: any[] = [];
    statuses: any[] = [];
    rowsPerPageOptions = [5, 10, 20];
    tagColors: TagColor[] = []
    messages1: Message[] = [];
    successfullMessage: Message[] = [];
    scanTemp: string = '';
    scannedCode: string = '';
    guest: Vendeg = {}

    guestsObs$: Observable<any> | undefined;
    serviceMessageObs$: Observable<any> | undefined;

    constructor(private dataService: GuestService, private messageService: MessageService) { }

    ngOnInit() {
        this.guestsObs$ = this.dataService.guestObs;
        this.guestsObs$.subscribe((data) => {
            this.loading = false;
            if (data) {
                this.vendegek = data;
            }
        })

        // Get all Guests
        this.dataService.getGuests()

        this.serviceMessageObs$ = this.dataService.serviceMessageObs;
        this.serviceMessageObs$.subscribe((data) => {
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

        this.vendegek = [
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

    deleteSelectedProducts() {
        this.deleteProductsDialog = true;
    }

    editProduct(product: Product) {
        this.product = { ...product };
        this.productDialog = true;
    }

    deleteProduct(product: Product) {
        this.deleteProductDialog = true;
        this.product = { ...product };
    }

    confirmDeleteSelected() {
        this.deleteProductsDialog = false;
        this.products = this.products.filter(val => !this.selectedProducts.includes(val));
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000 });
        this.selectedProducts = [];
    }

    confirmDelete() {
        this.deleteProductDialog = false;
        this.products = this.products.filter(val => val.id !== this.product.id);
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
        this.product = {};
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

    findIndexById(id: string): number {
        let index = -1;
        for (let i = 0; i < this.products.length; i++) {
            if (this.products[i].id === id) {
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
        this.scannedCode = '';
        this.guest = { ...guest };
        this.messages1 = [
            { severity: 'info', summary: '', detail: 'Tartsa az RFID címkét az olvasóhoz...' },
        ]
        this.tagDialog = true;
    }

    unAssignTag() {
        this.guest.rfid =  '';
        this.dataService.updateGuest(this.guest, this.vendegek);
        this.submitted = true;
        this.successfullMessage = [{
            severity: 'success',
            summary: '',
            detail: 'A címkét eltávolítottuk a vendégtől!'
        }]
    }

    save() {
        if (!this.scannedCode) return;
        this.guest.rfid = this.scannedCode;
        this.dataService.updateGuest(this.guest, this.vendegek)
        this.submitted = true;
        this.successfullMessage = [{
            severity: 'success',
            summary: '',
            detail: 'Sikeresen hozzárendelte a címkét a vendéghez!'
        }]
        setTimeout(() => {
            this.hideTagDialog()
        }, 200);
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
