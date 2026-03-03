import{a as Fe}from"./chunk-4KUKA54D.js";import{a as Ee}from"./chunk-Y5XVBKOM.js";import{c as Ie,d as Z,f as ee,g as ne,h as te,s as U}from"./chunk-YKR3JRMQ.js";import{b as L,c as Ne}from"./chunk-XXJGSDOD.js";import{ba as we,ma as $,pa as De,sa as q,ta as V,ua as p,v as N,va as x,w as ie,x as K}from"./chunk-PRXZITXW.js";import{A as I,Ab as Y,B as de,Ba as z,C as w,Ca as J,D as T,Ea as fe,F as r,Ga as M,H as se,Ha as l,I as le,Ia as B,Ib as Ae,J as W,Ja as S,Jb as _e,Ka as he,Kb as Ce,Ma as ge,Mb as xe,N as pe,Na as ve,P as D,Ra as be,Rb as C,Ua as m,Va as _,Wa as X,Y as d,Z as G,ea as y,fa as E,fb as O,ia as P,ib as F,ja as k,jb as ye,jc as oe,ka as g,oa as v,pa as ue,qa as me,ua as c,va as s,vb as h,wa as u,xa as A,yb as R}from"./chunk-GPRQO4UL.js";import"./chunk-WWX6BADO.js";var He=`
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

    .p-accordioncontent-content {
        border-style: solid;
        border-width: dt('accordion.content.border.width');
        border-color: dt('accordion.content.border.color');
        background-color: dt('accordion.content.background');
        color: dt('accordion.content.color');
        padding: dt('accordion.content.padding');
    }
`;var Q=["*"],je=["toggleicon"],Re=n=>({active:n});function $e(n,o){}function Le(n,o){n&1&&g(0,$e,0,0,"ng-template")}function Ue(n,o){if(n&1&&g(0,Le,1,0,null,0),n&2){let e=l();c("ngTemplateOutlet",e.toggleicon)("ngTemplateOutletContext",F(2,Re,e.active()))}}function Qe(n,o){if(n&1&&A(0,"span",4),n&2){let e=l(3);m(e.cn(e.cx("toggleicon"),e.pcAccordion.collapseIcon)),c("pBind",e.ptm("toggleicon")),v("aria-hidden",!0)}}function We(n,o){if(n&1&&(W(),A(0,"svg",5)),n&2){let e=l(3);m(e.cx("toggleicon")),c("pBind",e.ptm("toggleicon")),v("aria-hidden",!0)}}function Ge(n,o){if(n&1&&(z(0),g(1,Qe,1,4,"span",2)(2,We,1,4,"svg",3),J()),n&2){let e=l(2);d(),c("ngIf",e.pcAccordion.collapseIcon),d(),c("ngIf",!e.pcAccordion.collapseIcon)}}function ze(n,o){if(n&1&&A(0,"span",4),n&2){let e=l(3);m(e.cn(e.cx("toggleicon"),e.pcAccordion.expandIcon)),c("pBind",e.ptm("toggleicon")),v("aria-hidden",!0)}}function Je(n,o){if(n&1&&(W(),A(0,"svg",7)),n&2){let e=l(3);c("pBind",e.ptm("toggleicon")),v("aria-hidden",!0)}}function Xe(n,o){if(n&1&&(z(0),g(1,ze,1,4,"span",2)(2,Je,1,2,"svg",6),J()),n&2){let e=l(2);d(),c("ngIf",e.pcAccordion.expandIcon),d(),c("ngIf",!e.pcAccordion.expandIcon)}}function Ye(n,o){if(n&1&&g(0,Ge,3,2,"ng-container",1)(1,Xe,3,2,"ng-container",1),n&2){let e=l();c("ngIf",e.active()),d(),c("ngIf",!e.active())}}var Te=n=>({transitionParams:n}),Ze=n=>({value:"visible",params:n}),en=n=>({value:"hidden",params:n}),nn=`
    ${He}

    /*For PrimeNG*/
    .p-accordionpanel:not(.p-accordionpanel-active) > .p-accordioncontent,
    .p-accordioncontent-content.ng-animating {
        overflow: hidden;
    }

    .p-accordionheader-toggle-icon.icon-start {
        order: -1;
    }

    .p-accordionheader:has(.p-accordionheader-toggle-icon.icon-start) {
        justify-content: flex-start;
        gap: dt('accordion.header.padding');
    }

    .p-accordioncontent.ng-animating {
        overflow: hidden;
    }

    .p-accordionheader.p-ripple {
        overflow: hidden;
        position: relative;
    }
`,tn={root:"p-accordion p-component",panel:({instance:n})=>["p-accordionpanel",{"p-accordionpanel-active":n.active(),"p-disabled":n.disabled()}],header:"p-accordionheader",toggleicon:"p-accordionheader-toggle-icon",contentContainer:"p-accordioncontent",content:"p-accordioncontent-content"},b=(()=>{class n extends De{name="accordion";style=nn;classes=tn;static \u0275fac=(()=>{let e;return function(t){return(e||(e=D(n)))(t||n)}})();static \u0275prov=de({token:n,factory:n.\u0275fac})}return n})();var Pe=new T("ACCORDION_PANEL_INSTANCE"),ke=new T("ACCORDION_HEADER_INSTANCE"),Me=new T("ACCORDION_CONTENT_INSTANCE"),Be=new T("ACCORDION_INSTANCE"),j=(()=>{class n extends V{$pcAccordionPanel=r(Pe,{optional:!0,skipSelf:!0})??void 0;bindDirectiveInstance=r(p,{self:!0});onAfterViewChecked(){this.bindDirectiveInstance.setAttrs(this.ptm("root"))}pcAccordion=r(I(()=>H));value=Y(void 0);disabled=R(!1,{transform:e=>U(e)});active=h(()=>this.pcAccordion.multiple()?this.valueEquals(this.pcAccordion.value(),this.value()):this.pcAccordion.value()===this.value());valueEquals(e,i){return Array.isArray(e)?e.includes(i):e===i}_componentStyle=r(b);static \u0275fac=(()=>{let e;return function(t){return(e||(e=D(n)))(t||n)}})();static \u0275cmp=y({type:n,selectors:[["p-accordion-panel"],["p-accordionpanel"]],hostVars:4,hostBindings:function(i,t){i&2&&(v("data-p-disabled",t.disabled())("data-p-active",t.active()),m(t.cx("panel")))},inputs:{value:[1,"value"],disabled:[1,"disabled"]},outputs:{value:"valueChange"},features:[O([b,{provide:Pe,useExisting:n},{provide:q,useExisting:n}]),k([p]),P],ngContentSelectors:Q,decls:1,vars:0,template:function(i,t){i&1&&(B(),S(0))},dependencies:[C,x],encapsulation:2,changeDetection:0})}return n})(),re=(()=>{class n extends V{$pcAccordionHeader=r(ke,{optional:!0,skipSelf:!0})??void 0;bindDirectiveInstance=r(p,{self:!0});onAfterViewChecked(){this.bindDirectiveInstance.setAttrs(this.ptm("root"))}pcAccordion=r(I(()=>H));pcAccordionPanel=r(I(()=>j));id=h(()=>`${this.pcAccordion.id()}_accordionheader_${this.pcAccordionPanel.value()}`);active=h(()=>this.pcAccordionPanel.active());disabled=h(()=>this.pcAccordionPanel.disabled());ariaControls=h(()=>`${this.pcAccordion.id()}_accordioncontent_${this.pcAccordionPanel.value()}`);toggleicon;onClick(e){if(this.disabled())return;let i=this.active();this.changeActiveValue();let t=this.active(),a=this.pcAccordionPanel.value();!i&&t?this.pcAccordion.onOpen.emit({originalEvent:e,index:a}):i&&!t&&this.pcAccordion.onClose.emit({originalEvent:e,index:a})}onFocus(){!this.disabled()&&this.pcAccordion.selectOnFocus()&&this.changeActiveValue()}onKeydown(e){switch(e.code){case"ArrowDown":this.arrowDownKey(e);break;case"ArrowUp":this.arrowUpKey(e);break;case"Home":this.onHomeKey(e);break;case"End":this.onEndKey(e);break;case"Enter":case"Space":case"NumpadEnter":this.onEnterKey(e);break;default:break}}_componentStyle=r(b);changeActiveValue(){this.pcAccordion.updateValue(this.pcAccordionPanel.value())}findPanel(e){return e?.closest('[data-pc-name="accordionpanel"]')}findHeader(e){return N(e,'[data-pc-name="accordionheader"]')}findNextPanel(e,i=!1){let t=i?e:e.nextElementSibling;return t?K(t,"data-p-disabled")?this.findNextPanel(t):this.findHeader(t):null}findPrevPanel(e,i=!1){let t=i?e:e.previousElementSibling;return t?K(t,"data-p-disabled")?this.findPrevPanel(t):this.findHeader(t):null}findFirstPanel(){return this.findNextPanel(this.pcAccordion.el.nativeElement.firstElementChild,!0)}findLastPanel(){return this.findPrevPanel(this.pcAccordion.el.nativeElement.lastElementChild,!0)}changeFocusedPanel(e,i){ie(i)}arrowDownKey(e){let i=this.findNextPanel(this.findPanel(e.currentTarget));i?this.changeFocusedPanel(e,i):this.onHomeKey(e),e.preventDefault()}arrowUpKey(e){let i=this.findPrevPanel(this.findPanel(e.currentTarget));i?this.changeFocusedPanel(e,i):this.onEndKey(e),e.preventDefault()}onHomeKey(e){let i=this.findFirstPanel();this.changeFocusedPanel(e,i),e.preventDefault()}onEndKey(e){let i=this.findLastPanel();this.changeFocusedPanel(e,i),e.preventDefault()}onEnterKey(e){this.disabled()||this.changeActiveValue(),e.preventDefault()}static \u0275fac=(()=>{let e;return function(t){return(e||(e=D(n)))(t||n)}})();static \u0275cmp=y({type:n,selectors:[["p-accordion-header"],["p-accordionheader"]],contentQueries:function(i,t,a){if(i&1&&he(a,je,5),i&2){let f;ge(f=ve())&&(t.toggleicon=f.first)}},hostVars:12,hostBindings:function(i,t){i&1&&M("click",function(f){return t.onClick(f)})("focus",function(f){return t.onFocus(f)})("keydown",function(f){return t.onKeydown(f)}),i&2&&(v("id",t.id())("aria-expanded",t.active())("aria-controls",t.ariaControls())("aria-disabled",t.disabled())("role","button")("tabindex",t.disabled()?"-1":"0")("data-p-active",t.active())("data-p-disabled",t.disabled()),m(t.cx("header")),be("user-select","none"))},features:[O([b,{provide:ke,useExisting:n},{provide:q,useExisting:n}]),k([L,p]),P],ngContentSelectors:Q,decls:3,vars:1,consts:[[4,"ngTemplateOutlet","ngTemplateOutletContext"],[4,"ngIf"],[3,"class","pBind",4,"ngIf"],["data-p-icon","chevron-up",3,"class","pBind",4,"ngIf"],[3,"pBind"],["data-p-icon","chevron-up",3,"pBind"],["data-p-icon","chevron-down",3,"pBind",4,"ngIf"],["data-p-icon","chevron-down",3,"pBind"]],template:function(i,t){i&1&&(B(),S(0),ue(1,Ue,1,4)(2,Ye,2,2)),i&2&&(d(),me(t.toggleicon?1:2))},dependencies:[C,Ce,xe,Ee,Fe,x,p],encapsulation:2,changeDetection:0})}return n})(),ce=(()=>{class n extends V{$pcAccordionContent=r(Me,{optional:!0,skipSelf:!0})??void 0;bindDirectiveInstance=r(p,{self:!0});onAfterViewChecked(){this.bindDirectiveInstance.setAttrs(this.ptm("root"))}pcAccordion=r(I(()=>H));pcAccordionPanel=r(I(()=>j));active=h(()=>this.pcAccordionPanel.active());ariaLabelledby=h(()=>`${this.pcAccordion.id()}_accordionheader_${this.pcAccordionPanel.value()}`);id=h(()=>`${this.pcAccordion.id()}_accordioncontent_${this.pcAccordionPanel.value()}`);_componentStyle=r(b);ptParams=h(()=>({context:this.active()}));static \u0275fac=(()=>{let e;return function(t){return(e||(e=D(n)))(t||n)}})();static \u0275cmp=y({type:n,selectors:[["p-accordion-content"],["p-accordioncontent"]],hostVars:6,hostBindings:function(i,t){i&2&&(v("id",t.id())("role","region")("data-p-active",t.active())("aria-labelledby",t.ariaLabelledby()),m(t.cx("contentContainer")))},features:[O([b,{provide:Me,useExisting:n},{provide:q,useExisting:n}]),k([p]),P],ngContentSelectors:Q,decls:2,vars:12,consts:[[3,"pBind"]],template:function(i,t){i&1&&(B(),s(0,"div",0),S(1),u()),i&2&&(m(t.cx("content")),c("@content",t.active()?F(6,Ze,F(4,Te,t.pcAccordion.transitionOptions)):F(10,en,F(8,Te,t.pcAccordion.transitionOptions)))("pBind",t.ptm("content",t.ptParams())))},dependencies:[C,x,p],encapsulation:2,data:{animation:[Ie("content",[ne("hidden",ee({height:"0",paddingBlockStart:"0",paddingBlockEnd:"0",borderBlockStartWidth:"0",borderBlockEndWidth:"0",visibility:"hidden"})),ne("visible",ee({height:"*"})),te("visible <=> hidden",[Z("{{transitionParams}}")]),te("void => *",Z(0))])]},changeDetection:0})}return n})(),H=(()=>{class n extends V{$pcAccordion=r(Be,{optional:!0,skipSelf:!0})??void 0;bindDirectiveInstance=r(p,{self:!0});onAfterViewChecked(){this.bindDirectiveInstance.setAttrs(this.ptm("root"))}value=Y(void 0);multiple=R(!1,{transform:e=>U(e)});styleClass;expandIcon;collapseIcon;selectOnFocus=R(!1,{transform:e=>U(e)});transitionOptions="400ms cubic-bezier(0.86, 0, 0.07, 1)";onClose=new G;onOpen=new G;id=pe(we("pn_id_"));_componentStyle=r(b);onKeydown(e){switch(e.code){case"ArrowDown":this.onTabArrowDownKey(e);break;case"ArrowUp":this.onTabArrowUpKey(e);break;case"Home":e.shiftKey||this.onTabHomeKey(e);break;case"End":e.shiftKey||this.onTabEndKey(e);break}}onTabArrowDownKey(e){let i=this.findNextHeaderAction(e.target.parentElement);i?this.changeFocusedTab(i):this.onTabHomeKey(e),e.preventDefault()}onTabArrowUpKey(e){let i=this.findPrevHeaderAction(e.target.parentElement);i?this.changeFocusedTab(i):this.onTabEndKey(e),e.preventDefault()}onTabHomeKey(e){let i=this.findFirstHeaderAction();this.changeFocusedTab(i),e.preventDefault()}changeFocusedTab(e){e&&ie(e)}findNextHeaderAction(e,i=!1){let t=i?e:e.nextElementSibling,a=N(t,'[data-pc-section="accordionheader"]');return a?K(a,"data-p-disabled")?this.findNextHeaderAction(a.parentElement):N(a.parentElement,'[data-pc-section="accordionheader"]'):null}findPrevHeaderAction(e,i=!1){let t=i?e:e.previousElementSibling,a=N(t,'[data-pc-section="accordionheader"]');return a?K(a,"data-p-disabled")?this.findPrevHeaderAction(a.parentElement):N(a.parentElement,'[data-pc-section="accordionheader"]'):null}findFirstHeaderAction(){let e=this.el.nativeElement.firstElementChild;return this.findNextHeaderAction(e,!0)}findLastHeaderAction(){let e=this.el.nativeElement.lastElementChild;return this.findPrevHeaderAction(e,!0)}onTabEndKey(e){let i=this.findLastHeaderAction();this.changeFocusedTab(i),e.preventDefault()}getBlockableElement(){return this.el.nativeElement.children[0]}updateValue(e){let i=this.value();if(this.multiple()){let t=Array.isArray(i)?[...i]:[],a=t.indexOf(e);a!==-1?t.splice(a,1):t.push(e),this.value.set(t)}else i===e?this.value.set(void 0):this.value.set(e)}static \u0275fac=(()=>{let e;return function(t){return(e||(e=D(n)))(t||n)}})();static \u0275cmp=y({type:n,selectors:[["p-accordion"]],hostVars:2,hostBindings:function(i,t){i&1&&M("keydown",function(f){return t.onKeydown(f)}),i&2&&m(t.cn(t.cx("root"),t.styleClass))},inputs:{value:[1,"value"],multiple:[1,"multiple"],styleClass:"styleClass",expandIcon:"expandIcon",collapseIcon:"collapseIcon",selectOnFocus:[1,"selectOnFocus"],transitionOptions:"transitionOptions"},outputs:{value:"valueChange",onClose:"onClose",onOpen:"onOpen"},features:[O([b,{provide:Be,useExisting:n},{provide:q,useExisting:n}]),k([p]),P],ngContentSelectors:Q,decls:1,vars:0,template:function(i,t){i&1&&(B(),S(0))},dependencies:[C,$,x],encapsulation:2,changeDetection:0})}return n})(),Se=(()=>{class n{static \u0275fac=function(i){return new(i||n)};static \u0275mod=E({type:n});static \u0275inj=w({imports:[H,$,j,re,ce,x,$,x]})}return n})();var an=(n,o)=>({"bg-primary":n,"hover:surface-hover":o});function rn(n,o){if(n&1){let e=fe();s(0,"li",10),M("click",function(){let t=se(e).index,a=l();return le(a.changeItem(t))}),s(1,"a",11),A(2,"i",12),s(3,"span"),_(4),u()()()}if(n&2){let e=o.$implicit,i=o.index,t=l();d(),c("ngClass",ye(4,an,t.activeIndex===i,t.activeIndex!==i)),d(),m(e.icon),d(2),X(e.label)}}function cn(n,o){if(n&1&&(s(0,"p-accordion-panel",13)(1,"p-accordion-header"),_(2),u(),s(3,"p-accordion-content")(4,"p",14),_(5,"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."),u()()()),n&2){let e=o.$implicit,i=o.index;c("value",i),d(2),X(e)}}var Oe=(()=>{let o=class o{constructor(){this.items=[],this.activeIndex=0}ngOnInit(){this.items=[{label:"General",icon:"pi pi-fw pi-info-circle",questions:["Is there a trial period?","Do I need to sign up with credit card?","Is the subscription monthly or annual?","How many tiers are there?"]},{label:"Mailing",icon:"pi pi-fw pi-envelope",questions:["How do I setup my account?","Is there a limit on mails to send?","What is my inbox size?","How can I add attachements?"]},{label:"Support",icon:"pi pi-fw pi-question-circle",questions:["How can I get support?","What is the response time?","Is there a community forum?","Is live chat available?"]},{label:"Billing",icon:"pi pi-fw pi-credit-card",questions:["Will I receive an invoice?","How to provide my billing information?","Is VAT included?","Can I receive PDF invoices?"]}]}changeItem(i){this.activeIndex=i}};o.\u0275fac=function(t){return new(t||o)},o.\u0275cmp=y({type:o,selectors:[["ng-component"]],standalone:!1,decls:15,vars:2,consts:[[1,"card"],[1,"text-900","font-bold","text-xl","mb-3"],[1,"text-600","line-height-3"],[1,"flex","flex-column","md:flex-row","gap-5"],[1,"card","mb-0","md:w-20rem"],[1,"text-900","block","font-bold","mb-3"],[1,"list-none","m-0","p-0"],["pRipple","","class","mb-2 ",3,"click",4,"ngFor","ngForOf"],[1,"card","flex-1"],[3,"value",4,"ngFor","ngForOf"],["pRipple","",1,"mb-2",3,"click"],[1,"flex","align-items-center","cursor-pointer","select-none","p-3","transition-colors","transition-duration-150","border-round",3,"ngClass"],[1,"mr-2","text-lg"],[3,"value"],[1,"line-height-3","m-0","p-0"]],template:function(t,a){t&1&&(s(0,"div")(1,"div",0)(2,"div",1),_(3,"Frequently Asked Questions"),u(),s(4,"p",2),_(5,"Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit."),u()(),s(6,"div",3)(7,"div",4)(8,"div",5),_(9,"Categories"),u(),s(10,"ul",6),g(11,rn,5,7,"li",7),u()(),s(12,"div",8)(13,"p-accordion"),g(14,cn,6,2,"p-accordion-panel",9),u()()()()),t&2&&(d(11),c("ngForOf",a.items),d(3),c("ngForOf",a.items[a.activeIndex].questions))},dependencies:[Ae,_e,H,j,re,ce,L],encapsulation:2});let n=o;return n})();var Ke=(()=>{let o=class o{};o.\u0275fac=function(t){return new(t||o)},o.\u0275mod=E({type:o}),o.\u0275inj=w({imports:[oe.forChild([{path:"",component:Oe}]),oe]});let n=o;return n})();var jn=(()=>{let o=class o{};o.\u0275fac=function(t){return new(t||o)},o.\u0275mod=E({type:o}),o.\u0275inj=w({imports:[C,Ke,Se,Ne]});let n=o;return n})();export{jn as FaqModule};
