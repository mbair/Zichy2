import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormArray, Validators, FormControl } from '@angular/forms';
import { Subscription, Observable } from 'rxjs';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { TranslateService } from '@ngx-translate/core';
import { emailDomainValidator } from '../../utils/email-validator';
import { dateRangeValidator } from '../../utils/date-range-validator';
import { zipCodeValidator } from '../../utils/zipcode-validator';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { Message, MessageService } from 'primeng/api';
import { ConferenceService } from '../../service/conference.service';
import { AnswerService } from '../../service/answer.service';
import { GuestService } from '../../service/guest.service';
import { UserService } from '../../service/user.service';
import { ApiResponse } from '../../api/ApiResponse';
import { Conference, FormFieldInfo } from '../../api/conference';
import { Answer } from '../../api/answer';
import * as moment from 'moment';

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
    szepCardMessage: Message[]                   // Message for szep card payment
    idCardTemplateVisible: boolean = false       // ID card template visible
    canFillFormAfterDeadline: boolean = false    // User has permission to fill form after deadline
    formFieldInfosMap: { [key: string]: FormFieldInfo } = {}

    private guestServiceMessageObs$: Observable<any>
    private answerServiceMessageObs$: Observable<any>
    
    private readonly subs = new Subscription()
    private readonly ROOMTYPE_NO_ACCOMMODATION = 'Nem kérek szállást'

    constructor(public router: Router,
        public userService: UserService,
        private layoutService: LayoutService,
        private messageService: MessageService,
        private conferenceService: ConferenceService,
        private answerService: AnswerService,
        private guestService: GuestService,
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
            payment: ['', Validators.required],
            babyBed: [null],
            idCard: [null],
            privacy: ['', Validators.required],
            acceptanceCriteriaUrl: [null],
            answers: this.formBuilder.array([]),
        }, {
            validators: dateRangeValidator('dateOfArrival', 'dateOfDeparture')
        })
    }

    ngOnInit() {
        // Permissions
        this.subs.add(
            this.userService.hasRole(['Super Admin', 'Nagy Admin']).subscribe(canFillFormAfterDeadline => this.canFillFormAfterDeadline = canFillFormAfterDeadline)
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
                        this.beginDate = this.conference.beginDate ? moment(this.conference.beginDate, 'YYYY-MM-DD').toDate() : undefined
                        this.endDate = this.conference.endDate ? moment(this.conference.endDate, 'YYYY-MM-DD').toDate() : undefined

                        // Setting conference-related data on the form
                        this.conferenceForm.patchValue({
                            conferenceid: this.conference.id,
                            conferenceName: this.conference.name
                        })

                        // Fill form with stored questions
                        const answersArray = this.conferenceForm.get('answers') as FormArray
                        answersArray.clear() // It is important to always empty it
                        if (this.conference?.questions?.length > 0) {
                            this.conference.questions[0].translations?.forEach((question: any) => {
                                if (question['hu']?.trim() || question['en']?.trim()) {
                                    answersArray.push(this.formBuilder.control('', Validators.required))
                                }
                            })
                        }

                        // Check if registration has ended
                        if (this.conference?.registrationEndDate) {
                            const registrationEnd = moment(this.conference.registrationEndDate).startOf('day')
                            const today = moment().startOf('day')

                            this.registrationEnded = registrationEnd.isBefore(today)

                            // If registration has ended, show error
                            if (this.registrationEnded && !this.canFillFormAfterDeadline) {
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
                if (this.conference?.questions?.length > 0) {
                    const answers: Answer = {
                        translations: [],
                        guestid: createdGuest.id,
                        questionid: this.conference?.questions[0].id
                    }

                    this.conference.questions[0].translations?.forEach((question: any, i: number) => {
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
                    message.severity === 'success' ? this.saveSuccess() : this.saveFailed()
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
                if (this.registrationEnded) {
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
    get acceptanceCriteriaUrl() { return this.conferenceForm.get('acceptanceCriteriaUrl') }
    
    get needsRoom(): boolean {
        const roomType = this.conferenceForm.get('roomType')?.value as string | null
        return !!roomType && roomType !== this.ROOMTYPE_NO_ACCOMMODATION
    }

    // Gets the FormArray of questions
    get answers(): FormArray {
        return this.conferenceForm.get('answers') as FormArray
    }

    /**
     * Get conference by slug
     */
    getConferenceBySlug() {
        this.loading = true
        const slug = this.router.url.split('/').pop()
        this.conferenceService.getBySearchQuery(`formUrl=${slug}`)
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
        const qList = this.conference?.questions?.[0]?.translations
        if (!qList || !qList[i]) return undefined

        const full = qList[i][lang] ?? qList[i]['hu']
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

        if (moment(dateOfArrival).isSame(beginDate, 'day')) {
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

        if (moment(dateOfArrival).isSame(endDate, 'day')) {
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

        if (moment(dateOfDeparture).isSame(beginDate, 'day')) {
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

        if (moment(dateOfDeparture).isSame(endDate, 'day')) {
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
                try {
                    gtag('event', 'registration_submitted', {
                        'event_category': 'form',
                        'event_label': this.conference?.name || 'ismeretlen_konferencia',
                        'value': 1
                    })
                } catch (err) {
                    console.warn('GA event küldése sikertelen', err)
                }
            })

            const guestData = { ...this.conferenceForm.value }
            const rawIdCard = this.conferenceForm.get('idCard')?.value
            const files: File[] = rawIdCard ? [rawIdCard] : []
            const lang = this.translate.currentLang === 'gb' ? 'en' : this.translate.currentLang

            // Add questions to formdata
            guestData.questions = this.conference?.questions?.[0]?.translations?.map((t: any) => t[lang] || 'Ismeretlen kérdés') || []

            // Convert the 'roomMate' FormArray to a comma-separated string
            if (Array.isArray(guestData.roomMate)) {
                guestData.roomMate = guestData.roomMate.join(', ')
            }

            // Delete unnecessary fields
            delete guestData.idCard
            delete guestData.privacy

            this.guestService.create(guestData, files)

        } else {
            // Translations of field names
            const translatedFieldNames: { [key: string]: string } = {
                lastName: this.translate.instant('Vezetéknév'),
                firstName: this.translate.instant('Keresztnév'),
                gender: this.translate.instant('Neme'),
                birthDate: this.translate.instant('Születési dátum'),
                nationality: this.translate.instant('Állampolgárság'),
                country: this.translate.instant('Ország'),
                zipCode: this.translate.instant('Irányítószám'),
                email: this.translate.instant('Email'),
                telephone: this.translate.instant('Telefon'),
                dateOfArrival: this.translate.instant('Érkezés dátuma'),
                firstMeal: this.translate.instant('Első étkezés'),
                diet: this.translate.instant('Étrend'),
                dateOfDeparture: this.translate.instant('Távozás dátuma'),
                lastMeal: this.translate.instant('Utolsó étkezés'),
                roomType: this.translate.instant('Szállástípus'),
                roomMate: this.translate.instant('Szobatárs'),
                payment: this.translate.instant('Fizetési mód'),
                babyBed: this.translate.instant('Babaágy'),
                idCard: this.translate.instant('Személyi igazolvány'),
                privacy: this.translate.instant('Adatvédelem'),
            }

            const invalidFields: string[] = []

            Object.keys(this.conferenceForm.controls).forEach(key => {
                const control = this.conferenceForm.get(key)

                // Extra questions
                if (control instanceof FormArray && key === 'answers') {
                    control.controls.forEach((answerControl, idx) => {
                        if (answerControl.invalid) {
                            const questionText = this.getTranslatedQuestion(idx)?.question || `Kérdés ${idx + 1}`
                            invalidFields.push(questionText)
                        }
                    })
                    // Normal fields
                } else if (control?.invalid) {
                    invalidFields.push(translatedFieldNames[key] || key)
                }
            })

            this.messageService.add({
                severity: "error",
                summary: this.translate.instant("Hiba!"),
                detail: `${this.translate.instant('Az űrlap nem lett megfelelően kitöltve!')} ${this.translate.instant('A következő mezők nem megfelelőek')}: ${invalidFields.join(', ')}`
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
            summary: "Sikeresen regisztrált!",
            detail: "Sok szeretettel várjuk a konferenciára!",
        })
    }

    /**
     * Called when saving the guest data fails.
     * Displays an error message to the user.
     */
    saveFailed() {
        this.messageService.add({
            severity: "error",
            summary: "Hiba történt!",
            detail: "Nem sikerült menteni az adatokat",
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

        const age = birthDate ? moment().diff(moment(birthDate, 'YYYY-MM-DD'), 'years') : 0
        const needsRoom = this.needsRoom

        // Required if needs room and older than 14
        if (needsRoom && age >= 14) {
            this.showIdCardField = true
            idCardControl?.setValidators([Validators.required])
            idCardControl?.enable({ emitEvent: false })
        } else {
            this.showIdCardField = false
            idCardControl?.clearValidators()
            idCardControl?.setValue(null, { emitEvent: false })
            idCardControl?.disable({ emitEvent: false })
        }
        idCardControl?.updateValueAndValidity({ emitEvent: false })
    }

    /**
     * Updates babyBed visibility + validators based on whether accommodation is needed.
     */
    private updateBabyBedVisibility(): void {
        const babyBedControl = this.conferenceForm.get('babyBed')
        if (!babyBedControl) return

        if (this.needsRoom) {
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
