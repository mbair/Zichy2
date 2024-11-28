import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { ChipModule } from 'primeng/chip';
import { DropdownModule } from 'primeng/dropdown';
import { TranslateModule } from '@ngx-translate/core';
import { ConferenceSelectorComponent } from './conference-selector/conference-selector.component';
import { CountrySelectorComponent } from './country-selector/country-selector.component';
import { DietSelectorComponent } from './diet-selector/diet-selector.component';
import { LanguageSelectorComponent } from './language-selector/language.component';
import { MealSelectorComponent } from './meal-selector/meal-selector.component';
import { NationalitySelectorComponent } from './nationality-selector/nationality-selector.component';
import { PaymentSelectorComponent } from './payment-selector/payment-selector.component';
import { RoomTypeSelectorComponent } from './roomtype-selector/roomtype-selector.component';
import { UserSelectorComponent } from './user-selector/user-selector.component';
import { RoleSelectorComponent } from './role-selector/role-selector.component';
import { ColorSelectorComponent } from './color-selector/color-selector.component';
import { EnabledSelectorComponent } from './enabled-selector/enabled-selector.component';
import { ExtrabedSelectorComponent } from './extrabed-selector/extrabed-selector.component';
import { BuildingSelectorComponent } from './building-selector/building-selector.component';

@NgModule({
    declarations: [
        CountrySelectorComponent,
        DietSelectorComponent,
        LanguageSelectorComponent,
        MealSelectorComponent,
        NationalitySelectorComponent,
        PaymentSelectorComponent,
        RoomTypeSelectorComponent,
        UserSelectorComponent,
        RoleSelectorComponent,
        ColorSelectorComponent,
        EnabledSelectorComponent,
        ConferenceSelectorComponent,
        ExtrabedSelectorComponent,
        BuildingSelectorComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        ChipModule,
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
        UserSelectorComponent,
        RoleSelectorComponent,
        ColorSelectorComponent,
        EnabledSelectorComponent,
        ConferenceSelectorComponent,
        ExtrabedSelectorComponent,
        BuildingSelectorComponent,
    ],
})
export class SelectorsModule {}
