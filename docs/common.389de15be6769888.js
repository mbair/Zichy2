"use strict";(self.webpackChunknfc_reserve=self.webpackChunknfc_reserve||[]).push([[8592],{1496:(E,$,c)=>{c.d($,{y:()=>p});var e=c(2029),g=c(9515),m=c(6814),h=c(6223),_=c(2352),f=c(5219);function s(l,o){if(1&l&&(e.TgZ(0,"span",5),e._UZ(1,"i",5),e._uU(2),e.qZA()),2&l){const i=o.$implicit;e.Q6J("ngClass","payment-badge "+(null==i?null:i.style)),e.xp6(1),e.Q6J("ngClass","mr-1 "+(null==i?null:i.icon)),e.xp6(1),e.hij(" ",i.label," ")}}function n(l,o){if(1&l&&(e.TgZ(0,"span",5),e._UZ(1,"i",5),e._uU(2),e.qZA()),2&l){const i=o.$implicit;e.Q6J("ngClass","payment-badge "+(null==i?null:i.style)),e.xp6(1),e.Q6J("ngClass","mr-1 "+(null==i?null:i.icon)),e.xp6(1),e.hij(" ",null==i?null:i.label," ")}}function a(l,o){if(1&l&&(e.TgZ(0,"p-dropdown",2),e.ALo(1,"translate"),e.ALo(2,"translate"),e.YNc(3,s,3,3,"ng-template",3),e.YNc(4,n,3,3,"ng-template",4),e.qZA()),2&l){const i=o.ngIf,u=e.oxw();e.s9C("placeholder",e.lcZ(1,5,"V\xe1lasszon...")),e.s9C("emptyMessage",e.lcZ(2,7,"Nincs tal\xe1lat...")),e.Q6J("formControl",i)("options",u.payments)("showClear",u.showClear)}}function t(l,o){if(1&l&&(e.TgZ(0,"span",5),e._UZ(1,"i",5),e._uU(2),e.qZA()),2&l){const i=o.$implicit;e.Q6J("ngClass","payment-badge "+(null==i?null:i.style)),e.xp6(1),e.Q6J("ngClass","mr-1 "+(null==i?null:i.icon)),e.xp6(1),e.hij(" ",i.label," ")}}function r(l,o){if(1&l&&(e.TgZ(0,"span",5),e._UZ(1,"i",5),e._uU(2),e.qZA()),2&l){const i=o.$implicit;e.Q6J("ngClass","payment-badge "+(null==i?null:i.style)),e.xp6(1),e.Q6J("ngClass","mr-1 "+(null==i?null:i.icon)),e.xp6(1),e.hij(" ",null==i?null:i.label," ")}}function d(l,o){if(1&l){const i=e.EpF();e.TgZ(0,"p-dropdown",6),e.NdJ("ngModelChange",function(v){e.CHM(i);const x=e.oxw();return e.KtG(x.selectedPayment=v)}),e.ALo(1,"translate"),e.ALo(2,"translate"),e.YNc(3,t,3,3,"ng-template",3),e.YNc(4,r,3,3,"ng-template",4),e.qZA()}if(2&l){const i=e.oxw();e.s9C("placeholder",e.lcZ(1,5,"V\xe1lasszon...")),e.s9C("emptyMessage",e.lcZ(2,7,"Nincs tal\xe1lat...")),e.Q6J("ngModel",i.selectedPayment)("options",i.payments)("showClear",i.showClear)}}let p=(()=>{class l{constructor(i){this.translate=i,this.payments=[],this.selectedPayment="",this.setPayments(),this.translate.onLangChange.subscribe(()=>{this.setPayments()})}getFormControl(){return this.parentForm&&this.controlName?this.parentForm.get(this.controlName):null}setPayments(){this.payments=[{label:this.translate.instant("PAYMENTS.BANK-TRANSFER"),value:"Banki \xe1tutal\xe1s",style:"bank-transfer",icon:"pi pi-arrow-circle-right"},{label:this.translate.instant("PAYMENTS.SZEP-CARD"),value:"SZ\xc9P k\xe1rtya",style:"szep-card",icon:"pi pi-id-card"},{label:this.translate.instant("PAYMENTS.CASH"),value:"K\xe9szp\xe9nz",style:"cash",icon:"pi pi-money-bill"}]}static#e=this.\u0275fac=function(u){return new(u||l)(e.Y36(g.sK))};static#t=this.\u0275cmp=e.Xpm({type:l,selectors:[["app-payment-selector"]],inputs:{parentForm:"parentForm",controlName:"controlName",showClear:"showClear"},decls:3,vars:2,consts:[["optionLabel","label","optionValue","value","appendTo","body",3,"formControl","options","placeholder","emptyMessage","showClear",4,"ngIf","ngIfElse"],["useNgModel",""],["optionLabel","label","optionValue","value","appendTo","body",3,"formControl","options","placeholder","emptyMessage","showClear"],["pTemplate","item"],["pTemplate","selectedItem"],[3,"ngClass"],["optionLabel","label","optionValue","value","appendTo","body",3,"ngModel","options","placeholder","emptyMessage","showClear","ngModelChange"]],template:function(u,v){if(1&u&&(e.YNc(0,a,5,9,"p-dropdown",0),e.YNc(1,d,5,9,"ng-template",null,1,e.W1O)),2&u){const x=e.MAs(2);e.Q6J("ngIf",v.getFormControl())("ngIfElse",x)}},dependencies:[m.mk,m.O5,h.JJ,h.On,h.oH,_.Lt,f.jx,g.X$],encapsulation:2})}return l})()},2285:(E,$,c)=>{c.d($,{L:()=>f});var e=c(6814),g=c(6223),m=c(2352),h=c(9515),_=c(2029);let f=(()=>{class s{static#e=this.\u0275fac=function(t){return new(t||s)};static#t=this.\u0275mod=_.oAB({type:s});static#s=this.\u0275inj=_.cJS({imports:[e.ez,g.u5,g.UX,m.kW,h.aw]})}return s})()},7744:(E,$,c)=>{c.d($,{T:()=>h});var e=c(7398),g=c(2029),m=c(9862);let h=(()=>{class _{constructor(s){this.http=s}getCountries(){return this.http.get("assets/demo/data/countries.json").pipe((0,e.U)(s=>s.data))}static#e=this.\u0275fac=function(n){return new(n||_)(g.LFG(m.eN))};static#t=this.\u0275prov=g.Yz7({token:_,factory:_.\u0275fac,providedIn:"root"})}return _})()},7159:(E,$,c)=>{c.d($,{F:()=>f});var e=c(5619),g=c(2096),m=c(7398),h=c(2029),_=c(8814);let f=(()=>{class s{constructor(a){this.apiService=a,this.cache=[],this.apiURL=a.apiURL,this.data$=new e.X(null),this.message$=new e.X(null)}get dietObs(){return this.data$.asObservable()}get messageObs(){return this.message$.asObservable()}get(a,t,r,d){let p="";""!==r&&(p=""!=r.sortField?`sort=${r.sortField}&order=${1===r.sortOrder?"ASC":"DESC"}`:"");const l=""!==p&&""!==d?p+"&"+d:""!==p&&""===d?p:""===p&&""!==d?d:"";this.apiService.get(`diet/get/${a}/${t}${""!==l?"?"+l:""}`).subscribe({next:i=>{i&&i.rows&&i.rows.map(u=>{u.name=u.name?.toLowerCase()}),this.data$.next(i)},error:i=>{this.message$.next(i)}})}getBySearch(a,t){let r="";""!==t&&(r=""!=t.sortField?`?sort=${t.sortField}&order=${1===t.sortOrder?"ASC":"DESC"}`:""),this.apiService.get(`diet/search/${a}${r}`).subscribe({next:d=>{this.data$.next(d)},error:d=>{this.message$.next(d)}})}getBySearchQuery(a){this.apiService.get(`diet/searchquery?${a}`).subscribe({next:t=>{this.data$.next(t)},error:t=>{this.message$.next(t)}})}create(a){this.apiService.post("diet/create/",a).subscribe({next:t=>{this.message$.next({severity:"success",summary:"Sikeres \xe9trend r\xf6gz\xedt\xe9s",detail:`${a.name} r\xf6gz\xedtve`})},error:t=>{this.message$.next(t)}})}update(a){this.apiService.put(`diet/update/${a.id}`,a).subscribe({next:()=>{this.message$.next({severity:"success",summary:"Sikeres \xe9trend m\xf3dos\xedt\xe1s",detail:`${a.name} m\xf3dos\xedtva`})},error:t=>{this.message$.next(t)}})}delete(a){this.apiService.delete(`diet/delete/${a.id}`).subscribe({next:t=>{this.message$.next({severity:"success",summary:"Sikeres \xe9trend t\xf6rl\xe9s",detail:`${a.name} t\xf6r\xf6lve`})},error:t=>{this.message$.next(t)}})}bulkdelete(a){let t={ids:a.map(r=>r.id)};this.apiService.post("diet/bulkdelete",t).subscribe({next:r=>{this.message$.next({severity:"success",summary:"Sikeres \xe9trend t\xf6rl\xe9s",detail:`${a.length} \xe9trend t\xf6r\xf6lve`})},error:r=>{this.message$.next(r)}})}getDietsForSelector(){return this.cache.length>0?(0,g.of)(this.cache):(this.get(0,999,{sortField:"id",sortOrder:1},""),this.data$.asObservable().pipe((0,m.U)(a=>{const t=a?a.rows:[];return this.cache=t,t})))}getDietColor(a){let t="";return this.cache.map(r=>{a?.toLowerCase()==r.name?.toLowerCase()&&(t=r.color??"")}),t}static#e=this.\u0275fac=function(t){return new(t||s)(h.LFG(_.s))};static#t=this.\u0275prov=h.Yz7({token:s,factory:s.\u0275fac,providedIn:"root"})}return s})()},746:(E,$,c)=>{c.d($,{Q:()=>s});var e=c(5619),g=c(9397),m=c(6306),h=c(2096),_=c(2029),f=c(8814);let s=(()=>{class n{constructor(t){this.apiService=t,this.apiURL=t.apiURL,this.guestData$=new e.X(null),this.serviceMessage$=new e.X(null)}get guestObs(){return this.guestData$.asObservable()}get serviceMessageObs(){return this.serviceMessage$.asObservable()}getGuests(t,r,d,p){let l="";""!==d&&(l=""!=d.sortField?`sort=${d.sortField}&order=${1===d.sortOrder?"ASC":"DESC"}`:"");const o=""!==l&&""!==p?l+"&"+p:""!==l&&""===p?l:""===l&&""!==p?p:"";this.apiService.get(`guest/get/${t}/${r}${""!==o?"?"+o:""}`).subscribe({next:u=>{this.guestData$.next(u)},error:u=>{this.serviceMessage$.next(u)}})}getGuestsBySearch(t,r){let d="";""!==r&&(d=""!=r.sortField?`?sort=${r.sortField}&order=${1===r.sortOrder?"ASC":"DESC"}`:""),this.apiService.get(`guest/search/${t}${d}`).subscribe({next:p=>{this.guestData$.next(p)},error:p=>{this.serviceMessage$.next(p)}})}getGuestsBySearchQuery(t){this.apiService.get(`guest/searchquery?${t}`).subscribe({next:r=>{this.guestData$.next(r)},error:r=>{this.serviceMessage$.next(r)}})}getByRFID(t){return this.apiService.get(`guest/getbyrfid/${t}`)}updateLastTagUsage(t){this.apiService.get(`guest/updatelasttagusage/${t}`).subscribe({next:r=>{},error:r=>{this.serviceMessage$.next(r)}})}createGuest(t){this.apiService.post("guest/create/",t).subscribe({next:r=>{this.serviceMessage$.next("success")},error:r=>{this.serviceMessage$.next(r)}})}updateGuest(t){this.apiService.put(`guest/update/${t.id}`,t).subscribe({next:()=>{this.serviceMessage$.next("success")},error:r=>{this.serviceMessage$.next(r)}})}updateGuest2(t){return this.apiService.put(`guest/update/${t.id}`,t).pipe((0,g.b)(()=>console.log(`updated guest id=${t.id}`)),(0,m.K)(this.handleError("updateGuest2")))}deleteGuest(t){this.apiService.delete(`guest/delete/${t.id}`).subscribe({next:r=>{this.serviceMessage$.next(r)},error:r=>{this.serviceMessage$.next(r)}})}deleteGuests(t){let r={ids:t.map(d=>d.id)};this.apiService.post("guest/bulkdelete",r).subscribe({next:d=>{this.serviceMessage$.next(d)},error:d=>{this.serviceMessage$.next(d)}})}handleError(t="operation",r){return d=>(console.error(d),console.error(`${t} failed: ${d.message}`),(0,h.of)(r))}static#e=this.\u0275fac=function(r){return new(r||n)(_.LFG(f.s))};static#t=this.\u0275prov=_.Yz7({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})()},3763:(E,$,c)=>{c.d($,{$:()=>h});var e=c(5619),g=c(2029),m=c(8814);let h=(()=>{class _{constructor(s){this.apiService=s,this.apiURL=s.apiURL,this.data$=new e.X(null),this.message$=new e.X(null)}get logObs(){return this.data$.asObservable()}get messageObs(){return this.message$.asObservable()}get(s,n,a,t){let r="";""!==a&&(r=""!=a.sortField?`sort=${a.sortField}&order=${1===a.sortOrder?"ASC":"DESC"}`:"");const d=""!==r&&""!==t?r+"&"+t:""!==r&&""===t?r:""===r&&""!==t?t:"";this.apiService.get(`logs/get/${s}/${n}${""!==d?"?"+d:""}`).subscribe({next:l=>{l&&l.rows?.length&&(l.rows=l.rows.filter(o=>"updatelasttagusage"!==o.action_type),l.rows=l.rows.filter(o=>{if("update"==o.action_type){let i=JSON.parse(o.original_data),u=JSON.parse(o.new_data);if(null==i.rfid&&null!==u.rfid)return!1}return!0}),l.rows.forEach(o=>{if(o.expandable=this.isRowExpandable(o),o.status||(o.response_data=o.original_data),"{}"==o.new_data?o.new_data=null:"{}"==o.original_data?o.original_data=null:"{}"==o.response_data&&(o.response_data=null),200==o.status){let u=JSON.parse(o.response_data).message;if(u){let v=JSON.parse(o.original_data);o.response_data="Success delete"==u?`${v.lastName} ${v.firstName} t\xf6r\xf6lve`:"Update success"==u?`${v.fullname} m\xf3dos\xedtva`:"Guest updated successfully"==u?`${v.lastName} ${v.firstName} m\xf3dos\xedtva`:u}}if(201==o.status){let i=JSON.parse(o.new_data),u="";"conference"==o.table_name?u=`${i?.name} konferencia l\xe9trehozva`:"guest"==o.table_name?u=`${i?.lastName} ${i?.firstName} vend\xe9g l\xe9trehozva`:"users"==o.table_name&&(u=`${i?.fullname} felhaszn\xe1l\xf3 l\xe9trehozva`),o.response_data=u}if(400==o.status){let i=JSON.parse(o.response_data),u=i.error,v=i.message;v&&(o.response_data=v),u&&(o.original_data=JSON.stringify(u))}})),this.data$.next(l)},error:l=>{this.message$.next(l)}})}getBySearch(s,n){let a="";""!==n&&(a=""!=n.sortField?`?sort=${n.sortField}&order=${1===n.sortOrder?"ASC":"DESC"}`:""),this.apiService.get(`logs/search/${s}${a}`).subscribe({next:t=>{this.data$.next(t)},error:t=>{this.message$.next(t)}})}getBySearchQuery(s){this.apiService.get(`logs/searchquery?${s}`).subscribe({next:n=>{this.data$.next(n)},error:n=>{this.message$.next(n)}})}create(s){s.userid=Number(localStorage.getItem("userid"))||1,s.user_fullname=localStorage.getItem("fullname")||"SYSTEM",s.user_email=localStorage.getItem("email")||"info@nfcreserve.com",this.apiService.post("logs/create/",s).subscribe({next:n=>{this.message$.next({severity:"success",summary:"Sikeres log r\xf6gz\xedt\xe9s",detail:"Log r\xf6gz\xedtve"})},error:n=>{this.message$.next(n)}})}update(s){this.apiService.put(`logs/update/${s.id}`,s).subscribe({next:()=>{this.message$.next({severity:"success",summary:"Sikeres log m\xf3dos\xedt\xe1s",detail:"Log m\xf3dos\xedtva"})},error:n=>{this.message$.next(n)}})}delete(s){this.apiService.delete(`logs/delete/${s.id}`).subscribe({next:n=>{this.message$.next({severity:"success",summary:"Sikeres log t\xf6rl\xe9s",detail:"Log t\xf6r\xf6lve"})},error:n=>{this.message$.next(n)}})}bulkdelete(s){let n={ids:s.map(a=>a.id)};this.apiService.post("logs/bulkdelete",n).subscribe({next:a=>{this.message$.next({severity:"success",summary:"Sikeres log t\xf6rl\xe9s",detail:`${s.length} log t\xf6r\xf6lve`})},error:a=>{this.message$.next(a)}})}isRowExpandable(s){return!!s.action_type&&!["scanned code","assign tag","unassign","same code","tag duplicate","already received food","unknown device","import"].includes(s.action_type?.toLowerCase())}static#e=this.\u0275fac=function(n){return new(n||_)(g.LFG(m.s))};static#t=this.\u0275prov=g.Yz7({token:_,factory:_.\u0275fac,providedIn:"root"})}return _})()},2835:(E,$,c)=>{c.d($,{c:()=>h});var e=c(5619),g=c(2029),m=c(8814);let h=(()=>{class _{constructor(s){this.apiService=s,this.apiURL=s.apiURL,this.data$=new e.X(null),this.message$=new e.X(null)}get tagObs(){return this.data$.asObservable()}get messageObs(){return this.message$.asObservable()}get(s,n,a,t){let r="";""!==a&&(r=""!=a.sortField?`sort=${a.sortField}&order=${1===a.sortOrder?"ASC":"DESC"}`:"");const d=""!==r&&""!==t?r+"&"+t:""!==r&&""===t?r:""===r&&""!==t?t:"";this.apiService.get(`rfid/get/${s}/${n}${""!==d?"?"+d:""}`).subscribe({next:l=>{let o=l.rows;o&&o.length>0&&o.forEach(i=>{i.identifier=i.rfid}),this.data$.next(l)},error:l=>{this.message$.next(l)}})}getBySearch(s,n){let a="";""!==n&&(a=""!=n.sortField?`?sort=${n.sortField}&order=${1===n.sortOrder?"ASC":"DESC"}`:""),this.apiService.get(`rfid/search/${s}${a}`).subscribe({next:t=>{let r=t.rows;r&&r.length>0&&r.forEach(d=>{d.identifier=d.rfid}),this.data$.next(t)},error:t=>{this.message$.next(t)}})}getBySearchQuery(s){this.apiService.get(`rfid/searchquery?${s}`).subscribe({next:n=>{let a=n.rows;a&&a.length>0&&a.forEach(t=>{t.identifier=t.rfid}),this.data$.next(n)},error:n=>{this.message$.next(n)}})}create(s){this.apiService.post("rfid/create/",s).subscribe({next:n=>{this.message$.next({severity:"success",summary:"Sikeres c\xedmke r\xf6gz\xedt\xe9s",detail:`${s.identifier} r\xf6gz\xedtve`})},error:n=>{this.message$.next(n)}})}update(s){this.apiService.put(`rfid/update/${s.id}`,s).subscribe({next:()=>{this.message$.next({severity:"success",summary:"Sikeres c\xedmke m\xf3dos\xedt\xe1s",detail:`${s.identifier} m\xf3dos\xedtva`})},error:n=>{this.message$.next(n)}})}delete(s){this.apiService.delete(`rfid/delete/${s.id}`).subscribe({next:n=>{this.message$.next({severity:"success",summary:"Sikeres c\xedmke t\xf6rl\xe9s",detail:`${s.identifier} t\xf6r\xf6lve`})},error:n=>{this.message$.next(n)}})}bulkdelete(s){let n={ids:s.map(a=>a.id)};this.apiService.post("rfid/bulkdelete",n).subscribe({next:a=>{this.message$.next({severity:"success",summary:"Sikeres c\xedmke t\xf6rl\xe9s",detail:`${s.length} c\xedmke t\xf6r\xf6lve`})},error:a=>{this.message$.next(a)}})}getByRFID(s){return this.apiService.get(`rfid/search/${s}`)}static#e=this.\u0275fac=function(n){return new(n||_)(g.LFG(m.s))};static#t=this.\u0275prov=g.Yz7({token:_,factory:_.\u0275fac,providedIn:"root"})}return _})()},1836:(E,$,c)=>{function e(){return g=>/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(g.value)?null:{invalidEmail:{value:g.value}}}c.d($,{u:()=>e})},8842:(E,$,c)=>{function e(){return g=>{const m=g.get("password"),h=g.get("password_again");return m&&h&&m.value!==h.value?{passwordsDoNotMatch:!0}:null}}c.d($,{C:()=>e})},3620:(E,$,c)=>{c.d($,{b:()=>h});var e=c(2832),g=c(9360),m=c(8251);function h(_,f=e.z){return(0,g.e)((s,n)=>{let a=null,t=null,r=null;const d=()=>{if(a){a.unsubscribe(),a=null;const l=t;t=null,n.next(l)}};function p(){const l=r+_,o=f.now();if(o<l)return a=this.schedule(void 0,l-o),void n.add(a);d()}s.subscribe((0,m.x)(n,l=>{t=l,r=f.now(),a||(a=f.schedule(p,_),n.add(a))},()=>{d(),n.complete()},void 0,()=>{t=a=null}))})}}}]);