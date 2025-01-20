import { Directive, ElementRef, OnDestroy, Renderer2, Input, OnInit, HostBinding, AfterViewInit } from '@angular/core';

@Directive({
    selector: '[animateEnter]'
})
export class AnimateEnterDirective implements OnInit, AfterViewInit, OnDestroy {

    @Input('animateEnter') animation!: string

    documentScrollListener: (() => void) | null = null
    loadListener: () => void = () => {}
    entered: boolean = false

    @HostBinding('class.visibility-hidden') visibilityHidden: boolean = true

    constructor(private el: ElementRef, private renderer: Renderer2) { }

    ngOnInit() {
        if (this.isImage()) {
            this.loadListener = this.renderer.listen(this.el.nativeElement, 'load', () => {
                this.checkAndAnimate()
            })
        }
    }

    ngAfterViewInit() {
        // A short delay to allow the animation to start on load
        setTimeout(() => {
            this.checkAndAnimate()
        }, 100)

        // Listen to the scroll event
        this.bindEventListeners()
    }

    // Checks if the component is in the viewport and animates it if necessary
    checkAndAnimate(): void {
        if (this.isInViewPort() && !this.entered) {
            this.enter()
        }
    }

    // Listen to the scroll event
    bindEventListeners(): void {
        if (!this.entered) {
            this.documentScrollListener = this.renderer.listen('window', 'scroll', () => {
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
    }

    isInViewPort(): boolean {
        const rect = this.el.nativeElement.getBoundingClientRect()
        const winHeight = window.innerHeight || document.documentElement.clientHeight
        return rect.top >= 0 && rect.top <= winHeight
    }

    enter(): void {
        this.el.nativeElement.classList.add('hidden', this.animation)
        this.el.nativeElement.classList.remove('visibility-hidden', 'hidden')
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
