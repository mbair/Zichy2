import{a as pt,b as dt}from"./chunk-7WPJBMX3.js";import"./chunk-BBNPNTXL.js";import{a as lt}from"./chunk-SUXPJC26.js";import{a as fe}from"./chunk-JIUTCT4H.js";import{a as se}from"./chunk-2CFXJQKY.js";import{a as ce}from"./chunk-FZBYXY2W.js";import{a as Se}from"./chunk-QO7KS4M4.js";import{a as ge}from"./chunk-2NIIA65J.js";import{a as st,b as ct}from"./chunk-3ZV7G7FB.js";import"./chunk-Y5A2JJMU.js";import{a as Ee}from"./chunk-EZGN3KU7.js";import{c as we,d as Ce}from"./chunk-WNZYY74E.js";import{b as it,c as nt,f as Ne}from"./chunk-YO3EMRP3.js";import"./chunk-34QZ2XZI.js";import{c as at,d as ot}from"./chunk-NWO6NVGN.js";import{b as rt}from"./chunk-QL2D4KBU.js";import"./chunk-NUM5UM42.js";import{$ as ne,A as Je,B as ye,ba as Te,c as xe,e as ie,ga as oe,ja as re,ka as G,la as x,ma as le,y as O,z as X}from"./chunk-WJBJMXAA.js";import{I as et,J as tt,K as ae,L as P}from"./chunk-542WA43O.js";import{$ as g,$b as d,Ab as r,Bb as m,Cb as u,Db as _,Ec as D,Hb as N,Ib as L,Ic as De,Jb as Q,Ka as be,Kb as w,Mb as I,Mc as Pe,Nb as s,Oa as $e,Ob as Qe,Pa as c,Pb as Ae,Q as H,Qb as ee,R as Y,Rb as te,Sb as f,T as ve,Tb as v,Uc as Ye,V as T,Xb as qe,Xc as b,Ya as B,Yc as q,_ as h,_b as Ke,aa as k,ac as Z,bb as M,bc as Ue,cb as J,cc as Ze,fb as R,ga as V,gb as E,ha as He,hb as p,jd as Ie,ka as Me,kc as We,kd as he,ld as K,nc as A,oa as $,od as W,pc as ue,pd as j,qa as _e,qc as F,rb as y,rc as Xe,ub as Fe,vb as Oe,vd as z,zd as C}from"./chunk-7CIMIMFD.js";import{a as me}from"./chunk-LG6SK6BE.js";var mt=`
    .p-carousel {
        display: flex;
        flex-direction: column;
    }

    .p-carousel-content-container {
        display: flex;
        flex-direction: column;
        overflow: auto;
    }

    .p-carousel-content {
        display: flex;
        flex-direction: row;
        gap: dt('carousel.content.gap');
    }

    .p-carousel-content:dir(rtl) {
        flex-direction: row-reverse;
    }

    .p-carousel-viewport {
        overflow: hidden;
        width: 100%;
    }

    .p-carousel-item-list {
        display: flex;
        flex-direction: row;
    }

    .p-carousel-item-list:dir(rtl) {
        flex-direction: row-reverse;
    }

    .p-carousel-prev-button,
    .p-carousel-next-button {
        align-self: center;
        flex-shrink: 0;
    }

    .p-carousel-indicator-list {
        display: flex;
        flex-direction: row;
        justify-content: center;
        flex-wrap: wrap;
        padding: dt('carousel.indicator.list.padding');
        gap: dt('carousel.indicator.list.gap');
        margin: 0;
        list-style: none;
    }

    .p-carousel-indicator-button {
        display: flex;
        align-items: center;
        justify-content: center;
        background: dt('carousel.indicator.background');
        width: dt('carousel.indicator.width');
        height: dt('carousel.indicator.height');
        border: 0 none;
        transition:
            background dt('carousel.transition.duration'),
            color dt('carousel.transition.duration'),
            outline-color dt('carousel.transition.duration'),
            box-shadow dt('carousel.transition.duration');
        outline-color: transparent;
        border-radius: dt('carousel.indicator.border.radius');
        padding: 0;
        margin: 0;
        user-select: none;
        cursor: pointer;
    }

    .p-carousel-indicator-button:focus-visible {
        box-shadow: dt('carousel.indicator.focus.ring.shadow');
        outline: dt('carousel.indicator.focus.ring.width') dt('carousel.indicator.focus.ring.style') dt('carousel.indicator.focus.ring.color');
        outline-offset: dt('carousel.indicator.focus.ring.offset');
    }

    .p-carousel-indicator-button:hover {
        background: dt('carousel.indicator.hover.background');
    }

    .p-carousel-indicator-active .p-carousel-indicator-button {
        background: dt('carousel.indicator.active.background');
    }

    .p-carousel-vertical .p-carousel-content {
        flex-direction: column;
    }

    .p-carousel-vertical .p-carousel-item-list {
        flex-direction: column;
        height: 100%;
    }

    .p-items-hidden .p-carousel-item {
        visibility: hidden;
    }

    .p-items-hidden .p-carousel-item.p-carousel-item-active {
        visibility: visible;
    }
`;var wt=["item"],Ct=["header"],St=["footer"],kt=["previousicon"],Vt=["nexticon"],Bt=["itemsContainer"],Mt=["indicatorContent"],Ft=[[["p-header"]],[["p-footer"]]],Ot=["p-header","p-footer"],At=t=>({height:t}),Ve=t=>({index:t}),Ge=t=>({$implicit:t});function Dt(t,o){t&1&&Q(0)}function Pt(t,o){if(t&1&&(m(0,"div",5),Ae(1),p(2,Dt,1,0,"ng-container",13),u()),t&2){let e=s();d(e.cx("header")),r("pBind",e.ptm("header")),c(2),r("ngTemplateOutlet",e.headerTemplate)}}function Et(t,o){t&1&&(k(),_(0,"svg",18))}function Nt(t,o){t&1&&(k(),_(0,"svg",19))}function Lt(t,o){if(t&1&&(N(0),p(1,Et,1,0,"svg",16)(2,Nt,1,0,"svg",17),L()),t&2){let e=s(3);c(),r("ngIf",!e.isVertical()),c(),r("ngIf",e.isVertical())}}function Gt(t,o){}function Rt(t,o){t&1&&p(0,Gt,0,0,"ng-template")}function jt(t,o){if(t&1&&(N(0),p(1,Rt,1,0,null,13),L()),t&2){let e=s(3);c(),r("ngTemplateOutlet",e.previousIconTemplate||e._previousIconTemplate)}}function zt(t,o){if(t&1&&p(0,Lt,3,2,"ng-container",15)(1,jt,2,1,"ng-container",15),t&2){let e=s(2);r("ngIf",!e.previousIconTemplate&&!e._previousIconTemplate&&!(e.prevButtonProps!=null&&e.prevButtonProps.icon)),c(),r("ngIf",(e.previousIconTemplate||e._previousIconTemplate)&&!(e.prevButtonProps!=null&&e.prevButtonProps.icon))}}function Ht(t,o){if(t&1){let e=w();m(0,"p-button",14),I("click",function(i){h(e);let a=s();return g(a.navBackward(i))}),p(1,zt,2,2,"ng-template",null,1,D),u()}if(t&2){let e=s();d(e.cx("pcPrevButton")),r("text",!0)("buttonProps",e.prevButtonProps)("pt",e.ptm("pcPrevButton"))("unstyled",e.unstyled()),y("aria-label",e.ariaPrevButtonLabel())}}function $t(t,o){t&1&&Q(0)}function Qt(t,o){if(t&1&&(m(0,"div",5),p(1,$t,1,0,"ng-container",20),u()),t&2){let e=o.$implicit,n=o.index,i=s();d(i.cx("itemClone",F(11,Ve,n))),r("pBind",i.ptm("itemClone")),y("aria-hidden",i.totalShiftedItems*-1!==i.value.length)("aria-label",i.ariaSlideNumber(n))("aria-roledescription",i.ariaSlideLabel())("data-p-carousel-item-active",i.totalShiftedItems*-1===i.value.length+i._numVisible)("data-p-carousel-item-start",n===0)("data-p-carousel-item-end",i.clonedItemsForStarting&&i.clonedItemsForStarting.length-1===n),c(),r("ngTemplateOutlet",i.itemTemplate||i._itemTemplate)("ngTemplateOutletContext",F(13,Ge,e))}}function qt(t,o){t&1&&Q(0)}function Kt(t,o){if(t&1&&(m(0,"div",21),p(1,qt,1,0,"ng-container",20),u()),t&2){let e=o.$implicit,n=o.index,i=s();d(i.cx("item",F(11,Ve,n))),r("pBind",i.getItemPTOptions("item",n)),y("aria-hidden",!(i.firstIndex()<=n&&i.lastIndex()>=n))("aria-label",i.ariaSlideNumber(n))("aria-roledescription",i.ariaSlideLabel())("data-p-carousel-item-active",i.firstIndex()<=n&&i.lastIndex()>=n)("data-p-carousel-item-start",i.firstIndex()===n)("data-p-carousel-item-end",i.lastIndex()===n),c(),r("ngTemplateOutlet",i.itemTemplate||i._itemTemplate)("ngTemplateOutletContext",F(13,Ge,e))}}function Ut(t,o){t&1&&Q(0)}function Zt(t,o){if(t&1&&(m(0,"div",5),p(1,Ut,1,0,"ng-container",20),u()),t&2){let e=o.$implicit,n=o.index,i=s();d(i.cx("itemClone",F(8,Ve,n))),r("pBind",i.ptm("itemClone")),y("data-p-carousel-item-active",!1)("data-p-carousel-item-start",!1)("data-p-carousel-item-end",!1),c(),r("ngTemplateOutlet",i.itemTemplate||i._itemTemplate)("ngTemplateOutletContext",F(10,Ge,e))}}function Wt(t,o){t&1&&(k(),_(0,"svg",25))}function Xt(t,o){t&1&&(k(),_(0,"svg",26))}function Yt(t,o){if(t&1&&(N(0),p(1,Wt,1,0,"svg",23)(2,Xt,1,0,"svg",24),L()),t&2){let e=s(3);c(),r("ngIf",!e.isVertical()),c(),r("ngIf",e.isVertical())}}function Jt(t,o){}function ei(t,o){t&1&&p(0,Jt,0,0,"ng-template")}function ti(t,o){if(t&1&&(m(0,"span"),p(1,ei,1,0,null,13),u()),t&2){let e=s(3);c(),r("ngTemplateOutlet",e.nextIconTemplate||e._nextIconTemplate)}}function ii(t,o){if(t&1&&p(0,Yt,3,2,"ng-container",15)(1,ti,2,1,"span",15),t&2){let e=s(2);r("ngIf",!e.nextIconTemplate&&!e._nextIconTemplate&&!(e.nextButtonProps!=null&&e.nextButtonProps.icon)),c(),r("ngIf",e.nextIconTemplate||e._nextIconTemplate&&!(e.nextButtonProps!=null&&e.nextButtonProps.icon))}}function ni(t,o){if(t&1){let e=w();m(0,"p-button",22),I("click",function(i){h(e);let a=s();return g(a.navForward(i))}),p(1,ii,2,2,"ng-template",null,1,D),u()}if(t&2){let e=s();d(e.cx("pcNextButton")),r("buttonProps",e.nextButtonProps)("text",!0)("pt",e.ptm("pcNextButton"))("unstyled",e.unstyled()),y("aria-label",e.ariaNextButtonLabel())}}function ai(t,o){if(t&1){let e=w();m(0,"li",5)(1,"button",28),I("click",function(i){let a=h(e).index,l=s(2);return g(l.onDotClick(i,a))}),u()()}if(t&2){let e=o.index,n=s(2);d(n.cx("indicator",F(11,Ve,e))),r("pBind",n.getIndicatorPTOptions("indicator",e)),y("data-p-active",n._page===e),c(),d(n.cx("indicatorButton")),r("ngStyle",n.indicatorStyle)("tabindex",n._page===e?0:-1)("pBind",n.getIndicatorPTOptions("indicatorButton",e)),y("aria-label",n.ariaPageLabel(e+1))("aria-current",n._page===e?"page":void 0)}}function oi(t,o){if(t&1){let e=w();m(0,"ul",27,2),I("keydown",function(i){h(e);let a=s();return g(a.onIndicatorKeydown(i))}),p(2,ai,2,13,"li",9),u()}if(t&2){let e=s();d(e.cx("indicatorList")),r("ngStyle",e.indicatorsContentStyle)("pBind",e.ptm("indicatorList")),c(2),r("ngForOf",e.totalDotsArray())}}function ri(t,o){t&1&&Q(0)}function li(t,o){if(t&1&&(m(0,"div",5),Ae(1,1),p(2,ri,1,0,"ng-container",13),u()),t&2){let e=s();d(e.cx("footer")),r("pBind",e.ptm("footer")),c(2),r("ngTemplateOutlet",e.footerTemplate||e._footerTemplate)}}var si={root:({instance:t})=>["p-carousel p-component",{"p-carousel-vertical":t.isVertical(),"p-carousel-horizontal":!t.isVertical()}],header:"p-carousel-header",contentContainer:"p-carousel-content-container",content:"p-carousel-content",pcPrevButton:({instance:t})=>["p-carousel-prev-button",{"p-disabled":t.isBackwardNavDisabled()}],viewport:"p-carousel-viewport",itemList:"p-carousel-item-list",itemClone:({instance:t,index:o})=>["p-carousel-item p-carousel-item-clone",{"p-carousel-item-active":t.totalShiftedItems*-1===t.value.length,"p-carousel-item-start":o===0,"p-carousel-item-end":t.clonedItemsForStarting.length-1===o}],item:({instance:t,index:o})=>["p-carousel-item",{"p-carousel-item-active":t.firstIndex()<=o&&t.lastIndex()>=o,"p-carousel-item-start":t.firstIndex()===o,"p-carousel-item-end":t.lastIndex()===o}],pcNextButton:({instance:t})=>["p-carousel-next-button",{"p-disabled":t.isForwardNavDisabled()}],indicatorList:({instance:t})=>["p-carousel-indicator-list",t.indicatorsContentClass],indicator:({instance:t,index:o})=>["p-carousel-indicator",{"p-carousel-indicator-active":t._page===o}],indicatorButton:({instance:t})=>["p-carousel-indicator-button",t.indicatorStyleClass],footer:"p-carousel-footer"},ut=(()=>{class t extends oe{name="carousel";style=mt;classes=si;static \u0275fac=(()=>{let e;return function(i){return(e||(e=$(t)))(i||t)}})();static \u0275prov=H({token:t,factory:t.\u0275fac})}return t})();var Re=(()=>{class t extends G{el;zone;componentName="Carousel";bindDirectiveInstance=T(x,{self:!0});onAfterViewChecked(){this.bindDirectiveInstance.setAttrs(this.ptm("root"))}get page(){return this._page}set page(e){this.isCreated&&e!==this._page&&(this.autoplayInterval&&this.stopAutoplay(),e>this._page&&e<=this.totalDots()-1?this.step(-1,e):e<this._page&&this.step(1,e)),this._page=e}get numVisible(){return this._numVisible}set numVisible(e){this._numVisible=e}get numScroll(){return this._numVisible}set numScroll(e){this._numScroll=e}responsiveOptions;orientation="horizontal";verticalViewPortHeight="300px";contentClass="";indicatorsContentClass="";indicatorsContentStyle;indicatorStyleClass="";indicatorStyle;get value(){return this._value}set value(e){this._value=e}circular=!1;showIndicators=!0;showNavigators=!0;autoplayInterval=0;styleClass;prevButtonProps={severity:"secondary",text:!0,rounded:!0};nextButtonProps={severity:"secondary",text:!0,rounded:!0};onPage=new V;itemsContainer;indicatorContent;headerFacet;footerFacet;_numVisible=1;_numScroll=1;_oldNumScroll=0;prevState={numScroll:0,numVisible:0,value:[]};defaultNumScroll=1;defaultNumVisible=1;_page=0;_value;carouselStyle;id;totalShiftedItems;isRemainingItemsAdded=!1;animationTimeout;translateTimeout;remainingItems=0;_items;startPos;documentResizeListener;clonedItemsForStarting;clonedItemsForFinishing;allowAutoplay;interval;isCreated;swipeThreshold=20;itemTemplate;headerTemplate;footerTemplate;previousIconTemplate;nextIconTemplate;_itemTemplate;_headerTemplate;_footerTemplate;_previousIconTemplate;_nextIconTemplate;window;_componentStyle=T(ut);constructor(e,n){super(),this.el=e,this.zone=n,this.totalShiftedItems=this.page*this.numScroll*-1,this.window=this.document.defaultView}onChanges(e){C(this.platformId)&&(e.value&&this.circular&&this._value&&this.setCloneItems(),this.isCreated&&(e.numVisible&&(this.responsiveOptions&&(this.defaultNumVisible=this.numVisible),this.isCircular()&&this.setCloneItems(),this.createStyle(),this.calculatePosition()),e.numScroll&&this.responsiveOptions&&(this.defaultNumScroll=this.numScroll))),this.cd.markForCheck()}templates;onAfterContentInit(){this.id=Te("pn_id_"),C(this.platformId)&&(this.allowAutoplay=!!this.autoplayInterval,this.circular&&this.setCloneItems(),this.responsiveOptions&&(this.defaultNumScroll=this._numScroll,this.defaultNumVisible=this._numVisible),this.createStyle(),this.calculatePosition(),this.responsiveOptions&&this.bindDocumentListeners()),this.templates?.forEach(e=>{switch(e.getType()){case"item":this._itemTemplate=e.template;break;case"header":this._headerTemplate=e.template;break;case"footer":this._footerTemplate=e.template;break;case"previousicon":this._previousIconTemplate=e.template;break;case"nexticon":this._nextIconTemplate=e.template;break;default:this._itemTemplate=e.template;break}}),this.cd.detectChanges()}onAfterContentChecked(){if(C(this.platformId)){let e=this.isCircular(),n=this.totalShiftedItems;if(this.value&&this.itemsContainer&&(this.prevState.numScroll!==this._numScroll||this.prevState.numVisible!==this._numVisible||this.prevState.value.length!==this.value.length)){this.autoplayInterval&&this.stopAutoplay(!1),this.remainingItems=(this.value.length-this._numVisible)%this._numScroll;let i=this._page;this.totalDots()!==0&&i>=this.totalDots()&&(i=this.totalDots()-1,this._page=i,this.onPage.emit({page:this.page})),n=i*this._numScroll*-1,e&&(n-=this._numVisible),i===this.totalDots()-1&&this.remainingItems>0?(n+=-1*this.remainingItems+this._numScroll,this.isRemainingItemsAdded=!0):this.isRemainingItemsAdded=!1,n!==this.totalShiftedItems&&(this.totalShiftedItems=n),this._oldNumScroll=this._numScroll,this.prevState.numScroll=this._numScroll,this.prevState.numVisible=this._numVisible,this.prevState.value=[...this._value],this.totalDots()>0&&this.itemsContainer.nativeElement&&(this.itemsContainer.nativeElement.style.transform=this.isVertical()?`translate3d(0, ${n*(100/this._numVisible)}%, 0)`:`translate3d(${n*(100/this._numVisible)}%, 0, 0)`),this.isCreated=!0,this.autoplayInterval&&this.isAutoplay()&&this.startAutoplay()}e&&(this.page===0?n=-1*this._numVisible:n===0&&(n=-1*this.value.length,this.remainingItems>0&&(this.isRemainingItemsAdded=!0)),n!==this.totalShiftedItems&&(this.totalShiftedItems=n))}}createStyle(){this.carouselStyle||(this.carouselStyle=this.renderer.createElement("style"),this.carouselStyle.type="text/css",ne(this.carouselStyle,"nonce",this.config?.csp()?.nonce),this.renderer.appendChild(this.document.head,this.carouselStyle),ne(this.carouselStyle,"nonce",this.config?.csp()?.nonce));let e=`
            #${this.id} .p-carousel-item {
				flex: 1 0 ${100/this.numVisible}%
			}
        `;if(this.responsiveOptions&&!this.$unstyled()){this.responsiveOptions.sort((n,i)=>{let a=n.breakpoint,l=i.breakpoint,S=null;return a==null&&l!=null?S=-1:a!=null&&l==null?S=1:a==null&&l==null?S=0:typeof a=="string"&&typeof l=="string"?S=a.localeCompare(l,void 0,{numeric:!0}):S=a<l?-1:a>l?1:0,-1*S});for(let n=0;n<this.responsiveOptions.length;n++){let i=this.responsiveOptions[n];e+=`
                    @media screen and (max-width: ${i.breakpoint}) {
                        #${this.id} .p-carousel-item {
                            flex: 1 0 ${100/i.numVisible}%
                        }
                    }
                `}}this.carouselStyle.innerHTML=e}calculatePosition(){if(this.responsiveOptions){let e={numVisible:this.defaultNumVisible,numScroll:this.defaultNumScroll};if(typeof window<"u"){let n=window.innerWidth;for(let i=0;i<this.responsiveOptions.length;i++){let a=this.responsiveOptions[i];parseInt(a.breakpoint,10)>=n&&(e=a)}}if(this._numScroll!==e.numScroll){let n=this._page;n=Math.floor(n*this._numScroll/e.numScroll);let i=e.numScroll*this.page*-1;this.isCircular()&&(i-=e.numVisible),this.totalShiftedItems=i,this._numScroll=e.numScroll,this._page=n,this.onPage.emit({page:this.page})}this._numVisible!==e.numVisible&&(this._numVisible=e.numVisible,this.setCloneItems()),this.cd.markForCheck()}}setCloneItems(){this.clonedItemsForStarting=[],this.clonedItemsForFinishing=[],this.isCircular()&&(this.clonedItemsForStarting.push(...this.value.slice(-1*this._numVisible)),this.clonedItemsForFinishing.push(...this.value.slice(0,this._numVisible)))}firstIndex(){return this.isCircular()?-1*(this.totalShiftedItems+this.numVisible):this.totalShiftedItems*-1}lastIndex(){return this.firstIndex()+this.numVisible-1}totalDots(){return this.value?.length?Math.ceil((this.value.length-this._numVisible)/this._numScroll)+1:0}totalDotsArray(){let e=this.totalDots();return e<=0?[]:Array(e).fill(0)}isVertical(){return this.orientation==="vertical"}isCircular(){return this.circular&&this.value&&this.value.length>=this.numVisible}isAutoplay(){return this.autoplayInterval&&this.allowAutoplay}isForwardNavDisabled(){return this.isEmpty()||this._page>=this.totalDots()-1&&!this.isCircular()}isBackwardNavDisabled(){return this.isEmpty()||this._page<=0&&!this.isCircular()}isEmpty(){return!this.value||this.value.length===0}navForward(e,n){(this.isCircular()||this._page<this.totalDots()-1)&&this.step(-1,n),this.autoplayInterval&&this.stopAutoplay(),e&&e.cancelable&&e.preventDefault()}navBackward(e,n){(this.isCircular()||this._page!==0)&&this.step(1,n),this.autoplayInterval&&this.stopAutoplay(),e&&e.cancelable&&e.preventDefault()}onDotClick(e,n){let i=this._page;this.autoplayInterval&&this.stopAutoplay(),n>i?this.navForward(e,n):n<i&&this.navBackward(e,n)}onIndicatorKeydown(e){switch(e.code){case"ArrowRight":this.onRightKey();break;case"ArrowLeft":this.onLeftKey();break}}onRightKey(){let e=[...O(this.indicatorContent?.nativeElement,'[data-pc-section="indicator"]')],n=this.findFocusedIndicatorIndex();this.changedFocusedIndicator(n,n+1===e.length?e.length-1:n+1)}onLeftKey(){let e=this.findFocusedIndicatorIndex();this.changedFocusedIndicator(e,e-1<=0?0:e-1)}onHomeKey(){let e=this.findFocusedIndicatorIndex();this.changedFocusedIndicator(e,0)}onEndKey(){let e=[...O(this.indicatorContent?.nativeElement,'[data-pc-section="indicator"]')],n=this.findFocusedIndicatorIndex();this.changedFocusedIndicator(n,e.length-1)}onTabKey(){let e=[...O(this.indicatorContent?.nativeElement,'[data-pc-section="indicator"]')],n=e.findIndex(l=>ye(l,"data-p-highlight")===!0),i=X(this.indicatorContent?.nativeElement,'[data-pc-section="indicator"] > button[tabindex="0"]'),a=e.findIndex(l=>l===i.parentElement);e[a].children[0].tabIndex="-1",e[n].children[0].tabIndex="0"}findFocusedIndicatorIndex(){let e=[...O(this.indicatorContent?.nativeElement,'[data-pc-section="indicator"]')],n=X(this.indicatorContent?.nativeElement,'[data-pc-section="indicator"] > button[tabindex="0"]');return e.findIndex(i=>i===n?.parentElement)}changedFocusedIndicator(e,n){let i=[...O(this.indicatorContent?.nativeElement,'[data-pc-section="indicator"]')];i[e].children[0].tabIndex="-1",i[n].children[0].tabIndex="0",i[n].children[0].focus()}step(e,n){let i=this.totalShiftedItems,a=this.isCircular();if(n!=null)i=this._numScroll*n*-1,a&&(i-=this._numVisible),this.isRemainingItemsAdded=!1;else{i+=this._numScroll*e,this.isRemainingItemsAdded&&(i+=this.remainingItems-this._numScroll*e,this.isRemainingItemsAdded=!1);let l=a?i+this._numVisible:i;n=Math.abs(Math.floor(l/this._numScroll))}a&&this.page===this.totalDots()-1&&e===-1?(i=-1*(this.value.length+this._numVisible),n=0):a&&this.page===0&&e===1?(i=0,n=this.totalDots()-1):n===this.totalDots()-1&&this.remainingItems>0&&(i+=this.remainingItems*-1-this._numScroll*e,this.isRemainingItemsAdded=!0),this.itemsContainer&&(!this.$unstyled()&&ie(this.itemsContainer.nativeElement,"p-items-hidden"),this.itemsContainer.nativeElement.style.transform=this.isVertical()?`translate3d(0, ${i*(100/this._numVisible)}%, 0)`:`translate3d(${i*(100/this._numVisible)}%, 0, 0)`,this.itemsContainer.nativeElement.style.transition="transform 500ms ease 0s"),this.totalShiftedItems=i,this._page=n,this.onPage.emit({page:this.page}),this.cd.markForCheck()}startAutoplay(){this.interval=setInterval(()=>{this.totalDots()>0&&(this.page===this.totalDots()-1?this.step(-1,0):this.step(-1,this.page+1))},this.autoplayInterval),this.allowAutoplay=!0,this.cd.markForCheck()}stopAutoplay(e=!0){this.interval&&(clearInterval(this.interval),this.interval=void 0,e&&(this.allowAutoplay=!1)),this.cd.markForCheck()}isPlaying(){return!!this.interval}onTransitionEnd(){this.itemsContainer&&(!this.$unstyled()&&xe(this.itemsContainer.nativeElement,"p-items-hidden"),this.itemsContainer.nativeElement.style.transition="",(this.page===0||this.page===this.totalDots()-1)&&this.isCircular()&&(this.itemsContainer.nativeElement.style.transform=this.isVertical()?`translate3d(0, ${this.totalShiftedItems*(100/this._numVisible)}%, 0)`:`translate3d(${this.totalShiftedItems*(100/this._numVisible)}%, 0, 0)`))}onTouchStart(e){let n=e.changedTouches[0];this.startPos={x:n.pageX,y:n.pageY}}onTouchMove(e){e.cancelable&&e.preventDefault()}onTouchEnd(e){let n=e.changedTouches[0];this.isVertical()?this.changePageOnTouch(e,n.pageY-this.startPos.y):this.changePageOnTouch(e,n.pageX-this.startPos.x)}changePageOnTouch(e,n){Math.abs(n)>this.swipeThreshold&&(n<0?this.navForward(e):this.navBackward(e))}ariaPrevButtonLabel(){return this.config.translation.aria?this.config.translation.aria?.prevPageLabel:void 0}ariaSlideLabel(){return this.config.translation.aria?this.config.translation.aria?.slide:void 0}ariaNextButtonLabel(){return this.config.translation.aria?this.config.translation.aria?.nextPageLabel:void 0}ariaSlideNumber(e){return this.config.translation.aria?this.config.translation.aria?.slideNumber?.replace(/{slideNumber}/g,e):void 0}ariaPageLabel(e){return this.config.translation.aria?this.config.translation.aria?.pageLabel?.replace(/{page}/g,e):void 0}getIndicatorPTOptions(e,n){return this.ptm(e,{context:{highlighted:n===this._page}})}getItemPTOptions(e,n){return this.ptm(e,{context:{index:n,active:this.firstIndex()<=n&&this.lastIndex()>=n,start:this.firstIndex()===n,end:this.lastIndex()===n}})}bindDocumentListeners(){C(this.platformId)&&(this.documentResizeListener||(this.documentResizeListener=this.renderer.listen(this.window,"resize",e=>{this.calculatePosition()})))}unbindDocumentListeners(){C(this.platformId)&&this.documentResizeListener&&(this.documentResizeListener(),this.documentResizeListener=null)}onDestroy(){this.responsiveOptions&&this.unbindDocumentListeners(),this.autoplayInterval&&this.stopAutoplay()}static \u0275fac=function(n){return new(n||t)(B(_e),B(He))};static \u0275cmp=M({type:t,selectors:[["p-carousel"]],contentQueries:function(n,i,a){if(n&1&&ee(a,et,5)(a,tt,5)(a,wt,4)(a,Ct,4)(a,St,4)(a,kt,4)(a,Vt,4)(a,ae,4),n&2){let l;f(l=v())&&(i.headerFacet=l.first),f(l=v())&&(i.footerFacet=l.first),f(l=v())&&(i.itemTemplate=l.first),f(l=v())&&(i.headerTemplate=l.first),f(l=v())&&(i.footerTemplate=l.first),f(l=v())&&(i.previousIconTemplate=l.first),f(l=v())&&(i.nextIconTemplate=l.first),f(l=v())&&(i.templates=l)}},viewQuery:function(n,i){if(n&1&&te(Bt,5)(Mt,5),n&2){let a;f(a=v())&&(i.itemsContainer=a.first),f(a=v())&&(i.indicatorContent=a.first)}},hostVars:4,hostBindings:function(n,i){n&2&&(y("id",i.id)("role","region"),d(i.cn(i.cx("root"),i.styleClass)))},inputs:{page:"page",numVisible:"numVisible",numScroll:"numScroll",responsiveOptions:"responsiveOptions",orientation:"orientation",verticalViewPortHeight:"verticalViewPortHeight",contentClass:"contentClass",indicatorsContentClass:"indicatorsContentClass",indicatorsContentStyle:"indicatorsContentStyle",indicatorStyleClass:"indicatorStyleClass",indicatorStyle:"indicatorStyle",value:"value",circular:[2,"circular","circular",b],showIndicators:[2,"showIndicators","showIndicators",b],showNavigators:[2,"showNavigators","showNavigators",b],autoplayInterval:[2,"autoplayInterval","autoplayInterval",q],styleClass:"styleClass",prevButtonProps:"prevButtonProps",nextButtonProps:"nextButtonProps"},outputs:{onPage:"onPage"},features:[A([ut,{provide:re,useExisting:t}]),R([x]),E],ngContentSelectors:Ot,decls:13,vars:25,consts:[["itemsContainer",""],["icon",""],["indicatorContent",""],[3,"class","pBind",4,"ngIf"],[3,"ngClass","pBind"],[3,"pBind"],["attr.data-pc-group-section","navigator",3,"class","text","buttonProps","pt","unstyled","click",4,"ngIf"],[3,"touchend","touchstart","touchmove","ngStyle","pBind"],[3,"transitionend","pBind"],[3,"class","pBind",4,"ngFor","ngForOf"],["role","group",3,"class","pBind",4,"ngFor","ngForOf"],["type","button","attr.data-pc-group-section","navigator",3,"class","buttonProps","text","pt","unstyled","click",4,"ngIf"],[3,"class","ngStyle","pBind","keydown",4,"ngIf"],[4,"ngTemplateOutlet"],["attr.data-pc-group-section","navigator",3,"click","text","buttonProps","pt","unstyled"],[4,"ngIf"],["data-p-icon","chevron-left",4,"ngIf"],["data-p-icon","chevron-up",4,"ngIf"],["data-p-icon","chevron-left"],["data-p-icon","chevron-up"],[4,"ngTemplateOutlet","ngTemplateOutletContext"],["role","group",3,"pBind"],["type","button","attr.data-pc-group-section","navigator",3,"click","buttonProps","text","pt","unstyled"],["data-p-icon","chevron-right",4,"ngIf"],["data-p-icon","chevron-down",4,"ngIf"],["data-p-icon","chevron-right"],["data-p-icon","chevron-down"],[3,"keydown","ngStyle","pBind"],["type","button",3,"click","ngStyle","tabindex","pBind"]],template:function(n,i){n&1&&(Qe(Ft),p(0,Pt,3,4,"div",3),m(1,"div",4)(2,"div",5),p(3,Ht,3,7,"p-button",6),m(4,"div",7),I("touchend",function(l){return i.onTouchEnd(l)})("touchstart",function(l){return i.onTouchStart(l)})("touchmove",function(l){return i.onTouchMove(l)}),m(5,"div",8,0),I("transitionend",function(){return i.onTransitionEnd()}),p(7,Qt,2,15,"div",9)(8,Kt,2,15,"div",10)(9,Zt,2,12,"div",9),u()(),p(10,ni,3,7,"p-button",11),u(),p(11,oi,3,5,"ul",12),u(),p(12,li,3,4,"div",3)),n&2&&(r("ngIf",i.headerFacet||i.headerTemplate),c(),d(i.contentClass),r("ngClass",i.cx("contentContainer"))("pBind",i.ptm("contentContainer")),c(),d(i.cx("content")),r("pBind",i.ptm("content")),y("aria-live",i.allowAutoplay?"polite":"off"),c(),r("ngIf",i.showNavigators),c(),d(i.cx("viewport")),r("ngStyle",F(23,At,i.isVertical()?i.verticalViewPortHeight:"auto"))("pBind",i.ptm("viewport")),c(),d(i.cx("itemList")),r("pBind",i.ptm("itemList")),c(2),r("ngForOf",i.clonedItemsForStarting),c(),r("ngForOf",i.value),c(),r("ngForOf",i.clonedItemsForFinishing),c(),r("ngIf",i.showNavigators),c(),r("ngIf",i.showIndicators),c(),r("ngIf",i.footerFacet||i.footerTemplate||i._footerTemplate))},dependencies:[z,Ie,he,K,j,W,ce,Ce,we,se,ge,fe,P,le,x],encapsulation:2,changeDetection:0})}return t})(),gt=(()=>{class t{static \u0275fac=function(n){return new(n||t)};static \u0275mod=J({type:t});static \u0275inj=Y({imports:[Re,P,P]})}return t})();var ft=`
    .p-galleria {
        overflow: hidden;
        border-style: solid;
        border-width: dt('galleria.border.width');
        border-color: dt('galleria.border.color');
        border-radius: dt('galleria.border.radius');
    }

    .p-galleria-content {
        display: flex;
        flex-direction: column;
    }

    .p-galleria-items-container {
        display: flex;
        flex-direction: column;
        position: relative;
    }

    .p-galleria-items {
        position: relative;
        display: flex;
        height: 100%;
    }

    .p-galleria-nav-button {
        position: absolute !important;
        top: 50%;
        display: inline-flex;
        justify-content: center;
        align-items: center;
        overflow: hidden;
        background: dt('galleria.nav.button.background');
        color: dt('galleria.nav.button.color');
        width: dt('galleria.nav.button.size');
        height: dt('galleria.nav.button.size');
        transition:
            background dt('galleria.transition.duration'),
            color dt('galleria.transition.duration'),
            outline-color dt('galleria.transition.duration'),
            box-shadow dt('galleria.transition.duration');
        margin: calc(-1 * calc(dt('galleria.nav.button.size')) / 2) dt('galleria.nav.button.gutter') 0 dt('galleria.nav.button.gutter');
        padding: 0;
        user-select: none;
        border: 0 none;
        cursor: pointer;
        outline-color: transparent;
    }

    .p-galleria-nav-button:not(.p-disabled):hover {
        background: dt('galleria.nav.button.hover.background');
        color: dt('galleria.nav.button.hover.color');
    }

    .p-galleria-nav-button:not(.p-disabled):focus-visible {
        box-shadow: dt('galleria.nav.button.focus.ring.shadow');
        outline: dt('galleria.nav.button.focus.ring.width') dt('galleria.nav.button.focus.ring.style') dt('galleria.nav.button.focus.ring.color');
        outline-offset: dt('galleria.nav.button.focus.ring.offset');
    }

    .p-galleria-next-icon,
    .p-galleria-prev-icon {
        font-size: dt('galleria.nav.icon.size');
        width: dt('galleria.nav.icon.size');
        height: dt('galleria.nav.icon.size');
    }

    .p-galleria-prev-button {
        border-radius: dt('galleria.nav.button.prev.border.radius');
        left: 0;
    }

    .p-galleria-next-button {
        border-radius: dt('galleria.nav.button.next.border.radius');
        right: 0;
    }

    .p-galleria-prev-button:dir(rtl) {
        left: auto;
        right: 0;
        transform: rotate(180deg);
    }

    .p-galleria-next-button:dir(rtl) {
        right: auto;
        left: 0;
        transform: rotate(180deg);
    }

    .p-galleria-item {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
        width: 100%;
    }

    .p-galleria-hover-navigators .p-galleria-nav-button {
        pointer-events: none;
        opacity: 0;
        transition: opacity dt('galleria.transition.duration') ease-in-out;
    }

    .p-galleria-hover-navigators .p-galleria-items-container:hover .p-galleria-nav-button {
        pointer-events: all;
        opacity: 1;
    }

    .p-galleria-hover-navigators .p-galleria-items-container:hover .p-galleria-nav-button.p-disabled {
        pointer-events: none;
    }

    .p-galleria-caption {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        background: dt('galleria.caption.background');
        color: dt('galleria.caption.color');
        padding: dt('galleria.caption.padding');
    }

    .p-galleria-thumbnails {
        display: flex;
        flex-direction: column;
        overflow: auto;
        flex-shrink: 0;
    }

    .p-galleria-thumbnail-nav-button {
        align-self: center;
        flex: 0 0 auto;
        display: flex;
        justify-content: center;
        align-items: center;
        overflow: hidden;
        position: relative;
        margin: 0 dt('galleria.thumbnail.nav.button.gutter');
        padding: 0;
        border: none;
        user-select: none;
        cursor: pointer;
        background: transparent;
        color: dt('galleria.thumbnail.nav.button.color');
        width: dt('galleria.thumbnail.nav.button.size');
        height: dt('galleria.thumbnail.nav.button.size');
        transition:
            background dt('galleria.transition.duration'),
            color dt('galleria.transition.duration'),
            outline-color dt('galleria.transition.duration');
        outline-color: transparent;
        border-radius: dt('galleria.thumbnail.nav.button.border.radius');
    }

    .p-galleria-thumbnail-nav-button:hover {
        background: dt('galleria.thumbnail.nav.button.hover.background');
        color: dt('galleria.thumbnail.nav.button.hover.color');
    }

    .p-galleria-thumbnail-nav-button:focus-visible {
        box-shadow: dt('galleria.thumbnail.nav.button.focus.ring.shadow');
        outline: dt('galleria.thumbnail.nav.button.focus.ring.width') dt('galleria.thumbnail.nav.button.focus.ring.style') dt('galleria.thumbnail.nav.button.focus.ring.color');
        outline-offset: dt('galleria.thumbnail.nav.button.focus.ring.offset');
    }

    .p-galleria-thumbnail-nav-button .p-galleria-thumbnail-next-icon,
    .p-galleria-thumbnail-nav-button .p-galleria-thumbnail-prev-icon {
        font-size: dt('galleria.thumbnail.nav.button.icon.size');
        width: dt('galleria.thumbnail.nav.button.icon.size');
        height: dt('galleria.thumbnail.nav.button.icon.size');
    }

    .p-galleria-thumbnails-content {
        display: flex;
        flex-direction: row;
        background: dt('galleria.thumbnails.content.background');
        padding: dt('galleria.thumbnails.content.padding');
    }

    .p-galleria-thumbnails-viewport {
        overflow: hidden;
        width: 100%;
    }

    .p-galleria:not(.p-galleria-thumbnails-right):not(.p-galleria-thumbnails-left) .p-galleria-thumbnail-prev-button:dir(rtl),
    .p-galleria:not(.p-galleria-thumbnails-right):not(.p-galleria-thumbnails-left) .p-galleria-thumbnail-next-button:dir(rtl) {
        transform: rotate(180deg);
    }

    .p-galleria-thumbnail-items {
        display: flex;
    }

    .p-galleria-thumbnail-items:dir(rtl) {
        flex-direction: row-reverse;
    }

    .p-galleria-thumbnail-item {
        overflow: auto;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        opacity: 0.5;
    }

    .p-galleria-thumbnail {
        outline-color: transparent;
    }

    .p-galleria-thumbnail-item:hover {
        opacity: 1;
        transition: opacity 0.3s;
    }

    .p-galleria-thumbnail-item-current {
        opacity: 1;
    }

    .p-galleria-thumbnails-left .p-galleria-content,
    .p-galleria-thumbnails-right .p-galleria-content {
        flex-direction: row;
    }

    .p-galleria-thumbnails-left .p-galleria-items-container,
    .p-galleria-thumbnails-right .p-galleria-items-container {
        flex-direction: row;
    }

    .p-galleria-thumbnails-left .p-galleria-items-container,
    .p-galleria-thumbnails-top .p-galleria-items-container {
        order: 2;
    }

    .p-galleria-thumbnails-left .p-galleria-thumbnails,
    .p-galleria-thumbnails-top .p-galleria-thumbnails {
        order: 1;
    }

    .p-galleria-thumbnails-left .p-galleria-thumbnails-content,
    .p-galleria-thumbnails-right .p-galleria-thumbnails-content {
        flex-direction: column;
        flex-grow: 1;
    }

    .p-galleria-thumbnails-left .p-galleria-thumbnail-items,
    .p-galleria-thumbnails-right .p-galleria-thumbnail-items {
        flex-direction: column;
        height: 100%;
    }

    .p-galleria-indicator-list {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: dt('galleria.indicator.list.padding');
        gap: dt('galleria.indicator.list.gap');
        margin: 0;
        list-style: none;
    }

    .p-galleria-indicator-button {
        display: inline-flex;
        align-items: center;
        background: dt('galleria.indicator.button.background');
        width: dt('galleria.indicator.button.width');
        height: dt('galleria.indicator.button.height');
        transition:
            background dt('galleria.transition.duration'),
            color dt('galleria.transition.duration'),
            outline-color dt('galleria.transition.duration'),
            box-shadow dt('galleria.transition.duration');
        outline-color: transparent;
        border-radius: dt('galleria.indicator.button.border.radius');
        margin: 0;
        padding: 0;
        border: none;
        user-select: none;
        cursor: pointer;
    }

    .p-galleria-indicator-button:hover {
        background: dt('galleria.indicator.button.hover.background');
    }

    .p-galleria-indicator-button:focus-visible {
        box-shadow: dt('galleria.indicator.button.focus.ring.shadow');
        outline: dt('galleria.indicator.button.focus.ring.width') dt('galleria.indicator.button.focus.ring.style') dt('galleria.indicator.button.focus.ring.color');
        outline-offset: dt('galleria.indicator.button.focus.ring.offset');
    }

    .p-galleria-indicator-active .p-galleria-indicator-button {
        background: dt('galleria.indicator.button.active.background');
    }

    .p-galleria-indicators-left .p-galleria-items-container,
    .p-galleria-indicators-right .p-galleria-items-container {
        flex-direction: row;
        align-items: center;
    }

    .p-galleria-indicators-left .p-galleria-items,
    .p-galleria-indicators-top .p-galleria-items {
        order: 2;
    }

    .p-galleria-indicators-left .p-galleria-indicator-list,
    .p-galleria-indicators-top .p-galleria-indicator-list {
        order: 1;
    }

    .p-galleria-indicators-left .p-galleria-indicator-list,
    .p-galleria-indicators-right .p-galleria-indicator-list {
        flex-direction: column;
    }

    .p-galleria-inset-indicators .p-galleria-indicator-list {
        position: absolute;
        display: flex;
        z-index: 1;
        background: dt('galleria.inset.indicator.list.background');
    }

    .p-galleria-inset-indicators .p-galleria-indicator-button {
        background: dt('galleria.inset.indicator.button.background');
    }

    .p-galleria-inset-indicators .p-galleria-indicator-button:hover {
        background: dt('galleria.inset.indicator.button.hover.background');
    }

    .p-galleria-inset-indicators .p-galleria-indicator-active .p-galleria-indicator-button {
        background: dt('galleria.inset.indicator.button.active.background');
    }

    .p-galleria-inset-indicators.p-galleria-indicators-top .p-galleria-indicator-list {
        top: 0;
        left: 0;
        width: 100%;
        align-items: flex-start;
    }

    .p-galleria-inset-indicators.p-galleria-indicators-right .p-galleria-indicator-list {
        right: 0;
        top: 0;
        height: 100%;
        align-items: flex-end;
    }

    .p-galleria-inset-indicators.p-galleria-indicators-bottom .p-galleria-indicator-list {
        bottom: 0;
        left: 0;
        width: 100%;
        align-items: flex-end;
    }

    .p-galleria-inset-indicators.p-galleria-indicators-left .p-galleria-indicator-list {
        left: 0;
        top: 0;
        height: 100%;
        align-items: flex-start;
    }

    .p-galleria-mask {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .p-galleria-close-button {
        position: absolute !important;
        top: 0;
        right: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        overflow: hidden;
        margin: dt('galleria.close.button.gutter');
        background: dt('galleria.close.button.background');
        color: dt('galleria.close.button.color');
        width: dt('galleria.close.button.size');
        height: dt('galleria.close.button.size');
        padding: 0;
        border: none;
        user-select: none;
        cursor: pointer;
        border-radius: dt('galleria.close.button.border.radius');
        outline-color: transparent;
        transition:
            background dt('galleria.transition.duration'),
            color dt('galleria.transition.duration'),
            outline-color dt('galleria.transition.duration');
    }

    .p-galleria-close-icon {
        font-size: dt('galleria.close.button.icon.size');
        width: dt('galleria.close.button.icon.size');
        height: dt('galleria.close.button.icon.size');
    }

    .p-galleria-close-button:hover {
        background: dt('galleria.close.button.hover.background');
        color: dt('galleria.close.button.hover.color');
    }

    .p-galleria-close-button:focus-visible {
        box-shadow: dt('galleria.close.button.focus.ring.shadow');
        outline: dt('galleria.close.button.focus.ring.width') dt('galleria.close.button.focus.ring.style') dt('galleria.close.button.focus.ring.color');
        outline-offset: dt('galleria.close.button.focus.ring.offset');
    }

    .p-galleria-mask .p-galleria-nav-button {
        position: fixed;
        top: 50%;
    }

       .p-items-hidden .p-galleria-thumbnail-item {
        visibility: hidden;
    }

    .p-items-hidden .p-galleria-thumbnail-item.p-galleria-thumbnail-item-active {
        visibility: visible;
    }

    .p-galleria-enter-active {
        animation: p-animate-galleria-enter 300ms cubic-bezier(.19,1,.22,1);
    }

    .p-galleria-leave-active {
        animation: p-animate-galleria-leave 300ms cubic-bezier(.19,1,.22,1);
    }

    .p-galleria-enter-active .p-galleria-nav-button {
        opacity: 0;
    }

    @keyframes p-animate-galleria-enter {
        from {
            opacity: 0;
            transform: scale(0.93);
        }
    }

    @keyframes p-animate-galleria-leave {
        from {
            opacity: 1;
            transform: scale(1);
        }
        to {
            opacity: 0;
            transform: scale(0.93);
        }
    }
`;var pi=["header"],di=["footer"],mi=["indicator"],ui=["caption"],hi=["closeicon"],gi=["previousthumbnailicon"],fi=["nextthumbnailicon"],vi=["itempreviousicon"],_i=["itemnexticon"],bi=["item"],Ii=["thumbnail"],xi=["container"];function yi(t,o){if(t&1){let e=w();m(0,"div",6),I("pMotionOnBeforeEnter",function(i){h(e);let a=s(3);return g(a.onBeforeEnter(i))})("pMotionOnBeforeLeave",function(){h(e);let i=s(3);return g(i.onBeforeLeave())})("pMotionOnAfterLeave",function(){h(e);let i=s(3);return g(i.onAfterLeave())})("maskHide",function(){h(e);let i=s(3);return g(i.onMaskHide())})("activeItemChange",function(i){h(e);let a=s(3);return g(a.onActiveItemChange(i))}),u()}if(t&2){let e=s(3);r("pMotion",e.visible)("pMotionAppear",!0)("pMotionName","p-galleria")("pMotionOptions",e.computedMotionOptions())("value",e.value)("activeIndex",e.activeIndex)("numVisible",e.numVisibleLimit||e.numVisible)("ngStyle",e.containerStyle)("fullScreen",e.fullScreen)("pt",e.pt())("pFocusTrapDisabled",!e.fullScreen)("unstyled",e.unstyled())}}function Ti(t,o){if(t&1){let e=w();m(0,"div",4),I("pMotionOnAfterLeave",function(){h(e);let i=s(2);return g(i.onMaskAfterLeave())})("click",function(i){h(e);let a=s(2);return g(a.onMaskHide(i))}),Fe(1,yi,1,12,"div",5),u()}if(t&2){let e=s(2);d(e.maskClass),r("pBind",e.ptm("mask"))("pMotion",e.maskVisible)("pMotionAppear",!0)("pMotionEnterActiveClass",e.fullScreen?"p-overlay-mask-enter-active":"")("pMotionLeaveActiveClass",e.fullScreen?"p-overlay-mask-leave-active":"")("pMotionOptions",e.computedMaskMotionOptions())("ngClass",e.cx("mask")),y("role",e.fullScreen?"dialog":"region")("aria-modal",e.fullScreen?"true":void 0),c(),Oe(e.renderContent()?1:-1)}}function wi(t,o){if(t&1&&(m(0,"div",null,1),Fe(2,Ti,2,12,"div",3),u()),t&2){let e=s();c(2),Oe(e.renderMask()?2:-1)}}function Ci(t,o){if(t&1){let e=w();m(0,"div",7),I("activeItemChange",function(i){h(e);let a=s();return g(a.onActiveItemChange(i))}),u()}if(t&2){let e=s();r("pt",e.pt())("unstyled",e.unstyled())("value",e.value)("activeIndex",e.activeIndex)("numVisible",e.numVisibleLimit||e.numVisible)}}var Si=["closeButton"],ki=()=>({}),Vi=["pGalleriaContent",""];function Bi(t,o){if(t&1&&(k(),_(0,"svg",10)),t&2){let e=s(3);d(e.cx("closeIcon")),r("pBind",e.getPTOptions("closeIcon"))}}function Mi(t,o){}function Fi(t,o){t&1&&p(0,Mi,0,0,"ng-template")}function Oi(t,o){if(t&1){let e=w();m(0,"button",7),I("click",function(){h(e);let i=s(2);return g(i.maskHide.emit())}),p(1,Bi,1,3,"svg",8)(2,Fi,1,0,null,9),u()}if(t&2){let e=s(2);d(e.cx("closeButton")),r("pBind",e.getPTOptions("closeButton")),y("aria-label",e.closeAriaLabel()),c(),r("ngIf",!e.galleria.closeIconTemplate&&!e.galleria._closeIconTemplate),c(),r("ngTemplateOutlet",e.galleria.closeIconTemplate||e.galleria._closeIconTemplate)}}function Ai(t,o){if(t&1&&_(0,"div",11),t&2){let e=s(2);d(e.cx("header")),r("unstyled",e.unstyled())("templates",e.galleria.templates)("pBind",e.getPTOptions("header"))}}function Di(t,o){if(t&1){let e=w();m(0,"div",12),I("onActiveIndexChange",function(i){h(e);let a=s(2);return g(a.onActiveIndexChange(i))})("stopSlideShow",function(){h(e);let i=s(2);return g(i.stopSlideShow())}),u()}if(t&2){let e=s(2);r("containerId",e.id)("value",e.value)("activeIndex",e.activeIndex)("templates",e.galleria.templates)("numVisible",e.numVisible)("responsiveOptions",e.galleria.responsiveOptions)("circular",e.galleria.circular)("isVertical",e.isVertical())("contentHeight",e.galleria.verticalThumbnailViewPortHeight)("showThumbnailNavigators",e.galleria.showThumbnailNavigators)("slideShowActive",e.slideShowActive)("pt",e.pt())("unstyled",e.unstyled())}}function Pi(t,o){if(t&1&&_(0,"div",13),t&2){let e=s(2);d(e.cx("footer")),r("pBind",e.getPTOptions("footer"))("templates",e.galleria.templates)("unstyled",e.unstyled())}}function Ei(t,o){if(t&1){let e=w();N(0),p(1,Oi,3,6,"button",1)(2,Ai,1,5,"div",2),m(3,"div",3)(4,"div",4),I("onActiveIndexChange",function(i){h(e);let a=s();return g(a.onActiveIndexChange(i))})("startSlideShow",function(){h(e);let i=s();return g(i.startSlideShow())})("stopSlideShow",function(){h(e);let i=s();return g(i.stopSlideShow())}),u(),p(5,Di,1,13,"div",5),u(),p(6,Pi,1,5,"div",6),L()}if(t&2){let e=s();c(),r("ngIf",e.galleria.fullScreen),c(),r("ngIf",e.galleria.templates&&(e.galleria.headerFacet||e.galleria.headerTemplate)),c(),d(e.cx("content")),r("pBind",e.getPTOptions("content")),y("aria-live",e.galleria.autoPlay?"polite":"off"),c(),d(e.cx("itemsContainer")),r("id",e.id)("value",e.value)("activeIndex",e.activeIndex)("circular",e.galleria.circular)("templates",e.galleria.templates)("showIndicators",e.galleria.showIndicators)("changeItemOnIndicatorHover",e.galleria.changeItemOnIndicatorHover)("indicatorFacet",e.galleria.indicatorFacet)("captionFacet",e.galleria.captionFacet)("showItemNavigators",e.galleria.showItemNavigators)("autoPlay",e.galleria.autoPlay)("slideShowActive",e.slideShowActive)("pt",e.pt())("unstyled",e.unstyled()),c(),r("ngIf",e.galleria.showThumbnails),c(),r("ngIf",e.shouldRenderFooter())}}var Ni=["pGalleriaItemSlot",""];function Li(t,o){t&1&&Q(0)}function Gi(t,o){if(t&1&&(N(0),p(1,Li,1,0,"ng-container",1),L()),t&2){let e=s();c(),r("ngTemplateOutlet",e.contentTemplate)("ngTemplateOutletContext",e.context)}}var Ri=["pGalleriaItem",""],ji=t=>({index:t});function zi(t,o){if(t&1&&(k(),_(0,"svg",8)),t&2){let e=s(2);d(e.cx("prevIcon")),r("pBind",e.ptm("prevIcon"))}}function Hi(t,o){}function $i(t,o){t&1&&p(0,Hi,0,0,"ng-template")}function Qi(t,o){if(t&1){let e=w();m(0,"button",5),I("click",function(i){h(e);let a=s();return g(a.navBackward(i))})("focus",function(){h(e);let i=s();return g(i.onButtonFocus("left"))})("blur",function(){h(e);let i=s();return g(i.onButtonBlur("left"))}),p(1,zi,1,3,"svg",6)(2,$i,1,0,null,7),u()}if(t&2){let e=s();d(e.cx("prevButton")),r("pBind",e.ptm("prevButton")),c(),r("ngIf",!e.galleria.itemPreviousIconTemplate&&!e.galleria._itemPreviousIconTemplate),c(),r("ngTemplateOutlet",e.galleria.itemPreviousIconTemplate||e.galleria._itemPreviousIconTemplate)}}function qi(t,o){if(t&1&&(k(),_(0,"svg",10)),t&2){let e=s(2);d(e.cx("nextIcon")),r("pBind",e.ptm("nextIcon"))}}function Ki(t,o){}function Ui(t,o){t&1&&p(0,Ki,0,0,"ng-template")}function Zi(t,o){if(t&1){let e=w();m(0,"button",5),I("click",function(i){h(e);let a=s();return g(a.navForward(i))})("focus",function(){h(e);let i=s();return g(i.onButtonFocus("right"))})("blur",function(){h(e);let i=s();return g(i.onButtonBlur("right"))}),p(1,qi,1,3,"svg",9)(2,Ui,1,0,null,7),u()}if(t&2){let e=s();d(e.cx("nextButton")),r("pBind",e.ptm("nextButton")),c(),r("ngIf",!e.galleria.itemNextIconTemplate&&!e.galleria._itemNextIconTemplate),c(),r("ngTemplateOutlet",e.galleria.itemNextIconTemplate||e.galleria._itemNextIconTemplate)}}function Wi(t,o){if(t&1&&_(0,"div",11),t&2){let e=s();d(e.cx("caption")),r("pBind",e.ptm("caption"))("unstyled",e.unstyled())("item",e.activeItem)("templates",e.templates)}}function Xi(t,o){if(t&1&&_(0,"button",16),t&2){let e=s().index,n=s(2);d(n.cx("indicatorButton")),r("pBind",n.ptm("indicatorButton",n.getIndicatorPTOptions(e)))}}function Yi(t,o){if(t&1&&(N(0),_(1,"div",17),L()),t&2){let e=s().index,n=s(2);c(),r("index",e)("templates",n.templates)("pBind",n.ptm("item"))("unstyled",n.unstyled())}}function Ji(t,o){if(t&1){let e=w();m(0,"li",13),I("click",function(){let i=h(e).index,a=s(2);return g(a.onIndicatorClick(i))})("mouseenter",function(){let i=h(e).index,a=s(2);return g(a.onIndicatorMouseEnter(i))})("keydown",function(i){let a=h(e).index,l=s(2);return g(l.onIndicatorKeyDown(i,a))}),p(1,Xi,1,3,"button",14)(2,Yi,2,4,"ng-container",15),u()}if(t&2){let e=o.index,n=s(2);d(n.cx("indicator",F(10,ji,e))),r("pBind",n.getIndicatorPTOptions(e))("pBind",n.ptm("indicator",n.getIndicatorPTOptions(e))),y("aria-label",n.ariaPageLabel(e+1))("aria-selected",n.activeIndex===e)("aria-controls",n.id+"_item_"+e)("data-p-active",n.isIndicatorItemActive(e)),c(),r("ngIf",!n.indicatorFacet&&!n.galleria.indicatorTemplate),c(),r("ngIf",n.indicatorFacet||n.galleria.indicatorTemplate)}}function en(t,o){if(t&1&&(m(0,"ul",0),p(1,Ji,3,12,"li",12),u()),t&2){let e=s();d(e.cx("indicatorList")),r("pBind",e.ptm("indicatorList")),c(),r("ngForOf",e.value)}}var tn=["itemsContainer"],nn=["pGalleriaThumbnails",""],an=t=>({height:t}),on=(t,o)=>({index:t,activeIndex:o});function rn(t,o){if(t&1&&(k(),_(0,"svg",11)),t&2){let e=s(3);d(e.cx("thumbnailPrevIcon")),r("pBind",e.ptm("thumbnailPrevIcon"))}}function ln(t,o){if(t&1&&(k(),_(0,"svg",12)),t&2){let e=s(3);d(e.cx("thumbnailPrevIcon")),r("pBind",e.ptm("thumbnailPrevIcon"))}}function sn(t,o){if(t&1&&(N(0),p(1,rn,1,3,"svg",9)(2,ln,1,3,"svg",10),L()),t&2){let e=s(2);c(),r("ngIf",!e.isVertical),c(),r("ngIf",e.isVertical)}}function cn(t,o){}function pn(t,o){t&1&&p(0,cn,0,0,"ng-template")}function dn(t,o){if(t&1){let e=w();m(0,"button",6),I("click",function(i){h(e);let a=s();return g(a.navBackward(i))}),p(1,sn,3,2,"ng-container",7)(2,pn,1,0,null,8),u()}if(t&2){let e=s();d(e.cx("thumbnailPrevButton")),r("pBind",e.ptm("thumbnailPrevButton")),y("aria-label",e.ariaPrevButtonLabel()),c(),r("ngIf",!e.galleria.previousThumbnailIconTemplate&&!e.galleria._previousThumbnailIconTemplate),c(),r("ngTemplateOutlet",e.galleria.previousThumbnailIconTemplate||e.galleria._previousThumbnailIconTemplate)}}function mn(t,o){if(t&1){let e=w();m(0,"div",13),I("keydown",function(i){let a=h(e).index,l=s();return g(l.onThumbnailKeydown(i,a))}),m(1,"div",14),I("click",function(){let i=h(e).index,a=s();return g(a.onItemClick(i))})("touchend",function(){let i=h(e).index,a=s();return g(a.onItemClick(i))})("keydown.enter",function(){let i=h(e).index,a=s();return g(a.onItemClick(i))}),_(2,"div",15),u()()}if(t&2){let e=o.$implicit,n=o.index,i=s();d(i.cx("thumbnailItem",Xe(16,on,n,i.activeIndex))),r("pBind",i.ptm("thumbnailItem")),y("aria-selected",i.activeIndex===n)("aria-controls",i.containerId+"_item_"+n)("data-p-active",i.activeIndex===n),c(),d(i.cx("thumbnail")),r("pBind",i.ptm("thumbnail")),y("tabindex",i.activeIndex===n?0:-1)("aria-current",i.activeIndex===n?"page":void 0)("aria-label",i.ariaPageLabel(n+1)),c(),r("pBind",i.ptm("thumbnailItem"))("item",e)("templates",i.templates)("unstyled",i.unstyled())}}function un(t,o){if(t&1&&(k(),_(0,"svg",18)),t&2){let e=s(3);d(e.cx("thumbnailNextIcon")),r("pBind",e.ptm("thumbnailNextIcon"))}}function hn(t,o){if(t&1&&(k(),_(0,"svg",19)),t&2){let e=s(3);d(e.cx("thumbnailNextIcon")),r("pBind",e.ptm("thumbnailNextIcon"))}}function gn(t,o){if(t&1&&(N(0),p(1,un,1,3,"svg",16)(2,hn,1,3,"svg",17),L()),t&2){let e=s(2);c(),r("ngIf",!e.isVertical),c(),r("ngIf",e.isVertical)}}function fn(t,o){}function vn(t,o){t&1&&p(0,fn,0,0,"ng-template")}function _n(t,o){if(t&1){let e=w();m(0,"button",6),I("click",function(i){h(e);let a=s();return g(a.navForward(i))}),p(1,gn,3,2,"ng-container",7)(2,vn,1,0,null,8),u()}if(t&2){let e=s();d(e.cx("thumbnailNextButton")),r("pBind",e.ptm("thumbnailNextButton")),y("aria-label",e.ariaNextButtonLabel()),c(),r("ngIf",!e.galleria.nextThumbnailIconTemplate&&!e.galleria._nextThumbnailIconTemplate),c(),r("ngTemplateOutlet",e.galleria.nextThumbnailIconTemplate||e.galleria._nextThumbnailIconTemplate)}}var bn={mask:"p-galleria-mask p-overlay-mask",root:({instance:t})=>{let o=t.galleria.showThumbnails&&t.getPositionClass("p-galleria-thumbnails",t.galleria.thumbnailsPosition),e=t.galleria.showIndicators&&t.getPositionClass("p-galleria-indicators",t.galleria.indicatorsPosition);return["p-galleria p-component",{"p-galleria-fullscreen":t.galleria.fullScreen,"p-galleria-inset-indicators":t.galleria.showIndicatorsOnItem,"p-galleria-hover-navigators":t.galleria.showItemNavigatorsOnHover&&!t.galleria.fullScreen},o,e]},closeButton:"p-galleria-close-button",closeIcon:"p-galleria-close-icon",header:"p-galleria-header",content:"p-galleria-content",footer:"p-galleria-footer",itemsContainer:"p-galleria-items-container",items:"p-galleria-items",prevButton:({instance:t})=>["p-galleria-prev-button p-galleria-nav-button",{"p-disabled":t.isNavBackwardDisabled()}],prevIcon:"p-galleria-prev-icon",item:"p-galleria-item",nextButton:({instance:t})=>["p-galleria-next-button p-galleria-nav-button",{"p-disabled":t.isNavForwardDisabled()}],nextIcon:"p-galleria-next-icon",caption:"p-galleria-caption",indicatorList:"p-galleria-indicator-list",indicator:({instance:t,index:o})=>["p-galleria-indicator",{"p-galleria-indicator-active":t.isIndicatorItemActive(o)}],indicatorButton:"p-galleria-indicator-button",thumbnails:"p-galleria-thumbnails",thumbnailContent:"p-galleria-thumbnails-content",thumbnailPrevButton:({instance:t})=>["p-galleria-thumbnail-prev-button p-galleria-thumbnail-nav-button",{"p-disabled":t.isNavBackwardDisabled()}],thumbnailPrevIcon:"p-galleria-thumbnail-prev-icon",thumbnailsViewport:"p-galleria-thumbnails-viewport",thumbnailItems:"p-galleria-thumbnail-items",thumbnailItem:({instance:t,index:o,activeIndex:e})=>["p-galleria-thumbnail-item",{"p-galleria-thumbnail-item-current":e===o,"p-galleria-thumbnail-item-active":t.isItemActive(o),"p-galleria-thumbnail-item-start":t.firstItemAciveIndex()===o,"p-galleria-thumbnail-item-end":t.lastItemActiveIndex()===o}],thumbnail:"p-galleria-thumbnail",thumbnailNextButton:({instance:t})=>["p-galleria-thumbnail-next-button  p-galleria-thumbnail-nav-button",{"p-disabled":t.isNavForwardDisabled()}],thumbnailNextIcon:"p-galleria-thumbnail-next-icon"},U=(()=>{class t extends oe{name="galleria";style=ft;classes=bn;static \u0275fac=(()=>{let e;return function(i){return(e||(e=$(t)))(i||t)}})();static \u0275prov=H({token:t,factory:t.\u0275fac})}return t})();var Be=new ve("GALLERIA_INSTANCE"),pe=(()=>{class t extends G{element;componentName="Galleria";bindDirectiveInstance=T(x,{self:!0});$pcGalleria=T(Be,{optional:!0,skipSelf:!0})??void 0;onAfterViewChecked(){this.bindDirectiveInstance.setAttrs(this.ptm("host"))}get activeIndex(){return this._activeIndex}set activeIndex(e){this._activeIndex=e}fullScreen=!1;id;value;numVisible=3;responsiveOptions;showItemNavigators=!1;showThumbnailNavigators=!0;showItemNavigatorsOnHover=!1;changeItemOnIndicatorHover=!1;circular=!1;autoPlay=!1;shouldStopAutoplayByClick=!0;transitionInterval=4e3;showThumbnails=!0;thumbnailsPosition="bottom";verticalThumbnailViewPortHeight="300px";showIndicators=!1;showIndicatorsOnItem=!1;indicatorsPosition="bottom";baseZIndex=0;maskClass;containerClass;containerStyle;showTransitionOptions="150ms cubic-bezier(0, 0, 0.2, 1)";hideTransitionOptions="150ms cubic-bezier(0, 0, 0.2, 1)";motionOptions=Pe(void 0);computedMotionOptions=De(()=>me(me({},this.ptm("motion")),this.motionOptions()));maskMotionOptions=Pe(void 0);computedMaskMotionOptions=De(()=>me(me({},this.ptm("maskMotion")),this.maskMotionOptions()));get visible(){return this._visible}set visible(e){this._visible=e,this._visible&&!this.maskVisible?(this.maskVisible=!0,this.renderMask.set(!0),this.renderContent.set(!0)):!this._visible&&this.maskVisible&&(this.maskVisible=!1)}renderMask=Me(!1);renderContent=Me(!1);activeIndexChange=new V;visibleChange=new V;container;_visible=!1;_activeIndex=0;headerTemplate;headerFacet;footerTemplate;footerFacet;indicatorTemplate;indicatorFacet;captionTemplate;captionFacet;_closeIconTemplate;closeIconTemplate;_previousThumbnailIconTemplate;previousThumbnailIconTemplate;_nextThumbnailIconTemplate;nextThumbnailIconTemplate;_itemPreviousIconTemplate;itemPreviousIconTemplate;_itemNextIconTemplate;itemNextIconTemplate;_itemTemplate;itemTemplate;_thumbnailTemplate;thumbnailTemplate;maskVisible=!1;numVisibleLimit=0;_componentStyle=T(U);mask;templates;constructor(e){super(),this.element=e}onAfterContentInit(){this.templates?.forEach(e=>{switch(e.getType()){case"header":this.headerFacet=e.template;break;case"footer":this.footerFacet=e.template;break;case"indicator":this.indicatorFacet=e.template;break;case"closeicon":this.closeIconTemplate=e.template;break;case"itemnexticon":this.itemNextIconTemplate=e.template;break;case"itempreviousicon":this.itemPreviousIconTemplate=e.template;break;case"previousthumbnailicon":this.previousThumbnailIconTemplate=e.template;break;case"nextthumbnailicon":this.nextThumbnailIconTemplate=e.template;break;case"caption":this.captionFacet=e.template;break;case"item":this.itemTemplate=e.template;break;case"thumbnail":this.thumbnailTemplate=e.template;break}})}onChanges(e){e.value&&e.value.currentValue?.length<this.numVisible?this.numVisibleLimit=e.value.currentValue.length:this.numVisibleLimit=0}onMaskHide(e){(!e||e.target===e.currentTarget)&&(this.visible=!1,this.visibleChange.emit(!1))}onActiveItemChange(e){this.activeIndex!==e&&(this.activeIndex=e,this.activeIndexChange.emit(e))}onBeforeEnter(e){this.mask=e.element?.parentElement,this.enableModality(),setTimeout(()=>{let n=X(this.container?.nativeElement,'[data-pc-section="closebutton"]');n&&Je(n)},25)}onBeforeLeave(){this.mask&&(this.maskVisible=!1)}onAfterLeave(){this.disableModality(),this.renderContent.set(!1)}onMaskAfterLeave(){this.renderContent()||this.renderMask.set(!1)}enableModality(){at(),this.cd.markForCheck(),this.mask&&Ne.set("modal",this.mask,this.baseZIndex||this.config.zIndex.modal)}disableModality(){ot(),this.cd.markForCheck(),this.mask&&Ne.clear(this.mask)}onDestroy(){this.fullScreen&&ie(this.document.body,"p-overflow-hidden"),this.mask&&this.disableModality()}static \u0275fac=function(n){return new(n||t)(B(_e))};static \u0275cmp=M({type:t,selectors:[["p-galleria"]],contentQueries:function(n,i,a){if(n&1&&ee(a,pi,4)(a,di,4)(a,mi,4)(a,ui,4)(a,hi,4)(a,gi,4)(a,fi,4)(a,vi,4)(a,_i,4)(a,bi,4)(a,Ii,4)(a,ae,4),n&2){let l;f(l=v())&&(i.headerTemplate=l.first),f(l=v())&&(i.footerTemplate=l.first),f(l=v())&&(i.indicatorTemplate=l.first),f(l=v())&&(i.captionTemplate=l.first),f(l=v())&&(i._closeIconTemplate=l.first),f(l=v())&&(i._previousThumbnailIconTemplate=l.first),f(l=v())&&(i._nextThumbnailIconTemplate=l.first),f(l=v())&&(i._itemPreviousIconTemplate=l.first),f(l=v())&&(i._itemNextIconTemplate=l.first),f(l=v())&&(i._itemTemplate=l.first),f(l=v())&&(i._thumbnailTemplate=l.first),f(l=v())&&(i.templates=l)}},viewQuery:function(n,i){if(n&1&&te(xi,5),n&2){let a;f(a=v())&&(i.container=a.first)}},inputs:{activeIndex:"activeIndex",fullScreen:[2,"fullScreen","fullScreen",b],id:"id",value:"value",numVisible:[2,"numVisible","numVisible",q],responsiveOptions:"responsiveOptions",showItemNavigators:[2,"showItemNavigators","showItemNavigators",b],showThumbnailNavigators:[2,"showThumbnailNavigators","showThumbnailNavigators",b],showItemNavigatorsOnHover:[2,"showItemNavigatorsOnHover","showItemNavigatorsOnHover",b],changeItemOnIndicatorHover:[2,"changeItemOnIndicatorHover","changeItemOnIndicatorHover",b],circular:[2,"circular","circular",b],autoPlay:[2,"autoPlay","autoPlay",b],shouldStopAutoplayByClick:[2,"shouldStopAutoplayByClick","shouldStopAutoplayByClick",b],transitionInterval:[2,"transitionInterval","transitionInterval",q],showThumbnails:[2,"showThumbnails","showThumbnails",b],thumbnailsPosition:"thumbnailsPosition",verticalThumbnailViewPortHeight:"verticalThumbnailViewPortHeight",showIndicators:[2,"showIndicators","showIndicators",b],showIndicatorsOnItem:[2,"showIndicatorsOnItem","showIndicatorsOnItem",b],indicatorsPosition:"indicatorsPosition",baseZIndex:[2,"baseZIndex","baseZIndex",q],maskClass:"maskClass",containerClass:"containerClass",containerStyle:"containerStyle",showTransitionOptions:"showTransitionOptions",hideTransitionOptions:"hideTransitionOptions",motionOptions:[1,"motionOptions"],maskMotionOptions:[1,"maskMotionOptions"],visible:"visible"},outputs:{activeIndexChange:"activeIndexChange",visibleChange:"visibleChange"},standalone:!1,features:[A([U,{provide:Be,useExisting:t},{provide:re,useExisting:t}]),R([x]),E],decls:3,vars:2,consts:[["windowed",""],["container",""],[4,"ngIf","ngIfElse"],[3,"pBind","pMotion","pMotionAppear","pMotionEnterActiveClass","pMotionLeaveActiveClass","pMotionOptions","ngClass","class"],[3,"pMotionOnAfterLeave","click","pBind","pMotion","pMotionAppear","pMotionEnterActiveClass","pMotionLeaveActiveClass","pMotionOptions","ngClass"],["pGalleriaContent","","pFocusTrap","",3,"pMotion","pMotionAppear","pMotionName","pMotionOptions","value","activeIndex","numVisible","ngStyle","fullScreen","pt","pFocusTrapDisabled","unstyled"],["pGalleriaContent","","pFocusTrap","",3,"pMotionOnBeforeEnter","pMotionOnBeforeLeave","pMotionOnAfterLeave","maskHide","activeItemChange","pMotion","pMotionAppear","pMotionName","pMotionOptions","value","activeIndex","numVisible","ngStyle","fullScreen","pt","pFocusTrapDisabled","unstyled"],["pGalleriaContent","",3,"activeItemChange","pt","unstyled","value","activeIndex","numVisible"]],template:function(n,i){if(n&1&&p(0,wi,3,1,"div",2)(1,Ci,1,5,"ng-template",null,0,D),n&2){let a=qe(2);r("ngIf",i.fullScreen)("ngIfElse",a)}},dependencies:()=>[Ie,K,W,lt,x,it,In],encapsulation:2,changeDetection:0})}return t})(),In=(()=>{class t extends G{galleria;differs;hostName="Galleria";bindDirectiveInstance=T(x,{self:!0});onAfterViewChecked(){this.bindDirectiveInstance.setAttrs(this.getPTOptions("root"))}get activeIndex(){return this._activeIndex}set activeIndex(e){this._activeIndex=e}value=[];numVisible;fullScreen;maskHide=new V;activeItemChange=new V;closeButton;_componentStyle=T(U);$pcGalleria=T(Be,{optional:!0,skipSelf:!0})??void 0;id;_activeIndex=0;slideShowActive=!0;interval;styleClass;differ;constructor(e,n){super(),this.galleria=e,this.differs=n,this.id=this.galleria.id||Te("pn_id_"),this.differ=this.differs.find(this.galleria).create()}handleFullscreenChange(e){document?.fullscreenElement===this.el.nativeElement?.children[0]?this.fullScreen=!0:this.fullScreen=!1}onDoCheck(){if(C(this.galleria.platformId)){let e=this.differ.diff(this.galleria);e&&e.forEachItem.length>0&&this.cd.markForCheck()}}shouldRenderFooter(){return this.galleria.footerFacet&&this.galleria.templates&&this.galleria.templates.toArray().length>0||this.galleria.footerTemplate}startSlideShow(){C(this.galleria.platformId)&&(this.interval=setInterval(()=>{let e=this.galleria.circular&&this.value.length-1===this.activeIndex?0:this.activeIndex+1;this.onActiveIndexChange(e),this.activeIndex=e},this.galleria.transitionInterval),this.slideShowActive=!0)}stopSlideShow(){this.galleria.autoPlay&&!this.galleria.shouldStopAutoplayByClick||(this.interval&&clearInterval(this.interval),this.slideShowActive=!1)}getPositionClass(e,n){let a=["top","left","bottom","right"].find(l=>l===n);return a?`${e}-${a}`:""}isVertical(){return this.galleria.thumbnailsPosition==="left"||this.galleria.thumbnailsPosition==="right"}onActiveIndexChange(e){this.activeIndex!==e&&(this.activeIndex=e,this.activeItemChange.emit(this.activeIndex))}closeAriaLabel(){return this.config.translation.aria?this.config.translation.aria.close:void 0}getPTOptions(e){return this.ptm(e,{context:{pt:this.pt(),unstyled:this.unstyled()}})}static \u0275fac=function(n){return new(n||t)(B(pe),B(Ye))};static \u0275cmp=M({type:t,selectors:[["div","pGalleriaContent",""]],viewQuery:function(n,i){if(n&1&&te(Si,5),n&2){let a;f(a=v())&&(i.closeButton=a.first)}},hostVars:7,hostBindings:function(n,i){n&1&&I("fullscreenchange",function(l){return i.handleFullscreenChange(l)},$e),n&2&&(y("id",i.id)("role","region"),Ke(i.galleria.fullScreen?ue(6,ki):i.galleria.containerStyle),d(i.cn(i.cx("root"))))},inputs:{activeIndex:"activeIndex",value:"value",numVisible:[2,"numVisible","numVisible",q],fullScreen:[2,"fullScreen","fullScreen",b]},outputs:{maskHide:"maskHide",activeItemChange:"activeItemChange"},standalone:!1,features:[A([U]),R([x]),E],attrs:Vi,decls:1,vars:1,consts:[[4,"ngIf"],["type","button",3,"pBind","class","click",4,"ngIf"],["pGalleriaItemSlot","","type","header",3,"unstyled","templates","pBind","class",4,"ngIf"],[3,"pBind"],["pGalleriaItem","",3,"onActiveIndexChange","startSlideShow","stopSlideShow","id","value","activeIndex","circular","templates","showIndicators","changeItemOnIndicatorHover","indicatorFacet","captionFacet","showItemNavigators","autoPlay","slideShowActive","pt","unstyled"],["pGalleriaThumbnails","",3,"containerId","value","activeIndex","templates","numVisible","responsiveOptions","circular","isVertical","contentHeight","showThumbnailNavigators","slideShowActive","pt","unstyled","onActiveIndexChange","stopSlideShow",4,"ngIf"],["pGalleriaItemSlot","","type","footer",3,"pBind","class","templates","unstyled",4,"ngIf"],["type","button",3,"click","pBind"],["data-p-icon","times",3,"pBind","class",4,"ngIf"],[4,"ngTemplateOutlet"],["data-p-icon","times",3,"pBind"],["pGalleriaItemSlot","","type","header",3,"unstyled","templates","pBind"],["pGalleriaThumbnails","",3,"onActiveIndexChange","stopSlideShow","containerId","value","activeIndex","templates","numVisible","responsiveOptions","circular","isVertical","contentHeight","showThumbnailNavigators","slideShowActive","pt","unstyled"],["pGalleriaItemSlot","","type","footer",3,"pBind","templates","unstyled"]],template:function(n,i){n&1&&p(0,Ei,7,24,"ng-container",0),n&2&&r("ngIf",i.value&&i.value.length>0)},dependencies:()=>[K,j,Ee,x,je,xn,yn],encapsulation:2,changeDetection:0})}return t})(),je=(()=>{class t extends G{hostName="Galleria";templates;index;get item(){return this._item}shouldRender(){return this.contentTemplate||this.galleria._itemTemplate||this.galleria.itemTemplate||this.galleria.captionTemplate||this.galleria.captionTemplate||this.galleria.captionFacet||this.galleria.thumbnailTemplate||this.galleria._thumbnailTemplate||this.galleria.footerTemplate}galleria=T(pe);$pcGalleria=T(Be,{optional:!0,skipSelf:!0})??void 0;set item(e){this._item=e,this.templates&&this.templates?.toArray().length>0?this.templates.forEach(n=>{if(n.getType()===this.type)switch(this.type){case"item":case"caption":case"thumbnail":this.context={$implicit:this.item},this.contentTemplate=n.template;break;case"footer":this.context={$implicit:this.item},this.contentTemplate=n.template;break}}):this.getContentTemplate()}getTemplateFromQueryList(e){return this.galleria.templates?.find(n=>n.getType()===e)?.template}getContentTemplate(){switch(this.type){case"item":this.context={$implicit:this.item},this.contentTemplate=this.galleria._itemTemplate||this.getTemplateFromQueryList("item");break;case"caption":this.context={$implicit:this.item},this.contentTemplate=this.galleria.captionTemplate||this.getTemplateFromQueryList("caption");break;case"thumbnail":this.context={$implicit:this.item},this.contentTemplate=this.galleria._thumbnailTemplate||this.getTemplateFromQueryList("thumbnail");break;case"indicator":this.context={$implicit:this.index},this.contentTemplate=this.galleria.indicatorTemplate||this.getTemplateFromQueryList("indicator");break;case"footer":this.context={$implicit:this.item},this.contentTemplate=this.galleria.footerTemplate||this.getTemplateFromQueryList("footer");break;default:this.context={$implicit:this.item},this.contentTemplate=this.galleria._itemTemplate||this.getTemplateFromQueryList("item")}}type;contentTemplate;context;_item;onAfterContentInit(){this.templates&&this.templates.toArray().length>0?this.templates?.forEach(e=>{if(e.getType()===this.type)switch(this.type){case"item":case"caption":case"thumbnail":this.context={$implicit:this.item},this.contentTemplate=e.template;break;case"indicator":this.context={$implicit:this.index},this.contentTemplate=e.template;break;case"footer":this.context={$implicit:this.item},this.contentTemplate=e.template;break;default:this.context={$implicit:this.item},this.contentTemplate=e.template;break}}):this.getContentTemplate()}static \u0275fac=(()=>{let e;return function(i){return(e||(e=$(t)))(i||t)}})();static \u0275cmp=M({type:t,selectors:[["div","pGalleriaItemSlot",""]],inputs:{templates:"templates",index:[2,"index","index",q],item:"item",type:"type"},standalone:!1,features:[E],attrs:Ni,decls:1,vars:1,consts:[[4,"ngIf"],[4,"ngTemplateOutlet","ngTemplateOutletContext"]],template:function(n,i){n&1&&p(0,Gi,2,2,"ng-container",0),n&2&&r("ngIf",i.shouldRender())},dependencies:[K,j],encapsulation:2,changeDetection:0})}return t})(),xn=(()=>{class t extends G{galleria;hostName="Galleria";bindDirectiveInstance=T(x,{self:!0});onAfterViewChecked(){this.bindDirectiveInstance.setAttrs(this.ptm("itemsContainer"))}id;circular=!1;value;showItemNavigators=!1;showIndicators=!0;slideShowActive=!0;changeItemOnIndicatorHover=!0;autoPlay=!1;templates;indicatorFacet;captionFacet;startSlideShow=new V;stopSlideShow=new V;onActiveIndexChange=new V;_componentStyle=T(U);get activeIndex(){return this._activeIndex}set activeIndex(e){this._activeIndex=e}get activeItem(){return this.value&&this.value[this._activeIndex]}_activeIndex=0;leftButtonFocused=!1;rightButtonFocused=!1;constructor(e){super(),this.galleria=e}getIndicatorPTOptions(e){return this.ptm("indicator",{context:{highlighted:this.activeIndex===e}})}onChanges({autoPlay:e}){e?.currentValue&&this.startSlideShow.emit(),e&&e.currentValue===!1&&this.stopTheSlideShow()}next(){let e=this.activeIndex+1,n=this.circular&&this.value.length-1===this.activeIndex?0:e;this.onActiveIndexChange.emit(n)}prev(){let e=this.activeIndex!==0?this.activeIndex-1:0,n=this.circular&&this.activeIndex===0?this.value.length-1:e;this.onActiveIndexChange.emit(n)}onButtonFocus(e){e==="left"?this.leftButtonFocused=!0:this.rightButtonFocused=!0}onButtonBlur(e){e==="left"?this.leftButtonFocused=!1:this.rightButtonFocused=!1}stopTheSlideShow(){this.slideShowActive&&this.stopSlideShow&&this.stopSlideShow.emit()}navForward(e){this.stopTheSlideShow(),this.next(),e&&e.cancelable&&(e.stopPropagation(),e.preventDefault())}navBackward(e){this.stopTheSlideShow(),this.prev(),e&&e.cancelable&&(e.stopPropagation(),e.preventDefault())}onIndicatorClick(e){this.stopTheSlideShow(),this.onActiveIndexChange.emit(e)}onIndicatorMouseEnter(e){this.changeItemOnIndicatorHover&&(this.stopTheSlideShow(),this.onActiveIndexChange.emit(e))}onIndicatorKeyDown(e,n){switch(e.code){case"Enter":case"Space":this.stopTheSlideShow(),this.onActiveIndexChange.emit(n),e.preventDefault();break;case"ArrowDown":case"ArrowUp":e.preventDefault();break;default:break}}isNavForwardDisabled(){return!this.circular&&this.activeIndex===this.value.length-1}isNavBackwardDisabled(){return!this.circular&&this.activeIndex===0}isIndicatorItemActive(e){return this.activeIndex===e}ariaSlideLabel(){return this.galleria.config.translation.aria?this.galleria.config.translation.aria.slide:void 0}ariaSlideNumber(e){return this.galleria.config.translation.aria?this.galleria.config.translation.aria.slideNumber?.replace(/{slideNumber}/g,e):void 0}ariaPageLabel(e){return this.galleria.config.translation.aria?this.galleria.config.translation.aria.pageLabel?.replace(/{page}/g,e):void 0}static \u0275fac=function(n){return new(n||t)(B(pe))};static \u0275cmp=M({type:t,selectors:[["div","pGalleriaItem",""]],inputs:{id:"id",circular:[2,"circular","circular",b],value:"value",showItemNavigators:[2,"showItemNavigators","showItemNavigators",b],showIndicators:[2,"showIndicators","showIndicators",b],slideShowActive:[2,"slideShowActive","slideShowActive",b],changeItemOnIndicatorHover:[2,"changeItemOnIndicatorHover","changeItemOnIndicatorHover",b],autoPlay:[2,"autoPlay","autoPlay",b],templates:"templates",indicatorFacet:"indicatorFacet",captionFacet:"captionFacet",activeIndex:"activeIndex"},outputs:{startSlideShow:"startSlideShow",stopSlideShow:"stopSlideShow",onActiveIndexChange:"onActiveIndexChange"},standalone:!1,features:[A([U]),R([x]),E],attrs:Ri,decls:6,vars:16,consts:[[3,"pBind"],["type","button","role","navigation","data-pc-group-section","itemnavigator",3,"pBind","class","click","focus","blur",4,"ngIf"],["pGalleriaItemSlot","","role","group",3,"pBind","unstyled","item","templates","id"],["pGalleriaItemSlot","","type","caption",3,"pBind","unstyled","class","item","templates",4,"ngIf"],[3,"pBind","class",4,"ngIf"],["type","button","role","navigation","data-pc-group-section","itemnavigator",3,"click","focus","blur","pBind"],["data-p-icon","chevron-left",3,"pBind","class",4,"ngIf"],[4,"ngTemplateOutlet"],["data-p-icon","chevron-left",3,"pBind"],["data-p-icon","chevron-right",3,"pBind","class",4,"ngIf"],["data-p-icon","chevron-right",3,"pBind"],["pGalleriaItemSlot","","type","caption",3,"pBind","unstyled","item","templates"],["tabindex","0",3,"pBind","class","click","mouseenter","keydown",4,"ngFor","ngForOf"],["tabindex","0",3,"click","mouseenter","keydown","pBind"],["type","button","tabIndex","-1",3,"pBind","class",4,"ngIf"],[4,"ngIf"],["type","button","tabIndex","-1",3,"pBind"],["pGalleriaItemSlot","","type","indicator",3,"index","templates","pBind","unstyled"]],template:function(n,i){n&1&&(m(0,"div",0),p(1,Qi,3,5,"button",1),_(2,"div",2),p(3,Zi,3,5,"button",1)(4,Wi,1,6,"div",3),u(),p(5,en,2,4,"ul",4)),n&2&&(d(i.cx("items")),r("pBind",i.ptm("items")),c(),r("ngIf",i.showItemNavigators),c(),d(i.cx("item")),r("pBind",i.ptm("item"))("unstyled",i.unstyled())("item",i.activeItem)("templates",i.templates)("id",i.id+"_item_"+i.activeIndex),y("aria-label",i.ariaSlideNumber(i.activeIndex+1))("aria-roledescription",i.ariaSlideLabel()),c(),r("ngIf",i.showItemNavigators),c(),r("ngIf",i.captionFacet||i.galleria.captionTemplate),c(),r("ngIf",i.showIndicators))},dependencies:()=>[he,K,j,ce,se,x,je],encapsulation:2,changeDetection:0})}return t})(),yn=(()=>{class t extends G{galleria;hostName="Galleria";bindDirectiveInstance=T(x,{self:!0});onAfterViewChecked(){this.bindDirectiveInstance.setAttrs(this.ptm("thumbnails"))}containerId;value;isVertical=!1;slideShowActive=!1;circular=!1;responsiveOptions;contentHeight="300px";showThumbnailNavigators=!0;templates;onActiveIndexChange=new V;stopSlideShow=new V;itemsContainer;get numVisible(){return this._numVisible}set numVisible(e){this._numVisible=e,this._oldNumVisible=this.d_numVisible,this.d_numVisible=e}get activeIndex(){return this._activeIndex}set activeIndex(e){this._oldactiveIndex=this._activeIndex,this._activeIndex=e}index;startPos=null;thumbnailsStyle=null;sortedResponsiveOptions=null;totalShiftedItems=0;page=0;documentResizeListener;_numVisible=0;d_numVisible=0;_oldNumVisible=0;_activeIndex=0;_oldactiveIndex=0;_componentStyle=T(U);constructor(e){super(),this.galleria=e}onInit(){C(this.platformId)&&(this.createStyle(),this.responsiveOptions&&this.bindDocumentListeners())}onAfterContentChecked(){let e=this.totalShiftedItems;(this._oldNumVisible!==this.d_numVisible||this._oldactiveIndex!==this._activeIndex)&&this.itemsContainer&&(this._activeIndex<=this.getMedianItemIndex()?e=0:this.value.length-this.d_numVisible+this.getMedianItemIndex()<this._activeIndex?e=this.d_numVisible-this.value.length:this.value.length-this.d_numVisible<this._activeIndex&&this.d_numVisible%2===0?e=this._activeIndex*-1+this.getMedianItemIndex()+1:e=this._activeIndex*-1+this.getMedianItemIndex(),e!==this.totalShiftedItems&&(this.totalShiftedItems=e),this.itemsContainer&&this.itemsContainer.nativeElement&&(this.itemsContainer.nativeElement.style.transform=this.isVertical?`translate3d(0, ${e*(100/this.d_numVisible)}%, 0)`:`translate3d(${e*(100/this.d_numVisible)}%, 0, 0)`),this._oldactiveIndex!==this._activeIndex&&(this.document.body.setAttribute("data-p-items-hidden","false"),!this.$unstyled()&&ie(this.itemsContainer.nativeElement,"p-items-hidden"),this.itemsContainer.nativeElement.style.transition="transform 500ms ease 0s"),this._oldactiveIndex=this._activeIndex,this._oldNumVisible=this.d_numVisible)}onAfterViewInit(){C(this.platformId)&&this.calculatePosition()}createStyle(){this.thumbnailsStyle||(this.thumbnailsStyle=this.document.createElement("style"),ne(this.thumbnailsStyle,"nonce",this.galleria.config?.csp()?.nonce),this.document.body.appendChild(this.thumbnailsStyle));let e=`
            #${this.containerId} .p-galleria-thumbnail-item {
                flex: 1 0 ${100/this.d_numVisible}%
            }
        `;if(this.responsiveOptions&&!this.$unstyled()){this.sortedResponsiveOptions=[...this.responsiveOptions],this.sortedResponsiveOptions.sort((n,i)=>{let a=n.breakpoint,l=i.breakpoint,S;return a==null&&l!=null?S=-1:a!=null&&l==null?S=1:a==null&&l==null?S=0:typeof a=="string"&&typeof l=="string"?S=a.localeCompare(l,void 0,{numeric:!0}):S=a<l?-1:a>l?1:0,-1*S});for(let n=0;n<this.sortedResponsiveOptions.length;n++){let i=this.sortedResponsiveOptions[n];e+=`
                    @media screen and (max-width: ${i.breakpoint}) {
                        #${this.containerId} .p-galleria-thumbnail-item {
                            flex: 1 0 ${100/i.numVisible}%
                        }
                    }
                `}}this.thumbnailsStyle.innerHTML=e,ne(this.thumbnailsStyle,"nonce",this.galleria.config?.csp()?.nonce)}calculatePosition(){if(C(this.platformId)&&this.itemsContainer&&this.sortedResponsiveOptions){let e=window.innerWidth,n={numVisible:this._numVisible};for(let i=0;i<this.sortedResponsiveOptions.length;i++){let a=this.sortedResponsiveOptions[i];parseInt(a.breakpoint,10)>=e&&(n=a)}this.d_numVisible!==n.numVisible&&(this.d_numVisible=n.numVisible,this.cd.markForCheck())}}getTabIndex(e){return this.isItemActive(e)?0:null}navForward(e){this.stopTheSlideShow();let n=this._activeIndex+1;n+this.totalShiftedItems>this.getMedianItemIndex()&&(-1*this.totalShiftedItems<this.getTotalPageNumber()-1||this.circular)&&this.step(-1);let i=this.circular&&this.value.length-1===this._activeIndex?0:n;this.onActiveIndexChange.emit(i),e.cancelable&&e.preventDefault()}navBackward(e){this.stopTheSlideShow();let n=this._activeIndex!==0?this._activeIndex-1:0,i=n+this.totalShiftedItems;this.d_numVisible-i-1>this.getMedianItemIndex()&&(-1*this.totalShiftedItems!==0||this.circular)&&this.step(1);let a=this.circular&&this._activeIndex===0?this.value.length-1:n;this.onActiveIndexChange.emit(a),e.cancelable&&e.preventDefault()}onItemClick(e){this.stopTheSlideShow();let n=e;if(n!==this._activeIndex){let i=n+this.totalShiftedItems,a=0;n<this._activeIndex?(a=this.d_numVisible-i-1-this.getMedianItemIndex(),a>0&&-1*this.totalShiftedItems!==0&&this.step(a)):(a=this.getMedianItemIndex()-i,a<0&&-1*this.totalShiftedItems<this.getTotalPageNumber()-1&&this.step(a)),this.activeIndex=n,this.onActiveIndexChange.emit(this.activeIndex)}}onThumbnailKeydown(e,n){switch((e.code==="Enter"||e.code==="Space")&&(this.onItemClick(n),e.preventDefault()),e.code){case"ArrowRight":this.onRightKey();break;case"ArrowLeft":this.onLeftKey();break;case"Home":this.onHomeKey(),e.preventDefault();break;case"End":this.onEndKey(),e.preventDefault();break;case"ArrowUp":case"ArrowDown":e.preventDefault();break;case"Tab":this.onTabKey();break;default:break}}onRightKey(){let e=O(this.itemsContainer?.nativeElement,'[data-pc-section="thumbnailitem"]'),n=this.findFocusedIndicatorIndex();this.changedFocusedIndicator(n,n+1===e.length?e.length-1:n+1)}onLeftKey(){let e=this.findFocusedIndicatorIndex();this.changedFocusedIndicator(e,e-1<=0?0:e-1)}onHomeKey(){let e=this.findFocusedIndicatorIndex();this.changedFocusedIndicator(e,0)}onEndKey(){let e=O(this.itemsContainer?.nativeElement,'[data-pc-section="thumbnailitem"]'),n=this.findFocusedIndicatorIndex();this.changedFocusedIndicator(n,e.length-1)}onTabKey(){let e=[...O(this.itemsContainer?.nativeElement,'[data-pc-section="thumbnailitem"]')],n=e.findIndex(l=>ye(l,"data-p-active")===!0),i=X(this.itemsContainer?.nativeElement,'[tabindex="0"]'),a=e.findIndex(l=>l===i?.parentElement);e[a].children[0].tabIndex="-1",e[n].children[0].tabIndex="0"}findFocusedIndicatorIndex(){let e=[...O(this.itemsContainer?.nativeElement,'[data-pc-section="thumbnailitem"]')],n=X(this.itemsContainer?.nativeElement,'[data-pc-section="thumbnailitem"] > [tabindex="0"]');return e.findIndex(i=>i===n?.parentElement)}changedFocusedIndicator(e,n){let i=O(this.itemsContainer?.nativeElement,'[data-pc-section="thumbnailitem"]');i[e].children[0].tabIndex="-1",i[n].children[0].tabIndex="0",i[n].children[0].focus()}step(e){let n=this.totalShiftedItems+e;e<0&&-1*n+this.d_numVisible>this.value.length-1?n=this.d_numVisible-this.value.length:e>0&&n>0&&(n=0),this.circular&&(e<0&&this.value.length-1===this._activeIndex?n=0:e>0&&this._activeIndex===0&&(n=this.d_numVisible-this.value.length)),this.itemsContainer&&(this.document.body.setAttribute("data-p-items-hidden","false"),!this.$unstyled()&&ie(this.itemsContainer.nativeElement,"p-items-hidden"),this.itemsContainer.nativeElement.style.transform=this.isVertical?`translate3d(0, ${n*(100/this.d_numVisible)}%, 0)`:`translate3d(${n*(100/this.d_numVisible)}%, 0, 0)`,this.itemsContainer.nativeElement.style.transition="transform 500ms ease 0s"),this.totalShiftedItems=n}stopTheSlideShow(){this.slideShowActive&&this.stopSlideShow&&this.stopSlideShow.emit()}changePageOnTouch(e,n){n<0?this.navForward(e):this.navBackward(e)}getTotalPageNumber(){return this.value.length>this.d_numVisible?this.value.length-this.d_numVisible+1:0}getMedianItemIndex(){let e=Math.floor(this.d_numVisible/2);return this.d_numVisible%2?e:e-1}onTransitionEnd(){this.itemsContainer&&this.itemsContainer.nativeElement&&(this.document.body.setAttribute("data-p-items-hidden","true"),!this.$unstyled()&&xe(this.itemsContainer.nativeElement,"p-items-hidden"),this.itemsContainer.nativeElement.style.transition="")}onTouchEnd(e){let n=e.changedTouches[0];this.isVertical?this.changePageOnTouch(e,n.pageY-this.startPos.y):this.changePageOnTouch(e,n.pageX-this.startPos.x)}onTouchMove(e){e.cancelable&&e.preventDefault()}onTouchStart(e){let n=e.changedTouches[0];this.startPos={x:n.pageX,y:n.pageY}}isNavBackwardDisabled(){return!this.circular&&this._activeIndex===0||this.value.length<=this.d_numVisible}isNavForwardDisabled(){return!this.circular&&this._activeIndex===this.value.length-1||this.value.length<=this.d_numVisible}firstItemAciveIndex(){return this.totalShiftedItems*-1}lastItemActiveIndex(){return this.firstItemAciveIndex()+this.d_numVisible-1}isItemActive(e){return this.firstItemAciveIndex()<=e&&this.lastItemActiveIndex()>=e}bindDocumentListeners(){if(C(this.platformId)){let e=this.document.defaultView||"window";this.documentResizeListener=this.renderer.listen(e,"resize",()=>{this.calculatePosition()})}}unbindDocumentListeners(){this.documentResizeListener&&(this.documentResizeListener(),this.documentResizeListener=null)}onDestroy(){this.responsiveOptions&&this.unbindDocumentListeners(),this.thumbnailsStyle&&this.thumbnailsStyle.parentNode?.removeChild(this.thumbnailsStyle)}ariaPrevButtonLabel(){return this.galleria.config.translation.aria?this.galleria.config.translation.aria.prevPageLabel:void 0}ariaNextButtonLabel(){return this.galleria.config.translation.aria?this.galleria.config.translation.aria.nextPageLabel:void 0}ariaPageLabel(e){return this.galleria.config.translation.aria?this.galleria.config.translation.aria.pageLabel?.replace(/{page}/g,e):void 0}static \u0275fac=function(n){return new(n||t)(B(pe))};static \u0275cmp=M({type:t,selectors:[["div","pGalleriaThumbnails",""]],viewQuery:function(n,i){if(n&1&&te(tn,5),n&2){let a;f(a=v())&&(i.itemsContainer=a.first)}},hostVars:2,hostBindings:function(n,i){n&2&&d(i.cx("thumbnails"))},inputs:{containerId:"containerId",value:"value",isVertical:[2,"isVertical","isVertical",b],slideShowActive:[2,"slideShowActive","slideShowActive",b],circular:[2,"circular","circular",b],responsiveOptions:"responsiveOptions",contentHeight:"contentHeight",showThumbnailNavigators:"showThumbnailNavigators",templates:"templates",numVisible:"numVisible",activeIndex:"activeIndex"},outputs:{onActiveIndexChange:"onActiveIndexChange",stopSlideShow:"stopSlideShow"},standalone:!1,features:[A([U]),R([x]),E],attrs:nn,decls:7,vars:15,consts:[["itemsContainer",""],[3,"pBind"],["type","button","pRipple","","data-pc-group-section","thumbnailnavigator",3,"pBind","class","click",4,"ngIf"],[3,"pBind","ngStyle"],["role","tablist",3,"transitionend","touchstart","touchmove","pBind"],[3,"pBind","class","keydown",4,"ngFor","ngForOf"],["type","button","pRipple","","data-pc-group-section","thumbnailnavigator",3,"click","pBind"],[4,"ngIf"],[4,"ngTemplateOutlet"],["data-p-icon","chevron-left",3,"pBind","class",4,"ngIf"],["data-p-icon","chevron-up",3,"pBind","class",4,"ngIf"],["data-p-icon","chevron-left",3,"pBind"],["data-p-icon","chevron-up",3,"pBind"],[3,"keydown","pBind"],[3,"click","touchend","keydown.enter","pBind"],["pGalleriaItemSlot","","type","thumbnail",3,"pBind","item","templates","unstyled"],["data-p-icon","chevron-right",3,"pBind","class",4,"ngIf"],["data-p-icon","chevron-down",3,"pBind","class",4,"ngIf"],["data-p-icon","chevron-right",3,"pBind"],["data-p-icon","chevron-down",3,"pBind"]],template:function(n,i){n&1&&(m(0,"div",1),p(1,dn,3,6,"button",2),m(2,"div",3)(3,"div",4,0),I("transitionend",function(){return i.onTransitionEnd()})("touchstart",function(l){return i.onTouchStart(l)})("touchmove",function(l){return i.onTouchMove(l)}),p(5,mn,3,19,"div",5),u()(),p(6,_n,3,6,"button",2),u()),n&2&&(d(i.cx("thumbnailContent")),r("pBind",i.ptm("thumbnailContent")),c(),r("ngIf",i.showThumbnailNavigators),c(),d(i.cx("thumbnailsViewport")),r("pBind",i.ptm("thumbnailsViewport"))("ngStyle",F(13,an,i.isVertical?i.contentHeight:"")),c(),d(i.cx("thumbnailItems")),r("pBind",i.ptm("thumbnailItems")),c(2),r("ngForOf",i.value),c(),r("ngIf",i.showThumbnailNavigators))},dependencies:()=>[he,K,j,W,rt,ce,fe,ge,se,x,je],encapsulation:2,changeDetection:0})}return t})(),vt=(()=>{class t{static \u0275fac=function(n){return new(n||t)};static \u0275mod=J({type:t});static \u0275inj=Y({imports:[z,P,Ee,ce,fe,ge,se,le,nt,z,P]})}return t})();var de=class t{getData(){return[{itemImageSrc:"https://primefaces.org/cdn/primeng/images/galleria/galleria1.jpg",thumbnailImageSrc:"https://primefaces.org/cdn/primeng/images/galleria/galleria1s.jpg",alt:"Description for Image 1",title:"Title 1"},{itemImageSrc:"https://primefaces.org/cdn/primeng/images/galleria/galleria2.jpg",thumbnailImageSrc:"https://primefaces.org/cdn/primeng/images/galleria/galleria2s.jpg",alt:"Description for Image 2",title:"Title 2"},{itemImageSrc:"https://primefaces.org/cdn/primeng/images/galleria/galleria3.jpg",thumbnailImageSrc:"https://primefaces.org/cdn/primeng/images/galleria/galleria3s.jpg",alt:"Description for Image 3",title:"Title 3"},{itemImageSrc:"https://primefaces.org/cdn/primeng/images/galleria/galleria4.jpg",thumbnailImageSrc:"https://primefaces.org/cdn/primeng/images/galleria/galleria4s.jpg",alt:"Description for Image 4",title:"Title 4"},{itemImageSrc:"https://primefaces.org/cdn/primeng/images/galleria/galleria5.jpg",thumbnailImageSrc:"https://primefaces.org/cdn/primeng/images/galleria/galleria5s.jpg",alt:"Description for Image 5",title:"Title 5"},{itemImageSrc:"https://primefaces.org/cdn/primeng/images/galleria/galleria6.jpg",thumbnailImageSrc:"https://primefaces.org/cdn/primeng/images/galleria/galleria6s.jpg",alt:"Description for Image 6",title:"Title 6"},{itemImageSrc:"https://primefaces.org/cdn/primeng/images/galleria/galleria7.jpg",thumbnailImageSrc:"https://primefaces.org/cdn/primeng/images/galleria/galleria7s.jpg",alt:"Description for Image 7",title:"Title 7"},{itemImageSrc:"https://primefaces.org/cdn/primeng/images/galleria/galleria8.jpg",thumbnailImageSrc:"https://primefaces.org/cdn/primeng/images/galleria/galleria8s.jpg",alt:"Description for Image 8",title:"Title 8"},{itemImageSrc:"https://primefaces.org/cdn/primeng/images/galleria/galleria9.jpg",thumbnailImageSrc:"https://primefaces.org/cdn/primeng/images/galleria/galleria9s.jpg",alt:"Description for Image 9",title:"Title 9"},{itemImageSrc:"https://primefaces.org/cdn/primeng/images/galleria/galleria10.jpg",thumbnailImageSrc:"https://primefaces.org/cdn/primeng/images/galleria/galleria10s.jpg",alt:"Description for Image 10",title:"Title 10"},{itemImageSrc:"https://primefaces.org/cdn/primeng/images/galleria/galleria11.jpg",thumbnailImageSrc:"https://primefaces.org/cdn/primeng/images/galleria/galleria11s.jpg",alt:"Description for Image 11",title:"Title 11"},{itemImageSrc:"https://primefaces.org/cdn/primeng/images/galleria/galleria12.jpg",thumbnailImageSrc:"https://primefaces.org/cdn/primeng/images/galleria/galleria12s.jpg",alt:"Description for Image 12",title:"Title 12"},{itemImageSrc:"https://primefaces.org/cdn/primeng/images/galleria/galleria13.jpg",thumbnailImageSrc:"https://primefaces.org/cdn/primeng/images/galleria/galleria13s.jpg",alt:"Description for Image 13",title:"Title 13"},{itemImageSrc:"https://primefaces.org/cdn/primeng/images/galleria/galleria14.jpg",thumbnailImageSrc:"https://primefaces.org/cdn/primeng/images/galleria/galleria14s.jpg",alt:"Description for Image 14",title:"Title 14"},{itemImageSrc:"https://primefaces.org/cdn/primeng/images/galleria/galleria15.jpg",thumbnailImageSrc:"https://primefaces.org/cdn/primeng/images/galleria/galleria15s.jpg",alt:"Description for Image 15",title:"Title 15"}]}getImages(){return Promise.resolve(this.getData())}static{this.\u0275fac=function(e){return new(e||t)}}static{this.\u0275prov=H({token:t,factory:t.\u0275fac})}};var _t=`
    .p-imagecompare {
        position: relative;
        overflow: hidden;
        width: 100%;
        aspect-ratio: 16 / 9;
    }

    .p-imagecompare img {
        width: 100%;
        height: 100%;
        position: absolute;
    }

    .p-imagecompare img + img {
        clip-path: polygon(0 0, dt('imagecompare.scope.x', '50%') 0, dt('imagecompare.scope.x', '50%') 100%, 0 100%);
    }

    .p-imagecompare:dir(rtl) img + img {
        clip-path: polygon(calc(100% - dt('imagecompare.scope.x', '50%')) 0, 100% 0, 100% 100%, calc(100% - dt('imagecompare.scope.x', '50%')) 100%);
    }

    .p-imagecompare-slider {
        position: relative;
        -webkit-appearance: none;
        width: calc(100% + dt('imagecompare.handle.size'));
        height: 100%;
        margin-inline-start: calc(-1 * calc(dt('imagecompare.handle.size') / 2));
        background-color: transparent;
        outline: none;
        transition: all dt('imagecompare.handle.transition.duration');
    }

    .p-imagecompare-slider::-webkit-slider-thumb {
        -webkit-appearance: none;
        height: dt('imagecompare.handle.size');
        width: dt('imagecompare.handle.size');
        background: dt('imagecompare.handle.background');
        border: dt('imagecompare.handle.border.width') solid dt('imagecompare.handle.border.color');
        border-radius: dt('imagecompare.handle.border.radius');
        background-size: contain;
        cursor: ew-resize;
        transition: all dt('imagecompare.handle.transition.duration');
    }

    .p-imagecompare-slider::-moz-range-thumb {
        height: dt('imagecompare.handle.size');
        width: dt('imagecompare.handle.size');
        background: dt('imagecompare.handle.background');
        border: dt('imagecompare.handle.border.width') dt('imagecompare.handle.border.style') dt('imagecompare.handle.border.color');
        border-radius: dt('imagecompare.handle.border.radius');
        background-size: contain;
        cursor: ew-resize;
    }

    .p-imagecompare-slider:focus-visible::-webkit-slider-thumb {
        box-shadow: dt('imagecompare.handle.focus.ring.shadow');
        outline: dt('imagecompare.handle.focus.ring.width') dt('imagecompare.handle.focus.ring.style') dt('imagecompare.handle.focus.ring.color');
        outline-offset: dt('imagecompare.handle.focus.ring.offset');
    }

    .p-imagecompare-slider:focus-visible::-moz-range-thumb {
        box-shadow: dt('imagecompare.handle.focus.ring.shadow');
        outline: dt('imagecompare.handle.focus.ring.width') dt('imagecompare.handle.focus.ring.style') dt('imagecompare.handle.focus.ring.color');
        outline-offset: dt('imagecompare.handle.focus.ring.offset');
    }

    .p-imagecompare-slider:hover {
        width: calc(100% + dt('imagecompare.handle.hover.size'));
        margin-inline-start: calc(-1 * calc(dt('imagecompare.handle.hover.size') / 2));
    }

    .p-imagecompare-slider:hover::-webkit-slider-thumb {
        background: dt('imagecompare.handle.hover.background');
        border-color: dt('imagecompare.handle.hover.border.color');
        height: dt('imagecompare.handle.hover.size');
        width: dt('imagecompare.handle.hover.size');
    }

    .p-imagecompare-slider:hover::-moz-range-thumb {
        background: dt('imagecompare.handle.hover.background');
        border-color: dt('imagecompare.handle.hover.border.color');
        height: dt('imagecompare.handle.hover.size');
        width: dt('imagecompare.handle.hover.size');
    }
`;var Cn=["left"],Sn=["right"];function kn(t,o){}function Vn(t,o){t&1&&p(0,kn,0,0,"ng-template")}function Bn(t,o){}function Mn(t,o){t&1&&p(0,Bn,0,0,"ng-template")}var Fn={root:"p-imagecompare",slider:"p-imagecompare-slider"},bt=(()=>{class t extends oe{name="imagecompare";style=_t;classes=Fn;static \u0275fac=(()=>{let e;return function(i){return(e||(e=$(t)))(i||t)}})();static \u0275prov=H({token:t,factory:t.\u0275fac})}return t})();var It=new ve("IMAGECOMPARE_INSTANCE"),ze=(()=>{class t extends G{componentName="ImageCompare";$pcImageCompare=T(It,{optional:!0,skipSelf:!0})??void 0;bindDirectiveInstance=T(x,{self:!0});tabindex;ariaLabelledby;ariaLabel;leftTemplate;rightTemplate;_leftTemplate;_rightTemplate;templates;_componentStyle=T(bt);mutationObserver;isRTL=!1;onAfterViewChecked(){this.bindDirectiveInstance.setAttrs(this.ptms(["host","root"]))}onInit(){this.updateDirection(),this.observeDirectionChanges()}onAfterContentInit(){this.templates?.forEach(e=>{switch(e.getType()){case"left":this._leftTemplate=e.template;break;case"right":this._rightTemplate=e.template;break}})}onSlide(e){let n=e.target.value,i=e.target.previousElementSibling;this.isRTL?i.style.clipPath=`polygon(${100-n}% 0, 100% 0, 100% 100%, ${100-n}% 100%)`:i.style.clipPath=`polygon(0 0, ${n}% 0, ${n}% 100%, 0 100%)`}updateDirection(){this.isRTL=!!this.el.nativeElement.closest('[dir="rtl"]')}observeDirectionChanges(){if(C(this.platformId)){let e=document?.documentElement,n={attributes:!0,attributeFilter:["dir"]};this.mutationObserver=new MutationObserver(()=>{this.updateDirection()}),this.mutationObserver.observe(e,n)}}onDestroy(){this.mutationObserver&&this.mutationObserver.disconnect()}static \u0275fac=(()=>{let e;return function(i){return(e||(e=$(t)))(i||t)}})();static \u0275cmp=M({type:t,selectors:[["p-imageCompare"],["p-imagecompare"],["p-image-compare"]],contentQueries:function(n,i,a){if(n&1&&ee(a,Cn,4)(a,Sn,4)(a,ae,4),n&2){let l;f(l=v())&&(i.leftTemplate=l.first),f(l=v())&&(i.rightTemplate=l.first),f(l=v())&&(i.templates=l)}},hostVars:5,hostBindings:function(n,i){n&2&&(y("tabindex",i.tabindex)("aria-labelledby",i.ariaLabelledby)("aria-label",i.ariaLabel),d(i.cx("root")))},inputs:{tabindex:"tabindex",ariaLabelledby:"ariaLabelledby",ariaLabel:"ariaLabel"},features:[A([bt,{provide:It,useExisting:t},{provide:re,useExisting:t}]),R([x]),E],decls:3,vars:5,consts:[[4,"ngTemplateOutlet"],["type","range","min","0","max","100","value","50",3,"input","pBind"]],template:function(n,i){n&1&&(p(0,Vn,1,0,null,0)(1,Mn,1,0,null,0),m(2,"input",1),I("input",function(l){return i.onSlide(l)}),u()),n&2&&(r("ngTemplateOutlet",i.leftTemplate||i._leftTemplate),c(),r("ngTemplateOutlet",i.rightTemplate||i._rightTemplate),c(),d(i.cx("slider")),r("pBind",i.ptm("slider")))},dependencies:[z,j,P,le,x],encapsulation:2,changeDetection:0})}return t})(),xt=(()=>{class t{static \u0275fac=function(n){return new(n||t)};static \u0275mod=J({type:t});static \u0275inj=Y({imports:[ze,P,P]})}return t})();var An=()=>({"max-width":"640px"}),Dn=()=>({"left.px":5,"top.px":5});function Pn(t,o){if(t&1&&(m(0,"div",11)(1,"div",12)(2,"div",13),_(3,"img",14),m(4,"div",15),_(5,"p-tag",16),u()()(),m(6,"div",17),Z(7),u(),m(8,"div",18)(9,"div",19),Z(10),u(),m(11,"span"),_(12,"p-button",20)(13,"p-button",21),u()()()),t&2){let e=o.$implicit,n=s();c(3),r("src",We("/demo/images/product/",e.image),be)("alt",e.name),c(),r("ngStyle",ue(9,Dn)),c(),r("value",e.inventoryStatus)("severity",n.getSeverity(e.inventoryStatus)),c(2),Ue(e.name),c(3),Ze(" ","$"+e.price," "),c(2),r("outlined",!0)}}function En(t,o){t&1&&_(0,"img",22)}function Nn(t,o){t&1&&_(0,"img",23)}function Ln(t,o){if(t&1&&_(0,"img",24),t&2){let e=o.$implicit;r("src",e.itemImageSrc,be)}}function Gn(t,o){if(t&1&&_(0,"img",25),t&2){let e=o.$implicit;r("src",e.thumbnailImageSrc,be)}}var yt=class t{constructor(o,e){this.productService=o;this.photoService=e;this.galleriaResponsiveOptions=[{breakpoint:"1024px",numVisible:5},{breakpoint:"960px",numVisible:4},{breakpoint:"768px",numVisible:3},{breakpoint:"560px",numVisible:1}];this.carouselResponsiveOptions=[{breakpoint:"1024px",numVisible:3,numScroll:3},{breakpoint:"768px",numVisible:2,numScroll:2},{breakpoint:"560px",numVisible:1,numScroll:1}]}ngOnInit(){this.productService.getProductsSmall().then(o=>{this.products=o}),this.photoService.getImages().then(o=>{this.images=o})}getSeverity(o){switch(o){case"INSTOCK":return"success";case"LOWSTOCK":return"warn";case"OUTOFSTOCK":return"danger";default:return"success"}}static{this.\u0275fac=function(e){return new(e||t)(B(Se),B(de))}}static{this.\u0275cmp=M({type:t,selectors:[["app-media-demo"]],features:[A([Se,de])],decls:26,vars:10,consts:[["item",""],["left",""],["right",""],["thumbnail",""],[1,"card"],[1,"font-semibold","text-xl","mb-6"],[3,"value","numVisible","numScroll","circular","responsiveOptions"],["src","/demo/images/galleria/galleria10.jpg","alt","Image","width","250","preview",""],[1,"card","flex","flex-col"],[1,"sm:w-96!","shadow-lg","rounded-2xl"],[3,"value","responsiveOptions","containerStyle","numVisible"],[1,"border","border-surface","rounded-border","m-2","p-6"],[1,"mb-6"],[1,"relative","mx-auto"],[1,"w-full","rounded-border",3,"src","alt"],[1,"absolute","bg-black/70","rounded-border",3,"ngStyle"],[3,"value","severity"],[1,"mb-6","font-medium"],[1,"flex","justify-between","items-center"],[1,"mt-0","font-semibold","text-xl"],["icon","pi pi-heart","severity","secondary",3,"outlined"],["icon","pi pi-shopping-cart","styleClass","ml-2"],["src","https://primefaces.org/cdn/primevue/images/compare/island1.jpg"],["src","https://primefaces.org/cdn/primevue/images/compare/island2.jpg"],[2,"width","100%",3,"src"],[3,"src"]],template:function(e,n){e&1&&(m(0,"div",4)(1,"div",5),Z(2,"Carousel"),u(),m(3,"p-carousel",6),p(4,Pn,14,10,"ng-template",null,0,D),u()(),m(6,"div",4)(7,"div",5),Z(8,"Image"),u(),_(9,"p-image",7),u(),m(10,"div",8)(11,"div",5),Z(12,"Image Compare"),u(),m(13,"p-imagecompare",9),p(14,En,1,0,"ng-template",null,1,D)(16,Nn,1,0,"ng-template",null,2,D),u()(),m(18,"div",4)(19,"div",5),Z(20,"Galleria"),u(),m(21,"p-galleria",10),p(22,Ln,1,1,"ng-template",null,0,D)(24,Gn,1,1,"ng-template",null,3,D),u()()),e&2&&(c(3),r("value",n.products)("numVisible",3)("numScroll",3)("circular",!1)("responsiveOptions",n.carouselResponsiveOptions),c(18),r("value",n.images)("responsiveOptions",n.galleriaResponsiveOptions)("containerStyle",ue(9,An))("numVisible",5))},dependencies:[z,W,gt,Re,Ce,we,vt,pe,dt,pt,ct,st,xt,ze],encapsulation:2})}};export{yt as MediaDemo};
