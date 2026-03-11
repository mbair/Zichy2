import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { Calendar } from 'primeng/calendar';
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

        fixture = TestBed.createComponent(LocalizedDatePickerComponent);
        component = fixture.componentInstance;
        translate = TestBed.inject(TranslateService) as unknown as TranslateServiceStub;
        fixture.detectChanges();
    });

    function getCalendar(): Calendar {
        fixture.detectChanges();
        return fixture.debugElement.query(By.directive(Calendar)).componentInstance as Calendar;
    }

    it('renders Hungarian date format and placeholder by default', () => {
        const calendar = getCalendar();

        expect(component.currentLang).toBe('hu');
        expect(calendar.dateFormat).toBe('yy.mm.dd');
        expect(calendar.placeholder).toBe('éééé.hh.nn');
    });

    it('switches to English date format on language change', () => {
        translate.emitLangChange('gb');
        fixture.detectChanges();

        const calendar = getCalendar();
        expect(component.currentLang).toBe('en');
        expect(calendar.dateFormat).toBe('dd/mm/yy');
        expect(calendar.placeholder).toBe('dd/mm/yyyy');
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

    it('renders native picker value when enabled', () => {
        component.useNativePicker = true;
        component.writeValue('2026-03-11');
        fixture.detectChanges();

        const input = fixture.nativeElement.querySelector('input[type="date"]') as HTMLInputElement;
        expect(input.value).toBe('2026-03-11');
    });

    it('emits selected value from native picker change', () => {
        component.useNativePicker = true;
        const onChange = jasmine.createSpy('onChange');
        const selectSpy = jasmine.createSpy('selectSpy');
        component.registerOnChange(onChange);
        component.onSelect.subscribe(selectSpy);
        fixture.detectChanges();

        const input = fixture.nativeElement.querySelector('input[type="date"]') as HTMLInputElement;
        input.value = '2026-03-11';
        input.dispatchEvent(new Event('input'));
        input.dispatchEvent(new Event('change'));

        expect(component.internalValue).toEqual(new Date(2026, 2, 11));
        expect(onChange).toHaveBeenCalledWith('2026-03-11');
        expect(selectSpy).toHaveBeenCalledWith(jasmine.any(Date));
    });
});
