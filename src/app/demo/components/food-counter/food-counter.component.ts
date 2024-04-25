import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Guest } from '../../api/guest';
import { GuestService } from '../../service/guest.service';
import { MealService } from '../../service/meal.service';
import { Observable } from 'rxjs';

const adultDosageAgeLimit: number = 10;  // From the age of 10, we give an adult dose
const mealTimes: object = {
    breakfast: {
        begin: 7,
        end: 10
    },
    lunch: {
        begin: 11,
        end: 15
    },
    dinner: {
        begin: 17,
        end: 20
    }
}

@Component({
    selector: 'food-counter',
    templateUrl: './food-counter.component.html',
    styleUrls: ['./food-counter.component.scss'],
    providers: [MessageService],
})


export class FoodCounterComponent implements OnInit, OnDestroy {

    currentMeal: string;
    translatedMeal: string;
    mealsNumber: number = 0;
    guest: Guest;
    guests: Guest[];
    loading: boolean = false;
    alreadyRecievedFood: boolean = false;
    ageGroup: string = '';
    scanTemp: string = '';
    scannedCode: string = '';
    screenWidth: number = window.screen.width;
    screenHeight: number = window.screen.height;

    guestsObs$: Observable<any> | undefined;
    serviceMessageObs$: Observable<any> | undefined;

    constructor(public router: Router,
        private guestService: GuestService,
        private mealService: MealService,
        private messageService: MessageService) {
    }

    ngOnInit() {
        this.guestsObs$ = this.guestService.guestObs;
        this.guestsObs$.subscribe((data) => {
            this.loading = false;
            if (data) {
                this.guests = data;
            }
        })

        // Get all Guests
        // this.guestService.getGuests()

        // Initalize guest
        this.guest = {
            lastName: '',
            firstName: '',
            diet: '',
            conferenceName: '',
        }

        // Set Actual mealName
        this.currentMeal = this.mealService.getCurrentMealName();
        this.translatedMeal = this.translateMealName(this.currentMeal);
    }

    public incMealsCount() {
        this.mealsNumber++
    }

    @HostListener('window:keypress', ['$event'])
    keyEvent(event: KeyboardEvent): void {
        if (event.key === 'Enter') {
            // The QR/Bar code is ready here
            // Do something here with the scanned code
            this.scannedCode = this.scanTemp
            this.scanTemp = ''
            console.log('scannedCode', this.scannedCode)

            this.getGuestByRFID(this.scannedCode)

            // this.guests.map(guest => {
            //     if (guest.rfid === this.scannedCode) {
            //         this.guest = guest
            //         this.mealsNumber++

            //         let birthDate = new Date('1985-10-13')
            //         let age: number = this.calculateAge(birthDate)
            //         if (age >= 18) {
            //             this.ageGroup = 'felnőtt'
            //         } else {
            //             this.ageGroup = 'gyermek'
            //         }
            //     }
            // })
        } else {
            if (event.key === 'ö') {
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

    getGuestByRFID(rfid: string): void {
        console.log('getGuestByRFID', rfid)
        this.guestService.getByRFID(rfid).subscribe({
            next: (data) => {

                // Check whether the guest has already received food in the given meal cycle
                if (data.lastRfidUsage) {
                    let lastRfidUsage = new Date(data.lastRfidUsage)
                    let now = new Date()
                }


                this.guest = data;
                this.mealsNumber++
                console.log('Guest data:', data)

                let birthDate = new Date('1985-10-13') // TODO: Remove hardcoded birthDate
                this.setAgeGroup(birthDate)
            },
            error: (error) => {
                console.error('Error:', error)
            }
        })
    }

    setAgeGroup(birthDate: Date) {
        let ageDifMs = Date.now() - birthDate.getTime();
        let ageDate = new Date(ageDifMs); // miliseconds from epoch
        let age = Math.abs(ageDate.getUTCFullYear() - 1970);

        if (age >= adultDosageAgeLimit) {
            this.ageGroup = 'felnőtt'
        } else {
            this.ageGroup = 'gyermek'
        }
    }

    translateMealName(mealName: string): string {
        const translations: any = {
            breakfast: 'Reggeli',
            lunch: 'Ebéd',
            dinner: 'Vacsora'
        }

        return translations[mealName] || mealName;
    }

    ngOnDestroy() {
    }
}
