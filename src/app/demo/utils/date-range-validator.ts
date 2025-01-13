import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function dateRangeValidator(beginName: string, endName: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const beginDate = control.get(beginName)?.value
        const endDate = control.get(endName)?.value

        if (beginDate && endDate) {
            if (new Date(beginDate) > new Date(endDate) || 
                new Date(endDate) < new Date(beginDate)) {
                    return { dateRangeInvalid: true }
            }
        }
        return null
    }
}
