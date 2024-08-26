"use strict";(self.webpackChunknfc_reserve=self.webpackChunknfc_reserve||[]).push([[1246],{746:(O,$,u)=>{u.d($,{Q:()=>a});var f=u(5619),e=u(9397),E=u(6306),v=u(2096),C=u(2029),_=u(8814);let a=(()=>{class n{constructor(s){this.apiService=s,this.apiURL=s.apiURL,this.guestData$=new f.X(null),this.serviceMessage$=new f.X(null)}get guestObs(){return this.guestData$.asObservable()}get serviceMessageObs(){return this.serviceMessage$.asObservable()}getGuests(s,i,h,b){let p="";""!==h&&(p=""!=h.sortField?`sort=${h.sortField}&order=${1===h.sortOrder?"ASC":"DESC"}`:"");const c=""!==p&&""!==b?p+"&"+b:""!==p&&""===b?p:""===p&&""!==b?b:"";this.apiService.get(`guest/get/${s}/${i}${""!==c?"?"+c:""}`).subscribe({next:g=>{this.guestData$.next(g)},error:g=>{this.serviceMessage$.next(g)}})}getGuestsBySearch(s,i){let h="";""!==i&&(h=""!=i.sortField?`?sort=${i.sortField}&order=${1===i.sortOrder?"ASC":"DESC"}`:""),this.apiService.get(`guest/search/${s}${h}`).subscribe({next:b=>{this.guestData$.next(b)},error:b=>{this.serviceMessage$.next(b)}})}getGuestsBySearchQuery(s){this.apiService.get(`guest/searchquery?${s}`).subscribe({next:i=>{this.guestData$.next(i)},error:i=>{this.serviceMessage$.next(i)}})}getByRFID(s){return this.apiService.get(`guest/getbyrfid/${s}`)}updateLastTagUsage(s){console.log("updateLastTagUsage",s),this.apiService.get(`guest/updatelasttagusage/${s}`).subscribe({next:i=>{},error:i=>{this.serviceMessage$.next(i)}})}createGuest(s){this.apiService.post("guest/create/",s).subscribe({next:i=>{this.serviceMessage$.next("success")},error:i=>{this.serviceMessage$.next(i)}})}updateGuest(s){this.apiService.put(`guest/update/${s.id}`,s).subscribe({next:()=>{this.serviceMessage$.next("success")},error:i=>{this.serviceMessage$.next(i)}})}updateGuest2(s){return this.apiService.put(`guest/update/${s.id}`,s).pipe((0,e.b)(()=>console.log(`updated guest id=${s.id}`)),(0,E.K)(this.handleError("updateGuest2")))}deleteGuest(s){this.apiService.delete(`guest/delete/${s.id}`).subscribe({next:i=>{this.serviceMessage$.next(i)},error:i=>{this.serviceMessage$.next(i)}})}deleteGuests(s){let i={ids:s.map(h=>h.id)};this.apiService.post("guest/bulkdelete",i).subscribe({next:h=>{this.serviceMessage$.next(h)},error:h=>{this.serviceMessage$.next(h)}})}handleError(s="operation",i){return h=>(console.error(h),console.error(`${s} failed: ${h.message}`),(0,v.of)(i))}static#e=this.\u0275fac=function(i){return new(i||n)(C.LFG(_.s))};static#t=this.\u0275prov=C.Yz7({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})()},3763:(O,$,u)=>{u.d($,{$:()=>v});var f=u(5619),e=u(2029),E=u(8814);let v=(()=>{class C{constructor(a){this.apiService=a,this.apiURL=a.apiURL,this.data$=new f.X(null),this.message$=new f.X(null)}get logObs(){return this.data$.asObservable()}get messageObs(){return this.message$.asObservable()}get(a,n,d,s){let i="";""!==d&&(i=""!=d.sortField?`sort=${d.sortField}&order=${1===d.sortOrder?"ASC":"DESC"}`:"");const h=""!==i&&""!==s?i+"&"+s:""!==i&&""===s?i:""===i&&""!==s?s:"";this.apiService.get(`logs/get/${a}/${n}${""!==h?"?"+h:""}`).subscribe({next:p=>{p&&p.rows?.length&&p.rows.forEach(c=>{if(c.expandable=this.isRowExpandable(c),c.status||(c.response_data=c.original_data),200==c.status){let g=JSON.parse(c.response_data).message;if(g){let k=JSON.parse(c.original_data);c.response_data="Success delete"==g?`${k.fullname} felhaszn\xe1l\xf3 t\xf6r\xf6lve`:"Update success"==g?`${k.fullname} felhaszn\xe1l\xf3 m\xf3dos\xedtva`:"Guest updated successfully"==g?`${k.lastName} ${k.firstName} vend\xe9g m\xf3dos\xedtva`:g}}if(201==c.status){let m=JSON.parse(c.new_data),g="";"conference"==c.table_name?g=`${m.name} konferencia l\xe9trehozva`:"guest"==c.table_name?g=`${m.lastName} ${m.firstName} vend\xe9g l\xe9trehozva`:"users"==c.table_name&&(g=`${m.fullname} felhaszn\xe1l\xf3 l\xe9trehozva`),c.response_data=g}if(400==c.status){let m=JSON.parse(c.response_data),g=m.error,k=m.message;k&&(c.response_data=k),g&&(c.original_data=JSON.stringify(g))}}),this.data$.next(p)},error:p=>{this.message$.next(p)}})}getBySearch(a,n){let d="";""!==n&&(d=""!=n.sortField?`?sort=${n.sortField}&order=${1===n.sortOrder?"ASC":"DESC"}`:""),this.apiService.get(`logs/search/${a}${d}`).subscribe({next:s=>{this.data$.next(s)},error:s=>{this.message$.next(s)}})}getBySearchQuery(a){this.apiService.get(`logs/searchquery?${a}`).subscribe({next:n=>{this.data$.next(n)},error:n=>{this.message$.next(n)}})}create(a){a.userid=1,this.apiService.post("logs/create/",a).subscribe({next:n=>{this.message$.next({severity:"success",summary:"Sikeres log r\xf6gz\xedt\xe9s",detail:"Log r\xf6gz\xedtve"})},error:n=>{this.message$.next(n)}})}update(a){this.apiService.put(`logs/update/${a.id}`,a).subscribe({next:()=>{this.message$.next({severity:"success",summary:"Sikeres log m\xf3dos\xedt\xe1s",detail:"Log m\xf3dos\xedtva"})},error:n=>{this.message$.next(n)}})}delete(a){this.apiService.delete(`logs/delete/${a.id}`).subscribe({next:n=>{this.message$.next({severity:"success",summary:"Sikeres log t\xf6rl\xe9s",detail:"Log t\xf6r\xf6lve"})},error:n=>{this.message$.next(n)}})}bulkdelete(a){let n={ids:a.map(d=>d.id)};this.apiService.post("logs/bulkdelete",n).subscribe({next:d=>{this.message$.next({severity:"success",summary:"Sikeres log t\xf6rl\xe9s",detail:`${a.length} log t\xf6r\xf6lve`})},error:d=>{this.message$.next(d)}})}isRowExpandable(a){return!!a.action_type&&!["scanned code","same code","assign tag","unassign"].includes(a.action_type.toLowerCase())}static#e=this.\u0275fac=function(n){return new(n||C)(e.LFG(E.s))};static#t=this.\u0275prov=e.Yz7({token:C,factory:C.\u0275fac,providedIn:"root"})}return C})()},3139:(O,$,u)=>{u.d($,{Q:()=>E});var f=u(8645),e=u(2029);let E=(()=>{class v{constructor(){this.mealChanged=new f.x,this.meals={breakfast:{begin:7,end:10},lunch:{begin:11,end:15},dinner:{begin:17,end:20}},this.checkMealStart(),setInterval(()=>{this.checkMealStart()},2e4)}checkMealStart(){const a=(new Date).getHours();for(const n of Object.keys(this.meals)){const d=this.meals[n];if(a>=d.begin&&a<d.end)return void this.mealChanged.next(n)}}getMealNameByTime(_){const a=_.getHours();for(const n in this.meals){const d=this.meals[n];if(a>=d.begin&&a<=d.end)return this.translateMealName(n)}return"Jelenleg nincs \xe9tkeztet\xe9s"}getMealsForSelector(){let _=[];for(const a in this.meals)_.push(this.translateMealName(a));return _}translateMealName(_){return{breakfast:"reggeli",lunch:"eb\xe9d",dinner:"vacsora"}[_]||_}isOpen(){const _=(new Date).getHours();for(const a in this.meals){const n=this.meals[a];if(_>=n.begin&&_<n.end)return!0}return!1}static#e=this.\u0275fac=function(a){return new(a||v)};static#t=this.\u0275prov=e.Yz7({token:v,factory:v.\u0275fac,providedIn:"root"})}return v})()},8057:(O,$,u)=>{u.d($,{XZ:()=>D,nD:()=>T});var f=u(6814),e=u(2029),E=u(6223),v=u(2332),C=u(5219),_=u(2591);const a=["cb"];function n(r,x){if(1&r&&e._UZ(0,"span",10),2&r){const t=e.oxw(3);e.Q6J("ngClass",t.checkboxIcon)}}function d(r,x){1&r&&e._UZ(0,"CheckIcon",11),2&r&&e.Q6J("styleClass","p-checkbox-icon")}function s(r,x){if(1&r&&(e.ynx(0),e.YNc(1,n,1,1,"span",8),e.YNc(2,d,1,1,"CheckIcon",9),e.BQk()),2&r){const t=e.oxw(2);e.xp6(1),e.Q6J("ngIf",t.checkboxIcon),e.xp6(1),e.Q6J("ngIf",!t.checkboxIcon)}}function i(r,x){}function h(r,x){1&r&&e.YNc(0,i,0,0,"ng-template")}function b(r,x){if(1&r&&(e.TgZ(0,"span",12),e.YNc(1,h,1,0,null,13),e.qZA()),2&r){const t=e.oxw(2);e.xp6(1),e.Q6J("ngTemplateOutlet",t.checkboxIconTemplate)}}function p(r,x){if(1&r&&(e.ynx(0),e.YNc(1,s,3,2,"ng-container",5),e.YNc(2,b,2,1,"span",7),e.BQk()),2&r){const t=e.oxw();e.xp6(1),e.Q6J("ngIf",!t.checkboxIconTemplate),e.xp6(1),e.Q6J("ngIf",t.checkboxIconTemplate)}}const c=function(r,x,t){return{"p-checkbox-label":!0,"p-checkbox-label-active":r,"p-disabled":x,"p-checkbox-label-focus":t}};function m(r,x){if(1&r){const t=e.EpF();e.TgZ(0,"label",14),e.NdJ("click",function(l){e.CHM(t);const y=e.oxw(),M=e.MAs(3);return e.KtG(y.onClick(l,M,!0))}),e._uU(1),e.qZA()}if(2&r){const t=e.oxw();e.Tol(t.labelStyleClass),e.Q6J("ngClass",e.kEZ(5,c,t.checked(),t.disabled,t.focused)),e.uIk("for",t.inputId),e.xp6(1),e.Oqu(t.label)}}const g=function(r,x,t){return{"p-checkbox p-component":!0,"p-checkbox-checked":r,"p-checkbox-disabled":x,"p-checkbox-focused":t}},k=function(r,x,t){return{"p-highlight":r,"p-disabled":x,"p-focus":t}},I={provide:E.JU,useExisting:(0,e.Gpc)(()=>D),multi:!0};let D=(()=>{class r{cd;value;name;disabled;binary;label;ariaLabelledBy;ariaLabel;tabindex;inputId;style;styleClass;labelStyleClass;formControl;checkboxIcon;readonly;required;trueValue=!0;falseValue=!1;onChange=new e.vpe;inputViewChild;templates;checkboxIconTemplate;model;onModelChange=()=>{};onModelTouched=()=>{};focused=!1;constructor(t){this.cd=t}ngAfterContentInit(){this.templates.forEach(t=>{"icon"===t.getType()&&(this.checkboxIconTemplate=t.template)})}onClick(t,o,l){t.preventDefault(),!this.disabled&&!this.readonly&&(this.updateModel(t),l&&o.focus())}updateModel(t){let o;this.binary?(o=this.checked()?this.falseValue:this.trueValue,this.model=o,this.onModelChange(o)):(o=this.checked()?this.model.filter(l=>!v.gb.equals(l,this.value)):this.model?[...this.model,this.value]:[this.value],this.onModelChange(o),this.model=o,this.formControl&&this.formControl.setValue(o)),this.onChange.emit({checked:o,originalEvent:t})}handleChange(t){this.readonly||this.updateModel(t)}onFocus(){this.focused=!0}onBlur(){this.focused=!1,this.onModelTouched()}focus(){this.inputViewChild?.nativeElement.focus()}writeValue(t){this.model=t,this.cd.markForCheck()}registerOnChange(t){this.onModelChange=t}registerOnTouched(t){this.onModelTouched=t}setDisabledState(t){this.disabled=t,this.cd.markForCheck()}checked(){return this.binary?this.model===this.trueValue:v.gb.contains(this.value,this.model)}static \u0275fac=function(o){return new(o||r)(e.Y36(e.sBO))};static \u0275cmp=e.Xpm({type:r,selectors:[["p-checkbox"]],contentQueries:function(o,l,y){if(1&o&&e.Suo(y,C.jx,4),2&o){let M;e.iGM(M=e.CRH())&&(l.templates=M)}},viewQuery:function(o,l){if(1&o&&e.Gf(a,5),2&o){let y;e.iGM(y=e.CRH())&&(l.inputViewChild=y.first)}},hostAttrs:[1,"p-element"],inputs:{value:"value",name:"name",disabled:"disabled",binary:"binary",label:"label",ariaLabelledBy:"ariaLabelledBy",ariaLabel:"ariaLabel",tabindex:"tabindex",inputId:"inputId",style:"style",styleClass:"styleClass",labelStyleClass:"labelStyleClass",formControl:"formControl",checkboxIcon:"checkboxIcon",readonly:"readonly",required:"required",trueValue:"trueValue",falseValue:"falseValue"},outputs:{onChange:"onChange"},features:[e._Bn([I])],decls:7,vars:26,consts:[[3,"ngStyle","ngClass"],[1,"p-hidden-accessible"],["type","checkbox",3,"readonly","value","checked","disabled","focus","blur","change"],["cb",""],[1,"p-checkbox-box",3,"ngClass","click"],[4,"ngIf"],[3,"class","ngClass","click",4,"ngIf"],["class","p-checkbox-icon",4,"ngIf"],["class","p-checkbox-icon",3,"ngClass",4,"ngIf"],[3,"styleClass",4,"ngIf"],[1,"p-checkbox-icon",3,"ngClass"],[3,"styleClass"],[1,"p-checkbox-icon"],[4,"ngTemplateOutlet"],[3,"ngClass","click"]],template:function(o,l){if(1&o){const y=e.EpF();e.TgZ(0,"div",0)(1,"div",1)(2,"input",2,3),e.NdJ("focus",function(){return l.onFocus()})("blur",function(){return l.onBlur()})("change",function(S){return l.handleChange(S)}),e.qZA()(),e.TgZ(4,"div",4),e.NdJ("click",function(S){e.CHM(y);const L=e.MAs(3);return e.KtG(l.onClick(S,L,!0))}),e.YNc(5,p,3,2,"ng-container",5),e.qZA()(),e.YNc(6,m,2,9,"label",6)}2&o&&(e.Tol(l.styleClass),e.Q6J("ngStyle",l.style)("ngClass",e.kEZ(18,g,l.checked(),l.disabled,l.focused)),e.xp6(2),e.Q6J("readonly",l.readonly)("value",l.value)("checked",l.checked())("disabled",l.disabled),e.uIk("id",l.inputId)("name",l.name)("tabindex",l.tabindex)("aria-labelledby",l.ariaLabelledBy)("aria-label",l.ariaLabel)("aria-checked",l.checked())("required",l.required),e.xp6(2),e.Q6J("ngClass",e.kEZ(22,k,l.checked(),l.disabled,l.focused)),e.xp6(1),e.Q6J("ngIf",l.checked()),e.xp6(1),e.Q6J("ngIf",l.label))},dependencies:function(){return[f.mk,f.O5,f.tP,f.PC,_.n]},styles:[".p-checkbox{display:inline-flex;cursor:pointer;-webkit-user-select:none;user-select:none;vertical-align:bottom;position:relative}.p-checkbox-disabled{cursor:default!important;pointer-events:none}.p-checkbox-box{display:flex;justify-content:center;align-items:center}p-checkbox{display:inline-flex;vertical-align:bottom;align-items:center}.p-checkbox-label{line-height:1}\n"],encapsulation:2,changeDetection:0})}return r})(),T=(()=>{class r{static \u0275fac=function(o){return new(o||r)};static \u0275mod=e.oAB({type:r});static \u0275inj=e.cJS({imports:[f.ez,_.n,C.m8]})}return r})()}}]);