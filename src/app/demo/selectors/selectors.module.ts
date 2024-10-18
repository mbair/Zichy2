import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { TranslateModule } from '@ngx-translate/core';
import { DietSelectorComponent } from './diet-selector/diet-selector.component';
import { MealSelectorComponent } from './meal-selector/meal-selector.component';

@NgModule({
  declarations: [
    DietSelectorComponent,
    MealSelectorComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DropdownModule,
    TranslateModule,
  ],
  exports: [
    DietSelectorComponent,
    MealSelectorComponent
  ]
})
export class SelectorsModule { }
