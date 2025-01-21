import { Component, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

@Component({
    selector: 'app-reactive-file-upload',
    template: `
    <!-- <input type="file" (change)="onFileChange($event)"> -->
    <p-fileUpload mode="basic" chooseLabel="Tallózás" name="idCard[]" url="./upload.php" (onUpload)="onFileChange($event)" accept="image/*"></p-fileUpload>
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
    onChange: any = () => { };
    onTouch: any = () => { };

    constructor() { }

    onFileChange(event: any) {
        this.value = event.target.files[0];
        this.onChange(this.value);
        this.onTouch(this.value);
    }

    writeValue(value: any) {
        this.value = value;
    }

    registerOnChange(fn: any) {
        this.onChange = fn;
    }

    registerOnTouched(fn: any) {
        this.onTouch = fn;
    }
}
