"use strict";(self.webpackChunknfc_reserve=self.webpackChunknfc_reserve||[]).push([[8545],{8545:(_,g,l)=>{l.r(g),l.d(g,{FaqModule:()=>z});var a=l(6814),m=l(9739),e=l(2029),c=l(6825),f=l(5219),p=l(6005),h=l(4562);function r(n,s){if(1&n&&e._UZ(0,"span",11),2&n){const t=e.oxw(3);e.Tol(t.accordion.collapseIcon),e.Q6J("ngClass",t.iconClass)}}function x(n,s){if(1&n&&e._UZ(0,"ChevronDownIcon",11),2&n){const t=e.oxw(3);e.Q6J("ngClass",t.iconClass)}}function I(n,s){if(1&n&&(e.ynx(0),e.YNc(1,r,1,3,"span",9),e.YNc(2,x,1,1,"ChevronDownIcon",10),e.BQk()),2&n){const t=e.oxw(2);e.xp6(1),e.Q6J("ngIf",t.accordion.collapseIcon),e.xp6(1),e.Q6J("ngIf",!t.accordion.collapseIcon)}}function y(n,s){if(1&n&&e._UZ(0,"span",11),2&n){const t=e.oxw(3);e.Tol(t.accordion.expandIcon),e.Q6J("ngClass",t.iconClass)}}function A(n,s){if(1&n&&e._UZ(0,"ChevronRightIcon",11),2&n){const t=e.oxw(3);e.Q6J("ngClass",t.iconClass)}}function w(n,s){if(1&n&&(e.ynx(0),e.YNc(1,y,1,3,"span",9),e.YNc(2,A,1,1,"ChevronRightIcon",10),e.BQk()),2&n){const t=e.oxw(2);e.xp6(1),e.Q6J("ngIf",t.accordion.expandIcon),e.xp6(1),e.Q6J("ngIf",!t.accordion.expandIcon)}}function S(n,s){if(1&n&&(e.ynx(0),e.YNc(1,I,3,2,"ng-container",3),e.YNc(2,w,3,2,"ng-container",3),e.BQk()),2&n){const t=e.oxw();e.xp6(1),e.Q6J("ngIf",t.selected),e.xp6(1),e.Q6J("ngIf",!t.selected)}}function D(n,s){}function F(n,s){1&n&&e.YNc(0,D,0,0,"ng-template")}function k(n,s){if(1&n&&(e.TgZ(0,"span",12),e._uU(1),e.qZA()),2&n){const t=e.oxw();e.xp6(1),e.hij(" ",t.header," ")}}function O(n,s){1&n&&e.GkF(0)}function Z(n,s){1&n&&e.Hsn(0,1,["*ngIf","hasHeaderFacet"])}function q(n,s){1&n&&e.GkF(0)}function Q(n,s){if(1&n&&(e.ynx(0),e.YNc(1,q,1,0,"ng-container",6),e.BQk()),2&n){const t=e.oxw();e.xp6(1),e.Q6J("ngTemplateOutlet",t.contentTemplate)}}const J=["*",[["p-header"]]],M=function(n){return{$implicit:n}},v=function(n){return{transitionParams:n}},B=function(n){return{value:"visible",params:n}},L=function(n){return{value:"hidden",params:n}},P=["*","p-header"],N=["*"];let E=0,C=(()=>{class n{changeDetector;header;headerStyle;tabStyle;contentStyle;tabStyleClass;headerStyleClass;contentStyleClass;disabled;cache=!0;transitionOptions="400ms cubic-bezier(0.86, 0, 0.07, 1)";iconPos="start";selectedChange=new e.vpe;headerFacet;templates;_selected=!1;get selected(){return this._selected}set selected(t){this._selected=t,this.loaded||(this._selected&&this.cache&&(this.loaded=!0),this.changeDetector.detectChanges())}get iconClass(){return"end"===this.iconPos?"p-accordion-toggle-icon-end":"p-accordion-toggle-icon"}contentTemplate;headerTemplate;iconTemplate;id="p-accordiontab-"+E++;loaded=!1;accordion;constructor(t,o){this.changeDetector=o,this.accordion=t}ngAfterContentInit(){this.templates.forEach(t=>{switch(t.getType()){case"content":default:this.contentTemplate=t.template;break;case"header":this.headerTemplate=t.template;break;case"icon":this.iconTemplate=t.template}})}toggle(t){if(this.disabled)return!1;let o=this.findTabIndex();if(this.selected)this.selected=!1,this.accordion.onClose.emit({originalEvent:t,index:o});else{if(!this.accordion.multiple)for(var i=0;i<this.accordion.tabs.length;i++)this.accordion.tabs[i].selected&&(this.accordion.tabs[i].selected=!1,this.accordion.tabs[i].selectedChange.emit(!1),this.accordion.tabs[i].changeDetector.markForCheck());this.selected=!0,this.loaded=!0,this.accordion.onOpen.emit({originalEvent:t,index:o})}this.selectedChange.emit(this.selected),this.accordion.updateActiveIndex(),this.changeDetector.markForCheck(),t.preventDefault()}findTabIndex(){let t=-1;for(var o=0;o<this.accordion.tabs.length;o++)if(this.accordion.tabs[o]==this){t=o;break}return t}get hasHeaderFacet(){return this.headerFacet&&this.headerFacet.length>0}onKeydown(t){(32===t.which||13===t.which)&&(this.toggle(t),t.preventDefault())}ngOnDestroy(){this.accordion.tabs.splice(this.findTabIndex(),1)}static \u0275fac=function(o){return new(o||n)(e.Y36((0,e.Gpc)(()=>b)),e.Y36(e.sBO))};static \u0275cmp=e.Xpm({type:n,selectors:[["p-accordionTab"]],contentQueries:function(o,i,u){if(1&o&&(e.Suo(u,f.h4,4),e.Suo(u,f.jx,4)),2&o){let d;e.iGM(d=e.CRH())&&(i.headerFacet=d),e.iGM(d=e.CRH())&&(i.templates=d)}},hostAttrs:[1,"p-element"],inputs:{header:"header",headerStyle:"headerStyle",tabStyle:"tabStyle",contentStyle:"contentStyle",tabStyleClass:"tabStyleClass",headerStyleClass:"headerStyleClass",contentStyleClass:"contentStyleClass",disabled:"disabled",cache:"cache",transitionOptions:"transitionOptions",iconPos:"iconPos",selected:"selected"},outputs:{selectedChange:"selectedChange"},ngContentSelectors:P,decls:12,vars:38,consts:[[1,"p-accordion-tab",3,"ngClass","ngStyle"],[1,"p-accordion-header"],["role","tab",1,"p-accordion-header-link",3,"ngClass","click","keydown"],[4,"ngIf"],[4,"ngTemplateOutlet","ngTemplateOutletContext"],["class","p-accordion-header-text",4,"ngIf"],[4,"ngTemplateOutlet"],["role","region",1,"p-toggleable-content"],[1,"p-accordion-content",3,"ngClass","ngStyle"],[3,"class","ngClass",4,"ngIf"],[3,"ngClass",4,"ngIf"],[3,"ngClass"],[1,"p-accordion-header-text"]],template:function(o,i){1&o&&(e.F$t(J),e.TgZ(0,"div",0)(1,"div",1)(2,"a",2),e.NdJ("click",function(d){return i.toggle(d)})("keydown",function(d){return i.onKeydown(d)}),e.YNc(3,S,3,2,"ng-container",3),e.YNc(4,F,1,0,null,4),e.YNc(5,k,2,1,"span",5),e.YNc(6,O,1,0,"ng-container",6),e.YNc(7,Z,1,0,"ng-content",3),e.qZA()(),e.TgZ(8,"div",7)(9,"div",8),e.Hsn(10),e.YNc(11,Q,2,1,"ng-container",3),e.qZA()()()),2&o&&(e.ekj("p-accordion-tab-active",i.selected),e.Q6J("ngClass",i.tabStyleClass)("ngStyle",i.tabStyle),e.xp6(1),e.ekj("p-highlight",i.selected)("p-disabled",i.disabled),e.xp6(1),e.Akn(i.headerStyle),e.Q6J("ngClass",i.headerStyleClass),e.uIk("tabindex",i.disabled?null:0)("id",i.id)("aria-controls",i.id+"-content")("aria-expanded",i.selected),e.xp6(1),e.Q6J("ngIf",!i.iconTemplate),e.xp6(1),e.Q6J("ngTemplateOutlet",i.iconTemplate)("ngTemplateOutletContext",e.VKq(28,M,i.selected)),e.xp6(1),e.Q6J("ngIf",!i.hasHeaderFacet),e.xp6(1),e.Q6J("ngTemplateOutlet",i.headerTemplate),e.xp6(1),e.Q6J("ngIf",i.hasHeaderFacet),e.xp6(1),e.Q6J("@tabContent",i.selected?e.VKq(32,B,e.VKq(30,v,i.transitionOptions)):e.VKq(36,L,e.VKq(34,v,i.transitionOptions))),e.uIk("id",i.id+"-content")("aria-hidden",!i.selected)("aria-labelledby",i.id),e.xp6(1),e.Q6J("ngClass",i.contentStyleClass)("ngStyle",i.contentStyle),e.xp6(2),e.Q6J("ngIf",i.contentTemplate&&(i.cache?i.loaded:i.selected)))},dependencies:function(){return[a.mk,a.O5,a.tP,a.PC,h.X,p.v]},styles:[".p-accordion-header-link{cursor:pointer;display:flex;align-items:center;-webkit-user-select:none;user-select:none;position:relative;text-decoration:none}.p-accordion-header-link:focus{z-index:1}.p-accordion-header-text{line-height:1}.p-accordion .p-toggleable-content{overflow:hidden}.p-accordion .p-accordion-tab-active>.p-toggleable-content:not(.ng-animating){overflow:inherit}.p-accordion-toggle-icon-end{order:1;margin-left:auto}.p-accordion-toggle-icon{order:0}\n"],encapsulation:2,data:{animation:[(0,c.X$)("tabContent",[(0,c.SB)("hidden",(0,c.oB)({height:"0"})),(0,c.SB)("visible",(0,c.oB)({height:"*"})),(0,c.eR)("visible <=> hidden",[(0,c.jt)("{{transitionParams}}")]),(0,c.eR)("void => *",(0,c.jt)(0))])]},changeDetection:0})}return n})(),b=(()=>{class n{el;changeDetector;multiple=!1;style;styleClass;expandIcon;collapseIcon;get activeIndex(){return this._activeIndex}set activeIndex(t){this._activeIndex=t,this.preventActiveIndexPropagation?this.preventActiveIndexPropagation=!1:this.updateSelectionState()}onClose=new e.vpe;onOpen=new e.vpe;activeIndexChange=new e.vpe;tabList;tabListSubscription=null;_activeIndex;preventActiveIndexPropagation=!1;tabs=[];constructor(t,o){this.el=t,this.changeDetector=o}ngAfterContentInit(){this.initTabs(),this.tabListSubscription=this.tabList.changes.subscribe(t=>{this.initTabs()})}initTabs(){this.tabs=this.tabList.toArray(),this.updateSelectionState(),this.changeDetector.markForCheck()}getBlockableElement(){return this.el.nativeElement.children[0]}updateSelectionState(){if(this.tabs&&this.tabs.length&&null!=this._activeIndex)for(let t=0;t<this.tabs.length;t++){let o=this.multiple?this._activeIndex.includes(t):t===this._activeIndex;o!==this.tabs[t].selected&&(this.tabs[t].selected=o,this.tabs[t].selectedChange.emit(o),this.tabs[t].changeDetector.markForCheck())}}updateActiveIndex(){let t=this.multiple?[]:null;this.tabs.forEach((o,i)=>{if(o.selected){if(!this.multiple)return void(t=i);t.push(i)}}),this.preventActiveIndexPropagation=!0,this.activeIndexChange.emit(t)}ngOnDestroy(){this.tabListSubscription&&this.tabListSubscription.unsubscribe()}static \u0275fac=function(o){return new(o||n)(e.Y36(e.SBq),e.Y36(e.sBO))};static \u0275cmp=e.Xpm({type:n,selectors:[["p-accordion"]],contentQueries:function(o,i,u){if(1&o&&e.Suo(u,C,4),2&o){let d;e.iGM(d=e.CRH())&&(i.tabList=d)}},hostAttrs:[1,"p-element"],inputs:{multiple:"multiple",style:"style",styleClass:"styleClass",expandIcon:"expandIcon",collapseIcon:"collapseIcon",activeIndex:"activeIndex"},outputs:{onClose:"onClose",onOpen:"onOpen",activeIndexChange:"activeIndexChange"},ngContentSelectors:N,decls:2,vars:4,consts:[["role","tablist",3,"ngClass","ngStyle"]],template:function(o,i){1&o&&(e.F$t(),e.TgZ(0,"div",0),e.Hsn(1),e.qZA()),2&o&&(e.Tol(i.styleClass),e.Q6J("ngClass","p-accordion p-component")("ngStyle",i.style))},dependencies:[a.mk,a.PC],encapsulation:2,changeDetection:0})}return n})(),Y=(()=>{class n{static \u0275fac=function(o){return new(o||n)};static \u0275mod=e.oAB({type:n});static \u0275inj=e.cJS({imports:[a.ez,h.X,p.v,f.m8]})}return n})();var T=l(4480);const H=function(n,s){return{"bg-primary":n,"hover:surface-hover":s}};function R(n,s){if(1&n){const t=e.EpF();e.TgZ(0,"li",10),e.NdJ("click",function(){const u=e.CHM(t).index,d=e.oxw();return e.KtG(d.changeItem(u))}),e.TgZ(1,"a",11),e._UZ(2,"i",12),e.TgZ(3,"span"),e._uU(4),e.qZA()()()}if(2&n){const t=s.$implicit,o=s.index,i=e.oxw();e.xp6(1),e.Q6J("ngClass",e.WLB(4,H,i.activeIndex===o,i.activeIndex!==o)),e.xp6(1),e.Tol(t.icon),e.xp6(2),e.Oqu(t.label)}}function U(n,s){1&n&&(e.TgZ(0,"p-accordionTab",13)(1,"p",14),e._uU(2,"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."),e.qZA()()),2&n&&e.Q6J("header",s.$implicit)}let j=(()=>{class n{constructor(){this.items=[],this.activeIndex=0}ngOnInit(){this.items=[{label:"General",icon:"pi pi-fw pi-info-circle",questions:["Is there a trial period?","Do I need to sign up with credit card?","Is the subscription monthly or annual?","How many tiers are there?"]},{label:"Mailing",icon:"pi pi-fw pi-envelope",questions:["How do I setup my account?","Is there a limit on mails to send?","What is my inbox size?","How can I add attachements?"]},{label:"Support",icon:"pi pi-fw pi-question-circle",questions:["How can I get support?","What is the response time?","Is there a community forum?","Is live chat available?"]},{label:"Billing",icon:"pi pi-fw pi-credit-card",questions:["Will I receive an invoice?","How to provide my billing information?","Is VAT included?","Can I receive PDF invoices?"]}]}changeItem(t){this.activeIndex=t}static#e=this.\u0275fac=function(o){return new(o||n)};static#t=this.\u0275cmp=e.Xpm({type:n,selectors:[["ng-component"]],decls:15,vars:2,consts:[[1,"card"],[1,"text-900","font-bold","text-xl","mb-3"],[1,"text-600","line-height-3"],[1,"flex","flex-column","md:flex-row","gap-5"],[1,"card","mb-0","md:w-20rem"],[1,"text-900","block","font-bold","mb-3"],[1,"list-none","m-0","p-0"],["pRipple","","class","mb-2 ",3,"click",4,"ngFor","ngForOf"],[1,"card","flex-1"],[3,"header",4,"ngFor","ngForOf"],["pRipple","",1,"mb-2",3,"click"],[1,"flex","align-items-center","cursor-pointer","select-none","p-3","transition-colors","transition-duration-150","border-round",3,"ngClass"],[1,"mr-2","text-lg"],[3,"header"],[1,"line-height-3","m-0","p-0"]],template:function(o,i){1&o&&(e.TgZ(0,"div")(1,"div",0)(2,"div",1),e._uU(3,"Frequently Asked Questions"),e.qZA(),e.TgZ(4,"p",2),e._uU(5,"Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit."),e.qZA()(),e.TgZ(6,"div",3)(7,"div",4)(8,"div",5),e._uU(9,"Categories"),e.qZA(),e.TgZ(10,"ul",6),e.YNc(11,R,5,7,"li",7),e.qZA()(),e.TgZ(12,"div",8)(13,"p-accordion"),e.YNc(14,U,3,1,"p-accordionTab",9),e.qZA()()()()),2&o&&(e.xp6(11),e.Q6J("ngForOf",i.items),e.xp6(3),e.Q6J("ngForOf",i.items[i.activeIndex].questions))},dependencies:[a.mk,a.sg,b,C,T.H],encapsulation:2})}return n})(),K=(()=>{class n{static#e=this.\u0275fac=function(o){return new(o||n)};static#t=this.\u0275mod=e.oAB({type:n});static#n=this.\u0275inj=e.cJS({imports:[m.Bz.forChild([{path:"",component:j}]),m.Bz]})}return n})(),z=(()=>{class n{static#e=this.\u0275fac=function(o){return new(o||n)};static#t=this.\u0275mod=e.oAB({type:n});static#n=this.\u0275inj=e.cJS({imports:[a.ez,K,Y,T.T]})}return n})()},6005:(_,g,l)=>{l.d(g,{v:()=>e});var a=l(2029),m=l(4713);let e=(()=>{class c extends m.s{static \u0275fac=function(){let p;return function(r){return(p||(p=a.n5z(c)))(r||c)}}();static \u0275cmp=a.Xpm({type:c,selectors:[["ChevronDownIcon"]],standalone:!0,features:[a.qOj,a.jDz],decls:2,vars:5,consts:[["width","14","height","14","viewBox","0 0 14 14","fill","none","xmlns","http://www.w3.org/2000/svg"],["d","M7.01744 10.398C6.91269 10.3985 6.8089 10.378 6.71215 10.3379C6.61541 10.2977 6.52766 10.2386 6.45405 10.1641L1.13907 4.84913C1.03306 4.69404 0.985221 4.5065 1.00399 4.31958C1.02276 4.13266 1.10693 3.95838 1.24166 3.82747C1.37639 3.69655 1.55301 3.61742 1.74039 3.60402C1.92777 3.59062 2.11386 3.64382 2.26584 3.75424L7.01744 8.47394L11.769 3.75424C11.9189 3.65709 12.097 3.61306 12.2748 3.62921C12.4527 3.64535 12.6199 3.72073 12.7498 3.84328C12.8797 3.96582 12.9647 4.12842 12.9912 4.30502C13.0177 4.48162 12.9841 4.662 12.8958 4.81724L7.58083 10.1322C7.50996 10.2125 7.42344 10.2775 7.32656 10.3232C7.22968 10.3689 7.12449 10.3944 7.01744 10.398Z","fill","currentColor"]],template:function(h,r){1&h&&(a.O4$(),a.TgZ(0,"svg",0),a._UZ(1,"path",1),a.qZA()),2&h&&(a.Tol(r.getClassNames()),a.uIk("aria-label",r.ariaLabel)("aria-hidden",r.ariaHidden)("role",r.role))},encapsulation:2})}return c})()},4562:(_,g,l)=>{l.d(g,{X:()=>e});var a=l(2029),m=l(4713);let e=(()=>{class c extends m.s{static \u0275fac=function(){let p;return function(r){return(p||(p=a.n5z(c)))(r||c)}}();static \u0275cmp=a.Xpm({type:c,selectors:[["ChevronRightIcon"]],standalone:!0,features:[a.qOj,a.jDz],decls:2,vars:5,consts:[["width","14","height","14","viewBox","0 0 14 14","fill","none","xmlns","http://www.w3.org/2000/svg"],["d","M4.38708 13C4.28408 13.0005 4.18203 12.9804 4.08691 12.9409C3.99178 12.9014 3.9055 12.8433 3.83313 12.7701C3.68634 12.6231 3.60388 12.4238 3.60388 12.2161C3.60388 12.0084 3.68634 11.8091 3.83313 11.6622L8.50507 6.99022L3.83313 2.31827C3.69467 2.16968 3.61928 1.97313 3.62287 1.77005C3.62645 1.56698 3.70872 1.37322 3.85234 1.22959C3.99596 1.08597 4.18972 1.00371 4.3928 1.00012C4.59588 0.996539 4.79242 1.07192 4.94102 1.21039L10.1669 6.43628C10.3137 6.58325 10.3962 6.78249 10.3962 6.99022C10.3962 7.19795 10.3137 7.39718 10.1669 7.54416L4.94102 12.7701C4.86865 12.8433 4.78237 12.9014 4.68724 12.9409C4.59212 12.9804 4.49007 13.0005 4.38708 13Z","fill","currentColor"]],template:function(h,r){1&h&&(a.O4$(),a.TgZ(0,"svg",0),a._UZ(1,"path",1),a.qZA()),2&h&&(a.Tol(r.getClassNames()),a.uIk("aria-label",r.ariaLabel)("aria-hidden",r.ariaHidden)("role",r.role))},encapsulation:2})}return c})()}}]);