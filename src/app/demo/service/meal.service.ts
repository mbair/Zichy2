import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class MealService {

    mealChanged: Subject<string> = new Subject<string>()

    meals: any = {
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

    constructor() {
        this.checkMealStart()
        setInterval(() => {
            this.checkMealStart()
        }, 20000)
    }

    checkMealStart(): void {
        const now = new Date()
        const currentHour = now.getHours()

        for (const mealName of Object.keys(this.meals)) {
            const meal = this.meals[mealName];
            if (currentHour >= meal.begin && currentHour < meal.end) {
                this.mealChanged.next(mealName)
                // Once the current meal has been found, there is no need to search further
                return
            }
        }
    }

    getMealNameByTime(time: Date): string {
        const hour = time.getHours()
        for (const mealName in this.meals) {
            const meal = this.meals[mealName];
            if (hour >= meal.begin && hour <= meal.end) {
                return this.translateMealName(mealName)
            }
        }
        return "Jelenleg nincs étkeztetés"
    }

    getMealsForSelector(): any {
        let meals = []
        for (const mealName in this.meals) {
            meals.push(this.translateMealName(mealName))
        }
        return meals
    }

    translateMealName(mealName: string): string {
        const translations: any = {
            breakfast: 'reggeli',
            lunch: 'ebéd',
            dinner: 'vacsora',
        }

        return translations[mealName] || mealName;
    }

    isOpen(): boolean {
        const currentHour = new Date().getHours();
        for (const mealName in this.meals) {
            const meal = this.meals[mealName];
            if (currentHour >= meal.begin && currentHour < meal.end) {
                return true
            }
        }
        return false
    }
}
