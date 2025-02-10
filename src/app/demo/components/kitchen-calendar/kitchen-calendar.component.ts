import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { MessageService } from 'primeng/api';
import { KitchenCalendarService } from '../../service/kitchen-calendar.service';
import { ResponsiveService } from '../../service/responsive.service';
import * as moment from 'moment';
moment.locale('hu')

interface KitchenCalendarData {
    date: string;
    breakfast: { total: number, adult: number, child: number };
    lunch: { total: number, adult: number, child: number };
    dinner: { total: number, adult: number, child: number };
}

@Component({
    selector: 'kitchen-calendar-component',
    templateUrl: './kitchen-calendar.component.html',
    styleUrls: ['./kitchen-calendar.component.scss'],
    providers: [MessageService]
})

// Makes unsubscribe automatically, don't need to do manually in ngOnDestroy
// BUT!!! Don't delete ngOnDestroy, it has to stay here!
@AutoUnsubscribe()

export class KitchenCalendarComponent implements OnInit {

    loading: boolean                     // Loading overlay trigger value
    selectedDate: string                 // Selected date
    mealData: any = []                   // Data set displayed in a table
    firstWeek: any = []                  // First week data
    secondWeek: any = []                 // Second week data
    dietTypes: string[] = []             // Diet types
    isMobile: boolean = false            // Mobile screen detection

    private kitchenCalendarObs$: Observable<any> | undefined
    private serviceMessageObs$: Observable<any> | undefined

    constructor(
        private kitchenCalendarService: KitchenCalendarService,
        private messageService: MessageService,
        private responsiveService: ResponsiveService) {
    }

    ngOnInit() {
        // Set the selected date to today
        this.selectedDate = moment().format('YYYY.MM.DD')

        // Kitchen calendar data
        this.kitchenCalendarObs$ = this.kitchenCalendarService.kitchenCalendarObs
        this.kitchenCalendarObs$.subscribe((data: any) => {
            this.loading = false
            if (data) {
                const firstWeek = Object.fromEntries(
                    Object.entries(data).map(([key, value]) => [key, (value as any[]).slice(0, 7)])
                )

                const secondWeek = Object.fromEntries(
                    Object.entries(data).map(([key, value]) => [key, (value as any[]).slice(7, 14)])
                )

                this.mealData = data
                this.firstWeek = firstWeek
                this.secondWeek = secondWeek
                this.dietTypes = this.getDietTypes()
            }
        })

        this.doQuery()

        // Monitor the changes of the window size
        this.responsiveService.isMobile$.subscribe((isMobile) => {
            this.isMobile = isMobile
        })

        // Message
        this.serviceMessageObs$ = this.kitchenCalendarService.messageObs
        this.serviceMessageObs$.subscribe(message => this.handleMessage(message))
    }

    /**
     * Get the diet types
     * (e.g. 'normal', 'vegetarian') 
     */
    getDietTypes() {
        return Object.keys(this.mealData)
    }

    /**
     * Get the day name from a date string
     * @param dateString 
     * @returns 
     */
    getDayName(dateString: string): string {
        return moment(dateString).format('dddd')
    }

    /**
     * Check if the given date is today
     * @param date date string
     * @returns 
     */
    isToday(date: string): boolean {
        return moment(date).isSame(moment(), 'day');
    }

    /**
     * Get the total number of meals for a given day
     * @param day day object
     * @param mealType meal type ('breakfast', 'lunch', 'dinner')
     */
    getTotalMeals(day: any, mealType: 'breakfast' | 'lunch' | 'dinner') {
        let total = 0;
        this.dietTypes.forEach(dietType => {
            const dietData = (this.mealData as any)[dietType].find((d: KitchenCalendarData) => d.date === day.date)
            if (dietData) {
                total += dietData[mealType].total
            }
        })
        return total
    }

    /**
     * Load kitchen calendar data
     * @returns
     */
    doQuery() {
        this.loading = true
        return this.kitchenCalendarService.get(this.selectedDate)
    }

    /**
     * Load kitchen calendar data for the selected date
     * @param event date object
     */
    onDateSelect(event: any) {
        this.selectedDate = moment(event).format('YYYY.MM.DD')
        this.doQuery()
    }

    /**
     * Handles service response messages and reset selected table item(s)
     * After the message is shown, query for data changes
     * @param message service response message
     */
    handleMessage(message: any) {
        if (!message) return

        this.loading = false

        if (message == 'ERROR') {
            this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Hiba történt!'
            })
        } else {
            // Show service response message
            this.messageService.add(message)
        }
    }

    // Don't delete this, its needed from a performance point of view,
    ngOnDestroy(): void {
    }
}
