import{F as m,K as C,Ka as d,L,O as u,Oa as f,Y as j,a as A,c as F,e as a,o as B}from"./chunk-34SKYTGK.js";import{Nb as w,Ob as D,P as l,Q as h,U as s,Wc as x,_b as I,ab as v,bb as k,cb as b,fb as p,ga as g,la as y,mc as c,na as o,yd as M}from"./chunk-3NAOPKLA.js";var E=`
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
`;var P=`
    ${E}

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
`,R={root:"p-ink"},N=(()=>{class i extends d{name="ripple";style=P;classes=R;static \u0275fac=(()=>{let e;return function(n){return(e||(e=o(i)))(n||i)}})();static \u0275prov=l({token:i,factory:i.\u0275fac})}return i})();var U=(()=>{class i extends f{componentName="Ripple";zone=s(g);_componentStyle=s(N);animationListener;mouseDownListener;timeout;constructor(){super(),y(()=>{M(this.platformId)&&(this.config.ripple()?this.zone.runOutsideAngular(()=>{this.create(),this.mouseDownListener=this.renderer.listen(this.el.nativeElement,"mousedown",this.onMouseDown.bind(this))}):this.remove())})}onAfterViewInit(){}onMouseDown(e){let t=this.getInk();if(!t||this.document.defaultView?.getComputedStyle(t,null).display==="none")return;if(!this.$unstyled()&&a(t,"p-ink-active"),t.setAttribute("data-p-ink-active","false"),!m(t)&&!u(t)){let r=Math.max(B(this.el.nativeElement),L(this.el.nativeElement));t.style.height=r+"px",t.style.width=r+"px"}let n=C(this.el.nativeElement),$=e.pageX-n.left+this.document.body.scrollTop-u(t)/2,T=e.pageY-n.top+this.document.body.scrollLeft-m(t)/2;this.renderer.setStyle(t,"top",T+"px"),this.renderer.setStyle(t,"left",$+"px"),!this.$unstyled()&&F(t,"p-ink-active"),t.setAttribute("data-p-ink-active","true"),this.timeout=setTimeout(()=>{let r=this.getInk();r&&(!this.$unstyled()&&a(r,"p-ink-active"),r.setAttribute("data-p-ink-active","false"))},401)}getInk(){let e=this.el.nativeElement.children;for(let t=0;t<e.length;t++)if(typeof e[t].className=="string"&&e[t].className.indexOf("p-ink")!==-1)return e[t];return null}resetInk(){let e=this.getInk();e&&(!this.$unstyled()&&a(e,"p-ink-active"),e.setAttribute("data-p-ink-active","false"))}onAnimationEnd(e){this.timeout&&clearTimeout(this.timeout),!this.$unstyled()&&a(e.currentTarget,"p-ink-active"),e.currentTarget.setAttribute("data-p-ink-active","false")}create(){let e=this.renderer.createElement("span");this.renderer.addClass(e,"p-ink"),this.renderer.appendChild(this.el.nativeElement,e),this.renderer.setAttribute(e,"data-p-ink","true"),this.renderer.setAttribute(e,"data-p-ink-active","false"),this.renderer.setAttribute(e,"aria-hidden","true"),this.renderer.setAttribute(e,"role","presentation"),this.animationListener||(this.animationListener=this.renderer.listen(e,"animationend",this.onAnimationEnd.bind(this)))}remove(){let e=this.getInk();e&&(this.mouseDownListener&&this.mouseDownListener(),this.animationListener&&this.animationListener(),this.mouseDownListener=null,this.animationListener=null,j(e))}onDestroy(){this.config&&this.config.ripple()&&this.remove()}static \u0275fac=function(t){return new(t||i)};static \u0275dir=b({type:i,selectors:[["","pRipple",""]],hostAttrs:[1,"p-ripple"],features:[c([N]),p]})}return i})(),_=(()=>{class i{static \u0275fac=function(t){return new(t||i)};static \u0275mod=k({type:i});static \u0275inj=h({})}return i})();var V=["*"],H=`
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
`,S=(()=>{class i extends d{name="baseicon";css=H;static \u0275fac=(()=>{let e;return function(n){return(e||(e=o(i)))(n||i)}})();static \u0275prov=l({token:i,factory:i.\u0275fac,providedIn:"root"})}return i})();var ce=(()=>{class i extends f{spin=!1;_componentStyle=s(S);getClassNames(){return A("p-icon",{"p-icon-spin":this.spin})}static \u0275fac=(()=>{let e;return function(n){return(e||(e=o(i)))(n||i)}})();static \u0275cmp=v({type:i,selectors:[["ng-component"]],hostAttrs:["width","14","height","14","viewBox","0 0 14 14","fill","none","xmlns","http://www.w3.org/2000/svg"],hostVars:2,hostBindings:function(t,n){t&2&&I(n.getClassNames())},inputs:{spin:[2,"spin","spin",x]},features:[c([S]),p],ngContentSelectors:V,decls:1,vars:0,template:function(t,n){t&1&&(w(),D(0))},encapsulation:2,changeDetection:0})}return i})();export{ce as a,U as b,_ as c};
