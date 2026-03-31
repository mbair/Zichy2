import { Component, OnInit, HostListener, isDevMode, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, AbstractControl, ValidationErrors } from '@angular/forms';
import { BehaviorSubject, debounceTime, distinctUntilChanged, map, Observable, Subject } from 'rxjs';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { ConfirmationService, MenuItem, Message, MessageService } from 'primeng/api';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { FileSendEvent, FileUpload, FileUploadErrorEvent } from 'primeng/fileupload';
import { Chips } from 'primeng/chips';
import { Table } from 'primeng/table';
import { dateBoundsValidator } from '../../utils/date-bounds-validator';
import { dateRangeValidator } from '../../utils/date-range-validator';
import { emailDomainValidator } from '../../utils/email-validator';
import { sameDayMealOrderValidator } from '../../utils/same-day-meal-order-validator';
import { zipCodeValidator } from '../../utils/zipcode-validator';
import { GuestService } from '../../service/guest.service';
import { UserService } from '../../service/user.service';
import { ConferenceService } from '../../service/conference.service';
import { GenderService } from '../../service/gender.service';
import { TagService } from '../../service/tag.service';
import { DietService } from '../../service/diet.service';
import { CountryService } from '../../service/country.service';
import { LogService } from '../../service/log.service';
import { SessionService } from '../../service/session.service';
import { ApiResponse } from '../../api/ApiResponse';
import { Reservation } from '../../api/reservation';
import { Conference } from '../../api/conference';
import { EmailStatusSummary, Guest } from '../../api/guest';
import { Log } from '../../api/log';
import { Tag } from '../../api/tag';
import { calculateAgeYears, formatDateCompact, formatDateDots, formatDateYmd, isSameDay, isSameOrBeforeDay, parseDateOnly } from '../../utils/date.utils';
import { resolveConferenceFormAllowedRoomTypeIds } from '../../utils/conference-room-type.utils';
import { getRoomTypeOptions, isNoAccommodationRoomTypeValue, NO_ACCOMMODATION_ROOM_TYPE_VALUE } from '../../utils/room-type.utils';
import { saveBlobAsFile } from '../../utils/file-saver.utils';

import { ConferenceSelectorComponent } from '../../selectors/conference-selector/conference-selector.component';

type GuestActivityTimelineItem = {
    id: string;
    title: string;
    description: string | null;
    fieldChanges?: GuestTimelineFieldChange[];
    tagBadgeLabel?: string | null;
    tagBadgeValue?: string | null;
    tagBadgeColorClass?: string;
    actor: string;
    timestamp: string | null;
    icon: string;
    color: string;
};

type GuestActivityTimelineEntry = GuestActivityTimelineItem & {
    action: string;
    tableName: string;
    changedFieldKeys: string[];
    logId: number | null;
    priority: number;
    timestampKey: string;
};

type GuestTimelineFieldChange = {
    key: string;
    label: string;
    oldText: string;
    newText: string;
};

@Component({
    selector: 'guest-component',
    templateUrl: './guest.component.html',
    styleUrls: ['./guest.component.scss'],
    providers: [MessageService, ConfirmationService]
})

// Makes unsubscribe automatically, don't need to do manually in ngOnDestroy
// BUT!!! Don't delete ngOnDestroy, it has to stay here!
@AutoUnsubscribe()

export class GuestComponent implements OnInit {
    @ViewChild(ConferenceSelectorComponent) conferenceSelector!: ConferenceSelectorComponent;
    @ViewChild('identifier') identifierElement: ElementRef;
    @ViewChild('dt') table!: Table;
    @ViewChild('roomMateChips') private roomMateChips?: Chips;

    apiURL: string                               // API URL depending on whether we are working on test or production
    loading: boolean = true                      // Loading overlay trigger value
    tableItem: Guest | null = null               // One guest object
    tableData: Guest[] = []                      // Data set displayed in a table
    rowsPerPageOptions = [20, 50, 100, 9999]     // Possible rows per page
    rowsPerPage: number = 20                     // Default rows per page
    totalRecords: number = 0                     // Total number of rows in the table
    page: number = 0                             // Current page
    sortField: string = ''                       // Current sort field
    sortOrder: number = 1                        // Current sort order
    globalFilter: string = ''                    // Global filter
    filterValues: { [key: string]: any } = {}    // Table filter conditions
    rfidFilterValue: any                         // Store for RFID filter value
    prepaidFilterValue: any                      // Store for Prepaid filter value
    debounce: { [key: string]: any } = {}        // Search delay in filter field
    guestForm: FormGroup                         // Form for guest creation and modification
    dialogFiltersForm: FormGroup                 // Form for filters
    originalFormValues: any                      // The original values ​​of the form
    sidebar: boolean = false                     // Table item maintenance sidebar
    deleteDialog: boolean = false                // Popup for deleting table item
    bulkDeleteDialog: boolean = false            // Popup for deleting table items
    selected: Guest[] = []                       // Table items chosen by guest
    canCreate: boolean = false                   // User has permission to create new guest
    canEdit: boolean = false                     // User has permission to update guest
    canEditByRole: boolean = false               // Edit permission by Role
    canDelete: boolean = false                   // User has permission to delete guest
    canAssign: boolean = false                   // User has permission to assign Tag to guest
    canManageRoomKey: boolean = false            // User has permission to manage room keys
    canImport: boolean = false                   // User has permission to import Excel
    isMobile: boolean = false                    // Mobile screen detection
    messages: Message[] = []                     // A message used for notifications and displaying errors
    successfulMessage: Message[] = []            // Message displayed on success
    tag: Tag = {}                                // NFC tag
    tagDialog: boolean = false                   // Tag assignment popup
    roomKeyDialog: boolean = false               // Room key status popup
    conferences: any[] = []                      // Optional conferences
    selectedConferences: Conference[] = []       // Conference chosen by user
    guest: Guest | null = null                   // One guest object
    guestDialog: boolean = false                 // Guests maintenance popup
    filtersDialog: boolean = false               // Guests table filters popup
    cols: any[] = []                             // Table columns
    diets: any[] = []                            // Possible diets
    meals: any[] = []                            // Possible meals
    genders: any[] = []                          // Possible genders
    countries: any[] = []                        // Possible countries
    scanTemp: string = ''                        // Temporary storage used during NFC reading
    scannedCode: string = ''                     // Scanned Tag Id
    totalTaggedGuests: number = 0                // Total number of tagged Guests
    birthDateMin: Date                           // Minimum birth date
    birthDateMax: Date                           // Maximum birth date
    beginDate: any                               // Conference begin date
    endDate: any                                 // Conference end date
    exportButtonItems: MenuItem[]                // Export button items
    isOrganizer: boolean = false                 // User has organizer role
    imageUrl: string | null = null               // idCard image URL in Guest table row
    currentIdCardUrl: string | null = null       // idCard image URL in Guest edit form   
    idCardImageUrls: { [guestId: string]: string } = {};
    loadingIdCard: { [guestId: string]: boolean } = {};
    guestTimelineByGuestId: Record<number, GuestActivityTimelineItem[]> = {}
    guestTimelineLoading: Record<number, boolean> = {}
    guestTimelineError: Record<number, string | null> = {}
    showUploadBlock: boolean = false             // Upload block visibility in edit form  
    guestConference: Conference | null = null    // Guest's conference
    showIdCardField: boolean = false
    showBabyBedField: boolean = false
    allowedPaymentMethodIds: number[] | null | undefined = undefined
    allowedConferenceRoomTypeIds: number[] | null | undefined = undefined
    prepaidOptions: any[] = []                   // Possible prepaid options
    guestReservations: Reservation[] = []        // Guest reservations
    acutalReservation: any | null = null         // Actual guest reservation
    firstRowIndex: number = 0                    // Helper for rows
    retryingEmailGuestIds: Record<number, boolean> = {}
    hasPendingGuestViewUpdate: boolean = false
    pendingGuestViewMessage: string = ''

    private static readonly NONE_CONF_ID = -1
    private static readonly BACKGROUND_REFRESH_INTERVAL_MS = 15000
    private static readonly MISSING_EMAIL_STATUS_MESSAGE = 'Nincs e-mail cím megadva a küldéshez.'
    readonly idCardMaxFileSizeBytes = 15 * 1024 * 1024
    noConferenceMode: boolean = false
    private readonly guestTimelineLimit = 100
    private readonly guestTimelineFieldLabels: Record<string, string> = {
        accommodationExtra: 'szállás megjegyzés',
        babyBed: 'babaágy',
        birthDate: 'születési dátum',
        conferenceName: 'konferencia',
        conferenceid: 'konferencia',
        country: 'ország',
        dateOfArrival: 'érkezés',
        dateOfDeparture: 'távozás',
        diet: 'étrend',
        displayRoomNum: 'szoba',
        email: 'e-mail',
        enabled: 'státusz',
        firstMeal: 'első étkezés',
        firstName: 'keresztnév',
        gender: 'nem',
        idcard: 'személyi igazolvány',
        lastMeal: 'utolsó étkezés',
        lastName: 'vezetéknév',
        lastRfidUsage: 'utolsó NFC használat',
        nationality: 'állampolgárság',
        payment: 'fizetés',
        prepaid: 'előleg',
        rfid: 'NFC címke',
        roomKeyIssued: 'szobakulcs',
        roomKeyIssuedAt: 'kulcs kiadása',
        roomKeyReturnedAt: 'kulcs visszavétele',
        roomMate: 'szobatárs',
        roomNum: 'szoba',
        roomType: 'szobatípus',
        telephone: 'telefon',
        zipCode: 'irányítószám',
        is_visitor: 'látogató',
        visitor_meals_per_day: 'napi étkezések száma',
    }
    private readonly guestTimelineIgnoredFieldKeys = new Set([
        'actualReservation',
        'answers',
        'conference',
        'createdAt',
        'dietDetails',
        'diet_id',
        'idCardUploaded',
        'idcardtype',
        'is_test',
        'paymentMethodName',
        'paymentName',
        'requestedRoomType',
        'requestedRoomTypeId',
        'requested_room_type_id',
        'reservations',
        'rfidColor',
        'rfid_id',
        'room_id',
        'updatedAt',
        'userid',
    ])
    private readonly guestTimelineRoomTypeColorMap = new Map<string, string>([
        ['nem kérek szállást', 'gray'],
        ['kastély szállás 4 ágyas szoba', 'teal'],
        ['kastély szállás 6 ágyas szoba', 'teal'],
        ['kastély szállás 8 ágyas szoba', 'teal'],
        ['maranatha panzióház 2 ágyas szoba (külön fürdős)', 'yellow'],
        ['maranatha panzióház franciaágyas szoba (külön fürdős)', 'yellow'],
        ['maranatha panzióház 4 ágyas szoba (emeletes ágyas, külön fürdős)', 'yellow'],
        ['családi szoba (közös konyhával, fürdővel és nappalival)', 'orange'],
    ])

    private initialFormValues = {
        id: null,
        firstName: '',
        lastName: '',
        gender: '',
        nationality: 'HU',
        country: 'Hungary',
        zipCode: '',
        roomNum: '',
        dateOfArrival: '',
        firstMeal: '',
        dateOfDeparture: '',
        lastMeal: '',
        accommodationExtra: '',
        birthDate: '',
        rfid: '',
        rfidColor: '',
        conference: [],
        conferenceName: null, // TODO: redundant
        conferenceid: null, // TODO: redundant
        diet: '',
        diet_id: null,
        lastRfidUsage: null,
        is_test: null,
        email: '',
        telephone: '',
        roomType: '',
        payment: null,
        babyBed: null,
        prepaid: '',
        roomMate: null,
        is_visitor: false,
        visitor_meals_per_day: 0,
        idCard: null,
        enabled: true,
    }

    readonly visitorMealOptions = [
        { label: 'Nincs étkezés', value: 0 },
        { label: '1 étkezés / nap', value: 1 },
        { label: '2 étkezés / nap (időponttal)', value: 2 },
        { label: 'Korlátlan', value: null },
    ]

    public selectedFile: File
    private globalSearch$ = new Subject<string>()
    private isFormValid$: Observable<boolean>
    private formChanges$: Subject<void> = new Subject()
    private selectionChanges$ = new Subject<Conference[] | null>()
    private guestObs$: Observable<any> | undefined
    private genderObs$: Observable<any> | undefined
    private messageObs$: Observable<any> | undefined
    private guestViewPollTimer: ReturnType<typeof setInterval> | null = null
    private guestViewPollInFlight: boolean = false
    private lastAppliedGuestViewFingerprint: string = ''

    getEmailStatusLabel(guest: Guest): string {
        switch (guest.emailStatus?.status) {
            case 'queued': return 'Küldésre vár';
            case 'processing': return 'Küldés folyamatban';
            case 'sent': return 'Elküldve';
            case 'failed': return 'Sikertelen';
            case 'skipped': return 'Nem küldött';
            default: return 'Ismeretlen';
        }
    }

    getEmailStatusColor(guest: Guest): string {
        switch (guest.emailStatus?.status) {
            case 'queued': return 'indigo';
            case 'processing': return 'blue';
            case 'sent': return 'green';
            case 'failed': return 'pink';
            case 'skipped': return 'orange';
            default: return 'gray';
        }
    }

    getEmailStatusIcon(guest: Guest): string {
        switch (guest.emailStatus?.status) {
            case 'queued': return 'pi pi-clock';
            case 'processing': return 'pi pi-spin pi-spinner';
            case 'sent': return 'pi pi-check-circle';
            case 'failed': return 'pi pi-times-circle';
            case 'skipped': return 'pi pi-ban';
            default: return 'pi pi-question-circle';
        }
    }

    getEmailStatusMeta(guest: Guest): string | null {
        const emailStatus = guest.emailStatus;
        if (!emailStatus) return null;
        if (emailStatus.lastError && !this.shouldHideMissingEmailStatusMeta(guest)) {
            return emailStatus.lastError;
        }
        if (emailStatus.sentAt) return `Küldve: ${this.formatEmailStatusTimestamp(emailStatus.sentAt)}`;
        if (emailStatus.nextAttemptAt) return `Következő próbálkozás: ${this.formatEmailStatusTimestamp(emailStatus.nextAttemptAt)}`;
        if (emailStatus.lastAttemptAt) return `Utolsó próbálkozás: ${this.formatEmailStatusTimestamp(emailStatus.lastAttemptAt)}`;
        return null;
    }

    getEmailStatusAttemptLabel(guest: Guest): string | null {
        const attemptCount = Number(guest.emailStatus?.attemptCount || 0)
        const maxAttempts = Number(guest.emailStatus?.maxAttempts || 0)
        if (attemptCount <= 0 || maxAttempts <= 0) return null
        return `Próbálkozások: ${attemptCount} / ${maxAttempts}`
    }

    private getGuestEmailForRetry(guest: Guest): string {
        const guestEmail = typeof guest.email === 'string' ? guest.email.trim() : ''
        if (guestEmail) return guestEmail

        const statusEmail = typeof guest.emailStatus?.toEmail === 'string'
            ? guest.emailStatus.toEmail.trim()
            : ''
        return statusEmail
    }

