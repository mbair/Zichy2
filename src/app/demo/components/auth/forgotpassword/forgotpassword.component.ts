import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/demo/service/auth.service';
import { emailDomainValidator } from 'src/app/demo/utils/email-validator';

@Component({
    templateUrl: './forgotpassword.component.html',
    providers: [MessageService],
})
export class ForgotPasswordComponent {

    loading: boolean = false;
    forgotPasswordForm: FormGroup;

    constructor(private fb: FormBuilder,
        private authService: AuthService,
        private messageService: MessageService) {

            this.forgotPasswordForm = this.fb.group({
                email: ['', [Validators.required, Validators.email, emailDomainValidator()]]
            })
    }

    passwordReset(event: Event) {
        event.preventDefault()
        const email = this.forgotPasswordForm.get('email')?.value;

        if (email) {
            this.loading = true
            this.authService.passwordReset(email)
                .subscribe({
                    next: () => {
                        this.loading = false

                        // Reset form
                        this.forgotPasswordForm.reset({
                            email: ''
                        })

                        this.messageService.add({
                            severity: "success",
                            summary: "",
                            detail: "Elküldtük a jelszóváltoztatási kérelmet!",
                        })
                    },
                    error: (err) => {
                        this.loading = false

                        console.error('Login failed', err);
                        // Show an error message to the user

                        this.messageService.add({
                            severity: "error",
                            summary: "",
                            detail: "Hibás a megadott jelszó!",
                        })
                    }
                })
        }
    }
}
