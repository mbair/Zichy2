import { ChangeDetectorRef } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { BedtypeSelectorComponent } from './bedtype-selector.component';

describe('BedtypeSelectorComponent', () => {
    function createComponent(): BedtypeSelectorComponent {
        const translate = {
            instant: (key: string) => key,
            onLangChange: new Subject<any>(),
        };
        const cdRef = {
            detectChanges: () => undefined,
        } as ChangeDetectorRef;

        return new BedtypeSelectorComponent(translate as any, cdRef);
    }

    it('reconciles the dropdown widget value back into the reactive form control', () => {
        const component = createComponent();
        component.parentForm = new FormGroup({
            bedtype: new FormControl('kétágyas'),
        });
        component.controlName = 'bedtype';

        component.ngOnInit();
        (component as any).dropdown = { value: 'franciaágy' };

        component.ngAfterViewChecked();

        expect(component.selectedBedtype).toBe('franciaágy');
        expect(component.getFormControl()?.value).toBe('franciaágy');
    });
});