    private shouldHideMissingEmailStatusMeta(guest: Guest): boolean {
        const lastError = guest.emailStatus?.lastError?.trim()
        return !!this.getGuestEmailForRetry(guest)
            && lastError === GuestComponent.MISSING_EMAIL_STATUS_MESSAGE
    }

    canRetryGuestEmail(guest: Guest): boolean {
        const status = guest.emailStatus?.status
        return this.canEditByRole
            && !!guest.id
            && !!this.getGuestEmailForRetry(guest)
            && (status === 'failed' || status === 'skipped')
    }

    isRetryingGuestEmail(guest: Guest): boolean {
        return Boolean(guest?.id && this.retryingEmailGuestIds[guest.id])
    }

    private formatEmailStatusTimestamp(value: string | null | undefined): string {
        if (!value) return '';
        const date = new Date(value);
        if (Number.isNaN(date.getTime())) return '';
        const pad = (part: number) => String(part).padStart(2, '0');
        return `${date.getFullYear()}.${pad(date.getMonth() + 1)}.${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
    }

    constructor(private http: HttpClient,
        private guestService: GuestService,
        private userService: UserService,
        private conferenceService: ConferenceService,
        private tagService: TagService,
        private genderService: GenderService,
        private dietService: DietService,
        private countryService: CountryService,
        private sessionService: SessionService,
        private messageService: MessageService,
        private confirmationService: ConfirmationService,
        private logService: LogService,
        private cdRef: ChangeDetectorRef,
        private fb: FormBuilder) {

        // Guest form fields and validators
        this.guestForm = this.fb.group({
            id: [this.initialFormValues.id],
            firstName: [this.initialFormValues.firstName, Validators.required],
            lastName: [this.initialFormValues.lastName, Validators.required],
            gender: [this.initialFormValues.gender, Validators.required],
            nationality: [this.initialFormValues.nationality, Validators.required],
            country: [this.initialFormValues.country, Validators.required],
            zipCode: [this.initialFormValues.zipCode, Validators.required],
            roomNum: [this.initialFormValues.roomNum],
            dateOfArrival: [this.initialFormValues.dateOfArrival, Validators.required],
            firstMeal: [this.initialFormValues.firstMeal, Validators.required],
            dateOfDeparture: [this.initialFormValues.dateOfDeparture, Validators.required],
            lastMeal: [this.initialFormValues.lastMeal, Validators.required],
            accommodationExtra: [this.initialFormValues.accommodationExtra],
            birthDate: [this.initialFormValues.birthDate, Validators.required],
            rfid: [this.initialFormValues.rfid],
            rfidColor: [this.initialFormValues.rfidColor],
            enabled: [this.initialFormValues.enabled, { nonNullable: true }],
            conference: new FormControl(this.initialFormValues.conference),
            conferenceName: [this.initialFormValues.conferenceName],
            conferenceid: [this.initialFormValues.conferenceid],
            diet: [this.initialFormValues.diet, Validators.required],
            diet_id: [this.initialFormValues.diet_id],
            lastRfidUsage: [this.initialFormValues.lastRfidUsage],
            is_test: [this.initialFormValues.is_test],
            email: [this.initialFormValues.email, Validators.email],
            telephone: [this.initialFormValues.telephone],
            roomType: [this.initialFormValues.roomType],
            payment: [this.initialFormValues.payment],
            babyBed: [this.initialFormValues.babyBed],
            prepaid: [this.initialFormValues.prepaid],
            roomMate: new FormControl<string[] | null>(this.initialFormValues.roomMate),
            is_visitor: [this.initialFormValues.is_visitor],
            visitor_meals_per_day: [this.initialFormValues.visitor_meals_per_day],
            idCard: [this.initialFormValues.idCard]
        }, {
            validators: [
                dateRangeValidator('dateOfArrival', 'dateOfDeparture'),
                sameDayMealOrderValidator(
                    'dateOfArrival',
                    'dateOfDeparture',
                    'firstMeal',
                    'lastMeal',
                ),
            ]
        })

        this.dialogFiltersForm = this.fb.group({
            firstName: [],
            lastName: [],
            gender: [],
            nationality: [],
            country: [],
            zipCode: [],
            roomNum: [],
            dateOfArrival: [],
            firstMeal: [],
            dateOfDeparture: [],
            lastMeal: [],
            accommodationExtra: [],
            birthDate: [],
            rfid: [],
            rfidColor: [],
            enabled: [],
            diet: [],
            diet_id: [],
            lastRfidUsage: [],
            is_test: [],
            email: [],
            telephone: [],
            roomType: [],
            payment: [],
            babyBed: [],
            prepaid: [],
            roomMate: [],
            roomKeyIssued: [],
            emailStatus: []
        })

        this.exportButtonItems = [
            {
                label: 'Üres sablon',
                icon: 'pi pi-file-excel',
                command: () => {
                    this.downloadImportTemplate()
                }
            },
            {
                label: 'Táblázat Excel',
                icon: 'pi pi-file-excel',
                command: () => {
                    this.exportExcel()
                }
            }
        ]
    }

    ngOnInit() {
        // Set API URL
        this.apiURL = this.guestService.apiURL

        // Permissions
        this.userService.hasRole(['Super Admin', 'Nagy Admin', 'Kis Admin']).subscribe(canCreate => this.canCreate = canCreate)
        this.userService.hasRole(['Super Admin', 'Nagy Admin', 'Kis Admin', 'Szervezo']).subscribe(canEdit => { this.canEditByRole = canEdit; this.recomputeCanEdit() })
        this.userService.hasRole(['Super Admin', 'Nagy Admin', 'Kis Admin']).subscribe(canDelete => this.canDelete = canDelete)
        this.userService.hasRole(['Super Admin', 'Nagy Admin', 'Kis Admin']).subscribe(canAssign => this.canAssign = canAssign)
        this.userService.hasRole(['Super Admin', 'Nagy Admin', 'Kis Admin', 'Szervezo']).subscribe(canManageRoomKey => this.canManageRoomKey = canManageRoomKey)
        this.userService.hasRole(['Super Admin', 'Nagy Admin', 'Kis Admin']).subscribe(canImport => this.canImport = canImport)
        this.userService.hasRole(['Szervezo']).subscribe(isOrganizer => { this.isOrganizer = isOrganizer; this.recomputeCanEdit() })

        this.selectionChanges$
            .pipe(
                map(v => (v ?? []).map(x => x.id).sort().join(',')),
                distinctUntilChanged()
            )
            .subscribe(() => this.doQuery())

        // Guests
        this.guestObs$ = this.guestService.guestObs
        this.guestObs$.subscribe((data: ApiResponse) => {
            this.applyGuestResponse(data)
        })

        // Genders
        this.genderObs$ = this.genderService.genderObs
        this.genderObs$.subscribe((data: any) => {
            this.genders = data
        })
        // Get genders for selector
        this.genderService.getGenders(0, 999, { sortField: 'id', sortOrder: 1 })

        // Get diets for selector
        this.dietService.getDietsForSelector().subscribe({
            next: (data) => {
                this.diets = data
            }
        })

        // Get countries for flags
        this.countryService.getCountries().subscribe(countries => {
            this.countries = countries
        })

        // Message
        this.messageObs$ = this.guestService.messageObs;
        this.messageObs$.subscribe((data) => {
            this.loading = false;
            if (data == 'ERROR') {
                this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Hiba történt!' });
            } else {
                this.messages = this.successfulMessage
            }
        })

        // Table columns
        this.cols = [
            { field: 'name', header: 'Név' },  // lastName + firstName
            { field: 'roomNum', header: 'Szoba' },
            { field: 'roomKeyStatus', header: 'Szobakulcs' },
            { field: 'diet', header: 'Étrend' },
            { field: 'rfid', header: 'NFC' },
            { field: 'lastRfidUsage', header: 'NFC használat' },
            { field: 'dateOfArrival', header: 'Érkezés' },
            { field: 'dateOfDeparture', header: 'Távozás' }
        ]

        // Prepaid options
        this.prepaidOptions = [
            { name: 'Igen', value: '1' },
            { name: 'Nem', value: '0' }
        ]
        this.isFormValid$ = this.formChanges$.pipe(
            debounceTime(300),
            distinctUntilChanged(),
            map(() => this.guestForm.valid)
        )

        // Monitor the changes of the form
        this.guestForm.valueChanges
            .pipe(debounceTime(300))
            .subscribe(() => this.formChanges$.next())

        // On dateOfArrival change, update the firstMeal
        this.guestForm.get('dateOfArrival')?.valueChanges.subscribe(() => {
            this.getEarliestFirstMeal()
            this.getLatestFirstMeal()
            this.cdRef.detectChanges()
        })

        // On dateOfDeparture change, update the lastMeal
        this.guestForm.get('dateOfDeparture')?.valueChanges.subscribe(() => {
            this.getEarliestLastMeal()
            this.getLatestLastMeal()
            this.cdRef.detectChanges()
        })

        this.guestForm.get('diet')?.valueChanges.subscribe((dietValue) => {
            if (dietValue === 'nem kér étkezést') {
                this.guestForm.patchValue({
                    firstMeal: 'nem kér étkezést',
                    lastMeal: 'nem kér étkezést',
                })
            } else {
                const firstMealValue = this.guestForm.get('firstMeal')?.value
                const lastMealValue = this.guestForm.get('lastMeal')?.value

                if (firstMealValue === 'nem kér étkezést') {
                    this.guestForm.patchValue({ firstMeal: '' })
                }
                if (lastMealValue === 'nem kér étkezést') {
                    this.guestForm.patchValue({ lastMeal: '' })
                }
            }
        })

        this.guestForm.get('firstMeal')?.valueChanges.subscribe((firstMealValue) => {
            if (firstMealValue === 'nem kér étkezést') {
                if (this.guestForm.get('diet')?.value !== 'nem kér étkezést') {
                    this.guestForm.patchValue({
                        diet: 'nem kér étkezést',
                        lastMeal: 'nem kér étkezést',
                    })
                }
            } else if (this.guestForm.get('diet')?.value === 'nem kér étkezést') {
                this.guestForm.patchValue({ diet: '' })
            }
        })

        this.guestForm.get('lastMeal')?.valueChanges.subscribe((lastMealValue) => {
            if (lastMealValue === 'nem kér étkezést') {
                if (this.guestForm.get('diet')?.value !== 'nem kér étkezést') {
                    this.guestForm.patchValue({
                        diet: 'nem kér étkezést',
                        firstMeal: 'nem kér étkezést',
                    })
                }
            } else if (this.guestForm.get('diet')?.value === 'nem kér étkezést') {
                this.guestForm.patchValue({ diet: '' })
            }
        })

        this.guestForm.get('diet')?.valueChanges.subscribe(() => {
            const selectedDietName = this.guestForm.get('diet')?.value
            const selectedDietId = this.diets.find(diet => diet.name === selectedDietName)?.id || null
            this.guestForm.patchValue({ diet_id: selectedDietId })
        })

        this.guestForm.get('roomType')?.valueChanges.subscribe((value) => {
            const roomMateControl = this.guestForm.get('roomMate')

            if (!this.isRoomSelectionRequiringAccommodation(value)) {
                roomMateControl?.reset(null, { emitEvent: false })
                roomMateControl?.disable({ emitEvent: false })
            } else {
                roomMateControl?.enable({ emitEvent: false })
            }

            this.updateIdCardVisibility()
            this.updateBabyBedVisibility()
        })

        this.guestForm.get('roomMate')?.valueChanges.subscribe((value) => {
            this.normalizeRoomMateControlValue(value)
        })

        const syncVisitorModeState = () => {
            this.applyVisitorAccommodationState()
            updateMealValidators()
        }

        // Látogató mód váltásakor frissítjük a firstMeal/lastMeal validátorait
        const updateMealValidators = () => {
            const isVisitor: boolean = !!this.guestForm.get('is_visitor')?.value
            const mealsPerDay: number | null = this.guestForm.get('visitor_meals_per_day')?.value ?? 0
            const firstMealCtrl = this.guestForm.get('firstMeal')
            const lastMealCtrl = this.guestForm.get('lastMeal')
            if (isVisitor && mealsPerDay !== 2) {
                firstMealCtrl?.clearValidators()
                lastMealCtrl?.clearValidators()
                firstMealCtrl?.patchValue(null, { emitEvent: false })
                lastMealCtrl?.patchValue(null, { emitEvent: false })
            } else {
                firstMealCtrl?.setValidators(Validators.required)
                lastMealCtrl?.setValidators(Validators.required)
            }
            firstMealCtrl?.updateValueAndValidity({ emitEvent: false })
            lastMealCtrl?.updateValueAndValidity({ emitEvent: false })
        }

        this.guestForm.get('is_visitor')?.valueChanges.subscribe(() => syncVisitorModeState())
        this.guestForm.get('visitor_meals_per_day')?.valueChanges.subscribe(() => updateMealValidators())
        syncVisitorModeState()

        // TODO: Remove redundant conference Id + Name
        this.guestForm.get('conference')?.valueChanges.subscribe((conference) => {
            const selectedConference = this.getSelectedConference(conference)

            if (selectedConference) {
                const selectedConferenceId = selectedConference.id
                const selectedConferenceName = selectedConference.name
                this.guestForm.patchValue({ conferenceid: selectedConferenceId })
                this.guestForm.patchValue({ conferenceName: selectedConferenceName })
            } else {
                this.guestForm.patchValue({
                    conferenceid: null,
                    conferenceName: null,
                })
            }

            this.applyConferenceRules(selectedConference)
            this.loadConferenceDetails(selectedConference)
        })

        this.guestForm.get('country')?.valueChanges.subscribe((country) => {
            const zipCodeControl = this.guestForm.get('zipCode')

            if (country === 'Hungary') {
                zipCodeControl?.setValidators([
                    Validators.required,
                    zipCodeValidator(),
                ])
            } else {
                zipCodeControl?.setValidators([Validators.required])
            }

            zipCodeControl?.updateValueAndValidity()
        })

        this.guestForm.get('birthDate')?.valueChanges.subscribe(() => {
            this.updateIdCardVisibility()
            this.updateBabyBedVisibility()
        })

        // Global search
        this.globalSearch$.pipe(
            debounceTime(500),
            distinctUntilChanged()
        ).subscribe(searchValue => {
            this.globalFilter = searchValue

            // Require conference selection for organizers
            if (this.isOrganizer && (!this.selectedConferences || this.selectedConferences.length === 0)) {
                this.messageService.add({
                    severity: 'warn',
                    summary: 'Kérem válasszon konferenciát!',
                })
                return
            }

            // If the search box is empty, fall back to the default query
            if (!searchValue) {
                this.doQuery()
                return
            }

            // Conditions met, perform the search
            this.loading = true

            // same ID handling as in doQuery
            const ids = this.selectedConferences
                .map(c => Number(c.id))
                .filter(n => Number.isFinite(n) && n !== GuestComponent.NONE_CONF_ID) as number[]

            if (this.noConferenceMode) {
                // build search + noConference query and use get()
                const qp: string[] = [`search=${encodeURIComponent(searchValue)}`, 'noConference=1']
                // include any other active table filters
                const extraFilters = this.buildActiveFilterParams()
                qp.push(...extraFilters)

                return this.guestService.get(
                    0,
                    this.rowsPerPage,
                    { sortField: this.sortField, sortOrder: this.sortOrder },
                    qp.join('&')
                )
            }

            // normal search path (keeps your existing behavior)
            return this.guestService.getBySearch(
                searchValue,
                { sortField: this.sortField, sortOrder: this.sortOrder },
                ids
            )
        })

        this.startGuestViewPolling()
        this.applyConferenceRules(this.getSelectedConference(this.conference?.value))
    }

    // Getters for form validation
    get id() { return this.guestForm.get('id') }
    get firstName() { return this.guestForm.get('firstName') }
    get lastName() { return this.guestForm.get('lastName') }
    get gender() { return this.guestForm.get('gender') }
    get nationality() { return this.guestForm.get('nationality') }
    get country() { return this.guestForm.get('country') }
    get zipCode() { return this.guestForm.get('zipCode') }
    get roomNum() { return this.guestForm.get('roomNum') }
    get dateOfArrival() { return this.guestForm.get('dateOfArrival') }
    get firstMeal() { return this.guestForm.get('firstMeal') }
    get dateOfDeparture() { return this.guestForm.get('dateOfDeparture') }
    get lastMeal() { return this.guestForm.get('lastMeal') }
    get accommodationExtra() { return this.guestForm.get('accommodationExtra') }
    get birthDate() { return this.guestForm.get('birthDate') }
    get rfidColor() { return this.guestForm.get('rfidColor') }
    get enabled() { return this.guestForm.get('enabled') }
    get conference() { return this.guestForm.get('conference') }
    get hasSelectedConference() { return !!this.getSelectedConference(this.conference?.value) }
    get diet() { return this.guestForm.get('diet') }
    get lastRfidUsage() { return this.guestForm.get('lastRfidUsage') }
    get is_test() { return this.guestForm.get('is_test') }
    get email() { return this.guestForm.get('email') }
    get telephone() { return this.guestForm.get('telephone') }
    get roomType() { return this.guestForm.get('roomType') }
    get payment() { return this.guestForm.get('payment') }
    get babyBed() { return this.guestForm.get('babyBed') }
    get prepaid() { return this.guestForm.get('prepaid') }
    get roomMate() { return this.guestForm.get('roomMate') }
    get is_visitor() { return this.guestForm.get('is_visitor') }
    get visitor_meals_per_day() { return this.guestForm.get('visitor_meals_per_day') }
    get idCard() { return this.guestForm.get('idCard') }
    get isVisitorSelection() {
        return !!this.is_visitor?.value
    }
    get needsRoom() {
        return this.hasSelectedConference && !this.isVisitorSelection && this.isRoomSelectionRequiringAccommodation(this.roomType?.value)
    }
    
    // Helper for Guests primary reservation
    get primaryReservation(): Reservation | null {
        return this.guestReservations && this.guestReservations.length
            ? this.guestReservations[0]
            : null
    }
    
    /**
     * Returns the 1-based serial number of a row in the table, taking lazy pagination into account.
     * `firstRowIndex` is the absolute index of the first row on the current page (PrimeNG lazy `event.first`),
     * so the displayed number stays continuous across pages.
     */
    getRowNumber(rowIndex: number): number {
        return this.firstRowIndex + rowIndex + 1
    }

    /**
     * Load filtered data into the Table
     * @returns
     */
    doQuery() {
        if (!this.hasActiveSession()) {
            this.loading = false
            this.stopGuestViewPolling()
            return
        }

        const queryDescriptor = this.buildCurrentGuestQueryDescriptor()
        if (!queryDescriptor) {
            this.loading = false
            return
        }

        this.dispatchGuestQueryRequest(queryDescriptor)
    }

    onFilter(event: any, field: string) {
        // Organizer need select conference
        if (this.isOrganizer && !this.selectedConferences) return

        const noWaitFields = ['diet', 'lastRfidUsage', 'dateOfArrival', 'dateOfDeparture', 'prepaid', 'roomKeyIssued', 'payment', 'emailStatus']
        let filterValue = ''

        // Calendar date as String
        if (event instanceof Date) {
            filterValue = formatDateDots(event)
        } else {
            const hasEventValue = event && Object.prototype.hasOwnProperty.call(event, 'value')
            const hasTargetValue = event?.target?.value !== undefined

            if (event && (hasEventValue || hasTargetValue)) {
                if (field == "rfid") {
                    filterValue = event.target?.value.replaceAll('ö', '0').replaceAll('Ö', '0')
                    this.rfidFilterValue = filterValue
                } else {
                    filterValue = hasEventValue ? event.value : event.target?.value
                }
            }
        }

        this.filterValues[field] = filterValue

        // If the field is a dropdown, run doQuery immediately
        if (noWaitFields.includes(field)) {
            if (this.filterValues[field] === filterValue) {
                this.doQuery()
            }
            // otherwise wait for the debounce time
        } else {
            if (this.debounce[field]) {
                clearTimeout(this.debounce[field])
            }

            this.debounce[field] = setTimeout(() => {
                if (this.filterValues[field] === filterValue) {
                    this.doQuery()
                }
            }, 500)
        }
    }

    private hasActiveFilterValue(value: any): boolean {
        if (value === null || value === undefined) return false
        if (typeof value === 'string') return value.trim().length > 0
        if (Array.isArray(value)) return value.length > 0
        return true
    }

    private buildActiveFilterObject(): Record<string, string> {
        return Object.keys(this.filterValues)
            .filter((key) => this.hasActiveFilterValue(this.filterValues[key]))
            .reduce((acc, key) => {
                acc[key] = String(this.filterValues[key])
                return acc
            }, {} as Record<string, string>)
    }

    private buildActiveFilterParams(): string[] {
        return Object.entries(this.buildActiveFilterObject())
            .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
    }

    private buildCurrentGuestQueryDescriptor() {
        if (this.isOrganizer && !this.selectedConferences.length) {
            return null
        }

        const conferenceIds = this.selectedConferences
            .map((conference) => Number(conference.id))
            .filter((id) => Number.isFinite(id) && id !== GuestComponent.NONE_CONF_ID) as number[]

        const filterObject = this.buildActiveFilterObject()
        const filters = Object.entries(filterObject)
            .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)

        if (this.noConferenceMode) {
            filters.push('noConference=1')
        } else if (conferenceIds.length) {
            filters.push(`conferenceIds=${conferenceIds.join(',')}`)
        }

        return {
            page: this.page,
            rowsPerPage: this.rowsPerPage,
            sort: {
                sortField: this.sortField,
                sortOrder: this.sortOrder
            },
            globalFilter: this.globalFilter,
            noConferenceMode: this.noConferenceMode,
            conferenceIds,
            filterObject,
            queryParams: filters.join('&')
        }
    }

    private dispatchGuestQueryRequest(queryDescriptor: {
        page: number
        rowsPerPage: number
        sort: { sortField: string, sortOrder: number }
        globalFilter: string
        noConferenceMode: boolean
        conferenceIds: number[]
        filterObject: Record<string, string>
        queryParams: string
    }) {
        this.loading = true

        if (queryDescriptor.globalFilter !== '') {
            if (queryDescriptor.noConferenceMode) {
                const queryParts = [`search=${encodeURIComponent(queryDescriptor.globalFilter)}`]
                if (queryDescriptor.queryParams) {
                    queryParts.push(queryDescriptor.queryParams)
                }

                this.guestService.get(
                    queryDescriptor.page,
                    queryDescriptor.rowsPerPage,
                    queryDescriptor.sort,
                    queryParts.join('&')
                )
                return
            }

            this.guestService.getBySearch(
                queryDescriptor.globalFilter,
                queryDescriptor.sort,
                queryDescriptor.conferenceIds,
                queryDescriptor.filterObject
            )
            return
        }

        this.guestService.get(
            queryDescriptor.page,
            queryDescriptor.rowsPerPage,
            queryDescriptor.sort,
            queryDescriptor.queryParams
        )
    }

    private executeGuestQueryRequest$(queryDescriptor: {
        page: number
        rowsPerPage: number
        sort: { sortField: string, sortOrder: number }
        globalFilter: string
        noConferenceMode: boolean
        conferenceIds: number[]
        filterObject: Record<string, string>
        queryParams: string
    }): Observable<ApiResponse> {
        if (queryDescriptor.globalFilter !== '') {
            if (queryDescriptor.noConferenceMode) {
                const queryParts = [`search=${encodeURIComponent(queryDescriptor.globalFilter)}`]
                if (queryDescriptor.queryParams) {
                    queryParts.push(queryDescriptor.queryParams)
                }

                return this.guestService.get$(
                    queryDescriptor.page,
                    queryDescriptor.rowsPerPage,
                    queryDescriptor.sort,
                    queryParts.join('&')
                )
            }

            return this.guestService.getBySearch$(
                queryDescriptor.globalFilter,
                queryDescriptor.sort,
                queryDescriptor.conferenceIds,
                queryDescriptor.filterObject
            )
        }

        return this.guestService.get$(
            queryDescriptor.page,
            queryDescriptor.rowsPerPage,
            queryDescriptor.sort,
            queryDescriptor.queryParams
        )
    }

    private applyGuestResponse(data: ApiResponse | null): void {
        this.loading = false
        if (!data) return

        this.tableData = this.getNormalizedGuestRows(data)
        this.resetGuestTimelineCache()
        this.totalRecords = data.totalItems || 0
        this.page = data.currentPage || 0
        this.totalTaggedGuests = data.rfidCount || 0
        this.hasPendingGuestViewUpdate = false
        this.pendingGuestViewMessage = ''
        this.lastAppliedGuestViewFingerprint = this.buildGuestResponseFingerprint(data)
    }

    private getNormalizedGuestRows(data: ApiResponse | null): Guest[] {
        if (!data?.rows) return []

        let rows = data.rows || []
        if (!isDevMode()) {
            rows = rows.filter((guest: any) => guest.is_test !== true)
        }

        return rows.map((guest: any) => this.normalizeGuestRow(guest))
    }

    private buildGuestResponseFingerprint(data: ApiResponse | null): string {
        return JSON.stringify({
            currentPage: data?.currentPage || 0,
            totalItems: data?.totalItems || 0,
            rfidCount: data?.rfidCount || 0,
            rows: this.getNormalizedGuestRows(data).map((guest) => this.summarizeGuestRowForFingerprint(guest))
        })
    }

    private summarizeGuestRowForFingerprint(guest: Guest) {
        return {
            id: guest.id ?? null,
            updatedAt: guest.updatedAt ?? null,
            email: guest.email ?? null,
            roomNum: guest.displayRoomNum ?? guest.roomNum ?? null,
            rfid: guest.rfid ?? null,
            lastRfidUsage: guest.lastRfidUsage ?? null,
            roomKeyIssued: guest.roomKeyIssued ?? false,
            roomKeyIssuedAt: guest.roomKeyIssuedAt ?? null,
            roomKeyReturnedAt: guest.roomKeyReturnedAt ?? null,
            emailStatus: guest.emailStatus
                ? {
                    id: guest.emailStatus.id ?? null,
                    status: guest.emailStatus.status,
                    attemptCount: guest.emailStatus.attemptCount ?? 0,
                    maxAttempts: guest.emailStatus.maxAttempts ?? 0,
                    lastAttemptAt: guest.emailStatus.lastAttemptAt ?? null,
                    nextAttemptAt: guest.emailStatus.nextAttemptAt ?? null,
                    sentAt: guest.emailStatus.sentAt ?? null,
                    lastError: guest.emailStatus.lastError ?? null,
                    toEmail: guest.emailStatus.toEmail ?? null
                }
                : null
        }
    }

    private syncAppliedGuestViewFingerprintFromCurrentState(): void {
        this.lastAppliedGuestViewFingerprint = JSON.stringify({
            currentPage: this.page,
            totalItems: this.totalRecords,
            rfidCount: this.totalTaggedGuests,
            rows: this.tableData.map((guest) => this.summarizeGuestRowForFingerprint(guest))
        })
    }

    private startGuestViewPolling(): void {
        if (!this.hasActiveSession()) {
            this.stopGuestViewPolling()
            return
        }

        if (this.guestViewPollTimer) {
            clearInterval(this.guestViewPollTimer)
        }

        this.guestViewPollTimer = setInterval(() => {
            this.checkForGuestViewUpdates()
        }, GuestComponent.BACKGROUND_REFRESH_INTERVAL_MS)
    }

    private checkForGuestViewUpdates(): void {
        if (!this.hasActiveSession()) {
            this.stopGuestViewPolling()
            return
        }

        if (this.guestViewPollInFlight || this.loading) {
            return
        }

        const queryDescriptor = this.buildCurrentGuestQueryDescriptor()
        if (!queryDescriptor) {
            return
        }

        this.guestViewPollInFlight = true
        this.executeGuestQueryRequest$(queryDescriptor).subscribe({
            next: (response) => {
                const nextFingerprint = this.buildGuestResponseFingerprint(response)
                if (!this.lastAppliedGuestViewFingerprint) {
                    this.lastAppliedGuestViewFingerprint = nextFingerprint
                    this.guestViewPollInFlight = false
                    return
                }

                if (nextFingerprint !== this.lastAppliedGuestViewFingerprint) {
                    this.hasPendingGuestViewUpdate = true
                    this.pendingGuestViewMessage = this.buildPendingGuestViewMessage(response)
                    this.guestViewPollInFlight = false
                    return
                }

                this.hasPendingGuestViewUpdate = false
                this.pendingGuestViewMessage = ''
                this.guestViewPollInFlight = false
            },
            error: (error: HttpErrorResponse) => {
                this.guestViewPollInFlight = false
                if (error?.status === 401 || error?.status === 403) {
                    this.stopGuestViewPolling()
                }
            }
        })
    }

    private buildPendingGuestViewMessage(response: ApiResponse | null): string {
        const nextTotal = Number(response?.totalItems || 0)

        if (nextTotal > this.totalRecords) {
            return 'Új vagy módosult vendégadat érkezett. A jelenlegi nézet frissíthető.'
        }

        if (nextTotal < this.totalRecords) {
            return 'A vendéglista megváltozott. A jelenlegi nézet frissíthető.'
        }

        return 'A megjelenített vendégadatok frissültek. A jelenlegi nézet frissíthető.'
    }

    refreshGuestView(): void {
        this.doQuery()
    }

    private hasActiveSession(): boolean {
        return this.sessionService.hasActiveSessionSnapshot()
    }

    private stopGuestViewPolling(): void {
        if (this.guestViewPollTimer) {
            clearInterval(this.guestViewPollTimer)
            this.guestViewPollTimer = null
        }

        this.guestViewPollInFlight = false
        this.hasPendingGuestViewUpdate = false
        this.pendingGuestViewMessage = ''
    }

    /**
     * Lazy mode is handy to deal with large datasets, instead of loading
     * the entire data, small chunks of data is loaded by invoking onLazyLoad
     * callback every time paging, sorting and filtering happens.
     * @param event
     */
    onLazyLoad(event: any) {
        this.firstRowIndex = event.first ?? 0
        this.page = event.first! / event.rows!
        this.rowsPerPage = event.rows ?? this.rowsPerPage
        this.sortField = event.sortField ?? ''
        this.sortOrder = event.sortOrder ?? 1
        this.globalFilter = event.globalFilter ?? ''
        this.doQuery()
    }

    /**
     * Filter table by any column
     * @param table
     * @param event
     */
    onGlobalFilter(table: Table, event: Event) {
        const searchValue = (event.target as HTMLInputElement).value
        this.globalSearch$.next(searchValue)
    }

    /**
     * When a row is expanded, load the guest data.
     * If the conference has an guest, load the guest's data from the user service.
     * @param conference The guest object for the row that was expanded.
     */
    onRowExpand(guest: Guest): void {
        // Load idCard image
        // this.imageUrl = null

        if (guest.idcard) {
            this.getIdCardImage(guest)
        }

        this.loadGuestTimeline(guest)
    }

    getGuestTimeline(guestId: number | null | undefined): GuestActivityTimelineItem[] {
        if (!guestId) return []
        return this.guestTimelineByGuestId[guestId] || []
    }

    isGuestTimelineLoading(guestId: number | null | undefined): boolean {
        return !!guestId && !!this.guestTimelineLoading[guestId]
    }

    getGuestTimelineError(guestId: number | null | undefined): string | null {
        if (!guestId) return null
        return this.guestTimelineError[guestId] || null
    }

    trackGuestTimelineItem(index: number, item: GuestActivityTimelineItem): string {
        return item.id
    }

    private resetGuestTimelineCache(): void {
        this.guestTimelineByGuestId = {}
        this.guestTimelineLoading = {}
        this.guestTimelineError = {}
    }

    private invalidateGuestTimeline(guestId: number | null | undefined): void {
        if (!guestId) return

        delete this.guestTimelineByGuestId[guestId]
        delete this.guestTimelineLoading[guestId]
        delete this.guestTimelineError[guestId]
    }

    private loadGuestTimeline(guest: Guest): void {
        const guestId = Number(guest?.id)
        if (!Number.isInteger(guestId) || guestId <= 0) return
        if (this.guestTimelineLoading[guestId]) return
        if (Array.isArray(this.guestTimelineByGuestId[guestId])) return

        this.guestTimelineLoading[guestId] = true
        this.guestTimelineError[guestId] = null

        this.logService.getGuestTimeline$(guestId, this.guestTimelineLimit).subscribe({
            next: (logs) => {
                this.guestTimelineByGuestId[guestId] = this.buildGuestTimelineItems(guest, logs)
                this.guestTimelineLoading[guestId] = false
            },
            error: () => {
                this.guestTimelineLoading[guestId] = false
                this.guestTimelineError[guestId] = 'A vendég eseményei most nem tölthetők be.'
            }
        })
    }

    private buildGuestTimelineItems(guest: Guest, logs: Log[]): GuestActivityTimelineItem[] {
        const entries = [...(logs || [])]
            .sort((a, b) => this.getLogTimestampValue(a) - this.getLogTimestampValue(b))
            .map((log, index) => this.buildGuestTimelineEntry(guest, log, index))

        return this.filterGuestTimelineEntries(entries).map(({ action, tableName, changedFieldKeys, logId, priority, timestampKey, ...item }) => item)
    }

    private buildGuestTimelineEntry(guest: Guest, log: Log, index: number): GuestActivityTimelineEntry {
        const action = this.normalizeLogAction(log?.action_type)
        const tableName = this.normalizeLogTableName(log?.table_name)
        const changedFieldKeys = this.getChangedGuestFieldKeys(log)
        const actor = this.getGuestTimelineActor(log)
        const timestamp = this.getGuestTimelineTimestamp(log)
        const timestampKey = this.getGuestTimelineTimestampKey(timestamp)
        const appearance = this.getGuestTimelineAppearance(action, tableName, changedFieldKeys)
        const description = this.getGuestTimelineDescription(log, action, tableName, changedFieldKeys)
        const fieldChanges = tableName === 'guest' && action === 'update'
            ? this.getGuestTimelineFieldChanges(log)
            : []
        const tagBadge = this.getGuestTimelineTagBadge(guest, log, action)

        return {
            id: `${log.id || 'log'}-${index}`,
            title: appearance.title,
            description: fieldChanges.length > 0 ? null : description,
            fieldChanges,
            tagBadgeLabel: tagBadge?.label ?? null,
            tagBadgeValue: tagBadge?.value ?? null,
            tagBadgeColorClass: tagBadge?.colorClass ?? this.getGuestTimelineTagBadgeColorClass(guest),
            actor,
            timestamp,
            icon: appearance.icon,
            color: appearance.color,
            action,
            tableName,
            changedFieldKeys,
            logId: log?.id ?? null,
            priority: this.getGuestTimelinePriority(action, tableName, description),
            timestampKey,
        }
    }

    private filterGuestTimelineEntries(entries: GuestActivityTimelineEntry[]): GuestActivityTimelineEntry[] {
        const guestCreateKeys = new Set(
            entries
                .filter((entry) => entry.tableName === 'guest' && entry.action === 'create' && entry.timestampKey)
                .map((entry) => `${entry.actor}|${entry.timestampKey}`),
        )

        const tagActionKeys = new Set(
            entries
                .filter((entry) => (entry.action === 'assign tag' || entry.action === 'unassign') && entry.timestampKey)
                .map((entry) => `${entry.actor}|${entry.timestampKey}`),
        )

        const bestNfcUsageEntries = new Map<string, GuestActivityTimelineEntry>()
        for (const entry of entries) {
            if (entry.title !== 'NFC címke használat' || !entry.timestampKey) {
                continue
            }

            const dedupeKey = `${entry.actor}|${entry.timestampKey}|${entry.title}`
            const currentBest = bestNfcUsageEntries.get(dedupeKey)
            if (!currentBest || entry.priority > currentBest.priority) {
                bestNfcUsageEntries.set(dedupeKey, entry)
            }
        }

        const tagMaintenanceUpdateEntries = new Map<string, GuestActivityTimelineEntry>()
        for (const entry of entries) {
            if (
                entry.tableName === 'guest' &&
                entry.action === 'update' &&
                entry.timestampKey &&
                this.isTagMaintenanceOnlyChange(entry.changedFieldKeys)
            ) {
                tagMaintenanceUpdateEntries.set(`${entry.actor}|${entry.timestampKey}`, entry)
            }
        }

        for (const entry of entries) {
            if (
                (entry.action === 'assign tag' || entry.action === 'unassign') &&
                entry.timestampKey &&
                !entry.tagBadgeValue
            ) {
                const pairedUpdate = tagMaintenanceUpdateEntries.get(`${entry.actor}|${entry.timestampKey}`)
                const pairedBadge = this.getTagBadgeFromFieldChanges(entry.action, pairedUpdate?.fieldChanges || [])
                if (pairedBadge) {
                    entry.tagBadgeValue = pairedBadge.value
                }
            }
        }

        return entries.filter((entry) => {
            if (
                entry.tableName === 'answers' &&
                entry.action === 'create' &&
                entry.timestampKey &&
                guestCreateKeys.has(`${entry.actor}|${entry.timestampKey}`)
            ) {
                return false
            }

            if (
                entry.tableName === 'guest' &&
                entry.action === 'update' &&
                entry.timestampKey &&
                this.isTagMaintenanceOnlyChange(entry.changedFieldKeys) &&
                tagActionKeys.has(`${entry.actor}|${entry.timestampKey}`)
            ) {
                return false
            }

            if (entry.title === 'NFC címke használat' && entry.timestampKey) {
                const dedupeKey = `${entry.actor}|${entry.timestampKey}|${entry.title}`
                return bestNfcUsageEntries.get(dedupeKey)?.id === entry.id
            }

            return true
        })
    }

    private getLogTimestampValue(log: Log): number {
        const rawTimestamp = this.getGuestTimelineTimestamp(log)
        if (!rawTimestamp) return 0

        const timestamp = new Date(rawTimestamp).getTime()
        return Number.isNaN(timestamp) ? 0 : timestamp
    }

    private getGuestTimelineTimestamp(log: Log): string | null {
        return log?.createdAt || log?.updatedAt || null
    }

    private getGuestTimelineActor(log: Log): string {
        const actor = String(log?.user_fullname || '').trim()
        return actor || 'SYSTEM'
    }

    private getGuestTimelineAppearance(action: string, tableName: string, changedFieldKeys: string[]): { title: string; icon: string; color: string } {
        if (tableName === 'answers') {
            switch (action) {
                case 'create':
                    return { title: 'Kérdőív válaszok rögzítve', icon: 'pi pi-comments', color: '#16a34a' }
                case 'update':
                    return { title: 'Kérdőív válaszok módosítva', icon: 'pi pi-comments', color: '#2563eb' }
                case 'delete':
                    return { title: 'Kérdőív válaszok törölve', icon: 'pi pi-comments', color: '#dc2626' }
                default:
                    return { title: 'Kérdőív esemény', icon: 'pi pi-comments', color: '#475569' }
            }
        }

        if (tableName === 'guest' && action === 'update' && this.isTagMaintenanceOnlyChange(changedFieldKeys)) {
            return { title: 'NFC címke állapota frissítve', icon: 'pi pi-tag', color: '#ea580c' }
        }

        switch (action) {
            case 'create':
                return { title: 'Vendég regisztrálva', icon: 'pi pi-user-plus', color: '#16a34a' }
            case 'update':
                return { title: 'Vendég adatai módosítva', icon: 'pi pi-pencil', color: '#2563eb' }
            case 'delete':
                return { title: 'Vendég törölve', icon: 'pi pi-trash', color: '#dc2626' }
            case 'assign tag':
                return { title: 'NFC címke hozzárendelve', icon: 'pi pi-tag', color: '#ea580c' }
            case 'unassign':
                return { title: 'NFC címke eltávolítva', icon: 'pi pi-times-circle', color: '#f97316' }
            case 'updatelasttagusage':
            case 'scanned code':
                return { title: 'NFC címke használat', icon: 'pi pi-bolt', color: '#0891b2' }
            case 'roomkey-issue':
                return { title: 'Szobakulcs kiadva', icon: 'pi pi-key', color: '#ca8a04' }
            case 'roomkey-return':
                return { title: 'Szobakulcs visszavéve', icon: 'pi pi-key', color: '#16a34a' }
            case 'tag duplicate':
                return { title: 'NFC címke ütközés', icon: 'pi pi-exclamation-triangle', color: '#dc2626' }
            case 'already received food':
                return { title: 'Étkezés már rögzítve', icon: 'pi pi-exclamation-circle', color: '#dc2626' }
            case 'import':
                return { title: 'Vendég import esemény', icon: 'pi pi-upload', color: '#7c3aed' }
            default:
                return { title: 'Vendéghez kapcsolódó esemény', icon: 'pi pi-clock', color: '#475569' }
        }
    }

    private getGuestTimelineDescription(log: Log, action: string, tableName: string, changedFieldKeys: string[]): string | null {
        const customDescription = this.getGuestTimelineCustomDescription(log, action, tableName, changedFieldKeys)
        if (customDescription !== null) {
            return customDescription
        }

        const responseText = this.getLogPayloadText(this.parseLogPayload(log?.response_data))
        if (responseText) {
            return responseText
        }

        const originalText = this.getLogPayloadText(this.parseLogPayload(log?.original_data))
        if (originalText) {
            return originalText
        }

        const changedFields = changedFieldKeys.map((key) => this.guestTimelineFieldLabels[key] || key)
        if (!changedFields.length) {
            return null
        }

        const visibleFields = changedFields.slice(0, 4)
        const suffix = changedFields.length > visibleFields.length
            ? ` +${changedFields.length - visibleFields.length} további mező`
            : ''

        return `Módosult: ${visibleFields.join(', ')}${suffix}`
    }

    private getGuestTimelineCustomDescription(log: Log, action: string, tableName: string, changedFieldKeys: string[]): string | null {
        if (tableName === 'answers') {
            switch (action) {
                case 'create':
                    return 'A vendég kérdőív válaszai rögzítve lettek.'
                case 'update':
                    return 'A vendég kérdőív válaszai frissültek.'
                case 'delete':
                    return 'A vendég kérdőív válaszai törölve lettek.'
                default:
                    return null
            }
        }

        if (action === 'assign tag') {
            return ''
        }

        if (action === 'unassign') {
            return 'Címke leválasztva a vendégről.'
        }

        if (action === 'scanned code' || action === 'updatelasttagusage') {
            return ''
        }

        if (tableName === 'guest' && action === 'update') {
            const changes = this.getGuestTimelineFieldChanges(log)
            if (!changes.length) {
                return null
            }
            return null
        }

        return null
    }

    private getChangedGuestFieldKeys(log: Log): string[] {
        const originalData = this.parseLogPayload(log?.original_data)
        const newData = this.parseLogPayload(log?.new_data)
        if (!this.isLogRecord(originalData) || !this.isLogRecord(newData)) {
            return []
        }

        return Object.keys(newData)
            .filter((key) => !['id'].includes(key))
            .filter((key) => !this.guestTimelineIgnoredFieldKeys.has(key))
            .filter((key) => JSON.stringify(originalData[key] ?? null) !== JSON.stringify(newData[key] ?? null))
    }

    private getGuestTimelineFieldChanges(log: Log): GuestTimelineFieldChange[] {
        const originalData = this.parseLogPayload(log?.original_data)
        const newData = this.parseLogPayload(log?.new_data)
        if (!this.isLogRecord(originalData) || !this.isLogRecord(newData)) {
            return []
        }

        return this.getChangedGuestFieldKeys(log)
            .map((key) => ({
                key,
                label: this.guestTimelineFieldLabels[key] || key,
                oldText: this.formatGuestTimelineFieldValue(key, originalData[key]),
                newText: this.formatGuestTimelineFieldValue(key, newData[key]),
            }))
            .filter((change) => change.oldText !== change.newText)
    }

    private isTagMaintenanceOnlyChange(changedFieldKeys: string[]): boolean {
        if (!changedFieldKeys.length) {
            return false
        }

        return changedFieldKeys.every((field) => ['rfid', 'lastRfidUsage'].includes(field))
    }

    private formatGuestTimelineFieldValue(key: string, value: unknown): string {
        if (value === null || value === undefined) {
            return 'üres'
        }

        if (typeof value === 'string') {
            const trimmed = value.trim()
            if (!trimmed) {
                return 'üres'
            }

            if (this.isDateOnlyField(key)) {
                return formatDateDots(trimmed) || trimmed
            }

            if (this.isDateTimeField(key)) {
                return this.formatGuestTimelineDateTime(trimmed) || trimmed
            }

            return trimmed
        }

        if (typeof value === 'number') {
            if (key === 'gender') {
                return value === 1 ? 'Férfi' : value === 2 ? 'Nő' : String(value)
            }

            if (this.isBooleanField(key)) {
                return value ? 'Igen' : 'Nem'
            }

            return String(value)
        }

        if (typeof value === 'boolean') {
            return value ? 'Igen' : 'Nem'
        }

        if (Array.isArray(value)) {
            const normalizedItems = value
                .map((item) => this.formatGuestTimelineFieldValue(key, item))
                .filter((item) => item !== 'üres')

            return normalizedItems.length > 0 ? normalizedItems.join(', ') : 'üres'
        }

        if (this.isLogRecord(value)) {
            if (typeof value['name'] === 'string' && value['name'].trim()) {
                return value['name'].trim()
            }

            if (typeof value['roomNum'] === 'string' && value['roomNum'].trim()) {
                return value['roomNum'].trim()
            }

            return JSON.stringify(value)
        }

        return String(value)
    }

    private isBooleanField(key: string): boolean {
        return ['babyBed', 'enabled', 'is_visitor', 'prepaid', 'roomKeyIssued'].includes(key)
    }

    visitorLabel(guest: Guest): string {
        const meals = guest.visitor_meals_per_day
        if (meals === null || meals === undefined) return 'Látogató + korlátlan'
        if (meals === 1) return 'Látogató +1 étkezés'
        if (meals === 2) return 'Látogató +2 étkezés'
        return 'Látogató'
    }

    private isDateOnlyField(key: string): boolean {
        return ['birthDate', 'dateOfArrival', 'dateOfDeparture'].includes(key)
    }

    private isDateTimeField(key: string): boolean {
        return ['lastRfidUsage', 'roomKeyIssuedAt', 'roomKeyReturnedAt'].includes(key)
    }

    private formatGuestTimelineDateTime(value: string): string {
        const date = new Date(value)
        if (Number.isNaN(date.getTime())) {
            return ''
        }

        const pad = (part: number) => String(part).padStart(2, '0')
        return `${date.getFullYear()}.${pad(date.getMonth() + 1)}.${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`
    }

    private getGuestTimelineTagBadge(guest: Guest, log: Log, action: string): { label: string; value: string; colorClass: string } | null {
        const tagNumber = this.getGuestTimelineTagNumber(log, action)
        if (!tagNumber) {
            return null
        }

        return {
            label: '',
            value: tagNumber,
            colorClass: this.getGuestTimelineTagBadgeColorClass(guest),
        }
    }

    private getGuestTimelineTagNumber(log: Log, action: string): string | null {
        const originalText = this.getLogPayloadText(this.parseLogPayload(log?.original_data))
        if (!originalText) {
            return null
        }

        if (action === 'assign tag') {
            const match = originalText.match(/^Assign Tag\s+(.+?)\s+to\s+(.+)$/i)
            return match?.[1]?.trim() || null
        }

        if (action === 'scanned code' || action === 'updatelasttagusage') {
            const match = originalText.match(/\(([^()]+)\)\s*$/)
            return match?.[1]?.trim() || null
        }

        if (action === 'unassign') {
            const match = originalText.match(/^Unassign Tag\s+(.+?)\s+from\s+(.+)$/i)
            return match?.[1]?.trim() || null
        }

        return null
    }

    private getGuestTimelineTagBadgeColorClass(guest: Guest): string {
        const dietDetails = guest?.dietDetails as { color?: string } | undefined
        const color = String(dietDetails?.color || '').trim()
        return color || 'indigo'
    }

    private getTagBadgeFromFieldChanges(action: string, fieldChanges: GuestTimelineFieldChange[]): { value: string } | null {
        const rfidChange = fieldChanges.find((change) => change.key === 'rfid')
        if (!rfidChange) {
            return null
        }

        const badgeValue = action === 'unassign' ? rfidChange.oldText : rfidChange.newText
        if (!badgeValue || badgeValue === 'üres') {
            return null
        }

        return {
            value: badgeValue,
        }
    }

    isRoomTypeTimelineChange(change: GuestTimelineFieldChange): boolean {
        return change.key === 'roomType'
    }

    getTimelineRoomTypeBadgeClass(value: string): string {
        const normalized = String(value || '').trim().toLowerCase()
        return this.guestTimelineRoomTypeColorMap.get(normalized) ?? ''
    }

    private parseLogPayload(value: unknown): unknown {
        if (value === null || value === undefined || value === '') {
            return null
        }

        if (typeof value !== 'string') {
            return value
        }

        const trimmed = value.trim()
        if (!trimmed) {
            return null
        }

        try {
            return JSON.parse(trimmed)
        } catch {
            return trimmed
        }
    }

    private getLogPayloadText(value: unknown): string | null {
        if (!value) return null

        if (typeof value === 'string') {
            const normalized = value.trim()
            return normalized ? normalized : null
        }

        if (!this.isLogRecord(value)) {
            return null
        }

        const message = value['message']
        if (typeof message === 'string' && message.trim()) {
            return message.trim()
        }

        const error = value['error']
        if (typeof error === 'string' && error.trim()) {
            return error.trim()
        }

        return null
    }

    private isLogRecord(value: unknown): value is Record<string, any> {
        return !!value && typeof value === 'object' && !Array.isArray(value)
    }

    private normalizeLogTableName(tableName: string | undefined): string {
        return String(tableName || '').trim().toLowerCase()
    }

    private normalizeLogAction(action: string | undefined): string {
        return String(action || '').trim().toLowerCase()
    }

    private getGuestTimelinePriority(action: string, tableName: string, description: string | null): number {
        let priority = description ? 10 : 0

        if (tableName === 'food_counter' && action === 'scanned code') {
            priority += 30
        }

        if (tableName === 'guest' && action === 'updatelasttagusage') {
            priority += 5
        }

        return priority
    }

    private getGuestTimelineTimestampKey(timestamp: string | null): string {
        if (!timestamp) {
            return ''
        }

        const date = new Date(timestamp)
        if (Number.isNaN(date.getTime())) {
            return ''
        }

        return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}-${date.getHours()}-${date.getMinutes()}-${date.getSeconds()}`
    }

    /**
     * Create new Guest
     */
    create() {
        this.guestForm.reset(this.initialFormValues)
        this.currentIdCardUrl = null
        this.showUploadBlock = false
        this.guestReservations = []
        this.applyConferenceRules(null)

        // Store original values for Cancel (create mode)
        this.originalFormValues = this.guestForm.getRawValue()

        this.sidebar = true
    }

    /**
     * Edit the Guest
     * @param guest
     */
    edit(guest: Guest) {
        this.guestForm.reset(this.initialFormValues)
        this.currentIdCardUrl = guest.idcard ? `${this.apiURL}/guest/idcard/${guest.id}` : null
        this.showUploadBlock = false
        if (this.currentIdCardUrl) {
            this.getIdCardImage(guest)
        }

        // Guest room reservation
        this.guestReservations = guest.reservations ?? []

        this.sidebar = true

        // Get guest conference details
        let selectedConf: any = null
        if (guest.conferenceid) {
            selectedConf = this.conferenceSelector.conferences.find(conf => conf.id === guest.conferenceid)
        } else if (guest.conferenceName) {
            // If conferenceid is null, search by conferenceName
            selectedConf = this.conferenceSelector.conferences.find(conf => conf.name === guest.conferenceName)
        }

        guest.conference = selectedConf ? [selectedConf] : []
        const guestFormValue: Guest = {
            ...guest,
            payment: this.resolvePaymentMethodId(guest)
        }

        if (selectedConf) {
            this.applyConferenceRules(selectedConf)

            // Because side bar is not visible yet, we need to wait a bit
            setTimeout(() => {
                this.guestForm.patchValue(guestFormValue)
                this.applyConferenceRules(this.guestConference ?? selectedConf)
                this.normalizeRoomMateControlValue()
                this.updateIdCardVisibility()
                this.updateBabyBedVisibility()

                // Store original values for Cancel (edit mode)
                this.originalFormValues = this.guestForm.getRawValue()
            })

            // Set arrival and departure date limitations
            this.beginDate = selectedConf?.beginDate ? parseDateOnly(selectedConf.beginDate) ?? undefined : undefined
            this.endDate = selectedConf?.endDate ? parseDateOnly(selectedConf.endDate) ?? undefined : undefined
            this.guestConference = selectedConf

            this.getEarliestFirstMeal()
            this.getLatestFirstMeal()
            this.getEarliestLastMeal()
            this.getLatestLastMeal()
            this.cdRef.detectChanges()
        } else {
            console.warn('No conference found for guest:', guest);
        }
    }

    private resolvePaymentMethodId(guest: Guest): number | null {
        const candidates = [
            guest?.payment,
            guest?.paymentName,
            guest?.paymentMethodName
        ]

        for (const candidate of candidates) {
            const normalized = this.normalizePaymentMethodValue(candidate)
            if (normalized != null) {
                return normalized
            }
        }

        return null
    }

    private normalizePaymentMethodValue(value: unknown): number | null {
        if (typeof value === 'number' && Number.isFinite(value)) {
            return value
        }

        if (typeof value !== 'string') {
            return null
        }

        const trimmed = value.trim()
        if (!trimmed) {
            return null
        }

        const numericValue = Number(trimmed)
        if (Number.isFinite(numericValue)) {
            return numericValue
        }

        const normalized = trimmed
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, ' ')
            .trim()

        if (normalized === 'banki atutalas' || normalized === 'bank transfer') {
            return 1
        }

        if (normalized === 'szep kartya' || normalized === 'szep card') {
            return 2
        }

        if (normalized === 'keszpenz' || normalized === 'cash') {
            return 3
        }

        return null
    }

