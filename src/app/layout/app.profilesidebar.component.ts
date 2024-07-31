import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LayoutService } from './service/app.layout.service';


@Component({
    selector: 'app-profilemenu',
    templateUrl: './app.profilesidebar.component.html'
})
export class AppProfileSidebarComponent {

    fullName: string;
    userRole: string;

    constructor(private router: Router, public layoutService: LayoutService) {
        this.fullName = localStorage.getItem('fullName') || ''
        this.userRole = localStorage.getItem('userRole') || ''
    }

    get visible(): boolean {
        return this.layoutService.state.profileSidebarVisible;
    }

    set visible(_val: boolean) {
        this.layoutService.state.profileSidebarVisible = _val;
    }

    logout() {
        localStorage.removeItem('token')
        this.router.navigate(['/auth/login'])
    }
}
