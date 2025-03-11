import { Room } from "./room";

export interface Conference {
    id?: string;
    name?: string;
    beginDate?: string | null;
    endDate?: string | null;
    enabled?: boolean;
    createdAt?: string;
    updatedAt?: string;
    userid?: string | null;
    rooms?: Room[];

    // New fields
    firstMeal?: string;
    lastMeal?: string;
    contractorName?: string;
    contractorAddress?: string;
    contractorAdress?: string;
    contractorTaxNumber?: string;
    contactName?: string;
    contactEmail?: string;
    contactPhone?: string;
    formUrl?: string;
    registrationEndDate?: string | null;
    questions?: any;
    organizer_user_id?: any;
    guestEditEndDate?: string | null;

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
