import {
    AfterViewChecked,
    Component,
    Input,
    ViewChild,
    forwardRef,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { FileUpload } from 'primeng/fileupload';

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
export class ReactiveFileUploadComponent
    implements ControlValueAccessor, AfterViewChecked
{
    @Input() name: string;
    @Input() accept: string;
    @Input() chooseLabel: string;
    @Input() cancelLabel: string;
    @Input() maxFileSize: number | null = null;
    @ViewChild(FileUpload) private fileUpload?: FileUpload;

    value: File | null = null;
    disabled = false;
    onChange: (value: File | null) => void = () => {};
    onTouch: () => void = () => {};
    private lastSyncedSignature = '';

    constructor() {}

    ngAfterViewChecked(): void {
        this.syncValueFromWidget();
    }

    onFileChange(event: any) {
        const nextValue = this.extractFirstFile(
            event?.currentFiles ?? event?.files,
        );
        this.applyValue(nextValue);
    }

    onFileClear() {
        this.applyValue(null, false, false);
    }

    writeValue(value: any) {
        this.value = this.extractFirstFile(value);
        this.lastSyncedSignature = this.getFileSignature(this.value);

        if (!this.value && this.fileUpload?.hasFiles()) {
            this.fileUpload.clear();
        }
    }

    registerOnChange(fn: any) {
        this.onChange = fn;
    }

    registerOnTouched(fn: any) {
        this.onTouch = fn;
    }

    setDisabledState(isDisabled: boolean): void {
        this.disabled = isDisabled;
    }

    private syncValueFromWidget(): void {
        const widgetValue = this.extractFirstFile(this.fileUpload?.files);
        const widgetSignature = this.getFileSignature(widgetValue);

        if (widgetSignature === this.lastSyncedSignature) {
            return;
        }

        this.applyValue(widgetValue, false, false);
    }

    private applyValue(
        value: File | null,
        emitTouch = true,
        syncWidget = true,
    ): void {
        const nextValue = this.extractFirstFile(value);
        const nextSignature = this.getFileSignature(nextValue);

        if (nextSignature === this.lastSyncedSignature) {
            if (emitTouch) {
                this.onTouch();
            }
            return;
        }

        this.value = nextValue;
        this.lastSyncedSignature = nextSignature;
        this.onChange(nextValue);

        if (emitTouch) {
            this.onTouch();
        }

        if (!nextValue && syncWidget && this.fileUpload?.hasFiles()) {
            this.fileUpload.clear();
        }
    }

    private extractFirstFile(value: any): File | null {
        if (value instanceof File) {
            return value;
        }

        if (Array.isArray(value)) {
            for (const item of value) {
                const file = this.extractFirstFile(item);
                if (file) {
                    return file;
                }
            }
        }

        if (value?.file instanceof File) {
            return value.file;
        }

        if (Array.isArray(value?.files)) {
            return this.extractFirstFile(value.files);
        }

        return null;
    }

    private getFileSignature(file: File | null): string {
        if (!file) {
            return '';
        }

        return `${file.name}::${file.size}::${file.type}::${file.lastModified}`;
    }
}
