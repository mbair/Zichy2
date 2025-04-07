"use strict";(self.webpackChunknfc_reserve=self.webpackChunknfc_reserve||[]).push([[6776],{9474:(k,I,a)=>{a.d(I,{w:()=>h});var n=a(2029),g=a(6223),w=a(219),x=a(5219),S=a(4055),E=a(9515);const M=["conferenceSelector"];function v(s,m){1&s&&n._uU(0),2&s&&n.hij(" ",m.$implicit.name," ")}function z(s,m){1&s&&n._uU(0),2&s&&n.hij(" ",m.$implicit.name," ")}let h=(()=>{class s{constructor(d){this.conferenceService=d,this.selectFirstOption=!1,this.showClear=!0,this.style={},this.loading=!0,this.disabled=!1,this.conferences=[],this.selectedConferences=[],this.onChange=p=>{},this.onTouched=()=>{}}ngOnInit(){this.conferenceService.getConferencesForSelector().subscribe(d=>{this.conferences=d,this.handleSelectFirstOption()})}handleSelectFirstOption(){!this.selectFirstOption||this.selectedConferences&&0!==this.selectedConferences.length||(this.selectedConferences=this.conferences.slice(0,this.selectionLimit??1),this.onChange(this.selectedConferences))}setDisabledState(d){this.disabled=d}syncSelectedConferences(){this.selectedConferences=this.conferences.filter(d=>this.selectedConferences.some(p=>p.id===d.id)),this.onChange(this.selectedConferences)}onSelectionChange(d){this.selectedConferences=d.value,this.onChange(this.selectedConferences),this.onTouched(),this.selectionLimit==this.selectedConferences.length&&setTimeout(()=>this.conferenceSelectorRef.hide(),0)}onSelectionClear(){this.selectedConferences=[],this.onChange(this.selectedConferences),this.onTouched()}writeValue(d){this.selectedConferences=d||[],this.conferences.length>0&&this.syncSelectedConferences()}registerOnChange(d){this.onChange=d}registerOnTouched(d){this.onTouched=d}static#e=this.\u0275fac=function(p){return new(p||s)(n.Y36(w.Z))};static#t=this.\u0275cmp=n.Xpm({type:s,selectors:[["app-conference-selector"]],viewQuery:function(p,f){if(1&p&&n.Gf(M,5),2&p){let r;n.iGM(r=n.CRH())&&(f.conferenceSelectorRef=r.first)}},inputs:{selectionLimit:"selectionLimit",selectFirstOption:"selectFirstOption",placeholder:"placeholder",showClear:"showClear",style:"style"},features:[n._Bn([{provide:g.JU,useExisting:(0,n.Gpc)(()=>s),multi:!0}])],decls:5,vars:13,consts:[["optionLabel","name","scrollHeight","400px","appendTo","body","display","chip",1,"multiselect-custom-virtual-scroll",3,"options","ngModel","disabled","selectionLimit","placeholder","emptyMessage","virtualScroll","virtualScrollItemSize","showClear","ngModelChange","onChange","onClear"],["conferenceSelector",""],["pTemplate","item"],["pTemplate","selectedItem"]],template:function(p,f){1&p&&(n.TgZ(0,"p-multiSelect",0,1),n.NdJ("ngModelChange",function(b){return f.selectedConferences=b})("onChange",function(b){return f.onSelectionChange(b)})("onClear",function(){return f.onSelectionClear()}),n.ALo(2,"translate"),n.YNc(3,v,1,1,"ng-template",2),n.YNc(4,z,1,1,"ng-template",3),n.qZA()),2&p&&(n.Akn(f.style),n.s9C("emptyMessage",n.lcZ(2,11,"Nincs tal\xe1lat...")),n.Q6J("options",f.conferences)("ngModel",f.selectedConferences)("disabled",f.disabled)("selectionLimit",f.selectionLimit)("placeholder",f.placeholder)("virtualScroll",!0)("virtualScrollItemSize",43)("showClear",f.showClear))},dependencies:[g.JJ,g.On,x.jx,S.NU,E.X$],encapsulation:2})}return s})()},7939:(k,I,a)=>{a.d(I,{H:()=>d});var n=a(2029),g=a(9515),w=a(6814),x=a(6223),S=a(5219),E=a(2160);function M(p,f){if(1&p&&(n.TgZ(0,"span",5),n._uU(1),n.qZA()),2&p){const r=f.$implicit;n.Q6J("ngClass","meal-badge "+(null==r?null:r.style)),n.xp6(1),n.hij(" ",r.label," ")}}function v(p,f){if(1&p&&(n.TgZ(0,"span",5),n._uU(1),n.qZA()),2&p){const r=f.$implicit;n.Q6J("ngClass","meal-badge "+(null==r?null:r.style)),n.xp6(1),n.hij(" ",null==r?null:r.label," ")}}function z(p,f){if(1&p){const r=n.EpF();n.TgZ(0,"p-dropdown",2),n.NdJ("onChange",function(y){n.CHM(r);const _=n.oxw();return n.KtG(_.handleOnChange(y))}),n.ALo(1,"translate"),n.ALo(2,"translate"),n.YNc(3,M,2,2,"ng-template",3),n.YNc(4,v,2,2,"ng-template",4),n.qZA()}if(2&p){const r=f.ngIf,b=n.oxw();n.s9C("placeholder",n.lcZ(1,5,"V\xe1lasszon...")),n.s9C("emptyMessage",n.lcZ(2,7,"Nincs tal\xe1lat...")),n.Q6J("formControl",r)("options",b.meals)("showClear",b.showClear)}}function h(p,f){if(1&p&&(n.TgZ(0,"span",5),n._uU(1),n.qZA()),2&p){const r=f.$implicit;n.Q6J("ngClass","meal-badge "+(null==r?null:r.style)),n.xp6(1),n.hij(" ",r.label," ")}}function s(p,f){if(1&p&&(n.TgZ(0,"span",5),n._uU(1),n.qZA()),2&p){const r=f.$implicit;n.Q6J("ngClass","meal-badge "+(null==r?null:r.style)),n.xp6(1),n.hij(" ",null==r?null:r.label," ")}}function m(p,f){if(1&p){const r=n.EpF();n.TgZ(0,"p-dropdown",6),n.NdJ("ngModelChange",function(y){n.CHM(r);const _=n.oxw();return n.KtG(_.selectedMeal=y)})("onChange",function(y){n.CHM(r);const _=n.oxw();return n.KtG(_.handleOnChange(y))}),n.ALo(1,"translate"),n.ALo(2,"translate"),n.YNc(3,h,2,2,"ng-template",3),n.YNc(4,s,2,2,"ng-template",4),n.qZA()}if(2&p){const r=n.oxw();n.s9C("placeholder",n.lcZ(1,5,"V\xe1lasszon...")),n.s9C("emptyMessage",n.lcZ(2,7,"Nincs tal\xe1lat...")),n.Q6J("ngModel",r.selectedMeal)("options",r.meals)("showClear",r.showClear)}}let d=(()=>{class p{constructor(r){this.translate=r,this.change=new n.vpe,this.meals=[],this.selectedMeal=""}ngOnInit(){this.translate.onLangChange.subscribe(()=>{this.setMeals()})}ngOnChanges(r){this.setMeals()}getFormControl(){return this.parentForm&&this.controlName?this.parentForm.get(this.controlName):null}setMeals(){if(this.meals=[{label:this.translate.instant("MEALS.BREAKFAST"),value:"reggeli",style:"breakfast"},{label:this.translate.instant("MEALS.LUNCH"),value:"eb\xe9d",style:"lunch"},{label:this.translate.instant("MEALS.DINNER"),value:"vacsora",style:"dinner"}],this.earliestMeal){const r=this.meals.findIndex(b=>b.value===this.earliestMeal);r>-1&&(this.meals=this.meals.slice(r))}if(this.latestMeal){const r=this.meals.findIndex(b=>b.value===this.latestMeal);r>-1&&(this.meals=this.meals.slice(0,r+1))}this.showNothing&&this.meals.push({label:this.translate.instant("MEALS.NOTHING"),value:"nem k\xe9r \xe9tkez\xe9st",style:"nothing"})}setEarliestMeal(r){this.earliestMeal=r,this.setMeals()}setLatestMeal(r){this.latestMeal=r,this.setMeals()}handleOnChange(r){this.change.emit({value:r.value,field:this.controlName})}static#e=this.\u0275fac=function(b){return new(b||p)(n.Y36(g.sK))};static#t=this.\u0275cmp=n.Xpm({type:p,selectors:[["app-meal-selector"]],inputs:{parentForm:"parentForm",controlName:"controlName",showClear:"showClear",showNothing:"showNothing",earliestMeal:"earliestMeal",latestMeal:"latestMeal"},outputs:{change:"change"},features:[n.TTD],decls:3,vars:2,consts:[["optionLabel","label","optionValue","value","appendTo","body",3,"formControl","options","placeholder","emptyMessage","showClear","onChange",4,"ngIf","ngIfElse"],["useNgModel",""],["optionLabel","label","optionValue","value","appendTo","body",3,"formControl","options","placeholder","emptyMessage","showClear","onChange"],["pTemplate","item"],["pTemplate","selectedItem"],[3,"ngClass"],["optionLabel","label","optionValue","value","appendTo","body",3,"ngModel","options","placeholder","emptyMessage","showClear","ngModelChange","onChange"]],template:function(b,y){if(1&b&&(n.YNc(0,z,5,9,"p-dropdown",0),n.YNc(1,m,5,9,"ng-template",null,1,n.W1O)),2&b){const _=n.MAs(2);n.Q6J("ngIf",y.getFormControl())("ngIfElse",_)}},dependencies:[w.mk,w.O5,x.JJ,x.On,x.oH,S.jx,E.Lt,g.X$],encapsulation:2})}return p})()},219:(k,I,a)=>{a.d(I,{Z:()=>M});var n=a(5619),g=a(7398),w=a(6306),x=a(2096),S=a(2029),E=a(8814);let M=(()=>{class v{constructor(h){this.apiService=h,this.cache=[],this.apiURL=h.apiURL,this.data$=new n.X(null),this.message$=new n.X(null)}get conferenceObs(){return this.data$.asObservable()}get messageObs(){return this.message$.asObservable()}get(h,s,m,d){const p=localStorage.getItem("userrole"),f=localStorage.getItem("userid");if("Szervezo"===p&&f){const _=`organizer_user_id=${f}`;d=d?`${d}&${_}`:_}d.includes("enabled=")||(d=d?`${d}&enabled=1`:"enabled=1");let r="";""!==m&&(r=""!=m.sortField?`sort=${m.sortField}&order=${1===m.sortOrder?"ASC":"DESC"}`:"");const b=""!==r&&""!==d?r+"&"+d:""!==r&&""===d?r:""===r&&""!==d?d:"";this.apiService.get(`conference/get/${h}/${s}${""!==b?"?"+b:""}`).subscribe({next:_=>{this.data$.next(_)},error:_=>{this.message$.next(_)}})}getBySearch(h,s){let m="";""!==s&&(m=""!=s.sortField?`?sort=${s.sortField}&order=${1===s.sortOrder?"ASC":"DESC"}`:""),this.apiService.get(`conference/search/${h}${m}`).subscribe({next:d=>{this.data$.next(d)},error:d=>{this.message$.next(d)}})}getBySearchQuery(h){this.apiService.get(`conference/searchquery?${h}`).subscribe({next:s=>{this.data$.next(s)},error:s=>{this.message$.next(s)}})}create(h){this.apiService.post("conference/create/",h).subscribe({next:s=>{this.message$.next({severity:"success",summary:"Sikeres konferencia r\xf6gz\xedt\xe9s",detail:`${h.name} r\xf6gz\xedtve`})},error:s=>{this.message$.next(s)}})}update(h){this.apiService.put(`conference/update/${h.id}`,h).subscribe({next:()=>{this.message$.next({severity:"success",summary:"Sikeres konferencia m\xf3dos\xedt\xe1s",detail:`${h.name} m\xf3dos\xedtva`})},error:s=>{this.message$.next(s)}})}delete(h){this.apiService.delete(`conference/delete/${h.id}`).subscribe({next:s=>{this.message$.next({severity:"success",summary:"Sikeres konferencia t\xf6rl\xe9s",detail:`${h.name} t\xf6r\xf6lve`})},error:s=>{this.message$.next(s)}})}bulkdelete(h){let s={ids:h.map(m=>m.id)};this.apiService.post("conference/bulkdelete",s).subscribe({next:m=>{this.message$.next({severity:"success",summary:"Sikeres konferencia t\xf6rl\xe9s",detail:`${h.length} konferencia t\xf6r\xf6lve`})},error:m=>{this.message$.next(m)}})}getConferencesForSelector(){return this.get(0,999,{sortField:"id",sortOrder:1},""),this.data$.asObservable().pipe((0,g.U)(s=>{const m=s?s.rows:[];return this.cache=m,m}))}getById(h){return this.apiService.get(`conference/getbyid/${h}`)}isSlugValid(h){return this.get(0,20,"slug=","sort"),this.data$.pipe((0,g.U)(s=>(console.log("isSlugValid response",s),s&&s.data&&s.rows.length>0)),(0,w.K)(()=>(0,x.of)(!1)))}assignRoomsToConference(h,s){this.apiService.post(`conferencesroom/addroom/${h}`,{roomIds:s}).subscribe({next:m=>{this.message$.next({severity:"success",summary:"Sikeres szoba-konferencia \xf6sszerendel\xe9s",detail:"Szob\xe1k hozz\xe1rendelve"})},error:m=>{this.message$.next(m)}})}removeRoomsFromConference(h,s){this.apiService.post(`conferencesroom/removeroom/${h}`,{roomIds:s}).subscribe({next:m=>{this.message$.next({severity:"success",summary:"\xd6sszerendel\xe9s t\xf6r\xf6lve",detail:"Szoba-konferencia \xf6sszerendel\xe9s t\xf6r\xf6lve"})},error:m=>{this.message$.next(m)}})}static#e=this.\u0275fac=function(s){return new(s||v)(S.LFG(E.s))};static#t=this.\u0275prov=S.Yz7({token:v,factory:v.\u0275fac,providedIn:"root"})}return v})()},9444:(k,I,a)=>{a.d(I,{y:()=>f});var n=a(6814),g=a(6223),w=a(9515),x=a(2610),S=a(7213),E=a(9246),M=a(9664),v=a(2160),z=a(4055),h=a(3714),s=a(3259),m=a(2169),d=a(2285),p=a(2029);let f=(()=>{class r{static#e=this.\u0275fac=function(_){return new(_||r)};static#t=this.\u0275mod=p.oAB({type:r});static#i=this.\u0275inj=p.cJS({imports:[n.ez,g.u5,g.UX,w.aw,x.O,S.S,E.l,d.L,M.U$,v.kW,z.q4,h.j,s.z,m.o]})}return r})()},5389:(k,I,a)=>{a.d(I,{dp:()=>rt});var n=a(6814),g=a(2029),w=a(5219),x=a(1712),S=a(4480),E=a(6489),M=a(6392),v=a(4562),z=a(3362),h=a(2314),s=a(2591),m=a(6005),d=a(4713);let p=(()=>{class t extends d.s{static \u0275fac=function(){let e;return function(o){return(e||(e=g.n5z(t)))(o||t)}}();static \u0275cmp=g.Xpm({type:t,selectors:[["MinusIcon"]],standalone:!0,features:[g.qOj,g.jDz],decls:2,vars:5,consts:[["width","14","height","14","viewBox","0 0 14 14","fill","none","xmlns","http://www.w3.org/2000/svg"],["d","M13.2222 7.77778H0.777778C0.571498 7.77778 0.373667 7.69584 0.227806 7.54998C0.0819442 7.40412 0 7.20629 0 7.00001C0 6.79373 0.0819442 6.5959 0.227806 6.45003C0.373667 6.30417 0.571498 6.22223 0.777778 6.22223H13.2222C13.4285 6.22223 13.6263 6.30417 13.7722 6.45003C13.9181 6.5959 14 6.79373 14 7.00001C14 7.20629 13.9181 7.40412 13.7722 7.54998C13.6263 7.69584 13.4285 7.77778 13.2222 7.77778Z","fill","currentColor"]],template:function(l,o){1&l&&(g.O4$(),g.TgZ(0,"svg",0),g._UZ(1,"path",1),g.qZA()),2&l&&(g.Tol(o.getClassNames()),g.uIk("aria-label",o.ariaLabel)("aria-hidden",o.ariaHidden)("role",o.role))},dependencies:[n.ez],encapsulation:2})}return t})();var f=a(3833),r=a(7273),b=a(8717);let rt=(()=>{class t{static \u0275fac=function(l){return new(l||t)};static \u0275mod=g.oAB({type:t});static \u0275inj=g.cJS({imports:[n.ez,x.U,S.T,E.v,b.L,z.v,h.H,f.V,r.m,M.W,s.n,p,m.v,v.X,w.m8,E.v]})}return t})()}}]);