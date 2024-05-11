import { Component, OnInit } from '@angular/core';
import { Message, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { Observable } from 'rxjs';
import { LogService } from 'src/app/demo/service/log.service';
import { Log } from '../../api/log';


@Component({
    templateUrl: './logs.component.html',
    providers: [MessageService]
})


export class LogsComponent implements OnInit {

    loading: boolean = true;           // Loading overlay trigger value
    messages: Message[] = [];
    log: Log = {}
    logs: Log[] = [];

    logsObs$: Observable<any> | undefined;
    serviceMessageObs$: Observable<any> | undefined;

    constructor(private logService: LogService, private messageService: MessageService) { }

    ngOnInit() {
        this.logsObs$ = this.logService.logObs;
        this.logsObs$.subscribe((data) => {
            this.loading = false;
            if (data) {
                this.logs = data
            }
        })

        // Get all Logs
        this.loading = true;
        this.logService.getLogs()

        // Message
        this.serviceMessageObs$ = this.logService.serviceMessageObs;
        this.serviceMessageObs$.subscribe((data) => {
            this.loading = false;
            if (data) {
                this.messages = data
            }
        })
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }

}
