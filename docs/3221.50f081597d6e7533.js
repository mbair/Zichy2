"use strict";(self.webpackChunknfc_reserve=self.webpackChunknfc_reserve||[]).push([[3221],{3221:(E,F,o)=>{o.r(F),o.d(F,{ProfileModule:()=>ie});var n=o(6814),r=o(6223),c=o(4480),v=o(707),_=o(3714),m=o(2352),P=o(3743),a=o(6218),d=o(9739),p=o(7582),f=o(1836),g=o(8842),U=o(4279),C=o(5219),e=o(2029),w=o(1206),M=o(6193),R=o(3763),I=o(4204),S=o(4104),z=o(7680),N=o(1423);function Y(i,s){1&i&&(e.TgZ(0,"small",31),e._uU(1,"K\xf6telez\u0151 kit\xf6lteni"),e.qZA())}function O(i,s){if(1&i&&(e.TgZ(0,"div"),e.YNc(1,Y,2,0,"small",30),e.qZA()),2&i){const l=e.oxw();let t;e.xp6(1),e.Q6J("ngIf",null==(t=l.userForm.get("fullname"))||null==t.errors?null:t.errors.required)}}function Q(i,s){if(1&i&&(e.TgZ(0,"span",32),e._uU(1),e.qZA()),2&i){const l=s.$implicit,t=e.oxw();e.Q6J("ngClass",t.getRoleStyleClass(l.id)),e.xp6(1),e.hij(" ",l.name," ")}}function k(i,s){if(1&i&&(e.TgZ(0,"span",32),e._uU(1),e.qZA()),2&i){const l=e.oxw();let t,u;e.Q6J("ngClass",l.getRoleStyleClass(null==(t=l.userForm.get("user_rolesid"))?null:t.value)),e.xp6(1),e.hij(" ",l.getRoleName(null==(u=l.userForm.get("user_rolesid"))?null:u.value)," ")}}function q(i,s){1&i&&(e.TgZ(0,"small",31),e._uU(1,"K\xf6telez\u0151 kit\xf6lteni"),e.qZA())}function B(i,s){if(1&i&&(e.TgZ(0,"div"),e.YNc(1,q,2,0,"small",30),e.qZA()),2&i){const l=e.oxw();let t;e.xp6(1),e.Q6J("ngIf",null==(t=l.userForm.get("user_rolesid"))||null==t.errors?null:t.errors.required)}}function V(i,s){1&i&&(e.TgZ(0,"small",34),e._uU(1,"K\xf6telez\u0151 kit\xf6lteni"),e.qZA())}function j(i,s){1&i&&(e.TgZ(0,"small",34),e._uU(1,"Nem megfelel\u0151 email form\xe1tum"),e.qZA())}function H(i,s){if(1&i&&(e.TgZ(0,"div"),e.YNc(1,V,2,0,"small",33),e.YNc(2,j,2,0,"small",33),e.qZA()),2&i){const l=e.oxw();let t,u;e.xp6(1),e.Q6J("ngIf",null==(t=l.userForm.get("email"))||null==t.errors?null:t.errors.required),e.xp6(1),e.Q6J("ngIf",null==(u=l.userForm.get("email"))||null==u.errors?null:u.errors.invalidEmail)}}function D(i,s){1&i&&(e.TgZ(0,"small",31),e._uU(1,"K\xf6telez\u0151 kit\xf6lteni"),e.qZA())}function L(i,s){if(1&i&&(e.TgZ(0,"div"),e.YNc(1,D,2,0,"small",30),e.qZA()),2&i){const l=e.oxw();let t;e.xp6(1),e.Q6J("ngIf",null==(t=l.userForm.get("phone"))||null==t.errors?null:t.errors.required)}}function K(i,s){1&i&&(e.TgZ(0,"small",31),e._uU(1,"K\xf6telez\u0151 kit\xf6lteni"),e.qZA())}function $(i,s){if(1&i&&(e.TgZ(0,"div"),e.YNc(1,K,2,0,"small",30),e.qZA()),2&i){const l=e.oxw();let t;e.xp6(1),e.Q6J("ngIf",null==(t=l.userForm.get("password"))||null==t.errors?null:t.errors.required)}}function W(i,s){1&i&&(e.TgZ(0,"small",31),e._uU(1,"K\xf6telez\u0151 kit\xf6lteni"),e.qZA())}function G(i,s){if(1&i&&(e.TgZ(0,"div"),e.YNc(1,W,2,0,"small",30),e.qZA()),2&i){const l=e.oxw();let t;e.xp6(1),e.Q6J("ngIf",null==(t=l.userForm.get("password"))||null==t.errors?null:t.errors.required)}}function X(i,s){1&i&&(e.TgZ(0,"div")(1,"small",31),e._uU(2,"A jelszavak nem egyeznek!"),e.qZA()())}let A=class y{constructor(s,l,t,u,h){this.userService=s,this.roleService=l,this.messageService=t,this.logService=u,this.fb=h,this.loading=!0,this.roles=[]}ngOnInit(){const s=localStorage.getItem("fullName");this.userService.getBySearchQuery(`fullName=${s}`),this.userForm=this.fb.group({id:[""],username:[""],fullname:["",r.kI.required],user_rolesid:["",[r.kI.required]],email:["",[r.kI.required,(0,f.u)()]],phone:["",[r.kI.required]],password:[""],password_again:[""]},{validators:(0,g.C)()}),this.userForm.get("email")?.valueChanges.subscribe(l=>{this.userForm.get("username")?.setValue(l,{emitEvent:!1})}),this.userForm.get("id")?.valueChanges.subscribe(l=>{this.setPasswordValidators(l)}),this.setPasswordValidators(this.userForm.get("id")?.value),this.userObs$=this.userService.userObs,this.userObs$.subscribe(l=>{this.loading=!1,l&&l.rows&&(delete l.rows[0].password,this.userForm.patchValue(l.rows[0]),this.originalFormValues=this.userForm.value)}),this.roleObs$=this.roleService.roleObs,this.roleObs$.subscribe(l=>{this.roles=l?l.rows:[]}),this.roleService.get(0,999,"",""),this.serviceMessageObs$=this.userService.messageObs,this.serviceMessageObs$.subscribe(l=>{this.loading=!1,"ERROR"==l?this.messageService.add({severity:"error",summary:"Error",detail:"Hiba t\xf6rt\xe9nt!"}):(this.messageService.add(l),this.originalFormValues=this.userForm.value,this.userForm.reset(this.originalFormValues))})}cancel(){this.userForm.reset(this.originalFormValues)}save(){if(this.userForm.valid){const s=this.userForm.value;s.password||(delete s.password,delete s.password_again),s.id&&(this.loading=!0,this.userService.update(s))}}setPasswordValidators(s){const l=this.userForm.get("password");s?l?.clearValidators():l?.setValidators([r.kI.required]),l?.updateValueAndValidity()}getRoleName(s){const l=this.roles.find(t=>t.id===Number(s));return l?l.name:""}getRoleStyleClass(s){let t="";return t=this.getRoleName(s).trim().toLowerCase().replace(/\s+/g,""),`user-role-badge role-${t}`}ngOnDestroy(){}static#e=this.\u0275fac=function(l){return new(l||y)(e.Y36(w.K),e.Y36(M.N),e.Y36(C.ez),e.Y36(R.$),e.Y36(r.qu))};static#t=this.\u0275cmp=e.Xpm({type:y,selectors:[["ng-component"]],features:[e._Bn([C.ez])],decls:55,vars:20,consts:[[1,"card"],[1,"text-900","text-xl","font-bold","mb-4","block"],[1,"grid"],[1,"col-12","lg:col-2"],[1,"text-900","font-medium","text-xl","mb-3"],[1,"m-0","p-0","text-600","line-height-3","mr-3"],[1,"col-12","lg:col-10"],[1,"grid","formgrid","p-fluid"],[1,"w-full","px-2","grid","formgrid","p-fluid",3,"formGroup"],["formControlName","id","type","hidden"],["formControlName","username","type","hidden"],[1,"field","mb-4","col-12","md:col-6"],["for","fullname",1,"font-medium","text-900"],["pInputText","","type","text","id","fullname","formControlName","fullname","autofocus",""],[4,"ngIf"],["for","user_rolesid",1,"font-medium","text-900"],["id","user_rolesid","formControlName","user_rolesid","optionLabel","name","optionValue","id","placeholder","V\xe1lasszon szerepk\xf6rt...","emptyMessage","Nincs tal\xe1lat...",3,"options","showClear","virtualScroll","virtualScrollItemSize"],["pTemplate","item"],["pTemplate","selectedItem"],["for","email",1,"font-medium","text-900"],["pInputText","","type","text","id","email","formControlName","email"],["for","phone",1,"font-medium","text-900"],["pInputText","","type","text","id","phone","formControlName","phone"],["for","password",1,"font-medium","text-900"],["id","password","formControlName","password","promptLabel","Adja meg a jelsz\xf3t","weakLabel","T\xfal egyszer\u0171","mediumLabel","\xc1tlagos","strongLabel","Komplex jelsz\xf3",3,"toggleMask"],["id","password_again","formControlName","password_again",3,"toggleMask","feedback"],[1,"field","col-6","md:col-3"],["pButton","","pRipple","","label","M\xe9gsem","icon","pi pi-times",1,"p-button-outlined",3,"disabled","click"],["pButton","","pRipple","","label","Ment\xe9s","icon","pi pi-check",1,"p-button",3,"loading","disabled","click"],[3,"autoZIndex","blocked"],["class","p-error",4,"ngIf"],[1,"p-error"],[3,"ngClass"],["class","block p-error",4,"ngIf"],[1,"block","p-error"]],template:function(l,t){if(1&l&&(e.TgZ(0,"div",0)(1,"span",1),e._uU(2," Felhaszn\xe1l\xf3"),e.qZA(),e.TgZ(3,"div",2)(4,"div",3)(5,"div",4),e._uU(6,"Profil"),e.qZA(),e.TgZ(7,"p",5),e._uU(8,"Szem\xe9lyes adatok karbantart\xe1sa"),e.qZA()(),e.TgZ(9,"div",6)(10,"div",7)(11,"form",8),e._UZ(12,"input",9)(13,"input",10),e.TgZ(14,"div",11)(15,"label",12),e._uU(16,"N\xe9v"),e.qZA(),e._UZ(17,"input",13),e.YNc(18,O,2,1,"div",14),e.qZA(),e.TgZ(19,"div",11)(20,"label",15),e._uU(21,"Szerepk\xf6r"),e.qZA(),e.TgZ(22,"p-dropdown",16),e.YNc(23,Q,2,2,"ng-template",17),e.YNc(24,k,2,2,"ng-template",18),e.qZA(),e.YNc(25,B,2,1,"div",14),e.qZA(),e.TgZ(26,"div",11)(27,"label",19),e._uU(28,"Email"),e.qZA(),e._UZ(29,"input",20),e.YNc(30,H,3,2,"div",14),e.qZA(),e.TgZ(31,"div",11)(32,"label",21),e._uU(33,"Telefon"),e.qZA(),e._UZ(34,"input",22),e.YNc(35,L,2,1,"div",14),e.qZA(),e.TgZ(36,"div",11)(37,"label",23),e._uU(38,"Jelsz\xf3"),e.qZA(),e._UZ(39,"p-password",24),e.YNc(40,$,2,1,"div",14),e.qZA(),e.TgZ(41,"div",11)(42,"label",23),e._uU(43,"Jelsz\xf3 \xfajra"),e.qZA(),e._UZ(44,"p-password",25),e.YNc(45,G,2,1,"div",14),e.YNc(46,X,3,0,"div",14),e.qZA(),e._UZ(47,"div",11),e.TgZ(48,"div",26)(49,"button",27),e.NdJ("click",function(){return t.cancel()}),e.qZA()(),e.TgZ(50,"div",26)(51,"button",28),e.NdJ("click",function(){return t.save()}),e.qZA()()()()()()(),e.TgZ(52,"p-blockUI",29),e._UZ(53,"p-progressSpinner"),e.qZA(),e._UZ(54,"p-toast")),2&l){let u,h,Z,T,x,b,J;e.xp6(11),e.Q6J("formGroup",t.userForm),e.xp6(7),e.Q6J("ngIf",(null==(u=t.userForm.get("fullname"))?null:u.invalid)&&(null==(u=t.userForm.get("fullname"))?null:u.dirty)),e.xp6(4),e.Q6J("options",t.roles)("showClear",!0)("virtualScroll",!0)("virtualScrollItemSize",30),e.xp6(3),e.Q6J("ngIf",(null==(h=t.userForm.get("user_rolesid"))?null:h.invalid)&&(null==(h=t.userForm.get("user_rolesid"))?null:h.dirty)),e.xp6(5),e.Q6J("ngIf",(null==(Z=t.userForm.get("email"))?null:Z.invalid)&&(null==(Z=t.userForm.get("email"))?null:Z.dirty)),e.xp6(5),e.Q6J("ngIf",(null==(T=t.userForm.get("phone"))?null:T.invalid)&&(null==(T=t.userForm.get("phone"))?null:T.dirty)),e.xp6(4),e.Q6J("toggleMask",!0),e.xp6(1),e.Q6J("ngIf",(null==(x=t.userForm.get("password"))?null:x.invalid)&&(null==(x=t.userForm.get("password"))?null:x.dirty)),e.xp6(4),e.Q6J("toggleMask",!0)("feedback",!1),e.xp6(1),e.Q6J("ngIf",(null==(b=t.userForm.get("password"))?null:b.invalid)&&(null==(b=t.userForm.get("password"))?null:b.dirty)),e.xp6(1),e.Q6J("ngIf",(null==t.userForm.errors?null:t.userForm.errors.passwordsDoNotMatch)&&(null==(J=t.userForm.get("password"))?null:J.dirty)),e.xp6(3),e.Q6J("disabled",!t.userForm.dirty),e.xp6(2),e.Q6J("loading",t.loading)("disabled",!t.userForm.valid||!t.userForm.dirty),e.xp6(1),e.Q6J("autoZIndex",!0)("blocked",t.loading)}},dependencies:[I.b,n.mk,n.O5,r._Y,r.Fj,r.JJ,r.JL,v.Hq,C.jx,c.H,_.o,m.Lt,r.sg,r.u,S.FN,z.G,N.ro],encapsulation:2})};A=(0,p.gn)([(0,U.k)()],A);let ee=(()=>{class i{static#e=this.\u0275fac=function(t){return new(t||i)};static#t=this.\u0275mod=e.oAB({type:i});static#l=this.\u0275inj=e.cJS({imports:[d.Bz.forChild([{path:"",component:A}]),d.Bz]})}return i})();var te=o(6263),le=o(3521);let ie=(()=>{class i{static#e=this.\u0275fac=function(t){return new(t||i)};static#t=this.\u0275mod=e.oAB({type:i});static#l=this.\u0275inj=e.cJS({imports:[I.u,n.ez,r.u5,ee,v.hJ,c.T,_.j,m.kW,P.O,a.A,r.u5,r.UX,v.hJ,c.T,S.EV,_.j,a.A,m.kW,te.W,le.$,z.L,N.gz]})}return i})()},6218:(E,F,o)=>{o.d(F,{A:()=>_,g:()=>v});var n=o(2029),r=o(6814),c=o(6223);let v=(()=>{class m{el;ngModel;control;cd;autoResize;onResize=new n.vpe;filled;cachedScrollHeight;ngModelSubscription;ngControlSubscription;constructor(a,d,p,f){this.el=a,this.ngModel=d,this.control=p,this.cd=f}ngOnInit(){this.ngModel&&(this.ngModelSubscription=this.ngModel.valueChanges.subscribe(()=>{this.updateState()})),this.control&&(this.ngControlSubscription=this.control.valueChanges.subscribe(()=>{this.updateState()}))}ngAfterViewInit(){this.autoResize&&this.resize(),this.updateFilledState(),this.cd.detectChanges()}onInput(a){this.updateState()}updateFilledState(){this.filled=this.el.nativeElement.value&&this.el.nativeElement.value.length}onFocus(a){this.autoResize&&this.resize(a)}onBlur(a){this.autoResize&&this.resize(a)}resize(a){this.el.nativeElement.style.height="auto",this.el.nativeElement.style.height=this.el.nativeElement.scrollHeight+"px",parseFloat(this.el.nativeElement.style.height)>=parseFloat(this.el.nativeElement.style.maxHeight)?(this.el.nativeElement.style.overflowY="scroll",this.el.nativeElement.style.height=this.el.nativeElement.style.maxHeight):this.el.nativeElement.style.overflow="hidden",this.onResize.emit(a||{})}updateState(){this.updateFilledState(),this.autoResize&&this.resize()}ngOnDestroy(){this.ngModelSubscription&&this.ngModelSubscription.unsubscribe(),this.ngControlSubscription&&this.ngControlSubscription.unsubscribe()}static \u0275fac=function(d){return new(d||m)(n.Y36(n.SBq),n.Y36(c.On,8),n.Y36(c.a5,8),n.Y36(n.sBO))};static \u0275dir=n.lG2({type:m,selectors:[["","pInputTextarea",""]],hostAttrs:[1,"p-inputtextarea","p-inputtext","p-component","p-element"],hostVars:4,hostBindings:function(d,p){1&d&&n.NdJ("input",function(g){return p.onInput(g)})("focus",function(g){return p.onFocus(g)})("blur",function(g){return p.onBlur(g)}),2&d&&n.ekj("p-filled",p.filled)("p-inputtextarea-resizable",p.autoResize)},inputs:{autoResize:"autoResize"},outputs:{onResize:"onResize"}})}return m})(),_=(()=>{class m{static \u0275fac=function(d){return new(d||m)};static \u0275mod=n.oAB({type:m});static \u0275inj=n.cJS({imports:[r.ez]})}return m})()}}]);