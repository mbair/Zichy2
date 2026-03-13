import{a as j,b as w}from"./chunk-34QZ2XZI.js";import{ga as I,ja as A,ka as N,la as a}from"./chunk-WJBJMXAA.js";import{L as n}from"./chunk-542WA43O.js";import{$b as B,Ab as r,Bb as f,Cb as b,Db as D,Ob as S,Pa as g,Pb as z,Q as d,R as l,T as p,V as s,Xc as M,_b as h,bb as u,cb as y,fb as v,gb as m,nc as C,oa as c,vd as E}from"./chunk-7CIMIMFD.js";var O=["*"],k=`
.p-overlaybadge {
    position: relative;
}

.p-overlaybadge .p-badge {
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(50%, -50%);
    transform-origin: 100% 0;
    margin: 0;
    outline-width: dt('overlaybadge.outline.width');
    outline-style: solid;
    outline-color: dt('overlaybadge.outline.color');
}
`,V={root:"p-overlaybadge"},F=(()=>{class e extends I{name="overlaybadge";style=k;classes=V;static \u0275fac=(()=>{let i;return function(t){return(i||(i=c(e)))(t||e)}})();static \u0275prov=d({token:e,factory:e.\u0275fac})}return e})(),T=new p("OVERLAYBADGE_INSTANCE"),R=(()=>{class e extends N{componentName="OverlayBadge";$pcOverlayBadge=s(T,{optional:!0,skipSelf:!0})??void 0;bindDirectiveInstance=s(a,{self:!0});styleClass;style;badgeSize;severity;value;badgeDisabled=!1;set size(i){this._size=i,!this.badgeSize&&this.size&&console.log("size property is deprecated and will removed in v18, use badgeSize instead.")}get size(){return this._size}_size;onAfterViewChecked(){this.bindDirectiveInstance.setAttrs(this.ptm("host"))}_componentStyle=s(F);constructor(){super()}static \u0275fac=function(o){return new(o||e)};static \u0275cmp=u({type:e,selectors:[["p-overlayBadge"],["p-overlay-badge"],["p-overlaybadge"]],inputs:{styleClass:"styleClass",style:"style",badgeSize:"badgeSize",severity:"severity",value:"value",badgeDisabled:[2,"badgeDisabled","badgeDisabled",M],size:"size"},features:[C([F,{provide:T,useExisting:e},{provide:A,useExisting:e}]),v([a]),m],ngContentSelectors:O,decls:3,vars:11,consts:[[3,"pBind"],[3,"pt","styleClass","badgeSize","severity","value","badgeDisabled"]],template:function(o,t){o&1&&(S(),f(0,"div",0),z(1),D(2,"p-badge",1),b()),o&2&&(B(t.cx("root")),r("pBind",t.ptm("root")),g(2),h(t.style),r("pt",t.ptm("pcBadge"))("styleClass",t.styleClass)("badgeSize",t.badgeSize)("severity",t.severity)("value",t.value)("badgeDisabled",t.badgeDisabled))},dependencies:[E,w,j,n,a],encapsulation:2,changeDetection:0})}return e})(),ee=(()=>{class e{static \u0275fac=function(o){return new(o||e)};static \u0275mod=y({type:e});static \u0275inj=l({imports:[R,n,n]})}return e})();export{R as a,ee as b};
