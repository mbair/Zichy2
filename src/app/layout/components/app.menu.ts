import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AppMenuitem } from './app.menuitem';
import { APOLLO_ROUTES } from '@/app/apollo/apollo-routes';

const R = APOLLO_ROUTES;

@Component({
    selector: 'app-menu',
    standalone: true,
    imports: [CommonModule, AppMenuitem, RouterModule],
    template: `<ul class="layout-menu">
        @for (item of model; track item.label) {
            @if (!item.separator) {
                <li app-menuitem [item]="item" [root]="true"></li>
            } @else {
                <li class="menu-separator"></li>
            }
        }
    </ul> `
})
export class AppMenu {
    model: any[] = [
        {
            label: 'Dashboards',
            icon: 'pi pi-home',
            path: R.root,
            items: [
                {
                    label: 'E-Commerce',
                    icon: 'pi pi-fw pi-home',
                    routerLink: [R.root]
                },
                {
                    label: 'Banking',
                    icon: 'pi pi-fw pi-image',
                    routerLink: [R.dashboardBanking]
                }
            ]
        },
        {
            label: 'Apps',
            icon: 'pi pi-th-large',
            path: R.apps.root,
            items: [
                {
                    label: 'CMS',
                    icon: 'pi pi-fw pi-comment',
                    path: R.apps.cmsRoot,
                    items: [
                        {
                            label: 'Detail',
                            icon: 'pi pi-fw pi-list',
                            routerLink: [R.apps.cmsDetail]
                        },
                        {
                            label: 'Detail-2',
                            icon: 'pi pi-fw pi-list',
                            routerLink: [R.apps.cmsDetail2]
                        },
                        {
                            label: 'List',
                            icon: 'pi pi-fw pi-image',
                            routerLink: [R.apps.cmsList]
                        },
                        {
                            label: 'Edit',
                            icon: 'pi pi-fw pi-pencil',
                            routerLink: [R.apps.cmsEdit]
                        }
                    ]
                },

                {
                    label: 'Chat',
                    icon: 'pi pi-fw pi-comments',
                    routerLink: [R.apps.chat]
                },
                {
                    label: 'Files',
                    icon: 'pi pi-fw pi-folder',
                    routerLink: [R.apps.files]
                },
                {
                    label: 'Mail',
                    icon: 'pi pi-fw pi-envelope',
                    routerLink: [R.apps.mailInbox]
                },
                {
                    label: 'Task List',
                    icon: 'pi pi-fw pi-check-square',
                    routerLink: [R.apps.taskList]
                }
            ]
        },
        {
            label: 'UI Kit',
            icon: 'pi pi-fw pi-star-fill',
            path: R.uikit.root,
            items: [
                {
                    label: 'Form Layout',
                    icon: 'pi pi-fw pi-id-card',
                    routerLink: [R.uikit.formLayout]
                },
                {
                    label: 'Input',
                    icon: 'pi pi-fw pi-check-square',
                    routerLink: [R.uikit.input]
                },

                {
                    label: 'Button',
                    icon: 'pi pi-fw pi-box',
                    routerLink: [R.uikit.button]
                },
                {
                    label: 'Table',
                    icon: 'pi pi-fw pi-table',
                    routerLink: [R.uikit.table]
                },
                {
                    label: 'List',
                    icon: 'pi pi-fw pi-list',
                    routerLink: [R.uikit.list]
                },
                {
                    label: 'Tree',
                    icon: 'pi pi-fw pi-share-alt',
                    routerLink: [R.uikit.tree]
                },
                {
                    label: 'Panel',
                    icon: 'pi pi-fw pi-tablet',
                    routerLink: [R.uikit.panel]
                },
                {
                    label: 'Overlay',
                    icon: 'pi pi-fw pi-clone',
                    routerLink: [R.uikit.overlay]
                },
                {
                    label: 'Media',
                    icon: 'pi pi-fw pi-image',
                    routerLink: [R.uikit.media]
                },
                {
                    label: 'Menu',
                    icon: 'pi pi-fw pi-bars',
                    routerLink: [R.uikit.menu],
                    routerLinkActiveOptions: {
                        paths: 'subset',
                        queryParams: 'ignored',
                        matrixParams: 'ignored',
                        fragment: 'ignored'
                    }
                },
                {
                    label: 'Message',
                    icon: 'pi pi-fw pi-comment',
                    routerLink: [R.uikit.message]
                },
                {
                    label: 'File',
                    icon: 'pi pi-fw pi-file',
                    routerLink: [R.uikit.file]
                },
                {
                    label: 'Chart',
                    icon: 'pi pi-fw pi-chart-bar',
                    routerLink: [R.uikit.charts]
                },
                {
                    label: 'Misc',
                    icon: 'pi pi-fw pi-circle-off',
                    routerLink: [R.uikit.misc]
                }
            ]
        },
        {
            label: 'Blocks',
            icon: 'pi pi-fw pi-prime',
            path: R.blocks,
            items: [
                {
                    label: 'Block Library',
                    icon: 'pi pi-fw pi-th-large',
                    routerLink: [R.blocks]
                }
            ]
        },
        {
            label: 'Pages',
            icon: 'pi pi-fw pi-briefcase',
            path: R.pages.root,
            items: [
                {
                    label: 'Landing',
                    icon: 'pi pi-fw pi-globe',
                    routerLink: [R.landing]
                },
                {
                    label: 'Auth',
                    icon: 'pi pi-fw pi-user',
                    path: R.pages.authRoot,
                    items: [
                        {
                            label: 'Login',
                            icon: 'pi pi-fw pi-sign-in',
                            routerLink: [R.auth.login]
                        },
                        {
                            label: 'Error',
                            icon: 'pi pi-fw pi-times-circle',
                            routerLink: [R.auth.error]
                        },
                        {
                            label: 'Access Denied',
                            icon: 'pi pi-fw pi-lock',
                            routerLink: [R.auth.access]
                        },
                        {
                            label: 'Register',
                            icon: 'pi pi-fw pi-user-plus',
                            routerLink: [R.auth.register]
                        },
                        {
                            label: 'Forgot Password',
                            icon: 'pi pi-fw pi-question',
                            routerLink: [R.auth.forgotPassword]
                        },
                        {
                            label: 'New Password',
                            icon: 'pi pi-fw pi-cog',
                            routerLink: [R.auth.newPassword]
                        },
                        {
                            label: 'Verification',
                            icon: 'pi pi-fw pi-envelope',
                            routerLink: [R.auth.verification]
                        },
                        {
                            label: 'Lock Screen',
                            icon: 'pi pi-fw pi-eye-slash',
                            routerLink: [R.auth.lockScreen]
                        }
                    ]
                },
                {
                    label: 'Documentation',
                    icon: 'pi pi-fw pi-info-circle',
                    routerLink: [R.pages.documentation]
                },
                {
                    label: 'Crud',
                    icon: 'pi pi-fw pi-pencil',
                    routerLink: [R.pages.crud]
                },

                {
                    label: 'Invoice',
                    icon: 'pi pi-fw pi-dollar',
                    routerLink: [R.pages.invoice]
                },
                {
                    label: 'About Us',
                    icon: 'pi pi-fw pi-user',
                    routerLink: [R.pages.aboutUs]
                },
                {
                    label: 'Help',
                    icon: 'pi pi-fw pi-question-circle',
                    routerLink: [R.pages.help]
                },
                {
                    label: 'Not Found',
                    icon: 'pi pi-fw pi-exclamation-circle',
                    routerLink: [R.notFound]
                },
                {
                    label: 'Empty',
                    icon: 'pi pi-fw pi-circle-off',
                    routerLink: [R.pages.empty]
                },
                {
                    label: 'FAQ',
                    icon: 'pi pi-fw pi-question',
                    routerLink: [R.pages.faq]
                },
                {
                    label: 'Contact Us',
                    icon: 'pi pi-fw pi-phone',
                    routerLink: [R.pages.contact]
                }
            ]
        },
        {
            label: 'E-Commerce',
            icon: 'pi pi-fw pi-wallet',
            path: R.ecommerce.root,
            items: [
                {
                    label: 'Product Overview',
                    icon: 'pi pi-fw pi-image',
                    routerLink: [R.ecommerce.productOverview]
                },
                {
                    label: 'Product List',
                    icon: 'pi pi-fw pi-list',
                    routerLink: [R.ecommerce.productList]
                },
                {
                    label: 'New Product',
                    icon: 'pi pi-fw pi-plus',
                    routerLink: [R.ecommerce.newProduct]
                },
                {
                    label: 'Shopping Cart',
                    icon: 'pi pi-fw pi-shopping-cart',
                    routerLink: [R.ecommerce.shoppingCart]
                },
                {
                    label: 'Checkout Form',
                    icon: 'pi pi-fw pi-check-square',
                    routerLink: [R.ecommerce.checkoutForm]
                },
                {
                    label: 'Order History',
                    icon: 'pi pi-fw pi-history',
                    routerLink: [R.ecommerce.orderHistory]
                },
                {
                    label: 'Order Summary',
                    icon: 'pi pi-fw pi-file',
                    routerLink: [R.ecommerce.orderSummary]
                }
            ]
        },
        {
            label: 'User Management',
            icon: 'pi pi-fw pi-user',
            path: R.profile.root,
            items: [
                {
                    label: 'List',
                    icon: 'pi pi-fw pi-list',
                    routerLink: [R.profile.list]
                },
                {
                    label: 'Create',
                    icon: 'pi pi-fw pi-plus',
                    routerLink: [R.profile.create]
                }
            ]
        },
        {
            label: 'Documentation',
            icon: 'pi pi-fw pi-info-circle',
            path: R.pages.documentation,
            items: [
                {
                    label: 'Developer Docs',
                    icon: 'pi pi-fw pi-book',
                    routerLink: [R.pages.documentation]
                }
            ]
        }
    ];
}
