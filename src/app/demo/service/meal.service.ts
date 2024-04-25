import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class MealService {

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

    constructor() { }

    getCurrentMealName(): string {
        const currentHour = new Date().getHours();
        for (const mealName in this.mealTimes) {
            const meal = this.mealTimes[mealName];
            if (currentHour >= meal.begin && currentHour < meal.end) {
                return mealName;
            }
        }
        return "No meal";
    }
}
