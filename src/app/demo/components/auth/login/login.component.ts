import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { AuthService } from 'src/app/demo/service/auth.service';
import { MessageService } from 'primeng/api';

import { LayoutService } from 'src/app/layout/service/app.layout.service';

@Component({
    templateUrl: './login.component.html',
    providers: [MessageService],
})
export class LoginComponent {

    loginForm: FormGroup;
    isFormValid$: Observable<boolean>;
    private formChanges$: Subject<void> = new Subject();

    constructor(
        private fb: FormBuilder,
        private authService: AuthService,
        private messageService: MessageService,
        private layoutService: LayoutService,
        private router: Router) {

        this.loginForm = this.fb.group({
            email: ['', Validators.required],
            password: ['', Validators.required],
        })

        this.isFormValid$ = new BehaviorSubject<boolean>(false)
    }

    get dark(): boolean {
		return this.layoutService.config.colorScheme !== 'light';
	}

    login() {
        // Új üzenet hozzáadása előtt, először töröljük az összes meglévőt
        this.messageService.clear()

        const val = this.loginForm.value;

        if (val.email && val.password) {
            this.authService.login(val.email, val.password)
                .subscribe({
                    next: () => {
                        this.messageService.add({
                            severity: "success",
                            summary: "Sikeres bejelentkezés!",
                            detail: "",
                        })

                        setTimeout(() => {
                            // Navigate to a protected route or show a success message
                            this.router.navigate([''])
                        }, 1000)
                    },
                    error: (err) => {
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
