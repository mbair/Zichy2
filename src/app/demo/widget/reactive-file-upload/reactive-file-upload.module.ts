import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileUploadModule } from 'primeng/fileupload';
import { ReactiveFileUploadComponent } from './reactive-file-upload.component';

@NgModule({
    declarations: [ReactiveFileUploadComponent],
    imports: [
        CommonModule,
        FileUploadModule,
    ],
    exports: [ReactiveFileUploadComponent]
})
export class ReactiveFileUploadModule {}
