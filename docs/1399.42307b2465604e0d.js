"use strict";(self.webpackChunknfc_reserve=self.webpackChunknfc_reserve||[]).push([[1399],{7939:(O,T,r)=>{r.d(T,{H:()=>d});var t=r(2029),e=r(9515),v=r(6814),x=r(6223),M=r(5219),k=r(2352);function I(c,p){if(1&c&&(t.TgZ(0,"span",5),t._uU(1),t.qZA()),2&c){const n=p.$implicit;t.Q6J("ngClass","meal-badge "+(null==n?null:n.style)),t.xp6(1),t.hij(" ",n.label," ")}}function m(c,p){if(1&c&&(t.TgZ(0,"span",5),t._uU(1),t.qZA()),2&c){const n=p.$implicit;t.Q6J("ngClass","meal-badge "+(null==n?null:n.style)),t.xp6(1),t.hij(" ",null==n?null:n.label," ")}}function f(c,p){if(1&c){const n=t.EpF();t.TgZ(0,"p-dropdown",2),t.NdJ("onChange",function(b){t.CHM(n);const g=t.oxw();return t.KtG(g.handleOnChange(b))}),t.ALo(1,"translate"),t.ALo(2,"translate"),t.YNc(3,I,2,2,"ng-template",3),t.YNc(4,m,2,2,"ng-template",4),t.qZA()}if(2&c){const n=p.ngIf,u=t.oxw();t.s9C("placeholder",t.lcZ(1,5,"V\xe1lasszon...")),t.s9C("emptyMessage",t.lcZ(2,7,"Nincs tal\xe1lat...")),t.Q6J("formControl",n)("options",u.meals)("showClear",u.showClear)}}function a(c,p){if(1&c&&(t.TgZ(0,"span",5),t._uU(1),t.qZA()),2&c){const n=p.$implicit;t.Q6J("ngClass","meal-badge "+(null==n?null:n.style)),t.xp6(1),t.hij(" ",n.label," ")}}function s(c,p){if(1&c&&(t.TgZ(0,"span",5),t._uU(1),t.qZA()),2&c){const n=p.$implicit;t.Q6J("ngClass","meal-badge "+(null==n?null:n.style)),t.xp6(1),t.hij(" ",null==n?null:n.label," ")}}function h(c,p){if(1&c){const n=t.EpF();t.TgZ(0,"p-dropdown",6),t.NdJ("ngModelChange",function(b){t.CHM(n);const g=t.oxw();return t.KtG(g.selectedMeal=b)})("onChange",function(b){t.CHM(n);const g=t.oxw();return t.KtG(g.handleOnChange(b))}),t.ALo(1,"translate"),t.ALo(2,"translate"),t.YNc(3,a,2,2,"ng-template",3),t.YNc(4,s,2,2,"ng-template",4),t.qZA()}if(2&c){const n=t.oxw();t.s9C("placeholder",t.lcZ(1,5,"V\xe1lasszon...")),t.s9C("emptyMessage",t.lcZ(2,7,"Nincs tal\xe1lat...")),t.Q6J("ngModel",n.selectedMeal)("options",n.meals)("showClear",n.showClear)}}let d=(()=>{class c{constructor(n){this.translate=n,this.change=new t.vpe,this.meals=[],this.selectedMeal=""}ngOnInit(){this.translate.onLangChange.subscribe(()=>{this.setMeals()})}ngOnChanges(n){this.setMeals()}getFormControl(){return this.parentForm&&this.controlName?this.parentForm.get(this.controlName):null}setMeals(){if(this.meals=[{label:this.translate.instant("MEALS.BREAKFAST"),value:"reggeli",style:"breakfast"},{label:this.translate.instant("MEALS.LUNCH"),value:"eb\xe9d",style:"lunch"},{label:this.translate.instant("MEALS.DINNER"),value:"vacsora",style:"dinner"}],this.earliestMeal){const n=this.meals.findIndex(u=>u.value===this.earliestMeal);n>-1&&(this.meals=this.meals.slice(n))}if(this.latestMeal){const n=this.meals.findIndex(u=>u.value===this.latestMeal);n>-1&&(this.meals=this.meals.slice(0,n+1))}this.showNothing&&this.meals.push({label:this.translate.instant("MEALS.NOTHING"),value:"nem k\xe9r \xe9tkez\xe9st",style:"nothing"})}setEarliestMeal(n){this.earliestMeal=n,this.setMeals()}setLatestMeal(n){this.latestMeal=n,this.setMeals()}handleOnChange(n){this.change.emit({value:n.value,field:this.controlName})}static#e=this.\u0275fac=function(u){return new(u||c)(t.Y36(e.sK))};static#t=this.\u0275cmp=t.Xpm({type:c,selectors:[["app-meal-selector"]],inputs:{parentForm:"parentForm",controlName:"controlName",showClear:"showClear",showNothing:"showNothing",earliestMeal:"earliestMeal",latestMeal:"latestMeal"},outputs:{change:"change"},features:[t.TTD],decls:3,vars:2,consts:[["optionLabel","label","optionValue","value","appendTo","body",3,"formControl","options","placeholder","emptyMessage","showClear","onChange",4,"ngIf","ngIfElse"],["useNgModel",""],["optionLabel","label","optionValue","value","appendTo","body",3,"formControl","options","placeholder","emptyMessage","showClear","onChange"],["pTemplate","item"],["pTemplate","selectedItem"],[3,"ngClass"],["optionLabel","label","optionValue","value","appendTo","body",3,"ngModel","options","placeholder","emptyMessage","showClear","ngModelChange","onChange"]],template:function(u,b){if(1&u&&(t.YNc(0,f,5,9,"p-dropdown",0),t.YNc(1,h,5,9,"ng-template",null,1,t.W1O)),2&u){const g=t.MAs(2);t.Q6J("ngIf",b.getFormControl())("ngIfElse",g)}},dependencies:[v.mk,v.O5,x.JJ,x.On,x.oH,M.jx,k.Lt,e.X$],encapsulation:2})}return c})()},219:(O,T,r)=>{r.d(T,{Z:()=>I});var t=r(5619),e=r(7398),v=r(6306),x=r(2096),M=r(2029),k=r(8814);let I=(()=>{class m{constructor(a){this.apiService=a,this.cache=[],this.apiURL=a.apiURL,this.data$=new t.X(null),this.message$=new t.X(null)}get conferenceObs(){return this.data$.asObservable()}get messageObs(){return this.message$.asObservable()}get(a,s,h,d){const c=localStorage.getItem("userrole"),p=localStorage.getItem("userid");if("Szervezo"===c&&p){const g=`organizer_user_id=${p}`;d=d?`${d}&${g}`:g}let n="";""!==h&&(n=""!=h.sortField?`sort=${h.sortField}&order=${1===h.sortOrder?"ASC":"DESC"}`:"");const u=""!==n&&""!==d?n+"&"+d:""!==n&&""===d?n:""===n&&""!==d?d:"";this.apiService.get(`conference/get/${a}/${s}${""!==u?"?"+u:""}`).subscribe({next:g=>{this.data$.next(g)},error:g=>{this.message$.next(g)}})}getBySearch(a,s){let h="";""!==s&&(h=""!=s.sortField?`?sort=${s.sortField}&order=${1===s.sortOrder?"ASC":"DESC"}`:""),this.apiService.get(`conference/search/${a}${h}`).subscribe({next:d=>{this.data$.next(d)},error:d=>{this.message$.next(d)}})}getBySearchQuery(a){this.apiService.get(`conference/searchquery?${a}`).subscribe({next:s=>{this.data$.next(s)},error:s=>{this.message$.next(s)}})}create(a){this.apiService.post("conference/create/",a).subscribe({next:s=>{this.message$.next({severity:"success",summary:"Sikeres konferencia r\xf6gz\xedt\xe9s",detail:`${a.name} r\xf6gz\xedtve`})},error:s=>{this.message$.next(s)}})}update(a){this.apiService.put(`conference/update/${a.id}`,a).subscribe({next:()=>{this.message$.next({severity:"success",summary:"Sikeres konferencia m\xf3dos\xedt\xe1s",detail:`${a.name} m\xf3dos\xedtva`})},error:s=>{this.message$.next(s)}})}delete(a){this.apiService.delete(`conference/delete/${a.id}`).subscribe({next:s=>{this.message$.next({severity:"success",summary:"Sikeres konferencia t\xf6rl\xe9s",detail:`${a.name} t\xf6r\xf6lve`})},error:s=>{this.message$.next(s)}})}bulkdelete(a){let s={ids:a.map(h=>h.id)};this.apiService.post("conference/bulkdelete",s).subscribe({next:h=>{this.message$.next({severity:"success",summary:"Sikeres konferencia t\xf6rl\xe9s",detail:`${a.length} konferencia t\xf6r\xf6lve`})},error:h=>{this.message$.next(h)}})}getConferencesForSelector(){return this.get(0,999,{sortField:"id",sortOrder:1},""),this.data$.asObservable().pipe((0,e.U)(s=>{const h=s?s.rows:[];return this.cache=h,h}))}getById(a){return this.apiService.get(`conference/getbyid/${a}`)}isSlugValid(a){return this.get(0,20,"slug=","sort"),this.data$.pipe((0,e.U)(s=>(console.log("isSlugValid response",s),s&&s.data&&s.rows.length>0)),(0,v.K)(()=>(0,x.of)(!1)))}static#e=this.\u0275fac=function(s){return new(s||m)(M.LFG(k.s))};static#t=this.\u0275prov=M.Yz7({token:m,factory:m.\u0275fac,providedIn:"root"})}return m})()},3620:(O,T,r)=>{r.d(T,{b:()=>x});var t=r(2832),e=r(9360),v=r(8251);function x(M,k=t.z){return(0,e.e)((I,m)=>{let f=null,a=null,s=null;const h=()=>{if(f){f.unsubscribe(),f=null;const c=a;a=null,m.next(c)}};function d(){const c=s+M,p=k.now();if(p<c)return f=this.schedule(void 0,c-p),void m.add(f);h()}I.subscribe((0,v.x)(m,c=>{a=c,s=k.now(),f||(f=k.schedule(d,M),m.add(f))},()=>{h(),m.complete()},void 0,()=>{a=f=null}))})}},8057:(O,T,r)=>{r.d(T,{XZ:()=>S,nD:()=>A});var t=r(6814),e=r(2029),v=r(6223),x=r(2332),M=r(5219),k=r(2591);const I=["cb"];function m(o,C){if(1&o&&e._UZ(0,"span",10),2&o){const l=e.oxw(3);e.Q6J("ngClass",l.checkboxIcon)}}function f(o,C){1&o&&e._UZ(0,"CheckIcon",11),2&o&&e.Q6J("styleClass","p-checkbox-icon")}function a(o,C){if(1&o&&(e.ynx(0),e.YNc(1,m,1,1,"span",8),e.YNc(2,f,1,1,"CheckIcon",9),e.BQk()),2&o){const l=e.oxw(2);e.xp6(1),e.Q6J("ngIf",l.checkboxIcon),e.xp6(1),e.Q6J("ngIf",!l.checkboxIcon)}}function s(o,C){}function h(o,C){1&o&&e.YNc(0,s,0,0,"ng-template")}function d(o,C){if(1&o&&(e.TgZ(0,"span",12),e.YNc(1,h,1,0,null,13),e.qZA()),2&o){const l=e.oxw(2);e.xp6(1),e.Q6J("ngTemplateOutlet",l.checkboxIconTemplate)}}function c(o,C){if(1&o&&(e.ynx(0),e.YNc(1,a,3,2,"ng-container",5),e.YNc(2,d,2,1,"span",7),e.BQk()),2&o){const l=e.oxw();e.xp6(1),e.Q6J("ngIf",!l.checkboxIconTemplate),e.xp6(1),e.Q6J("ngIf",l.checkboxIconTemplate)}}const p=function(o,C,l){return{"p-checkbox-label":!0,"p-checkbox-label-active":o,"p-disabled":C,"p-checkbox-label-focus":l}};function n(o,C){if(1&o){const l=e.EpF();e.TgZ(0,"label",14),e.NdJ("click",function(i){e.CHM(l);const E=e.oxw(),y=e.MAs(3);return e.KtG(E.onClick(i,y,!0))}),e._uU(1),e.qZA()}if(2&o){const l=e.oxw();e.Tol(l.labelStyleClass),e.Q6J("ngClass",e.kEZ(5,p,l.checked(),l.disabled,l.focused)),e.uIk("for",l.inputId),e.xp6(1),e.Oqu(l.label)}}const u=function(o,C,l){return{"p-checkbox p-component":!0,"p-checkbox-checked":o,"p-checkbox-disabled":C,"p-checkbox-focused":l}},b=function(o,C,l){return{"p-highlight":o,"p-disabled":C,"p-focus":l}},g={provide:v.JU,useExisting:(0,e.Gpc)(()=>S),multi:!0};let S=(()=>{class o{cd;value;name;disabled;binary;label;ariaLabelledBy;ariaLabel;tabindex;inputId;style;styleClass;labelStyleClass;formControl;checkboxIcon;readonly;required;trueValue=!0;falseValue=!1;onChange=new e.vpe;inputViewChild;templates;checkboxIconTemplate;model;onModelChange=()=>{};onModelTouched=()=>{};focused=!1;constructor(l){this.cd=l}ngAfterContentInit(){this.templates.forEach(l=>{"icon"===l.getType()&&(this.checkboxIconTemplate=l.template)})}onClick(l,_,i){l.preventDefault(),!this.disabled&&!this.readonly&&(this.updateModel(l),i&&_.focus())}updateModel(l){let _;this.binary?(_=this.checked()?this.falseValue:this.trueValue,this.model=_,this.onModelChange(_)):(_=this.checked()?this.model.filter(i=>!x.gb.equals(i,this.value)):this.model?[...this.model,this.value]:[this.value],this.onModelChange(_),this.model=_,this.formControl&&this.formControl.setValue(_)),this.onChange.emit({checked:_,originalEvent:l})}handleChange(l){this.readonly||this.updateModel(l)}onFocus(){this.focused=!0}onBlur(){this.focused=!1,this.onModelTouched()}focus(){this.inputViewChild?.nativeElement.focus()}writeValue(l){this.model=l,this.cd.markForCheck()}registerOnChange(l){this.onModelChange=l}registerOnTouched(l){this.onModelTouched=l}setDisabledState(l){this.disabled=l,this.cd.markForCheck()}checked(){return this.binary?this.model===this.trueValue:x.gb.contains(this.value,this.model)}static \u0275fac=function(_){return new(_||o)(e.Y36(e.sBO))};static \u0275cmp=e.Xpm({type:o,selectors:[["p-checkbox"]],contentQueries:function(_,i,E){if(1&_&&e.Suo(E,M.jx,4),2&_){let y;e.iGM(y=e.CRH())&&(i.templates=y)}},viewQuery:function(_,i){if(1&_&&e.Gf(I,5),2&_){let E;e.iGM(E=e.CRH())&&(i.inputViewChild=E.first)}},hostAttrs:[1,"p-element"],inputs:{value:"value",name:"name",disabled:"disabled",binary:"binary",label:"label",ariaLabelledBy:"ariaLabelledBy",ariaLabel:"ariaLabel",tabindex:"tabindex",inputId:"inputId",style:"style",styleClass:"styleClass",labelStyleClass:"labelStyleClass",formControl:"formControl",checkboxIcon:"checkboxIcon",readonly:"readonly",required:"required",trueValue:"trueValue",falseValue:"falseValue"},outputs:{onChange:"onChange"},features:[e._Bn([g])],decls:7,vars:26,consts:[[3,"ngStyle","ngClass"],[1,"p-hidden-accessible"],["type","checkbox",3,"readonly","value","checked","disabled","focus","blur","change"],["cb",""],[1,"p-checkbox-box",3,"ngClass","click"],[4,"ngIf"],[3,"class","ngClass","click",4,"ngIf"],["class","p-checkbox-icon",4,"ngIf"],["class","p-checkbox-icon",3,"ngClass",4,"ngIf"],[3,"styleClass",4,"ngIf"],[1,"p-checkbox-icon",3,"ngClass"],[3,"styleClass"],[1,"p-checkbox-icon"],[4,"ngTemplateOutlet"],[3,"ngClass","click"]],template:function(_,i){if(1&_){const E=e.EpF();e.TgZ(0,"div",0)(1,"div",1)(2,"input",2,3),e.NdJ("focus",function(){return i.onFocus()})("blur",function(){return i.onBlur()})("change",function(D){return i.handleChange(D)}),e.qZA()(),e.TgZ(4,"div",4),e.NdJ("click",function(D){e.CHM(E);const L=e.MAs(3);return e.KtG(i.onClick(D,L,!0))}),e.YNc(5,c,3,2,"ng-container",5),e.qZA()(),e.YNc(6,n,2,9,"label",6)}2&_&&(e.Tol(i.styleClass),e.Q6J("ngStyle",i.style)("ngClass",e.kEZ(18,u,i.checked(),i.disabled,i.focused)),e.xp6(2),e.Q6J("readonly",i.readonly)("value",i.value)("checked",i.checked())("disabled",i.disabled),e.uIk("id",i.inputId)("name",i.name)("tabindex",i.tabindex)("aria-labelledby",i.ariaLabelledBy)("aria-label",i.ariaLabel)("aria-checked",i.checked())("required",i.required),e.xp6(2),e.Q6J("ngClass",e.kEZ(22,b,i.checked(),i.disabled,i.focused)),e.xp6(1),e.Q6J("ngIf",i.checked()),e.xp6(1),e.Q6J("ngIf",i.label))},dependencies:function(){return[t.mk,t.O5,t.tP,t.PC,k.n]},styles:[".p-checkbox{display:inline-flex;cursor:pointer;-webkit-user-select:none;user-select:none;vertical-align:bottom;position:relative}.p-checkbox-disabled{cursor:default!important;pointer-events:none}.p-checkbox-box{display:flex;justify-content:center;align-items:center}p-checkbox{display:inline-flex;vertical-align:bottom;align-items:center}.p-checkbox-label{line-height:1}\n"],encapsulation:2,changeDetection:0})}return o})(),A=(()=>{class o{static \u0275fac=function(_){return new(_||o)};static \u0275mod=e.oAB({type:o});static \u0275inj=e.cJS({imports:[t.ez,k.n,M.m8]})}return o})()}}]);