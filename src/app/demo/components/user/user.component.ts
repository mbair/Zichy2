import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { UserService } from '../../service/user.service';
import { RoleService } from '../../service/role.service';
import { LogService } from '../../service/log.service';
import { ApiResponse } from '../../api/ApiResponse';
import { User } from '../../api/user';
import { Role } from '../../api/role';
import * as moment from 'moment';
moment.locale('hu')

@Component({
    templateUrl: './user.component.html',
    providers: [MessageService]
})

// Makes unsubscribe automatically, don't need to do manually in ngOnDestroy
// BUT!!! Don't delete ngOnDestroy, it has to stay here!
@AutoUnsubscribe()

export class UserComponent implements OnInit {

    loading: boolean = true;                     // Loading overlay trigger value
    cols: any[] = [];                            // Table columns
    tableItem: User = {};                        // One user object
    tableData: User[] = [];                      // Data set displayed in a table
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
    selected: User[] = [];                       // Table items chosen by user
    selectedUserRole: string;                    // User Role chosen by user
    roles: any[] = []                           // Possible roles

    private userObs$: Observable<any> | undefined;
    private roleObs$: Observable<any> | undefined;
    private serviceMessageObs$: Observable<any> | undefined;

    constructor(
        private userService: UserService,
        private roleService: RoleService,
        private messageService: MessageService,
        private logService: LogService) { }

    ngOnInit() {
        // Users
        this.userObs$ = this.userService.userObs;
        this.userObs$.subscribe((data: ApiResponse) => {
            this.loading = false
            if (data) {
                this.tableData = data.rows || [];
                this.totalRecords = data.totalItems || 0;
                this.page = data.currentPage || 0;
            }
        })

        // Roles
        this.roleObs$ = this.roleService.roleObs;
        this.roleObs$.subscribe((data: any) => {
            this.roles = data ? data.rows : []
        })
        // Get roles for selector
        this.roleService.get(0, 999, '', '')

        // Message
        this.serviceMessageObs$ = this.userService.messageObs;
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
            return this.userService.getBySearch(this.globalFilter, { sortField: this.sortField, sortOrder: this.sortOrder })
        }

        return this.userService.get(this.page, this.rowsPerPage, { sortField: this.sortField, sortOrder: this.sortOrder }, queryParams)
    }

    onFilter(event: any, field: string) {
        let filterValue = '';

        // Calendar date as String
        if (event instanceof Date) {
            const date = moment(event)
            const formattedDate = date.format('YYYY.MM.DD')
            filterValue = formattedDate
        } else {
            if (event && (event.value || event.target?.value)) {
                filterValue = event.value || event.target?.value
                filterValue = filterValue.toString()
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
        this.userService.delete(this.tableItem)
    }

    deleteSelected() {
        this.loading = true;
        this.deleteDialog = false;
        this.userService.bulkdelete(this.selected)
    }

    save() {
        if (this.tableItem.fullname?.trim()) {
            // UPDATE
            if (this.tableItem.id) {
                this.userService.update(this.tableItem)
                // INSERT
            } else {
                this.userService.create(this.tableItem)
            }
            this.dialog = false
        }
    }

    /**
     * Define the name associated with a user role
     * @param roleId
     * @returns
     */
    getRoleName(roleId: any): string {
        const role = this.roles.find(role => role.id === Number(roleId))
        return role ? role.name : ''
    }

    /**
     * Define the styleName for UserRole
     * @param role
     * @returns
     */
    getRoleStyleClass(roleId: any): string {
        let roleName: string = this.getRoleName(roleId),
            roleStyleClass = "";

        roleStyleClass = roleName.trim().toLowerCase().replace(/\s+/g, '')

        return `user-role-badge role-${roleStyleClass}`
    }

    // Don't delete this, its needed from a performance point of view,
    ngOnDestroy(): void {
    }
}
