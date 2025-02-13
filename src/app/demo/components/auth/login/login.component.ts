import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/demo/service/auth.service';
import { MessageService } from 'primeng/api';
import { LogService } from 'src/app/demo/service/log.service';

@Component({
    templateUrl: './login.component.html',
    providers: [MessageService],
})
export class LoginComponent {

    loading: boolean = false;
    loginForm: FormGroup;

    constructor(
        private fb: FormBuilder,
        private authService: AuthService,
        private messageService: MessageService,
        private logService: LogService,
        private router: Router) {

        this.loginForm = this.fb.group({
            email: ['', Validators.required],
            password: ['', Validators.required],
        })
    }

    login() {
        // Before adding a new message, we first delete all existing ones
        this.messageService.clear()
        const val = this.loginForm.value;

        if (val.email && val.password) {
            this.loading = true
            this.authService.login(val.email, val.password)
                .subscribe({
                    next: () => {
                        this.loading = false

                        this.messageService.add({
                            severity: "success",
                            summary: "Sikeres bejelentkezés!",
                            detail: "",
                        })

                        // Logging
                        this.logService.create({
                            action_type: "login success",
                            table_name: "users",
                            original_data: `${val.email} logged in`,
                        })

                        this.router.navigate([''])
                    },
                    error: (err) => {
                        this.loading = false
                        console.error('Login failed', err);
                        // Show an error message to the user

                        this.messageService.add({
                            severity: "error",
                            summary: "",
                            detail: "Hibás a megadott email, vagy jelszó!",
                        })

                        // Logging
                        this.logService.create({
                            action_type: "login failed",
                            table_name: "users",
                            original_data: `${val.email} login failed`,
                        })
                    }
                })
        }
    }
}
