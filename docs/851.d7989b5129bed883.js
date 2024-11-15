"use strict";(self.webpackChunknfc_reserve=self.webpackChunknfc_reserve||[]).push([[851],{6476:(v,m,e)=>{e.r(m),e.d(m,{ForgotPasswordModule:()=>Z});var r=e(6814),o=e(6223),p=e(9515),i=e(707),f=e(3714),d=e(3521),u=e(1567),n=e(9739),g=e(5219),h=e(1836),t=e(2029),C=e(1850);const x=function(){return["/auth/login"]};let w=(()=>{class s{constructor(c,a,l){this.fb=c,this.authService=a,this.messageService=l,this.loading=!1,this.forgotPasswordForm=this.fb.group({email:["",[o.kI.required,(0,h.u)()]]})}passwordReset(c){c.preventDefault();const a=this.forgotPasswordForm.get("email")?.value;a&&(this.loading=!0,this.authService.passwordReset(a).subscribe({next:()=>{this.loading=!1,this.forgotPasswordForm.reset({email:""}),this.messageService.add({severity:"success",summary:"",detail:"Elk\xfcldt\xfck a jelsz\xf3v\xe1ltoztat\xe1si k\xe9relmet!"})},error:l=>{this.loading=!1,console.error("Login failed",l),this.messageService.add({severity:"error",summary:"",detail:"Hib\xe1s a megadott jelsz\xf3!"})}}))}static#t=this.\u0275fac=function(a){return new(a||s)(t.Y36(o.qu),t.Y36(C.e),t.Y36(g.ez))};static#e=this.\u0275cmp=t.Xpm({type:s,selectors:[["ng-component"]],features:[t._Bn([g.ez])],decls:27,vars:27,consts:[["xmlns","http://www.w3.org/2000/svg","viewBox","0 0 1600 800","preserveAspectRatio","none",1,"fixed","left-0","top-0","min-h-screen","min-w-screen"],["width","1600","height","800"],["d","M478.4 581c3.2 0.8 6.4 1.7 9.5 2.5c196.2 52.5 388.7 133.5 593.5 176.6c174.2 36.6 349.5 29.2 518.6-10.2V0H0v574.9c52.3-17.6 106.5-27.7 161.1-30.9C268.4 537.4 375.7 554.2 478.4 581z"],["d","M181.8 259.4c98.2 6 191.9 35.2 281.3 72.1c2.8 1.1 5.5 2.3 8.3 3.4c171 71.6 342.7 158.5 531.3 207.7c198.8 51.8 403.4 40.8 597.3-14.8V0H0v283.2C59 263.6 120.6 255.7 181.8 259.4z"],["d","M454.9 86.3C600.7 177 751.6 269.3 924.1 325c208.6 67.4 431.3 60.8 637.9-5.3c12.8-4.1 25.4-8.4 38.1-12.9V0H288.1c56 21.3 108.7 50.6 159.7 82C450.2 83.4 452.5 84.9 454.9 86.3z"],["d","M1397.5 154.8c47.2-10.6 93.6-25.3 138.6-43.8c21.7-8.9 43-18.8 63.9-29.5V0H643.4c62.9 41.7 129.7 78.2 202.1 107.4C1020.4 178.1 1214.2 196.1 1397.5 154.8z"],[3,"formGroup","ngSubmit"],[1,"px-5","min-h-screen","flex","justify-content-center","align-items-center"],[1,"border-1","surface-border","surface-card","border-round","py-7","px-4","md:px-7","z-1"],[1,"mb-4"],[1,"text-900","text-xl","font-bold","mb-2"],[1,"text-600","font-medium"],[1,"flex","flex-column"],[1,"p-input-icon-left","w-full","mb-4"],[1,"pi","pi-envelope"],["id","email","formControlName","email","type","text","pInputText","","required","",1,"w-full","md:w-25rem",3,"placeholder","email"],["icon","",3,"closable"],[1,"flex","flex-wrap","gap-2","justify-content-between"],["pButton","","pRipple","","type","button",1,"flex-auto","p-button-outlined",3,"label","routerLink"],["pButton","","pRipple","","type","submit",1,"flex-auto",3,"label","loading","disabled"]],template:function(a,l){1&a&&(t.O4$(),t.TgZ(0,"svg",0),t._UZ(1,"rect",1)(2,"path",2)(3,"path",3)(4,"path",4)(5,"path",5),t.qZA(),t.kcU(),t.TgZ(6,"form",6),t.NdJ("ngSubmit",function(b){return l.passwordReset(b)}),t.TgZ(7,"div",7)(8,"div",8)(9,"div",9)(10,"div",10),t._uU(11),t.ALo(12,"translate"),t.qZA(),t.TgZ(13,"span",11),t._uU(14),t.ALo(15,"translate"),t.qZA()(),t.TgZ(16,"div",12)(17,"span",13),t._UZ(18,"i",14)(19,"input",15),t.ALo(20,"translate"),t.qZA(),t._UZ(21,"p-messages",16),t.TgZ(22,"div",17),t._UZ(23,"button",18),t.ALo(24,"translate"),t._UZ(25,"button",19),t.ALo(26,"translate"),t.qZA()()()()()),2&a&&(t.xp6(1),t.uIk("fill","var(--primary-500)"),t.xp6(1),t.uIk("fill","var(--primary-400)"),t.xp6(1),t.uIk("fill","var(--primary-300)"),t.xp6(1),t.uIk("fill","var(--primary-200)"),t.xp6(1),t.uIk("fill","var(--primary-100)"),t.xp6(1),t.Q6J("formGroup",l.forgotPasswordForm),t.xp6(5),t.Oqu(t.lcZ(12,16,"Elfelejtett jelsz\xf3")),t.xp6(3),t.Oqu(t.lcZ(15,18,"Adja meg a bejelentkez\xe9si email c\xedm\xe9t")),t.xp6(5),t.s9C("placeholder",t.lcZ(20,20,"Email")),t.Q6J("email",!0),t.xp6(2),t.Q6J("closable",!1),t.xp6(2),t.s9C("label",t.lcZ(24,22,"Vissza")),t.Q6J("routerLink",t.DdM(26,x)),t.xp6(2),t.s9C("label",t.lcZ(26,24,"Elk\xfcld")),t.Q6J("loading",l.loading)("disabled",!l.forgotPasswordForm.valid))},dependencies:[o._Y,o.Fj,o.JJ,o.JL,o.Q7,o.on,o.sg,o.u,i.Hq,f.o,n.rH,d.V,p.X$],encapsulation:2})}return s})(),y=(()=>{class s{static#t=this.\u0275fac=function(a){return new(a||s)};static#e=this.\u0275mod=t.oAB({type:s});static#o=this.\u0275inj=t.cJS({imports:[n.Bz.forChild([{path:"",component:w}]),n.Bz]})}return s})(),Z=(()=>{class s{static#t=this.\u0275fac=function(a){return new(a||s)};static#e=this.\u0275mod=t.oAB({type:s});static#o=this.\u0275inj=t.cJS({imports:[r.ez,o.u5,o.UX,p.aw,i.hJ,f.j,y,u.h,d.$]})}return s})()},2591:(v,m,e)=>{e.d(m,{n:()=>p});var r=e(2029),o=e(4713);let p=(()=>{class i extends o.s{static \u0275fac=function(){let d;return function(n){return(d||(d=r.n5z(i)))(n||i)}}();static \u0275cmp=r.Xpm({type:i,selectors:[["CheckIcon"]],standalone:!0,features:[r.qOj,r.jDz],decls:2,vars:5,consts:[["width","14","height","14","viewBox","0 0 14 14","fill","none","xmlns","http://www.w3.org/2000/svg"],["d","M4.86199 11.5948C4.78717 11.5923 4.71366 11.5745 4.64596 11.5426C4.57826 11.5107 4.51779 11.4652 4.46827 11.4091L0.753985 7.69483C0.683167 7.64891 0.623706 7.58751 0.580092 7.51525C0.536478 7.44299 0.509851 7.36177 0.502221 7.27771C0.49459 7.19366 0.506156 7.10897 0.536046 7.03004C0.565935 6.95111 0.613367 6.88 0.674759 6.82208C0.736151 6.76416 0.8099 6.72095 0.890436 6.69571C0.970973 6.67046 1.05619 6.66385 1.13966 6.67635C1.22313 6.68886 1.30266 6.72017 1.37226 6.76792C1.44186 6.81567 1.4997 6.8786 1.54141 6.95197L4.86199 10.2503L12.6397 2.49483C12.7444 2.42694 12.8689 2.39617 12.9932 2.40745C13.1174 2.41873 13.2343 2.47141 13.3251 2.55705C13.4159 2.64268 13.4753 2.75632 13.4938 2.87973C13.5123 3.00315 13.4888 3.1292 13.4271 3.23768L5.2557 11.4091C5.20618 11.4652 5.14571 11.5107 5.07801 11.5426C5.01031 11.5745 4.9368 11.5923 4.86199 11.5948Z","fill","currentColor"]],template:function(u,n){1&u&&(r.O4$(),r.TgZ(0,"svg",0),r._UZ(1,"path",1),r.qZA()),2&u&&(r.Tol(n.getClassNames()),r.uIk("aria-label",n.ariaLabel)("aria-hidden",n.ariaHidden)("role",n.role))},encapsulation:2})}return i})()}}]);