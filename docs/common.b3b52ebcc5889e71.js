"use strict";(self.webpackChunknfc_reserve=self.webpackChunknfc_reserve||[]).push([[592],{7939:(M,y,c)=>{c.d(y,{H:()=>E});var e=c(2029),m=c(9515),_=c(6814),f=c(6223),g=c(5219),C=c(2352);function l(r,i){if(1&r&&(e.TgZ(0,"span",5),e._uU(1),e.qZA()),2&r){const a=i.$implicit;e.Q6J("ngClass","meal-badge "+(null==a?null:a.style)),e.xp6(1),e.hij(" ",a.label," ")}}function s(r,i){if(1&r&&(e.TgZ(0,"span",5),e._uU(1),e.qZA()),2&r){const a=i.$implicit;e.Q6J("ngClass","meal-badge "+(null==a?null:a.style)),e.xp6(1),e.hij(" ",null==a?null:a.label," ")}}function o(r,i){if(1&r){const a=e.EpF();e.TgZ(0,"p-dropdown",2),e.NdJ("onChange",function(p){e.CHM(a);const n=e.oxw();return e.KtG(n.handleOnChange(p))}),e.ALo(1,"translate"),e.ALo(2,"translate"),e.YNc(3,l,2,2,"ng-template",3),e.YNc(4,s,2,2,"ng-template",4),e.qZA()}if(2&r){const a=i.ngIf,t=e.oxw();e.s9C("placeholder",e.lcZ(1,5,"V\xe1lasszon...")),e.s9C("emptyMessage",e.lcZ(2,7,"Nincs tal\xe1lat...")),e.Q6J("formControl",a)("options",t.meals)("showClear",t.showClear)}}function d(r,i){if(1&r&&(e.TgZ(0,"span",5),e._uU(1),e.qZA()),2&r){const a=i.$implicit;e.Q6J("ngClass","meal-badge "+(null==a?null:a.style)),e.xp6(1),e.hij(" ",a.label," ")}}function h(r,i){if(1&r&&(e.TgZ(0,"span",5),e._uU(1),e.qZA()),2&r){const a=i.$implicit;e.Q6J("ngClass","meal-badge "+(null==a?null:a.style)),e.xp6(1),e.hij(" ",null==a?null:a.label," ")}}function v(r,i){if(1&r){const a=e.EpF();e.TgZ(0,"p-dropdown",6),e.NdJ("ngModelChange",function(p){e.CHM(a);const n=e.oxw();return e.KtG(n.selectedMeal=p)})("onChange",function(p){e.CHM(a);const n=e.oxw();return e.KtG(n.handleOnChange(p))}),e.ALo(1,"translate"),e.ALo(2,"translate"),e.YNc(3,d,2,2,"ng-template",3),e.YNc(4,h,2,2,"ng-template",4),e.qZA()}if(2&r){const a=e.oxw();e.s9C("placeholder",e.lcZ(1,5,"V\xe1lasszon...")),e.s9C("emptyMessage",e.lcZ(2,7,"Nincs tal\xe1lat...")),e.Q6J("ngModel",a.selectedMeal)("options",a.meals)("showClear",a.showClear)}}let E=(()=>{class r{constructor(a){this.translate=a,this.change=new e.vpe,this.meals=[],this.selectedMeal=""}ngOnInit(){this.translate.onLangChange.subscribe(()=>{this.setMeals()})}ngOnChanges(a){this.setMeals()}getFormControl(){return this.parentForm&&this.controlName?this.parentForm.get(this.controlName):null}setMeals(){if(this.meals=[{label:this.translate.instant("MEALS.BREAKFAST"),value:"reggeli",style:"breakfast"},{label:this.translate.instant("MEALS.LUNCH"),value:"eb\xe9d",style:"lunch"},{label:this.translate.instant("MEALS.DINNER"),value:"vacsora",style:"dinner"}],this.earliestMeal){const a=this.meals.findIndex(t=>t.value===this.earliestMeal);a>-1&&(this.meals=this.meals.slice(a))}if(this.latestMeal){const a=this.meals.findIndex(t=>t.value===this.latestMeal);a>-1&&(this.meals=this.meals.slice(0,a+1))}this.showNothing&&this.meals.push({label:this.translate.instant("MEALS.NOTHING"),value:"nem k\xe9r \xe9tkez\xe9st",style:"nothing"})}setEarliestMeal(a){this.earliestMeal=a,this.setMeals()}setLatestMeal(a){this.latestMeal=a,this.setMeals()}handleOnChange(a){this.change.emit({value:a.value,field:this.controlName})}static#e=this.\u0275fac=function(t){return new(t||r)(e.Y36(m.sK))};static#t=this.\u0275cmp=e.Xpm({type:r,selectors:[["app-meal-selector"]],inputs:{parentForm:"parentForm",controlName:"controlName",showClear:"showClear",showNothing:"showNothing",earliestMeal:"earliestMeal",latestMeal:"latestMeal"},outputs:{change:"change"},features:[e.TTD],decls:3,vars:2,consts:[["optionLabel","label","optionValue","value","appendTo","body",3,"formControl","options","placeholder","emptyMessage","showClear","onChange",4,"ngIf","ngIfElse"],["useNgModel",""],["optionLabel","label","optionValue","value","appendTo","body",3,"formControl","options","placeholder","emptyMessage","showClear","onChange"],["pTemplate","item"],["pTemplate","selectedItem"],[3,"ngClass"],["optionLabel","label","optionValue","value","appendTo","body",3,"ngModel","options","placeholder","emptyMessage","showClear","ngModelChange","onChange"]],template:function(t,p){if(1&t&&(e.YNc(0,o,5,9,"p-dropdown",0),e.YNc(1,v,5,9,"ng-template",null,1,e.W1O)),2&t){const n=e.MAs(2);e.Q6J("ngIf",p.getFormControl())("ngIfElse",n)}},dependencies:[_.mk,_.O5,f.JJ,f.On,f.oH,g.jx,C.Lt,m.X$],encapsulation:2})}return r})()},117:(M,y,c)=>{c.d(y,{T:()=>a});var e=c(2029),m=c(1206),_=c(6193),f=c(6814),g=c(6223),C=c(5219),l=c(2352),s=c(9515);function o(t,p){if(1&t&&(e.TgZ(0,"span",5),e._UZ(1,"i",6),e._uU(2),e.qZA()),2&t){const n=p.$implicit,u=e.oxw(2);e.Q6J("ngClass",u.getRoleStyleClass(n.user_rolesid)),e.xp6(2),e.hij(" ",n.fullname," ")}}function d(t,p){if(1&t&&(e.TgZ(0,"span",5),e._UZ(1,"i",6),e._uU(2),e.qZA()),2&t){const n=p.$implicit,u=e.oxw(2);e.Q6J("ngClass",u.getRoleStyleClass(n.user_rolesid)),e.xp6(2),e.hij(" ",n.fullname," ")}}const h=function(){return{minWidth:"13rem"}};function v(t,p){if(1&t){const n=e.EpF();e.TgZ(0,"p-dropdown",2),e.NdJ("onChange",function(x){e.CHM(n);const T=e.oxw();return e.KtG(T.handleOnChange(x))}),e.ALo(1,"translate"),e.ALo(2,"translate"),e.YNc(3,o,3,2,"ng-template",3),e.YNc(4,d,3,2,"ng-template",4),e.qZA()}if(2&t){const n=p.ngIf,u=e.oxw();e.Akn(e.DdM(11,h)),e.s9C("placeholder",e.lcZ(1,7,"V\xe1lasszon...")),e.s9C("emptyMessage",e.lcZ(2,9,"Nincs tal\xe1lat...")),e.Q6J("formControl",n)("options",u.users)("showClear",u.showClear)}}function E(t,p){if(1&t&&(e.TgZ(0,"span",5),e._UZ(1,"i",6),e._uU(2),e.qZA()),2&t){const n=p.$implicit,u=e.oxw(2);e.Q6J("ngClass",u.getRoleStyleClass(n.user_rolesid)),e.xp6(2),e.hij(" ",n.fullname," ")}}function r(t,p){if(1&t&&(e.TgZ(0,"span",5),e._UZ(1,"i",6),e._uU(2),e.qZA()),2&t){const n=p.$implicit,u=e.oxw(2);e.Q6J("ngClass",u.getRoleStyleClass(n.user_rolesid)),e.xp6(2),e.hij(" ",null==n?null:n.fullname," ")}}function i(t,p){if(1&t){const n=e.EpF();e.TgZ(0,"p-dropdown",7),e.NdJ("ngModelChange",function(x){e.CHM(n);const T=e.oxw();return e.KtG(T.selecteduser=x)})("onChange",function(x){e.CHM(n);const T=e.oxw();return e.KtG(T.handleOnChange(x))}),e.ALo(1,"translate"),e.ALo(2,"translate"),e.YNc(3,E,3,2,"ng-template",3),e.YNc(4,r,3,2,"ng-template",4),e.qZA()}if(2&t){const n=e.oxw();e.Akn(e.DdM(11,h)),e.s9C("placeholder",e.lcZ(1,7,"V\xe1lasszon...")),e.s9C("emptyMessage",e.lcZ(2,9,"Nincs tal\xe1lat...")),e.Q6J("ngModel",n.selecteduser)("options",n.users)("showClear",n.showClear)}}let a=(()=>{class t{constructor(n,u){this.userService=n,this.roleService=u,this.change=new e.vpe,this.users=[],this.selecteduser="",this.roles=[]}ngOnInit(){this.userService.getUsersForSelector(this.user_rolesid).subscribe({next:n=>{n&&(this.users=this.user_rolesid?n.filter(u=>u.user_rolesid===this.user_rolesid):n,this.fetchRolesForUsers())}})}ngOnChanges(n){}fetchRolesForUsers(){this.roleService.fetchRoles().subscribe({next:n=>{this.roles=n}})}getFormControl(){return this.parentForm?this.parentForm.get(this.controlName):null}handleOnChange(n){this.change.emit({value:n.value,field:this.controlName})}getRoleStyleClass(n){const u=this.roles.find(T=>T.id==n);return`user-role-badge role-${u?u?.name?.trim().toLowerCase().replace(/\s+/g,""):""}`}static#e=this.\u0275fac=function(u){return new(u||t)(e.Y36(m.K),e.Y36(_.N))};static#t=this.\u0275cmp=e.Xpm({type:t,selectors:[["app-user-selector"]],inputs:{parentForm:"parentForm",controlName:"controlName",user_rolesid:"user_rolesid",showClear:"showClear"},outputs:{change:"change"},features:[e.TTD],decls:3,vars:2,consts:[["optionLabel","fullname","optionValue","id","appendTo","body",3,"formControl","options","placeholder","emptyMessage","showClear","style","onChange",4,"ngIf","ngIfElse"],["useNgModel",""],["optionLabel","fullname","optionValue","id","appendTo","body",3,"formControl","options","placeholder","emptyMessage","showClear","onChange"],["pTemplate","item"],["pTemplate","selectedItem"],[3,"ngClass"],[1,"pi","pi-user","mr-1"],["optionLabel","fullname","optionValue","id","appendTo","body",3,"ngModel","options","placeholder","emptyMessage","showClear","ngModelChange","onChange"]],template:function(u,x){if(1&u&&(e.YNc(0,v,5,12,"p-dropdown",0),e.YNc(1,i,5,12,"ng-template",null,1,e.W1O)),2&u){const T=e.MAs(2);e.Q6J("ngIf",x.getFormControl())("ngIfElse",T)}},dependencies:[f.mk,f.O5,g.JJ,g.On,g.oH,C.jx,l.Lt,s.X$],encapsulation:2})}return t})()},3763:(M,y,c)=>{c.d(y,{$:()=>f});var e=c(5619),m=c(2029),_=c(8814);let f=(()=>{class g{constructor(l){this.apiService=l,this.apiURL=l.apiURL,this.data$=new e.X(null),this.message$=new e.X(null)}get logObs(){return this.data$.asObservable()}get messageObs(){return this.message$.asObservable()}get(l,s,o,d){let h="";""!==o&&(h=""!=o.sortField?`sort=${o.sortField}&order=${1===o.sortOrder?"ASC":"DESC"}`:"");const v=""!==h&&""!==d?h+"&"+d:""!==h&&""===d?h:""===h&&""!==d?d:"";this.apiService.get(`logs/get/${l}/${s}${""!==v?"?"+v:""}`).subscribe({next:r=>{r&&r.rows?.length&&(r.rows=r.rows.filter(i=>"updatelasttagusage"!==i.action_type),r.rows=r.rows.filter(i=>"questions"!==i.table_name),r.rows=r.rows.filter(i=>"answers"!==i.table_name),r.rows=r.rows.filter(i=>{if("update"==i.action_type){let a=JSON.parse(i.original_data),t=JSON.parse(i.new_data);if(null==a.rfid&&null!==t.rfid)return!1}return!0}),r.rows.forEach(i=>{if(i.expandable=this.isRowExpandable(i),i.status||(i.response_data=i.original_data),"{}"==i.new_data?i.new_data=null:"{}"==i.original_data?i.original_data=null:"{}"==i.response_data&&(i.response_data=null),200==i.status){let t=JSON.parse(i.response_data).message;if(t){let p=JSON.parse(i.original_data);i.response_data="Success delete"==t?`${p.lastName} ${p.firstName} t\xf6r\xf6lve`:"Update success"==t?`${p.fullname} m\xf3dos\xedtva`:"Guest updated successfully"==t?`${p.lastName} ${p.firstName} m\xf3dos\xedtva`:t}}if(201==i.status){let a=JSON.parse(i.new_data),t="";if("conference"==i.table_name)t=`${a?.name} konferencia l\xe9trehozva`;else if("guest"==i.table_name)if(null==i.new_data){let n=JSON.parse(JSON.stringify(JSON.parse(i.response_data))).guest||{};i.original_data=JSON.stringify(n),t=`${n.lastName||"N\xe9v hi\xe1nyzik"} ${n.firstName||"N\xe9v hi\xe1nyzik"} vend\xe9g regisztr\xe1lva`}else t=`${a?.lastName} ${a?.firstName} vend\xe9g l\xe9trehozva`;else"users"==i.table_name&&(t=`${a?.fullname} felhaszn\xe1l\xf3 l\xe9trehozva`);i.response_data=t}if(400==i.status){let a=JSON.parse(i.response_data),t=a.error,p=a.message;p&&(i.response_data=p),t&&(i.original_data=JSON.stringify(t))}})),this.data$.next(r)},error:r=>{this.message$.next(r)}})}getBySearch(l,s){let o="";""!==s&&(o=""!=s.sortField?`?sort=${s.sortField}&order=${1===s.sortOrder?"ASC":"DESC"}`:""),this.apiService.get(`logs/search/${l}${o}`).subscribe({next:d=>{this.data$.next(d)},error:d=>{this.message$.next(d)}})}getBySearchQuery(l){this.apiService.get(`logs/searchquery?${l}`).subscribe({next:s=>{this.data$.next(s)},error:s=>{this.message$.next(s)}})}create(l){l.userid=Number(localStorage.getItem("userid"))||1,l.user_fullname=localStorage.getItem("fullname")||"SYSTEM",l.user_email=localStorage.getItem("email")||"info@nfcreserve.com",this.apiService.post("logs/create/",l).subscribe({next:s=>{this.message$.next({severity:"success",summary:"Sikeres log r\xf6gz\xedt\xe9s",detail:"Log r\xf6gz\xedtve"})},error:s=>{this.message$.next(s)}})}update(l){this.apiService.put(`logs/update/${l.id}`,l).subscribe({next:()=>{this.message$.next({severity:"success",summary:"Sikeres log m\xf3dos\xedt\xe1s",detail:"Log m\xf3dos\xedtva"})},error:s=>{this.message$.next(s)}})}delete(l){this.apiService.delete(`logs/delete/${l.id}`).subscribe({next:s=>{this.message$.next({severity:"success",summary:"Sikeres log t\xf6rl\xe9s",detail:"Log t\xf6r\xf6lve"})},error:s=>{this.message$.next(s)}})}bulkdelete(l){let s={ids:l.map(o=>o.id)};this.apiService.post("logs/bulkdelete",s).subscribe({next:o=>{this.message$.next({severity:"success",summary:"Sikeres log t\xf6rl\xe9s",detail:`${l.length} log t\xf6r\xf6lve`})},error:o=>{this.message$.next(o)}})}isRowExpandable(l){return!!l.action_type&&!["scanned code","assign tag","unassign","same code","tag duplicate","already received food","unknown device","import"].includes(l.action_type?.toLowerCase())}static#e=this.\u0275fac=function(s){return new(s||g)(m.LFG(_.s))};static#t=this.\u0275prov=m.Yz7({token:g,factory:g.\u0275fac,providedIn:"root"})}return g})()},2835:(M,y,c)=>{c.d(y,{c:()=>f});var e=c(5619),m=c(2029),_=c(8814);let f=(()=>{class g{constructor(l){this.apiService=l,this.apiURL=l.apiURL,this.data$=new e.X(null),this.message$=new e.X(null)}get tagObs(){return this.data$.asObservable()}get messageObs(){return this.message$.asObservable()}get(l,s,o,d){let h="";""!==o&&(h=""!=o.sortField?`sort=${o.sortField}&order=${1===o.sortOrder?"ASC":"DESC"}`:"");const v=""!==h&&""!==d?h+"&"+d:""!==h&&""===d?h:""===h&&""!==d?d:"";this.apiService.get(`rfid/get/${l}/${s}${""!==v?"?"+v:""}`).subscribe({next:r=>{let i=r.rows;i&&i.length>0&&i.forEach(a=>{a.identifier=a.rfid}),this.data$.next(r)},error:r=>{this.message$.next(r)}})}getBySearch(l,s){let o="";""!==s&&(o=""!=s.sortField?`?sort=${s.sortField}&order=${1===s.sortOrder?"ASC":"DESC"}`:""),this.apiService.get(`rfid/search/${l}${o}`).subscribe({next:d=>{let h=d.rows;h&&h.length>0&&h.forEach(v=>{v.identifier=v.rfid}),this.data$.next(d)},error:d=>{this.message$.next(d)}})}getBySearchQuery(l){this.apiService.get(`rfid/searchquery?${l}`).subscribe({next:s=>{let o=s.rows;o&&o.length>0&&o.forEach(d=>{d.identifier=d.rfid}),this.data$.next(s)},error:s=>{this.message$.next(s)}})}create(l){this.apiService.post("rfid/create/",l).subscribe({next:s=>{this.message$.next({severity:"success",summary:"Sikeres c\xedmke r\xf6gz\xedt\xe9s",detail:`${l.identifier} r\xf6gz\xedtve`})},error:s=>{this.message$.next(s)}})}update(l){this.apiService.put(`rfid/update/${l.id}`,l).subscribe({next:()=>{this.message$.next({severity:"success",summary:"Sikeres c\xedmke m\xf3dos\xedt\xe1s",detail:`${l.identifier} m\xf3dos\xedtva`})},error:s=>{this.message$.next(s)}})}delete(l){this.apiService.delete(`rfid/delete/${l.id}`).subscribe({next:s=>{this.message$.next({severity:"success",summary:"Sikeres c\xedmke t\xf6rl\xe9s",detail:`${l.identifier} t\xf6r\xf6lve`})},error:s=>{this.message$.next(s)}})}bulkdelete(l){let s={ids:l.map(o=>o.id)};this.apiService.post("rfid/bulkdelete",s).subscribe({next:o=>{this.message$.next({severity:"success",summary:"Sikeres c\xedmke t\xf6rl\xe9s",detail:`${l.length} c\xedmke t\xf6r\xf6lve`})},error:o=>{this.message$.next(o)}})}getByRFID(l){return this.apiService.get(`rfid/search/${l}`)}static#e=this.\u0275fac=function(s){return new(s||g)(m.LFG(_.s))};static#t=this.\u0275prov=m.Yz7({token:g,factory:g.\u0275fac,providedIn:"root"})}return g})()},1836:(M,y,c)=>{function e(){return m=>/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(m.value)?null:{invalidEmail:{value:m.value}}}c.d(y,{u:()=>e})},8842:(M,y,c)=>{function e(){return m=>{const _=m.get("password"),f=m.get("password_again");return _&&f&&_.value!==f.value?{passwordsDoNotMatch:!0}:null}}c.d(y,{C:()=>e})},3620:(M,y,c)=>{c.d(y,{b:()=>f});var e=c(2832),m=c(9360),_=c(8251);function f(g,C=e.z){return(0,m.e)((l,s)=>{let o=null,d=null,h=null;const v=()=>{if(o){o.unsubscribe(),o=null;const r=d;d=null,s.next(r)}};function E(){const r=h+g,i=C.now();if(i<r)return o=this.schedule(void 0,r-i),void s.add(o);v()}l.subscribe((0,_.x)(s,r=>{d=r,h=C.now(),o||(o=C.schedule(E,g),s.add(o))},()=>{v(),s.complete()},void 0,()=>{d=o=null}))})}},4532:(M,y,c)=>{c.d(y,{d:()=>a});var e=c(6814),m=c(2029),_=c(5219);let a=(()=>{class t{static \u0275fac=function(u){return new(u||t)};static \u0275mod=m.oAB({type:t});static \u0275inj=m.cJS({imports:[e.ez,_.m8]})}return t})()},1913:(M,y,c)=>{c.d(y,{h:()=>f,l:()=>g});var e=c(6814),m=c(2029),_=c(2076);let f=(()=>{class C{el;renderer;zone;constructor(s,o,d){this.el=s,this.renderer=o,this.zone=d}selector;enterClass;enterActiveClass;enterToClass;leaveClass;leaveActiveClass;leaveToClass;hideOnOutsideClick;toggleClass;hideOnEscape;eventListener;documentClickListener;documentKeydownListener;target;enterListener;leaveListener;animating;clickListener(){this.target=this.resolveTarget(),this.toggleClass?this.toggle():null===this.target.offsetParent?this.enter():this.leave()}toggle(){_.p.hasClass(this.target,this.toggleClass)?_.p.removeClass(this.target,this.toggleClass):_.p.addClass(this.target,this.toggleClass)}enter(){this.enterActiveClass?this.animating||(this.animating=!0,"slidedown"===this.enterActiveClass&&(this.target.style.height="0px",_.p.removeClass(this.target,"hidden"),this.target.style.maxHeight=this.target.scrollHeight+"px",_.p.addClass(this.target,"hidden"),this.target.style.height=""),_.p.addClass(this.target,this.enterActiveClass),this.enterClass&&_.p.removeClass(this.target,this.enterClass),this.enterListener=this.renderer.listen(this.target,"animationend",()=>{_.p.removeClass(this.target,this.enterActiveClass),this.enterToClass&&_.p.addClass(this.target,this.enterToClass),this.enterListener&&this.enterListener(),"slidedown"===this.enterActiveClass&&(this.target.style.maxHeight=""),this.animating=!1})):(this.enterClass&&_.p.removeClass(this.target,this.enterClass),this.enterToClass&&_.p.addClass(this.target,this.enterToClass)),this.hideOnOutsideClick&&this.bindDocumentClickListener(),this.hideOnEscape&&this.bindDocumentKeydownListener()}leave(){this.leaveActiveClass?this.animating||(this.animating=!0,_.p.addClass(this.target,this.leaveActiveClass),this.leaveClass&&_.p.removeClass(this.target,this.leaveClass),this.leaveListener=this.renderer.listen(this.target,"animationend",()=>{_.p.removeClass(this.target,this.leaveActiveClass),this.leaveToClass&&_.p.addClass(this.target,this.leaveToClass),this.leaveListener&&this.leaveListener(),this.animating=!1})):(this.leaveClass&&_.p.removeClass(this.target,this.leaveClass),this.leaveToClass&&_.p.addClass(this.target,this.leaveToClass)),this.hideOnOutsideClick&&this.unbindDocumentClickListener(),this.hideOnEscape&&this.unbindDocumentKeydownListener()}resolveTarget(){if(this.target)return this.target;switch(this.selector){case"@next":return this.el.nativeElement.nextElementSibling;case"@prev":return this.el.nativeElement.previousElementSibling;case"@parent":return this.el.nativeElement.parentElement;case"@grandparent":return this.el.nativeElement.parentElement.parentElement;default:return document.querySelector(this.selector)}}bindDocumentClickListener(){this.documentClickListener||(this.documentClickListener=this.renderer.listen(this.el.nativeElement.ownerDocument,"click",s=>{this.isVisible()&&"static"!==getComputedStyle(this.target).getPropertyValue("position")?this.isOutsideClick(s)&&this.leave():this.unbindDocumentClickListener()}))}bindDocumentKeydownListener(){this.documentKeydownListener||this.zone.runOutsideAngular(()=>{this.documentKeydownListener=this.renderer.listen(this.el.nativeElement.ownerDocument,"keydown",s=>{const{key:o,keyCode:d,which:h}=s;(!this.isVisible()||"static"===getComputedStyle(this.target).getPropertyValue("position"))&&this.unbindDocumentKeydownListener(),this.isVisible()&&"Escape"===o&&27===d&&27===h&&this.leave()})})}isVisible(){return null!==this.target.offsetParent}isOutsideClick(s){return!this.el.nativeElement.isSameNode(s.target)&&!this.el.nativeElement.contains(s.target)&&!this.target.contains(s.target)}unbindDocumentClickListener(){this.documentClickListener&&(this.documentClickListener(),this.documentClickListener=null)}unbindDocumentKeydownListener(){this.documentKeydownListener&&(this.documentKeydownListener(),this.documentKeydownListener=null)}ngOnDestroy(){this.target=null,this.eventListener&&this.eventListener(),this.unbindDocumentClickListener(),this.unbindDocumentKeydownListener()}static \u0275fac=function(o){return new(o||C)(m.Y36(m.SBq),m.Y36(m.Qsj),m.Y36(m.R0b))};static \u0275dir=m.lG2({type:C,selectors:[["","pStyleClass",""]],hostAttrs:[1,"p-element"],hostBindings:function(o,d){1&o&&m.NdJ("click",function(v){return d.clickListener(v)})},inputs:{selector:["pStyleClass","selector"],enterClass:"enterClass",enterActiveClass:"enterActiveClass",enterToClass:"enterToClass",leaveClass:"leaveClass",leaveActiveClass:"leaveActiveClass",leaveToClass:"leaveToClass",hideOnOutsideClick:"hideOnOutsideClick",toggleClass:"toggleClass",hideOnEscape:"hideOnEscape"}})}return C})(),g=(()=>{class C{static \u0275fac=function(o){return new(o||C)};static \u0275mod=m.oAB({type:C});static \u0275inj=m.cJS({imports:[e.ez]})}return C})()}}]);