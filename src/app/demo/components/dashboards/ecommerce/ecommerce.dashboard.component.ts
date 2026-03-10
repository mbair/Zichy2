import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { DashboardService } from 'src/app/demo/service/dashboard.service';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { ActivityService } from 'src/app/demo/service/activity.service';
import { ConferenceService } from 'src/app/demo/service/conference.service';
import { GuestService } from 'src/app/demo/service/guest.service';
import { UserService } from 'src/app/demo/service/user.service';
import { Table } from 'primeng/table';
import moment from 'moment';
import { Conference } from 'src/app/demo/api/conference';
import { Guest } from 'src/app/demo/api/guest';
moment.locale('hu')

@Component({
    templateUrl: './ecommerce.dashboard.component.html',
    providers: [MessageService],
    standalone: false
})

// Makes unsubscribe automatically, don't need to do manually in ngOnDestroy
// BUT!!! Don't delete ngOnDestroy, it has to stay here!
@AutoUnsubscribe()

export class EcommerceDashboardComponent implements OnInit {

    loading: boolean = true;                     // Loading overlay trigger value
    userRole: string = '';
    activities: any[] = [];
    selectedWeek: any = { data: [[], []] };
    weeks: any[] = [];
    barData: any;
    barOptions: any;
    pieData: any;
    pieOptions: any;
    products: any[] = [];
    subscription: Subscription;
    cols: any[] = [];
    rfidPercentage: number = 85;
    prepaidPercentage: number = 0;
    conferenceStatsLoading: boolean = false;
    selectedConference: Conference | null = null;
    selectedConferences: Conference[] = [];
    conferenceData: any;
    conferenceGuests: Guest[] = [];
    taskList: any[] = [];

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

    private dashboardObs$: Observable<any> | undefined
    private conferenceObs$: Observable<any> | undefined
    private rfidCountObs$: Observable<any> | undefined
    private serviceMessageObs$: Observable<any> | undefined

    constructor(private dashboardService: DashboardService,
                private conferenceService: ConferenceService,
                private guestService: GuestService,
                private userService: UserService,
                private activityService: ActivityService,
                private layoutService: LayoutService) {

        // Set default theme
        this.changeTheme('indigo')

        this.subscription = this.layoutService.configUpdate$.subscribe(config => {
            this.initCharts()
        })
    }

