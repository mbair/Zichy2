import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function visitorSelectedMealsValidator(
    isVisitorField: string,
    mealsPerDayField: string,
    firstMealField: string,
    lastMealField: string,
): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const isVisitor = !!control.get(isVisitorField)?.value;
        const mealsPerDay = control.get(mealsPerDayField)?.value;
        const firstMeal = control.get(firstMealField)?.value;
        const lastMeal = control.get(lastMealField)?.value;

        if (!isVisitor || Number(mealsPerDay) !== 2) {
            return null;
        }

        if (!firstMeal || !lastMeal) {
            return null;
        }

        return firstMeal === lastMeal
            ? { visitorMealsMustDiffer: true }
            : null;
    };
}
