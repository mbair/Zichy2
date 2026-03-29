const DATE_ONLY_PATTERN = /^(\d{4})[-.](\d{2})[-.](\d{2})$/;
const DATE_TIME_PATTERN = /^(\d{4})[-.](\d{2})[-.](\d{2})[ T](\d{2}):(\d{2})(?::(\d{2}))?$/;
const HAS_TIMEZONE_PATTERN = /(?:Z|[+-]\d{2}:\d{2})$/i;

type DateInput = Date | string | number | null | undefined;

function pad(value: number): string {
    return String(value).padStart(2, '0');
}

function toValidDate(value: DateInput): Date | null {
    if (value instanceof Date) {
        return Number.isNaN(value.getTime()) ? null : value;
    }

    if (typeof value === 'number') {
        const date = new Date(value);
        return Number.isNaN(date.getTime()) ? null : date;
    }

    if (typeof value !== 'string') {
        return null;
    }

    const trimmed = value.trim();
    if (!trimmed) {
        return null;
    }

    const dateOnlyMatch = trimmed.match(DATE_ONLY_PATTERN);
    if (dateOnlyMatch) {
        const [, year, month, day] = dateOnlyMatch;
        return new Date(Number(year), Number(month) - 1, Number(day));
    }

    const dateTimeMatch = trimmed.match(DATE_TIME_PATTERN);
    if (dateTimeMatch) {
        const [, year, month, day, hour, minute, second = '0'] = dateTimeMatch;
        return new Date(
            Number(year),
            Number(month) - 1,
            Number(day),
            Number(hour),
            Number(minute),
            Number(second)
        );
    }

    const normalized = trimmed.includes(' ') && !trimmed.includes('T')
        ? trimmed.replace(' ', 'T')
        : trimmed;
    const parsed = new Date(normalized);
    return Number.isNaN(parsed.getTime()) ? null : parsed;
}

function toUtcDate(value: DateInput): Date | null {
    if (value instanceof Date || typeof value === 'number') {
        return toValidDate(value);
    }

    if (typeof value !== 'string') {
        return null;
    }

    const trimmed = value.trim();
    if (!trimmed) {
        return null;
    }

    const normalized = trimmed
        .replace(/\./g, '-')
        .replace(' ', 'T');

    const dateOnlyMatch = normalized.match(/^(\d{4})-(\d{2})-(\d{2})$/);
    if (dateOnlyMatch) {
        return new Date(`${normalized}T00:00:00Z`);
    }

    const needsTimezone = !HAS_TIMEZONE_PATTERN.test(normalized);
    const utcCandidate = needsTimezone ? `${normalized}Z` : normalized;
    const parsed = new Date(utcCandidate);
    return Number.isNaN(parsed.getTime()) ? null : parsed;
}

export function formatDateDots(value: DateInput): string {
    const date = toValidDate(value);
    if (!date) {
        return '';
    }

    return `${date.getFullYear()}.${pad(date.getMonth() + 1)}.${pad(date.getDate())}`;
}

export function formatDateYmd(value: DateInput): string {
    const date = toValidDate(value);
    if (!date) {
        return '';
    }

    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

export function formatDateCompact(value: DateInput): string {
    const date = toValidDate(value);
    if (!date) {
        return '';
    }

    return `${date.getFullYear()}${pad(date.getMonth() + 1)}${pad(date.getDate())}`;
}

export function parseDate(value: DateInput): Date | null {
    return toValidDate(value);
}

export function parseDateOnly(value: DateInput): Date | null {
    const date = toValidDate(value);
    if (!date) {
        return null;
    }

    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

export function toEpoch(value: DateInput): number | null {
    const date = toValidDate(value);
    return date ? date.getTime() : null;
}

export function calculateAgeYears(value: DateInput, now: Date = new Date()): number {
    const birthDate = toValidDate(value);
    if (!birthDate || Number.isNaN(now.getTime())) {
        return 0;
    }

    let age = now.getFullYear() - birthDate.getFullYear();
    const monthDelta = now.getMonth() - birthDate.getMonth();

    if (monthDelta < 0 || (monthDelta === 0 && now.getDate() < birthDate.getDate())) {
        age -= 1;
    }

    return Math.max(age, 0);
}

export function isSameDay(left: DateInput, right: DateInput): boolean {
    const leftDate = parseDateOnly(left);
    const rightDate = parseDateOnly(right);

    if (!leftDate || !rightDate) {
        return false;
    }

    return leftDate.getTime() === rightDate.getTime();
}

export function isBeforeDay(left: DateInput, right: DateInput): boolean {
    const leftDate = parseDateOnly(left);
    const rightDate = parseDateOnly(right);

    if (!leftDate || !rightDate) {
        return false;
    }

    return leftDate.getTime() < rightDate.getTime();
}

export function isSameOrBeforeDay(left: DateInput, right: DateInput): boolean {
    const leftDate = parseDateOnly(left);
    const rightDate = parseDateOnly(right);

    if (!leftDate || !rightDate) {
        return false;
    }

    return leftDate.getTime() <= rightDate.getTime();
}

export function isDateBetweenDaysInclusive(
    target: DateInput,
    start: DateInput,
    end: DateInput
): boolean {
    const targetDate = parseDateOnly(target);
    const startDate = parseDateOnly(start);
    const endDate = parseDateOnly(end);

    if (!targetDate || !startDate || !endDate) {
        return false;
    }

    const targetTime = targetDate.getTime();
    return targetTime >= startDate.getTime() && targetTime <= endDate.getTime();
}

export function getWeekdayName(value: DateInput, locale: string = 'hu-HU'): string {
    const date = toValidDate(value);
    if (!date) {
        return '';
    }

    return new Intl.DateTimeFormat(locale, { weekday: 'long' }).format(date);
}

export function formatUtcToTimeZone(
    value: DateInput,
    timeZone: string = 'Europe/Budapest'
): string {
    const date = toUtcDate(value);
    if (!date) {
        return '';
    }

    const formatter = new Intl.DateTimeFormat('hu-HU', {
        timeZone,
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hourCycle: 'h23',
    });

    const parts = formatter.formatToParts(date).reduce<Record<string, string>>((acc, part) => {
        if (part.type !== 'literal') {
            acc[part.type] = part.value;
        }
        return acc;
    }, {});

    if (parts['year'] && parts['month'] && parts['day'] && parts['hour'] && parts['minute'] && parts['second']) {
        return `${parts['year']}. ${parts['month']}. ${parts['day']}. ${parts['hour']}:${parts['minute']}:${parts['second']}`;
    }

    return formatter.format(date).replace(',', '').trim();
}
