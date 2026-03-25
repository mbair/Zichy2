import { ChangeDetectorRef } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { SparebedSelectorComponent } from './sparebed-selector.component';

describe('SparebedSelectorComponent', () => {
    function createComponent(): SparebedSelectorComponent {
        const translate = {
            instant: (key: string) => key,
            onLangChange: new Subject<any>(),
        };
        const cdRef = {
            detectChanges: () => undefined,
        } as ChangeDetectorRef;

        return new SparebedSelectorComponent(translate as any, cdRef);
    }

    it('reconciles the dropdown widget value back into the reactive form control', () => {
        const component = createComponent();
        component.parentForm = new FormGroup({
            sparebed: new FormControl('M'),
        });
        component.controlName = 'sparebed';

        component.ngOnInit();
        (component as any).dropdown = { value: 'MGY' };

        component.ngAfterViewChecked();

        expect(component.selectedSparebed).toBe('MGY');
        expect(component.getFormControl()?.value).toBe('MGY');
    });
});
