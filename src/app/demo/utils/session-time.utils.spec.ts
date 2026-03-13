import { formatRemainingSessionTime, getRemainingSessionMs, parseSessionExpiry } from './session-time.utils';

describe('session-time utils', () => {
    describe('parseSessionExpiry', () => {
        it('returns null for missing or invalid values', () => {
            expect(parseSessionExpiry(null)).toBeNull();
            expect(parseSessionExpiry('')).toBeNull();
            expect(parseSessionExpiry('abc')).toBeNull();
        });

        it('keeps epoch milliseconds unchanged', () => {
            expect(parseSessionExpiry('1760000000000')).toBe(1760000000000);
        });

        it('normalizes epoch seconds to milliseconds', () => {
            expect(parseSessionExpiry('1760000000')).toBe(1760000000000);
        });
    });

    describe('getRemainingSessionMs', () => {
        it('returns the positive difference between expiry and now', () => {
            expect(getRemainingSessionMs(200000, 150000)).toBe(50000);
        });

        it('clamps negative remaining time to zero', () => {
            expect(getRemainingSessionMs(120000, 150000)).toBe(0);
            expect(getRemainingSessionMs(null, 150000)).toBe(0);
        });
    });

    describe('formatRemainingSessionTime', () => {
        it('formats seconds-only values', () => {
            expect(formatRemainingSessionTime(45000)).toBe('45 másodperc');
        });

        it('formats exact minute values', () => {
            expect(formatRemainingSessionTime(120000)).toBe('2 perc');
        });

        it('formats mixed minute and second values', () => {
            expect(formatRemainingSessionTime(125000)).toBe('2 perc 5 másodperc');
        });
    });
});
