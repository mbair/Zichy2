import{b as fe}from"./chunk-M3QBXPOZ.js";import{e as ce}from"./chunk-3X37G5VK.js";import{a as pe}from"./chunk-77QAMULV.js";import{Aa as c,Ba as he,c as Z,e as q,j as oe,k as de,l as ue,sa as f,va as F,ya as L,za as X}from"./chunk-SKANWMMA.js";import{A as w,B as S,C,E as p,Fb as W,G as l,Ga as M,Gb as N,H as o,Ia as V,Ja as r,Ka as j,La as P,Lb as re,M as z,N as ee,Na as ie,Nb as G,Oa as R,Ob as se,Pa as O,R as v,Sa as U,Ta as $,Ub as T,Va as m,Vb as le,W as te,Wa as u,Xa as ne,Ya as ae,_ as g,ea as E,fa as D,hb as A,ia as I,ja as k,ka as B,kb as Q,lb as H,oa as h,vb as Y,wa as s,xa as x,ya as b,z as J,za as y}from"./chunk-TCG5V7SB.js";var ge=`
    .p-avatar {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: dt('avatar.width');
        height: dt('avatar.height');
        font-size: dt('avatar.font.size');
        background: dt('avatar.background');
        color: dt('avatar.color');
        border-radius: dt('avatar.border.radius');
    }

    .p-avatar-image {
        background: transparent;
    }

    .p-avatar-circle {
        border-radius: 50%;
    }

    .p-avatar-circle img {
        border-radius: 50%;
    }

    .p-avatar-icon {
        font-size: dt('avatar.icon.size');
        width: dt('avatar.icon.size');
        height: dt('avatar.icon.size');
    }

    .p-avatar img {
        width: 100%;
        height: 100%;
    }

    .p-avatar-lg {
        width: dt('avatar.lg.width');
        height: dt('avatar.lg.width');
        font-size: dt('avatar.lg.font.size');
    }

    .p-avatar-lg .p-avatar-icon {
        font-size: dt('avatar.lg.icon.size');
        width: dt('avatar.lg.icon.size');
        height: dt('avatar.lg.icon.size');
    }

    .p-avatar-xl {
        width: dt('avatar.xl.width');
        height: dt('avatar.xl.width');
        font-size: dt('avatar.xl.font.size');
    }

    .p-avatar-xl .p-avatar-icon {
        font-size: dt('avatar.xl.icon.size');
        width: dt('avatar.xl.icon.size');
        height: dt('avatar.xl.icon.size');
    }

    .p-avatar-group {
        display: flex;
        align-items: center;
    }

    .p-avatar-group .p-avatar + .p-avatar {
        margin-inline-start: dt('avatar.group.offset');
    }

    .p-avatar-group .p-avatar {
        border: 2px solid dt('avatar.group.border.color');
    }

    .p-avatar-group .p-avatar-lg + .p-avatar-lg {
        margin-inline-start: dt('avatar.lg.group.offset');
    }

    .p-avatar-group .p-avatar-xl + .p-avatar-xl {
        margin-inline-start: dt('avatar.xl.group.offset');
    }
`;var De=["*"];function Ie(t,d){if(t&1&&(x(0,"span",3),ne(1),b()),t&2){let e=r();u(e.cx("label")),s("pBind",e.ptm("label")),h("data-p",e.dataP),g(),ae(e.label)}}function ke(t,d){if(t&1&&y(0,"span",5),t&2){let e=r(2);u(e.icon),s("pBind",e.ptm("icon"))("ngClass",e.cx("icon")),h("data-p",e.dataP)}}function Be(t,d){if(t&1&&B(0,ke,1,5,"span",4),t&2){let e=r(),n=U(5);s("ngIf",e.icon)("ngIfElse",n)}}function Me(t,d){if(t&1){let e=M();x(0,"img",7),V("error",function(i){l(e);let a=r(2);return o(a.imageError(i))}),b()}if(t&2){let e=r(2);s("pBind",e.ptm("image"))("src",e.image,te),h("aria-label",e.ariaLabel)("data-p",e.dataP)}}function Ae(t,d){if(t&1&&B(0,Me,1,4,"img",6),t&2){let e=r();s("ngIf",e.image)}}var He={root:({instance:t})=>["p-avatar p-component",{"p-avatar-image":t.image!=null,"p-avatar-circle":t.shape==="circle","p-avatar-lg":t.size==="large","p-avatar-xl":t.size==="xlarge"}],label:"p-avatar-label",icon:"p-avatar-icon"},me=(()=>{class t extends F{name="avatar";style=ge;classes=He;static \u0275fac=(()=>{let e;return function(i){return(e||(e=v(t)))(i||t)}})();static \u0275prov=w({token:t,factory:t.\u0275fac})}return t})();var ve=new C("AVATAR_INSTANCE"),Te=(()=>{class t extends X{componentName="Avatar";$pcAvatar=p(ve,{optional:!0,skipSelf:!0})??void 0;bindDirectiveInstance=p(c,{self:!0});onAfterViewChecked(){this.bindDirectiveInstance.setAttrs(this.ptms(["host","root"]))}label;icon;image;size="normal";shape="square";styleClass;ariaLabel;ariaLabelledBy;onImageError=new z;_componentStyle=p(me);imageError(e){this.onImageError.emit(e)}get dataP(){return this.cn({[this.shape]:this.shape,[this.size]:this.size})}static \u0275fac=(()=>{let e;return function(i){return(e||(e=v(t)))(i||t)}})();static \u0275cmp=E({type:t,selectors:[["p-avatar"]],hostVars:5,hostBindings:function(n,i){n&2&&(h("aria-label",i.ariaLabel)("aria-labelledby",i.ariaLabelledBy)("data-p",i.dataP),u(i.cn(i.cx("root"),i.styleClass)))},inputs:{label:"label",icon:"icon",image:"image",size:"size",shape:"shape",styleClass:"styleClass",ariaLabel:"ariaLabel",ariaLabelledBy:"ariaLabelledBy"},outputs:{onImageError:"onImageError"},features:[A([me,{provide:ve,useExisting:t},{provide:L,useExisting:t}]),I([c]),k],ngContentSelectors:De,decls:6,vars:2,consts:[["iconTemplate",""],["imageTemplate",""],[3,"pBind","class",4,"ngIf","ngIfElse"],[3,"pBind"],[3,"pBind","class","ngClass",4,"ngIf","ngIfElse"],[3,"pBind","ngClass"],[3,"pBind","src","error",4,"ngIf"],[3,"error","pBind","src"]],template:function(n,i){if(n&1&&(j(),P(0),B(1,Ie,2,5,"span",2)(2,Be,1,2,"ng-template",null,0,Y)(4,Ae,1,1,"ng-template",null,1,Y)),n&2){let a=U(3);g(),s("ngIf",i.label)("ngIfElse",a)}},dependencies:[T,re,G,f,c],encapsulation:2,changeDetection:0})}return t})(),mt=(()=>{class t{static \u0275fac=function(n){return new(n||t)};static \u0275mod=D({type:t});static \u0275inj=S({imports:[Te,f,f]})}return t})();var Fe=["*"],Le={root:"p-avatar-group p-component"},be=(()=>{class t extends F{name="avatargroup";classes=Le;static \u0275fac=(()=>{let e;return function(i){return(e||(e=v(t)))(i||t)}})();static \u0275prov=w({token:t,factory:t.\u0275fac})}return t})();var ye=new C("AVATARGROUP_INSTANCE"),ze=(()=>{class t extends X{componentName="AvatarGroup";$pcAvatarGroup=p(ye,{optional:!0,skipSelf:!0})??void 0;bindDirectiveInstance=p(c,{self:!0});onAfterViewChecked(){this.bindDirectiveInstance.setAttrs(this.ptms(["host","root"]))}styleClass;style;get hostStyle(){return this.style}_componentStyle=p(be);static \u0275fac=(()=>{let e;return function(i){return(e||(e=v(t)))(i||t)}})();static \u0275cmp=E({type:t,selectors:[["p-avatarGroup"],["p-avatar-group"],["p-avatargroup"]],hostVars:4,hostBindings:function(n,i){n&2&&(m(i.hostStyle),u(i.cn(i.cx("root"),i.styleClass)))},inputs:{styleClass:"styleClass",style:"style"},features:[A([be,{provide:ye,useExisting:t},{provide:L,useExisting:t}]),I([c]),k],ngContentSelectors:Fe,decls:1,vars:0,template:function(n,i){n&1&&(j(),P(0))},dependencies:[T,f],encapsulation:2,changeDetection:0})}return t})(),At=(()=>{class t{static \u0275fac=function(n){return new(n||t)};static \u0275mod=D({type:t});static \u0275inj=S({imports:[ze,f,f]})}return t})();var Ve=`
    .p-slider {
        display: block;
        position: relative;
        background: dt('slider.track.background');
        border-radius: dt('slider.track.border.radius');
    }

    .p-slider-handle {
        cursor: grab;
        touch-action: none;
        user-select: none;
        display: flex;
        justify-content: center;
        align-items: center;
        height: dt('slider.handle.height');
        width: dt('slider.handle.width');
        background: dt('slider.handle.background');
        border-radius: dt('slider.handle.border.radius');
        transition:
            background dt('slider.transition.duration'),
            color dt('slider.transition.duration'),
            border-color dt('slider.transition.duration'),
            box-shadow dt('slider.transition.duration'),
            outline-color dt('slider.transition.duration');
        outline-color: transparent;
    }

    .p-slider-handle::before {
        content: '';
        width: dt('slider.handle.content.width');
        height: dt('slider.handle.content.height');
        display: block;
        background: dt('slider.handle.content.background');
        border-radius: dt('slider.handle.content.border.radius');
        box-shadow: dt('slider.handle.content.shadow');
        transition: background dt('slider.transition.duration');
    }

    .p-slider:not(.p-disabled) .p-slider-handle:hover {
        background: dt('slider.handle.hover.background');
    }

    .p-slider:not(.p-disabled) .p-slider-handle:hover::before {
        background: dt('slider.handle.content.hover.background');
    }

    .p-slider-handle:focus-visible {
        box-shadow: dt('slider.handle.focus.ring.shadow');
        outline: dt('slider.handle.focus.ring.width') dt('slider.handle.focus.ring.style') dt('slider.handle.focus.ring.color');
        outline-offset: dt('slider.handle.focus.ring.offset');
    }

    .p-slider-range {
        display: block;
        background: dt('slider.range.background');
        border-radius: dt('slider.track.border.radius');
    }

    .p-slider.p-slider-horizontal {
        height: dt('slider.track.size');
    }

    .p-slider-horizontal .p-slider-range {
        inset-block-start: 0;
        inset-inline-start: 0;
        height: 100%;
    }

    .p-slider-horizontal .p-slider-handle {
        inset-block-start: 50%;
        margin-block-start: calc(-1 * calc(dt('slider.handle.height') / 2));
        margin-inline-start: calc(-1 * calc(dt('slider.handle.width') / 2));
    }

    .p-slider-vertical {
        min-height: 100px;
        width: dt('slider.track.size');
    }

    .p-slider-vertical .p-slider-handle {
        inset-inline-start: 50%;
        margin-inline-start: calc(-1 * calc(dt('slider.handle.width') / 2));
        margin-block-end: calc(-1 * calc(dt('slider.handle.height') / 2));
    }

    .p-slider-vertical .p-slider-range {
        inset-block-end: 0;
        inset-inline-start: 0;
        width: 100%;
    }
`;var Ne=["sliderHandle"],je=["sliderHandleStart"],Pe=["sliderHandleEnd"],Re=(t,d)=>({"inset-inline-start":t,width:d}),Oe=(t,d)=>({bottom:t,height:d}),$e=t=>({height:t}),We=t=>({width:t}),K=(t,d)=>({"inset-inline-start":t,bottom:d});function Ge(t,d){if(t&1&&y(0,"span",8),t&2){let e=r();m(e.sx("range")),u(e.cx("range")),s("ngStyle",H(8,Re,e.offset!==null&&e.offset!==void 0?e.offset+"%":e.handleValues[0]+"%",e.diff?e.diff+"%":e.handleValues[1]-e.handleValues[0]+"%"))("pBind",e.ptm("range")),h("data-pc-section","range")("data-p",e.dataP)}}function Xe(t,d){if(t&1&&y(0,"span",8),t&2){let e=r();m(e.sx("range")),u(e.cx("range")),s("ngStyle",H(8,Oe,e.offset!==null&&e.offset!==void 0?e.offset+"%":e.handleValues[0]+"%",e.diff?e.diff+"%":e.handleValues[1]-e.handleValues[0]+"%"))("pBind",e.ptm("range")),h("data-pc-section","range")("data-p",e.dataP)}}function Ue(t,d){if(t&1&&y(0,"span",8),t&2){let e=r();m(e.sx("range")),u(e.cx("range")),s("ngStyle",Q(7,$e,e.handleValue+"%"))("pBind",e.ptm("range")),h("data-pc-section","range")}}function Qe(t,d){if(t&1&&y(0,"span",8),t&2){let e=r();m(e.sx("range")),u(e.cx("range")),s("ngStyle",Q(7,We,e.handleValue+"%"))("pBind",e.ptm("range")),h("data-pc-section","range")}}function Ye(t,d){if(t&1){let e=M();x(0,"span",9,0),V("touchstart",function(i){l(e);let a=r();return o(a.onDragStart(i))})("touchmove",function(i){l(e);let a=r();return o(a.onDrag(i))})("touchend",function(i){l(e);let a=r();return o(a.onDragEnd(i))})("mousedown",function(i){l(e);let a=r();return o(a.onMouseDown(i))})("keydown",function(i){l(e);let a=r();return o(a.onKeyDown(i))}),b()}if(t&2){let e=r();m(e.sx("handle")),u(e.cx("handle")),$("transition",e.dragging?"none":null),s("ngStyle",H(18,K,e.orientation=="horizontal"?e.handleValue+"%":null,e.orientation=="vertical"?e.handleValue+"%":null))("pAutoFocus",e.autofocus)("pBind",e.ptm("handle")),h("tabindex",e.$disabled()?null:e.tabindex)("aria-valuemin",e.min)("aria-valuenow",e.value)("aria-valuemax",e.max)("aria-labelledby",e.ariaLabelledBy)("aria-label",e.ariaLabel)("aria-orientation",e.orientation)("data-pc-section","handle")("data-p",e.dataP)}}function Ze(t,d){if(t&1){let e=M();x(0,"span",10,1),V("keydown",function(i){l(e);let a=r();return o(a.onKeyDown(i,0))})("mousedown",function(i){l(e);let a=r();return o(a.onMouseDown(i,0))})("touchstart",function(i){l(e);let a=r();return o(a.onDragStart(i,0))})("touchmove",function(i){l(e);let a=r();return o(a.onDrag(i))})("touchend",function(i){l(e);let a=r();return o(a.onDragEnd(i))}),b()}if(t&2){let e=r();m(e.sx("handle")),u(e.cn(e.cx("handle"),e.handleIndex==0&&"p-slider-handle-active")),$("transition",e.dragging?"none":null),s("ngStyle",H(18,K,e.rangeStartLeft,e.rangeStartBottom))("pAutoFocus",e.autofocus)("pBind",e.ptm("startHandler")),h("tabindex",e.$disabled()?null:e.tabindex)("aria-valuemin",e.min)("aria-valuenow",e.value?e.value[0]:null)("aria-valuemax",e.max)("aria-labelledby",e.ariaLabelledBy)("aria-label",e.ariaLabel)("aria-orientation",e.orientation)("data-pc-section","startHandler")("data-p",e.dataP)}}function qe(t,d){if(t&1){let e=M();x(0,"span",11,2),V("keydown",function(i){l(e);let a=r();return o(a.onKeyDown(i,1))})("mousedown",function(i){l(e);let a=r();return o(a.onMouseDown(i,1))})("touchstart",function(i){l(e);let a=r();return o(a.onDragStart(i,1))})("touchmove",function(i){l(e);let a=r();return o(a.onDrag(i))})("touchend",function(i){l(e);let a=r();return o(a.onDragEnd(i))}),b()}if(t&2){let e=r();m(e.sx("handle")),u(e.cn(e.cx("handle"),e.handleIndex==1&&"p-slider-handle-active")),$("transition",e.dragging?"none":null),s("ngStyle",H(17,K,e.rangeEndLeft,e.rangeEndBottom))("pBind",e.ptm("endHandler")),h("tabindex",e.$disabled()?null:e.tabindex)("aria-valuemin",e.min)("aria-valuenow",e.value?e.value[1]:null)("aria-valuemax",e.max)("aria-labelledby",e.ariaLabelledBy)("aria-label",e.ariaLabel)("aria-orientation",e.orientation)("data-pc-section","endHandler")("data-p",e.dataP)}}var Ke={handle:{position:"absolute"},range:{position:"absolute"}},Je={root:({instance:t})=>["p-slider p-component",{"p-disabled":t.$disabled(),"p-invalid":t.invalid(),"p-slider-horizontal":t.orientation==="horizontal","p-slider-vertical":t.orientation==="vertical","p-slider-animate":t.animate}],range:"p-slider-range",handle:"p-slider-handle"},we=(()=>{class t extends F{name="slider";style=Ve;classes=Je;inlineStyles=Ke;static \u0275fac=(()=>{let e;return function(i){return(e||(e=v(t)))(i||t)}})();static \u0275prov=w({token:t,factory:t.\u0275fac})}return t})();var Se=new C("SLIDER_INSTANCE"),et={provide:pe,useExisting:J(()=>Ce),multi:!0},Ce=(()=>{class t extends fe{componentName="Slider";$pcSlider=p(Se,{optional:!0,skipSelf:!0})??void 0;bindDirectiveInstance=p(c,{self:!0});onAfterViewChecked(){this.bindDirectiveInstance.setAttrs(this.ptms(["host","root"]))}animate;min=0;max=100;orientation="horizontal";step;range;styleClass;ariaLabel;ariaLabelledBy;tabindex=0;autofocus;onChange=new z;onSlideEnd=new z;sliderHandle;sliderHandleStart;sliderHandleEnd;_componentStyle=p(we);value;values;handleValue;handleValues=[];diff;offset;bottom;dragging;dragListener;mouseupListener;initX;initY;barWidth;barHeight;sliderHandleClick;handleIndex=0;startHandleValue;startx;starty;ngZone=p(ee);onHostClick(e){this.onBarClick(e)}onMouseDown(e,n){this.$disabled()||(this.dragging=!0,this.updateDomData(),this.sliderHandleClick=!0,this.range&&this.handleValues&&this.handleValues[0]===this.max?this.handleIndex=0:this.handleIndex=n,this.bindDragListeners(),e.target.focus(),e.preventDefault(),this.animate&&q(this.el.nativeElement,"p-slider-animate"))}onDragStart(e,n){if(!this.$disabled()){this.el.nativeElement.setAttribute("data-p-sliding",!0);var i=e.changedTouches[0];this.startHandleValue=this.range?this.handleValues[n]:this.handleValue,this.dragging=!0,this.range&&this.handleValues&&this.handleValues[0]===this.max?this.handleIndex=0:this.handleIndex=n,this.orientation==="horizontal"?(this.startx=parseInt(i.clientX,10),this.barWidth=this.el.nativeElement.offsetWidth):(this.starty=parseInt(i.clientY,10),this.barHeight=this.el.nativeElement.offsetHeight),this.animate&&q(this.el.nativeElement,"p-slider-animate"),e.preventDefault()}}onDrag(e){if(!this.$disabled()){var n=e.changedTouches[0],i=0;this.orientation==="horizontal"?i=Math.floor((parseInt(n.clientX,10)-this.startx)*100/this.barWidth)+this.startHandleValue:i=Math.floor((this.starty-parseInt(n.clientY,10))*100/this.barHeight)+this.startHandleValue,this.setValueFromHandle(e,i),e.preventDefault()}}onDragEnd(e){this.$disabled()||(this.dragging=!1,this.el.nativeElement.setAttribute("data-p-sliding",!1),this.range?this.onSlideEnd.emit({originalEvent:e,values:this.values}):this.onSlideEnd.emit({originalEvent:e,value:this.value}),this.animate&&Z(this.el.nativeElement,"p-slider-animate"),e.preventDefault())}onBarClick(e){this.$disabled()||(this.sliderHandleClick||(this.updateDomData(),this.handleChange(e),this.range?this.onSlideEnd.emit({originalEvent:e,values:this.values}):this.onSlideEnd.emit({originalEvent:e,value:this.value})),this.sliderHandleClick=!1)}onKeyDown(e,n){switch(this.handleIndex=n,e.code){case"ArrowDown":case"ArrowLeft":this.decrementValue(e,n),e.preventDefault();break;case"ArrowUp":case"ArrowRight":this.incrementValue(e,n),e.preventDefault();break;case"PageDown":this.decrementValue(e,n,!0),e.preventDefault();break;case"PageUp":this.incrementValue(e,n,!0),e.preventDefault();break;case"Home":this.updateValue(this.min,e),e.preventDefault();break;case"End":this.updateValue(this.max,e),e.preventDefault();break;default:break}}decrementValue(e,n,i=!1){let a;this.range?this.step?a=(this.values?.[n]??0)-this.step:a=(this.values?.[n]??0)-1:this.step?a=this.value-this.step:!this.step&&i?a=this.value-10:a=this.value-1,this.updateValue(a,e),e.preventDefault()}incrementValue(e,n,i=!1){let a;this.range?this.step?a=(this.values?.[n]??0)+this.step:a=(this.values?.[n]??0)+1:this.step?a=this.value+this.step:!this.step&&i?a=this.value+10:a=this.value+1,this.updateValue(a,e),e.preventDefault()}handleChange(e){let n=this.calculateHandleValue(e);this.setValueFromHandle(e,n)}bindDragListeners(){le(this.platformId)&&this.ngZone.runOutsideAngular(()=>{let e=this.el?this.el.nativeElement.ownerDocument:this.document;this.dragListener||(this.dragListener=this.renderer.listen(e,"mousemove",n=>{this.dragging&&(this.el.nativeElement.setAttribute("data-p-sliding",!0),this.ngZone.run(()=>{this.handleChange(n)}))})),this.mouseupListener||(this.mouseupListener=this.renderer.listen(e,"mouseup",n=>{this.dragging&&(this.dragging=!1,this.el.nativeElement.setAttribute("data-p-sliding",!1),this.ngZone.run(()=>{this.range?this.onSlideEnd.emit({originalEvent:n,values:this.values}):this.onSlideEnd.emit({originalEvent:n,value:this.value}),this.animate&&Z(this.el.nativeElement,"p-slider-animate")}))}))})}unbindDragListeners(){this.dragListener&&(this.dragListener(),this.dragListener=null),this.mouseupListener&&(this.mouseupListener(),this.mouseupListener=null)}setValueFromHandle(e,n){let i=this.getValueFromHandle(n);this.range?this.step?this.handleStepChange(i,this.values[this.handleIndex]):(this.handleValues[this.handleIndex]=n,this.updateValue(i,e)):this.step?this.handleStepChange(i,this.value):(this.handleValue=n,this.updateValue(i,e)),this.cd.markForCheck()}handleStepChange(e,n){let i=e-n,a=n,_=this.step;i<0?a=n+Math.ceil(e/_-n/_)*_:i>0&&(a=n+Math.floor(e/_-n/_)*_),this.updateValue(a),this.updateHandleValue()}get rangeStartLeft(){return this.isVertical()?null:this.handleValues[0]>100?"100%":this.handleValues[0]+"%"}get rangeStartBottom(){return this.isVertical()?this.handleValues[0]+"%":"auto"}get rangeEndLeft(){return this.isVertical()?null:this.handleValues[1]+"%"}get rangeEndBottom(){return this.isVertical()?this.handleValues[1]+"%":"auto"}isVertical(){return this.orientation==="vertical"}updateDomData(){let e=this.el.nativeElement.getBoundingClientRect();this.initX=e.left+oe(),this.initY=e.top+de(),this.barWidth=this.el.nativeElement.offsetWidth,this.barHeight=this.el.nativeElement.offsetHeight}calculateHandleValue(e){return this.orientation==="horizontal"?ue(this.el.nativeElement)?(this.initX+this.barWidth-e.pageX)*100/this.barWidth:(e.pageX-this.initX)*100/this.barWidth:(this.initY+this.barHeight-e.pageY)*100/this.barHeight}updateHandleValue(){this.range?(this.handleValues[0]=(this.values[0]<this.min?0:this.values[0]-this.min)*100/(this.max-this.min),this.handleValues[1]=(this.values[1]>this.max?100:this.values[1]-this.min)*100/(this.max-this.min)):this.value<this.min?this.handleValue=0:this.value>this.max?this.handleValue=100:this.handleValue=(this.value-this.min)*100/(this.max-this.min),this.step&&this.updateDiffAndOffset()}updateDiffAndOffset(){this.diff=this.getDiff(),this.offset=this.getOffset()}getDiff(){return Math.abs(this.handleValues[0]-this.handleValues[1])}getOffset(){return Math.min(this.handleValues[0],this.handleValues[1])}updateValue(e,n){if(this.range){let i=e;this.handleIndex==0?(i<this.min?(i=this.min,this.handleValues[0]=0):i>this.values[1]&&i>this.max&&(i=this.max,this.handleValues[0]=100),this.sliderHandleStart?.nativeElement.focus()):(i>this.max?(i=this.max,this.handleValues[1]=100,this.offset=this.handleValues[1]):i<this.min?(i=this.min,this.handleValues[1]=0):i<this.values[0]&&(this.offset=this.handleValues[1]),this.sliderHandleEnd?.nativeElement.focus()),this.step?this.updateHandleValue():this.updateDiffAndOffset(),this.values[this.handleIndex]=this.getNormalizedValue(i);let a=[this.minVal,this.maxVal];this.onModelChange(a),this.onChange.emit({event:n,values:this.values})}else e<this.min?(e=this.min,this.handleValue=0):e>this.max&&(e=this.max,this.handleValue=100),this.value=this.getNormalizedValue(e),this.onModelChange(this.value),this.onChange.emit({event:n,value:this.value}),this.sliderHandle?.nativeElement.focus();this.updateHandleValue()}getValueFromHandle(e){return(this.max-this.min)*(e/100)+this.min}getDecimalsCount(e){return e&&Math.floor(e)!==e&&e.toString().split(".")[1].length||0}getNormalizedValue(e){let n=this.getDecimalsCount(this.step);return n>0?+parseFloat(e.toString()).toFixed(n):Math.floor(e)}onDestroy(){this.unbindDragListeners()}get minVal(){return Math.min(this.values[1],this.values[0])}get maxVal(){return Math.max(this.values[1],this.values[0])}writeControlValue(e){this.range?this.values=e||[0,0]:this.value=e||0,this.updateHandleValue(),this.updateDiffAndOffset(),this.cd.markForCheck()}get dataP(){return this.cn({[this.orientation]:this.orientation})}static \u0275fac=(()=>{let e;return function(i){return(e||(e=v(t)))(i||t)}})();static \u0275cmp=E({type:t,selectors:[["p-slider"]],viewQuery:function(n,i){if(n&1&&ie(Ne,5)(je,5)(Pe,5),n&2){let a;R(a=O())&&(i.sliderHandle=a.first),R(a=O())&&(i.sliderHandleStart=a.first),R(a=O())&&(i.sliderHandleEnd=a.first)}},hostVars:6,hostBindings:function(n,i){n&1&&V("click",function(_){return i.onHostClick(_)}),n&2&&(h("data-pc-name","slider")("data-pc-section","root")("data-p",i.dataP)("data-p-sliding",!1),u(i.cn(i.cx("root"),i.styleClass)))},inputs:{animate:[2,"animate","animate",W],min:[2,"min","min",N],max:[2,"max","max",N],orientation:"orientation",step:[2,"step","step",N],range:[2,"range","range",W],styleClass:"styleClass",ariaLabel:"ariaLabel",ariaLabelledBy:"ariaLabelledBy",tabindex:[2,"tabindex","tabindex",N],autofocus:[2,"autofocus","autofocus",W]},outputs:{onChange:"onChange",onSlideEnd:"onSlideEnd"},features:[A([et,we,{provide:Se,useExisting:t},{provide:L,useExisting:t}]),I([c]),k],decls:7,vars:7,consts:[["sliderHandle",""],["sliderHandleStart",""],["sliderHandleEnd",""],[3,"class","ngStyle","style","pBind",4,"ngIf"],[3,"class","style","ngStyle","pBind",4,"ngIf"],["role","slider",3,"class","transition","ngStyle","style","pAutoFocus","pBind","touchstart","touchmove","touchend","mousedown","keydown",4,"ngIf"],["role","slider",3,"transition","class","style","ngStyle","pAutoFocus","pBind","keydown","mousedown","touchstart","touchmove","touchend",4,"ngIf"],["role","slider",3,"transition","class","ngStyle","style","pBind","keydown","mousedown","touchstart","touchmove","touchend",4,"ngIf"],[3,"ngStyle","pBind"],["role","slider",3,"touchstart","touchmove","touchend","mousedown","keydown","ngStyle","pAutoFocus","pBind"],["role","slider",3,"keydown","mousedown","touchstart","touchmove","touchend","ngStyle","pAutoFocus","pBind"],["role","slider",3,"keydown","mousedown","touchstart","touchmove","touchend","ngStyle","pBind"]],template:function(n,i){n&1&&B(0,Ge,1,11,"span",3)(1,Xe,1,11,"span",3)(2,Ue,1,9,"span",4)(3,Qe,1,9,"span",4)(4,Ye,2,21,"span",5)(5,Ze,2,21,"span",6)(6,qe,2,20,"span",7),n&2&&(s("ngIf",i.range&&i.orientation=="horizontal"),g(),s("ngIf",i.range&&i.orientation=="vertical"),g(),s("ngIf",!i.range&&i.orientation=="vertical"),g(),s("ngIf",!i.range&&i.orientation=="horizontal"),g(),s("ngIf",!i.range),g(),s("ngIf",i.range),g(),s("ngIf",i.range))},dependencies:[T,G,se,ce,f,he,c],encapsulation:2,changeDetection:0})}return t})(),ti=(()=>{class t{static \u0275fac=function(n){return new(n||t)};static \u0275mod=D({type:t});static \u0275inj=S({imports:[Ce,f,f]})}return t})();export{Te as a,mt as b,ze as c,At as d,Ce as e,ti as f};
