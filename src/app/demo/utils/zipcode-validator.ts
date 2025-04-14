import { AbstractControl, ValidatorFn } from '@angular/forms'

export function zipCodeValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
        const value = control.value
        const isValid = /^[0-9]{4}$/.test(value)
        return isValid ? null : { invalidZipCode: true }
    }
}
