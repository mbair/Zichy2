"use strict";(self.webpackChunknfc_reserve=self.webpackChunknfc_reserve||[]).push([[221],{3221:(S,k,s)=>{s.r(k),s.d(k,{ProfileModule:()=>ie});var r=s(6814),t=s(6223),h=s(4480),_=s(707),d=s(3714),c=s(2352),Z=s(3743),a=s(6218),u=s(9739),v=s(7582),F=s(1836),y=s(8842),p=s(4279),C=s(5219),e=s(2029),m=s(1206),f=s(6193),b=s(4204),T=s(4104),z=s(7680),B=s(1423);function J(n,o){1&n&&(e.TgZ(0,"div",31),e._uU(1,"K\xf6telez\u0151 kit\xf6lteni"),e.qZA())}function O(n,o){if(1&n&&(e.TgZ(0,"div"),e.YNc(1,J,2,0,"div",30),e.qZA()),2&n){const l=e.oxw();let i;e.xp6(1),e.Q6J("ngIf",null==(i=l.userForm.get("fullname"))||null==i.errors?null:i.errors.required)}}function w(n,o){if(1&n&&(e.TgZ(0,"span",32),e._uU(1),e.qZA()),2&n){const l=o.$implicit,i=e.oxw();e.Q6J("ngClass",i.roleService.getRoleStyleClass(l.id)),e.xp6(1),e.hij(" ",l.name," ")}}function N(n,o){if(1&n&&(e.TgZ(0,"span",32),e._uU(1),e.qZA()),2&n){const l=e.oxw();let i,g;e.Q6J("ngClass",l.roleService.getRoleStyleClass(null==(i=l.userForm.get("user_rolesid"))?null:i.value)),e.xp6(1),e.hij(" ",l.roleService.getRoleName(null==(g=l.userForm.get("user_rolesid"))?null:g.value)," ")}}function R(n,o){1&n&&(e.TgZ(0,"div",31),e._uU(1,"K\xf6telez\u0151 kit\xf6lteni"),e.qZA())}function Y(n,o){if(1&n&&(e.TgZ(0,"div"),e.YNc(1,R,2,0,"div",30),e.qZA()),2&n){const l=e.oxw();let i;e.xp6(1),e.Q6J("ngIf",null==(i=l.userForm.get("user_rolesid"))||null==i.errors?null:i.errors.required)}}function Q(n,o){1&n&&(e.TgZ(0,"div",34),e._uU(1,"K\xf6telez\u0151 kit\xf6lteni"),e.qZA())}function L(n,o){1&n&&(e.TgZ(0,"div",34),e._uU(1,"Nem megfelel\u0151 email form\xe1tum"),e.qZA())}function V(n,o){if(1&n&&(e.TgZ(0,"div"),e.YNc(1,Q,2,0,"div",33),e.YNc(2,L,2,0,"div",33),e.qZA()),2&n){const l=e.oxw();let i,g;e.xp6(1),e.Q6J("ngIf",null==(i=l.userForm.get("email"))||null==i.errors?null:i.errors.required),e.xp6(1),e.Q6J("ngIf",null==(g=l.userForm.get("email"))||null==g.errors?null:g.errors.invalidEmail)}}function K(n,o){1&n&&(e.TgZ(0,"div",31),e._uU(1,"K\xf6telez\u0151 kit\xf6lteni"),e.qZA())}function j(n,o){if(1&n&&(e.TgZ(0,"div"),e.YNc(1,K,2,0,"div",30),e.qZA()),2&n){const l=e.oxw();let i;e.xp6(1),e.Q6J("ngIf",null==(i=l.userForm.get("phone"))||null==i.errors?null:i.errors.required)}}function q(n,o){1&n&&(e.TgZ(0,"div",31),e._uU(1,"K\xf6telez\u0151 kit\xf6lteni"),e.qZA())}function H(n,o){if(1&n&&(e.TgZ(0,"div"),e.YNc(1,q,2,0,"div",30),e.qZA()),2&n){const l=e.oxw();let i;e.xp6(1),e.Q6J("ngIf",null==(i=l.userForm.get("password"))||null==i.errors?null:i.errors.required)}}function W(n,o){1&n&&(e.TgZ(0,"div",31),e._uU(1,"K\xf6telez\u0151 kit\xf6lteni"),e.qZA())}function G(n,o){if(1&n&&(e.TgZ(0,"div"),e.YNc(1,W,2,0,"div",30),e.qZA()),2&n){const l=e.oxw();let i;e.xp6(1),e.Q6J("ngIf",null==(i=l.userForm.get("password"))||null==i.errors?null:i.errors.required)}}function $(n,o){1&n&&(e.TgZ(0,"div")(1,"div",31),e._uU(2,"A jelszavak nem egyeznek!"),e.qZA()())}let P=class U{constructor(o,l,i,g){this.userService=o,this.roleService=l,this.messageService=i,this.fb=g,this.loading=!0,this.roles=[]}ngOnInit(){this.userService.getOwnData(),this.userForm=this.fb.group({id:[""],username:[""],fullname:["",t.kI.required],user_rolesid:[{value:"",disabled:!0},t.kI.required],email:["",[t.kI.required,(0,F.u)()]],phone:["",[t.kI.required]],password:[""],password_again:[""]},{validators:(0,y.C)()}),this.userService.hasRole(["Super Admin","Nagy Admin"])?this.userForm.get("user_rolesid")?.enable():this.userForm.get("user_rolesid")?.disable(),this.userForm.get("email")?.valueChanges.subscribe(o=>{this.userForm.get("username")?.setValue(o,{emitEvent:!1})}),this.userForm.get("id")?.valueChanges.subscribe(o=>{this.setPasswordValidators(o)}),this.setPasswordValidators(this.userForm.get("id")?.value),this.userObs$=this.userService.userObs,this.userObs$.subscribe(o=>{this.loading=!1,o&&(this.userForm.patchValue(o),this.originalFormValues=this.userForm.value)}),this.roleService.getRolesForSelector().subscribe({next:o=>{this.roles=o}}),this.serviceMessageObs$=this.userService.messageObs,this.serviceMessageObs$.subscribe(o=>{this.loading=!1,"ERROR"==o?this.messageService.add({severity:"error",summary:"Error",detail:"Hiba t\xf6rt\xe9nt!"}):(this.messageService.add(o),this.originalFormValues=this.userForm.value,this.userForm.reset(this.originalFormValues))})}cancel(){this.userForm.reset(this.originalFormValues)}save(){if(this.userForm.valid){const o=this.userForm.value;o.password||delete o.password,delete o.password_again,o.id&&(this.loading=!0,this.userService.update(o))}}setPasswordValidators(o){const l=this.userForm.get("password");o?l?.clearValidators():l?.setValidators([t.kI.required]),l?.updateValueAndValidity()}ngOnDestroy(){}static#e=this.\u0275fac=function(l){return new(l||U)(e.Y36(m.K),e.Y36(f.N),e.Y36(C.ez),e.Y36(t.qu))};static#t=this.\u0275cmp=e.Xpm({type:U,selectors:[["ng-component"]],features:[e._Bn([C.ez])],decls:55,vars:20,consts:[[1,"card"],[1,"text-900","text-xl","font-bold","mb-4","block"],[1,"grid"],[1,"col-12","lg:col-2"],[1,"text-900","font-medium","text-xl","mb-3"],[1,"m-0","p-0","text-600","line-height-3","mr-3"],[1,"col-12","lg:col-10"],[1,"grid","formgrid","p-fluid"],[1,"w-full","px-2","grid","formgrid","p-fluid",3,"formGroup"],["formControlName","id","type","hidden"],["formControlName","username","type","hidden"],[1,"field","mb-4","col-12","md:col-6"],["for","fullname",1,"font-medium","text-900"],["pInputText","","type","text","id","fullname","formControlName","fullname","autofocus",""],[4,"ngIf"],["for","user_rolesid",1,"font-medium","text-900"],["id","user_rolesid","formControlName","user_rolesid","optionLabel","name","optionValue","id","placeholder","V\xe1lasszon szerepk\xf6rt...","emptyMessage","Nincs tal\xe1lat...",3,"options","showClear","virtualScroll","virtualScrollItemSize"],["pTemplate","item"],["pTemplate","selectedItem"],["for","email",1,"font-medium","text-900"],["pInputText","","type","text","id","email","formControlName","email"],["for","phone",1,"font-medium","text-900"],["pInputText","","type","text","id","phone","formControlName","phone"],["for","password",1,"font-medium","text-900"],["id","password","formControlName","password","promptLabel","Adja meg a jelsz\xf3t","weakLabel","T\xfal egyszer\u0171","mediumLabel","\xc1tlagos","strongLabel","Komplex jelsz\xf3",3,"toggleMask"],["id","password_again","formControlName","password_again",3,"toggleMask","feedback"],[1,"field","col-6","md:col-3"],["pButton","","pRipple","","label","M\xe9gsem","icon","pi pi-times",1,"p-button-outlined",3,"disabled","click"],["pButton","","pRipple","","label","Ment\xe9s","icon","pi pi-check",1,"p-button",3,"loading","disabled","click"],[3,"autoZIndex","blocked"],["class","p-error",4,"ngIf"],[1,"p-error"],[3,"ngClass"],["class","block p-error",4,"ngIf"],[1,"block","p-error"]],template:function(l,i){if(1&l&&(e.TgZ(0,"div",0)(1,"span",1),e._uU(2," Felhaszn\xe1l\xf3"),e.qZA(),e.TgZ(3,"div",2)(4,"div",3)(5,"div",4),e._uU(6,"Profil"),e.qZA(),e.TgZ(7,"p",5),e._uU(8,"Szem\xe9lyes adatok karbantart\xe1sa"),e.qZA()(),e.TgZ(9,"div",6)(10,"div",7)(11,"form",8),e._UZ(12,"input",9)(13,"input",10),e.TgZ(14,"div",11)(15,"label",12),e._uU(16,"N\xe9v"),e.qZA(),e._UZ(17,"input",13),e.YNc(18,O,2,1,"div",14),e.qZA(),e.TgZ(19,"div",11)(20,"label",15),e._uU(21,"Szerepk\xf6r"),e.qZA(),e.TgZ(22,"p-dropdown",16),e.YNc(23,w,2,2,"ng-template",17),e.YNc(24,N,2,2,"ng-template",18),e.qZA(),e.YNc(25,Y,2,1,"div",14),e.qZA(),e.TgZ(26,"div",11)(27,"label",19),e._uU(28,"Email"),e.qZA(),e._UZ(29,"input",20),e.YNc(30,V,3,2,"div",14),e.qZA(),e.TgZ(31,"div",11)(32,"label",21),e._uU(33,"Telefon"),e.qZA(),e._UZ(34,"input",22),e.YNc(35,j,2,1,"div",14),e.qZA(),e.TgZ(36,"div",11)(37,"label",23),e._uU(38,"Jelsz\xf3"),e.qZA(),e._UZ(39,"p-password",24),e.YNc(40,H,2,1,"div",14),e.qZA(),e.TgZ(41,"div",11)(42,"label",23),e._uU(43,"Jelsz\xf3 \xfajra"),e.qZA(),e._UZ(44,"p-password",25),e.YNc(45,G,2,1,"div",14),e.YNc(46,$,3,0,"div",14),e.qZA(),e._UZ(47,"div",11),e.TgZ(48,"div",26)(49,"button",27),e.NdJ("click",function(){return i.cancel()}),e.qZA()(),e.TgZ(50,"div",26)(51,"button",28),e.NdJ("click",function(){return i.save()}),e.qZA()()()()()()(),e.TgZ(52,"p-blockUI",29),e._UZ(53,"p-progressSpinner"),e.qZA(),e._UZ(54,"p-toast")),2&l){let g,x,E,I,A,M,D;e.xp6(11),e.Q6J("formGroup",i.userForm),e.xp6(7),e.Q6J("ngIf",(null==(g=i.userForm.get("fullname"))?null:g.invalid)&&(null==(g=i.userForm.get("fullname"))?null:g.dirty)),e.xp6(4),e.Q6J("options",i.roles)("showClear",!0)("virtualScroll",!0)("virtualScrollItemSize",30),e.xp6(3),e.Q6J("ngIf",(null==(x=i.userForm.get("user_rolesid"))?null:x.invalid)&&(null==(x=i.userForm.get("user_rolesid"))?null:x.dirty)),e.xp6(5),e.Q6J("ngIf",(null==(E=i.userForm.get("email"))?null:E.invalid)&&(null==(E=i.userForm.get("email"))?null:E.dirty)),e.xp6(5),e.Q6J("ngIf",(null==(I=i.userForm.get("phone"))?null:I.invalid)&&(null==(I=i.userForm.get("phone"))?null:I.dirty)),e.xp6(4),e.Q6J("toggleMask",!0),e.xp6(1),e.Q6J("ngIf",(null==(A=i.userForm.get("password"))?null:A.invalid)&&(null==(A=i.userForm.get("password"))?null:A.dirty)),e.xp6(4),e.Q6J("toggleMask",!0)("feedback",!1),e.xp6(1),e.Q6J("ngIf",(null==(M=i.userForm.get("password"))?null:M.invalid)&&(null==(M=i.userForm.get("password"))?null:M.dirty)),e.xp6(1),e.Q6J("ngIf",(null==i.userForm.errors?null:i.userForm.errors.passwordsDoNotMatch)&&(null==(D=i.userForm.get("password"))?null:D.dirty)),e.xp6(3),e.Q6J("disabled",!i.userForm.dirty),e.xp6(2),e.Q6J("loading",i.loading)("disabled",!i.userForm.valid||!i.userForm.dirty),e.xp6(1),e.Q6J("autoZIndex",!0)("blocked",i.loading)}},dependencies:[b.b,r.mk,r.O5,t._Y,t.Fj,t.JJ,t.JL,_.Hq,C.jx,h.H,d.o,c.Lt,t.sg,t.u,T.FN,z.G,B.ro],encapsulation:2})};P=(0,v.gn)([(0,p.k)()],P);let X=(()=>{class n{static#e=this.\u0275fac=function(i){return new(i||n)};static#t=this.\u0275mod=e.oAB({type:n});static#i=this.\u0275inj=e.cJS({imports:[u.Bz.forChild([{path:"",component:P}]),u.Bz]})}return n})();var ee=s(6263),te=s(3521);let ie=(()=>{class n{static#e=this.\u0275fac=function(i){return new(i||n)};static#t=this.\u0275mod=e.oAB({type:n});static#i=this.\u0275inj=e.cJS({imports:[b.u,r.ez,t.u5,X,_.hJ,h.T,d.j,c.kW,Z.O,a.A,t.u5,t.UX,_.hJ,h.T,T.EV,d.j,a.A,c.kW,ee.W,te.$,z.L,B.gz]})}return n})()},4204:(S,k,s)=>{s.d(k,{b:()=>F,u:()=>y});var r=s(6814),t=s(2029),h=s(5219),_=s(2076),d=s(2332);const c=["mask"];function Z(p,C){1&p&&t.GkF(0)}const a=function(p){return{"p-blockui-document":p,"p-blockui p-component-overlay p-component-overlay-enter":!0}},u=function(p){return{display:p}},v=["*"];let F=(()=>{class p{document;el;cd;config;renderer;target;autoZIndex=!0;baseZIndex=0;styleClass;get blocked(){return this._blocked}set blocked(e){this.mask&&this.mask.nativeElement?e?this.block():this.unblock():this._blocked=e}templates;mask;_blocked=!1;animationEndListener;contentTemplate;constructor(e,m,f,b,T){this.document=e,this.el=m,this.cd=f,this.config=b,this.renderer=T}ngAfterViewInit(){if(this.target&&!this.target.getBlockableElement)throw"Target of BlockUI must implement BlockableUI interface"}ngAfterContentInit(){this.templates.forEach(e=>{e.getType(),this.contentTemplate=e.template})}block(){this._blocked=!0,this.target?(this.target.getBlockableElement().appendChild(this.mask.nativeElement),this.target.getBlockableElement().style.position="relative"):this.renderer.appendChild(this.document.body,this.mask.nativeElement),this.autoZIndex&&d.P9.set("modal",this.mask.nativeElement,this.baseZIndex+this.config.zIndex.modal)}unblock(){this.mask&&(this.animationEndListener=this.renderer.listen(this.mask.nativeElement,"animationend",this.destroyModal.bind(this)),_.p.addClass(this.mask.nativeElement,"p-component-overlay-leave"))}destroyModal(){this._blocked=!1,this.mask&&(_.p.removeClass(this.mask.nativeElement,"p-component-overlay-leave"),d.P9.clear(this.mask.nativeElement),this.renderer.appendChild(this.el.nativeElement,this.mask.nativeElement)),this.unbindAnimationEndListener(),this.cd.markForCheck()}unbindAnimationEndListener(){this.animationEndListener&&this.mask&&(this.animationEndListener(),this.animationEndListener=null)}ngOnDestroy(){this.unblock(),this.destroyModal()}static \u0275fac=function(m){return new(m||p)(t.Y36(r.K0),t.Y36(t.SBq),t.Y36(t.sBO),t.Y36(h.b4),t.Y36(t.Qsj))};static \u0275cmp=t.Xpm({type:p,selectors:[["p-blockUI"]],contentQueries:function(m,f,b){if(1&m&&t.Suo(b,h.jx,4),2&m){let T;t.iGM(T=t.CRH())&&(f.templates=T)}},viewQuery:function(m,f){if(1&m&&t.Gf(c,5),2&m){let b;t.iGM(b=t.CRH())&&(f.mask=b.first)}},hostAttrs:[1,"p-element"],inputs:{target:"target",autoZIndex:"autoZIndex",baseZIndex:"baseZIndex",styleClass:"styleClass",blocked:"blocked"},ngContentSelectors:v,decls:4,vars:9,consts:[[3,"ngClass","ngStyle"],["mask",""],[4,"ngTemplateOutlet"]],template:function(m,f){1&m&&(t.F$t(),t.TgZ(0,"div",0,1),t.Hsn(2),t.YNc(3,Z,1,0,"ng-container",2),t.qZA()),2&m&&(t.Tol(f.styleClass),t.Q6J("ngClass",t.VKq(5,a,!f.target))("ngStyle",t.VKq(7,u,f.blocked?"flex":"none")),t.xp6(3),t.Q6J("ngTemplateOutlet",f.contentTemplate))},dependencies:[r.mk,r.tP,r.PC],styles:[".p-blockui{position:absolute;top:0;left:0;width:100%;height:100%;background-color:transparent;transition-property:background-color;display:flex;align-items:center;justify-content:center}.p-blockui.p-component-overlay{position:absolute}.p-blockui-document.p-component-overlay{position:fixed}.p-blockui-leave.p-component-overlay{background-color:transparent}\n"],encapsulation:2,changeDetection:0})}return p})(),y=(()=>{class p{static \u0275fac=function(m){return new(m||p)};static \u0275mod=t.oAB({type:p});static \u0275inj=t.cJS({imports:[r.ez]})}return p})()},6218:(S,k,s)=>{s.d(k,{A:()=>d,g:()=>_});var r=s(2029),t=s(6814),h=s(6223);let _=(()=>{class c{el;ngModel;control;cd;autoResize;onResize=new r.vpe;filled;cachedScrollHeight;ngModelSubscription;ngControlSubscription;constructor(a,u,v,F){this.el=a,this.ngModel=u,this.control=v,this.cd=F}ngOnInit(){this.ngModel&&(this.ngModelSubscription=this.ngModel.valueChanges.subscribe(()=>{this.updateState()})),this.control&&(this.ngControlSubscription=this.control.valueChanges.subscribe(()=>{this.updateState()}))}ngAfterViewInit(){this.autoResize&&this.resize(),this.updateFilledState(),this.cd.detectChanges()}onInput(a){this.updateState()}updateFilledState(){this.filled=this.el.nativeElement.value&&this.el.nativeElement.value.length}onFocus(a){this.autoResize&&this.resize(a)}onBlur(a){this.autoResize&&this.resize(a)}resize(a){this.el.nativeElement.style.height="auto",this.el.nativeElement.style.height=this.el.nativeElement.scrollHeight+"px",parseFloat(this.el.nativeElement.style.height)>=parseFloat(this.el.nativeElement.style.maxHeight)?(this.el.nativeElement.style.overflowY="scroll",this.el.nativeElement.style.height=this.el.nativeElement.style.maxHeight):this.el.nativeElement.style.overflow="hidden",this.onResize.emit(a||{})}updateState(){this.updateFilledState(),this.autoResize&&this.resize()}ngOnDestroy(){this.ngModelSubscription&&this.ngModelSubscription.unsubscribe(),this.ngControlSubscription&&this.ngControlSubscription.unsubscribe()}static \u0275fac=function(u){return new(u||c)(r.Y36(r.SBq),r.Y36(h.On,8),r.Y36(h.a5,8),r.Y36(r.sBO))};static \u0275dir=r.lG2({type:c,selectors:[["","pInputTextarea",""]],hostAttrs:[1,"p-inputtextarea","p-inputtext","p-component","p-element"],hostVars:4,hostBindings:function(u,v){1&u&&r.NdJ("input",function(y){return v.onInput(y)})("focus",function(y){return v.onFocus(y)})("blur",function(y){return v.onBlur(y)}),2&u&&r.ekj("p-filled",v.filled)("p-inputtextarea-resizable",v.autoResize)},inputs:{autoResize:"autoResize"},outputs:{onResize:"onResize"}})}return c})(),d=(()=>{class c{static \u0275fac=function(u){return new(u||c)};static \u0275mod=r.oAB({type:c});static \u0275inj=r.cJS({imports:[t.ez]})}return c})()},7680:(S,k,s)=>{s.d(k,{G:()=>h,L:()=>_});var r=s(6814),t=s(2029);let h=(()=>{class d{styleClass;style;strokeWidth="2";fill="none";animationDuration="2s";static \u0275fac=function(a){return new(a||d)};static \u0275cmp=t.Xpm({type:d,selectors:[["p-progressSpinner"]],hostAttrs:[1,"p-element"],inputs:{styleClass:"styleClass",style:"style",strokeWidth:"strokeWidth",fill:"fill",animationDuration:"animationDuration"},decls:3,vars:6,consts:[["role","alert","aria-busy","true",1,"p-progress-spinner",3,"ngStyle","ngClass"],["viewBox","25 25 50 50",1,"p-progress-spinner-svg"],["cx","50","cy","50","r","20","stroke-miterlimit","10",1,"p-progress-spinner-circle"]],template:function(a,u){1&a&&(t.TgZ(0,"div",0),t.O4$(),t.TgZ(1,"svg",1),t._UZ(2,"circle",2),t.qZA()()),2&a&&(t.Q6J("ngStyle",u.style)("ngClass",u.styleClass),t.xp6(1),t.Udp("animation-duration",u.animationDuration),t.xp6(1),t.uIk("fill",u.fill)("stroke-width",u.strokeWidth))},dependencies:[r.mk,r.PC],styles:['.p-progress-spinner{position:relative;margin:0 auto;width:100px;height:100px;display:inline-block}.p-progress-spinner:before{content:"";display:block;padding-top:100%}.p-progress-spinner-svg{animation:p-progress-spinner-rotate 2s linear infinite;height:100%;transform-origin:center center;width:100%;position:absolute;inset:0;margin:auto}.p-progress-spinner-circle{stroke-dasharray:89,200;stroke-dashoffset:0;stroke:#d62d20;animation:p-progress-spinner-dash 1.5s ease-in-out infinite,p-progress-spinner-color 6s ease-in-out infinite;stroke-linecap:round}@keyframes p-progress-spinner-rotate{to{transform:rotate(360deg)}}@keyframes p-progress-spinner-dash{0%{stroke-dasharray:1,200;stroke-dashoffset:0}50%{stroke-dasharray:89,200;stroke-dashoffset:-35px}to{stroke-dasharray:89,200;stroke-dashoffset:-124px}}@keyframes p-progress-spinner-color{to,0%{stroke:#d62d20}40%{stroke:#0057e7}66%{stroke:#008744}80%,90%{stroke:#ffa700}}\n'],encapsulation:2,changeDetection:0})}return d})(),_=(()=>{class d{static \u0275fac=function(a){return new(a||d)};static \u0275mod=t.oAB({type:d});static \u0275inj=t.cJS({imports:[r.ez]})}return d})()}}]);