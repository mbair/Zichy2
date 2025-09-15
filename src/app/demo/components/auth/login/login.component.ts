import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/demo/service/auth.service';
import { MessageService } from 'primeng/api';
import { LogService } from 'src/app/demo/service/log.service';
import { LayoutService } from 'src/app/layout/service/app.layout.service';

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
        private layoutService: LayoutService,
        private logService: LogService,
        private router: Router) {

        this.loginForm = this.fb.group({
            email: ['', Validators.required],
            password: ['', Validators.required],
        })

        // Set default theme
        this.changeTheme('default')
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

    /**
     * Replaces the theme link with a new one.
     * @param href The href attribute of the new link element.
     * @param onComplete Called when the new style sheet is loaded.
     * This method is used to switch the app's theme.
     * It creates a clone of the current theme link, sets its href to the given one,
     * inserts the clone after the original link, and then removes the original link.
     * When the new style sheet is loaded, it calls the onComplete callback.
     */
    replaceThemeLink(href: string, onComplete: () => void) {
        const themeLink = <HTMLLinkElement>document.getElementById('theme-link')
        const cloneLinkElement = <HTMLLinkElement>themeLink.cloneNode(true)

        cloneLinkElement.setAttribute('href', href)
        cloneLinkElement.setAttribute('id', 'theme-link-clone')

        themeLink.parentNode!.insertBefore(cloneLinkElement, themeLink.nextSibling)

        cloneLinkElement.addEventListener('load', () => {
            themeLink.remove()
            cloneLinkElement.setAttribute('id', 'theme-link')
            onComplete()
        })
    }

    /**
     * Switches the theme to the given one.
     * @param theme The name of the theme to switch to.
     * Finds the theme CSS link element and replaces its href with the new theme's href.
     * After the new style sheet is loaded, updates the layout service's theme and notifies the listeners.
     */
    changeTheme(theme: string) {
        const themeLink = <HTMLLinkElement>document.getElementById('theme-link')
        if (themeLink) {
            const newHref = themeLink.getAttribute('href')!.replace(this.layoutService.config.theme, theme)
            this.replaceThemeLink(newHref, () => {
                this.layoutService.config.theme = theme
                this.layoutService.onConfigUpdate()
            })
        }
    }
}
