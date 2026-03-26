import {
    replaceTableRowById,
    shouldRequeryAfterTableRowUpdate,
} from './table-row-update.utils';

describe('table-row-update utils', () => {
    it('replaces a row by id and returns the previous row snapshot', () => {
        const firstRow = { id: 1, name: 'old' };
        const secondRow = { id: 2, name: 'other' };
        const updatedRow = { id: 1, name: 'new' };

        const result = replaceTableRowById({
            rows: [firstRow, secondRow],
            nextRow: updatedRow,
        });

        expect(result.replaced).toBeTrue();
        expect(result.previousRow).toEqual(firstRow);
        expect(result.rows).toEqual([updatedRow, secondRow]);
    });

    it('reports when a row cannot be replaced locally', () => {
        const result = replaceTableRowById({
            rows: [{ id: 1, name: 'first' }],
            nextRow: { id: 2, name: 'missing' },
        });

        expect(result.replaced).toBeFalse();
        expect(result.previousRow).toBeNull();
        expect(result.rows).toEqual([{ id: 1, name: 'first' }]);
    });

    it('does not request a requery when the list is unfiltered and sorting is unaffected', () => {
        const shouldRequery = shouldRequeryAfterTableRowUpdate({
            globalFilter: '',
            filterValues: {},
            sortField: 'name',
            previousRow: { id: 1, name: 'same' },
            nextRow: { id: 1, name: 'same' },
        });

        expect(shouldRequery).toBeFalse();
    });

    it('requests a requery when a global filter is active', () => {
        const shouldRequery = shouldRequeryAfterTableRowUpdate({
            globalFilter: 'alice',
            filterValues: {},
            sortField: 'name',
            previousRow: { id: 1, name: 'Alice' },
            nextRow: { id: 1, name: 'Alice Updated' },
        });

        expect(shouldRequery).toBeTrue();
    });

    it('requests a requery when column filters are active', () => {
        const shouldRequery = shouldRequeryAfterTableRowUpdate({
            globalFilter: '',
            filterValues: { enabled: '1' },
            sortField: 'name',
            previousRow: { id: 1, name: 'Alice' },
            nextRow: { id: 1, name: 'Alice Updated' },
        });

        expect(shouldRequery).toBeTrue();
    });

    it('requests a requery when the active sort field changes', () => {
        const shouldRequery = shouldRequeryAfterTableRowUpdate({
            globalFilter: '',
            filterValues: {},
            sortField: 'name',
            previousRow: { id: 1, name: 'Alice' },
            nextRow: { id: 1, name: 'Bob' },
        });

        expect(shouldRequery).toBeTrue();
    });
});
