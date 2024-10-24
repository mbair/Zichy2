import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { TranslateModule } from '@ngx-translate/core';
import { CountrySelectorComponent } from './country-selector/country-selector.component';
import { DietSelectorComponent } from './diet-selector/diet-selector.component';
import { LanguageSelectorComponent } from './language-selector/language.component';
import { MealSelectorComponent } from './meal-selector/meal-selector.component';
import { NationalitySelectorComponent } from './nationality-selector/nationality-selector.component';
import { PaymentSelectorComponent } from './payment-selector/payment-selector.component';
import { RoomTypeSelectorComponent } from './roomtype-selector/roomtype-selector.component';

@NgModule({
    declarations: [
        CountrySelectorComponent,
        DietSelectorComponent,
        LanguageSelectorComponent,
        MealSelectorComponent,
        NationalitySelectorComponent,
        PaymentSelectorComponent,
        RoomTypeSelectorComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        DropdownModule,
        TranslateModule,
    ],
    exports: [
        CountrySelectorComponent,
        DietSelectorComponent,
        LanguageSelectorComponent,
        MealSelectorComponent,
        NationalitySelectorComponent,
        PaymentSelectorComponent,
        RoomTypeSelectorComponent,
    ],
})
export class SelectorsModule {}
