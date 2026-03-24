import { FormBuilder } from '@angular/forms';
import { BehaviorSubject, of } from 'rxjs';
import { NFCTagComponent } from './nfc-tag.component';
import { Tag } from '../../api/tag';

describe('NFCTagComponent', () => {
    function createComponent() {
        const tagData$ = new BehaviorSubject<any>(null);
        const tagMessages$ = new BehaviorSubject<any>(null);

        const tagService = {
            tagObs: tagData$.asObservable(),
            messageObs: tagMessages$.asObservable(),
            update$: jasmine.createSpy('update$'),
            create: jasmine.createSpy('create'),
            hasRole: () => of(true),
        };

        const messageService = {
            add: jasmine.createSpy('add'),
        };

        const component = new NFCTagComponent(
            tagService as any,
            {
                hasRole: () => of(true),
            } as any,
            messageService as any,
            {
                isMobile$: of(false),
            } as any,
            new FormBuilder(),
        );

        component.ngOnInit();

        return {
            component,
            tagService,
            messageService,
        };
    }

    function buildValidTag(overrides: Partial<Tag> = {}): Tag {
        return {
            id: 1,
            rfid: '123456',
            color: 'green',
            enabled: true,
            ...overrides,
        };
    }

    it('updates the visible tag row immediately after a successful save', () => {
        const { component, tagService, messageService } = createComponent();
        const originalTag = buildValidTag();
        const updatedTag = buildValidTag({
            rfid: '654321',
            color: 'blue',
        });

        component.tableData = [originalTag];
        component.filterValues = {};
        component.globalFilter = '';
        component.sortField = '';
        component.sidebar = true;

        tagService.update$.and.returnValue(of(updatedTag));
        spyOn(component, 'doQuery');

        component.tagForm.patchValue(originalTag);
        component.save();

        expect(tagService.update$).toHaveBeenCalledWith(
            jasmine.objectContaining({ id: 1, rfid: '123456' }),
        );
        expect(component.tableData[0]).toEqual(
            jasmine.objectContaining({
                id: 1,
                rfid: '654321',
                color: 'blue',
                identifier: '654321',
            }),
        );
        expect(component.sidebar).toBeFalse();
        expect(component.loading).toBeFalse();
        expect(component.doQuery).not.toHaveBeenCalled();
        expect(messageService.add).toHaveBeenCalledWith(
            jasmine.objectContaining({
                severity: 'success',
                summary: 'Sikeres címke módosítás',
            }),
        );
    });

    it('falls back to requery when active filters may affect the visible result set', () => {
        const { component, tagService } = createComponent();
        const originalTag = buildValidTag();
        const updatedTag = buildValidTag({
            rfid: '654321',
        });

        component.tableData = [originalTag];
        component.filterValues = { enabled: '1' };
        component.globalFilter = '';
        component.sortField = '';

        tagService.update$.and.returnValue(of(updatedTag));
        spyOn(component, 'doQuery');

        component.tagForm.patchValue(originalTag);
        component.save();

        expect(component.tableData[0]).toEqual(
            jasmine.objectContaining({
                id: 1,
                rfid: '654321',
            }),
        );
        expect(component.doQuery).toHaveBeenCalled();
    });
});
