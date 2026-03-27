import { CommonModule } from '@angular/common';
import { Component, EventEmitter, forwardRef, Input, OnChanges, OnDestroy, OnInit, Output, Renderer2, ViewChild } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { Calendar, CalendarModule } from 'primeng/calendar';
import { Subscription } from 'rxjs';
import { formatDateYmd, parseDateOnly } from '../../utils/date.utils';

type ModelType = 'string' | 'date';
type OverlayAction =
    | { type: 'select-date'; dateMeta: any }
    | { type: 'switch-view'; view: 'month' | 'year' }
    | { type: 'navigate'; direction: 'prev' | 'next' }
    | { type: 'select-month'; monthIndex: number }
    | { type: 'select-year'; year: number };

@Component({
    selector: 'app-localized-date-picker',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, CalendarModule],
    styles: [`
        :host {
            display: block;
            width: 100%;
        }

        .localized-date-picker-native {
            display: block;
            width: 100%;
            min-height: 3rem;
            line-height: 1.5;
            font: inherit;
        }

        .localized-date-picker-native::-webkit-date-and-time-value {
            min-height: 1.5em;
            text-align: left;
        }

        .localized-date-picker-native::-webkit-calendar-picker-indicator {
            cursor: pointer;
        }
    `],
    template: `
        <ng-container *ngIf="!useNativePicker; else nativePicker">
            <p-calendar
                [ngClass]="resolvedHostClass"
                [inputId]="inputId"
                [formControl]="calendarControl"
                [appendTo]="appendTo"
                [defaultDate]="$any(normalizedDefaultDate)"
                [minDate]="$any(normalizedMinDate)"
                [maxDate]="$any(normalizedMaxDate)"
                (onSelect)="handleSelect($event)"
                (onClearClick)="handleClearClick()"
                (onBlur)="handleBlur()"
                (onShow)="handleCalendarShow()"
                (onClose)="handleCalendarClose()"
                [placeholder]="resolvedPlaceholder"
                [showButtonBar]="showButtonBar"
                [showIcon]="showIcon"
                [showClear]="showClear"
                [monthNavigator]="monthNavigator"
                [yearNavigator]="yearNavigator"
                [yearRange]="resolvedYearRange"
                [inputStyle]="inputStyle"
                [inputStyleClass]="resolvedInputStyleClass"
                [style]="style"
                [styleClass]="styleClass"
                [dateFormat]="resolvedDateFormat"
                dataType="date">
            </p-calendar>
        </ng-container>
        <ng-template #nativePicker>
            <input
                [id]="inputId"
                type="date"
                [attr.lang]="resolvedNativeLang"
                [value]="nativeInputValue"
                [min]="nativeMinDate"
                [max]="nativeMaxDate"
                [disabled]="disabled"
                [placeholder]="resolvedPlaceholder"
                [class]="resolvedNativeInputClass"
                [style]="inputStyle"
                (input)="handleNativeInput($event)"
                (change)="handleNativeChange($event)"
                (blur)="handleBlur()">
        </ng-template>
    `,
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => LocalizedDatePickerComponent),
            multi: true
        }
    ]
})
export class LocalizedDatePickerComponent implements ControlValueAccessor, OnInit, OnDestroy, OnChanges {
    @ViewChild(Calendar) calendar?: Calendar;

    @Input() appendTo: any = 'body';
    @Input() defaultDate: Date | string | null | undefined;
    @Input() minDate: Date | string | null | undefined;
    @Input() maxDate: Date | string | null | undefined;
    @Input() placeholder?: string | null;
    @Input() showButtonBar = false;
    @Input() showIcon = false;
    @Input() showClear = false;
    @Input() monthNavigator = false;
    @Input() yearNavigator = false;
    @Input() yearRange?: string;
    @Input() inputId?: string;
    @Input() inputStyle: any;
    @Input() inputStyleClass?: string;
    @Input() style: any;
    @Input() styleClass?: string;
    @Input() invalid = false;
    @Input() modelType: ModelType = 'string';
    @Input() useNativePicker = false;

    @Output() onSelect = new EventEmitter<Date | null>();
    @Output() onClearClick = new EventEmitter<null>();

