import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { DropdownChangeEvent } from 'primeng/dropdown';

export interface changeEvent {
    value: string;
    field: string;
}

@Component({
    selector: 'app-roomtype-selector',
    templateUrl: './roomtype-selector.component.html'
})
export class RoomTypeSelectorComponent {
    @Input() parentForm: FormGroup
    @Input() controlName: string
    @Input() showClear: boolean
    @Output() change = new EventEmitter<changeEvent>()
    
    roomTypes: any[] = []           // Available room types
    selectedRoomType: string = ''   // Selected room type

    constructor(private translate: TranslateService) {}

    /**
     * Lifecycle hook: called when the component is initialized.
     * Subscribes to language change events and sets the meals
     * for the selector when the language changes.
     */
    ngOnInit() {
        this.translate.onLangChange.subscribe(() => {
            this.setRoomTypes()
        })
    }

    /**
     * Lifecycle hook: called when any data-bound property of a directive changes.
     * Updates the available meal options when input properties change.
     * @param changes An object of key-value pairs for the changed properties.
     */
    ngOnChanges(changes: SimpleChanges) {
        this.setRoomTypes()
    }

    /**
     * Returns the FormControl object for the accommodation selector.
     * @returns {FormControl} the FormControl object
     */
    getFormControl(): FormControl | null {
        if (!this.parentForm || !this.controlName) {
            return null
        }
        return this.parentForm.get(this.controlName) as FormControl
    }

    /**
     * Sets the available accommodation options for the accommodation selector component.
     * Translates the accommodation labels to the current language and maps them to their respective values.
     */
    setRoomTypes() {
        this.roomTypes = [
            { 
                label: this.translate.instant('ROOMTYPES.NOTHING'), 
                value: 'Nem kérek szállást', 
                style: 'nothing' 
            },
            { 
                label: this.translate.instant('ROOMTYPES.CASTLE'), 
                description: this.translate.instant('ROOMTYPES.4-BED-ROOM'), 
                value: 'Kastély szállás 4 ágyas szoba', 
                style: 'castle' 
            },
            { 
                label: this.translate.instant('ROOMTYPES.CASTLE'), 
                description: this.translate.instant('ROOMTYPES.6-BED-ROOM'), 
                value: 'Kastély szállás 6 ágyas szoba', 
                style: 'castle' 
            },
            { 
                label: this.translate.instant('ROOMTYPES.CASTLE'), 
                description: this.translate.instant('ROOMTYPES.8-BED-ROOM'), 
                value: 'Kastély szállás 8 ágyas szoba', 
                style: 'castle' 
            },
            { 
                label: this.translate.instant('ROOMTYPES.MARANATHA-PENSION-HOUSE'), 
                description: this.translate.instant('ROOMTYPES.2-BED-ROOM'), 
                value: 'Maranatha Panzióház 2 ágyas szoba (külön fürdős)', 
                style: 'maranatha' 
            },
            { 
                label: this.translate.instant('ROOMTYPES.MARANATHA-PENSION-HOUSE'), 
                description: this.translate.instant('ROOMTYPES.DOUBLE-BED-ROOM'), 
                value: 'Maranatha Panzióház franciaágyas szoba (külön fürdős)', 
                style: 'maranatha' 
            },
            { 
                label: this.translate.instant('ROOMTYPES.MARANATHA-PENSION-HOUSE'), 
                description: this.translate.instant('ROOMTYPES.M-4-BED-ROOM'), 
                value: 'Maranatha Panzióház 4 ágyas szoba (emeletes ágyas, külön fürdős)', 
                style: 'maranatha' 
            },
            { 
                label: this.translate.instant('ROOMTYPES.FAMILY-ROOM'), 
                description: this.translate.instant('ROOMTYPES.WITH-KITCHEN'), 
                value: 'Családi szoba (közös konyhával, fürdővel és nappalival)', 
                style: 'family-room' 
            },
        ]
    }

    /**
     * Handles the change event of the roomtype selector and emits a new value with the
     * changed field name.
     * @param event the change event of the roomtype selector
     */
    handleOnChange(event: DropdownChangeEvent) {
        this.change.emit({ value: event.value, field: this.controlName })
    }
}