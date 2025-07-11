import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
    selector: 'app-yes-no-selector',
    templateUrl: './yes-no-selector.component.html',
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => YesNoSelectorComponent),
        multi: true
    }]
})
export class YesNoSelectorComponent implements ControlValueAccessor {
    @Input() yesText: string = 'Igen'
    @Input() noText: string = 'Nem'
    @Input() minHeight: string = '44px'
    @Input() lineHeight: string = '44px'
    @Input() styleClass: string = 'vertical-align-middle'

    // A belső érték mindig boolean
    value: boolean = false
    disabled = false

    // ControlValueAccessor callback-ek
    onChange = (value: any) => { }
    onTouched = () => { }

    // Ha kívülről (szülőtől) jön érték (pl. '1' vagy '0'),
    // akkor konvertáljuk booleanra és állítsuk be a value-t
    writeValue(obj: any): void {
        if (obj === '1') {
            this.value = true
        } else if (obj === '0') {
            this.value = false
        } else {
            // Ha netán boolean jön, vagy null, vagy bármi más
            this.value = !!obj
        }
    }

    registerOnChange(fn: any): void {
        this.onChange = fn
    }
    registerOnTouched(fn: any): void {
        this.onTouched = fn
    }

    // A p-inputSwitch kétirányú kötésében a (ngModelChange) hívja:
    // Itt konvertáljuk vissza stringgé ('1' vagy '0'), amit a szülő lát
    onValueChange(newValue: boolean) {
        const outValue = newValue ? '1' : '0'
        this.value = newValue
        this.onChange(outValue)
        this.onTouched()
    }

    setDisabledState(isDisabled: boolean): void {
        this.disabled = isDisabled
    }
}
