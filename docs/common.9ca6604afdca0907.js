"use strict";(self.webpackChunknfc_reserve=self.webpackChunknfc_reserve||[]).push([[8592],{117:(x,_,r)=>{r.d(_,{T:()=>E});var e=r(2029),c=r(1206),o=r(6193),m=r(6814),g=r(6223),d=r(5219),i=r(2352),n=r(9515);function a(s,p){if(1&s&&(e.TgZ(0,"span",5),e._UZ(1,"i",6),e._uU(2),e.qZA()),2&s){const t=p.$implicit,l=e.oxw(2);e.Q6J("ngClass",l.getRoleStyleClass(t.user_rolesid)),e.xp6(2),e.hij(" ",t.fullname," ")}}function h(s,p){if(1&s&&(e.TgZ(0,"span",5),e._UZ(1,"i",6),e._uU(2),e.qZA()),2&s){const t=p.$implicit,l=e.oxw(2);e.Q6J("ngClass",l.getRoleStyleClass(t.user_rolesid)),e.xp6(2),e.hij(" ",t.fullname," ")}}const u=function(){return{minWidth:"13rem"}};function C(s,p){if(1&s){const t=e.EpF();e.TgZ(0,"p-dropdown",2),e.NdJ("onChange",function(f){e.CHM(t);const v=e.oxw();return e.KtG(v.handleOnChange(f))}),e.ALo(1,"translate"),e.ALo(2,"translate"),e.YNc(3,a,3,2,"ng-template",3),e.YNc(4,h,3,2,"ng-template",4),e.qZA()}if(2&s){const t=p.ngIf,l=e.oxw();e.Akn(e.DdM(11,u)),e.s9C("placeholder",e.lcZ(1,7,"V\xe1lasszon...")),e.s9C("emptyMessage",e.lcZ(2,9,"Nincs tal\xe1lat...")),e.Q6J("formControl",t)("options",l.users)("showClear",l.showClear)}}function O(s,p){if(1&s&&(e.TgZ(0,"span",5),e._UZ(1,"i",6),e._uU(2),e.qZA()),2&s){const t=p.$implicit,l=e.oxw(2);e.Q6J("ngClass",l.getRoleStyleClass(t.user_rolesid)),e.xp6(2),e.hij(" ",t.fullname," ")}}function y(s,p){if(1&s&&(e.TgZ(0,"span",5),e._UZ(1,"i",6),e._uU(2),e.qZA()),2&s){const t=p.$implicit,l=e.oxw(2);e.Q6J("ngClass",l.getRoleStyleClass(t.user_rolesid)),e.xp6(2),e.hij(" ",null==t?null:t.fullname," ")}}function T(s,p){if(1&s){const t=e.EpF();e.TgZ(0,"p-dropdown",7),e.NdJ("ngModelChange",function(f){e.CHM(t);const v=e.oxw();return e.KtG(v.selecteduser=f)})("onChange",function(f){e.CHM(t);const v=e.oxw();return e.KtG(v.handleOnChange(f))}),e.ALo(1,"translate"),e.ALo(2,"translate"),e.YNc(3,O,3,2,"ng-template",3),e.YNc(4,y,3,2,"ng-template",4),e.qZA()}if(2&s){const t=e.oxw();e.Akn(e.DdM(11,u)),e.s9C("placeholder",e.lcZ(1,7,"V\xe1lasszon...")),e.s9C("emptyMessage",e.lcZ(2,9,"Nincs tal\xe1lat...")),e.Q6J("ngModel",t.selecteduser)("options",t.users)("showClear",t.showClear)}}let E=(()=>{class s{constructor(t,l){this.userService=t,this.roleService=l,this.change=new e.vpe,this.users=[],this.selecteduser="",this.roles=[]}ngOnInit(){this.userService.getUsersForSelector(this.user_rolesid).subscribe({next:t=>{t&&(this.users=this.user_rolesid?t.filter(l=>l.user_rolesid===this.user_rolesid):t,this.fetchRolesForUsers())}})}ngOnChanges(t){}fetchRolesForUsers(){this.roleService.fetchRoles().subscribe({next:t=>{this.roles=t}})}getFormControl(){return this.parentForm?this.parentForm.get(this.controlName):null}handleOnChange(t){this.change.emit({value:t.value,field:this.controlName})}getRoleStyleClass(t){const l=this.roles.find(v=>v.id==t);return`user-role-badge role-${l?l?.name?.trim().toLowerCase().replace(/\s+/g,""):""}`}static#e=this.\u0275fac=function(l){return new(l||s)(e.Y36(c.K),e.Y36(o.N))};static#t=this.\u0275cmp=e.Xpm({type:s,selectors:[["app-user-selector"]],inputs:{parentForm:"parentForm",controlName:"controlName",user_rolesid:"user_rolesid",showClear:"showClear"},outputs:{change:"change"},features:[e.TTD],decls:3,vars:2,consts:[["optionLabel","fullname","optionValue","id","appendTo","body",3,"formControl","options","placeholder","emptyMessage","showClear","style","onChange",4,"ngIf","ngIfElse"],["useNgModel",""],["optionLabel","fullname","optionValue","id","appendTo","body",3,"formControl","options","placeholder","emptyMessage","showClear","onChange"],["pTemplate","item"],["pTemplate","selectedItem"],[3,"ngClass"],[1,"pi","pi-user","mr-1"],["optionLabel","fullname","optionValue","id","appendTo","body",3,"ngModel","options","placeholder","emptyMessage","showClear","ngModelChange","onChange"]],template:function(l,f){if(1&l&&(e.YNc(0,C,5,12,"p-dropdown",0),e.YNc(1,T,5,12,"ng-template",null,1,e.W1O)),2&l){const v=e.MAs(2);e.Q6J("ngIf",f.getFormControl())("ngIfElse",v)}},dependencies:[m.mk,m.O5,g.JJ,g.On,g.oH,d.jx,i.Lt,n.X$],encapsulation:2})}return s})()},3139:(x,_,r)=>{r.d(_,{Q:()=>o});var e=r(8645),c=r(2029);let o=(()=>{class m{constructor(){this.mealChanged=new e.x,this.meals={breakfast:{begin:7,end:10},lunch:{begin:11,end:15},dinner:{begin:17,end:20}},this.checkMealStart(),setInterval(()=>{this.checkMealStart()},2e4)}checkMealStart(){const i=(new Date).getHours();for(const n of Object.keys(this.meals)){const a=this.meals[n];if(i>=a.begin&&i<a.end)return void this.mealChanged.next(n)}}getMealNameByTime(d){const i=d.getHours();for(const n in this.meals){const a=this.meals[n];if(i>=a.begin&&i<=a.end)return this.translateMealName(n)}return"Jelenleg nincs \xe9tkeztet\xe9s"}getMealsForSelector(){let d=[];for(const i in this.meals)d.push(this.translateMealName(i));return d}translateMealName(d){return{breakfast:"reggeli",lunch:"eb\xe9d",dinner:"vacsora"}[d]||d}isOpen(){const d=(new Date).getHours();for(const i in this.meals){const n=this.meals[i];if(d>=n.begin&&d<n.end)return!0}return!1}static#e=this.\u0275fac=function(i){return new(i||m)};static#t=this.\u0275prov=c.Yz7({token:m,factory:m.\u0275fac,providedIn:"root"})}return m})()},2835:(x,_,r)=>{r.d(_,{c:()=>m});var e=r(5619),c=r(2029),o=r(8814);let m=(()=>{class g{constructor(i){this.apiService=i,this.apiURL=i.apiURL,this.data$=new e.X(null),this.message$=new e.X(null)}get tagObs(){return this.data$.asObservable()}get messageObs(){return this.message$.asObservable()}get(i,n,a,h){let u="";""!==a&&(u=""!=a.sortField?`sort=${a.sortField}&order=${1===a.sortOrder?"ASC":"DESC"}`:"");const C=""!==u&&""!==h?u+"&"+h:""!==u&&""===h?u:""===u&&""!==h?h:"";this.apiService.get(`rfid/get/${i}/${n}${""!==C?"?"+C:""}`).subscribe({next:y=>{let T=y.rows;T&&T.length>0&&T.forEach(E=>{E.identifier=E.rfid}),this.data$.next(y)},error:y=>{this.message$.next(y)}})}getBySearch(i,n){let a="";""!==n&&(a=""!=n.sortField?`?sort=${n.sortField}&order=${1===n.sortOrder?"ASC":"DESC"}`:""),this.apiService.get(`rfid/search/${i}${a}`).subscribe({next:h=>{let u=h.rows;u&&u.length>0&&u.forEach(C=>{C.identifier=C.rfid}),this.data$.next(h)},error:h=>{this.message$.next(h)}})}getBySearchQuery(i){this.apiService.get(`rfid/searchquery?${i}`).subscribe({next:n=>{let a=n.rows;a&&a.length>0&&a.forEach(h=>{h.identifier=h.rfid}),this.data$.next(n)},error:n=>{this.message$.next(n)}})}create(i){this.apiService.post("rfid/create/",i).subscribe({next:n=>{this.message$.next({severity:"success",summary:"Sikeres c\xedmke r\xf6gz\xedt\xe9s",detail:`${i.rfid} r\xf6gz\xedtve`})},error:n=>{this.message$.next(n)}})}update(i){this.apiService.put(`rfid/update/${i.id}`,i).subscribe({next:()=>{this.message$.next({severity:"success",summary:"Sikeres c\xedmke m\xf3dos\xedt\xe1s",detail:`${i.rfid} m\xf3dos\xedtva`})},error:n=>{this.message$.next(n)}})}delete(i){this.apiService.delete(`rfid/delete/${i.id}`).subscribe({next:n=>{this.message$.next({severity:"success",summary:"Sikeres c\xedmke t\xf6rl\xe9s",detail:`${i.rfid} t\xf6r\xf6lve`})},error:n=>{this.message$.next(n)}})}bulkdelete(i){let n={ids:i.map(a=>a.id)};this.apiService.post("rfid/bulkdelete",n).subscribe({next:a=>{this.message$.next({severity:"success",summary:"Sikeres c\xedmke t\xf6rl\xe9s",detail:`${i.length} c\xedmke t\xf6r\xf6lve`})},error:a=>{this.message$.next(a)}})}getByRFID(i){return this.apiService.get(`rfid/search/${i}`)}static#e=this.\u0275fac=function(n){return new(n||g)(c.LFG(o.s))};static#t=this.\u0275prov=c.Yz7({token:g,factory:g.\u0275fac,providedIn:"root"})}return g})()},1836:(x,_,r)=>{function e(){return c=>/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(c.value)?null:{invalidEmail:{value:c.value}}}r.d(_,{u:()=>e})},8842:(x,_,r)=>{function e(){return c=>{const o=c.get("password"),m=c.get("password_again");return o&&m&&o.value!==m.value?{passwordsDoNotMatch:!0}:null}}r.d(_,{C:()=>e})},4532:(x,_,r)=>{r.d(_,{d:()=>E});var e=r(6814),c=r(2029),o=r(5219);let E=(()=>{class s{static \u0275fac=function(l){return new(l||s)};static \u0275mod=c.oAB({type:s});static \u0275inj=c.cJS({imports:[e.ez,o.m8]})}return s})()},1913:(x,_,r)=>{r.d(_,{h:()=>m,l:()=>g});var e=r(6814),c=r(2029),o=r(2076);let m=(()=>{class d{el;renderer;zone;constructor(n,a,h){this.el=n,this.renderer=a,this.zone=h}selector;enterClass;enterActiveClass;enterToClass;leaveClass;leaveActiveClass;leaveToClass;hideOnOutsideClick;toggleClass;hideOnEscape;eventListener;documentClickListener;documentKeydownListener;target;enterListener;leaveListener;animating;clickListener(){this.target=this.resolveTarget(),this.toggleClass?this.toggle():null===this.target.offsetParent?this.enter():this.leave()}toggle(){o.p.hasClass(this.target,this.toggleClass)?o.p.removeClass(this.target,this.toggleClass):o.p.addClass(this.target,this.toggleClass)}enter(){this.enterActiveClass?this.animating||(this.animating=!0,"slidedown"===this.enterActiveClass&&(this.target.style.height="0px",o.p.removeClass(this.target,"hidden"),this.target.style.maxHeight=this.target.scrollHeight+"px",o.p.addClass(this.target,"hidden"),this.target.style.height=""),o.p.addClass(this.target,this.enterActiveClass),this.enterClass&&o.p.removeClass(this.target,this.enterClass),this.enterListener=this.renderer.listen(this.target,"animationend",()=>{o.p.removeClass(this.target,this.enterActiveClass),this.enterToClass&&o.p.addClass(this.target,this.enterToClass),this.enterListener&&this.enterListener(),"slidedown"===this.enterActiveClass&&(this.target.style.maxHeight=""),this.animating=!1})):(this.enterClass&&o.p.removeClass(this.target,this.enterClass),this.enterToClass&&o.p.addClass(this.target,this.enterToClass)),this.hideOnOutsideClick&&this.bindDocumentClickListener(),this.hideOnEscape&&this.bindDocumentKeydownListener()}leave(){this.leaveActiveClass?this.animating||(this.animating=!0,o.p.addClass(this.target,this.leaveActiveClass),this.leaveClass&&o.p.removeClass(this.target,this.leaveClass),this.leaveListener=this.renderer.listen(this.target,"animationend",()=>{o.p.removeClass(this.target,this.leaveActiveClass),this.leaveToClass&&o.p.addClass(this.target,this.leaveToClass),this.leaveListener&&this.leaveListener(),this.animating=!1})):(this.leaveClass&&o.p.removeClass(this.target,this.leaveClass),this.leaveToClass&&o.p.addClass(this.target,this.leaveToClass)),this.hideOnOutsideClick&&this.unbindDocumentClickListener(),this.hideOnEscape&&this.unbindDocumentKeydownListener()}resolveTarget(){if(this.target)return this.target;switch(this.selector){case"@next":return this.el.nativeElement.nextElementSibling;case"@prev":return this.el.nativeElement.previousElementSibling;case"@parent":return this.el.nativeElement.parentElement;case"@grandparent":return this.el.nativeElement.parentElement.parentElement;default:return document.querySelector(this.selector)}}bindDocumentClickListener(){this.documentClickListener||(this.documentClickListener=this.renderer.listen(this.el.nativeElement.ownerDocument,"click",n=>{this.isVisible()&&"static"!==getComputedStyle(this.target).getPropertyValue("position")?this.isOutsideClick(n)&&this.leave():this.unbindDocumentClickListener()}))}bindDocumentKeydownListener(){this.documentKeydownListener||this.zone.runOutsideAngular(()=>{this.documentKeydownListener=this.renderer.listen(this.el.nativeElement.ownerDocument,"keydown",n=>{const{key:a,keyCode:h,which:u}=n;(!this.isVisible()||"static"===getComputedStyle(this.target).getPropertyValue("position"))&&this.unbindDocumentKeydownListener(),this.isVisible()&&"Escape"===a&&27===h&&27===u&&this.leave()})})}isVisible(){return null!==this.target.offsetParent}isOutsideClick(n){return!this.el.nativeElement.isSameNode(n.target)&&!this.el.nativeElement.contains(n.target)&&!this.target.contains(n.target)}unbindDocumentClickListener(){this.documentClickListener&&(this.documentClickListener(),this.documentClickListener=null)}unbindDocumentKeydownListener(){this.documentKeydownListener&&(this.documentKeydownListener(),this.documentKeydownListener=null)}ngOnDestroy(){this.target=null,this.eventListener&&this.eventListener(),this.unbindDocumentClickListener(),this.unbindDocumentKeydownListener()}static \u0275fac=function(a){return new(a||d)(c.Y36(c.SBq),c.Y36(c.Qsj),c.Y36(c.R0b))};static \u0275dir=c.lG2({type:d,selectors:[["","pStyleClass",""]],hostAttrs:[1,"p-element"],hostBindings:function(a,h){1&a&&c.NdJ("click",function(C){return h.clickListener(C)})},inputs:{selector:["pStyleClass","selector"],enterClass:"enterClass",enterActiveClass:"enterActiveClass",enterToClass:"enterToClass",leaveClass:"leaveClass",leaveActiveClass:"leaveActiveClass",leaveToClass:"leaveToClass",hideOnOutsideClick:"hideOnOutsideClick",toggleClass:"toggleClass",hideOnEscape:"hideOnEscape"}})}return d})(),g=(()=>{class d{static \u0275fac=function(a){return new(a||d)};static \u0275mod=c.oAB({type:d});static \u0275inj=c.cJS({imports:[e.ez]})}return d})()}}]);