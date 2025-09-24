// Reservation statuses
export type ReservationStatus = 'active' | 'cancelled' | 'completed';
// tentative, confirmed, in_house, checked_out, cancelled, no_show

export interface Reservation {
    id?: number;
    room_id?: number;
    conference_id?: number;
    startDate?: string;
    endDate?: string;
    status?: ReservationStatus;
    notes?: string | null;
    guestIds?: number[];
    createdAt?: string;
    updatedAt?: string;
}