    currentLang = 'hu';
    disabled = false;
    internalValue: Date | null = null;
    readonly calendarControl = new FormControl<Date | null>(null);
    private normalizedDefaultDateValue?: Date;
    private normalizedMinDateValue?: Date;
    private normalizedMaxDateValue?: Date;

    private readonly subs = new Subscription();
    private blurCommitTimeoutId: ReturnType<typeof setTimeout> | null = null;
    private duplicateSelectionGuardTimeoutId: ReturnType<typeof setTimeout> | null = null;
    private overlayBindTimeoutId: ReturnType<typeof setTimeout> | null = null;
    private overlayClickSuppressionTimeoutId: ReturnType<typeof setTimeout> | null = null;
    private inputRefreshTimeoutId: ReturnType<typeof setTimeout> | null = null;
    private lastCommittedValue: number | null = null;
    private overlayPointerListeners: Array<() => void> = [];
    private suppressNextDuplicateSelectionValue: number | null = null;
    private suppressNextOverlayClick = false;
    private onChange: (value: string | Date | null) => void = () => {};
    private onTouched: () => void = () => {};

    constructor(
        private translate: TranslateService,
        private renderer: Renderer2
    ) {}

    ngOnInit(): void {
        this.refreshNormalizedDates();
        this.currentLang = this.resolveLang(this.translate.currentLang);
        this.subs.add(
            this.calendarControl.valueChanges.subscribe((value) => {
                this.internalValue = parseDateOnly(value);
            })
        );
        this.subs.add(
            this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
                this.currentLang = this.resolveLang(event.lang);
                this.scheduleInputRefresh();
            })
        );
    }

    ngOnChanges(): void {
        this.refreshNormalizedDates();
    }

    ngOnDestroy(): void {
        if (this.blurCommitTimeoutId !== null) {
            clearTimeout(this.blurCommitTimeoutId);
        }
        if (this.duplicateSelectionGuardTimeoutId !== null) {
            clearTimeout(this.duplicateSelectionGuardTimeoutId);
        }
        if (this.overlayBindTimeoutId !== null) {
            clearTimeout(this.overlayBindTimeoutId);
        }
        if (this.overlayClickSuppressionTimeoutId !== null) {
            clearTimeout(this.overlayClickSuppressionTimeoutId);
        }
        if (this.inputRefreshTimeoutId !== null) {
            clearTimeout(this.inputRefreshTimeoutId);
        }
        this.unbindOverlayPointerListeners();
        this.subs.unsubscribe();
    }

    get normalizedDefaultDate(): Date | undefined {
        return this.normalizedDefaultDateValue;
    }

    get normalizedMinDate(): Date | undefined {
        return this.normalizedMinDateValue;
    }

    get normalizedMaxDate(): Date | undefined {
        return this.normalizedMaxDateValue;
    }

    get resolvedPlaceholder(): string {
        if (this.placeholder != null) {
            return this.placeholder;
        }

        return this.currentLang === 'en' ? 'dd/mm/yyyy' : 'éééé.hh.nn';
    }

    get resolvedDateFormat(): string {
        return this.currentLang === 'en' ? 'dd/mm/yy' : 'yy.mm.dd';
    }

    get resolvedStyleClass(): string | undefined {
        if (!this.invalid) {
            return this.styleClass;
        }

        return this.styleClass ? `${this.styleClass} ng-invalid ng-dirty` : 'ng-invalid ng-dirty';
    }

    get resolvedHostClass(): string | undefined {
        if (!this.invalid) {
            return undefined;
        }

        return 'ng-invalid ng-dirty';
    }

    get resolvedInputStyleClass(): string | undefined {
        if (!this.invalid) {
            return this.inputStyleClass;
        }

        return this.inputStyleClass
            ? `${this.inputStyleClass} ng-invalid ng-dirty`
            : 'ng-invalid ng-dirty';
    }

    get nativeInputValue(): string {
        return this.internalValue ? formatDateYmd(this.internalValue) : '';
    }

    get nativeMinDate(): string | undefined {
        return this.normalizedMinDate ? formatDateYmd(this.normalizedMinDate) : undefined;
    }

    get nativeMaxDate(): string | undefined {
        return this.normalizedMaxDate ? formatDateYmd(this.normalizedMaxDate) : undefined;
    }

    get resolvedNativeInputClass(): string {
        const classes = ['p-inputtext', 'p-component', 'w-full', 'localized-date-picker-native'];

        if (this.inputStyleClass) {
            classes.push(this.inputStyleClass);
        }

        if (this.invalid) {
            classes.push('ng-invalid', 'ng-dirty');
        }

        return classes.join(' ');
    }

    get resolvedNativeLang(): string {
        return this.currentLang === 'en' ? 'en-GB' : 'hu-HU';
    }

    get resolvedYearRange(): string {
        if (!this.yearNavigator) {
            return '';
        }

        if (this.yearRange?.trim()) {
            return this.yearRange.trim();
        }

        const baseYear = this.internalValue?.getFullYear()
            ?? this.normalizedDefaultDate?.getFullYear()
            ?? new Date().getFullYear();
        const minYear = this.normalizedMinDate?.getFullYear() ?? (baseYear - 100);
        const maxYear = this.normalizedMaxDate?.getFullYear() ?? (baseYear + 20);

        return `${Math.min(minYear, maxYear)}:${Math.max(minYear, maxYear)}`;
    }

    writeValue(value: string | Date | null | undefined): void {
        this.internalValue = parseDateOnly(value);
        this.lastCommittedValue = this.toComparableValue(this.internalValue);
        this.calendarControl.setValue(this.internalValue, { emitEvent: false });
    }

    registerOnChange(fn: (value: string | Date | null) => void): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: () => void): void {
        this.onTouched = fn;
    }

    setDisabledState(isDisabled: boolean): void {
        this.disabled = isDisabled;
        if (isDisabled) {
            this.calendarControl.disable({ emitEvent: false });
        } else {
            this.calendarControl.enable({ emitEvent: false });
        }
    }

    handleModelChange(value: Date | null): void {
        this.internalValue = value;
    }

    handleSelect(value: Date | null): void {
        const comparableValue = this.toComparableValue(value ?? null);
        if (
            comparableValue !== null &&
            this.suppressNextDuplicateSelectionValue === comparableValue &&
            this.lastCommittedValue === comparableValue
        ) {
            this.clearDuplicateSelectionGuard();
            return;
        }

        this.internalValue = value ?? null;
        this.commitValue(value ?? null, true);
    }

    handleClearClick(): void {
        this.internalValue = null;
        this.calendarControl.setValue(null, { emitEvent: false });
        this.onChange(this.toModelValue(null));
        this.lastCommittedValue = null;
        this.onClearClick.emit(null);
    }

    handleBlur(): void {
        this.onTouched();

        if (this.blurCommitTimeoutId !== null) {
            clearTimeout(this.blurCommitTimeoutId);
        }

        this.blurCommitTimeoutId = setTimeout(() => {
            this.blurCommitTimeoutId = null;

            const comparableValue = this.toComparableValue(this.internalValue);
            if (comparableValue !== this.lastCommittedValue) {
                this.commitValue(this.internalValue ?? null, true);
            }
        });
    }

    handleNativeInput(event: Event): void {
        const value = (event.target as HTMLInputElement | null)?.value ?? '';
        this.internalValue = parseDateOnly(value);
    }

    handleNativeChange(event: Event): void {
        const value = (event.target as HTMLInputElement | null)?.value ?? '';
        const parsedValue = parseDateOnly(value);

        this.internalValue = parsedValue;
        this.commitValue(parsedValue, true);
    }

    handleCalendarShow(): void {
        if (this.useNativePicker) {
            return;
        }

        if (this.overlayBindTimeoutId !== null) {
            clearTimeout(this.overlayBindTimeoutId);
        }

        this.overlayBindTimeoutId = setTimeout(() => {
            this.overlayBindTimeoutId = null;
            this.bindOverlayPointerListeners();
        });
    }

    handleCalendarClose(): void {
        if (this.overlayBindTimeoutId !== null) {
            clearTimeout(this.overlayBindTimeoutId);
            this.overlayBindTimeoutId = null;
        }

        this.clearDuplicateSelectionGuard();
        this.clearOverlayClickSuppression();
        this.unbindOverlayPointerListeners();
    }

    private resolveLang(lang?: string | null): string {
        return lang === 'gb' ? 'en' : (lang || 'hu');
    }

    private refreshNormalizedDates(): void {
        this.normalizedDefaultDateValue = parseDateOnly(this.defaultDate) ?? undefined;
        this.normalizedMinDateValue = parseDateOnly(this.minDate) ?? undefined;
        this.normalizedMaxDateValue = parseDateOnly(this.maxDate) ?? undefined;
    }

    private toModelValue(value: Date | null): string | Date | null {
        if (!value) {
            return null;
        }

        return this.modelType === 'date' ? value : formatDateYmd(value);
    }

    private toComparableValue(value: Date | null): number | null {
        if (!value) {
            return null;
        }

        return value.getTime();
    }

    private commitValue(value: Date | null, emitSelect: boolean): void {
        this.lastCommittedValue = this.toComparableValue(value);
        this.onChange(this.toModelValue(value));

        if (emitSelect) {
            this.onSelect.emit(value);
        }
    }

    private bindOverlayPointerListeners(): void {
        this.unbindOverlayPointerListeners();

        const overlay = this.calendar?.overlay;
        if (!overlay) {
            return;
        }

        const handleOverlayPointerDown = (event: Event): void => {
            const overlayAction = this.resolveOverlayActionFromEvent(event);
            if (!overlayAction || !this.calendar) {
                return;
            }

            event.stopPropagation();
            event.preventDefault();
            this.markOverlayClickSuppression();
            this.handleOverlayAction(overlayAction);
        };

        const handleOverlayClick = (event: Event): void => {
            if (!this.suppressNextOverlayClick) {
                return;
            }

            event.stopPropagation();
            event.preventDefault();
            this.clearOverlayClickSuppression();
        };

        this.overlayPointerListeners = [
            this.renderer.listen(overlay, 'mousedown', handleOverlayPointerDown),
            this.renderer.listen(overlay, 'touchstart', handleOverlayPointerDown),
            this.renderer.listen(overlay, 'click', handleOverlayClick)
        ];
    }

    private unbindOverlayPointerListeners(): void {
        this.overlayPointerListeners.forEach((unbindListener) => unbindListener());
        this.overlayPointerListeners = [];
    }

    private resolveOverlayActionFromEvent(event: Event): OverlayAction | null {
        const target = event.target;
        if (!(target instanceof HTMLElement)) {
            return null;
        }

        const previousButton = target.closest('button.p-datepicker-prev');
        if (previousButton instanceof HTMLButtonElement && !previousButton.disabled) {
            return { type: 'navigate', direction: 'prev' };
        }

        const nextButton = target.closest('button.p-datepicker-next');
        if (nextButton instanceof HTMLButtonElement && !nextButton.disabled) {
            return { type: 'navigate', direction: 'next' };
        }

        const monthViewButton = target.closest('button.p-datepicker-month');
        if (monthViewButton instanceof HTMLButtonElement && !monthViewButton.disabled) {
            return { type: 'switch-view', view: 'month' };
        }

        const yearViewButton = target.closest('button.p-datepicker-year');
        if (yearViewButton instanceof HTMLButtonElement && !yearViewButton.disabled) {
            return { type: 'switch-view', view: 'year' };
        }

        const monthCell = target.closest('.p-monthpicker-month');
        if (monthCell instanceof HTMLElement) {
            const monthCells = Array.from(monthCell.parentElement?.querySelectorAll('.p-monthpicker-month') ?? []);
            const monthIndex = monthCells.indexOf(monthCell);

            if (monthIndex >= 0 && !monthCell.classList.contains('p-disabled')) {
                return { type: 'select-month', monthIndex };
            }
        }

        const yearCell = target.closest('.p-yearpicker-year');
        if (yearCell instanceof HTMLElement && !yearCell.classList.contains('p-disabled')) {
            const yearValue = Number.parseInt(yearCell.textContent?.trim() ?? '', 10);

            if (Number.isFinite(yearValue)) {
                return { type: 'select-year', year: yearValue };
            }
        }

        const dateMeta = this.resolveDateMetaFromOverlayEvent(event);
        return dateMeta ? { type: 'select-date', dateMeta } : null;
    }

    private handleOverlayAction(action: OverlayAction): void {
        if (!this.calendar) {
            return;
        }

        const syntheticEvent = { preventDefault: () => undefined } as Event;

        switch (action.type) {
            case 'select-date':
                this.markDuplicateSelectionGuard(action.dateMeta);
                this.calendar.onDateSelect(syntheticEvent, action.dateMeta);
                return;
            case 'switch-view':
                if (action.view === 'month') {
                    this.calendar.switchToMonthView(syntheticEvent);
                } else {
                    this.calendar.switchToYearView(syntheticEvent);
                }
                return;
            case 'navigate':
                if (action.direction === 'prev') {
                    this.calendar.onPrevButtonClick(syntheticEvent);
                } else {
                    this.calendar.onNextButtonClick(syntheticEvent);
                }
                return;
            case 'select-month':
                this.calendar.onMonthSelect(syntheticEvent, action.monthIndex);
                return;
            case 'select-year':
                this.calendar.onYearSelect(syntheticEvent, action.year);
                return;
        }
    }

    private resolveDateMetaFromOverlayEvent(event: Event): any | null {
        const target = event.target;
        if (!(target instanceof HTMLElement)) {
            return null;
        }

        const overlay = this.calendar?.overlay;
        const months = this.calendar?.months as Array<{ dates?: Array<Array<any>> }> | undefined;
        if (!overlay || !months?.length) {
            return null;
        }

        const cell = target.closest('td');
        const row = cell?.parentElement;
        const table = cell?.closest('table.p-datepicker-calendar');
        if (!cell || !row || !table) {
            return null;
        }

        const group = cell.closest('.p-datepicker-group');
        const groupElements = Array.from(overlay.querySelectorAll('.p-datepicker-group'));
        const groupIndex = group ? Math.max(groupElements.indexOf(group), 0) : 0;
        const rowIndex = Array.from(row.parentElement?.children ?? []).indexOf(row);
        const dateCells = Array.from(row.children).filter((column) => !column.classList.contains('p-datepicker-weeknumber'));
        const columnIndex = dateCells.indexOf(cell);

        if (rowIndex < 0 || columnIndex < 0) {
            return null;
        }

        return months[groupIndex]?.dates?.[rowIndex]?.[columnIndex] ?? null;
    }

    private markDuplicateSelectionGuard(dateMeta: { year: number; month: number; day: number }): void {
        this.suppressNextDuplicateSelectionValue = new Date(dateMeta.year, dateMeta.month, dateMeta.day).getTime();

        if (this.duplicateSelectionGuardTimeoutId !== null) {
            clearTimeout(this.duplicateSelectionGuardTimeoutId);
        }

        this.duplicateSelectionGuardTimeoutId = setTimeout(() => {
            this.clearDuplicateSelectionGuard();
        }, 300);
    }

    private clearDuplicateSelectionGuard(): void {
        this.suppressNextDuplicateSelectionValue = null;

        if (this.duplicateSelectionGuardTimeoutId !== null) {
            clearTimeout(this.duplicateSelectionGuardTimeoutId);
            this.duplicateSelectionGuardTimeoutId = null;
        }
    }

    private markOverlayClickSuppression(): void {
        this.suppressNextOverlayClick = true;

        if (this.overlayClickSuppressionTimeoutId !== null) {
            clearTimeout(this.overlayClickSuppressionTimeoutId);
        }

        this.overlayClickSuppressionTimeoutId = setTimeout(() => {
            this.clearOverlayClickSuppression();
        }, 300);
    }

    private clearOverlayClickSuppression(): void {
        this.suppressNextOverlayClick = false;

        if (this.overlayClickSuppressionTimeoutId !== null) {
            clearTimeout(this.overlayClickSuppressionTimeoutId);
            this.overlayClickSuppressionTimeoutId = null;
        }
    }

    private scheduleInputRefresh(): void {
        if (this.useNativePicker) {
            return;
        }

        if (this.inputRefreshTimeoutId !== null) {
            clearTimeout(this.inputRefreshTimeoutId);
        }

        this.inputRefreshTimeoutId = setTimeout(() => {
            this.inputRefreshTimeoutId = null;
            this.calendar?.updateInputfield();
        });
    }
}
