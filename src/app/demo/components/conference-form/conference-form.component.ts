import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormArray, Validators, FormControl, AbstractControl, ValidationErrors } from '@angular/forms';
import { Subscription, Observable } from 'rxjs';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { TranslateService } from '@ngx-translate/core';
import { dateBoundsValidator } from '../../utils/date-bounds-validator';
import { emailDomainValidator } from '../../utils/email-validator';
import { dateRangeValidator } from '../../utils/date-range-validator';
import { zipCodeValidator } from '../../utils/zipcode-validator';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { Message, MessageService } from 'primeng/api';
import { ConferenceService } from '../../service/conference.service';
import { AnswerService } from '../../service/answer.service';
import { GuestService } from '../../service/guest.service';
import { UserService } from '../../service/user.service';
import { SessionService } from '../../service/session.service';
import { ApiResponse } from '../../api/ApiResponse';
import { Conference, FormFieldInfo } from '../../api/conference';
import { Answer } from '../../api/answer';
import { calculateAgeYears, formatDateYmd, isBeforeDay, isSameDay, isSameOrBeforeDay, parseDateOnly } from '../../utils/date.utils';
import { getCurrentQuestionSet as pickCurrentQuestionSet, hasTranslationContent, normalizeQuestionTranslations } from '../../utils/question-set.utils';

// Google Analytics
declare let gtag: Function;

@Component({
    selector: 'conference-form',
    templateUrl: './conference-form.component.html',
    styleUrls: ['./conference-form.component.scss'],
    providers: [MessageService],
})

// Makes unsubscribe automatically, don't need to do manually in ngOnDestroy
// BUT!!! Don't delete ngOnDestroy, it has to stay here!
@AutoUnsubscribe()

export class ConferenceFormComponent implements OnInit {

    loading: boolean = false                     // Loading overlay trigger value
    currentLang: string                          // Current language
    conference: Conference                       // Conference for this form
    beginDate: any                               // Conference begin date
    endDate: any                                 // Conference end date
    birthDateMin: Date                           // Minimum birth date
    birthDateMax: Date                           // Maximum birth date
    conferenceForm: FormGroup                    // Form for guest registration to Conference
    showForm: boolean = true                     // Show or hide form
    registrationEnded: boolean = false           // Registration ended
    darkMode: boolean = false                    // Dark mode
    showIdCardField: boolean = false             // IdCard field visibility
    showBabyBedField: boolean = false            // Baby bed field visibility
    szepCardMessage: Message[]                   // Message for szep card payment
    idCardTemplateVisible: boolean = false       // ID card template visible
    canFillFormAfterDeadline: boolean = false    // User has permission to fill form after deadline
    isOrganizer: boolean = false                 // User has organizer role
    canOrganizerFillUntilGuestEditDeadline: boolean = false // Organizer can fill until guest edit deadline
    currentUserRole: string = 'No Role'
    formFieldInfosMap: { [key: string]: FormFieldInfo } = {}
    allowedPaymentMethodIds: number[] | null | undefined = undefined
    allowedConferenceRoomTypeIds: number[] | null | undefined = undefined

    private guestServiceMessageObs$: Observable<any>
    private answerServiceMessageObs$: Observable<any>

    private readonly subs = new Subscription()
    private readonly ROOMTYPE_NO_ACCOMMODATION = 'Nem kérek szállást'
    readonly idCardMaxFileSizeBytes = 15 * 1024 * 1024
    readonly idCardMaxFileSizeMb = 15

    constructor(public router: Router,
        public userService: UserService,
        private layoutService: LayoutService,
        private messageService: MessageService,
        private conferenceService: ConferenceService,
        private answerService: AnswerService,
        private guestService: GuestService,
        private sessionService: SessionService,
        private formBuilder: FormBuilder,
        private translate: TranslateService,
        private cdRef: ChangeDetectorRef) {

        this.subs.add(
            this.layoutService.configUpdate$.subscribe(config => {
                this.darkMode = config.colorScheme === 'dark' || config.colorScheme === 'dim' ? true : false;
            })
        )

        // Set default theme
        this.changeTheme('orange')

        // Set default language (fallback)
        this.translate.setDefaultLang('hu')
        this.translate.use('hu')

        // Set min and max birth dates
        this.birthDateMin = new Date()
        this.birthDateMin.setFullYear(this.birthDateMin.getFullYear() - 130)
        this.birthDateMax = new Date()

        this.conferenceForm = this.formBuilder.group({
            conferenceid: [''],
            conferenceName: [''],
            lastName: ['', Validators.required],
            firstName: ['', Validators.required],
            gender: ['', Validators.required],
            birthDate: ['', Validators.required],
            nationality: ['', Validators.required],
            country: ['', Validators.required],
            zipCode: ['', Validators.required],
            email: ['', [Validators.required, emailDomainValidator()]],
            telephone: ['', Validators.required],
            dateOfArrival: ['', Validators.required],
            firstMeal: ['', Validators.required],
            diet: ['', Validators.required],
            dateOfDeparture: ['', Validators.required],
            lastMeal: ['', Validators.required],
            roomType: ['', Validators.required],
            roomMate: new FormControl<string[] | null>(null),
            payment: [null, Validators.required],
            babyBed: [null],
            idCard: [null],
            privacy: [false, Validators.requiredTrue],
            acceptanceCriteriaUrl: [null],
            answers: this.formBuilder.array([]),
        }, {
            validators: dateRangeValidator('dateOfArrival', 'dateOfDeparture')
        })
    }

