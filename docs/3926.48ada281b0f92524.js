"use strict";(self.webpackChunknfc_reserve=self.webpackChunknfc_reserve||[]).push([[3926],{7939:(I,y,s)=>{s.d(y,{H:()=>i});var t=s(2029),e=s(9515),M=s(6814),E=s(6223),g=s(5219),k=s(2160);function v(c,p){if(1&c&&(t.TgZ(0,"span",5),t._uU(1),t.qZA()),2&c){const n=p.$implicit;t.Q6J("ngClass","meal-badge "+(null==n?null:n.style)),t.xp6(1),t.hij(" ",n.label," ")}}function m(c,p){if(1&c&&(t.TgZ(0,"span",5),t._uU(1),t.qZA()),2&c){const n=p.$implicit;t.Q6J("ngClass","meal-badge "+(null==n?null:n.style)),t.xp6(1),t.hij(" ",null==n?null:n.label," ")}}function C(c,p){if(1&c){const n=t.EpF();t.TgZ(0,"p-dropdown",2),t.NdJ("onChange",function(b){t.CHM(n);const u=t.oxw();return t.KtG(u.handleOnChange(b))}),t.ALo(1,"translate"),t.ALo(2,"translate"),t.YNc(3,v,2,2,"ng-template",3),t.YNc(4,m,2,2,"ng-template",4),t.qZA()}if(2&c){const n=p.ngIf,_=t.oxw();t.s9C("placeholder",t.lcZ(1,5,"V\xe1lasszon...")),t.s9C("emptyMessage",t.lcZ(2,7,"Nincs tal\xe1lat...")),t.Q6J("formControl",n)("options",_.meals)("showClear",_.showClear)}}function l(c,p){if(1&c&&(t.TgZ(0,"span",5),t._uU(1),t.qZA()),2&c){const n=p.$implicit;t.Q6J("ngClass","meal-badge "+(null==n?null:n.style)),t.xp6(1),t.hij(" ",n.label," ")}}function a(c,p){if(1&c&&(t.TgZ(0,"span",5),t._uU(1),t.qZA()),2&c){const n=p.$implicit;t.Q6J("ngClass","meal-badge "+(null==n?null:n.style)),t.xp6(1),t.hij(" ",null==n?null:n.label," ")}}function h(c,p){if(1&c){const n=t.EpF();t.TgZ(0,"p-dropdown",6),t.NdJ("ngModelChange",function(b){t.CHM(n);const u=t.oxw();return t.KtG(u.selectedMeal=b)})("onChange",function(b){t.CHM(n);const u=t.oxw();return t.KtG(u.handleOnChange(b))}),t.ALo(1,"translate"),t.ALo(2,"translate"),t.YNc(3,l,2,2,"ng-template",3),t.YNc(4,a,2,2,"ng-template",4),t.qZA()}if(2&c){const n=t.oxw();t.s9C("placeholder",t.lcZ(1,5,"V\xe1lasszon...")),t.s9C("emptyMessage",t.lcZ(2,7,"Nincs tal\xe1lat...")),t.Q6J("ngModel",n.selectedMeal)("options",n.meals)("showClear",n.showClear)}}let i=(()=>{class c{constructor(n){this.translate=n,this.change=new t.vpe,this.meals=[],this.selectedMeal=""}ngOnInit(){this.translate.onLangChange.subscribe(()=>{this.setMeals()})}ngOnChanges(n){this.setMeals()}getFormControl(){return this.parentForm&&this.controlName?this.parentForm.get(this.controlName):null}setMeals(){if(this.meals=[{label:this.translate.instant("MEALS.BREAKFAST"),value:"reggeli",style:"breakfast"},{label:this.translate.instant("MEALS.LUNCH"),value:"eb\xe9d",style:"lunch"},{label:this.translate.instant("MEALS.DINNER"),value:"vacsora",style:"dinner"}],this.earliestMeal){const n=this.meals.findIndex(_=>_.value===this.earliestMeal);n>-1&&(this.meals=this.meals.slice(n))}if(this.latestMeal){const n=this.meals.findIndex(_=>_.value===this.latestMeal);n>-1&&(this.meals=this.meals.slice(0,n+1))}this.showNothing&&this.meals.push({label:this.translate.instant("MEALS.NOTHING"),value:"nem k\xe9r \xe9tkez\xe9st",style:"nothing"})}setEarliestMeal(n){this.earliestMeal=n,this.setMeals()}setLatestMeal(n){this.latestMeal=n,this.setMeals()}handleOnChange(n){this.change.emit({value:n.value,field:this.controlName})}static#e=this.\u0275fac=function(_){return new(_||c)(t.Y36(e.sK))};static#t=this.\u0275cmp=t.Xpm({type:c,selectors:[["app-meal-selector"]],inputs:{parentForm:"parentForm",controlName:"controlName",showClear:"showClear",showNothing:"showNothing",earliestMeal:"earliestMeal",latestMeal:"latestMeal"},outputs:{change:"change"},features:[t.TTD],decls:3,vars:2,consts:[["optionLabel","label","optionValue","value","appendTo","body",3,"formControl","options","placeholder","emptyMessage","showClear","onChange",4,"ngIf","ngIfElse"],["useNgModel",""],["optionLabel","label","optionValue","value","appendTo","body",3,"formControl","options","placeholder","emptyMessage","showClear","onChange"],["pTemplate","item"],["pTemplate","selectedItem"],[3,"ngClass"],["optionLabel","label","optionValue","value","appendTo","body",3,"ngModel","options","placeholder","emptyMessage","showClear","ngModelChange","onChange"]],template:function(_,b){if(1&_&&(t.YNc(0,C,5,9,"p-dropdown",0),t.YNc(1,h,5,9,"ng-template",null,1,t.W1O)),2&_){const u=t.MAs(2);t.Q6J("ngIf",b.getFormControl())("ngIfElse",u)}},dependencies:[M.mk,M.O5,E.JJ,E.On,E.oH,g.jx,k.Lt,e.X$],encapsulation:2})}return c})()},219:(I,y,s)=>{s.d(y,{Z:()=>v});var t=s(5619),e=s(7398),M=s(6306),E=s(2096),g=s(2029),k=s(8814);let v=(()=>{class m{constructor(l){this.apiService=l,this.cache=[],this.apiURL=l.apiURL,this.data$=new t.X(null),this.message$=new t.X(null)}get conferenceObs(){return this.data$.asObservable()}get messageObs(){return this.message$.asObservable()}get(l,a,h,i){const c=localStorage.getItem("userrole"),p=localStorage.getItem("userid");if("Szervezo"===c&&p){const u=`organizer_user_id=${p}`;i=i?`${i}&${u}`:u}i.includes("enabled=")||(i=i?`${i}&enabled=1`:"enabled=1");let n="";""!==h&&(n=""!=h.sortField?`sort=${h.sortField}&order=${1===h.sortOrder?"ASC":"DESC"}`:"");const _=""!==n&&""!==i?n+"&"+i:""!==n&&""===i?n:""===n&&""!==i?i:"";this.apiService.get(`conference/get/${l}/${a}${""!==_?"?"+_:""}`).subscribe({next:u=>{this.data$.next(u)},error:u=>{this.message$.next(u)}})}getBySearch(l,a){let h="";""!==a&&(h=""!=a.sortField?`?sort=${a.sortField}&order=${1===a.sortOrder?"ASC":"DESC"}`:""),this.apiService.get(`conference/search/${l}${h}`).subscribe({next:i=>{this.data$.next(i)},error:i=>{this.message$.next(i)}})}getBySearchQuery(l){this.apiService.get(`conference/searchquery?${l}`).subscribe({next:a=>{this.data$.next(a)},error:a=>{this.message$.next(a)}})}create(l){this.apiService.post("conference/create/",l).subscribe({next:a=>{this.message$.next({severity:"success",summary:"Sikeres konferencia r\xf6gz\xedt\xe9s",detail:`${l.name} r\xf6gz\xedtve`})},error:a=>{this.message$.next(a)}})}update(l){this.apiService.put(`conference/update/${l.id}`,l).subscribe({next:()=>{this.message$.next({severity:"success",summary:"Sikeres konferencia m\xf3dos\xedt\xe1s",detail:`${l.name} m\xf3dos\xedtva`})},error:a=>{this.message$.next(a)}})}delete(l){this.apiService.delete(`conference/delete/${l.id}`).subscribe({next:a=>{this.message$.next({severity:"success",summary:"Sikeres konferencia t\xf6rl\xe9s",detail:`${l.name} t\xf6r\xf6lve`})},error:a=>{this.message$.next(a)}})}bulkdelete(l){let a={ids:l.map(h=>h.id)};this.apiService.post("conference/bulkdelete",a).subscribe({next:h=>{this.message$.next({severity:"success",summary:"Sikeres konferencia t\xf6rl\xe9s",detail:`${l.length} konferencia t\xf6r\xf6lve`})},error:h=>{this.message$.next(h)}})}getConferencesForSelector(){return this.get(0,999,{sortField:"id",sortOrder:1},""),this.data$.asObservable().pipe((0,e.U)(a=>{const h=a?a.rows:[];return this.cache=h,h}))}getById(l){return this.apiService.get(`conference/getbyid/${l}`)}isSlugValid(l){return this.get(0,20,"slug=","sort"),this.data$.pipe((0,e.U)(a=>(console.log("isSlugValid response",a),a&&a.data&&a.rows.length>0)),(0,M.K)(()=>(0,E.of)(!1)))}assignRoomsToConference(l,a){this.apiService.post(`conferencesroom/addroom/${l}`,{roomIds:a}).subscribe({next:h=>{this.message$.next({severity:"success",summary:"Sikeres szoba-konferencia \xf6sszerendel\xe9s",detail:"Szob\xe1k hozz\xe1rendelve"})},error:h=>{this.message$.next(h)}})}removeRoomsFromConference(l,a){this.apiService.post(`conferencesroom/removeroom/${l}`,{roomIds:a}).subscribe({next:h=>{this.message$.next({severity:"success",summary:"\xd6sszerendel\xe9s t\xf6r\xf6lve",detail:"Szoba-konferencia \xf6sszerendel\xe9s t\xf6r\xf6lve"})},error:h=>{this.message$.next(h)}})}static#e=this.\u0275fac=function(a){return new(a||m)(g.LFG(k.s))};static#t=this.\u0275prov=g.Yz7({token:m,factory:m.\u0275fac,providedIn:"root"})}return m})()},9444:(I,y,s)=>{s.d(y,{y:()=>b});var t=s(6814),e=s(6223),M=s(9515),E=s(2610),g=s(7213),k=s(9246),v=s(9664),m=s(2160),C=s(4055),l=s(3714),a=s(3259),h=s(2169),i=s(4204),c=s(7680),p=s(4104),n=s(2285),_=s(2029);let b=(()=>{class u{static#e=this.\u0275fac=function(r){return new(r||u)};static#t=this.\u0275mod=_.oAB({type:u});static#n=this.\u0275inj=_.cJS({imports:[t.ez,e.u5,e.UX,M.aw,E.O,g.S,k.l,n.L,v.U$,m.kW,C.q4,l.j,a.z,h.o,i.u,c.L,p.EV]})}return u})()},3620:(I,y,s)=>{s.d(y,{b:()=>E});var t=s(2832),e=s(9360),M=s(8251);function E(g,k=t.z){return(0,e.e)((v,m)=>{let C=null,l=null,a=null;const h=()=>{if(C){C.unsubscribe(),C=null;const c=l;l=null,m.next(c)}};function i(){const c=a+g,p=k.now();if(p<c)return C=this.schedule(void 0,c-p),void m.add(C);h()}v.subscribe((0,M.x)(m,c=>{l=c,a=k.now(),C||(C=k.schedule(i,g),m.add(C))},()=>{h(),m.complete()},void 0,()=>{l=C=null}))})}},4204:(I,y,s)=>{s.d(y,{b:()=>a,u:()=>h});var t=s(6814),e=s(2029),M=s(5219),E=s(2076),g=s(2332);const k=["mask"];function v(i,c){1&i&&e.GkF(0)}const m=function(i){return{"p-blockui-document":i,"p-blockui p-component-overlay p-component-overlay-enter":!0}},C=function(i){return{display:i}},l=["*"];let a=(()=>{class i{document;el;cd;config;renderer;target;autoZIndex=!0;baseZIndex=0;styleClass;get blocked(){return this._blocked}set blocked(p){this.mask&&this.mask.nativeElement?p?this.block():this.unblock():this._blocked=p}templates;mask;_blocked=!1;animationEndListener;contentTemplate;constructor(p,n,_,b,u){this.document=p,this.el=n,this.cd=_,this.config=b,this.renderer=u}ngAfterViewInit(){if(this.target&&!this.target.getBlockableElement)throw"Target of BlockUI must implement BlockableUI interface"}ngAfterContentInit(){this.templates.forEach(p=>{p.getType(),this.contentTemplate=p.template})}block(){this._blocked=!0,this.target?(this.target.getBlockableElement().appendChild(this.mask.nativeElement),this.target.getBlockableElement().style.position="relative"):this.renderer.appendChild(this.document.body,this.mask.nativeElement),this.autoZIndex&&g.P9.set("modal",this.mask.nativeElement,this.baseZIndex+this.config.zIndex.modal)}unblock(){this.mask&&(this.animationEndListener=this.renderer.listen(this.mask.nativeElement,"animationend",this.destroyModal.bind(this)),E.p.addClass(this.mask.nativeElement,"p-component-overlay-leave"))}destroyModal(){this._blocked=!1,this.mask&&(E.p.removeClass(this.mask.nativeElement,"p-component-overlay-leave"),g.P9.clear(this.mask.nativeElement),this.renderer.appendChild(this.el.nativeElement,this.mask.nativeElement)),this.unbindAnimationEndListener(),this.cd.markForCheck()}unbindAnimationEndListener(){this.animationEndListener&&this.mask&&(this.animationEndListener(),this.animationEndListener=null)}ngOnDestroy(){this.unblock(),this.destroyModal()}static \u0275fac=function(n){return new(n||i)(e.Y36(t.K0),e.Y36(e.SBq),e.Y36(e.sBO),e.Y36(M.b4),e.Y36(e.Qsj))};static \u0275cmp=e.Xpm({type:i,selectors:[["p-blockUI"]],contentQueries:function(n,_,b){if(1&n&&e.Suo(b,M.jx,4),2&n){let u;e.iGM(u=e.CRH())&&(_.templates=u)}},viewQuery:function(n,_){if(1&n&&e.Gf(k,5),2&n){let b;e.iGM(b=e.CRH())&&(_.mask=b.first)}},hostAttrs:[1,"p-element"],inputs:{target:"target",autoZIndex:"autoZIndex",baseZIndex:"baseZIndex",styleClass:"styleClass",blocked:"blocked"},ngContentSelectors:l,decls:4,vars:9,consts:[[3,"ngClass","ngStyle"],["mask",""],[4,"ngTemplateOutlet"]],template:function(n,_){1&n&&(e.F$t(),e.TgZ(0,"div",0,1),e.Hsn(2),e.YNc(3,v,1,0,"ng-container",2),e.qZA()),2&n&&(e.Tol(_.styleClass),e.Q6J("ngClass",e.VKq(5,m,!_.target))("ngStyle",e.VKq(7,C,_.blocked?"flex":"none")),e.xp6(3),e.Q6J("ngTemplateOutlet",_.contentTemplate))},dependencies:[t.mk,t.tP,t.PC],styles:[".p-blockui{position:absolute;top:0;left:0;width:100%;height:100%;background-color:transparent;transition-property:background-color;display:flex;align-items:center;justify-content:center}.p-blockui.p-component-overlay{position:absolute}.p-blockui-document.p-component-overlay{position:fixed}.p-blockui-leave.p-component-overlay{background-color:transparent}\n"],encapsulation:2,changeDetection:0})}return i})(),h=(()=>{class i{static \u0275fac=function(n){return new(n||i)};static \u0275mod=e.oAB({type:i});static \u0275inj=e.cJS({imports:[t.ez]})}return i})()},8057:(I,y,s)=>{s.d(y,{XZ:()=>P,nD:()=>A});var t=s(6814),e=s(2029),M=s(6223),E=s(2332),g=s(5219),k=s(2591);const v=["cb"];function m(r,x){if(1&r&&e._UZ(0,"span",10),2&r){const o=e.oxw(3);e.Q6J("ngClass",o.checkboxIcon)}}function C(r,x){1&r&&e._UZ(0,"CheckIcon",11),2&r&&e.Q6J("styleClass","p-checkbox-icon")}function l(r,x){if(1&r&&(e.ynx(0),e.YNc(1,m,1,1,"span",8),e.YNc(2,C,1,1,"CheckIcon",9),e.BQk()),2&r){const o=e.oxw(2);e.xp6(1),e.Q6J("ngIf",o.checkboxIcon),e.xp6(1),e.Q6J("ngIf",!o.checkboxIcon)}}function a(r,x){}function h(r,x){1&r&&e.YNc(0,a,0,0,"ng-template")}function i(r,x){if(1&r&&(e.TgZ(0,"span",12),e.YNc(1,h,1,0,null,13),e.qZA()),2&r){const o=e.oxw(2);e.xp6(1),e.Q6J("ngTemplateOutlet",o.checkboxIconTemplate)}}function c(r,x){if(1&r&&(e.ynx(0),e.YNc(1,l,3,2,"ng-container",5),e.YNc(2,i,2,1,"span",7),e.BQk()),2&r){const o=e.oxw();e.xp6(1),e.Q6J("ngIf",!o.checkboxIconTemplate),e.xp6(1),e.Q6J("ngIf",o.checkboxIconTemplate)}}const p=function(r,x,o){return{"p-checkbox-label":!0,"p-checkbox-label-active":r,"p-disabled":x,"p-checkbox-label-focus":o}};function n(r,x){if(1&r){const o=e.EpF();e.TgZ(0,"label",14),e.NdJ("click",function(d){e.CHM(o);const O=e.oxw(),T=e.MAs(3);return e.KtG(O.onClick(d,T,!0))}),e._uU(1),e.qZA()}if(2&r){const o=e.oxw();e.Tol(o.labelStyleClass),e.Q6J("ngClass",e.kEZ(5,p,o.checked(),o.disabled,o.focused)),e.uIk("for",o.inputId),e.xp6(1),e.Oqu(o.label)}}const _=function(r,x,o){return{"p-checkbox p-component":!0,"p-checkbox-checked":r,"p-checkbox-disabled":x,"p-checkbox-focused":o}},b=function(r,x,o){return{"p-highlight":r,"p-disabled":x,"p-focus":o}},u={provide:M.JU,useExisting:(0,e.Gpc)(()=>P),multi:!0};let P=(()=>{class r{cd;value;name;disabled;binary;label;ariaLabelledBy;ariaLabel;tabindex;inputId;style;styleClass;labelStyleClass;formControl;checkboxIcon;readonly;required;trueValue=!0;falseValue=!1;onChange=new e.vpe;inputViewChild;templates;checkboxIconTemplate;model;onModelChange=()=>{};onModelTouched=()=>{};focused=!1;constructor(o){this.cd=o}ngAfterContentInit(){this.templates.forEach(o=>{"icon"===o.getType()&&(this.checkboxIconTemplate=o.template)})}onClick(o,f,d){o.preventDefault(),!this.disabled&&!this.readonly&&(this.updateModel(o),d&&f.focus())}updateModel(o){let f;this.binary?(f=this.checked()?this.falseValue:this.trueValue,this.model=f,this.onModelChange(f)):(f=this.checked()?this.model.filter(d=>!E.gb.equals(d,this.value)):this.model?[...this.model,this.value]:[this.value],this.onModelChange(f),this.model=f,this.formControl&&this.formControl.setValue(f)),this.onChange.emit({checked:f,originalEvent:o})}handleChange(o){this.readonly||this.updateModel(o)}onFocus(){this.focused=!0}onBlur(){this.focused=!1,this.onModelTouched()}focus(){this.inputViewChild?.nativeElement.focus()}writeValue(o){this.model=o,this.cd.markForCheck()}registerOnChange(o){this.onModelChange=o}registerOnTouched(o){this.onModelTouched=o}setDisabledState(o){this.disabled=o,this.cd.markForCheck()}checked(){return this.binary?this.model===this.trueValue:E.gb.contains(this.value,this.model)}static \u0275fac=function(f){return new(f||r)(e.Y36(e.sBO))};static \u0275cmp=e.Xpm({type:r,selectors:[["p-checkbox"]],contentQueries:function(f,d,O){if(1&f&&e.Suo(O,g.jx,4),2&f){let T;e.iGM(T=e.CRH())&&(d.templates=T)}},viewQuery:function(f,d){if(1&f&&e.Gf(v,5),2&f){let O;e.iGM(O=e.CRH())&&(d.inputViewChild=O.first)}},hostAttrs:[1,"p-element"],inputs:{value:"value",name:"name",disabled:"disabled",binary:"binary",label:"label",ariaLabelledBy:"ariaLabelledBy",ariaLabel:"ariaLabel",tabindex:"tabindex",inputId:"inputId",style:"style",styleClass:"styleClass",labelStyleClass:"labelStyleClass",formControl:"formControl",checkboxIcon:"checkboxIcon",readonly:"readonly",required:"required",trueValue:"trueValue",falseValue:"falseValue"},outputs:{onChange:"onChange"},features:[e._Bn([u])],decls:7,vars:26,consts:[[3,"ngStyle","ngClass"],[1,"p-hidden-accessible"],["type","checkbox",3,"readonly","value","checked","disabled","focus","blur","change"],["cb",""],[1,"p-checkbox-box",3,"ngClass","click"],[4,"ngIf"],[3,"class","ngClass","click",4,"ngIf"],["class","p-checkbox-icon",4,"ngIf"],["class","p-checkbox-icon",3,"ngClass",4,"ngIf"],[3,"styleClass",4,"ngIf"],[1,"p-checkbox-icon",3,"ngClass"],[3,"styleClass"],[1,"p-checkbox-icon"],[4,"ngTemplateOutlet"],[3,"ngClass","click"]],template:function(f,d){if(1&f){const O=e.EpF();e.TgZ(0,"div",0)(1,"div",1)(2,"input",2,3),e.NdJ("focus",function(){return d.onFocus()})("blur",function(){return d.onBlur()})("change",function(D){return d.handleChange(D)}),e.qZA()(),e.TgZ(4,"div",4),e.NdJ("click",function(D){e.CHM(O);const L=e.MAs(3);return e.KtG(d.onClick(D,L,!0))}),e.YNc(5,c,3,2,"ng-container",5),e.qZA()(),e.YNc(6,n,2,9,"label",6)}2&f&&(e.Tol(d.styleClass),e.Q6J("ngStyle",d.style)("ngClass",e.kEZ(18,_,d.checked(),d.disabled,d.focused)),e.xp6(2),e.Q6J("readonly",d.readonly)("value",d.value)("checked",d.checked())("disabled",d.disabled),e.uIk("id",d.inputId)("name",d.name)("tabindex",d.tabindex)("aria-labelledby",d.ariaLabelledBy)("aria-label",d.ariaLabel)("aria-checked",d.checked())("required",d.required),e.xp6(2),e.Q6J("ngClass",e.kEZ(22,b,d.checked(),d.disabled,d.focused)),e.xp6(1),e.Q6J("ngIf",d.checked()),e.xp6(1),e.Q6J("ngIf",d.label))},dependencies:function(){return[t.mk,t.O5,t.tP,t.PC,k.n]},styles:[".p-checkbox{display:inline-flex;cursor:pointer;-webkit-user-select:none;user-select:none;vertical-align:bottom;position:relative}.p-checkbox-disabled{cursor:default!important;pointer-events:none}.p-checkbox-box{display:flex;justify-content:center;align-items:center}p-checkbox{display:inline-flex;vertical-align:bottom;align-items:center}.p-checkbox-label{line-height:1}\n"],encapsulation:2,changeDetection:0})}return r})(),A=(()=>{class r{static \u0275fac=function(f){return new(f||r)};static \u0275mod=e.oAB({type:r});static \u0275inj=e.cJS({imports:[t.ez,k.n,g.m8]})}return r})()},7680:(I,y,s)=>{s.d(y,{G:()=>M,L:()=>E});var t=s(6814),e=s(2029);let M=(()=>{class g{styleClass;style;strokeWidth="2";fill="none";animationDuration="2s";static \u0275fac=function(m){return new(m||g)};static \u0275cmp=e.Xpm({type:g,selectors:[["p-progressSpinner"]],hostAttrs:[1,"p-element"],inputs:{styleClass:"styleClass",style:"style",strokeWidth:"strokeWidth",fill:"fill",animationDuration:"animationDuration"},decls:3,vars:6,consts:[["role","alert","aria-busy","true",1,"p-progress-spinner",3,"ngStyle","ngClass"],["viewBox","25 25 50 50",1,"p-progress-spinner-svg"],["cx","50","cy","50","r","20","stroke-miterlimit","10",1,"p-progress-spinner-circle"]],template:function(m,C){1&m&&(e.TgZ(0,"div",0),e.O4$(),e.TgZ(1,"svg",1),e._UZ(2,"circle",2),e.qZA()()),2&m&&(e.Q6J("ngStyle",C.style)("ngClass",C.styleClass),e.xp6(1),e.Udp("animation-duration",C.animationDuration),e.xp6(1),e.uIk("fill",C.fill)("stroke-width",C.strokeWidth))},dependencies:[t.mk,t.PC],styles:['.p-progress-spinner{position:relative;margin:0 auto;width:100px;height:100px;display:inline-block}.p-progress-spinner:before{content:"";display:block;padding-top:100%}.p-progress-spinner-svg{animation:p-progress-spinner-rotate 2s linear infinite;height:100%;transform-origin:center center;width:100%;position:absolute;inset:0;margin:auto}.p-progress-spinner-circle{stroke-dasharray:89,200;stroke-dashoffset:0;stroke:#d62d20;animation:p-progress-spinner-dash 1.5s ease-in-out infinite,p-progress-spinner-color 6s ease-in-out infinite;stroke-linecap:round}@keyframes p-progress-spinner-rotate{to{transform:rotate(360deg)}}@keyframes p-progress-spinner-dash{0%{stroke-dasharray:1,200;stroke-dashoffset:0}50%{stroke-dasharray:89,200;stroke-dashoffset:-35px}to{stroke-dasharray:89,200;stroke-dashoffset:-124px}}@keyframes p-progress-spinner-color{to,0%{stroke:#d62d20}40%{stroke:#0057e7}66%{stroke:#008744}80%,90%{stroke:#ffa700}}\n'],encapsulation:2,changeDetection:0})}return g})(),E=(()=>{class g{static \u0275fac=function(m){return new(m||g)};static \u0275mod=e.oAB({type:g});static \u0275inj=e.cJS({imports:[t.ez]})}return g})()}}]);