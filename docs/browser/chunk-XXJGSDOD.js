import{B as m,E as L,F as j,I as u,O as E,a as F,c as B,e as a,n as C,pa as d,ta as f}from"./chunk-PRXZITXW.js";import{B as l,C as h,Db as x,F as r,Ia as w,Ja as b,P as s,Sb as M,Ua as D,_ as g,ea as y,fa as v,fb as c,ga as k,ia as p,wb as I}from"./chunk-GPRQO4UL.js";var A=`
    .p-ink {
        display: block;
        position: absolute;
        background: dt('ripple.background');
        border-radius: 100%;
        transform: scale(0);
        pointer-events: none;
    }

    .p-ink-active {
        animation: ripple 0.4s linear;
    }

    @keyframes ripple {
        100% {
            opacity: 0;
            transform: scale(2.5);
        }
    }
`;var V=`
    ${A}

    /* For PrimeNG */
    .p-ripple {
        overflow: hidden;
        position: relative;
    }

    .p-ripple-disabled .p-ink {
        display: none !important;
    }

    @keyframes ripple {
        100% {
            opacity: 0;
            transform: scale(2.5);
        }
    }
`,H={root:"p-ink"},S=(()=>{class t extends d{name="ripple";style=V;classes=H;static \u0275fac=(()=>{let e;return function(i){return(e||(e=s(t)))(i||t)}})();static \u0275prov=l({token:t,factory:t.\u0275fac})}return t})();var U=(()=>{class t extends f{zone=r(g);_componentStyle=r(S);animationListener;mouseDownListener;timeout;constructor(){super(),I(()=>{M(this.platformId)&&(this.config.ripple()?this.zone.runOutsideAngular(()=>{this.create(),this.mouseDownListener=this.renderer.listen(this.el.nativeElement,"mousedown",this.onMouseDown.bind(this))}):this.remove())})}onAfterViewInit(){}onMouseDown(e){let n=this.getInk();if(!n||this.document.defaultView?.getComputedStyle(n,null).display==="none")return;if(a(n,"p-ink-active"),!m(n)&&!u(n)){let o=Math.max(C(this.el.nativeElement),j(this.el.nativeElement));n.style.height=o+"px",n.style.width=o+"px"}let i=L(this.el.nativeElement),O=e.pageX-i.left+this.document.body.scrollTop-u(n)/2,T=e.pageY-i.top+this.document.body.scrollLeft-m(n)/2;this.renderer.setStyle(n,"top",T+"px"),this.renderer.setStyle(n,"left",O+"px"),B(n,"p-ink-active"),this.timeout=setTimeout(()=>{let o=this.getInk();o&&a(o,"p-ink-active")},401)}getInk(){let e=this.el.nativeElement.children;for(let n=0;n<e.length;n++)if(typeof e[n].className=="string"&&e[n].className.indexOf("p-ink")!==-1)return e[n];return null}resetInk(){let e=this.getInk();e&&a(e,"p-ink-active")}onAnimationEnd(e){this.timeout&&clearTimeout(this.timeout),a(e.currentTarget,"p-ink-active")}create(){let e=this.renderer.createElement("span");this.renderer.addClass(e,"p-ink"),this.renderer.appendChild(this.el.nativeElement,e),this.renderer.setAttribute(e,"aria-hidden","true"),this.renderer.setAttribute(e,"role","presentation"),this.animationListener||(this.animationListener=this.renderer.listen(e,"animationend",this.onAnimationEnd.bind(this)))}remove(){let e=this.getInk();e&&(this.mouseDownListener&&this.mouseDownListener(),this.animationListener&&this.animationListener(),this.mouseDownListener=null,this.animationListener=null,E(e))}onDestroy(){this.config&&this.config.ripple()&&this.remove()}static \u0275fac=function(n){return new(n||t)};static \u0275dir=k({type:t,selectors:[["","pRipple",""]],hostAttrs:[1,"p-ripple"],features:[c([S]),p]})}return t})(),_=(()=>{class t{static \u0275fac=function(n){return new(n||t)};static \u0275mod=v({type:t});static \u0275inj=h({})}return t})();var R=["*"],z=`
.p-icon {
    display: inline-block;
    vertical-align: baseline;
    flex-shrink: 0;
}

.p-icon-spin {
    -webkit-animation: p-icon-spin 2s infinite linear;
    animation: p-icon-spin 2s infinite linear;
}

@-webkit-keyframes p-icon-spin {
    0% {
        -webkit-transform: rotate(0deg);
        transform: rotate(0deg);
    }
    100% {
        -webkit-transform: rotate(359deg);
        transform: rotate(359deg);
    }
}

@keyframes p-icon-spin {
    0% {
        -webkit-transform: rotate(0deg);
        transform: rotate(0deg);
    }
    100% {
        -webkit-transform: rotate(359deg);
        transform: rotate(359deg);
    }
}
`,N=(()=>{class t extends d{name="baseicon";css=z;static \u0275fac=(()=>{let e;return function(i){return(e||(e=s(t)))(i||t)}})();static \u0275prov=l({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})();var ce=(()=>{class t extends f{spin=!1;_componentStyle=r(N);getClassNames(){return F("p-icon",{"p-icon-spin":this.spin})}static \u0275fac=(()=>{let e;return function(i){return(e||(e=s(t)))(i||t)}})();static \u0275cmp=y({type:t,selectors:[["ng-component"]],hostAttrs:["width","14","height","14","viewBox","0 0 14 14","fill","none","xmlns","http://www.w3.org/2000/svg"],hostVars:2,hostBindings:function(n,i){n&2&&D(i.getClassNames())},inputs:{spin:[2,"spin","spin",x]},features:[c([N]),p],ngContentSelectors:R,decls:1,vars:0,template:function(n,i){n&1&&(w(),b(0))},encapsulation:2,changeDetection:0})}return t})();export{ce as a,U as b,_ as c};