    ngOnInit() {
        this.subs.add(
            this.userService.getUserRole().subscribe(role => {
                this.currentUserRole = role || 'No Role'
            })
        )

        // Permissions
        this.subs.add(
            this.userService.hasRole(['Super Admin', 'Nagy Admin', 'Kis Admin']).subscribe(canFillFormAfterDeadline => {
                this.canFillFormAfterDeadline = canFillFormAfterDeadline && this.sessionService.hasActiveSessionSnapshot()
            })
        )
        this.subs.add(
            this.userService.hasRole(['Szervezo']).subscribe(isOrganizer => {
                this.isOrganizer = isOrganizer && this.sessionService.hasActiveSessionSnapshot()
                this.recomputeOrganizerDeadlinePermission()
            })
        )

        // Get conference by URL
        this.getConferenceBySlug()

        // Current language
        this.currentLang = this.translate.currentLang === 'gb' ? 'en' : this.translate.currentLang

        // Diet + firstMeal + lastMeal handling
        const dietCtrl = this.conferenceForm.get('diet')
        if (dietCtrl) {
            this.subs.add(
                dietCtrl.valueChanges.subscribe((dietValue) => {
                    if (dietValue === 'nem kér étkezést') {
                        this.conferenceForm.patchValue({
                            firstMeal: 'nem kér étkezést',
                            lastMeal: 'nem kér étkezést'
                        })
                    } else {
                        // Reset meal selector if not 'nem kérétkezés'
                        const firstMealValue = this.conferenceForm.get('firstMeal')?.value
                        const lastMealValue = this.conferenceForm.get('lastMeal')?.value

                        if (firstMealValue === 'nem kér étkezést') {
                            this.conferenceForm.patchValue({ firstMeal: '' })
                        }
                        if (lastMealValue === 'nem kér étkezést') {
                            this.conferenceForm.patchValue({ lastMeal: '' })
                        }
                    }
                })
            )
        }

        const firstMealCtrl = this.conferenceForm.get('firstMeal')
        if (firstMealCtrl) {
            this.subs.add(
                firstMealCtrl.valueChanges.subscribe((firstMealValue) => {
                    if (firstMealValue === 'nem kér étkezést') {
                        if (this.conferenceForm.get('diet')?.value !== 'nem kér étkezést') {
                            this.conferenceForm.patchValue({
                                diet: 'nem kér étkezést',
                                lastMeal: 'nem kér étkezést'
                            })
                        }
                    } else {
                        // If the first meal is not 'nem kérétkezés', reset the diet selector if it is 'nem kérétkezést'
                        if (this.conferenceForm.get('diet')?.value === 'nem kér étkezést') {
                            this.conferenceForm.patchValue({ diet: '' })
                        }
                    }
                })
            )
        }

        const lastMealCtrl = this.conferenceForm.get('lastMeal')
        if (lastMealCtrl) {
            this.subs.add(
                lastMealCtrl.valueChanges.subscribe((lastMealValue) => {
                    if (lastMealValue === 'nem kér étkezést') {
                        if (this.conferenceForm.get('diet')?.value !== 'nem kér étkezést') {
                            this.conferenceForm.patchValue({
                                diet: 'nem kér étkezést',
                                firstMeal: 'nem kér étkezést'
                            })
                        }
                    } else {
                        // If the last meal is not 'nem kérétkezés', reset the diet selector if it is 'nem kérétkezést'
                        if (this.conferenceForm.get('diet')?.value === 'nem kér étkezést') {
                            this.conferenceForm.patchValue({ diet: '' })
                        }
                    }
                })
            )
        }

        // Watch roomType value changes to enable/disable roomMate
        const roomTypeCtrl = this.conferenceForm.get('roomType')
        if (roomTypeCtrl) {
            this.subs.add(
                roomTypeCtrl.valueChanges.subscribe(value => {
                    const roomMateControl = this.conferenceForm.get('roomMate')

                    if (value === this.ROOMTYPE_NO_ACCOMMODATION) {
                        roomMateControl?.reset()
                        roomMateControl?.disable({ emitEvent: false })
                    } else {
                        roomMateControl?.enable({ emitEvent: false })
                    }

                    this.updateIdCardVisibility()
                    this.updateBabyBedVisibility()
                })
            )
        }

        // Conferences
        this.subs.add(
            this.conferenceService.conferenceObs.subscribe((data: ApiResponse | null) => {
                this.loading = false
                if (data && data.rows) {
                    if (data.rows.length > 0) {
                        this.conference = data.rows[0]
                        this.beginDate = this.conference.beginDate ? parseDateOnly(this.conference.beginDate) ?? undefined : undefined
                        this.endDate = this.conference.endDate ? parseDateOnly(this.conference.endDate) ?? undefined : undefined
                        this.applyConferenceDateBoundsValidators()
                        this.allowedPaymentMethodIds = this.extractPaymentMethodIds(this.conference)
                        this.allowedConferenceRoomTypeIds = this.extractConferenceRoomTypeIds(this.conference)

                        // Optional safety: if current selected payment is not allowed, clear it
                        const paymentCtrl = this.conferenceForm.get('payment')
                        if (paymentCtrl) {
                            const current = Number(paymentCtrl.value)
                            if (Number.isFinite(current) && !this.allowedPaymentMethodIds.includes(current)) {
                                paymentCtrl.setValue(null, { emitEvent: false })
                            }
                        }

                        // Setting conference-related data on the form
                        this.conferenceForm.patchValue({
                            conferenceid: this.conference.id,
                            conferenceName: this.conference.name
                        })

                        // Fill form with stored questions
                        const answersArray = this.conferenceForm.get('answers') as FormArray
                        answersArray.clear() // It is important to always empty it
                        const currentQuestionTranslations = this.getVisibleQuestionTranslations()
                        if (currentQuestionTranslations.length > 0) {
                            currentQuestionTranslations.forEach((question: any) => {
                                if (question['hu']?.trim() || question['en']?.trim()) {
                                    answersArray.push(this.formBuilder.control('', Validators.required))
                                }
                            })
                        }

                        // Check if registration has ended
                        if (this.conference?.registrationEndDate) {
                            this.registrationEnded = isBeforeDay(this.conference.registrationEndDate, new Date())
                            this.recomputeOrganizerDeadlinePermission()

                            // If registration has ended, show error
                            if (this.registrationEnded && !this.canFillAfterRegistrationDeadline) {
                                this.setRegistrationEndMessage()
                            }
                        }

                        this.setFormFieldInfos()
                    } else {
                        // If slug is invalid navigate to error page
                        this.router.navigateByUrl('/error-page')
                    }
                }
            })
        )

        // Guest created => Save answers
        this.subs.add(
            this.guestService.createdGuestObs.subscribe((createdGuest: any | null) => {
                this.loading = false
                if (!createdGuest) return

                // If there are extra questions: save answers
                const currentQuestionSet = this.getCurrentQuestionSet()
                const currentQuestionTranslations = this.getVisibleQuestionTranslations()

                if (currentQuestionSet?.id && currentQuestionTranslations.length > 0) {
                    const answers: Answer = {
                        translations: [],
                        guestid: createdGuest.id,
                        questionid: Number(currentQuestionSet.id)
                    }

                    currentQuestionTranslations.forEach((question: any, i: number) => {
                        const hu = question['hu']
                        const en = question['en']
                        if (hu !== '' || en !== '') {
                            answers.translations.push({
                                hu: hu,
                                en: en,
                                answers: this.conferenceForm.get('answers')?.value[i]
                            })
                        }
                    })

                    this.answerService.create(answers)
                }
            })
        )

        // Guest Message
        this.guestServiceMessageObs$ = this.guestService.messageObs
        this.subs.add(
            this.guestServiceMessageObs$.subscribe(message => {
                this.loading = false
                if (!message) return

                // If message is a Toast
                if (message?.severity) {
                    this.messageService.add(message)
                    const hasSeparateAnswerSave = !!this.getCurrentQuestionSet()?.id && this.getVisibleQuestionTranslations().length > 0
                    if (message.summary === 'Vendég rögzítés sikertelen') {
                        this.saveFailed()
                    } else if (message.summary === 'Vendég rögzítve' && !hasSeparateAnswerSave) {
                        this.saveSuccess()
                    }
                    return
                }

                // If message is NOT a Toast
                this.messageService.add({
                    severity: 'error',
                    summary: 'Válasz mentés hiba',
                    detail: message?.errorMessage || message?.message || 'Ismeretlen hiba.'
                })
                this.saveFailed()
            })
        )

        // Answer Message
        this.answerServiceMessageObs$ = this.answerService.messageObs
        this.subs.add(
            this.answerServiceMessageObs$.subscribe(message => {
                this.loading = false
                if (message && message.severity) {
                    // Show success message if we have no answers to save
                    message.severity == 'success' ? this.saveSuccess() : this.saveFailed()
                }
            })
        )

        // On dateOfArrival change, update the firstMeal
        const dateOfArrivalCtrl = this.conferenceForm.get('dateOfArrival')
        if (dateOfArrivalCtrl) {
            this.subs.add(
                dateOfArrivalCtrl.valueChanges.subscribe(() => {
                    this.getEarliestFirstMeal()
                    this.getLatestFirstMeal()
                    this.cdRef.detectChanges()
                })
            )
        }

        // On dateOfDeparture change, update the lastMeal
        const dateOfDepartureCtrl = this.conferenceForm.get('dateOfDeparture')
        if (dateOfDepartureCtrl) {
            this.subs.add(
                dateOfDepartureCtrl.valueChanges.subscribe(() => {
                    this.getEarliestLastMeal()
                    this.getLatestLastMeal()
                    this.cdRef.detectChanges()
                })
            )
        }

        // Apply zipCode validator if country is Hungary
        this.subs.add(
            this.conferenceForm.get('country')!.valueChanges.subscribe(country => {
                const zipCodeControl = this.conferenceForm.get('zipCode')
                if (country === 'Hungary') {
                    zipCodeControl!.setValidators([Validators.required, zipCodeValidator()])
                } else {
                    zipCodeControl!.setValidators([Validators.required])
                }
                zipCodeControl!.updateValueAndValidity()
            })
        )

        // Apply idCard validator if guest is older than 14
        const birthDateCtrl = this.conferenceForm.get('birthDate')
        if (birthDateCtrl) {
            this.subs.add(
                birthDateCtrl.valueChanges.subscribe(() => {
                    this.updateIdCardVisibility()
                    this.updateBabyBedVisibility()
                })
            )
        }

        // Set the szepCardMessage
        this.setSzepCardMessage()

        // On language change, update the szepCardMessage
        this.subs.add(
            this.translate.onLangChange.subscribe(() => {
                this.currentLang = this.translate.currentLang === 'gb' ? 'en' : this.translate.currentLang
                this.setSzepCardMessage()

                // If registration has ended, show error
                if (this.registrationEnded && !this.canFillAfterRegistrationDeadline) {
                    this.setRegistrationEndMessage()
                }
            })
        )

        this.updateBabyBedVisibility()
        this.updateIdCardVisibility()
    }

