import { Room } from './room';
import { ContractingParty } from './contracting-party';

export interface FormFieldInfo {
    field: string;
    info: { [lang: string]: string };
    position?: 'text' | 'bubble';
}

export interface ConferenceRoomType {
    id?: number;
    code?: string;
    name?: string;
    withBathroom?: boolean;
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
    roomTypes?: ConferenceRoomType[];

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
    contracting_party_id?: number | string | null;
    contractingParty?: ContractingParty | null;
    guestEditEndDate?: string | null;
    guestsNumber?: number;
    acceptanceCriteriaUrl?: string | null;
    formFieldInfos?: FormFieldInfo[];
    paymentMethodIds?: number[];
    roomTypeIds?: number[];
    conferenceRoomTypeIds?: number[];

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
