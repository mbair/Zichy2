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
                            label: 'Vezérlőpult',
                            icon: 'pi pi-fw pi-home',
                            routerLink: ['/']
                        }
                    ]
                },
                {
                    label: 'Hotel',
                    items: this.getFilteredItems([
                        {
                            label: 'Foglalás',
                            icon: 'pi pi-fw pi-address-book',
                            routerLink: ['/reservation'],
                            requiredRoles: []
                        },
                        {
                            label: 'Konferencia',
                            icon: 'pi pi-fw pi-calendar',
                            routerLink: ['/conference'],
                            requiredRoles: [],
                        },
                        {
                            label: 'Vendég',
                            icon: 'pi pi-fw pi-user',
                            routerLink: ['/guest'],
                            requiredRoles: []
                        },
                        {
                            label: 'Szoba',
                            icon: 'pi pi-fw pi-building',
                            routerLink: ['/room'],
                            requiredRoles: []
                        },
                        {
                            label: 'NFC címke',
                            icon: 'pi pi-fw pi-tags',
                            routerLink: ['/nfc-tag'],
                            requiredRoles: ['Super Admin', 'Nagy Admin']
                        },
                    ])
                },
                {
                    label: 'Étterem',
                    items: this.getFilteredItems([
                        {
                            label: 'Étrend',
                            icon: 'pi pi-fw pi-pencil',
                            routerLink: ['/diet'],
                            requiredRoles: ['Super Admin', 'Nagy Admin']
                        },
                        {
                            label: 'Konyhanaptár',
                            icon: 'pi pi-fw pi-calendar',
                            routerLink: ['/kitchen-calendar'],
                            requiredRoles: ['Super Admin', 'Nagy Admin', 'Kis Admin']
                        }
                    ])
                },
                {
                    label: 'Rendszer',
                    items: this.getFilteredItems([
                        {
                            label: 'Felhasználó',
                            icon: 'pi pi-fw pi-users',
                            routerLink: ['/user'],
                            requiredRoles: ['Super Admin', 'Nagy Admin']
                        },
                        {
                            label: 'Napló',
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
                                label: 'Ételpult',
                                icon: 'pi pi-fw pi-tablet',
                                routerLink: ['/food-counter']
                            }
                        ]
                    },
                    {
                        label: 'Pénzügyek',
                        icon: 'pi pi-fw pi-money',
                        items: [
                            {
                                label: 'Árak',
                                icon: 'pi pi-fw pi-dollar',
                                routerLink: ['/auth/login']
                            },
                            {
                                label: 'Elszámolólap',
                                icon: 'pi pi-fw pi-money-bill',
                                routerLink: ['/auth/error']
                            },
                            {
                                label: 'Foglalók',
                                icon: 'pi pi-fw pi-dollar',
                                routerLink: ['/auth/access']
                            },
                            {
                                label: 'Végszámlák',
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
