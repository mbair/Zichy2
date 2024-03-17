import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { MessageService } from 'primeng/api';
import { CountryService } from 'src/app/demo/service/country.service';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription, Observable, Subject, BehaviorSubject } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';


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

    arrivalDate: Date = new Date();
    departureDate: Date = new Date();
    diet: string = '';
    firstMeal: string = '';
    lastMeal: string = '';
    lastName: string = '';
    firstName: string = '';
    gender: any = '';
    idCard: any;
    male: boolean = false;
    female: boolean = false;
    birthdate: Date = new Date();
    nationality: string = '';
    country: string = '';
    zipcode: string = '';
    email: string = '';
    telefon: string = '';
    roommate: string = '';
    privacy: boolean = false;
    szepCard: any = '';
    roomType: string = '';
    babyBed: any = '';
    payment: string = '';
    countries: any[] = [];
    diets: any[] = [];
    payments: any[] = [];
    meals: any[] = [];
    roomTypes: any[] = [];



    constructor(public router: Router,
        private layoutService: LayoutService,
        private messageService: MessageService,
        private countryService: CountryService,
        private formBuilder: FormBuilder) {

            this.subscription = this.layoutService.configUpdate$.subscribe(config => {
                this.darkMode = config.colorScheme === 'dark' || config.colorScheme === 'dim' ? true : false;
            })

            this.isFormValid$ = new BehaviorSubject<boolean>(false)

            this.conferenceForm = this.formBuilder.group({
                gender: ['', Validators.required],
                birthdate: ['', Validators.required],
                nationality: ['', Validators.required],
                country: ['', Validators.required],
                email: ['', [Validators.required, Validators.email]],
                idCard: ['', [Validators.required, Validators.email]],
                telefon: ['', Validators.required],
                arrivalDate: ['', Validators.required],
                firstName: ['', Validators.required],
                firstMeal: ['', Validators.required],
                diet: ['', Validators.required],
                departureDate: ['', Validators.required],
                lastName: ['', Validators.required],
                lastMeal: ['', Validators.required],
                roomType: ['', Validators.required],
                roommate: ['', Validators.required],
                payment: ['', Validators.required],
                babyBed: ['', Validators.required],
                privacy: ['', Validators.required],
                zipcode: ['', Validators.required],
            })
    }

    ngOnInit() {

        this.countryService.getCountries().then(countries => {
            this.countries = countries
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

        this.diets = [
            { label: 'Normál', value: 'normal' },
            { label: 'Gluténmentes', value: 'glutenFree' },
            { label: 'Laktózmentes', value: 'lactoseFree' },
            { label: 'Tejmentes', value: 'milkFree' },
            { label: 'Glutén és tej/laktózmentes', value: 'glutenAndLactoseFree' },
            { label: 'Vegetáriánus', value: 'vegetarian' }
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

    onSubmit(): void {
        console.log('onSubmit')
        this.loading = true;

        setTimeout(() => {
            this.loading = false

            console.log('Az űrlap adatok:', this.conferenceForm.value);

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
                    detail: "Az űrlap nem megfelelően lett kitöltve!",
                })
            }


        }, 2000)
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
