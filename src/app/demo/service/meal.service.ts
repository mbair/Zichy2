import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class MealService {

    mealChanged: Subject<string> = new Subject<string>()

    mealTimes: any = {
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
            end: 21
        }
    };

    constructor() {
        setInterval(() => {
            this.checkMealStart()
        }, 20000);
    }

    checkMealStart(): void {
        const now = new Date();
        const currentHour = now.getHours();

        for (const mealName of Object.keys(this.mealTimes)) {
            const meal = this.mealTimes[mealName];
            if (currentHour >= meal.begin && currentHour < meal.end) {
                this.mealChanged.next(mealName);
                return; // Ha megtaláltuk az aktuális étkezést, nincs szükség további keresésre
            }
        }
    }

    getCurrentMealName(): string {
        const currentHour = new Date().getHours();
        for (const mealName in this.mealTimes) {
            const meal = this.mealTimes[mealName];
            if (currentHour >= meal.begin && currentHour < meal.end) {
                return this.translateMealName(mealName);
            }
        }
        return "Jelenleg nincs étkeztetés";
    }

    translateMealName(mealName: string): string {
        const translations: any = {
            breakfast: 'Reggeli',
            lunch: 'Ebéd',
            dinner: 'Vacsora',
        }

        return translations[mealName] || mealName;
    }

    isOpen(): boolean {
        const currentHour = new Date().getHours();
        for (const mealName in this.mealTimes) {
            const meal = this.mealTimes[mealName];
            if (currentHour >= meal.begin && currentHour < meal.end) {
                return true
            }
        }
        return false
    }
}