    private getSelectedConference(value: unknown): Conference | null {
        const conferences = Array.isArray(value) ? value : []
        return conferences.length > 0 ? conferences[0] as Conference : null
    }

    private loadConferenceDetails(selectedConference: Conference | null): void {
        const conferenceId = Number(selectedConference?.id)
        if (!Number.isFinite(conferenceId) || conferenceId <= 0) {
            return
        }

        this.conferenceService.getById(conferenceId).subscribe({
            next: (response: any) => {
                const currentSelectedConferenceId = Number(this.getSelectedConference(this.conference?.value)?.id)
                if (currentSelectedConferenceId !== conferenceId) {
                    return
                }

                const detailedConference = this.normalizeConferenceFromResponse(
                    response,
                    selectedConference as Conference,
                )

                this.applyConferenceRules(detailedConference)
            },
        })
    }

    private normalizeConferenceFromResponse(
        response: any,
        fallbackConference: Conference,
    ): Conference {
        if (response && typeof response === 'object') {
            if (
                response.rows &&
                Array.isArray(response.rows) &&
                response.rows.length > 0
            ) {
                return {
                    ...fallbackConference,
                    ...response.rows[0],
                }
            }

            if (response.row && typeof response.row === 'object') {
                return {
                    ...fallbackConference,
                    ...response.row,
                }
            }

            return {
                ...fallbackConference,
                ...response,
            }
        }

        return { ...fallbackConference }
    }

