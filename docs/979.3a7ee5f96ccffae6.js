"use strict";(self.webpackChunknfc_reserve=self.webpackChunknfc_reserve||[]).push([[979],{2991:(O,m,s)=>{s.d(m,{p:()=>_});var e=s(2029),d=s(9515),g=s(6814),c=s(6223),E=s(5219),u=s(2352);function C(n,l){if(1&n&&(e.TgZ(0,"span",5),e._uU(1),e.qZA()),2&n){const t=l.$implicit;e.Q6J("ngClass","color-badge "+(null==t?null:t.color)),e.xp6(1),e.hij(" ",t.label," ")}}function b(n,l){if(1&n&&(e.TgZ(0,"span",5),e._uU(1),e.qZA()),2&n){const t=l.$implicit;e.Q6J("ngClass","color-badge "+(null==t?null:t.color)),e.xp6(1),e.hij(" ",null==t?null:t.label," ")}}function h(n,l){if(1&n){const t=e.EpF();e.TgZ(0,"p-dropdown",2),e.NdJ("onChange",function(o){e.CHM(t);const p=e.oxw();return e.KtG(p.handleOnChange(o))}),e.ALo(1,"translate"),e.ALo(2,"translate"),e.YNc(3,C,2,2,"ng-template",3),e.YNc(4,b,2,2,"ng-template",4),e.qZA()}if(2&n){const t=l.ngIf,r=e.oxw();e.s9C("placeholder",e.lcZ(1,5,r.placeholder)),e.s9C("emptyMessage",e.lcZ(2,7,"Nincs tal\xe1lat...")),e.Q6J("formControl",t)("options",r.bedtypes)("showClear",r.showClear)}}function M(n,l){if(1&n&&(e.TgZ(0,"span",5),e._uU(1),e.qZA()),2&n){const t=l.$implicit;e.Q6J("ngClass","color-badge "+(null==t?null:t.color)),e.xp6(1),e.hij(" ",t.label," ")}}function a(n,l){if(1&n&&(e.TgZ(0,"span",5),e._uU(1),e.qZA()),2&n){const t=l.$implicit;e.Q6J("ngClass","color-badge "+(null==t?null:t.color)),e.xp6(1),e.hij(" ",null==t?null:t.label," ")}}function i(n,l){if(1&n){const t=e.EpF();e.TgZ(0,"p-dropdown",6),e.NdJ("ngModelChange",function(o){e.CHM(t);const p=e.oxw();return e.KtG(p.selectedBedtype=o)})("onChange",function(o){e.CHM(t);const p=e.oxw();return e.KtG(p.handleOnChange(o))}),e.ALo(1,"translate"),e.ALo(2,"translate"),e.YNc(3,M,2,2,"ng-template",3),e.YNc(4,a,2,2,"ng-template",4),e.qZA()}if(2&n){const t=e.oxw();e.s9C("placeholder",e.lcZ(1,5,t.placeholder)),e.s9C("emptyMessage",e.lcZ(2,7,"Nincs tal\xe1lat...")),e.Q6J("ngModel",t.selectedBedtype)("options",t.bedtypes)("showClear",t.showClear)}}let _=(()=>{class n{constructor(t){this.translate=t,this.change=new e.vpe,this.bedtypes=[],this.selectedBedtype="",this.placeholder||(this.placeholder="V\xe1lasszon...")}ngOnInit(){this.translate.onLangChange.subscribe(()=>{this.setBedtypes()})}ngOnChanges(t){this.setBedtypes()}getFormControl(){return this.parentForm&&this.controlName?this.parentForm.get(this.controlName):null}setBedtypes(){this.bedtypes=[{label:this.translate.instant("BEDTYPES.DOUBLE"),value:"k\xe9t\xe1gyas",color:"yellow"},{label:this.translate.instant("BEDTYPES.KINGBED"),value:"francia\xe1gy",color:"teal"},{label:this.translate.instant("BEDTYPES.BUNKBED"),value:"emeletes \xe1gy",color:"orange"}]}handleOnChange(t){this.change.emit({value:t.value,field:this.controlName})}static#e=this.\u0275fac=function(r){return new(r||n)(e.Y36(d.sK))};static#t=this.\u0275cmp=e.Xpm({type:n,selectors:[["app-bedtype-selector"]],inputs:{parentForm:"parentForm",controlName:"controlName",placeholder:"placeholder",showClear:"showClear"},outputs:{change:"change"},features:[e.TTD],decls:3,vars:2,consts:[["optionLabel","label","optionValue","value","appendTo","body",3,"formControl","options","placeholder","emptyMessage","showClear","onChange",4,"ngIf","ngIfElse"],["useNgModel",""],["optionLabel","label","optionValue","value","appendTo","body",3,"formControl","options","placeholder","emptyMessage","showClear","onChange"],["pTemplate","item"],["pTemplate","selectedItem"],[3,"ngClass"],["optionLabel","label","optionValue","value","appendTo","body",3,"ngModel","options","placeholder","emptyMessage","showClear","ngModelChange","onChange"]],template:function(r,o){if(1&r&&(e.YNc(0,h,5,9,"p-dropdown",0),e.YNc(1,i,5,9,"ng-template",null,1,e.W1O)),2&r){const p=e.MAs(2);e.Q6J("ngIf",o.getFormControl())("ngIfElse",p)}},dependencies:[g.mk,g.O5,c.JJ,c.On,c.oH,E.jx,u.Lt,d.X$],encapsulation:2})}return n})()},3069:(O,m,s)=>{s.d(m,{n:()=>_});var e=s(2029),d=s(9515),g=s(6814),c=s(6223),E=s(5219),u=s(2352);function C(n,l){if(1&n&&(e.TgZ(0,"span",5),e._uU(1),e.qZA()),2&n){const t=l.$implicit;e.Q6J("ngClass","building-badge "+(null==t?null:t.value)),e.xp6(1),e.hij(" ",t.label," ")}}function b(n,l){if(1&n&&(e.TgZ(0,"span",5),e._uU(1),e.qZA()),2&n){const t=l.$implicit;e.Q6J("ngClass","building-badge "+(null==t?null:t.value)),e.xp6(1),e.hij(" ",null==t?null:t.label," ")}}function h(n,l){if(1&n){const t=e.EpF();e.TgZ(0,"p-dropdown",2),e.NdJ("onChange",function(o){e.CHM(t);const p=e.oxw();return e.KtG(p.handleOnChange(o))}),e.ALo(1,"translate"),e.ALo(2,"translate"),e.YNc(3,C,2,2,"ng-template",3),e.YNc(4,b,2,2,"ng-template",4),e.qZA()}if(2&n){const t=l.ngIf,r=e.oxw();e.s9C("placeholder",e.lcZ(1,5,r.placeholder)),e.s9C("emptyMessage",e.lcZ(2,7,"Nincs tal\xe1lat...")),e.Q6J("formControl",t)("options",r.buildings)("showClear",r.showClear)}}function M(n,l){if(1&n&&(e.TgZ(0,"span",5),e._uU(1),e.qZA()),2&n){const t=l.$implicit;e.Q6J("ngClass","building-badge "+(null==t?null:t.value)),e.xp6(1),e.hij(" ",t.label," ")}}function a(n,l){if(1&n&&(e.TgZ(0,"span",5),e._uU(1),e.qZA()),2&n){const t=l.$implicit;e.Q6J("ngClass","building-badge "+(null==t?null:t.value)),e.xp6(1),e.hij(" ",null==t?null:t.label," ")}}function i(n,l){if(1&n){const t=e.EpF();e.TgZ(0,"p-dropdown",6),e.NdJ("ngModelChange",function(o){e.CHM(t);const p=e.oxw();return e.KtG(p.selectedBuilding=o)})("onChange",function(o){e.CHM(t);const p=e.oxw();return e.KtG(p.handleOnChange(o))}),e.ALo(1,"translate"),e.ALo(2,"translate"),e.YNc(3,M,2,2,"ng-template",3),e.YNc(4,a,2,2,"ng-template",4),e.qZA()}if(2&n){const t=e.oxw();e.s9C("placeholder",e.lcZ(1,5,t.placeholder)),e.s9C("emptyMessage",e.lcZ(2,7,"Nincs tal\xe1lat...")),e.Q6J("ngModel",t.selectedBuilding)("options",t.buildings)("showClear",t.showClear)}}let _=(()=>{class n{constructor(t){this.translate=t,this.change=new e.vpe,this.buildings=[],this.selectedBuilding="",this.placeholder||(this.placeholder="V\xe1lasszon...")}ngOnInit(){this.translate.onLangChange.subscribe(()=>{this.setBuildings()})}ngOnChanges(t){this.setBuildings()}getFormControl(){return this.parentForm&&this.controlName?this.parentForm.get(this.controlName):null}setBuildings(){this.buildings=[{label:this.translate.instant("BUILDINGS.CASTLE"),value:"castle"},{label:this.translate.instant("BUILDINGS.MARANATHA"),value:"maranatha"},{label:this.translate.instant("BUILDINGS.FAMILYROOM"),value:"familyroom"},{label:this.translate.instant("BUILDINGS.CORNERHOUSE"),value:"cornerhouse"},{label:this.translate.instant("BUILDINGS.HUNTINGLODGE"),value:"huntinglodge"}]}handleOnChange(t){this.change.emit({value:t.value,field:this.controlName})}static#e=this.\u0275fac=function(r){return new(r||n)(e.Y36(d.sK))};static#t=this.\u0275cmp=e.Xpm({type:n,selectors:[["app-building-selector"]],inputs:{parentForm:"parentForm",controlName:"controlName",placeholder:"placeholder",showClear:"showClear"},outputs:{change:"change"},features:[e.TTD],decls:3,vars:2,consts:[["optionLabel","label","optionValue","value","appendTo","body",3,"formControl","options","placeholder","emptyMessage","showClear","onChange",4,"ngIf","ngIfElse"],["useNgModel",""],["optionLabel","label","optionValue","value","appendTo","body",3,"formControl","options","placeholder","emptyMessage","showClear","onChange"],["pTemplate","item"],["pTemplate","selectedItem"],[3,"ngClass"],["optionLabel","label","optionValue","value","appendTo","body",3,"ngModel","options","placeholder","emptyMessage","showClear","ngModelChange","onChange"]],template:function(r,o){if(1&r&&(e.YNc(0,h,5,9,"p-dropdown",0),e.YNc(1,i,5,9,"ng-template",null,1,e.W1O)),2&r){const p=e.MAs(2);e.Q6J("ngIf",o.getFormControl())("ngIfElse",p)}},dependencies:[g.mk,g.O5,c.JJ,c.On,c.oH,E.jx,u.Lt,d.X$],encapsulation:2})}return n})()},105:(O,m,s)=>{s.d(m,{v:()=>_});var e=s(2029),d=s(9515),g=s(6814),c=s(6223),E=s(5219),u=s(2352);function C(n,l){if(1&n&&(e.TgZ(0,"span",5),e._uU(1),e.qZA()),2&n){const t=l.$implicit;e.Q6J("ngClass","extrabed-badge "+(null==t?null:t.value)),e.xp6(1),e.hij(" ",t.label," ")}}function b(n,l){if(1&n&&(e.TgZ(0,"span",5),e._uU(1),e.qZA()),2&n){const t=l.$implicit;e.Q6J("ngClass","extrabed-badge "+(null==t?null:t.value)),e.xp6(1),e.hij(" ",null==t?null:t.label," ")}}function h(n,l){if(1&n){const t=e.EpF();e.TgZ(0,"p-dropdown",2),e.NdJ("onChange",function(o){e.CHM(t);const p=e.oxw();return e.KtG(p.handleOnChange(o))}),e.ALo(1,"translate"),e.ALo(2,"translate"),e.YNc(3,C,2,2,"ng-template",3),e.YNc(4,b,2,2,"ng-template",4),e.qZA()}if(2&n){const t=l.ngIf,r=e.oxw();e.s9C("placeholder",e.lcZ(1,5,"V\xe1lasszon...")),e.s9C("emptyMessage",e.lcZ(2,7,"Nincs tal\xe1lat...")),e.Q6J("formControl",t)("options",r.extrabeds)("showClear",r.showClear)}}function M(n,l){if(1&n&&(e.TgZ(0,"span",5),e._uU(1),e.qZA()),2&n){const t=l.$implicit;e.Q6J("ngClass","extrabed-badge "+(null==t?null:t.value)),e.xp6(1),e.hij(" ",t.label," ")}}function a(n,l){if(1&n&&(e.TgZ(0,"span",5),e._uU(1),e.qZA()),2&n){const t=l.$implicit;e.Q6J("ngClass","extrabed-badge "+(null==t?null:t.value)),e.xp6(1),e.hij(" ",null==t?null:t.label," ")}}function i(n,l){if(1&n){const t=e.EpF();e.TgZ(0,"p-dropdown",6),e.NdJ("ngModelChange",function(o){e.CHM(t);const p=e.oxw();return e.KtG(p.selectedExtrabed=o)})("onChange",function(o){e.CHM(t);const p=e.oxw();return e.KtG(p.handleOnChange(o))}),e.ALo(1,"translate"),e.ALo(2,"translate"),e.YNc(3,M,2,2,"ng-template",3),e.YNc(4,a,2,2,"ng-template",4),e.qZA()}if(2&n){const t=e.oxw();e.s9C("placeholder",e.lcZ(1,5,"V\xe1lasszon...")),e.s9C("emptyMessage",e.lcZ(2,7,"Nincs tal\xe1lat...")),e.Q6J("ngModel",t.selectedExtrabed)("options",t.extrabeds)("showClear",t.showClear)}}let _=(()=>{class n{constructor(t){this.translate=t,this.change=new e.vpe,this.extrabeds=[],this.selectedExtrabed=""}ngOnInit(){this.translate.onLangChange.subscribe(()=>{this.setExtrabeds()})}ngOnChanges(t){this.setExtrabeds()}getFormControl(){return this.parentForm&&this.controlName?this.parentForm.get(this.controlName):null}setExtrabeds(){this.extrabeds=[{label:this.translate.instant("EXTRABEDS.M"),value:"M"},{label:this.translate.instant("EXTRABEDS.MM"),value:"MM"},{label:this.translate.instant("EXTRABEDS.MGY"),value:"MGY"},{label:this.translate.instant("EXTRABEDS.GY"),value:"GY"}]}handleOnChange(t){this.change.emit({value:t.value,field:this.controlName})}static#e=this.\u0275fac=function(r){return new(r||n)(e.Y36(d.sK))};static#t=this.\u0275cmp=e.Xpm({type:n,selectors:[["app-extrabed-selector"]],inputs:{parentForm:"parentForm",controlName:"controlName",showClear:"showClear"},outputs:{change:"change"},features:[e.TTD],decls:3,vars:2,consts:[["optionLabel","label","optionValue","value","appendTo","body",3,"formControl","options","placeholder","emptyMessage","showClear","onChange",4,"ngIf","ngIfElse"],["useNgModel",""],["optionLabel","label","optionValue","value","appendTo","body",3,"formControl","options","placeholder","emptyMessage","showClear","onChange"],["pTemplate","item"],["pTemplate","selectedItem"],[3,"ngClass"],["optionLabel","label","optionValue","value","appendTo","body",3,"ngModel","options","placeholder","emptyMessage","showClear","ngModelChange","onChange"]],template:function(r,o){if(1&r&&(e.YNc(0,h,5,9,"p-dropdown",0),e.YNc(1,i,5,9,"ng-template",null,1,e.W1O)),2&r){const p=e.MAs(2);e.Q6J("ngIf",o.getFormControl())("ngIfElse",p)}},dependencies:[g.mk,g.O5,c.JJ,c.On,c.oH,E.jx,u.Lt,d.X$],encapsulation:2})}return n})()},8022:(O,m,s)=>{s.d(m,{k:()=>g});var e=s(5619),d=s(2029);let g=(()=>{class c{constructor(){this.isMobileSubject=new e.X(window.innerWidth<=768),this.isMobile$=this.isMobileSubject.asObservable(),this.updateIsMobile(),window.addEventListener("resize",()=>this.updateIsMobile())}updateIsMobile(){const u=window.innerWidth<=768;this.isMobileSubject.next(u)}getIsMobile(){return this.isMobileSubject.value}static#e=this.\u0275fac=function(C){return new(C||c)};static#t=this.\u0275prov=d.Yz7({token:c,factory:c.\u0275fac,providedIn:"root"})}return c})()},4520:(O,m,s)=>{s.d(m,{X:()=>b});var e=s(5619),d=s(2096),g=s(7398),c=s(2029),E=s(8814),u=s(9862),C=s(9515);let b=(()=>{class h{constructor(a,i,_){this.apiService=a,this.http=i,this.translate=_,this.cache=[],this.apiURL=a.apiURL,this.data$=new e.X(null),this.message$=new e.X(null)}get roomObs(){return this.data$.asObservable()}get messageObs(){return this.message$.asObservable()}get(a,i,_,n){let l="";""!==_&&(l=""!=_.sortField?`sort=${_.sortField}&order=${1===_.sortOrder?"ASC":"DESC"}`:""),this.getSzobak().then(o=>{console.log("szobak",o),this.data$.next({rows:o,total:o.length})}).catch(o=>{console.error("Error fetching szobak:",o)})}getBySearch(a,i){let _="";""!==i&&(_=""!=i.sortField?`?sort=${i.sortField}&order=${1===i.sortOrder?"ASC":"DESC"}`:""),this.apiService.get(`room/search/${a}${_}`).subscribe({next:n=>{this.data$.next(n)},error:n=>{this.message$.next(n)}})}getBySearchQuery(a){this.apiService.get(`room/searchquery?${a}`).subscribe({next:i=>{this.data$.next(i)},error:i=>{this.message$.next(i)}})}create(a){this.apiService.post("room/create/",a).subscribe({next:i=>{this.message$.next({severity:"success",summary:"Sikeres szoba r\xf6gz\xedt\xe9s",detail:`${a.roomNum} r\xf6gz\xedtve`})},error:i=>{this.message$.next(i)}})}update(a){this.apiService.put(`room/update/${a.id}`,a).subscribe({next:()=>{this.message$.next({severity:"success",summary:"Sikeres szoba m\xf3dos\xedt\xe1s",detail:`${a.roomNum} m\xf3dos\xedtva`})},error:i=>{this.message$.next(i)}})}delete(a){this.apiService.delete(`room/delete/${a.id}`).subscribe({next:i=>{this.message$.next({severity:"success",summary:"Sikeres szoba t\xf6rl\xe9s",detail:`${a.roomNum} t\xf6r\xf6lve`})},error:i=>{this.message$.next(i)}})}bulkdelete(a){let i={ids:a.map(_=>_.id)};this.apiService.post("room/bulkdelete",i).subscribe({next:_=>{this.message$.next({severity:"success",summary:"Sikeres szoba t\xf6rl\xe9s",detail:`${a.length} szoba t\xf6r\xf6lve`})},error:_=>{this.message$.next(_)}})}getRoomsForSelector(){return this.cache.length>0?(0,d.of)(this.cache):(this.get(0,999,{sortField:"id",sortOrder:1},""),this.data$.asObservable().pipe((0,g.U)(a=>{const i=a?a.rows:[];return this.cache=i,i})))}getAvailableRooms(a){return this.http.get(`${this.apiURL}/room/available/${a}`)}getSzobak(){return this.http.get("assets/demo/data/szobak.json").toPromise().then(a=>a)}getRoomTypeByCode(a,i){return[{code:"KB",beds:4,label:this.translate.instant("ROOMTYPES.CASTLE"),description:this.translate.instant("ROOMTYPES.4-BED-ROOM"),value:"Kast\xe9ly sz\xe1ll\xe1s 4 \xe1gyas szoba",color:"teal"},{code:"KB",beds:6,label:this.translate.instant("ROOMTYPES.CASTLE"),description:this.translate.instant("ROOMTYPES.6-BED-ROOM"),value:"Kast\xe9ly sz\xe1ll\xe1s 6 \xe1gyas szoba",color:"teal"},{code:"KB",beds:8,label:this.translate.instant("ROOMTYPES.CASTLE"),description:this.translate.instant("ROOMTYPES.8-BED-ROOM"),value:"Kast\xe9ly sz\xe1ll\xe1s 8 \xe1gyas szoba",color:"teal"},{code:"MD",beds:2,label:this.translate.instant("ROOMTYPES.MARANATHA-PENSION-HOUSE"),description:this.translate.instant("ROOMTYPES.2-BED-ROOM"),value:"Maranatha Panzi\xf3h\xe1z 2 \xe1gyas szoba (k\xfcl\xf6n f\xfcrd\u0151s)",color:"yellow"},{code:"MQ",beds:2,label:this.translate.instant("ROOMTYPES.MARANATHA-PENSION-HOUSE"),description:this.translate.instant("ROOMTYPES.DOUBLE-BED-ROOM"),value:"Maranatha Panzi\xf3h\xe1z francia\xe1gyas szoba (k\xfcl\xf6n f\xfcrd\u0151s)",color:"yellow"},{code:"MB",beds:4,label:this.translate.instant("ROOMTYPES.MARANATHA-PENSION-HOUSE"),description:this.translate.instant("ROOMTYPES.M-4-BED-ROOM"),value:"Maranatha Panzi\xf3h\xe1z 4 \xe1gyas szoba (emeletes \xe1gyas, k\xfcl\xf6n f\xfcrd\u0151s)",color:"yellow"},{code:"A",label:this.translate.instant("ROOMTYPES.FAMILY-ROOM"),description:this.translate.instant("ROOMTYPES.WITH-KITCHEN"),value:"Csal\xe1di szoba (k\xf6z\xf6s konyh\xe1val, f\xfcrd\u0151vel \xe9s nappalival)",color:"orange"}].find(l=>l.code===a&&(void 0===l.beds||l.beds===i))}static#e=this.\u0275fac=function(i){return new(i||h)(c.LFG(E.s),c.LFG(u.eN),c.LFG(C.sK))};static#t=this.\u0275prov=c.Yz7({token:h,factory:h.\u0275fac,providedIn:"root"})}return h})()}}]);