import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { AuthService } from 'src/app/demo/service/auth.service';
import { LayoutService } from 'src/app/layout/service/app.layout.service';

@Component({
    templateUrl: './login.component.html'
})
export class LoginComponent {

    loginForm: FormGroup;
    rememberMe: boolean = false;
    isFormValid$: Observable<boolean>;
    private formChanges$: Subject<void> = new Subject();

    constructor(
        private fb: FormBuilder,
        private authService: AuthService,
        private layoutService: LayoutService,
        private router: Router) {

        this.loginForm = this.fb.group({
            email: ['', Validators.required],
            password: ['', Validators.required]
        })

        this.isFormValid$ = new BehaviorSubject<boolean>(false)
    }

    get dark(): boolean {
		return this.layoutService.config.colorScheme !== 'light';
	}

    login() {
        const val = this.loginForm.value;

        if (val.email && val.password) {
            this.authService.login(val.email, val.password)
                .subscribe({
                    next: () => {
                        console.log('Login successful');
                        // Navigate to a protected route or show a success message
                    },
                    error: (err) => {
                        console.error('Login failed', err);
                        // Show an error message to the user
                    }
                })
        }
    }
}
