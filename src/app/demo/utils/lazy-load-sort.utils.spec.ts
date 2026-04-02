import { resolveLazyLoadSort } from './lazy-load-sort.utils';

describe('lazy-load-sort utils', () => {
    it('keeps the current sort when lazy load event does not provide new values', () => {
        const result = resolveLazyLoadSort(
            { sortField: 'roomNum', sortOrder: 1 },
            { sortField: undefined, sortOrder: undefined },
        );

        expect(result).toEqual({
            sortField: 'roomNum',
            sortOrder: 1,
        });
    });

    it('uses the incoming lazy load sort when provided', () => {
        const result = resolveLazyLoadSort(
            { sortField: 'roomNum', sortOrder: 1 },
            { sortField: 'beginDate', sortOrder: -1 },
        );

        expect(result).toEqual({
            sortField: 'beginDate',
            sortOrder: -1,
        });
    });
});