    private applyConferenceRules(selectedConference: Conference | null): void {
        this.guestConference = selectedConference
        this.beginDate = selectedConference?.beginDate
            ? parseDateOnly(selectedConference.beginDate) ?? undefined
            : undefined
        this.endDate = selectedConference?.endDate
            ? parseDateOnly(selectedConference.endDate) ?? undefined
            : undefined
        this.allowedPaymentMethodIds = selectedConference
            ? this.extractPaymentMethodIds(selectedConference)
            : undefined
        this.allowedConferenceRoomTypeIds = selectedConference
            ? resolveConferenceFormAllowedRoomTypeIds(selectedConference)
            : undefined

        this.updateConferenceScopedValidators()
        this.applyConferenceDateBoundsValidators()
        this.sanitizeConferenceScopedSelections()
        this.updateIdCardVisibility()
        this.updateBabyBedVisibility()
        this.cdRef.detectChanges()
    }

    private updateConferenceScopedValidators(): void {
        if (this.hasSelectedConference) {
            this.email?.setValidators([
                Validators.required,
                emailDomainValidator(),
            ])
            this.telephone?.setValidators([Validators.required])
            if (this.isVisitorSelection) {
                this.roomType?.clearValidators()
            } else {
                this.roomType?.setValidators([Validators.required])
            }
            this.payment?.setValidators([Validators.required])
        } else {
            this.email?.setValidators([Validators.email])
            this.telephone?.clearValidators()
            this.roomType?.clearValidators()
            this.payment?.clearValidators()
        }

        this.email?.updateValueAndValidity({ emitEvent: false })
        this.telephone?.updateValueAndValidity({ emitEvent: false })
        this.roomType?.updateValueAndValidity({ emitEvent: false })
        this.payment?.updateValueAndValidity({ emitEvent: false })
    }

