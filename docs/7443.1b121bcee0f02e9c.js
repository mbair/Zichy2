"use strict";(self.webpackChunknfc_reserve=self.webpackChunknfc_reserve||[]).push([[7443],{2285:(M,C,o)=>{o.d(C,{L:()=>y});var l=o(6814),e=o(6223),f=o(2169),v=o(2352),c=o(9515),x=o(2029);let y=(()=>{class m{static#e=this.\u0275fac=function(b){return new(b||m)};static#t=this.\u0275mod=x.oAB({type:m});static#n=this.\u0275inj=x.cJS({imports:[l.ez,e.u5,e.UX,f.o,v.kW,c.aw]})}return m})()},4204:(M,C,o)=>{o.d(C,{b:()=>b,u:()=>i});var l=o(6814),e=o(2029),f=o(5219),v=o(2076),c=o(2332);const x=["mask"];function y(s,g){1&s&&e.GkF(0)}const m=function(s){return{"p-blockui-document":s,"p-blockui p-component-overlay p-component-overlay-enter":!0}},T=function(s){return{display:s}},I=["*"];let b=(()=>{class s{document;el;cd;config;renderer;target;autoZIndex=!0;baseZIndex=0;styleClass;get blocked(){return this._blocked}set blocked(r){this.mask&&this.mask.nativeElement?r?this.block():this.unblock():this._blocked=r}templates;mask;_blocked=!1;animationEndListener;contentTemplate;constructor(r,p,u,k,E){this.document=r,this.el=p,this.cd=u,this.config=k,this.renderer=E}ngAfterViewInit(){if(this.target&&!this.target.getBlockableElement)throw"Target of BlockUI must implement BlockableUI interface"}ngAfterContentInit(){this.templates.forEach(r=>{r.getType(),this.contentTemplate=r.template})}block(){this._blocked=!0,this.target?(this.target.getBlockableElement().appendChild(this.mask.nativeElement),this.target.getBlockableElement().style.position="relative"):this.renderer.appendChild(this.document.body,this.mask.nativeElement),this.autoZIndex&&c.P9.set("modal",this.mask.nativeElement,this.baseZIndex+this.config.zIndex.modal)}unblock(){this.mask&&(this.animationEndListener=this.renderer.listen(this.mask.nativeElement,"animationend",this.destroyModal.bind(this)),v.p.addClass(this.mask.nativeElement,"p-component-overlay-leave"))}destroyModal(){this._blocked=!1,this.mask&&(v.p.removeClass(this.mask.nativeElement,"p-component-overlay-leave"),c.P9.clear(this.mask.nativeElement),this.renderer.appendChild(this.el.nativeElement,this.mask.nativeElement)),this.unbindAnimationEndListener(),this.cd.markForCheck()}unbindAnimationEndListener(){this.animationEndListener&&this.mask&&(this.animationEndListener(),this.animationEndListener=null)}ngOnDestroy(){this.unblock(),this.destroyModal()}static \u0275fac=function(p){return new(p||s)(e.Y36(l.K0),e.Y36(e.SBq),e.Y36(e.sBO),e.Y36(f.b4),e.Y36(e.Qsj))};static \u0275cmp=e.Xpm({type:s,selectors:[["p-blockUI"]],contentQueries:function(p,u,k){if(1&p&&e.Suo(k,f.jx,4),2&p){let E;e.iGM(E=e.CRH())&&(u.templates=E)}},viewQuery:function(p,u){if(1&p&&e.Gf(x,5),2&p){let k;e.iGM(k=e.CRH())&&(u.mask=k.first)}},hostAttrs:[1,"p-element"],inputs:{target:"target",autoZIndex:"autoZIndex",baseZIndex:"baseZIndex",styleClass:"styleClass",blocked:"blocked"},ngContentSelectors:I,decls:4,vars:9,consts:[[3,"ngClass","ngStyle"],["mask",""],[4,"ngTemplateOutlet"]],template:function(p,u){1&p&&(e.F$t(),e.TgZ(0,"div",0,1),e.Hsn(2),e.YNc(3,y,1,0,"ng-container",2),e.qZA()),2&p&&(e.Tol(u.styleClass),e.Q6J("ngClass",e.VKq(5,m,!u.target))("ngStyle",e.VKq(7,T,u.blocked?"flex":"none")),e.xp6(3),e.Q6J("ngTemplateOutlet",u.contentTemplate))},dependencies:[l.mk,l.tP,l.PC],styles:[".p-blockui{position:absolute;top:0;left:0;width:100%;height:100%;background-color:transparent;transition-property:background-color;display:flex;align-items:center;justify-content:center}.p-blockui.p-component-overlay{position:absolute}.p-blockui-document.p-component-overlay{position:fixed}.p-blockui-leave.p-component-overlay{background-color:transparent}\n"],encapsulation:2,changeDetection:0})}return s})(),i=(()=>{class s{static \u0275fac=function(p){return new(p||s)};static \u0275mod=e.oAB({type:s});static \u0275inj=e.cJS({imports:[l.ez]})}return s})()},2169:(M,C,o)=>{o.d(C,{A:()=>k,o:()=>E});var l=o(6814),e=o(2029),f=o(5219),v=o(8468);function c(t,h){if(1&t){const n=e.EpF();e.TgZ(0,"img",6),e.NdJ("error",function(_){e.CHM(n);const d=e.oxw(2);return e.KtG(d.imageError(_))}),e.qZA()}if(2&t){const n=e.oxw(2);e.Q6J("src",n.image,e.LSH)}}function x(t,h){if(1&t&&e._UZ(0,"span",8),2&t){const n=e.oxw(3);e.Tol(n.icon),e.Q6J("ngClass","p-chip-icon")}}function y(t,h){if(1&t&&e.YNc(0,x,1,3,"span",7),2&t){const n=e.oxw(2);e.Q6J("ngIf",n.icon)}}function m(t,h){if(1&t&&(e.TgZ(0,"div",9),e._uU(1),e.qZA()),2&t){const n=e.oxw(2);e.xp6(1),e.Oqu(n.label)}}function T(t,h){if(1&t){const n=e.EpF();e.TgZ(0,"span",13),e.NdJ("click",function(_){e.CHM(n);const d=e.oxw(4);return e.KtG(d.close(_))})("keydown.enter",function(_){e.CHM(n);const d=e.oxw(4);return e.KtG(d.close(_))}),e.qZA()}if(2&t){const n=e.oxw(4);e.Tol(n.removeIcon),e.Q6J("ngClass","pi-chip-remove-icon")}}function I(t,h){if(1&t){const n=e.EpF();e.TgZ(0,"TimesCircleIcon",14),e.NdJ("click",function(_){e.CHM(n);const d=e.oxw(4);return e.KtG(d.close(_))})("keydown.enter",function(_){e.CHM(n);const d=e.oxw(4);return e.KtG(d.close(_))}),e.qZA()}2&t&&(e.Q6J("styleClass","pi-chip-remove-icon"),e.uIk("tabindex",0))}function b(t,h){if(1&t&&(e.ynx(0),e.YNc(1,T,1,3,"span",11),e.YNc(2,I,1,2,"TimesCircleIcon",12),e.BQk()),2&t){const n=e.oxw(3);e.xp6(1),e.Q6J("ngIf",n.removeIcon),e.xp6(1),e.Q6J("ngIf",!n.removeIcon)}}function i(t,h){}function s(t,h){1&t&&e.YNc(0,i,0,0,"ng-template")}function g(t,h){if(1&t){const n=e.EpF();e.TgZ(0,"span",15),e.NdJ("click",function(_){e.CHM(n);const d=e.oxw(3);return e.KtG(d.close(_))})("keydown.enter",function(_){e.CHM(n);const d=e.oxw(3);return e.KtG(d.close(_))}),e.YNc(1,s,1,0,null,16),e.qZA()}if(2&t){const n=e.oxw(3);e.xp6(1),e.Q6J("ngTemplateOutlet",n.removeIconTemplate)}}function r(t,h){if(1&t&&(e.ynx(0),e.YNc(1,b,3,2,"ng-container",5),e.YNc(2,g,2,1,"span",10),e.BQk()),2&t){const n=e.oxw(2);e.xp6(1),e.Q6J("ngIf",!n.removeIconTemplate),e.xp6(1),e.Q6J("ngIf",n.removeIconTemplate)}}function p(t,h){if(1&t&&(e.TgZ(0,"div",1),e.Hsn(1),e.YNc(2,c,1,1,"img",2),e.YNc(3,y,1,1,"ng-template",null,3,e.W1O),e.YNc(5,m,2,1,"div",4),e.YNc(6,r,3,2,"ng-container",5),e.qZA()),2&t){const n=e.MAs(4),a=e.oxw();e.Tol(a.styleClass),e.Q6J("ngClass",a.containerClass())("ngStyle",a.style),e.xp6(2),e.Q6J("ngIf",a.image)("ngIfElse",n),e.xp6(3),e.Q6J("ngIf",a.label),e.xp6(1),e.Q6J("ngIf",a.removable)}}const u=["*"];let k=(()=>{class t{label;icon;image;style;styleClass;removable=!1;removeIcon;onRemove=new e.vpe;onImageError=new e.vpe;visible=!0;removeIconTemplate;templates;ngAfterContentInit(){this.templates.forEach(n=>{n.getType(),this.removeIconTemplate=n.template})}containerClass(){return{"p-chip p-component":!0,"p-chip-image":null!=this.image}}close(n){this.visible=!1,this.onRemove.emit(n)}imageError(n){this.onImageError.emit(n)}static \u0275fac=function(a){return new(a||t)};static \u0275cmp=e.Xpm({type:t,selectors:[["p-chip"]],contentQueries:function(a,_,d){if(1&a&&e.Suo(d,f.jx,4),2&a){let D;e.iGM(D=e.CRH())&&(_.templates=D)}},hostAttrs:[1,"p-element"],inputs:{label:"label",icon:"icon",image:"image",style:"style",styleClass:"styleClass",removable:"removable",removeIcon:"removeIcon"},outputs:{onRemove:"onRemove",onImageError:"onImageError"},ngContentSelectors:u,decls:1,vars:1,consts:[[3,"ngClass","class","ngStyle",4,"ngIf"],[3,"ngClass","ngStyle"],[3,"src","error",4,"ngIf","ngIfElse"],["iconTemplate",""],["class","p-chip-text",4,"ngIf"],[4,"ngIf"],[3,"src","error"],[3,"class","ngClass",4,"ngIf"],[3,"ngClass"],[1,"p-chip-text"],["class","pi-chip-remove-icon",3,"click","keydown.enter",4,"ngIf"],["tabindex","0",3,"class","ngClass","click","keydown.enter",4,"ngIf"],[3,"styleClass","click","keydown.enter",4,"ngIf"],["tabindex","0",3,"ngClass","click","keydown.enter"],[3,"styleClass","click","keydown.enter"],[1,"pi-chip-remove-icon",3,"click","keydown.enter"],[4,"ngTemplateOutlet"]],template:function(a,_){1&a&&(e.F$t(),e.YNc(0,p,7,8,"div",0)),2&a&&e.Q6J("ngIf",_.visible)},dependencies:function(){return[l.mk,l.O5,l.tP,l.PC,v.x]},styles:[".p-chip{display:inline-flex;align-items:center}.p-chip-text,.p-chip-icon.pi,.pi-chip-remove-icon.pi{line-height:1.5}.pi-chip-remove-icon{cursor:pointer}.p-chip img{border-radius:50%}\n"],encapsulation:2,changeDetection:0})}return t})(),E=(()=>{class t{static \u0275fac=function(a){return new(a||t)};static \u0275mod=e.oAB({type:t});static \u0275inj=e.cJS({imports:[l.ez,v.x,f.m8,f.m8]})}return t})()},7680:(M,C,o)=>{o.d(C,{G:()=>f,L:()=>v});var l=o(6814),e=o(2029);let f=(()=>{class c{styleClass;style;strokeWidth="2";fill="none";animationDuration="2s";static \u0275fac=function(m){return new(m||c)};static \u0275cmp=e.Xpm({type:c,selectors:[["p-progressSpinner"]],hostAttrs:[1,"p-element"],inputs:{styleClass:"styleClass",style:"style",strokeWidth:"strokeWidth",fill:"fill",animationDuration:"animationDuration"},decls:3,vars:6,consts:[["role","alert","aria-busy","true",1,"p-progress-spinner",3,"ngStyle","ngClass"],["viewBox","25 25 50 50",1,"p-progress-spinner-svg"],["cx","50","cy","50","r","20","stroke-miterlimit","10",1,"p-progress-spinner-circle"]],template:function(m,T){1&m&&(e.TgZ(0,"div",0),e.O4$(),e.TgZ(1,"svg",1),e._UZ(2,"circle",2),e.qZA()()),2&m&&(e.Q6J("ngStyle",T.style)("ngClass",T.styleClass),e.xp6(1),e.Udp("animation-duration",T.animationDuration),e.xp6(1),e.uIk("fill",T.fill)("stroke-width",T.strokeWidth))},dependencies:[l.mk,l.PC],styles:['.p-progress-spinner{position:relative;margin:0 auto;width:100px;height:100px;display:inline-block}.p-progress-spinner:before{content:"";display:block;padding-top:100%}.p-progress-spinner-svg{animation:p-progress-spinner-rotate 2s linear infinite;height:100%;transform-origin:center center;width:100%;position:absolute;inset:0;margin:auto}.p-progress-spinner-circle{stroke-dasharray:89,200;stroke-dashoffset:0;stroke:#d62d20;animation:p-progress-spinner-dash 1.5s ease-in-out infinite,p-progress-spinner-color 6s ease-in-out infinite;stroke-linecap:round}@keyframes p-progress-spinner-rotate{to{transform:rotate(360deg)}}@keyframes p-progress-spinner-dash{0%{stroke-dasharray:1,200;stroke-dashoffset:0}50%{stroke-dasharray:89,200;stroke-dashoffset:-35px}to{stroke-dasharray:89,200;stroke-dashoffset:-124px}}@keyframes p-progress-spinner-color{to,0%{stroke:#d62d20}40%{stroke:#0057e7}66%{stroke:#008744}80%,90%{stroke:#ffa700}}\n'],encapsulation:2,changeDetection:0})}return c})(),v=(()=>{class c{static \u0275fac=function(m){return new(m||c)};static \u0275mod=e.oAB({type:c});static \u0275inj=e.cJS({imports:[l.ez]})}return c})()},6340:(M,C,o)=>{o.d(C,{V:()=>b});var l=o(6814),e=o(2029);let b=(()=>{class i{static \u0275fac=function(r){return new(r||i)};static \u0275mod=e.oAB({type:i});static \u0275inj=e.cJS({imports:[l.ez]})}return i})()}}]);