type TableRowWithId = {
    id?: string | number | null | undefined
}

type TableRowUpdateOptions<T> = {
    rows: T[]
    nextRow: T
}

type TableRowUpdateResult<T> = {
    rows: T[]
    previousRow: T | null
    replaced: boolean
}

type TableRequeryOptions<T> = {
    globalFilter?: string
    filterValues?: Record<string, string | number | boolean | null | undefined>
    sortField?: string
    previousRow?: T | null
    nextRow: T
}

function normalizeRowId(value: unknown): string {
    if (value === null || value === undefined) return ''
    return String(value)
}

function normalizeComparableValue(value: unknown): string {
    if (value === null || value === undefined) return ''
    if (Array.isArray(value)) {
        return JSON.stringify(value.map((item) => normalizeComparableValue(item)))
    }
    if (value instanceof Date) {
        return value.toISOString()
    }
    if (typeof value === 'object') {
        return JSON.stringify(value)
    }
    return String(value)
}

export function replaceTableRowById<T extends TableRowWithId>({
    rows,
    nextRow,
}: TableRowUpdateOptions<T>): TableRowUpdateResult<T> {
    const nextRowId = normalizeRowId(nextRow?.id)
    const rowIndex = rows.findIndex((row) => normalizeRowId(row?.id) === nextRowId)

    if (rowIndex === -1) {
        return {
            rows,
            previousRow: null,
            replaced: false,
        }
    }

    return {
        rows: rows.map((row, index) => index === rowIndex ? nextRow : row),
        previousRow: rows[rowIndex] ?? null,
        replaced: true,
    }
}

export function shouldRequeryAfterTableRowUpdate<T extends Record<string, any>>({
    globalFilter = '',
    filterValues = {},
    sortField = '',
    previousRow = null,
    nextRow,
}: TableRequeryOptions<T>): boolean {
    if (String(globalFilter).trim().length > 0) {
        return true
    }

    const hasActiveColumnFilters = Object.values(filterValues)
        .some((value) => normalizeComparableValue(value).trim().length > 0)

    if (hasActiveColumnFilters) {
        return true
    }

    if (!sortField || !previousRow) {
        return false
    }

    return normalizeComparableValue(previousRow?.[sortField]) !== normalizeComparableValue(nextRow?.[sortField])
}