    private applyVisitorAccommodationState(): void {
        const roomTypeControl = this.roomType
        const roomMateControl = this.roomMate

        if (this.isVisitorSelection) {
            if (roomTypeControl && !isNoAccommodationRoomTypeValue(roomTypeControl.value)) {
                roomTypeControl.setValue(NO_ACCOMMODATION_ROOM_TYPE_VALUE, { emitEvent: false })
            }

            roomMateControl?.reset(null, { emitEvent: false })
            roomMateControl?.disable({ emitEvent: false })

            this.babyBed?.clearValidators()
            this.babyBed?.setValue(null, { emitEvent: false })
            this.babyBed?.disable({ emitEvent: false })
        } else if (this.isRoomSelectionRequiringAccommodation(roomTypeControl?.value)) {
            roomMateControl?.enable({ emitEvent: false })
        } else {
            roomMateControl?.disable({ emitEvent: false })
        }

        this.updateConferenceScopedValidators()
        this.updateIdCardVisibility()
        this.updateBabyBedVisibility()
    }

    private applyConferenceDateBoundsValidators(): void {
        const conferenceDateValidators = this.hasSelectedConference
            ? [Validators.required, dateBoundsValidator(this.beginDate, this.endDate)]
            : [Validators.required]

        this.dateOfArrival?.setValidators(conferenceDateValidators)
        this.dateOfDeparture?.setValidators(conferenceDateValidators)
        this.dateOfArrival?.updateValueAndValidity({ emitEvent: false })
        this.dateOfDeparture?.updateValueAndValidity({ emitEvent: false })
        this.guestForm.updateValueAndValidity({ emitEvent: false })
    }

