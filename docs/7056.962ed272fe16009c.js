"use strict";(self.webpackChunkapollo_ng=self.webpackChunkapollo_ng||[]).push([[7056],{1480:(w,v,u)=>{u.d(v,{Gg:()=>V,cL:()=>b});var s=u(6814),e=u(4769),f=u(95),d=u(5219),I=u(3714),c=u(8468),g=u(7778);const o=["inputtext"];function h(l,r){1&l&&e.GkF(0)}function _(l,r){if(1&l&&(e.TgZ(0,"span",11),e._uU(1),e.qZA()),2&l){const t=e.oxw().$implicit,n=e.oxw();e.xp6(1),e.Oqu(n.field?n.resolveFieldData(t,n.field):t)}}function C(l,r){if(1&l){const t=e.EpF();e.TgZ(0,"TimesCircleIcon",14),e.NdJ("click",function(i){e.CHM(t);const p=e.oxw(2).index,a=e.oxw();return e.KtG(a.removeItem(i,p))}),e.qZA()}2&l&&e.Q6J("styleClass","p-chips-token-icon")}function m(l,r){}function x(l,r){1&l&&e.YNc(0,m,0,0,"ng-template")}function E(l,r){if(1&l){const t=e.EpF();e.TgZ(0,"span",15),e.NdJ("click",function(i){e.CHM(t);const p=e.oxw(2).index,a=e.oxw();return e.KtG(a.removeItem(i,p))}),e.YNc(1,x,1,0,null,16),e.qZA()}if(2&l){const t=e.oxw(3);e.xp6(1),e.Q6J("ngTemplateOutlet",t.removeTokenIconTemplate)}}function y(l,r){if(1&l&&(e.ynx(0),e.YNc(1,C,1,1,"TimesCircleIcon",12),e.YNc(2,E,2,1,"span",13),e.BQk()),2&l){const t=e.oxw(2);e.xp6(1),e.Q6J("ngIf",!t.removeTokenIconTemplate),e.xp6(1),e.Q6J("ngIf",t.removeTokenIconTemplate)}}const k=function(l){return{$implicit:l}};function M(l,r){if(1&l){const t=e.EpF();e.TgZ(0,"li",7,8),e.NdJ("click",function(i){const a=e.CHM(t).$implicit,T=e.oxw();return e.KtG(T.onItemClick(i,a))}),e.YNc(2,h,1,0,"ng-container",9),e.YNc(3,_,2,1,"span",10),e.YNc(4,y,3,2,"ng-container",6),e.qZA()}if(2&l){const t=r.$implicit,n=e.oxw();e.xp6(2),e.Q6J("ngTemplateOutlet",n.itemTemplate)("ngTemplateOutletContext",e.VKq(4,k,t)),e.xp6(1),e.Q6J("ngIf",!n.itemTemplate),e.xp6(1),e.Q6J("ngIf",!n.disabled)}}function O(l,r){if(1&l){const t=e.EpF();e.TgZ(0,"TimesIcon",14),e.NdJ("click",function(){e.CHM(t);const i=e.oxw(2);return e.KtG(i.clear())}),e.qZA()}2&l&&e.Q6J("styleClass","p-chips-clear-icon")}function D(l,r){}function B(l,r){1&l&&e.YNc(0,D,0,0,"ng-template")}function S(l,r){if(1&l){const t=e.EpF();e.TgZ(0,"span",18),e.NdJ("click",function(){e.CHM(t);const i=e.oxw(2);return e.KtG(i.clear())}),e.YNc(1,B,1,0,null,16),e.qZA()}if(2&l){const t=e.oxw(2);e.xp6(1),e.Q6J("ngTemplateOutlet",t.clearIconTemplate)}}function F(l,r){if(1&l&&(e.TgZ(0,"li"),e.YNc(1,O,1,1,"TimesIcon",12),e.YNc(2,S,2,1,"span",17),e.qZA()),2&l){const t=e.oxw();e.xp6(1),e.Q6J("ngIf",!t.clearIconTemplate),e.xp6(1),e.Q6J("ngIf",t.clearIconTemplate)}}const A=function(l,r){return{"p-inputtext p-chips-multiple-container":!0,"p-focus":l,"p-disabled":r}},R=function(l){return{"p-chips-clearable":l}},P={provide:f.JU,useExisting:(0,e.Gpc)(()=>b),multi:!0};let b=(()=>{class l{document;el;cd;style;styleClass;disabled;field;placeholder;max;ariaLabelledBy;tabindex;inputId;allowDuplicate=!0;inputStyle;inputStyleClass;addOnTab;addOnBlur;separator;showClear=!1;onAdd=new e.vpe;onRemove=new e.vpe;onFocus=new e.vpe;onBlur=new e.vpe;onChipClick=new e.vpe;onClear=new e.vpe;inputViewChild;templates;itemTemplate;removeTokenIconTemplate;clearIconTemplate;value;onModelChange=()=>{};onModelTouched=()=>{};valueChanged;focus;filled;constructor(t,n,i){this.document=t,this.el=n,this.cd=i}ngAfterContentInit(){this.templates.forEach(t=>{switch(t.getType()){case"item":default:this.itemTemplate=t.template;break;case"removetokenicon":this.removeTokenIconTemplate=t.template;break;case"clearicon":this.clearIconTemplate=t.template}}),this.updateFilledState()}onClick(){this.inputViewChild?.nativeElement.focus()}onInput(){this.updateFilledState()}onPaste(t){this.disabled||(this.separator&&((t.clipboardData||this.document.defaultView.clipboardData).getData("Text").split(this.separator).forEach(i=>{this.addItem(t,i,!0)}),this.inputViewChild.nativeElement.value=""),this.updateFilledState())}updateFilledState(){this.filled=!(!this.value||0===this.value.length)||this.inputViewChild&&this.inputViewChild.nativeElement&&""!=this.inputViewChild.nativeElement.value}onItemClick(t,n){this.onChipClick.emit({originalEvent:t,value:n})}writeValue(t){this.value=t,this.updateMaxedOut(),this.updateFilledState(),this.cd.markForCheck()}registerOnChange(t){this.onModelChange=t}registerOnTouched(t){this.onModelTouched=t}setDisabledState(t){this.disabled=t,this.cd.markForCheck()}resolveFieldData(t,n){if(t&&n){if(-1==n.indexOf("."))return t[n];{let a=n.split("."),T=t;for(var i=0,p=a.length;i<p;++i)T=T[a[i]];return T}}return null}onInputFocus(t){this.focus=!0,this.onFocus.emit(t)}onInputBlur(t){this.focus=!1,this.addOnBlur&&this.inputViewChild.nativeElement.value&&this.addItem(t,this.inputViewChild.nativeElement.value,!1),this.onModelTouched(),this.onBlur.emit(t)}removeItem(t,n){if(this.disabled)return;let i=this.value[n];this.value=this.value.filter((p,a)=>a!=n),this.onModelChange(this.value),this.onRemove.emit({originalEvent:t,value:i}),this.updateFilledState(),this.updateMaxedOut()}addItem(t,n,i){this.value=this.value||[],n&&n.trim().length&&(this.allowDuplicate||-1===this.value.indexOf(n))&&(this.value=[...this.value,n],this.onModelChange(this.value),this.onAdd.emit({originalEvent:t,value:n})),this.updateFilledState(),this.updateMaxedOut(),this.inputViewChild.nativeElement.value="",i&&t.preventDefault()}clear(){this.value=null,this.updateFilledState(),this.onModelChange(this.value),this.onClear.emit()}onKeydown(t){switch(t.which){case 8:if(0===this.inputViewChild.nativeElement.value.length&&this.value&&this.value.length>0){this.value=[...this.value];let n=this.value.pop();this.onModelChange(this.value),this.onRemove.emit({originalEvent:t,value:n}),this.updateFilledState()}break;case 13:this.addItem(t,this.inputViewChild.nativeElement.value,!0);break;case 9:this.addOnTab&&""!==this.inputViewChild.nativeElement.value&&this.addItem(t,this.inputViewChild.nativeElement.value,!0);break;default:this.max&&this.value&&this.max===this.value.length?t.preventDefault():this.separator&&(this.separator===t.key||t.key.match(this.separator))&&this.addItem(t,this.inputViewChild.nativeElement.value,!0)}}updateMaxedOut(){this.inputViewChild&&this.inputViewChild.nativeElement&&(this.max&&this.value&&this.max===this.value.length?(this.inputViewChild.nativeElement.blur(),this.inputViewChild.nativeElement.disabled=!0):(this.disabled&&this.inputViewChild.nativeElement.blur(),this.inputViewChild.nativeElement.disabled=this.disabled||!1))}static \u0275fac=function(n){return new(n||l)(e.Y36(s.K0),e.Y36(e.SBq),e.Y36(e.sBO))};static \u0275cmp=e.Xpm({type:l,selectors:[["p-chips"]],contentQueries:function(n,i,p){if(1&n&&e.Suo(p,d.jx,4),2&n){let a;e.iGM(a=e.CRH())&&(i.templates=a)}},viewQuery:function(n,i){if(1&n&&e.Gf(o,5),2&n){let p;e.iGM(p=e.CRH())&&(i.inputViewChild=p.first)}},hostAttrs:[1,"p-element","p-inputwrapper"],hostVars:6,hostBindings:function(n,i){2&n&&e.ekj("p-inputwrapper-filled",i.filled)("p-inputwrapper-focus",i.focus)("p-chips-clearable",i.showClear)},inputs:{style:"style",styleClass:"styleClass",disabled:"disabled",field:"field",placeholder:"placeholder",max:"max",ariaLabelledBy:"ariaLabelledBy",tabindex:"tabindex",inputId:"inputId",allowDuplicate:"allowDuplicate",inputStyle:"inputStyle",inputStyleClass:"inputStyleClass",addOnTab:"addOnTab",addOnBlur:"addOnBlur",separator:"separator",showClear:"showClear"},outputs:{onAdd:"onAdd",onRemove:"onRemove",onFocus:"onFocus",onBlur:"onBlur",onChipClick:"onChipClick",onClear:"onClear"},features:[e._Bn([P])],decls:7,vars:21,consts:[[3,"ngClass","ngStyle","click"],[3,"ngClass"],["class","p-chips-token",3,"click",4,"ngFor","ngForOf"],[1,"p-chips-input-token",3,"ngClass"],["type","text",3,"disabled","ngStyle","keydown","input","paste","focus","blur"],["inputtext",""],[4,"ngIf"],[1,"p-chips-token",3,"click"],["token",""],[4,"ngTemplateOutlet","ngTemplateOutletContext"],["class","p-chips-token-label",4,"ngIf"],[1,"p-chips-token-label"],[3,"styleClass","click",4,"ngIf"],["class","p-chips-token-icon",3,"click",4,"ngIf"],[3,"styleClass","click"],[1,"p-chips-token-icon",3,"click"],[4,"ngTemplateOutlet"],["class","p-chips-clear-icon",3,"click",4,"ngIf"],[1,"p-chips-clear-icon",3,"click"]],template:function(n,i){1&n&&(e.TgZ(0,"div",0),e.NdJ("click",function(){return i.onClick()}),e.TgZ(1,"ul",1),e.YNc(2,M,5,6,"li",2),e.TgZ(3,"li",3)(4,"input",4,5),e.NdJ("keydown",function(a){return i.onKeydown(a)})("input",function(){return i.onInput()})("paste",function(a){return i.onPaste(a)})("focus",function(a){return i.onInputFocus(a)})("blur",function(a){return i.onInputBlur(a)}),e.qZA()(),e.YNc(6,F,3,2,"li",6),e.qZA()()),2&n&&(e.Tol(i.styleClass),e.Q6J("ngClass","p-chips p-component")("ngStyle",i.style),e.xp6(1),e.Q6J("ngClass",e.WLB(16,A,i.focus,i.disabled)),e.xp6(1),e.Q6J("ngForOf",i.value),e.xp6(1),e.Q6J("ngClass",e.VKq(19,R,i.showClear&&!i.disabled)),e.xp6(1),e.Tol(i.inputStyleClass),e.Q6J("disabled",i.disabled)("ngStyle",i.inputStyle),e.uIk("id",i.inputId)("placeholder",i.value&&i.value.length?null:i.placeholder)("tabindex",i.tabindex)("aria-labelledby",i.ariaLabelledBy),e.xp6(2),e.Q6J("ngIf",null!=i.value&&i.filled&&!i.disabled&&i.showClear))},dependencies:function(){return[s.mk,s.sg,s.O5,s.tP,s.PC,c.x,g.q]},styles:[".p-chips{display:inline-flex}.p-chips-multiple-container{margin:0;padding:0;list-style-type:none;cursor:text;overflow:hidden;display:flex;align-items:center;flex-wrap:wrap}.p-chips-token{cursor:default;display:inline-flex;align-items:center;flex:0 0 auto;max-width:100%}.p-chips-token-label{min-width:0%;overflow:auto}.p-chips-token-label::-webkit-scrollbar{display:none}.p-chips-input-token{flex:1 1 auto;display:inline-flex}.p-chips-token-icon{cursor:pointer}.p-chips-input-token input{border:0 none;outline:0 none;background-color:transparent;margin:0;padding:0;box-shadow:none;border-radius:0;width:100%}.p-fluid .p-chips{display:flex}.p-chips-clear-icon{position:absolute;top:50%;margin-top:-.5rem;cursor:pointer}.p-chips-clearable .p-inputtext{position:relative}\n"],encapsulation:2,changeDetection:0})}return l})(),V=(()=>{class l{static \u0275fac=function(n){return new(n||l)};static \u0275mod=e.oAB({type:l});static \u0275inj=e.cJS({imports:[s.ez,I.j,d.m8,c.x,g.q,I.j,d.m8]})}return l})()},1239:(w,v,u)=>{u.d(v,{o:()=>f});var s=u(4769),e=u(4713);let f=(()=>{class d extends e.s{static \u0275fac=function(){let c;return function(o){return(c||(c=s.n5z(d)))(o||d)}}();static \u0275cmp=s.Xpm({type:d,selectors:[["AngleRightIcon"]],standalone:!0,features:[s.qOj,s.jDz],decls:2,vars:5,consts:[["width","14","height","14","viewBox","0 0 14 14","fill","none","xmlns","http://www.w3.org/2000/svg"],["d","M5.25 11.1728C5.14929 11.1694 5.05033 11.1455 4.9592 11.1025C4.86806 11.0595 4.78666 10.9984 4.72 10.9228C4.57955 10.7822 4.50066 10.5916 4.50066 10.3928C4.50066 10.1941 4.57955 10.0035 4.72 9.86283L7.72 6.86283L4.72 3.86283C4.66067 3.71882 4.64765 3.55991 4.68275 3.40816C4.71785 3.25642 4.79932 3.11936 4.91585 3.01602C5.03238 2.91268 5.17819 2.84819 5.33305 2.83149C5.4879 2.81479 5.64411 2.84671 5.78 2.92283L9.28 6.42283C9.42045 6.56346 9.49934 6.75408 9.49934 6.95283C9.49934 7.15158 9.42045 7.34221 9.28 7.48283L5.78 10.9228C5.71333 10.9984 5.63193 11.0595 5.5408 11.1025C5.44966 11.1455 5.35071 11.1694 5.25 11.1728Z","fill","currentColor"]],template:function(g,o){1&g&&(s.O4$(),s.TgZ(0,"svg",0),s._UZ(1,"path",1),s.qZA()),2&g&&(s.Tol(o.getClassNames()),s.uIk("aria-label",o.ariaLabel)("aria-hidden",o.ariaHidden)("role",o.role))},encapsulation:2})}return d})()},6218:(w,v,u)=>{u.d(v,{A:()=>I,g:()=>d});var s=u(4769),e=u(6814),f=u(95);let d=(()=>{class c{el;ngModel;control;cd;autoResize;onResize=new s.vpe;filled;cachedScrollHeight;ngModelSubscription;ngControlSubscription;constructor(o,h,_,C){this.el=o,this.ngModel=h,this.control=_,this.cd=C}ngOnInit(){this.ngModel&&(this.ngModelSubscription=this.ngModel.valueChanges.subscribe(()=>{this.updateState()})),this.control&&(this.ngControlSubscription=this.control.valueChanges.subscribe(()=>{this.updateState()}))}ngAfterViewInit(){this.autoResize&&this.resize(),this.updateFilledState(),this.cd.detectChanges()}onInput(o){this.updateState()}updateFilledState(){this.filled=this.el.nativeElement.value&&this.el.nativeElement.value.length}onFocus(o){this.autoResize&&this.resize(o)}onBlur(o){this.autoResize&&this.resize(o)}resize(o){this.el.nativeElement.style.height="auto",this.el.nativeElement.style.height=this.el.nativeElement.scrollHeight+"px",parseFloat(this.el.nativeElement.style.height)>=parseFloat(this.el.nativeElement.style.maxHeight)?(this.el.nativeElement.style.overflowY="scroll",this.el.nativeElement.style.height=this.el.nativeElement.style.maxHeight):this.el.nativeElement.style.overflow="hidden",this.onResize.emit(o||{})}updateState(){this.updateFilledState(),this.autoResize&&this.resize()}ngOnDestroy(){this.ngModelSubscription&&this.ngModelSubscription.unsubscribe(),this.ngControlSubscription&&this.ngControlSubscription.unsubscribe()}static \u0275fac=function(h){return new(h||c)(s.Y36(s.SBq),s.Y36(f.On,8),s.Y36(f.a5,8),s.Y36(s.sBO))};static \u0275dir=s.lG2({type:c,selectors:[["","pInputTextarea",""]],hostAttrs:[1,"p-inputtextarea","p-inputtext","p-component","p-element"],hostVars:4,hostBindings:function(h,_){1&h&&s.NdJ("input",function(m){return _.onInput(m)})("focus",function(m){return _.onFocus(m)})("blur",function(m){return _.onBlur(m)}),2&h&&s.ekj("p-filled",_.filled)("p-inputtextarea-resizable",_.autoResize)},inputs:{autoResize:"autoResize"},outputs:{onResize:"onResize"}})}return c})(),I=(()=>{class c{static \u0275fac=function(h){return new(h||c)};static \u0275mod=s.oAB({type:c});static \u0275inj=s.cJS({imports:[e.ez]})}return c})()}}]);