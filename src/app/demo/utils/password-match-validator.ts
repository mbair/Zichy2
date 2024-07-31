import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const passwordMatchValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('password')
    const passwordAgain = control.get('password_again')

    return password && passwordAgain && password.value === passwordAgain.value ? null : { 'passwordMismatch': true }
}
