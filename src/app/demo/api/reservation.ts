import { Guest } from "./guest";
import { Room } from "./room";

// Reservation statuses
export type ReservationStatus = 'active' | 'cancelled' | 'completed';
// tentative, confirmed, in_house, checked_out, cancelled, no_show

export interface Reservation {
    id?: number;
    room?: Room;
    room_id?: number;
    conference_id?: number;
    startDate?: string;
    endDate?: string;
    status?: ReservationStatus;
    notes?: string | null;
    guestIds?: number[];
    guests?: Guest[];
    createdAt?: string;
    updatedAt?: string;
}
