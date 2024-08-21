import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms'

export function passwordMatchValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const password = control.get('password')
        const passwordAgain = control.get('password_again')

        // Valid a form
        if (!password || !passwordAgain || password.value === passwordAgain.value) {
            return null
        }

        // Passwords do not match
        return { passwordsDoNotMatch: true }
    }
}
