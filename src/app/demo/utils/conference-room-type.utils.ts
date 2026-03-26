import { Conference } from '../api/conference';

type RoomTypeLike = { id?: unknown } | number | string | null | undefined;
type RoomLike =
    | {
          room_typeid?: unknown;
          roomTypeId?: unknown;
          roomType?: { id?: unknown } | null;
      }
    | null
    | undefined;

function normalizeRoomTypeIds(values: RoomTypeLike[]): number[] {
    return Array.from(
        new Set(
            values
                .map((value) => Number((value as any)?.id ?? value))
                .filter((id) => Number.isFinite(id) && id > 0),
        ),
    );
}

export function extractConfiguredConferenceRoomTypeIds(
    conf: Conference | null | undefined,
): number[] {
    if (!conf) return [];

    return normalizeRoomTypeIds([
        ...(Array.isArray((conf as any).roomTypeIds)
            ? (conf as any).roomTypeIds
            : []),
        ...(Array.isArray((conf as any).conferenceRoomTypeIds)
            ? (conf as any).conferenceRoomTypeIds
            : []),
        ...(Array.isArray((conf as any).roomTypes)
            ? (conf as any).roomTypes
            : []),
    ]);
}

export function extractConferenceRoomTypeIdsFromRooms(
    conf: Conference | null | undefined,
): number[] {
    if (!conf?.rooms || !Array.isArray(conf.rooms)) return [];

    return normalizeRoomTypeIds(
        (conf.rooms as RoomLike[]).map(
            (room) =>
                room?.room_typeid ?? room?.roomTypeId ?? room?.roomType ?? null,
        ),
    );
}

export function resolveConferenceFormAllowedRoomTypeIds(
    conf: Conference | null | undefined,
): number[] | undefined {
    const explicitRoomTypeIds = extractConfiguredConferenceRoomTypeIds(conf);
    if (explicitRoomTypeIds.length > 0) {
        return explicitRoomTypeIds;
    }

    const roomBackedRoomTypeIds = extractConferenceRoomTypeIdsFromRooms(conf);
    return roomBackedRoomTypeIds.length > 0 ? roomBackedRoomTypeIds : undefined;
}

export function resolveConferenceEditorSelectableRoomTypeIds(
    conf: Conference | null | undefined,
): number[] | undefined {
    const ids = normalizeRoomTypeIds([
        ...extractConfiguredConferenceRoomTypeIds(conf),
        ...extractConferenceRoomTypeIdsFromRooms(conf),
    ]);

    return ids.length > 0 ? ids : undefined;
}
