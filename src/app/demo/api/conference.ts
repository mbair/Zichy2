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

    firstMeal?: string;
    lastMeal?: string;
    contractorName?: string;
    contractorAddress?: string;
    contractorTaxNumber?: string;
    contactName?: string;
    contactEmail?: string;
    contactPhone?: string;
    registrationEndDate?: string | null;
}
