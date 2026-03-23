import { ChangeDetectorRef } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { RoomTypeSelectorComponent } from './roomtype-selector.component';

describe('RoomTypeSelectorComponent', () => {
    function createComponent(): RoomTypeSelectorComponent {
        const translate = {
            instant: (key: string) => key,
            onLangChange: {
                subscribe: () => ({ unsubscribe: () => undefined }),
            },
        };
        const cdRef = {
            detectChanges: () => undefined,
        } as ChangeDetectorRef;
        const apiService = {
            get: () => ({
                subscribe: () => undefined,
            }),
        };

        return new RoomTypeSelectorComponent(
            translate as any,
            cdRef,
            apiService as any,
        );
    }

    it('keeps preselected backend room type ids before async options are loaded', () => {
        const component = createComponent();
        component.optionValue = 'id';
        component.multiple = true;
        component.allowedRoomTypeIds = [3, 7];
        component.parentForm = new FormGroup({
            roomTypeIds: new FormControl([3, 7]),
        });
        component.controlName = 'roomTypeIds';

        (component as any).syncControlValueWithModeAndAllowed();

        expect(component.getFormControl()?.value).toEqual([3, 7]);
    });

    it('maps legacy allowed ids to backend ids once backend room types are known', () => {
        const component = createComponent();
        component.optionValue = 'id';
        component.multiple = true;
        component.allowedRoomTypeIds = [1, 7];
        (component as any).backendRoomTypes = [
            { id: 12, code: 'KB4', name: 'Kastely 4 agyas' },
            { id: 27, code: 'A', name: 'Apartman' },
        ];

        const normalized = (component as any).normalizeToSelectorValue([1, 7]);

        expect(normalized).toEqual([12, 27]);
    });
});
