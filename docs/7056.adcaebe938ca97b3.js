"use strict";(self.webpackChunknfc_reserve=self.webpackChunknfc_reserve||[]).push([[7056],{1480:(w,g,o)=>{o.d(g,{Gg:()=>P,cL:()=>E});var n=o(6814),e=o(5879),C=o(6223),h=o(5219),_=o(3714),r=o(8468),m=o(7778);const a=["inputtext"];function c(s,d){1&s&&e.GkF(0)}function f(s,d){if(1&s&&(e.TgZ(0,"span",11),e._uU(1),e.qZA()),2&s){const t=e.oxw().$implicit,l=e.oxw();e.xp6(1),e.Oqu(l.field?l.resolveFieldData(t,l.field):t)}}function T(s,d){if(1&s){const t=e.EpF();e.TgZ(0,"TimesCircleIcon",14),e.NdJ("click",function(i){e.CHM(t);const u=e.oxw(2).index,p=e.oxw();return e.KtG(p.removeItem(i,u))}),e.qZA()}2&s&&e.Q6J("styleClass","p-chips-token-icon")}function v(s,d){}function b(s,d){1&s&&e.YNc(0,v,0,0,"ng-template")}function x(s,d){if(1&s){const t=e.EpF();e.TgZ(0,"span",15),e.NdJ("click",function(i){e.CHM(t);const u=e.oxw(2).index,p=e.oxw();return e.KtG(p.removeItem(i,u))}),e.YNc(1,b,1,0,null,16),e.qZA()}if(2&s){const t=e.oxw(3);e.xp6(1),e.Q6J("ngTemplateOutlet",t.removeTokenIconTemplate)}}function y(s,d){if(1&s&&(e.ynx(0),e.YNc(1,T,1,1,"TimesCircleIcon",12),e.YNc(2,x,2,1,"span",13),e.BQk()),2&s){const t=e.oxw(2);e.xp6(1),e.Q6J("ngIf",!t.removeTokenIconTemplate),e.xp6(1),e.Q6J("ngIf",t.removeTokenIconTemplate)}}const M=function(s){return{$implicit:s}};function k(s,d){if(1&s){const t=e.EpF();e.TgZ(0,"li",7,8),e.NdJ("click",function(i){const p=e.CHM(t).$implicit,I=e.oxw();return e.KtG(I.onItemClick(i,p))}),e.YNc(2,c,1,0,"ng-container",9),e.YNc(3,f,2,1,"span",10),e.YNc(4,y,3,2,"ng-container",6),e.qZA()}if(2&s){const t=d.$implicit,l=e.oxw();e.xp6(2),e.Q6J("ngTemplateOutlet",l.itemTemplate)("ngTemplateOutletContext",e.VKq(4,M,t)),e.xp6(1),e.Q6J("ngIf",!l.itemTemplate),e.xp6(1),e.Q6J("ngIf",!l.disabled)}}function O(s,d){if(1&s){const t=e.EpF();e.TgZ(0,"TimesIcon",14),e.NdJ("click",function(){e.CHM(t);const i=e.oxw(2);return e.KtG(i.clear())}),e.qZA()}2&s&&e.Q6J("styleClass","p-chips-clear-icon")}function D(s,d){}function B(s,d){1&s&&e.YNc(0,D,0,0,"ng-template")}function S(s,d){if(1&s){const t=e.EpF();e.TgZ(0,"span",18),e.NdJ("click",function(){e.CHM(t);const i=e.oxw(2);return e.KtG(i.clear())}),e.YNc(1,B,1,0,null,16),e.qZA()}if(2&s){const t=e.oxw(2);e.xp6(1),e.Q6J("ngTemplateOutlet",t.clearIconTemplate)}}function A(s,d){if(1&s&&(e.TgZ(0,"li"),e.YNc(1,O,1,1,"TimesIcon",12),e.YNc(2,S,2,1,"span",17),e.qZA()),2&s){const t=e.oxw();e.xp6(1),e.Q6J("ngIf",!t.clearIconTemplate),e.xp6(1),e.Q6J("ngIf",t.clearIconTemplate)}}const F=function(s,d){return{"p-inputtext p-chips-multiple-container":!0,"p-focus":s,"p-disabled":d}},R=function(s){return{"p-chips-clearable":s}},L={provide:C.JU,useExisting:(0,e.Gpc)(()=>E),multi:!0};let E=(()=>{class s{document;el;cd;style;styleClass;disabled;field;placeholder;max;ariaLabelledBy;tabindex;inputId;allowDuplicate=!0;inputStyle;inputStyleClass;addOnTab;addOnBlur;separator;showClear=!1;onAdd=new e.vpe;onRemove=new e.vpe;onFocus=new e.vpe;onBlur=new e.vpe;onChipClick=new e.vpe;onClear=new e.vpe;inputViewChild;templates;itemTemplate;removeTokenIconTemplate;clearIconTemplate;value;onModelChange=()=>{};onModelTouched=()=>{};valueChanged;focus;filled;constructor(t,l,i){this.document=t,this.el=l,this.cd=i}ngAfterContentInit(){this.templates.forEach(t=>{switch(t.getType()){case"item":default:this.itemTemplate=t.template;break;case"removetokenicon":this.removeTokenIconTemplate=t.template;break;case"clearicon":this.clearIconTemplate=t.template}}),this.updateFilledState()}onClick(){this.inputViewChild?.nativeElement.focus()}onInput(){this.updateFilledState()}onPaste(t){this.disabled||(this.separator&&((t.clipboardData||this.document.defaultView.clipboardData).getData("Text").split(this.separator).forEach(i=>{this.addItem(t,i,!0)}),this.inputViewChild.nativeElement.value=""),this.updateFilledState())}updateFilledState(){this.filled=!(!this.value||0===this.value.length)||this.inputViewChild&&this.inputViewChild.nativeElement&&""!=this.inputViewChild.nativeElement.value}onItemClick(t,l){this.onChipClick.emit({originalEvent:t,value:l})}writeValue(t){this.value=t,this.updateMaxedOut(),this.updateFilledState(),this.cd.markForCheck()}registerOnChange(t){this.onModelChange=t}registerOnTouched(t){this.onModelTouched=t}setDisabledState(t){this.disabled=t,this.cd.markForCheck()}resolveFieldData(t,l){if(t&&l){if(-1==l.indexOf("."))return t[l];{let p=l.split("."),I=t;for(var i=0,u=p.length;i<u;++i)I=I[p[i]];return I}}return null}onInputFocus(t){this.focus=!0,this.onFocus.emit(t)}onInputBlur(t){this.focus=!1,this.addOnBlur&&this.inputViewChild.nativeElement.value&&this.addItem(t,this.inputViewChild.nativeElement.value,!1),this.onModelTouched(),this.onBlur.emit(t)}removeItem(t,l){if(this.disabled)return;let i=this.value[l];this.value=this.value.filter((u,p)=>p!=l),this.onModelChange(this.value),this.onRemove.emit({originalEvent:t,value:i}),this.updateFilledState(),this.updateMaxedOut()}addItem(t,l,i){this.value=this.value||[],l&&l.trim().length&&(this.allowDuplicate||-1===this.value.indexOf(l))&&(this.value=[...this.value,l],this.onModelChange(this.value),this.onAdd.emit({originalEvent:t,value:l})),this.updateFilledState(),this.updateMaxedOut(),this.inputViewChild.nativeElement.value="",i&&t.preventDefault()}clear(){this.value=null,this.updateFilledState(),this.onModelChange(this.value),this.onClear.emit()}onKeydown(t){switch(t.which){case 8:if(0===this.inputViewChild.nativeElement.value.length&&this.value&&this.value.length>0){this.value=[...this.value];let l=this.value.pop();this.onModelChange(this.value),this.onRemove.emit({originalEvent:t,value:l}),this.updateFilledState()}break;case 13:this.addItem(t,this.inputViewChild.nativeElement.value,!0);break;case 9:this.addOnTab&&""!==this.inputViewChild.nativeElement.value&&this.addItem(t,this.inputViewChild.nativeElement.value,!0);break;default:this.max&&this.value&&this.max===this.value.length?t.preventDefault():this.separator&&(this.separator===t.key||t.key.match(this.separator))&&this.addItem(t,this.inputViewChild.nativeElement.value,!0)}}updateMaxedOut(){this.inputViewChild&&this.inputViewChild.nativeElement&&(this.max&&this.value&&this.max===this.value.length?(this.inputViewChild.nativeElement.blur(),this.inputViewChild.nativeElement.disabled=!0):(this.disabled&&this.inputViewChild.nativeElement.blur(),this.inputViewChild.nativeElement.disabled=this.disabled||!1))}static \u0275fac=function(l){return new(l||s)(e.Y36(n.K0),e.Y36(e.SBq),e.Y36(e.sBO))};static \u0275cmp=e.Xpm({type:s,selectors:[["p-chips"]],contentQueries:function(l,i,u){if(1&l&&e.Suo(u,h.jx,4),2&l){let p;e.iGM(p=e.CRH())&&(i.templates=p)}},viewQuery:function(l,i){if(1&l&&e.Gf(a,5),2&l){let u;e.iGM(u=e.CRH())&&(i.inputViewChild=u.first)}},hostAttrs:[1,"p-element","p-inputwrapper"],hostVars:6,hostBindings:function(l,i){2&l&&e.ekj("p-inputwrapper-filled",i.filled)("p-inputwrapper-focus",i.focus)("p-chips-clearable",i.showClear)},inputs:{style:"style",styleClass:"styleClass",disabled:"disabled",field:"field",placeholder:"placeholder",max:"max",ariaLabelledBy:"ariaLabelledBy",tabindex:"tabindex",inputId:"inputId",allowDuplicate:"allowDuplicate",inputStyle:"inputStyle",inputStyleClass:"inputStyleClass",addOnTab:"addOnTab",addOnBlur:"addOnBlur",separator:"separator",showClear:"showClear"},outputs:{onAdd:"onAdd",onRemove:"onRemove",onFocus:"onFocus",onBlur:"onBlur",onChipClick:"onChipClick",onClear:"onClear"},features:[e._Bn([L])],decls:7,vars:21,consts:[[3,"ngClass","ngStyle","click"],[3,"ngClass"],["class","p-chips-token",3,"click",4,"ngFor","ngForOf"],[1,"p-chips-input-token",3,"ngClass"],["type","text",3,"disabled","ngStyle","keydown","input","paste","focus","blur"],["inputtext",""],[4,"ngIf"],[1,"p-chips-token",3,"click"],["token",""],[4,"ngTemplateOutlet","ngTemplateOutletContext"],["class","p-chips-token-label",4,"ngIf"],[1,"p-chips-token-label"],[3,"styleClass","click",4,"ngIf"],["class","p-chips-token-icon",3,"click",4,"ngIf"],[3,"styleClass","click"],[1,"p-chips-token-icon",3,"click"],[4,"ngTemplateOutlet"],["class","p-chips-clear-icon",3,"click",4,"ngIf"],[1,"p-chips-clear-icon",3,"click"]],template:function(l,i){1&l&&(e.TgZ(0,"div",0),e.NdJ("click",function(){return i.onClick()}),e.TgZ(1,"ul",1),e.YNc(2,k,5,6,"li",2),e.TgZ(3,"li",3)(4,"input",4,5),e.NdJ("keydown",function(p){return i.onKeydown(p)})("input",function(){return i.onInput()})("paste",function(p){return i.onPaste(p)})("focus",function(p){return i.onInputFocus(p)})("blur",function(p){return i.onInputBlur(p)}),e.qZA()(),e.YNc(6,A,3,2,"li",6),e.qZA()()),2&l&&(e.Tol(i.styleClass),e.Q6J("ngClass","p-chips p-component")("ngStyle",i.style),e.xp6(1),e.Q6J("ngClass",e.WLB(16,F,i.focus,i.disabled)),e.xp6(1),e.Q6J("ngForOf",i.value),e.xp6(1),e.Q6J("ngClass",e.VKq(19,R,i.showClear&&!i.disabled)),e.xp6(1),e.Tol(i.inputStyleClass),e.Q6J("disabled",i.disabled)("ngStyle",i.inputStyle),e.uIk("id",i.inputId)("placeholder",i.value&&i.value.length?null:i.placeholder)("tabindex",i.tabindex)("aria-labelledby",i.ariaLabelledBy),e.xp6(2),e.Q6J("ngIf",null!=i.value&&i.filled&&!i.disabled&&i.showClear))},dependencies:function(){return[n.mk,n.sg,n.O5,n.tP,n.PC,r.x,m.q]},styles:[".p-chips{display:inline-flex}.p-chips-multiple-container{margin:0;padding:0;list-style-type:none;cursor:text;overflow:hidden;display:flex;align-items:center;flex-wrap:wrap}.p-chips-token{cursor:default;display:inline-flex;align-items:center;flex:0 0 auto;max-width:100%}.p-chips-token-label{min-width:0%;overflow:auto}.p-chips-token-label::-webkit-scrollbar{display:none}.p-chips-input-token{flex:1 1 auto;display:inline-flex}.p-chips-token-icon{cursor:pointer}.p-chips-input-token input{border:0 none;outline:0 none;background-color:transparent;margin:0;padding:0;box-shadow:none;border-radius:0;width:100%}.p-fluid .p-chips{display:flex}.p-chips-clear-icon{position:absolute;top:50%;margin-top:-.5rem;cursor:pointer}.p-chips-clearable .p-inputtext{position:relative}\n"],encapsulation:2,changeDetection:0})}return s})(),P=(()=>{class s{static \u0275fac=function(l){return new(l||s)};static \u0275mod=e.oAB({type:s});static \u0275inj=e.cJS({imports:[n.ez,_.j,h.m8,r.x,m.q,_.j,h.m8]})}return s})()},1239:(w,g,o)=>{o.d(g,{o:()=>C});var n=o(5879),e=o(4713);let C=(()=>{class h extends e.s{static \u0275fac=function(){let r;return function(a){return(r||(r=n.n5z(h)))(a||h)}}();static \u0275cmp=n.Xpm({type:h,selectors:[["AngleRightIcon"]],standalone:!0,features:[n.qOj,n.jDz],decls:2,vars:5,consts:[["width","14","height","14","viewBox","0 0 14 14","fill","none","xmlns","http://www.w3.org/2000/svg"],["d","M5.25 11.1728C5.14929 11.1694 5.05033 11.1455 4.9592 11.1025C4.86806 11.0595 4.78666 10.9984 4.72 10.9228C4.57955 10.7822 4.50066 10.5916 4.50066 10.3928C4.50066 10.1941 4.57955 10.0035 4.72 9.86283L7.72 6.86283L4.72 3.86283C4.66067 3.71882 4.64765 3.55991 4.68275 3.40816C4.71785 3.25642 4.79932 3.11936 4.91585 3.01602C5.03238 2.91268 5.17819 2.84819 5.33305 2.83149C5.4879 2.81479 5.64411 2.84671 5.78 2.92283L9.28 6.42283C9.42045 6.56346 9.49934 6.75408 9.49934 6.95283C9.49934 7.15158 9.42045 7.34221 9.28 7.48283L5.78 10.9228C5.71333 10.9984 5.63193 11.0595 5.5408 11.1025C5.44966 11.1455 5.35071 11.1694 5.25 11.1728Z","fill","currentColor"]],template:function(m,a){1&m&&(n.O4$(),n.TgZ(0,"svg",0),n._UZ(1,"path",1),n.qZA()),2&m&&(n.Tol(a.getClassNames()),n.uIk("aria-label",a.ariaLabel)("aria-hidden",a.ariaHidden)("role",a.role))},encapsulation:2})}return h})()},8468:(w,g,o)=>{o.d(g,{x:()=>h});var n=o(5879),e=o(4713),C=o(2332);let h=(()=>{class _ extends e.s{pathId;ngOnInit(){this.pathId="url(#"+(0,C.Th)()+")"}static \u0275fac=function(){let m;return function(c){return(m||(m=n.n5z(_)))(c||_)}}();static \u0275cmp=n.Xpm({type:_,selectors:[["TimesCircleIcon"]],standalone:!0,features:[n.qOj,n.jDz],decls:6,vars:7,consts:[["width","14","height","14","viewBox","0 0 14 14","fill","none","xmlns","http://www.w3.org/2000/svg"],["fill-rule","evenodd","clip-rule","evenodd","d","M7 14C5.61553 14 4.26215 13.5895 3.11101 12.8203C1.95987 12.0511 1.06266 10.9579 0.532846 9.67879C0.00303296 8.3997 -0.13559 6.99224 0.134506 5.63437C0.404603 4.2765 1.07129 3.02922 2.05026 2.05026C3.02922 1.07129 4.2765 0.404603 5.63437 0.134506C6.99224 -0.13559 8.3997 0.00303296 9.67879 0.532846C10.9579 1.06266 12.0511 1.95987 12.8203 3.11101C13.5895 4.26215 14 5.61553 14 7C14 8.85652 13.2625 10.637 11.9497 11.9497C10.637 13.2625 8.85652 14 7 14ZM7 1.16667C5.84628 1.16667 4.71846 1.50879 3.75918 2.14976C2.79989 2.79074 2.05222 3.70178 1.61071 4.76768C1.16919 5.83358 1.05367 7.00647 1.27876 8.13803C1.50384 9.26958 2.05941 10.309 2.87521 11.1248C3.69102 11.9406 4.73042 12.4962 5.86198 12.7212C6.99353 12.9463 8.16642 12.8308 9.23232 12.3893C10.2982 11.9478 11.2093 11.2001 11.8502 10.2408C12.4912 9.28154 12.8333 8.15373 12.8333 7C12.8333 5.45291 12.2188 3.96918 11.1248 2.87521C10.0308 1.78125 8.5471 1.16667 7 1.16667ZM4.66662 9.91668C4.58998 9.91704 4.51404 9.90209 4.44325 9.87271C4.37246 9.84333 4.30826 9.8001 4.2544 9.74557C4.14516 9.6362 4.0838 9.48793 4.0838 9.33335C4.0838 9.17876 4.14516 9.0305 4.2544 8.92113L6.17553 7L4.25443 5.07891C4.15139 4.96832 4.09529 4.82207 4.09796 4.67094C4.10063 4.51982 4.16185 4.37563 4.26872 4.26876C4.3756 4.16188 4.51979 4.10066 4.67091 4.09799C4.82204 4.09532 4.96829 4.15142 5.07887 4.25446L6.99997 6.17556L8.92106 4.25446C9.03164 4.15142 9.1779 4.09532 9.32903 4.09799C9.48015 4.10066 9.62434 4.16188 9.73121 4.26876C9.83809 4.37563 9.89931 4.51982 9.90198 4.67094C9.90464 4.82207 9.84855 4.96832 9.74551 5.07891L7.82441 7L9.74554 8.92113C9.85478 9.0305 9.91614 9.17876 9.91614 9.33335C9.91614 9.48793 9.85478 9.6362 9.74554 9.74557C9.69168 9.8001 9.62748 9.84333 9.55669 9.87271C9.4859 9.90209 9.40996 9.91704 9.33332 9.91668C9.25668 9.91704 9.18073 9.90209 9.10995 9.87271C9.03916 9.84333 8.97495 9.8001 8.9211 9.74557L6.99997 7.82444L5.07884 9.74557C5.02499 9.8001 4.96078 9.84333 4.88999 9.87271C4.81921 9.90209 4.74326 9.91704 4.66662 9.91668Z","fill","currentColor"],[3,"id"],["width","14","height","14","fill","white"]],template:function(a,c){1&a&&(n.O4$(),n.TgZ(0,"svg",0)(1,"g"),n._UZ(2,"path",1),n.qZA(),n.TgZ(3,"defs")(4,"clipPath",2),n._UZ(5,"rect",3),n.qZA()()()),2&a&&(n.Tol(c.getClassNames()),n.uIk("aria-label",c.ariaLabel)("aria-hidden",c.ariaHidden)("role",c.role),n.xp6(1),n.uIk("clip-path",c.pathId),n.xp6(3),n.Q6J("id",c.pathId))},encapsulation:2})}return _})()},6218:(w,g,o)=>{o.d(g,{A:()=>_,g:()=>h});var n=o(5879),e=o(6814),C=o(6223);let h=(()=>{class r{el;ngModel;control;cd;autoResize;onResize=new n.vpe;filled;cachedScrollHeight;ngModelSubscription;ngControlSubscription;constructor(a,c,f,T){this.el=a,this.ngModel=c,this.control=f,this.cd=T}ngOnInit(){this.ngModel&&(this.ngModelSubscription=this.ngModel.valueChanges.subscribe(()=>{this.updateState()})),this.control&&(this.ngControlSubscription=this.control.valueChanges.subscribe(()=>{this.updateState()}))}ngAfterViewInit(){this.autoResize&&this.resize(),this.updateFilledState(),this.cd.detectChanges()}onInput(a){this.updateState()}updateFilledState(){this.filled=this.el.nativeElement.value&&this.el.nativeElement.value.length}onFocus(a){this.autoResize&&this.resize(a)}onBlur(a){this.autoResize&&this.resize(a)}resize(a){this.el.nativeElement.style.height="auto",this.el.nativeElement.style.height=this.el.nativeElement.scrollHeight+"px",parseFloat(this.el.nativeElement.style.height)>=parseFloat(this.el.nativeElement.style.maxHeight)?(this.el.nativeElement.style.overflowY="scroll",this.el.nativeElement.style.height=this.el.nativeElement.style.maxHeight):this.el.nativeElement.style.overflow="hidden",this.onResize.emit(a||{})}updateState(){this.updateFilledState(),this.autoResize&&this.resize()}ngOnDestroy(){this.ngModelSubscription&&this.ngModelSubscription.unsubscribe(),this.ngControlSubscription&&this.ngControlSubscription.unsubscribe()}static \u0275fac=function(c){return new(c||r)(n.Y36(n.SBq),n.Y36(C.On,8),n.Y36(C.a5,8),n.Y36(n.sBO))};static \u0275dir=n.lG2({type:r,selectors:[["","pInputTextarea",""]],hostAttrs:[1,"p-inputtextarea","p-inputtext","p-component","p-element"],hostVars:4,hostBindings:function(c,f){1&c&&n.NdJ("input",function(v){return f.onInput(v)})("focus",function(v){return f.onFocus(v)})("blur",function(v){return f.onBlur(v)}),2&c&&n.ekj("p-filled",f.filled)("p-inputtextarea-resizable",f.autoResize)},inputs:{autoResize:"autoResize"},outputs:{onResize:"onResize"}})}return r})(),_=(()=>{class r{static \u0275fac=function(c){return new(c||r)};static \u0275mod=n.oAB({type:r});static \u0275inj=n.cJS({imports:[e.ez]})}return r})()}}]);