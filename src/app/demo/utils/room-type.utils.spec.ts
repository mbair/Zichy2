import {
    getRoomTypeOptionById,
    getRoomTypeOptions,
    mapLegacyRoomTypeIdToBackendId,
    mapBackendRoomTypeToOption,
} from './room-type.utils';

describe('room-type utils', () => {
    const translate = {
        instant: (key: string) => `translated:${key}`
    };

    it('builds the translated room type list', () => {
        const options = getRoomTypeOptions(translate);

        expect(options.length).toBe(8);
        expect(options[0]).toEqual(jasmine.objectContaining({
            id: 0,
            label: 'translated:ROOMTYPES.NOTHING',
            color: 'gray'
        }));
        expect(options[7]).toEqual(jasmine.objectContaining({
            id: 7,
            label: 'translated:ROOMTYPES.FAMILY-ROOM',
            description: 'translated:ROOMTYPES.WITH-KITCHEN',
            color: 'orange'
        }));
    });

    it('returns the matching room type by id', () => {
        const roomType = getRoomTypeOptionById('4', translate);

        expect(roomType).toEqual(jasmine.objectContaining({
            id: 4,
            label: 'translated:ROOMTYPES.MARANATHA-PENSION-HOUSE',
            description: 'translated:ROOMTYPES.2-BED-ROOM',
            color: 'yellow'
        }));
    });

    it('returns null for unknown room type ids', () => {
        expect(getRoomTypeOptionById(null, translate)).toBeNull();
        expect(getRoomTypeOptionById(undefined, translate)).toBeNull();
        expect(getRoomTypeOptionById('', translate)).toBeNull();
        expect(getRoomTypeOptionById('abc', translate)).toBeNull();
        expect(getRoomTypeOptionById(99, translate)).toBeNull();
    });

    it('maps backend room types to real-id selector options', () => {
        const castle = mapBackendRoomTypeToOption(
            { id: 44, code: 'KB8', name: 'Kastely 8 agyas' },
            translate,
        );
        const family = mapBackendRoomTypeToOption(
            { id: 99, code: 'A', name: 'Apartman' },
            translate,
        );

        expect(castle).toEqual(
            jasmine.objectContaining({
                id: 44,
                label: 'translated:ROOMTYPES.CASTLE',
                description: 'translated:ROOMTYPES.8-BED-ROOM',
                color: 'teal',
                value: 'Kastely 8 agyas',
            }),
        );
        expect(family).toEqual(
            jasmine.objectContaining({
                id: 99,
                label: 'translated:ROOMTYPES.FAMILY-ROOM',
                description: 'translated:ROOMTYPES.WITH-KITCHEN',
                color: 'orange',
                value: 'Apartman',
            }),
        );
    });

    it('maps legacy room type ids to backend room type ids', () => {
        const roomTypes = [
            { id: 12, code: 'KB4', name: 'Kastely 4 agyas' },
            { id: 15, code: 'KB8', name: 'Kastely 8 agyas' },
            { id: 27, code: 'A', name: 'Apartman' },
            { id: 31, code: 'MQ', name: 'Franciaagyas' },
        ];

        expect(mapLegacyRoomTypeIdToBackendId(1, roomTypes)).toBe(12);
        expect(mapLegacyRoomTypeIdToBackendId('3', roomTypes)).toBe(15);
        expect(mapLegacyRoomTypeIdToBackendId(7, roomTypes)).toBe(27);
        expect(mapLegacyRoomTypeIdToBackendId(5, roomTypes)).toBe(31);
    });

    it('keeps real backend ids and rejects unknown legacy room type ids', () => {
        const roomTypes = [{ id: 44, code: 'KB6', name: 'Kastely 6 agyas' }];

        expect(mapLegacyRoomTypeIdToBackendId(44, roomTypes)).toBe(44);
        expect(mapLegacyRoomTypeIdToBackendId(6, roomTypes)).toBeNull();
        expect(mapLegacyRoomTypeIdToBackendId(99, roomTypes)).toBeNull();
    });
});
