import { Component, OnInit, HostListener, isDevMode } from '@angular/core';
import { Observable } from 'rxjs';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { TagService } from '../../service/tag.service';
import { LogService } from '../../service/log.service';
import { ApiResponse } from '../../api/ApiResponse';
import { Tag } from '../../api/tag';
import * as moment from 'moment';
moment.locale('hu')

interface TagColor {
    name: string;
    code: string;
}

@Component({
    templateUrl: './rfid-tag.component.html',
    providers: [MessageService]
})

// Makes unsubscribe automatically, don't need to do manually in ngOnDestroy
// BUT!!! Don't delete ngOnDestroy, it has to stay here!
@AutoUnsubscribe()

export class RFIDTagComponent implements OnInit {

    loading: boolean = true;                     // Loading overlay trigger value
    cols: any[] = [];                            // Table columns
    tableItem: Tag = {};                         // One tag object
    tableData: Tag[] = [];                       // Data set displayed in a table
    rowsPerPageOptions = [20, 50, 100];          // Possible rows per page
    rowsPerPage: number = 20;                    // Default rows per page
    totalRecords: number = 0;                    // Total number of rows in the table
    page: number = 0;                            // Current page
    sortField: string = '';                      // Current sort field
    sortOrder: number = 1;                       // Current sort order
    globalFilter: string = '';                   // Global filter
    filterValues: { [key: string]: string } = {} // Table filter conditions
    debounce: { [key: string]: any } = {}        // Search delay in filter field
    dialog: boolean = false;                     // Table item maintenance modal
    deleteDialog: boolean = false;               // Popup for deleting table item
    bulkDeleteDialog: boolean = false;           // Popup for deleting table items
    selected: Tag[] = [];                        // Table items chosen by user
    selectedTagColor: TagColor | undefined;      // Tag color chosen by user
    tagColors: TagColor[] = []                   // Possible tag colors
    scanTemp: string = '';                       // Temporary storage used during NFC reading
    scannedCode: string = '';                    // Scanned Tag Id

    private tagObs$: Observable<any> | undefined;
    private serviceMessageObs$: Observable<any> | undefined;

    constructor(
        private tagService: TagService,
        private messageService: MessageService,
        private logService: LogService) { }

    ngOnInit() {
        // Table columns
        this.cols = [
            { field: 'id', header: 'ID' },
            { field: 'color', header: 'Szín' },
            { field: 'identifier', header: 'Azonosító' },
            { field: 'enabled', header: 'Engedélyezve van' },
            { field: 'createdAt', header: 'Létrehozva' },
            { field: 'updatedAt', header: 'Módosítva' }
        ]

        // Tag colors
        this.tagColors = [
            { name: 'fekete', code: 'black' },
            { name: 'sárga', code: 'yellow' },
            { name: 'piros', code: 'red' },
            { name: 'zöld', code: 'green' },
            { name: 'kék', code: 'blue' }
        ]

        // Tags
        this.tagObs$ = this.tagService.tagObs;
        this.tagObs$.subscribe((data: ApiResponse) => {
            this.loading = false
            if (data) {
                this.tableData = data.rows || [];
                this.totalRecords = data.totalItems || 0;
                this.page = data.currentPage || 0;
            }
        })

        // Message
        this.serviceMessageObs$ = this.tagService.messageObs;
        this.serviceMessageObs$.subscribe((data) => {
            this.loading = false;
            if (data == 'ERROR') {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: 'Hiba történt!'
                })
            } else {
                // Show service response message
                this.messageService.add(data)

                // Reset selected table Item(s)
                this.tableItem = {}
                this.selected = []

                // Query for data changes
                this.doQuery()
            }
        })
    }

    // Load filtered data into the Table
    doQuery() {
        this.loading = true;

        const filters = Object.keys(this.filterValues)
            .map(key => this.filterValues[key].length > 0 ? `${key}=${this.filterValues[key]}` : '')
        const queryParams = filters.filter(x => x.length > 0).join('&')

        if (this.globalFilter !== '') {
            return this.tagService.getBySearch(this.globalFilter, { sortField: this.sortField, sortOrder: this.sortOrder })
        }

        return this.tagService.get(this.page, this.rowsPerPage, { sortField: this.sortField, sortOrder: this.sortOrder }, queryParams)
    }

    onFilter(event: any, field: string) {
        this.loading = true;
        let filterValue = '';

        // Calendar date as String
        if (event instanceof Date) {
            const date = moment(event);
            const formattedDate = date.format('YYYY.MM.DD');
            filterValue = formattedDate
        } else {
            if (event && (event.value || event.target?.value)) {
                if (field == "rfid" && event.target?.value.length == 10) {
                    filterValue = event.target?.value.replaceAll('ö', '0')
                } else {
                    filterValue = event.value || event.target?.value
                }
            } else {
                this.filterValues[field] = ''
            }
        }

        this.filterValues[field] = filterValue

        if (this.debounce[field]) {
            clearTimeout(this.debounce[field])
        }

        this.debounce[field] = setTimeout(() => {
            if (this.filterValues[field] === filterValue) {
                this.doQuery()
            }
        }, 500)
    }

    onLazyLoad(event: any) {
        this.page = event.first! / event.rows!;
        this.rowsPerPage = event.rows ?? this.rowsPerPage;
        this.sortField = event.sortField ?? '';
        this.sortOrder = event.sortOrder ?? 1;
        this.globalFilter = event.globalFilter ?? '';
        this.doQuery()
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains')
    }

    delete() {
        this.loading = true;
        this.deleteDialog = false;
        this.tagService.delete(this.tableItem)
    }

    deleteSelected() {
        this.loading = true;
        this.deleteDialog = false;
        this.tagService.bulkdelete(this.selected)
    }

    save() {
        if (this.tableItem.identifier?.trim()) {
            // UPDATE
            if (this.tableItem.id) {
                this.tagService.update(this.tableItem)
            // INSERT
            } else {
                this.tagService.create(this.tableItem)
            }
            this.dialog = false
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
            if (event.key === 'ö' || event.key === 'Ö') {
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
