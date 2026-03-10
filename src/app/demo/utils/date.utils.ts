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

export function formatDateCompact(value: DateInput): string {
    const date = toValidDate(value);
    if (!date) {
        return '';
    }

    return `${date.getFullYear()}${pad(date.getMonth() + 1)}${pad(date.getDate())}`;
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

export function formatUtcToTimeZone(
    value: DateInput,
    timeZone: string = 'Europe/Budapest'
): string {
    const date = toUtcDate(value);
    if (!date) {
        return '';
    }

    const formatter = new Intl.DateTimeFormat('en-GB', {
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

    return `${parts['year']}.${parts['month']}.${parts['day']} ${parts['hour']}:${parts['minute']}:${parts['second']}`;
}
