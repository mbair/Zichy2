import { Component, OnInit } from '@angular/core';
import { Table } from 'primeng/table';
import { FoodSensitivity } from 'src/app/demo/api/food-sensitivity';
import { FoodSensitivityService } from 'src/app/demo/service/foodsensitivity.service';
import { MessageService } from 'primeng/api';

@Component({
    templateUrl: './food-sensitivities.component.html',
    providers: [MessageService]
})
export class FoodSensitivitiesComponent implements OnInit {

    foodSensitivity: FoodSensitivity;
    foodSensitivities: FoodSensitivity[] = [];
    foodSensitivityDialog: boolean = false;
    deletefoodSensitivityDialog: boolean = false;
    deletefoodSensitivitiesDialog: boolean = false;
    selectedFoodSensitivities: FoodSensitivity[] = [];
    submitted: boolean = false;
    cols: any[] = [];
    rowsPerPageOptions = [5, 10, 20];

    constructor(private foodSensitivityService: FoodSensitivityService, private messageService: MessageService) { }

    ngOnInit() {
        this.foodSensitivityService.getFoodSensitivities().then(data => this.foodSensitivities = data);

        this.cols = [
            { field: 'name', header: 'Étrend neve' },
            { field: 'color', header: 'Karszalag szín' },
            { field: 'enabled', header: 'Engedélyezve' },
        ]
    }

    openNew() {
        this.foodSensitivity = {};
        this.submitted = false;
        this.foodSensitivityDialog = true;
    }

    deleteSelectedFoodsensitivities() {
        this.deletefoodSensitivitiesDialog = true;
    }

    editFoodsensitivity(sensitivity: FoodSensitivity) {
        // this.foodSensitivities = { ...sensitivity };
        this.foodSensitivityDialog = true;
    }

    deleteFoodsensitivity(sensitivity: FoodSensitivity) {
        this.deletefoodSensitivityDialog = true;
        this.foodSensitivity = { ...sensitivity };
    }

    confirmDeleteSelected() {
        this.deletefoodSensitivityDialog = false;
        this.foodSensitivities = this.foodSensitivities.filter(val => !this.selectedFoodSensitivities.includes(val));
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Foodsensitivity Deleted', life: 3000 });
        this.selectedFoodSensitivities = [];
    }

    confirmDelete() {
        this.deletefoodSensitivityDialog = false;
        this.foodSensitivities = this.foodSensitivities.filter(val => val.id !== this.foodSensitivity.id);
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Foodsensitivity Deleted', life: 3000 });
        this.foodSensitivity = {};
    }

    hideDialog() {
        this.foodSensitivityDialog = false;
        this.submitted = false;
    }

    // saveProduct() {
    //     this.submitted = true;

    //     if (this.product.name?.trim()) {
    //         if (this.product.id) {
    //             // @ts-ignore
    //             this.product.inventoryStatus = this.product.inventoryStatus.value ? this.product.inventoryStatus.value : this.product.inventoryStatus;
    //             this.products[this.findIndexById(this.product.id)] = this.product;
    //             this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000 });
    //         } else {
    //             this.product.id = this.createId();
    //             this.product.code = this.createId();
    //             this.product.image = 'product-placeholder.svg';
    //             // @ts-ignore
    //             this.product.inventoryStatus = this.product.inventoryStatus ? this.product.inventoryStatus.value : 'FOGLALHATO';
    //             this.products.push(this.product);
    //             this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Created', life: 3000 });
    //         }

    //         this.products = [...this.products];
    //         this.productDialog = false;
    //         this.product = {};
    //     }
    // }

    findIndexById(id: string): number {
        let index = -1;
        for (let i = 0; i < this.foodSensitivities.length; i++) {
            if (this.foodSensitivities[i].id === id) {
                index = i;
                break;
            }
        }

        return index;
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }
}
