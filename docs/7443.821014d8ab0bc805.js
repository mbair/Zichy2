"use strict";(self.webpackChunknfc_reserve=self.webpackChunknfc_reserve||[]).push([[7443],{7443:(w,h,s)=>{s.r(h),s.d(h,{ConferenceModule:()=>Ye});var c=s(6814),a=s(6223),g=s(9739),d=s(7582),Q=s(8645),m=s(5619),b=s(3620),O=s(3997),$=s(7398),K=s(4279),B=s(1836),Z=s(5219),q=s(6676),e=s(2029),R=s(1206),Y=s(219),A=s(8814);let P=(()=>{class r{constructor(n){this.apiService=n,this.apiURL=n.apiURL,this.data$=new m.X(null),this.message$=new m.X(null)}get questionObs(){return this.data$.asObservable()}get messageObs(){return this.message$.asObservable()}get(n,t,i,l){let u="";""!==i&&(u=""!=i.sortField?`sort=${i.sortField}&order=${1===i.sortOrder?"ASC":"DESC"}`:"");const _=""!==u&&""!==l?u+"&"+l:""!==u&&""===l?u:""===u&&""!==l?l:"";this.apiService.get(`questions/get/${n}/${t}${""!==_?"?"+_:""}`).subscribe({next:p=>{this.data$.next(p)},error:p=>{this.message$.next(p)}})}getBySearch(n,t){let i="";""!==t&&(i=""!=t.sortField?`?sort=${t.sortField}&order=${1===t.sortOrder?"ASC":"DESC"}`:""),this.apiService.get(`questions/search/${n}${i}`).subscribe({next:l=>{this.data$.next(l)},error:l=>{this.message$.next(l)}})}getBySearchQuery(n){this.apiService.get(`questions/searchquery?${n}`).subscribe({next:t=>{this.data$.next(t)},error:t=>{this.message$.next(t)}})}create(n){this.apiService.post("questions/create/",n).subscribe({next:t=>{this.message$.next({severity:"success",summary:"Sikeres k\xe9rd\xe9s r\xf6gz\xedt\xe9s"})},error:t=>{this.message$.next(t)}})}update(n){this.apiService.put(`questions/update/${n.id}`,n).subscribe({next:()=>{this.message$.next({severity:"success",summary:"Sikeres k\xe9rd\xe9s m\xf3dos\xedt\xe1s"})},error:t=>{this.message$.next(t)}})}delete(n){this.apiService.delete(`questions/delete/${n.id}`).subscribe({next:t=>{this.message$.next({severity:"success",summary:"Sikeres k\xe9rd\xe9s t\xf6rl\xe9s"})},error:t=>{this.message$.next(t)}})}bulkdelete(n){let t={ids:n.map(i=>i.id)};this.apiService.post("question/bulkdelete",t).subscribe({next:i=>{this.message$.next({severity:"success",summary:"Sikeres k\xe9rd\xe9s t\xf6rl\xe9s"})},error:i=>{this.message$.next(i)}})}static#e=this.\u0275fac=function(t){return new(t||r)(e.LFG(A.s))};static#t=this.\u0275prov=e.Yz7({token:r,factory:r.\u0275fac,providedIn:"root"})}return r})();var G=s(3139),j=s(8022),f=s(9664),v=s(707),E=s(4480),U=s(4104),y=s(3714),N=s(7213),S=s(9246),k=s(7680),z=s(4204),M=s(3259),D=s(3212),I=s(4227),L=s(7939),H=s(117);function V(r,o){if(1&r){const n=e.EpF();e.TgZ(0,"div",60)(1,"h5",61),e._uU(2,"Konferenci\xe1k"),e.qZA(),e.TgZ(3,"span",62),e._UZ(4,"i",63),e.TgZ(5,"input",64),e.NdJ("input",function(i){e.CHM(n);const l=e.oxw(),u=e.MAs(4);return e.KtG(l.onGlobalFilter(u,i))}),e.qZA()(),e.TgZ(6,"span",65)(7,"button",66),e.NdJ("click",function(){e.CHM(n);const i=e.oxw();return e.KtG(i.create())}),e.qZA()()()}if(2&r){const n=e.oxw();e.xp6(7),e.Q6J("disabled",!n.canCreate)}}function W(r,o){if(1&r){const n=e.EpF();e.TgZ(0,"tr"),e._UZ(1,"th"),e.TgZ(2,"th",67),e._uU(3,"N\xe9v "),e._UZ(4,"p-sortIcon",68),e.qZA(),e.TgZ(5,"th",69),e._uU(6,"Kezdete "),e._UZ(7,"p-sortIcon",70),e.qZA(),e.TgZ(8,"th",71),e._uU(9,"Els\u0151 \xe9tkez\xe9s "),e._UZ(10,"p-sortIcon",70),e.qZA(),e.TgZ(11,"th",72),e._uU(12,"V\xe9ge "),e._UZ(13,"p-sortIcon",73),e.qZA(),e.TgZ(14,"th",74),e._uU(15,"Utols\xf3 \xe9tkez\xe9s "),e._UZ(16,"p-sortIcon",73),e.qZA(),e._UZ(17,"th"),e.qZA(),e.TgZ(18,"tr"),e._UZ(19,"th"),e.TgZ(20,"th")(21,"input",75),e.NdJ("input",function(i){e.CHM(n);const l=e.oxw();return e.KtG(l.onFilter(i,"name"))}),e.qZA()(),e.TgZ(22,"th")(23,"p-calendar",76),e.NdJ("onSelect",function(i){e.CHM(n);const l=e.oxw();return e.KtG(l.onFilter(i,"beginDate"))})("onClearClick",function(i){e.CHM(n);const l=e.oxw();return e.KtG(l.onFilter(i,"beginDate"))}),e.qZA()(),e.TgZ(24,"th")(25,"app-meal-selector",77),e.NdJ("change",function(i){e.CHM(n);const l=e.oxw();return e.KtG(l.onFilter(i,"firstMeal"))}),e.qZA()(),e.TgZ(26,"th")(27,"p-calendar",76),e.NdJ("onSelect",function(i){e.CHM(n);const l=e.oxw();return e.KtG(l.onFilter(i,"endDate"))})("onClearClick",function(i){e.CHM(n);const l=e.oxw();return e.KtG(l.onFilter(i,"endDate"))}),e.qZA()(),e.TgZ(28,"th")(29,"app-meal-selector",77),e.NdJ("change",function(i){e.CHM(n);const l=e.oxw();return e.KtG(l.onFilter(i,"lastMeal"))}),e.qZA()(),e._UZ(30,"th"),e.qZA()}2&r&&(e.xp6(23),e.Q6J("showButtonBar",!0),e.xp6(2),e.Q6J("showNothing",!1)("showClear",!0),e.xp6(2),e.Q6J("showButtonBar",!0),e.xp6(2),e.Q6J("showNothing",!1)("showClear",!0))}function X(r,o){if(1&r){const n=e.EpF();e.TgZ(0,"tr")(1,"td",78),e._UZ(2,"p-button",79),e.qZA(),e.TgZ(3,"td",80)(4,"span",81),e._uU(5,"N\xe9v"),e.qZA(),e._uU(6),e.qZA(),e.TgZ(7,"td",82)(8,"span",81),e._uU(9,"Kezdete"),e.qZA(),e.TgZ(10,"span",83),e._UZ(11,"i",84),e._uU(12),e.ALo(13,"date"),e.qZA()(),e.TgZ(14,"td",82)(15,"span",81),e._uU(16,"Els\u0151 \xe9tkez\xe9s"),e.qZA(),e.TgZ(17,"span",85),e._uU(18),e.qZA()(),e.TgZ(19,"td",82)(20,"span",81),e._uU(21,"V\xe9ge"),e.qZA(),e.TgZ(22,"span",83),e._UZ(23,"i",84),e._uU(24),e.ALo(25,"date"),e.qZA()(),e.TgZ(26,"td",82)(27,"span",81),e._uU(28,"Utols\xf3 \xe9tkez\xe9s"),e.qZA(),e.TgZ(29,"span",85),e._uU(30),e.qZA()(),e.TgZ(31,"td")(32,"div",86)(33,"button",87),e.NdJ("click",function(){const l=e.CHM(n).$implicit,u=e.oxw();return e.KtG(u.copyUrl(l.formUrl))}),e.qZA(),e.TgZ(34,"button",88),e.NdJ("click",function(){const l=e.CHM(n).$implicit,u=e.oxw();return e.KtG(u.navigateToConferenceForm(l))}),e.qZA(),e.TgZ(35,"button",89),e.NdJ("click",function(){const l=e.CHM(n).$implicit,u=e.oxw();return e.KtG(u.editQuestions(l))}),e.qZA(),e.TgZ(36,"button",90),e.NdJ("click",function(){const l=e.CHM(n).$implicit,u=e.oxw();return e.KtG(u.edit(l))}),e.qZA(),e.TgZ(37,"button",91),e.NdJ("click",function(){const l=e.CHM(n).$implicit,u=e.oxw();return u.tableItem=l,e.KtG(u.deleteDialog=!0)}),e.qZA()()()()}if(2&r){const n=o.$implicit,t=o.expanded,i=e.oxw();e.xp6(2),e.Q6J("pRowToggler",n)("icon",t?"pi pi-chevron-down":"pi pi-chevron-right"),e.xp6(4),e.hij(" ",n.name," "),e.xp6(6),e.hij(" ",e.xi3(13,13,n.beginDate,"yyyy.MM.dd")," "),e.xp6(5),e.Q6J("ngClass","meal-badge "+i.getMealStyle(n.firstMeal)),e.xp6(1),e.hij(" ",n.firstMeal," "),e.xp6(6),e.hij(" ",e.xi3(25,16,n.endDate,"yyyy.MM.dd")," "),e.xp6(5),e.Q6J("ngClass","meal-badge "+i.getMealStyle(n.lastMeal)),e.xp6(1),e.hij(" ",n.lastMeal," "),e.xp6(3),e.Q6J("disabled",!n.formUrl),e.xp6(2),e.Q6J("disabled",i.isOrganizer&&n.organizer_user_id!==i.loggedInUserId),e.xp6(1),e.Q6J("disabled",!i.canEdit),e.xp6(1),e.Q6J("disabled",!i.canDelete)}}function ee(r,o){if(1&r&&(e.TgZ(0,"span"),e._uU(1),e.qZA()),2&r){const n=e.oxw(2);e.xp6(1),e.Oqu(n.organizer.fullname)}}function te(r,o){1&r&&(e.TgZ(0,"span"),e._UZ(1,"p-skeleton",102),e.qZA())}function ne(r,o){if(1&r&&(e.TgZ(0,"div",104)(1,"div",105),e._uU(2),e.qZA(),e.TgZ(3,"div"),e._UZ(4,"img",106),e._uU(5),e.qZA(),e.TgZ(6,"div"),e._UZ(7,"img",107),e._uU(8),e.qZA()()),2&r){const n=e.oxw(),t=n.index,i=n.$implicit;e.xp6(2),e.hij("",t+1,". k\xe9rd\xe9s"),e.xp6(3),e.hij(" ",i.hu," "),e.xp6(3),e.hij(" ",i.en," ")}}function oe(r,o){if(1&r&&(e.TgZ(0,"div"),e.YNc(1,ne,9,3,"div",103),e.qZA()),2&r){const n=o.$implicit;e.xp6(1),e.Q6J("ngIf",""!==n.hu||""!==n.en)}}function re(r,o){if(1&r&&(e.TgZ(0,"div"),e.YNc(1,oe,2,1,"div",101),e.qZA()),2&r){const n=o.$implicit;e.xp6(1),e.Q6J("ngForOf",n.translations)}}function ie(r,o){if(1&r&&(e.TgZ(0,"tr")(1,"td",92)(2,"div",93)(3,"div",94)(4,"div",95)(5,"div",96)(6,"table",97)(7,"tr")(8,"td",98),e._uU(9,"Regisztr\xe1ci\xf3s \u0171rlap link:"),e.qZA(),e.TgZ(10,"td"),e._uU(11),e.qZA()(),e.TgZ(12,"tr")(13,"td",98),e._uU(14,"Szerz\u0151d\u0151 neve:"),e.qZA(),e.TgZ(15,"td"),e._uU(16),e.qZA()(),e.TgZ(17,"tr")(18,"td",98),e._uU(19,"Szerz\u0151d\u0151 ad\xf3sz\xe1ma:"),e.qZA(),e.TgZ(20,"td"),e._uU(21),e.qZA()(),e.TgZ(22,"tr")(23,"td",98),e._uU(24,"Szerz\u0151d\u0151 c\xedme:"),e.qZA(),e.TgZ(25,"td"),e._uU(26),e.qZA()(),e.TgZ(27,"tr")(28,"td",98),e._uU(29,"Szervez\u0151:"),e.qZA(),e.TgZ(30,"td"),e.YNc(31,ee,2,1,"span",58),e.YNc(32,te,2,0,"span",58),e.qZA()(),e.TgZ(33,"tr")(34,"td",98),e._uU(35,"Kapcsolattart\xf3 neve:"),e.qZA(),e.TgZ(36,"td"),e._uU(37),e.qZA()(),e.TgZ(38,"tr")(39,"td",98),e._uU(40,"Kapcsolattart\xf3 telefonsz\xe1ma:"),e.qZA(),e.TgZ(41,"td")(42,"a",99),e._uU(43),e.qZA()()(),e.TgZ(44,"tr")(45,"td",98),e._uU(46,"Kapcsolattart\xf3 e-mail c\xedme:"),e.qZA(),e.TgZ(47,"td")(48,"a",99),e._uU(49),e.qZA()()(),e.TgZ(50,"tr")(51,"td",98),e._uU(52,"Regisztr\xe1ci\xf3 v\xe9ge"),e.qZA(),e.TgZ(53,"td"),e._uU(54),e.ALo(55,"date"),e.qZA()(),e.TgZ(56,"tr")(57,"td",98),e._uU(58,"Vend\xe9g m\xf3dos\xedt\xe1s hat\xe1rideje"),e.qZA(),e.TgZ(59,"td"),e._uU(60),e.ALo(61,"date"),e.qZA()()()(),e.TgZ(62,"div",100),e.YNc(63,re,2,1,"div",101),e.qZA()()()()()()),2&r){const n=o.$implicit,t=e.oxw();e.xp6(11),e.Oqu(n.formUrl),e.xp6(5),e.Oqu(n.contractorName),e.xp6(5),e.Oqu(n.contractorTaxNumber),e.xp6(5),e.Oqu(n.contractorAdress),e.xp6(5),e.Q6J("ngIf",t.organizer),e.xp6(1),e.Q6J("ngIf",n.organizer_user_id&&!t.organizer),e.xp6(5),e.Oqu(n.contactName),e.xp6(5),e.MGl("href","tel:",n.contactPhone,"",e.LSH),e.xp6(1),e.Oqu(n.contactPhone),e.xp6(5),e.MGl("href","mailto:",n.contactEmail,"",e.LSH),e.xp6(1),e.Oqu(n.contactEmail),e.xp6(5),e.Oqu(e.xi3(55,14,n.registrationEndDate,"yyyy.MM.dd")),e.xp6(6),e.Oqu(e.xi3(61,17,n.guestEditEndDate,"yyyy.MM.dd")),e.xp6(3),e.Q6J("ngForOf",n.questions)}}function le(r,o){1&r&&(e.TgZ(0,"tr")(1,"td",108),e._uU(2,"Nincs tal\xe1lat..."),e.qZA()()),2&r&&(e.xp6(1),e.uIk("colspan",7))}function se(r,o){if(1&r&&(e.TgZ(0,"span",109),e._uU(1),e.qZA()),2&r){const n=e.oxw();e.xp6(1),e.hij(" ",null!=n.id&&n.id.value?"Konferencia adatai":"\xdaj konferencia"," ")}}function ae(r,o){1&r&&(e.TgZ(0,"div",110),e._uU(1,"K\xf6telez\u0151 kit\xf6lteni "),e.qZA())}function ue(r,o){1&r&&(e.TgZ(0,"div",110),e._uU(1,"K\xf6telez\u0151 kit\xf6lteni"),e.qZA())}function ce(r,o){1&r&&(e.TgZ(0,"div",110),e._uU(1,"K\xf6telez\u0151 kit\xf6lteni"),e.qZA())}function de(r,o){1&r&&(e.TgZ(0,"div",110),e._uU(1,"K\xf6telez\u0151 kit\xf6lteni"),e.qZA())}function pe(r,o){1&r&&(e.TgZ(0,"div",110),e._uU(1,"K\xf6telez\u0151 kit\xf6lteni"),e.qZA())}function me(r,o){1&r&&(e.TgZ(0,"div",110),e._uU(1,"K\xf6telez\u0151 kit\xf6lteni"),e.qZA())}function ge(r,o){1&r&&(e.TgZ(0,"div",110),e._uU(1," K\xf6telez\u0151 kit\xf6lteni"),e.qZA())}function fe(r,o){1&r&&(e.TgZ(0,"div",110),e._uU(1,"K\xf6telez\u0151 kit\xf6lteni"),e.qZA())}function he(r,o){1&r&&(e.TgZ(0,"div",110),e._uU(1,"K\xf6telez\u0151 kit\xf6lteni"),e.qZA())}function _e(r,o){1&r&&(e.TgZ(0,"div",110),e._uU(1,"K\xf6telez\u0151 kit\xf6lteni"),e.qZA())}function be(r,o){1&r&&(e.TgZ(0,"div",110),e._uU(1," K\xf6telez\u0151 kit\xf6lteni"),e.qZA())}function Ze(r,o){1&r&&(e.TgZ(0,"div",110),e._uU(1," K\xf6telez\u0151 kit\xf6lteni"),e.qZA())}function ve(r,o){1&r&&(e.TgZ(0,"div",110),e._uU(1,"Nem megfelel\u0151 email form\xe1tum"),e.qZA())}function Ce(r,o){1&r&&(e.TgZ(0,"div",110),e._uU(1,"K\xf6telez\u0151 kit\xf6lteni"),e.qZA())}function Te(r,o){1&r&&(e.TgZ(0,"div",110),e._uU(1,"K\xf6telez\u0151 kit\xf6lteni"),e.qZA())}function xe(r,o){if(1&r){const n=e.EpF();e.TgZ(0,"div",111)(1,"button",112),e.NdJ("click",function(){e.CHM(n);const i=e.oxw();return e.KtG(i.cancel())}),e.qZA(),e.TgZ(2,"button",113),e.NdJ("click",function(){e.CHM(n);const i=e.oxw();return e.KtG(i.save())}),e.qZA()()}if(2&r){const n=e.oxw();e.xp6(1),e.Q6J("disabled",!n.conferenceForm.dirty),e.xp6(1),e.Q6J("disabled",!n.conferenceForm.valid||!n.conferenceForm.dirty)}}function Fe(r,o){1&r&&(e.TgZ(0,"span",109),e._uU(1,"Szerverz\u0151 k\xe9rd\xe9sei"),e.qZA())}function qe(r,o){1&r&&(e.TgZ(0,"div",110),e._uU(1," Mindk\xe9t nyelven meg kell adni a k\xe9rd\xe9st! "),e.qZA())}function Ae(r,o){if(1&r&&(e.TgZ(0,"div",114)(1,"label",115),e._uU(2),e.qZA(),e.TgZ(3,"div",116)(4,"i"),e._UZ(5,"img",117),e.qZA(),e._UZ(6,"input",118),e.qZA(),e.TgZ(7,"div",116)(8,"i"),e._UZ(9,"img",119),e.qZA(),e._UZ(10,"input",120),e.qZA(),e.YNc(11,qe,2,0,"div",16),e.qZA()),2&r){const n=o.$implicit,t=o.index;e.Q6J("formGroupName",t),e.xp6(1),e.MGl("for","en-",t,""),e.xp6(1),e.hij(" ",t+1,". k\xe9rd\xe9s "),e.xp6(4),e.MGl("id","hu-",t,""),e.xp6(4),e.MGl("id","en-",t,""),e.xp6(1),e.Q6J("ngIf",null==n.errors?null:n.errors.bothLanguagesRequired)}}function Ee(r,o){if(1&r){const n=e.EpF();e.TgZ(0,"div",111)(1,"button",112),e.NdJ("click",function(){e.CHM(n);const i=e.oxw();return e.KtG(i.cancelQuestions())}),e.qZA(),e.TgZ(2,"button",113),e.NdJ("click",function(){e.CHM(n);const i=e.oxw();return e.KtG(i.saveQuestions())}),e.qZA()()}if(2&r){const n=e.oxw();e.xp6(1),e.Q6J("disabled",!n.questionsForm.dirty),e.xp6(1),e.Q6J("disabled",!n.questionsForm.valid||!n.questionsForm.dirty)}}function Ue(r,o){if(1&r&&(e.TgZ(0,"span"),e._uU(1,"Biztosan t\xf6r\xf6lni akarja a(z) "),e.TgZ(2,"b"),e._uU(3),e.qZA(),e._uU(4," konferenci\xe1t?"),e.qZA()),2&r){const n=e.oxw();e.xp6(3),e.Oqu(n.tableItem.name)}}function ye(r,o){if(1&r){const n=e.EpF();e.TgZ(0,"div",111)(1,"button",121),e.NdJ("click",function(){e.CHM(n);const i=e.oxw();return e.KtG(i.deleteDialog=!1)}),e.qZA(),e.TgZ(2,"button",122),e.NdJ("click",function(){e.CHM(n);const i=e.oxw();return e.KtG(i.delete())}),e.qZA()()}}function Ne(r,o){if(1&r){const n=e.EpF();e.TgZ(0,"div",111)(1,"button",121),e.NdJ("click",function(){e.CHM(n);const i=e.oxw();return e.KtG(i.bulkDeleteDialog=!1)}),e.qZA(),e.TgZ(2,"button",122),e.NdJ("click",function(){e.CHM(n);const i=e.oxw();return e.KtG(i.deleteSelected())}),e.qZA()()}}const Se=function(){return["name","beginDate","endDate","contractorName","contactName"]},ke=function(){return{"min-height":"calc(100vh - 320px)"}},J=function(){return{width:"450px"}};q.locale("hu");let C=class x{constructor(o,n,t,i,l,u,_,T,p){this.userService=o,this.router=n,this.formBuilder=t,this.conferenceService=i,this.questionService=l,this.mealService=u,this.apiService=_,this.messageService=T,this.responsiveService=p,this.loading=!0,this.cols=[],this.tableItem={},this.tableData=[],this.rowsPerPageOptions=[20,50,100],this.rowsPerPage=20,this.totalRecords=0,this.page=0,this.sortField="",this.sortOrder=1,this.globalFilter="",this.filterValues={},this.debounce={},this.sidebar=!1,this.questionsSidebar=!1,this.deleteDialog=!1,this.bulkDeleteDialog=!1,this.selected=[],this.meals=[],this.organizer=null,this.canCreate=!1,this.canEdit=!1,this.canDelete=!1,this.isOrganizer=!1,this.isMobile=!1,this.formChanges$=new Q.x,this.conferenceForm=this.formBuilder.group({id:[""],name:["",a.kI.required],beginDate:["",a.kI.required],endDate:["",a.kI.required],firstMeal:["",a.kI.required],lastMeal:["",a.kI.required],contractorName:["",a.kI.required],contractorAdress:["",a.kI.required],contractorTaxNumber:["",[a.kI.required]],contactName:["",a.kI.required],contactEmail:["",[a.kI.required,(0,B.u)()]],contactPhone:["",a.kI.required],formUrl:["",a.kI.required],registrationEndDate:["",a.kI.required],guestEditEndDate:["",a.kI.required],organizer_user_id:[""]}),this.isFormValid$=new m.X(!1),this.conferenceForm.get("name")?.valueChanges.subscribe(Pe=>{const Ge=this.apiService.developmentURL;let je=this.slugify(Pe);this.conferenceForm.patchValue({formUrl:`${Ge}/#/conference-form/${je}`})}),this.initializeQuestionsForm()}ngOnInit(){this.userService.hasRole(["Super Admin","Nagy Admin"]).subscribe(o=>this.canCreate=o),this.userService.hasRole(["Super Admin","Nagy Admin"]).subscribe(o=>this.canEdit=o),this.userService.hasRole(["Super Admin","Nagy Admin"]).subscribe(o=>this.canDelete=o),this.userService.hasRole(["Szervezo"]).subscribe(o=>this.isOrganizer=o),this.loggedInUserId=this.userService.getLoggedInUserId(),this.conferenceObs$=this.conferenceService.conferenceObs,this.conferenceObs$.subscribe(o=>{this.loading=!1,o&&(this.tableData=o.rows||[],this.totalRecords=o.totalItems||0,this.page=o.currentPage||0)}),this.meals=this.mealService.getMealsForSelector(),this.responsiveService.isMobile$.subscribe(o=>{this.isMobile=o}),this.isFormValid$=this.formChanges$.pipe((0,b.b)(300),(0,O.x)(),(0,$.U)(()=>this.conferenceForm.valid)),this.conferenceForm.valueChanges.subscribe(()=>this.formChanges$.next()),this.serviceMessageObs$=this.conferenceService.messageObs,this.serviceMessageObs$.subscribe(o=>this.handleMessage(o)),this.questionMessageObs$=this.questionService.messageObs,this.questionMessageObs$.subscribe(o=>this.handleMessage(o))}get id(){return this.conferenceForm.get("id")}get name(){return this.conferenceForm.get("name")}get beginDate(){return this.conferenceForm.get("beginDate")}get endDate(){return this.conferenceForm.get("endDate")}get firstMeal(){return this.conferenceForm.get("firstMeal")}get lastMeal(){return this.conferenceForm.get("lastMeal")}get contractorName(){return this.conferenceForm.get("contractorName")}get contractorAdress(){return this.conferenceForm.get("contractorAdress")}get contractorTaxNumber(){return this.conferenceForm.get("contractorTaxNumber")}get contactName(){return this.conferenceForm.get("contactName")}get contactEmail(){return this.conferenceForm.get("contactEmail")}get contactPhone(){return this.conferenceForm.get("contactPhone")}get formUrl(){return this.conferenceForm.get("formUrl")}get registrationEndDate(){return this.conferenceForm.get("registrationEndDate")}get guestEditEndDate(){return this.conferenceForm.get("guestEditEndDate")}get questions(){return this.questionsForm.get("questions")}doQuery(){this.loading=!0;const n=Object.keys(this.filterValues).map(t=>this.filterValues[t].length>0?`${t}=${this.filterValues[t]}`:"").filter(t=>t.length>0).join("&");return""!==this.globalFilter?this.conferenceService.getBySearch(this.globalFilter,{sortField:this.sortField,sortOrder:this.sortOrder}):this.conferenceService.get(this.page,this.rowsPerPage,{sortField:this.sortField,sortOrder:this.sortOrder},n)}onFilter(o,n){let i="";o instanceof Date?i=q(o).format("YYYY.MM.DD"):o&&(o.value||o.target?.value)?(i=o.value||o.target?.value,i=i.toString()):this.filterValues[n]="",this.filterValues[n]=i,["beginDate","endDate","firstMeal","lastMeal"].includes(n)?this.filterValues[n]===i&&this.doQuery():(this.debounce[n]&&clearTimeout(this.debounce[n]),this.debounce[n]=setTimeout(()=>{this.filterValues[n]===i&&this.doQuery()},500))}onLazyLoad(o){this.page=o.first/o.rows,this.rowsPerPage=o.rows??this.rowsPerPage,this.sortField=o.sortField??"",this.sortOrder=o.sortOrder??1,this.globalFilter=o.globalFilter??"",this.doQuery()}onGlobalFilter(o,n){o.filterGlobal(n.target.value,"contains")}onRowExpand(o){this.organizer=null;const n=o?.organizer_user_id;n&&this.userService.getUserById(n).subscribe(t=>{this.organizer=t})}handleMessage(o){o&&(this.loading=!1,"ERROR"==o?this.messageService.add({severity:"error",summary:"Error",detail:"Hiba t\xf6rt\xe9nt!"}):(this.messageService.add(o),this.tableItem={},this.selected=[],this.doQuery()))}initializeQuestionsForm(){const o=this.tableItem.questions,t=o&&o.length&&o[0].translations?o[0].translations:[];this.questionsForm=this.formBuilder.group({conferenceid:[this.tableItem.id],questions:this.formBuilder.array([])}),t.forEach(l=>{this.questions.push(this.formBuilder.group({hu:[l.hu],en:[l.en]},{validators:r=>{const o=r.get("hu")?.value,n=r.get("en")?.value;return o&&!n||!o&&n?{bothLanguagesRequired:!0}:null}}))});const i=5-this.questions.length;for(let l=0;l<i;l++)this.questions.push(this.formBuilder.group({hu:[""],en:[""]},{validators:r=>{const o=r.get("hu")?.value,n=r.get("en")?.value;return o&&!n||!o&&n?{bothLanguagesRequired:!0}:null}}));this.originalQuestionsFormValues=this.questionsForm.value}setFormUrl(){let o=this.tableItem.name||"";o=this.slugify(o),this.tableItem.formUrl=`/conference-form/${o}`}navigateToConferenceForm(o){const n=this.slugify(o.name);this.router.navigate(["/conference-form",n])}create(){this.conferenceForm.reset(),this.sidebar=!0}edit(o){this.conferenceForm.reset(),this.conferenceForm.patchValue(o),this.originalFormValues=this.conferenceForm.value,this.sidebar=!0}delete(){this.loading=!0,this.deleteDialog=!1,this.conferenceService.delete(this.tableItem)}deleteSelected(){this.loading=!0,this.deleteDialog=!1,this.conferenceService.bulkdelete(this.selected)}save(){if(this.conferenceForm.valid){this.loading=!0;const o=this.conferenceForm.value;o.id?this.conferenceService.update(o):this.conferenceService.create(o),this.sidebar=!1}}cancel(){this.conferenceForm.reset(this.originalFormValues)}editQuestions(o){this.tableItem=o,this.questionsForm.reset(),this.initializeQuestionsForm(),this.questionsSidebar=!0}saveQuestions(){this.loading=!0;const o={id:this.tableItem.questions&&this.tableItem.questions[0]?.id?this.tableItem.questions[0].id:null,conferenceid:this.tableItem.id,translations:this.questionsForm.value.questions};null==o.id?this.questionService.create(o):this.questionService.update(o),this.questionsSidebar=!1}cancelQuestions(){this.questionsForm.reset(this.originalQuestionsFormValues)}slugify(o){if(!o)return"";const n={\u00e1:"a",\u00e9:"e",\u00ed:"i",\u00f3:"o",\u00f6:"o",\u0151:"o",\u00fa:"u",\u00fc:"u",\u0171:"u",\u00c1:"A",\u00c9:"E",\u00cd:"I",\u00d3:"O",\u00d6:"O",\u0150:"O",\u00da:"U",\u00dc:"U",\u0170:"U"};return(o=o.split("").map(t=>n[t]||t).join("")).trim().toLowerCase().replace(/[^a-z0-9 -]/g,"").replace(/\s+/g,"-").replace(/-+/g,"-")}copyUrl(o){navigator.clipboard.writeText(o),this.messageService.add({severity:"success",summary:"Regisztr\xe1ci\xf3s link v\xe1g\xf3lapra m\xe1solva",detail:o})}getMealStyle(o){switch(o){case"reggeli":return"breakfast";case"eb\xe9d":return"lunch";case"vacsora":return"dinner";default:return"nothing"}}ngOnDestroy(){}static#e=this.\u0275fac=function(n){return new(n||x)(e.Y36(R.K),e.Y36(g.F0),e.Y36(a.qu),e.Y36(Y.Z),e.Y36(P),e.Y36(G.Q),e.Y36(A.s),e.Y36(Z.ez),e.Y36(j.k))};static#t=this.\u0275cmp=e.Xpm({type:x,selectors:[["conference"]],features:[e._Bn([Z.ez])],decls:117,vars:60,consts:[[1,"grid"],[1,"col-12"],[1,"card","px-0","py-0"],["dataKey","id","responsiveLayout","scroll","currentPageReportTemplate","{first} - {last} bejegyz\xe9s a(z) {totalRecords}-b\xf3l megjelen\xedt\xe9se","selectionMode","multiple",3,"value","rows","totalRecords","globalFilterFields","paginator","rowsPerPageOptions","showCurrentPageReport","selection","tableStyle","rowHover","lazy","selectionChange","onRowExpand","onLazyLoad"],["dt",""],["pTemplate","caption"],["pTemplate","header"],["pTemplate","body"],["pTemplate","rowexpansion"],["pTemplate","emptymessage"],["id","sidebar","position","right","styleClass","p-sidebar-md",3,"visible","transitionOptions","fullScreen","blockScroll","visibleChange"],["novalidate","",1,"grid","formgrid","p-fluid",3,"formGroup","ngSubmit"],["formControlName","id","type","hidden"],[1,"field","mb-4","col-12"],["for","name",1,"font-medium","text-900"],["id","name","type","text","pInputText","","formControlName","name"],["class","block p-error",4,"ngIf"],["for","formUrl",1,"font-medium","text-900"],[1,"block","mt-2","md:mt-0","p-input-icon-right"],[1,"pi","pi-copy","cursor-pointer","hover:text-blue-500",3,"click"],["id","formUrl","type","text","pInputText","","formControlName","formUrl","readonly",""],[1,"field","mb-4","col-12","lg:col-6"],["for","beginDate",1,"font-medium","text-900"],["formControlName","beginDate","appendTo","body","dataType","string","dateFormat","yy-mm-dd",3,"showButtonBar"],["for","firstMeal",1,"font-medium","text-900"],["controlName","firstMeal",3,"parentForm"],["for","endDate",1,"font-medium","text-900"],["formControlName","endDate","appendTo","body","dataType","string","dateFormat","yy-mm-dd",3,"showButtonBar"],["for","lastMeal",1,"font-medium","text-900"],["controlName","lastMeal",3,"parentForm"],["for","contractorName",1,"font-medium","text-900"],["id","contractorName","type","text","pInputText","","formControlName","contractorName"],["for","contractorTaxNumber",1,"font-medium","text-900"],["id","contractorTaxNumber","type","text","pInputText","","formControlName","contractorTaxNumber"],["for","contractorAdress",1,"font-medium","text-900"],["id","contractorAdress","type","text","pInputText","","formControlName","contractorAdress"],["for","organizer",1,"font-medium","text-900"],["controlName","organizer_user_id",3,"parentForm","user_rolesid"],["for","contactName",1,"font-medium","text-900"],["id","contactName","type","text","pInputText","","formControlName","contactName"],["for","contactPhone",1,"font-medium","text-900"],["id","contactPhone","type","text","pInputText","","formControlName","contactPhone"],["for","contactEmail",1,"font-medium","text-900"],["id","contactEmail","type","text","pInputText","","formControlName","contactEmail"],["for","registrationEndDate",1,"font-medium","text-900"],["formControlName","registrationEndDate","appendTo","body","dataType","string","dateFormat","yy-mm-dd",3,"showButtonBar"],["for","guestEditEndDate",1,"font-medium","text-900"],["formControlName","guestEditEndDate","appendTo","body","dataType","string","dateFormat","yy-mm-dd",3,"showButtonBar"],["pTemplate","footer"],["id","questionsSidebar","position","right","styleClass","p-sidebar-md",3,"visible","transitionOptions","fullScreen","blockScroll","visibleChange"],[1,"block","text-sm","mb-0"],["novalidate","",1,"p-fluid",3,"formGroup","ngSubmit"],["formControlName","conferenceid","type","hidden"],["formArrayName","questions",1,"flex","flex-wrap","w-full"],["class","w-full mt-3",3,"formGroupName",4,"ngFor","ngForOf"],["header","T\xf6rl\xe9s",3,"visible","modal","visibleChange"],[1,"flex","align-items-center","justify-content-center"],[1,"pi","pi-exclamation-triangle","mr-3",2,"font-size","2rem"],[4,"ngIf"],[3,"autoZIndex","blocked"],[1,"flex","flex-column","md:flex-row","md:justify-content-between","md:align-items-center"],[1,"m-0"],[1,"block","mt-2","md:mt-0","p-input-icon-left"],[1,"pi","pi-search"],["pInputText","","type","text","placeholder","Keres\xe9s...",1,"w-full","sm:w-auto",3,"input"],[1,"block","mt-2","md:mt-0"],["pButton","","pRipple","","label","\xdaj","icon","pi pi-plus",1,"p-button-success","mr-2",3,"disabled","click"],["pSortableColumn","name"],["field","name"],["pSortableColumn","beginDate"],["field","beginDate"],["pSortableColumn","firstMeal"],["pSortableColumn","endDate"],["field","endDate"],["pSortableColumn","lastMeal"],["pInputText","","type","text","placeholder","Keres\xe9s...",2,"width","40%","min-width","22rem",3,"input"],["appendTo","body","dataType","string","placeholder","Keres\xe9s...",3,"showButtonBar","onSelect","onClearClick"],["placeholder","Keres\xe9s...",3,"showNothing","showClear","change"],[1,"pr-0"],["type","button","styleClass","p-button-rounded p-button-text","pRipple","",3,"pRowToggler","icon"],[2,"width","30%","min-width","15rem"],[1,"p-column-title"],[2,"width","14%","min-width","10rem"],[1,"calendar-badge"],[1,"pi","pi-calendar","mr-1"],[3,"ngClass"],[1,"flex"],["pButton","","pRipple","","icon","pi pi-copy","pTooltip","Regisztr\xe1ci\xf3s link m\xe1sol\xe1sa v\xe1g\xf3lapra","tooltipPosition","top",1,"p-button-rounded","p-button-success","mr-2",3,"disabled","click"],["pButton","","pRipple","","icon","pi pi-search","pTooltip","Regisztr\xe1ci\xf3s \u0171rlap megnyit\xe1sa","tooltipPosition","top",1,"p-button-rounded","p-button-success","mr-2",3,"click"],["pButton","","pRipple","","icon","pi pi-question","pTooltip","Extra k\xe9rd\xe9sek be\xe1ll\xedt\xe1sa","tooltipPosition","top",1,"p-button-rounded","p-button-success","mr-2",3,"disabled","click"],["pButton","","pRipple","","icon","pi pi-pencil","pTooltip","Konferencia szerkeszt\xe9se","tooltipPosition","top",1,"p-button-rounded","p-button-success","mr-2",3,"disabled","click"],["pButton","","pRipple","","icon","pi pi-trash","pTooltip","Konferencia t\xf6rl\xe9se","tooltipPosition","top",1,"p-button-rounded","p-button-warning",3,"disabled","click"],["colspan","10"],[1,"p-2"],[1,"w-full"],[1,"grid","w-full"],[1,"col-6"],["cellspacing","0","cellpadding","7"],[1,"font-medium"],[3,"href"],[1,"col-5"],[4,"ngFor","ngForOf"],["width","10rem","styleClass","mb-2"],["class","flex flex-column w-full mb-3",4,"ngIf"],[1,"flex","flex-column","w-full","mb-3"],[1,"font-medium","text-900"],["src","assets/demo/images/flag/flag_placeholder.png",1,"flag","flag-hu","mr-1",2,"width","18px"],["src","assets/demo/images/flag/flag_placeholder.png",1,"flag","flag-gb","mr-1",2,"width","18px"],[1,"text-center"],[1,"font-semibold","text-xl"],[1,"block","p-error"],[1,"flex","justify-content-end","ap-2"],["pButton","","pRipple","","label","M\xe9gsem","icon","pi pi-times",1,"p-button-outlined",3,"disabled","click"],["pButton","","pRipple","","label","Ment\xe9s","icon","pi pi-check",1,"p-button","ml-2",3,"disabled","click"],[1,"w-full","mt-3",3,"formGroupName"],[1,"font-medium","text-900","mb-2",3,"for"],[1,"block","mt-2","p-input-icon-left"],["src","assets/demo/images/flag/flag_placeholder.png",1,"flag","flag-hu",2,"width","18px","margin-top","-8px"],["type","text","pInputText","","formControlName","hu",1,"w-full",3,"id"],["src","assets/demo/images/flag/flag_placeholder.png",1,"flag","flag-gb",2,"width","18px","margin-top","-8px"],["type","text","pInputText","","formControlName","en",1,"w-full",3,"id"],["pButton","","pRipple","","label","Nem","icon","pi pi-times",1,"p-button-outlined",3,"click"],["pButton","","pRipple","","label","Igen","icon","pi pi-check",1,"p-button","ml-2",3,"click"]],template:function(n,t){1&n&&(e.TgZ(0,"div",0)(1,"div",1)(2,"div",2)(3,"p-table",3,4),e.NdJ("selectionChange",function(l){return t.selected=l})("onRowExpand",function(l){return t.onRowExpand(l.data)})("onLazyLoad",function(l){return t.onLazyLoad(l)}),e.YNc(5,V,8,1,"ng-template",5),e.YNc(6,W,31,6,"ng-template",6),e.YNc(7,X,38,19,"ng-template",7),e.YNc(8,ie,64,20,"ng-template",8),e.YNc(9,le,3,1,"ng-template",9),e.qZA()(),e.TgZ(10,"p-sidebar",10),e.NdJ("visibleChange",function(l){return t.sidebar=l}),e.YNc(11,se,2,1,"ng-template",6),e.TgZ(12,"form",11),e.NdJ("ngSubmit",function(){return t.save()}),e._UZ(13,"input",12),e.TgZ(14,"div",13)(15,"label",14),e._uU(16,"Konferencia neve"),e.qZA(),e._UZ(17,"input",15),e.YNc(18,ae,2,0,"div",16),e.qZA(),e.TgZ(19,"div",13)(20,"label",17),e._uU(21,"Regisztr\xe1ci\xf3s \u0171rlap link"),e.qZA(),e.TgZ(22,"span",18)(23,"i",19),e.NdJ("click",function(){return t.copyUrl(null==t.formUrl?null:t.formUrl.value)}),e.qZA(),e._UZ(24,"input",20),e.qZA(),e.YNc(25,ue,2,0,"div",16),e.qZA(),e.TgZ(26,"div",21)(27,"label",22),e._uU(28,"Kezdete"),e.qZA(),e._UZ(29,"p-calendar",23),e.YNc(30,ce,2,0,"div",16),e.qZA(),e.TgZ(31,"div",21)(32,"label",24),e._uU(33,"Els\u0151 \xe9tkez\xe9s"),e.qZA(),e._UZ(34,"app-meal-selector",25),e.YNc(35,de,2,0,"div",16),e.qZA(),e.TgZ(36,"div",21)(37,"label",26),e._uU(38,"V\xe9ge"),e.qZA(),e._UZ(39,"p-calendar",27),e.YNc(40,pe,2,0,"div",16),e.qZA(),e.TgZ(41,"div",21)(42,"label",28),e._uU(43,"Utols\xf3 \xe9tkez\xe9s"),e.qZA(),e._UZ(44,"app-meal-selector",29),e.YNc(45,me,2,0,"div",16),e.qZA(),e.TgZ(46,"div",21)(47,"label",30),e._uU(48,"Szerz\u0151d\u0151 neve"),e.qZA(),e._UZ(49,"input",31),e.YNc(50,ge,2,0,"div",16),e.qZA(),e.TgZ(51,"div",21)(52,"label",32),e._uU(53,"Szerz\u0151d\u0151 ad\xf3sz\xe1ma"),e.qZA(),e._UZ(54,"input",33),e.YNc(55,fe,2,0,"div",16),e.qZA(),e.TgZ(56,"div",21)(57,"label",34),e._uU(58,"Szerz\u0151d\u0151 c\xedme"),e.qZA(),e._UZ(59,"input",35),e.YNc(60,he,2,0,"div",16),e.qZA(),e.TgZ(61,"div",21)(62,"label",36),e._uU(63,"Szervez\u0151"),e.qZA(),e._UZ(64,"app-user-selector",37),e.qZA(),e.TgZ(65,"div",21)(66,"label",38),e._uU(67,"Kapcsolattart\xf3 neve"),e.qZA(),e._UZ(68,"input",39),e.YNc(69,_e,2,0,"div",16),e.qZA(),e.TgZ(70,"div",21)(71,"label",40),e._uU(72,"Kapcsolattart\xf3 telefonsz\xe1ma"),e.qZA(),e._UZ(73,"input",41),e.YNc(74,be,2,0,"div",16),e.qZA(),e.TgZ(75,"div",21)(76,"label",42),e._uU(77,"Kapcsolattart\xf3 e-mail c\xedme"),e.qZA(),e._UZ(78,"input",43),e.YNc(79,Ze,2,0,"div",16),e.YNc(80,ve,2,0,"div",16),e.qZA(),e.TgZ(81,"div",21)(82,"label",44),e._uU(83,"Regisztr\xe1ci\xf3 v\xe9ge"),e.qZA(),e._UZ(84,"p-calendar",45),e.YNc(85,Ce,2,0,"div",16),e.qZA(),e.TgZ(86,"div",21)(87,"label",46),e._uU(88,"Vend\xe9g m\xf3dos\xedt\xe1s hat\xe1rideje"),e.qZA(),e._UZ(89,"p-calendar",47),e.YNc(90,Te,2,0,"div",16),e.qZA()(),e.YNc(91,xe,3,2,"ng-template",48),e.qZA(),e.TgZ(92,"p-sidebar",49),e.NdJ("visibleChange",function(l){return t.questionsSidebar=l}),e.YNc(93,Fe,2,0,"ng-template",6),e.TgZ(94,"p",50),e._uU(95," \u0170rlaponk\xe9nt az alap\xe9rtelmezett mez\u0151k\xf6n fel\xfcl 5 extra k\xe9rd\xe9s tehet\u0151 fel."),e._UZ(96,"br"),e._uU(97," Az \xfcresen hagyott k\xe9rd\xe9sek nem fognak megjelenni az \u0171rlapon. "),e.qZA(),e.TgZ(98,"form",51),e.NdJ("ngSubmit",function(){return t.saveQuestions()}),e._UZ(99,"input",52),e.TgZ(100,"div",53),e.YNc(101,Ae,12,6,"div",54),e.qZA()(),e.YNc(102,Ee,3,2,"ng-template",48),e.qZA(),e.TgZ(103,"p-dialog",55),e.NdJ("visibleChange",function(l){return t.deleteDialog=l}),e.TgZ(104,"div",56),e._UZ(105,"i",57),e.YNc(106,Ue,5,1,"span",58),e.qZA(),e.YNc(107,ye,3,0,"ng-template",48),e.qZA(),e.TgZ(108,"p-dialog",55),e.NdJ("visibleChange",function(l){return t.bulkDeleteDialog=l}),e.TgZ(109,"div",56),e._UZ(110,"i",57),e.TgZ(111,"span"),e._uU(112,"Biztosan t\xf6r\xf6lni akarja a kiv\xe1lasztott konferenci\xe1kat?"),e.qZA()(),e.YNc(113,Ne,3,0,"ng-template",48),e.qZA()()(),e.TgZ(114,"p-blockUI",59),e._UZ(115,"p-progressSpinner"),e.qZA(),e._UZ(116,"p-toast")),2&n&&(e.xp6(3),e.Q6J("value",t.tableData)("rows",t.rowsPerPage)("totalRecords",t.totalRecords)("globalFilterFields",e.DdM(56,Se))("paginator",!0)("rowsPerPageOptions",t.rowsPerPageOptions)("showCurrentPageReport",!0)("selection",t.selected)("tableStyle",e.DdM(57,ke))("rowHover",!0)("lazy",!0),e.xp6(7),e.Q6J("visible",t.sidebar)("transitionOptions",".3s cubic-bezier(0, 0, 0.2, 1)")("fullScreen",t.isMobile)("blockScroll",!0),e.xp6(2),e.Q6J("formGroup",t.conferenceForm),e.xp6(6),e.Q6J("ngIf",(null==t.name?null:t.name.dirty)&&(null==t.name||null==t.name.errors?null:t.name.errors.required)),e.xp6(7),e.Q6J("ngIf",(null==t.formUrl?null:t.formUrl.dirty)&&(null==t.formUrl||null==t.formUrl.errors?null:t.formUrl.errors.required)),e.xp6(4),e.Q6J("showButtonBar",!0),e.xp6(1),e.Q6J("ngIf",(null==t.beginDate?null:t.beginDate.dirty)&&(null==t.beginDate||null==t.beginDate.errors?null:t.beginDate.errors.required)),e.xp6(4),e.Q6J("parentForm",t.conferenceForm),e.xp6(1),e.Q6J("ngIf",(null==t.firstMeal?null:t.firstMeal.dirty)&&(null==t.firstMeal||null==t.firstMeal.errors?null:t.firstMeal.errors.required)),e.xp6(4),e.Q6J("showButtonBar",!0),e.xp6(1),e.Q6J("ngIf",(null==t.endDate?null:t.endDate.dirty)&&(null==t.endDate||null==t.endDate.errors?null:t.endDate.errors.required)),e.xp6(4),e.Q6J("parentForm",t.conferenceForm),e.xp6(1),e.Q6J("ngIf",(null==t.lastMeal?null:t.lastMeal.dirty)&&(null==t.lastMeal||null==t.lastMeal.errors?null:t.lastMeal.errors.required)),e.xp6(5),e.Q6J("ngIf",(null==t.contractorName?null:t.contractorName.dirty)&&(null==t.contractorName||null==t.contractorName.errors?null:t.contractorName.errors.required)),e.xp6(5),e.Q6J("ngIf",(null==t.contractorTaxNumber?null:t.contractorTaxNumber.dirty)&&(null==t.contractorTaxNumber||null==t.contractorTaxNumber.errors?null:t.contractorTaxNumber.errors.required)),e.xp6(5),e.Q6J("ngIf",(null==t.contractorAdress?null:t.contractorAdress.dirty)&&(null==t.contractorAdress||null==t.contractorAdress.errors?null:t.contractorAdress.errors.required)),e.xp6(4),e.Q6J("parentForm",t.conferenceForm)("user_rolesid",4),e.xp6(5),e.Q6J("ngIf",(null==t.contactName?null:t.contactName.dirty)&&(null==t.contactName||null==t.contactName.errors?null:t.contactName.errors.required)),e.xp6(5),e.Q6J("ngIf",(null==t.contactPhone?null:t.contactPhone.dirty)&&(null==t.contactPhone||null==t.contactPhone.errors?null:t.contactPhone.errors.required)),e.xp6(5),e.Q6J("ngIf",(null==t.contactEmail?null:t.contactEmail.dirty)&&(null==t.contactEmail||null==t.contactEmail.errors?null:t.contactEmail.errors.required)),e.xp6(1),e.Q6J("ngIf",(null==t.contactEmail?null:t.contactEmail.dirty)&&(null==t.contactEmail||null==t.contactEmail.errors?null:t.contactEmail.errors.invalidEmail)),e.xp6(4),e.Q6J("showButtonBar",!0),e.xp6(1),e.Q6J("ngIf",(null==t.registrationEndDate?null:t.registrationEndDate.dirty)&&(null==t.registrationEndDate||null==t.registrationEndDate.errors?null:t.registrationEndDate.errors.required)),e.xp6(4),e.Q6J("showButtonBar",!0),e.xp6(1),e.Q6J("ngIf",(null==t.guestEditEndDate?null:t.guestEditEndDate.dirty)&&(null==t.guestEditEndDate||null==t.guestEditEndDate.errors?null:t.guestEditEndDate.errors.required)),e.xp6(2),e.Q6J("visible",t.questionsSidebar)("transitionOptions",".3s cubic-bezier(0, 0, 0.2, 1)")("fullScreen",t.isMobile)("blockScroll",!0),e.xp6(6),e.Q6J("formGroup",t.questionsForm),e.xp6(3),e.Q6J("ngForOf",t.questions.controls),e.xp6(2),e.Akn(e.DdM(58,J)),e.Q6J("visible",t.deleteDialog)("modal",!0),e.xp6(3),e.Q6J("ngIf",t.tableItem),e.xp6(2),e.Akn(e.DdM(59,J)),e.Q6J("visible",t.bulkDeleteDialog)("modal",!0),e.xp6(6),e.Q6J("autoZIndex",!0)("blocked",t.loading))},dependencies:[c.mk,c.sg,c.O5,f.iA,Z.jx,f.lQ,f.jB,f.fz,v.Hq,v.zx,a._Y,a.Fj,a.JJ,a.JL,a.sg,a.u,a.x0,a.CE,E.H,U.FN,y.o,N.V,S.Y,k.G,z.b,M.u,D.f,I.O,L.H,H.T,c.uU],encapsulation:2})};C=(0,d.gn)([(0,K.k)()],C);let ze=(()=>{class r{static#e=this.\u0275fac=function(t){return new(t||r)};static#t=this.\u0275mod=e.oAB({type:r});static#n=this.\u0275inj=e.cJS({imports:[g.Bz.forChild([{path:"",component:C}]),g.Bz]})}return r})();var Me=s(2610),De=s(6340),Ie=s(6022),Je=s(6218),we=s(2352),Qe=s(1865),Oe=s(9653),$e=s(6263),Ke=s(5389),Be=s(8057),Re=s(2285);let Ye=(()=>{class r{static#e=this.\u0275fac=function(t){return new(t||r)};static#t=this.\u0275mod=e.oAB({type:r});static#n=this.\u0275inj=e.cJS({imports:[c.ez,ze,f.U$,Me.O,a.UX,v.hJ,E.T,U.EV,De.V,Ie.Xt,y.j,Je.A,we.kW,Qe.cc,Oe.L$,N.S,S.l,k.L,z.u,$e.W,Ke.dp,M.z,Be.nD,D._8,I.m,Re.L]})}return r})()},8022:(w,h,s)=>{s.d(h,{k:()=>g});var c=s(5619),a=s(2029);let g=(()=>{class d{constructor(){this.isMobileSubject=new c.X(window.innerWidth<=768),this.isMobile$=this.isMobileSubject.asObservable(),this.updateIsMobile(),window.addEventListener("resize",()=>this.updateIsMobile())}updateIsMobile(){const m=window.innerWidth<=768;this.isMobileSubject.next(m)}getIsMobile(){return this.isMobileSubject.value}static#e=this.\u0275fac=function(b){return new(b||d)};static#t=this.\u0275prov=a.Yz7({token:d,factory:d.\u0275fac,providedIn:"root"})}return d})()}}]);