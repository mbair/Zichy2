import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { TranslateModule } from '@ngx-translate/core';
import { MealSelectorComponent } from './MealSelector/meal-selector.component';

@NgModule({
  declarations: [
    MealSelectorComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DropdownModule,
    TranslateModule,
  ],
  exports: [
    MealSelectorComponent
  ]
})
export class SelectorsModule { }
