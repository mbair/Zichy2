"use strict";(self.webpackChunknfc_reserve=self.webpackChunknfc_reserve||[]).push([[6897],{219:(H,z,r)=>{r.d(z,{Z:()=>_});var T=r(5619),i=r(7398),M=r(6306),I=r(2096),y=r(2029),C=r(8814);let _=(()=>{class g{constructor(f){this.apiService=f,this.apiURL=f.apiURL,this.data$=new T.X(null),this.message$=new T.X(null)}get conferenceObs(){return this.data$.asObservable()}get messageObs(){return this.message$.asObservable()}get(f,h,c,d){let x="";""!==c&&(x=""!=c.sortField?`sort=${c.sortField}&order=${1===c.sortOrder?"ASC":"DESC"}`:"");const v=""!==x&&""!==d?x+"&"+d:""!==x&&""===d?x:""===x&&""!==d?d:"";this.apiService.get(`conference/get/${f}/${h}${""!==v?"?"+v:""}`).subscribe({next:S=>{this.data$.next(S)},error:S=>{this.message$.next(S)}})}getBySearch(f,h){let c="";""!==h&&(c=""!=h.sortField?`?sort=${h.sortField}&order=${1===h.sortOrder?"ASC":"DESC"}`:""),this.apiService.get(`conference/search/${f}${c}`).subscribe({next:d=>{this.data$.next(d)},error:d=>{this.message$.next(d)}})}getBySearchQuery(f){this.apiService.get(`conference/searchquery?${f}`).subscribe({next:h=>{this.data$.next(h)},error:h=>{this.message$.next(h)}})}create(f){this.apiService.post("conference/create/",f).subscribe({next:h=>{this.message$.next({severity:"success",summary:"Sikeres konferencia r\xf6gz\xedt\xe9s",detail:`${f.name} r\xf6gz\xedtve`})},error:h=>{this.message$.next(h)}})}update(f){this.apiService.put(`conference/update/${f.id}`,f).subscribe({next:()=>{this.message$.next({severity:"success",summary:"Sikeres konferencia m\xf3dos\xedt\xe1s",detail:`${f.name} m\xf3dos\xedtva`})},error:h=>{this.message$.next(h)}})}delete(f){this.apiService.delete(`conference/delete/${f.id}`).subscribe({next:h=>{this.message$.next({severity:"success",summary:"Sikeres konferencia t\xf6rl\xe9s",detail:`${f.name} t\xf6r\xf6lve`})},error:h=>{this.message$.next(h)}})}bulkdelete(f){let h={ids:f.map(c=>c.id)};this.apiService.post("conference/bulkdelete",h).subscribe({next:c=>{this.message$.next({severity:"success",summary:"Sikeres konferencia t\xf6rl\xe9s",detail:`${f.length} konferencia t\xf6r\xf6lve`})},error:c=>{this.message$.next(c)}})}isSlugValid(f){return this.get(0,20,"slug=","sort"),this.data$.pipe((0,i.U)(h=>(console.log("isSlugValid response",h),h&&h.data&&h.rows.length>0)),(0,M.K)(()=>(0,I.of)(!1)))}static#e=this.\u0275fac=function(h){return new(h||g)(y.LFG(C.s))};static#t=this.\u0275prov=y.Yz7({token:g,factory:g.\u0275fac,providedIn:"root"})}return g})()},3139:(H,z,r)=>{r.d(z,{Q:()=>M});var T=r(8645),i=r(2029);let M=(()=>{class I{constructor(){this.mealChanged=new T.x,this.meals={breakfast:{begin:7,end:10},lunch:{begin:11,end:15},dinner:{begin:17,end:20}},this.checkMealStart(),setInterval(()=>{this.checkMealStart()},2e4)}checkMealStart(){const _=(new Date).getHours();for(const g of Object.keys(this.meals)){const E=this.meals[g];if(_>=E.begin&&_<E.end)return void this.mealChanged.next(g)}}getMealNameByTime(C){const _=C.getHours();for(const g in this.meals){const E=this.meals[g];if(_>=E.begin&&_<=E.end)return this.translateMealName(g)}return"Jelenleg nincs \xe9tkeztet\xe9s"}getMealsForSelector(){let C=[];for(const _ in this.meals)C.push(this.translateMealName(_));return C}translateMealName(C){return{breakfast:"reggeli",lunch:"eb\xe9d",dinner:"vacsora"}[C]||C}isOpen(){const C=(new Date).getHours();for(const _ in this.meals){const g=this.meals[_];if(C>=g.begin&&C<g.end)return!0}return!1}static#e=this.\u0275fac=function(_){return new(_||I)};static#t=this.\u0275prov=i.Yz7({token:I,factory:I.\u0275fac,providedIn:"root"})}return I})()},4204:(H,z,r)=>{r.d(z,{b:()=>h,u:()=>c});var T=r(6814),i=r(2029),M=r(5219),I=r(2076),y=r(2332);const C=["mask"];function _(d,x){1&d&&i.GkF(0)}const g=function(d){return{"p-blockui-document":d,"p-blockui p-component-overlay p-component-overlay-enter":!0}},E=function(d){return{display:d}},f=["*"];let h=(()=>{class d{document;el;cd;config;renderer;target;autoZIndex=!0;baseZIndex=0;styleClass;get blocked(){return this._blocked}set blocked(v){this.mask&&this.mask.nativeElement?v?this.block():this.unblock():this._blocked=v}templates;mask;_blocked=!1;animationEndListener;contentTemplate;constructor(v,w,S,V,N){this.document=v,this.el=w,this.cd=S,this.config=V,this.renderer=N}ngAfterViewInit(){if(this.target&&!this.target.getBlockableElement)throw"Target of BlockUI must implement BlockableUI interface"}ngAfterContentInit(){this.templates.forEach(v=>{v.getType(),this.contentTemplate=v.template})}block(){this._blocked=!0,this.target?(this.target.getBlockableElement().appendChild(this.mask.nativeElement),this.target.getBlockableElement().style.position="relative"):this.renderer.appendChild(this.document.body,this.mask.nativeElement),this.autoZIndex&&y.P9.set("modal",this.mask.nativeElement,this.baseZIndex+this.config.zIndex.modal)}unblock(){this.mask&&(this.animationEndListener=this.renderer.listen(this.mask.nativeElement,"animationend",this.destroyModal.bind(this)),I.p.addClass(this.mask.nativeElement,"p-component-overlay-leave"))}destroyModal(){this._blocked=!1,this.mask&&(I.p.removeClass(this.mask.nativeElement,"p-component-overlay-leave"),y.P9.clear(this.mask.nativeElement),this.renderer.appendChild(this.el.nativeElement,this.mask.nativeElement)),this.unbindAnimationEndListener(),this.cd.markForCheck()}unbindAnimationEndListener(){this.animationEndListener&&this.mask&&(this.animationEndListener(),this.animationEndListener=null)}ngOnDestroy(){this.unblock(),this.destroyModal()}static \u0275fac=function(w){return new(w||d)(i.Y36(T.K0),i.Y36(i.SBq),i.Y36(i.sBO),i.Y36(M.b4),i.Y36(i.Qsj))};static \u0275cmp=i.Xpm({type:d,selectors:[["p-blockUI"]],contentQueries:function(w,S,V){if(1&w&&i.Suo(V,M.jx,4),2&w){let N;i.iGM(N=i.CRH())&&(S.templates=N)}},viewQuery:function(w,S){if(1&w&&i.Gf(C,5),2&w){let V;i.iGM(V=i.CRH())&&(S.mask=V.first)}},hostAttrs:[1,"p-element"],inputs:{target:"target",autoZIndex:"autoZIndex",baseZIndex:"baseZIndex",styleClass:"styleClass",blocked:"blocked"},ngContentSelectors:f,decls:4,vars:9,consts:[[3,"ngClass","ngStyle"],["mask",""],[4,"ngTemplateOutlet"]],template:function(w,S){1&w&&(i.F$t(),i.TgZ(0,"div",0,1),i.Hsn(2),i.YNc(3,_,1,0,"ng-container",2),i.qZA()),2&w&&(i.Tol(S.styleClass),i.Q6J("ngClass",i.VKq(5,g,!S.target))("ngStyle",i.VKq(7,E,S.blocked?"flex":"none")),i.xp6(3),i.Q6J("ngTemplateOutlet",S.contentTemplate))},dependencies:[T.mk,T.tP,T.PC],styles:[".p-blockui{position:absolute;top:0;left:0;width:100%;height:100%;background-color:transparent;transition-property:background-color;display:flex;align-items:center;justify-content:center}.p-blockui.p-component-overlay{position:absolute}.p-blockui-document.p-component-overlay{position:fixed}.p-blockui-leave.p-component-overlay{background-color:transparent}\n"],encapsulation:2,changeDetection:0})}return d})(),c=(()=>{class d{static \u0275fac=function(w){return new(w||d)};static \u0275mod=i.oAB({type:d});static \u0275inj=i.cJS({imports:[T.ez]})}return d})()},8057:(H,z,r)=>{r.d(z,{XZ:()=>W,nD:()=>Z});var T=r(6814),i=r(2029),M=r(6223),I=r(2332),y=r(5219),C=r(2591);const _=["cb"];function g(p,D){if(1&p&&i._UZ(0,"span",10),2&p){const a=i.oxw(3);i.Q6J("ngClass",a.checkboxIcon)}}function E(p,D){1&p&&i._UZ(0,"CheckIcon",11),2&p&&i.Q6J("styleClass","p-checkbox-icon")}function f(p,D){if(1&p&&(i.ynx(0),i.YNc(1,g,1,1,"span",8),i.YNc(2,E,1,1,"CheckIcon",9),i.BQk()),2&p){const a=i.oxw(2);i.xp6(1),i.Q6J("ngIf",a.checkboxIcon),i.xp6(1),i.Q6J("ngIf",!a.checkboxIcon)}}function h(p,D){}function c(p,D){1&p&&i.YNc(0,h,0,0,"ng-template")}function d(p,D){if(1&p&&(i.TgZ(0,"span",12),i.YNc(1,c,1,0,null,13),i.qZA()),2&p){const a=i.oxw(2);i.xp6(1),i.Q6J("ngTemplateOutlet",a.checkboxIconTemplate)}}function x(p,D){if(1&p&&(i.ynx(0),i.YNc(1,f,3,2,"ng-container",5),i.YNc(2,d,2,1,"span",7),i.BQk()),2&p){const a=i.oxw();i.xp6(1),i.Q6J("ngIf",!a.checkboxIconTemplate),i.xp6(1),i.Q6J("ngIf",a.checkboxIconTemplate)}}const v=function(p,D,a){return{"p-checkbox-label":!0,"p-checkbox-label-active":p,"p-disabled":D,"p-checkbox-label-focus":a}};function w(p,D){if(1&p){const a=i.EpF();i.TgZ(0,"label",14),i.NdJ("click",function(u){i.CHM(a);const L=i.oxw(),R=i.MAs(3);return i.KtG(L.onClick(u,R,!0))}),i._uU(1),i.qZA()}if(2&p){const a=i.oxw();i.Tol(a.labelStyleClass),i.Q6J("ngClass",i.kEZ(5,v,a.checked(),a.disabled,a.focused)),i.uIk("for",a.inputId),i.xp6(1),i.Oqu(a.label)}}const S=function(p,D,a){return{"p-checkbox p-component":!0,"p-checkbox-checked":p,"p-checkbox-disabled":D,"p-checkbox-focused":a}},V=function(p,D,a){return{"p-highlight":p,"p-disabled":D,"p-focus":a}},N={provide:M.JU,useExisting:(0,i.Gpc)(()=>W),multi:!0};let W=(()=>{class p{cd;value;name;disabled;binary;label;ariaLabelledBy;ariaLabel;tabindex;inputId;style;styleClass;labelStyleClass;formControl;checkboxIcon;readonly;required;trueValue=!0;falseValue=!1;onChange=new i.vpe;inputViewChild;templates;checkboxIconTemplate;model;onModelChange=()=>{};onModelTouched=()=>{};focused=!1;constructor(a){this.cd=a}ngAfterContentInit(){this.templates.forEach(a=>{"icon"===a.getType()&&(this.checkboxIconTemplate=a.template)})}onClick(a,b,u){a.preventDefault(),!this.disabled&&!this.readonly&&(this.updateModel(a),u&&b.focus())}updateModel(a){let b;this.binary?(b=this.checked()?this.falseValue:this.trueValue,this.model=b,this.onModelChange(b)):(b=this.checked()?this.model.filter(u=>!I.gb.equals(u,this.value)):this.model?[...this.model,this.value]:[this.value],this.onModelChange(b),this.model=b,this.formControl&&this.formControl.setValue(b)),this.onChange.emit({checked:b,originalEvent:a})}handleChange(a){this.readonly||this.updateModel(a)}onFocus(){this.focused=!0}onBlur(){this.focused=!1,this.onModelTouched()}focus(){this.inputViewChild?.nativeElement.focus()}writeValue(a){this.model=a,this.cd.markForCheck()}registerOnChange(a){this.onModelChange=a}registerOnTouched(a){this.onModelTouched=a}setDisabledState(a){this.disabled=a,this.cd.markForCheck()}checked(){return this.binary?this.model===this.trueValue:I.gb.contains(this.value,this.model)}static \u0275fac=function(b){return new(b||p)(i.Y36(i.sBO))};static \u0275cmp=i.Xpm({type:p,selectors:[["p-checkbox"]],contentQueries:function(b,u,L){if(1&b&&i.Suo(L,y.jx,4),2&b){let R;i.iGM(R=i.CRH())&&(u.templates=R)}},viewQuery:function(b,u){if(1&b&&i.Gf(_,5),2&b){let L;i.iGM(L=i.CRH())&&(u.inputViewChild=L.first)}},hostAttrs:[1,"p-element"],inputs:{value:"value",name:"name",disabled:"disabled",binary:"binary",label:"label",ariaLabelledBy:"ariaLabelledBy",ariaLabel:"ariaLabel",tabindex:"tabindex",inputId:"inputId",style:"style",styleClass:"styleClass",labelStyleClass:"labelStyleClass",formControl:"formControl",checkboxIcon:"checkboxIcon",readonly:"readonly",required:"required",trueValue:"trueValue",falseValue:"falseValue"},outputs:{onChange:"onChange"},features:[i._Bn([N])],decls:7,vars:26,consts:[[3,"ngStyle","ngClass"],[1,"p-hidden-accessible"],["type","checkbox",3,"readonly","value","checked","disabled","focus","blur","change"],["cb",""],[1,"p-checkbox-box",3,"ngClass","click"],[4,"ngIf"],[3,"class","ngClass","click",4,"ngIf"],["class","p-checkbox-icon",4,"ngIf"],["class","p-checkbox-icon",3,"ngClass",4,"ngIf"],[3,"styleClass",4,"ngIf"],[1,"p-checkbox-icon",3,"ngClass"],[3,"styleClass"],[1,"p-checkbox-icon"],[4,"ngTemplateOutlet"],[3,"ngClass","click"]],template:function(b,u){if(1&b){const L=i.EpF();i.TgZ(0,"div",0)(1,"div",1)(2,"input",2,3),i.NdJ("focus",function(){return u.onFocus()})("blur",function(){return u.onBlur()})("change",function(B){return u.handleChange(B)}),i.qZA()(),i.TgZ(4,"div",4),i.NdJ("click",function(B){i.CHM(L);const K=i.MAs(3);return i.KtG(u.onClick(B,K,!0))}),i.YNc(5,x,3,2,"ng-container",5),i.qZA()(),i.YNc(6,w,2,9,"label",6)}2&b&&(i.Tol(u.styleClass),i.Q6J("ngStyle",u.style)("ngClass",i.kEZ(18,S,u.checked(),u.disabled,u.focused)),i.xp6(2),i.Q6J("readonly",u.readonly)("value",u.value)("checked",u.checked())("disabled",u.disabled),i.uIk("id",u.inputId)("name",u.name)("tabindex",u.tabindex)("aria-labelledby",u.ariaLabelledBy)("aria-label",u.ariaLabel)("aria-checked",u.checked())("required",u.required),i.xp6(2),i.Q6J("ngClass",i.kEZ(22,V,u.checked(),u.disabled,u.focused)),i.xp6(1),i.Q6J("ngIf",u.checked()),i.xp6(1),i.Q6J("ngIf",u.label))},dependencies:function(){return[T.mk,T.O5,T.tP,T.PC,C.n]},styles:[".p-checkbox{display:inline-flex;cursor:pointer;-webkit-user-select:none;user-select:none;vertical-align:bottom;position:relative}.p-checkbox-disabled{cursor:default!important;pointer-events:none}.p-checkbox-box{display:flex;justify-content:center;align-items:center}p-checkbox{display:inline-flex;vertical-align:bottom;align-items:center}.p-checkbox-label{line-height:1}\n"],encapsulation:2,changeDetection:0})}return p})(),Z=(()=>{class p{static \u0275fac=function(b){return new(b||p)};static \u0275mod=i.oAB({type:p});static \u0275inj=i.cJS({imports:[T.ez,C.n,y.m8]})}return p})()},7680:(H,z,r)=>{r.d(z,{G:()=>M,L:()=>I});var T=r(6814),i=r(2029);let M=(()=>{class y{styleClass;style;strokeWidth="2";fill="none";animationDuration="2s";static \u0275fac=function(g){return new(g||y)};static \u0275cmp=i.Xpm({type:y,selectors:[["p-progressSpinner"]],hostAttrs:[1,"p-element"],inputs:{styleClass:"styleClass",style:"style",strokeWidth:"strokeWidth",fill:"fill",animationDuration:"animationDuration"},decls:3,vars:6,consts:[["role","alert","aria-busy","true",1,"p-progress-spinner",3,"ngStyle","ngClass"],["viewBox","25 25 50 50",1,"p-progress-spinner-svg"],["cx","50","cy","50","r","20","stroke-miterlimit","10",1,"p-progress-spinner-circle"]],template:function(g,E){1&g&&(i.TgZ(0,"div",0),i.O4$(),i.TgZ(1,"svg",1),i._UZ(2,"circle",2),i.qZA()()),2&g&&(i.Q6J("ngStyle",E.style)("ngClass",E.styleClass),i.xp6(1),i.Udp("animation-duration",E.animationDuration),i.xp6(1),i.uIk("fill",E.fill)("stroke-width",E.strokeWidth))},dependencies:[T.mk,T.PC],styles:['.p-progress-spinner{position:relative;margin:0 auto;width:100px;height:100px;display:inline-block}.p-progress-spinner:before{content:"";display:block;padding-top:100%}.p-progress-spinner-svg{animation:p-progress-spinner-rotate 2s linear infinite;height:100%;transform-origin:center center;width:100%;position:absolute;inset:0;margin:auto}.p-progress-spinner-circle{stroke-dasharray:89,200;stroke-dashoffset:0;stroke:#d62d20;animation:p-progress-spinner-dash 1.5s ease-in-out infinite,p-progress-spinner-color 6s ease-in-out infinite;stroke-linecap:round}@keyframes p-progress-spinner-rotate{to{transform:rotate(360deg)}}@keyframes p-progress-spinner-dash{0%{stroke-dasharray:1,200;stroke-dashoffset:0}50%{stroke-dasharray:89,200;stroke-dashoffset:-35px}to{stroke-dasharray:89,200;stroke-dashoffset:-124px}}@keyframes p-progress-spinner-color{to,0%{stroke:#d62d20}40%{stroke:#0057e7}66%{stroke:#008744}80%,90%{stroke:#ffa700}}\n'],encapsulation:2,changeDetection:0})}return y})(),I=(()=>{class y{static \u0275fac=function(g){return new(g||y)};static \u0275mod=i.oAB({type:y});static \u0275inj=i.cJS({imports:[T.ez]})}return y})()},6340:(H,z,r)=>{r.d(z,{V:()=>h});var T=r(6814),i=r(2029);let h=(()=>{class c{static \u0275fac=function(v){return new(v||c)};static \u0275mod=i.oAB({type:c});static \u0275inj=i.cJS({imports:[T.ez]})}return c})()},5389:(H,z,r)=>{r.d(z,{dp:()=>pt});var T=r(6814),i=r(2029),M=r(5219),I=r(5309),y=r(4480),C=r(6489),_=r(6392),g=r(4562),E=r(3362),f=r(2314),h=r(2591),c=r(6005),d=r(4713);let x=(()=>{class t extends d.s{static \u0275fac=function(){let e;return function(o){return(e||(e=i.n5z(t)))(o||t)}}();static \u0275cmp=i.Xpm({type:t,selectors:[["MinusIcon"]],standalone:!0,features:[i.qOj,i.jDz],decls:2,vars:5,consts:[["width","14","height","14","viewBox","0 0 14 14","fill","none","xmlns","http://www.w3.org/2000/svg"],["d","M13.2222 7.77778H0.777778C0.571498 7.77778 0.373667 7.69584 0.227806 7.54998C0.0819442 7.40412 0 7.20629 0 7.00001C0 6.79373 0.0819442 6.5959 0.227806 6.45003C0.373667 6.30417 0.571498 6.22223 0.777778 6.22223H13.2222C13.4285 6.22223 13.6263 6.30417 13.7722 6.45003C13.9181 6.5959 14 6.79373 14 7.00001C14 7.20629 13.9181 7.40412 13.7722 7.54998C13.6263 7.69584 13.4285 7.77778 13.2222 7.77778Z","fill","currentColor"]],template:function(l,o){1&l&&(i.O4$(),i.TgZ(0,"svg",0),i._UZ(1,"path",1),i.qZA()),2&l&&(i.Tol(o.getClassNames()),i.uIk("aria-label",o.ariaLabel)("aria-hidden",o.ariaHidden)("role",o.role))},dependencies:[T.ez],encapsulation:2})}return t})();var v=r(3833),w=r(7273),S=r(8717);let pt=(()=>{class t{static \u0275fac=function(l){return new(l||t)};static \u0275mod=i.oAB({type:t});static \u0275inj=i.cJS({imports:[T.ez,I.U,y.T,C.v,S.L,E.v,f.H,v.V,w.m,_.W,h.n,x,c.v,g.X,M.m8,C.v]})}return t})()}}]);