"use strict";(self.webpackChunkapollo_ng=self.webpackChunkapollo_ng||[]).push([[6683],{5212:(g,p,i)=>{i.r(p),i.d(p,{FileDemoModule:()=>F});var o=i(6814),m=i(95),d=i(3722),a=i(2129),r=i(5219),e=i(9468);function c(t,u){if(1&t&&(e.TgZ(0,"li"),e._uU(1),e.qZA()),2&t){const n=u.$implicit;e.xp6(1),e.AsE("",n.name," - ",n.size," bytes")}}function s(t,u){if(1&t&&(e.TgZ(0,"ul"),e.YNc(1,c,2,2,"li",7),e.qZA()),2&t){const n=e.oxw(2);e.xp6(1),e.Q6J("ngForOf",n.uploadedFiles)}}function h(t,u){if(1&t&&e.YNc(0,s,2,1,"ul",6),2&t){const n=e.oxw();e.Q6J("ngIf",n.uploadedFiles.length)}}let C=(()=>{class t{constructor(n){this.messageService=n,this.uploadedFiles=[]}onUpload(n){for(const l of n.files)this.uploadedFiles.push(l);this.messageService.add({severity:"info",summary:"Success",detail:"File Uploaded"})}onBasicUpload(){this.messageService.add({severity:"info",summary:"Success",detail:"File Uploaded with Basic Mode"})}static#e=this.\u0275fac=function(l){return new(l||t)(e.Y36(r.ez))};static#t=this.\u0275cmp=e.Xpm({type:t,selectors:[["ng-component"]],features:[e._Bn([r.ez])],decls:10,vars:3,consts:[[1,"grid"],[1,"col-12"],[1,"card"],["name","demo[]","url","./upload.php","accept","image/*",3,"multiple","maxFileSize","onUpload"],["pTemplate","content"],["mode","basic","name","demo[]","url","./upload.php","accept","image/*",3,"maxFileSize","onUpload"],[4,"ngIf"],[4,"ngFor","ngForOf"]],template:function(l,f){1&l&&(e.TgZ(0,"div",0)(1,"div",1)(2,"div",2)(3,"h5"),e._uU(4,"Advanced"),e.qZA(),e.TgZ(5,"p-fileUpload",3),e.NdJ("onUpload",function(U){return f.onUpload(U)}),e.YNc(6,h,1,1,"ng-template",4),e.qZA(),e.TgZ(7,"h5"),e._uU(8,"Basic"),e.qZA(),e.TgZ(9,"p-fileUpload",5),e.NdJ("onUpload",function(){return f.onBasicUpload()}),e.qZA()()()()),2&l&&(e.xp6(5),e.Q6J("multiple",!0)("maxFileSize",1e6),e.xp6(4),e.Q6J("maxFileSize",1e6))},dependencies:[o.sg,o.O5,d.p,r.jx],encapsulation:2})}return t})(),_=(()=>{class t{static#e=this.\u0275fac=function(l){return new(l||t)};static#t=this.\u0275mod=e.oAB({type:t});static#o=this.\u0275inj=e.cJS({imports:[a.Bz.forChild([{path:"",component:C}]),a.Bz]})}return t})(),F=(()=>{class t{static#e=this.\u0275fac=function(l){return new(l||t)};static#t=this.\u0275mod=e.oAB({type:t});static#o=this.\u0275inj=e.cJS({imports:[o.ez,m.u5,_,d.O]})}return t})()},2591:(g,p,i)=>{i.d(p,{n:()=>d});var o=i(9468),m=i(4713);let d=(()=>{class a extends m.s{static \u0275fac=function(){let e;return function(s){return(e||(e=o.n5z(a)))(s||a)}}();static \u0275cmp=o.Xpm({type:a,selectors:[["CheckIcon"]],standalone:!0,features:[o.qOj,o.jDz],decls:2,vars:5,consts:[["width","14","height","14","viewBox","0 0 14 14","fill","none","xmlns","http://www.w3.org/2000/svg"],["d","M4.86199 11.5948C4.78717 11.5923 4.71366 11.5745 4.64596 11.5426C4.57826 11.5107 4.51779 11.4652 4.46827 11.4091L0.753985 7.69483C0.683167 7.64891 0.623706 7.58751 0.580092 7.51525C0.536478 7.44299 0.509851 7.36177 0.502221 7.27771C0.49459 7.19366 0.506156 7.10897 0.536046 7.03004C0.565935 6.95111 0.613367 6.88 0.674759 6.82208C0.736151 6.76416 0.8099 6.72095 0.890436 6.69571C0.970973 6.67046 1.05619 6.66385 1.13966 6.67635C1.22313 6.68886 1.30266 6.72017 1.37226 6.76792C1.44186 6.81567 1.4997 6.8786 1.54141 6.95197L4.86199 10.2503L12.6397 2.49483C12.7444 2.42694 12.8689 2.39617 12.9932 2.40745C13.1174 2.41873 13.2343 2.47141 13.3251 2.55705C13.4159 2.64268 13.4753 2.75632 13.4938 2.87973C13.5123 3.00315 13.4888 3.1292 13.4271 3.23768L5.2557 11.4091C5.20618 11.4652 5.14571 11.5107 5.07801 11.5426C5.01031 11.5745 4.9368 11.5923 4.86199 11.5948Z","fill","currentColor"]],template:function(c,s){1&c&&(o.O4$(),o.TgZ(0,"svg",0),o._UZ(1,"path",1),o.qZA()),2&c&&(o.Tol(s.getClassNames()),o.uIk("aria-label",s.ariaLabel)("aria-hidden",s.ariaHidden)("role",s.role))},encapsulation:2})}return a})()}}]);