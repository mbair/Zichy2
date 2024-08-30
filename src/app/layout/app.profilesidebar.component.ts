import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RoleService } from '../demo/service/role.service';
import { LayoutService } from './service/app.layout.service';


@Component({
    selector: 'app-profilemenu',
    templateUrl: './app.profilesidebar.component.html'
})
export class AppProfileSidebarComponent {

    fullname: string;
    userrole: string;

    constructor(public router: Router,
                public layoutService: LayoutService,
                public roleService: RoleService) {

        this.fullname = localStorage.getItem('fullname') || ''
        this.userrole = localStorage.getItem('userrole') || ''
    }

    get visible(): boolean {
        return this.layoutService.state.profileSidebarVisible;
    }

    set visible(_val: boolean) {
        this.layoutService.state.profileSidebarVisible = _val;
    }

    logout() {
        localStorage.removeItem('token')
        localStorage.removeItem('fullname')
        localStorage.removeItem('userrole')
        this.router.navigate(['/auth/login'])
    }
}
