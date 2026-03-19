import { Component, OnDestroy, Renderer2, ViewChild } from '@angular/core';
import { ActivatedRouteSnapshot, NavigationEnd, Router } from '@angular/router';
import { filter, Subscription } from 'rxjs';
import { AuthService } from '../demo/service/auth.service';
import { SessionService, SessionWarningState } from '../demo/service/session.service';
import { formatRemainingSessionTime } from '../demo/utils/session-time.utils';
import { MenuService } from './app.menu.service';
import { AppSidebarComponent } from './app.sidebar.component';
import { AppTopbarComponent } from './app.topbar.component';
import { HelpSidebarContent, HELP_SIDEBAR_CONTENT } from './help/help-sidebar-content.data';
import { LayoutService } from './service/app.layout.service';

@Component({
    selector: 'app-layout',
    templateUrl: './app.layout.component.html'
})
export class AppLayoutComponent implements OnDestroy {

    overlayMenuOpenSubscription: Subscription;
    sessionWarningSubscription: Subscription;

    menuOutsideClickListener: any;

    menuScrollListener: any;

    @ViewChild(AppSidebarComponent) appSidebar!: AppSidebarComponent;

    @ViewChild(AppTopbarComponent) appTopbar!: AppTopbarComponent;

    sessionWarning: SessionWarningState = {
        visible: false,
        remainingMs: 0,
        refreshing: false,
        error: null,
    };

    currentHelpContent: HelpSidebarContent = this.createDefaultHelpContent();

    constructor(
        private menuService: MenuService,
        public layoutService: LayoutService,
        public renderer: Renderer2,
        public router: Router,
        private authService: AuthService,
        private sessionService: SessionService
    ) {
        this.overlayMenuOpenSubscription = this.layoutService.overlayOpen$.subscribe(() => {
            if (!this.menuOutsideClickListener) {
                this.menuOutsideClickListener = this.renderer.listen('document', 'click', event => {
                    const isOutsideClicked = !(this.appSidebar.el.nativeElement.isSameNode(event.target) || this.appSidebar.el.nativeElement.contains(event.target)
                    || this.appTopbar.menuButton.nativeElement.isSameNode(event.target) || this.appTopbar.menuButton.nativeElement.contains(event.target));
                    if (isOutsideClicked) {
                        this.hideMenu();
                    }
                });
            }

            if ((this.layoutService.isHorizontal() || this.layoutService.isSlim()|| this.layoutService.isSlimPlus()) && !this.menuScrollListener) {
                this.menuScrollListener = this.renderer.listen(this.appSidebar.menuContainer.nativeElement, 'scroll', event => {
                    if (this.layoutService.isDesktop()) {
                        this.hideMenu();
                    }
                });
            }

            if (this.layoutService.state.staticMenuMobileActive) {
                this.blockBodyScroll();
            }
        });

        this.router.events.pipe(filter(event => event instanceof NavigationEnd))
            .subscribe(() => {
                this.updateHelpContent();
                this.hideMenu();
            });

        this.sessionWarningSubscription = this.sessionService.sessionWarning$.subscribe((state) => {
            this.sessionWarning = state;
        });

        this.updateHelpContent();
    }

    blockBodyScroll(): void {
        if (document.body.classList) {
            document.body.classList.add('blocked-scroll');
        }
        else {
            document.body.className += ' blocked-scroll';
        }
    }

    unblockBodyScroll(): void {
        if (document.body.classList) {
            document.body.classList.remove('blocked-scroll');
        }
        else {
            document.body.className = document.body.className.replace(new RegExp('(^|\\b)' +
                'blocked-scroll'.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
        }
    }

    hideMenu() {
        this.layoutService.state.overlayMenuActive = false;
        this.layoutService.state.staticMenuMobileActive = false;
        this.layoutService.state.menuHoverActive = false;
        this.menuService.reset();

        if(this.menuOutsideClickListener) {
            this.menuOutsideClickListener();
            this.menuOutsideClickListener = null;
        }

        if (this.menuScrollListener) {
            this.menuScrollListener();
            this.menuScrollListener = null;
        }
        
        this.unblockBodyScroll();
    }

    closeHelpSidebar(): void {
        this.layoutService.hideHelpSidebar();
    }

    get containerClass() {
        return {
            'layout-light': this.layoutService.config.colorScheme === 'light',
            'layout-dim': this.layoutService.config.colorScheme === 'dim',
            'layout-dark': this.layoutService.config.colorScheme === 'dark',
            'layout-colorscheme-menu': this.layoutService.config.menuTheme === 'colorScheme',
            'layout-primarycolor-menu': this.layoutService.config.menuTheme === 'primaryColor',
            'layout-transparent-menu': this.layoutService.config.menuTheme === 'transparent',
            'layout-overlay': this.layoutService.config.menuMode === 'overlay',
            'layout-static': this.layoutService.config.menuMode === 'static',
            'layout-slim': this.layoutService.config.menuMode === 'slim',
            'layout-slim-plus': this.layoutService.config.menuMode === 'slim-plus',
            'layout-horizontal': this.layoutService.config.menuMode === 'horizontal',
            'layout-reveal': this.layoutService.config.menuMode === 'reveal',
            'layout-drawer': this.layoutService.config.menuMode === 'drawer',
            'layout-static-inactive': this.layoutService.state.staticMenuDesktopInactive && this.layoutService.config.menuMode === 'static',
            'layout-overlay-active': this.layoutService.state.overlayMenuActive,
            'layout-mobile-active': this.layoutService.state.staticMenuMobileActive,
            'p-input-filled': this.layoutService.config.inputStyle === 'filled',
            'p-ripple-disabled': !this.layoutService.config.ripple,
            'layout-sidebar-active': this.layoutService.state.sidebarActive,
            'layout-sidebar-anchored': this.layoutService.state.anchored
        }
    }

    formatSessionRemaining(remainingMs: number): string {
        return formatRemainingSessionTime(remainingMs);
    }

    staySignedIn(): void {
        this.sessionService.extendSession();
    }

    logout(): void {
        this.authService.logout();
    }

    private updateHelpContent(): void {
        const helpFromRoute = this.resolveHelpContent();
        this.currentHelpContent = helpFromRoute || HELP_SIDEBAR_CONTENT.default;
    }

    private resolveHelpContent(): HelpSidebarContent | null {
        const routeChain = this.getRouteChain(this.router.routerState.snapshot.root);
        for (let index = routeChain.length - 1; index >= 0; index--) {
            const helpContent = routeChain[index]?.data?.['helpSidebar'] as HelpSidebarContent | undefined;
            if (helpContent) {
                return helpContent;
            }
        }

        return null;
    }

    private createDefaultHelpContent(): HelpSidebarContent {
        return HELP_SIDEBAR_CONTENT.default;
    }

    private getRouteChain(root: ActivatedRouteSnapshot): ActivatedRouteSnapshot[] {
        const chain: ActivatedRouteSnapshot[] = [];
        let currentRoute: ActivatedRouteSnapshot | null = root;

        while (currentRoute) {
            chain.push(currentRoute);
            currentRoute = currentRoute.firstChild || null;
        }

        return chain;
    }

    ngOnDestroy() {
        if (this.overlayMenuOpenSubscription) {
            this.overlayMenuOpenSubscription.unsubscribe();
        }

        if (this.sessionWarningSubscription) {
            this.sessionWarningSubscription.unsubscribe();
        }

        if (this.menuOutsideClickListener) {
            this.menuOutsideClickListener();
        }
    }

}
