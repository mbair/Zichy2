import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { TranslateModule } from '@ngx-translate/core';
import { RoomTypeSelectorComponent } from './roomtype-selector/roomtype-selector.component';
import { CountrySelectorComponent } from './country-selector/country-selector.component';
import { DietSelectorComponent } from './diet-selector/diet-selector.component';
import { MealSelectorComponent } from './meal-selector/meal-selector.component';
import { NationalitySelectorComponent } from './nationality-selector/nationality-selector.component';

@NgModule({
    declarations: [
        CountrySelectorComponent,
        DietSelectorComponent,
        MealSelectorComponent,
        NationalitySelectorComponent,
        RoomTypeSelectorComponent,
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        DropdownModule,
        TranslateModule,
    ],
    exports: [
        CountrySelectorComponent,
        DietSelectorComponent,
        MealSelectorComponent,
        NationalitySelectorComponent,
        RoomTypeSelectorComponent,
    ],
})
export class SelectorsModule {}
