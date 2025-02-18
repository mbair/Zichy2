import { Component, OnInit } from '@angular/core';
import { Observable, interval, Subscription, startWith } from 'rxjs';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { MessageService } from 'primeng/api';
import { cloneDeep, isEqual } from 'lodash';
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
    mealData: any                        // Data set displayed in a table
    initialMealData: any                 // Initial data set
    firstWeek: any                       // First week data
    secondWeek: any                      // Second week data
    dietTypes: string[] = []             // Diet types
    isMobile: boolean = false            // Mobile screen detection
    queryCount: number = 0               // Query counter
    subscription: Subscription           // Subscription for the interval
    
    mealTypes = ['breakfast', 'lunch', 'dinner']

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
                // Save the first data set
                if (!this.initialMealData) {
                    this.initialMealData = cloneDeep(this.mealData)
                }
        
                // Notify if the data has changed
                if (this.mealData && !isEqual(data, this.mealData)) {
                    this.messageService.add({ severity: 'warn', summary: 'Figyelem', detail: 'Változott a konyhanaptár', sticky: true })
                }

                const firstWeek = Object.fromEntries(
                    Object.entries(data).map(([key, value]) => [key, (value as any[]).slice(0, 7)])
                )

                const secondWeek = Object.fromEntries(
                    Object.entries(data).map(([key, value]) => [key, (value as any[]).slice(7, 14)])
                )

                this.mealData = cloneDeep(data)
                this.firstWeek = firstWeek
                this.secondWeek = secondWeek
                this.dietTypes = this.getDietTypes()
            }
        })

        // Request kitchen calendar data every 60 second
        const source = interval(60000).pipe(startWith(0)) // Start immediately with the first query
        this.subscription = source.subscribe(val => {
            this.queryCount++
            this.doQuery()
        })

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
        if (!this.mealData) return []
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
     * Get the total number of meals for a given day
     * @param day day object
     * @param mealType meal type ('breakfast', 'lunch', 'dinner')
     * @param useInitialData use initial data
     * @returns
     */
    getTotalMealsForDay(day: any, mealType: 'breakfast' | 'lunch' | 'dinner', useInitialData: boolean = false) {
        let total = 0;
    
        // Choose the data source
        const mealDataSource = useInitialData ? this.initialMealData : this.mealData
    
        const dietDataForDay = this.dietTypes
            .map(dietType => {
                const dietEntries = (mealDataSource && mealDataSource[dietType]) || []
                return dietEntries.find((d: KitchenCalendarData) => d.date === day.date) || null
            })
            .filter(dietData => dietData !== null)
    
        // Calculate the total number of meals
        dietDataForDay.forEach(dietData => {
            if (dietData) {
                total += dietData[mealType]?.total || 0
            }
        })
    
        return total
    }

    /**
     * Compare the previous and current data
     * @param dietType diet type
     * @param dayIndex day index
     * @param mealType meal type ('breakfast', 'lunch', 'dinner')
     * @param ageGroup age group ('child', 'adult')
     * @returns
     */
    isChanged(dietType: string, day: any, mealType: 'breakfast' | 'lunch' | 'dinner', ageGroup: 'child' | 'adult'): boolean {
        if (!this.mealData || !this.initialMealData) return false
        if (!this.mealData[dietType] || !this.initialMealData[dietType]) return false
    
        // Search by date
        const oldValue = this.initialMealData[dietType].find((d: any) => d.date === day.date)?.[mealType]?.[ageGroup] || 0
        const newValue = this.mealData[dietType].find((d: any) => d.date === day.date)?.[mealType]?.[ageGroup] || 0
    
        return oldValue !== newValue
    }
    

    /**
     * Check if the total number of meals has changed
     * @param day day object
     * @param mealType meal type ('breakfast', 'lunch', 'dinner')
     * @returns
     */
    isTotalMealChanged(day: any, mealType: 'breakfast' | 'lunch' | 'dinner'): boolean {
        if (this.queryCount < 2) return false
        
        const currentTotal = this.getTotalMealsForDay(day, mealType)
        const previousTotal = this.getTotalMealsForDay(day, mealType, true)
        
        return currentTotal !== previousTotal
    }

    /**
     * Check if the given date is today
     * @param date date string
     * @returns 
     */
    isToday(date: string): boolean {
        return moment(date).isSame(moment(), 'day')
    }

    /**
     * Load kitchen calendar data
     * @returns
     */
    doQuery() {
        if (this.queryCount < 2) this.loading = true
        return this.kitchenCalendarService.get(this.selectedDate)
    }

    /**
     * Load kitchen calendar data for the selected date
     * @param event date object
     */
    onDateSelect(event: any) {
        this.selectedDate = moment(event).format('YYYY.MM.DD')
        this.queryCount = 0
        this.mealData = undefined
        this.initialMealData = undefined
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
