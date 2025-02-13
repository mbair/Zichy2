import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RoleService } from '../demo/service/role.service';
import { LayoutService } from './service/app.layout.service';
import { LogService } from '../demo/service/log.service';

@Component({
    selector: 'app-profilemenu',
    templateUrl: './app.profilesidebar.component.html'
})
export class AppProfileSidebarComponent {

    fullname: string;
    userrole: string;

    constructor(public router: Router,
                public layoutService: LayoutService,
                public roleService: RoleService,
                private logService: LogService) {

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
        // Logging
        this.logService.create({
            action_type: "logout",
            table_name: "users",
            original_data: `${localStorage.getItem('email')} logged out`,
        })

        localStorage.removeItem('email')
        localStorage.removeItem('fullname')
        localStorage.removeItem('phone')
        localStorage.removeItem('token')
        localStorage.removeItem('user_rolesid')
        localStorage.removeItem('userid')
        localStorage.removeItem('userrole')
        this.router.navigate(['/auth/login'])
    }
}
