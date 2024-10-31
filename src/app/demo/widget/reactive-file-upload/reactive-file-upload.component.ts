import { Component, forwardRef, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

@Component({
    selector: 'app-reactive-file-upload',
    templateUrl: './reactive-file-upload.component.html',
    styleUrls: ['./reactive-file-upload.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => ReactiveFileUploadComponent),
            multi: true
        }
    ]
})
export class ReactiveFileUploadComponent implements ControlValueAccessor {
    @Input() name: string
    @Input() accept: string
    @Input() chooseLabel: string
    @Input() cancelLabel: string

    value: any
    onChange: (value: any) => void = () => {}
    onTouch: () => void = () => {}

    constructor() {}

    onFileChange(event: any) {
        if (event.files && event.files.length > 0) {
            this.value = event.files[0]
            this.onChange(this.value) // Forwards the selected file to the form control
            this.onTouch()
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
