import{a as be,b as ye}from"./chunk-MONQLLTY.js";import{a as Ce}from"./chunk-SKYVLZXH.js";import{a as _e}from"./chunk-FJKTMEDI.js";import{a as Te}from"./chunk-6J52C7RA.js";import{c as B,d as q,f as k,g as ce,h as S,j as le,l as me,r as E}from"./chunk-BT4T4VK6.js";import{$ as de,P as pe,Q as ue,fa as ge,ja as he,ka as C,na as fe,pa as R}from"./chunk-BSRWTFBH.js";import{Aa as u,Ba as d,C as Y,Ca as K,D as H,Da as W,Db as L,Ea as z,Eb as ie,Fa as v,Fb as ne,G as w,Gb as ae,Ha as I,Hb as re,I as h,Ia as c,J as f,M as A,Mb as j,O as M,P as X,Pa as $,Qa as Q,Ra as _,Sa as b,Wa as Z,Xa as ee,Ya as te,_ as r,ca as U,cb as P,fb as N,ga as D,gb as oe,ha as G,ib as se,ka as F,ma as m,oa as l,pa as a,sa as J,ta as x,ub as O,va as y,vb as T,za as p}from"./chunk-FODEVAKI.js";var we=["container"],xe=(e,i,t,s)=>({showTransformParams:e,hideTransformParams:i,showTransitionParams:t,hideTransitionParams:s}),ve=e=>({value:"visible",params:e}),Ie=(e,i)=>({$implicit:e,closeFn:i}),$e=e=>({$implicit:e});function Oe(e,i){e&1&&z(0)}function ke(e,i){if(e&1&&m(0,Oe,1,0,"ng-container",3),e&2){let t=c();a("ngTemplateOutlet",t.headlessTemplate)("ngTemplateOutletContext",oe(2,Ie,t.message,t.onCloseIconClick))}}function Se(e,i){if(e&1&&d(0,"span",4),e&2){let t=c(3);a("ngClass",t.cx("messageIcon"))}}function Ee(e,i){e&1&&d(0,"CheckIcon"),e&2&&l("aria-hidden",!0)("data-pc-section","icon")}function Ve(e,i){e&1&&d(0,"InfoCircleIcon"),e&2&&l("aria-hidden",!0)("data-pc-section","icon")}function Ae(e,i){e&1&&d(0,"TimesCircleIcon"),e&2&&l("aria-hidden",!0)("data-pc-section","icon")}function Me(e,i){e&1&&d(0,"ExclamationTriangleIcon"),e&2&&l("aria-hidden",!0)("data-pc-section","icon")}function De(e,i){e&1&&d(0,"InfoCircleIcon"),e&2&&l("aria-hidden",!0)("data-pc-section","icon")}function Fe(e,i){if(e&1&&(p(0,"span",4),m(1,Ee,1,2,"CheckIcon")(2,Ve,1,2,"InfoCircleIcon")(3,Ae,1,2,"TimesCircleIcon")(4,Me,1,2,"ExclamationTriangleIcon")(5,De,1,2,"InfoCircleIcon"),u()),e&2){let t,s=c(3);a("ngClass",s.cx("messageIcon")),l("aria-hidden",!0)("data-pc-section","icon"),r(),y((t=s.message.severity)==="success"?1:t==="info"?2:t==="error"?3:t==="warn"?4:5)}}function ze(e,i){if(e&1&&(K(0),m(1,Se,1,1,"span",6)(2,Fe,6,4,"span",6),p(3,"div",4)(4,"div",4),Z(5),u(),p(6,"div",4),Z(7),u()(),W()),e&2){let t=c(2);r(),a("ngIf",t.message.icon),r(),a("ngIf",!t.message.icon),r(),a("ngClass",t.cx("messageText")),l("data-pc-section","text"),r(),a("ngClass",t.cx("summary")),l("data-pc-section","summary"),r(),te(" ",t.message.summary," "),r(),a("ngClass",t.cx("detail")),l("data-pc-section","detail"),r(),ee(t.message.detail)}}function Qe(e,i){e&1&&z(0)}function Ze(e,i){if(e&1&&d(0,"span",4),e&2){let t=c(4);a("ngClass",t.cx("closeIcon"))}}function Pe(e,i){if(e&1&&m(0,Ze,1,1,"span",6),e&2){let t=c(3);a("ngIf",t.message.closeIcon)}}function Ne(e,i){if(e&1&&d(0,"TimesIcon",4),e&2){let t=c(3);a("ngClass",t.cx("closeIcon")),l("aria-hidden",!0)("data-pc-section","closeicon")}}function Le(e,i){if(e&1){let t=v();p(0,"div")(1,"button",7),I("click",function(o){h(t);let n=c(2);return f(n.onCloseIconClick(o))})("keydown.enter",function(o){h(t);let n=c(2);return f(n.onCloseIconClick(o))}),m(2,Pe,1,1,"span",4)(3,Ne,1,3,"TimesIcon",4),u()()}if(e&2){let t=c(2);r(),a("ariaLabel",t.closeAriaLabel),l("class",t.cx("closeButton"))("data-pc-section","closebutton"),r(),y(t.message.closeIcon?2:3)}}function je(e,i){if(e&1&&(p(0,"div",4),m(1,ze,8,10,"ng-container",5)(2,Qe,1,0,"ng-container",3)(3,Le,4,4,"div"),u()),e&2){let t=c();x(t.message==null?null:t.message.contentStyleClass),a("ngClass",t.cx("messageContent")),l("data-pc-section","content"),r(),a("ngIf",!t.template),r(),a("ngTemplateOutlet",t.template)("ngTemplateOutletContext",N(8,$e,t.message)),r(),y((t.message==null?null:t.message.closable)!==!1?3:-1)}}var Be=["message"],qe=["headless"];function Re(e,i){if(e&1){let t=v();p(0,"p-toastItem",3),I("onClose",function(o){h(t);let n=c();return f(n.onMessageClose(o))})("@toastAnimation.start",function(o){h(t);let n=c();return f(n.onAnimationStart(o))})("@toastAnimation.done",function(o){h(t);let n=c();return f(n.onAnimationEnd(o))}),u()}if(e&2){let t=i.$implicit,s=i.index,o=c();a("message",t)("index",s)("life",o.life)("template",o.template||o._template)("headlessTemplate",o.headlessTemplate||o._headlessTemplate)("@toastAnimation",void 0)("showTransformOptions",o.showTransformOptions)("hideTransformOptions",o.hideTransformOptions)("showTransitionOptions",o.showTransitionOptions)("hideTransitionOptions",o.hideTransitionOptions)}}var Ye=({dt:e})=>`
.p-toast {
    width: ${e("toast.width")};
    white-space: pre-line;
    word-break: break-word;
}

.p-toast-message {
    margin: 0 0 1rem 0;
}

.p-toast-message-icon {
    flex-shrink: 0;
    font-size: ${e("toast.icon.size")};
    width: ${e("toast.icon.size")};
    height: ${e("toast.icon.size")};
}

.p-toast-message-content {
    display: flex;
    align-items: flex-start;
    padding: ${e("toast.content.padding")};
    gap: ${e("toast.content.gap")};
}

.p-toast-message-text {
    flex: 1 1 auto;
    display: flex;
    flex-direction: column;
    gap: ${e("toast.text.gap")};
}

.p-toast-summary {
    font-weight: ${e("toast.summary.font.weight")};
    font-size: ${e("toast.summary.font.size")};
}

.p-toast-detail {
    font-weight: ${e("toast.detail.font.weight")};
    font-size: ${e("toast.detail.font.size")};
}

.p-toast-close-button {
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    position: relative;
    cursor: pointer;
    background: transparent;
    transition: background ${e("toast.transition.duration")}, color ${e("toast.transition.duration")}, outline-color ${e("toast.transition.duration")}, box-shadow ${e("toast.transition.duration")};
    outline-color: transparent;
    color: inherit;
    width: ${e("toast.close.button.width")};
    height: ${e("toast.close.button.height")};
    border-radius: ${e("toast.close.button.border.radius")};
    margin: -25% 0 0 0;
    right: -25%;
    padding: 0;
    border: none;
    user-select: none;
}

.p-toast-close-button:dir(rtl) {
    margin: -25% 0 0 auto;
    left: -25%;
    right: auto;
}

.p-toast-message-info,
.p-toast-message-success,
.p-toast-message-warn,
.p-toast-message-error,
.p-toast-message-secondary,
.p-toast-message-contrast {
    border-width: ${e("toast.border.width")};
    border-style: solid;
    backdrop-filter: blur(${e("toast.blur")});
    border-radius: ${e("toast.border.radius")};
}

.p-toast-close-icon {
    font-size: ${e("toast.close.icon.size")};
    width: ${e("toast.close.icon.size")};
    height: ${e("toast.close.icon.size")};
}

.p-toast-close-button:focus-visible {
    outline-width: ${e("focus.ring.width")};
    outline-style: ${e("focus.ring.style")};
    outline-offset: ${e("focus.ring.offset")};
}

.p-toast-message-info {
    background: ${e("toast.info.background")};
    border-color: ${e("toast.info.border.color")};
    color: ${e("toast.info.color")};
    box-shadow: ${e("toast.info.shadow")};
}

.p-toast-message-info .p-toast-detail {
    color: ${e("toast.info.detail.color")};
}

.p-toast-message-info .p-toast-close-button:focus-visible {
    outline-color: ${e("toast.info.close.button.focus.ring.color")};
    box-shadow: ${e("toast.info.close.button.focus.ring.shadow")};
}

.p-toast-message-info .p-toast-close-button:hover {
    background: ${e("toast.info.close.button.hover.background")};
}

.p-toast-message-success {
    background: ${e("toast.success.background")};
    border-color: ${e("toast.success.border.color")};
    color: ${e("toast.success.color")};
    box-shadow: ${e("toast.success.shadow")};
}

.p-toast-message-success .p-toast-detail {
    color: ${e("toast.success.detail.color")};
}

.p-toast-message-success .p-toast-close-button:focus-visible {
    outline-color: ${e("toast.success.close.button.focus.ring.color")};
    box-shadow: ${e("toast.success.close.button.focus.ring.shadow")};
}

.p-toast-message-success .p-toast-close-button:hover {
    background: ${e("toast.success.close.button.hover.background")};
}

.p-toast-message-warn {
    background: ${e("toast.warn.background")};
    border-color: ${e("toast.warn.border.color")};
    color: ${e("toast.warn.color")};
    box-shadow: ${e("toast.warn.shadow")};
}

.p-toast-message-warn .p-toast-detail {
    color: ${e("toast.warn.detail.color")};
}

.p-toast-message-warn .p-toast-close-button:focus-visible {
    outline-color: ${e("toast.warn.close.button.focus.ring.color")};
    box-shadow: ${e("toast.warn.close.button.focus.ring.shadow")};
}

.p-toast-message-warn .p-toast-close-button:hover {
    background: ${e("toast.warn.close.button.hover.background")};
}

.p-toast-message-error {
    background: ${e("toast.error.background")};
    border-color: ${e("toast.error.border.color")};
    color: ${e("toast.error.color")};
    box-shadow: ${e("toast.error.shadow")};
}

.p-toast-message-error .p-toast-detail {
    color: ${e("toast.error.detail.color")};
}

.p-toast-message-error .p-toast-close-button:focus-visible {
    outline-color: ${e("toast.error.close.button.focus.ring.color")};
    box-shadow: ${e("toast.error.close.button.focus.ring.shadow")};
}

.p-toast-message-error .p-toast-close-button:hover {
    background: ${e("toast.error.close.button.hover.background")};
}

.p-toast-message-secondary {
    background: ${e("toast.secondary.background")};
    border-color: ${e("toast.secondary.border.color")};
    color: ${e("toast.secondary.color")};
    box-shadow: ${e("toast.secondary.shadow")};
}

.p-toast-message-secondary .p-toast-detail {
    color: ${e("toast.secondary.detail.color")};
}

.p-toast-message-secondary .p-toast-close-button:focus-visible {
    outline-color: ${e("toast.secondary.close.button.focus.ring.color")};
    box-shadow: ${e("toast.secondary.close.button.focus.ring.shadow")};
}

.p-toast-message-secondary .p-toast-close-button:hover {
    background: ${e("toast.secondary.close.button.hover.background")};
}

.p-toast-message-contrast {
    background: ${e("toast.contrast.background")};
    border-color: ${e("toast.contrast.border.color")};
    color: ${e("toast.contrast.color")};
    box-shadow: ${e("toast.contrast.shadow")};
}

.p-toast-message-contrast .p-toast-detail {
    color: ${e("toast.contrast.detail.color")};
}

.p-toast-message-contrast .p-toast-close-button:focus-visible {
    outline-color: ${e("toast.contrast.close.button.focus.ring.color")};
    box-shadow: ${e("toast.contrast.close.button.focus.ring.shadow")};
}

.p-toast-message-contrast .p-toast-close-button:hover {
    background: ${e("toast.contrast.close.button.hover.background")};
}

.p-toast-top-center {
    transform: translateX(-50%);
}

.p-toast-bottom-center {
    transform: translateX(-50%);
}

.p-toast-center {
    min-width: 20vw;
    transform: translate(-50%, -50%);
}

.p-toast-message-enter-from {
    opacity: 0;
    transform: translateY(50%);
}

.p-toast-message-leave-from {
    max-height: 1000px;
}

.p-toast .p-toast-message.p-toast-message-leave-to {
    max-height: 0;
    opacity: 0;
    margin-bottom: 0;
    overflow: hidden;
}

.p-toast-message-enter-active {
    transition: transform 0.3s, opacity 0.3s;
}

.p-toast-message-leave-active {
    transition: max-height 0.45s cubic-bezier(0, 1, 0, 1), opacity 0.3s, margin-bottom 0.3s;
}
`,He={root:({instance:e})=>{let{_position:i}=e;return{position:"fixed",top:i==="top-right"||i==="top-left"||i==="top-center"?"20px":i==="center"?"50%":null,right:(i==="top-right"||i==="bottom-right")&&"20px",bottom:(i==="bottom-left"||i==="bottom-right"||i==="bottom-center")&&"20px",left:i==="top-left"||i==="bottom-left"?"20px":i==="center"||i==="top-center"||i==="bottom-center"?"50%":null}}},Xe={root:({instance:e})=>({"p-toast p-component":!0,[`p-toast-${e._position}`]:!!e._position}),message:({instance:e})=>({"p-toast-message":!0,"p-toast-message-info":e.message.severity==="info"||e.message.severity===void 0,"p-toast-message-warn":e.message.severity==="warn","p-toast-message-error":e.message.severity==="error","p-toast-message-success":e.message.severity==="success","p-toast-message-secondary":e.message.severity==="secondary","p-toast-message-contrast":e.message.severity==="contrast"}),messageContent:"p-toast-message-content",messageIcon:({instance:e})=>({"p-toast-message-icon":!0,[`pi ${e.message.icon}`]:!!e.message.icon}),messageText:"p-toast-message-text",summary:"p-toast-summary",detail:"p-toast-detail",closeButton:"p-toast-close-button",closeIcon:({instance:e})=>({"p-toast-close-icon":!0,[`pi ${e.message.closeIcon}`]:!!e.message.closeIcon})},V=(()=>{class e extends fe{name="toast";theme=Ye;classes=Xe;inlineStyles=He;static \u0275fac=(()=>{let t;return function(o){return(t||(t=A(e)))(o||e)}})();static \u0275prov=Y({token:e,factory:e.\u0275fac})}return e})();var Ue=(()=>{class e extends R{zone;message;index;life;template;headlessTemplate;showTransformOptions;hideTransformOptions;showTransitionOptions;hideTransitionOptions;onClose=new M;containerViewChild;_componentStyle=w(V);timeout;constructor(t){super(),this.zone=t}ngAfterViewInit(){super.ngAfterViewInit(),this.initTimeout()}initTimeout(){this.message?.sticky||this.zone.runOutsideAngular(()=>{this.timeout=setTimeout(()=>{this.onClose.emit({index:this.index,message:this.message})},this.message?.life||this.life||3e3)})}clearTimeout(){this.timeout&&(clearTimeout(this.timeout),this.timeout=null)}onMouseEnter(){this.clearTimeout()}onMouseLeave(){this.initTimeout()}onCloseIconClick=t=>{this.clearTimeout(),this.onClose.emit({index:this.index,message:this.message}),t.preventDefault()};get closeAriaLabel(){return this.config.translation.aria?this.config.translation.aria.close:void 0}ngOnDestroy(){this.clearTimeout(),super.ngOnDestroy()}static \u0275fac=function(s){return new(s||e)(U(X))};static \u0275cmp=D({type:e,selectors:[["p-toastItem"]],viewQuery:function(s,o){if(s&1&&Q(we,5),s&2){let n;_(n=b())&&(o.containerViewChild=n.first)}},inputs:{message:"message",index:[2,"index","index",T],life:[2,"life","life",T],template:"template",headlessTemplate:"headlessTemplate",showTransformOptions:"showTransformOptions",hideTransformOptions:"hideTransformOptions",showTransitionOptions:"showTransitionOptions",hideTransitionOptions:"hideTransitionOptions"},outputs:{onClose:"onClose"},features:[P([V]),F],decls:4,vars:15,consts:[["container",""],["role","alert","aria-live","assertive","aria-atomic","true",3,"mouseenter","mouseleave","ngClass"],[3,"ngClass","class"],[4,"ngTemplateOutlet","ngTemplateOutletContext"],[3,"ngClass"],[4,"ngIf"],[3,"ngClass",4,"ngIf"],["type","button","autofocus","",3,"click","keydown.enter","ariaLabel"]],template:function(s,o){if(s&1){let n=v();p(0,"div",1,0),I("mouseenter",function(){return h(n),f(o.onMouseEnter())})("mouseleave",function(){return h(n),f(o.onMouseLeave())}),m(2,ke,1,5,"ng-container")(3,je,4,10,"div",2),u()}s&2&&(x(o.message==null?null:o.message.styleClass),a("ngClass",o.cx("message"))("@messageState",N(13,ve,se(8,xe,o.showTransformOptions,o.hideTransformOptions,o.showTransitionOptions,o.hideTransitionOptions))),l("id",o.message==null?null:o.message.id)("data-pc-name","toast")("data-pc-section","root"),r(2),y(o.headlessTemplate?2:3))},dependencies:[j,L,ne,re,_e,be,ye,Te,Ce,C],encapsulation:2,data:{animation:[B("messageState",[ce("visible",k({transform:"translateY(0)",opacity:1})),S("void => *",[k({transform:"{{showTransformParams}}",opacity:0}),q("{{showTransitionParams}}")]),S("* => void",[q("{{hideTransitionParams}}",k({height:0,opacity:0,transform:"{{hideTransformParams}}"}))])])]},changeDetection:0})}return e})(),Ge=(()=>{class e extends R{key;autoZIndex=!0;baseZIndex=0;life=3e3;style;styleClass;get position(){return this._position}set position(t){this._position=t,this.cd.markForCheck()}preventOpenDuplicates=!1;preventDuplicates=!1;showTransformOptions="translateY(100%)";hideTransformOptions="translateY(-100%)";showTransitionOptions="300ms ease-out";hideTransitionOptions="250ms ease-in";breakpoints;onClose=new M;template;headlessTemplate;containerViewChild;messageSubscription;clearSubscription;messages;messagesArchieve;_position="top-right";messageService=w(ge);_componentStyle=w(V);styleElement;id=de("pn_id_");templates;ngOnInit(){super.ngOnInit(),this.messageSubscription=this.messageService.messageObserver.subscribe(t=>{if(t)if(Array.isArray(t)){let s=t.filter(o=>this.canAdd(o));this.add(s)}else this.canAdd(t)&&this.add([t])}),this.clearSubscription=this.messageService.clearObserver.subscribe(t=>{t?this.key===t&&(this.messages=null):this.messages=null,this.cd.markForCheck()})}_template;_headlessTemplate;ngAfterContentInit(){this.templates?.forEach(t=>{switch(t.getType()){case"message":this._template=t.template;break;case"headless":this._headlessTemplate=t.template;break;default:this._template=t.template;break}})}ngAfterViewInit(){super.ngAfterViewInit(),this.breakpoints&&this.createStyle()}add(t){this.messages=this.messages?[...this.messages,...t]:[...t],this.preventDuplicates&&(this.messagesArchieve=this.messagesArchieve?[...this.messagesArchieve,...t]:[...t]),this.cd.markForCheck()}canAdd(t){let s=this.key===t.key;return s&&this.preventOpenDuplicates&&(s=!this.containsMessage(this.messages,t)),s&&this.preventDuplicates&&(s=!this.containsMessage(this.messagesArchieve,t)),s}containsMessage(t,s){return t?t.find(o=>o.summary===s.summary&&o.detail==s.detail&&o.severity===s.severity)!=null:!1}onMessageClose(t){this.messages?.splice(t.index,1),this.onClose.emit({message:t.message}),this.cd.detectChanges()}onAnimationStart(t){t.fromState==="void"&&(this.renderer.setAttribute(this.containerViewChild?.nativeElement,this.id,""),this.autoZIndex&&this.containerViewChild?.nativeElement.style.zIndex===""&&E.set("modal",this.containerViewChild?.nativeElement,this.baseZIndex||this.config.zIndex.modal))}onAnimationEnd(t){t.toState==="void"&&this.autoZIndex&&ue(this.messages)&&E.clear(this.containerViewChild?.nativeElement)}createStyle(){if(!this.styleElement){this.styleElement=this.renderer.createElement("style"),this.styleElement.type="text/css",this.renderer.appendChild(this.document.head,this.styleElement);let t="";for(let s in this.breakpoints){let o="";for(let n in this.breakpoints[s])o+=n+":"+this.breakpoints[s][n]+" !important;";t+=`
                    @media screen and (max-width: ${s}) {
                        .p-toast[${this.id}] {
                           ${o}
                        }
                    }
                `}this.renderer.setProperty(this.styleElement,"innerHTML",t),pe(this.styleElement,"nonce",this.config?.csp()?.nonce)}}destroyStyle(){this.styleElement&&(this.renderer.removeChild(this.document.head,this.styleElement),this.styleElement=null)}ngOnDestroy(){this.messageSubscription&&this.messageSubscription.unsubscribe(),this.containerViewChild&&this.autoZIndex&&E.clear(this.containerViewChild.nativeElement),this.clearSubscription&&this.clearSubscription.unsubscribe(),this.destroyStyle(),super.ngOnDestroy()}static \u0275fac=(()=>{let t;return function(o){return(t||(t=A(e)))(o||e)}})();static \u0275cmp=D({type:e,selectors:[["p-toast"]],contentQueries:function(s,o,n){if(s&1&&($(n,Be,5),$(n,qe,5),$(n,he,4)),s&2){let g;_(g=b())&&(o.template=g.first),_(g=b())&&(o.headlessTemplate=g.first),_(g=b())&&(o.templates=g)}},viewQuery:function(s,o){if(s&1&&Q(we,5),s&2){let n;_(n=b())&&(o.containerViewChild=n.first)}},inputs:{key:"key",autoZIndex:[2,"autoZIndex","autoZIndex",O],baseZIndex:[2,"baseZIndex","baseZIndex",T],life:[2,"life","life",T],style:"style",styleClass:"styleClass",position:"position",preventOpenDuplicates:[2,"preventOpenDuplicates","preventOpenDuplicates",O],preventDuplicates:[2,"preventDuplicates","preventDuplicates",O],showTransformOptions:"showTransformOptions",hideTransformOptions:"hideTransformOptions",showTransitionOptions:"showTransitionOptions",hideTransitionOptions:"hideTransitionOptions",breakpoints:"breakpoints"},outputs:{onClose:"onClose"},features:[P([V]),F],decls:3,vars:7,consts:[["container",""],[3,"ngClass","ngStyle"],[3,"message","index","life","template","headlessTemplate","showTransformOptions","hideTransformOptions","showTransitionOptions","hideTransitionOptions","onClose",4,"ngFor","ngForOf"],[3,"onClose","message","index","life","template","headlessTemplate","showTransformOptions","hideTransformOptions","showTransitionOptions","hideTransitionOptions"]],template:function(s,o){s&1&&(p(0,"div",1,0),m(2,Re,1,10,"p-toastItem",2),u()),s&2&&(J(o.style),x(o.styleClass),a("ngClass",o.cx("root"))("ngStyle",o.sx("root")),r(2),a("ngForOf",o.messages))},dependencies:[j,L,ie,ae,Ue,C],encapsulation:2,data:{animation:[B("toastAnimation",[S(":enter, :leave",[me("@*",le())])])]},changeDetection:0})}return e})(),bt=(()=>{class e{static \u0275fac=function(s){return new(s||e)};static \u0275mod=G({type:e});static \u0275inj=H({imports:[Ge,C,C]})}return e})();export{Ge as a,bt as b};
