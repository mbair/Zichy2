import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { isDateBetweenDaysInclusive, parseDateOnly } from './date.utils';

type DateInput = Date | string | number | null | undefined;

export function dateBoundsValidator(minDate: DateInput, maxDate: DateInput): ValidatorFn {
    const normalizedMinDate = parseDateOnly(minDate);
    const normalizedMaxDate = parseDateOnly(maxDate);

    return (control: AbstractControl): ValidationErrors | null => {
        const controlValue = parseDateOnly(control.value);

        if (!controlValue) {
            return null;
        }

        if (normalizedMinDate && normalizedMaxDate) {
            return isDateBetweenDaysInclusive(controlValue, normalizedMinDate, normalizedMaxDate)
                ? null
                : { dateOutOfRange: true };
        }

        if (normalizedMinDate && controlValue.getTime() < normalizedMinDate.getTime()) {
            return { dateOutOfRange: true };
        }

        if (normalizedMaxDate && controlValue.getTime() > normalizedMaxDate.getTime()) {
            return { dateOutOfRange: true };
        }

        return null;
    };
}
