"use strict";(self.webpackChunknfc_reserve=self.webpackChunknfc_reserve||[]).push([[9488],{9488:(B,h,l)=>{l.r(h),l.d(h,{FoodCounterModule:()=>s});var d=l(6814),e=l(2129),p=l(5219),n=l(9468),f=l(746);let g=(()=>{class a{constructor(i,t,c){this.router=i,this.dataService=t,this.messageService=c,this.mealsNumber=0,this.loading=!1,this.ageGroup="",this.scanTemp="",this.scannedCode=""}ngOnInit(){this.guestsObs$=this.dataService.guestObs,this.guestsObs$.subscribe(i=>{this.loading=!1,i&&(this.guests=i)}),this.dataService.getGuests()}incMealsCount(){this.mealsNumber++}keyEvent(i){if("Enter"===i.key)this.scannedCode=this.scanTemp,this.scanTemp="",console.log("scannedCode",this.scannedCode),this.guests.map(t=>{t.rfid===this.scannedCode&&(this.guest=t,this.mealsNumber++)});else if("\xf6"===i.key)this.scanTemp+="0";else{if(!/^[0-9]$/i.test(i.key))return;this.scanTemp+=i.key}}ngOnDestroy(){}static#e=this.\u0275fac=function(t){return new(t||a)(n.Y36(e.F0),n.Y36(f.Q),n.Y36(p.ez))};static#n=this.\u0275cmp=n.Xpm({type:a,selectors:[["food-counter"]],hostBindings:function(t,c){1&t&&n.NdJ("keypress",function(u){return c.keyEvent(u)},!1,n.Jf7)},features:[n._Bn([p.ez])],decls:54,vars:6,consts:[[1,"relative","overflow-hidden","flex","flex-column","justify-content-center"],[1,"header","bg-teal-500"],[1,"p-5","font-medium","text-center","text-5xl","text-white","white-space-nowrap"],[1,"surface-ground","px-5","py-5"],[1,"grid"],[1,"col-12","md:col-12","lg:col-6"],[1,"info-box","surface-card","shadow-2","p-5","border-round","border-teal-500"],[1,"flex","justify-content-between"],[1,"block","text-500","text-3xl","font-medium","mb-3"],[1,"text-900","font-medium","text-5xl"],[1,"grid","mt-1"],[1,"surface-card","shadow-2","border-round"],[1,"flex","align-items-center","justify-content-center","gap-2"],[1,"flex","align-items-center","justify-content-center","w-full","h-fullgap-2","bg-teal-500","shadow-1","border-round-sm","border-none","cursor-pointer","hover:bg-teal-600","transition-duration-200",2,"min-height","160px",3,"click"],[1,"font-medium","text-5xl","text-white","white-space-nowrap"]],template:function(t,c){1&t&&(n.TgZ(0,"div",0)(1,"div",1)(2,"div",2),n._uU(3," Eb\xe9d "),n.qZA()(),n.TgZ(4,"div",3)(5,"div",4)(6,"div",5)(7,"div",6)(8,"div",7)(9,"div")(10,"span",8),n._uU(11,"Vend\xe9g"),n.qZA(),n.TgZ(12,"div",9),n._uU(13),n.qZA()()()()(),n.TgZ(14,"div",5)(15,"div",6)(16,"div",7)(17,"div")(18,"span",8),n._uU(19,"\xc9trend"),n.qZA(),n.TgZ(20,"div",9),n._uU(21),n.qZA()()()()()(),n.TgZ(22,"div",10)(23,"div",5)(24,"div",6)(25,"div",7)(26,"div")(27,"span",8),n._uU(28,"Koroszt\xe1ly"),n.qZA(),n.TgZ(29,"div",9),n._uU(30),n.qZA()()()()(),n.TgZ(31,"div",5)(32,"div",6)(33,"div",7)(34,"div")(35,"span",8),n._uU(36,"Konferencia"),n.qZA(),n.TgZ(37,"div",9),n._uU(38),n.qZA()()()()()(),n.TgZ(39,"div",10)(40,"div",5)(41,"div",6)(42,"div",7)(43,"div")(44,"span",8),n._uU(45,"M\xe1r kiadott \xe9telek sz\xe1ma"),n.qZA(),n.TgZ(46,"div",9),n._uU(47),n.qZA()()()()(),n.TgZ(48,"div",5)(49,"div",11)(50,"div",12)(51,"button",13),n.NdJ("click",function(){return c.incMealsCount()}),n.TgZ(52,"span",14),n._uU(53," \xc9tel kiadva "),n.qZA()()()()()()()()),2&t&&(n.xp6(13),n.AsE(" ",null==c.guest?null:c.guest.lastName," ",null==c.guest?null:c.guest.firstName," "),n.xp6(8),n.Oqu(null==c.guest?null:c.guest.diet),n.xp6(9),n.Oqu(c.ageGroup),n.xp6(8),n.Oqu(null==c.guest?null:c.guest.conferenceName),n.xp6(9),n.Oqu(c.mealsNumber))}})}return a})();var b=l(9502);let C=(()=>{class a{static#e=this.\u0275fac=function(t){return new(t||a)};static#n=this.\u0275mod=n.oAB({type:a});static#t=this.\u0275inj=n.cJS({imports:[e.Bz.forChild([{path:"",component:g}]),b.$,e.Bz]})}return a})();var v=l(707),k=l(1913),x=l(1567),_=l(95),y=l(3714),T=l(8057),E=l(6760),I=l(3965),M=l(4532),Z=l(3722),A=l(1865),m=l(4104),O=l(3259);let s=(()=>{class a{static#e=this.\u0275fac=function(t){return new(t||a)};static#n=this.\u0275mod=n.oAB({type:a});static#t=this.\u0275inj=n.cJS({imports:[d.ez,C,_.UX,y.j,T.nD,E._8,I.kW,M.d,Z.O,v.hJ,A.cc,e.Bz,k.l,x.h,m.EV,O.z]})}return a})()},8057:(B,h,l)=>{l.d(h,{XZ:()=>m,nD:()=>O});var d=l(6814),e=l(9468),p=l(95),n=l(2332),f=l(5219),g=l(2591);const b=["cb"];function C(s,a){if(1&s&&e._UZ(0,"span",10),2&s){const o=e.oxw(3);e.Q6J("ngClass",o.checkboxIcon)}}function v(s,a){1&s&&e._UZ(0,"CheckIcon",11),2&s&&e.Q6J("styleClass","p-checkbox-icon")}function k(s,a){if(1&s&&(e.ynx(0),e.YNc(1,C,1,1,"span",8),e.YNc(2,v,1,1,"CheckIcon",9),e.BQk()),2&s){const o=e.oxw(2);e.xp6(1),e.Q6J("ngIf",o.checkboxIcon),e.xp6(1),e.Q6J("ngIf",!o.checkboxIcon)}}function x(s,a){}function _(s,a){1&s&&e.YNc(0,x,0,0,"ng-template")}function y(s,a){if(1&s&&(e.TgZ(0,"span",12),e.YNc(1,_,1,0,null,13),e.qZA()),2&s){const o=e.oxw(2);e.xp6(1),e.Q6J("ngTemplateOutlet",o.checkboxIconTemplate)}}function T(s,a){if(1&s&&(e.ynx(0),e.YNc(1,k,3,2,"ng-container",5),e.YNc(2,y,2,1,"span",7),e.BQk()),2&s){const o=e.oxw();e.xp6(1),e.Q6J("ngIf",!o.checkboxIconTemplate),e.xp6(1),e.Q6J("ngIf",o.checkboxIconTemplate)}}const E=function(s,a,o){return{"p-checkbox-label":!0,"p-checkbox-label-active":s,"p-disabled":a,"p-checkbox-label-focus":o}};function I(s,a){if(1&s){const o=e.EpF();e.TgZ(0,"label",14),e.NdJ("click",function(t){e.CHM(o);const c=e.oxw(),r=e.MAs(3);return e.KtG(c.onClick(t,r,!0))}),e._uU(1),e.qZA()}if(2&s){const o=e.oxw();e.Tol(o.labelStyleClass),e.Q6J("ngClass",e.kEZ(5,E,o.checked(),o.disabled,o.focused)),e.uIk("for",o.inputId),e.xp6(1),e.Oqu(o.label)}}const M=function(s,a,o){return{"p-checkbox p-component":!0,"p-checkbox-checked":s,"p-checkbox-disabled":a,"p-checkbox-focused":o}},Z=function(s,a,o){return{"p-highlight":s,"p-disabled":a,"p-focus":o}},A={provide:p.JU,useExisting:(0,e.Gpc)(()=>m),multi:!0};let m=(()=>{class s{cd;value;name;disabled;binary;label;ariaLabelledBy;ariaLabel;tabindex;inputId;style;styleClass;labelStyleClass;formControl;checkboxIcon;readonly;required;trueValue=!0;falseValue=!1;onChange=new e.vpe;inputViewChild;templates;checkboxIconTemplate;model;onModelChange=()=>{};onModelTouched=()=>{};focused=!1;constructor(o){this.cd=o}ngAfterContentInit(){this.templates.forEach(o=>{"icon"===o.getType()&&(this.checkboxIconTemplate=o.template)})}onClick(o,i,t){o.preventDefault(),!this.disabled&&!this.readonly&&(this.updateModel(o),t&&i.focus())}updateModel(o){let i;this.binary?(i=this.checked()?this.falseValue:this.trueValue,this.model=i,this.onModelChange(i)):(i=this.checked()?this.model.filter(t=>!n.gb.equals(t,this.value)):this.model?[...this.model,this.value]:[this.value],this.onModelChange(i),this.model=i,this.formControl&&this.formControl.setValue(i)),this.onChange.emit({checked:i,originalEvent:o})}handleChange(o){this.readonly||this.updateModel(o)}onFocus(){this.focused=!0}onBlur(){this.focused=!1,this.onModelTouched()}focus(){this.inputViewChild?.nativeElement.focus()}writeValue(o){this.model=o,this.cd.markForCheck()}registerOnChange(o){this.onModelChange=o}registerOnTouched(o){this.onModelTouched=o}setDisabledState(o){this.disabled=o,this.cd.markForCheck()}checked(){return this.binary?this.model===this.trueValue:n.gb.contains(this.value,this.model)}static \u0275fac=function(i){return new(i||s)(e.Y36(e.sBO))};static \u0275cmp=e.Xpm({type:s,selectors:[["p-checkbox"]],contentQueries:function(i,t,c){if(1&i&&e.Suo(c,f.jx,4),2&i){let r;e.iGM(r=e.CRH())&&(t.templates=r)}},viewQuery:function(i,t){if(1&i&&e.Gf(b,5),2&i){let c;e.iGM(c=e.CRH())&&(t.inputViewChild=c.first)}},hostAttrs:[1,"p-element"],inputs:{value:"value",name:"name",disabled:"disabled",binary:"binary",label:"label",ariaLabelledBy:"ariaLabelledBy",ariaLabel:"ariaLabel",tabindex:"tabindex",inputId:"inputId",style:"style",styleClass:"styleClass",labelStyleClass:"labelStyleClass",formControl:"formControl",checkboxIcon:"checkboxIcon",readonly:"readonly",required:"required",trueValue:"trueValue",falseValue:"falseValue"},outputs:{onChange:"onChange"},features:[e._Bn([A])],decls:7,vars:26,consts:[[3,"ngStyle","ngClass"],[1,"p-hidden-accessible"],["type","checkbox",3,"readonly","value","checked","disabled","focus","blur","change"],["cb",""],[1,"p-checkbox-box",3,"ngClass","click"],[4,"ngIf"],[3,"class","ngClass","click",4,"ngIf"],["class","p-checkbox-icon",4,"ngIf"],["class","p-checkbox-icon",3,"ngClass",4,"ngIf"],[3,"styleClass",4,"ngIf"],[1,"p-checkbox-icon",3,"ngClass"],[3,"styleClass"],[1,"p-checkbox-icon"],[4,"ngTemplateOutlet"],[3,"ngClass","click"]],template:function(i,t){if(1&i){const c=e.EpF();e.TgZ(0,"div",0)(1,"div",1)(2,"input",2,3),e.NdJ("focus",function(){return t.onFocus()})("blur",function(){return t.onBlur()})("change",function(u){return t.handleChange(u)}),e.qZA()(),e.TgZ(4,"div",4),e.NdJ("click",function(u){e.CHM(c);const J=e.MAs(3);return e.KtG(t.onClick(u,J,!0))}),e.YNc(5,T,3,2,"ng-container",5),e.qZA()(),e.YNc(6,I,2,9,"label",6)}2&i&&(e.Tol(t.styleClass),e.Q6J("ngStyle",t.style)("ngClass",e.kEZ(18,M,t.checked(),t.disabled,t.focused)),e.xp6(2),e.Q6J("readonly",t.readonly)("value",t.value)("checked",t.checked())("disabled",t.disabled),e.uIk("id",t.inputId)("name",t.name)("tabindex",t.tabindex)("aria-labelledby",t.ariaLabelledBy)("aria-label",t.ariaLabel)("aria-checked",t.checked())("required",t.required),e.xp6(2),e.Q6J("ngClass",e.kEZ(22,Z,t.checked(),t.disabled,t.focused)),e.xp6(1),e.Q6J("ngIf",t.checked()),e.xp6(1),e.Q6J("ngIf",t.label))},dependencies:function(){return[d.mk,d.O5,d.tP,d.PC,g.n]},styles:[".p-checkbox{display:inline-flex;cursor:pointer;-webkit-user-select:none;user-select:none;vertical-align:bottom;position:relative}.p-checkbox-disabled{cursor:default!important;pointer-events:none}.p-checkbox-box{display:flex;justify-content:center;align-items:center}p-checkbox{display:inline-flex;vertical-align:bottom;align-items:center}.p-checkbox-label{line-height:1}\n"],encapsulation:2,changeDetection:0})}return s})(),O=(()=>{class s{static \u0275fac=function(i){return new(i||s)};static \u0275mod=e.oAB({type:s});static \u0275inj=e.cJS({imports:[d.ez,g.n,f.m8]})}return s})()}}]);