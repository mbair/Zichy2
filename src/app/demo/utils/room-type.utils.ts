import { TranslateService } from '@ngx-translate/core';

export interface RoomTypeOption {
    id: number;
    label: string;
    value: string;
    color: string;
    description?: string;
}

type TranslateInstant = Pick<TranslateService, 'instant'>;

export function getRoomTypeOptions(translate: TranslateInstant): RoomTypeOption[] {
    return [
        {
            id: 0,
            label: translate.instant('ROOMTYPES.NOTHING'),
            value: 'Nem kérek szállást',
            color: 'gray'
        },
        {
            id: 1,
            label: translate.instant('ROOMTYPES.CASTLE'),
            description: translate.instant('ROOMTYPES.4-BED-ROOM'),
            value: 'Kastély szállás 4 ágyas szoba',
            color: 'teal'
        },
        {
            id: 2,
            label: translate.instant('ROOMTYPES.CASTLE'),
            description: translate.instant('ROOMTYPES.6-BED-ROOM'),
            value: 'Kastély szállás 6 ágyas szoba',
            color: 'teal'
        },
        {
            id: 3,
            label: translate.instant('ROOMTYPES.CASTLE'),
            description: translate.instant('ROOMTYPES.8-BED-ROOM'),
            value: 'Kastély szállás 8 ágyas szoba',
            color: 'teal'
        },
        {
            id: 4,
            label: translate.instant('ROOMTYPES.MARANATHA-PENSION-HOUSE'),
            description: translate.instant('ROOMTYPES.2-BED-ROOM'),
            value: 'Maranatha Panzióház 2 ágyas szoba (külön fürdős)',
            color: 'yellow'
        },
        {
            id: 5,
            label: translate.instant('ROOMTYPES.MARANATHA-PENSION-HOUSE'),
            description: translate.instant('ROOMTYPES.DOUBLE-BED-ROOM'),
            value: 'Maranatha Panzióház franciaágyas szoba (külön fürdős)',
            color: 'yellow'
        },
        {
            id: 6,
            label: translate.instant('ROOMTYPES.MARANATHA-PENSION-HOUSE'),
            description: translate.instant('ROOMTYPES.M-4-BED-ROOM'),
            value: 'Maranatha Panzióház 4 ágyas szoba (emeletes ágyas, külön fürdős)',
            color: 'yellow'
        },
        {
            id: 7,
            label: translate.instant('ROOMTYPES.FAMILY-ROOM'),
            description: translate.instant('ROOMTYPES.WITH-KITCHEN'),
            value: 'Családi szoba (közös konyhával, fürdővel és nappalival)',
            color: 'orange'
        }
    ];
}

export function getRoomTypeOptionById(roomTypeId: unknown, translate: TranslateInstant): RoomTypeOption | null {
    if (roomTypeId === null || roomTypeId === undefined || roomTypeId === '') {
        return null;
    }

    const normalizedRoomTypeId = Number(roomTypeId);

    if (!Number.isFinite(normalizedRoomTypeId)) {
        return null;
    }

    return getRoomTypeOptions(translate).find((option) => option.id === normalizedRoomTypeId) ?? null;
}
