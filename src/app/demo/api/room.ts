export interface Room {
    id?: string;
    roomNum?: string;
    roomCode?: string;
    description?: string;
    beds?: number;
    extraBeds?: number;
    spareBeds?: string;
    matracee?: string;
    bathroom?: string;
    building?: string;
    color?: string;
    floor?: string;
    bedtype?: string;
    bedType?: string;
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
    conferenceCount?: number;
}

export interface RoomFilter {
    conferenceId?: number | null;
    building?: string | string[];
    minBeds?: number;
    climate?: boolean;
    enabled?: boolean;
    onlyNotReserved?: boolean;
    includeRoomIds?: number[];
}
