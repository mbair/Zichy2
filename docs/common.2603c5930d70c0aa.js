"use strict";(self.webpackChunknfc_reserve=self.webpackChunknfc_reserve||[]).push([[8592],{7939:($,f,i)=>{i.d(f,{H:()=>C});var e=i(2029),m=i(9515),h=i(6814),g=i(6223),d=i(2352),E=i(5219);function n(s,r){if(1&s&&(e.TgZ(0,"span",5),e._uU(1),e.qZA()),2&s){const t=r.$implicit;e.Q6J("ngClass","meal-badge "+(null==t?null:t.style)),e.xp6(1),e.hij(" ",t.label," ")}}function o(s,r){if(1&s&&(e.TgZ(0,"span",5),e._uU(1),e.qZA()),2&s){const t=r.$implicit;e.Q6J("ngClass","meal-badge "+(null==t?null:t.style)),e.xp6(1),e.hij(" ",null==t?null:t.label," ")}}function a(s,r){if(1&s){const t=e.EpF();e.TgZ(0,"p-dropdown",2),e.NdJ("onChange",function(u){e.CHM(t);const v=e.oxw();return e.KtG(v.handleOnChange(u))}),e.ALo(1,"translate"),e.ALo(2,"translate"),e.YNc(3,n,2,2,"ng-template",3),e.YNc(4,o,2,2,"ng-template",4),e.qZA()}if(2&s){const t=r.ngIf,p=e.oxw();e.s9C("placeholder",e.lcZ(1,5,"V\xe1lasszon...")),e.s9C("emptyMessage",e.lcZ(2,7,"Nincs tal\xe1lat...")),e.Q6J("formControl",t)("options",p.meals)("showClear",p.showClear)}}function l(s,r){if(1&s&&(e.TgZ(0,"span",5),e._uU(1),e.qZA()),2&s){const t=r.$implicit;e.Q6J("ngClass","meal-badge "+(null==t?null:t.style)),e.xp6(1),e.hij(" ",t.label," ")}}function c(s,r){if(1&s&&(e.TgZ(0,"span",5),e._uU(1),e.qZA()),2&s){const t=r.$implicit;e.Q6J("ngClass","meal-badge "+(null==t?null:t.style)),e.xp6(1),e.hij(" ",null==t?null:t.label," ")}}function _(s,r){if(1&s){const t=e.EpF();e.TgZ(0,"p-dropdown",6),e.NdJ("ngModelChange",function(u){e.CHM(t);const v=e.oxw();return e.KtG(v.selectedMeal=u)})("onChange",function(u){e.CHM(t);const v=e.oxw();return e.KtG(v.handleOnChange(u))}),e.ALo(1,"translate"),e.ALo(2,"translate"),e.YNc(3,l,2,2,"ng-template",3),e.YNc(4,c,2,2,"ng-template",4),e.qZA()}if(2&s){const t=e.oxw();e.s9C("placeholder",e.lcZ(1,5,"V\xe1lasszon...")),e.s9C("emptyMessage",e.lcZ(2,7,"Nincs tal\xe1lat...")),e.Q6J("ngModel",t.selectedMeal)("options",t.meals)("showClear",t.showClear)}}let C=(()=>{class s{constructor(t){this.translate=t,this.change=new e.vpe,this.meals=[],this.selectedMeal=""}ngOnInit(){this.translate.onLangChange.subscribe(()=>{this.setMeals()})}ngOnChanges(t){this.setMeals()}getFormControl(){return this.parentForm&&this.controlName?this.parentForm.get(this.controlName):null}setMeals(){this.meals=[{label:this.translate.instant("MEALS.BREAKFAST"),value:"reggeli",style:"breakfast"},{label:this.translate.instant("MEALS.LUNCH"),value:"eb\xe9d",style:"lunch"},{label:this.translate.instant("MEALS.DINNER"),value:"vacsora",style:"dinner"}],this.showNothing&&this.meals.push({label:this.translate.instant("MEALS.NOTHING"),value:"Nem k\xe9r \xe9tkez\xe9st",style:"nothing"})}handleOnChange(t){this.change.emit({value:t.value,field:this.controlName})}static#e=this.\u0275fac=function(p){return new(p||s)(e.Y36(m.sK))};static#t=this.\u0275cmp=e.Xpm({type:s,selectors:[["app-meal-selector"]],inputs:{parentForm:"parentForm",controlName:"controlName",showClear:"showClear",showNothing:"showNothing"},outputs:{change:"change"},features:[e.TTD],decls:3,vars:2,consts:[["optionLabel","label","optionValue","value","appendTo","body",3,"formControl","options","placeholder","emptyMessage","showClear","onChange",4,"ngIf","ngIfElse"],["useNgModel",""],["optionLabel","label","optionValue","value","appendTo","body",3,"formControl","options","placeholder","emptyMessage","showClear","onChange"],["pTemplate","item"],["pTemplate","selectedItem"],[3,"ngClass"],["optionLabel","label","optionValue","value","appendTo","body",3,"ngModel","options","placeholder","emptyMessage","showClear","ngModelChange","onChange"]],template:function(p,u){if(1&p&&(e.YNc(0,a,5,9,"p-dropdown",0),e.YNc(1,_,5,9,"ng-template",null,1,e.W1O)),2&p){const v=e.MAs(2);e.Q6J("ngIf",u.getFormControl())("ngIfElse",v)}},dependencies:[h.mk,h.O5,g.JJ,g.On,g.oH,d.Lt,E.jx,m.X$],encapsulation:2})}return s})()},1496:($,f,i)=>{i.d(f,{y:()=>C});var e=i(2029),m=i(9515),h=i(6814),g=i(6223),d=i(2352),E=i(5219);function n(s,r){if(1&s&&(e.TgZ(0,"span",5),e._UZ(1,"i",5),e._uU(2),e.qZA()),2&s){const t=r.$implicit;e.Q6J("ngClass","payment-badge "+(null==t?null:t.style)),e.xp6(1),e.Q6J("ngClass","mr-1 "+(null==t?null:t.icon)),e.xp6(1),e.hij(" ",t.label," ")}}function o(s,r){if(1&s&&(e.TgZ(0,"span",5),e._UZ(1,"i",5),e._uU(2),e.qZA()),2&s){const t=r.$implicit;e.Q6J("ngClass","payment-badge "+(null==t?null:t.style)),e.xp6(1),e.Q6J("ngClass","mr-1 "+(null==t?null:t.icon)),e.xp6(1),e.hij(" ",null==t?null:t.label," ")}}function a(s,r){if(1&s){const t=e.EpF();e.TgZ(0,"p-dropdown",2),e.NdJ("onChange",function(u){e.CHM(t);const v=e.oxw();return e.KtG(v.handleOnChange(u))}),e.ALo(1,"translate"),e.ALo(2,"translate"),e.YNc(3,n,3,3,"ng-template",3),e.YNc(4,o,3,3,"ng-template",4),e.qZA()}if(2&s){const t=r.ngIf,p=e.oxw();e.s9C("placeholder",e.lcZ(1,5,"V\xe1lasszon...")),e.s9C("emptyMessage",e.lcZ(2,7,"Nincs tal\xe1lat...")),e.Q6J("formControl",t)("options",p.payments)("showClear",p.showClear)}}function l(s,r){if(1&s&&(e.TgZ(0,"span",5),e._UZ(1,"i",5),e._uU(2),e.qZA()),2&s){const t=r.$implicit;e.Q6J("ngClass","payment-badge "+(null==t?null:t.style)),e.xp6(1),e.Q6J("ngClass","mr-1 "+(null==t?null:t.icon)),e.xp6(1),e.hij(" ",t.label," ")}}function c(s,r){if(1&s&&(e.TgZ(0,"span",5),e._UZ(1,"i",5),e._uU(2),e.qZA()),2&s){const t=r.$implicit;e.Q6J("ngClass","payment-badge "+(null==t?null:t.style)),e.xp6(1),e.Q6J("ngClass","mr-1 "+(null==t?null:t.icon)),e.xp6(1),e.hij(" ",null==t?null:t.label," ")}}function _(s,r){if(1&s){const t=e.EpF();e.TgZ(0,"p-dropdown",6),e.NdJ("ngModelChange",function(u){e.CHM(t);const v=e.oxw();return e.KtG(v.selectedPayment=u)})("onChange",function(u){e.CHM(t);const v=e.oxw();return e.KtG(v.handleOnChange(u))}),e.ALo(1,"translate"),e.ALo(2,"translate"),e.YNc(3,l,3,3,"ng-template",3),e.YNc(4,c,3,3,"ng-template",4),e.qZA()}if(2&s){const t=e.oxw();e.s9C("placeholder",e.lcZ(1,5,"V\xe1lasszon...")),e.s9C("emptyMessage",e.lcZ(2,7,"Nincs tal\xe1lat...")),e.Q6J("ngModel",t.selectedPayment)("options",t.payments)("showClear",t.showClear)}}let C=(()=>{class s{constructor(t){this.translate=t,this.change=new e.vpe,this.payments=[],this.selectedPayment=""}ngOnInit(){this.translate.onLangChange.subscribe(()=>{this.setPayments()})}ngOnChanges(t){this.setPayments()}getFormControl(){return this.parentForm&&this.controlName?this.parentForm.get(this.controlName):null}setPayments(){this.payments=[{label:this.translate.instant("PAYMENTS.BANK-TRANSFER"),value:"Banki \xe1tutal\xe1s",style:"bank-transfer",icon:"pi pi-arrow-circle-right"},{label:this.translate.instant("PAYMENTS.SZEP-CARD"),value:"SZ\xc9P k\xe1rtya",style:"szep-card",icon:"pi pi-id-card"},{label:this.translate.instant("PAYMENTS.CASH"),value:"K\xe9szp\xe9nz",style:"cash",icon:"pi pi-money-bill"}]}handleOnChange(t){this.change.emit({value:t.value,field:this.controlName})}static#e=this.\u0275fac=function(p){return new(p||s)(e.Y36(m.sK))};static#t=this.\u0275cmp=e.Xpm({type:s,selectors:[["app-payment-selector"]],inputs:{parentForm:"parentForm",controlName:"controlName",showClear:"showClear"},outputs:{change:"change"},features:[e.TTD],decls:3,vars:2,consts:[["optionLabel","label","optionValue","value","appendTo","body",3,"formControl","options","placeholder","emptyMessage","showClear","onChange",4,"ngIf","ngIfElse"],["useNgModel",""],["optionLabel","label","optionValue","value","appendTo","body",3,"formControl","options","placeholder","emptyMessage","showClear","onChange"],["pTemplate","item"],["pTemplate","selectedItem"],[3,"ngClass"],["optionLabel","label","optionValue","value","appendTo","body",3,"ngModel","options","placeholder","emptyMessage","showClear","ngModelChange","onChange"]],template:function(p,u){if(1&p&&(e.YNc(0,a,5,9,"p-dropdown",0),e.YNc(1,_,5,9,"ng-template",null,1,e.W1O)),2&p){const v=e.MAs(2);e.Q6J("ngIf",u.getFormControl())("ngIfElse",v)}},dependencies:[h.mk,h.O5,g.JJ,g.On,g.oH,d.Lt,E.jx,m.X$],encapsulation:2})}return s})()},7744:($,f,i)=>{i.d(f,{T:()=>g});var e=i(7398),m=i(2029),h=i(9862);let g=(()=>{class d{constructor(n){this.http=n}getCountries(){return this.http.get("assets/demo/data/countries.json").pipe((0,e.U)(n=>n.data))}static#e=this.\u0275fac=function(o){return new(o||d)(m.LFG(h.eN))};static#t=this.\u0275prov=m.Yz7({token:d,factory:d.\u0275fac,providedIn:"root"})}return d})()},7159:($,f,i)=>{i.d(f,{F:()=>E});var e=i(5619),m=i(2096),h=i(7398),g=i(2029),d=i(8814);let E=(()=>{class n{constructor(a){this.apiService=a,this.cache=[],this.apiURL=a.apiURL,this.data$=new e.X(null),this.message$=new e.X(null)}get dietObs(){return this.data$.asObservable()}get messageObs(){return this.message$.asObservable()}get(a,l,c,_){let C="";""!==c&&(C=""!=c.sortField?`sort=${c.sortField}&order=${1===c.sortOrder?"ASC":"DESC"}`:"");const s=""!==C&&""!==_?C+"&"+_:""!==C&&""===_?C:""===C&&""!==_?_:"";this.apiService.get(`diet/get/${a}/${l}${""!==s?"?"+s:""}`).subscribe({next:t=>{t&&t.rows&&t.rows.map(p=>{p.name=p.name?.toLowerCase()}),this.data$.next(t)},error:t=>{this.message$.next(t)}})}getBySearch(a,l){let c="";""!==l&&(c=""!=l.sortField?`?sort=${l.sortField}&order=${1===l.sortOrder?"ASC":"DESC"}`:""),this.apiService.get(`diet/search/${a}${c}`).subscribe({next:_=>{this.data$.next(_)},error:_=>{this.message$.next(_)}})}getBySearchQuery(a){this.apiService.get(`diet/searchquery?${a}`).subscribe({next:l=>{this.data$.next(l)},error:l=>{this.message$.next(l)}})}create(a){this.apiService.post("diet/create/",a).subscribe({next:l=>{this.message$.next({severity:"success",summary:"Sikeres \xe9trend r\xf6gz\xedt\xe9s",detail:`${a.name} r\xf6gz\xedtve`})},error:l=>{this.message$.next(l)}})}update(a){this.apiService.put(`diet/update/${a.id}`,a).subscribe({next:()=>{this.message$.next({severity:"success",summary:"Sikeres \xe9trend m\xf3dos\xedt\xe1s",detail:`${a.name} m\xf3dos\xedtva`})},error:l=>{this.message$.next(l)}})}delete(a){this.apiService.delete(`diet/delete/${a.id}`).subscribe({next:l=>{this.message$.next({severity:"success",summary:"Sikeres \xe9trend t\xf6rl\xe9s",detail:`${a.name} t\xf6r\xf6lve`})},error:l=>{this.message$.next(l)}})}bulkdelete(a){let l={ids:a.map(c=>c.id)};this.apiService.post("diet/bulkdelete",l).subscribe({next:c=>{this.message$.next({severity:"success",summary:"Sikeres \xe9trend t\xf6rl\xe9s",detail:`${a.length} \xe9trend t\xf6r\xf6lve`})},error:c=>{this.message$.next(c)}})}getDietsForSelector(){return this.cache.length>0?(0,m.of)(this.cache):(this.get(0,999,{sortField:"id",sortOrder:1},""),this.data$.asObservable().pipe((0,h.U)(a=>{const l=a?a.rows:[];return this.cache=l,l})))}getDietColor(a){let l="";return this.cache.map(c=>{a?.toLowerCase()==c.name?.toLowerCase()&&(l=c.color??"")}),l}static#e=this.\u0275fac=function(l){return new(l||n)(g.LFG(d.s))};static#t=this.\u0275prov=g.Yz7({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})()},3763:($,f,i)=>{i.d(f,{$:()=>g});var e=i(5619),m=i(2029),h=i(8814);let g=(()=>{class d{constructor(n){this.apiService=n,this.apiURL=n.apiURL,this.data$=new e.X(null),this.message$=new e.X(null)}get logObs(){return this.data$.asObservable()}get messageObs(){return this.message$.asObservable()}get(n,o,a,l){let c="";""!==a&&(c=""!=a.sortField?`sort=${a.sortField}&order=${1===a.sortOrder?"ASC":"DESC"}`:"");const _=""!==c&&""!==l?c+"&"+l:""!==c&&""===l?c:""===c&&""!==l?l:"";this.apiService.get(`logs/get/${n}/${o}${""!==_?"?"+_:""}`).subscribe({next:s=>{s&&s.rows?.length&&(s.rows=s.rows.filter(r=>"updatelasttagusage"!==r.action_type),s.rows=s.rows.filter(r=>{if("update"==r.action_type){let t=JSON.parse(r.original_data),p=JSON.parse(r.new_data);if(null==t.rfid&&null!==p.rfid)return!1}return!0}),s.rows.forEach(r=>{if(r.expandable=this.isRowExpandable(r),r.status||(r.response_data=r.original_data),"{}"==r.new_data?r.new_data=null:"{}"==r.original_data?r.original_data=null:"{}"==r.response_data&&(r.response_data=null),200==r.status){let p=JSON.parse(r.response_data).message;if(p){let u=JSON.parse(r.original_data);r.response_data="Success delete"==p?`${u.lastName} ${u.firstName} t\xf6r\xf6lve`:"Update success"==p?`${u.fullname} m\xf3dos\xedtva`:"Guest updated successfully"==p?`${u.lastName} ${u.firstName} m\xf3dos\xedtva`:p}}if(201==r.status){let t=JSON.parse(r.new_data),p="";"conference"==r.table_name?p=`${t?.name} konferencia l\xe9trehozva`:"guest"==r.table_name?p=`${t?.lastName} ${t?.firstName} vend\xe9g l\xe9trehozva`:"users"==r.table_name&&(p=`${t?.fullname} felhaszn\xe1l\xf3 l\xe9trehozva`),r.response_data=p}if(400==r.status){let t=JSON.parse(r.response_data),p=t.error,u=t.message;u&&(r.response_data=u),p&&(r.original_data=JSON.stringify(p))}})),this.data$.next(s)},error:s=>{this.message$.next(s)}})}getBySearch(n,o){let a="";""!==o&&(a=""!=o.sortField?`?sort=${o.sortField}&order=${1===o.sortOrder?"ASC":"DESC"}`:""),this.apiService.get(`logs/search/${n}${a}`).subscribe({next:l=>{this.data$.next(l)},error:l=>{this.message$.next(l)}})}getBySearchQuery(n){this.apiService.get(`logs/searchquery?${n}`).subscribe({next:o=>{this.data$.next(o)},error:o=>{this.message$.next(o)}})}create(n){n.userid=Number(localStorage.getItem("userid"))||1,n.user_fullname=localStorage.getItem("fullname")||"SYSTEM",n.user_email=localStorage.getItem("email")||"info@nfcreserve.com",this.apiService.post("logs/create/",n).subscribe({next:o=>{this.message$.next({severity:"success",summary:"Sikeres log r\xf6gz\xedt\xe9s",detail:"Log r\xf6gz\xedtve"})},error:o=>{this.message$.next(o)}})}update(n){this.apiService.put(`logs/update/${n.id}`,n).subscribe({next:()=>{this.message$.next({severity:"success",summary:"Sikeres log m\xf3dos\xedt\xe1s",detail:"Log m\xf3dos\xedtva"})},error:o=>{this.message$.next(o)}})}delete(n){this.apiService.delete(`logs/delete/${n.id}`).subscribe({next:o=>{this.message$.next({severity:"success",summary:"Sikeres log t\xf6rl\xe9s",detail:"Log t\xf6r\xf6lve"})},error:o=>{this.message$.next(o)}})}bulkdelete(n){let o={ids:n.map(a=>a.id)};this.apiService.post("logs/bulkdelete",o).subscribe({next:a=>{this.message$.next({severity:"success",summary:"Sikeres log t\xf6rl\xe9s",detail:`${n.length} log t\xf6r\xf6lve`})},error:a=>{this.message$.next(a)}})}isRowExpandable(n){return!!n.action_type&&!["scanned code","assign tag","unassign","same code","tag duplicate","already received food","unknown device","import"].includes(n.action_type?.toLowerCase())}static#e=this.\u0275fac=function(o){return new(o||d)(m.LFG(h.s))};static#t=this.\u0275prov=m.Yz7({token:d,factory:d.\u0275fac,providedIn:"root"})}return d})()},2835:($,f,i)=>{i.d(f,{c:()=>g});var e=i(5619),m=i(2029),h=i(8814);let g=(()=>{class d{constructor(n){this.apiService=n,this.apiURL=n.apiURL,this.data$=new e.X(null),this.message$=new e.X(null)}get tagObs(){return this.data$.asObservable()}get messageObs(){return this.message$.asObservable()}get(n,o,a,l){let c="";""!==a&&(c=""!=a.sortField?`sort=${a.sortField}&order=${1===a.sortOrder?"ASC":"DESC"}`:"");const _=""!==c&&""!==l?c+"&"+l:""!==c&&""===l?c:""===c&&""!==l?l:"";this.apiService.get(`rfid/get/${n}/${o}${""!==_?"?"+_:""}`).subscribe({next:s=>{let r=s.rows;r&&r.length>0&&r.forEach(t=>{t.identifier=t.rfid}),this.data$.next(s)},error:s=>{this.message$.next(s)}})}getBySearch(n,o){let a="";""!==o&&(a=""!=o.sortField?`?sort=${o.sortField}&order=${1===o.sortOrder?"ASC":"DESC"}`:""),this.apiService.get(`rfid/search/${n}${a}`).subscribe({next:l=>{let c=l.rows;c&&c.length>0&&c.forEach(_=>{_.identifier=_.rfid}),this.data$.next(l)},error:l=>{this.message$.next(l)}})}getBySearchQuery(n){this.apiService.get(`rfid/searchquery?${n}`).subscribe({next:o=>{let a=o.rows;a&&a.length>0&&a.forEach(l=>{l.identifier=l.rfid}),this.data$.next(o)},error:o=>{this.message$.next(o)}})}create(n){this.apiService.post("rfid/create/",n).subscribe({next:o=>{this.message$.next({severity:"success",summary:"Sikeres c\xedmke r\xf6gz\xedt\xe9s",detail:`${n.identifier} r\xf6gz\xedtve`})},error:o=>{this.message$.next(o)}})}update(n){this.apiService.put(`rfid/update/${n.id}`,n).subscribe({next:()=>{this.message$.next({severity:"success",summary:"Sikeres c\xedmke m\xf3dos\xedt\xe1s",detail:`${n.identifier} m\xf3dos\xedtva`})},error:o=>{this.message$.next(o)}})}delete(n){this.apiService.delete(`rfid/delete/${n.id}`).subscribe({next:o=>{this.message$.next({severity:"success",summary:"Sikeres c\xedmke t\xf6rl\xe9s",detail:`${n.identifier} t\xf6r\xf6lve`})},error:o=>{this.message$.next(o)}})}bulkdelete(n){let o={ids:n.map(a=>a.id)};this.apiService.post("rfid/bulkdelete",o).subscribe({next:a=>{this.message$.next({severity:"success",summary:"Sikeres c\xedmke t\xf6rl\xe9s",detail:`${n.length} c\xedmke t\xf6r\xf6lve`})},error:a=>{this.message$.next(a)}})}getByRFID(n){return this.apiService.get(`rfid/search/${n}`)}static#e=this.\u0275fac=function(o){return new(o||d)(m.LFG(h.s))};static#t=this.\u0275prov=m.Yz7({token:d,factory:d.\u0275fac,providedIn:"root"})}return d})()},1836:($,f,i)=>{function e(){return m=>/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(m.value)?null:{invalidEmail:{value:m.value}}}i.d(f,{u:()=>e})},8842:($,f,i)=>{function e(){return m=>{const h=m.get("password"),g=m.get("password_again");return h&&g&&h.value!==g.value?{passwordsDoNotMatch:!0}:null}}i.d(f,{C:()=>e})},3620:($,f,i)=>{i.d(f,{b:()=>g});var e=i(2832),m=i(9360),h=i(8251);function g(d,E=e.z){return(0,m.e)((n,o)=>{let a=null,l=null,c=null;const _=()=>{if(a){a.unsubscribe(),a=null;const s=l;l=null,o.next(s)}};function C(){const s=c+d,r=E.now();if(r<s)return a=this.schedule(void 0,s-r),void o.add(a);_()}n.subscribe((0,h.x)(o,s=>{l=s,c=E.now(),a||(a=E.schedule(C,d),o.add(a))},()=>{_(),o.complete()},void 0,()=>{l=a=null}))})}}}]);