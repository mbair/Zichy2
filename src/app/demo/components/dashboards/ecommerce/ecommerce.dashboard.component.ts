import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { DashboardService } from 'src/app/demo/service/dashboard.service';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { ActivityService } from 'src/app/demo/service/activity.service';
import { ApiResponse } from 'src/app/demo/api/ApiResponse';
import { Table } from 'primeng/table';
import * as moment from 'moment';
moment.locale('hu')

@Component({
    templateUrl: './ecommerce.dashboard.component.html',
    providers: [MessageService]
})

// Makes unsubscribe automatically, don't need to do manually in ngOnDestroy
// BUT!!! Don't delete ngOnDestroy, it has to stay here!
@AutoUnsubscribe()

export class EcommerceDashboardComponent implements OnInit {

    loading: boolean = true;                     // Loading overlay trigger value
    activities: any[] = [];
    information: any;
    selectedWeek: any;
    weeks: any[] = [];
    barData: any;
    barOptions: any;
    pieData: any;
    pieOptions: any;
    products: any[] = [];
    subscription: Subscription;
    cols: any[] = [];
    rfidPercentage: number = 85;

    conferences: any = { active: 0, inactive: 0 };
    guests: any = { active: 0, inactive: 0 };
    rooms: any = { active: 0, inactive: 0 };
    tags: any = { active: 0, inactive: 0 };

    adults: Number = 0;
    childrens: Number = 0;

    // Totals of master data
    totals: any = {
        active: {
            conferences: 0,
            guests: 0,
            rooms: 0,
            tags: 0,
        }
    }



    private dashboardObs$: Observable<any> | undefined;
    private rfidCountObs$: Observable<any> | undefined;
    private serviceMessageObs$: Observable<any> | undefined;

    constructor(private dashboardService: DashboardService,
                private activityService: ActivityService,
                private layoutService: LayoutService) {

        this.subscription = this.layoutService.configUpdate$.subscribe(config => {
            this.initCharts()
        })
    }

    ngOnInit(): void {
        // Dashboard Informations
        this.dashboardObs$ = this.dashboardService.dashboardObs;
        this.dashboardObs$.subscribe((data: any) => {
            console.log('data', data)
            this.loading = false
            if (data) {
                console.log('data', data)
                this.conferences = data.conferences
                this.guests = data.guests
                this.rooms.active = 106 // Temporary solution (its not yet stored in DB)
                this.tags = data.tags

                let rfidPercentage = (data.tags.used / data.tags.active) * 100
                this.rfidPercentage = Number(rfidPercentage.toFixed(0))

                this.adults = Number(this.guests.guestsAge[0].adults)
                this.childrens = parseFloat(this.guests.guestsAge[0].childrens)
                this.initCharts()
            }
        })
        this.dashboardService.getInformations()


        this.activities = this.activityService.getActivities();
        this.information = this.activityService.getInformation()

        this.weeks = [{
            label: 'Előző hét',
            value: 0,
            data: [[65, 59, 80, 81, 56, 55, 40], [28, 48, 40, 19, 86, 27, 90]]
        },
        {
            label: 'Aktuális hét',
            value: 1,
            data: [[35, 19, 40, 61, 16, 55, 30], [48, 78, 10, 29, 76, 77, 10]]
        }];

        this.selectedWeek = this.weeks[0];
        this.initCharts();
        // this.productService.getProductsSmall().then(data => this.products = data);

        this.cols = [
            {header: 'Név', field: 'name'},
            {header: 'Kategória', field: 'category'},
            {header: 'Ár', field: 'price'},
            {header: 'Státusz', field: 'inventoryStatus'}
        ]
    }

    initCharts() {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

        this.barData = {
            labels: ['HÉT', 'KED', 'SZE', 'CSÜ', 'PÉN', 'SZO', 'VAS'],
            datasets: [
                {
                    label: 'Bevétel',
                    backgroundColor: documentStyle.getPropertyValue('--primary-500'),
                    barThickness: 12,
                    borderRadius: 12,
                    data: this.selectedWeek.data[0]
                },
                {
                    label: 'Profit',
                    backgroundColor: documentStyle.getPropertyValue('--primary-200'),
                    barThickness: 12,
                    borderRadius: 12,
                    data: this.selectedWeek.data[1]
                }
            ]
        };

        this.pieData = {
            labels: ['Felnőtt', 'Gyerek'],
            datasets: [
                {
                    data: [this.adults, this.childrens],
                    backgroundColor: [
                        documentStyle.getPropertyValue('--primary-700'),
                        documentStyle.getPropertyValue('--primary-100')
                    ],
                    hoverBackgroundColor: [
                        documentStyle.getPropertyValue('--primary-600'),
                        documentStyle.getPropertyValue('--primary-300'),
                        documentStyle.getPropertyValue('--primary-200')
                    ]
                }
            ]
        };

        this.barOptions = {
            animation: {
                duration: 0
            },
            plugins: {
                legend: {
                    labels: {
                        color: textColor,
                        usePointStyle: true,
                        font: {
                            weight: 700,
                        },
                        padding: 28
                    },
                    position: 'bottom'
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: textColorSecondary,
                        font: {
                            weight: 500
                        }
                    },
                    grid: {
                        display: false,
                        drawBorder: false
                    }
                },
                y: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                }
            }
        };

        this.pieOptions = {
            animation: {
                duration: 0
            },
            plugins: {
                legend: {
                    labels: {
                        color: textColor,
                        usePointStyle: true,
                        font: {
                            weight: 700,
                        },
                        padding: 28
                    },
                    position: 'bottom'
                }
            }
        };
    }

    onWeekChange() {
        let newBarData = {...this.barData};
        newBarData.datasets[0].data = this.selectedWeek.data[0];
        newBarData.datasets[1].data = this.selectedWeek.data[1];
        this.barData = newBarData;
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }

    // Don't delete this, its needed from a performance point of view,
    ngOnDestroy(): void {
    }
}
