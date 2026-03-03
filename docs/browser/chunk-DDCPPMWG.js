import{f as S}from"./chunk-FUGQHZ3L.js";import{Ca as W,Da as r,Ka as C,Na as B,Oa as D,Pa as o,d as H,f as x}from"./chunk-34SKYTGK.js";import{$ as A,Ab as w,Bb as L,Cb as j,Ib as P,Nb as U,Oa as k,Ob as Z,P as f,Pb as R,Q as u,Rb as M,S as h,Sb as T,U as s,Wc as N,Xb as O,Xc as V,_b as a,ab as g,bb as y,eb as b,fb as v,gb as F,mc as I,na as l,od as Q,qb as p,ud as E,yd as d,zb as c}from"./chunk-3NAOPKLA.js";var G=`
    .p-progressspinner {
        position: relative;
        margin: 0 auto;
        width: 100px;
        height: 100px;
        display: inline-block;
    }

    .p-progressspinner::before {
        content: '';
        display: block;
        padding-top: 100%;
    }

    .p-progressspinner-spin {
        height: 100%;
        transform-origin: center center;
        width: 100%;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        margin: auto;
        animation: p-progressspinner-rotate 2s linear infinite;
    }

    .p-progressspinner-circle {
        stroke-dasharray: 89, 200;
        stroke-dashoffset: 0;
        stroke: dt('progressspinner.colorOne');
        animation:
            p-progressspinner-dash 1.5s ease-in-out infinite,
            p-progressspinner-color 6s ease-in-out infinite;
        stroke-linecap: round;
    }

    @keyframes p-progressspinner-rotate {
        100% {
            transform: rotate(360deg);
        }
    }
    @keyframes p-progressspinner-dash {
        0% {
            stroke-dasharray: 1, 200;
            stroke-dashoffset: 0;
        }
        50% {
            stroke-dasharray: 89, 200;
            stroke-dashoffset: -35px;
        }
        100% {
            stroke-dasharray: 89, 200;
            stroke-dashoffset: -124px;
        }
    }
    @keyframes p-progressspinner-color {
        100%,
        0% {
            stroke: dt('progressspinner.color.one');
        }
        40% {
            stroke: dt('progressspinner.color.two');
        }
        66% {
            stroke: dt('progressspinner.color.three');
        }
        80%,
        90% {
            stroke: dt('progressspinner.color.four');
        }
    }
`;var ee={root:()=>["p-progressspinner"],spin:"p-progressspinner-spin",circle:"p-progressspinner-circle"},q=(()=>{class e extends C{name="progressspinner";style=G;classes=ee;static \u0275fac=(()=>{let n;return function(t){return(n||(n=l(e)))(t||e)}})();static \u0275prov=f({token:e,factory:e.\u0275fac})}return e})();var K=new h("PROGRESSSPINNER_INSTANCE"),te=(()=>{class e extends D{componentName="ProgressSpinner";$pcProgressSpinner=s(K,{optional:!0,skipSelf:!0})??void 0;bindDirectiveInstance=s(o,{self:!0});styleClass;strokeWidth="2";fill="none";animationDuration="2s";ariaLabel;onAfterViewChecked(){this.bindDirectiveInstance.setAttrs(this.ptms(["host","root"]))}_componentStyle=s(q);static \u0275fac=(()=>{let n;return function(t){return(n||(n=l(e)))(t||e)}})();static \u0275cmp=g({type:e,selectors:[["p-progressSpinner"],["p-progress-spinner"],["p-progressspinner"]],hostVars:5,hostBindings:function(i,t){i&2&&(p("aria-label",t.ariaLabel)("role","progressbar")("aria-busy",!0),a(t.cn(t.cx("root"),t.styleClass)))},inputs:{styleClass:"styleClass",strokeWidth:"strokeWidth",fill:"fill",animationDuration:"animationDuration",ariaLabel:"ariaLabel"},features:[I([q,{provide:K,useExisting:e},{provide:B,useExisting:e}]),b([o]),v],decls:2,vars:10,consts:[["viewBox","25 25 50 50",3,"pBind"],["cx","50","cy","50","r","20","stroke-miterlimit","10",3,"pBind"]],template:function(i,t){i&1&&(A(),w(0,"svg",0),j(1,"circle",1),L()),i&2&&(a(t.cx("spin")),O("animation-duration",t.animationDuration),c("pBind",t.ptm("spin")),k(),a(t.cx("circle")),c("pBind",t.ptm("circle")),p("fill",t.fill)("stroke-width",t.strokeWidth))},dependencies:[E,r,o],encapsulation:2,changeDetection:0})}return e})(),Ee=(()=>{class e{static \u0275fac=function(i){return new(i||e)};static \u0275mod=y({type:e});static \u0275inj=u({imports:[te,r,r]})}return e})();var $=`
    .p-blockui {
        position: relative;
    }

    .p-blockui-mask {
        border-radius: dt('blockui.border.radius');
    }

    .p-blockui-mask.p-overlay-mask {
        position: absolute;
    }

    .p-blockui-mask-document.p-overlay-mask {
        position: fixed;
    }
`;var ne=["content"],ie=["*"];function oe(e,ae){e&1&&P(0)}var se={root:({instance:e})=>["p-blockui p-blockui-mask",{"p-blockui-mask-document":!e.target}]},z=(()=>{class e extends C{name="blockui";style=$;classes=se;static \u0275fac=(()=>{let n;return function(t){return(n||(n=l(e)))(t||e)}})();static \u0275prov=f({token:e,factory:e.\u0275fac})}return e})();var J=new h("BLOCKUI_INSTANCE"),re=(()=>{class e extends D{componentName="BlockUI";$pcBlockUI=s(J,{optional:!0,skipSelf:!0})??void 0;bindDirectiveInstance=s(o,{self:!0});onAfterViewChecked(){this.bindDirectiveInstance.setAttrs(this.ptms(["host","root"]))}target;autoZIndex=!0;baseZIndex=0;styleClass;get blocked(){return this._blocked}set blocked(n){this.el&&this.el.nativeElement?n?this.block():this._blocked&&this.unblock():this._blocked=n}contentTemplate;_blocked=!1;animationEndListener;_componentStyle=s(z);constructor(){super()}onAfterViewInit(){if(this._blocked&&this.block(),this.target&&!this.target.getBlockableElement)throw"Target of BlockUI must implement BlockableUI interface"}_contentTemplate;templates;onAfterContentInit(){this.templates.forEach(n=>{n.getType()==="content"?this.contentTemplate=n.template:this.contentTemplate=n.template})}block(){d(this.platformId)&&(this._blocked=!0,this.el.nativeElement.style.display="flex",this.target?(this.target.getBlockableElement().appendChild(this.el.nativeElement),this.target.getBlockableElement().style.position="relative"):(this.renderer.appendChild(this.document.body,this.el.nativeElement),H()),this.autoZIndex&&S.set("modal",this.el.nativeElement,this.baseZIndex+this.config.zIndex.modal),this.renderer.addClass(this.el.nativeElement,"p-overlay-mask"),this.renderer.addClass(this.el.nativeElement,"p-overlay-mask-enter-active"))}unblock(){d(this.platformId)&&this.el&&this._blocked&&(this._blocked=!1,this.animationEndListener||(this.animationEndListener=this.renderer.listen(this.el.nativeElement,"animationend",this.destroyModal.bind(this))),this.renderer.removeClass(this.el.nativeElement,"p-overlay-mask-enter-active"),this.renderer.addClass(this.el.nativeElement,"p-overlay-mask-leave-active"))}destroyModal(){this._blocked=!1,this.el&&d(this.platformId)&&(this.el.nativeElement.style.display="none",this.renderer.removeClass(this.el.nativeElement,"p-overlay-mask"),this.renderer.removeClass(this.el.nativeElement,"p-overlay-mask-leave-active"),S.clear(this.el.nativeElement),this.target||(this.document.body.removeChild(this.el.nativeElement),x())),this.unbindAnimationEndListener(),this.cd.markForCheck()}unbindAnimationEndListener(){this.animationEndListener&&this.el&&(this.animationEndListener(),this.animationEndListener=null)}onDestroy(){this._blocked&&(this._blocked=!1,this.el&&d(this.platformId)&&(S.clear(this.el.nativeElement),this.target||x()),this.unbindAnimationEndListener())}static \u0275fac=function(i){return new(i||e)};static \u0275cmp=g({type:e,selectors:[["p-blockUI"],["p-blockui"],["p-block-ui"]],contentQueries:function(i,t,_){if(i&1&&R(_,ne,4)(_,W,4),i&2){let m;M(m=T())&&(t.contentTemplate=m.first),M(m=T())&&(t.templates=m)}},hostVars:3,hostBindings:function(i,t){i&2&&(p("aria-busy",t.blocked),a(t.cn(t.cx("root"),t.styleClass)))},inputs:{target:"target",autoZIndex:[2,"autoZIndex","autoZIndex",N],baseZIndex:[2,"baseZIndex","baseZIndex",V],styleClass:"styleClass",blocked:[2,"blocked","blocked",N]},features:[I([z,{provide:J,useExisting:e},{provide:B,useExisting:e}]),b([o]),v],ngContentSelectors:ie,decls:2,vars:1,consts:[[4,"ngTemplateOutlet"]],template:function(i,t){i&1&&(U(),Z(0),F(1,oe,1,0,"ng-container",0)),i&2&&(k(),c("ngTemplateOutlet",t.contentTemplate||t._contentTemplate))},dependencies:[E,Q,r],encapsulation:2,changeDetection:0})}return e})(),Qe=(()=>{class e{static \u0275fac=function(i){return new(i||e)};static \u0275mod=y({type:e});static \u0275inj=u({imports:[re,r,r]})}return e})();export{te as a,Ee as b,re as c,Qe as d};
