import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { FileUploadModule } from 'primeng/fileupload';
import { ReactiveFileUploadComponent } from './reactive-file-upload/reactive-file-upload.component';

@NgModule({
    declarations: [
        ReactiveFileUploadComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        TranslateModule,
        FileUploadModule,
    ],
    exports: [
        ReactiveFileUploadComponent,
    ],
})
export class WidgetModule {}
