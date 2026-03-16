import { Component, OnInit } from '@angular/core';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { OrganizerContractingPartyOverview } from '../../api/contracting-party';
import { UserService } from '../../service/user.service';

@Component({
    templateUrl: './contracting-party-admin.component.html',
    providers: [MessageService]
})
@AutoUnsubscribe()
export class ContractingPartyAdminComponent implements OnInit {
    loading: boolean = true
    tableData: OrganizerContractingPartyOverview[] = []
    rowsPerPageOptions = [20, 50, 100]
    rowsPerPage: number = 20

    constructor(
        private userService: UserService,
        private messageService: MessageService
    ) { }

    ngOnInit(): void {
        this.loadOverview()
    }

    get totalRelations(): number {
        return this.tableData.length
    }

    get totalRecords(): number {
        return this.tableData.length
    }

    get totalOrganizers(): number {
        return new Set(
            this.tableData
                .map(row => Number(row.userId))
                .filter(userId => Number.isFinite(userId) && userId > 0)
        ).size
    }

    get totalContractingParties(): number {
        return new Set(
            this.tableData
                .map(row => Number(row.contractingPartyId))
                .filter(contractingPartyId => Number.isFinite(contractingPartyId) && contractingPartyId > 0)
        ).size
    }

    get missingContactCount(): number {
        return this.tableData.filter(row => !row.contactName || !row.contactEmail || !row.contactPhone).length
    }

    loadOverview(): void {
        this.loading = true

        this.userService.getOrganizerContractingPartiesOverview$().subscribe({
            next: (rows: OrganizerContractingPartyOverview[]) => {
                this.tableData = rows.slice().sort((a, b) => {
                    const organizerCompare = (a.organizerName || '').localeCompare(b.organizerName || '', 'hu')
                    if (organizerCompare !== 0) {
                        return organizerCompare
                    }

                    const defaultCompare = Number(Boolean(b.isDefault)) - Number(Boolean(a.isDefault))
                    if (defaultCompare !== 0) {
                        return defaultCompare
                    }

                    return (a.legalName || '').localeCompare(b.legalName || '', 'hu')
                })
                this.loading = false
            },
            error: () => {
                this.loading = false
                this.messageService.add({
                    severity: 'error',
                    summary: 'Hiba',
                    detail: 'A szerződő áttekintő adatok betöltése nem sikerült.'
                })
            }
        })
    }

    onGlobalFilter(table: Table, event: Event): void {
        const value = (event.target as HTMLInputElement)?.value || ''
        table.filterGlobal(value, 'contains')
    }

    getContactSummary(row: OrganizerContractingPartyOverview): string {
        return [row.contactName, row.contactEmail, row.contactPhone].filter(Boolean).join(' | ')
    }
}
