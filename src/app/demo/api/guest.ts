import { Conference } from "./conference";
import { Reservation } from "./reservation";

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
    payment?: string;
    babyBed?: boolean;
    roomMate?: string;
    idcard?: string;
    idcardtype?: string;
    lastRfidUsage?: string | null;
    rfidColor?: string | null;
    prepaid?: boolean;
    climate?: boolean;
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
}

export type GuestFilter = {
  conferenceId?: number | null;
  enabled?: boolean;
  onlyNotReserved?: boolean;
  includeGuestIds?: number[];
}