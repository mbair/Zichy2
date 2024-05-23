import { Vendeg } from "./vendeg"
export interface Response {
    currentPage?: number,
    rows?: Vendeg[],
    totalItems?: number,
    totalPages?: number
}
