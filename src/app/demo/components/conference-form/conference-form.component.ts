import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormArray, Validators, FormControl } from '@angular/forms';
import { Subscription, Observable, Subject, BehaviorSubject } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
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
import { ApiResponse } from '../../api/ApiResponse';
import { Conference } from '../../api/conference';
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
    conference: Conference                       // Conference for this form
    beginDate: any                               // Conference begin date
    endDate: any                                 // Conference end date
    birthDateMin: Date                           // Minimum birth date
    birthDateMax: Date                           // Maximum birth date
    conferenceForm: FormGroup                    // Form for guest registration to Conference
    showForm: boolean = true                     // Show or hide form
    registrationEnded: boolean = false           // Registration ended
    darkMode: boolean = false                    // Dark mode
    subscription: Subscription                   // Subscription for dark mode
    showIdCardField: boolean = false             // IdCard field visibility
    showClimateField: boolean = false            // Climate field visibility
    szepCardMessage: Message[]                   // Message for szep card payment
    idCardTemplateVisible: boolean = false       // ID card template visible

    private isFormValid$: Observable<boolean>
    private formChanges$: Subject<void> = new Subject()
    private conferenceObs$: Observable<any> | undefined
    private createdGuestObs$: Observable<any> | undefined
    private guestServiceMessageObs$: Observable<any> | undefined
    private answerServiceMessageObs$: Observable<any> | undefined

    constructor(public router: Router,
        private layoutService: LayoutService,
        private messageService: MessageService,
        private conferenceService: ConferenceService,
        private answerService: AnswerService,
        private guestService: GuestService,
        private formBuilder: FormBuilder,
        private translate: TranslateService,
        private cdRef: ChangeDetectorRef) {

        this.subscription = this.layoutService.configUpdate$.subscribe(config => {
            this.darkMode = config.colorScheme === 'dark' || config.colorScheme === 'dim' ? true : false;
        })

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
            babyBed: ['', Validators.required],
            climate: [0],
            idCard: [null, Validators.required],
            privacy: ['', Validators.required],
            answers: this.formBuilder.array([]),
        }, {
            validators: dateRangeValidator('dateOfArrival', 'dateOfDeparture')
        })

        this.isFormValid$ = new BehaviorSubject<boolean>(false)
    }

    ngOnInit() {
        // Get conference by URL
        this.getConferenceBySlug()

        // Diet + firstMeal + lastMeal handling
        this.conferenceForm.get('diet')?.valueChanges.subscribe((dietValue) => {
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

        this.conferenceForm.get('firstMeal')?.valueChanges.subscribe((firstMealValue) => {
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

        this.conferenceForm.get('lastMeal')?.valueChanges.subscribe((lastMealValue) => {
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

        // Watch roomType value changes to enable/disable roomMate
        this.conferenceForm.get('roomType')?.valueChanges.subscribe(value => {
            const roomMateControl = this.conferenceForm.get('roomMate')
            const climateControl = this.conferenceForm.get('climate')
            const idCardControl = this.conferenceForm.get('idCard')
            this.updateIdCardVisibility()

            if (value === 'Nem kérek szállást') {
                // Clear any previously entered value
                idCardControl?.reset()
                idCardControl?.disable()

                roomMateControl?.reset()
                roomMateControl?.disable()

                this.showClimateField = false
            } else {
                // Re-Enabling field validation
                idCardControl?.enable()
                roomMateControl?.enable()

                // Set validators for the climate field
                idCardControl?.setValidators(Validators.required)
                idCardControl?.updateValueAndValidity()

                // Climate field visibility handling
                // TODO: Later, it depends on whether the room type includes this climate
                const roomTypeWithClimate = [
                    'Maranatha Panzióház 2 ágyas szoba (külön fürdős)',
                    'Maranatha Panzióház franciaágyas szoba (külön fürdős)',
                    // 'Maranatha Panzióház 4 ágyas szoba (emeletes ágyas, külön fürdős)',
                    'Családi szoba (közös konyhával, fürdővel és nappalival)',
                ]

                this.showClimateField = roomTypeWithClimate.includes(value)

                // Set validators for the climate field
                if (this.showClimateField) {
                    climateControl?.setValidators(Validators.required)
                } else {
                    climateControl?.clearValidators()
                }

                climateControl?.updateValueAndValidity()
            }
        })

        // Conferences
        this.conferenceObs$ = this.conferenceService.conferenceObs
        this.conferenceObs$.subscribe((data: ApiResponse) => {
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
                    if (this.conference?.questions?.length > 0) {
                        const answersArray = this.conferenceForm.get('answers') as FormArray
                        this.conference.questions[0].translations?.forEach((question: any) => {
                            // if (answersArray.length !== this.conference.questions.length) {
                            if (question['hu'] !== '' || question['en'] !== '') {
                                answersArray.push(this.formBuilder.control('', Validators.required))
                            }
                            // }
                        })
                    }

                    // Check if registration has ended
                    if (this.conference?.registrationEndDate) {
                        const registrationEndDate = new Date(this.conference.registrationEndDate)
                        const today = new Date()

                        // Set time to midnight to ignore time differences
                        today.setHours(0, 0, 0, 0)
                        this.registrationEnded = registrationEndDate < today

                        // If registration has ended, show error
                        if (this.registrationEnded) {
                            this.messageService.add({
                                severity: "error",
                                summary: "Figyelem!",
                                detail: "A regisztrációs időszak lejárt!",
                            })
                        }
                    }
                } else {
                    // If slug is invalid navigate to error page
                    this.router.navigateByUrl('/error-page')
                }
            }
        })

        // Guest created => Save answers
        this.createdGuestObs$ = this.guestService.createdGuestObs
        this.createdGuestObs$.subscribe((data: any) => {
            this.loading = false
            if (data && data.guest) {
                if (this.conference?.questions?.length > 0) {
                    let answers: Answer = {
                        translations: [],
                        guestid: data.guest.id,
                        questionid: this.conference?.questions[0].id
                    }

                    this.conference.questions[0].translations?.forEach((question: any, i: number) => {
                        if (question['hu'] !== '' || question['en'] !== '') {
                            answers.translations.push({
                                hu: question['hu'],
                                en: question['en'],
                                answers: this.conferenceForm.get('answers')?.value[i]
                            })
                        }
                    })

                    this.answerService.create(answers)
                }
            }
        })

        // Guest Message
        this.guestServiceMessageObs$ = this.guestService.messageObs
        this.guestServiceMessageObs$.subscribe(message => {
            this.loading = false
            if (message == 'success') {
                // Show success message if we have no answers to save
                if (this.conference?.questions?.length == 0) {
                    this.saveSuccess()
                }
            } else {
                this.saveFailed()
            }
        })

        // Answer Message
        this.answerServiceMessageObs$ = this.answerService.messageObs
        this.answerServiceMessageObs$.subscribe(message => {
            this.loading = false
            if (message && message.severity) {
                // Show success message if we have no answers to save
                message.severity == 'success' ? this.saveSuccess() : this.saveFailed()
            }
        })

        this.isFormValid$ = this.formChanges$.pipe(
            debounceTime(300),
            distinctUntilChanged(),
            map(() => this.conferenceForm.valid)
        )

        // Monitor the changes of the form
        this.conferenceForm.valueChanges.pipe(
            debounceTime(300)
        ).subscribe(() => this.formChanges$.next())

        // On dateOfArrival change, update the firstMeal
        this.conferenceForm.get('dateOfArrival')?.valueChanges.subscribe(() => {
            this.getEarliestFirstMeal()
            this.getLatestFirstMeal()
            this.cdRef.detectChanges()
        })

        // On dateOfDeparture change, update the lastMeal
        this.conferenceForm.get('dateOfDeparture')?.valueChanges.subscribe(() => {
            this.getEarliestLastMeal()
            this.getLatestLastMeal()
            this.cdRef.detectChanges()
        })

        // Apply zipCode validator if country is Hungary
        this.conferenceForm.get('country')!.valueChanges.subscribe(country => {
            const zipCodeControl = this.conferenceForm.get('zipCode')
            if (country === 'Hungary') {
                zipCodeControl!.setValidators([Validators.required, zipCodeValidator()])
            } else {
                zipCodeControl!.setValidators([Validators.required])
            }
            zipCodeControl!.updateValueAndValidity()
        })

        // Apply idCard validator if guest is older than 14
        this.conferenceForm.get('birthDate')?.valueChanges.subscribe((birthDate) => {
            this.updateIdCardVisibility()
        })

        // Set the szepCardMessage
        this.setSzepCardMessage()

        // On language change, update the szepCardMessage
        this.translate.onLangChange.subscribe(() => {
            this.setSzepCardMessage()
        })
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
    get climate() { return this.conferenceForm.get('climate') }
    get idCard() { return this.conferenceForm.get('idCard') }
    get privacy() { return this.conferenceForm.get('privacy') }

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
     * Gets the translated question at the given index.
     * @param i The index of the question to translate.
     * @returns The translated question.
     */
    getTranslatedQuestion(i: number): { question: string; message?: string } | undefined {
        const lang = this.translate.currentLang === 'gb' ? 'en' : this.translate.currentLang
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
            const invalidFields: string[] = []
            Object.keys(this.conferenceForm.controls).forEach(key => {
                const control = this.conferenceForm.get(key)
                if (control?.invalid) {
                    invalidFields.push(key)
                }

                if (control instanceof FormArray) {
                    control.controls.forEach(answerControl => {
                        if (answerControl.invalid) {
                            invalidFields.push(`${key}.${answerControl}`)
                        }
                    })
                }
            })

            this.messageService.add({
                severity: "error",
                summary: "Hiba!",
                detail: `Az űrlap nem lett megfelelően kitöltve! A következő mezők nem megfelelőek: ${invalidFields.join(', ')}`,
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
        this.conferenceForm.reset()
        this.messageService.clear()
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
        const roomType = this.conferenceForm.get('roomType')?.value
        const idCardControl = this.conferenceForm.get('idCard')

        const age = moment().diff(moment(birthDate, 'YYYY-MM-DD'), 'years')
        const needsRoom = roomType !== 'Nem kérek szállást'

        // Required if needs room and older than 14
        if (needsRoom && age >= 14) {
            this.showIdCardField = true
            idCardControl?.setValidators([Validators.required])
        } else {
            this.showIdCardField = false
            idCardControl?.clearValidators()
        }
        idCardControl?.updateValueAndValidity()
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
    }
}
