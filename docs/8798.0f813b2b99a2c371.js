"use strict";(self.webpackChunkapollo_ng=self.webpackChunkapollo_ng||[]).push([[8798],{8798:(E,m,l)=>{l.r(m),l.d(m,{VerificationModule:()=>S});var u=l(6814),s=l(95),d=l(2129),e=l(9468),k=l(3859),g=l(3714),p=l(2076);const x={provide:s.Cf,useExisting:(0,e.Gpc)(()=>y),multi:!0},A={pint:/[\d]/,int:/[\d\-]/,pnum:/[\d\.]/,money:/[\d\.\s,]/,num:/[\d\-\.]/,hex:/[0-9a-f]/i,email:/[a-z0-9_\.\-@]/i,alpha:/[a-z_]/i,alphanum:/[a-z0-9_]/i},h={63234:37,63235:39,63232:38,63233:40,63276:33,63277:34,63272:46,63273:36,63275:35};let y=(()=>{class r{document;platformId;el;pValidateOnly;set pattern(i){this._pattern=i,this.regex=A[this._pattern]||this._pattern}get pattern(){return this._pattern}ngModelChange=new e.vpe;regex;_pattern;isAndroid;lastValue;constructor(i,t,n){this.document=i,this.platformId=t,this.el=n,this.isAndroid=!!(0,u.NF)(this.platformId)&&p.p.isAndroid()}isNavKeyPress(i){let t=i.keyCode;return t=p.p.getBrowser().safari&&h[t]||t,t>=33&&t<=40||13==t||9==t||27==t}isSpecialKey(i){let t=i.keyCode||i.charCode;return 9==t||13==t||27==t||16==t||17==t||t>=18&&t<=20||p.p.getBrowser().opera&&!i.shiftKey&&(8==t||t>=33&&t<=35||t>=36&&t<=39||t>=44&&t<=45)}getKey(i){let t=i.keyCode||i.charCode;return p.p.getBrowser().safari&&h[t]||t}getCharCode(i){return i.charCode||i.keyCode||i.which}findDelta(i,t){let n="";for(let a=0;a<i.length;a++)i.substr(0,a)+i.substr(a+i.length-t.length)===t&&(n=i.substr(a,i.length-t.length));return n}isValidChar(i){return this.regex.test(i)}isValidString(i){for(let t=0;t<i.length;t++)if(!this.isValidChar(i.substr(t,1)))return!1;return!0}onInput(i){if(this.isAndroid&&!this.pValidateOnly){let t=this.el.nativeElement.value,n=this.lastValue||"",a=this.findDelta(t,n),o=this.findDelta(n,t);a.length>1||!a&&!o?this.isValidString(t)||(this.el.nativeElement.value=n,this.ngModelChange.emit(n)):o||this.isValidChar(a)||(this.el.nativeElement.value=n,this.ngModelChange.emit(n)),t=this.el.nativeElement.value,this.isValidString(t)&&(this.lastValue=t)}}onKeyPress(i){if(this.isAndroid||this.pValidateOnly)return;let t=p.p.getBrowser(),n=this.getKey(i);if(t.mozilla&&(i.ctrlKey||i.altKey))return;if(17==n||18==n)return;let a=this.getCharCode(i),o=String.fromCharCode(a),f=!0;!t.mozilla&&(this.isSpecialKey(i)||!o)||(f=this.regex.test(o),f||i.preventDefault())}onPaste(i){const t=i.clipboardData||this.document.defaultView.clipboardData.getData("text");if(t){const n=t.getData("text");for(let a of n.toString())if(!this.regex.test(a))return void i.preventDefault()}}validate(i){if(this.pValidateOnly){let t=this.el.nativeElement.value;if(t&&!this.regex.test(t))return{validatePattern:!1}}}static \u0275fac=function(t){return new(t||r)(e.Y36(u.K0),e.Y36(e.Lbi),e.Y36(e.SBq))};static \u0275dir=e.lG2({type:r,selectors:[["","pKeyFilter",""]],hostAttrs:[1,"p-element"],hostBindings:function(t,n){1&t&&e.NdJ("input",function(o){return n.onInput(o)})("keypress",function(o){return n.onKeyPress(o)})("paste",function(o){return n.onPaste(o)})},inputs:{pValidateOnly:"pValidateOnly",pattern:["pKeyFilter","pattern"]},outputs:{ngModelChange:"ngModelChange"},features:[e._Bn([x])]})}return r})(),T=(()=>{class r{static \u0275fac=function(t){return new(t||r)};static \u0275mod=e.oAB({type:r});static \u0275inj=e.cJS({imports:[u.ez]})}return r})();var v=l(707),C=l(4480),M=l(1111);const V=function(){return["/"]};let D=(()=>{class r{constructor(i){this.layoutService=i}get dark(){return"light"!==this.layoutService.config.colorScheme}onDigitInput(i){let t;"Backspace"!==i.code&&(i.code.includes("Numpad")||i.code.includes("Digit"))&&(t=i.srcElement.nextElementSibling),"Backspace"===i.code&&(t=i.srcElement.previousElementSibling),t?.focus()}static#t=this.\u0275fac=function(t){return new(t||r)(e.Y36(k.P))};static#e=this.\u0275cmp=e.Xpm({type:r,selectors:[["ng-component"]],decls:27,vars:10,consts:[["xmlns","http://www.w3.org/2000/svg","viewBox","0 0 1600 800","preserveAspectRatio","none",1,"fixed","left-0","top-0","min-h-screen","min-w-screen"],["width","1600","height","800"],["d","M478.4 581c3.2 0.8 6.4 1.7 9.5 2.5c196.2 52.5 388.7 133.5 593.5 176.6c174.2 36.6 349.5 29.2 518.6-10.2V0H0v574.9c52.3-17.6 106.5-27.7 161.1-30.9C268.4 537.4 375.7 554.2 478.4 581z"],["d","M181.8 259.4c98.2 6 191.9 35.2 281.3 72.1c2.8 1.1 5.5 2.3 8.3 3.4c171 71.6 342.7 158.5 531.3 207.7c198.8 51.8 403.4 40.8 597.3-14.8V0H0v283.2C59 263.6 120.6 255.7 181.8 259.4z"],["d","M454.9 86.3C600.7 177 751.6 269.3 924.1 325c208.6 67.4 431.3 60.8 637.9-5.3c12.8-4.1 25.4-8.4 38.1-12.9V0H288.1c56 21.3 108.7 50.6 159.7 82C450.2 83.4 452.5 84.9 454.9 86.3z"],["d","M1397.5 154.8c47.2-10.6 93.6-25.3 138.6-43.8c21.7-8.9 43-18.8 63.9-29.5V0H643.4c62.9 41.7 129.7 78.2 202.1 107.4C1020.4 178.1 1214.2 196.1 1397.5 154.8z"],[1,"px-5","min-h-screen","flex","justify-content-center","align-items-center"],[1,"border-1","surface-border","surface-card","border-round","py-7","px-4","md:px-7","z-1"],[1,"mb-4"],[1,"text-900","text-xl","font-bold","mb-2"],[1,"text-600","font-medium"],[1,"flex","align-items-center","mt-1"],[1,"pi","pi-envelope","text-600"],[1,"text-900","font-bold","ml-2"],[1,"flex","flex-column"],[1,"flex","justify-content-between","w-full","align-items-center","mb-4","gap-3"],["pInputText","","pKeyFilter","num","maxlength","1",1,"w-3rem","text-center",3,"ngModel","keyup"],[1,"flex","flex-wrap","gap-2","justify-content-between"],["pButton","","pRipple","","label","Cancel",1,"flex-auto","p-button-outlined",3,"routerLink"],["pButton","","pRipple","","label","Verify",1,"flex-auto",3,"routerLink"],[3,"minimal"]],template:function(t,n){1&t&&(e.O4$(),e.TgZ(0,"svg",0),e._UZ(1,"rect",1)(2,"path",2)(3,"path",3)(4,"path",4)(5,"path",5),e.qZA(),e.kcU(),e.TgZ(6,"div",6)(7,"div",7)(8,"div",8)(9,"div",9),e._uU(10,"Verification"),e.qZA(),e.TgZ(11,"span",10),e._uU(12,"We have sent code to you email:"),e.qZA(),e.TgZ(13,"div",11),e._UZ(14,"i",12),e.TgZ(15,"span",13),e._uU(16,"dm**@gmail.com"),e.qZA()()(),e.TgZ(17,"div",14)(18,"div",15)(19,"input",16),e.NdJ("ngModel",function(){return n.val1})("keyup",function(o){return n.onDigitInput(o)}),e.qZA(),e.TgZ(20,"input",16),e.NdJ("ngModel",function(){return n.val2})("keyup",function(o){return n.onDigitInput(o)}),e.qZA(),e.TgZ(21,"input",16),e.NdJ("ngModel",function(){return n.val3})("keyup",function(o){return n.onDigitInput(o)}),e.qZA(),e.TgZ(22,"input",16),e.NdJ("ngModel",function(){return n.val4})("keyup",function(o){return n.onDigitInput(o)}),e.qZA()(),e.TgZ(23,"div",17),e._UZ(24,"button",18)(25,"button",19),e.qZA()()()(),e._UZ(26,"app-config",20)),2&t&&(e.xp6(1),e.uIk("fill",n.dark?"var(--primary-900)":"var(--primary-500)"),e.xp6(1),e.uIk("fill",n.dark?"var(--primary-800)":"var(--primary-400)"),e.xp6(1),e.uIk("fill",n.dark?"var(--primary-700)":"var(--primary-300)"),e.xp6(1),e.uIk("fill",n.dark?"var(--primary-600)":"var(--primary-200)"),e.xp6(1),e.uIk("fill",n.dark?"var(--primary-500)":"var(--primary-100)"),e.xp6(19),e.Q6J("routerLink",e.DdM(8,V)),e.xp6(1),e.Q6J("routerLink",e.DdM(9,V)),e.xp6(1),e.Q6J("minimal",!0))},dependencies:[d.rH,s.Fj,s.JJ,s.nD,s.On,g.o,y,v.Hq,C.H,M.P],encapsulation:2})}return r})(),K=(()=>{class r{static#t=this.\u0275fac=function(t){return new(t||r)};static#e=this.\u0275mod=e.oAB({type:r});static#i=this.\u0275inj=e.cJS({imports:[d.Bz.forChild([{path:"",component:D}]),d.Bz]})}return r})();var B=l(1567);let S=(()=>{class r{static#t=this.\u0275fac=function(t){return new(t||r)};static#e=this.\u0275mod=e.oAB({type:r});static#i=this.\u0275inj=e.cJS({imports:[u.ez,K,s.u5,g.j,T,v.hJ,C.T,B.h]})}return r})()}}]);