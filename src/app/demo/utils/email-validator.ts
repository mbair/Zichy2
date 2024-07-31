import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms'

export function emailDomainValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const valid = emailPattern.test(control.value)
        return valid ? null : { 'invalidEmail': { value: control.value } }
    }
}
