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

    version: string;
    isOpen: boolean;
    currentMeal: string;
    mealsNumber: number = 0;
    guest: Guest | null = null;
    loading: boolean = false;
    alreadyReceivedFood: boolean = false;
    canEat: boolean = false;
    ageGroup: string = '';
    scanTemp: string = '';
    scannedCode: string = '';
    windowWidth: number;
    windowHeight: number;
    connectionStatus: boolean = false;
    backgroundColor: string = 'surface-ground';

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

        // Frontend version
        this.version = 'v' + localStorage.getItem("APP_VERSION")
    }

    ngOnInit() {
        // Set Open/Closed state
        this.isOpen = this.mealService.isOpen()

        // Set actual meal name
        this.currentMeal = this.mealService.getMealNameByTime(new Date())

        // Listen to meal changes
        this.mealService.mealChanged.subscribe(() => {
            this.updateCurrentMeal()
        })

        // Initialize guest
        this.resetGuest()

        // Set WebSocket room (room name is meal name)
        this.setSocketRoom(this.currentMeal)

        // Set default mealsNumber
        this.foodCountWebSocket.getDefData().subscribe((mealsNumber: any) => {
            this.mealsNumber = mealsNumber
            console.log("Default mealsNumber", mealsNumber)
        })

        // Listen to mealsNumber change
        this.foodCountWebSocket.getMealsNumber().subscribe((mealsNumber: any) => {
            this.mealsNumber = mealsNumber
            console.log("Actual mealsNumber", mealsNumber)
        })

        this.foodCountWebSocket.getConnectionStatus().subscribe(status => {
            this.connectionStatus = status;
            console.log('Connection status:', status ? 'Connected' : 'Disconnected')
        })

        this.foodCountWebSocket.onMessage('data').subscribe(data => {
            console.log('Received data:', data)
        })

        // Calculation of served meal has moved to WebSocket
        // this.guestsObs$ = this.guestService.guestObs;
        // this.guestsObs$.subscribe((data) => {
        //     this.loading = false;
        // if (data) {
        // this.guests = data;
        // this.setCurrentMealsNumber()
        // }
        // })
        // Get guests to define current meals number
        // this.guestService.get()

        // TODO: TESZT
        // setTimeout(() => {
        //     this.getGuestByRFID('127921')
        // }, 500);
    }

    /**
     * Set websocket room
     */
    setSocketRoom(currentMeal: string) {
        let socketRoom;
        switch (currentMeal) {
            case 'reggeli':
                socketRoom = 'breakfast'
                break;
            case 'ebéd':
                socketRoom = 'lunch'
                break;
            case 'vacsora':
                socketRoom = 'dinner'
                break;
            default:
                socketRoom = 'nothing'
                break;
        }

        this.foodCountWebSocket.joinRoom(socketRoom)
    }

    /**
     * WebSocket message sending
     */
    sendMessage() {
        this.foodCountWebSocket.sendMessage('increase')
    }

    /**
     * Reset Guest data
     */
    resetGuest() {
        this.guest = {
            id: 0,
            lastName: '',
            firstName: '',
            diet: '',
            conferenceName: '',
        }
        this.ageGroup = '';
        this.canEat = false;
        this.alreadyReceivedFood = false;
    }

    /**
     * NFC Read listener
     * @param event
     * @returns
     */
    @HostListener('window:keypress', ['$event'])
    keyEvent(event: KeyboardEvent): void {
        if (event.key === 'Enter') {

            // If the RFID query is still running, with previously scanned code
            // Avoid to querying again
            if (this.scannedCode === this.scanTemp) {
                console.log('Előzővel azonos NFC kód')

                // Logging same RFID code
                this.logService.create({
                    action_type: "same code",
                    table_name: "food_counter",
                    original_data: `${this.guest?.lastName} ${this.guest?.firstName} (${this.scannedCode})`,
                })

                this.scanTemp = ''
                return
            }

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
            if (event.key === 'ö' || event.key === 'Ö') {
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

    /**
     * Window resize listener
     * @param event
     */
    @HostListener('window:resize', ['$event'])
    onResize(event: UIEvent) {
        this.windowWidth = window.innerWidth || document.documentElement.clientWidth
        this.windowHeight = window.innerHeight || document.documentElement.clientHeight
    }

    /**
     * Updates current meal by time
     */
    updateCurrentMeal(): void {
        let mealName = this.mealService.getMealNameByTime(new Date())
        if (mealName !== this.currentMeal) {
            this.currentMeal = mealName

            // Reload page to get the actual software version
            window.location.reload()
        }
    }

    getGuestByRFID(rfid: string): void {
        this.guestService.getByRFID(rfid).subscribe({
            next: (data) => {

                // Update guest information
                this.guest = data

                // Define AgeGroup
                this.setAgeGroup(this.guest?.birthDate)

                // Set background color
                this.backgroundColor = this.getDietColor(this.guest?.diet)

                // Logging scannedCode
                this.logService.create({
                    action_type: "scanned code",
                    table_name: "food_counter",
                    original_data: `${this.guest?.lastName} ${this.guest?.firstName} (${this.guest?.rfid})`,
                })

                // Check whether the guest has already received food in the given meal cycle
                let today = moment(),
                    dateOfArrival = moment(new Date(data.dateOfArrival).setHours(1)),
                    dateOfDeparture = moment(new Date(data.dateOfDeparture).setHours(23));

                if (dateOfArrival <= today && today <= dateOfDeparture) {

                    // Don't ask for meal, we will not investigate further
                    if (data.diet == 'nem kér étkezést') {
                        this.canEat = false
                        return
                    }

                    // VISITOR (NOT HOTEL GUEST)
                    if (data.roomNum?.includes("látogató")){

                        // visitor + more meal
                        if (data.roomNum == 'látogató +több étkezés') {
                            this.canEat = true
                        }

                        // visitor +1 meal
                        if (data.roomNum == 'látogató +1 étkezés') {
                            // If visitor eat today, or
                            // has used the RFID and it was not today
                            if (!data.lastRfidUsage ||
                                (data.lastRfidUsage && !moment(data.lastRfidUsage).isSame(moment(), 'day'))) { // TODO: itt legyen azonos a firstMeal és lastMeal
                                    this.canEat = true
                            }
                        }

                        // visitor +2 meal
                        if (data.roomNum == 'látogató +2 étkezés') {
                            // First meal or Last meal is equivalent with current meal.
                            // It works differently than with the guest, here it doesn't mean the first and last meal,
                            // but when the visitor can eat during the day
                            if (data.firstMeal == this.currentMeal || data.lastMeal == this.currentMeal) {
                                this.canEat = true
                            }
                        }

                    // HOTEL GUEST
                    } else {

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
                        if (!dateOfArrival.isSame(today, 'day') && !dateOfDeparture.isSame(today, 'day')) {
                            this.canEat = true
                        }

                        // The departure date is today
                        if (dateOfDeparture.isSame(today, 'day')) {
                            this.canEat = false // Needed when arrival and departure are same day
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
                }

                // If the guest is not entitled to eat, we will not investigate further
                if (!this.canEat) {
                    this.canEat = false
                    return
                }

                // If Guest has used the RFID and it was today
                if (data.lastRfidUsage && moment(data.lastRfidUsage).isSame(moment(), 'day')) {
                    let lastRfidUsage = new Date(data.lastRfidUsage),
                        lastRfidMoment = moment(lastRfidUsage),
                        oneMinuteAgo = moment().subtract(1, 'minutes')

                    // 1 minute has not yet passed since the last RFID use
                    // if (!lastRfidMoment.isBefore(oneMinuteAgo)) {
                    //     this.logService.createLog({
                    //         name: "FoodCounter 1 minute has not yet passed since the last RFID use: " + this.guest.lastName + " " + this.guest.firstName + " " + this.guest.rfid + " | Lang: " + navigator.language,
                    //         capacity: 0
                    //     })
                    //     return
                    // }

                    let lastMeal = this.mealService.getMealNameByTime(lastRfidUsage)
                    if (this.currentMeal == lastMeal) {
                        this.alreadyReceivedFood = true

                        // Logging error
                        this.logService.create({
                            action_type: "already received food",
                            table_name: "food_counter",
                            original_data: `${this.guest?.lastName} ${this.guest?.firstName} (${this.guest?.rfid})`,
                        })

                        return
                    }
                }

                // The guest is eating for the first time at this meal
                this.mealsNumber++
                this.sendMessage()

                // Insert Timestamp to lastRfidUsage
                // this.guest.lastRfidUsage = moment().format('YYYY-MM-DD HH:mm:ss')
                // this.guestService.update(this.guest)
                if (this.guest) {
                    this.guestService.updateLastTagUsage(this.guest?.id)
                }
            },
            error: (error) => {
                console.error('Error:', error)
                console.log('error status', error.status)
                // if (error.status === 404) {
                this.guest = {
                    id: 0,
                    lastName: 'ISMERETLEN',
                    firstName: 'ESZKÖZ'
                }

                // Logging error
                this.logService.create({
                    action_type: "unknown device",
                    table_name: "food_counter",
                    original_data: `Unknown Device (${rfid})`,
                })
                // }
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

    /**
     * Calculate meals number by RFID usage
     * ITS DEPRECATED, WE ARE USING WebSocket Rooms for that
     * @returns
     */
    // setCurrentMealsNumber(): void {

    //     if (!this.guests || !Array.isArray(this.guests)) return;

    //     // Find guests who has used their RFID's
    //     this.guests.map(guest => {

    //         // Filter out test users
    //         if (guest.lastName !== "Gábris") {
    //             if (guest.lastRfidUsage) {
    //                 let lastRfidUsage = moment(new Date(guest.lastRfidUsage))

    //                 // Usage was today
    //                 let today = moment()
    //                 if (lastRfidUsage.isSame(today, 'day')) {
    //                     let lastMeal = this.mealService.getMealNameByTime(new Date(guest.lastRfidUsage))
    //                     if (this.currentMeal == lastMeal) {
    //                         this.mealsNumber++
    //                     }
    //                 }
    //             }
    //         }
    //     })
    // }

    getDietColor(diet: string | undefined): string {
        switch (diet) {
            case 'tejmentes':
                return 'blue-400';
            case 'laktózmentes':
                return 'blue-400'
            case 'gluténmentes':
                return 'yellow-300'
            case 'glutén-, laktóz-, tejmentes':
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
