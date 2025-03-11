import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { ChipModule } from 'primeng/chip';
import { DropdownModule } from 'primeng/dropdown';
import { MultiSelectModule } from 'primeng/multiselect';
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
import { SparebedSelectorComponent } from './sparebed-selector/sparebed-selector.component';
import { BuildingSelectorComponent } from './building-selector/building-selector.component';
import { BedtypeSelectorComponent } from './bedtype-selector/bedtype-selector.component';
import { BathroomSelectorComponent } from './bathroom-selector/bathroom-selector.component';
import { FloorSelectorComponent } from './floor-selector/floor-selector.component';

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
        SparebedSelectorComponent,
        BuildingSelectorComponent,
        BedtypeSelectorComponent,
        BathroomSelectorComponent,
        FloorSelectorComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        ChipModule,
        DropdownModule,
        MultiSelectModule,
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
        SparebedSelectorComponent,
        BuildingSelectorComponent,
        BedtypeSelectorComponent,
        BathroomSelectorComponent,
        FloorSelectorComponent,
    ],
})
export class SelectorsModule {}
