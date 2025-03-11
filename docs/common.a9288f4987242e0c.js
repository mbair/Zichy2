"use strict";(self.webpackChunknfc_reserve=self.webpackChunknfc_reserve||[]).push([[8592],{9474:(O,f,r)=>{r.d(f,{w:()=>m});var e=r(2029),o=r(6223),l=r(219),_=r(5219),y=r(4055),p=r(9515);const i=["conferenceSelector"];function n(c,v){1&c&&e._uU(0),2&c&&e.hij(" ",v.$implicit.name," ")}function a(c,v){1&c&&e._uU(0),2&c&&e.hij(" ",v.$implicit.name," ")}let m=(()=>{class c{constructor(h){this.conferenceService=h,this.selectFirstOption=!1,this.showClear=!0,this.style={},this.loading=!0,this.disabled=!1,this.conferences=[],this.selectedConferences=[],this.onChange=u=>{},this.onTouched=()=>{}}ngOnInit(){this.conferenceService.getConferencesForSelector().subscribe(h=>{this.conferences=h,this.handleSelectFirstOption()})}handleSelectFirstOption(){!this.selectFirstOption||this.selectedConferences&&0!==this.selectedConferences.length||(this.selectedConferences=this.conferences.slice(0,this.selectionLimit??1),this.onChange(this.selectedConferences))}setDisabledState(h){this.disabled=h}syncSelectedConferences(){this.selectedConferences=this.conferences.filter(h=>this.selectedConferences.some(u=>u.id===h.id)),this.onChange(this.selectedConferences)}onSelectionChange(h){this.selectedConferences=h.value,this.onChange(this.selectedConferences),this.onTouched(),this.selectionLimit==this.selectedConferences.length&&setTimeout(()=>this.conferenceSelectorRef.hide(),0)}onSelectionClear(){this.selectedConferences=[],this.onChange(this.selectedConferences),this.onTouched()}writeValue(h){this.selectedConferences=h||[],this.conferences.length>0&&this.syncSelectedConferences()}registerOnChange(h){this.onChange=h}registerOnTouched(h){this.onTouched=h}static#e=this.\u0275fac=function(u){return new(u||c)(e.Y36(l.Z))};static#t=this.\u0275cmp=e.Xpm({type:c,selectors:[["app-conference-selector"]],viewQuery:function(u,C){if(1&u&&e.Gf(i,5),2&u){let T;e.iGM(T=e.CRH())&&(C.conferenceSelectorRef=T.first)}},inputs:{selectionLimit:"selectionLimit",selectFirstOption:"selectFirstOption",placeholder:"placeholder",showClear:"showClear",style:"style"},features:[e._Bn([{provide:o.JU,useExisting:(0,e.Gpc)(()=>c),multi:!0}])],decls:5,vars:13,consts:[["optionLabel","name","scrollHeight","400px","appendTo","body","display","chip",1,"multiselect-custom-virtual-scroll",3,"options","ngModel","disabled","selectionLimit","placeholder","emptyMessage","virtualScroll","virtualScrollItemSize","showClear","ngModelChange","onChange","onClear"],["conferenceSelector",""],["pTemplate","item"],["pTemplate","selectedItem"]],template:function(u,C){1&u&&(e.TgZ(0,"p-multiSelect",0,1),e.NdJ("ngModelChange",function(t){return C.selectedConferences=t})("onChange",function(t){return C.onSelectionChange(t)})("onClear",function(){return C.onSelectionClear()}),e.ALo(2,"translate"),e.YNc(3,n,1,1,"ng-template",2),e.YNc(4,a,1,1,"ng-template",3),e.qZA()),2&u&&(e.Akn(C.style),e.s9C("emptyMessage",e.lcZ(2,11,"Nincs tal\xe1lat...")),e.Q6J("options",C.conferences)("ngModel",C.selectedConferences)("disabled",C.disabled)("selectionLimit",C.selectionLimit)("placeholder",C.placeholder)("virtualScroll",!0)("virtualScrollItemSize",43)("showClear",C.showClear))},dependencies:[o.JJ,o.On,_.jx,y.NU,p.X$],encapsulation:2})}return c})()},117:(O,f,r)=>{r.d(f,{T:()=>T});var e=r(2029),o=r(1206),l=r(6193),_=r(6814),y=r(6223),p=r(5219),i=r(2160),n=r(9515);function a(t,g){if(1&t&&(e.TgZ(0,"span",5),e._UZ(1,"i",6),e._uU(2),e.qZA()),2&t){const s=g.$implicit,d=e.oxw(2);e.Q6J("ngClass",d.getRoleStyleClass(s.user_rolesid)),e.xp6(2),e.hij(" ",s.fullname," ")}}function m(t,g){if(1&t&&(e.TgZ(0,"span",5),e._UZ(1,"i",6),e._uU(2),e.qZA()),2&t){const s=g.$implicit,d=e.oxw(2);e.Q6J("ngClass",d.getRoleStyleClass(s.user_rolesid)),e.xp6(2),e.hij(" ",s.fullname," ")}}const c=function(){return{minWidth:"13rem"}};function v(t,g){if(1&t){const s=e.EpF();e.TgZ(0,"p-dropdown",2),e.NdJ("onChange",function(E){e.CHM(s);const S=e.oxw();return e.KtG(S.handleOnChange(E))}),e.ALo(1,"translate"),e.ALo(2,"translate"),e.YNc(3,a,3,2,"ng-template",3),e.YNc(4,m,3,2,"ng-template",4),e.qZA()}if(2&t){const s=g.ngIf,d=e.oxw();e.Akn(e.DdM(11,c)),e.s9C("placeholder",e.lcZ(1,7,"V\xe1lasszon...")),e.s9C("emptyMessage",e.lcZ(2,9,"Nincs tal\xe1lat...")),e.Q6J("formControl",s)("options",d.users)("showClear",d.showClear)}}function h(t,g){if(1&t&&(e.TgZ(0,"span",5),e._UZ(1,"i",6),e._uU(2),e.qZA()),2&t){const s=g.$implicit,d=e.oxw(2);e.Q6J("ngClass",d.getRoleStyleClass(s.user_rolesid)),e.xp6(2),e.hij(" ",s.fullname," ")}}function u(t,g){if(1&t&&(e.TgZ(0,"span",5),e._UZ(1,"i",6),e._uU(2),e.qZA()),2&t){const s=g.$implicit,d=e.oxw(2);e.Q6J("ngClass",d.getRoleStyleClass(s.user_rolesid)),e.xp6(2),e.hij(" ",null==s?null:s.fullname," ")}}function C(t,g){if(1&t){const s=e.EpF();e.TgZ(0,"p-dropdown",7),e.NdJ("ngModelChange",function(E){e.CHM(s);const S=e.oxw();return e.KtG(S.selecteduser=E)})("onChange",function(E){e.CHM(s);const S=e.oxw();return e.KtG(S.handleOnChange(E))}),e.ALo(1,"translate"),e.ALo(2,"translate"),e.YNc(3,h,3,2,"ng-template",3),e.YNc(4,u,3,2,"ng-template",4),e.qZA()}if(2&t){const s=e.oxw();e.Akn(e.DdM(11,c)),e.s9C("placeholder",e.lcZ(1,7,"V\xe1lasszon...")),e.s9C("emptyMessage",e.lcZ(2,9,"Nincs tal\xe1lat...")),e.Q6J("ngModel",s.selecteduser)("options",s.users)("showClear",s.showClear)}}let T=(()=>{class t{constructor(s,d){this.userService=s,this.roleService=d,this.change=new e.vpe,this.users=[],this.selecteduser="",this.roles=[]}ngOnInit(){this.userService.getUsersForSelector(this.user_rolesid).subscribe({next:s=>{s&&(this.users=this.user_rolesid?s.filter(d=>d.user_rolesid===this.user_rolesid):s,this.fetchRolesForUsers())}})}ngOnChanges(s){}fetchRolesForUsers(){this.roleService.fetchRoles().subscribe({next:s=>{this.roles=s}})}getFormControl(){return this.parentForm?this.parentForm.get(this.controlName):null}handleOnChange(s){this.change.emit({value:s.value,field:this.controlName})}getRoleStyleClass(s){const d=this.roles.find(S=>S.id==s);return`user-role-badge role-${d?d?.name?.trim().toLowerCase().replace(/\s+/g,""):""}`}static#e=this.\u0275fac=function(d){return new(d||t)(e.Y36(o.K),e.Y36(l.N))};static#t=this.\u0275cmp=e.Xpm({type:t,selectors:[["app-user-selector"]],inputs:{parentForm:"parentForm",controlName:"controlName",user_rolesid:"user_rolesid",showClear:"showClear"},outputs:{change:"change"},features:[e.TTD],decls:3,vars:2,consts:[["optionLabel","fullname","optionValue","id","appendTo","body",3,"formControl","options","placeholder","emptyMessage","showClear","style","onChange",4,"ngIf","ngIfElse"],["useNgModel",""],["optionLabel","fullname","optionValue","id","appendTo","body",3,"formControl","options","placeholder","emptyMessage","showClear","onChange"],["pTemplate","item"],["pTemplate","selectedItem"],[3,"ngClass"],[1,"pi","pi-user","mr-1"],["optionLabel","fullname","optionValue","id","appendTo","body",3,"ngModel","options","placeholder","emptyMessage","showClear","ngModelChange","onChange"]],template:function(d,E){if(1&d&&(e.YNc(0,v,5,12,"p-dropdown",0),e.YNc(1,C,5,12,"ng-template",null,1,e.W1O)),2&d){const S=e.MAs(2);e.Q6J("ngIf",E.getFormControl())("ngIfElse",S)}},dependencies:[_.mk,_.O5,y.JJ,y.On,y.oH,p.jx,i.Lt,n.X$],encapsulation:2})}return t})()},3139:(O,f,r)=>{r.d(f,{Q:()=>l});var e=r(8645),o=r(2029);let l=(()=>{class _{constructor(){this.mealChanged=new e.x,this.meals={breakfast:{begin:7,end:10},lunch:{begin:11,end:15},dinner:{begin:17,end:20}},this.checkMealStart(),setInterval(()=>{this.checkMealStart()},2e4)}checkMealStart(){const i=(new Date).getHours();for(const n of Object.keys(this.meals)){const a=this.meals[n];if(i>=a.begin&&i<a.end)return void this.mealChanged.next(n)}}getMealNameByTime(p){const i=p.getHours();for(const n in this.meals){const a=this.meals[n];if(i>=a.begin&&i<=a.end)return this.translateMealName(n)}return"Jelenleg nincs \xe9tkeztet\xe9s"}getMealsForSelector(){let p=[];for(const i in this.meals)p.push(this.translateMealName(i));return p}translateMealName(p){return{breakfast:"reggeli",lunch:"eb\xe9d",dinner:"vacsora"}[p]||p}isOpen(){const p=(new Date).getHours();for(const i in this.meals){const n=this.meals[i];if(p>=n.begin&&p<n.end)return!0}return!1}static#e=this.\u0275fac=function(i){return new(i||_)};static#t=this.\u0275prov=o.Yz7({token:_,factory:_.\u0275fac,providedIn:"root"})}return _})()},2835:(O,f,r)=>{r.d(f,{c:()=>_});var e=r(5619),o=r(2029),l=r(8814);let _=(()=>{class y{constructor(i){this.apiService=i,this.apiURL=i.apiURL,this.data$=new e.X(null),this.message$=new e.X(null)}get tagObs(){return this.data$.asObservable()}get messageObs(){return this.message$.asObservable()}get(i,n,a,m){let c="";""!==a&&(c=""!=a.sortField?`sort=${a.sortField}&order=${1===a.sortOrder?"ASC":"DESC"}`:"");const v=""!==c&&""!==m?c+"&"+m:""!==c&&""===m?c:""===c&&""!==m?m:"";this.apiService.get(`rfid/get/${i}/${n}${""!==v?"?"+v:""}`).subscribe({next:u=>{let C=u.rows;C&&C.length>0&&C.forEach(T=>{T.identifier=T.rfid}),this.data$.next(u)},error:u=>{this.message$.next(u)}})}getBySearch(i,n){let a="";""!==n&&(a=""!=n.sortField?`?sort=${n.sortField}&order=${1===n.sortOrder?"ASC":"DESC"}`:""),this.apiService.get(`rfid/search/${i}${a}`).subscribe({next:m=>{let c=m.rows;c&&c.length>0&&c.forEach(v=>{v.identifier=v.rfid}),this.data$.next(m)},error:m=>{this.message$.next(m)}})}getBySearchQuery(i){this.apiService.get(`rfid/searchquery?${i}`).subscribe({next:n=>{let a=n.rows;a&&a.length>0&&a.forEach(m=>{m.identifier=m.rfid}),this.data$.next(n)},error:n=>{this.message$.next(n)}})}create(i){this.apiService.post("rfid/create/",i).subscribe({next:n=>{this.message$.next({severity:"success",summary:"Sikeres c\xedmke r\xf6gz\xedt\xe9s",detail:`${i.rfid} r\xf6gz\xedtve`})},error:n=>{this.message$.next(n)}})}update(i){this.apiService.put(`rfid/update/${i.id}`,i).subscribe({next:()=>{this.message$.next({severity:"success",summary:"Sikeres c\xedmke m\xf3dos\xedt\xe1s",detail:`${i.rfid} m\xf3dos\xedtva`})},error:n=>{this.message$.next(n)}})}delete(i){this.apiService.delete(`rfid/delete/${i.id}`).subscribe({next:n=>{this.message$.next({severity:"success",summary:"Sikeres c\xedmke t\xf6rl\xe9s",detail:`${i.rfid} t\xf6r\xf6lve`})},error:n=>{this.message$.next(n)}})}bulkdelete(i){let n={ids:i.map(a=>a.id)};this.apiService.post("rfid/bulkdelete",n).subscribe({next:a=>{this.message$.next({severity:"success",summary:"Sikeres c\xedmke t\xf6rl\xe9s",detail:`${i.length} c\xedmke t\xf6r\xf6lve`})},error:a=>{this.message$.next(a)}})}getByRFID(i){return this.apiService.get(`rfid/search/${i}`)}static#e=this.\u0275fac=function(n){return new(n||y)(o.LFG(l.s))};static#t=this.\u0275prov=o.Yz7({token:y,factory:y.\u0275fac,providedIn:"root"})}return y})()},1836:(O,f,r)=>{function e(){return o=>/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(o.value)?null:{invalidEmail:{value:o.value}}}r.d(f,{u:()=>e})},8842:(O,f,r)=>{function e(){return o=>{const l=o.get("password"),_=o.get("password_again");return l&&_&&l.value!==_.value?{passwordsDoNotMatch:!0}:null}}r.d(f,{C:()=>e})},4532:(O,f,r)=>{r.d(f,{d:()=>T});var e=r(6814),o=r(2029),l=r(5219);let T=(()=>{class t{static \u0275fac=function(d){return new(d||t)};static \u0275mod=o.oAB({type:t});static \u0275inj=o.cJS({imports:[e.ez,l.m8]})}return t})()},1913:(O,f,r)=>{r.d(f,{h:()=>_,l:()=>y});var e=r(6814),o=r(2029),l=r(2076);let _=(()=>{class p{el;renderer;zone;constructor(n,a,m){this.el=n,this.renderer=a,this.zone=m}selector;enterClass;enterActiveClass;enterToClass;leaveClass;leaveActiveClass;leaveToClass;hideOnOutsideClick;toggleClass;hideOnEscape;eventListener;documentClickListener;documentKeydownListener;target;enterListener;leaveListener;animating;clickListener(){this.target=this.resolveTarget(),this.toggleClass?this.toggle():null===this.target.offsetParent?this.enter():this.leave()}toggle(){l.p.hasClass(this.target,this.toggleClass)?l.p.removeClass(this.target,this.toggleClass):l.p.addClass(this.target,this.toggleClass)}enter(){this.enterActiveClass?this.animating||(this.animating=!0,"slidedown"===this.enterActiveClass&&(this.target.style.height="0px",l.p.removeClass(this.target,"hidden"),this.target.style.maxHeight=this.target.scrollHeight+"px",l.p.addClass(this.target,"hidden"),this.target.style.height=""),l.p.addClass(this.target,this.enterActiveClass),this.enterClass&&l.p.removeClass(this.target,this.enterClass),this.enterListener=this.renderer.listen(this.target,"animationend",()=>{l.p.removeClass(this.target,this.enterActiveClass),this.enterToClass&&l.p.addClass(this.target,this.enterToClass),this.enterListener&&this.enterListener(),"slidedown"===this.enterActiveClass&&(this.target.style.maxHeight=""),this.animating=!1})):(this.enterClass&&l.p.removeClass(this.target,this.enterClass),this.enterToClass&&l.p.addClass(this.target,this.enterToClass)),this.hideOnOutsideClick&&this.bindDocumentClickListener(),this.hideOnEscape&&this.bindDocumentKeydownListener()}leave(){this.leaveActiveClass?this.animating||(this.animating=!0,l.p.addClass(this.target,this.leaveActiveClass),this.leaveClass&&l.p.removeClass(this.target,this.leaveClass),this.leaveListener=this.renderer.listen(this.target,"animationend",()=>{l.p.removeClass(this.target,this.leaveActiveClass),this.leaveToClass&&l.p.addClass(this.target,this.leaveToClass),this.leaveListener&&this.leaveListener(),this.animating=!1})):(this.leaveClass&&l.p.removeClass(this.target,this.leaveClass),this.leaveToClass&&l.p.addClass(this.target,this.leaveToClass)),this.hideOnOutsideClick&&this.unbindDocumentClickListener(),this.hideOnEscape&&this.unbindDocumentKeydownListener()}resolveTarget(){if(this.target)return this.target;switch(this.selector){case"@next":return this.el.nativeElement.nextElementSibling;case"@prev":return this.el.nativeElement.previousElementSibling;case"@parent":return this.el.nativeElement.parentElement;case"@grandparent":return this.el.nativeElement.parentElement.parentElement;default:return document.querySelector(this.selector)}}bindDocumentClickListener(){this.documentClickListener||(this.documentClickListener=this.renderer.listen(this.el.nativeElement.ownerDocument,"click",n=>{this.isVisible()&&"static"!==getComputedStyle(this.target).getPropertyValue("position")?this.isOutsideClick(n)&&this.leave():this.unbindDocumentClickListener()}))}bindDocumentKeydownListener(){this.documentKeydownListener||this.zone.runOutsideAngular(()=>{this.documentKeydownListener=this.renderer.listen(this.el.nativeElement.ownerDocument,"keydown",n=>{const{key:a,keyCode:m,which:c}=n;(!this.isVisible()||"static"===getComputedStyle(this.target).getPropertyValue("position"))&&this.unbindDocumentKeydownListener(),this.isVisible()&&"Escape"===a&&27===m&&27===c&&this.leave()})})}isVisible(){return null!==this.target.offsetParent}isOutsideClick(n){return!this.el.nativeElement.isSameNode(n.target)&&!this.el.nativeElement.contains(n.target)&&!this.target.contains(n.target)}unbindDocumentClickListener(){this.documentClickListener&&(this.documentClickListener(),this.documentClickListener=null)}unbindDocumentKeydownListener(){this.documentKeydownListener&&(this.documentKeydownListener(),this.documentKeydownListener=null)}ngOnDestroy(){this.target=null,this.eventListener&&this.eventListener(),this.unbindDocumentClickListener(),this.unbindDocumentKeydownListener()}static \u0275fac=function(a){return new(a||p)(o.Y36(o.SBq),o.Y36(o.Qsj),o.Y36(o.R0b))};static \u0275dir=o.lG2({type:p,selectors:[["","pStyleClass",""]],hostAttrs:[1,"p-element"],hostBindings:function(a,m){1&a&&o.NdJ("click",function(v){return m.clickListener(v)})},inputs:{selector:["pStyleClass","selector"],enterClass:"enterClass",enterActiveClass:"enterActiveClass",enterToClass:"enterToClass",leaveClass:"leaveClass",leaveActiveClass:"leaveActiveClass",leaveToClass:"leaveToClass",hideOnOutsideClick:"hideOnOutsideClick",toggleClass:"toggleClass",hideOnEscape:"hideOnEscape"}})}return p})(),y=(()=>{class p{static \u0275fac=function(a){return new(a||p)};static \u0275mod=o.oAB({type:p});static \u0275inj=o.cJS({imports:[e.ez]})}return p})()}}]);