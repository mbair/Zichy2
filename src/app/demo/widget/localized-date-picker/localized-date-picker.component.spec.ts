import { ComponentFixture, TestBed } from '@angular/core/testing';
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
        component.registerOnChange(onChange);

        component.handleModelChange(new Date(2026, 2, 11));

        expect(onChange).toHaveBeenCalledWith('2026-03-11');
    });

    it('emits Date objects when modelType is date', () => {
        const onChange = jasmine.createSpy('onChange');
        component.modelType = 'date';
        component.registerOnChange(onChange);
        const selectedDate = new Date(2026, 2, 11);

        component.handleModelChange(selectedDate);

        expect(onChange).toHaveBeenCalledWith(selectedDate);
    });

    it('emits onSelect on blur after manual value change', () => {
        const selectSpy = jasmine.createSpy('selectSpy');
        component.onSelect.subscribe(selectSpy);
        component.writeValue('2026-03-10');
        component.handleModelChange(new Date(2026, 2, 11));

        component.handleBlur();

        expect(selectSpy).toHaveBeenCalledWith(jasmine.any(Date));
        expect((selectSpy.calls.mostRecent().args[0] as Date).getDate()).toBe(11);
    });

    it('does not duplicate onSelect on blur after calendar click selection', () => {
        const selectSpy = jasmine.createSpy('selectSpy');
        const selectedDate = new Date(2026, 2, 11);
        component.onSelect.subscribe(selectSpy);
        component.handleModelChange(selectedDate);

        component.handleSelect(selectedDate);
        component.handleBlur();

        expect(selectSpy).toHaveBeenCalledTimes(1);
    });

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
});