    ngOnInit(): void {
        // User Role
        this.userService.getUserRole().subscribe(role => {
            setTimeout(() => {
                this.userRole = role
            })
        })

        // Dashboard Informations
        this.dashboardObs$ = this.dashboardService.dashboardObs;
        this.dashboardObs$.subscribe((data: any) => {
            setTimeout(() => {
                this.loading = false
                if (data) {
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
        })
        this.dashboardService.getInformations()

        // Conferences
        this.conferenceObs$ = this.conferenceService.conferenceObs;
        this.conferenceObs$.subscribe((data: any) => {
            setTimeout(() => {
                if (data && data.rows) {
                    this.conferenceData = data.rows[0]
                }
            })
        })

        // Tasks
        this.taskList = [
            {
                name: 'Regisztrációk jóváhagyása',
                startDate: '2025.01.01',
                completed: false,
            },
            {
                name: 'Vendégek szobához adása',
                startDate: '2025.01.01',
                completed: false,
            },
            {
                name: 'Előlegek ellenőrzése',
                startDate: '2025.01.01',
                completed: false,
            },
        ]

        this.activities = this.activityService.getActivities();

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
        const weekData = Array.isArray(this.selectedWeek?.data) ? this.selectedWeek.data : [[], []]
        const incomeData = Array.isArray(weekData[0]) ? weekData[0] : []
        const profitData = Array.isArray(weekData[1]) ? weekData[1] : []

        this.barData = {
            labels: ['HÉT', 'KED', 'SZE', 'CSÜ', 'PÉN', 'SZO', 'VAS'],
            datasets: [
                {
                    label: 'Bevétel',
                    backgroundColor: documentStyle.getPropertyValue('--primary-500'),
                    barThickness: 12,
                    borderRadius: 12,
                    data: incomeData
                },
                {
                    label: 'Profit',
                    backgroundColor: documentStyle.getPropertyValue('--primary-200'),
                    barThickness: 12,
                    borderRadius: 12,
                    data: profitData
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

    get registrations(): number {
        return this.conferenceGuests?.length || 0
    }

    get guestsWithoutRoom(): number {
        return (this.conferenceGuests ?? []).filter((guest: Guest) => !this.hasAssignedRoom(guest)).length
    }

    private hasAssignedRoom(guest: Guest): boolean {
        const reservationRoomNum = guest.reservations?.find(reservation => reservation?.room?.roomNum)?.room?.roomNum
        const roomNum = (guest.displayRoomNum ?? guest.roomNum ?? reservationRoomNum ?? '').trim()
        return roomNum.length > 0
    }

    get registrationEndDate(): string {
        let endDate = ''
        if (this.selectedConference?.registrationEndDate) {
            endDate = moment(this.selectedConference.registrationEndDate).format('YYYY.MM.DD')
        }
        return endDate
    }

    get guestEditEndDate(): string {
        let endDate = ''
        if (this.selectedConference?.guestEditEndDate) {
            endDate = moment(this.selectedConference.guestEditEndDate).format('YYYY.MM.DD')
        }
        return endDate
    }

    get prepaid(): number {
        return this.conferenceGuests?.filter((guest: Guest) => guest.prepaid === null).length || 0
    }

    onWeekChange() {
        if (!this.barData?.datasets?.length) {
            this.initCharts()
            return
        }

        const weekData = Array.isArray(this.selectedWeek?.data) ? this.selectedWeek.data : [[], []]
        const incomeData = Array.isArray(weekData[0]) ? weekData[0] : []
        const profitData = Array.isArray(weekData[1]) ? weekData[1] : []
        let newBarData = {...this.barData};
        newBarData.datasets[0].data = incomeData;
        newBarData.datasets[1].data = profitData;
        this.barData = newBarData;
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }

    onConferenceChange(selectedConfs: Conference[] | null | undefined): void {
        const selectedConference = Array.isArray(selectedConfs) ? selectedConfs[0] : null
        const conferenceId = selectedConference?.id
        const conferenceName = selectedConference?.name?.trim()

        if (!selectedConference || (!conferenceId && !conferenceName)) {
            this.selectedConference = null
            this.conferenceGuests = []
            this.prepaidPercentage = 0
            this.conferenceStatsLoading = false
            return
        }

        this.selectedConference = selectedConference
        this.conferenceStatsLoading = true
        const guestsRequest$ = conferenceId
            ? this.guestService.getByConferenceId(conferenceId)
            : this.guestService.getByConferenceName(conferenceName!)

        guestsRequest$.subscribe({
            next: (guests: any) => {
                this.conferenceGuests = Array.isArray(guests?.rows) ? guests.rows : []
                const registrations = this.registrations
                this.prepaidPercentage = registrations > 0
                    ? Math.round((this.prepaid / registrations) * 100)
                    : 0
                this.conferenceStatsLoading = false
            },
            error: () => {
                this.conferenceGuests = []
                this.prepaidPercentage = 0
                this.conferenceStatsLoading = false
            }
        })
    }

    /**
     * Replaces the theme link with a new one.
     * @param href The href attribute of the new link element.
     * @param onComplete Called when the new style sheet is loaded.
     * This method is used to switch the app's theme.
     * It creates a clone of the current theme link, sets its href to the given one,
     * inserts the clone after the original link, and then removes the original link.
     * When the new style sheet is loaded, it calls the onComplete callback.
     */
    replaceThemeLink(href: string, onComplete: () => void) {
        const themeLink = <HTMLLinkElement>document.getElementById('theme-link')
        const cloneLinkElement = <HTMLLinkElement>themeLink.cloneNode(true)

        cloneLinkElement.setAttribute('href', href)
        cloneLinkElement.setAttribute('id', 'theme-link-clone')

        themeLink.parentNode!.insertBefore(cloneLinkElement, themeLink.nextSibling)

        cloneLinkElement.addEventListener('load', () => {
            themeLink.remove()
            cloneLinkElement.setAttribute('id', 'theme-link')
            onComplete()
        })
    }

    /**
     * Switches the theme to the given one.
     * @param theme The name of the theme to switch to.
     * Finds the theme CSS link element and replaces its href with the new theme's href.
     * After the new style sheet is loaded, updates the layout service's theme and notifies the listeners.
     */
    changeTheme(theme: string) {
        const themeLink = <HTMLLinkElement>document.getElementById('theme-link')
        if (themeLink) {
            const newHref = themeLink.getAttribute('href')!.replace(this.layoutService.config.theme, theme)
            this.replaceThemeLink(newHref, () => {
                this.layoutService.config.theme = theme
                this.layoutService.onConfigUpdate()
            })
        }
    }

    // Don't delete this, its needed from a performance point of view,
    ngOnDestroy(): void {
    }
}
