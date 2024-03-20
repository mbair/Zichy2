import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription, Observable, Subject, BehaviorSubject } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { MessageService } from 'primeng/api';
import { CountryService } from 'src/app/demo/service/country.service';
import { Diet } from 'src/app/demo/api/diet';
import { DietService } from 'src/app/demo/service/diet.service';


@Component({
    selector: 'conference-form',
    templateUrl: './conference-form.component.html',
    styleUrls: ['./conference-form.component.scss'],
    providers: [MessageService],
})


export class ConferenceFormComponent implements OnInit, OnDestroy {

    conferenceForm: FormGroup;
    isFormValid$: Observable<boolean>;
    private formChanges$: Subject<void> = new Subject();

    subscription: Subscription;
    loading: boolean = false;
    darkMode: boolean = false;
    countries: any[] = [];
    payments: any[] = [];
    meals: any[] = [];
    roomTypes: any[] = [];
    diets: Diet[] = [];
    // diet: Diet = <Diet>{};

    constructor(public router: Router,
        private layoutService: LayoutService,
        private messageService: MessageService,
        private countryService: CountryService,
        private dietService: DietService,
        private formBuilder: FormBuilder) {

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
        // Fetch countries
        this.countryService.getCountries().then(countries => {
            this.countries = countries
        })

        // Fetch diets
        this.dietService.getDiets().then(diets => {
            this.diets = diets
        })

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

        // this.diets = [
        //     { label: 'Normál', value: 'normal' },
        //     { label: 'Gluténmentes', value: 'glutenFree' },
        //     { label: 'Laktózmentes', value: 'lactoseFree' },
        //     { label: 'Tejmentes', value: 'milkFree' },
        //     { label: 'Glutén és tej/laktózmentes', value: 'glutenAndLactoseFree' },
        //     { label: 'Vegetáriánus', value: 'vegetarian' }
        // ]

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

    get lastName() { return this.conferenceForm.controls['lastName'] }
    get firstName() { return this.conferenceForm.controls['firstName'] }
    get gender() { return this.conferenceForm.controls['gender'] }
    get birthdate() { return this.conferenceForm.controls['birthdate'] }
    get nationality() { return this.conferenceForm.controls['nationality'] }
    get country() { return this.conferenceForm.controls['country'] }
    get zipcode() { return this.conferenceForm.controls['zipcode'] }
    get email() { return this.conferenceForm.controls['email'] }
    get telefon() { return this.conferenceForm.controls['telefon'] }
    get arrivalDate() { return this.conferenceForm.controls['arrivalDate'] }
    get firstMeal() { return this.conferenceForm.controls['firstMeal'] }
    get diet() { return this.conferenceForm.controls['diet'] }
    get departureDate() { return this.conferenceForm.controls['departureDate'] }
    get lastMeal() { return this.conferenceForm.controls['lastMeal'] }
    get roomType() { return this.conferenceForm.controls['roomType'] }
    get roommate() { return this.conferenceForm.controls['roommate'] }
    get payment() { return this.conferenceForm.controls['payment'] }
    get babyBed() { return this.conferenceForm.controls['babyBed'] }
    get idCard() { return this.conferenceForm.controls['idCard'] }
    get privacy() { return this.conferenceForm.controls['privacy'] }


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

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
