import { getRoomTypeOptionById, getRoomTypeOptions } from './room-type.utils';

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
});
