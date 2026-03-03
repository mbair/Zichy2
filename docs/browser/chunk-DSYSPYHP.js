import{r as N}from"./chunk-YKR3JRMQ.js";import{d as Q,f as H,la as W,ma as s,pa as E,sa as B,ta as D,ua as o}from"./chunk-PRXZITXW.js";import{B as m,C as u,D as f,Da as P,Db as x,Eb as O,F as r,Ia as U,J as w,Ja as Z,Ka as M,Ma as S,Mb as V,Na as T,P as l,Ra as R,Rb as I,Sb as C,Ua as a,Y as h,ea as g,fa as k,fb as v,ia as y,ja as b,ka as A,oa as p,ua as c,va as _,wa as j,xa as L}from"./chunk-GPRQO4UL.js";var G=`
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
`;var ee={root:()=>["p-progressspinner"],spin:"p-progressspinner-spin",circle:"p-progressspinner-circle"},q=(()=>{class e extends E{name="progressspinner";style=G;classes=ee;static \u0275fac=(()=>{let n;return function(t){return(n||(n=l(e)))(t||e)}})();static \u0275prov=m({token:e,factory:e.\u0275fac})}return e})();var K=new f("PROGRESSSPINNER_INSTANCE"),te=(()=>{class e extends D{$pcProgressSpinner=r(K,{optional:!0,skipSelf:!0})??void 0;bindDirectiveInstance=r(o,{self:!0});styleClass;strokeWidth="2";fill="none";animationDuration="2s";ariaLabel;onAfterViewChecked(){this.bindDirectiveInstance.setAttrs(this.ptms(["host","root"]))}_componentStyle=r(q);static \u0275fac=(()=>{let n;return function(t){return(n||(n=l(e)))(t||e)}})();static \u0275cmp=g({type:e,selectors:[["p-progressSpinner"],["p-progress-spinner"],["p-progressspinner"]],hostVars:5,hostBindings:function(i,t){i&2&&(p("aria-label",t.ariaLabel)("role","progressbar")("aria-busy",!0),a(t.cn(t.cx("root"),t.styleClass)))},inputs:{styleClass:"styleClass",strokeWidth:"strokeWidth",fill:"fill",animationDuration:"animationDuration",ariaLabel:"ariaLabel"},features:[v([q,{provide:K,useExisting:e},{provide:B,useExisting:e}]),b([o]),y],decls:2,vars:10,consts:[["viewBox","25 25 50 50",3,"pBind"],["cx","50","cy","50","r","20","stroke-miterlimit","10",3,"pBind"]],template:function(i,t){i&1&&(w(),_(0,"svg",0),L(1,"circle",1),j()),i&2&&(a(t.cx("spin")),R("animation-duration",t.animationDuration),c("pBind",t.ptm("spin")),h(),a(t.cx("circle")),c("pBind",t.ptm("circle")),p("fill",t.fill)("stroke-width",t.strokeWidth))},dependencies:[I,s,o],encapsulation:2,changeDetection:0})}return e})(),Ce=(()=>{class e{static \u0275fac=function(i){return new(i||e)};static \u0275mod=k({type:e});static \u0275inj=u({imports:[te,s,s]})}return e})();var $=`
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
`;var ne=["content"],ie=["*"];function oe(e,ae){e&1&&P(0)}var re={root:({instance:e})=>["p-blockui p-blockui-mask p-overlay-mask",{"p-blockui-mask-document":!e.target}]},z=(()=>{class e extends E{name="blockui";style=$;classes=re;static \u0275fac=(()=>{let n;return function(t){return(n||(n=l(e)))(t||e)}})();static \u0275prov=m({token:e,factory:e.\u0275fac})}return e})();var J=new f("BLOCKUI_INSTANCE"),se=(()=>{class e extends D{$pcBlockUI=r(J,{optional:!0,skipSelf:!0})??void 0;bindDirectiveInstance=r(o,{self:!0});onAfterViewChecked(){this.bindDirectiveInstance.setAttrs(this.ptms(["host","root"]))}target;autoZIndex=!0;baseZIndex=0;styleClass;get blocked(){return this._blocked}set blocked(n){this.el&&this.el.nativeElement?n?this.block():this.unblock():this._blocked=n}contentTemplate;_blocked=!1;animationEndListener;_componentStyle=r(z);constructor(){super()}onAfterViewInit(){if(this._blocked&&this.block(),this.target&&!this.target.getBlockableElement)throw"Target of BlockUI must implement BlockableUI interface"}_contentTemplate;templates;onAfterContentInit(){this.templates.forEach(n=>{switch(n.getType()){case"content":this.contentTemplate=n.template;break;default:this.contentTemplate=n.template;break}})}block(){C(this.platformId)&&(this._blocked=!0,this.el.nativeElement.style.display="flex",this.target?(this.target.getBlockableElement().appendChild(this.el.nativeElement),this.target.getBlockableElement().style.position="relative"):(this.renderer.appendChild(this.document.body,this.el.nativeElement),Q()),this.autoZIndex&&N.set("modal",this.el.nativeElement,this.baseZIndex+this.config.zIndex.modal))}unblock(){C(this.platformId)&&this.el&&!this.animationEndListener&&this.destroyModal()}destroyModal(){this._blocked=!1,this.el&&C(this.platformId)&&(N.clear(this.el.nativeElement),this.renderer.removeChild(this.el.nativeElement,this.el.nativeElement),H()),this.unbindAnimationEndListener(),this.cd.markForCheck()}unbindAnimationEndListener(){this.animationEndListener&&this.el&&(this.animationEndListener(),this.animationEndListener=null)}onDestroy(){this.unblock(),this.destroyModal()}static \u0275fac=function(i){return new(i||e)};static \u0275cmp=g({type:e,selectors:[["p-blockUI"],["p-blockui"],["p-block-ui"]],contentQueries:function(i,t,F){if(i&1&&(M(F,ne,4),M(F,W,4)),i&2){let d;S(d=T())&&(t.contentTemplate=d.first),S(d=T())&&(t.templates=d)}},hostVars:3,hostBindings:function(i,t){i&2&&(p("aria-busy",t.blocked),a(t.cn(t.cx("root"),t.styleClass)))},inputs:{target:"target",autoZIndex:[2,"autoZIndex","autoZIndex",x],baseZIndex:[2,"baseZIndex","baseZIndex",O],styleClass:"styleClass",blocked:[2,"blocked","blocked",x]},features:[v([z,{provide:J,useExisting:e},{provide:B,useExisting:e}]),b([o]),y],ngContentSelectors:ie,decls:2,vars:1,consts:[[4,"ngTemplateOutlet"]],template:function(i,t){i&1&&(U(),Z(0),A(1,oe,1,0,"ng-container",0)),i&2&&(h(),c("ngTemplateOutlet",t.contentTemplate||t._contentTemplate))},dependencies:[I,V,s],encapsulation:2,changeDetection:0})}return e})(),Qe=(()=>{class e{static \u0275fac=function(i){return new(i||e)};static \u0275mod=k({type:e});static \u0275inj=u({imports:[se,s,s]})}return e})();export{te as a,Ce as b,se as c,Qe as d};
