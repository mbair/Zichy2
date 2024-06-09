export interface Conference {
    id?: string;
    code?: string;
    name?: string;
    description?: string;
    image?: string;
    price?: number;
    category?: string;
    quantity?: number;
    inventoryStatus?: string;
    rating?: number,
    beginDate?: string | null;
    endDate?: string | null;
    attendees?: number;
    canBeBooked?: boolean;
    enabled?: boolean;
}
