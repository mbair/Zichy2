import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/demo/api/product';
import { Szoba } from 'src/app/demo/api/szoba';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { SzobaService } from 'src/app/demo/service/szoba.service';

@Component({
    templateUrl: './szobak.component.html',
    providers: [MessageService]
})
export class SzobakComponent implements OnInit {

    roomDialog: boolean = false;

    deleteRoomDialog: boolean = false;

    deleteRoomsDialog: boolean = false;

    products: Product[] = [];

    product: Product = {};

    szobak: Szoba[] = [];

    szoba: Szoba = {};

    szobaKodok = [
      'A',  // Apartman
      'MD', // Maranatha Double( Maranatha kétágyas)
      'MB', // Maranatha Bunkbed (Maranatha négyágyas emeleteságyas)
      'MQ', // Maranatha Queenbed (franciaágyas)
      'KB', // Kastély Bunked (Kastélyban emeleteságyas)
    ];

    matrac: any;

    agytipusok: any;

    selectedRooms: Szoba[] = [];

    submitted: boolean = false;

    cols: any[] = [];

    statuses: any[] = [];

    rowsPerPageOptions = [5, 10, 20];

    constructor(private szobaService: SzobaService, private messageService: MessageService) { }

    ngOnInit() {
        this.szobaService.getSzobak().then(data => this.szobak = data);

        this.cols = [
            { field: 'szobaszam', header: 'Szoba szám' },
            { field: 'szobakod', header: 'Szoba kód' },
            { field: 'agyakszama', header: 'Ágyak száma' },
            { field: 'matrac', header: 'Matrac / gyerekágy' },
            { field: 'furdoszoba', header: 'Fürdőszoba' },
            { field: 'epulet', header: 'Épület / folyosó' },
            { field: 'agytipus', header: 'Ágy típus' },
            { field: 'megjegyzes', header: 'Megjegyzés' }
        ];

        // A szoba pótágyazhatóságát jelöli
        this.matrac = [
          { label: 'M', value: 'M' },    // matrac fér be
          { label: 'GY', value: 'GY' },  // gyerekágy fér be, A matrac helyett befér gyerekágy de fordítva nem
          { label: 'MM', value: 'MM' },  // 2 db matrac fér
          { label: 'MGY', value: 'MGY' } // matrac és gyerekágy fér be
      ];

        this.agytipusok = [
            { label: 'kétágyas', value: 'kétágyas' },
            { label: 'emeletes ágy', value: 'emeletes ágy' },
            { label: 'franciaágy', value: 'franciaágy' }
        ];

    }

    openNew() {
        this.product = {};
        this.submitted = false;
        this.roomDialog = true;
    }

    deleteSelected() {
        this.deleteRoomsDialog = true;
    }

    editRoom(product: Product) {
        this.product = { ...product };
        this.roomDialog = true;
    }

    deleteRoom(product: Product) {
        this.deleteRoomDialog = true;
        this.product = { ...product };
    }

    confirmDeleteSelected() {
        this.deleteRoomsDialog = false;
        this.products = this.products.filter(val => !this.selectedRooms.includes(val));
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000 });
        this.selectedRooms = [];
    }

    confirmDelete() {
        this.deleteRoomDialog = false;
        this.products = this.products.filter(val => val.id !== this.product.id);
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
        this.product = {};
    }

    hideDialog() {
        this.roomDialog = false;
        this.submitted = false;
    }

    saveRoom() {
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
            this.roomDialog = false;
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
}
