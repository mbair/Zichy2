"use strict";(self.webpackChunknfc_reserve=self.webpackChunknfc_reserve||[]).push([[6606],{6606:(Pe,T,l)=>{l.r(T),l.d(T,{ConferenceListModule:()=>Be});var c=l(6814),a=l(6223),g=l(9739),D=l(7582),J=l(8645),f=l(5619),w=l(3620),I=l(3997),Q=l(7398),$=l(4279),R=l(1836),h=l(5219),q=l(6676),e=l(2029),K=l(1206),O=l(219),F=l(8814);let B=(()=>{class o{constructor(n){this.apiService=n,this.apiURL=n.apiURL,this.data$=new f.X(null),this.message$=new f.X(null)}get questionObs(){return this.data$.asObservable()}get messageObs(){return this.message$.asObservable()}get(n,t,r,s){let u="";""!==r&&(u=""!=r.sortField?`sort=${r.sortField}&order=${1===r.sortOrder?"ASC":"DESC"}`:"");const m=""!==u&&""!==s?u+"&"+s:""!==u&&""===s?u:""===u&&""!==s?s:"";this.apiService.get(`questions/get/${n}/${t}${""!==m?"?"+m:""}`).subscribe({next:p=>{this.data$.next(p)},error:p=>{this.message$.next(p)}})}getBySearch(n,t){let r="";""!==t&&(r=""!=t.sortField?`?sort=${t.sortField}&order=${1===t.sortOrder?"ASC":"DESC"}`:""),this.apiService.get(`questions/search/${n}${r}`).subscribe({next:s=>{this.data$.next(s)},error:s=>{this.message$.next(s)}})}getBySearchQuery(n){this.apiService.get(`questions/searchquery?${n}`).subscribe({next:t=>{this.data$.next(t)},error:t=>{this.message$.next(t)}})}create(n){this.apiService.post("questions/create/",n).subscribe({next:t=>{this.message$.next({severity:"success",summary:"Sikeres k\xe9rd\xe9s r\xf6gz\xedt\xe9s"})},error:t=>{this.message$.next(t)}})}update(n){this.apiService.put(`questions/update/${n.id}`,n).subscribe({next:()=>{this.message$.next({severity:"success",summary:"Sikeres k\xe9rd\xe9s m\xf3dos\xedt\xe1s"})},error:t=>{this.message$.next(t)}})}delete(n){this.apiService.delete(`questions/delete/${n.id}`).subscribe({next:t=>{this.message$.next({severity:"success",summary:"Sikeres k\xe9rd\xe9s t\xf6rl\xe9s"})},error:t=>{this.message$.next(t)}})}bulkdelete(n){let t={ids:n.map(r=>r.id)};this.apiService.post("question/bulkdelete",t).subscribe({next:r=>{this.message$.next({severity:"success",summary:"Sikeres k\xe9rd\xe9s t\xf6rl\xe9s"})},error:r=>{this.message$.next(r)}})}static#e=this.\u0275fac=function(t){return new(t||o)(e.LFG(F.s))};static#t=this.\u0275prov=e.Yz7({token:o,factory:o.\u0275fac,providedIn:"root"})}return o})();var Y=l(3139),d=l(9664),_=l(707),A=l(4480),U=l(4104),y=l(3714),N=l(7213),E=l(9246),k=l(7680),z=l(4204),S=l(3259),L=l(3212);let G=(()=>{class o{styleClass;style;shape="rectangle";animation="wave";borderRadius;size;width="100%";height="1rem";containerClass(){return{"p-skeleton p-component":!0,"p-skeleton-circle":"circle"===this.shape,"p-skeleton-none":"none"===this.animation}}containerStyle(){return this.size?{...this.style,width:this.size,height:this.size,borderRadius:this.borderRadius}:{...this.style,width:this.width,height:this.height,borderRadius:this.borderRadius}}static \u0275fac=function(t){return new(t||o)};static \u0275cmp=e.Xpm({type:o,selectors:[["p-skeleton"]],hostAttrs:[1,"p-element"],inputs:{styleClass:"styleClass",style:"style",shape:"shape",animation:"animation",borderRadius:"borderRadius",size:"size",width:"width",height:"height"},decls:1,vars:4,consts:[[3,"ngClass","ngStyle"]],template:function(t,r){1&t&&e._UZ(0,"div",0),2&t&&(e.Tol(r.styleClass),e.Q6J("ngClass",r.containerClass())("ngStyle",r.containerStyle()))},dependencies:[c.mk,c.PC],styles:['.p-skeleton{position:relative;overflow:hidden}.p-skeleton:after{content:"";animation:p-skeleton-animation 1.2s infinite;height:100%;left:0;position:absolute;right:0;top:0;transform:translate(-100%);z-index:1}.p-skeleton.p-skeleton-circle{border-radius:50%}.p-skeleton-none:after{animation:none}@keyframes p-skeleton-animation{0%{transform:translate(-100%)}to{transform:translate(100%)}}\n'],encapsulation:2,changeDetection:0})}return o})(),P=(()=>{class o{static \u0275fac=function(t){return new(t||o)};static \u0275mod=e.oAB({type:o});static \u0275inj=e.cJS({imports:[c.ez]})}return o})();var j=l(7939),H=l(117);const Z=function(){return["Super Admin","Nagy Admin"]};function V(o,i){if(1&o){const n=e.EpF();e.TgZ(0,"div",59)(1,"h5",60),e._uU(2,"Konferenci\xe1k"),e.qZA(),e.TgZ(3,"span",61),e._UZ(4,"i",62),e.TgZ(5,"input",63),e.NdJ("input",function(r){e.CHM(n);const s=e.oxw(),u=e.MAs(4);return e.KtG(s.onGlobalFilter(u,r))}),e.qZA()(),e.TgZ(6,"span",64)(7,"button",65),e.NdJ("click",function(){e.CHM(n);const r=e.oxw();return e.KtG(r.create())}),e.qZA()()()}if(2&o){const n=e.oxw();e.xp6(7),e.Q6J("disabled",!n.userService.hasRole(e.DdM(1,Z)))}}function X(o,i){if(1&o){const n=e.EpF();e.TgZ(0,"tr"),e._UZ(1,"th"),e.TgZ(2,"th",66),e._uU(3,"N\xe9v "),e._UZ(4,"p-sortIcon",67),e.qZA(),e.TgZ(5,"th",68),e._uU(6,"Kezdete "),e._UZ(7,"p-sortIcon",69),e.qZA(),e.TgZ(8,"th",70),e._uU(9,"Els\u0151 \xe9tkez\xe9s "),e._UZ(10,"p-sortIcon",69),e.qZA(),e.TgZ(11,"th",71),e._uU(12,"V\xe9ge "),e._UZ(13,"p-sortIcon",72),e.qZA(),e.TgZ(14,"th",73),e._uU(15,"Utols\xf3 \xe9tkez\xe9s "),e._UZ(16,"p-sortIcon",72),e.qZA(),e._UZ(17,"th"),e.qZA(),e.TgZ(18,"tr"),e._UZ(19,"th"),e.TgZ(20,"th")(21,"input",74),e.NdJ("input",function(r){e.CHM(n);const s=e.oxw();return e.KtG(s.onFilter(r,"name"))}),e.qZA()(),e.TgZ(22,"th")(23,"p-calendar",75),e.NdJ("onSelect",function(r){e.CHM(n);const s=e.oxw();return e.KtG(s.onFilter(r,"beginDate"))})("onClearClick",function(r){e.CHM(n);const s=e.oxw();return e.KtG(s.onFilter(r,"beginDate"))}),e.qZA()(),e.TgZ(24,"th")(25,"app-meal-selector",76),e.NdJ("change",function(r){e.CHM(n);const s=e.oxw();return e.KtG(s.onFilter(r,"firstMeal"))}),e.qZA()(),e.TgZ(26,"th")(27,"p-calendar",75),e.NdJ("onSelect",function(r){e.CHM(n);const s=e.oxw();return e.KtG(s.onFilter(r,"endDate"))})("onClearClick",function(r){e.CHM(n);const s=e.oxw();return e.KtG(s.onFilter(r,"endDate"))}),e.qZA()(),e.TgZ(28,"th")(29,"app-meal-selector",76),e.NdJ("change",function(r){e.CHM(n);const s=e.oxw();return e.KtG(s.onFilter(r,"lastMeal"))}),e.qZA()(),e._UZ(30,"th"),e.qZA()}2&o&&(e.xp6(23),e.Q6J("showButtonBar",!0),e.xp6(2),e.Q6J("showNothing",!1)("showClear",!0),e.xp6(2),e.Q6J("showButtonBar",!0),e.xp6(2),e.Q6J("showNothing",!1)("showClear",!0))}const W=function(){return["Szervezo"]};function ee(o,i){if(1&o){const n=e.EpF();e.TgZ(0,"tr")(1,"td",77),e._UZ(2,"p-button",78),e.qZA(),e.TgZ(3,"td",79)(4,"span",80),e._uU(5,"N\xe9v"),e.qZA(),e._uU(6),e.qZA(),e.TgZ(7,"td",81)(8,"span",80),e._uU(9,"Kezdete"),e.qZA(),e.TgZ(10,"span",82),e._UZ(11,"i",83),e._uU(12),e.ALo(13,"date"),e.qZA()(),e.TgZ(14,"td",81)(15,"span",80),e._uU(16,"Els\u0151 \xe9tkez\xe9s"),e.qZA(),e.TgZ(17,"span",84),e._uU(18),e.qZA()(),e.TgZ(19,"td",81)(20,"span",80),e._uU(21,"V\xe9ge"),e.qZA(),e.TgZ(22,"span",82),e._UZ(23,"i",83),e._uU(24),e.ALo(25,"date"),e.qZA()(),e.TgZ(26,"td",81)(27,"span",80),e._uU(28,"Utols\xf3 \xe9tkez\xe9s"),e.qZA(),e.TgZ(29,"span",84),e._uU(30),e.qZA()(),e.TgZ(31,"td")(32,"div",85)(33,"button",86),e.NdJ("click",function(){const s=e.CHM(n).$implicit,u=e.oxw();return e.KtG(u.copyUrl(s.formUrl))}),e.qZA(),e.TgZ(34,"button",87),e.NdJ("click",function(){const s=e.CHM(n).$implicit,u=e.oxw();return e.KtG(u.navigateToConferenceForm(s))}),e.qZA(),e.TgZ(35,"button",88),e.NdJ("click",function(){const s=e.CHM(n).$implicit,u=e.oxw();return e.KtG(u.editQuestions(s))}),e.qZA(),e.TgZ(36,"button",89),e.NdJ("click",function(){const s=e.CHM(n).$implicit,u=e.oxw();return e.KtG(u.edit(s))}),e.qZA(),e.TgZ(37,"button",90),e.NdJ("click",function(){const s=e.CHM(n).$implicit,u=e.oxw();return u.tableItem=s,e.KtG(u.deleteDialog=!0)}),e.qZA()()()()}if(2&o){const n=i.$implicit,t=i.expanded,r=e.oxw();e.xp6(2),e.Q6J("pRowToggler",n)("icon",t?"pi pi-chevron-down":"pi pi-chevron-right"),e.xp6(4),e.hij(" ",n.name," "),e.xp6(6),e.hij(" ",e.xi3(13,13,n.beginDate,"yyyy.MM.dd")," "),e.xp6(5),e.Q6J("ngClass","meal-badge "+r.getMealStyle(n.firstMeal)),e.xp6(1),e.hij(" ",n.firstMeal," "),e.xp6(6),e.hij(" ",e.xi3(25,16,n.endDate,"yyyy.MM.dd")," "),e.xp6(5),e.Q6J("ngClass","meal-badge "+r.getMealStyle(n.lastMeal)),e.xp6(1),e.hij(" ",n.lastMeal," "),e.xp6(3),e.Q6J("disabled",!n.formUrl),e.xp6(2),e.Q6J("disabled",r.userService.hasRole(e.DdM(19,W))&&n.organizer_user_id!==r.userService.getLoggedInUserId()),e.xp6(1),e.Q6J("disabled",!r.userService.hasRole(e.DdM(20,Z))),e.xp6(1),e.Q6J("disabled",!r.userService.hasRole(e.DdM(21,Z)))}}function te(o,i){if(1&o&&(e.TgZ(0,"span"),e._uU(1),e.qZA()),2&o){const n=e.oxw(2);e.xp6(1),e.Oqu(n.organizer.fullname)}}function ne(o,i){1&o&&(e.TgZ(0,"span"),e._UZ(1,"p-skeleton",101),e.qZA())}function ie(o,i){if(1&o&&(e.TgZ(0,"div",103)(1,"div",104),e._uU(2),e.qZA(),e.TgZ(3,"div"),e._UZ(4,"img",105),e._uU(5),e.qZA(),e.TgZ(6,"div"),e._UZ(7,"img",106),e._uU(8),e.qZA()()),2&o){const n=e.oxw(),t=n.index,r=n.$implicit;e.xp6(2),e.hij("",t+1,". k\xe9rd\xe9s"),e.xp6(3),e.hij(" ",r.hu," "),e.xp6(3),e.hij(" ",r.en," ")}}function oe(o,i){if(1&o&&(e.TgZ(0,"div"),e.YNc(1,ie,9,3,"div",102),e.qZA()),2&o){const n=i.$implicit;e.xp6(1),e.Q6J("ngIf",""!==n.hu||""!==n.en)}}function re(o,i){if(1&o&&(e.TgZ(0,"div"),e.YNc(1,oe,2,1,"div",100),e.qZA()),2&o){const n=i.$implicit;e.xp6(1),e.Q6J("ngForOf",n.translations)}}function se(o,i){if(1&o&&(e.TgZ(0,"tr")(1,"td",91)(2,"div",92)(3,"div",93)(4,"div",94)(5,"div",95)(6,"table",96)(7,"tr")(8,"td",97),e._uU(9,"Regisztr\xe1ci\xf3s \u0171rlap link:"),e.qZA(),e.TgZ(10,"td"),e._uU(11),e.qZA()(),e.TgZ(12,"tr")(13,"td",97),e._uU(14,"Szerz\u0151d\u0151 neve:"),e.qZA(),e.TgZ(15,"td"),e._uU(16),e.qZA()(),e.TgZ(17,"tr")(18,"td",97),e._uU(19,"Szerz\u0151d\u0151 ad\xf3sz\xe1ma:"),e.qZA(),e.TgZ(20,"td"),e._uU(21),e.qZA()(),e.TgZ(22,"tr")(23,"td",97),e._uU(24,"Szerz\u0151d\u0151 c\xedme:"),e.qZA(),e.TgZ(25,"td"),e._uU(26),e.qZA()(),e.TgZ(27,"tr")(28,"td",97),e._uU(29,"Szervez\u0151:"),e.qZA(),e.TgZ(30,"td"),e.YNc(31,te,2,1,"span",57),e.YNc(32,ne,2,0,"span",57),e.qZA()(),e.TgZ(33,"tr")(34,"td",97),e._uU(35,"Kapcsolattart\xf3 neve:"),e.qZA(),e.TgZ(36,"td"),e._uU(37),e.qZA()(),e.TgZ(38,"tr")(39,"td",97),e._uU(40,"Kapcsolattart\xf3 telefonsz\xe1ma:"),e.qZA(),e.TgZ(41,"td")(42,"a",98),e._uU(43),e.qZA()()(),e.TgZ(44,"tr")(45,"td",97),e._uU(46,"Kapcsolattart\xf3 e-mail c\xedme:"),e.qZA(),e.TgZ(47,"td")(48,"a",98),e._uU(49),e.qZA()()(),e.TgZ(50,"tr")(51,"td",97),e._uU(52,"Regisztr\xe1ci\xf3 v\xe9ge"),e.qZA(),e.TgZ(53,"td"),e._uU(54),e.ALo(55,"date"),e.qZA()()()(),e.TgZ(56,"div",99),e.YNc(57,re,2,1,"div",100),e.qZA()()()()()()),2&o){const n=i.$implicit,t=e.oxw();e.xp6(11),e.Oqu(n.formUrl),e.xp6(5),e.Oqu(n.contractorName),e.xp6(5),e.Oqu(n.contractorTaxNumber),e.xp6(5),e.Oqu(n.contractorAdress),e.xp6(5),e.Q6J("ngIf",t.organizer),e.xp6(1),e.Q6J("ngIf",n.organizer_user_id&&!t.organizer),e.xp6(5),e.Oqu(n.contactName),e.xp6(5),e.MGl("href","tel:",n.contactPhone,"",e.LSH),e.xp6(1),e.Oqu(n.contactPhone),e.xp6(5),e.MGl("href","mailto:",n.contactEmail,"",e.LSH),e.xp6(1),e.Oqu(n.contactEmail),e.xp6(5),e.Oqu(e.xi3(55,13,n.registrationEndDate,"yyyy.MM.dd")),e.xp6(3),e.Q6J("ngForOf",n.questions)}}function le(o,i){1&o&&(e.TgZ(0,"tr")(1,"td",107),e._uU(2,"Nincs tal\xe1lat..."),e.qZA()()),2&o&&(e.xp6(1),e.uIk("colspan",7))}function ae(o,i){if(1&o&&(e.TgZ(0,"span",108),e._uU(1),e.qZA()),2&o){const n=e.oxw();e.xp6(1),e.hij(" ",null!=n.name&&n.name.value?"Konferencia adatai":"\xdaj konferencia"," ")}}function ue(o,i){1&o&&(e.TgZ(0,"div",109),e._uU(1,"K\xf6telez\u0151 kit\xf6lteni "),e.qZA())}function ce(o,i){1&o&&(e.TgZ(0,"div",109),e._uU(1,"K\xf6telez\u0151 kit\xf6lteni"),e.qZA())}function pe(o,i){1&o&&(e.TgZ(0,"div",109),e._uU(1,"K\xf6telez\u0151 kit\xf6lteni"),e.qZA())}function de(o,i){1&o&&(e.TgZ(0,"div",109),e._uU(1,"K\xf6telez\u0151 kit\xf6lteni"),e.qZA())}function me(o,i){1&o&&(e.TgZ(0,"div",109),e._uU(1,"K\xf6telez\u0151 kit\xf6lteni"),e.qZA())}function ge(o,i){1&o&&(e.TgZ(0,"div",109),e._uU(1,"K\xf6telez\u0151 kit\xf6lteni"),e.qZA())}function fe(o,i){1&o&&(e.TgZ(0,"div",109),e._uU(1," K\xf6telez\u0151 kit\xf6lteni"),e.qZA())}function he(o,i){1&o&&(e.TgZ(0,"div",109),e._uU(1,"K\xf6telez\u0151 kit\xf6lteni"),e.qZA())}function _e(o,i){1&o&&(e.TgZ(0,"div",109),e._uU(1,"K\xf6telez\u0151 kit\xf6lteni"),e.qZA())}function Ze(o,i){1&o&&(e.TgZ(0,"div",109),e._uU(1,"K\xf6telez\u0151 kit\xf6lteni"),e.qZA())}function ve(o,i){1&o&&(e.TgZ(0,"div",109),e._uU(1," K\xf6telez\u0151 kit\xf6lteni"),e.qZA())}function be(o,i){1&o&&(e.TgZ(0,"div",109),e._uU(1," K\xf6telez\u0151 kit\xf6lteni"),e.qZA())}function Ce(o,i){1&o&&(e.TgZ(0,"div",109),e._uU(1,"Nem megfelel\u0151 email form\xe1tum"),e.qZA())}function Te(o,i){1&o&&(e.TgZ(0,"div",109),e._uU(1,"K\xf6telez\u0151 kit\xf6lteni"),e.qZA())}function xe(o,i){if(1&o){const n=e.EpF();e.TgZ(0,"div",110)(1,"button",111),e.NdJ("click",function(){e.CHM(n);const r=e.oxw();return e.KtG(r.cancel())}),e.qZA(),e.TgZ(2,"button",112),e.NdJ("click",function(){e.CHM(n);const r=e.oxw();return e.KtG(r.save())}),e.qZA()()}if(2&o){const n=e.oxw();e.xp6(1),e.Q6J("disabled",!n.conferenceForm.dirty),e.xp6(1),e.Q6J("disabled",!n.conferenceForm.valid||!n.conferenceForm.dirty)}}function qe(o,i){1&o&&(e.TgZ(0,"span",108),e._uU(1,"Szerverz\u0151 k\xe9rd\xe9sei"),e.qZA())}function Fe(o,i){1&o&&(e.TgZ(0,"div",109),e._uU(1," Mindk\xe9t nyelven meg kell adni a k\xe9rd\xe9st! "),e.qZA())}function Ae(o,i){if(1&o&&(e.TgZ(0,"div",113)(1,"label",114),e._uU(2),e.qZA(),e.TgZ(3,"div",115)(4,"i"),e._UZ(5,"img",116),e.qZA(),e._UZ(6,"input",117),e.qZA(),e.TgZ(7,"div",115)(8,"i"),e._UZ(9,"img",118),e.qZA(),e._UZ(10,"input",119),e.qZA(),e.YNc(11,Fe,2,0,"div",16),e.qZA()),2&o){const n=i.$implicit,t=i.index;e.Q6J("formGroupName",t),e.xp6(1),e.MGl("for","en-",t,""),e.xp6(1),e.hij(" ",t+1,". k\xe9rd\xe9s "),e.xp6(4),e.MGl("id","hu-",t,""),e.xp6(4),e.MGl("id","en-",t,""),e.xp6(1),e.Q6J("ngIf",null==n.errors?null:n.errors.bothLanguagesRequired)}}function Ue(o,i){if(1&o){const n=e.EpF();e.TgZ(0,"div",110)(1,"button",111),e.NdJ("click",function(){e.CHM(n);const r=e.oxw();return e.KtG(r.cancelQuestions())}),e.qZA(),e.TgZ(2,"button",112),e.NdJ("click",function(){e.CHM(n);const r=e.oxw();return e.KtG(r.saveQuestions())}),e.qZA()()}if(2&o){const n=e.oxw();e.xp6(1),e.Q6J("disabled",!n.questionsForm.dirty),e.xp6(1),e.Q6J("disabled",!n.questionsForm.valid||!n.questionsForm.dirty)}}function ye(o,i){if(1&o&&(e.TgZ(0,"span"),e._uU(1,"Biztosan t\xf6r\xf6lni akarja a(z) "),e.TgZ(2,"b"),e._uU(3),e.qZA(),e._uU(4," konferenci\xe1t?"),e.qZA()),2&o){const n=e.oxw();e.xp6(3),e.Oqu(n.tableItem.name)}}function Ne(o,i){if(1&o){const n=e.EpF();e.TgZ(0,"div",110)(1,"button",120),e.NdJ("click",function(){e.CHM(n);const r=e.oxw();return e.KtG(r.deleteDialog=!1)}),e.qZA(),e.TgZ(2,"button",121),e.NdJ("click",function(){e.CHM(n);const r=e.oxw();return e.KtG(r.delete())}),e.qZA()()}}function Ee(o,i){if(1&o){const n=e.EpF();e.TgZ(0,"div",110)(1,"button",120),e.NdJ("click",function(){e.CHM(n);const r=e.oxw();return e.KtG(r.bulkDeleteDialog=!1)}),e.qZA(),e.TgZ(2,"button",121),e.NdJ("click",function(){e.CHM(n);const r=e.oxw();return e.KtG(r.deleteSelected())}),e.qZA()()}}const ke=function(){return["name","beginDate","endDate","contractorName","contactName"]},ze=function(){return{"min-height":"calc(100vh - 320px)"}},M=function(){return{width:"450px"}};q.locale("hu");let v=class C{constructor(i,n,t,r,s,u,m,b){this.userService=i,this.router=n,this.formBuilder=t,this.conferenceService=r,this.questionService=s,this.mealService=u,this.apiService=m,this.messageService=b,this.loading=!0,this.cols=[],this.tableItem={},this.tableData=[],this.rowsPerPageOptions=[20,50,100],this.rowsPerPage=20,this.totalRecords=0,this.page=0,this.sortField="",this.sortOrder=1,this.globalFilter="",this.filterValues={},this.debounce={},this.sidebar=!1,this.questionsSidebar=!1,this.deleteDialog=!1,this.bulkDeleteDialog=!1,this.selected=[],this.meals=[],this.organizer=null,this.formChanges$=new J.x,this.conferenceForm=this.formBuilder.group({id:[""],name:["",a.kI.required],beginDate:["",a.kI.required],endDate:["",a.kI.required],firstMeal:["",a.kI.required],lastMeal:["",a.kI.required],contractorName:["",a.kI.required],contractorAdress:["",a.kI.required],contractorTaxNumber:["",[a.kI.required]],contactName:["",a.kI.required],contactEmail:["",[a.kI.required,(0,R.u)()]],contactPhone:["",a.kI.required],formUrl:["",a.kI.required],registrationEndDate:["",a.kI.required],organizer_user_id:[""]}),this.isFormValid$=new f.X(!1),this.conferenceForm.get("name")?.valueChanges.subscribe(p=>{const Ye=this.apiService.developmentURL;let Ge=this.slugify(p);this.conferenceForm.patchValue({formUrl:`${Ye}/#/conference-form/${Ge}`})}),this.initializeQuestionsForm()}ngOnInit(){this.conferenceObs$=this.conferenceService.conferenceObs,this.conferenceObs$.subscribe(i=>{this.loading=!1,i&&(this.tableData=i.rows||[],this.totalRecords=i.totalItems||0,this.page=i.currentPage||0)}),this.meals=this.mealService.getMealsForSelector(),this.isFormValid$=this.formChanges$.pipe((0,w.b)(300),(0,I.x)(),(0,Q.U)(()=>this.conferenceForm.valid)),this.conferenceForm.valueChanges.subscribe(()=>this.formChanges$.next()),this.serviceMessageObs$=this.conferenceService.messageObs,this.serviceMessageObs$.subscribe(i=>this.handleMessage(i)),this.questionMessageObs$=this.questionService.messageObs,this.questionMessageObs$.subscribe(i=>this.handleMessage(i))}get name(){return this.conferenceForm.get("name")}get beginDate(){return this.conferenceForm.get("beginDate")}get endDate(){return this.conferenceForm.get("endDate")}get firstMeal(){return this.conferenceForm.get("firstMeal")}get lastMeal(){return this.conferenceForm.get("lastMeal")}get contractorName(){return this.conferenceForm.get("contractorName")}get contractorAdress(){return this.conferenceForm.get("contractorAdress")}get contractorTaxNumber(){return this.conferenceForm.get("contractorTaxNumber")}get contactName(){return this.conferenceForm.get("contactName")}get contactEmail(){return this.conferenceForm.get("contactEmail")}get contactPhone(){return this.conferenceForm.get("contactPhone")}get formUrl(){return this.conferenceForm.get("formUrl")}get registrationEndDate(){return this.conferenceForm.get("registrationEndDate")}get questions(){return this.questionsForm.get("questions")}doQuery(){this.loading=!0;const n=Object.keys(this.filterValues).map(t=>this.filterValues[t].length>0?`${t}=${this.filterValues[t]}`:"").filter(t=>t.length>0).join("&");return""!==this.globalFilter?this.conferenceService.getBySearch(this.globalFilter,{sortField:this.sortField,sortOrder:this.sortOrder}):this.conferenceService.get(this.page,this.rowsPerPage,{sortField:this.sortField,sortOrder:this.sortOrder},n)}onFilter(i,n){let r="";i instanceof Date?r=q(i).format("YYYY.MM.DD"):i&&(i.value||i.target?.value)?(r=i.value||i.target?.value,r=r.toString()):this.filterValues[n]="",this.filterValues[n]=r,["beginDate","endDate","firstMeal","lastMeal"].includes(n)?this.filterValues[n]===r&&this.doQuery():(this.debounce[n]&&clearTimeout(this.debounce[n]),this.debounce[n]=setTimeout(()=>{this.filterValues[n]===r&&this.doQuery()},500))}onLazyLoad(i){this.page=i.first/i.rows,this.rowsPerPage=i.rows??this.rowsPerPage,this.sortField=i.sortField??"",this.sortOrder=i.sortOrder??1,this.globalFilter=i.globalFilter??"",this.doQuery()}onGlobalFilter(i,n){i.filterGlobal(n.target.value,"contains")}onRowExpand(i){this.organizer=null;const n=i?.organizer_user_id;n&&this.userService.getUserById(n).subscribe(t=>{this.organizer=t})}handleMessage(i){i&&(this.loading=!1,"ERROR"==i?this.messageService.add({severity:"error",summary:"Error",detail:"Hiba t\xf6rt\xe9nt!"}):(this.messageService.add(i),this.tableItem={},this.selected=[],this.doQuery()))}initializeQuestionsForm(){const i=this.tableItem.questions,t=i&&i.length&&i[0].translations?i[0].translations:[];this.questionsForm=this.formBuilder.group({conferenceid:[this.tableItem.id],questions:this.formBuilder.array([])}),t.forEach(s=>{this.questions.push(this.formBuilder.group({hu:[s.hu],en:[s.en]},{validators:o=>{const i=o.get("hu")?.value,n=o.get("en")?.value;return i&&!n||!i&&n?{bothLanguagesRequired:!0}:null}}))});const r=5-this.questions.length;for(let s=0;s<r;s++)this.questions.push(this.formBuilder.group({hu:[""],en:[""]},{validators:o=>{const i=o.get("hu")?.value,n=o.get("en")?.value;return i&&!n||!i&&n?{bothLanguagesRequired:!0}:null}}));this.originalQuestionsFormValues=this.questionsForm.value}setFormUrl(){let i=this.tableItem.name||"";i=this.slugify(i),this.tableItem.formUrl=`/conference-form/${i}`}navigateToConferenceForm(i){const n=this.slugify(i.name);this.router.navigate(["/conference-form",n])}create(){this.conferenceForm.reset(),this.sidebar=!0}edit(i){this.conferenceForm.reset(),this.conferenceForm.patchValue(i),this.originalFormValues=this.conferenceForm.value,this.sidebar=!0}delete(){this.loading=!0,this.deleteDialog=!1,this.conferenceService.delete(this.tableItem)}deleteSelected(){this.loading=!0,this.deleteDialog=!1,this.conferenceService.bulkdelete(this.selected)}save(){if(this.conferenceForm.valid){this.loading=!0;const i=this.conferenceForm.value;i.id?this.conferenceService.update(i):this.conferenceService.create(i),this.sidebar=!1}}cancel(){this.conferenceForm.reset(this.originalFormValues)}editQuestions(i){this.tableItem=i,this.questionsForm.reset(),this.initializeQuestionsForm(),this.questionsSidebar=!0}saveQuestions(){this.loading=!0;const i={id:this.tableItem.questions&&this.tableItem.questions[0]?.id?this.tableItem.questions[0].id:null,conferenceid:this.tableItem.id,translations:this.questionsForm.value.questions};null==i.id?this.questionService.create(i):this.questionService.update(i),this.questionsSidebar=!1}cancelQuestions(){this.questionsForm.reset(this.originalQuestionsFormValues)}slugify(i){if(!i)return"";const n={\u00e1:"a",\u00e9:"e",\u00ed:"i",\u00f3:"o",\u00f6:"o",\u0151:"o",\u00fa:"u",\u00fc:"u",\u0171:"u",\u00c1:"A",\u00c9:"E",\u00cd:"I",\u00d3:"O",\u00d6:"O",\u0150:"O",\u00da:"U",\u00dc:"U",\u0170:"U"};return(i=i.split("").map(t=>n[t]||t).join("")).trim().toLowerCase().replace(/[^a-z0-9 -]/g,"").replace(/\s+/g,"-").replace(/-+/g,"-")}copyUrl(i){navigator.clipboard.writeText(i),this.messageService.add({severity:"success",summary:"Regisztr\xe1ci\xf3s link v\xe1g\xf3lapra m\xe1solva",detail:i})}getMealStyle(i){switch(i){case"reggeli":return"breakfast";case"eb\xe9d":return"lunch";case"vacsora":return"dinner";default:return"nothing"}}ngOnDestroy(){}static#e=this.\u0275fac=function(n){return new(n||C)(e.Y36(K.K),e.Y36(g.F0),e.Y36(a.qu),e.Y36(O.Z),e.Y36(B),e.Y36(Y.Q),e.Y36(F.s),e.Y36(h.ez))};static#t=this.\u0275cmp=e.Xpm({type:C,selectors:[["conferencelist"]],features:[e._Bn([h.ez])],decls:112,vars:52,consts:[[1,"grid"],[1,"col-12"],[1,"card","px-0","py-0"],["dataKey","id","responsiveLayout","scroll","currentPageReportTemplate","{first} - {last} bejegyz\xe9s a(z) {totalRecords}-b\xf3l megjelen\xedt\xe9se","selectionMode","multiple",3,"value","rows","totalRecords","globalFilterFields","paginator","rowsPerPageOptions","showCurrentPageReport","selection","tableStyle","rowHover","lazy","selectionChange","onRowExpand","onLazyLoad"],["dt",""],["pTemplate","caption"],["pTemplate","header"],["pTemplate","body"],["pTemplate","rowexpansion"],["pTemplate","emptymessage"],["id","sidebar","position","right","styleClass","p-sidebar-md",3,"visible","visibleChange"],["novalidate","",1,"grid","formgrid","p-fluid",3,"formGroup","ngSubmit"],["formControlName","id","type","hidden"],[1,"field","mb-4","col-12"],["for","name",1,"font-medium","text-900"],["id","name","type","text","pInputText","","formControlName","name"],["class","block p-error",4,"ngIf"],["for","formUrl",1,"font-medium","text-900"],[1,"block","mt-2","md:mt-0","p-input-icon-right"],[1,"pi","pi-copy","cursor-pointer","hover:text-blue-500",3,"click"],["id","formUrl","type","text","pInputText","","formControlName","formUrl","readonly",""],[1,"field","mb-4","col-12","lg:col-6"],["for","beginDate",1,"font-medium","text-900"],["formControlName","beginDate","appendTo","body","dataType","string","dateFormat","yy-mm-dd",3,"showButtonBar"],["for","firstMeal",1,"font-medium","text-900"],["controlName","firstMeal",3,"parentForm"],["for","endDate",1,"font-medium","text-900"],["formControlName","endDate","appendTo","body","dataType","string","dateFormat","yy-mm-dd",3,"showButtonBar"],["for","lastMeal",1,"font-medium","text-900"],["controlName","lastMeal",3,"parentForm"],["for","contractorName",1,"font-medium","text-900"],["id","contractorName","type","text","pInputText","","formControlName","contractorName"],["for","contractorTaxNumber",1,"font-medium","text-900"],["id","contractorTaxNumber","type","text","pInputText","","formControlName","contractorTaxNumber"],[1,"field","mb-4","col-6"],["for","contractorAdress",1,"font-medium","text-900"],["id","contractorAdress","type","text","pInputText","","formControlName","contractorAdress"],["for","organizer",1,"font-medium","text-900"],["controlName","organizer_user_id",3,"parentForm","user_rolesid"],["for","contactName",1,"font-medium","text-900"],["id","contactName","type","text","pInputText","","formControlName","contactName"],["for","contactPhone",1,"font-medium","text-900"],["id","contactPhone","type","text","pInputText","","formControlName","contactPhone"],["for","contactEmail",1,"font-medium","text-900"],["id","contactEmail","type","text","pInputText","","formControlName","contactEmail"],["for","registrationEndDate",1,"font-medium","text-900"],["formControlName","registrationEndDate","appendTo","body","dataType","string","dateFormat","yy-mm-dd",3,"showButtonBar"],["pTemplate","footer"],["id","questionsSidebar","position","right","styleClass","p-sidebar-md",3,"visible","visibleChange"],[1,"block","text-sm","mb-0"],["novalidate","",1,"p-fluid",3,"formGroup","ngSubmit"],["formControlName","conferenceid","type","hidden"],["formArrayName","questions",1,"flex","flex-wrap","w-full"],["class","w-full mt-3",3,"formGroupName",4,"ngFor","ngForOf"],["header","T\xf6rl\xe9s",3,"visible","modal","visibleChange"],[1,"flex","align-items-center","justify-content-center"],[1,"pi","pi-exclamation-triangle","mr-3",2,"font-size","2rem"],[4,"ngIf"],[3,"autoZIndex","blocked"],[1,"flex","flex-column","md:flex-row","md:justify-content-between","md:align-items-center"],[1,"m-0"],[1,"block","mt-2","md:mt-0","p-input-icon-left"],[1,"pi","pi-search"],["pInputText","","type","text","placeholder","Keres\xe9s...",1,"w-full","sm:w-auto",3,"input"],[1,"block","mt-2","md:mt-0"],["pButton","","pRipple","","label","\xdaj","icon","pi pi-plus",1,"p-button-success","mr-2",3,"disabled","click"],["pSortableColumn","name"],["field","name"],["pSortableColumn","beginDate"],["field","beginDate"],["pSortableColumn","firstMeal"],["pSortableColumn","endDate"],["field","endDate"],["pSortableColumn","lastMeal"],["pInputText","","type","text","placeholder","Keres\xe9s...",2,"width","40%","min-width","22rem",3,"input"],["appendTo","body","dataType","string","placeholder","Keres\xe9s...",3,"showButtonBar","onSelect","onClearClick"],["placeholder","Keres\xe9s...",3,"showNothing","showClear","change"],[1,"pr-0"],["type","button","styleClass","p-button-rounded p-button-text","pRipple","",3,"pRowToggler","icon"],[2,"width","30%","min-width","15rem"],[1,"p-column-title"],[2,"width","14%","min-width","10rem"],[1,"calendar-badge"],[1,"pi","pi-calendar","mr-1"],[3,"ngClass"],[1,"flex"],["pButton","","pRipple","","icon","pi pi-copy","pTooltip","Regisztr\xe1ci\xf3s link m\xe1sol\xe1sa v\xe1g\xf3lapra","tooltipPosition","top",1,"p-button-rounded","p-button-success","mr-2",3,"disabled","click"],["pButton","","pRipple","","icon","pi pi-search","pTooltip","Regisztr\xe1ci\xf3s \u0171rlap megnyit\xe1sa","tooltipPosition","top",1,"p-button-rounded","p-button-success","mr-2",3,"click"],["pButton","","pRipple","","icon","pi pi-question","pTooltip","Extra k\xe9rd\xe9sek be\xe1ll\xedt\xe1sa","tooltipPosition","top",1,"p-button-rounded","p-button-success","mr-2",3,"disabled","click"],["pButton","","pRipple","","icon","pi pi-pencil","pTooltip","Konferencia szerkeszt\xe9se","tooltipPosition","top",1,"p-button-rounded","p-button-success","mr-2",3,"disabled","click"],["pButton","","pRipple","","icon","pi pi-trash","pTooltip","Konferencia t\xf6rl\xe9se","tooltipPosition","top",1,"p-button-rounded","p-button-warning",3,"disabled","click"],["colspan","10"],[1,"p-2"],[1,"w-full"],[1,"grid","w-full"],[1,"col-6"],["cellspacing","0","cellpadding","7"],[1,"font-medium"],[3,"href"],[1,"col-5"],[4,"ngFor","ngForOf"],["width","10rem","styleClass","mb-2"],["class","flex flex-column w-full mb-3",4,"ngIf"],[1,"flex","flex-column","w-full","mb-3"],[1,"font-medium","text-900"],["src","assets/demo/images/flag/flag_placeholder.png",1,"flag","flag-hu","mr-1",2,"width","18px"],["src","assets/demo/images/flag/flag_placeholder.png",1,"flag","flag-gb","mr-1",2,"width","18px"],[1,"text-center"],[1,"font-semibold","text-xl"],[1,"block","p-error"],[1,"flex","justify-content-end","ap-2"],["pButton","","pRipple","","label","M\xe9gsem","icon","pi pi-times",1,"p-button-outlined",3,"disabled","click"],["pButton","","pRipple","","label","Ment\xe9s","icon","pi pi-check",1,"p-button","ml-2",3,"disabled","click"],[1,"w-full","mt-3",3,"formGroupName"],[1,"font-medium","text-900","mb-2",3,"for"],[1,"block","mt-2","p-input-icon-left"],["src","assets/demo/images/flag/flag_placeholder.png",1,"flag","flag-hu",2,"width","18px","margin-top","-8px"],["type","text","pInputText","","formControlName","hu",1,"w-full",3,"id"],["src","assets/demo/images/flag/flag_placeholder.png",1,"flag","flag-gb",2,"width","18px","margin-top","-8px"],["type","text","pInputText","","formControlName","en",1,"w-full",3,"id"],["pButton","","pRipple","","label","Nem","icon","pi pi-times",1,"p-button-outlined",3,"click"],["pButton","","pRipple","","label","Igen","icon","pi pi-check",1,"p-button","ml-2",3,"click"]],template:function(n,t){1&n&&(e.TgZ(0,"div",0)(1,"div",1)(2,"div",2)(3,"p-table",3,4),e.NdJ("selectionChange",function(s){return t.selected=s})("onRowExpand",function(s){return t.onRowExpand(s.data)})("onLazyLoad",function(s){return t.onLazyLoad(s)}),e.YNc(5,V,8,2,"ng-template",5),e.YNc(6,X,31,6,"ng-template",6),e.YNc(7,ee,38,22,"ng-template",7),e.YNc(8,se,58,16,"ng-template",8),e.YNc(9,le,3,1,"ng-template",9),e.qZA()(),e.TgZ(10,"p-sidebar",10),e.NdJ("visibleChange",function(s){return t.sidebar=s}),e.YNc(11,ae,2,1,"ng-template",6),e.TgZ(12,"form",11),e.NdJ("ngSubmit",function(){return t.save()}),e._UZ(13,"input",12),e.TgZ(14,"div",13)(15,"label",14),e._uU(16,"Konferencia neve"),e.qZA(),e._UZ(17,"input",15),e.YNc(18,ue,2,0,"div",16),e.qZA(),e.TgZ(19,"div",13)(20,"label",17),e._uU(21,"Regisztr\xe1ci\xf3s \u0171rlap link"),e.qZA(),e.TgZ(22,"span",18)(23,"i",19),e.NdJ("click",function(){return t.copyUrl(null==t.formUrl?null:t.formUrl.value)}),e.qZA(),e._UZ(24,"input",20),e.qZA(),e.YNc(25,ce,2,0,"div",16),e.qZA(),e.TgZ(26,"div",21)(27,"label",22),e._uU(28,"Kezdete"),e.qZA(),e._UZ(29,"p-calendar",23),e.YNc(30,pe,2,0,"div",16),e.qZA(),e.TgZ(31,"div",21)(32,"label",24),e._uU(33,"Els\u0151 \xe9tkez\xe9s"),e.qZA(),e._UZ(34,"app-meal-selector",25),e.YNc(35,de,2,0,"div",16),e.qZA(),e.TgZ(36,"div",21)(37,"label",26),e._uU(38,"V\xe9ge"),e.qZA(),e._UZ(39,"p-calendar",27),e.YNc(40,me,2,0,"div",16),e.qZA(),e.TgZ(41,"div",21)(42,"label",28),e._uU(43,"Utols\xf3 \xe9tkez\xe9s"),e.qZA(),e._UZ(44,"app-meal-selector",29),e.YNc(45,ge,2,0,"div",16),e.qZA(),e.TgZ(46,"div",21)(47,"label",30),e._uU(48,"Szerz\u0151d\u0151 neve"),e.qZA(),e._UZ(49,"input",31),e.YNc(50,fe,2,0,"div",16),e.qZA(),e.TgZ(51,"div",21)(52,"label",32),e._uU(53,"Szerz\u0151d\u0151 ad\xf3sz\xe1ma"),e.qZA(),e._UZ(54,"input",33),e.YNc(55,he,2,0,"div",16),e.qZA(),e.TgZ(56,"div",34)(57,"label",35),e._uU(58,"Szerz\u0151d\u0151 c\xedme"),e.qZA(),e._UZ(59,"input",36),e.YNc(60,_e,2,0,"div",16),e.qZA(),e.TgZ(61,"div",21)(62,"label",37),e._uU(63,"Szervez\u0151"),e.qZA(),e._UZ(64,"app-user-selector",38),e.qZA(),e.TgZ(65,"div",21)(66,"label",39),e._uU(67,"Kapcsolattart\xf3 neve"),e.qZA(),e._UZ(68,"input",40),e.YNc(69,Ze,2,0,"div",16),e.qZA(),e.TgZ(70,"div",21)(71,"label",41),e._uU(72,"Kapcsolattart\xf3 telefonsz\xe1ma"),e.qZA(),e._UZ(73,"input",42),e.YNc(74,ve,2,0,"div",16),e.qZA(),e.TgZ(75,"div",21)(76,"label",43),e._uU(77,"Kapcsolattart\xf3 e-mail c\xedme"),e.qZA(),e._UZ(78,"input",44),e.YNc(79,be,2,0,"div",16),e.YNc(80,Ce,2,0,"div",16),e.qZA(),e.TgZ(81,"div",21)(82,"label",45),e._uU(83,"Regisztr\xe1ci\xf3 v\xe9ge"),e.qZA(),e._UZ(84,"p-calendar",46),e.YNc(85,Te,2,0,"div",16),e.qZA()(),e.YNc(86,xe,3,2,"ng-template",47),e.qZA(),e.TgZ(87,"p-sidebar",48),e.NdJ("visibleChange",function(s){return t.questionsSidebar=s}),e.YNc(88,qe,2,0,"ng-template",6),e.TgZ(89,"p",49),e._uU(90," \u0170rlaponk\xe9nt az alap\xe9rtelmezett mez\u0151k\xf6n fel\xfcl 5 extra k\xe9rd\xe9s tehet\u0151 fel."),e._UZ(91,"br"),e._uU(92," Az \xfcresen hagyott k\xe9rd\xe9sek nem fognak megjelenni az \u0171rlapon. "),e.qZA(),e.TgZ(93,"form",50),e.NdJ("ngSubmit",function(){return t.saveQuestions()}),e._UZ(94,"input",51),e.TgZ(95,"div",52),e.YNc(96,Ae,12,6,"div",53),e.qZA()(),e.YNc(97,Ue,3,2,"ng-template",47),e.qZA(),e.TgZ(98,"p-dialog",54),e.NdJ("visibleChange",function(s){return t.deleteDialog=s}),e.TgZ(99,"div",55),e._UZ(100,"i",56),e.YNc(101,ye,5,1,"span",57),e.qZA(),e.YNc(102,Ne,3,0,"ng-template",47),e.qZA(),e.TgZ(103,"p-dialog",54),e.NdJ("visibleChange",function(s){return t.bulkDeleteDialog=s}),e.TgZ(104,"div",55),e._UZ(105,"i",56),e.TgZ(106,"span"),e._uU(107,"Biztosan t\xf6r\xf6lni akarja a kiv\xe1lasztott konferenci\xe1kat?"),e.qZA()(),e.YNc(108,Ee,3,0,"ng-template",47),e.qZA()()(),e.TgZ(109,"p-blockUI",58),e._UZ(110,"p-progressSpinner"),e.qZA(),e._UZ(111,"p-toast")),2&n&&(e.xp6(3),e.Q6J("value",t.tableData)("rows",t.rowsPerPage)("totalRecords",t.totalRecords)("globalFilterFields",e.DdM(48,ke))("paginator",!0)("rowsPerPageOptions",t.rowsPerPageOptions)("showCurrentPageReport",!0)("selection",t.selected)("tableStyle",e.DdM(49,ze))("rowHover",!0)("lazy",!0),e.xp6(7),e.Q6J("visible",t.sidebar),e.xp6(2),e.Q6J("formGroup",t.conferenceForm),e.xp6(6),e.Q6J("ngIf",(null==t.name?null:t.name.dirty)&&(null==t.name||null==t.name.errors?null:t.name.errors.required)),e.xp6(7),e.Q6J("ngIf",(null==t.formUrl?null:t.formUrl.dirty)&&(null==t.formUrl||null==t.formUrl.errors?null:t.formUrl.errors.required)),e.xp6(4),e.Q6J("showButtonBar",!0),e.xp6(1),e.Q6J("ngIf",(null==t.beginDate?null:t.beginDate.dirty)&&(null==t.beginDate||null==t.beginDate.errors?null:t.beginDate.errors.required)),e.xp6(4),e.Q6J("parentForm",t.conferenceForm),e.xp6(1),e.Q6J("ngIf",(null==t.firstMeal?null:t.firstMeal.dirty)&&(null==t.firstMeal||null==t.firstMeal.errors?null:t.firstMeal.errors.required)),e.xp6(4),e.Q6J("showButtonBar",!0),e.xp6(1),e.Q6J("ngIf",(null==t.endDate?null:t.endDate.dirty)&&(null==t.endDate||null==t.endDate.errors?null:t.endDate.errors.required)),e.xp6(4),e.Q6J("parentForm",t.conferenceForm),e.xp6(1),e.Q6J("ngIf",(null==t.lastMeal?null:t.lastMeal.dirty)&&(null==t.lastMeal||null==t.lastMeal.errors?null:t.lastMeal.errors.required)),e.xp6(5),e.Q6J("ngIf",(null==t.contractorName?null:t.contractorName.dirty)&&(null==t.contractorName||null==t.contractorName.errors?null:t.contractorName.errors.required)),e.xp6(5),e.Q6J("ngIf",(null==t.contractorTaxNumber?null:t.contractorTaxNumber.dirty)&&(null==t.contractorTaxNumber||null==t.contractorTaxNumber.errors?null:t.contractorTaxNumber.errors.required)),e.xp6(5),e.Q6J("ngIf",(null==t.contractorAdress?null:t.contractorAdress.dirty)&&(null==t.contractorAdress||null==t.contractorAdress.errors?null:t.contractorAdress.errors.required)),e.xp6(4),e.Q6J("parentForm",t.conferenceForm)("user_rolesid",4),e.xp6(5),e.Q6J("ngIf",(null==t.contactName?null:t.contactName.dirty)&&(null==t.contactName||null==t.contactName.errors?null:t.contactName.errors.required)),e.xp6(5),e.Q6J("ngIf",(null==t.contactPhone?null:t.contactPhone.dirty)&&(null==t.contactPhone||null==t.contactPhone.errors?null:t.contactPhone.errors.required)),e.xp6(5),e.Q6J("ngIf",(null==t.contactEmail?null:t.contactEmail.dirty)&&(null==t.contactEmail||null==t.contactEmail.errors?null:t.contactEmail.errors.required)),e.xp6(1),e.Q6J("ngIf",(null==t.contactEmail?null:t.contactEmail.dirty)&&(null==t.contactEmail||null==t.contactEmail.errors?null:t.contactEmail.errors.invalidEmail)),e.xp6(4),e.Q6J("showButtonBar",!0),e.xp6(1),e.Q6J("ngIf",(null==t.registrationEndDate?null:t.registrationEndDate.dirty)&&(null==t.registrationEndDate||null==t.registrationEndDate.errors?null:t.registrationEndDate.errors.required)),e.xp6(2),e.Q6J("visible",t.questionsSidebar),e.xp6(6),e.Q6J("formGroup",t.questionsForm),e.xp6(3),e.Q6J("ngForOf",t.questions.controls),e.xp6(2),e.Akn(e.DdM(50,M)),e.Q6J("visible",t.deleteDialog)("modal",!0),e.xp6(3),e.Q6J("ngIf",t.tableItem),e.xp6(2),e.Akn(e.DdM(51,M)),e.Q6J("visible",t.bulkDeleteDialog)("modal",!0),e.xp6(6),e.Q6J("autoZIndex",!0)("blocked",t.loading))},dependencies:[c.mk,c.sg,c.O5,d.iA,h.jx,d.lQ,d.jB,d.fz,_.Hq,_.zx,a._Y,a.Fj,a.JJ,a.JL,a.sg,a.u,a.x0,a.CE,A.H,U.FN,y.o,N.V,E.Y,k.G,z.b,S.u,L.f,G,j.H,H.T,c.uU]})};v=(0,D.gn)([(0,$.k)()],v);let Se=(()=>{class o{static#e=this.\u0275fac=function(t){return new(t||o)};static#t=this.\u0275mod=e.oAB({type:o});static#n=this.\u0275inj=e.cJS({imports:[g.Bz.forChild([{path:"",component:v}]),g.Bz]})}return o})();var Le=l(3743),Me=l(6340),De=l(6022),Je=l(6218),we=l(2352),Ie=l(1865),Qe=l(9653),$e=l(6263),Re=l(5389),Ke=l(8057),Oe=l(2285);let Be=(()=>{class o{static#e=this.\u0275fac=function(t){return new(t||o)};static#t=this.\u0275mod=e.oAB({type:o});static#n=this.\u0275inj=e.cJS({imports:[c.ez,Se,d.U$,Le.O,a.UX,_.hJ,A.T,U.EV,Me.V,De.Xt,y.j,Je.A,we.kW,Ie.cc,Qe.L$,N.S,E.l,k.L,z.u,$e.W,Re.dp,S.z,Ke.nD,L._8,P,Oe.L]})}return o})()}}]);