    private sanitizeConferenceScopedSelections(): void {
        const paymentCtrl = this.guestForm.get('payment')
        const roomTypeCtrl = this.guestForm.get('roomType')

        if (
            paymentCtrl &&
            Array.isArray(this.allowedPaymentMethodIds) &&
            this.allowedPaymentMethodIds.length > 0
        ) {
            const currentPayment = Number(paymentCtrl.value)
            if (
                Number.isFinite(currentPayment) &&
                !this.allowedPaymentMethodIds.includes(currentPayment)
            ) {
                paymentCtrl.setValue(null, { emitEvent: false })
            }
        }

        if (
            roomTypeCtrl &&
            Array.isArray(this.allowedConferenceRoomTypeIds)
        ) {
            const availableValues = new Set(
                this.allowedConferenceRoomTypeIds
                    .map((value) => Number(value))
                    .filter((value) => Number.isFinite(value)),
            )

            const currentRoomTypeId = this.resolveRoomTypeId(roomTypeCtrl.value)
            if (
                this.isRoomSelectionRequiringAccommodation(roomTypeCtrl.value) &&
                (
                    currentRoomTypeId === null ||
                    !availableValues.has(currentRoomTypeId)
                )
            ) {
                roomTypeCtrl.setValue(null, { emitEvent: false })
            }
        }
    }

    private resolveRoomTypeId(value: unknown): number | null {
        if (!value || isNoAccommodationRoomTypeValue(value)) {
            return null
        }

        const numericValue = Number(value)
        if (Number.isFinite(numericValue) && numericValue > 0) {
            return numericValue
        }

        const normalizedValue = this.normalizeRoomTypeComparisonValue(value)
        const guestConference = this.guestConference
        const selectedConferenceRoomTypes: any[] =
            guestConference && Array.isArray(guestConference.roomTypes)
                ? guestConference.roomTypes
                : []
        const matchedRoomType = selectedConferenceRoomTypes.find(
            (roomType: any) =>
                this.normalizeRoomTypeComparisonValue(roomType?.name) === normalizedValue
        )

        if (matchedRoomType) {
            const roomTypeId = Number((matchedRoomType as any)?.id)
            return Number.isFinite(roomTypeId) ? roomTypeId : null
        }

        const fallbackOption = getRoomTypeOptions({
            instant: (key: string) => key,
        }).find(
            (roomTypeOption) =>
                this.normalizeRoomTypeComparisonValue(roomTypeOption.value) === normalizedValue,
        )

        return fallbackOption?.id ?? null
    }

    private normalizeRoomTypeComparisonValue(value: unknown): string {
        return String(value ?? '')
            .trim()
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
    }

    /**
     * Delete the Guest
     */
    delete() {
        if (!this.tableItem) return
        this.loading = true
        this.deleteDialog = false
        this.guestService.delete(this.tableItem)
        setTimeout(() => this.doQuery(), 200)
    }

    /**
     * Delete selected Guests
     */
    deleteSelected() {
        this.loading = true
        this.bulkDeleteDialog = false
        this.guestService.bulkdelete(this.selected)
        setTimeout(() => this.doQuery(), 200)
    }

    hideDialog() {
        this.guestDialog = false
    }

    hideTagDialog() {
        this.tagDialog = false
    }

    hideFiltersDialog() {
        this.filtersDialog = false
    }

