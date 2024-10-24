import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, FormArray, Validators, FormControl } from '@angular/forms';
import { Subscription, Observable, Subject, BehaviorSubject } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { TranslateService } from '@ngx-translate/core';
import { emailDomainValidator } from '../../utils/email-validator';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { MessageService } from 'primeng/api';
import { ConferenceService } from '../../service/conference.service';
import { DietService } from '../../service/diet.service';
import { Language } from '../../api/language';
import { Diet } from '../../api/diet';
import { ApiResponse } from '../../api/ApiResponse';
import { Conference } from '../../api/conference';


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

    loading: boolean = true                      // Loading overlay trigger value
    conference: Conference                       // Conference for this form
    languages: Language[] = []                   // List of system languages
    currentLanguage: string                      // Current system language 
    diets: Diet[] = []                           // Possible diets
    conferenceForm: FormGroup;                   // Form for guest registration to Conference
    selectedLanguage: any;                       // Selected system language
    subscription: Subscription;
    darkMode: boolean = false;
    countries: any[] = [];
    payments: any[] = [];
    roomTypes: any[] = [];

    private isFormValid$: Observable<boolean>
    private formChanges$: Subject<void> = new Subject()
    private conferenceObs$: Observable<any> | undefined

    constructor(public router: Router,
        private route: ActivatedRoute,
        private layoutService: LayoutService,
        private messageService: MessageService,
        private conferenceService: ConferenceService,
        private dietService: DietService,
        private formBuilder: FormBuilder,
        private translate: TranslateService) {

        this.subscription = this.layoutService.configUpdate$.subscribe(config => {
            this.darkMode = config.colorScheme === 'dark' || config.colorScheme === 'dim' ? true : false;
        })

        this.conferenceForm = this.formBuilder.group({
            lastName: ['', Validators.required],
            firstName: ['', Validators.required],
            gender: ['', Validators.required],
            birthdate: ['', Validators.required],
            nationality: ['', Validators.required],
            country: ['', Validators.required],
            zipcode: ['', Validators.required],
            email: ['', [Validators.required, emailDomainValidator()]],
            telephone: ['', Validators.required],
            arrivalDate: ['', Validators.required],
            firstMeal: ['', Validators.required],
            diet: ['', Validators.required],
            departureDate: ['', Validators.required],
            lastMeal: ['', Validators.required],
            roomType: ['', Validators.required],
            roommate: ['', Validators.required],
            payment: ['', Validators.required],
            babyBed: ['', Validators.required],
            idCard: ['', [Validators.required]],
            privacy: ['', Validators.required],
            answers: this.formBuilder.array([]),
        })

        this.isFormValid$ = new BehaviorSubject<boolean>(false)
    }

    ngOnInit() {
        // Get conference by URL
        this.getConferenceBySlug()

        // Conferences
        this.conferenceObs$ = this.conferenceService.conferenceObs
        this.conferenceObs$.subscribe((data: ApiResponse) => {
            this.loading = false
            if (data && data.rows) {
                if (data.rows.length > 0) {
                    this.conference = data.rows[0]

                    // Fill form with stored questions
                    if (this.conference.questions.length > 0) {
                        const answersArray = this.conferenceForm.get('answers') as FormArray
                        this.conference.questions[0].translations.forEach(() => {
                            answersArray.push(this.formBuilder.control('', Validators.required))
                        })
                    }
                } else {
                    // If slug is invalid navigate to error page
                    this.router.navigateByUrl('/error-page')
                }
            }
        })

        // Get diets for selector
        this.dietService.getDietsForSelector().subscribe({
            next: (data) => {
                this.diets = data
            }
        })

        

        // Set possible languages
        this.languages = [
            {
                name: "Hungary",
                huname: "Magyarország",
                nationality: "Hungarian",
                hunationality: "magyar",
                code: "HU"
            },
            {
                name: "United Kingdom",
                huname: "Egyesült Királyság",
                nationality: "brit",
                hunationality: "angol",
                code: "GB"
            }
        ]

        this.translate.addLangs(['gb', 'hu'])
        const browserLang = this.translate.getBrowserLang()
        /** Use EN lang az GB */
        let defaultLang = browserLang?.match(/en|hu/) ? browserLang : 'gb'
        this.translate.setDefaultLang(defaultLang)
        this.translate.use(defaultLang)
        this.currentLanguage = this.translate.currentLang

        // Set selected language
        if (browserLang) {
            this.selectedLanguage = this.languages.find(language =>
                language.code.toLowerCase() == defaultLang.toLowerCase()
            )
        }

        this.isFormValid$ = this.formChanges$.pipe(
            debounceTime(300),
            distinctUntilChanged(),
            map(() => this.conferenceForm.valid)
        )

        // Monitor the changes of the form
        this.conferenceForm.valueChanges.subscribe(() => this.formChanges$.next())
    }

    get lastName() { return this.conferenceForm.get('lastName') }
    get firstName() { return this.conferenceForm.get('firstName') }
    get gender() { return this.conferenceForm.get('gender') }
    get birthdate() { return this.conferenceForm.get('birthdate') }
    get nationality() { return this.conferenceForm.get('nationality') }
    get country() { return this.conferenceForm.get('country') }
    get zipcode() { return this.conferenceForm.get('zipcode') }
    get email() { return this.conferenceForm.get('email') }
    get telephone() { return this.conferenceForm.get('telephone') }
    get arrivalDate() { return this.conferenceForm.get('arrivalDate') }
    get firstMeal() { return this.conferenceForm.get('firstMeal') }
    get diet() { return this.conferenceForm.get('diet') }
    get departureDate() { return this.conferenceForm.get('departureDate') }
    get lastMeal() { return this.conferenceForm.get('lastMeal') }
    get roomType() { return this.conferenceForm.get('roomType') }
    get roommate() { return this.conferenceForm.get('roommate') }
    get payment() { return this.conferenceForm.get('payment') }
    get babyBed() { return this.conferenceForm.get('babyBed') }
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
    getTranslatedQuestion(i: any): string {
        const lang = this.currentLanguage == 'gb' ? 'en' : this.currentLanguage
        return this.conference.questions[0].translations[i][lang]
    }

    onSubmit(): void {
        console.log('onSubmit')
        console.log('Az űrlap adatok:', this.conferenceForm.value)

        // Mark all form elements as dirty
        this.conferenceForm.markAsDirty()
        this.conferenceForm.markAllAsTouched()
        Object.keys(this.conferenceForm.controls).forEach(key => {
            this.conferenceForm.get(key)?.markAsDirty()
        })

        setTimeout(() => {
            this.messageService.clear()

            if (this.conferenceForm.valid) {
                this.loading = true

                this.messageService.add({
                    severity: "success",
                    summary: "Sikeresen regisztrált!",
                    detail: "Sok szeretettel várjuk a konferenciára!",
                })
            } else {
                this.messageService.add({
                    severity: "error",
                    summary: "Hiba!",
                    detail: "Az űrlap nem lett megfelelően kitöltve!",
                })
            }
        }, 500)
    }

    onLanguageChange(lang: any) {
        const langCode = lang.code.toLowerCase()
        this.translate.use(langCode)
        this.currentLanguage = langCode
    }

    // Don't delete this, its needed from a performance point of view,
    ngOnDestroy(): void {
    }
}
