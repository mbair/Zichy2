"use strict";(self.webpackChunknfc_reserve=self.webpackChunknfc_reserve||[]).push([[2105],{2105:(w,b,a)=>{a.r(b),a.d(b,{LoginModule:()=>Z});var m=a(6814),e=a(9739),r=a(6223),g=a(5219),t=a(2029),_=a(1850),k=a(707),C=a(3714),x=a(3521),v=a(1423);const y=function(){return{paddingLeft:"2.5rem"}},T=function(){return["/auth/forgotpassword"]};let I=(()=>{class s{constructor(d,c,p,o){this.fb=d,this.authService=c,this.messageService=p,this.router=o,this.loading=!1,this.loginForm=this.fb.group({email:["",r.kI.required],password:["",r.kI.required]})}login(){this.messageService.clear();const d=this.loginForm.value;d.email&&d.password&&(this.loading=!0,this.authService.login(d.email,d.password).subscribe({next:()=>{this.loading=!1,this.messageService.add({severity:"success",summary:"Sikeres bejelentkez\xe9s!",detail:""}),this.router.navigate([""])},error:c=>{this.loading=!1,console.error("Login failed",c),this.messageService.add({severity:"error",summary:"",detail:"Hib\xe1s a megadott email, vagy jelsz\xf3!"})}}))}static#e=this.\u0275fac=function(c){return new(c||s)(t.Y36(r.qu),t.Y36(_.e),t.Y36(g.ez),t.Y36(e.F0))};static#t=this.\u0275cmp=t.Xpm({type:s,selectors:[["ng-component"]],features:[t._Bn([g.ez])],decls:26,vars:15,consts:[["xmlns","http://www.w3.org/2000/svg","viewBox","0 0 1600 800","preserveAspectRatio","none",1,"fixed","left-0","top-0","min-h-screen","min-w-screen"],["width","1600","height","800"],["d","M478.4 581c3.2 0.8 6.4 1.7 9.5 2.5c196.2 52.5 388.7 133.5 593.5 176.6c174.2 36.6 349.5 29.2 518.6-10.2V0H0v574.9c52.3-17.6 106.5-27.7 161.1-30.9C268.4 537.4 375.7 554.2 478.4 581z"],["d","M181.8 259.4c98.2 6 191.9 35.2 281.3 72.1c2.8 1.1 5.5 2.3 8.3 3.4c171 71.6 342.7 158.5 531.3 207.7c198.8 51.8 403.4 40.8 597.3-14.8V0H0v283.2C59 263.6 120.6 255.7 181.8 259.4z"],["d","M454.9 86.3C600.7 177 751.6 269.3 924.1 325c208.6 67.4 431.3 60.8 637.9-5.3c12.8-4.1 25.4-8.4 38.1-12.9V0H288.1c56 21.3 108.7 50.6 159.7 82C450.2 83.4 452.5 84.9 454.9 86.3z"],["d","M1397.5 154.8c47.2-10.6 93.6-25.3 138.6-43.8c21.7-8.9 43-18.8 63.9-29.5V0H643.4c62.9 41.7 129.7 78.2 202.1 107.4C1020.4 178.1 1214.2 196.1 1397.5 154.8z"],[3,"formGroup"],[1,"px-5","min-h-screen","flex","justify-content-center","align-items-center"],[1,"border-1","surface-border","surface-card","border-round","py-7","px-4","md:px-7","z-1"],[1,"mb-4"],[1,"text-900","text-xl","font-bold","mb-2"],[1,"text-600","font-medium"],[1,"flex","flex-column"],["icon","",3,"closable"],[1,"p-input-icon-left","w-full","mb-4"],[1,"pi","pi-envelope"],["id","email","type","text","pInputText","","placeholder","Email","formControlName","email",1,"w-full","md:w-25rem"],[1,"pi","pi-lock","z-2"],["id","password","formControlName","password","placeholder","Jelsz\xf3","styleClass","w-full","inputStyleClass","w-full md:w-25rem",3,"inputStyle","toggleMask","feedback"],[1,"mb-4","flex","flex-wrap","gap-3"],[1,"text-600","cursor-pointer","hover:text-primary","cursor-pointer","ml-auto","transition-colors","transition-duration-300",3,"routerLink"],["pButton","","pRipple","","label","Bejelentkez\xe9s",1,"w-full",3,"loading","disabled","click"]],template:function(c,p){1&c&&(t.O4$(),t.TgZ(0,"svg",0),t._UZ(1,"rect",1)(2,"path",2)(3,"path",3)(4,"path",4)(5,"path",5),t.qZA(),t.kcU(),t.TgZ(6,"form",6)(7,"div",7)(8,"div",8)(9,"div",9)(10,"div",10),t._uU(11,"Zichy Hotel"),t.qZA(),t.TgZ(12,"span",11),t._uU(13,"Jelentkezzen be a folytat\xe1shoz"),t.qZA()(),t.TgZ(14,"div",12),t._UZ(15,"p-messages",13),t.TgZ(16,"span",14),t._UZ(17,"i",15)(18,"input",16),t.qZA(),t.TgZ(19,"span",14),t._UZ(20,"i",17)(21,"p-password",18),t.qZA(),t.TgZ(22,"div",19)(23,"a",20),t._uU(24,"Elfelejtette jelszav\xe1t?"),t.qZA()(),t.TgZ(25,"button",21),t.NdJ("click",function(){return p.login()}),t.qZA()()()()()),2&c&&(t.xp6(1),t.uIk("fill","var(--primary-500)"),t.xp6(1),t.uIk("fill","var(--primary-400)"),t.xp6(1),t.uIk("fill","var(--primary-300)"),t.xp6(1),t.uIk("fill","var(--primary-200)"),t.xp6(1),t.uIk("fill","var(--primary-100)"),t.xp6(1),t.Q6J("formGroup",p.loginForm),t.xp6(9),t.Q6J("closable",!1),t.xp6(6),t.Q6J("inputStyle",t.DdM(13,y))("toggleMask",!0)("feedback",!1),t.xp6(2),t.Q6J("routerLink",t.DdM(14,T)),t.xp6(2),t.Q6J("loading",p.loading)("disabled",!p.loginForm.valid))},dependencies:[e.rH,k.Hq,C.o,r._Y,r.Fj,r.JJ,r.JL,r.sg,r.u,x.V,v.ro],encapsulation:2})}return s})(),M=(()=>{class s{static#e=this.\u0275fac=function(c){return new(c||s)};static#t=this.\u0275mod=t.oAB({type:s});static#n=this.\u0275inj=t.cJS({imports:[e.Bz.forChild([{path:"",component:I}]),e.Bz]})}return s})();var E=a(8057);let Z=(()=>{class s{static#e=this.\u0275fac=function(c){return new(c||s)};static#t=this.\u0275mod=t.oAB({type:s});static#n=this.\u0275inj=t.cJS({imports:[m.ez,M,k.hJ,C.j,E.nD,r.u5,r.UX,x.$,v.gz]})}return s})()},8057:(w,b,a)=>{a.d(b,{XZ:()=>c,nD:()=>p});var m=a(6814),e=a(2029),r=a(6223),g=a(2332),t=a(5219),_=a(2591);const k=["cb"];function C(o,u){if(1&o&&e._UZ(0,"span",10),2&o){const n=e.oxw(3);e.Q6J("ngClass",n.checkboxIcon)}}function x(o,u){1&o&&e._UZ(0,"CheckIcon",11),2&o&&e.Q6J("styleClass","p-checkbox-icon")}function v(o,u){if(1&o&&(e.ynx(0),e.YNc(1,C,1,1,"span",8),e.YNc(2,x,1,1,"CheckIcon",9),e.BQk()),2&o){const n=e.oxw(2);e.xp6(1),e.Q6J("ngIf",n.checkboxIcon),e.xp6(1),e.Q6J("ngIf",!n.checkboxIcon)}}function y(o,u){}function T(o,u){1&o&&e.YNc(0,y,0,0,"ng-template")}function I(o,u){if(1&o&&(e.TgZ(0,"span",12),e.YNc(1,T,1,0,null,13),e.qZA()),2&o){const n=e.oxw(2);e.xp6(1),e.Q6J("ngTemplateOutlet",n.checkboxIconTemplate)}}function M(o,u){if(1&o&&(e.ynx(0),e.YNc(1,v,3,2,"ng-container",5),e.YNc(2,I,2,1,"span",7),e.BQk()),2&o){const n=e.oxw();e.xp6(1),e.Q6J("ngIf",!n.checkboxIconTemplate),e.xp6(1),e.Q6J("ngIf",n.checkboxIconTemplate)}}const E=function(o,u,n){return{"p-checkbox-label":!0,"p-checkbox-label-active":o,"p-disabled":u,"p-checkbox-label-focus":n}};function Z(o,u){if(1&o){const n=e.EpF();e.TgZ(0,"label",14),e.NdJ("click",function(i){e.CHM(n);const h=e.oxw(),f=e.MAs(3);return e.KtG(h.onClick(i,f,!0))}),e._uU(1),e.qZA()}if(2&o){const n=e.oxw();e.Tol(n.labelStyleClass),e.Q6J("ngClass",e.kEZ(5,E,n.checked(),n.disabled,n.focused)),e.uIk("for",n.inputId),e.xp6(1),e.Oqu(n.label)}}const s=function(o,u,n){return{"p-checkbox p-component":!0,"p-checkbox-checked":o,"p-checkbox-disabled":u,"p-checkbox-focused":n}},A=function(o,u,n){return{"p-highlight":o,"p-disabled":u,"p-focus":n}},d={provide:r.JU,useExisting:(0,e.Gpc)(()=>c),multi:!0};let c=(()=>{class o{cd;value;name;disabled;binary;label;ariaLabelledBy;ariaLabel;tabindex;inputId;style;styleClass;labelStyleClass;formControl;checkboxIcon;readonly;required;trueValue=!0;falseValue=!1;onChange=new e.vpe;inputViewChild;templates;checkboxIconTemplate;model;onModelChange=()=>{};onModelTouched=()=>{};focused=!1;constructor(n){this.cd=n}ngAfterContentInit(){this.templates.forEach(n=>{"icon"===n.getType()&&(this.checkboxIconTemplate=n.template)})}onClick(n,l,i){n.preventDefault(),!this.disabled&&!this.readonly&&(this.updateModel(n),i&&l.focus())}updateModel(n){let l;this.binary?(l=this.checked()?this.falseValue:this.trueValue,this.model=l,this.onModelChange(l)):(l=this.checked()?this.model.filter(i=>!g.gb.equals(i,this.value)):this.model?[...this.model,this.value]:[this.value],this.onModelChange(l),this.model=l,this.formControl&&this.formControl.setValue(l)),this.onChange.emit({checked:l,originalEvent:n})}handleChange(n){this.readonly||this.updateModel(n)}onFocus(){this.focused=!0}onBlur(){this.focused=!1,this.onModelTouched()}focus(){this.inputViewChild?.nativeElement.focus()}writeValue(n){this.model=n,this.cd.markForCheck()}registerOnChange(n){this.onModelChange=n}registerOnTouched(n){this.onModelTouched=n}setDisabledState(n){this.disabled=n,this.cd.markForCheck()}checked(){return this.binary?this.model===this.trueValue:g.gb.contains(this.value,this.model)}static \u0275fac=function(l){return new(l||o)(e.Y36(e.sBO))};static \u0275cmp=e.Xpm({type:o,selectors:[["p-checkbox"]],contentQueries:function(l,i,h){if(1&l&&e.Suo(h,t.jx,4),2&l){let f;e.iGM(f=e.CRH())&&(i.templates=f)}},viewQuery:function(l,i){if(1&l&&e.Gf(k,5),2&l){let h;e.iGM(h=e.CRH())&&(i.inputViewChild=h.first)}},hostAttrs:[1,"p-element"],inputs:{value:"value",name:"name",disabled:"disabled",binary:"binary",label:"label",ariaLabelledBy:"ariaLabelledBy",ariaLabel:"ariaLabel",tabindex:"tabindex",inputId:"inputId",style:"style",styleClass:"styleClass",labelStyleClass:"labelStyleClass",formControl:"formControl",checkboxIcon:"checkboxIcon",readonly:"readonly",required:"required",trueValue:"trueValue",falseValue:"falseValue"},outputs:{onChange:"onChange"},features:[e._Bn([d])],decls:7,vars:26,consts:[[3,"ngStyle","ngClass"],[1,"p-hidden-accessible"],["type","checkbox",3,"readonly","value","checked","disabled","focus","blur","change"],["cb",""],[1,"p-checkbox-box",3,"ngClass","click"],[4,"ngIf"],[3,"class","ngClass","click",4,"ngIf"],["class","p-checkbox-icon",4,"ngIf"],["class","p-checkbox-icon",3,"ngClass",4,"ngIf"],[3,"styleClass",4,"ngIf"],[1,"p-checkbox-icon",3,"ngClass"],[3,"styleClass"],[1,"p-checkbox-icon"],[4,"ngTemplateOutlet"],[3,"ngClass","click"]],template:function(l,i){if(1&l){const h=e.EpF();e.TgZ(0,"div",0)(1,"div",1)(2,"input",2,3),e.NdJ("focus",function(){return i.onFocus()})("blur",function(){return i.onBlur()})("change",function(J){return i.handleChange(J)}),e.qZA()(),e.TgZ(4,"div",4),e.NdJ("click",function(J){e.CHM(h);const B=e.MAs(3);return e.KtG(i.onClick(J,B,!0))}),e.YNc(5,M,3,2,"ng-container",5),e.qZA()(),e.YNc(6,Z,2,9,"label",6)}2&l&&(e.Tol(i.styleClass),e.Q6J("ngStyle",i.style)("ngClass",e.kEZ(18,s,i.checked(),i.disabled,i.focused)),e.xp6(2),e.Q6J("readonly",i.readonly)("value",i.value)("checked",i.checked())("disabled",i.disabled),e.uIk("id",i.inputId)("name",i.name)("tabindex",i.tabindex)("aria-labelledby",i.ariaLabelledBy)("aria-label",i.ariaLabel)("aria-checked",i.checked())("required",i.required),e.xp6(2),e.Q6J("ngClass",e.kEZ(22,A,i.checked(),i.disabled,i.focused)),e.xp6(1),e.Q6J("ngIf",i.checked()),e.xp6(1),e.Q6J("ngIf",i.label))},dependencies:function(){return[m.mk,m.O5,m.tP,m.PC,_.n]},styles:[".p-checkbox{display:inline-flex;cursor:pointer;-webkit-user-select:none;user-select:none;vertical-align:bottom;position:relative}.p-checkbox-disabled{cursor:default!important;pointer-events:none}.p-checkbox-box{display:flex;justify-content:center;align-items:center}p-checkbox{display:inline-flex;vertical-align:bottom;align-items:center}.p-checkbox-label{line-height:1}\n"],encapsulation:2,changeDetection:0})}return o})(),p=(()=>{class o{static \u0275fac=function(l){return new(l||o)};static \u0275mod=e.oAB({type:o});static \u0275inj=e.cJS({imports:[m.ez,_.n,t.m8]})}return o})()}}]);