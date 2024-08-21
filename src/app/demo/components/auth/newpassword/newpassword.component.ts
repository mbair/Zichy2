import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/demo/service/auth.service';
import { passwordMatchValidator } from 'src/app/demo/utils/password-match-validator';

@Component({
    selector: 'newpassword',
	templateUrl: './newpassword.component.html',
    providers: [MessageService],
})

export class NewPasswordComponent {

	loading: boolean = false;
    newPasswordForm: FormGroup;

	constructor(private fb: FormBuilder,
        private authService: AuthService,
        private messageService: MessageService) {

            this.newPasswordForm = this.fb.group({
                password: ['', [Validators.required]],
                password_again: ['', [Validators.required]],
            }, { validators: passwordMatchValidator() })
    }

    submit(event: Event) {
        event.preventDefault()

        if (this.newPasswordForm.valid) {
            const password = this.newPasswordForm.get('password')?.value;
            this.loading = true
            this.authService.passwordRenew(password)
                .subscribe({
                    next: () => {
                        this.loading = false

                        // Reset form
                        this.newPasswordForm.reset({
                            password: '',
                            password_again: '',
                        })

                        this.messageService.add({
                            severity: "success",
                            summary: "",
                            detail: "Beállítottuk az új jelszót!",
                        })
                    },
                    error: (err) => {
                        this.loading = false

                        console.error('Pass renew failed', err);
                        // Show an error message to the user

                        this.messageService.add({
                            severity: "error",
                            summary: "",
                            detail: "Nem sikerült beállítani az új jelszót!",
                        })
                    }
                })
        }
    }
}
