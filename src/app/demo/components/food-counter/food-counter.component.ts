import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';


interface Guest {
    id: number,
    firstName: string,
    lastName: string,
    nationality: string,
    country: string,
    zipCode: string,
    roomNum: string,
    dateOfArrival: string,
    firstMeal: string,
    dateOfDeparture: string,
    lastMeal: string,
    szepCard: number,
    accommodationExtra: string,
    birthDate: string,
    rfid: string,
    enabled: number,
    diet: string,
    ageGroup: string,
    conferenceName: string,
    servedMeals: string,
}

@Component({
    selector: 'food-counter',
    templateUrl: './food-counter.component.html',
    styleUrls: ['./food-counter.component.scss'],
    providers: [MessageService],
})


export class FoodCounterComponent implements OnInit, OnDestroy {

    mealsNumber: number = 0;
    guest: Guest | undefined;
    loading: boolean = false;

    private code: string = '';

    constructor(public router: Router, private messageService: MessageService) {
    }

    ngOnInit() {

        this.guest = {
            id: 1,
            firstName: 'Balázs',
            lastName: 'Gábris',
            nationality: 'hungarian',
            country: 'hungary',
            zipCode: '7626',
            roomNum: '113',
            dateOfArrival: '2024.04.21',
            firstMeal: '2024.04.21',
            dateOfDeparture: '2024.04.21',
            lastMeal: '2024.04.21',
            szepCard: 0,
            accommodationExtra: '',
            birthDate: '1985.10.13',
            rfid: '156221',
            enabled: 1,

            // TODO: Az alábbi mezők szükségesek
            diet: 'Húsevő',
            ageGroup: 'Felnőtt',
            conferenceName: 'Teszt Konferencia 2024',
            servedMeals: '113',
        }

        var RFIDS = [
            // Fekete
            {
                code: '156221',
                guestName: 'Gábris Balázs',
                diet: 'Húsevő',
                ageGroup: 'Felnőtt',
                conferenceName: 'Teszt Konferencia 2024',
                servedMeals: '113',
            },
            // Piros
            {
                code: '318113',
                guestName: 'Timi',
                diet: 'Vegetáriánus',
                ageGroup: 'Felnőtt',
                conferenceName: 'Teszt Konferencia 2024',
                servedMeals: '114',
            },
            // Kék
            {
                code: '7679569',
                guestName: 'István',
                diet: 'Húsevő',
                ageGroup: 'Felnőtt',
                conferenceName: 'Teszt Konferencia 2024',
                servedMeals: '115',
            },
            // Zöld
            {
                code: '3916686',
                guestName: 'Máté',
                diet: 'Vegetáriánus',
                ageGroup: 'Felnőtt',
                conferenceName: 'Teszt Konferencia 2024',
                servedMeals: '116',
            },
            // Sárga
            {
                code: '361343',
                guestName: 'Dávidka',
                diet: 'Bébiétel',
                ageGroup: 'Gyermek',
                conferenceName: 'Teszt Konferencia 2024',
                servedMeals: '117',
            },
        ]
    }

    @HostListener('window:keypress', ['$event'])
    keyEvent(event: KeyboardEvent): void {
        if (event.key === 'Enter') {
            // The QR/Bar code is ready here
            // Do something here with the scanned code
            console.log('hello', this.code)
            // alert('CODE: ' + this.code)
            // this.guest?.rfid = this.code

            this.getGuestByRFID()
        } else {
            if (event.key === 'ö'){
                this.code += '0'
            } else {
                this.code += event.key
            }
        }
    }

    getGuestByRFID(): any {

    }

    onScan(): void {
        this.loading = true;

        setTimeout(() => {
            this.loading = false

            // Új üzenet hozzáadása előtt, először töröljük az összes meglévőt
            this.messageService.clear();

            // if (this.conferenceForm.valid) {
                // Az űrlap adatok elküldése a szerverre

                this.messageService.add({
                    severity: "success",
                    summary: "Sikeresen regisztrált!",
                    detail: "Sok szeretettel várjuk a konferenciára!",
                })
            // } else {
                // Az űrlap érvénytelen, ki kell javítani az összes hibát
                console.log('Az űrlap érvénytelen, kérjük, javítsa az összes hibát.');

                this.messageService.add({
                    severity: "error",
                    summary: "Hiba!",
                    detail: "Az űrlap nem lett megfelelően kitöltve!",
                })
            // }
        }, 500)
    }

    ngOnDestroy() {
    }
}
