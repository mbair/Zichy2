import { Directive, ElementRef, OnDestroy, Renderer2, Input, OnInit, HostBinding, AfterViewInit } from '@angular/core';

@Directive({
    selector: '[animateEnter]'
})
export class AnimateEnterDirective implements OnInit, AfterViewInit, OnDestroy {

    @Input('animateEnter') animation!: string

    documentScrollListener: (() => void) | null = null
    windowResizeListener: (() => void) | null = null
    loadListener: () => void = () => {}
    intersectionObserver: IntersectionObserver | null = null
    entered: boolean = false

    @HostBinding('class.visibility-hidden') visibilityHidden: boolean = true

    constructor(private el: ElementRef, private renderer: Renderer2) { }

    ngOnInit() {
        if (this.isImage()) {
            this.loadListener = this.renderer.listen(this.el.nativeElement, 'load', () => {
                this.bindVisibilityTracking()
            })
        }
    }

    ngAfterViewInit() {
        setTimeout(() => {
            this.bindVisibilityTracking()
        }, 100)
    }

    // Checks if the component is in the viewport and animates it if necessary
    checkAndAnimate(): void {
        if (this.isInViewPort() && !this.entered) {
            this.enter()
        }
    }

    bindVisibilityTracking(): void {
        if (this.entered) {
            return
        }

        this.checkAndAnimate()

        if (this.entered) {
            return
        }

        if ('IntersectionObserver' in window) {
            this.intersectionObserver?.disconnect()
            this.intersectionObserver = new IntersectionObserver(
                (entries) => {
                    const entry = entries[0]
                    if (entry?.isIntersecting || (entry?.intersectionRatio ?? 0) > 0) {
                        this.enter()
                    }
                },
                {
                    threshold: 0.05,
                    rootMargin: '0px 0px -8% 0px',
                },
            )
            this.intersectionObserver.observe(this.el.nativeElement)
            return
        }

        this.bindEventListeners()
    }

    // Listen to the scroll event
    bindEventListeners(): void {
        if (!this.entered && !this.documentScrollListener) {
            this.documentScrollListener = this.renderer.listen('window', 'scroll', () => {
                this.checkAndAnimate()
            })
        }

        if (!this.entered && !this.windowResizeListener) {
            this.windowResizeListener = this.renderer.listen('window', 'resize', () => {
                this.checkAndAnimate()
            })
        }
    }

    // Remove events when they are no longer needed
    removeEventListeners(): void {
        if (this.documentScrollListener) {
            this.documentScrollListener()
            this.documentScrollListener = null
        }

        if (this.windowResizeListener) {
            this.windowResizeListener()
            this.windowResizeListener = null
        }

        if (this.intersectionObserver) {
            this.intersectionObserver.disconnect()
            this.intersectionObserver = null
        }
    }

    isInViewPort(): boolean {
        const rect = this.el.nativeElement.getBoundingClientRect()
        const winHeight = window.innerHeight || document.documentElement.clientHeight
        return rect.bottom >= 0 && rect.top <= winHeight
    }

    enter(): void {
        this.el.nativeElement.classList.add('hidden', this.animation)
        this.el.nativeElement.classList.remove('visibility-hidden', 'hidden')
        this.visibilityHidden = false
        this.entered = true
        this.removeEventListeners()
    }

    isImage(): boolean {
        return this.el.nativeElement.tagName === 'IMG'
    }

    ngOnDestroy() {
        this.removeEventListeners()
        if (this.loadListener) {
            this.loadListener()
        }
    }
}