    get lastName() { return this.conferenceForm.get('lastName') }
    get firstName() { return this.conferenceForm.get('firstName') }
    get gender() { return this.conferenceForm.get('gender') }
    get birthDate() { return this.conferenceForm.get('birthDate') }
    get nationality() { return this.conferenceForm.get('nationality') }
    get country() { return this.conferenceForm.get('country') }
    get zipCode() { return this.conferenceForm.get('zipCode') }
    get email() { return this.conferenceForm.get('email') }
    get telephone() { return this.conferenceForm.get('telephone') }
    get dateOfArrival() { return this.conferenceForm.get('dateOfArrival') }
    get firstMeal() { return this.conferenceForm.get('firstMeal') }
    get diet() { return this.conferenceForm.get('diet') }
    get dateOfDeparture() { return this.conferenceForm.get('dateOfDeparture') }
    get lastMeal() { return this.conferenceForm.get('lastMeal') }
    get roomType() { return this.conferenceForm.get('roomType') }
    get roomMate() { return this.conferenceForm.get('roomMate') }
    get payment() { return this.conferenceForm.get('payment') }
    get babyBed() { return this.conferenceForm.get('babyBed') }
    get idCard() { return this.conferenceForm.get('idCard') }
    get privacy() { return this.conferenceForm.get('privacy') }
    get canFillAfterRegistrationDeadline(): boolean {
        return this.canFillFormAfterDeadline || this.canOrganizerFillUntilGuestEditDeadline
    }
    get acceptanceCriteriaUrl() { return this.conferenceForm.get('acceptanceCriteriaUrl') }
    get hasRegistrationDeadline(): boolean { return !!this.conference?.registrationEndDate }
    get hasGuestEditDeadline(): boolean { return !!this.conference?.guestEditEndDate }
    get isPrivilegedViewer(): boolean { return this.isOrganizer || this.canFillFormAfterDeadline }
    get conferencePanelLabel(): string {
        return this.translate.instant('conferenceForm.panelLabel')
    }
    get displayConferenceName(): string {
        const name = this.conference?.name?.trim() ?? ''
        return name.replace(/^\d{8}-\d{8}\s*/u, '')
    }
    get conferenceDateRangeText(): string {
        if (this.conference?.beginDate && this.conference?.endDate) {
            const start = this.formatDeadline(this.conference.beginDate)
            const end = this.formatDeadline(this.conference.endDate)
            return start === end ? start : `${start} - ${end}`
        }

        if (this.conference?.beginDate) return this.formatDeadline(this.conference.beginDate)
        if (this.conference?.endDate) return this.formatDeadline(this.conference.endDate)

        return this.translate.instant('conferenceForm.dateComingSoon')
    }
    get publicDeadlineText(): string { return this.formatDeadline(this.conference?.registrationEndDate) }
    get organizerDeadlineText(): string { return this.formatDeadline(this.conference?.guestEditEndDate) }
    get effectiveDeadlineTitle(): string { return this.translate.instant('conferenceForm.deadline.registration') }
    get effectiveDeadlineText(): string {
        if (this.canFillFormAfterDeadline) {
            return ''
        }

        if (this.isOrganizer && this.conference?.guestEditEndDate) {
            return this.organizerDeadlineText
        }

        return this.publicDeadlineText
    }
    get effectiveDeadlineDescription(): string {
        if (this.canFillFormAfterDeadline) {
            return this.translate.instant('conferenceForm.deadline.superAdminDescription', { role: this.currentUserRole })
        }

        if (this.isOrganizer && this.conference?.guestEditEndDate) {
            return this.translate.instant('conferenceForm.deadline.organizerDescription')
        }

        return this.translate.instant('conferenceForm.deadline.guestDescription')
    }
    get showEffectiveDeadlineStatus(): boolean {
        return !this.canFillFormAfterDeadline && (!!this.hasRegistrationDeadline || !!this.hasGuestEditDeadline)
    }
    get effectiveDeadlineStatusText(): string {
        if (this.isOrganizer && this.conference?.guestEditEndDate) {
            return this.organizerDeadlineStatusText
        }

        return this.publicDeadlineStatusText
    }
    get effectiveDeadlineStatusClosed(): boolean {
        if (this.isOrganizer && this.conference?.guestEditEndDate) {
            return !this.canOrganizerFillUntilGuestEditDeadline
        }

        return this.registrationEnded
    }
    get publicDeadlineStatusText(): string {
        return this.registrationEnded
            ? this.translate.instant('conferenceForm.deadline.closed')
            : this.translate.instant('conferenceForm.deadline.open')
    }
    get organizerDeadlineStatusText(): string {
        return this.isOrganizerDeadlineOpen
            ? this.translate.instant('conferenceForm.deadline.open')
            : this.translate.instant('conferenceForm.deadline.closed')
    }
    get isOrganizerDeadlineOpen(): boolean {
        const rawEnd = this.conference?.guestEditEndDate
        return !!rawEnd && isSameOrBeforeDay(new Date(), rawEnd)
    }

