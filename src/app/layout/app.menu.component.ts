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

    constructor(
        public userService: UserService) { }

    ngOnInit() {
        this.userService.getUserRole().subscribe((roles: any) => {
            this.userRoles = roles

            this.model = [
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
                            label: 'Konferenciák',
                            icon: 'pi pi-fw pi-calendar',
                            routerLink: ['/conference'],
                            requiredRoles: [],
                        },
                        {
                            label: 'Vendégek',
                            icon: 'pi pi-fw pi-user',
                            routerLink: ['/guest'],
                            requiredRoles: []
                        },
                        {
                            label: 'Szobák',
                            icon: 'pi pi-fw pi-building',
                            routerLink: ['/room'],
                            requiredRoles: ['Super Admin', 'Nagy Admin']
                        },
                        {
                            label: 'RFID címke',
                            icon: 'pi pi-fw pi-tags',
                            routerLink: ['/rfid-tag'],
                            requiredRoles: ['Super Admin', 'Nagy Admin']
                        },
                    ])
                },
                {
                    label: 'Étterem',
                    items: [
                        {
                            label: 'Étrendek',
                            icon: 'pi pi-fw pi-pencil',
                            routerLink: ['/pages/food-sensitivities'],
                            requiredRoles: ['Super Admin', 'Nagy Admin']
                        },
                        // {
                        //     label: 'Ételpult',
                        //     icon: 'pi pi-fw pi-tablet',
                        //     routerLink: ['/food-counter']
                        // },
                        // {
                        //     label: 'Menük',
                        //     icon: 'pi pi-fw pi-circle',
                        //     // routerLink: ['/pages/menuk']
                        // },
                        {
                            label: 'Konyhanaptár*',
                            icon: 'pi pi-fw pi-calendar',
                            // routerLink: ['/pages/konyhanaptar'],
                            requiredRoles: ['Super Admin', 'Nagy Admin']
                        },
                    ]
                },
                {
                    label: 'Rendszer',
                    items: [
                        {
                            label: 'Felhasználók',
                            icon: 'pi pi-fw pi-users',
                            routerLink: ['/user'],
                            requiredRoles: ['Super Admin', 'Nagy Admin']
                        },
                        {
                            label: 'Logok',
                            icon: 'pi pi-fw pi-list',
                            routerLink: ['/logs'],
                            requiredRoles: ['Super Admin', 'Nagy Admin']
                        }
                    ]
                }
    
                        // {
                        //     label: 'Egyéb szolgáltatások',
                        //     icon: 'pi pi-fw pi-pencil',
                        //     // routerLink: ['/pages/egyeb']
                        // },
                        // {
                        //     label: 'Ételek',
                        //     icon: 'pi pi-fw pi-circle',
                        //     // routerLink: ['/pages/etelek']
                        // },
                        // {
                        //     label: 'Étel Voucher',
                        //     icon: 'pi pi-fw pi-pencil',
                        //     // routerLink: ['/pages/food-vouchers']
                        // },
            ]
    
    
            // Show this menu points only for Developers
            if (isDevMode()) {
                this.model.push(
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
                    {
                        label: 'Statisztikák',
                        icon: 'pi pi-fw pi-money',
                        items: [
                            {
                                label: 'Szobák kihasználtsága',
                                icon: 'pi pi-fw pi-chart-bar',
                                routerLink: ['/auth/login']
                            },
                            {
                                label: 'Étrendek szerint',
                                icon: 'pi pi-fw pi-chart-bar',
                                routerLink: ['/auth/error']
                            },
                            {
                                label: 'Korosztály szerint',
                                icon: 'pi pi-fw pi-chart-bar',
                                routerLink: ['/auth/access']
                            },
                        ]
                    },
                    {
                        label: 'Authentikáció',
                        icon: 'pi pi-fw pi-user',
                        items: [
                            {
                                label: 'Bejelentkezés',
                                icon: 'pi pi-fw pi-sign-in',
                                routerLink: ['/auth/login']
                            },
                            {
                                label: 'Hiba',
                                icon: 'pi pi-fw pi-times-circle',
                                routerLink: ['/auth/error']
                            },
                            {
                                label: 'Jogosultság megtagadva',
                                icon: 'pi pi-fw pi-lock',
                                routerLink: ['/auth/access']
                            }
                        ]
                    },
                    {
                        label: 'Komponensek',
                        items: [
                            {
                                label: 'Komponensek',
                                icon: 'pi pi-info',
                                items: [
                                    {
                                        label: 'Dashboards',
                                        icon: 'pi pi-home',
                                        items: [
                                            {
                                                label: 'E-Commerce',
                                                icon: 'pi pi-fw pi-home',
                                                routerLink: ['/']
                                            },
                                            {
                                                label: 'Banking',
                                                icon: 'pi pi-fw pi-image',
                                                routerLink: ['/dashboard-banking']
                                            }
                                        ]
                                    },
                                    {
                                        label: 'Pages',
                                        icon: 'pi pi-fw pi-briefcase',
                                        items: [
                                            {
                                                label: 'Landing',
                                                icon: 'pi pi-fw pi-globe',
                                                routerLink: ['/landing']
                                            },
                                            {
                                                label: 'Auth',
                                                icon: 'pi pi-fw pi-user',
                                                items: [
                                                    {
                                                        label: 'Login',
                                                        icon: 'pi pi-fw pi-sign-in',
                                                        routerLink: ['/auth/login']
                                                    },
                                                    {
                                                        label: 'Error',
                                                        icon: 'pi pi-fw pi-times-circle',
                                                        routerLink: ['/auth/error']
                                                    },
                                                    {
                                                        label: 'Access Denied',
                                                        icon: 'pi pi-fw pi-lock',
                                                        routerLink: ['/auth/access']
                                                    },
                                                    {
                                                        label: 'Register',
                                                        icon: 'pi pi-fw pi-user-plus',
                                                        routerLink: ['/auth/register']
                                                    },
                                                    {
                                                        label: 'Forgot Password',
                                                        icon: 'pi pi-fw pi-question',
                                                        routerLink: ['/auth/forgotpassword']
                                                    },
                                                    {
                                                        label: 'New Password',
                                                        icon: 'pi pi-fw pi-cog',
                                                        routerLink: ['/auth/newpassword']
                                                    },
                                                    {
                                                        label: 'Verification',
                                                        icon: 'pi pi-fw pi-envelope',
                                                        routerLink: ['/auth/verification']
                                                    },
                                                    {
                                                        label: 'Lock Screen',
                                                        icon: 'pi pi-fw pi-eye-slash',
                                                        routerLink: ['/auth/lockscreen']
                                                    }
                                                ]
                                            },
                                            {
                                                label: 'Crud',
                                                icon: 'pi pi-fw pi-pencil',
                                                routerLink: ['/pages/crud']
                                            },
                                            {
                                                label: 'Invoice',
                                                icon: 'pi pi-fw pi-dollar',
                                                routerLink: ['/pages/invoice']
                                            },
                                            {
                                                label: 'Help',
                                                icon: 'pi pi-fw pi-question-circle',
                                                routerLink: ['/pages/help']
                                            },
                                            {
                                                label: 'Not Found',
                                                icon: 'pi pi-fw pi-exclamation-circle',
                                                routerLink: ['/pages/notfound']
                                            },
                                            {
                                                label: 'Empty',
                                                icon: 'pi pi-fw pi-circle-off',
                                                routerLink: ['/pages/empty']
                                            },
                                            {
                                                label: 'FAQ',
                                                icon: 'pi pi-fw pi-question',
                                                routerLink: ['/pages/faq']
                                            }
                                        ]
                                    },
                                    {
                                        label: 'User Management',
                                        icon: 'pi pi-fw pi-user',
                                        items: [
                                            {
                                                label: 'List',
                                                icon: 'pi pi-fw pi-list',
                                                routerLink: ['profile/list']
                                            },
                                            {
                                                label: 'Create',
                                                icon: 'pi pi-fw pi-plus',
                                                routerLink: ['profile/create']
                                            }
                                        ]
                                    },
                                    {
                                        label: 'Hierarchy',
                                        icon: 'pi pi-fw pi-align-left',
                                        items: [
                                            {
                                                label: 'Submenu 1',
                                                icon: 'pi pi-fw pi-align-left',
                                                items: [
                                                    {
                                                        label: 'Submenu 1.1',
                                                        icon: 'pi pi-fw pi-align-left',
                                                        items: [
                                                            {
                                                                label: 'Submenu 1.1.1',
                                                                icon: 'pi pi-fw pi-align-left',
                                                            },
                                                            {
                                                                label: 'Submenu 1.1.2',
                                                                icon: 'pi pi-fw pi-align-left',
                                                            },
                                                            {
                                                                label: 'Submenu 1.1.3',
                                                                icon: 'pi pi-fw pi-align-left',
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        label: 'Submenu 1.2',
                                                        icon: 'pi pi-fw pi-align-left',
                                                        items: [
                                                            {
                                                                label: 'Submenu 1.2.1',
                                                                icon: 'pi pi-fw pi-align-left',
                                                            }
                                                        ]
                                                    }
                                                ]
                                            },
                                            {
                                                label: 'Submenu 2',
                                                icon: 'pi pi-fw pi-align-left',
                                                items: [
                                                    {
                                                        label: 'Submenu 2.1',
                                                        icon: 'pi pi-fw pi-align-left',
                                                        items: [
                                                            {
                                                                label: 'Submenu 2.1.1',
                                                                icon: 'pi pi-fw pi-align-left',
                                                            },
                                                            {
                                                                label: 'Submenu 2.1.2',
                                                                icon: 'pi pi-fw pi-align-left',
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        label: 'Submenu 2.2',
                                                        icon: 'pi pi-fw pi-align-left',
                                                        items: [
                                                            {
                                                                label: 'Submenu 2.2.1',
                                                                icon: 'pi pi-fw pi-align-left',
                                                            }
                                                        ]
                                                    }
                                                ]
                                            }
                                        ]
                                    },
                                    {
                                        label: 'Start',
                                        icon: 'pi pi-fw pi-download',
                                        items: [
                                            {
                                                label: 'Documentation',
                                                icon: 'pi pi-fw pi-info-circle',
                                                routerLink: ['/documentation']
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                )
            }
        })
    }

    getFilteredItems(items: any[]): any[] {
        return items.filter(item => 
            !item.requiredRoles || item.requiredRoles.some((role: any) => this.userRoles.includes(role))
        );
    }
}
