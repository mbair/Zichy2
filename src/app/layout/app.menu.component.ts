import { OnInit, isDevMode } from '@angular/core';
import { Component } from '@angular/core';
import { UserService } from '../demo/service/user.service';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    model: any[] = []
    userRoles: string[] = []

    constructor(public userService: UserService) { }

    ngOnInit() {
        // Fetch user roles
        this.userService.getUserRole().subscribe((roles: any) => {
            this.userRoles = roles

            // Prepare menu items, with submenus already filtered by permissions
            const menuModel = [
                {
                    label: '',
                    items: [
                        {
                            label: 'Dashboard',
                            icon: 'pi pi-fw pi-home',
                            routerLink: ['/']
                        }
                    ]
                },
                {
                    label: 'Hotel',
                    items: this.getFilteredItems([
                        {
                            label: 'Conference',
                            icon: 'pi pi-fw pi-calendar',
                            routerLink: ['/conference'],
                            requiredRoles: [],
                        },
                        {
                            label: 'Guest',
                            icon: 'pi pi-fw pi-user',
                            routerLink: ['/guest'],
                            requiredRoles: []
                        },
                        {
                            label: 'Room',
                            icon: 'pi pi-fw pi-building',
                            routerLink: ['/room'],
                            requiredRoles: ['Super Admin', 'Nagy Admin']
                        },
                        {
                            label: 'NFC Tag',
                            icon: 'pi pi-fw pi-tags',
                            routerLink: ['/nfc-tag'],
                            requiredRoles: ['Super Admin', 'Nagy Admin']
                        },
                    ])
                },
                {
                    label: 'Restaurant',
                    items: this.getFilteredItems([
                        {
                            label: 'Diet',
                            icon: 'pi pi-fw pi-pencil',
                            routerLink: ['/diet'],
                            requiredRoles: ['Super Admin', 'Nagy Admin']
                        },
                        {
                            label: 'Kitchen Calendar',
                            icon: 'pi pi-fw pi-calendar',
                            routerLink: ['/kitchen-calendar'],
                            requiredRoles: ['Super Admin', 'Nagy Admin', 'Kis Admin']
                        }
                    ])
                },
                {
                    label: 'System',
                    items: this.getFilteredItems([
                        {
                            label: 'User',
                            icon: 'pi pi-fw pi-users',
                            routerLink: ['/user'],
                            requiredRoles: ['Super Admin', 'Nagy Admin']
                        },
                        {
                            label: 'Logs',
                            icon: 'pi pi-fw pi-list',
                            routerLink: ['/logs'],
                            requiredRoles: ['Super Admin', 'Nagy Admin']
                        }
                    ])
                }
            ];

            // Only include groups that have at least one permitted submenu item
            this.model = menuModel.filter(group => group.items && group.items.length > 0)

            // Add developer menu items only when in dev mode
            if (isDevMode()) {
                let devModel = [
                    {
                        label: '',
                        items: [
                            {
                                label: 'Food Counter',
                                icon: 'pi pi-fw pi-tablet',
                                routerLink: ['/food-counter']
                            }
                        ]
                    },
                    {
                        label: 'Finance',
                        icon: 'pi pi-fw pi-money',
                        items: [
                            {
                                label: 'Prices',
                                icon: 'pi pi-fw pi-dollar',
                                routerLink: ['/auth/login']
                            },
                            {
                                label: 'Settlement Sheet',
                                icon: 'pi pi-fw pi-money-bill',
                                routerLink: ['/auth/error']
                            },
                            {
                                label: 'Reservations',
                                icon: 'pi pi-fw pi-dollar',
                                routerLink: ['/auth/access']
                            },
                            {
                                label: 'Final Bills',
                                icon: 'pi pi-fw pi-money-bill',
                                routerLink: ['/auth/access']
                            }
                        ]
                    },
                    // Additional developer menu items...
                ]

                // Similarly, only include groups that are not empty
                devModel = devModel.filter(group => group.items && group.items.length > 0)
                this.model = this.model.concat(devModel)
            }
        });
    }

    /**
     * Filters the given menu items to only include those that have either no required roles
     * or have required roles that are present in the userRoles array.
     * @param items - the array of menu items to filter
     * @returns the filtered array based on permissions
     */
    getFilteredItems(items: any[]): any[] {
        return items.filter(item =>
            item.requiredRoles.length === 0 ||
            item.requiredRoles.some((role: string) => this.userRoles.includes(role))
        )
    }
}
