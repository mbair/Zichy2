"use strict";(self.webpackChunknfc_reserve=self.webpackChunknfc_reserve||[]).push([[485],{7939:(O,D,s)=>{s.d(D,{H:()=>_});var o=s(2029),u=s(9515),E=s(6814),w=s(6223),z=s(5219),m=s(2352);function b(h,C){if(1&h&&(o.TgZ(0,"span",5),o._uU(1),o.qZA()),2&h){const r=C.$implicit;o.Q6J("ngClass","meal-badge "+(null==r?null:r.style)),o.xp6(1),o.hij(" ",r.label," ")}}function T(h,C){if(1&h&&(o.TgZ(0,"span",5),o._uU(1),o.qZA()),2&h){const r=C.$implicit;o.Q6J("ngClass","meal-badge "+(null==r?null:r.style)),o.xp6(1),o.hij(" ",null==r?null:r.label," ")}}function I(h,C){if(1&h){const r=o.EpF();o.TgZ(0,"p-dropdown",2),o.NdJ("onChange",function(S){o.CHM(r);const v=o.oxw();return o.KtG(v.handleOnChange(S))}),o.ALo(1,"translate"),o.ALo(2,"translate"),o.YNc(3,b,2,2,"ng-template",3),o.YNc(4,T,2,2,"ng-template",4),o.qZA()}if(2&h){const r=C.ngIf,g=o.oxw();o.s9C("placeholder",o.lcZ(1,5,"V\xe1lasszon...")),o.s9C("emptyMessage",o.lcZ(2,7,"Nincs tal\xe1lat...")),o.Q6J("formControl",r)("options",g.meals)("showClear",g.showClear)}}function p(h,C){if(1&h&&(o.TgZ(0,"span",5),o._uU(1),o.qZA()),2&h){const r=C.$implicit;o.Q6J("ngClass","meal-badge "+(null==r?null:r.style)),o.xp6(1),o.hij(" ",r.label," ")}}function d(h,C){if(1&h&&(o.TgZ(0,"span",5),o._uU(1),o.qZA()),2&h){const r=C.$implicit;o.Q6J("ngClass","meal-badge "+(null==r?null:r.style)),o.xp6(1),o.hij(" ",null==r?null:r.label," ")}}function f(h,C){if(1&h){const r=o.EpF();o.TgZ(0,"p-dropdown",6),o.NdJ("ngModelChange",function(S){o.CHM(r);const v=o.oxw();return o.KtG(v.selectedMeal=S)})("onChange",function(S){o.CHM(r);const v=o.oxw();return o.KtG(v.handleOnChange(S))}),o.ALo(1,"translate"),o.ALo(2,"translate"),o.YNc(3,p,2,2,"ng-template",3),o.YNc(4,d,2,2,"ng-template",4),o.qZA()}if(2&h){const r=o.oxw();o.s9C("placeholder",o.lcZ(1,5,"V\xe1lasszon...")),o.s9C("emptyMessage",o.lcZ(2,7,"Nincs tal\xe1lat...")),o.Q6J("ngModel",r.selectedMeal)("options",r.meals)("showClear",r.showClear)}}let _=(()=>{class h{constructor(r){this.translate=r,this.change=new o.vpe,this.meals=[],this.selectedMeal=""}ngOnInit(){this.translate.onLangChange.subscribe(()=>{this.setMeals()})}ngOnChanges(r){this.setMeals()}getFormControl(){return this.parentForm&&this.controlName?this.parentForm.get(this.controlName):null}setMeals(){if(this.meals=[{label:this.translate.instant("MEALS.BREAKFAST"),value:"reggeli",style:"breakfast"},{label:this.translate.instant("MEALS.LUNCH"),value:"eb\xe9d",style:"lunch"},{label:this.translate.instant("MEALS.DINNER"),value:"vacsora",style:"dinner"}],this.earliestMeal){const r=this.meals.findIndex(g=>g.value===this.earliestMeal);r>-1&&(this.meals=this.meals.slice(r))}if(this.latestMeal){const r=this.meals.findIndex(g=>g.value===this.latestMeal);r>-1&&(this.meals=this.meals.slice(0,r+1))}this.showNothing&&this.meals.push({label:this.translate.instant("MEALS.NOTHING"),value:"nem k\xe9r \xe9tkez\xe9st",style:"nothing"})}setEarliestMeal(r){this.earliestMeal=r,this.setMeals()}setLatestMeal(r){this.latestMeal=r,this.setMeals()}handleOnChange(r){this.change.emit({value:r.value,field:this.controlName})}static#e=this.\u0275fac=function(g){return new(g||h)(o.Y36(u.sK))};static#t=this.\u0275cmp=o.Xpm({type:h,selectors:[["app-meal-selector"]],inputs:{parentForm:"parentForm",controlName:"controlName",showClear:"showClear",showNothing:"showNothing",earliestMeal:"earliestMeal",latestMeal:"latestMeal"},outputs:{change:"change"},features:[o.TTD],decls:3,vars:2,consts:[["optionLabel","label","optionValue","value","appendTo","body",3,"formControl","options","placeholder","emptyMessage","showClear","onChange",4,"ngIf","ngIfElse"],["useNgModel",""],["optionLabel","label","optionValue","value","appendTo","body",3,"formControl","options","placeholder","emptyMessage","showClear","onChange"],["pTemplate","item"],["pTemplate","selectedItem"],[3,"ngClass"],["optionLabel","label","optionValue","value","appendTo","body",3,"ngModel","options","placeholder","emptyMessage","showClear","ngModelChange","onChange"]],template:function(g,S){if(1&g&&(o.YNc(0,I,5,9,"p-dropdown",0),o.YNc(1,f,5,9,"ng-template",null,1,o.W1O)),2&g){const v=o.MAs(2);o.Q6J("ngIf",S.getFormControl())("ngIfElse",v)}},dependencies:[E.mk,E.O5,w.JJ,w.On,w.oH,z.jx,m.Lt,u.X$],encapsulation:2})}return h})()},219:(O,D,s)=>{s.d(D,{Z:()=>b});var o=s(5619),u=s(7398),E=s(6306),w=s(2096),z=s(2029),m=s(8814);let b=(()=>{class T{constructor(p){this.apiService=p,this.cache=[],this.apiURL=p.apiURL,this.data$=new o.X(null),this.message$=new o.X(null)}get conferenceObs(){return this.data$.asObservable()}get messageObs(){return this.message$.asObservable()}get(p,d,f,_){const h=localStorage.getItem("userrole"),C=localStorage.getItem("userid");if("Szervezo"===h&&C){const v=`organizer_user_id=${C}`;_=_?`${_}&${v}`:v}let r="";""!==f&&(r=""!=f.sortField?`sort=${f.sortField}&order=${1===f.sortOrder?"ASC":"DESC"}`:"");const g=""!==r&&""!==_?r+"&"+_:""!==r&&""===_?r:""===r&&""!==_?_:"";this.apiService.get(`conference/get/${p}/${d}${""!==g?"?"+g:""}`).subscribe({next:v=>{this.data$.next(v)},error:v=>{this.message$.next(v)}})}getBySearch(p,d){let f="";""!==d&&(f=""!=d.sortField?`?sort=${d.sortField}&order=${1===d.sortOrder?"ASC":"DESC"}`:""),this.apiService.get(`conference/search/${p}${f}`).subscribe({next:_=>{this.data$.next(_)},error:_=>{this.message$.next(_)}})}getBySearchQuery(p){this.apiService.get(`conference/searchquery?${p}`).subscribe({next:d=>{this.data$.next(d)},error:d=>{this.message$.next(d)}})}create(p){this.apiService.post("conference/create/",p).subscribe({next:d=>{this.message$.next({severity:"success",summary:"Sikeres konferencia r\xf6gz\xedt\xe9s",detail:`${p.name} r\xf6gz\xedtve`})},error:d=>{this.message$.next(d)}})}update(p){this.apiService.put(`conference/update/${p.id}`,p).subscribe({next:()=>{this.message$.next({severity:"success",summary:"Sikeres konferencia m\xf3dos\xedt\xe1s",detail:`${p.name} m\xf3dos\xedtva`})},error:d=>{this.message$.next(d)}})}delete(p){this.apiService.delete(`conference/delete/${p.id}`).subscribe({next:d=>{this.message$.next({severity:"success",summary:"Sikeres konferencia t\xf6rl\xe9s",detail:`${p.name} t\xf6r\xf6lve`})},error:d=>{this.message$.next(d)}})}bulkdelete(p){let d={ids:p.map(f=>f.id)};this.apiService.post("conference/bulkdelete",d).subscribe({next:f=>{this.message$.next({severity:"success",summary:"Sikeres konferencia t\xf6rl\xe9s",detail:`${p.length} konferencia t\xf6r\xf6lve`})},error:f=>{this.message$.next(f)}})}getConferencesForSelector(){return this.get(0,999,{sortField:"id",sortOrder:1},""),this.data$.asObservable().pipe((0,u.U)(d=>{const f=d?d.rows:[];return this.cache=f,f}))}getById(p){return this.apiService.get(`conference/getbyid/${p}`)}isSlugValid(p){return this.get(0,20,"slug=","sort"),this.data$.pipe((0,u.U)(d=>(console.log("isSlugValid response",d),d&&d.data&&d.rows.length>0)),(0,E.K)(()=>(0,w.of)(!1)))}static#e=this.\u0275fac=function(d){return new(d||T)(z.LFG(m.s))};static#t=this.\u0275prov=z.Yz7({token:T,factory:T.\u0275fac,providedIn:"root"})}return T})()},3139:(O,D,s)=>{s.d(D,{Q:()=>E});var o=s(8645),u=s(2029);let E=(()=>{class w{constructor(){this.mealChanged=new o.x,this.meals={breakfast:{begin:7,end:10},lunch:{begin:11,end:15},dinner:{begin:17,end:20}},this.checkMealStart(),setInterval(()=>{this.checkMealStart()},2e4)}checkMealStart(){const b=(new Date).getHours();for(const T of Object.keys(this.meals)){const I=this.meals[T];if(b>=I.begin&&b<I.end)return void this.mealChanged.next(T)}}getMealNameByTime(m){const b=m.getHours();for(const T in this.meals){const I=this.meals[T];if(b>=I.begin&&b<=I.end)return this.translateMealName(T)}return"Jelenleg nincs \xe9tkeztet\xe9s"}getMealsForSelector(){let m=[];for(const b in this.meals)m.push(this.translateMealName(b));return m}translateMealName(m){return{breakfast:"reggeli",lunch:"eb\xe9d",dinner:"vacsora"}[m]||m}isOpen(){const m=(new Date).getHours();for(const b in this.meals){const T=this.meals[b];if(m>=T.begin&&m<T.end)return!0}return!1}static#e=this.\u0275fac=function(b){return new(b||w)};static#t=this.\u0275prov=u.Yz7({token:w,factory:w.\u0275fac,providedIn:"root"})}return w})()},5389:(O,D,s)=>{s.d(D,{dp:()=>rt});var o=s(6814),u=s(2029),E=s(5219),w=s(1712),z=s(4480),m=s(6489),b=s(6392),T=s(4562),I=s(3362),p=s(2314),d=s(2591),f=s(6005),_=s(4713);let h=(()=>{class t extends _.s{static \u0275fac=function(){let e;return function(n){return(e||(e=u.n5z(t)))(n||t)}}();static \u0275cmp=u.Xpm({type:t,selectors:[["MinusIcon"]],standalone:!0,features:[u.qOj,u.jDz],decls:2,vars:5,consts:[["width","14","height","14","viewBox","0 0 14 14","fill","none","xmlns","http://www.w3.org/2000/svg"],["d","M13.2222 7.77778H0.777778C0.571498 7.77778 0.373667 7.69584 0.227806 7.54998C0.0819442 7.40412 0 7.20629 0 7.00001C0 6.79373 0.0819442 6.5959 0.227806 6.45003C0.373667 6.30417 0.571498 6.22223 0.777778 6.22223H13.2222C13.4285 6.22223 13.6263 6.30417 13.7722 6.45003C13.9181 6.5959 14 6.79373 14 7.00001C14 7.20629 13.9181 7.40412 13.7722 7.54998C13.6263 7.69584 13.4285 7.77778 13.2222 7.77778Z","fill","currentColor"]],template:function(l,n){1&l&&(u.O4$(),u.TgZ(0,"svg",0),u._UZ(1,"path",1),u.qZA()),2&l&&(u.Tol(n.getClassNames()),u.uIk("aria-label",n.ariaLabel)("aria-hidden",n.ariaHidden)("role",n.role))},dependencies:[o.ez],encapsulation:2})}return t})();var C=s(3833),r=s(7273),g=s(8717);let rt=(()=>{class t{static \u0275fac=function(l){return new(l||t)};static \u0275mod=u.oAB({type:t});static \u0275inj=u.cJS({imports:[o.ez,w.U,z.T,m.v,g.L,I.v,p.H,C.V,r.m,b.W,d.n,h,f.v,T.X,E.m8,m.v]})}return t})()}}]);