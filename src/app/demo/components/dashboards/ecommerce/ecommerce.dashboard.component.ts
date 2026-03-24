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
import { Conference } from 'src/app/demo/api/conference';
import { Guest } from 'src/app/demo/api/guest';
import { formatDateDots, getWeekdayName, parseDateOnly } from 'src/app/demo/utils/date.utils';

type OrganizerReminderTone = 'critical' | 'warning' | 'info' | 'success';

interface OrganizerReminder {
    id: string;
    title: string;
    summary: string;
    detail: string;
    actionLabel: string;
    route: string;
    icon: string;
    badge: string;
    tone: OrganizerReminderTone;
    meta: string[];
    priority: number;
}

interface OrganizerReminderSummary {
    openCount: number;
    urgentCount: number;
    nextDeadline: string;
}

const RECENTLY_EXPIRED_REMINDER_DAYS = 7;
const APPROACHING_REMINDER_DAYS = 2;

@Component({
    templateUrl: './ecommerce.dashboard.component.html',
    styleUrls: ['./ecommerce.dashboard.component.scss'],
    providers: [MessageService]
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
    organizerPrimaryReminder: OrganizerReminder | null = null;
    organizerSecondaryReminders: OrganizerReminder[] = [];
    organizerReminderSummary: OrganizerReminderSummary = {
        openCount: 0,
        urgentCount: 0,
        nextDeadline: 'Nincs közelgő határidő'
    };

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
            this.userRole = role
        })

        // Dashboard Informations
        this.dashboardObs$ = this.dashboardService.dashboardObs;
        this.dashboardObs$.subscribe((data: any) => {
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
        this.dashboardService.getInformations()

        // Conferences
        this.conferenceObs$ = this.conferenceService.conferenceObs;
        this.conferenceObs$.subscribe((data: any) => {
            if (data && data.rows) {
                this.conferenceData = data.rows[0]
            }
        })

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

        this.refreshOrganizerBriefing()
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
            endDate = formatDateDots(this.selectedConference.registrationEndDate)
        }
        return endDate
    }

    get guestEditEndDate(): string {
        let endDate = ''
        if (this.selectedConference?.guestEditEndDate) {
            endDate = formatDateDots(this.selectedConference.guestEditEndDate)
        }
        return endDate
    }

    get prepaid(): number {
        return this.conferenceGuests?.filter((guest: Guest) => guest.prepaid === true).length || 0
    }

    get unpaidGuests(): number {
        return Math.max(this.registrations - this.prepaid, 0)
    }

    get organizerVisibleReminders(): OrganizerReminder[] {
        return this.organizerPrimaryReminder
            ? [this.organizerPrimaryReminder, ...this.organizerSecondaryReminders]
            : []
    }

    get organizerConferencePanelLabel(): string {
        return 'Konferencia - szervezői vezérlőpult'
    }

    get selectedConferenceDisplayName(): string {
        const name = this.selectedConference?.name?.trim() ?? ''
        const cleaned = name.replace(/^\d{8}-\d{8}\s*/u, '')
        return cleaned || 'Válassz konferenciát'
    }

    get selectedConferenceLabel(): string {
        return this.selectedConference?.name?.trim() || 'Válassz konferenciát'
    }

    get selectedConferenceDateRange(): string {
        const begin = formatDateDots(this.selectedConference?.beginDate)
        const end = formatDateDots(this.selectedConference?.endDate)

        if (begin && end) {
            return `${begin} - ${end}`
        }

        return begin || end || 'Időszak nincs megadva'
    }

    get registrationDeadlineStatusText(): string {
        const daysUntil = this.getDaysUntil(this.selectedConference?.registrationEndDate)

        if (daysUntil === null) {
            return 'Nincs'
        }

        return daysUntil < 0 ? 'Lezárult' : 'Nyitva'
    }

    get registrationDeadlineStatusClosed(): boolean {
        const daysUntil = this.getDaysUntil(this.selectedConference?.registrationEndDate)
        return daysUntil !== null && daysUntil < 0
    }

    get registrationDeadlineStatusMissing(): boolean {
        return this.getDaysUntil(this.selectedConference?.registrationEndDate) === null
    }

    get guestEditDeadlineStatusText(): string {
        const daysUntil = this.getDaysUntil(this.selectedConference?.guestEditEndDate)

        if (daysUntil === null) {
            return 'Nincs'
        }

        return daysUntil < 0 ? 'Lezárult' : 'Nyitva'
    }

    get guestEditDeadlineStatusClosed(): boolean {
        const daysUntil = this.getDaysUntil(this.selectedConference?.guestEditEndDate)
        return daysUntil !== null && daysUntil < 0
    }

    get guestEditDeadlineStatusMissing(): boolean {
        return this.getDaysUntil(this.selectedConference?.guestEditEndDate) === null
    }

    get registrationDeadlineHint(): string {
        if (!this.selectedConference?.registrationEndDate) {
            return 'Állíts be regisztrációs határidőt'
        }

        return 'Vendégek számára eddig a napig kitölthető az űrlap.'
    }

    get guestEditDeadlineHint(): string {
        if (!this.selectedConference?.guestEditEndDate) {
            return 'Állíts be módosítási határidőt'
        }

        return 'Szervezőként eddig a napig kitölthető és módosítható az űrlap.'
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
            this.refreshOrganizerBriefing()
            return
        }

        this.selectedConference = selectedConference
        this.conferenceStatsLoading = true
        this.refreshOrganizerBriefing()
        if (conferenceId) {
            this.guestService.searchGuestsForSelector$({
                conferenceId,
                enabled: true
            }).subscribe({
                next: (guests: Guest[]) => {
                    this.applyConferenceGuests(guests)
                },
                error: () => {
                    this.clearConferenceGuests()
                }
            })
            return
        }

        this.guestService.getByConferenceName(conferenceName!).subscribe({
            next: (guests: any) => {
                const rows = Array.isArray(guests?.rows) ? guests.rows as Guest[] : []
                this.applyConferenceGuests(rows)
            },
            error: () => {
                this.clearConferenceGuests()
            }
        })
    }

    private applyConferenceGuests(guests: Guest[]): void {
        this.conferenceGuests = Array.isArray(guests) ? guests : []
        const registrations = this.registrations
        this.prepaidPercentage = registrations > 0
            ? Math.round((this.prepaid / registrations) * 100)
            : 0
        this.conferenceStatsLoading = false
        this.refreshOrganizerBriefing()
    }

    private clearConferenceGuests(): void {
        this.conferenceGuests = []
        this.prepaidPercentage = 0
        this.conferenceStatsLoading = false
        this.refreshOrganizerBriefing()
    }

    private refreshOrganizerBriefing(): void {
        const reminders = this.buildOrganizerReminders()
            .sort((left, right) => right.priority - left.priority)

        this.organizerPrimaryReminder = reminders[0] ?? null
        this.organizerSecondaryReminders = reminders.slice(1, 4)
        this.organizerReminderSummary = {
            openCount: reminders.length,
            urgentCount: reminders.filter(reminder => reminder.tone === 'critical').length,
            nextDeadline: this.getNextDeadlineSummary()
        }
    }

    private buildOrganizerReminders(): OrganizerReminder[] {
        if (!this.selectedConference) {
            return []
        }

        const reminders: OrganizerReminder[] = []
        const registrations = this.registrations
        const guestsWithoutRoom = this.guestsWithoutRoom
        const guestsMissingContact = this.guestsMissingContact
        const paidGuests = this.prepaid
        const unpaidGuests = Math.max(registrations - paidGuests, 0)

        const registrationDeadlineReminder = this.buildRegistrationDeadlineReminder()
        const guestEditDeadlineReminder = this.buildGuestEditDeadlineReminder()

        if (registrationDeadlineReminder) {
            reminders.push(registrationDeadlineReminder)
        }

        if (guestEditDeadlineReminder) {
            reminders.push(guestEditDeadlineReminder)
        }

        if (registrations > 0 && guestsWithoutRoom > 0) {
            const ratio = guestsWithoutRoom / registrations
            const critical = guestsWithoutRoom >= 10 || ratio >= 0.2
            reminders.push({
                id: 'room-assignment',
                title: `${guestsWithoutRoom} vendég még szobára vár`,
                summary: critical
                    ? 'A szobabeosztás még látványosan hiányos, ezt érdemes a következő körben lezárni.'
                    : 'Már csak néhány elhelyezés hiányzik, de ezt érdemes a határidők előtt végigvinni.',
                detail: 'A Foglalás oldalon gyorsan végignézhető, kik maradtak szoba nélkül és hol van még szabad kapacitás.',
                actionLabel: 'Foglalás megnyitása',
                route: '/reservation',
                icon: 'pi pi-building',
                badge: critical ? 'Sürgős' : 'Figyelendő',
                tone: critical ? 'critical' : 'warning',
                meta: [
                    `${guestsWithoutRoom} fő szoba nélkül`,
                    `${registrations} regisztráció`
                ],
                priority: critical ? 93 : 79
            })
        }

        if (registrations > 0 && unpaidGuests > 0) {
            const paidRatio = paidGuests / registrations
            const tone: OrganizerReminderTone = paidRatio < 0.4 ? 'critical' : paidRatio < 0.75 ? 'warning' : 'info'
            reminders.push({
                id: 'prepaid-follow-up',
                title: paidGuests === 0 ? 'Még nincs visszaigazolt előleg' : `${unpaidGuests} vendégnél hiányzik az előleg`,
                summary: 'Az előleg státusz tipikusan olyan pont, amire külön emlékeztető e-mail is megy, ezért érdemes innen is szem előtt tartani.',
                detail: 'A Vendég oldalon gyorsan átszűrhető, kiknél nincs még fizetett állapot, és ez alapján indítható a következő körös egyeztetés.',
                actionLabel: 'Vendéglista megnyitása',
                route: '/guest',
                icon: 'pi pi-wallet',
                badge: tone === 'critical' ? 'Sürgős' : tone === 'warning' ? 'Követés kell' : 'Folyamatban',
                tone,
                meta: [
                    `${paidGuests}/${registrations} fizetett`,
                    `${Math.round((paidGuests / registrations) * 100)}% készültség`
                ],
                priority: tone === 'critical' ? 76 : tone === 'warning' ? 66 : 54
            })
        }

        if (guestsMissingContact > 0) {
            reminders.push({
                id: 'missing-contact',
                title: `${guestsMissingContact} vendégnél hiányzik elérhetőség`,
                summary: 'Telefon vagy e-mail nélkül az emlékeztetők és gyors egyeztetések nehezebben mennek végig.',
                detail: 'Érdemes még a záró körök előtt végignézni a hiányos rekordokat, hogy minden változás és határidő eljusson az érintettekhez.',
                actionLabel: 'Vendéglista megnyitása',
                route: '/guest',
                icon: 'pi pi-envelope',
                badge: guestsMissingContact >= 5 ? 'Pótlás kell' : 'Hiányos adat',
                tone: guestsMissingContact >= 5 ? 'warning' : 'info',
                meta: [
                    `${guestsMissingContact} hiányos rekord`,
                    'Telefon vagy e-mail nélkül'
                ],
                priority: guestsMissingContact >= 5 ? 72 : 55
            })
        }

        if (!this.hasConferenceContactDetails()) {
            reminders.push({
                id: 'conference-contact',
                title: 'Hiányos konferencia kapcsolattartó',
                summary: 'Legalább egy működő elérhetőség sokat segít, ha a szolgáltató vagy a vendégoldal felől gyors egyeztetésre van szükség.',
                detail: 'A Konferencia oldalon érdemes ellenőrizni, hogy a kapcsolattartó neve, e-mail címe és telefonszáma tényleg aktuális-e.',
                actionLabel: 'Konferencia megnyitása',
                route: '/conference',
                icon: 'pi pi-user-edit',
                badge: 'Ellenőrizendő',
                tone: 'info',
                meta: [
                    'Kapcsolattartói adat hiányzik'
                ],
                priority: 52
            })
        }

        if (reminders.length === 0 && registrations === 0) {
            reminders.push({
                id: 'waiting-for-registrations',
                title: 'A konferencia készen áll az első regisztrációkra',
                summary: 'Jelenleg még nincs vendég a kiválasztott konferenciához, ezért most a határidők és a törzsadatok a legfontosabb ellenőrzési pontok.',
                detail: 'Amint érkeznek regisztrációk, ez a blokk automatikusan átvált a tényleges szervezői feladatokra.',
                actionLabel: 'Konferencia megnyitása',
                route: '/conference',
                icon: 'pi pi-flag',
                badge: 'Indulás előtt',
                tone: 'info',
                meta: [
                    'Még nincs regisztráció'
                ],
                priority: 44
            })
        }

        if (reminders.length === 0) {
            reminders.push({
                id: 'no-pending-reminders',
                title: 'Jelenleg nincs kiemelt szervezői teendő',
                summary: 'A kiválasztott konferencián most nem látszik olyan nyitott pont, ami azonnali vagy külön emlékeztető jellegű figyelmet kérne.',
                detail: 'A régebben lejárt mérföldköveket már nem tartjuk itt fókuszban; ez a blokk inkább a közelgő és valóban aktuális teendőkre koncentrál.',
                actionLabel: 'Konferencia megnyitása',
                route: '/conference',
                icon: 'pi pi-check-circle',
                badge: 'Naprakész',
                tone: 'success',
                meta: [
                    this.selectedConference.name?.trim() || 'Kiválasztott konferencia'
                ],
                priority: 12
            })
        }

        return reminders
    }

    private buildRegistrationDeadlineReminder(): OrganizerReminder | null {
        const rawDate = this.selectedConference?.registrationEndDate
        const daysUntil = this.getDaysUntil(rawDate)

        if (daysUntil === null || daysUntil > APPROACHING_REMINDER_DAYS || daysUntil < -RECENTLY_EXPIRED_REMINDER_DAYS) {
            return null
        }

        const deadlineLabel = this.formatDeadlineMeta(rawDate)
        const hasUnassignedGuests = this.guestsWithoutRoom > 0

        if (daysUntil >= 0) {
            return {
                id: 'registration-deadline-approaching',
                title: daysUntil === 0 ? 'Ma zár a regisztráció' : `${daysUntil} napon belül zár a regisztráció`,
                summary: 'A határidő után a jelentkezési űrlap külső személyek számára már nem lesz elérhető.',
                detail: hasUnassignedGuests
                    ? 'Addig minden regisztrált vendégnél érdemes lezárni a szobabeosztást is. Ha a vendéglista nem teljes a határidőre, a szerződés szerint 10 000 Ft/nap késedelmes lezárási kötbér merülhet fel.'
                    : 'Most még érdemes egy utolsó körben ellenőrizni, hogy a vendéglista teljes-e. Ha a vendéglista nem teljes a határidőre, a szerződés szerint 10 000 Ft/nap késedelmes lezárási kötbér merülhet fel.',
                actionLabel: hasUnassignedGuests ? 'Foglalás megnyitása' : 'Konferencia megnyitása',
                route: hasUnassignedGuests ? '/reservation' : '/conference',
                icon: 'pi pi-calendar',
                badge: daysUntil === 0 ? 'Ma lejár' : 'Közeleg',
                tone: daysUntil === 0 ? 'critical' : 'warning',
                meta: [
                    deadlineLabel,
                    '10 000 Ft/nap kötbérkockázat'
                ],
                priority: daysUntil === 0 ? 98 : 92
            }
        }

        return {
            id: 'registration-deadline-passed',
            title: `Lejárt a regisztrációs határidő`,
            summary: 'A publikus űrlap már zárva van, új résztvevő rögzítése csak előzetes szolgáltatói jóváhagyással lehetséges.',
            detail: `A módosítási határidőig még díjmentesen módosíthatod a vendégadatokat, de minden változást jelezni kell az info@zichy-vajta.com címre.`,
            actionLabel: 'Vendéglista megnyitása',
            route: '/guest',
            icon: 'pi pi-lock',
            badge: 'Lejárt',
            tone: 'critical',
            meta: [
                deadlineLabel,
                `${Math.abs(daysUntil)} napja lejárt`
            ],
            priority: 96
        }
    }

    private buildGuestEditDeadlineReminder(): OrganizerReminder | null {
        const rawDate = this.selectedConference?.guestEditEndDate
        const daysUntil = this.getDaysUntil(rawDate)

        if (daysUntil === null || daysUntil > APPROACHING_REMINDER_DAYS || daysUntil < -RECENTLY_EXPIRED_REMINDER_DAYS) {
            return null
        }

        const deadlineLabel = this.formatDeadlineMeta(rawDate)

        if (daysUntil >= 0) {
            return {
                id: 'guest-edit-deadline-approaching',
                title: daysUntil === 0 ? 'Ma zár a díjmentes módosítás' : `${daysUntil} napon belül zár a díjmentes módosítás`,
                summary: 'A határidő után a vendéglista módosítása már 2 500 Ft / darab adatmódosítási díjjal jár.',
                detail: 'Eddig még új vendéget is rögzíthetsz és díjmentesen módosíthatod a vendégadatokat. Most érdemes lezárni a szobaszámot, étrendet, fizetési módot és a személyes adatokat.',
                actionLabel: 'Vendéglista megnyitása',
                route: '/guest',
                icon: 'pi pi-file-edit',
                badge: daysUntil === 0 ? 'Ma lejár' : 'Közeleg',
                tone: daysUntil === 0 ? 'critical' : 'warning',
                meta: [
                    deadlineLabel,
                    '2 500 Ft / darab díj'
                ],
                priority: daysUntil === 0 ? 95 : 88
            }
        }

        return {
            id: 'guest-edit-deadline-passed',
            title: 'Lejárt a módosítási határidő',
            summary: 'Mai naptól a vendégadatok, szobaszám, étrend, fizetési mód vagy új vendég rögzítése már díjköteles.',
            detail: 'A késedelmes adatmódosítási díj 2 500 Ft / darab. További ételadag igénylésére már nincs lehetőség, lemondásnál pedig a szerződés szerinti díjak érvényesek.',
            actionLabel: 'Vendéglista megnyitása',
            route: '/guest',
            icon: 'pi pi-exclamation-triangle',
            badge: 'Lejárt',
            tone: 'critical',
            meta: [
                deadlineLabel,
                `${Math.abs(daysUntil)} napja lejárt`
            ],
            priority: 94
        }
    }

    private getDaysUntil(value: string | null | undefined): number | null {
        const targetDate = parseDateOnly(value)
        const today = parseDateOnly(new Date())

        if (!targetDate || !today) {
            return null
        }

        return Math.round((targetDate.getTime() - today.getTime()) / 86400000)
    }

    private formatDeadlineMeta(value: string | null | undefined): string {
        const dateLabel = formatDateDots(value)
        const weekdayLabel = getWeekdayName(value)
        return [dateLabel, weekdayLabel].filter(Boolean).join(' • ')
    }

    private get guestsMissingContact(): number {
        return this.conferenceGuests.filter((guest: Guest) => !this.hasGuestContactDetails(guest)).length
    }

    private hasGuestContactDetails(guest: Guest): boolean {
        return Boolean(guest?.email?.trim() || guest?.telephone?.trim())
    }

    private hasConferenceContactDetails(): boolean {
        return Boolean(
            this.selectedConference?.contactName?.trim() &&
            (this.selectedConference?.contactEmail?.trim() || this.selectedConference?.contactPhone?.trim())
        )
    }

    private getNextDeadlineSummary(): string {
        if (!this.selectedConference) {
            return 'Válassz konferenciát'
        }

        const candidates = [
            {
                label: 'Regisztráció',
                rawDate: this.selectedConference.registrationEndDate,
                daysUntil: this.getDaysUntil(this.selectedConference.registrationEndDate)
            },
            {
                label: 'Módosítás',
                rawDate: this.selectedConference.guestEditEndDate,
                daysUntil: this.getDaysUntil(this.selectedConference.guestEditEndDate)
            }
        ].filter(candidate => candidate.daysUntil !== null) as Array<{ label: string; rawDate: string | null | undefined; daysUntil: number }>

        if (!candidates.length) {
            return 'Nincs beállítva'
        }

        const upcomingCandidate = [...candidates]
            .filter(candidate => candidate.daysUntil >= 0)
            .sort((left, right) => left.daysUntil - right.daysUntil)[0]

        if (upcomingCandidate) {
            if (upcomingCandidate.daysUntil === 0) {
                return `${upcomingCandidate.label}: ma`
            }

            return `${upcomingCandidate.label}: ${upcomingCandidate.daysUntil} nap`
        }

        const recentExpiredCandidate = [...candidates]
            .filter(candidate => candidate.daysUntil >= -RECENTLY_EXPIRED_REMINDER_DAYS)
            .sort((left, right) => right.daysUntil - left.daysUntil)[0]

        if (recentExpiredCandidate) {
            return `${recentExpiredCandidate.label}: ${Math.abs(recentExpiredCandidate.daysUntil)} napja lejárt`
        }

        return 'Nincs közelgő határidő'
    }

    private getDeadlineHint(
        value: string | null | undefined,
        labels: {
            missing: string;
            passed: string;
            today: string;
            futurePrefix: string;
        }
    ): string {
        const daysUntil = this.getDaysUntil(value)

        if (daysUntil === null) {
            return labels.missing
        }

        if (daysUntil < 0) {
            return labels.passed
        }

        if (daysUntil === 0) {
            return labels.today
        }

        return `${labels.futurePrefix} ${daysUntil} nap maradt`
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
