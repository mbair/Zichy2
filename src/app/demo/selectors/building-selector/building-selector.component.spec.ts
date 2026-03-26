import { ChangeDetectorRef } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { BuildingSelectorComponent } from './building-selector.component';

describe('BuildingSelectorComponent', () => {
    function createComponent(): BuildingSelectorComponent {
        const translate = {
            instant: (key: string) => key,
            onLangChange: new Subject<any>(),
        };
        const cdRef = {
            detectChanges: () => undefined,
        } as ChangeDetectorRef;

        return new BuildingSelectorComponent(translate as any, cdRef);
    }

    it('reconciles the dropdown widget value back into the reactive form control', () => {
        const component = createComponent();
        component.parentForm = new FormGroup({
            building: new FormControl('castle'),
        });
        component.controlName = 'building';

        component.ngOnInit();
        (component as any).dropdown = { value: 'maranatha' };

        component.ngAfterViewChecked();

        expect(component.selectedBuilding).toBe('maranatha');
        expect(component.getFormControl()?.value).toBe('maranatha');
    });
});
