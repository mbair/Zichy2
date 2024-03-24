import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/demo/api/product';
import { FoodVoucher } from 'src/app/demo/api/food-voucher';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { ProductService } from 'src/app/demo/service/product.service';

@Component({
    templateUrl: './food-vouchers.component.html',
    providers: [MessageService]
})
export class FoodVouchersComponent implements OnInit {

    productDialog: boolean = false;

    deleteProductDialog: boolean = false;

    deleteProductsDialog: boolean = false;

    products: Product[] = [];

    product: Product = {};

    FoodVouchers: FoodVoucher[] = [];

    foodVoucher: FoodVoucher[] = [];

    selectedProducts: Product[] = [];

    submitted: boolean = false;

    cols: any[] = [];

    statuses: any[] = [];

    rowsPerPageOptions = [5, 10, 20];

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

        this.statuses = [
            { label: 'FOGLALHATO', value: 'FOGLALHATO' },
            { label: 'MAJDNEMTELE', value: 'MAJDNEMTELE' },
            { label: 'MEGTELT', value: 'MEGTELT' }
        ];

        this.FoodVouchers = [
            {
                id: '1',
                szobaszam: '101',
                szobakod: 'MD',
                agyakszama: '2',
                epulet: 'Maranatha fsz',
                agytipus: 'kétágyas',
                megjegyzes: 'kapcs.: 102',
            },
            {
                id: '2',
                szobaszam: '102',
                szobakod: 'MB',
                agyakszama: '4',
                epulet: 'Maranatha fsz',
                agytipus: 'emeletes ágy',
                megjegyzes: 'kapcs.: 101',
            },
            {
                id: '3',
                szobaszam: '103',
                szobakod: 'MQ',
                agyakszama: '2',
                epulet: 'Maranatha fsz',
                agytipus: 'franciaágy',
                megjegyzes: 'kapcs.: 104',
            },
            {
                id: '4',
                szobaszam: '104',
                szobakod: 'MB',
                agyakszama: '4',
                epulet: 'Maranatha fsz',
                agytipus: 'emeletes ágy',
                megjegyzes: 'kapcs.: 103',
            },
            {
                id: '5',
                szobaszam: '105',
                szobakod: 'MD',
                agyakszama: '2',
                epulet: 'Maranatha fsz',
                agytipus: 'kétágyas',
                megjegyzes: 'kapcs.: 106',
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
}
