export interface Conference {
    id?: string;
    name?: string;
    beginDate?: string | null;
    endDate?: string | null;
    enabled?: boolean;

    // New fields
    firstMeal?: string;
    lastMeal?: string;
    contractorName?: string;
    contractorAddress?: string;
    contractorTaxNumber?: string;
    contactName?: string;
    contactEmail?: string;
    contactPhone?: string;
    formUrl?: string;
    registrationEndDate?: string | null;

    // Can be deleted
    code?: string;
    description?: string;
    image?: string;
    price?: number;
    category?: string;
    quantity?: number;
    inventoryStatus?: string;
    rating?: number;
    attendees?: number;
    canBeBooked?: boolean;
}
