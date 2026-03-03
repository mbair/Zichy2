import { OnInit, isDevMode } from '@angular/core';
import { Component } from '@angular/core';
import { UserService } from '../demo/service/user.service';
import { APOLLO_ROUTES } from '../apollo/apollo-routes';

interface MenuNode {
    label?: string
    icon?: string
    routerLink?: any[]
    items?: MenuNode[]
    requiredRoles?: string[]
    separator?: boolean
}

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html',
    standalone: false
})
export class AppMenuComponent implements OnInit {

    model: MenuNode[] = []
    userRoles: string[] = []
    apolloRoutes = APOLLO_ROUTES

    constructor(public userService: UserService) { }

    ngOnInit() {
        // Fetch user roles
        this.userService.getUserRole().subscribe((roles: any) => {
            this.userRoles = roles

            // Prepare menu items, with submenus already filtered by permissions
            const menuModel: MenuNode[] = [
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
                        },
                        {
                            label: 'Apollo Demo Apps (csak megtekintés)',
                            icon: 'pi pi-fw pi-th-large',
                            items: [
                                {
                                    label: 'Chat',
                                    icon: 'pi pi-fw pi-comments',
                                    routerLink: [this.apolloRoutes.apps.chat]
                                },
                                {
                                    label: 'CMS',
                                    icon: 'pi pi-fw pi-file-edit',
                                    routerLink: [this.apolloRoutes.apps.cmsList]
                                },
                                {
                                    label: 'Files',
                                    icon: 'pi pi-fw pi-folder',
                                    routerLink: [this.apolloRoutes.apps.files]
                                },
                                {
                                    label: 'Mail',
                                    icon: 'pi pi-fw pi-envelope',
                                    routerLink: [this.apolloRoutes.apps.mailInbox]
                                },
                                {
                                    label: 'Task List',
                                    icon: 'pi pi-fw pi-check-square',
                                    routerLink: [this.apolloRoutes.apps.taskList]
                                }
                            ],
                            requiredRoles: ['Super Admin', 'Nagy Admin']
                        }
                    ])
                },
                {
                    label: 'Arculati Demo (Apollo)',
                    items: this.getFilteredItems([
                        {
                            label: 'Apollo Dashboard (demo)',
                            icon: 'pi pi-fw pi-chart-line',
                            routerLink: [this.apolloRoutes.root],
                            requiredRoles: ['Super Admin', 'Nagy Admin']
                        },
                        {
                            label: 'Apollo UI Kit',
                            icon: 'pi pi-fw pi-star',
                            items: [
                                {
                                    label: 'Form Layout',
                                    icon: 'pi pi-fw pi-id-card',
                                    routerLink: [this.apolloRoutes.uikit.formLayout]
                                },
                                {
                                    label: 'Input',
                                    icon: 'pi pi-fw pi-pencil',
                                    routerLink: [this.apolloRoutes.uikit.input]
                                },
                                {
                                    label: 'Table',
                                    icon: 'pi pi-fw pi-table',
                                    routerLink: [this.apolloRoutes.uikit.table]
                                }
                            ],
                            requiredRoles: ['Super Admin', 'Nagy Admin']
                        },
                        {
                            label: 'Apollo E-Commerce',
                            icon: 'pi pi-fw pi-shopping-cart',
                            items: [
                                {
                                    label: 'Product List',
                                    icon: 'pi pi-fw pi-list',
                                    routerLink: [this.apolloRoutes.ecommerce.productList]
                                },
                                {
                                    label: 'Shopping Cart',
                                    icon: 'pi pi-fw pi-shopping-cart',
                                    routerLink: [this.apolloRoutes.ecommerce.shoppingCart]
                                },
                                {
                                    label: 'Order History',
                                    icon: 'pi pi-fw pi-history',
                                    routerLink: [this.apolloRoutes.ecommerce.orderHistory]
                                }
                            ],
                            requiredRoles: ['Super Admin', 'Nagy Admin']
                        },
                        {
                            label: 'Apollo Pages',
                            icon: 'pi pi-fw pi-briefcase',
                            items: [
                                {
                                    label: 'Documentation',
                                    icon: 'pi pi-fw pi-info-circle',
                                    routerLink: [this.apolloRoutes.pages.documentation]
                                },
                                {
                                    label: 'About Us',
                                    icon: 'pi pi-fw pi-users',
                                    routerLink: [this.apolloRoutes.pages.aboutUs]
                                },
                                {
                                    label: 'Contact',
                                    icon: 'pi pi-fw pi-phone',
                                    routerLink: [this.apolloRoutes.pages.contact]
                                }
                            ],
                            requiredRoles: ['Super Admin', 'Nagy Admin']
                        },
                        {
                            label: 'Apollo Blocks',
                            icon: 'pi pi-fw pi-th-large',
                            routerLink: [this.apolloRoutes.blocks],
                            requiredRoles: ['Super Admin', 'Nagy Admin']
                        },
                        {
                            label: 'Apollo Profile',
                            icon: 'pi pi-fw pi-user-edit',
                            routerLink: [this.apolloRoutes.profile.list],
                            requiredRoles: ['Super Admin', 'Nagy Admin']
                        },
                        {
                            label: 'Apollo Landing',
                            icon: 'pi pi-fw pi-globe',
                            routerLink: [this.apolloRoutes.landing],
                            requiredRoles: ['Super Admin', 'Nagy Admin']
                        },
                        {
                            label: 'Apollo Auth',
                            icon: 'pi pi-fw pi-sign-in',
                            items: [
                                {
                                    label: 'Login',
                                    icon: 'pi pi-fw pi-sign-in',
                                    routerLink: [this.apolloRoutes.auth.login]
                                },
                                {
                                    label: 'Register',
                                    icon: 'pi pi-fw pi-user-plus',
                                    routerLink: [this.apolloRoutes.auth.register]
                                },
                                {
                                    label: 'Forgot Password',
                                    icon: 'pi pi-fw pi-question-circle',
                                    routerLink: [this.apolloRoutes.auth.forgotPassword]
                                }
                            ],
                            requiredRoles: ['Super Admin', 'Nagy Admin']
                        }
                    ])
                }
            ];

            // Only include groups/items that are visible for current role set.
            this.model = this.getFilteredItems(menuModel)

            // Add developer menu items only when in dev mode
            if (isDevMode()) {
                const devModel: MenuNode[] = [
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

                // Apply the same recursive filtering for dev menu items as well.
                this.model = this.model.concat(this.getFilteredItems(devModel))
            }
        });
    }

    /**
     * Filters the given menu items to only include those that have either no required roles
     * or have required roles that are present in the userRoles array.
     * @param items - the array of menu items to filter
     * @returns the filtered array based on permissions
     */
    getFilteredItems(items: MenuNode[]): MenuNode[] {
        return items
            .map(item => {
                const cloned = { ...item }
                if (Array.isArray(cloned.items)) {
                    cloned.items = this.getFilteredItems(cloned.items)
                }
                return cloned
            })
            .filter(item => {
                const requiredRoles: string[] = item.requiredRoles ?? []
                const hasRoleAccess = requiredRoles.length === 0 || requiredRoles.some((role: string) => this.userRoles.includes(role))
                const hasVisibleChildren = !Array.isArray(item.items) || item.items.length > 0
                return hasRoleAccess && hasVisibleChildren
            })
    }
}
