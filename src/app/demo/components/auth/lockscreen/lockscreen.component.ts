import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/demo/service/auth.service';

@Component({
    templateUrl: './lockscreen.component.html',
	providers: [MessageService],
})
export class LockScreenComponent { 

	loading: boolean = false
    loginForm: FormGroup
    username: string | null

    constructor(
        private fb: FormBuilder,
        private authService: AuthService,
        private messageService: MessageService,
        private router: Router) {

        this.loginForm = this.fb.group({
            password: ['', Validators.required],
        })

        this.username = localStorage.getItem('username')
    }

	unlock() {
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
                    }
                })
        }
    }

}