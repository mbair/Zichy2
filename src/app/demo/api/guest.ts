import { Conference } from "./conference";
import { Reservation } from "./reservation";
import { ConferenceRoomType } from "./conference";

export interface EmailStatusSummary {
    id?: number;
    type?: string;
    status: 'queued' | 'processing' | 'sent' | 'failed' | 'skipped' | 'unknown';
    attemptCount?: number;
    maxAttempts?: number;
    toEmail?: string | null;
    subject?: string | null;
    lastAttemptAt?: string | null;
    nextAttemptAt?: string | null;
    sentAt?: string | null;
    providerMessageId?: string | null;
    lastError?: string | null;
}

export interface Guest {
    id: number;
    firstName?: string;
    lastName?: string;
    gender?: number;
    nationality?: string;
    country?: string;
    zipCode?: string;
    roomNum?: string;
    dateOfArrival?: string;
    firstMeal?: string;
    dateOfDeparture?: string;
    lastMeal?: string;
    accommodationExtra?: string;
    birthDate?: string;
    rfid?: string | null;
    enabled?: number;
    conferenceName?: string;
    conferenceid?: number;
    diet?: string;
    dietColor?: string;
    displayRoomNum?: string;
    advancePaid?: boolean;
    email?: string;
    telephone?: string;
    roomType?: string;
    requested_room_type_id?: number | null;
    requestedRoomTypeId?: number | null;
    requestedRoomType?: ConferenceRoomType | null;
    payment?: string | number | null;
    paymentName?: string;
    paymentMethodName?: string;
    babyBed?: boolean;
    roomMate?: string;
    is_visitor?: boolean;
    visitor_meals_per_day?: number | null;
    idcard?: string;
    idcardtype?: string;
    lastRfidUsage?: string | null;
    rfidColor?: string | null;
    prepaid?: boolean;
    is_test?: boolean;
    createdAt?: string;
    updatedAt?: string;
    userid?: string;
    rfid_id?: string;
    diet_id?: string;
    room_id?: string;
    answers?: string;
    dietDetails?: string;
    idCardUploaded?: any;
    conference?: Conference[]
    reservations?: Reservation[]
    actualReservation?: Reservation | null;
    roomKeyIssued?: boolean;
    roomKeyIssuedAt?: string | null;
    roomKeyReturnedAt?: string | null;
    roomKeyIssuedByUserId?: number | null;
    roomKeyReturnedByUserId?: number | null;
    roomKeyIssuedByUserName?: string | null;
    roomKeyReturnedByUserName?: string | null;
    emailStatus?: EmailStatusSummary | null;
}

export type GuestFilter = {
  conferenceId?: number | null;
  enabled?: boolean;
  onlyNotReserved?: boolean;
  includeGuestIds?: number[];
}
