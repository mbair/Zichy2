import { ChangeDetectorRef } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { BathroomSelectorComponent } from './bathroom-selector.component';

describe('BathroomSelectorComponent', () => {
    function createComponent(): BathroomSelectorComponent {
        const translate = {
            instant: (key: string) => key,
            onLangChange: new Subject<any>(),
        };
        const cdRef = {
            detectChanges: () => undefined,
        } as ChangeDetectorRef;

        return new BathroomSelectorComponent(translate as any, cdRef);
    }

    it('reconciles the dropdown widget value back into the reactive form control', () => {
        const component = createComponent();
        component.parentForm = new FormGroup({
            bathroom: new FormControl('saját fürdőszoba'),
        });
        component.controlName = 'bathroom';

        component.ngOnInit();
        (component as any).dropdown = { value: 'akadályment. fürdőszoba' };

        component.ngAfterViewChecked();

        expect(component.selectedBathroom).toBe('akadályment. fürdőszoba');
        expect(component.getFormControl()?.value).toBe(
            'akadályment. fürdőszoba',
        );
    });
});
