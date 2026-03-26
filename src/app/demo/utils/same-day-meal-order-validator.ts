import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { isSameDay } from './date.utils';

const MEAL_ORDER: Record<string, number> = {
    'nem kér étkezést': 0,
    'reggeli': 1,
    'ebéd': 2,
    'vacsora': 3,
};

export function sameDayMealOrderValidator(
    arrivalField: string,
    departureField: string,
    firstMealField: string,
    lastMealField: string
): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const arrivalDate = control.get(arrivalField)?.value;
        const departureDate = control.get(departureField)?.value;
        const firstMeal = control.get(firstMealField)?.value;
        const lastMeal = control.get(lastMealField)?.value;

        if (!arrivalDate || !departureDate || !firstMeal || !lastMeal) {
            return null;
        }

        if (!isSameDay(arrivalDate, departureDate)) {
            return null;
        }

        const firstMealOrder = MEAL_ORDER[firstMeal];
        const lastMealOrder = MEAL_ORDER[lastMeal];

        if (firstMealOrder === undefined || lastMealOrder === undefined) {
            return null;
        }

        return firstMealOrder <= lastMealOrder ? null : { mealOrderInvalid: true };
    };
}
