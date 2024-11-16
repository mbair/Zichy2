"use strict";(self.webpackChunknfc_reserve=self.webpackChunknfc_reserve||[]).push([[476],{6476:(F,n,e)=>{e.r(n),e.d(n,{ForgotPasswordModule:()=>b});var f=e(6814),r=e(6223),m=e(9515),c=e(707),u=e(3714),d=e(3521),g=e(1567),l=e(9739),p=e(5219),v=e(1836),t=e(2029),h=e(1850);const x=function(){return["/auth/login"]};let y=(()=>{class s{constructor(i,o,a){this.fb=i,this.authService=o,this.messageService=a,this.loading=!1,this.forgotPasswordForm=this.fb.group({email:["",[r.kI.required,(0,v.u)()]]})}passwordReset(i){i.preventDefault();const o=this.forgotPasswordForm.get("email")?.value;o&&(this.loading=!0,this.authService.passwordReset(o).subscribe({next:()=>{this.loading=!1,this.forgotPasswordForm.reset({email:""}),this.messageService.add({severity:"success",summary:"",detail:"Elk\xfcldt\xfck a jelsz\xf3v\xe1ltoztat\xe1si k\xe9relmet!"})},error:a=>{this.loading=!1,console.error("Login failed",a),this.messageService.add({severity:"error",summary:"",detail:"Hib\xe1s a megadott jelsz\xf3!"})}}))}static#t=this.\u0275fac=function(o){return new(o||s)(t.Y36(r.qu),t.Y36(h.e),t.Y36(p.ez))};static#e=this.\u0275cmp=t.Xpm({type:s,selectors:[["ng-component"]],features:[t._Bn([p.ez])],decls:27,vars:27,consts:[["xmlns","http://www.w3.org/2000/svg","viewBox","0 0 1600 800","preserveAspectRatio","none",1,"fixed","left-0","top-0","min-h-screen","min-w-screen"],["width","1600","height","800"],["d","M478.4 581c3.2 0.8 6.4 1.7 9.5 2.5c196.2 52.5 388.7 133.5 593.5 176.6c174.2 36.6 349.5 29.2 518.6-10.2V0H0v574.9c52.3-17.6 106.5-27.7 161.1-30.9C268.4 537.4 375.7 554.2 478.4 581z"],["d","M181.8 259.4c98.2 6 191.9 35.2 281.3 72.1c2.8 1.1 5.5 2.3 8.3 3.4c171 71.6 342.7 158.5 531.3 207.7c198.8 51.8 403.4 40.8 597.3-14.8V0H0v283.2C59 263.6 120.6 255.7 181.8 259.4z"],["d","M454.9 86.3C600.7 177 751.6 269.3 924.1 325c208.6 67.4 431.3 60.8 637.9-5.3c12.8-4.1 25.4-8.4 38.1-12.9V0H288.1c56 21.3 108.7 50.6 159.7 82C450.2 83.4 452.5 84.9 454.9 86.3z"],["d","M1397.5 154.8c47.2-10.6 93.6-25.3 138.6-43.8c21.7-8.9 43-18.8 63.9-29.5V0H643.4c62.9 41.7 129.7 78.2 202.1 107.4C1020.4 178.1 1214.2 196.1 1397.5 154.8z"],[3,"formGroup","ngSubmit"],[1,"px-5","min-h-screen","flex","justify-content-center","align-items-center"],[1,"border-1","surface-border","surface-card","border-round","py-7","px-4","md:px-7","z-1"],[1,"mb-4"],[1,"text-900","text-xl","font-bold","mb-2"],[1,"text-600","font-medium"],[1,"flex","flex-column"],[1,"p-input-icon-left","w-full","mb-4"],[1,"pi","pi-envelope"],["id","email","formControlName","email","type","text","pInputText","","required","",1,"w-full","md:w-25rem",3,"placeholder","email"],["icon","",3,"closable"],[1,"flex","flex-wrap","gap-2","justify-content-between"],["pButton","","pRipple","","type","button",1,"flex-auto","p-button-outlined",3,"label","routerLink"],["pButton","","pRipple","","type","submit",1,"flex-auto",3,"label","loading","disabled"]],template:function(o,a){1&o&&(t.O4$(),t.TgZ(0,"svg",0),t._UZ(1,"rect",1)(2,"path",2)(3,"path",3)(4,"path",4)(5,"path",5),t.qZA(),t.kcU(),t.TgZ(6,"form",6),t.NdJ("ngSubmit",function(w){return a.passwordReset(w)}),t.TgZ(7,"div",7)(8,"div",8)(9,"div",9)(10,"div",10),t._uU(11),t.ALo(12,"translate"),t.qZA(),t.TgZ(13,"span",11),t._uU(14),t.ALo(15,"translate"),t.qZA()(),t.TgZ(16,"div",12)(17,"span",13),t._UZ(18,"i",14)(19,"input",15),t.ALo(20,"translate"),t.qZA(),t._UZ(21,"p-messages",16),t.TgZ(22,"div",17),t._UZ(23,"button",18),t.ALo(24,"translate"),t._UZ(25,"button",19),t.ALo(26,"translate"),t.qZA()()()()()),2&o&&(t.xp6(1),t.uIk("fill","var(--primary-500)"),t.xp6(1),t.uIk("fill","var(--primary-400)"),t.xp6(1),t.uIk("fill","var(--primary-300)"),t.xp6(1),t.uIk("fill","var(--primary-200)"),t.xp6(1),t.uIk("fill","var(--primary-100)"),t.xp6(1),t.Q6J("formGroup",a.forgotPasswordForm),t.xp6(5),t.Oqu(t.lcZ(12,16,"Elfelejtett jelsz\xf3")),t.xp6(3),t.Oqu(t.lcZ(15,18,"Adja meg a bejelentkez\xe9si email c\xedm\xe9t")),t.xp6(5),t.s9C("placeholder",t.lcZ(20,20,"Email")),t.Q6J("email",!0),t.xp6(2),t.Q6J("closable",!1),t.xp6(2),t.s9C("label",t.lcZ(24,22,"Vissza")),t.Q6J("routerLink",t.DdM(26,x)),t.xp6(2),t.s9C("label",t.lcZ(26,24,"Elk\xfcld")),t.Q6J("loading",a.loading)("disabled",!a.forgotPasswordForm.valid))},dependencies:[r._Y,r.Fj,r.JJ,r.JL,r.Q7,r.on,r.sg,r.u,c.Hq,u.o,l.rH,d.V,m.X$],encapsulation:2})}return s})(),Z=(()=>{class s{static#t=this.\u0275fac=function(o){return new(o||s)};static#e=this.\u0275mod=t.oAB({type:s});static#s=this.\u0275inj=t.cJS({imports:[l.Bz.forChild([{path:"",component:y}]),l.Bz]})}return s})(),b=(()=>{class s{static#t=this.\u0275fac=function(o){return new(o||s)};static#e=this.\u0275mod=t.oAB({type:s});static#s=this.\u0275inj=t.cJS({imports:[f.ez,r.u5,r.UX,m.aw,c.hJ,u.j,Z,g.h,d.$]})}return s})()}}]);