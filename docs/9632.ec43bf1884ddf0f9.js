"use strict";(self.webpackChunknfc_reserve=self.webpackChunknfc_reserve||[]).push([[9632],{9474:(V,O,a)=>{a.d(O,{w:()=>w});var i=a(2029),g=a(9515),M=a(219),x=a(6814),D=a(6223),_=a(5219),T=a(2352);function b(r,m){1&r&&(i._uU(0),i.ALo(1,"translate")),2&r&&i.hij(" ",i.lcZ(1,1,m.$implicit.name)," ")}function I(r,m){if(1&r&&(i._uU(0),i.ALo(1,"translate")),2&r){const c=m.$implicit;i.hij(" ",i.lcZ(1,1,null==c?null:c.name)," ")}}function d(r,m){if(1&r){const c=i.EpF();i.TgZ(0,"p-dropdown",2),i.NdJ("onChange",function(S){i.CHM(c);const z=i.oxw();return i.KtG(z.handleOnChange(S))})("onClear",function(){i.CHM(c);const S=i.oxw();return i.KtG(S.handleOnClear())}),i.ALo(1,"translate"),i.YNc(2,b,2,3,"ng-template",3),i.YNc(3,I,2,3,"ng-template",4),i.qZA()}if(2&r){const c=m.ngIf,p=i.oxw();i.s9C("emptyMessage",i.lcZ(1,5,"Nincs tal\xe1lat...")),i.Q6J("formControl",c)("options",p.conferences)("placeholder",p.placeholder)("showClear",p.showClear)}}function h(r,m){1&r&&(i._uU(0),i.ALo(1,"translate")),2&r&&i.hij(" ",i.lcZ(1,1,m.$implicit.name)," ")}function v(r,m){if(1&r&&(i._uU(0),i.ALo(1,"translate")),2&r){const c=m.$implicit;i.hij(" ",i.lcZ(1,1,null==c?null:c.name)," ")}}const C=function(){return{width:"100% !important"}};function f(r,m){if(1&r){const c=i.EpF();i.TgZ(0,"p-dropdown",5),i.NdJ("ngModelChange",function(S){i.CHM(c);const z=i.oxw();return i.KtG(z.selectedConference=S)})("onChange",function(S){i.CHM(c);const z=i.oxw();return i.KtG(z.handleOnChange(S))})("onClear",function(){i.CHM(c);const S=i.oxw();return i.KtG(S.handleOnClear())}),i.ALo(1,"translate"),i.YNc(2,h,2,3,"ng-template",3),i.YNc(3,v,2,3,"ng-template",4),i.qZA()}if(2&r){const c=i.oxw();i.Akn(i.DdM(9,C)),i.s9C("emptyMessage",i.lcZ(1,7,"Nincs tal\xe1lat...")),i.Q6J("ngModel",c.selectedConference)("options",c.conferences)("placeholder",c.placeholder)("showClear",c.showClear)}}let w=(()=>{class r{constructor(c,p){this.translate=c,this.conferenceService=p,this.change=new i.vpe,this.conferences=[],this.selectedConference={}}ngOnInit(){this.translate.onLangChange.subscribe(()=>{this.setConferences()})}ngOnChanges(c){this.setConferences()}getFormControl(){return this.parentForm&&this.controlName?this.parentForm.get(this.controlName):null}setConferences(){this.conferenceService.getConferencesForSelector().subscribe(c=>{this.conferences=c,this.selectFirstOption&&this.conferences.length>0&&(this.selectedConference=this.conferences[0],this.getFormControl()?.setValue(this.selectedConference?.name||null),this.handleOnChange({originalEvent:{},value:this.selectedConference?.name||null}))})}handleOnChange(c){const p=this.conferences.find(S=>S.name===c.value)||null;this.change.emit({value:p,field:this.controlName})}handleOnClear(){this.selectedConference=null,this.getFormControl()?.setValue(null),this.handleOnChange({value:null,originalEvent:{}})}static#e=this.\u0275fac=function(p){return new(p||r)(i.Y36(g.sK),i.Y36(M.Z))};static#t=this.\u0275cmp=i.Xpm({type:r,selectors:[["app-conference-selector"]],inputs:{parentForm:"parentForm",controlName:"controlName",showClear:"showClear",placeholder:"placeholder",selectFirstOption:"selectFirstOption"},outputs:{change:"change"},features:[i.TTD],decls:3,vars:2,consts:[["optionLabel","name","optionValue","name","appendTo","body",3,"formControl","options","placeholder","emptyMessage","showClear","onChange","onClear",4,"ngIf","ngIfElse"],["useNgModel",""],["optionLabel","name","optionValue","name","appendTo","body",3,"formControl","options","placeholder","emptyMessage","showClear","onChange","onClear"],["pTemplate","item"],["pTemplate","selectedItem"],["optionLabel","name","optionValue","name","appendTo","body",3,"ngModel","options","placeholder","emptyMessage","showClear","ngModelChange","onChange","onClear"]],template:function(p,S){if(1&p&&(i.YNc(0,d,4,7,"p-dropdown",0),i.YNc(1,f,4,10,"ng-template",null,1,i.W1O)),2&p){const z=i.MAs(2);i.Q6J("ngIf",S.getFormControl())("ngIfElse",z)}},dependencies:[x.O5,D.JJ,D.On,D.oH,_.jx,T.Lt,g.X$],encapsulation:2})}return r})()},7939:(V,O,a)=>{a.d(O,{H:()=>C});var i=a(2029),g=a(9515),M=a(6814),x=a(6223),D=a(5219),_=a(2352);function T(f,w){if(1&f&&(i.TgZ(0,"span",5),i._uU(1),i.qZA()),2&f){const r=w.$implicit;i.Q6J("ngClass","meal-badge "+(null==r?null:r.style)),i.xp6(1),i.hij(" ",r.label," ")}}function b(f,w){if(1&f&&(i.TgZ(0,"span",5),i._uU(1),i.qZA()),2&f){const r=w.$implicit;i.Q6J("ngClass","meal-badge "+(null==r?null:r.style)),i.xp6(1),i.hij(" ",null==r?null:r.label," ")}}function I(f,w){if(1&f){const r=i.EpF();i.TgZ(0,"p-dropdown",2),i.NdJ("onChange",function(c){i.CHM(r);const p=i.oxw();return i.KtG(p.handleOnChange(c))}),i.ALo(1,"translate"),i.ALo(2,"translate"),i.YNc(3,T,2,2,"ng-template",3),i.YNc(4,b,2,2,"ng-template",4),i.qZA()}if(2&f){const r=w.ngIf,m=i.oxw();i.s9C("placeholder",i.lcZ(1,5,"V\xe1lasszon...")),i.s9C("emptyMessage",i.lcZ(2,7,"Nincs tal\xe1lat...")),i.Q6J("formControl",r)("options",m.meals)("showClear",m.showClear)}}function d(f,w){if(1&f&&(i.TgZ(0,"span",5),i._uU(1),i.qZA()),2&f){const r=w.$implicit;i.Q6J("ngClass","meal-badge "+(null==r?null:r.style)),i.xp6(1),i.hij(" ",r.label," ")}}function h(f,w){if(1&f&&(i.TgZ(0,"span",5),i._uU(1),i.qZA()),2&f){const r=w.$implicit;i.Q6J("ngClass","meal-badge "+(null==r?null:r.style)),i.xp6(1),i.hij(" ",null==r?null:r.label," ")}}function v(f,w){if(1&f){const r=i.EpF();i.TgZ(0,"p-dropdown",6),i.NdJ("ngModelChange",function(c){i.CHM(r);const p=i.oxw();return i.KtG(p.selectedMeal=c)})("onChange",function(c){i.CHM(r);const p=i.oxw();return i.KtG(p.handleOnChange(c))}),i.ALo(1,"translate"),i.ALo(2,"translate"),i.YNc(3,d,2,2,"ng-template",3),i.YNc(4,h,2,2,"ng-template",4),i.qZA()}if(2&f){const r=i.oxw();i.s9C("placeholder",i.lcZ(1,5,"V\xe1lasszon...")),i.s9C("emptyMessage",i.lcZ(2,7,"Nincs tal\xe1lat...")),i.Q6J("ngModel",r.selectedMeal)("options",r.meals)("showClear",r.showClear)}}let C=(()=>{class f{constructor(r){this.translate=r,this.change=new i.vpe,this.meals=[],this.selectedMeal=""}ngOnInit(){this.translate.onLangChange.subscribe(()=>{this.setMeals()})}ngOnChanges(r){this.setMeals()}getFormControl(){return this.parentForm&&this.controlName?this.parentForm.get(this.controlName):null}setMeals(){if(this.meals=[{label:this.translate.instant("MEALS.BREAKFAST"),value:"reggeli",style:"breakfast"},{label:this.translate.instant("MEALS.LUNCH"),value:"eb\xe9d",style:"lunch"},{label:this.translate.instant("MEALS.DINNER"),value:"vacsora",style:"dinner"}],this.earliestMeal){const r=this.meals.findIndex(m=>m.value===this.earliestMeal);r>-1&&(this.meals=this.meals.slice(r))}if(this.latestMeal){const r=this.meals.findIndex(m=>m.value===this.latestMeal);r>-1&&(this.meals=this.meals.slice(0,r+1))}this.showNothing&&this.meals.push({label:this.translate.instant("MEALS.NOTHING"),value:"nem k\xe9r \xe9tkez\xe9st",style:"nothing"})}setEarliestMeal(r){this.earliestMeal=r,this.setMeals()}setLatestMeal(r){this.latestMeal=r,this.setMeals()}handleOnChange(r){this.change.emit({value:r.value,field:this.controlName})}static#e=this.\u0275fac=function(m){return new(m||f)(i.Y36(g.sK))};static#t=this.\u0275cmp=i.Xpm({type:f,selectors:[["app-meal-selector"]],inputs:{parentForm:"parentForm",controlName:"controlName",showClear:"showClear",showNothing:"showNothing",earliestMeal:"earliestMeal",latestMeal:"latestMeal"},outputs:{change:"change"},features:[i.TTD],decls:3,vars:2,consts:[["optionLabel","label","optionValue","value","appendTo","body",3,"formControl","options","placeholder","emptyMessage","showClear","onChange",4,"ngIf","ngIfElse"],["useNgModel",""],["optionLabel","label","optionValue","value","appendTo","body",3,"formControl","options","placeholder","emptyMessage","showClear","onChange"],["pTemplate","item"],["pTemplate","selectedItem"],[3,"ngClass"],["optionLabel","label","optionValue","value","appendTo","body",3,"ngModel","options","placeholder","emptyMessage","showClear","ngModelChange","onChange"]],template:function(m,c){if(1&m&&(i.YNc(0,I,5,9,"p-dropdown",0),i.YNc(1,v,5,9,"ng-template",null,1,i.W1O)),2&m){const p=i.MAs(2);i.Q6J("ngIf",c.getFormControl())("ngIfElse",p)}},dependencies:[M.mk,M.O5,x.JJ,x.On,x.oH,D.jx,_.Lt,g.X$],encapsulation:2})}return f})()},219:(V,O,a)=>{a.d(O,{Z:()=>T});var i=a(5619),g=a(7398),M=a(6306),x=a(2096),D=a(2029),_=a(8814);let T=(()=>{class b{constructor(d){this.apiService=d,this.cache=[],this.apiURL=d.apiURL,this.data$=new i.X(null),this.message$=new i.X(null)}get conferenceObs(){return this.data$.asObservable()}get messageObs(){return this.message$.asObservable()}get(d,h,v,C){const f=localStorage.getItem("userrole"),w=localStorage.getItem("userid");if("Szervezo"===f&&w){const p=`organizer_user_id=${w}`;C=C?`${C}&${p}`:p}let r="";""!==v&&(r=""!=v.sortField?`sort=${v.sortField}&order=${1===v.sortOrder?"ASC":"DESC"}`:"");const m=""!==r&&""!==C?r+"&"+C:""!==r&&""===C?r:""===r&&""!==C?C:"";this.apiService.get(`conference/get/${d}/${h}${""!==m?"?"+m:""}`).subscribe({next:p=>{this.data$.next(p)},error:p=>{this.message$.next(p)}})}getBySearch(d,h){let v="";""!==h&&(v=""!=h.sortField?`?sort=${h.sortField}&order=${1===h.sortOrder?"ASC":"DESC"}`:""),this.apiService.get(`conference/search/${d}${v}`).subscribe({next:C=>{this.data$.next(C)},error:C=>{this.message$.next(C)}})}getBySearchQuery(d){this.apiService.get(`conference/searchquery?${d}`).subscribe({next:h=>{this.data$.next(h)},error:h=>{this.message$.next(h)}})}create(d){this.apiService.post("conference/create/",d).subscribe({next:h=>{this.message$.next({severity:"success",summary:"Sikeres konferencia r\xf6gz\xedt\xe9s",detail:`${d.name} r\xf6gz\xedtve`})},error:h=>{this.message$.next(h)}})}update(d){this.apiService.put(`conference/update/${d.id}`,d).subscribe({next:()=>{this.message$.next({severity:"success",summary:"Sikeres konferencia m\xf3dos\xedt\xe1s",detail:`${d.name} m\xf3dos\xedtva`})},error:h=>{this.message$.next(h)}})}delete(d){this.apiService.delete(`conference/delete/${d.id}`).subscribe({next:h=>{this.message$.next({severity:"success",summary:"Sikeres konferencia t\xf6rl\xe9s",detail:`${d.name} t\xf6r\xf6lve`})},error:h=>{this.message$.next(h)}})}bulkdelete(d){let h={ids:d.map(v=>v.id)};this.apiService.post("conference/bulkdelete",h).subscribe({next:v=>{this.message$.next({severity:"success",summary:"Sikeres konferencia t\xf6rl\xe9s",detail:`${d.length} konferencia t\xf6r\xf6lve`})},error:v=>{this.message$.next(v)}})}getConferencesForSelector(){return this.get(0,999,{sortField:"id",sortOrder:1},""),this.data$.asObservable().pipe((0,g.U)(h=>{const v=h?h.rows:[];return this.cache=v,v}))}getById(d){return this.apiService.get(`conference/getbyid/${d}`)}isSlugValid(d){return this.get(0,20,"slug=","sort"),this.data$.pipe((0,g.U)(h=>(console.log("isSlugValid response",h),h&&h.data&&h.rows.length>0)),(0,M.K)(()=>(0,x.of)(!1)))}static#e=this.\u0275fac=function(h){return new(h||b)(D.LFG(_.s))};static#t=this.\u0275prov=D.Yz7({token:b,factory:b.\u0275fac,providedIn:"root"})}return b})()},3139:(V,O,a)=>{a.d(O,{Q:()=>M});var i=a(8645),g=a(2029);let M=(()=>{class x{constructor(){this.mealChanged=new i.x,this.meals={breakfast:{begin:7,end:10},lunch:{begin:11,end:15},dinner:{begin:17,end:20}},this.checkMealStart(),setInterval(()=>{this.checkMealStart()},2e4)}checkMealStart(){const T=(new Date).getHours();for(const b of Object.keys(this.meals)){const I=this.meals[b];if(T>=I.begin&&T<I.end)return void this.mealChanged.next(b)}}getMealNameByTime(_){const T=_.getHours();for(const b in this.meals){const I=this.meals[b];if(T>=I.begin&&T<=I.end)return this.translateMealName(b)}return"Jelenleg nincs \xe9tkeztet\xe9s"}getMealsForSelector(){let _=[];for(const T in this.meals)_.push(this.translateMealName(T));return _}translateMealName(_){return{breakfast:"reggeli",lunch:"eb\xe9d",dinner:"vacsora"}[_]||_}isOpen(){const _=(new Date).getHours();for(const T in this.meals){const b=this.meals[T];if(_>=b.begin&&_<b.end)return!0}return!1}static#e=this.\u0275fac=function(T){return new(T||x)};static#t=this.\u0275prov=g.Yz7({token:x,factory:x.\u0275fac,providedIn:"root"})}return x})()},9444:(V,O,a)=>{a.d(O,{y:()=>I});var i=a(6814),g=a(6223),M=a(9515),x=a(2610),D=a(7213),_=a(9664),T=a(2285),b=a(2029);let I=(()=>{class d{static#e=this.\u0275fac=function(C){return new(C||d)};static#t=this.\u0275mod=b.oAB({type:d});static#i=this.\u0275inj=b.cJS({imports:[i.ez,g.u5,g.UX,M.aw,x.O,D.S,T.L,_.U$]})}return d})()},5389:(V,O,a)=>{a.d(O,{dp:()=>st});var i=a(6814),g=a(2029),M=a(5219),x=a(1712),D=a(4480),_=a(6489),T=a(6392),b=a(4562),I=a(3362),d=a(2314),h=a(2591),v=a(6005),C=a(4713);let f=(()=>{class t extends C.s{static \u0275fac=function(){let e;return function(o){return(e||(e=g.n5z(t)))(o||t)}}();static \u0275cmp=g.Xpm({type:t,selectors:[["MinusIcon"]],standalone:!0,features:[g.qOj,g.jDz],decls:2,vars:5,consts:[["width","14","height","14","viewBox","0 0 14 14","fill","none","xmlns","http://www.w3.org/2000/svg"],["d","M13.2222 7.77778H0.777778C0.571498 7.77778 0.373667 7.69584 0.227806 7.54998C0.0819442 7.40412 0 7.20629 0 7.00001C0 6.79373 0.0819442 6.5959 0.227806 6.45003C0.373667 6.30417 0.571498 6.22223 0.777778 6.22223H13.2222C13.4285 6.22223 13.6263 6.30417 13.7722 6.45003C13.9181 6.5959 14 6.79373 14 7.00001C14 7.20629 13.9181 7.40412 13.7722 7.54998C13.6263 7.69584 13.4285 7.77778 13.2222 7.77778Z","fill","currentColor"]],template:function(l,o){1&l&&(g.O4$(),g.TgZ(0,"svg",0),g._UZ(1,"path",1),g.qZA()),2&l&&(g.Tol(o.getClassNames()),g.uIk("aria-label",o.ariaLabel)("aria-hidden",o.ariaHidden)("role",o.role))},dependencies:[i.ez],encapsulation:2})}return t})();var w=a(3833),r=a(7273),m=a(8717);let st=(()=>{class t{static \u0275fac=function(l){return new(l||t)};static \u0275mod=g.oAB({type:t});static \u0275inj=g.cJS({imports:[i.ez,x.U,D.T,_.v,m.L,I.v,d.H,w.V,r.m,T.W,h.n,f,v.v,b.X,M.m8,_.v]})}return t})()}}]);