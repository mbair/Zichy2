import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { DatePicker } from 'primeng/datepicker';
import { Subject } from 'rxjs';
import { LocalizedDatePickerComponent } from './localized-date-picker.component';

class TranslateServiceStub {
    currentLang = 'hu';
    readonly onLangChange = new Subject<LangChangeEvent>();

    emitLangChange(lang: string): void {
        this.currentLang = lang;
        this.onLangChange.next({
            lang,
            translations: {}
        });
    }
}

describe('LocalizedDatePickerComponent', () => {
    let fixture: ComponentFixture<LocalizedDatePickerComponent>;
    let component: LocalizedDatePickerComponent;
    let translate: TranslateServiceStub;

    function createComponent(options?: { currentLang?: string; initialValue?: string | Date | null; useNativePicker?: boolean }): void {
        fixture?.destroy();
        translate = TestBed.inject(TranslateService) as unknown as TranslateServiceStub;

        if (options?.currentLang) {
            translate.currentLang = options.currentLang;
        }

        fixture = TestBed.createComponent(LocalizedDatePickerComponent);
        component = fixture.componentInstance;

        if (options?.useNativePicker) {
            component.useNativePicker = true;
        }

        if (options && Object.prototype.hasOwnProperty.call(options, 'initialValue')) {
            component.writeValue(options.initialValue ?? null);
        }

        fixture.detectChanges();
    }

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [LocalizedDatePickerComponent, NoopAnimationsModule],
            providers: [
                {
                    provide: TranslateService,
                    useClass: TranslateServiceStub
                }
            ]
        }).compileComponents();
        createComponent();
    });

    function getCalendar(): DatePicker {
        return fixture.debugElement.query(By.directive(DatePicker)).componentInstance as DatePicker;
    }

    it('renders Hungarian date format and placeholder by default', () => {
        const calendar = getCalendar();

        expect(component.currentLang).toBe('hu');
        expect(calendar.dateFormat).toBe('yy.mm.dd');
        expect(calendar.placeholder).toBe('éééé.hh.nn');
    });

    it('renders English date format when initialized in English', () => {
        createComponent({ currentLang: 'gb' });

        const calendar = getCalendar();
        expect(component.currentLang).toBe('en');
        expect(calendar.dateFormat).toBe('dd/mm/yy');
        expect(calendar.placeholder).toBe('dd/mm/yyyy');
    });

    it('renders the input value in English format when initialized in English', () => {
        createComponent({ currentLang: 'gb', initialValue: '2026-03-11' });

        const input = fixture.nativeElement.querySelector('input') as HTMLInputElement;
        expect(input.value).toBe('11/03/2026');
    });

    it('writes string model values as Date internally', () => {
        component.writeValue('2026-03-11');

        expect(component.internalValue instanceof Date).toBeTrue();
        expect(component.internalValue?.getFullYear()).toBe(2026);
        expect(component.internalValue?.getMonth()).toBe(2);
        expect(component.internalValue?.getDate()).toBe(11);
    });

    it('emits ymd string by default when a date is selected', () => {
        const onChange = jasmine.createSpy('onChange');
        const selectedDate = new Date(2026, 2, 11);
        component.registerOnChange(onChange);

        component.handleModelChange(selectedDate);
        component.handleSelect(selectedDate);

        expect(onChange).toHaveBeenCalledWith('2026-03-11');
    });

    it('emits Date objects when modelType is date', () => {
        const onChange = jasmine.createSpy('onChange');
        component.modelType = 'date';
        component.registerOnChange(onChange);
        const selectedDate = new Date(2026, 2, 11);

        component.handleModelChange(selectedDate);
        component.handleSelect(selectedDate);

        expect(onChange).toHaveBeenCalledWith(selectedDate);
    });

    it('does not emit model changes while typing until blur', fakeAsync(() => {
        const onChange = jasmine.createSpy('onChange');
        component.registerOnChange(onChange);

        component.handleModelChange(new Date(2026, 2, 11));

        expect(onChange).not.toHaveBeenCalled();

        component.handleBlur();
        tick();

        expect(onChange).toHaveBeenCalledWith('2026-03-11');
    }));

    it('emits onSelect on blur after manual value change', fakeAsync(() => {
        const selectSpy = jasmine.createSpy('selectSpy');
        component.onSelect.subscribe(selectSpy);
        component.writeValue('2026-03-10');
        component.handleModelChange(new Date(2026, 2, 11));

        component.handleBlur();
        tick();

        expect(selectSpy).toHaveBeenCalledWith(jasmine.any(Date));
        expect((selectSpy.calls.mostRecent().args[0] as Date).getDate()).toBe(11);
    }));

    it('does not duplicate onSelect on blur after calendar click selection', fakeAsync(() => {
        const selectSpy = jasmine.createSpy('selectSpy');
        const selectedDate = new Date(2026, 2, 11);
        component.onSelect.subscribe(selectSpy);
        component.handleModelChange(selectedDate);

        component.handleSelect(selectedDate);
        component.handleBlur();
        tick();

        expect(selectSpy).toHaveBeenCalledTimes(1);
    }));

    it('emits clear and resets the model', () => {
        const onChange = jasmine.createSpy('onChange');
        const clearSpy = jasmine.createSpy('clearSpy');
        component.registerOnChange(onChange);
        component.onClearClick.subscribe(clearSpy);
        component.writeValue('2026-03-11');

        component.handleClearClick();

        expect(component.internalValue).toBeNull();
        expect(onChange).toHaveBeenCalledWith(null);
        expect(clearSpy).toHaveBeenCalledWith(null);
    });

    it('fills the input when a date is selected from the calendar popup', () => {
        const calendar = getCalendar();
        const fakeEvent = {
            preventDefault: () => {}
        } as Event;

        calendar.onDateSelect(fakeEvent, {
            year: 2026,
            month: 2,
            day: 11,
            selectable: true,
            otherMonth: false,
            today: false
        });
        fixture.detectChanges();

        const input = fixture.nativeElement.querySelector('input') as HTMLInputElement;
        expect(input.value).toBe('2026.03.11');
    });

    it('keeps the selected date when blur happens before calendar click handling', fakeAsync(() => {
        const selectedDate = new Date(2026, 2, 11);

        component.handleBlur();
        component.handleModelChange(selectedDate);
        component.handleSelect(selectedDate);
        tick();

        expect(component.internalValue).toEqual(selectedDate);
    }));

    it('stops overlay pointer events from bubbling to document listeners', fakeAsync(() => {
        const calendar = getCalendar();
        const overlay = document.createElement('div');
        const bodyListener = jasmine.createSpy('bodyListener');

        document.body.appendChild(overlay);
        document.body.addEventListener('mousedown', bodyListener, { once: true });
        (calendar as unknown as { overlay: HTMLDivElement }).overlay = overlay;

        component.handleCalendarShow();
        tick();

        overlay.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));

        expect(bodyListener).not.toHaveBeenCalled();

        component.handleCalendarClose();
        overlay.remove();
    }));

    it('renders native picker value when enabled', () => {
        createComponent({ useNativePicker: true, initialValue: '2026-03-11' });

        const input = fixture.nativeElement.querySelector('input[type="date"]') as HTMLInputElement;
        expect(input.value).toBe('2026-03-11');
    });

    it('emits selected value from native picker change', () => {
        createComponent({ useNativePicker: true });
        const onChange = jasmine.createSpy('onChange');
        const selectSpy = jasmine.createSpy('selectSpy');
        component.registerOnChange(onChange);
        component.onSelect.subscribe(selectSpy);

        const input = fixture.nativeElement.querySelector('input[type="date"]') as HTMLInputElement;
        input.value = '2026-03-11';
        input.dispatchEvent(new Event('input'));
        input.dispatchEvent(new Event('change'));

        expect(component.internalValue).toEqual(new Date(2026, 2, 11));
        expect(onChange).toHaveBeenCalledWith('2026-03-11');
        expect(selectSpy).toHaveBeenCalledWith(jasmine.any(Date));
    });
});
