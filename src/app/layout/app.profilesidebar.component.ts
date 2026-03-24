import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RoleService } from '../demo/service/role.service';
import { LayoutService } from './service/app.layout.service';
import { LogService } from '../demo/service/log.service';
import { AuthService } from '../demo/service/auth.service';
import { AuthStorageService } from '../demo/service/auth-storage.service';

@Component({
    selector: 'app-profilemenu',
    templateUrl: './app.profilesidebar.component.html'
})
export class AppProfileSidebarComponent {

    constructor(public router: Router,
                public layoutService: LayoutService,
                public roleService: RoleService,
                private logService: LogService,
                private authService: AuthService,
                private authStorage: AuthStorageService) {}

    get fullname(): string {
        return this.authStorage.getProfileField('fullname') || ''
    }

    get userrole(): string {
        return this.authStorage.getProfileField('userrole') || ''
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
            original_data: `${this.authStorage.getProfileField('email')} logged out`,
        })

        this.authService.logout()
    }
}
