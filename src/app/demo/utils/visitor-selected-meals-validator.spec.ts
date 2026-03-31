import { FormControl, FormGroup } from '@angular/forms';
import { visitorSelectedMealsValidator } from './visitor-selected-meals-validator';

describe('visitorSelectedMealsValidator', () => {
    function createForm(values: {
        isVisitor?: boolean;
        mealsPerDay?: number | null;
        firstMeal?: string;
        lastMeal?: string;
    }): FormGroup {
        return new FormGroup(
            {
                is_visitor: new FormControl(values.isVisitor ?? false),
                visitor_meals_per_day: new FormControl(values.mealsPerDay ?? 0),
                firstMeal: new FormControl(values.firstMeal ?? ''),
                lastMeal: new FormControl(values.lastMeal ?? ''),
            },
            {
                validators: visitorSelectedMealsValidator(
                    'is_visitor',
                    'visitor_meals_per_day',
                    'firstMeal',
                    'lastMeal',
                ),
            },
        );
    }

    it('accepts two different selected meals for visitors', () => {
        const form = createForm({
            isVisitor: true,
            mealsPerDay: 2,
            firstMeal: 'vacsora',
            lastMeal: 'reggeli',
        });

        expect(form.errors).toBeNull();
    });

    it('rejects selecting the same meal twice for visitors', () => {
        const form = createForm({
            isVisitor: true,
            mealsPerDay: 2,
            firstMeal: 'ebéd',
            lastMeal: 'ebéd',
        });

        expect(form.errors).toEqual({ visitorMealsMustDiffer: true });
    });

    it('ignores duplicate meals outside the visitor two-meals mode', () => {
        const form = createForm({
            isVisitor: false,
            mealsPerDay: 2,
            firstMeal: 'ebéd',
            lastMeal: 'ebéd',
        });

        expect(form.errors).toBeNull();
    });
});
