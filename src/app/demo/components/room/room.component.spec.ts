import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';
import { RoomComponent } from './room.component';
import { Room } from '../../api/room';

describe('RoomComponent', () => {
    function createComponent() {
        const roomService = {
            update$: jasmine.createSpy('update$'),
            create: jasmine.createSpy('create'),
        };

        const messageService = {
            add: jasmine.createSpy('add'),
        };

        const component = new RoomComponent(
            roomService as any,
            {
                hasRole: () => of(true),
            } as any,
            {
                messageObs: of(null),
            } as any,
            messageService as any,
            {
                isMobile$: of(false),
            } as any,
            {
                onLangChange: of(null),
            } as any,
            new FormBuilder(),
        );

        return {
            component,
            roomService,
            messageService,
        };
    }

    function buildValidRoom(overrides: Partial<Room> = {}): Room {
        return {
            id: '1',
            roomNum: '101',
            roomCode: 'A101',
            beds: 2,
            room_typeid: 1,
            building: 'Kastely',
            floor: '1',
            bedType: 'egyagyas',
            climate: true,
            familyRoom: false,
            spareBeds: '',
            bathroom: 'sajat',
            comment: '',
            extraBeds: 0,
            ...overrides,
        };
    }

    it('updates the visible room row immediately after a successful save', () => {
        const { component, roomService, messageService } = createComponent();
        const originalRoom = buildValidRoom();
        const updatedRoom = buildValidRoom({
            roomNum: '102',
            roomCode: 'A102',
        });

        component.tableData = [originalRoom];
        component.filterValues = {};
        component.globalFilter = '';
        component.sortField = '';
        component.sidebar = true;

        roomService.update$.and.returnValue(of(updatedRoom));
        spyOn(component, 'doQuery');

        component.roomForm.patchValue(originalRoom);
        component.save();

        expect(roomService.update$).toHaveBeenCalledWith(
            jasmine.objectContaining({ id: '1', roomNum: '101' }),
        );
        expect(component.tableData[0]).toEqual(updatedRoom);
        expect(component.sidebar).toBeFalse();
        expect(component.loading).toBeFalse();
        expect(component.doQuery).not.toHaveBeenCalled();
        expect(messageService.add).toHaveBeenCalledWith(
            jasmine.objectContaining({
                severity: 'success',
                summary: 'Sikeres szoba módosítás',
            }),
        );
    });

    it('falls back to requery when active filters may affect the visible result set', () => {
        const { component, roomService } = createComponent();
        const updatedRoom = buildValidRoom({
            roomNum: '102',
        });

        component.tableData = [buildValidRoom()];
        component.filterValues = { building: 'Kastely' };
        component.globalFilter = '';
        component.sortField = '';

        roomService.update$.and.returnValue(of(updatedRoom));
        spyOn(component, 'doQuery');

        component.roomForm.patchValue(buildValidRoom());
        component.save();

        expect(component.tableData[0]).toEqual(updatedRoom);
        expect(component.doQuery).toHaveBeenCalled();
    });

    it('preserves the default sort when lazy load does not provide a new sort field', () => {
        const { component } = createComponent();

        component.sortField = 'roomNum';
        component.sortOrder = 1;
        spyOn(component, 'doQuery');

        component.onLazyLoad({
            first: 0,
            rows: 20,
            sortField: undefined,
            sortOrder: undefined,
            globalFilter: undefined,
        });

        expect(component.sortField).toBe('roomNum');
        expect(component.sortOrder).toBe(1);
        expect(component.doQuery).toHaveBeenCalled();
    });
});
