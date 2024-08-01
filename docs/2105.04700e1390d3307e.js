"use strict";(self.webpackChunknfc_reserve=self.webpackChunknfc_reserve||[]).push([[2105],{2105:(w,k,a)=>{a.r(k),a.d(k,{LoginModule:()=>E});var s=a(6814),e=a(9739),r=a(6223),h=a(5219),t=a(2029),m=a(1850),g=a(707),f=a(3714),v=a(3521);const y=function(){return["/auth/forgotpassword"]};let T=(()=>{class c{constructor(p,u,b,x){this.fb=p,this.authService=u,this.messageService=b,this.router=x,this.loading=!1,this.loginForm=this.fb.group({email:["",r.kI.required],password:["",r.kI.required]})}login(){this.messageService.clear();const p=this.loginForm.value;p.email&&p.password&&(this.loading=!0,this.authService.login(p.email,p.password).subscribe({next:()=>{this.loading=!1,this.messageService.add({severity:"success",summary:"Sikeres bejelentkez\xe9s!",detail:""}),this.router.navigate([""])},error:u=>{this.loading=!1,console.error("Login failed",u),this.messageService.add({severity:"error",summary:"",detail:"Hib\xe1s a megadott email, vagy jelsz\xf3!"})}}))}static#e=this.\u0275fac=function(u){return new(u||c)(t.Y36(r.qu),t.Y36(m.e),t.Y36(h.ez),t.Y36(e.F0))};static#t=this.\u0275cmp=t.Xpm({type:c,selectors:[["ng-component"]],features:[t._Bn([h.ez])],decls:26,vars:11,consts:[["xmlns","http://www.w3.org/2000/svg","viewBox","0 0 1600 800","preserveAspectRatio","none",1,"fixed","left-0","top-0","min-h-screen","min-w-screen"],["width","1600","height","800"],["d","M478.4 581c3.2 0.8 6.4 1.7 9.5 2.5c196.2 52.5 388.7 133.5 593.5 176.6c174.2 36.6 349.5 29.2 518.6-10.2V0H0v574.9c52.3-17.6 106.5-27.7 161.1-30.9C268.4 537.4 375.7 554.2 478.4 581z"],["d","M181.8 259.4c98.2 6 191.9 35.2 281.3 72.1c2.8 1.1 5.5 2.3 8.3 3.4c171 71.6 342.7 158.5 531.3 207.7c198.8 51.8 403.4 40.8 597.3-14.8V0H0v283.2C59 263.6 120.6 255.7 181.8 259.4z"],["d","M454.9 86.3C600.7 177 751.6 269.3 924.1 325c208.6 67.4 431.3 60.8 637.9-5.3c12.8-4.1 25.4-8.4 38.1-12.9V0H288.1c56 21.3 108.7 50.6 159.7 82C450.2 83.4 452.5 84.9 454.9 86.3z"],["d","M1397.5 154.8c47.2-10.6 93.6-25.3 138.6-43.8c21.7-8.9 43-18.8 63.9-29.5V0H643.4c62.9 41.7 129.7 78.2 202.1 107.4C1020.4 178.1 1214.2 196.1 1397.5 154.8z"],[3,"formGroup"],[1,"px-5","min-h-screen","flex","justify-content-center","align-items-center"],[1,"border-1","surface-border","surface-card","border-round","py-7","px-4","md:px-7","z-1"],[1,"mb-4"],[1,"text-900","text-xl","font-bold","mb-2"],[1,"text-600","font-medium"],[1,"flex","flex-column"],["icon","",3,"closable"],[1,"p-input-icon-left","w-full","mb-4"],[1,"pi","pi-envelope"],["id","email","type","text","pInputText","","placeholder","Email","formControlName","email",1,"w-full","md:w-25rem"],[1,"pi","pi-lock"],["id","password","type","password","pInputText","","placeholder","Jelsz\xf3","formControlName","password",1,"w-full","md:w-25rem"],[1,"mb-4","flex","flex-wrap","gap-3"],[1,"text-600","cursor-pointer","hover:text-primary","cursor-pointer","ml-auto","transition-colors","transition-duration-300",3,"routerLink"],["pButton","","pRipple","","label","Bejelentkez\xe9s",1,"w-full",3,"loading","disabled","click"]],template:function(u,b){1&u&&(t.O4$(),t.TgZ(0,"svg",0),t._UZ(1,"rect",1)(2,"path",2)(3,"path",3)(4,"path",4)(5,"path",5),t.qZA(),t.kcU(),t.TgZ(6,"form",6)(7,"div",7)(8,"div",8)(9,"div",9)(10,"div",10),t._uU(11,"Zichy Hotel"),t.qZA(),t.TgZ(12,"span",11),t._uU(13,"Jelentkezzen be a folytat\xe1shoz"),t.qZA()(),t.TgZ(14,"div",12),t._UZ(15,"p-messages",13),t.TgZ(16,"span",14),t._UZ(17,"i",15)(18,"input",16),t.qZA(),t.TgZ(19,"span",14),t._UZ(20,"i",17)(21,"input",18),t.qZA(),t.TgZ(22,"div",19)(23,"a",20),t._uU(24,"Elfelejtette jelszav\xe1t?"),t.qZA()(),t.TgZ(25,"button",21),t.NdJ("click",function(){return b.login()}),t.qZA()()()()()),2&u&&(t.xp6(1),t.uIk("fill","var(--primary-500)"),t.xp6(1),t.uIk("fill","var(--primary-400)"),t.xp6(1),t.uIk("fill","var(--primary-300)"),t.xp6(1),t.uIk("fill","var(--primary-200)"),t.xp6(1),t.uIk("fill","var(--primary-100)"),t.xp6(1),t.Q6J("formGroup",b.loginForm),t.xp6(9),t.Q6J("closable",!1),t.xp6(8),t.Q6J("routerLink",t.DdM(10,y)),t.xp6(2),t.Q6J("loading",b.loading)("disabled",!b.loginForm.valid))},dependencies:[e.rH,g.Hq,f.o,r._Y,r.Fj,r.JJ,r.JL,r.sg,r.u,v.V],encapsulation:2})}return c})(),I=(()=>{class c{static#e=this.\u0275fac=function(u){return new(u||c)};static#t=this.\u0275mod=t.oAB({type:c});static#n=this.\u0275inj=t.cJS({imports:[e.Bz.forChild([{path:"",component:T}]),e.Bz]})}return c})();var M=a(8057);let E=(()=>{class c{static#e=this.\u0275fac=function(u){return new(u||c)};static#t=this.\u0275mod=t.oAB({type:c});static#n=this.\u0275inj=t.cJS({imports:[s.ez,I,g.hJ,f.j,M.nD,r.u5,r.UX,v.$]})}return c})()},8057:(w,k,a)=>{a.d(k,{XZ:()=>x,nD:()=>J});var s=a(6814),e=a(2029),r=a(6223),h=a(2332),t=a(5219),m=a(2591);const g=["cb"];function f(o,d){if(1&o&&e._UZ(0,"span",10),2&o){const n=e.oxw(3);e.Q6J("ngClass",n.checkboxIcon)}}function v(o,d){1&o&&e._UZ(0,"CheckIcon",11),2&o&&e.Q6J("styleClass","p-checkbox-icon")}function y(o,d){if(1&o&&(e.ynx(0),e.YNc(1,f,1,1,"span",8),e.YNc(2,v,1,1,"CheckIcon",9),e.BQk()),2&o){const n=e.oxw(2);e.xp6(1),e.Q6J("ngIf",n.checkboxIcon),e.xp6(1),e.Q6J("ngIf",!n.checkboxIcon)}}function T(o,d){}function I(o,d){1&o&&e.YNc(0,T,0,0,"ng-template")}function M(o,d){if(1&o&&(e.TgZ(0,"span",12),e.YNc(1,I,1,0,null,13),e.qZA()),2&o){const n=e.oxw(2);e.xp6(1),e.Q6J("ngTemplateOutlet",n.checkboxIconTemplate)}}function E(o,d){if(1&o&&(e.ynx(0),e.YNc(1,y,3,2,"ng-container",5),e.YNc(2,M,2,1,"span",7),e.BQk()),2&o){const n=e.oxw();e.xp6(1),e.Q6J("ngIf",!n.checkboxIconTemplate),e.xp6(1),e.Q6J("ngIf",n.checkboxIconTemplate)}}const c=function(o,d,n){return{"p-checkbox-label":!0,"p-checkbox-label-active":o,"p-disabled":d,"p-checkbox-label-focus":n}};function L(o,d){if(1&o){const n=e.EpF();e.TgZ(0,"label",14),e.NdJ("click",function(i){e.CHM(n);const _=e.oxw(),C=e.MAs(3);return e.KtG(_.onClick(i,C,!0))}),e._uU(1),e.qZA()}if(2&o){const n=e.oxw();e.Tol(n.labelStyleClass),e.Q6J("ngClass",e.kEZ(5,c,n.checked(),n.disabled,n.focused)),e.uIk("for",n.inputId),e.xp6(1),e.Oqu(n.label)}}const p=function(o,d,n){return{"p-checkbox p-component":!0,"p-checkbox-checked":o,"p-checkbox-disabled":d,"p-checkbox-focused":n}},u=function(o,d,n){return{"p-highlight":o,"p-disabled":d,"p-focus":n}},b={provide:r.JU,useExisting:(0,e.Gpc)(()=>x),multi:!0};let x=(()=>{class o{cd;value;name;disabled;binary;label;ariaLabelledBy;ariaLabel;tabindex;inputId;style;styleClass;labelStyleClass;formControl;checkboxIcon;readonly;required;trueValue=!0;falseValue=!1;onChange=new e.vpe;inputViewChild;templates;checkboxIconTemplate;model;onModelChange=()=>{};onModelTouched=()=>{};focused=!1;constructor(n){this.cd=n}ngAfterContentInit(){this.templates.forEach(n=>{"icon"===n.getType()&&(this.checkboxIconTemplate=n.template)})}onClick(n,l,i){n.preventDefault(),!this.disabled&&!this.readonly&&(this.updateModel(n),i&&l.focus())}updateModel(n){let l;this.binary?(l=this.checked()?this.falseValue:this.trueValue,this.model=l,this.onModelChange(l)):(l=this.checked()?this.model.filter(i=>!h.gb.equals(i,this.value)):this.model?[...this.model,this.value]:[this.value],this.onModelChange(l),this.model=l,this.formControl&&this.formControl.setValue(l)),this.onChange.emit({checked:l,originalEvent:n})}handleChange(n){this.readonly||this.updateModel(n)}onFocus(){this.focused=!0}onBlur(){this.focused=!1,this.onModelTouched()}focus(){this.inputViewChild?.nativeElement.focus()}writeValue(n){this.model=n,this.cd.markForCheck()}registerOnChange(n){this.onModelChange=n}registerOnTouched(n){this.onModelTouched=n}setDisabledState(n){this.disabled=n,this.cd.markForCheck()}checked(){return this.binary?this.model===this.trueValue:h.gb.contains(this.value,this.model)}static \u0275fac=function(l){return new(l||o)(e.Y36(e.sBO))};static \u0275cmp=e.Xpm({type:o,selectors:[["p-checkbox"]],contentQueries:function(l,i,_){if(1&l&&e.Suo(_,t.jx,4),2&l){let C;e.iGM(C=e.CRH())&&(i.templates=C)}},viewQuery:function(l,i){if(1&l&&e.Gf(g,5),2&l){let _;e.iGM(_=e.CRH())&&(i.inputViewChild=_.first)}},hostAttrs:[1,"p-element"],inputs:{value:"value",name:"name",disabled:"disabled",binary:"binary",label:"label",ariaLabelledBy:"ariaLabelledBy",ariaLabel:"ariaLabel",tabindex:"tabindex",inputId:"inputId",style:"style",styleClass:"styleClass",labelStyleClass:"labelStyleClass",formControl:"formControl",checkboxIcon:"checkboxIcon",readonly:"readonly",required:"required",trueValue:"trueValue",falseValue:"falseValue"},outputs:{onChange:"onChange"},features:[e._Bn([b])],decls:7,vars:26,consts:[[3,"ngStyle","ngClass"],[1,"p-hidden-accessible"],["type","checkbox",3,"readonly","value","checked","disabled","focus","blur","change"],["cb",""],[1,"p-checkbox-box",3,"ngClass","click"],[4,"ngIf"],[3,"class","ngClass","click",4,"ngIf"],["class","p-checkbox-icon",4,"ngIf"],["class","p-checkbox-icon",3,"ngClass",4,"ngIf"],[3,"styleClass",4,"ngIf"],[1,"p-checkbox-icon",3,"ngClass"],[3,"styleClass"],[1,"p-checkbox-icon"],[4,"ngTemplateOutlet"],[3,"ngClass","click"]],template:function(l,i){if(1&l){const _=e.EpF();e.TgZ(0,"div",0)(1,"div",1)(2,"input",2,3),e.NdJ("focus",function(){return i.onFocus()})("blur",function(){return i.onBlur()})("change",function(Z){return i.handleChange(Z)}),e.qZA()(),e.TgZ(4,"div",4),e.NdJ("click",function(Z){e.CHM(_);const A=e.MAs(3);return e.KtG(i.onClick(Z,A,!0))}),e.YNc(5,E,3,2,"ng-container",5),e.qZA()(),e.YNc(6,L,2,9,"label",6)}2&l&&(e.Tol(i.styleClass),e.Q6J("ngStyle",i.style)("ngClass",e.kEZ(18,p,i.checked(),i.disabled,i.focused)),e.xp6(2),e.Q6J("readonly",i.readonly)("value",i.value)("checked",i.checked())("disabled",i.disabled),e.uIk("id",i.inputId)("name",i.name)("tabindex",i.tabindex)("aria-labelledby",i.ariaLabelledBy)("aria-label",i.ariaLabel)("aria-checked",i.checked())("required",i.required),e.xp6(2),e.Q6J("ngClass",e.kEZ(22,u,i.checked(),i.disabled,i.focused)),e.xp6(1),e.Q6J("ngIf",i.checked()),e.xp6(1),e.Q6J("ngIf",i.label))},dependencies:function(){return[s.mk,s.O5,s.tP,s.PC,m.n]},styles:[".p-checkbox{display:inline-flex;cursor:pointer;-webkit-user-select:none;user-select:none;vertical-align:bottom;position:relative}.p-checkbox-disabled{cursor:default!important;pointer-events:none}.p-checkbox-box{display:flex;justify-content:center;align-items:center}p-checkbox{display:inline-flex;vertical-align:bottom;align-items:center}.p-checkbox-label{line-height:1}\n"],encapsulation:2,changeDetection:0})}return o})(),J=(()=>{class o{static \u0275fac=function(l){return new(l||o)};static \u0275mod=e.oAB({type:o});static \u0275inj=e.cJS({imports:[s.ez,m.n,t.m8]})}return o})()},2591:(w,k,a)=>{a.d(k,{n:()=>r});var s=a(2029),e=a(4713);let r=(()=>{class h extends e.s{static \u0275fac=function(){let m;return function(f){return(m||(m=s.n5z(h)))(f||h)}}();static \u0275cmp=s.Xpm({type:h,selectors:[["CheckIcon"]],standalone:!0,features:[s.qOj,s.jDz],decls:2,vars:5,consts:[["width","14","height","14","viewBox","0 0 14 14","fill","none","xmlns","http://www.w3.org/2000/svg"],["d","M4.86199 11.5948C4.78717 11.5923 4.71366 11.5745 4.64596 11.5426C4.57826 11.5107 4.51779 11.4652 4.46827 11.4091L0.753985 7.69483C0.683167 7.64891 0.623706 7.58751 0.580092 7.51525C0.536478 7.44299 0.509851 7.36177 0.502221 7.27771C0.49459 7.19366 0.506156 7.10897 0.536046 7.03004C0.565935 6.95111 0.613367 6.88 0.674759 6.82208C0.736151 6.76416 0.8099 6.72095 0.890436 6.69571C0.970973 6.67046 1.05619 6.66385 1.13966 6.67635C1.22313 6.68886 1.30266 6.72017 1.37226 6.76792C1.44186 6.81567 1.4997 6.8786 1.54141 6.95197L4.86199 10.2503L12.6397 2.49483C12.7444 2.42694 12.8689 2.39617 12.9932 2.40745C13.1174 2.41873 13.2343 2.47141 13.3251 2.55705C13.4159 2.64268 13.4753 2.75632 13.4938 2.87973C13.5123 3.00315 13.4888 3.1292 13.4271 3.23768L5.2557 11.4091C5.20618 11.4652 5.14571 11.5107 5.07801 11.5426C5.01031 11.5745 4.9368 11.5923 4.86199 11.5948Z","fill","currentColor"]],template:function(g,f){1&g&&(s.O4$(),s.TgZ(0,"svg",0),s._UZ(1,"path",1),s.qZA()),2&g&&(s.Tol(f.getClassNames()),s.uIk("aria-label",f.ariaLabel)("aria-hidden",f.ariaHidden)("role",f.role))},encapsulation:2})}return h})()}}]);