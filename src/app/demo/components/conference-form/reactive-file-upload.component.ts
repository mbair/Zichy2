import { Component, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

@Component({
    selector: 'app-reactive-file-upload',
    template: `
        <!-- <input type="file" (change)="onFileChange($event)"> -->
        <p-fileUpload mode="basic" 
                    chooseLabel="Tallózás" 
                    name="idCard[]" 
                    (onSelect)="onFileChange($event)" 
                    accept="image/*">
        </p-fileUpload>
    `,
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => ReactiveFileUploadComponent),
            multi: true
        }
    ]
})
export class ReactiveFileUploadComponent implements ControlValueAccessor {
    value: any;
    onChange: (value: any) => void = () => {}
    onTouch: () => void = () => {}

    constructor() {}

    onFileChange(event: any) {
        if (event.files && event.files.length > 0) {
            this.value = event.files[0];
            this.onChange(this.value); // Továbbítja a kiválasztott fájlt a form vezérlőnek
            this.onTouch();
        }
    }

    writeValue(value: any) {
        this.value = value
    }

    registerOnChange(fn: any) {
        this.onChange = fn
    }

    registerOnTouched(fn: any) {
        this.onTouch = fn
    }
}
