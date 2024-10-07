import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription, Observable, Subject, BehaviorSubject } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, switchMap } from 'rxjs/operators';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { TranslateService } from '@ngx-translate/core';
import { emailDomainValidator } from '../../utils/email-validator';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { MessageService } from 'primeng/api';
import { ConferenceService } from '../../service/conference.service';
import { CountryService } from '../../service/country.service';
import { DietService } from '../../service/diet.service';
import { Language } from '../../api/language';
import { Diet } from '../../api/diet';


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
    languages: Language[] = []                   // List of system languages
    conferenceSlug: string;                      // Conference Slug
    diets: Diet[] = []                           // Possible diets
    conferenceForm: FormGroup;                   // Form for guest registration to Conference
    selectedLanguage: any;                       // Selected system language
    subscription: Subscription;
    darkMode: boolean = false;
    countries: any[] = [];
    payments: any[] = [];
    meals: any[] = [];
    roomTypes: any[] = [];

    // slugValid$ = this.route.paramMap.pipe(
    //     map(params => params.get('slug')),
    //     switchMap(slug => this.conferenceService.isSlugValid(slug!))
    // )

    private isFormValid$: Observable<boolean>;
    private formChanges$: Subject<void> = new Subject();

    constructor(public router: Router,
        private route: ActivatedRoute,
        private layoutService: LayoutService,
        private messageService: MessageService,
        private countryService: CountryService,
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
            email: ['', [Validators.required, Validators.email]],
            telefon: ['', Validators.required],
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
        })

        this.isFormValid$ = new BehaviorSubject<boolean>(false)
    }

    ngOnInit() {
        // this.slugValid$.subscribe(isValid => {
        //     if (!isValid) {
        //         // Ha a slug érvénytelen, navigálunk egy hibaoldalra
        //         console.error('Invalid slug!')
        //         // this.router.navigateByUrl('/error-page')
        //     } else {
        //         // Ha érvényes, folytathatjuk a folyamatot
        //         console.log('Slug is valid')
        //     }
        // })


        // Get diets for selector
        this.dietService.getDietsForSelector().subscribe({
            next: (data) => {
                this.diets = data
            }
        })

        // Fetch countries
        this.countryService.getCountries().subscribe(countries => {
            this.countries = countries
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

        // Set selected language
        if (browserLang) {
            this.selectedLanguage = this.languages.find(language =>
                language.code.toLowerCase() == defaultLang.toLowerCase()
            )
        }

        this.payments = [
            { label: 'Banki átutalás', value: 'Banki átutalás' },
            { label: 'SZÉP kártya', value: 'SZÉP kártya' },
            { label: 'Készpénz', value: 'Készpénz' },
        ]

        this.meals = [
            { label: 'Reggeli', value: 'reggeli' },
            { label: 'Ebéd', value: 'ebéd' },
            { label: 'Vacsora', value: 'vacsora' },
            { label: 'Nem kérek étkezést', value: 'nem kér' },
        ]

        this.roomTypes = [
            { label: 'Nem kérek szállást', value: 'Nem kérek szállást' },
            { label: 'Kastély szállás 4 ágyas szoba', value: 'Kastély szállás 4 ágyas szoba' },
            { label: 'Kastély szállás 6 ágyas szoba', value: 'Kastély szállás 6 ágyas szoba' },
            { label: 'Kastély szállás 8 ágyas szoba', value: 'Kastély szállás 8 ágyas szoba' },
            { label: 'Maranatha Panzióház 2 ágyas szoba (külön fürdős)', value: 'Maranatha Panzióház 2 ágyas szoba (külön fürdős)' },
            { label: 'Maranatha Panzióház franciaágyas szoba (külön fürdős)', value: 'Maranatha Panzióház franciaágyas szoba (külön fürdős)' },
            { label: 'Maranatha Panzióház 4 ágyas szoba (emeletes ágyas, külön fürdős)', value: 'Maranatha Panzióház 4 ágyas szoba (emeletes ágyas, külön fürdős)' },
            { label: 'Apartman (közös konyhával, fürdővel és nappalival)', value: 'Apartman (közös konyhával, fürdővel és nappalival)' },
        ]

        this.isFormValid$ = this.formChanges$.pipe(
            debounceTime(300),
            distinctUntilChanged(),
            map(() => this.conferenceForm.valid)
        )

        // Monitor the changes of the form
        this.conferenceForm.valueChanges.subscribe(() => this.formChanges$.next());
    }

    get lastName() { return this.conferenceForm.get('lastName') }
    get firstName() { return this.conferenceForm.get('firstName') }
    get gender() { return this.conferenceForm.get('gender') }
    get birthdate() { return this.conferenceForm.get('birthdate') }
    get nationality() { return this.conferenceForm.get('nationality') }
    get country() { return this.conferenceForm.get('country') }
    get zipcode() { return this.conferenceForm.get('zipcode') }
    get email() { return this.conferenceForm.get('email') }
    get telefon() { return this.conferenceForm.get('telefon') }
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


    getDietColor(diet: string): string {
        return this.dietService.getDietColor(diet)
    }

    onSubmit(): void {
        console.log('onSubmit')

        // Az összes form elemet módosítottra állítjuk
        this.conferenceForm.markAllAsTouched()
        this.conferenceForm.markAsDirty()
        this.loading = true;

        setTimeout(() => {
            this.loading = false

            console.log('Az űrlap adatok:', this.conferenceForm.value);

            // Új üzenet hozzáadása előtt, először töröljük az összes meglévőt
            this.messageService.clear();

            if (this.conferenceForm.valid) {
                // Az űrlap adatok elküldése a szerverre

                this.messageService.add({
                    severity: "success",
                    summary: "Sikeresen regisztrált!",
                    detail: "Sok szeretettel várjuk a konferenciára!",
                })
            } else {
                // Az űrlap érvénytelen, ki kell javítani az összes hibát
                console.log('Az űrlap érvénytelen, kérjük, javítsa az összes hibát.');

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
    }

    // Don't delete this, its needed from a performance point of view,
    ngOnDestroy(): void {
    }
}
