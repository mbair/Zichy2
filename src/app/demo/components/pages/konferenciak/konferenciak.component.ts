import { Component, OnInit } from '@angular/core';
import { Konferencia } from 'src/app/demo/api/konferencia';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { KonferenciaService } from 'src/app/demo/service/konferencia.service';

@Component({
    templateUrl: './konferenciak.component.html',
    providers: [MessageService]
})
export class KonferenciakComponent implements OnInit {

    productDialog: boolean = false;

    deleteProductDialog: boolean = false;

    deleteProductsDialog: boolean = false;

    konferenciak: Konferencia[] = [];

    konferencia: Konferencia = {};

    selectedKonferencia: Konferencia[] = [];

    submitted: boolean = false;

    cols: any[] = [];

    statuses: any[] = [];

    canBeBooked: any[] = [];

    rowsPerPageOptions = [5, 10, 20];

    constructor(private konferenciaService: KonferenciaService, private messageService: MessageService) { }

    ngOnInit() {
        this.konferenciaService.getKonferenciak().then(data => this.konferenciak = data);

        this.cols = [
            { field: 'product', header: 'Product' },
            { field: 'price', header: 'Price' },
            { field: 'category', header: 'Category' },
            { field: 'rating', header: 'Reviews' },
            { field: 'inventoryStatus', header: 'Status' }
        ];

        this.statuses = [
            { label: 'FOGLALHATO', value: 'FOGLALHATO' },
            { label: 'MAJDNEMTELE', value: 'MAJDNEMTELE' },
            { label: 'MEGTELT', value: 'MEGTELT' }
        ];

        this.canBeBooked = [
            { label: 'can be booked', value: 'can be booked' },
            { label: 'almost full', value: 'almost full' },
            { label: 'full', value: 'full' }
        ];
    }

    openNew() {
        this.konferencia = {};
        this.submitted = false;
        this.productDialog = true;
    }

    deleteSelectedKonferencia() {
        this.deleteProductsDialog = true;
    }

    editProduct(konferencia: Konferencia) {
        this.konferencia = { ...konferencia };
        this.productDialog = true;
    }

    deleteProduct(konferencia: Konferencia) {
        this.deleteProductDialog = true;
        this.konferencia = { ...konferencia };
    }

    confirmDeleteSelected() {
        this.deleteProductsDialog = false;
        this.konferenciak = this.konferenciak.filter(val => !this.selectedKonferencia.includes(val));
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000 });
        this.selectedKonferencia = [];
    }

    confirmDelete() {
        this.deleteProductDialog = false;
        this.konferenciak = this.konferenciak.filter(val => val.id !== this.konferencia.id);
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
        this.konferencia = {};
    }

    hideDialog() {
        this.productDialog = false;
        this.submitted = false;
    }

    saveProduct() {
        this.submitted = true;

        if (this.konferencia.name?.trim()) {
            if (this.konferencia.id) {
                // @ts-ignore
                this.product.inventoryStatus = this.product.inventoryStatus.value ? this.konferencia.inventoryStatus.value : this.konferencia.inventoryStatus;
                this.konferenciak[this.findIndexById(this.konferencia.id)] = this.konferencia;
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000 });
            } else {
                this.konferencia.id = this.createId();
                this.konferencia.code = this.createId();
                this.konferencia.image = 'product-placeholder.svg';
                // @ts-ignore
                this.product.inventoryStatus = this.product.inventoryStatus ? this.product.inventoryStatus.value : 'FOGLALHATO';
                this.konferenciak.push(this.konferencia);
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Created', life: 3000 });
            }

            this.konferenciak = [...this.konferenciak];
            this.productDialog = false;
            this.konferencia = {};
        }
    }

    findIndexById(id: string): number {
        let index = -1;
        for (let i = 0; i < this.konferenciak.length; i++) {
            if (this.konferenciak[i].id === id) {
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
