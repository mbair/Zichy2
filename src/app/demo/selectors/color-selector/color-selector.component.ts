import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { ColorService } from '../../service/color.service';
import { DropdownChangeEvent } from 'primeng/dropdown';

export interface changeEvent {
    value: string;
    field: string;
}

@Component({
    selector: 'app-color-selector',
    templateUrl: './color-selector.component.html'
})
export class ColorSelectorComponent {
    @Input() parentForm: FormGroup
    @Input() controlName: string
    @Input() showClear: boolean
    @Output() change = new EventEmitter<changeEvent>()

    colors: any[] = []               // PrimeNG colors
    selectedColor: string = ''       // Selected color

    constructor(private translate: TranslateService, 
                private colorService: ColorService) {}

    /**
     * Lifecycle hook: called when the component is initialized.
     * Subscribes to language change events and sets the diets
     * for the selector when the language changes.
     */
    ngOnInit() {
        this.translate.onLangChange.subscribe(() => {
            this.setColors()
        })
    }

    /**
     * Lifecycle hook: called when any data-bound property of a directive changes.
     * Updates the available diet options when input properties change.
     * @param changes An object of key-value pairs for the changed properties.
     */
    ngOnChanges(changes: SimpleChanges) {
        this.setColors()
    }

    /**
     * Returns the FormControl object for the diet selector.
     * @returns {FormControl} the FormControl object
     */
    getFormControl(): FormControl | null {
        if (!this.parentForm || !this.controlName) {
            return null
        }
        return this.parentForm.get(this.controlName) as FormControl
    }

    /**
     * Sets the available colors for the color selector component.
     * The colors are set to the values of the CSS variables for the colors
     * in the theme.
     */
    setColors() {
        this.colorService.getColors().forEach((color) => {
            this.colors.push({
                label: color,
                value: color
            })
        })
    }

    /**
     * Returns the style object for the given color.
     * The style object contains the background-color and color properties.
     * The intensity of the color is determined by the color name.
     * If the color name is 'surface', the background-color will be the 800 intensity
     * and the text color will be the 200 intensity. Otherwise, the background-color
     * will be the 200 intensity and the text color will be the 800 intensity.
     * @param color the color name
     * @returns an object with 'background-color' and 'color' properties
     */
    getStyleByColor(color: string) {
        let rootStyles = getComputedStyle(document.documentElement)
        let backgroundColorIntensity = color === 'surface' ? 800 : 200,
            textColorIntensity = color === 'surface' ? 200 : 800

        return {
            'background-color': rootStyles.getPropertyValue(`--${color}-${backgroundColorIntensity}`).trim(), 
            'color': rootStyles.getPropertyValue(`--${color}-${textColorIntensity}`).trim()
        }
    }

    /**
     * Handles the change event of the diet selector and emits a new value with the
     * changed field name.
     * @param event the change event of the diet selector
     */
    handleOnChange(event: DropdownChangeEvent) {
        this.change.emit({ value: event.value, field: this.controlName })
    }
}