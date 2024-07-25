import { Component, OnDestroy, OnInit } from '@angular/core';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { PrimeNGConfig } from 'primeng/api';
import { TranslateService } from '@ngx-translate/core';

declare const require: (path: string) => any;

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})

// Makes unsubscribe automatically, don't need to do manually in ngOnDestroy
// BUT!!! Don't delete ngOnDestroy, it has to stay here!
@AutoUnsubscribe()

export class AppComponent implements OnInit, OnDestroy {

    constructor(private primengConfig: PrimeNGConfig,
        private translateService: TranslateService) {

        // this language will be used as a fallback when a translation isn't found in the current language
        translateService.setDefaultLang('hu');

        // the lang to use, if the lang isn't available, it will use the current loader to get them
        translateService.use('hu');
    }

    ngOnInit(): void {

        // Store App version globally
        const APP_VERSION = require('../../package.json').version;
        if (APP_VERSION) {
            localStorage.setItem("APP_VERSION", APP_VERSION)
        }

        this.primengConfig.ripple = true;

        this.translateService.setDefaultLang('hu');

        this.primengConfig.setTranslation({
            "startsWith": "Kezdődik",
            "contains": "Tartalmazza",
            "notContains": "Nem tartalmazza",
            "endsWith": "Végződik",
            "equals": "Egyenlő",
            "notEquals": "Nem egyenlő",
            "noFilter": "Nincs szűrő",
            "lt": "Kevesebb, mint",
            "lte": "Kevesebb vagy egyenlő",
            "gt": "Nagyobb, mint",
            "gte": "Nagyobb vagy egyenlő",
            "is": "Az",
            "isNot": "Nem az",
            "before": "Előtt",
            "after": "Után",
            "dateIs": "A dátum",
            "dateIsNot": "A dátum nem",
            "dateBefore": "A dátum előtti",
            "dateAfter": "A dátum utáni",
            "clear": "Törlés",
            "apply": "Alkalmaz",
            "matchAll": "Mindet illeszt",
            "matchAny": "Bármelyiket illeszt",
            "addRule": "Szabály hozzáadása",
            "removeRule": "Szabály eltávolítása",
            "accept": "Igen",
            "reject": "Nem",
            "choose": "Választ",
            "upload": "Feltölt",
            "cancel": "Mégse",
            "dayNames": ["Vasárnap", "Hétfő", "Kedd", "Szerda", "Csütörtök", "Péntek", "Szombat"],
            "dayNamesShort": ["Vas", "Hét", "Ked", "Sze", "Csü", "Pén", "Szo"],
            "dayNamesMin": ["Va", "Hé", "Ke", "Sz", "Cs", "Pé", "Sz"],
            "monthNames": ["Január", "Február", "Március", "Április", "Május", "Június", "Július", "Augusztus", "Szeptember", "Október", "November", "December"],
            "monthNamesShort": ["Jan", "Feb", "Már", "Ápr", "Máj", "Jún", "Júl", "Aug", "Sze", "Okt", "Nov", "Dec"],
            "dateFormat": "yy.mm.dd",
            "firstDayOfWeek": 1,
            "today": "Ma",
            "weekHeader": "Wk",
            "weak": "Gyenge",
            "medium": "Közepes",
            "strong": "Erős",
            "passwordPrompt": "Adja meg a jelszót",
            "emptyMessage": "Nincs találat",
            "emptyFilterMessage": "Nincs találat"
        })
    }


    translate(lang: string) {
        this.translateService.use(lang);
        this.translateService.get('primeng').subscribe((res: any) => this.primengConfig.setTranslation(res));
    }


    // Don't delete this, its needed from a performance point of view,
    ngOnDestroy(): void {
    }
}