    private applyConferenceDateBoundsValidators(): void {
        const conferenceDateValidators = [Validators.required, dateBoundsValidator(this.beginDate, this.endDate)]

        this.dateOfArrival?.setValidators(conferenceDateValidators)
        this.dateOfDeparture?.setValidators(conferenceDateValidators)
        this.dateOfArrival?.updateValueAndValidity({ emitEvent: false })
        this.dateOfDeparture?.updateValueAndValidity({ emitEvent: false })
        this.conferenceForm.updateValueAndValidity({ emitEvent: false })
    }

    get needsRoom(): boolean {
        const roomType = this.conferenceForm.get('roomType')?.value as string | null
        return !!roomType && roomType !== this.ROOMTYPE_NO_ACCOMMODATION
    }

    // Gets the FormArray of questions
    get answers(): FormArray {
        return this.conferenceForm.get('answers') as FormArray
    }

    get hasInteractedWithForm(): boolean {
        return this.conferenceForm.dirty || this.conferenceForm.touched
    }

    get incompleteFieldSummary(): string {
        const invalidFields = this.getInvalidFieldLabels()
        if (invalidFields.length === 0) {
            return ''
        }

        if (invalidFields.length <= 5) {
            return invalidFields.join(', ')
        }

        const remainingCount = invalidFields.length - 5
        const remainingText = this.translate.instant('conferenceForm.validation.more', { count: remainingCount })

        return `${invalidFields.slice(0, 5).join(', ')}, ${remainingText}`
    }

