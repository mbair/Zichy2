import { AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms'

// Custom validator to check if both language fields are filled or both are empty
export function allLanguagesRequiredValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const hu = control.get('hu')?.value
        const en = control.get('en')?.value

        // Check if only one field is filled
        const isOneFieldFilled = (hu && !en) || (!hu && en)

        return isOneFieldFilled ? { bothLanguagesRequired: true } : null
    }
}
