import { Component, OnInit } from '@angular/core';
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
  products: any[] = [];
  product: any = {};
  szobak: Szoba[] = [];
  szoba: Szoba = <Szoba>{};
  szobaKodok: any;
  agytipusok: any;
  matracok: any;
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
    ]

    this.szobaKodok = [
      { value: 'A', label: 'Apartman' },            // Apartman
      { value: 'MD', label: 'Maranatha Double',   },// Maranatha Double (Maranatha kétágyas)
      { value: 'MB', label: 'Maranatha Bunkbed' },  // Maranatha Bunkbed (Maranatha négyágyas emeleteságyas)
      { value: 'MQ', label: 'Maranatha Queenbed' }, // Maranatha Queenbed (franciaágyas)
      { value: 'KB', label: 'Kastély Bunked' },     // Kastély Bunked (Kastélyban emeleteságyas)
    ]

    // A szoba pótágyazhatóságát jelöli
    this.matracok = [
      { label: 'M', value: 'M' },    // matrac fér be
      { label: 'GY', value: 'GY' },  // gyerekágy fér be, A matrac helyett befér gyerekágy de fordítva nem
      { label: 'MM', value: 'MM' },  // 2 db matrac fér
      { label: 'MGY', value: 'MGY' } // matrac és gyerekágy fér be
    ]

    this.agytipusok = [
      { label: 'kétágyas', value: 'kétágyas' },
      { label: 'emeletes ágy', value: 'emeletes ágy' },
      { label: 'franciaágy', value: 'franciaágy' }
    ]
  }

  openNew() {
    this.szoba = <Szoba>{};
    this.submitted = false;
    this.roomDialog = true;
  }

  deleteSelected() {
    this.deleteRoomsDialog = true;
  }

  editRoom(szoba: Szoba) {
    this.szoba = { ...szoba };
    this.roomDialog = true;
  }

  deleteRoom(szoba: Szoba) {
    this.deleteRoomDialog = true;
    this.szoba = { ...szoba };
  }

  confirmDeleteSelected() {
    this.deleteRoomsDialog = false;
    this.szobak = this.szobak.filter(val => !this.selectedRooms.includes(val));
    this.messageService.add({ severity: 'success', summary: 'Sikeres művelet', detail: 'Szobák törölve', life: 3000 });
    this.selectedRooms = [];
  }

  confirmDelete() {
    this.deleteRoomDialog = false;
    this.szobak = this.szobak.filter(val => val.id !== this.szoba.id);
    this.messageService.add({ severity: 'success', summary: 'Sikeres művelet', detail: 'Szoba törölve', life: 3000 });
    this.szoba = <Szoba>{};
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
