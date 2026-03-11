import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { CalendarModule } from 'primeng/calendar';
import { formatDateYmd } from '../demo/utils/date.utils';
import { LocalizedDatePickerComponent } from '../demo/widget/localized-date-picker/localized-date-picker.component';

@Component({
    selector: 'app-localized-date-picker-debug',
    standalone: true,
    imports: [CalendarModule, CommonModule, FormsModule, LocalizedDatePickerComponent],
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <section class="debug-page">
            <header class="debug-header">
                <div>
                    <p class="eyebrow">Localized date picker debug</p>
                    <h1>Valodi kattintos tesztoldal</h1>
                    <p class="subtitle">
                        Fix 2026.03 honap, lathato modellallapot es nyelvvaltas a gyors reprodukciohoz.
                    </p>
                </div>
                <div class="lang-switch">
                    <button type="button" data-testid="lang-hu" (click)="setLanguage('hu')">Magyar</button>
                    <button type="button" data-testid="lang-en" (click)="setLanguage('gb')">English</button>
                </div>
            </header>

            <div class="picker-card">
                <label for="debug-localized-date-picker">Teszt datum</label>
                <app-localized-date-picker
                    #picker
                    inputId="debug-localized-date-picker"
                    [(ngModel)]="selectedValue"
                    [defaultDate]="defaultDate"
                    [minDate]="minDate"
                    [maxDate]="maxDate"
                    [showButtonBar]="true"
                    [showClear]="true"
                    [showIcon]="true"
                    (onSelect)="handleSelect($event)"
                    (onClearClick)="handleClear()">
                </app-localized-date-picker>
            </div>

            <div class="picker-card raw-card">
                <label for="debug-raw-date-picker">Raw PrimeNG datum</label>
                <p-calendar
                    inputId="debug-raw-date-picker"
                    [(ngModel)]="rawValue"
                    [ngModelOptions]="{ standalone: true }"
                    [appendTo]="'body'"
                    [defaultDate]="defaultDate"
                    [minDate]="minDate"
                    [maxDate]="maxDate"
                    [showButtonBar]="true"
                    [showClear]="true"
                    [showIcon]="true"
                    dateFormat="yy.mm.dd"
                    dataType="date"
                    (onSelect)="handleRawSelect($event)">
                </p-calendar>
            </div>

            <dl class="debug-state">
                <div>
                    <dt>Aktiv nyelv</dt>
                    <dd data-testid="current-lang">{{ currentLang }}</dd>
                </div>
                <div>
                    <dt>NgModel ertek</dt>
                    <dd data-testid="model-value">{{ renderValue(selectedValue) }}</dd>
                </div>
                <div>
                    <dt>Wrapper internalValue</dt>
                    <dd data-testid="internal-value">{{ renderDate(picker.internalValue) }}</dd>
                </div>
                <div>
                    <dt>Utolso onSelect</dt>
                    <dd data-testid="select-value">{{ lastSelectedValue }}</dd>
                </div>
                <div>
                    <dt>onSelect darab</dt>
                    <dd data-testid="select-count">{{ selectCount }}</dd>
                </div>
                <div>
                    <dt>Raw ertek</dt>
                    <dd data-testid="raw-value">{{ renderDate(rawValue) }}</dd>
                </div>
                <div>
                    <dt>Raw onSelect</dt>
                    <dd data-testid="raw-select-value">{{ renderDate(rawSelectedValue) }}</dd>
                </div>
            </dl>
        </section>
    `,
    styles: [`
        :host {
            display: block;
            min-height: 100vh;
            padding: 2rem;
            background:
                radial-gradient(circle at top left, rgba(250, 204, 21, 0.22), transparent 28rem),
                linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
        }

        .debug-page {
            max-width: 64rem;
            margin: 0 auto;
            padding: 2rem;
            border-radius: 1.5rem;
            background: rgba(255, 255, 255, 0.9);
            box-shadow: 0 1.5rem 4rem rgba(15, 23, 42, 0.12);
        }

        .debug-header {
            display: flex;
            justify-content: space-between;
            gap: 1rem;
            align-items: flex-start;
            margin-bottom: 2rem;
        }

        .eyebrow {
            margin: 0 0 0.5rem;
            text-transform: uppercase;
            letter-spacing: 0.12em;
            font-size: 0.75rem;
            color: #92400e;
        }

        h1 {
            margin: 0;
            font-size: clamp(2rem, 4vw, 3rem);
            line-height: 1.05;
            color: #0f172a;
        }

        .subtitle {
            margin: 0.75rem 0 0;
            max-width: 34rem;
            color: #475569;
        }

        .lang-switch {
            display: flex;
            gap: 0.75rem;
            flex-wrap: wrap;
        }

        .lang-switch button {
            border: 0;
            border-radius: 999px;
            padding: 0.75rem 1rem;
            font: inherit;
            font-weight: 600;
            color: #0f172a;
            background: #fde68a;
            cursor: pointer;
        }

        .picker-card {
            padding: 1.5rem;
            border-radius: 1rem;
            background: #fff;
            border: 1px solid #e2e8f0;
        }

        .picker-card label {
            display: block;
            margin-bottom: 0.75rem;
            font-weight: 600;
            color: #1e293b;
        }

        .debug-state {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(12rem, 1fr));
            gap: 1rem;
            margin: 1.5rem 0 0;
        }

        .debug-state div {
            padding: 1rem;
            border-radius: 1rem;
            background: #f8fafc;
            border: 1px solid #e2e8f0;
        }

        .debug-state dt {
            margin: 0 0 0.5rem;
            font-size: 0.875rem;
            color: #64748b;
        }

        .debug-state dd {
            margin: 0;
            font-weight: 700;
            color: #0f172a;
        }

        @media (max-width: 640px) {
            :host {
                padding: 1rem;
            }

            .debug-page {
                padding: 1.25rem;
            }

            .debug-header {
                flex-direction: column;
            }
        }
    `]
})
export class LocalizedDatePickerDebugComponent {
    private readonly translate = inject(TranslateService);

    readonly defaultDate = new Date(2026, 2, 1);
    readonly minDate = new Date(2026, 2, 1);
    readonly maxDate = new Date(2026, 2, 31);

    selectedValue: string | null = null;
    rawValue: Date | null = null;
    rawSelectedValue: Date | null = null;
    lastSelectedValue = 'null';
    selectCount = 0;

    constructor() {
        this.translate.setDefaultLang('hu');
        this.translate.use('hu');
    }

    get currentLang(): string {
        return this.translate.currentLang === 'gb' ? 'en' : (this.translate.currentLang || 'hu');
    }

    setLanguage(lang: 'hu' | 'gb'): void {
        this.translate.use(lang);
    }

    handleSelect(value: Date | null): void {
        this.lastSelectedValue = this.renderDate(value);
        this.selectCount += 1;
    }

    handleClear(): void {
        this.lastSelectedValue = 'null';
    }

    handleRawSelect(value: Date | null): void {
        this.rawSelectedValue = value;
    }

    renderValue(value: string | null): string {
        return value ?? 'null';
    }

    renderDate(value: Date | null): string {
        return value ? formatDateYmd(value) : 'null';
    }
}
