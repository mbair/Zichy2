import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Guest } from '../../api/guest';
import { FoodCounterWebSocket } from '../../service/foodCounterWebSocket.service';
import { GuestService } from '../../service/guest.service';
import { MealService } from '../../service/meal.service';
import { LogService } from '../../service/log.service';
import { Observable } from 'rxjs';
import * as moment from 'moment';
moment.locale('hu')

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
    guests: Guest[] = [];
    loading: boolean = false;
    alreadyRecievedFood: boolean = false;
    canEat: boolean = false;
    ageGroup: string = '';
    scanTemp: string = '';
    scannedCode: string = '';
    windowWidth: number;
    windowHeight: number;
    backgroundColor: string = 'surface-ground';

    // WebSocket
    message: string;
    messages: string[] = [];

    guestsObs$: Observable<any> | undefined;
    serviceMessageObs$: Observable<any> | undefined;

    constructor(public router: Router,
        private guestService: GuestService,
        private mealService: MealService,
        private logService: LogService,
        private foodCountWebSocket: FoodCounterWebSocket,
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
                this.setCurrentMealsNumber()
            }
        })
        // Get guests to define current meals number
        // this.guestService.getGuests() // TODO: what is this

        // Listen to meal changes
        this.mealService.mealChanged.subscribe(() => {
            this.updateCurrentMeal()
        })
        this.updateCurrentMeal()

        // Initalize guest
        this.resetGuest()

        // TODO: TESZT
        // setTimeout(() => {
        //     this.getGuestByRFID('127921')
        // }, 500);

        const socketRoom = this.currentMeal === 'reggeli' ? 'breakfast' :
            this.currentMeal === 'ebéd' ? 'lunch' :
                this.currentMeal === 'vacsora' ? 'dinner' : "nothing";

        this.foodCountWebSocket.joinRoom(socketRoom);

        this.foodCountWebSocket.getDefData().subscribe((mealnum: any) => {
            console.log(mealnum, "-- Def data --")
            this.mealsNumber = mealnum
        })

        this.foodCountWebSocket.getMealsNumber().subscribe((mealnum: any) => {
            this.mealsNumber = mealnum;
            console.log(mealnum)
        })
    }

    sendMessage() {
        this.foodCountWebSocket.sendMessage(this.mealsNumber.toString())
        this.message = '';
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

    @HostListener('window:keypress', ['$event'])
    keyEvent(event: KeyboardEvent): void {
        if (event.key === 'Enter') {
            // The QR/Bar code is ready here
            // Do something here with the scanned code
            this.scannedCode = this.scanTemp
            this.scanTemp = ''
            console.log('scannedCode', this.scannedCode)

            // Show scannedCode in Toast message
            // this.messageService.add({
            //     severity: 'info',
            //     summary: 'Beolvasott kód',
            //     detail: this.scannedCode,
            //     life: 10000
            // })

            // Logging scannedCode
            this.logService.createLog({
                name: "FoodCounter scannedCode: " + this.scannedCode + " | Lang: " + navigator.language,
                capacity: 0
            })

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

                    // Intermediate days
                    if (dateOfArrival !== today && today !== dateOfDeparture) {
                        this.canEat = true
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
                    let lastMeal = this.mealService.getMealNameByTime(lastRfidUsage)

                    if (this.currentMeal == lastMeal) {
                        this.alreadyRecievedFood = true

                        // Logging error
                        this.logService.createLog({
                            name: "FoodCounter Already received food: " + this.guest.lastName + " " + this.guest.firstName + " " + this.scannedCode + " | Lang: " + navigator.language,
                            capacity: 0
                        })
                    }
                }

                // The guest is eating for the first time at this meal
                this.mealsNumber++
                this.sendMessage()

                // Insert Timestamp to lastRfidUsage
                this.guest.lastRfidUsage = moment().format('YYYY-MM-DD HH:mm:ss');
                this.guestService.updateGuest(this.guest)

                // Set background color
                this.backgroundColor = this.getDietColor(this.guest.diet)
            },
            error: (error) => {
                console.error('Error:', error)
                console.log('error status', error.status)
                if (error.status === 404) {
                    this.guest = {
                        lastName: 'ISMERETLEN',
                        firstName: 'ESZKÖZ'
                    }

                    // Logging error
                    this.logService.createLog({
                        name: "FoodCounter Unknown Device: " + this.scannedCode + " | Lang: " + navigator.language,
                        capacity: 0
                    })
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

    setCurrentMealsNumber(): void {

        if (!this.guests || !Array.isArray(this.guests)) return;

        // Find guests who has used their RFID's
        this.guests.map(guest => {

            // Filter out test users
            if (guest.lastName !== "Gábris") {
                if (guest.lastRfidUsage) {
                    let lastRfidUsage = moment(new Date(guest.lastRfidUsage))

                    // Usage was today
                    let today = moment()
                    if (lastRfidUsage.isSame(today, 'day')) {
                        let lastMeal = this.mealService.getMealNameByTime(new Date(guest.lastRfidUsage))
                        if (this.currentMeal == lastMeal) {
                            this.mealsNumber++
                        }
                    }
                }
            }
        })
    }

    getDietColor(diet: string | undefined): string {
        switch (this.guest.diet) {
            case 'tejmentes':
                return 'blue-400';
            case 'laktózmentes':
                return 'blue-400'
            case 'gluténmentes':
                return 'yellow-300'
            case 'glutén és tej/laktózmentes':
                return 'red-500'
            case 'vegetáriánus':
                return 'teal-500'
            case 'nem kér étkezést':
                return 'gray-300'
            default:
                return 'gray-700'
        }
    }

    // Don't delete this, its needed from a performance point of view,
    ngOnDestroy() {
    }
}