    private getCurrentQuestionSet() {
        return pickCurrentQuestionSet(this.conference?.questions)
    }

    private getCurrentQuestionTranslations() {
        return normalizeQuestionTranslations(this.getCurrentQuestionSet()?.translations)
    }

    private getVisibleQuestionTranslations() {
        return this.getCurrentQuestionTranslations().filter((translation) => hasTranslationContent(translation))
    }

    /**
     * Get conference by slug
     */
    getConferenceBySlug() {
        this.loading = true
        const slug = this.router.url.split('/').pop()?.split('?')[0] || ''
        this.conferenceService.getByFormSlug(slug)
    }

    /**
     * Get form field information in current language
     * @param key
     * @returns
     */
    getFormFieldInfo(field: string): string | undefined {
        const info = this.formFieldInfosMap[field]
        if (!info) return undefined
        return info.info[this.currentLang] || info.info['hu']
    }

    getFormFieldInfoPosition(field: string): 'bubble' | 'text' {
        return this.formFieldInfosMap[field]?.position || 'text'
    }

    /**
     * Gets the translated question at the given index.
     * @param i The index of the question to translate.
     * @returns The translated question.
     */
    getTranslatedQuestion(i: number): { question: string; message?: string } | undefined {
        const lang = this.currentLang
        const qList = this.getVisibleQuestionTranslations()
        if (!qList || !qList[i]) return undefined
        const translation = qList[i]

        const preferred = typeof translation[lang] === 'string' ? translation[lang].trim() : ''
        const fallbackHu = typeof translation['hu'] === 'string' ? translation['hu'].trim() : ''
        const fallbackEn = typeof translation['en'] === 'string' ? translation['en'].trim() : ''
        const full = preferred || fallbackHu || fallbackEn
        if (!full) return undefined

        // If there is text in brackets, we remove it
        const match = full.match(/^(.*?)(\s*\((.*?)\))$/)
        const question = match ? match[1].trim() : full.trim()
        const message = match ? match[3].trim() : undefined

        return {
            question: question.endsWith('?') ? question : question + '?',
            message
        }
    }

