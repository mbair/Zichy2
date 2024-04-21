import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/demo/api/product';
import { Vendeg } from 'src/app/demo/api/vendeg';
import { Table } from 'primeng/table';
import { ProductService } from 'src/app/demo/service/product.service';
import { Message, MessageService } from 'primeng/api';
import { Tag } from 'src/app/demo/api/tag';

interface TagColor {
    name: string;
    code: string;
}
@Component({
    templateUrl: './vendegek.component.html',
    providers: [MessageService]
})

export class VendegekComponent implements OnInit {

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

    constructor(private productService: ProductService, private messageService: MessageService) { }

    ngOnInit() {
        this.productService.getProducts().then(data => this.products = data);

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

        this.messages1 = [
            { severity: 'info', summary: '', detail: 'Tartsa az RFID címkét az olvasóhoz...' },
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
            },
            {
                vezeteknev: 'Varga',
                keresztnev: 'Dániel',
                szoba: '104',
                fizmod: 'Banki',
                etrend: 'vegetáriánus',
                gyulekezet: 'Golgota Budapest',
                nem: 'férfi',
                email: 'szabodora@gmail.com',
                telefon: '06201234567',
                szuldatum: '1978.01.01.',
                korcsoport: '18 év feletti',
                allampolgarsag: 'HU',
                orszag: 'Hungary',
                irsz: '2233',
                erkezesDate: '2022.08.07.',
                elsoEtkezes: 'vacsora',
                tavozasDate: '2022.08.12.',
                utolsoEtkezes: 'ebéd',
                pentekEbed: 'Igen, kérek',
                szallasTipus: 'M4',
                szobaIgeny: '',
                babaAgy: 'nem',
                tamogatas: 'teljes',
                indok: 'szervező'
            },
            {
                vezeteknev: 'Varga',
                keresztnev: 'Mária',
                szoba: '104',
                fizmod: 'Banki',
                etrend: 'normál',
                gyulekezet: 'Golgota Budapest',
                nem: 'nő',
                email: 'szabodora@gmail.com',
                telefon: '06201234567',
                szuldatum: '1987.01.01.',
                korcsoport: '18 év feletti',
                allampolgarsag: 'HU',
                orszag: 'Hungary',
                irsz: '2233',
                erkezesDate: '2022.08.07.',
                elsoEtkezes: 'vacsora',
                tavozasDate: '2022.08.12.',
                utolsoEtkezes: 'ebéd',
                pentekEbed: 'Igen, kérek',
                szallasTipus: 'M4',
                szobaIgeny: '',
                babaAgy: 'nem',
                tamogatas: 'teljes',
                indok: 'szervező'
            },
            {
                vezeteknev: 'Varga',
                keresztnev: 'Máté',
                szoba: '104',
                fizmod: 'Banki',
                etrend: 'nem kér étkezést',
                gyulekezet: 'Golgota Budapest',
                nem: 'férfi',
                email: 'szabodora@gmail.com',
                telefon: '06201234567',
                szuldatum: '2016.01.01.',
                korcsoport: '18 év feletti',
                allampolgarsag: 'HU',
                orszag: 'Hungary',
                irsz: '2233',
                erkezesDate: '2022.08.07.',
                elsoEtkezes: 'vacsora',
                tavozasDate: '2022.08.12.',
                utolsoEtkezes: 'ebéd',
                pentekEbed: 'Igen, kérek',
                szallasTipus: 'M4',
                szobaIgeny: '',
                babaAgy: 'nem',
                tamogatas: 'teljes',
                indok: 'szervező'
            },
            {
                vezeteknev: 'Varga',
                keresztnev: 'Laura',
                szoba: '104',
                fizmod: 'Banki',
                etrend: 'normál',
                gyulekezet: 'Golgota Budapest',
                nem: 'nő',
                email: 'szabodora@gmail.com',
                telefon: '06201234567',
                szuldatum: '2020.01.01.',
                korcsoport: '18 év feletti',
                allampolgarsag: 'HU',
                orszag: 'Hungary',
                irsz: '2233',
                erkezesDate: '2022.08.07.',
                elsoEtkezes: 'vacsora',
                tavozasDate: '2022.08.12.',
                utolsoEtkezes: 'ebéd',
                pentekEbed: 'Igen, kérek',
                szallasTipus: 'M4',
                szobaIgeny: '',
                babaAgy: 'nem',
                tamogatas: 'teljes',
                indok: 'szervező'
            },
            {
                vezeteknev: 'Németh',
                keresztnev: 'Csilla',
                szoba: '112',
                fizmod: 'Banki',
                etrend: 'nem kér étkezést',
                gyulekezet: 'Golgota Budapest',
                nem: 'nő',
                email: 'szabodora@gmail.com',
                telefon: '06702345678',
                szuldatum: '1982.01.01.',
                korcsoport: '18 év feletti',
                allampolgarsag: 'HU',
                orszag: 'Hungary',
                irsz: '2233',
                erkezesDate: '2022.08.07.',
                elsoEtkezes: 'vacsora',
                tavozasDate: '2022.08.12.',
                utolsoEtkezes: 'ebéd',
                pentekEbed: 'Igen, kérek',
                szallasTipus: 'M4',
                szobaIgeny: '',
                babaAgy: 'nem',
                tamogatas: 'teljes',
                indok: 'szervező'
            },
            {
                vezeteknev: 'Németh',
                keresztnev: 'Balázs',
                szoba: '112',
                fizmod: 'Banki',
                etrend: 'vegetáriánus',
                gyulekezet: 'Golgota Budapest',
                nem: 'férfi',
                email: 'szabodora@gmail.com',
                telefon: '06702345678',
                szuldatum: '1978.01.01.',
                korcsoport: '18 év feletti',
                allampolgarsag: 'HU',
                orszag: 'Hungary',
                irsz: '2233',
                erkezesDate: '2022.08.07.',
                elsoEtkezes: 'vacsora',
                tavozasDate: '2022.08.12.',
                utolsoEtkezes: 'ebéd',
                pentekEbed: 'Igen, kérek',
                szallasTipus: 'M4',
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
        this.product = { ...guest };
        this.tagDialog = true;
    }

    save() {
        if (!this.tag.identifier) return;

        this.submitted = true;
        if (this.tag.identifier && this.tag.identifier.trim().length > 0) {
            // const last = this.tags[this.tags.length - 1];
            // const lastId = Number(last.id);
            // this.tag.id = lastId + 1;
            // this.tags.push(this.tag);
            // this.tags = [...this.tags];
            this.tagDialog = false;
            this.tag = {};
            this.messageService.add({ severity: 'success', summary: 'Siker', detail: 'Címke rögzítve', life: 3000 });
        }
    }
}
