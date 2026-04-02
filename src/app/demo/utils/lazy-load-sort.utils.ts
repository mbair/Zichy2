type LazyLoadSortState<TSortOrder extends number = number> = {
    sortField: string
    sortOrder: TSortOrder
}

type LazyLoadSortEvent<TSortOrder extends number = number> = {
    sortField?: string | null | undefined
    sortOrder?: TSortOrder | null | undefined
}

export function resolveLazyLoadSort<TSortOrder extends number>(
    currentState: LazyLoadSortState<TSortOrder>,
    event: LazyLoadSortEvent<TSortOrder>,
): LazyLoadSortState<TSortOrder> {
    return {
        sortField: event.sortField ?? currentState.sortField,
        sortOrder: event.sortOrder ?? currentState.sortOrder,
    }
}
