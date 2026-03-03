import{a as we}from"./chunk-EFX7B5I5.js";import{a as De}from"./chunk-53B3EQC6.js";import{a as Ne,c as Fe,g as U}from"./chunk-57T45H6K.js";import{b as L,c as Ee}from"./chunk-QQOOSK73.js";import{Aa as m,Ba as x,ha as xe,sa as $,va as Ie,w as N,x as ne,y as K,ya as R,za as V}from"./chunk-SKANWMMA.js";import{A as re,Ab as q,B as D,C as M,Cb as ee,Da as X,E as c,Ea as Y,G as ce,Ga as ue,H as de,I as z,Ia as T,Ja as l,Ka as S,La as k,Lb as ye,M as J,Ma as me,Mb as _e,Nb as Ae,O as se,Oa as fe,Pa as he,Pb as Ce,R as w,Ta as ge,Ub as C,Wa as p,Xa as A,Ya as Z,_ as d,ea as y,fa as E,hb as B,ia as P,ja as O,ka as h,kb as ve,lb as be,mc as te,oa as v,ra as le,sa as pe,wa as r,xa as s,ya as f,yb as u,z as I,za as _}from"./chunk-TCG5V7SB.js";import{a as H}from"./chunk-INBISJ52.js";var He=`
    .p-accordionpanel {
        display: flex;
        flex-direction: column;
        border-style: solid;
        border-width: dt('accordion.panel.border.width');
        border-color: dt('accordion.panel.border.color');
    }

    .p-accordionheader {
        all: unset;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: dt('accordion.header.padding');
        color: dt('accordion.header.color');
        background: dt('accordion.header.background');
        border-style: solid;
        border-width: dt('accordion.header.border.width');
        border-color: dt('accordion.header.border.color');
        font-weight: dt('accordion.header.font.weight');
        border-radius: dt('accordion.header.border.radius');
        transition:
            background dt('accordion.transition.duration'),
            color dt('accordion.transition.duration'),
            outline-color dt('accordion.transition.duration'),
            box-shadow dt('accordion.transition.duration');
        outline-color: transparent;
    }

    .p-accordionpanel:first-child > .p-accordionheader {
        border-width: dt('accordion.header.first.border.width');
        border-start-start-radius: dt('accordion.header.first.top.border.radius');
        border-start-end-radius: dt('accordion.header.first.top.border.radius');
    }

    .p-accordionpanel:last-child > .p-accordionheader {
        border-end-start-radius: dt('accordion.header.last.bottom.border.radius');
        border-end-end-radius: dt('accordion.header.last.bottom.border.radius');
    }

    .p-accordionpanel:last-child.p-accordionpanel-active > .p-accordionheader {
        border-end-start-radius: dt('accordion.header.last.active.bottom.border.radius');
        border-end-end-radius: dt('accordion.header.last.active.bottom.border.radius');
    }

    .p-accordionheader-toggle-icon {
        color: dt('accordion.header.toggle.icon.color');
    }

    .p-accordionpanel:not(.p-disabled) .p-accordionheader:focus-visible {
        box-shadow: dt('accordion.header.focus.ring.shadow');
        outline: dt('accordion.header.focus.ring.width') dt('accordion.header.focus.ring.style') dt('accordion.header.focus.ring.color');
        outline-offset: dt('accordion.header.focus.ring.offset');
    }

    .p-accordionpanel:not(.p-accordionpanel-active):not(.p-disabled) > .p-accordionheader:hover {
        background: dt('accordion.header.hover.background');
        color: dt('accordion.header.hover.color');
    }

    .p-accordionpanel:not(.p-accordionpanel-active):not(.p-disabled) .p-accordionheader:hover .p-accordionheader-toggle-icon {
        color: dt('accordion.header.toggle.icon.hover.color');
    }

    .p-accordionpanel:not(.p-disabled).p-accordionpanel-active > .p-accordionheader {
        background: dt('accordion.header.active.background');
        color: dt('accordion.header.active.color');
    }

    .p-accordionpanel:not(.p-disabled).p-accordionpanel-active > .p-accordionheader .p-accordionheader-toggle-icon {
        color: dt('accordion.header.toggle.icon.active.color');
    }

    .p-accordionpanel:not(.p-disabled).p-accordionpanel-active > .p-accordionheader:hover {
        background: dt('accordion.header.active.hover.background');
        color: dt('accordion.header.active.hover.color');
    }

    .p-accordionpanel:not(.p-disabled).p-accordionpanel-active > .p-accordionheader:hover .p-accordionheader-toggle-icon {
        color: dt('accordion.header.toggle.icon.active.hover.color');
    }

    .p-accordioncontent {
        display: grid;
        grid-template-rows: 1fr;
    }

    .p-accordioncontent-wrapper {
        min-height: 0;
    }

    .p-accordioncontent-content {
        border-style: solid;
        border-width: dt('accordion.content.border.width');
        border-color: dt('accordion.content.border.color');
        background-color: dt('accordion.content.background');
        color: dt('accordion.content.color');
        padding: dt('accordion.content.padding');
    }
`;var W=["*"],Ke=["toggleicon"],Re=n=>({active:n});function Ve(n,i){}function je(n,i){n&1&&h(0,Ve,0,0,"ng-template")}function $e(n,i){if(n&1&&h(0,je,1,0,null,0),n&2){let e=l();r("ngTemplateOutlet",e.toggleicon)("ngTemplateOutletContext",ve(2,Re,e.active()))}}function Le(n,i){if(n&1&&_(0,"span",4),n&2){let e=l(3);p(e.cn(e.cx("toggleicon"),e.pcAccordion.collapseIcon)),r("pBind",e.ptm("toggleicon")),v("aria-hidden",!0)}}function Ue(n,i){if(n&1&&(z(),_(0,"svg",5)),n&2){let e=l(3);p(e.cx("toggleicon")),r("pBind",e.ptm("toggleicon")),v("aria-hidden",!0)}}function We(n,i){if(n&1&&(X(0),h(1,Le,1,4,"span",2)(2,Ue,1,4,"svg",3),Y()),n&2){let e=l(2);d(),r("ngIf",e.pcAccordion.collapseIcon),d(),r("ngIf",!e.pcAccordion.collapseIcon)}}function Qe(n,i){if(n&1&&_(0,"span",4),n&2){let e=l(3);p(e.cn(e.cx("toggleicon"),e.pcAccordion.expandIcon)),r("pBind",e.ptm("toggleicon")),v("aria-hidden",!0)}}function Ge(n,i){if(n&1&&(z(),_(0,"svg",7)),n&2){let e=l(3);r("pBind",e.ptm("toggleicon")),v("aria-hidden",!0)}}function ze(n,i){if(n&1&&(X(0),h(1,Qe,1,4,"span",2)(2,Ge,1,2,"svg",6),Y()),n&2){let e=l(2);d(),r("ngIf",e.pcAccordion.expandIcon),d(),r("ngIf",!e.pcAccordion.expandIcon)}}function Je(n,i){if(n&1&&h(0,We,3,2,"ng-container",1)(1,ze,3,2,"ng-container",1),n&2){let e=l();r("ngIf",e.active()),d(),r("ngIf",!e.active())}}var Xe=`
${He}

/* For PrimeNG */
.p-accordionheader-toggle-icon.icon-start {
    order: -1;
}

.p-accordionheader:has(.p-accordionheader-toggle-icon.icon-start) {
    justify-content: flex-start;
    gap: dt('accordion.header.padding');
}

.p-accordionheader.p-ripple {
    overflow: hidden;
    position: relative;
}

.p-accordioncontent .p-motion {
    display: grid;
    grid-template-rows: 1fr;
}
`,Ye={root:"p-accordion p-component",panel:({instance:n})=>["p-accordionpanel",{"p-accordionpanel-active":n.active(),"p-disabled":n.disabled()}],header:"p-accordionheader",toggleicon:"p-accordionheader-toggle-icon",contentContainer:"p-accordioncontent",contentWrapper:"p-accordioncontent-wrapper",content:"p-accordioncontent-content"},b=(()=>{class n extends Ie{name="accordion";style=Xe;classes=Ye;static \u0275fac=(()=>{let e;return function(o){return(e||(e=w(n)))(o||n)}})();static \u0275prov=re({token:n,factory:n.\u0275fac})}return n})();var Me=new M("ACCORDION_PANEL_INSTANCE"),Pe=new M("ACCORDION_HEADER_INSTANCE"),Oe=new M("ACCORDION_CONTENT_INSTANCE"),Te=new M("ACCORDION_INSTANCE"),j=(()=>{class n extends V{$pcAccordionPanel=c(Me,{optional:!0,skipSelf:!0})??void 0;bindDirectiveInstance=c(m,{self:!0});componentName="AccordionPanel";onAfterViewChecked(){this.bindDirectiveInstance.setAttrs(this.ptm("root"))}pcAccordion=c(I(()=>F));value=ee(void 0);disabled=q(!1,{transform:e=>U(e)});active=u(()=>this.pcAccordion.multiple()?this.valueEquals(this.pcAccordion.value(),this.value()):this.pcAccordion.value()===this.value());valueEquals(e,t){return Array.isArray(e)?e.includes(t):e===t}_componentStyle=c(b);static \u0275fac=(()=>{let e;return function(o){return(e||(e=w(n)))(o||n)}})();static \u0275cmp=y({type:n,selectors:[["p-accordion-panel"],["p-accordionpanel"]],hostVars:4,hostBindings:function(t,o){t&2&&(v("data-p-disabled",o.disabled())("data-p-active",o.active()),p(o.cx("panel")))},inputs:{value:[1,"value"],disabled:[1,"disabled"]},outputs:{value:"valueChange"},features:[B([b,{provide:Me,useExisting:n},{provide:R,useExisting:n}]),P([m]),O],ngContentSelectors:W,decls:1,vars:0,template:function(t,o){t&1&&(S(),k(0))},dependencies:[C,x],encapsulation:2,changeDetection:0})}return n})(),ie=(()=>{class n extends V{$pcAccordionHeader=c(Pe,{optional:!0,skipSelf:!0})??void 0;bindDirectiveInstance=c(m,{self:!0});componentName="AccordionHeader";onAfterViewChecked(){this.bindDirectiveInstance.setAttrs(this.ptm("root"))}pcAccordion=c(I(()=>F));pcAccordionPanel=c(I(()=>j));id=u(()=>`${this.pcAccordion.id()}_accordionheader_${this.pcAccordionPanel.value()}`);active=u(()=>this.pcAccordionPanel.active());disabled=u(()=>this.pcAccordionPanel.disabled());ariaControls=u(()=>`${this.pcAccordion.id()}_accordioncontent_${this.pcAccordionPanel.value()}`);toggleicon;onClick(e){if(this.disabled())return;let t=this.active();this.changeActiveValue();let o=this.active(),a=this.pcAccordionPanel.value();!t&&o?this.pcAccordion.onOpen.emit({originalEvent:e,index:a}):t&&!o&&this.pcAccordion.onClose.emit({originalEvent:e,index:a})}onFocus(){!this.disabled()&&this.pcAccordion.selectOnFocus()&&this.changeActiveValue()}onKeydown(e){switch(e.code){case"ArrowDown":this.arrowDownKey(e);break;case"ArrowUp":this.arrowUpKey(e);break;case"Home":this.onHomeKey(e);break;case"End":this.onEndKey(e);break;case"Enter":case"Space":case"NumpadEnter":this.onEnterKey(e);break;default:break}}_componentStyle=c(b);changeActiveValue(){this.pcAccordion.updateValue(this.pcAccordionPanel.value())}findPanel(e){return e?.closest('[data-pc-name="accordionpanel"]')}findHeader(e){return N(e,'[data-pc-name="accordionheader"]')}findNextPanel(e,t=!1){let o=t?e:e.nextElementSibling;return o?K(o,"data-p-disabled")?this.findNextPanel(o):this.findHeader(o):null}findPrevPanel(e,t=!1){let o=t?e:e.previousElementSibling;return o?K(o,"data-p-disabled")?this.findPrevPanel(o):this.findHeader(o):null}findFirstPanel(){return this.findNextPanel(this.pcAccordion.el.nativeElement.firstElementChild,!0)}findLastPanel(){return this.findPrevPanel(this.pcAccordion.el.nativeElement.lastElementChild,!0)}changeFocusedPanel(e,t){ne(t)}arrowDownKey(e){let t=this.findNextPanel(this.findPanel(e.currentTarget));t?this.changeFocusedPanel(e,t):this.onHomeKey(e),e.preventDefault()}arrowUpKey(e){let t=this.findPrevPanel(this.findPanel(e.currentTarget));t?this.changeFocusedPanel(e,t):this.onEndKey(e),e.preventDefault()}onHomeKey(e){let t=this.findFirstPanel();this.changeFocusedPanel(e,t),e.preventDefault()}onEndKey(e){let t=this.findLastPanel();this.changeFocusedPanel(e,t),e.preventDefault()}onEnterKey(e){this.disabled()||this.changeActiveValue(),e.preventDefault()}get dataP(){return this.cn({active:this.active()})}static \u0275fac=(()=>{let e;return function(o){return(e||(e=w(n)))(o||n)}})();static \u0275cmp=y({type:n,selectors:[["p-accordion-header"],["p-accordionheader"]],contentQueries:function(t,o,a){if(t&1&&me(a,Ke,5),t&2){let g;fe(g=he())&&(o.toggleicon=g.first)}},hostVars:13,hostBindings:function(t,o){t&1&&T("click",function(g){return o.onClick(g)})("focus",function(){return o.onFocus()})("keydown",function(g){return o.onKeydown(g)}),t&2&&(v("id",o.id())("aria-expanded",o.active())("aria-controls",o.ariaControls())("aria-disabled",o.disabled())("role","button")("tabindex",o.disabled()?"-1":"0")("data-p-active",o.active())("data-p-disabled",o.disabled())("data-p",o.dataP),p(o.cx("header")),ge("user-select","none"))},features:[B([b,{provide:Pe,useExisting:n},{provide:R,useExisting:n}]),P([L,m]),O],ngContentSelectors:W,decls:3,vars:1,consts:[[4,"ngTemplateOutlet","ngTemplateOutletContext"],[4,"ngIf"],[3,"class","pBind",4,"ngIf"],["data-p-icon","chevron-up",3,"class","pBind",4,"ngIf"],[3,"pBind"],["data-p-icon","chevron-up",3,"pBind"],["data-p-icon","chevron-down",3,"pBind",4,"ngIf"],["data-p-icon","chevron-down",3,"pBind"]],template:function(t,o){t&1&&(S(),k(0),le(1,$e,1,4)(2,Je,2,2)),t&2&&(d(),pe(o.toggleicon?1:2))},dependencies:[C,Ae,Ce,De,we,x,m],encapsulation:2,changeDetection:0})}return n})(),ae=(()=>{class n extends V{$pcAccordionContent=c(Oe,{optional:!0,skipSelf:!0})??void 0;bindDirectiveInstance=c(m,{self:!0});componentName="AccordionContent";onAfterViewChecked(){this.bindDirectiveInstance.setAttrs(this.ptm("root"))}pcAccordion=c(I(()=>F));pcAccordionPanel=c(I(()=>j));active=u(()=>this.pcAccordionPanel.active());ariaLabelledby=u(()=>`${this.pcAccordion.id()}_accordionheader_${this.pcAccordionPanel.value()}`);id=u(()=>`${this.pcAccordion.id()}_accordioncontent_${this.pcAccordionPanel.value()}`);_componentStyle=c(b);ptParams=u(()=>({context:this.active()}));computedMotionOptions=u(()=>H(H({},this.ptm("motion",this.ptParams())),this.pcAccordion.computedMotionOptions()));static \u0275fac=(()=>{let e;return function(o){return(e||(e=w(n)))(o||n)}})();static \u0275cmp=y({type:n,selectors:[["p-accordion-content"],["p-accordioncontent"]],hostVars:6,hostBindings:function(t,o){t&2&&(v("id",o.id())("role","region")("data-p-active",o.active())("aria-labelledby",o.ariaLabelledby()),p(o.cx("contentContainer")))},features:[B([b,{provide:Oe,useExisting:n},{provide:R,useExisting:n}]),P([m]),O],ngContentSelectors:W,decls:4,vars:10,consts:[["name","p-collapsible","hideStrategy","visibility",3,"visible","mountOnEnter","unmountOnLeave","options"],[3,"pBind"]],template:function(t,o){t&1&&(S(),s(0,"p-motion",0)(1,"div",1)(2,"div",1),k(3),f()()()),t&2&&(r("visible",o.active())("mountOnEnter",!1)("unmountOnLeave",!1)("options",o.computedMotionOptions()),d(),p(o.cx("contentWrapper")),r("pBind",o.ptm("contentWrapper",o.ptParams())),d(),p(o.cx("content")),r("pBind",o.ptm("content",o.ptParams())))},dependencies:[C,x,m,Fe,Ne],encapsulation:2,changeDetection:0})}return n})(),F=(()=>{class n extends V{componentName="Accordion";$pcAccordion=c(Te,{optional:!0,skipSelf:!0})??void 0;bindDirectiveInstance=c(m,{self:!0});onAfterViewChecked(){this.bindDirectiveInstance.setAttrs(this.ptm("root"))}value=ee(void 0);multiple=q(!1,{transform:e=>U(e)});styleClass;expandIcon;collapseIcon;selectOnFocus=q(!1,{transform:e=>U(e)});transitionOptions="400ms cubic-bezier(0.86, 0, 0.07, 1)";motionOptions=q(void 0);computedMotionOptions=u(()=>H(H({},this.ptm("motion")),this.motionOptions()));onClose=new J;onOpen=new J;id=se(xe("pn_id_"));_componentStyle=c(b);onKeydown(e){switch(e.code){case"ArrowDown":this.onTabArrowDownKey(e);break;case"ArrowUp":this.onTabArrowUpKey(e);break;case"Home":e.shiftKey||this.onTabHomeKey(e);break;case"End":e.shiftKey||this.onTabEndKey(e);break}}onTabArrowDownKey(e){let t=this.findNextHeaderAction(e.target.parentElement);t?this.changeFocusedTab(t):this.onTabHomeKey(e),e.preventDefault()}onTabArrowUpKey(e){let t=this.findPrevHeaderAction(e.target.parentElement);t?this.changeFocusedTab(t):this.onTabEndKey(e),e.preventDefault()}onTabHomeKey(e){let t=this.findFirstHeaderAction();this.changeFocusedTab(t),e.preventDefault()}changeFocusedTab(e){e&&ne(e)}findNextHeaderAction(e,t=!1){let o=t?e:e.nextElementSibling,a=N(o,'[data-pc-section="accordionheader"]');return a?K(a,"data-p-disabled")?this.findNextHeaderAction(a.parentElement):N(a.parentElement,'[data-pc-section="accordionheader"]'):null}findPrevHeaderAction(e,t=!1){let o=t?e:e.previousElementSibling,a=N(o,'[data-pc-section="accordionheader"]');return a?K(a,"data-p-disabled")?this.findPrevHeaderAction(a.parentElement):N(a.parentElement,'[data-pc-section="accordionheader"]'):null}findFirstHeaderAction(){let e=this.el.nativeElement.firstElementChild;return this.findNextHeaderAction(e,!0)}findLastHeaderAction(){let e=this.el.nativeElement.lastElementChild;return this.findPrevHeaderAction(e,!0)}onTabEndKey(e){let t=this.findLastHeaderAction();this.changeFocusedTab(t),e.preventDefault()}getBlockableElement(){return this.el.nativeElement.children[0]}updateValue(e){let t=this.value();if(this.multiple()){let o=Array.isArray(t)?[...t]:[],a=o.indexOf(e);a!==-1?o.splice(a,1):o.push(e),this.value.set(o)}else t===e?this.value.set(void 0):this.value.set(e)}static \u0275fac=(()=>{let e;return function(o){return(e||(e=w(n)))(o||n)}})();static \u0275cmp=y({type:n,selectors:[["p-accordion"]],hostVars:2,hostBindings:function(t,o){t&1&&T("keydown",function(g){return o.onKeydown(g)}),t&2&&p(o.cn(o.cx("root"),o.styleClass))},inputs:{value:[1,"value"],multiple:[1,"multiple"],styleClass:"styleClass",expandIcon:"expandIcon",collapseIcon:"collapseIcon",selectOnFocus:[1,"selectOnFocus"],transitionOptions:"transitionOptions",motionOptions:[1,"motionOptions"]},outputs:{value:"valueChange",onClose:"onClose",onOpen:"onOpen"},features:[B([b,{provide:Te,useExisting:n},{provide:R,useExisting:n}]),P([m]),O],ngContentSelectors:W,decls:1,vars:0,template:function(t,o){t&1&&(S(),k(0))},dependencies:[C,$,x],encapsulation:2,changeDetection:0})}return n})(),Se=(()=>{class n{static \u0275fac=function(t){return new(t||n)};static \u0275mod=E({type:n});static \u0275inj=D({imports:[F,$,j,ie,ae,x,$,x]})}return n})();var en=(n,i)=>({"bg-primary":n,"hover:surface-hover":i});function nn(n,i){if(n&1){let e=ue();s(0,"li",10),T("click",function(){let o=ce(e).index,a=l();return de(a.changeItem(o))}),s(1,"a",11),_(2,"i",12),s(3,"span"),A(4),f()()()}if(n&2){let e=i.$implicit,t=i.index,o=l();d(),r("ngClass",be(4,en,o.activeIndex===t,o.activeIndex!==t)),d(),p(e.icon),d(2),Z(e.label)}}function tn(n,i){if(n&1&&(s(0,"p-accordion-panel",13)(1,"p-accordion-header"),A(2),f(),s(3,"p-accordion-content")(4,"p",14),A(5,"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."),f()()()),n&2){let e=i.$implicit,t=i.index;r("value",t),d(2),Z(e)}}var Q=class n{constructor(){this.items=[];this.activeIndex=0}ngOnInit(){this.items=[{label:"General",icon:"pi pi-fw pi-info-circle",questions:["Is there a trial period?","Do I need to sign up with credit card?","Is the subscription monthly or annual?","How many tiers are there?"]},{label:"Mailing",icon:"pi pi-fw pi-envelope",questions:["How do I setup my account?","Is there a limit on mails to send?","What is my inbox size?","How can I add attachements?"]},{label:"Support",icon:"pi pi-fw pi-question-circle",questions:["How can I get support?","What is the response time?","Is there a community forum?","Is live chat available?"]},{label:"Billing",icon:"pi pi-fw pi-credit-card",questions:["Will I receive an invoice?","How to provide my billing information?","Is VAT included?","Can I receive PDF invoices?"]}]}changeItem(i){this.activeIndex=i}static{this.\u0275fac=function(e){return new(e||n)}}static{this.\u0275cmp=y({type:n,selectors:[["ng-component"]],standalone:!1,decls:15,vars:2,consts:[[1,"card"],[1,"text-900","font-bold","text-xl","mb-3"],[1,"text-600","line-height-3"],[1,"flex","flex-column","md:flex-row","gap-5"],[1,"card","mb-0","md:w-20rem"],[1,"text-900","block","font-bold","mb-3"],[1,"list-none","m-0","p-0"],["pRipple","","class","mb-2 ",3,"click",4,"ngFor","ngForOf"],[1,"card","flex-1"],[3,"value",4,"ngFor","ngForOf"],["pRipple","",1,"mb-2",3,"click"],[1,"flex","align-items-center","cursor-pointer","select-none","p-3","transition-colors","transition-duration-150","border-round",3,"ngClass"],[1,"mr-2","text-lg"],[3,"value"],[1,"line-height-3","m-0","p-0"]],template:function(e,t){e&1&&(s(0,"div")(1,"div",0)(2,"div",1),A(3,"Frequently Asked Questions"),f(),s(4,"p",2),A(5,"Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit."),f()(),s(6,"div",3)(7,"div",4)(8,"div",5),A(9,"Categories"),f(),s(10,"ul",6),h(11,nn,5,7,"li",7),f()(),s(12,"div",8)(13,"p-accordion"),h(14,tn,6,2,"p-accordion-panel",9),f()()()()),e&2&&(d(11),r("ngForOf",t.items),d(3),r("ngForOf",t.items[t.activeIndex].questions))},dependencies:[ye,_e,F,j,ie,ae,L],encapsulation:2})}};var G=class n{static{this.\u0275fac=function(e){return new(e||n)}}static{this.\u0275mod=E({type:n})}static{this.\u0275inj=D({imports:[te.forChild([{path:"",component:Q}]),te]})}};var ke=class n{static{this.\u0275fac=function(e){return new(e||n)}}static{this.\u0275mod=E({type:n})}static{this.\u0275inj=D({imports:[C,G,Se,Ee]})}};export{ke as FaqModule};
