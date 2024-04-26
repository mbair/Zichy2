"use strict";(self.webpackChunknfc_reserve=self.webpackChunknfc_reserve||[]).push([[7134],{7134:(J,b,c)=>{c.r(b),c.d(b,{FoodCounterModule:()=>g});var m=c(6814),t=c(2129),C=c(5219),e=c(9468),v=c(746),x=c(8645);let y=(()=>{class r{constructor(){this.mealChanged=new x.x,this.mealTimes={breakfast:{begin:7,end:10},lunch:{begin:11,end:15},dinner:{begin:17,end:20}},this.checkMealStart(),setInterval(()=>{this.checkMealStart()},2e4)}checkMealStart(){const l=(new Date).getHours();for(const o of Object.keys(this.mealTimes)){const p=this.mealTimes[o];if(l>=p.begin&&l<p.end)return void this.mealChanged.next(o)}}getCurrentMealName(){const a=(new Date).getHours();for(const l in this.mealTimes){const o=this.mealTimes[l];if(a>=o.begin&&a<o.end)return this.translateMealName(l)}return"Jelenleg nincs \xe9tkeztet\xe9s"}translateMealName(a){return{breakfast:"Reggeli",lunch:"Eb\xe9d",dinner:"Vacsora"}[a]||a}isOpen(){const a=(new Date).getHours();for(const l in this.mealTimes){const o=this.mealTimes[l];if(a>=o.begin&&a<o.end)return!0}return!1}static#e=this.\u0275fac=function(l){return new(l||r)};static#t=this.\u0275prov=e.Yz7({token:r,factory:r.\u0275fac,providedIn:"root"})}return r})();function T(r,_){if(1&r){const a=e.EpF();e.TgZ(0,"button",16),e.NdJ("click",function(){e.CHM(a);const o=e.oxw();return e.KtG(o.incMealsCount())}),e.TgZ(1,"span",17),e._uU(2," \xc9tel kiadva "),e.qZA()()}}function M(r,_){1&r&&(e.TgZ(0,"button",18)(1,"span",17),e._uU(2," M\xe1r \xe1tvett \xe9tel "),e.qZA()())}function E(r,_){1&r&&(e.TgZ(0,"button",18)(1,"span",17),e._uU(2," Jelenleg nincs \xe9tkeztet\xe9s "),e.qZA()())}let I=(()=>{class r{constructor(a,l,o,p){this.router=a,this.guestService=l,this.mealService=o,this.messageService=p,this.mealsNumber=0,this.loading=!1,this.alreadyRecievedFood=!1,this.ageGroup="",this.scanTemp="",this.scannedCode="",this.windowWidth=window.innerWidth||document.documentElement.clientWidth,this.windowHeight=window.innerHeight||document.documentElement.clientHeight}ngOnInit(){this.guestsObs$=this.guestService.guestObs,this.guestsObs$.subscribe(a=>{this.loading=!1,a&&(this.guests=a)}),this.guest={lastName:"",firstName:"",diet:"",conferenceName:""},this.mealService.mealChanged.subscribe(()=>{this.updateCurrentMeal()}),this.updateCurrentMeal()}incMealsCount(){this.mealsNumber++}keyEvent(a){if("Enter"===a.key)this.scannedCode=this.scanTemp,this.scanTemp="",console.log("scannedCode",this.scannedCode),this.getGuestByRFID(this.scannedCode);else if("\xf6"===a.key)this.scanTemp+="0";else{if(!/^[0-9]$/i.test(a.key))return;this.scanTemp+=a.key}}onResize(a){this.windowWidth=window.innerWidth||document.documentElement.clientWidth,this.windowHeight=window.innerHeight||document.documentElement.clientHeight}updateCurrentMeal(){this.isOpen=this.mealService.isOpen();let a=this.mealService.getCurrentMealName();a!==this.currentMeal&&(this.currentMeal=a,this.mealsNumber=0)}getGuestByRFID(a){console.log("getGuestByRFID",a),this.guestService.getByRFID(a).subscribe({next:l=>{if(this.guest=l,console.log("Guest data:",l),this.setAgeGroup(this.guest.birthDate),l.lastRfidUsage){let o=new Date(l.lastRfidUsage);(new Date).getTime()-o.getTime()>=72e5&&(this.alreadyRecievedFood=!0)}else{this.mealsNumber++;let o=(new Date).toLocaleString("hu",{timeZoneName:"short"});console.log("now",o),this.guest.lastRfidUsage=o,this.guestService.updateGuest(this.guest)}},error:l=>{console.error("Error:",l)}})}setAgeGroup(a){if(a){let l=new Date(a),o=Date.now()-l.getTime(),p=new Date(o);this.ageGroup=Math.abs(p.getUTCFullYear()-1970)>=10?"feln\u0151tt":"gyermek"}else this.ageGroup="Hib\xe1s d\xe1tum"}ngOnDestroy(){}static#e=this.\u0275fac=function(l){return new(l||r)(e.Y36(t.F0),e.Y36(v.Q),e.Y36(y),e.Y36(C.ez))};static#t=this.\u0275cmp=e.Xpm({type:r,selectors:[["food-counter"]],hostBindings:function(l,o){1&l&&e.NdJ("keypress",function(f){return o.keyEvent(f)},!1,e.Jf7)("resize",function(f){return o.onResize(f)},!1,e.Jf7)},features:[e._Bn([C.ez])],decls:56,vars:13,consts:[[1,"relative","overflow-hidden","flex","flex-column","justify-content-center"],[1,"header",3,"ngClass"],[1,"p-1","font-medium","text-center","text-2xl","text-white","white-space-nowrap"],[1,"absolute","top-0","right-0","p-2","text-white","text-sm"],[1,"surface-ground","px-4","py-4"],[1,"grid"],[1,"col-12","md:col-12","lg:col-6","p-2"],[1,"info-box","surface-card","shadow-2","p-3","border-round","border-teal-500"],[1,"flex","justify-content-between"],[1,"block","text-500","text-xl","font-medium","mb-3"],[1,"text-900","font-medium","text-2xl"],[1,"grid","mt-1"],[1,"surface-card","shadow-2","border-round"],[1,"flex","align-items-center","justify-content-center","gap-2"],["class","flex align-items-center justify-content-center w-full h-fullgap-2 bg-teal-500 shadow-1 border-round-sm border-none cursor-pointer hover:bg-teal-600 transition-duration-200","style","min-height: 80px;",3,"click",4,"ngIf"],["class","flex align-items-center justify-content-center w-full h-fullgap-2 bg-red-500 shadow-1 border-round-sm border-none cursor-pointer hover:bg-red-600 transition-duration-200","style","min-height: 80px;",4,"ngIf"],[1,"flex","align-items-center","justify-content-center","w-full","h-fullgap-2","bg-teal-500","shadow-1","border-round-sm","border-none","cursor-pointer","hover:bg-teal-600","transition-duration-200",2,"min-height","80px",3,"click"],[1,"font-medium","text-2xl","text-white","white-space-nowrap"],[1,"flex","align-items-center","justify-content-center","w-full","h-fullgap-2","bg-red-500","shadow-1","border-round-sm","border-none","cursor-pointer","hover:bg-red-600","transition-duration-200",2,"min-height","80px"]],template:function(l,o){1&l&&(e.TgZ(0,"div",0)(1,"div",1)(2,"div",2),e._uU(3),e.qZA(),e.TgZ(4,"div",3),e._uU(5),e.qZA()(),e.TgZ(6,"div",4)(7,"div",5)(8,"div",6)(9,"div",7)(10,"div",8)(11,"div")(12,"span",9),e._uU(13,"Vend\xe9g"),e.qZA(),e.TgZ(14,"div",10),e._uU(15),e.qZA()()()()(),e.TgZ(16,"div",6)(17,"div",7)(18,"div",8)(19,"div")(20,"span",9),e._uU(21,"\xc9trend"),e.qZA(),e.TgZ(22,"div",10),e._uU(23),e.qZA()()()()()(),e.TgZ(24,"div",11)(25,"div",6)(26,"div",7)(27,"div",8)(28,"div")(29,"span",9),e._uU(30,"Koroszt\xe1ly"),e.qZA(),e.TgZ(31,"div",10),e._uU(32),e.qZA()()()()(),e.TgZ(33,"div",6)(34,"div",7)(35,"div",8)(36,"div")(37,"span",9),e._uU(38,"Konferencia"),e.qZA(),e.TgZ(39,"div",10),e._uU(40),e.qZA()()()()()(),e.TgZ(41,"div",11)(42,"div",6)(43,"div",7)(44,"div",8)(45,"div")(46,"span",9),e._uU(47,"M\xe1r kiadott \xe9telek sz\xe1ma"),e.qZA(),e.TgZ(48,"div",10),e._uU(49),e.qZA()()()()(),e.TgZ(50,"div",6)(51,"div",12)(52,"div",13),e.YNc(53,T,3,0,"button",14),e.YNc(54,M,3,0,"button",15),e.YNc(55,E,3,0,"button",15),e.qZA()()()()()()),2&l&&(e.xp6(1),e.Q6J("ngClass",o.isOpen?"bg-teal-500":"bg-red-500"),e.xp6(2),e.hij(" ",o.currentMeal||"Jelenleg nincs \xe9tkeztet\xe9s!"," "),e.xp6(2),e.AsE(" ",o.windowWidth,"x",o.windowHeight," "),e.xp6(10),e.AsE(" ",o.guest.lastName," ",o.guest.firstName,"\xa0 "),e.xp6(8),e.hij("",o.guest.diet,"\xa0"),e.xp6(9),e.hij("",o.ageGroup,"\xa0"),e.xp6(8),e.hij("",o.guest.conferenceName,"\xa0"),e.xp6(9),e.Oqu(o.mealsNumber),e.xp6(4),e.Q6J("ngIf",o.isOpen&&!o.alreadyRecievedFood),e.xp6(1),e.Q6J("ngIf",o.isOpen&&o.alreadyRecievedFood),e.xp6(1),e.Q6J("ngIf",!o.isOpen))},dependencies:[m.mk,m.O5]})}return r})();var Z=c(9502);let A=(()=>{class r{static#e=this.\u0275fac=function(l){return new(l||r)};static#t=this.\u0275mod=e.oAB({type:r});static#n=this.\u0275inj=e.cJS({imports:[t.Bz.forChild([{path:"",component:I}]),Z.$,t.Bz]})}return r})();var D=c(707),O=c(1913),F=c(1567),N=c(95),U=c(3714),k=c(8057),B=c(6760),i=c(3965),d=c(4532),n=c(3722),u=c(1865),s=c(4104),h=c(3259);let g=(()=>{class r{static#e=this.\u0275fac=function(l){return new(l||r)};static#t=this.\u0275mod=e.oAB({type:r});static#n=this.\u0275inj=e.cJS({imports:[m.ez,A,N.UX,U.j,k.nD,B._8,i.kW,d.d,n.O,D.hJ,u.cc,t.Bz,O.l,F.h,s.EV,h.z]})}return r})()},8057:(J,b,c)=>{c.d(b,{XZ:()=>k,nD:()=>B});var m=c(6814),t=c(9468),C=c(95),e=c(2332),v=c(5219),x=c(2591);const y=["cb"];function T(i,d){if(1&i&&t._UZ(0,"span",10),2&i){const n=t.oxw(3);t.Q6J("ngClass",n.checkboxIcon)}}function M(i,d){1&i&&t._UZ(0,"CheckIcon",11),2&i&&t.Q6J("styleClass","p-checkbox-icon")}function E(i,d){if(1&i&&(t.ynx(0),t.YNc(1,T,1,1,"span",8),t.YNc(2,M,1,1,"CheckIcon",9),t.BQk()),2&i){const n=t.oxw(2);t.xp6(1),t.Q6J("ngIf",n.checkboxIcon),t.xp6(1),t.Q6J("ngIf",!n.checkboxIcon)}}function w(i,d){}function I(i,d){1&i&&t.YNc(0,w,0,0,"ng-template")}function Z(i,d){if(1&i&&(t.TgZ(0,"span",12),t.YNc(1,I,1,0,null,13),t.qZA()),2&i){const n=t.oxw(2);t.xp6(1),t.Q6J("ngTemplateOutlet",n.checkboxIconTemplate)}}function A(i,d){if(1&i&&(t.ynx(0),t.YNc(1,E,3,2,"ng-container",5),t.YNc(2,Z,2,1,"span",7),t.BQk()),2&i){const n=t.oxw();t.xp6(1),t.Q6J("ngIf",!n.checkboxIconTemplate),t.xp6(1),t.Q6J("ngIf",n.checkboxIconTemplate)}}const D=function(i,d,n){return{"p-checkbox-label":!0,"p-checkbox-label-active":i,"p-disabled":d,"p-checkbox-label-focus":n}};function O(i,d){if(1&i){const n=t.EpF();t.TgZ(0,"label",14),t.NdJ("click",function(s){t.CHM(n);const h=t.oxw(),g=t.MAs(3);return t.KtG(h.onClick(s,g,!0))}),t._uU(1),t.qZA()}if(2&i){const n=t.oxw();t.Tol(n.labelStyleClass),t.Q6J("ngClass",t.kEZ(5,D,n.checked(),n.disabled,n.focused)),t.uIk("for",n.inputId),t.xp6(1),t.Oqu(n.label)}}const F=function(i,d,n){return{"p-checkbox p-component":!0,"p-checkbox-checked":i,"p-checkbox-disabled":d,"p-checkbox-focused":n}},N=function(i,d,n){return{"p-highlight":i,"p-disabled":d,"p-focus":n}},U={provide:C.JU,useExisting:(0,t.Gpc)(()=>k),multi:!0};let k=(()=>{class i{cd;value;name;disabled;binary;label;ariaLabelledBy;ariaLabel;tabindex;inputId;style;styleClass;labelStyleClass;formControl;checkboxIcon;readonly;required;trueValue=!0;falseValue=!1;onChange=new t.vpe;inputViewChild;templates;checkboxIconTemplate;model;onModelChange=()=>{};onModelTouched=()=>{};focused=!1;constructor(n){this.cd=n}ngAfterContentInit(){this.templates.forEach(n=>{"icon"===n.getType()&&(this.checkboxIconTemplate=n.template)})}onClick(n,u,s){n.preventDefault(),!this.disabled&&!this.readonly&&(this.updateModel(n),s&&u.focus())}updateModel(n){let u;this.binary?(u=this.checked()?this.falseValue:this.trueValue,this.model=u,this.onModelChange(u)):(u=this.checked()?this.model.filter(s=>!e.gb.equals(s,this.value)):this.model?[...this.model,this.value]:[this.value],this.onModelChange(u),this.model=u,this.formControl&&this.formControl.setValue(u)),this.onChange.emit({checked:u,originalEvent:n})}handleChange(n){this.readonly||this.updateModel(n)}onFocus(){this.focused=!0}onBlur(){this.focused=!1,this.onModelTouched()}focus(){this.inputViewChild?.nativeElement.focus()}writeValue(n){this.model=n,this.cd.markForCheck()}registerOnChange(n){this.onModelChange=n}registerOnTouched(n){this.onModelTouched=n}setDisabledState(n){this.disabled=n,this.cd.markForCheck()}checked(){return this.binary?this.model===this.trueValue:e.gb.contains(this.value,this.model)}static \u0275fac=function(u){return new(u||i)(t.Y36(t.sBO))};static \u0275cmp=t.Xpm({type:i,selectors:[["p-checkbox"]],contentQueries:function(u,s,h){if(1&u&&t.Suo(h,v.jx,4),2&u){let g;t.iGM(g=t.CRH())&&(s.templates=g)}},viewQuery:function(u,s){if(1&u&&t.Gf(y,5),2&u){let h;t.iGM(h=t.CRH())&&(s.inputViewChild=h.first)}},hostAttrs:[1,"p-element"],inputs:{value:"value",name:"name",disabled:"disabled",binary:"binary",label:"label",ariaLabelledBy:"ariaLabelledBy",ariaLabel:"ariaLabel",tabindex:"tabindex",inputId:"inputId",style:"style",styleClass:"styleClass",labelStyleClass:"labelStyleClass",formControl:"formControl",checkboxIcon:"checkboxIcon",readonly:"readonly",required:"required",trueValue:"trueValue",falseValue:"falseValue"},outputs:{onChange:"onChange"},features:[t._Bn([U])],decls:7,vars:26,consts:[[3,"ngStyle","ngClass"],[1,"p-hidden-accessible"],["type","checkbox",3,"readonly","value","checked","disabled","focus","blur","change"],["cb",""],[1,"p-checkbox-box",3,"ngClass","click"],[4,"ngIf"],[3,"class","ngClass","click",4,"ngIf"],["class","p-checkbox-icon",4,"ngIf"],["class","p-checkbox-icon",3,"ngClass",4,"ngIf"],[3,"styleClass",4,"ngIf"],[1,"p-checkbox-icon",3,"ngClass"],[3,"styleClass"],[1,"p-checkbox-icon"],[4,"ngTemplateOutlet"],[3,"ngClass","click"]],template:function(u,s){if(1&u){const h=t.EpF();t.TgZ(0,"div",0)(1,"div",1)(2,"input",2,3),t.NdJ("focus",function(){return s.onFocus()})("blur",function(){return s.onBlur()})("change",function(r){return s.handleChange(r)}),t.qZA()(),t.TgZ(4,"div",4),t.NdJ("click",function(r){t.CHM(h);const _=t.MAs(3);return t.KtG(s.onClick(r,_,!0))}),t.YNc(5,A,3,2,"ng-container",5),t.qZA()(),t.YNc(6,O,2,9,"label",6)}2&u&&(t.Tol(s.styleClass),t.Q6J("ngStyle",s.style)("ngClass",t.kEZ(18,F,s.checked(),s.disabled,s.focused)),t.xp6(2),t.Q6J("readonly",s.readonly)("value",s.value)("checked",s.checked())("disabled",s.disabled),t.uIk("id",s.inputId)("name",s.name)("tabindex",s.tabindex)("aria-labelledby",s.ariaLabelledBy)("aria-label",s.ariaLabel)("aria-checked",s.checked())("required",s.required),t.xp6(2),t.Q6J("ngClass",t.kEZ(22,N,s.checked(),s.disabled,s.focused)),t.xp6(1),t.Q6J("ngIf",s.checked()),t.xp6(1),t.Q6J("ngIf",s.label))},dependencies:function(){return[m.mk,m.O5,m.tP,m.PC,x.n]},styles:[".p-checkbox{display:inline-flex;cursor:pointer;-webkit-user-select:none;user-select:none;vertical-align:bottom;position:relative}.p-checkbox-disabled{cursor:default!important;pointer-events:none}.p-checkbox-box{display:flex;justify-content:center;align-items:center}p-checkbox{display:inline-flex;vertical-align:bottom;align-items:center}.p-checkbox-label{line-height:1}\n"],encapsulation:2,changeDetection:0})}return i})(),B=(()=>{class i{static \u0275fac=function(u){return new(u||i)};static \u0275mod=t.oAB({type:i});static \u0275inj=t.cJS({imports:[m.ez,x.n,v.m8]})}return i})()}}]);