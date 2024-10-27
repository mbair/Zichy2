"use strict";(self.webpackChunknfc_reserve=self.webpackChunknfc_reserve||[]).push([[3622],{3139:(V,S,a)=>{a.d(S,{Q:()=>w});var g=a(8645),o=a(2029);let w=(()=>{class C{constructor(){this.mealChanged=new g.x,this.meals={breakfast:{begin:7,end:10},lunch:{begin:11,end:15},dinner:{begin:17,end:20}},this.checkMealStart(),setInterval(()=>{this.checkMealStart()},2e4)}checkMealStart(){const p=(new Date).getHours();for(const u of Object.keys(this.meals)){const T=this.meals[u];if(p>=T.begin&&p<T.end)return void this.mealChanged.next(u)}}getMealNameByTime(m){const p=m.getHours();for(const u in this.meals){const T=this.meals[u];if(p>=T.begin&&p<=T.end)return this.translateMealName(u)}return"Jelenleg nincs \xe9tkeztet\xe9s"}getMealsForSelector(){let m=[];for(const p in this.meals)m.push(this.translateMealName(p));return m}translateMealName(m){return{breakfast:"reggeli",lunch:"eb\xe9d",dinner:"vacsora"}[m]||m}isOpen(){const m=(new Date).getHours();for(const p in this.meals){const u=this.meals[p];if(m>=u.begin&&m<u.end)return!0}return!1}static#e=this.\u0275fac=function(p){return new(p||C)};static#t=this.\u0275prov=o.Yz7({token:C,factory:C.\u0275fac,providedIn:"root"})}return C})()},4204:(V,S,a)=>{a.d(S,{b:()=>M,u:()=>c});var g=a(6814),o=a(2029),w=a(5219),C=a(2076),b=a(2332);const m=["mask"];function p(d,_){1&d&&o.GkF(0)}const u=function(d){return{"p-blockui-document":d,"p-blockui p-component-overlay p-component-overlay-enter":!0}},T=function(d){return{display:d}},L=["*"];let M=(()=>{class d{document;el;cd;config;renderer;target;autoZIndex=!0;baseZIndex=0;styleClass;get blocked(){return this._blocked}set blocked(h){this.mask&&this.mask.nativeElement?h?this.block():this.unblock():this._blocked=h}templates;mask;_blocked=!1;animationEndListener;contentTemplate;constructor(h,f,y,I,D){this.document=h,this.el=f,this.cd=y,this.config=I,this.renderer=D}ngAfterViewInit(){if(this.target&&!this.target.getBlockableElement)throw"Target of BlockUI must implement BlockableUI interface"}ngAfterContentInit(){this.templates.forEach(h=>{h.getType(),this.contentTemplate=h.template})}block(){this._blocked=!0,this.target?(this.target.getBlockableElement().appendChild(this.mask.nativeElement),this.target.getBlockableElement().style.position="relative"):this.renderer.appendChild(this.document.body,this.mask.nativeElement),this.autoZIndex&&b.P9.set("modal",this.mask.nativeElement,this.baseZIndex+this.config.zIndex.modal)}unblock(){this.mask&&(this.animationEndListener=this.renderer.listen(this.mask.nativeElement,"animationend",this.destroyModal.bind(this)),C.p.addClass(this.mask.nativeElement,"p-component-overlay-leave"))}destroyModal(){this._blocked=!1,this.mask&&(C.p.removeClass(this.mask.nativeElement,"p-component-overlay-leave"),b.P9.clear(this.mask.nativeElement),this.renderer.appendChild(this.el.nativeElement,this.mask.nativeElement)),this.unbindAnimationEndListener(),this.cd.markForCheck()}unbindAnimationEndListener(){this.animationEndListener&&this.mask&&(this.animationEndListener(),this.animationEndListener=null)}ngOnDestroy(){this.unblock(),this.destroyModal()}static \u0275fac=function(f){return new(f||d)(o.Y36(g.K0),o.Y36(o.SBq),o.Y36(o.sBO),o.Y36(w.b4),o.Y36(o.Qsj))};static \u0275cmp=o.Xpm({type:d,selectors:[["p-blockUI"]],contentQueries:function(f,y,I){if(1&f&&o.Suo(I,w.jx,4),2&f){let D;o.iGM(D=o.CRH())&&(y.templates=D)}},viewQuery:function(f,y){if(1&f&&o.Gf(m,5),2&f){let I;o.iGM(I=o.CRH())&&(y.mask=I.first)}},hostAttrs:[1,"p-element"],inputs:{target:"target",autoZIndex:"autoZIndex",baseZIndex:"baseZIndex",styleClass:"styleClass",blocked:"blocked"},ngContentSelectors:L,decls:4,vars:9,consts:[[3,"ngClass","ngStyle"],["mask",""],[4,"ngTemplateOutlet"]],template:function(f,y){1&f&&(o.F$t(),o.TgZ(0,"div",0,1),o.Hsn(2),o.YNc(3,p,1,0,"ng-container",2),o.qZA()),2&f&&(o.Tol(y.styleClass),o.Q6J("ngClass",o.VKq(5,u,!y.target))("ngStyle",o.VKq(7,T,y.blocked?"flex":"none")),o.xp6(3),o.Q6J("ngTemplateOutlet",y.contentTemplate))},dependencies:[g.mk,g.tP,g.PC],styles:[".p-blockui{position:absolute;top:0;left:0;width:100%;height:100%;background-color:transparent;transition-property:background-color;display:flex;align-items:center;justify-content:center}.p-blockui.p-component-overlay{position:absolute}.p-blockui-document.p-component-overlay{position:fixed}.p-blockui-leave.p-component-overlay{background-color:transparent}\n"],encapsulation:2,changeDetection:0})}return d})(),c=(()=>{class d{static \u0275fac=function(f){return new(f||d)};static \u0275mod=o.oAB({type:d});static \u0275inj=o.cJS({imports:[g.ez]})}return d})()},7680:(V,S,a)=>{a.d(S,{G:()=>w,L:()=>C});var g=a(6814),o=a(2029);let w=(()=>{class b{styleClass;style;strokeWidth="2";fill="none";animationDuration="2s";static \u0275fac=function(u){return new(u||b)};static \u0275cmp=o.Xpm({type:b,selectors:[["p-progressSpinner"]],hostAttrs:[1,"p-element"],inputs:{styleClass:"styleClass",style:"style",strokeWidth:"strokeWidth",fill:"fill",animationDuration:"animationDuration"},decls:3,vars:6,consts:[["role","alert","aria-busy","true",1,"p-progress-spinner",3,"ngStyle","ngClass"],["viewBox","25 25 50 50",1,"p-progress-spinner-svg"],["cx","50","cy","50","r","20","stroke-miterlimit","10",1,"p-progress-spinner-circle"]],template:function(u,T){1&u&&(o.TgZ(0,"div",0),o.O4$(),o.TgZ(1,"svg",1),o._UZ(2,"circle",2),o.qZA()()),2&u&&(o.Q6J("ngStyle",T.style)("ngClass",T.styleClass),o.xp6(1),o.Udp("animation-duration",T.animationDuration),o.xp6(1),o.uIk("fill",T.fill)("stroke-width",T.strokeWidth))},dependencies:[g.mk,g.PC],styles:['.p-progress-spinner{position:relative;margin:0 auto;width:100px;height:100px;display:inline-block}.p-progress-spinner:before{content:"";display:block;padding-top:100%}.p-progress-spinner-svg{animation:p-progress-spinner-rotate 2s linear infinite;height:100%;transform-origin:center center;width:100%;position:absolute;inset:0;margin:auto}.p-progress-spinner-circle{stroke-dasharray:89,200;stroke-dashoffset:0;stroke:#d62d20;animation:p-progress-spinner-dash 1.5s ease-in-out infinite,p-progress-spinner-color 6s ease-in-out infinite;stroke-linecap:round}@keyframes p-progress-spinner-rotate{to{transform:rotate(360deg)}}@keyframes p-progress-spinner-dash{0%{stroke-dasharray:1,200;stroke-dashoffset:0}50%{stroke-dasharray:89,200;stroke-dashoffset:-35px}to{stroke-dasharray:89,200;stroke-dashoffset:-124px}}@keyframes p-progress-spinner-color{to,0%{stroke:#d62d20}40%{stroke:#0057e7}66%{stroke:#008744}80%,90%{stroke:#ffa700}}\n'],encapsulation:2,changeDetection:0})}return b})(),C=(()=>{class b{static \u0275fac=function(u){return new(u||b)};static \u0275mod=o.oAB({type:b});static \u0275inj=o.cJS({imports:[g.ez]})}return b})()},6340:(V,S,a)=>{a.d(S,{V:()=>M});var g=a(6814),o=a(2029);let M=(()=>{class c{static \u0275fac=function(h){return new(h||c)};static \u0275mod=o.oAB({type:c});static \u0275inj=o.cJS({imports:[g.ez]})}return c})()},5389:(V,S,a)=>{a.d(S,{dp:()=>rt});var g=a(6814),o=a(2029),w=a(5219),C=a(5309),b=a(4480),m=a(6489),p=a(6392),u=a(4562),T=a(3362),L=a(2314),M=a(2591),c=a(6005),d=a(4713);let _=(()=>{class t extends d.s{static \u0275fac=function(){let e;return function(l){return(e||(e=o.n5z(t)))(l||t)}}();static \u0275cmp=o.Xpm({type:t,selectors:[["MinusIcon"]],standalone:!0,features:[o.qOj,o.jDz],decls:2,vars:5,consts:[["width","14","height","14","viewBox","0 0 14 14","fill","none","xmlns","http://www.w3.org/2000/svg"],["d","M13.2222 7.77778H0.777778C0.571498 7.77778 0.373667 7.69584 0.227806 7.54998C0.0819442 7.40412 0 7.20629 0 7.00001C0 6.79373 0.0819442 6.5959 0.227806 6.45003C0.373667 6.30417 0.571498 6.22223 0.777778 6.22223H13.2222C13.4285 6.22223 13.6263 6.30417 13.7722 6.45003C13.9181 6.5959 14 6.79373 14 7.00001C14 7.20629 13.9181 7.40412 13.7722 7.54998C13.6263 7.69584 13.4285 7.77778 13.2222 7.77778Z","fill","currentColor"]],template:function(n,l){1&n&&(o.O4$(),o.TgZ(0,"svg",0),o._UZ(1,"path",1),o.qZA()),2&n&&(o.Tol(l.getClassNames()),o.uIk("aria-label",l.ariaLabel)("aria-hidden",l.ariaHidden)("role",l.role))},dependencies:[g.ez],encapsulation:2})}return t})();var h=a(3833),f=a(7273),y=a(8717);let rt=(()=>{class t{static \u0275fac=function(n){return new(n||t)};static \u0275mod=o.oAB({type:t});static \u0275inj=o.cJS({imports:[g.ez,C.U,b.T,m.v,y.L,T.v,L.H,h.V,f.m,p.W,M.n,_,c.v,u.X,w.m8,m.v]})}return t})()}}]);