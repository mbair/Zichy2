import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, FormArray, Validators, FormControl } from '@angular/forms';
import { Subscription, Observable, Subject, BehaviorSubject } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, tap } from 'rxjs/operators';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { TranslateService } from '@ngx-translate/core';
import { emailDomainValidator } from '../../utils/email-validator';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { MessageService } from 'primeng/api';
import { ConferenceService } from '../../service/conference.service';
import { GuestService } from '../../service/guest.service';
import { DietService } from '../../service/diet.service';
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

    loading: boolean = false                     // Loading overlay trigger value
    conference: Conference                       // Conference for this form
    beginDate: any                               // Conference begin date
    endDate: any                                 // Conference end date
    diets: Diet[] = []                           // Possible diets
    conferenceForm: FormGroup                    // Form for guest registration to Conference
    showForm: boolean = true                     // Show or hide form
    countries: any[] = []                        // List of countries
    payments: any[] = []                         // List of payments
    roomTypes: any[] = []                        // List of room types
    darkMode: boolean = false                    // Dark mode
    subscription: Subscription                   // Subscription for dark mode
   

    private isFormValid$: Observable<boolean>
    private formChanges$: Subject<void> = new Subject()
    private conferenceObs$: Observable<any> | undefined
    private guestServiceMessageObs$: Observable<any> | undefined

    constructor(public router: Router,
        private route: ActivatedRoute,
        private layoutService: LayoutService,
        private messageService: MessageService,
        private conferenceService: ConferenceService,
        private guestService: GuestService,
        private dietService: DietService,
        private formBuilder: FormBuilder,
        private translate: TranslateService) {

        this.subscription = this.layoutService.configUpdate$.subscribe(config => {
            this.darkMode = config.colorScheme === 'dark' || config.colorScheme === 'dim' ? true : false;
        })

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
            roomMate: [''],
            payment: ['', Validators.required],
            babyBed: ['', Validators.required],
            idCard: [null, Validators.required],
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
                    this.beginDate = this.conference.beginDate ? new Date(this.conference.beginDate) : undefined
                    this.endDate = this.conference.endDate ? new Date(this.conference.endDate) : undefined

                    // Setting conference-related data on the form
                    this.conferenceForm.patchValue({
                        conferenceid: this.conference.id,
                        conferenceName: this.conference.name
                    })

                    // Fill form with stored questions
                    if (this.conference?.questions?.length > 0) {
                        const answersArray = this.conferenceForm.get('answers') as FormArray
                        this.conference.questions[0].translations?.forEach(() => {
                            answersArray.push(this.formBuilder.control('', Validators.required))
                        })
                    }
                } else {
                    // If slug is invalid navigate to error page
                    this.router.navigateByUrl('/error-page')
                }
            }
        })

        // Guest
        this.guestServiceMessageObs$ = this.guestService.serviceMessageObs
        this.guestServiceMessageObs$.subscribe(message => {
            this.loading = false
            if (message == 'success') {
                this.showForm = false
                this.conferenceForm.reset()
                this.messageService.add({
                    severity: "success",
                    summary: "Sikeresen regisztrált!",
                    detail: "Sok szeretettel várjuk a konferenciára!",
                })
            } else {
                this.messageService.add({
                    severity: "error",
                    summary: "Hiba történt!",
                    detail: "Nem sikerült menteni az adatokat",
                })
            }
        })

        // Get diets for selector
        this.dietService.getDietsForSelector().subscribe({
            next: (data) => {
                this.diets = data
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
        const lang = this.translate.currentLang == 'gb' ? 'en' : this.translate.currentLang
        return this.conference.questions[0].translations[i][lang]
    }

    onSubmit(): void {
        this.messageService.clear()

        // Mark all form elements as dirty and touched
        Object.keys(this.conferenceForm.controls).forEach(key => {
            this.conferenceForm.get(key)?.markAsDirty()
            this.conferenceForm.get(key)?.markAsTouched()
        })

        if (this.conferenceForm.valid) {
            this.loading = true

            const guestData = { ...this.conferenceForm.value }
            const files = [this.conferenceForm.get('idCard')?.value]

            // Delete unnecessary fields
            delete guestData.idCard
            delete guestData.privacy

            this.guestService.createGuest(guestData, files)
        } else {
            this.messageService.add({
                severity: "error",
                summary: "Hiba!",
                detail: "Az űrlap nem lett megfelelően kitöltve!",
            })
        }
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

    // Don't delete this, its needed from a performance point of view,
    ngOnDestroy(): void {
    }
}
