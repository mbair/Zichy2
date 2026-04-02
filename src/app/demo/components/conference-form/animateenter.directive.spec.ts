import { Component } from '@angular/core';
import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { AnimateEnterDirective } from './animateenter.directive';

@Component({
    template: `<div animateEnter="moveinup">Animated content</div>`
})
class TestHostComponent {}

describe('AnimateEnterDirective', () => {
    function createDirective() {
        const fixture = TestBed.createComponent(TestHostComponent);
        fixture.detectChanges();

        const directiveDebugElement = fixture.debugElement.query(By.directive(AnimateEnterDirective));
        const directive = directiveDebugElement.injector.get(AnimateEnterDirective);
        const hostElement = directiveDebugElement.nativeElement as HTMLDivElement;

        return {
            fixture,
            directive,
            hostElement
        };
    }

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [TestHostComponent, AnimateEnterDirective]
        }).compileComponents();
    });

    it('creates the directive on the host element', () => {
        const { directive, hostElement } = createDirective();

        expect(directive).toBeTruthy();
        expect(hostElement.classList.contains('visibility-hidden')).toBeTrue();
    });

    it('schedules visibility tracking after view init', fakeAsync(() => {
        const { directive } = createDirective();
        const bindVisibilityTrackingSpy = spyOn(directive, 'bindVisibilityTracking');

        directive.ngAfterViewInit();
        expect(bindVisibilityTrackingSpy).not.toHaveBeenCalled();

        tick(100);
        expect(bindVisibilityTrackingSpy).toHaveBeenCalled();
    }));

    it('enters by revealing the element and adding the animation class', () => {
        const { directive, hostElement } = createDirective();
        directive.animation = 'moveinup';
        directive.documentScrollListener = jasmine.createSpy('documentScrollListener');
        directive.windowResizeListener = jasmine.createSpy('windowResizeListener');

        directive.enter();

        expect(directive.entered).toBeTrue();
        expect(directive.visibilityHidden).toBeFalse();
        expect(hostElement.classList.contains('moveinup')).toBeTrue();
        expect(hostElement.classList.contains('visibility-hidden')).toBeFalse();
        expect(directive.documentScrollListener).toBeNull();
        expect(directive.windowResizeListener).toBeNull();
    });
});
