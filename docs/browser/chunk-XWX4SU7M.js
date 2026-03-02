import{r as T}from"./chunk-BT4T4VK6.js";import{c as W,e as q,ja as R,ka as o,na as S,pa as B}from"./chunk-BSRWTFBH.js";import{Aa as y,Ba as Z,C as m,D as u,Db as C,Ea as Q,G as f,Gb as M,Hb as $,Ja as U,K as _,Ka as N,M as a,Mb as D,Nb as E,Pa as F,Qa as A,Ra as b,Sa as v,_ as l,cb as I,eb as O,fb as P,ga as g,ha as k,ka as h,ma as x,oa as s,pa as p,qa as j,ta as L,ub as w,vb as V,za as c}from"./chunk-FODEVAKI.js";var K=({dt:e})=>`
.p-progressspinner {
    position: relative;
    margin: 0 auto;
    width: 100px;
    height: 100px;
    display: inline-block;
}

.p-progressspinner::before {
    content: "";
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
    stroke: ${e("progressspinner.colorOne")};
    animation: p-progressspinner-dash 1.5s ease-in-out infinite, p-progressspinner-color 6s ease-in-out infinite;
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
        stroke: ${e("progressspinner.colorOne")};
    }
    40% {
        stroke: ${e("progressspinner.colorTwo")};
    }
    66% {
        stroke: ${e("progressspinner.colorThree")};
    }
    80%,
    90% {
        stroke: ${e("progressspinner.colorFour")};
    }
}
`,X={root:"p-progressspinner",spin:"p-progressspinner-spin",circle:"p-progressspinner-circle"},z=(()=>{class e extends S{name="progressspinner";theme=K;classes=X;static \u0275fac=(()=>{let n;return function(t){return(n||(n=a(e)))(t||e)}})();static \u0275prov=m({token:e,factory:e.\u0275fac})}return e})();var Y=(()=>{class e extends B{styleClass;style;strokeWidth="2";fill="none";animationDuration="2s";ariaLabel;_componentStyle=f(z);static \u0275fac=(()=>{let n;return function(t){return(n||(n=a(e)))(t||e)}})();static \u0275cmp=g({type:e,selectors:[["p-progressSpinner"],["p-progress-spinner"],["p-progressspinner"]],inputs:{styleClass:"styleClass",style:"style",strokeWidth:"strokeWidth",fill:"fill",animationDuration:"animationDuration",ariaLabel:"ariaLabel"},features:[I([z]),h],decls:3,vars:11,consts:[["role","progressbar",1,"p-progressspinner",3,"ngStyle","ngClass"],["viewBox","25 25 50 50",1,"p-progressspinner-spin"],["cx","50","cy","50","r","20","stroke-miterlimit","10",1,"p-progressspinner-circle"]],template:function(i,t){i&1&&(c(0,"div",0),_(),c(1,"svg",1),Z(2,"circle",2),y()()),i&2&&(p("ngStyle",t.style)("ngClass",t.styleClass),s("aria-label",t.ariaLabel)("aria-busy",!0)("data-pc-name","progressspinner")("data-pc-section","root"),l(),j("animation-duration",t.animationDuration),s("data-pc-section","root"),l(),s("fill",t.fill)("stroke-width",t.strokeWidth))},dependencies:[D,C,M,o],encapsulation:2,changeDetection:0})}return e})(),Ie=(()=>{class e{static \u0275fac=function(i){return new(i||e)};static \u0275mod=k({type:e});static \u0275inj=u({imports:[Y,o,o]})}return e})();var ee=["content"],te=["mask"],ne=["*"],ie=e=>({"p-blockui-mask-document":e,"p-blockui p-blockui-mask p-overlay-mask":!0}),oe=()=>({display:"none"});function se(e,pe){e&1&&Q(0)}var re=({dt:e})=>`
.p-blockui {
    position: relative;
}

.p-blockui-mask {
    border-radius: ${e("blockui.border.radius")};
}

.p-blockui-mask.p-overlay-mask {
    position: absolute;
}

.p-blockui-mask-document.p-overlay-mask {
    position: fixed;
}
`,ae={root:"p-blockui"},G=(()=>{class e extends S{name="blockui";theme=re;classes=ae;static \u0275fac=(()=>{let n;return function(t){return(n||(n=a(e)))(t||e)}})();static \u0275prov=m({token:e,factory:e.\u0275fac})}return e})();var le=(()=>{class e extends B{target;autoZIndex=!0;baseZIndex=0;styleClass;get blocked(){return this._blocked}set blocked(n){this.mask&&this.mask.nativeElement?n?this.block():this.unblock():this._blocked=n}contentTemplate;mask;_blocked=!1;animationEndListener;_componentStyle=f(G);constructor(){super()}ngAfterViewInit(){if(super.ngAfterViewInit(),this._blocked&&this.block(),this.target&&!this.target.getBlockableElement)throw"Target of BlockUI must implement BlockableUI interface"}_contentTemplate;templates;ngAfterContentInit(){this.templates.forEach(n=>{switch(n.getType()){case"content":this.contentTemplate=n.template;break;default:this.contentTemplate=n.template;break}})}block(){E(this.platformId)&&(this._blocked=!0,this.mask.nativeElement.style.display="flex",this.target?(this.target.getBlockableElement().appendChild(this.mask.nativeElement),this.target.getBlockableElement().style.position="relative"):(this.renderer.appendChild(this.document.body,this.mask.nativeElement),W()),this.autoZIndex&&T.set("modal",this.mask.nativeElement,this.baseZIndex+this.config.zIndex.modal))}unblock(){E(this.platformId)&&this.mask&&!this.animationEndListener&&this.destroyModal()}destroyModal(){this._blocked=!1,this.mask&&E(this.platformId)&&(T.clear(this.mask.nativeElement),this.renderer.removeChild(this.el.nativeElement,this.mask.nativeElement),q()),this.unbindAnimationEndListener(),this.cd.markForCheck()}unbindAnimationEndListener(){this.animationEndListener&&this.mask&&(this.animationEndListener(),this.animationEndListener=null)}ngOnDestroy(){this.unblock(),this.destroyModal(),super.ngOnDestroy()}static \u0275fac=function(i){return new(i||e)};static \u0275cmp=g({type:e,selectors:[["p-blockUI"],["p-blockui"],["p-block-ui"]],contentQueries:function(i,t,r){if(i&1&&(F(r,ee,4),F(r,R,4)),i&2){let d;b(d=v())&&(t.contentTemplate=d.first),b(d=v())&&(t.templates=d)}},viewQuery:function(i,t){if(i&1&&A(te,5),i&2){let r;b(r=v())&&(t.mask=r.first)}},inputs:{target:"target",autoZIndex:[2,"autoZIndex","autoZIndex",w],baseZIndex:[2,"baseZIndex","baseZIndex",V],styleClass:"styleClass",blocked:[2,"blocked","blocked",w]},features:[I([G]),h],ngContentSelectors:ne,decls:4,vars:11,consts:[["mask",""],[3,"ngClass","ngStyle"],[4,"ngTemplateOutlet"]],template:function(i,t){i&1&&(U(),c(0,"div",1,0),N(2),x(3,se,1,0,"ng-container",2),y()),i&2&&(L(t.styleClass),p("ngClass",P(8,ie,!t.target))("ngStyle",O(10,oe)),s("aria-busy",t.blocked)("data-pc-name","blockui")("data-pc-section","root"),l(3),p("ngTemplateOutlet",t.contentTemplate||t._contentTemplate))},dependencies:[D,C,$,M,o],encapsulation:2,changeDetection:0})}return e})(),Ae=(()=>{class e{static \u0275fac=function(i){return new(i||e)};static \u0275mod=k({type:e});static \u0275inj=u({imports:[le,o,o]})}return e})();export{Y as a,Ie as b,le as c,Ae as d};
