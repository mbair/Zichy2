"use strict";(self.webpackChunknfc_reserve=self.webpackChunknfc_reserve||[]).push([[7200],{218:(K,P,f)=>{f.d(P,{E:()=>z,P:()=>_});var d=f(6814),e=f(5879),n=f(2076);let _=(()=>{class p{host;constructor(T){this.host=T}autofocus;focused=!1;ngAfterContentChecked(){if(!this.focused&&this.autofocus){const T=n.p.getFocusableElements(this.host.nativeElement);0===T.length&&this.host.nativeElement.focus(),T.length>0&&T[0].focus(),this.focused=!0}}static \u0275fac=function(L){return new(L||p)(e.Y36(e.SBq))};static \u0275dir=e.lG2({type:p,selectors:[["","pAutoFocus",""]],hostAttrs:[1,"p-element"],inputs:{autofocus:"autofocus"}})}return p})(),z=(()=>{class p{static \u0275fac=function(L){return new(L||p)};static \u0275mod=e.oAB({type:p});static \u0275inj=e.cJS({imports:[d.ez]})}return p})()},6005:(K,P,f)=>{f.d(P,{v:()=>n});var d=f(5879),e=f(4713);let n=(()=>{class _ extends e.s{static \u0275fac=function(){let p;return function(T){return(p||(p=d.n5z(_)))(T||_)}}();static \u0275cmp=d.Xpm({type:_,selectors:[["ChevronDownIcon"]],standalone:!0,features:[d.qOj,d.jDz],decls:2,vars:5,consts:[["width","14","height","14","viewBox","0 0 14 14","fill","none","xmlns","http://www.w3.org/2000/svg"],["d","M7.01744 10.398C6.91269 10.3985 6.8089 10.378 6.71215 10.3379C6.61541 10.2977 6.52766 10.2386 6.45405 10.1641L1.13907 4.84913C1.03306 4.69404 0.985221 4.5065 1.00399 4.31958C1.02276 4.13266 1.10693 3.95838 1.24166 3.82747C1.37639 3.69655 1.55301 3.61742 1.74039 3.60402C1.92777 3.59062 2.11386 3.64382 2.26584 3.75424L7.01744 8.47394L11.769 3.75424C11.9189 3.65709 12.097 3.61306 12.2748 3.62921C12.4527 3.64535 12.6199 3.72073 12.7498 3.84328C12.8797 3.96582 12.9647 4.12842 12.9912 4.30502C13.0177 4.48162 12.9841 4.662 12.8958 4.81724L7.58083 10.1322C7.50996 10.2125 7.42344 10.2775 7.32656 10.3232C7.22968 10.3689 7.12449 10.3944 7.01744 10.398Z","fill","currentColor"]],template:function(x,T){1&x&&(d.O4$(),d.TgZ(0,"svg",0),d._UZ(1,"path",1),d.qZA()),2&x&&(d.Tol(T.getClassNames()),d.uIk("aria-label",T.ariaLabel)("aria-hidden",T.ariaHidden)("role",T.role))},encapsulation:2})}return _})()},5807:(K,P,f)=>{f.d(P,{U8:()=>et,aV:()=>F});var d=f(6825),e=f(6814),n=f(5879),_=f(6223),z=f(5219),p=f(2076),x=f(2332);const T=["overlay"],L=["content"];function Y(m,M){1&m&&n.GkF(0)}const Z=function(m,M,i){return{showTransitionParams:m,hideTransitionParams:M,transform:i}},N=function(m){return{value:"visible",params:m}},J=function(m){return{mode:m}},j=function(m){return{$implicit:m}};function G(m,M){if(1&m){const i=n.EpF();n.TgZ(0,"div",1,3),n.NdJ("click",function(y){n.CHM(i);const C=n.oxw(2);return n.KtG(C.onOverlayContentClick(y))})("@overlayContentAnimation.start",function(y){n.CHM(i);const C=n.oxw(2);return n.KtG(C.onOverlayContentAnimationStart(y))})("@overlayContentAnimation.done",function(y){n.CHM(i);const C=n.oxw(2);return n.KtG(C.onOverlayContentAnimationDone(y))}),n.Hsn(2),n.YNc(3,Y,1,0,"ng-container",4),n.qZA()}if(2&m){const i=n.oxw(2);n.Tol(i.contentStyleClass),n.Q6J("ngStyle",i.contentStyle)("ngClass","p-overlay-content")("@overlayContentAnimation",n.VKq(11,N,n.kEZ(7,Z,i.showTransitionOptions,i.hideTransitionOptions,i.transformOptions[i.modal?i.overlayResponsiveDirection:"default"]))),n.xp6(3),n.Q6J("ngTemplateOutlet",i.contentTemplate)("ngTemplateOutletContext",n.VKq(15,j,n.VKq(13,J,i.overlayMode)))}}const U=function(m,M,i,h,y,C,R,H,B,it,st,nt,ot,r){return{"p-overlay p-component":!0,"p-overlay-modal p-component-overlay p-component-overlay-enter":m,"p-overlay-center":M,"p-overlay-top":i,"p-overlay-top-start":h,"p-overlay-top-end":y,"p-overlay-bottom":C,"p-overlay-bottom-start":R,"p-overlay-bottom-end":H,"p-overlay-left":B,"p-overlay-left-start":it,"p-overlay-left-end":st,"p-overlay-right":nt,"p-overlay-right-start":ot,"p-overlay-right-end":r}};function $(m,M){if(1&m){const i=n.EpF();n.TgZ(0,"div",1,2),n.NdJ("click",function(y){n.CHM(i);const C=n.oxw();return n.KtG(C.onOverlayClick(y))}),n.YNc(2,G,4,17,"div",0),n.qZA()}if(2&m){const i=n.oxw();n.Tol(i.styleClass),n.Q6J("ngStyle",i.style)("ngClass",n.rFY(5,U,[i.modal,i.modal&&"center"===i.overlayResponsiveDirection,i.modal&&"top"===i.overlayResponsiveDirection,i.modal&&"top-start"===i.overlayResponsiveDirection,i.modal&&"top-end"===i.overlayResponsiveDirection,i.modal&&"bottom"===i.overlayResponsiveDirection,i.modal&&"bottom-start"===i.overlayResponsiveDirection,i.modal&&"bottom-end"===i.overlayResponsiveDirection,i.modal&&"left"===i.overlayResponsiveDirection,i.modal&&"left-start"===i.overlayResponsiveDirection,i.modal&&"left-end"===i.overlayResponsiveDirection,i.modal&&"right"===i.overlayResponsiveDirection,i.modal&&"right-start"===i.overlayResponsiveDirection,i.modal&&"right-end"===i.overlayResponsiveDirection])),n.xp6(2),n.Q6J("ngIf",i.visible)}}const W=["*"],X={provide:_.JU,useExisting:(0,n.Gpc)(()=>F),multi:!0},q=(0,d.oQ)([(0,d.oB)({transform:"{{transform}}",opacity:0}),(0,d.jt)("{{showTransitionParams}}")]),tt=(0,d.oQ)([(0,d.jt)("{{hideTransitionParams}}",(0,d.oB)({transform:"{{transform}}",opacity:0}))]);let F=(()=>{class m{document;platformId;el;renderer;config;overlayService;zone;get visible(){return this._visible}set visible(i){this._visible=i,this._visible&&!this.modalVisible&&(this.modalVisible=!0)}get mode(){return this._mode||this.overlayOptions?.mode}set mode(i){this._mode=i}get style(){return x.gb.merge(this._style,this.modal?this.overlayResponsiveOptions?.style:this.overlayOptions?.style)}set style(i){this._style=i}get styleClass(){return x.gb.merge(this._styleClass,this.modal?this.overlayResponsiveOptions?.styleClass:this.overlayOptions?.styleClass)}set styleClass(i){this._styleClass=i}get contentStyle(){return x.gb.merge(this._contentStyle,this.modal?this.overlayResponsiveOptions?.contentStyle:this.overlayOptions?.contentStyle)}set contentStyle(i){this._contentStyle=i}get contentStyleClass(){return x.gb.merge(this._contentStyleClass,this.modal?this.overlayResponsiveOptions?.contentStyleClass:this.overlayOptions?.contentStyleClass)}set contentStyleClass(i){this._contentStyleClass=i}get target(){const i=this._target||this.overlayOptions?.target;return void 0===i?"@prev":i}set target(i){this._target=i}get appendTo(){return this._appendTo||this.overlayOptions?.appendTo}set appendTo(i){this._appendTo=i}get autoZIndex(){const i=this._autoZIndex||this.overlayOptions?.autoZIndex;return void 0===i||i}set autoZIndex(i){this._autoZIndex=i}get baseZIndex(){const i=this._baseZIndex||this.overlayOptions?.baseZIndex;return void 0===i?0:i}set baseZIndex(i){this._baseZIndex=i}get showTransitionOptions(){const i=this._showTransitionOptions||this.overlayOptions?.showTransitionOptions;return void 0===i?".12s cubic-bezier(0, 0, 0.2, 1)":i}set showTransitionOptions(i){this._showTransitionOptions=i}get hideTransitionOptions(){const i=this._hideTransitionOptions||this.overlayOptions?.hideTransitionOptions;return void 0===i?".1s linear":i}set hideTransitionOptions(i){this._hideTransitionOptions=i}get listener(){return this._listener||this.overlayOptions?.listener}set listener(i){this._listener=i}get responsive(){return this._responsive||this.overlayOptions?.responsive}set responsive(i){this._responsive=i}get options(){return this._options}set options(i){this._options=i}visibleChange=new n.vpe;onBeforeShow=new n.vpe;onShow=new n.vpe;onBeforeHide=new n.vpe;onHide=new n.vpe;onAnimationStart=new n.vpe;onAnimationDone=new n.vpe;templates;overlayViewChild;contentViewChild;contentTemplate;_visible=!1;_mode;_style;_styleClass;_contentStyle;_contentStyleClass;_target;_appendTo;_autoZIndex;_baseZIndex;_showTransitionOptions;_hideTransitionOptions;_listener;_responsive;_options;modalVisible=!1;isOverlayClicked=!1;isOverlayContentClicked=!1;scrollHandler;documentClickListener;documentResizeListener;documentKeyboardListener;window;transformOptions={default:"scaleY(0.8)",center:"scale(0.7)",top:"translate3d(0px, -100%, 0px)","top-start":"translate3d(0px, -100%, 0px)","top-end":"translate3d(0px, -100%, 0px)",bottom:"translate3d(0px, 100%, 0px)","bottom-start":"translate3d(0px, 100%, 0px)","bottom-end":"translate3d(0px, 100%, 0px)",left:"translate3d(-100%, 0px, 0px)","left-start":"translate3d(-100%, 0px, 0px)","left-end":"translate3d(-100%, 0px, 0px)",right:"translate3d(100%, 0px, 0px)","right-start":"translate3d(100%, 0px, 0px)","right-end":"translate3d(100%, 0px, 0px)"};get modal(){if((0,e.NF)(this.platformId))return"modal"===this.mode||this.overlayResponsiveOptions&&this.window?.matchMedia(this.overlayResponsiveOptions.media?.replace("@media","")||`(max-width: ${this.overlayResponsiveOptions.breakpoint})`).matches}get overlayMode(){return this.mode||(this.modal?"modal":"overlay")}get overlayOptions(){return{...this.config?.overlayOptions,...this.options}}get overlayResponsiveOptions(){return{...this.overlayOptions?.responsive,...this.responsive}}get overlayResponsiveDirection(){return this.overlayResponsiveOptions?.direction||"center"}get overlayEl(){return this.overlayViewChild?.nativeElement}get contentEl(){return this.contentViewChild?.nativeElement}get targetEl(){return p.p.getTargetElement(this.target,this.el?.nativeElement)}constructor(i,h,y,C,R,H,B){this.document=i,this.platformId=h,this.el=y,this.renderer=C,this.config=R,this.overlayService=H,this.zone=B,this.window=this.document.defaultView}ngAfterContentInit(){this.templates?.forEach(i=>{i.getType(),this.contentTemplate=i.template})}show(i,h=!1){this.onVisibleChange(!0),this.handleEvents("onShow",{overlay:i||this.overlayEl,target:this.targetEl,mode:this.overlayMode}),h&&p.p.focus(this.targetEl),this.modal&&p.p.addClass(this.document?.body,"p-overflow-hidden")}hide(i,h=!1){this.visible&&(this.onVisibleChange(!1),this.handleEvents("onHide",{overlay:i||this.overlayEl,target:this.targetEl,mode:this.overlayMode}),h&&p.p.focus(this.targetEl),this.modal&&p.p.removeClass(this.document?.body,"p-overflow-hidden"))}alignOverlay(){!this.modal&&p.p.alignOverlay(this.overlayEl,this.targetEl,this.appendTo)}onVisibleChange(i){this._visible=i,this.visibleChange.emit(i)}onOverlayClick(){this.isOverlayClicked=!0}onOverlayContentClick(i){this.overlayService.add({originalEvent:i,target:this.targetEl}),this.isOverlayContentClicked=!0}onOverlayContentAnimationStart(i){switch(i.toState){case"visible":this.handleEvents("onBeforeShow",{overlay:this.overlayEl,target:this.targetEl,mode:this.overlayMode}),this.autoZIndex&&x.P9.set(this.overlayMode,this.overlayEl,this.baseZIndex+this.config?.zIndex[this.overlayMode]),p.p.appendOverlay(this.overlayEl,"body"===this.appendTo?this.document.body:this.appendTo,this.appendTo),this.alignOverlay();break;case"void":this.handleEvents("onBeforeHide",{overlay:this.overlayEl,target:this.targetEl,mode:this.overlayMode}),this.modal&&p.p.addClass(this.overlayEl,"p-component-overlay-leave")}this.handleEvents("onAnimationStart",i)}onOverlayContentAnimationDone(i){const h=this.overlayEl||i.element.parentElement;switch(i.toState){case"visible":this.show(h,!0),this.bindListeners();break;case"void":this.hide(h,!0),this.unbindListeners(),p.p.appendOverlay(this.overlayEl,this.targetEl,this.appendTo),x.P9.clear(h),this.modalVisible=!1}this.handleEvents("onAnimationDone",i)}handleEvents(i,h){this[i].emit(h),this.options&&this.options[i]&&this.options[i](h),this.config?.overlayOptions&&(this.config?.overlayOptions)[i]&&(this.config?.overlayOptions)[i](h)}bindListeners(){this.bindScrollListener(),this.bindDocumentClickListener(),this.bindDocumentResizeListener(),this.bindDocumentKeyboardListener()}unbindListeners(){this.unbindScrollListener(),this.unbindDocumentClickListener(),this.unbindDocumentResizeListener(),this.unbindDocumentKeyboardListener()}bindScrollListener(){this.scrollHandler||(this.scrollHandler=new p.V(this.targetEl,i=>{(!this.listener||this.listener(i,{type:"scroll",mode:this.overlayMode,valid:!0}))&&this.hide(i,!0)})),this.scrollHandler.bindScrollListener()}unbindScrollListener(){this.scrollHandler&&this.scrollHandler.unbindScrollListener()}bindDocumentClickListener(){this.documentClickListener||(this.documentClickListener=this.renderer.listen(this.document,"click",i=>{const y=!(this.targetEl&&(this.targetEl.isSameNode(i.target)||!this.isOverlayClicked&&this.targetEl.contains(i.target))||this.isOverlayContentClicked);(this.listener?this.listener(i,{type:"outside",mode:this.overlayMode,valid:3!==i.which&&y}):y)&&this.hide(i),this.isOverlayClicked=this.isOverlayContentClicked=!1}))}unbindDocumentClickListener(){this.documentClickListener&&(this.documentClickListener(),this.documentClickListener=null)}bindDocumentResizeListener(){this.documentResizeListener||(this.documentResizeListener=this.renderer.listen(this.window,"resize",i=>{(this.listener?this.listener(i,{type:"resize",mode:this.overlayMode,valid:!p.p.isTouchDevice()}):!p.p.isTouchDevice())&&this.hide(i,!0)}))}unbindDocumentResizeListener(){this.documentResizeListener&&(this.documentResizeListener(),this.documentResizeListener=null)}bindDocumentKeyboardListener(){this.documentKeyboardListener||this.zone.runOutsideAngular(()=>{this.documentKeyboardListener=this.renderer.listen(this.window,"keydown",i=>{this.overlayOptions.hideOnEscape&&27===i.keyCode&&(this.listener?this.listener(i,{type:"keydown",mode:this.overlayMode,valid:!p.p.isTouchDevice()}):!p.p.isTouchDevice())&&this.zone.run(()=>{this.hide(i,!0)})})})}unbindDocumentKeyboardListener(){this.documentKeyboardListener&&(this.documentKeyboardListener(),this.documentKeyboardListener=null)}ngOnDestroy(){this.hide(this.overlayEl,!0),this.overlayEl&&(p.p.appendOverlay(this.overlayEl,this.targetEl,this.appendTo),x.P9.clear(this.overlayEl)),this.scrollHandler&&(this.scrollHandler.destroy(),this.scrollHandler=null),this.unbindListeners()}static \u0275fac=function(h){return new(h||m)(n.Y36(e.K0),n.Y36(n.Lbi),n.Y36(n.SBq),n.Y36(n.Qsj),n.Y36(z.b4),n.Y36(z.F0),n.Y36(n.R0b))};static \u0275cmp=n.Xpm({type:m,selectors:[["p-overlay"]],contentQueries:function(h,y,C){if(1&h&&n.Suo(C,z.jx,4),2&h){let R;n.iGM(R=n.CRH())&&(y.templates=R)}},viewQuery:function(h,y){if(1&h&&(n.Gf(T,5),n.Gf(L,5)),2&h){let C;n.iGM(C=n.CRH())&&(y.overlayViewChild=C.first),n.iGM(C=n.CRH())&&(y.contentViewChild=C.first)}},hostAttrs:[1,"p-element"],inputs:{visible:"visible",mode:"mode",style:"style",styleClass:"styleClass",contentStyle:"contentStyle",contentStyleClass:"contentStyleClass",target:"target",appendTo:"appendTo",autoZIndex:"autoZIndex",baseZIndex:"baseZIndex",showTransitionOptions:"showTransitionOptions",hideTransitionOptions:"hideTransitionOptions",listener:"listener",responsive:"responsive",options:"options"},outputs:{visibleChange:"visibleChange",onBeforeShow:"onBeforeShow",onShow:"onShow",onBeforeHide:"onBeforeHide",onHide:"onHide",onAnimationStart:"onAnimationStart",onAnimationDone:"onAnimationDone"},features:[n._Bn([X])],ngContentSelectors:W,decls:1,vars:1,consts:[[3,"ngStyle","class","ngClass","click",4,"ngIf"],[3,"ngStyle","ngClass","click"],["overlay",""],["content",""],[4,"ngTemplateOutlet","ngTemplateOutletContext"]],template:function(h,y){1&h&&(n.F$t(),n.YNc(0,$,3,20,"div",0)),2&h&&n.Q6J("ngIf",y.modalVisible)},dependencies:[e.mk,e.O5,e.tP,e.PC],styles:[".p-overlay{position:absolute;top:0;left:0}.p-overlay-modal{display:flex;align-items:center;justify-content:center;position:fixed;top:0;left:0;width:100%;height:100%}.p-overlay-content{transform-origin:inherit}.p-overlay-modal>.p-overlay-content{z-index:1;width:90%}.p-overlay-top{align-items:flex-start}.p-overlay-top-start{align-items:flex-start;justify-content:flex-start}.p-overlay-top-end{align-items:flex-start;justify-content:flex-end}.p-overlay-bottom{align-items:flex-end}.p-overlay-bottom-start{align-items:flex-end;justify-content:flex-start}.p-overlay-bottom-end{align-items:flex-end;justify-content:flex-end}.p-overlay-left{justify-content:flex-start}.p-overlay-left-start{justify-content:flex-start;align-items:flex-start}.p-overlay-left-end{justify-content:flex-start;align-items:flex-end}.p-overlay-right{justify-content:flex-end}.p-overlay-right-start{justify-content:flex-end;align-items:flex-start}.p-overlay-right-end{justify-content:flex-end;align-items:flex-end}\n"],encapsulation:2,data:{animation:[(0,d.X$)("overlayContentAnimation",[(0,d.eR)(":enter",[(0,d._7)(q)]),(0,d.eR)(":leave",[(0,d._7)(tt)])])]},changeDetection:0})}return m})(),et=(()=>{class m{static \u0275fac=function(h){return new(h||m)};static \u0275mod=n.oAB({type:m});static \u0275inj=n.cJS({imports:[e.ez,z.m8,z.m8]})}return m})()},6489:(K,P,f)=>{f.d(P,{T:()=>nt,v:()=>ot});var d=f(6814),e=f(5879),n=f(5219),_=f(2076),z=f(8717);const p=["element"],x=["content"];function T(r,u){1&r&&e.GkF(0)}const L=function(r,u){return{$implicit:r,options:u}};function Y(r,u){if(1&r&&(e.ynx(0),e.YNc(1,T,1,0,"ng-container",7),e.BQk()),2&r){const t=e.oxw(2);e.xp6(1),e.Q6J("ngTemplateOutlet",t.contentTemplate)("ngTemplateOutletContext",e.WLB(2,L,t.loadedItems,t.getContentOptions()))}}function Z(r,u){1&r&&e.GkF(0)}function N(r,u){if(1&r&&(e.ynx(0),e.YNc(1,Z,1,0,"ng-container",7),e.BQk()),2&r){const t=u.$implicit,s=u.index,o=e.oxw(3);e.xp6(1),e.Q6J("ngTemplateOutlet",o.itemTemplate)("ngTemplateOutletContext",e.WLB(2,L,t,o.getOptions(s)))}}const J=function(r){return{"p-scroller-loading":r}};function j(r,u){if(1&r&&(e.TgZ(0,"div",8,9),e.YNc(2,N,2,5,"ng-container",10),e.qZA()),2&r){const t=e.oxw(2);e.Q6J("ngClass",e.VKq(4,J,t.d_loading))("ngStyle",t.contentStyle),e.xp6(2),e.Q6J("ngForOf",t.loadedItems)("ngForTrackBy",t._trackBy||t.index)}}function G(r,u){if(1&r&&e._UZ(0,"div",11),2&r){const t=e.oxw(2);e.Q6J("ngStyle",t.spacerStyle)}}function U(r,u){1&r&&e.GkF(0)}const $=function(r){return{numCols:r}},W=function(r){return{options:r}};function X(r,u){if(1&r&&(e.ynx(0),e.YNc(1,U,1,0,"ng-container",7),e.BQk()),2&r){const t=u.index,s=e.oxw(4);e.xp6(1),e.Q6J("ngTemplateOutlet",s.loaderTemplate)("ngTemplateOutletContext",e.VKq(4,W,s.getLoaderOptions(t,s.both&&e.VKq(2,$,s._numItemsInViewport.cols))))}}function q(r,u){if(1&r&&(e.ynx(0),e.YNc(1,X,2,6,"ng-container",14),e.BQk()),2&r){const t=e.oxw(3);e.xp6(1),e.Q6J("ngForOf",t.loaderArr)}}function tt(r,u){1&r&&e.GkF(0)}const F=function(){return{styleClass:"p-scroller-loading-icon"}};function et(r,u){if(1&r&&(e.ynx(0),e.YNc(1,tt,1,0,"ng-container",7),e.BQk()),2&r){const t=e.oxw(4);e.xp6(1),e.Q6J("ngTemplateOutlet",t.loaderIconTemplate)("ngTemplateOutletContext",e.VKq(3,W,e.DdM(2,F)))}}function m(r,u){1&r&&e._UZ(0,"SpinnerIcon",16),2&r&&e.Q6J("styleClass","p-scroller-loading-icon")}function M(r,u){if(1&r&&(e.YNc(0,et,2,5,"ng-container",0),e.YNc(1,m,1,1,"ng-template",null,15,e.W1O)),2&r){const t=e.MAs(2),s=e.oxw(3);e.Q6J("ngIf",s.loaderIconTemplate)("ngIfElse",t)}}const i=function(r){return{"p-component-overlay":r}};function h(r,u){if(1&r&&(e.TgZ(0,"div",12),e.YNc(1,q,2,1,"ng-container",0),e.YNc(2,M,3,2,"ng-template",null,13,e.W1O),e.qZA()),2&r){const t=e.MAs(3),s=e.oxw(2);e.Q6J("ngClass",e.VKq(3,i,!s.loaderTemplate)),e.xp6(1),e.Q6J("ngIf",s.loaderTemplate)("ngIfElse",t)}}const y=function(r,u,t){return{"p-scroller":!0,"p-scroller-inline":r,"p-both-scroll":u,"p-horizontal-scroll":t}};function C(r,u){if(1&r){const t=e.EpF();e.ynx(0),e.TgZ(1,"div",2,3),e.NdJ("scroll",function(o){e.CHM(t);const l=e.oxw();return e.KtG(l.onContainerScroll(o))}),e.YNc(3,Y,2,5,"ng-container",0),e.YNc(4,j,3,6,"ng-template",null,4,e.W1O),e.YNc(6,G,1,1,"div",5),e.YNc(7,h,4,5,"div",6),e.qZA(),e.BQk()}if(2&r){const t=e.MAs(5),s=e.oxw();e.xp6(1),e.Tol(s._styleClass),e.Q6J("ngStyle",s._style)("ngClass",e.kEZ(10,y,s.inline,s.both,s.horizontal)),e.uIk("id",s._id)("tabindex",s.tabindex),e.xp6(2),e.Q6J("ngIf",s.contentTemplate)("ngIfElse",t),e.xp6(3),e.Q6J("ngIf",s._showSpacer),e.xp6(1),e.Q6J("ngIf",!s.loaderDisabled&&s._showLoader&&s.d_loading)}}function R(r,u){1&r&&e.GkF(0)}const H=function(r,u){return{rows:r,columns:u}};function B(r,u){if(1&r&&(e.ynx(0),e.YNc(1,R,1,0,"ng-container",7),e.BQk()),2&r){const t=e.oxw(2);e.xp6(1),e.Q6J("ngTemplateOutlet",t.contentTemplate)("ngTemplateOutletContext",e.WLB(5,L,t.items,e.WLB(2,H,t._items,t.loadedColumns)))}}function it(r,u){if(1&r&&(e.Hsn(0),e.YNc(1,B,2,8,"ng-container",17)),2&r){const t=e.oxw();e.xp6(1),e.Q6J("ngIf",t.contentTemplate)}}const st=["*"];let nt=(()=>{class r{document;platformId;renderer;cd;zone;get id(){return this._id}set id(t){this._id=t}get style(){return this._style}set style(t){this._style=t}get styleClass(){return this._styleClass}set styleClass(t){this._styleClass=t}get tabindex(){return this._tabindex}set tabindex(t){this._tabindex=t}get items(){return this._items}set items(t){this._items=t}get itemSize(){return this._itemSize}set itemSize(t){this._itemSize=t}get scrollHeight(){return this._scrollHeight}set scrollHeight(t){this._scrollHeight=t}get scrollWidth(){return this._scrollWidth}set scrollWidth(t){this._scrollWidth=t}get orientation(){return this._orientation}set orientation(t){this._orientation=t}get step(){return this._step}set step(t){this._step=t}get delay(){return this._delay}set delay(t){this._delay=t}get resizeDelay(){return this._resizeDelay}set resizeDelay(t){this._resizeDelay=t}get appendOnly(){return this._appendOnly}set appendOnly(t){this._appendOnly=t}get inline(){return this._inline}set inline(t){this._inline=t}get lazy(){return this._lazy}set lazy(t){this._lazy=t}get disabled(){return this._disabled}set disabled(t){this._disabled=t}get loaderDisabled(){return this._loaderDisabled}set loaderDisabled(t){this._loaderDisabled=t}get columns(){return this._columns}set columns(t){this._columns=t}get showSpacer(){return this._showSpacer}set showSpacer(t){this._showSpacer=t}get showLoader(){return this._showLoader}set showLoader(t){this._showLoader=t}get numToleratedItems(){return this._numToleratedItems}set numToleratedItems(t){this._numToleratedItems=t}get loading(){return this._loading}set loading(t){this._loading=t}get autoSize(){return this._autoSize}set autoSize(t){this._autoSize=t}get trackBy(){return this._trackBy}set trackBy(t){this._trackBy=t}get options(){return this._options}set options(t){this._options=t,t&&"object"==typeof t&&Object.entries(t).forEach(([s,o])=>this[`_${s}`]!==o&&(this[`_${s}`]=o))}onLazyLoad=new e.vpe;onScroll=new e.vpe;onScrollIndexChange=new e.vpe;elementViewChild;contentViewChild;templates;_id;_style;_styleClass;_tabindex=0;_items;_itemSize=0;_scrollHeight;_scrollWidth;_orientation="vertical";_step=0;_delay=0;_resizeDelay=10;_appendOnly=!1;_inline=!1;_lazy=!1;_disabled=!1;_loaderDisabled=!1;_columns;_showSpacer=!0;_showLoader=!1;_numToleratedItems;_loading;_autoSize=!1;_trackBy;_options;d_loading=!1;d_numToleratedItems;contentEl;contentTemplate;itemTemplate;loaderTemplate;loaderIconTemplate;first=0;last=0;page=0;isRangeChanged=!1;numItemsInViewport=0;lastScrollPos=0;lazyLoadState={};loaderArr=[];spacerStyle={};contentStyle={};scrollTimeout;resizeTimeout;initialized=!1;windowResizeListener;defaultWidth;defaultHeight;defaultContentWidth;defaultContentHeight;get vertical(){return"vertical"===this._orientation}get horizontal(){return"horizontal"===this._orientation}get both(){return"both"===this._orientation}get loadedItems(){return this._items&&!this.d_loading?this.both?this._items.slice(this._appendOnly?0:this.first.rows,this.last.rows).map(t=>this._columns?t:t.slice(this._appendOnly?0:this.first.cols,this.last.cols)):this.horizontal&&this._columns?this._items:this._items.slice(this._appendOnly?0:this.first,this.last):[]}get loadedRows(){return this.d_loading?this._loaderDisabled?this.loaderArr:[]:this.loadedItems}get loadedColumns(){return this._columns&&(this.both||this.horizontal)?this.d_loading&&this._loaderDisabled?this.both?this.loaderArr[0]:this.loaderArr:this._columns.slice(this.both?this.first.cols:this.first,this.both?this.last.cols:this.last):this._columns}get isPageChanged(){return!this._step||this.page!==this.getPageByFirst()}constructor(t,s,o,l,a){this.document=t,this.platformId=s,this.renderer=o,this.cd=l,this.zone=a}ngOnInit(){this.setInitialState()}ngOnChanges(t){let s=!1;if(t.loading){const{previousValue:o,currentValue:l}=t.loading;this.lazy&&o!==l&&l!==this.d_loading&&(this.d_loading=l,s=!0)}if(t.orientation&&(this.lastScrollPos=this.both?{top:0,left:0}:0),t.numToleratedItems){const{previousValue:o,currentValue:l}=t.numToleratedItems;o!==l&&l!==this.d_numToleratedItems&&(this.d_numToleratedItems=l)}if(t.options){const{previousValue:o,currentValue:l}=t.options;this.lazy&&o?.loading!==l?.loading&&l?.loading!==this.d_loading&&(this.d_loading=l.loading,s=!0),o?.numToleratedItems!==l?.numToleratedItems&&l?.numToleratedItems!==this.d_numToleratedItems&&(this.d_numToleratedItems=l.numToleratedItems)}this.initialized&&!s&&(t.items?.previousValue?.length!==t.items?.currentValue?.length||t.itemSize||t.scrollHeight||t.scrollWidth)&&(this.init(),this.calculateAutoSize())}ngAfterContentInit(){this.templates.forEach(t=>{switch(t.getType()){case"content":this.contentTemplate=t.template;break;case"item":default:this.itemTemplate=t.template;break;case"loader":this.loaderTemplate=t.template;break;case"loadericon":this.loaderIconTemplate=t.template}})}ngAfterViewInit(){Promise.resolve().then(()=>{this.viewInit()})}ngAfterViewChecked(){this.initialized||this.viewInit()}ngOnDestroy(){this.unbindResizeListener(),this.contentEl=null,this.initialized=!1}viewInit(){(0,d.NF)(this.platformId)&&_.p.isVisible(this.elementViewChild?.nativeElement)&&(this.setInitialState(),this.setContentEl(this.contentEl),this.init(),this.defaultWidth=_.p.getWidth(this.elementViewChild?.nativeElement),this.defaultHeight=_.p.getHeight(this.elementViewChild?.nativeElement),this.defaultContentWidth=_.p.getWidth(this.contentEl),this.defaultContentHeight=_.p.getHeight(this.contentEl),this.initialized=!0)}init(){this._disabled||(this.setSize(),this.calculateOptions(),this.setSpacerSize(),this.bindResizeListener(),this.cd.detectChanges())}setContentEl(t){this.contentEl=t||this.contentViewChild?.nativeElement||_.p.findSingle(this.elementViewChild?.nativeElement,".p-scroller-content")}setInitialState(){this.first=this.both?{rows:0,cols:0}:0,this.last=this.both?{rows:0,cols:0}:0,this.numItemsInViewport=this.both?{rows:0,cols:0}:0,this.lastScrollPos=this.both?{top:0,left:0}:0,this.d_loading=this._loading||!1,this.d_numToleratedItems=this._numToleratedItems,this.loaderArr=[],this.spacerStyle={},this.contentStyle={}}getElementRef(){return this.elementViewChild}getPageByFirst(){return Math.floor((this.first+4*this.d_numToleratedItems)/(this._step||1))}scrollTo(t){this.lastScrollPos=this.both?{top:0,left:0}:0,this.elementViewChild?.nativeElement?.scrollTo(t)}scrollToIndex(t,s="auto"){const{numToleratedItems:o}=this.calculateNumItems(),l=this.getContentPosition(),a=(w=0,I)=>w<=I?0:w,c=(w,I,E)=>w*I+E,O=(w=0,I=0)=>this.scrollTo({left:w,top:I,behavior:s});let v=0;this.both?(v={rows:a(t[0],o[0]),cols:a(t[1],o[1])},O(c(v.cols,this._itemSize[1],l.left),c(v.rows,this._itemSize[0],l.top))):(v=a(t,o),this.horizontal?O(c(v,this._itemSize,l.left),0):O(0,c(v,this._itemSize,l.top))),this.isRangeChanged=this.first!==v,this.first=v}scrollInView(t,s,o="auto"){if(s){const{first:l,viewport:a}=this.getRenderedRange(),c=(w=0,I=0)=>this.scrollTo({left:w,top:I,behavior:o}),v="to-end"===s;if("to-start"===s){if(this.both)a.first.rows-l.rows>t[0]?c(a.first.cols*this._itemSize[1],(a.first.rows-1)*this._itemSize[0]):a.first.cols-l.cols>t[1]&&c((a.first.cols-1)*this._itemSize[1],a.first.rows*this._itemSize[0]);else if(a.first-l>t){const w=(a.first-1)*this._itemSize;this.horizontal?c(w,0):c(0,w)}}else if(v)if(this.both)a.last.rows-l.rows<=t[0]+1?c(a.first.cols*this._itemSize[1],(a.first.rows+1)*this._itemSize[0]):a.last.cols-l.cols<=t[1]+1&&c((a.first.cols+1)*this._itemSize[1],a.first.rows*this._itemSize[0]);else if(a.last-l<=t+1){const w=(a.first+1)*this._itemSize;this.horizontal?c(w,0):c(0,w)}}else this.scrollToIndex(t,o)}getRenderedRange(){const t=(l,a)=>Math.floor(l/(a||l));let s=this.first,o=0;if(this.elementViewChild?.nativeElement){const{scrollTop:l,scrollLeft:a}=this.elementViewChild.nativeElement;this.both?(s={rows:t(l,this._itemSize[0]),cols:t(a,this._itemSize[1])},o={rows:s.rows+this.numItemsInViewport.rows,cols:s.cols+this.numItemsInViewport.cols}):(s=t(this.horizontal?a:l,this._itemSize),o=s+this.numItemsInViewport)}return{first:this.first,last:this.last,viewport:{first:s,last:o}}}calculateNumItems(){const t=this.getContentPosition(),s=(this.elementViewChild?.nativeElement?this.elementViewChild.nativeElement.offsetWidth-t.left:0)||0,o=(this.elementViewChild?.nativeElement?this.elementViewChild.nativeElement.offsetHeight-t.top:0)||0,l=(v,w)=>Math.ceil(v/(w||v)),a=v=>Math.ceil(v/2),c=this.both?{rows:l(o,this._itemSize[0]),cols:l(s,this._itemSize[1])}:l(this.horizontal?s:o,this._itemSize);return{numItemsInViewport:c,numToleratedItems:this.d_numToleratedItems||(this.both?[a(c.rows),a(c.cols)]:a(c))}}calculateOptions(){const{numItemsInViewport:t,numToleratedItems:s}=this.calculateNumItems(),o=(c,O,v,w=!1)=>this.getLast(c+O+(c<v?2:3)*v,w),l=this.first,a=this.both?{rows:o(this.first.rows,t.rows,s[0]),cols:o(this.first.cols,t.cols,s[1],!0)}:o(this.first,t,s);this.last=a,this.numItemsInViewport=t,this.d_numToleratedItems=s,this.showLoader&&(this.loaderArr=this.both?Array.from({length:t.rows}).map(()=>Array.from({length:t.cols})):Array.from({length:t})),this._lazy&&Promise.resolve().then(()=>{this.lazyLoadState={first:this._step?this.both?{rows:0,cols:l.cols}:0:l,last:Math.min(this._step?this._step:this.last,this.items.length)},this.handleEvents("onLazyLoad",this.lazyLoadState)})}calculateAutoSize(){this._autoSize&&!this.d_loading&&Promise.resolve().then(()=>{if(this.contentEl){this.contentEl.style.minHeight=this.contentEl.style.minWidth="auto",this.contentEl.style.position="relative",this.elementViewChild.nativeElement.style.contain="none";const[t,s]=[_.p.getWidth(this.contentEl),_.p.getHeight(this.contentEl)];t!==this.defaultContentWidth&&(this.elementViewChild.nativeElement.style.width=""),s!==this.defaultContentHeight&&(this.elementViewChild.nativeElement.style.height="");const[o,l]=[_.p.getWidth(this.elementViewChild.nativeElement),_.p.getHeight(this.elementViewChild.nativeElement)];(this.both||this.horizontal)&&(this.elementViewChild.nativeElement.style.width=o<this.defaultWidth?o+"px":this._scrollWidth||this.defaultWidth+"px"),(this.both||this.vertical)&&(this.elementViewChild.nativeElement.style.height=l<this.defaultHeight?l+"px":this._scrollHeight||this.defaultHeight+"px"),this.contentEl.style.minHeight=this.contentEl.style.minWidth="",this.contentEl.style.position="",this.elementViewChild.nativeElement.style.contain=""}})}getLast(t=0,s=!1){return this._items?Math.min(s?(this._columns||this._items[0]).length:this._items.length,t):0}getContentPosition(){if(this.contentEl){const t=getComputedStyle(this.contentEl),s=parseFloat(t.paddingLeft)+Math.max(parseFloat(t.left)||0,0),o=parseFloat(t.paddingRight)+Math.max(parseFloat(t.right)||0,0),l=parseFloat(t.paddingTop)+Math.max(parseFloat(t.top)||0,0),a=parseFloat(t.paddingBottom)+Math.max(parseFloat(t.bottom)||0,0);return{left:s,right:o,top:l,bottom:a,x:s+o,y:l+a}}return{left:0,right:0,top:0,bottom:0,x:0,y:0}}setSize(){if(this.elementViewChild?.nativeElement){const t=this.elementViewChild.nativeElement.parentElement.parentElement,s=this._scrollWidth||`${this.elementViewChild.nativeElement.offsetWidth||t.offsetWidth}px`,o=this._scrollHeight||`${this.elementViewChild.nativeElement.offsetHeight||t.offsetHeight}px`,l=(a,c)=>this.elementViewChild.nativeElement.style[a]=c;this.both||this.horizontal?(l("height",o),l("width",s)):l("height",o)}}setSpacerSize(){if(this._items){const t=this.getContentPosition(),s=(o,l,a,c=0)=>this.spacerStyle={...this.spacerStyle,[`${o}`]:(l||[]).length*a+c+"px"};this.both?(s("height",this._items,this._itemSize[0],t.y),s("width",this._columns||this._items[1],this._itemSize[1],t.x)):this.horizontal?s("width",this._columns||this._items,this._itemSize,t.x):s("height",this._items,this._itemSize,t.y)}}setContentPosition(t){if(this.contentEl&&!this._appendOnly){const s=t?t.first:this.first,o=(a,c)=>a*c,l=(a=0,c=0)=>this.contentStyle={...this.contentStyle,transform:`translate3d(${a}px, ${c}px, 0)`};if(this.both)l(o(s.cols,this._itemSize[1]),o(s.rows,this._itemSize[0]));else{const a=o(s,this._itemSize);this.horizontal?l(a,0):l(0,a)}}}onScrollPositionChange(t){const s=t.target,o=this.getContentPosition(),l=(g,S)=>g?g>S?g-S:g:0,a=(g,S)=>Math.floor(g/(S||g)),c=(g,S,b,D,V,A)=>g<=V?V:A?b-D-V:S+V-1,O=(g,S,b,D,V,A,Q)=>g<=A?0:Math.max(0,Q?g<S?b:g-A:g>S?b:g-2*A),v=(g,S,b,D,V,A=!1)=>{let Q=S+D+2*V;return g>=V&&(Q+=V+1),this.getLast(Q,A)},w=l(s.scrollTop,o.top),I=l(s.scrollLeft,o.left);let E=this.both?{rows:0,cols:0}:0,k=this.last,lt=!1,rt=this.lastScrollPos;if(this.both){const g=this.lastScrollPos.top<=w,S=this.lastScrollPos.left<=I;if(!this._appendOnly||this._appendOnly&&(g||S)){const b={rows:a(w,this._itemSize[0]),cols:a(I,this._itemSize[1])},D={rows:c(b.rows,this.first.rows,this.last.rows,this.numItemsInViewport.rows,this.d_numToleratedItems[0],g),cols:c(b.cols,this.first.cols,this.last.cols,this.numItemsInViewport.cols,this.d_numToleratedItems[1],S)};E={rows:O(b.rows,D.rows,this.first.rows,0,0,this.d_numToleratedItems[0],g),cols:O(b.cols,D.cols,this.first.cols,0,0,this.d_numToleratedItems[1],S)},k={rows:v(b.rows,E.rows,0,this.numItemsInViewport.rows,this.d_numToleratedItems[0]),cols:v(b.cols,E.cols,0,this.numItemsInViewport.cols,this.d_numToleratedItems[1],!0)},lt=E.rows!==this.first.rows||k.rows!==this.last.rows||E.cols!==this.first.cols||k.cols!==this.last.cols||this.isRangeChanged,rt={top:w,left:I}}}else{const g=this.horizontal?I:w,S=this.lastScrollPos<=g;if(!this._appendOnly||this._appendOnly&&S){const b=a(g,this._itemSize);E=O(b,c(b,this.first,this.last,this.numItemsInViewport,this.d_numToleratedItems,S),this.first,0,0,this.d_numToleratedItems,S),k=v(b,E,0,this.numItemsInViewport,this.d_numToleratedItems),lt=E!==this.first||k!==this.last||this.isRangeChanged,rt=g}}return{first:E,last:k,isRangeChanged:lt,scrollPos:rt}}onScrollChange(t){const{first:s,last:o,isRangeChanged:l,scrollPos:a}=this.onScrollPositionChange(t);if(l){const c={first:s,last:o};if(this.setContentPosition(c),this.first=s,this.last=o,this.lastScrollPos=a,this.handleEvents("onScrollIndexChange",c),this._lazy&&this.isPageChanged){const O={first:this._step?Math.min(this.getPageByFirst()*this._step,this.items.length-this._step):s,last:Math.min(this._step?(this.getPageByFirst()+1)*this._step:o,this.items.length)};(this.lazyLoadState.first!==O.first||this.lazyLoadState.last!==O.last)&&this.handleEvents("onLazyLoad",O),this.lazyLoadState=O}}}onContainerScroll(t){if(this.handleEvents("onScroll",{originalEvent:t}),this._delay&&this.isPageChanged){if(this.scrollTimeout&&clearTimeout(this.scrollTimeout),!this.d_loading&&this.showLoader){const{isRangeChanged:s}=this.onScrollPositionChange(t);(s||this._step&&this.isPageChanged)&&(this.d_loading=!0,this.cd.detectChanges())}this.scrollTimeout=setTimeout(()=>{this.onScrollChange(t),this.d_loading&&this.showLoader&&(!this._lazy||void 0===this._loading)&&(this.d_loading=!1,this.page=this.getPageByFirst(),this.cd.detectChanges())},this._delay)}else!this.d_loading&&this.onScrollChange(t)}bindResizeListener(){(0,d.NF)(this.platformId)&&(this.windowResizeListener||this.zone.runOutsideAngular(()=>{const t=this.document.defaultView,s=_.p.isTouchDevice()?"orientationchange":"resize";this.windowResizeListener=this.renderer.listen(t,s,this.onWindowResize.bind(this))}))}unbindResizeListener(){this.windowResizeListener&&(this.windowResizeListener(),this.windowResizeListener=null)}onWindowResize(){this.resizeTimeout&&clearTimeout(this.resizeTimeout),this.resizeTimeout=setTimeout(()=>{if(_.p.isVisible(this.elementViewChild?.nativeElement)){const[t,s]=[_.p.getWidth(this.elementViewChild?.nativeElement),_.p.getHeight(this.elementViewChild?.nativeElement)],[o,l]=[t!==this.defaultWidth,s!==this.defaultHeight];(this.both?o||l:this.horizontal?o:this.vertical&&l)&&this.zone.run(()=>{this.d_numToleratedItems=this._numToleratedItems,this.defaultWidth=t,this.defaultHeight=s,this.defaultContentWidth=_.p.getWidth(this.contentEl),this.defaultContentHeight=_.p.getHeight(this.contentEl),this.init()})}},this._resizeDelay)}handleEvents(t,s){return this.options&&this.options[t]?this.options[t](s):this[t].emit(s)}getContentOptions(){return{contentStyleClass:"p-scroller-content "+(this.d_loading?"p-scroller-loading":""),items:this.loadedItems,getItemOptions:t=>this.getOptions(t),loading:this.d_loading,getLoaderOptions:(t,s)=>this.getLoaderOptions(t,s),itemSize:this._itemSize,rows:this.loadedRows,columns:this.loadedColumns,spacerStyle:this.spacerStyle,contentStyle:this.contentStyle,vertical:this.vertical,horizontal:this.horizontal,both:this.both}}getOptions(t){const s=(this._items||[]).length,o=this.both?this.first.rows+t:this.first+t;return{index:o,count:s,first:0===o,last:o===s-1,even:o%2==0,odd:o%2!=0}}getLoaderOptions(t,s){const o=this.loaderArr.length;return{index:t,count:o,first:0===t,last:t===o-1,even:t%2==0,odd:t%2!=0,...s}}static \u0275fac=function(s){return new(s||r)(e.Y36(d.K0),e.Y36(e.Lbi),e.Y36(e.Qsj),e.Y36(e.sBO),e.Y36(e.R0b))};static \u0275cmp=e.Xpm({type:r,selectors:[["p-scroller"]],contentQueries:function(s,o,l){if(1&s&&e.Suo(l,n.jx,4),2&s){let a;e.iGM(a=e.CRH())&&(o.templates=a)}},viewQuery:function(s,o){if(1&s&&(e.Gf(p,5),e.Gf(x,5)),2&s){let l;e.iGM(l=e.CRH())&&(o.elementViewChild=l.first),e.iGM(l=e.CRH())&&(o.contentViewChild=l.first)}},hostAttrs:[1,"p-scroller-viewport","p-element"],inputs:{id:"id",style:"style",styleClass:"styleClass",tabindex:"tabindex",items:"items",itemSize:"itemSize",scrollHeight:"scrollHeight",scrollWidth:"scrollWidth",orientation:"orientation",step:"step",delay:"delay",resizeDelay:"resizeDelay",appendOnly:"appendOnly",inline:"inline",lazy:"lazy",disabled:"disabled",loaderDisabled:"loaderDisabled",columns:"columns",showSpacer:"showSpacer",showLoader:"showLoader",numToleratedItems:"numToleratedItems",loading:"loading",autoSize:"autoSize",trackBy:"trackBy",options:"options"},outputs:{onLazyLoad:"onLazyLoad",onScroll:"onScroll",onScrollIndexChange:"onScrollIndexChange"},features:[e.TTD],ngContentSelectors:st,decls:3,vars:2,consts:[[4,"ngIf","ngIfElse"],["disabledContainer",""],[3,"ngStyle","ngClass","scroll"],["element",""],["buildInContent",""],["class","p-scroller-spacer",3,"ngStyle",4,"ngIf"],["class","p-scroller-loader",3,"ngClass",4,"ngIf"],[4,"ngTemplateOutlet","ngTemplateOutletContext"],[1,"p-scroller-content",3,"ngClass","ngStyle"],["content",""],[4,"ngFor","ngForOf","ngForTrackBy"],[1,"p-scroller-spacer",3,"ngStyle"],[1,"p-scroller-loader",3,"ngClass"],["buildInLoader",""],[4,"ngFor","ngForOf"],["buildInLoaderIcon",""],[3,"styleClass"],[4,"ngIf"]],template:function(s,o){if(1&s&&(e.F$t(),e.YNc(0,C,8,14,"ng-container",0),e.YNc(1,it,2,1,"ng-template",null,1,e.W1O)),2&s){const l=e.MAs(2);e.Q6J("ngIf",!o._disabled)("ngIfElse",l)}},dependencies:function(){return[d.mk,d.sg,d.O5,d.tP,d.PC,z.L]},styles:["p-scroller{flex:1;outline:0 none}.p-scroller{position:relative;overflow:auto;contain:strict;transform:translateZ(0);will-change:scroll-position;outline:0 none}.p-scroller-content{position:absolute;top:0;left:0;min-height:100%;min-width:100%;will-change:transform}.p-scroller-spacer{position:absolute;top:0;left:0;height:1px;width:1px;transform-origin:0 0;pointer-events:none}.p-scroller-loader{position:sticky;top:0;left:0;width:100%;height:100%}.p-scroller-loader.p-component-overlay{display:flex;align-items:center;justify-content:center}.p-scroller-loading-icon{scale:2}.p-scroller-inline .p-scroller-content{position:static}\n"],encapsulation:2})}return r})(),ot=(()=>{class r{static \u0275fac=function(s){return new(s||r)};static \u0275mod=e.oAB({type:r});static \u0275inj=e.cJS({imports:[d.ez,n.m8,z.L,n.m8]})}return r})()}}]);