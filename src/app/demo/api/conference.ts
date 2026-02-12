import { Room } from "./room";

export interface FormFieldInfo {
    field: string;
    info: { [lang: string]: string };
    position?: 'text' | 'bubble';
}

export interface Conference {
    id?: number;
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
    guestsNumber?: number;
    acceptanceCriteriaUrl?: string | null;
    formFieldInfos?: FormFieldInfo[];
    paymentMethodIds?: number[];

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
