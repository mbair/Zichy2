import { FormBuilder } from '@angular/forms';
import { BehaviorSubject, of } from 'rxjs';
import { DietComponent } from './diet.component';
import { Diet } from '../../api/diet';

describe('DietComponent', () => {
    function createComponent() {
        const dietData$ = new BehaviorSubject<any>(null);
        const dietMessages$ = new BehaviorSubject<any>(null);

        const dietService = {
            dietObs: dietData$.asObservable(),
            messageObs: dietMessages$.asObservable(),
            update$: jasmine.createSpy('update$'),
            create: jasmine.createSpy('create'),
            get: jasmine.createSpy('get'),
            getBySearch: jasmine.createSpy('getBySearch'),
            delete: jasmine.createSpy('delete'),
            bulkdelete: jasmine.createSpy('bulkdelete'),
        };

        const messageService = {
            add: jasmine.createSpy('add'),
        };

        const component = new DietComponent(
            dietService as any,
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
            dietService,
            messageService,
        };
    }

    it('updates the visible row immediately after a successful save without requerying an unfiltered list', () => {
        const { component, dietService, messageService } = createComponent();
        const updatedDiet: Diet = {
            id: '1',
            name: 'vegán',
            color: '#22aa22',
            enabled: true,
        };

        component.tableData = [
            { id: '1', name: 'vegetarian', color: '#00aa00', enabled: true },
            { id: '2', name: 'gluténmentes', color: '#ffaa00', enabled: true },
        ];
        component.filterValues = {};
        component.globalFilter = '';
        component.sortField = '';
        component.sidebar = true;

        dietService.update$.and.returnValue(of(updatedDiet));
        spyOn(component, 'doQuery');

        component.dietForm.patchValue(updatedDiet);
        component.save();

        expect(dietService.update$).toHaveBeenCalledWith(
            jasmine.objectContaining(updatedDiet),
        );
        expect(component.tableData[0]).toEqual(updatedDiet);
        expect(component.sidebar).toBeFalse();
        expect(component.loading).toBeFalse();
        expect(component.doQuery).not.toHaveBeenCalled();
        expect(messageService.add).toHaveBeenCalledWith(
            jasmine.objectContaining({
                severity: 'success',
                summary: 'Sikeres étrend módosítás',
            }),
        );
    });

    it('falls back to requery when active filters may affect the visible result set', () => {
        const { component, dietService } = createComponent();
        const updatedDiet: Diet = {
            id: '1',
            name: 'vegán',
            color: '#22aa22',
            enabled: true,
        };

        component.tableData = [
            { id: '1', name: 'vegetarian', color: '#00aa00', enabled: true },
        ];
        component.filterValues = { enabled: '1' };
        component.globalFilter = '';
        component.sortField = '';

        dietService.update$.and.returnValue(of(updatedDiet));
        spyOn(component, 'doQuery');

        component.dietForm.patchValue(updatedDiet);
        component.save();

        expect(component.tableData[0]).toEqual(updatedDiet);
        expect(component.doQuery).toHaveBeenCalled();
    });
});
