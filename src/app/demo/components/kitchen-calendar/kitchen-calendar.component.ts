import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { MessageService } from 'primeng/api';
import { KitchenCalendarService } from '../../service/kitchen-calendar.service';
import { ResponsiveService } from '../../service/responsive.service';
import { ApiResponse } from '../../api/ApiResponse';
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

    loading: boolean = true              // Loading overlay trigger value
    mealData: any[] = []                 // Data set displayed in a table
    dietTypes: string[] = []             // Diet types
    isMobile: boolean = false            // Mobile screen detection

    private kitchenCalendarObs$: Observable<any> | undefined
    private serviceMessageObs$: Observable<any> | undefined

    constructor(
        private kitchenCalendarService: KitchenCalendarService,
        private messageService: MessageService,
        private translateService: TranslateService,
        private responsiveService: ResponsiveService) {

        this.dietTypes = [
            'normal', 
            'vegetarian', 
            'gluten-lactose-milkfree', 
            'glutenfree', 
            'milkfree', 
            'laktosefree'
        ]
    }

    ngOnInit() {
        // Kitchen calendar data
        this.kitchenCalendarObs$ = this.kitchenCalendarService.kitchenCalendarObs
        this.kitchenCalendarObs$.subscribe((data: any) => {
            this.loading = false
            if (data) {
                console.log('Kitchen calendar data:', data)
                this.mealData = data || []
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
        return Object.keys(this.mealData[0])
    }

    /**
     * Translate diet type
     */
    getTranslatedDiet(dietKey: string) {
        return this.translateService.instant(`DIETS.${dietKey.toUpperCase()}`)
    }

    /**
     * Get the total number of meals for a given day
     * @param day day object
     * @param mealType meal type ('breakfast', 'lunch', 'dinner')
     */
    getTotalMeals(day: any, mealType: 'breakfast' | 'lunch' | 'dinner') {
        let total = 0;
        this.getDietTypes().forEach(dietType => {
            const dietData = this.mealData[0][dietType].find((d: KitchenCalendarData) => d.date === day.date)
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
        const today = new Date().toISOString().split('T')[0]
        return this.kitchenCalendarService.get(today)
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