    /**
     * Saving the form
     */
    save() {
        this.commitPendingRoomMateDraft()
        this.guestForm.markAllAsTouched()

        if (!this.guestForm.valid) {
            this.messageService.add({
                severity: 'warn',
                summary: 'Hiányzó vagy hibás adat',
                detail: 'A mentéshez töltsd ki a kötelező mezőket.'
            })
            return
        }

        this.loading = true
        const formValues = { ...this.guestForm.getRawValue() }

        const rawIdCard = this.guestForm.get('idCard')?.value
        const idCardFile = this.extractIdCardFile(rawIdCard)
        const files: File[] = idCardFile ? [idCardFile] : []

        formValues.birthDate = formatDateYmd(formValues.birthDate)
        formValues.dateOfArrival = formatDateYmd(formValues.dateOfArrival)
        formValues.dateOfDeparture = formatDateYmd(formValues.dateOfDeparture)

        if (Array.isArray(formValues.roomMate)) {
            formValues.roomMate = this.normalizeRoomMateEntries(formValues.roomMate).join(', ')
        }

        delete formValues.idCard

        // CREATE
        if (!formValues.id) {
            this.guestService.create(formValues, files)
            this.sidebar = false
        }
        // UPDATE
        else {
            this.guestService.update$(formValues, files).subscribe({
                next: (updatedGuest) => {
                    this.replaceGuestRow(updatedGuest)
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Sikeres mentés',
                        detail: 'A vendég adatai frissültek.'
                    })
                    this.sidebar = false
                    this.loading = false
                },
                error: (error) => {
                    this.loading = false
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Mentési hiba',
                        detail: error?.error?.message || 'A vendég mentése nem sikerült.'
                    })
                }
            })
            return
        }
    }

    /**
     * Cancel saving the form
     */
    cancel() {
        // Fallback to initial values if original is missing for any reason
        this.guestForm.reset(this.originalFormValues ?? this.initialFormValues)
        this.applyConferenceRules(this.getSelectedConference(this.conference?.value))
        this.normalizeRoomMateControlValue()
    }

    /**
     * Clear Dialog Filters Form
     */
    clearDialogFilters() {
        this.dialogFiltersForm.reset()

        // Empty filters
        this.filterValues['firstName'] = ''
        this.filterValues['lastName'] = ''
        this.filterValues['gender'] = ''
        this.filterValues['birthDate'] = ''
        this.filterValues['nationality'] = ''
        this.filterValues['country'] = ''
        this.filterValues['zipCode'] = ''
        this.filterValues['email'] = ''
        this.filterValues['telephone'] = ''
        this.filterValues['firstMeal'] = ''
        this.filterValues['lastMeal'] = ''
        this.filterValues['babyBed'] = ''
        this.filterValues['roomType'] = ''
        this.filterValues['payment'] = ''
        this.filterValues['prepaid'] = ''
        this.filterValues['roomMate'] = ''
        this.filterValues['roomKeyIssued'] = ''
        this.filterValues['emailStatus'] = ''

        this.doQuery()
    }

    retryGuestEmail(guest: Guest) {
        if (!guest?.id || this.isRetryingGuestEmail(guest) || !this.canRetryGuestEmail(guest)) return

        this.retryingEmailGuestIds[guest.id] = true
        this.guestService.retryEmail(guest.id).subscribe({
            next: (response) => {
                if (response?.guest) {
                    this.replaceGuestRow(response.guest)
                }
                this.messageService.add({
                    severity: 'success',
                    summary: 'E-mail',
                    detail: response?.email?.status === 'skipped'
                        ? 'A visszaigazoló e-mail nem került elküldésre.'
                        : 'A visszaigazoló e-mail újra küldésre vár.'
                })
            },
            error: (error) => {
                delete this.retryingEmailGuestIds[guest.id!]
                this.messageService.add({
                    severity: 'error',
                    summary: 'E-mail',
                    detail: error?.error?.message || 'A visszaigazoló e-mail újraküldése sikertelen.'
                })
            },
            complete: () => {
                delete this.retryingEmailGuestIds[guest.id!]
            }
        })
    }

    private normalizeGuestRow(guest: any): Guest {
        const normalizedAnswers =
            Array.isArray(guest.answers)
                ? guest.answers.map((answer: any) => ({
                    ...answer,
                    translations: Array.isArray(answer.translations)
                        ? answer.translations
                        : answer.translations
                            ? [answer.translations]
                            : []
                }))
                : guest.answers
                    ? [{
                        ...guest.answers,
                        translations: Array.isArray(guest.answers.translations)
                            ? guest.answers.translations
                            : guest.answers.translations
                                ? [guest.answers.translations]
                                : []
                    }]
                    : []

        const reservations = Array.isArray(guest.reservations) ? guest.reservations : []
        const actualReservation = this.pickActualReservation({ ...guest, reservations })
        const computedRoomNum =
            actualReservation?.room?.roomNum ??
            guest.displayRoomNum ??
            guest.roomNum ??
            null

        return {
            ...guest,
            answers: normalizedAnswers,
            reservations,
            actualReservation,
            displayRoomNum: computedRoomNum,
            roomNum: computedRoomNum
        }
    }

    private replaceGuestRow(guest: Guest) {
        const normalizedGuest = this.normalizeGuestRow(guest)
        const guestIndex = this.findIndexById(normalizedGuest.id)
        if (guestIndex === -1) {
            this.doQuery()
            return
        }

        const nextRows = [...this.tableData]
        nextRows[guestIndex] = normalizedGuest
        this.tableData = nextRows
        this.syncAppliedGuestViewFingerprintFromCurrentState()
    }

    findIndexById(id: number | undefined): number {
        let index = -1;
        for (let i = 0; i < this.tableData.length; i++) {
            if (this.tableData[i].id === id) {
                index = i;
                break;
            }
        }

        return index;
    }

    assignTag(guest: any) {
        // Empty previous scanned codes
        this.scanTemp = '';
        this.scannedCode = this.guest?.rfid || '';
        this.guest = { ...guest };
        this.messages = [
            { severity: 'info', summary: '', detail: 'Tartsa a ' + guest.diet + ' étrendhez tartozó NFC címkét az olvasóhoz...' },
        ]
        this.tagDialog = true;
    }

    unAssignTag() {
        // guard: ha nincs kiválasztott vendég, nincs teendő
        const g = this.guest
        if (!g) return

        // 1) backend update – csak azt küldjük, ami változik
        const payload: Pick<Guest, 'id'> & Partial<Guest> = {
            id: g.id,
            rfid: null,
            lastRfidUsage: null
        };
        this.guestService.update(payload)

        // Refresh local state (immutable)
        const idx = this.findIndexById(g.id);
        if (idx !== -1) {
            const updated: Guest = { ...g, rfid: null, lastRfidUsage: null };
            this.tableData = [
                ...this.tableData.slice(0, idx),
                updated,
                ...this.tableData.slice(idx + 1)
            ];
            this.guest = updated;
            this.syncAppliedGuestViewFingerprintFromCurrentState()
        }

        // UI feedback
        this.successfulMessage = [{
            severity: 'success',
            summary: '',
            detail: 'A címkét eltávolítottuk a vendégtől!'
        }];

        this.totalTaggedGuests--;
        this.syncAppliedGuestViewFingerprintFromCurrentState()
        setTimeout(() => {
            this.tagDialog = false
        }, 200)

        // Logging
        const name = `${g.lastName ?? ''} ${g.firstName ?? ''}`.trim()
        const tagIdentifier = String(g.rfid || '').trim()
        const unassignLogText = tagIdentifier
            ? `Unassign Tag ${tagIdentifier} from ${name || 'ismeretlen vendég'}`
            : `Unassign Tag from ${name || 'ismeretlen vendég'}`
        this.logService.create({
            action_type: "unassign",
            table_name: "guest",
            guestid: g.id,
            original_data: unassignLogText
        })
        this.invalidateGuestTimeline(g.id)
    }


    openRoomKeyDialog(guest: Guest) {
        if (!this.canManageRoomKey) return
        this.guest = { ...guest }
        this.roomKeyDialog = true
    }

    hideRoomKeyDialog() {
        this.roomKeyDialog = false
    }

    getRoomKeyIconClass(guest: Guest): string {
        if (guest.roomKeyReturnedAt) {
            return 'pi pi-check-circle text-green-500'
        }

        if (guest.roomKeyIssued || guest.roomKeyIssuedAt) {
            return 'pi pi-key text-orange-500'
        }

        return 'pi pi-key text-500'
    }

    isRoomKeyCurrentlyIssued(guest: Partial<Guest> | null | undefined): boolean {
        if (!guest) return false
        return !!(guest.roomKeyIssued || guest.roomKeyIssuedAt) && !guest.roomKeyReturnedAt
    }

    canIssueRoomKey(guest: Partial<Guest> | null | undefined): boolean {
        return this.canManageRoomKey && !!guest && !this.isRoomKeyCurrentlyIssued(guest)
    }

    canReturnRoomKey(guest: Partial<Guest> | null | undefined): boolean {
        return this.canManageRoomKey && !!guest && this.isRoomKeyCurrentlyIssued(guest)
    }

    getRoomKeyActionHint(guest: Partial<Guest> | null | undefined): string {
        if (!guest) return 'Nincs kiválasztott vendég.'

        if (this.canReturnRoomKey(guest)) {
            return 'A kulcs jelenleg ki van adva, visszavehető.'
        }

        return 'A kulcs jelenleg nincs kiadva, kiadható.'
    }

    private updateRoomKeyStateLocally(nextFields: Partial<Guest>): void {
        if (!this.guest?.id) return

        const updatedGuest: Guest = { ...this.guest, ...nextFields }
        const idx = this.findIndexById(updatedGuest.id)
        if (idx !== -1) {
            this.tableData = [
                ...this.tableData.slice(0, idx),
                updatedGuest,
                ...this.tableData.slice(idx + 1)
            ]
            this.syncAppliedGuestViewFingerprintFromCurrentState()
        }
        this.guest = updatedGuest
    }

    issueRoomKey() {
        if (!this.guest?.id) return

        this.guestService.issueRoomKey(this.guest.id).subscribe({
            next: (updatedGuest: Partial<Guest>) => {
                this.updateRoomKeyStateLocally({
                    roomKeyIssued: updatedGuest?.roomKeyIssued ?? true,
                    roomKeyIssuedAt: updatedGuest?.roomKeyIssuedAt || this.guest?.roomKeyIssuedAt || new Date().toISOString(),
                    roomKeyReturnedAt: updatedGuest?.roomKeyReturnedAt ?? null,
                    roomKeyIssuedByUserId: updatedGuest?.roomKeyIssuedByUserId ?? null,
                    roomKeyIssuedByUserName: updatedGuest?.roomKeyIssuedByUserName ?? null,
                    roomKeyReturnedByUserId: updatedGuest?.roomKeyReturnedByUserId ?? null,
                    roomKeyReturnedByUserName: updatedGuest?.roomKeyReturnedByUserName ?? null
                })
                this.messageService.add({ severity: 'success', summary: 'Szobakulcs kiadva' })
                this.doQuery()
            },
            error: (error: any) => {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Hiba',
                    detail: error?.error?.message || 'A szobakulcs kiadása nem sikerült.'
                })
            }
        })
    }

    returnRoomKey() {
        if (!this.guest?.id) return

        this.confirmationService.confirm({
            message: 'Biztosan visszaveszi a szobakulcsot?',
            header: 'Megerősítés',
            icon: 'pi pi-exclamation-triangle',
            acceptLabel: 'Igen',
            rejectLabel: 'Nem',
            acceptIcon: 'pi pi-check mr-2',
            rejectIcon: 'pi pi-times mr-2',
            acceptButtonStyleClass: 'p-button',
            rejectButtonStyleClass: 'p-button-outlined',
            accept: () => {
                this.guestService.returnRoomKey(this.guest!.id!).subscribe({
                    next: (updatedGuest: Partial<Guest>) => {
                        this.updateRoomKeyStateLocally({
                            roomKeyIssued: updatedGuest?.roomKeyIssued ?? false,
                            roomKeyIssuedAt: updatedGuest?.roomKeyIssuedAt || this.guest?.roomKeyIssuedAt || null,
                            roomKeyReturnedAt: updatedGuest?.roomKeyReturnedAt || new Date().toISOString(),
                            roomKeyIssuedByUserId: updatedGuest?.roomKeyIssuedByUserId ?? this.guest?.roomKeyIssuedByUserId ?? null,
                            roomKeyIssuedByUserName: updatedGuest?.roomKeyIssuedByUserName ?? this.guest?.roomKeyIssuedByUserName ?? null,
                            roomKeyReturnedByUserId: updatedGuest?.roomKeyReturnedByUserId ?? null,
                            roomKeyReturnedByUserName: updatedGuest?.roomKeyReturnedByUserName ?? null
                        })
                        this.messageService.add({ severity: 'success', summary: 'Szobakulcs visszavéve' })
                        this.doQuery()
                    },
                    error: (error: any) => {
                        this.messageService.add({
                            severity: 'error',
                            summary: 'Hiba',
                            detail: error?.error?.message || 'A szobakulcs visszavétele nem sikerült.'
                        })
                    }
                })
            }
        })
    }

    saveTag() {
        if (!this.scannedCode) return;

        // Check if RFID is according to the diet
        this.tagService.getByRFID(this.scannedCode).subscribe({
            next: (data) => {
                if (data.rows && data.rows.length > 0) {
                    // Check if tag color is the same as the guest diet color
                    let tagColor = data.rows[0].color
                    let guestDietColor = this.diets.find(d => d.name === this.guest?.diet)?.color

                    if (tagColor === 'gray') {
                        tagColor = 'black'
                    }

                    if (tagColor === 'green') {
                        tagColor = 'teal'
                    }

                    // Wrong color
                    if (guestDietColor !== tagColor) {
                        this.messages = [
                            { severity: 'error', summary: '', detail: 'Nem megfelelő a karszalag színe!' }
                        ]
                        this.identifierElement.nativeElement.focus()
                        return
                    }

                    // Right color, check if somebody has the same RFID
                    this.guestService.getByRFID(this.scannedCode).subscribe({
                        next: (data) => {
                            // If there is data, then somebody is using this RFID
                            this.messages = [
                                {
                                    severity: 'error',
                                    summary: '',
                                    detail: `${data.lastName} ${data.firstName} már használja a karszalagot!`
                                }
                            ];
                            // Logging
                            this.logService.create({
                                action_type: 'tag duplicate',
                                table_name: 'guest',
                                guestid: this.guest?.id,
                                original_data: `Tag duplicate: ${data.rfid} is used by ${data.lastName} ${data.firstName}`
                            })
                        },
                        error: () => {
                            // RFID is free, proceed with update
                            const updateData = {
                                id: this.guest?.id,
                                rfid: this.scannedCode
                            }

                            this.guestService.updateGuest2(updateData).subscribe({
                                next: () => {
                                    // Update local table data
                                    let guestsClone = JSON.parse(JSON.stringify(this.tableData))
                                    const guestIndex = this.findIndexById(this.guest?.id);
                                    guestsClone[guestIndex] = { ...guestsClone[guestIndex], rfid: this.scannedCode }
                                    this.tableData = guestsClone

                                    this.successfulMessage = [
                                        {
                                            severity: 'success',
                                            summary: '',
                                            detail: 'Sikeresen hozzárendelte a címkét a vendéghez!'
                                        }
                                    ]
                                    this.totalTaggedGuests++
                                    this.syncAppliedGuestViewFingerprintFromCurrentState()
                                    setTimeout(() => {
                                        this.tagDialog = false
                                    }, 200)

                                    // Logging
                                    this.logService.create({
                                        action_type: 'assign Tag',
                                        table_name: 'guest',
                                        guestid: this.guest?.id,
                                        original_data: `Assign Tag ${this.scannedCode} to ${this.guest?.lastName} ${this.guest?.firstName}`
                                    })
                                    this.invalidateGuestTimeline(this.guest?.id)

                                    this.scannedCode = ''
                                    this.guest = null
                                },
                                error: (error) => {
                                    console.error('Hiba az RFID frissítése közben:', error)
                                    this.messages = [
                                        {
                                            severity: 'error',
                                            summary: '',
                                            detail: 'Hiba történt a címke hozzárendelése során!'
                                        }
                                    ]
                                }
                            })
                        }
                    })
                }
            },
            error: (error) => {
                console.error('tagService.getByRFID error:', error)
                this.messages = [
                    {
                        severity: 'error',
                        summary: '',
                        detail: 'Hiba történt a címke ellenőrzése során!'
                    }
                ]
            }
        })
    }

    /**
     * An event indicating that the request was sent to the server.
     * Useful when a request may be retried multiple times,
     * to distinguish between retries on the final event stream.
     * @param event
     */
    onSend(event: FileSendEvent) {
        this.loading = true
    }

    /**
     * Callback to invoke on upload error.
     * @param event
     */
    onExcelUploadError(event: FileUploadErrorEvent, fileUpload: FileUpload) {
        this.loading = false
        this.messageService.add({
            severity: 'error',
            summary: 'Hibás Excel!',
            detail: 'Kérlek próbáld a megfelelő Excelt importálni',
            life: 3000
        })

        // Clear wrong files from the uploading list
        fileUpload.clear()

        // Logging
        this.logService.create({
            action_type: "import",
            table_name: "guest",
            original_data: "Error while importing Excel | File: " + event.files[0].name + ", Size: " + event.files[0].size,
            status: 500,
        })
    }

    /**
     * Callback to invoke when file upload is complete.
     * @param event
     */
    onExcelUpload(event: any) {  // Files were missing from UploadEvent, although they are included
        this.loading = false
        this.doQuery()
        this.messageService.add({
            severity: 'success',
            summary: '',
            detail: 'Sikeres vendég importálás',
            life: 3000
        })

        // Logging
        this.logService.create({
            action_type: "import",
            table_name: "guest",
            original_data: event.files[0].name,
        })
    }

    onFileSelected(event: any): void {
        this.selectedFile = event.target.files[0]
    }

    getIdCardImage(guest: Guest) {
        const id = guest.id;
        if (!id || !guest.idcard) return;
        if (this.idCardImageUrls[id]) return;

        this.loadingIdCard[id] = true;

        const cleanedIdCardName = guest.idcard.toString().trim().replace(/,+$/, '');

        this.http.get(this.apiURL + '/guest/idcardimage/' + cleanedIdCardName, { responseType: 'blob' })
            .subscribe({
                next: (blob) => {
                    this.idCardImageUrls[id] = window.URL.createObjectURL(blob);
                    this.loadingIdCard[id] = false;
                },
                error: () => {
                    this.idCardImageUrls[id] = '';
                    this.loadingIdCard[id] = false;
                }
            });
    }

    downloadIdCardFromUrl(url: string, fileName: string) {
        // Ha az URL böngészőben jelenik meg (ObjectURL), blobként kell letölteni
        fetch(url)
            .then(response => response.blob())
            .then(blob => {
                const a = document.createElement('a')
                a.href = window.URL.createObjectURL(blob)
                // Alapértelmezett fájlnév az idcard, vagy pl. "igazolvany.jpg"
                a.download = fileName?.replace(/,+$/, '') || 'igazolvany.jpg'
                document.body.appendChild(a)
                a.click()
                document.body.removeChild(a)
            })
    }

    onIdCardFileSelected(event: any) {
        const file: File = event.target.files[0]
        if (file) {
            const reader = new FileReader()
            reader.onload = (e: any) => {
                this.currentIdCardUrl = e.target.result
            }
            reader.readAsDataURL(file)

            this.guestForm.get('idCard')?.setValue(file)
        }
    }

    getIdCardURL(idCardName: string) {
        if (!idCardName) return undefined

        // TODO: Use array instead of commas...
        const cleanedIdCardName = idCardName.endsWith(',') ? idCardName.slice(0, -1) : idCardName

        this.http.get(this.apiURL + '/guest/idcardimage/' + cleanedIdCardName, { responseType: 'blob' }).subscribe((blob) => {
            this.imageUrl = window.URL.createObjectURL(blob)
            return this.imageUrl
        })
    }

    downloadIdCard(idCardName: string) {
        if (!idCardName) return

        // TODO: Use array instead of commas...
        const cleanedIdCardName = idCardName.endsWith(',') ? idCardName.slice(0, -1) : idCardName

        this.http.get(this.apiURL + '/guest/idcardimage/' + cleanedIdCardName, { responseType: 'blob' }).subscribe((blob) => {
            const downloadUrl = window.URL.createObjectURL(blob)
            const a = document.createElement('a')
            a.href = downloadUrl
            a.download = cleanedIdCardName
            document.body.appendChild(a)
            a.click()
            document.body.removeChild(a)
        })
    }

    deleteIdCard() {
        const guestId = this.guestForm.get('id')?.value;
        this.http.delete(`${this.apiURL}/guest/idcard/${guestId}`).subscribe({
            next: () => {
                this.currentIdCardUrl = null;
                this.guestForm.get('idCard')?.setValue(null);
                this.updateIdCardVisibility()
                this.messageService.add({
                    severity: 'success',
                    summary: '',
                    detail: 'Sikeres igazolvány törlés',
                    life: 3000
                });
            },
            error: (err) => {
                // Ha a szerver küld message-t, azt jelenítsük meg
                const detail = err?.error?.message || 'Ismeretlen hiba történt az igazolvány törlésekor';
                this.messageService.add({
                    severity: 'error',
                    summary: 'Hiba',
                    detail,
                    life: 6000
                });
            }
        });
    }

    private updateIdCardVisibility(): void {
        const idCardControl = this.guestForm.get('idCard')
        if (!idCardControl) {
            return
        }

        const birthDate = this.guestForm.get('birthDate')?.value
        const age = calculateAgeYears(birthDate)
        const shouldRequireIdCard =
            this.hasSelectedConference &&
            this.needsRoom &&
            age >= 14

        this.showIdCardField = shouldRequireIdCard

        if (shouldRequireIdCard) {
            idCardControl.enable({ emitEvent: false })
            idCardControl.setValidators([
                this.idCardPresenceValidator.bind(this),
                this.idCardMaxFileSizeValidator.bind(this),
            ])
        } else {
            idCardControl.clearValidators()
            idCardControl.setValue(null, { emitEvent: false })
            idCardControl.disable({ emitEvent: false })
        }

        idCardControl.updateValueAndValidity({ emitEvent: false })
    }

    private idCardPresenceValidator(control: AbstractControl): ValidationErrors | null {
        if (this.currentIdCardUrl) {
            return null
        }

        return this.extractIdCardFile(control.value) ? null : { required: true }
    }

    private idCardMaxFileSizeValidator(control: AbstractControl): ValidationErrors | null {
        const file = this.extractIdCardFile(control.value)
        if (!file) {
            return null
        }

        return file.size <= this.idCardMaxFileSizeBytes
            ? null
            : {
                maxFileSize: {
                    max: this.idCardMaxFileSizeBytes,
                    actual: file.size,
                },
            }
    }

    private extractIdCardFile(value: unknown): File | null {
        if (value instanceof File) {
            return value
        }

        if (Array.isArray(value)) {
            for (const item of value) {
                const file = this.extractIdCardFile(item)
                if (file) {
                    return file
                }
            }
        }

        if (value && typeof value === 'object') {
            const candidate = value as { file?: unknown; files?: unknown }

            if (candidate.file instanceof File) {
                return candidate.file
            }

            if (Array.isArray(candidate.files)) {
                return this.extractIdCardFile(candidate.files)
            }
        }

        return null
    }

    private isRoomSelectionRequiringAccommodation(value: unknown): boolean {
        if (value === null || value === undefined || value === '') {
            return false
        }

        return !isNoAccommodationRoomTypeValue(value)
    }

    private isBabyBedEligibleByBirthDate(): boolean {
        const birthDateValue = this.guestForm.get('birthDate')?.value
        if (!birthDateValue) {
            return false
        }

        const ageYears = calculateAgeYears(birthDateValue)
        return ageYears >= 0 && ageYears <= 3
    }

    private updateBabyBedVisibility(): void {
        const babyBedControl = this.guestForm.get('babyBed')
        if (!babyBedControl) {
            return
        }

        const canAskForBabyBed =
            this.hasSelectedConference &&
            this.needsRoom &&
            this.isBabyBedEligibleByBirthDate()
        this.showBabyBedField = canAskForBabyBed

        if (canAskForBabyBed) {
            babyBedControl.enable({ emitEvent: false })
            babyBedControl.setValidators([Validators.required])

            if (
                babyBedControl.value === null ||
                babyBedControl.value === '' ||
                babyBedControl.value === undefined
            ) {
                babyBedControl.setValue('0', { emitEvent: false })
            }
        } else {
            babyBedControl.clearValidators()
            babyBedControl.setValue(null, { emitEvent: false })
            babyBedControl.disable({ emitEvent: false })
        }

        babyBedControl.updateValueAndValidity({ emitEvent: false })
    }

    private commitPendingRoomMateDraft(): void {
        const roomMateControl = this.roomMate
        if (!roomMateControl || roomMateControl.disabled) {
            return
        }

        const inputElement = this.getRoomMateInputElement()
        const pendingEntries = this.normalizeRoomMateEntries(inputElement?.value ?? '')

        if (pendingEntries.length === 0) {
            if (inputElement && inputElement.value) {
                inputElement.value = ''
            }
            return
        }

        const nextEntries = this.normalizeRoomMateEntries([
            ...(roomMateControl.value ?? []),
            ...pendingEntries,
        ])

        roomMateControl.setValue(nextEntries.length > 0 ? nextEntries : null)
        roomMateControl.markAsDirty()
        roomMateControl.markAsTouched()

        if (inputElement) {
            inputElement.value = ''
        }
    }

    private normalizeRoomMateControlValue(value = this.roomMate?.value): void {
        const roomMateControl = this.roomMate
        if (!roomMateControl) {
            return
        }

        const normalizedEntries = this.normalizeRoomMateEntries(value)
        const normalizedValue = normalizedEntries.length > 0 ? normalizedEntries : null

        if (this.areSameRoomMateValues(roomMateControl.value, normalizedValue)) {
            return
        }

        roomMateControl.setValue(normalizedValue, { emitEvent: false })
    }

    private normalizeRoomMateEntries(value: unknown): string[] {
        const rawEntries = Array.isArray(value) ? value : [value]
        const normalizedEntries: string[] = []
        const seenEntries = new Set<string>()

        rawEntries.forEach((entry) => {
            this.splitRoomMateEntries(entry).forEach((item) => {
                const dedupeKey = item.toLocaleLowerCase()
                if (seenEntries.has(dedupeKey)) {
                    return
                }

                seenEntries.add(dedupeKey)
                normalizedEntries.push(item)
            })
        })

        return normalizedEntries
    }

    private splitRoomMateEntries(value: unknown): string[] {
        if (value == null) {
            return []
        }

        return String(value)
            .split(/[,\n;]+/)
            .map((entry) => entry.replace(/\s+/g, ' ').trim())
            .filter((entry) => entry.length > 0)
    }

    private areSameRoomMateValues(
        currentValue: unknown,
        nextValue: string[] | null,
    ): boolean {
        const normalizedNext = nextValue ?? []

        if (currentValue == null) {
            return normalizedNext.length === 0
        }

        if (!Array.isArray(currentValue)) {
            return false
        }

        if (currentValue.length !== normalizedNext.length) {
            return false
        }

        return currentValue.every((entry, index) => entry === normalizedNext[index])
    }

    private getRoomMateInputElement(): HTMLInputElement | null {
        const chipsInput = this.roomMateChips?.inputViewChild as ElementRef<HTMLInputElement> | undefined
        return chipsInput?.nativeElement ?? null
    }

    private extractPaymentMethodIds(conf: any): number[] {
        if (!conf) {
            return []
        }

        if (Array.isArray(conf.paymentMethodIds)) {
            const ids = conf.paymentMethodIds
                .map((value: any) => Number(value))
                .filter((value: number) => Number.isFinite(value))

            return Array.from(new Set(ids))
        }

        if (Array.isArray(conf.paymentMethods)) {
            const ids = conf.paymentMethods
                .map((paymentMethod: any) => Number(paymentMethod?.id))
                .filter((value: number) => Number.isFinite(value))

            return Array.from(new Set(ids))
        }

        return []
    }

    hasDietName(dietName: string): boolean {
        return this.diets.some(diet => diet.name === dietName)
    }

    getAge(birthDate: string): string {
        if (!birthDate) return "";
        return calculateAgeYears(birthDate).toString()
    }

    getCountryCode(countryName: string): string | null {
        const country = this.countries.find(c =>
            c.name.toLowerCase() === countryName?.toLowerCase()
        )
        return country ? country.code?.toLowerCase() : null
    }

    getNationalityInHungarian(nationality: string): string | null {
        return this.countryService.getHuNationality(nationality)
    }

    getCountryNameInHungarian(code: string): string | null {
        return this.countryService.getHuCountryName(code)
    }

    /**
     * Returns the earliest first meal of the conference, if the date of arrival is on the first day of the conference.
     * Otherwise, returns undefined.
     * @returns The earliest first meal of the conference, or undefined.
     */
    getEarliestFirstMeal() {
        const dateOfArrival = this.guestForm.get('dateOfArrival')?.value
        const beginDate = this.beginDate

        // If dateOfArrival is on the first day of the conference, the earliest first meal is the first meal of the conference
        if (isSameDay(dateOfArrival, beginDate)) {
            return this.guestConference?.firstMeal
        }
        return undefined
    }

    /**
     * Returns the latest first meal of the conference, if the date of arrival is on the last day of the conference.
     * Otherwise, returns undefined.
     * @returns The latest first meal of the conference, or undefined.
     */
    getLatestFirstMeal() {
        const dateOfArrival = this.guestForm.get('dateOfArrival')?.value
        const endDate = this.endDate

        // If dateOfArrival is on the last day of the conference, the latest first meal is the last meal of the conference
        if (isSameDay(dateOfArrival, endDate)) {
            return this.guestConference?.lastMeal
        }
        return undefined
    }

    /**
     * Returns the earliest last meal of the conference, if the date of departure is on the first day of the conference.
     * Otherwise, returns undefined.
     * @returns The earliest last meal of the conference, or undefined.
     */
    getEarliestLastMeal() {
        const dateOfDeparture = this.guestForm.get('dateOfDeparture')?.value
        const beginDate = this.beginDate

        // If dateOfDeparture is on the first day of the conference, the earliest last meal is the first meal of the conference
        if (isSameDay(dateOfDeparture, beginDate)) {
            return this.guestConference?.firstMeal
        }
        return undefined
    }

    /**
     * Returns the latest last meal of the conference, if the date of departure is on the last day of the conference.
     * Otherwise, returns undefined.
     * @returns The latest last meal of the conference, or undefined.
     */
    getLatestLastMeal() {
        const dateOfDeparture = this.guestForm.get('dateOfDeparture')?.value
        const endDate = this.endDate

        // If dateOfDeparture is on the last day of the conference, the latest last meal is the last meal of the conference
        if (isSameDay(dateOfDeparture, endDate)) {
            return this.guestConference?.lastMeal
        }
        return undefined
    }

    /**
     * Handle the selection of conferences in the conference selector.
     * Updates the selected conferences and the table data.
     * @param selectedConferences 
     */
    onConferenceSelectionChange(selectedConferences: Conference[]): void {
        const nextSelectedConferences = selectedConferences || []
        const nextNoConferenceMode = this.isNoneConferenceSelected(nextSelectedConferences)
        const currentIds = (this.selectedConferences || []).map(conf => Number(conf?.id)).sort((a, b) => a - b)
        const nextIds = nextSelectedConferences.map(conf => Number(conf?.id)).sort((a, b) => a - b)
        const selectionChanged =
            currentIds.length !== nextIds.length ||
            currentIds.some((id, index) => id !== nextIds[index]) ||
            this.noConferenceMode !== nextNoConferenceMode

        this.selectedConferences = nextSelectedConferences
        this.noConferenceMode = nextNoConferenceMode

        // Do NOT push the sentinel text into query params
        // We control conference filtering via noConference / conferenceIds
        delete this.filterValues['conferenceName']

        this.recomputeCanEdit()

        if (!selectionChanged) {
            return
        }

        this.selectionChanges$.next(this.selectedConferences)
    }

    /**
     * Exports the currently selected table rows (or filtered rows, or all rows if no selection is made) to an Excel file.
     * The file is named "guests.xlsx" and is saved in the user's Downloads folder.
     * The export uses the xlsx library and is done asynchronously.
     * @export
     */
    exportExcel() {
        import("xlsx").then(xlsx => {
            const mapGuestRowForExport = (row: any): { [key: string]: any } => {
                const {
                    answers,
                    roomKeyIssuedByUserName,
                    roomKeyReturnedByUserName,
                    ...rest
                } = row || {}

                const baseRow: { [key: string]: any } = { ...rest }
                const issuedByUser = baseRow['roomKeyIssuedByUser']
                const returnedByUser = baseRow['roomKeyReturnedByUser']
                const paymentText = baseRow['paymentMethodName'] || baseRow['payment'] || null
                const exportedRoomNum = baseRow['is_visitor']
                    ? this.visitorLabel(baseRow as Guest)
                    : (baseRow['displayRoomNum'] ?? baseRow['roomNum'] ?? null)

                // roomKeyIssued is replaced by roomKeyStatus in export
                delete baseRow['id']
                delete baseRow['roomKeyIssued']
                delete baseRow['roomKeyIssuedAt']
                delete baseRow['roomKeyReturnedAt']
                delete baseRow['roomKeyIssuedByUserId']
                delete baseRow['roomKeyReturnedByUserId']
                delete baseRow['roomKeyIssuedByUser']
                delete baseRow['roomKeyReturnedByUser']
                delete baseRow['reservations']
                delete baseRow['actualReservation']
                delete baseRow['paymentMethodName']
                delete baseRow['displayRoomNum']
                baseRow['roomNum'] = exportedRoomNum

                const issuedByName = roomKeyIssuedByUserName ?? issuedByUser?.fullname ?? issuedByUser?.username ?? ''
                const returnedByName = roomKeyReturnedByUserName ?? returnedByUser?.fullname ?? returnedByUser?.username ?? ''

                const qnaColumns: { [key: string]: any } = {}
                let qaIndex = 1

                if (Array.isArray(answers)) {
                    answers.forEach(answer => {
                        if (Array.isArray(answer.translations)) {
                            answer.translations.forEach((translation: any) => {
                                const rawQuestion = translation.hu || ''
                                // Delete the parenthetical comment and the section that follows it
                                let questionText = rawQuestion.split('(')[0].trim();

                                // Add question mark at the end of the question
                                if (!questionText.endsWith('?')) {
                                    questionText += '?'
                                }
                                // The "answers" cell contains the answer
                                const answerText = translation.answers
                                qnaColumns[`question_${qaIndex}`] = questionText
                                qnaColumns[`answer_${qaIndex}`] = answerText
                                qaIndex++
                            })
                        }
                    })
                }

                return {
                    ...baseRow,
                    payment: paymentText,
                    roomKeyStatus: this.getRoomKeyStatusLabel(row),
                    roomKeyIssuedAt: row?.roomKeyIssuedAt ?? null,
                    roomKeyIssuedByUserName: issuedByName,
                    roomKeyReturnedAt: row?.roomKeyReturnedAt ?? null,
                    roomKeyReturnedByUserName: returnedByName,
                    ...qnaColumns
                } as { [key: string]: any }
            }

            let data = this.selected.map(mapGuestRowForExport)

            // If the selected array is empty, we work from the filtered or full dataset as a fallback
            if (data.length === 0) {
                console.warn("No rows selected for export. Exporting filtered or full data.")
                data = (this.table.filteredValue || this.tableData).map(mapGuestRowForExport)
            }

            // Find the maximum number of question/answer pairs in all rows
            let maxQA = 0
            data.forEach(row => {
                const qaCount = Object.keys(row).filter(key => key.startsWith('question_')).length
                if (qaCount > maxQA) {
                    maxQA = qaCount
                }
            })

            // For each row, we fill in the missing question/answer columns with an empty string so that the columns are identical in each row
            data = data.map(row => {
                const r = row as { [key: string]: any }
                for (let i = 1; i <= maxQA; i++) {
                    if (!r.hasOwnProperty(`question_${i}`)) {
                        r[`question_${i}`] = ''
                    }
                    if (!r.hasOwnProperty(`answer_${i}`)) {
                        r[`answer_${i}`] = ''
                    }
                }
                return r
            })

            // Delete unnecessary columns
            data.forEach((row: any) => {
                delete row.id
                delete row.is_test
                delete row.userid
                delete row.rfid_id
                delete row.diet_id
                delete row.room_id
                delete row.conferenceid
                delete row.dietDetails
                delete row.reservations
                delete row.actualReservation
                delete row.paymentMethodName
                delete row.accommodationExtra
                delete row.enabled
                delete row.idcardtype
                delete row.idcard
            })

            // Creating an Excel worksheet and file
            const worksheet = xlsx.utils.json_to_sheet(data)
            const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] }
            const excelBuffer = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' })
            this.saveAsExcelFile(excelBuffer, "guests")
        })
    }


    getRoomKeyStatusLabel(guest: Partial<Guest>): string {
        if (guest.roomKeyReturnedAt) {
            return 'Visszaadva'
        }

        if (guest.roomKeyIssued || guest.roomKeyIssuedAt) {
            return 'Kiadva'
        }

        return 'Nincs'
    }

    /**
     * Saves the provided buffer as an Excel file with the specified file name.
     * The file is saved in the 'xlsx' format and is named with a timestamp suffix.
     *
     * @param buffer - The data buffer to be saved as an Excel file.
     * @param fileName - The base name of the file to be saved, without extension.
     */
    saveAsExcelFile(buffer: any, fileName: string): void {
        let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
        let EXCEL_EXTENSION = '.xlsx';
        const data: Blob = new Blob([buffer], {
            type: EXCEL_TYPE
        })
        saveBlobAsFile(data, fileName + '_export_' + formatDateCompact(new Date()) + EXCEL_EXTENSION)
    }

    downloadImportTemplate() {
        import("xlsx").then(xlsx => {
            const INCLUDED_COLUMNS = [
                'firstName',
                'lastName',
                'gender',
                'nationality',
                'country',
                'zipCode',
                'roomNum',
                'dateOfArrival',
                'firstMeal',
                'dateOfDeparture',
                'lastMeal',
                'diet',
                'accommodationExtra',
                'birthDate',
                'conferenceName',
                'rfid',
                'rfidColor',
                'enabled',
                'lastRfidUsage',
                'email',
                'telephone',
                'roomType',
                'payment',
                'babyBed',
                'roomMate',
                'idcardtype',
                'idcard',
                'prepaid',
                'createdAt',
                'updatedAt'
            ]

            // Default headers
            const headers: string[] = [...INCLUDED_COLUMNS]

            // Add question-answer columns (e.g. question_1, answer_1)
            const maxQA = 5; // Example: maximum 5 question-answer pairs (adjustable as needed)
            for (let i = 1; i <= maxQA; i++) {
                headers.push(`question_${i}`, `answer_${i}`)
            }

            // Create a blank template header
            const worksheet = xlsx.utils.aoa_to_sheet([headers])

            // Create an Excel workbook
            const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] }
            const excelBuffer = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' })

            // Save file
            const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8'
            const EXCEL_EXTENSION = '.xlsx'
            const data = new Blob([excelBuffer], { type: EXCEL_TYPE })
            saveBlobAsFile(data, 'NFCReserve_import_template' + EXCEL_EXTENSION)
        })
    }

    private pickActualReservation(g: any): any | null {
        const resArr = Array.isArray(g?.reservations) ? g.reservations : []
        if (!resArr.length) return null

        const confId = this.selectedConferences?.[0]?.id ?? null
        const inConf = confId
            ? resArr.filter((r: any) => Number(r?.conference_id) === Number(confId))
            : resArr

        const pool = inConf.length ? inConf : resArr

        // legnagyobb reservation.id
        return pool.reduce((best: { id: any }, cur: { id: any }) => {
            const a = Number(best?.id ?? -Infinity)
            const b = Number(cur?.id ?? -Infinity)
            return b > a ? cur : best
        }, null as any)
    }

    private isNoneConferenceSelected(confs: Conference[] | null | undefined): boolean {
        return !!confs?.some(c => (c as any)?.__none__ === true || Number(c?.id) === GuestComponent.NONE_CONF_ID)
    }

    private recomputeCanEdit(): void {
        // Base permission (roles)
        if (!this.canEditByRole) {
            this.canEdit = false
            return
        }

        // Non-organizers can edit anytime
        if (!this.isOrganizer) {
            this.canEdit = true
            return
        }

        // Organizer must have an active conference selected
        const selectedId = this.selectedConferences?.[0]?.id
        if (!selectedId) {
            this.canEdit = false
            return
        }

        // Prefer the "full" conference object from the selector list (often has more fields)
        const fullConf = this.conferenceSelector?.conferences?.find(c => Number(c.id) === Number(selectedId))
        const conf = fullConf ?? this.selectedConferences[0]

        const rawEnd = (conf as any)?.guestEditEndDate
        if (!rawEnd) {
            this.canEdit = false
            return
        }

        this.canEdit = isSameOrBeforeDay(new Date(), rawEnd)
    }

    isImage(url: string) {
        return url && (url.endsWith('.jpg') || url.endsWith('.jpeg') || url.endsWith('.png'))
    }

    isArray(val: any): val is any[] {
        return Array.isArray(val) && val.length > 0
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
        this.stopGuestViewPolling()
    }
}
