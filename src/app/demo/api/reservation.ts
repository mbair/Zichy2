import { Room } from "./room";

// Reservation statuses
export type ReservationStatus = 'active' | 'cancelled' | 'completed';

export interface Reservation {
    id?: number;                 
    startDate?: string;          
    endDate?: string;             
    status?: ReservationStatus;   
    notes?: string | null;    
    roomId?: number;          
    createdAt?: string;       
    updatedAt?: string;   
    room?: Room;
}