    /**
     * Returns the earliest first meal of the conference, if the date of arrival is on the first day of the conference.
     * Otherwise, returns undefined.
     * @returns The earliest first meal of the conference, or undefined.
     */
    getEarliestFirstMeal(): string | undefined {
        const dateOfArrival = this.conferenceForm.get('dateOfArrival')?.value
        const beginDate = this.beginDate

        if (isSameDay(dateOfArrival, beginDate)) {
            return this.conference?.firstMeal
        }
        return undefined
    }

    /**
     * Returns the latest first meal of the conference, if the date of arrival is on the last day of the conference.
     * Otherwise, returns undefined.
     * @returns The latest first meal of the conference, or undefined.
     */
    getLatestFirstMeal(): string | undefined {
        const dateOfArrival = this.conferenceForm.get('dateOfArrival')?.value
        const endDate = this.endDate

        if (isSameDay(dateOfArrival, endDate)) {
            return this.conference?.lastMeal
        }
        return undefined
    }


    /**
     * Returns the earliest last meal of the conference, if the date of departure is on the first day of the conference.
     * Otherwise, returns undefined.
     * @returns The earliest last meal of the conference, or undefined.
     */
    getEarliestLastMeal(): string | undefined {
        const dateOfDeparture = this.conferenceForm.get('dateOfDeparture')?.value
        const beginDate = this.beginDate

        if (isSameDay(dateOfDeparture, beginDate)) {
            return this.conference?.firstMeal
        }
        return undefined
    }

    /**
     * Returns the latest last meal of the conference, if the date of departure is on the last day of the conference.
     * Otherwise, returns undefined.
     * @returns The latest last meal of the conference, or undefined.
     */
    getLatestLastMeal(): string | undefined {
        const dateOfDeparture = this.conferenceForm.get('dateOfDeparture')?.value
        const endDate = this.endDate

        if (isSameDay(dateOfDeparture, endDate)) {
            return this.conference?.lastMeal
        }
        return undefined
    }

    /**
     * Sets the message for the SZÉP card warning message.
     * Translates the 'szepCardMessage' translation key and sets the message to the translated value.
     * @returns void
     */
    setSzepCardMessage(): void {
        this.translate.get('szepCardMessage').subscribe((translatedMessage: string) => {
            this.szepCardMessage = [
                {
                    severity: 'info',
                    summary: '',
                    detail: translatedMessage,
                },
            ]
        })
    }

    /**
     * Sets the registration expired message.
     * Translates the 'registrationEndMessage' translation key and sets the message to the translated value.
     * @returns void
     */
    setRegistrationEndMessage(): void {
        this.translate.get('registrationEndMessage').subscribe((translatedMessage: string) => {
            this.messageService.add({
                severity: 'error',
                summary: this.currentLang == 'hu' ? "Figyelem!" : "Attention!",
                detail: translatedMessage,
            })
        })
    }

    private recomputeOrganizerDeadlinePermission(): void {
        if (!this.isOrganizer) {
            this.canOrganizerFillUntilGuestEditDeadline = false
            return
        }

        const rawEnd = this.conference?.guestEditEndDate
        if (!rawEnd) {
            this.canOrganizerFillUntilGuestEditDeadline = false
            return
        }

        this.canOrganizerFillUntilGuestEditDeadline = isSameOrBeforeDay(new Date(), rawEnd)
    }

