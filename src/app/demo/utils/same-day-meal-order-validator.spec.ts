import { FormControl, FormGroup } from '@angular/forms';
import { sameDayMealOrderValidator } from './same-day-meal-order-validator';

describe('sameDayMealOrderValidator', () => {
    function createForm(values: {
        arrival?: string;
        departure?: string;
        firstMeal?: string;
        lastMeal?: string;
    }): FormGroup {
        return new FormGroup(
            {
                dateOfArrival: new FormControl(values.arrival ?? ''),
                dateOfDeparture: new FormControl(values.departure ?? ''),
                firstMeal: new FormControl(values.firstMeal ?? ''),
                lastMeal: new FormControl(values.lastMeal ?? ''),
            },
            {
                validators: sameDayMealOrderValidator('dateOfArrival', 'dateOfDeparture', 'firstMeal', 'lastMeal'),
            }
        );
    }

    it('accepts same-day meal order when first meal is not later than last meal', () => {
        const form = createForm({
            arrival: '2026-05-28',
            departure: '2026-05-28',
            firstMeal: 'reggeli',
            lastMeal: 'vacsora',
        });

        expect(form.errors).toBeNull();
    });

    it('rejects same-day meal order when first meal is later than last meal', () => {
        const form = createForm({
            arrival: '2026-05-28',
            departure: '2026-05-28',
            firstMeal: 'vacsora',
            lastMeal: 'reggeli',
        });

        expect(form.errors).toEqual({ mealOrderInvalid: true });
    });

    it('ignores meal order across multiple conference days', () => {
        const form = createForm({
            arrival: '2026-05-28',
            departure: '2026-05-29',
            firstMeal: 'vacsora',
            lastMeal: 'reggeli',
        });

        expect(form.errors).toBeNull();
    });

    it('can skip validation when the caller declares a special mode', () => {
        const form = new FormGroup(
            {
                is_visitor: new FormControl(true),
                visitor_meals_per_day: new FormControl(2),
                dateOfArrival: new FormControl('2026-05-28'),
                dateOfDeparture: new FormControl('2026-05-28'),
                firstMeal: new FormControl('vacsora'),
                lastMeal: new FormControl('reggeli'),
            },
            {
                validators: sameDayMealOrderValidator(
                    'dateOfArrival',
                    'dateOfDeparture',
                    'firstMeal',
                    'lastMeal',
                    {
                        skipWhen: (control) =>
                            !!control.get('is_visitor')?.value &&
                            Number(control.get('visitor_meals_per_day')?.value) === 2,
                    },
                ),
            },
        );

        expect(form.errors).toBeNull();
    });
});
