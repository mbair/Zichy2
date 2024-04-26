import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Guest } from '../../api/guest';
import { GuestService } from '../../service/guest.service';
import { MealService } from '../../service/meal.service';
import { Observable } from 'rxjs';
import * as moment from 'moment';


const ADULT_DOSAGE_AGE_LIMIT: number = 10;  // From the age of 10, we give an adult dose

@Component({
    selector: 'food-counter',
    templateUrl: './food-counter.component.html',
    styleUrls: ['./food-counter.component.scss'],
    providers: [MessageService],
})


export class FoodCounterComponent implements OnInit, OnDestroy {

    isOpen: boolean;
    currentMeal: string;
    mealsNumber: number = 0;
    guest: Guest;
    guests: Guest[];
    loading: boolean = false;
    alreadyRecievedFood: boolean = false;
    ageGroup: string = '';
    scanTemp: string = '';
    scannedCode: string = '';
    windowWidth: number;
    windowHeight: number;

    guestsObs$: Observable<any> | undefined;
    serviceMessageObs$: Observable<any> | undefined;

    constructor(public router: Router,
        private guestService: GuestService,
        private mealService: MealService,
        private messageService: MessageService) {

        // Tablet size: 854 x 534 px
        this.windowWidth = window.innerWidth || document.documentElement.clientWidth;
        this.windowHeight = window.innerHeight || document.documentElement.clientHeight;
    }

    ngOnInit() {
        this.guestsObs$ = this.guestService.guestObs;
        this.guestsObs$.subscribe((data) => {
            this.loading = false;
            if (data) {
                this.guests = data;
            }
        })

        // Initalize guest
        this.guest = {
            lastName: '',
            firstName: '',
            diet: '',
            conferenceName: '',
        }

        this.mealService.mealChanged.subscribe(() => {
            this.updateCurrentMeal()
        })
        this.updateCurrentMeal()
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

    @HostListener('window:resize', ['$event'])
    onResize(event: UIEvent) {
        this.windowWidth = window.innerWidth || document.documentElement.clientWidth
        this.windowHeight = window.innerHeight || document.documentElement.clientHeight
    }

    updateCurrentMeal(): void {
        this.isOpen = this.mealService.isOpen()
        let mealName = this.mealService.getCurrentMealName()
        if (mealName !== this.currentMeal) {
            this.currentMeal = mealName
            this.mealsNumber = 0
        }
    }

    getGuestByRFID(rfid: string): void {
        this.guestService.getByRFID(rfid).subscribe({
            next: (data) => {

                // Update guest information
                this.guest = data;
                console.log('Guest data:', data)

                // Define AgeGroup
                this.setAgeGroup(this.guest.birthDate)

                // Check whether the guest has already received food in the given meal cycle
                if (data.lastRfidUsage) {
                    let lastRfidUsage = new Date(data.lastRfidUsage)
                    console.log('lastRfidUsage', lastRfidUsage)
                    let now = new Date()
                    let timeDiffinMs: number = now.getTime() - lastRfidUsage.getTime();
                    let twoHoursInMs: number = 2 * 60 * 60 * 1000;
                    console.log('timeDiffinMs', timeDiffinMs)
                    if (timeDiffinMs >= twoHoursInMs) {
                        this.alreadyRecievedFood = true;
                    }
                }

                // The guest is eating for the first time at this meal
                else {
                    this.mealsNumber++

                    // Insert Timestamp to lastRfidUsage
                    let date = new Date();
                    let now = moment(date).format('YYYY-MM-DD HH:mm:ss')
                    this.guest.lastRfidUsage = now;
                    this.guestService.updateGuest(this.guest)
                }
            },
            error: (error) => {
                console.error('Error:', error)
            }
        })
    }

    setAgeGroup(birthDate: string | undefined): void {
        if (!birthDate) {
            this.ageGroup = 'Hibás dátum'
        } else {
            let birthDateD = new Date(birthDate)
            let ageDifMs = Date.now() - birthDateD.getTime();
            let ageDate = new Date(ageDifMs); // miliseconds from epoch
            let age = Math.abs(ageDate.getUTCFullYear() - 1970);

            if (age >= ADULT_DOSAGE_AGE_LIMIT) {
                this.ageGroup = 'felnőtt'
            } else {
                this.ageGroup = 'gyermek'
            }
        }
    }

    ngOnDestroy() {
    }
}
