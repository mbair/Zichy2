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
    canEat: boolean = false;
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

        this.mealService.mealChanged.subscribe(() => {
            this.updateCurrentMeal()
        })
        this.updateCurrentMeal()

        // Initalize guest
        this.resetGuest()
    }

    public resetGuest() {
        this.ageGroup = ''
        this.guest = {
            lastName: '',
            firstName: '',
            diet: '',
            conferenceName: '',
        }
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

            // Reset Guest
            this.resetGuest()

            // Query a guest belonging to RFID
            this.getGuestByRFID(this.scannedCode)
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
        let mealName = this.mealService.getMealNameByTime(new Date())
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

                // Define AgeGroup
                this.setAgeGroup(this.guest.birthDate)

                // Check whether the guest has already received food in the given meal cycle
                let today = moment(),
                    dateOfArrival = moment(new Date(data.dateOfArrival).setHours(0)),
                    dateOfDeparture = moment(new Date(data.dateOfDeparture).setHours(24));

                if (dateOfArrival <= today && today <= dateOfDeparture) {

                    // The arrival date is today
                    if (dateOfArrival.isSame(today, 'day')) {
                        if (this.currentMeal == 'reggeli') {
                            if (data.firstMeal == 'reggeli') {
                                this.canEat = true
                            }
                        }
                        else if (this.currentMeal == 'ebéd') {
                            if (data.firstMeal == 'reggeli' || data.firstMeal == 'ebéd') {
                                this.canEat = true
                            }
                        }
                        else if (this.currentMeal == 'vacsora') {
                            if (data.firstMeal == 'reggeli' || data.firstMeal == 'ebéd' || data.firstMeal == 'vacsora') {
                                this.canEat = true
                            }
                        }
                    }

                    // The departure date is today
                    if (dateOfDeparture.isSame(today, 'day')) {
                        if (this.currentMeal == 'reggeli') {
                            if (data.lastMeal == 'reggeli' || data.lastMeal == 'ebéd' || data.lastMeal == 'vacsora') {
                                this.canEat = true
                            }
                        }
                        if (this.currentMeal == 'ebéd') {
                            if (data.lastMeal == 'ebéd' || data.lastMeal == 'vacsora') {
                                this.canEat = true
                            }
                        }
                        else if (this.currentMeal == 'vacsora') {
                            if (data.lastMeal == 'vacsora') {
                                this.canEat = true
                            }
                        }
                    }
                }

                this.alreadyRecievedFood = false;
                if (data.lastRfidUsage) {
                    let lastRfidUsage = new Date(data.lastRfidUsage)
                        lastRfidUsage = new Date(lastRfidUsage.getTime() - (2 * 60 * 60 * 1000)) // TODO: TimeZone bug

                    let lastMeal = this.mealService.getMealNameByTime(lastRfidUsage)
                    if (this.currentMeal == lastMeal) {
                        this.alreadyRecievedFood = true
                    }
                    // let duration = moment.duration(moment().diff(lastRfidUsage))
                    // let hours = duration.asHours();
                    // if (hours < 2) {
                    //     this.alreadyRecievedFood = true
                    // }
                }

                // The guest is eating for the first time at this meal
                this.mealsNumber++

                // Insert Timestamp to lastRfidUsage
                this.guest.lastRfidUsage = moment().format('YYYY-MM-DD HH:mm:ss');
                this.guestService.updateGuest(this.guest)
            },
            error: (error) => {
                console.error('Error:', error)
                if (error.status === 404) {
                    this.guest = {
                        lastName: 'ISMERETLEN',
                        firstName: 'ESZKÖZ'
                    }
                }
            }
        })
    }

    setAgeGroup(birthDate: string | undefined): void {
        if (!birthDate) {
            this.ageGroup = 'Hibás dátum'
        } else {
            let birthDateD = moment(new Date(birthDate)),
                duration = moment.duration(moment(new Date()).diff(birthDateD)),
                age = duration.asYears()

            this.ageGroup = age >= ADULT_DOSAGE_AGE_LIMIT ? 'felnőtt' : 'gyermek'
        }
    }

    ngOnDestroy() {
    }
}
