import { CommonModule } from '@angular/common';
import { Component, EventEmitter, forwardRef, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { DatePickerModule } from 'primeng/datepicker';
import { Subscription } from 'rxjs';
import { formatDateYmd, parseDateOnly } from '../../utils/date.utils';

type ModelType = 'string' | 'date';

@Component({
    selector: 'app-localized-date-picker',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, DatePickerModule],
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
            <p-datepicker
                [id]="inputId"
                [inputId]="inputId"
                [formControl]="calendarControl"
                [appendTo]="appendTo"
                [defaultDate]="$any(normalizedDefaultDate)"
                [minDate]="$any(normalizedMinDate)"
                [maxDate]="$any(normalizedMaxDate)"
                (onSelect)="handleSelect($event)"
                (onClearClick)="handleClearClick()"
                (onBlur)="handleBlur()"
                [placeholder]="resolvedPlaceholder"
                [showButtonBar]="showButtonBar"
                [showIcon]="showIcon"
                [showClear]="showClear"
                [inputStyle]="inputStyle"
                [inputStyleClass]="inputStyleClass"
                [style]="style"
                [styleClass]="resolvedStyleClass"
                [disabled]="disabled"
                [dateFormat]="resolvedDateFormat"
                dataType="date">
            </p-datepicker>
        </ng-container>
        <ng-template #nativePicker>
            <input
                [id]="inputId"
                type="date"
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
export class LocalizedDatePickerComponent implements ControlValueAccessor, OnInit, OnDestroy {
    @Input() appendTo: any = 'body';
    @Input() defaultDate: Date | string | null | undefined;
    @Input() minDate: Date | string | null | undefined;
    @Input() maxDate: Date | string | null | undefined;
    @Input() placeholder?: string | null;
    @Input() showButtonBar = false;
    @Input() showIcon = false;
    @Input() showClear = false;
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

    private readonly subs = new Subscription();
    private blurCommitTimeoutId: ReturnType<typeof setTimeout> | null = null;
    private lastCommittedValue: number | null = null;
    private onChange: (value: string | Date | null) => void = () => {};
    private onTouched: () => void = () => {};

    constructor(private translate: TranslateService) {}

    ngOnInit(): void {
        this.currentLang = this.resolveLang(this.translate.currentLang);
        this.subs.add(
            this.calendarControl.valueChanges.subscribe((value) => {
                this.internalValue = parseDateOnly(value);
            })
        );
        this.subs.add(
            this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
                this.currentLang = this.resolveLang(event.lang);
            })
        );
    }

    ngOnDestroy(): void {
        if (this.blurCommitTimeoutId !== null) {
            clearTimeout(this.blurCommitTimeoutId);
        }
        this.subs.unsubscribe();
    }

    get normalizedDefaultDate(): Date | undefined {
        return parseDateOnly(this.defaultDate) ?? undefined;
    }

    get normalizedMinDate(): Date | undefined {
        return parseDateOnly(this.minDate) ?? undefined;
    }

    get normalizedMaxDate(): Date | undefined {
        return parseDateOnly(this.maxDate) ?? undefined;
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

    private resolveLang(lang?: string | null): string {
        return lang === 'gb' ? 'en' : (lang || 'hu');
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
}