    private formatDeadline(value?: string | null): string {
        if (!value) {
            return this.translate.instant('conferenceForm.notSet')
        }

        const parsed = parseDateOnly(value)
        if (!parsed) {
            return value
        }

        return new Intl.DateTimeFormat(this.currentLang === 'en' ? 'en-GB' : 'hu-HU', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        }).format(parsed)
    }

    /**
     * Handles the submission of the form.
     * Marks all form elements as dirty and touched,
     * then creates a guest from the form data and submits it.
     * If the form is invalid, shows an error message.
     */
    onSubmit(): void {
        this.messageService.clear()

        // Mark all form elements as dirty and touched
        Object.keys(this.conferenceForm.controls).forEach(key => {
            const control = this.conferenceForm.get(key)
            control?.markAsDirty()
            control?.markAsTouched()

            // Mark all elements in the form arrays too
            if (control instanceof FormArray) {
                control.controls.forEach(answerControl => {
                    answerControl.markAsDirty()
                    answerControl.markAsTouched()
                })
            }
        })

        if (this.conferenceForm.valid) {
            this.loading = true

            // Google Analytics event sending
            setTimeout(() => {
                if (typeof gtag === 'function') {
                    gtag('event', 'registration_submitted', {
                        'event_category': 'form',
                        'event_label': this.conference?.name || 'ismeretlen_konferencia',
                        'value': 1
                    })
                }
            })

            const guestData = { ...this.conferenceForm.value }
            const rawIdCard = this.conferenceForm.get('idCard')?.value
            const files: File[] = rawIdCard instanceof File ? [rawIdCard] : []
            const lang = this.translate.currentLang === 'gb' ? 'en' : this.translate.currentLang

            guestData.birthDate = formatDateYmd(guestData.birthDate)
            guestData.dateOfArrival = formatDateYmd(guestData.dateOfArrival)
            guestData.dateOfDeparture = formatDateYmd(guestData.dateOfDeparture)

            const currentQuestionSet = this.getCurrentQuestionSet()
            const currentQuestionSetId = Number(currentQuestionSet?.id)
            const shouldUseInlineQuestionFallback = !Number.isFinite(currentQuestionSetId)

            if (shouldUseInlineQuestionFallback) {
                guestData.questions = this.getVisibleQuestionTranslations().map((t: any) => t[lang] || t['hu'] || 'Ismeretlen kérdés')
            } else {
                delete guestData.questions
                delete guestData.answers
            }

            // Convert the 'roomMate' FormArray to a comma-separated string
            if (Array.isArray(guestData.roomMate)) {
                guestData.roomMate = guestData.roomMate.join(', ')
            }

            // Delete unnecessary fields
            delete guestData.idCard

            this.guestService.create(guestData, files)

        } else {
            const invalidFields = this.getInvalidFieldLabels()

            this.messageService.add({
                severity: "error",
                summary: this.translate.instant("Hiba!"),
                detail: `${this.translate.instant('conferenceForm.validation.formIncomplete')} ${this.translate.instant('conferenceForm.validation.invalidFieldsPrefix')}: ${invalidFields.join(', ')}`
            })
        }
    }

    /**
     * Handles the successful saving of guest data.
     * Hides the form and displays a success message to the user.
     */
    saveSuccess() {
        this.showForm = false
        this.messageService.add({
            severity: "success",
            summary: this.translate.instant('conferenceForm.messages.saveSuccessSummary'),
            detail: this.translate.instant('conferenceForm.messages.saveSuccessDetail'),
        })
    }

    /**
     * Called when saving the guest data fails.
     * Displays an error message to the user.
     */
    saveFailed() {
        this.messageService.add({
            severity: "error",
            summary: this.translate.instant('conferenceForm.messages.saveFailedSummary'),
            detail: this.translate.instant('conferenceForm.messages.saveFailedDetail'),
        })
    }

    /**
     * New guest registration
     *
     * Resets the form and shows it again, after a successful submission.
     * Also clears any messages, and reloads the conference data.
     */
    newRegistration() {
        this.showForm = true
        this.messageService.clear()

        // Reset form state
        this.conferenceForm.reset()

        // CLEAR the FormArray of answers
        const answersArray = this.conferenceForm.get('answers') as FormArray
        answersArray.clear()

        this.getConferenceBySlug()
    }

    /**
     * Keypress monitor
     * @param event
     */
    onlyAllowNumbers(event: KeyboardEvent) {
        const allowedKeys = /[0-9+]/
        if (!allowedKeys.test(event.key)) {
            event.preventDefault()
        }
    }

    /**
     * IdCard visibility checker
     */
    updateIdCardVisibility(): void {
        const birthDate = this.conferenceForm.get('birthDate')?.value
        const idCardControl = this.conferenceForm.get('idCard')

        const age = calculateAgeYears(birthDate)
        const needsRoom = this.needsRoom

        // Required if needs room and older than 14
        if (needsRoom && age >= 14) {
            this.showIdCardField = true
            idCardControl?.setValidators([Validators.required, this.idCardMaxFileSizeValidator.bind(this)])
            idCardControl?.enable({ emitEvent: false })
        } else {
            this.showIdCardField = false
            idCardControl?.clearValidators()
            idCardControl?.setValue(null, { emitEvent: false })
            idCardControl?.disable({ emitEvent: false })
        }
        idCardControl?.updateValueAndValidity({ emitEvent: false })
    }

    private idCardMaxFileSizeValidator(control: AbstractControl): ValidationErrors | null {
        const value = control.value
        if (!value || !(value instanceof File)) {
            return null
        }

        return value.size <= this.idCardMaxFileSizeBytes
            ? null
            : {
                maxFileSize: {
                    max: this.idCardMaxFileSizeBytes,
                    actual: value.size
                }
            }
    }

    private getTranslatedFieldNames(): { [key: string]: string } {
        return {
            lastName: this.translate.instant('conferenceForm.fields.lastName'),
            firstName: this.translate.instant('conferenceForm.fields.firstName'),
            gender: this.translate.instant('conferenceForm.fields.gender'),
            birthDate: this.translate.instant('conferenceForm.fields.birthDate'),
            nationality: this.translate.instant('conferenceForm.fields.nationality'),
            country: this.translate.instant('conferenceForm.fields.country'),
            zipCode: this.translate.instant('conferenceForm.fields.postalCode'),
            email: this.translate.instant('conferenceForm.fields.email'),
            telephone: this.translate.instant('conferenceForm.fields.phone'),
            dateOfArrival: this.translate.instant('conferenceForm.fields.arrivalDate'),
            firstMeal: this.translate.instant('conferenceForm.fields.firstMeal'),
            diet: this.translate.instant('conferenceForm.fields.diet'),
            dateOfDeparture: this.translate.instant('conferenceForm.fields.departureDate'),
            lastMeal: this.translate.instant('conferenceForm.fields.lastMeal'),
            roomType: this.translate.instant('conferenceForm.fields.roomType'),
            roomMate: this.translate.instant('conferenceForm.fields.roomMate'),
            payment: this.translate.instant('conferenceForm.fields.paymentMethod'),
            babyBed: this.translate.instant('conferenceForm.fields.babyBed'),
            idCard: this.translate.instant('conferenceForm.fields.idCardBack'),
            privacy: this.translate.instant('conferenceForm.fields.privacy'),
        }
    }

    private getInvalidFieldLabels(): string[] {
        const translatedFieldNames = this.getTranslatedFieldNames()
        const invalidFields: string[] = []

        Object.keys(this.conferenceForm.controls).forEach(key => {
            const control = this.conferenceForm.get(key)

            if (control instanceof FormArray && key === 'answers') {
                control.controls.forEach((answerControl, idx) => {
                    if (answerControl.invalid) {
                        const fallbackQuestion = this.translate.instant('conferenceForm.validation.questionFallback', { index: idx + 1 })
                        const questionText = this.getTranslatedQuestion(idx)?.question || fallbackQuestion
                        invalidFields.push(questionText)
                    }
                })
                return
            }

            if (control?.invalid) {
                invalidFields.push(translatedFieldNames[key] || key)
            }
        })

        if (this.conferenceForm.errors?.['dateRangeInvalid']) {
            invalidFields.push(this.translate.instant('conferenceForm.validation.arrivalDepartureDates'))
        }

        return [...new Set(invalidFields)]
    }

    /**
     * Returns true when baby bed question should be available:
     * room is needed + age is 0-3 years.
     */
    private isBabyBedEligibleByBirthDate(): boolean {
        const birthDateValue = this.conferenceForm.get('birthDate')?.value
        if (!birthDateValue) return false

        const ageYears = calculateAgeYears(birthDateValue)
        return ageYears >= 0 && ageYears <= 3
    }

    /**
     * Updates babyBed visibility + validators based on accommodation and age.
     */
    private updateBabyBedVisibility(): void {
        const babyBedControl = this.conferenceForm.get('babyBed')
        if (!babyBedControl) return

        const canAskForBabyBed = this.needsRoom && this.isBabyBedEligibleByBirthDate()
        this.showBabyBedField = canAskForBabyBed

        if (canAskForBabyBed) {
            babyBedControl.enable({ emitEvent: false })
            babyBedControl.setValidators([Validators.required])

            // Optional: default to "No" to reduce friction
            if (babyBedControl.value === null || babyBedControl.value === '' || babyBedControl.value === undefined) {
                babyBedControl.setValue('0', { emitEvent: false })
            }
        } else {
            babyBedControl.clearValidators()
            babyBedControl.setValue(null, { emitEvent: false })
            babyBedControl.disable({ emitEvent: false })
        }

        babyBedControl.updateValueAndValidity({ emitEvent: false })
    }

    setFormFieldInfos() {
        this.formFieldInfosMap = {}
        if (this.conference?.formFieldInfos) {
            for (const info of this.conference.formFieldInfos) {
                this.formFieldInfosMap[info.field] = info
            }
        }
    }

    private extractPaymentMethodIds(conf: any): number[] {
        if (!conf) {
            return [];
        }

        // Case 1: backend already returns number[] (paymentMethodIds)
        if (Array.isArray(conf.paymentMethodIds)) {
            const ids = conf.paymentMethodIds
                .map((v: any) => Number(v))
                .filter((n: number) => Number.isFinite(n));

            return Array.from(new Set(ids));
        }

        // Case 2: backend returns paymentMethods[] objects
        if (Array.isArray(conf.paymentMethods)) {
            const ids = conf.paymentMethods
                .map((pm: any) => Number(pm?.id))
                .filter((n: number) => Number.isFinite(n));

            return Array.from(new Set(ids));
        }

        return [];
    }

    private extractConferenceRoomTypeIds(conf: Conference | null | undefined): number[] | undefined {
        if (!conf) return undefined

        const fromDirectIds = [
            ...(Array.isArray((conf as any).roomTypeIds) ? (conf as any).roomTypeIds : []),
            ...(Array.isArray((conf as any).conferenceRoomTypeIds) ? (conf as any).conferenceRoomTypeIds : [])
        ]
            .map((v: any) => Number(v?.id ?? v))
            .filter((id: number) => Number.isFinite(id) && id > 0)

        const fromRooms = (Array.isArray(conf?.rooms) ? conf.rooms : [])
            .map((room: any) => Number(room?.room_typeid ?? room?.roomTypeId ?? room?.roomType?.id))
            .filter((id: number) => Number.isFinite(id) && id > 0)

        const ids = Array.from(new Set([...fromDirectIds, ...fromRooms]))
        return ids.length > 0 ? ids : undefined
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

    // Don't delete this, its needed from a performance point of view,
    ngOnDestroy(): void {
        this.conferenceForm.reset()
        const answersArray = this.conferenceForm.get('answers') as FormArray
        answersArray.clear()

        // Clean up
        this.subs.unsubscribe()
    }
}
