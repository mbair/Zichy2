import { buildRoomPageHint } from './room-page-hint.utils';

describe('room page hint utils', () => {
    it('describes the default all-rooms state', () => {
        expect(buildRoomPageHint({
            selectedConferences: [],
            globalFilter: '',
            filterValues: {},
            totalRecords: 10,
            loading: false,
        })).toBe('Jelenleg az összes szoba látható. Konferencia választásával szűkítheti a listát a konferenciához rendelt szobákra.');
    });

    it('describes conference scoped results', () => {
        expect(buildRoomPageHint({
            selectedConferences: [{ id: 7, name: 'Golgota Női hétvége' }],
            globalFilter: '',
            filterValues: { conferences: '7' },
            totalRecords: 12,
            loading: false,
        })).toBe('A(z) Golgota Női hétvége rendelt szobák láthatók.');
    });

    it('describes filtered conference scoped results', () => {
        expect(buildRoomPageHint({
            selectedConferences: [{ id: 7, name: 'Golgota Női hétvége' }],
            globalFilter: '',
            filterValues: { conferences: '7', building: 'MARANATHA' },
            totalRecords: 4,
            loading: false,
        })).toBe('A(z) Golgota Női hétvége rendelt szobák közül a jelenlegi keresésnek vagy szűrésnek megfelelő találatok láthatók.');
    });

    it('describes empty filtered results', () => {
        expect(buildRoomPageHint({
            selectedConferences: [],
            globalFilter: '103',
            filterValues: {},
            totalRecords: 0,
            loading: false,
        })).toBe('Nincs a jelenlegi keresésnek vagy szűrésnek megfelelő szoba.');
    });
});
