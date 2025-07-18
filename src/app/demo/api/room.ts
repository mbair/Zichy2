export interface Room {
    id?: string;
    roomNum?: string;
    roomCode?: string;
    description?: string;
    beds?: number;
    extraBeds?: number;
    matracee?: string;
    bathroom?: string;
    building?: string;
    color?: string;
    floor?: string;    
    bedtype?: string;
    comment?: string;
    climate?: boolean;
    familyRoom?: boolean;
    enabled?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
    floor_id?: any;
    room_typeid?: any;
    userid?: any;
    guestData?: any;
    Reservations?: any;
    conferences?: any;
}
