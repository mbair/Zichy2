"use strict";(self.webpackChunknfc_reserve=self.webpackChunknfc_reserve||[]).push([[8203],{2302:(M,C,l)=>{l.d(C,{N:()=>f});var e=l(2029),o=l(9515),d=l(8325),u=l(6814),r=l(6223),m=l(5219),g=l(2352);function p(n,s){if(1&n&&(e.TgZ(0,"span",5),e._uU(1),e.qZA()),2&n){const t=s.$implicit;e.Q6J("ngClass","color-badge "+(null==t?null:t.value)),e.xp6(1),e.hij(" ",t.label," ")}}function i(n,s){if(1&n&&(e.TgZ(0,"span",5),e._uU(1),e.qZA()),2&n){const t=s.$implicit;e.Q6J("ngClass","color-badge "+(null==t?null:t.value)),e.xp6(1),e.hij(" ",null==t?null:t.label," ")}}function E(n,s){if(1&n){const t=e.EpF();e.TgZ(0,"p-dropdown",2),e.NdJ("onChange",function(_){e.CHM(t);const h=e.oxw();return e.KtG(h.handleOnChange(_))}),e.ALo(1,"translate"),e.ALo(2,"translate"),e.YNc(3,p,2,2,"ng-template",3),e.YNc(4,i,2,2,"ng-template",4),e.qZA()}if(2&n){const t=s.ngIf,a=e.oxw();e.s9C("placeholder",e.lcZ(1,5,"V\xe1lasszon...")),e.s9C("emptyMessage",e.lcZ(2,7,"Nincs tal\xe1lat...")),e.Q6J("formControl",t)("options",a.colors)("showClear",a.showClear)}}function v(n,s){if(1&n&&(e.TgZ(0,"span",5),e._uU(1),e.qZA()),2&n){const t=s.$implicit;e.Q6J("ngClass","color-badge "+(null==t?null:t.value)),e.xp6(1),e.hij(" ",t.label," ")}}function b(n,s){if(1&n&&(e.TgZ(0,"span",5),e._uU(1),e.qZA()),2&n){const t=s.$implicit;e.Q6J("ngClass","color-badge "+(null==t?null:t.value)),e.xp6(1),e.hij(" ",null==t?null:t.label," ")}}function c(n,s){if(1&n){const t=e.EpF();e.TgZ(0,"p-dropdown",6),e.NdJ("ngModelChange",function(_){e.CHM(t);const h=e.oxw();return e.KtG(h.selectedColor=_)})("onChange",function(_){e.CHM(t);const h=e.oxw();return e.KtG(h.handleOnChange(_))}),e.ALo(1,"translate"),e.ALo(2,"translate"),e.YNc(3,v,2,2,"ng-template",3),e.YNc(4,b,2,2,"ng-template",4),e.qZA()}if(2&n){const t=e.oxw();e.s9C("placeholder",e.lcZ(1,5,"V\xe1lasszon...")),e.s9C("emptyMessage",e.lcZ(2,7,"Nincs tal\xe1lat...")),e.Q6J("ngModel",t.selectedColor)("options",t.colors)("showClear",t.showClear)}}let f=(()=>{class n{constructor(t,a){this.translate=t,this.colorService=a,this.change=new e.vpe,this.colors=[]}ngOnInit(){this.translate.onLangChange.subscribe(()=>{this.setColors()})}ngOnChanges(t){this.setColors()}getFormControl(){return this.parentForm&&this.controlName?this.parentForm.get(this.controlName):null}setColors(){this.colors=this.colorService.getColors().map(t=>({label:t,value:t}))}handleOnChange(t){this.change.emit({value:t.value,field:this.controlName})}static#e=this.\u0275fac=function(a){return new(a||n)(e.Y36(o.sK),e.Y36(d.x))};static#t=this.\u0275cmp=e.Xpm({type:n,selectors:[["app-color-selector"]],inputs:{parentForm:"parentForm",controlName:"controlName",showClear:"showClear"},outputs:{change:"change"},features:[e.TTD],decls:3,vars:2,consts:[["optionLabel","label","optionValue","value","appendTo","body",3,"formControl","options","placeholder","emptyMessage","showClear","onChange",4,"ngIf","ngIfElse"],["useNgModel",""],["optionLabel","label","optionValue","value","appendTo","body",3,"formControl","options","placeholder","emptyMessage","showClear","onChange"],["pTemplate","item"],["pTemplate","selectedItem"],[3,"ngClass"],["optionLabel","label","optionValue","value","appendTo","body",3,"ngModel","options","placeholder","emptyMessage","showClear","ngModelChange","onChange"]],template:function(a,_){if(1&a&&(e.YNc(0,E,5,9,"p-dropdown",0),e.YNc(1,c,5,9,"ng-template",null,1,e.W1O)),2&a){const h=e.MAs(2);e.Q6J("ngIf",_.getFormControl())("ngIfElse",h)}},dependencies:[u.mk,u.O5,r.JJ,r.On,r.oH,m.jx,g.Lt,o.X$],encapsulation:2})}return n})()},1907:(M,C,l)=>{l.d(C,{l:()=>f});var e=l(2029),o=l(9515),d=l(6814),u=l(6223),r=l(5219),m=l(2352);const g=function(n,s){return{"true-icon pi-check-circle text-green-500":n,"false-icon pi-times-circle text-pink-500":s}};function p(n,s){if(1&n&&(e.TgZ(0,"span",5),e._UZ(1,"i",6),e._uU(2),e.qZA()),2&n){const t=s.$implicit;e.Q6J("ngClass","color-badge "+(null==t?null:t.value)),e.xp6(1),e.Q6J("ngClass",e.WLB(3,g,"1"==(null==t?null:t.value),"0"==(null==t?null:t.value))),e.xp6(1),e.hij(" ",t.label," ")}}function i(n,s){if(1&n&&(e.TgZ(0,"span",5),e._UZ(1,"i",6),e._uU(2),e.qZA()),2&n){const t=s.$implicit;e.Q6J("ngClass","color-badge "+(null==t?null:t.value)),e.xp6(1),e.Q6J("ngClass",e.WLB(3,g,"1"==(null==t?null:t.value),"0"==(null==t?null:t.value))),e.xp6(1),e.hij(" ",null==t?null:t.label," ")}}function E(n,s){if(1&n){const t=e.EpF();e.TgZ(0,"p-dropdown",2),e.NdJ("onChange",function(_){e.CHM(t);const h=e.oxw();return e.KtG(h.handleOnChange(_))}),e.ALo(1,"translate"),e.ALo(2,"translate"),e.YNc(3,p,3,6,"ng-template",3),e.YNc(4,i,3,6,"ng-template",4),e.qZA()}if(2&n){const t=s.ngIf,a=e.oxw();e.s9C("placeholder",e.lcZ(1,5,"V\xe1lasszon...")),e.s9C("emptyMessage",e.lcZ(2,7,"Nincs tal\xe1lat...")),e.Q6J("formControl",t)("options",a.values)("showClear",a.showClear)}}function v(n,s){if(1&n&&(e.TgZ(0,"span",5),e._UZ(1,"i",6),e._uU(2),e.qZA()),2&n){const t=s.$implicit;e.Q6J("ngClass","color-badge "+(null==t?null:t.value)),e.xp6(1),e.Q6J("ngClass",e.WLB(3,g,"1"==(null==t?null:t.value),"0"==(null==t?null:t.value))),e.xp6(1),e.hij(" ",t.label," ")}}function b(n,s){if(1&n&&(e.TgZ(0,"span",5),e._UZ(1,"i",6),e._uU(2),e.qZA()),2&n){const t=s.$implicit;e.Q6J("ngClass","color-badge "+(null==t?null:t.value)),e.xp6(1),e.Q6J("ngClass",e.WLB(3,g,"1"==(null==t?null:t.value),"0"==(null==t?null:t.value))),e.xp6(1),e.hij(" ",null==t?null:t.label," ")}}function c(n,s){if(1&n){const t=e.EpF();e.TgZ(0,"p-dropdown",7),e.NdJ("ngModelChange",function(_){e.CHM(t);const h=e.oxw();return e.KtG(h.selectedValue=_)})("onChange",function(_){e.CHM(t);const h=e.oxw();return e.KtG(h.handleOnChange(_))}),e.ALo(1,"translate"),e.ALo(2,"translate"),e.YNc(3,v,3,6,"ng-template",3),e.YNc(4,b,3,6,"ng-template",4),e.qZA()}if(2&n){const t=e.oxw();e.s9C("placeholder",e.lcZ(1,5,"V\xe1lasszon...")),e.s9C("emptyMessage",e.lcZ(2,7,"Nincs tal\xe1lat...")),e.Q6J("ngModel",t.selectedValue)("options",t.values)("showClear",t.showClear)}}let f=(()=>{class n{constructor(t){this.translate=t,this.change=new e.vpe,this.values=[]}ngOnInit(){this.translate.onLangChange.subscribe(()=>{this.setValues()})}ngOnChanges(t){this.setValues()}getFormControl(){return this.parentForm&&this.controlName?this.parentForm.get(this.controlName):null}setValues(){this.values=[{label:this.translate.instant("enged\xe9lyezve"),value:"1"},{label:this.translate.instant("tiltva"),value:"0"}]}handleOnChange(t){this.change.emit({value:t.value,field:this.controlName})}static#e=this.\u0275fac=function(a){return new(a||n)(e.Y36(o.sK))};static#t=this.\u0275cmp=e.Xpm({type:n,selectors:[["app-enabled-selector"]],inputs:{parentForm:"parentForm",controlName:"controlName",showClear:"showClear"},outputs:{change:"change"},features:[e.TTD],decls:3,vars:2,consts:[["optionLabel","label","optionValue","value","appendTo","body",3,"formControl","options","placeholder","emptyMessage","showClear","onChange",4,"ngIf","ngIfElse"],["useNgModel",""],["optionLabel","label","optionValue","value","appendTo","body",3,"formControl","options","placeholder","emptyMessage","showClear","onChange"],["pTemplate","item"],["pTemplate","selectedItem"],[3,"ngClass"],[1,"pi","mr-1",3,"ngClass"],["optionLabel","label","optionValue","value","appendTo","body",3,"ngModel","options","placeholder","emptyMessage","showClear","ngModelChange","onChange"]],template:function(a,_){if(1&a&&(e.YNc(0,E,5,9,"p-dropdown",0),e.YNc(1,c,5,9,"ng-template",null,1,e.W1O)),2&a){const h=e.MAs(2);e.Q6J("ngIf",_.getFormControl())("ngIfElse",h)}},dependencies:[d.mk,d.O5,u.JJ,u.On,u.oH,r.jx,m.Lt,o.X$],encapsulation:2})}return n})()},8325:(M,C,l)=>{l.d(C,{x:()=>o});var e=l(2029);let o=(()=>{class d{constructor(){this.colors=[],this.colors=["black","blue","green","yellow","cyan","pink","indigo","teal","orange","bluegray","purple","red","gray"]}getColors(){return this.colors}getStyleByColor(r){let m=getComputedStyle(document.documentElement),p="black"===r?200:800;return{"background-color":m.getPropertyValue(`--${r}-${"black"===r?800:200}`).trim(),color:m.getPropertyValue(`--${r}-${p}`).trim()}}static#e=this.\u0275fac=function(m){return new(m||d)};static#t=this.\u0275prov=e.Yz7({token:d,factory:d.\u0275fac,providedIn:"root"})}return d})()},8022:(M,C,l)=>{l.d(C,{k:()=>d});var e=l(5619),o=l(2029);let d=(()=>{class u{constructor(){this.isMobileSubject=new e.X(window.innerWidth<=768),this.isMobile$=this.isMobileSubject.asObservable(),this.updateIsMobile(),window.addEventListener("resize",()=>this.updateIsMobile())}updateIsMobile(){const m=window.innerWidth<=768;this.isMobileSubject.next(m)}getIsMobile(){return this.isMobileSubject.value}static#e=this.\u0275fac=function(g){return new(g||u)};static#t=this.\u0275prov=o.Yz7({token:u,factory:u.\u0275fac,providedIn:"root"})}return u})()},3620:(M,C,l)=>{l.d(C,{b:()=>u});var e=l(2832),o=l(9360),d=l(8251);function u(r,m=e.z){return(0,o.e)((g,p)=>{let i=null,E=null,v=null;const b=()=>{if(i){i.unsubscribe(),i=null;const f=E;E=null,p.next(f)}};function c(){const f=v+r,n=m.now();if(n<f)return i=this.schedule(void 0,f-n),void p.add(i);b()}g.subscribe((0,d.x)(p,f=>{E=f,v=m.now(),i||(i=m.schedule(c,r),p.add(i))},()=>{b(),p.complete()},void 0,()=>{E=i=null}))})}},4204:(M,C,l)=>{l.d(C,{b:()=>v,u:()=>b});var e=l(6814),o=l(2029),d=l(5219),u=l(2076),r=l(2332);const m=["mask"];function g(c,f){1&c&&o.GkF(0)}const p=function(c){return{"p-blockui-document":c,"p-blockui p-component-overlay p-component-overlay-enter":!0}},i=function(c){return{display:c}},E=["*"];let v=(()=>{class c{document;el;cd;config;renderer;target;autoZIndex=!0;baseZIndex=0;styleClass;get blocked(){return this._blocked}set blocked(n){this.mask&&this.mask.nativeElement?n?this.block():this.unblock():this._blocked=n}templates;mask;_blocked=!1;animationEndListener;contentTemplate;constructor(n,s,t,a,_){this.document=n,this.el=s,this.cd=t,this.config=a,this.renderer=_}ngAfterViewInit(){if(this.target&&!this.target.getBlockableElement)throw"Target of BlockUI must implement BlockableUI interface"}ngAfterContentInit(){this.templates.forEach(n=>{n.getType(),this.contentTemplate=n.template})}block(){this._blocked=!0,this.target?(this.target.getBlockableElement().appendChild(this.mask.nativeElement),this.target.getBlockableElement().style.position="relative"):this.renderer.appendChild(this.document.body,this.mask.nativeElement),this.autoZIndex&&r.P9.set("modal",this.mask.nativeElement,this.baseZIndex+this.config.zIndex.modal)}unblock(){this.mask&&(this.animationEndListener=this.renderer.listen(this.mask.nativeElement,"animationend",this.destroyModal.bind(this)),u.p.addClass(this.mask.nativeElement,"p-component-overlay-leave"))}destroyModal(){this._blocked=!1,this.mask&&(u.p.removeClass(this.mask.nativeElement,"p-component-overlay-leave"),r.P9.clear(this.mask.nativeElement),this.renderer.appendChild(this.el.nativeElement,this.mask.nativeElement)),this.unbindAnimationEndListener(),this.cd.markForCheck()}unbindAnimationEndListener(){this.animationEndListener&&this.mask&&(this.animationEndListener(),this.animationEndListener=null)}ngOnDestroy(){this.unblock(),this.destroyModal()}static \u0275fac=function(s){return new(s||c)(o.Y36(e.K0),o.Y36(o.SBq),o.Y36(o.sBO),o.Y36(d.b4),o.Y36(o.Qsj))};static \u0275cmp=o.Xpm({type:c,selectors:[["p-blockUI"]],contentQueries:function(s,t,a){if(1&s&&o.Suo(a,d.jx,4),2&s){let _;o.iGM(_=o.CRH())&&(t.templates=_)}},viewQuery:function(s,t){if(1&s&&o.Gf(m,5),2&s){let a;o.iGM(a=o.CRH())&&(t.mask=a.first)}},hostAttrs:[1,"p-element"],inputs:{target:"target",autoZIndex:"autoZIndex",baseZIndex:"baseZIndex",styleClass:"styleClass",blocked:"blocked"},ngContentSelectors:E,decls:4,vars:9,consts:[[3,"ngClass","ngStyle"],["mask",""],[4,"ngTemplateOutlet"]],template:function(s,t){1&s&&(o.F$t(),o.TgZ(0,"div",0,1),o.Hsn(2),o.YNc(3,g,1,0,"ng-container",2),o.qZA()),2&s&&(o.Tol(t.styleClass),o.Q6J("ngClass",o.VKq(5,p,!t.target))("ngStyle",o.VKq(7,i,t.blocked?"flex":"none")),o.xp6(3),o.Q6J("ngTemplateOutlet",t.contentTemplate))},dependencies:[e.mk,e.tP,e.PC],styles:[".p-blockui{position:absolute;top:0;left:0;width:100%;height:100%;background-color:transparent;transition-property:background-color;display:flex;align-items:center;justify-content:center}.p-blockui.p-component-overlay{position:absolute}.p-blockui-document.p-component-overlay{position:fixed}.p-blockui-leave.p-component-overlay{background-color:transparent}\n"],encapsulation:2,changeDetection:0})}return c})(),b=(()=>{class c{static \u0275fac=function(s){return new(s||c)};static \u0275mod=o.oAB({type:c});static \u0275inj=o.cJS({imports:[e.ez]})}return c})()},7680:(M,C,l)=>{l.d(C,{G:()=>d,L:()=>u});var e=l(6814),o=l(2029);let d=(()=>{class r{styleClass;style;strokeWidth="2";fill="none";animationDuration="2s";static \u0275fac=function(p){return new(p||r)};static \u0275cmp=o.Xpm({type:r,selectors:[["p-progressSpinner"]],hostAttrs:[1,"p-element"],inputs:{styleClass:"styleClass",style:"style",strokeWidth:"strokeWidth",fill:"fill",animationDuration:"animationDuration"},decls:3,vars:6,consts:[["role","alert","aria-busy","true",1,"p-progress-spinner",3,"ngStyle","ngClass"],["viewBox","25 25 50 50",1,"p-progress-spinner-svg"],["cx","50","cy","50","r","20","stroke-miterlimit","10",1,"p-progress-spinner-circle"]],template:function(p,i){1&p&&(o.TgZ(0,"div",0),o.O4$(),o.TgZ(1,"svg",1),o._UZ(2,"circle",2),o.qZA()()),2&p&&(o.Q6J("ngStyle",i.style)("ngClass",i.styleClass),o.xp6(1),o.Udp("animation-duration",i.animationDuration),o.xp6(1),o.uIk("fill",i.fill)("stroke-width",i.strokeWidth))},dependencies:[e.mk,e.PC],styles:['.p-progress-spinner{position:relative;margin:0 auto;width:100px;height:100px;display:inline-block}.p-progress-spinner:before{content:"";display:block;padding-top:100%}.p-progress-spinner-svg{animation:p-progress-spinner-rotate 2s linear infinite;height:100%;transform-origin:center center;width:100%;position:absolute;inset:0;margin:auto}.p-progress-spinner-circle{stroke-dasharray:89,200;stroke-dashoffset:0;stroke:#d62d20;animation:p-progress-spinner-dash 1.5s ease-in-out infinite,p-progress-spinner-color 6s ease-in-out infinite;stroke-linecap:round}@keyframes p-progress-spinner-rotate{to{transform:rotate(360deg)}}@keyframes p-progress-spinner-dash{0%{stroke-dasharray:1,200;stroke-dashoffset:0}50%{stroke-dasharray:89,200;stroke-dashoffset:-35px}to{stroke-dasharray:89,200;stroke-dashoffset:-124px}}@keyframes p-progress-spinner-color{to,0%{stroke:#d62d20}40%{stroke:#0057e7}66%{stroke:#008744}80%,90%{stroke:#ffa700}}\n'],encapsulation:2,changeDetection:0})}return r})(),u=(()=>{class r{static \u0275fac=function(p){return new(p||r)};static \u0275mod=o.oAB({type:r});static \u0275inj=o.cJS({imports:[e.ez]})}return r})()}}]);