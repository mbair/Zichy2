export interface Guest {
    id?: string;
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
    szepCard?: boolean;
    accommodationExtra?: string;
    birthDate?: string;
    rfid?: string | null;
    enabled?: number;
    conferenceName?: string;
    diet?: string;
    advancePaid?: boolean;
    email?: string;
    telephone?: string;
    roomType?: string;
    payment?: string;
    babyBed?: boolean;
    roommate?: string;
    idcard?: string;
    lastRfidUsage?: string | null;
    rfidColor?: string | null;
}
