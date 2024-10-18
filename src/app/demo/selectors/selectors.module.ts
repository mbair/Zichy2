import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { TranslateModule } from '@ngx-translate/core';
import { NationalitySelectorComponent } from './nationality-selector/nationality-selector.component';
import { DietSelectorComponent } from './diet-selector/diet-selector.component';
import { MealSelectorComponent } from './meal-selector/meal-selector.component';

@NgModule({
  declarations: [
    NationalitySelectorComponent,
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
    NationalitySelectorComponent,
    DietSelectorComponent,
    MealSelectorComponent
  ]
})
export class SelectorsModule { }
