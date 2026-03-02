import{A as x,E as u,M as A,Q as E,b as F,d as o,k as M,na as c,pa as d,w as f,z as L}from"./chunk-BSRWTFBH.js";import{C as a,D as h,G as m,Ja as b,Ka as D,M as s,Nb as C,P as g,cb as p,ga as y,ha as v,ia as k,ka as l,ub as w,yb as I}from"./chunk-FODEVAKI.js";var N=({dt:t})=>`
/* For PrimeNG */
.p-ripple {
    overflow: hidden;
    position: relative;
}

.p-ink {
    display: block;
    position: absolute;
    background: ${t("ripple.background")};
    border-radius: 100%;
    transform: scale(0);
}

.p-ink-active {
    animation: ripple 0.4s linear;
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
`,T={root:"p-ink"},B=(()=>{class t extends c{name="ripple";theme=N;classes=T;static \u0275fac=(()=>{let e;return function(n){return(e||(e=s(t)))(n||t)}})();static \u0275prov=a({token:t,factory:t.\u0275fac})}return t})();var q=(()=>{class t extends d{zone=m(g);_componentStyle=m(B);animationListener;mouseDownListener;timeout;constructor(){super(),I(()=>{C(this.platformId)&&(this.config.ripple()?this.zone.runOutsideAngular(()=>{this.create(),this.mouseDownListener=this.renderer.listen(this.el.nativeElement,"mousedown",this.onMouseDown.bind(this))}):this.remove())})}ngAfterViewInit(){super.ngAfterViewInit()}onMouseDown(e){let i=this.getInk();if(!i||this.document.defaultView?.getComputedStyle(i,null).display==="none")return;if(o(i,"p-ink-active"),!f(i)&&!u(i)){let r=Math.max(M(this.el.nativeElement),x(this.el.nativeElement));i.style.height=r+"px",i.style.width=r+"px"}let n=L(this.el.nativeElement),j=e.pageX-n.left+this.document.body.scrollTop-u(i)/2,O=e.pageY-n.top+this.document.body.scrollLeft-f(i)/2;this.renderer.setStyle(i,"top",O+"px"),this.renderer.setStyle(i,"left",j+"px"),F(i,"p-ink-active"),this.timeout=setTimeout(()=>{let r=this.getInk();r&&o(r,"p-ink-active")},401)}getInk(){let e=this.el.nativeElement.children;for(let i=0;i<e.length;i++)if(typeof e[i].className=="string"&&e[i].className.indexOf("p-ink")!==-1)return e[i];return null}resetInk(){let e=this.getInk();e&&o(e,"p-ink-active")}onAnimationEnd(e){this.timeout&&clearTimeout(this.timeout),o(e.currentTarget,"p-ink-active")}create(){let e=this.renderer.createElement("span");this.renderer.addClass(e,"p-ink"),this.renderer.appendChild(this.el.nativeElement,e),this.renderer.setAttribute(e,"aria-hidden","true"),this.renderer.setAttribute(e,"role","presentation"),this.animationListener||(this.animationListener=this.renderer.listen(e,"animationend",this.onAnimationEnd.bind(this)))}remove(){let e=this.getInk();e&&(this.mouseDownListener&&this.mouseDownListener(),this.animationListener&&this.animationListener(),this.mouseDownListener=null,this.animationListener=null,A(e))}ngOnDestroy(){this.config&&this.config.ripple()&&this.remove(),super.ngOnDestroy()}static \u0275fac=function(i){return new(i||t)};static \u0275dir=k({type:t,selectors:[["","pRipple",""]],hostAttrs:[1,"p-ripple"],features:[p([B]),l]})}return t})(),J=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275mod=v({type:t});static \u0275inj=h({})}return t})();var H=["*"],P=`
.p-icon {
    display: inline-block;
    vertical-align: baseline;
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
`,V=(()=>{class t extends c{name="baseicon";inlineStyles=P;static \u0275fac=(()=>{let e;return function(n){return(e||(e=s(t)))(n||t)}})();static \u0275prov=a({token:t,factory:t.\u0275fac})}return t})();var oe=(()=>{class t extends d{label;spin=!1;styleClass;role;ariaLabel;ariaHidden;ngOnInit(){super.ngOnInit(),this.getAttributes()}getAttributes(){let e=E(this.label);this.role=e?void 0:"img",this.ariaLabel=e?void 0:this.label,this.ariaHidden=e}getClassNames(){return`p-icon ${this.styleClass?this.styleClass+" ":""}${this.spin?"p-icon-spin":""}`}static \u0275fac=(()=>{let e;return function(n){return(e||(e=s(t)))(n||t)}})();static \u0275cmp=y({type:t,selectors:[["ng-component"]],hostAttrs:[1,"p-component","p-iconwrapper"],inputs:{label:"label",spin:[2,"spin","spin",w],styleClass:"styleClass"},features:[p([V]),l],ngContentSelectors:H,decls:1,vars:0,template:function(i,n){i&1&&(b(),D(0))},encapsulation:2,changeDetection:0})}return t})();export{oe as a,q as b,J as c};
