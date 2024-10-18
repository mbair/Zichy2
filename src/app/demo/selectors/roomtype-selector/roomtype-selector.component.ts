import { Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-roomtype-selector',
    templateUrl: './roomtype-selector.component.html'
})
export class RoomTypeSelectorComponent {
    @Input() parentForm: FormGroup
    @Input() controlName: string
    @Input() showClear: boolean
    
    roomTypes: any[] = []

    constructor(private translate: TranslateService) {
        this.setRoomTypes()

        // Set the accommodation options when the language changes
        this.translate.onLangChange.subscribe(() => {
            this.setRoomTypes()
        })
    }

    /**
     * Returns the FormControl object for the accommodation selector.
     * @returns {FormControl} the FormControl object
     */
    getFormControl(): FormControl {
        return this.parentForm.get(this.controlName) as FormControl
    }

    /**
     * Sets the available accommodation options for the accommodation selector component.
     * Translates the accommodation labels to the current language and maps them to their respective values.
     */
    setRoomTypes() {
        this.roomTypes = [
            { label: this.translate.instant('ROOMTYPES.NOTHING'), value: 'Nem kérek szállást', style: 'nothing' },
            { label: this.translate.instant('ROOMTYPES.CASTLE-4-BED-ROOM'), value: 'Kastély szállás 4 ágyas szoba', style: 'castle-4-bed-room' },
            { label: this.translate.instant('ROOMTYPES.CASTLE-6-BED-ROOM'), value: 'Kastély szállás 6 ágyas szoba', style: 'castle-6-bed-room' },
            { label: this.translate.instant('ROOMTYPES.CASTLE-8-BED-ROOM'), value: 'Kastély szállás 8 ágyas szoba', style: 'castle-8-bed-room' },
            { label: this.translate.instant('ROOMTYPES.MARANATHA-PENSION-HOUSE-2-BED-ROOM'), value: 'Maranatha Panzióház 2 ágyas szoba (külön fürdős)', style: 'maranatha-pension-house-2-bed-room' },
            { label: this.translate.instant('ROOMTYPES.MARANATHA-PENSION-HOUSE-DOUBLE-BED-ROOM'), value: 'Maranatha Panzióház franciaágyas szoba (külön fürdős)', style: 'maranatha-pension-house-double-bed-room' },
            { label: this.translate.instant('ROOMTYPES.MARANATHA-PENSION-HOUSE-4-BED-ROOM'), value: 'Maranatha Panzióház 4 ágyas szoba (emeletes ágyas, külön fürdős)', style: 'maranatha-pension-house-4-bed-room' },
            { label: this.translate.instant('ROOMTYPES.APARTMENT'), value: 'Apartman (közös konyhával, fürdővel és nappalival)', style: 'apartment' },
        ]
    }
}