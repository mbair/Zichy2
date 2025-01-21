import { Component, OnInit } from '@angular/core';
import { Konferencia } from 'src/app/demo/api/konferencia';

@Component({
    templateUrl: './conferencecreate.component.html'
})
export class ConferenceCreateComponent implements OnInit {

    konferenciak: Konferencia[] = [];

    konferencia: Konferencia = {};

    countries: any[] = [];

    value2: any;


    ngOnInit() {
        this.countries = [
            {name: 'Australia', code: 'AU'},
            {name: 'Brazil', code: 'BR'},
            {name: 'China', code: 'CN'},
            {name: 'Egypt', code: 'EG'},
            {name: 'France', code: 'FR'},
            {name: 'Germany', code: 'DE'},
            {name: 'India', code: 'IN'},
            {name: 'Japan', code: 'JP'},
            {name: 'Spain', code: 'ES'},
            {name: 'United States', code: 'US'}
        ];

        this.value2 = new Date();
    }

}
