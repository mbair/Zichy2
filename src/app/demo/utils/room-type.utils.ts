import { TranslateService } from '@ngx-translate/core';

export interface RoomTypeOption {
    id: number;
    label: string;
    value: string;
    color: string;
    description?: string;
}

export interface BackendRoomType {
    id: number;
    code?: string | null;
    name?: string | null;
    withBathroom?: boolean | null;
}

type TranslateInstant = Pick<TranslateService, 'instant'>;
type LegacyRoomTypeVariant =
    | { kind: 'code'; code: string }
    | { kind: 'castle'; beds: number };

function normalizeRoomTypeCode(value: unknown): string {
    return String(value ?? '').trim().toUpperCase();
}

function isCastleRoomTypeCode(value: unknown): boolean {
    return normalizeRoomTypeCode(value).startsWith('KB');
}

function normalizeRoomTypeText(value: unknown): string {
    return String(value ?? '')
        .trim()
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '');
}

function hasStandaloneNumber(text: string, value: number): boolean {
    return new RegExp(`(^|\\D)${value}(\\D|$)`).test(text);
}

function getLegacyRoomTypeVariantById(
    roomTypeId: number,
): LegacyRoomTypeVariant | null {
    switch (roomTypeId) {
        case 1:
            return { kind: 'castle', beds: 4 };
        case 2:
            return { kind: 'castle', beds: 6 };
        case 3:
            return { kind: 'castle', beds: 8 };
        case 4:
            return { kind: 'code', code: 'MD' };
        case 5:
            return { kind: 'code', code: 'MQ' };
        case 6:
            return { kind: 'code', code: 'MB' };
        case 7:
            return { kind: 'code', code: 'A' };
        default:
            return null;
    }
}

function getLegacyRoomTypePresentation(
    code: string,
    name: string,
    translate: TranslateInstant,
): Omit<RoomTypeOption, 'id' | 'value'> {
    const normalizedCode = normalizeRoomTypeCode(code);
    const normalizedName = name.trim().toLowerCase();

    if (normalizedCode === 'A') {
        return {
            label: translate.instant('ROOMTYPES.FAMILY-ROOM'),
            description: translate.instant('ROOMTYPES.WITH-KITCHEN'),
            color: 'orange',
        };
    }

    if (normalizedCode === 'MQ') {
        return {
            label: translate.instant('ROOMTYPES.MARANATHA-PENSION-HOUSE'),
            description: translate.instant('ROOMTYPES.DOUBLE-BED-ROOM'),
            color: 'yellow',
        };
    }

    if (normalizedCode === 'MD') {
        return {
            label: translate.instant('ROOMTYPES.MARANATHA-PENSION-HOUSE'),
            description: translate.instant('ROOMTYPES.2-BED-ROOM'),
            color: 'yellow',
        };
    }

    if (normalizedCode === 'MB') {
        return {
            label: translate.instant('ROOMTYPES.MARANATHA-PENSION-HOUSE'),
            description: translate.instant('ROOMTYPES.M-4-BED-ROOM'),
            color: 'yellow',
        };
    }

    if (isCastleRoomTypeCode(normalizedCode)) {
        let descriptionKey = '';

        if (normalizedName.includes('8')) {
            descriptionKey = 'ROOMTYPES.8-BED-ROOM';
        } else if (normalizedName.includes('6')) {
            descriptionKey = 'ROOMTYPES.6-BED-ROOM';
        } else if (normalizedName.includes('4')) {
            descriptionKey = 'ROOMTYPES.4-BED-ROOM';
        }

        return {
            label: translate.instant('ROOMTYPES.CASTLE'),
            description: descriptionKey
                ? translate.instant(descriptionKey)
                : undefined,
            color: 'teal',
        };
    }

    return {
        label: name || code || translate.instant('ROOMTYPES.NOTHING'),
        color: 'gray',
    };
}

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

export function mapBackendRoomTypeToOption(
    roomType: BackendRoomType,
    translate: TranslateInstant,
): RoomTypeOption | null {
    const id = Number(roomType?.id);

    if (!Number.isFinite(id) || id <= 0) {
        return null;
    }

    const code = String(roomType?.code ?? '').trim();
    const name = String(roomType?.name ?? '').trim();
    const presentation = getLegacyRoomTypePresentation(code, name, translate);

    return {
        id,
        label: presentation.label,
        description: presentation.description,
        color: presentation.color,
        value: name || presentation.label,
    };
}

export function mapLegacyRoomTypeIdToBackendId(
    roomTypeId: unknown,
    roomTypes: BackendRoomType[] | null | undefined,
): number | null {
    const normalizedRoomTypeId = Number(roomTypeId);

    if (!Number.isFinite(normalizedRoomTypeId) || normalizedRoomTypeId <= 0) {
        return null;
    }

    if (!Array.isArray(roomTypes) || roomTypes.length === 0) {
        return null;
    }

    const directMatch = roomTypes.find(
        (roomType) => Number(roomType?.id) === normalizedRoomTypeId,
    );
    if (directMatch) {
        return Number(directMatch.id);
    }

    const variant = getLegacyRoomTypeVariantById(normalizedRoomTypeId);
    if (!variant) {
        return null;
    }

    if (variant.kind === 'code') {
        const match = roomTypes.find(
            (roomType) =>
                normalizeRoomTypeCode(roomType?.code) === variant.code,
        );
        return match ? Number(match.id) : null;
    }

    const castleMatch = roomTypes.find((roomType) => {
        if (!isCastleRoomTypeCode(roomType?.code)) {
            return false;
        }

        return hasStandaloneNumber(
            normalizeRoomTypeText(roomType?.name),
            variant.beds,
        );
    });

    return castleMatch ? Number(castleMatch.id) : null;
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
