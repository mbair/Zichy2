import { CommonModule } from '@angular/common';
import { Component, EventEmitter, forwardRef, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { DatePickerModule } from 'primeng/datepicker';
import { Subscription } from 'rxjs';
import { formatDateYmd, parseDateOnly } from '../../utils/date.utils';

type ModelType = 'string' | 'date';

@Component({
    selector: 'app-localized-date-picker',
    standalone: true,
    imports: [CommonModule, FormsModule, DatePickerModule],
    template: `
        <ng-container *ngIf="currentLang === 'en'; else localizedDatePickerHu">
            <p-datepicker
                [id]="inputId"
                [inputId]="inputId"
                [(ngModel)]="internalValue"
                [ngModelOptions]="{ standalone: true }"
                (ngModelChange)="handleModelChange($event)"
                (onSelect)="handleSelect($event)"
                (onClearClick)="handleClearClick()"
                (onBlur)="handleBlur()"
                [appendTo]="appendTo"
                [defaultDate]="$any(normalizedDefaultDate)"
                [minDate]="$any(normalizedMinDate)"
                [maxDate]="$any(normalizedMaxDate)"
                [placeholder]="resolvedPlaceholder"
                [showButtonBar]="showButtonBar"
                [showIcon]="showIcon"
                [showClear]="showClear"
                [inputStyle]="inputStyle"
                [inputStyleClass]="inputStyleClass"
                [style]="style"
                [styleClass]="resolvedStyleClass"
                [disabled]="disabled"
                dateFormat="dd/mm/yy"
                dataType="date">
            </p-datepicker>
        </ng-container>
        <ng-template #localizedDatePickerHu>
            <p-datepicker
                [id]="inputId"
                [inputId]="inputId"
                [(ngModel)]="internalValue"
                [ngModelOptions]="{ standalone: true }"
                (ngModelChange)="handleModelChange($event)"
                (onSelect)="handleSelect($event)"
                (onClearClick)="handleClearClick()"
                (onBlur)="handleBlur()"
                [appendTo]="appendTo"
                [defaultDate]="$any(normalizedDefaultDate)"
                [minDate]="$any(normalizedMinDate)"
                [maxDate]="$any(normalizedMaxDate)"
                [placeholder]="resolvedPlaceholder"
                [showButtonBar]="showButtonBar"
                [showIcon]="showIcon"
                [showClear]="showClear"
                [inputStyle]="inputStyle"
                [inputStyleClass]="inputStyleClass"
                [style]="style"
                [styleClass]="resolvedStyleClass"
                [disabled]="disabled"
                dateFormat="yy.mm.dd"
                dataType="date">
            </p-datepicker>
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

    @Output() onSelect = new EventEmitter<Date | null>();
    @Output() onClearClick = new EventEmitter<null>();

    currentLang = 'hu';
    disabled = false;
    internalValue: Date | null = null;

    private readonly subs = new Subscription();
    private lastInteractionValue: number | null = null;
    private onChange: (value: string | Date | null) => void = () => {};
    private onTouched: () => void = () => {};

    constructor(private translate: TranslateService) {}

    ngOnInit(): void {
        this.currentLang = this.resolveLang(this.translate.currentLang);
        this.subs.add(
            this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
                this.currentLang = this.resolveLang(event.lang);
            })
        );
    }

    ngOnDestroy(): void {
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

    get resolvedStyleClass(): string | undefined {
        if (!this.invalid) {
            return this.styleClass;
        }

        return this.styleClass ? `${this.styleClass} ng-invalid ng-dirty` : 'ng-invalid ng-dirty';
    }

    writeValue(value: string | Date | null | undefined): void {
        this.internalValue = parseDateOnly(value);
        this.lastInteractionValue = this.toComparableValue(this.internalValue);
    }

    registerOnChange(fn: (value: string | Date | null) => void): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: () => void): void {
        this.onTouched = fn;
    }

    setDisabledState(isDisabled: boolean): void {
        this.disabled = isDisabled;
    }

    handleModelChange(value: Date | null): void {
        this.internalValue = value;
        this.onChange(this.toModelValue(value));
    }

    handleSelect(value: Date | null): void {
        this.lastInteractionValue = this.toComparableValue(value ?? null);
        this.onSelect.emit(value ?? null);
    }

    handleClearClick(): void {
        this.internalValue = null;
        this.onChange(this.toModelValue(null));
        this.lastInteractionValue = null;
        this.onClearClick.emit(null);
    }

    handleBlur(): void {
        this.onTouched();

        const comparableValue = this.toComparableValue(this.internalValue);
        if (comparableValue !== this.lastInteractionValue) {
            this.lastInteractionValue = comparableValue;
            this.onSelect.emit(this.internalValue ?? null);
        }
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
}
