"use strict";(self.webpackChunknfc_reserve=self.webpackChunknfc_reserve||[]).push([[6929],{6929:(Ie,v,l)=>{l.r(v),l.d(v,{ConferenceListModule:()=>De});var p=l(6814),a=l(6223),f=l(9739),D=l(7582),J=l(8645),h=l(5619),z=l(3620),I=l(3997),Q=l(7398),$=l(4279),w=l(1836),_=l(5219),T=l(6676),e=l(2029),K=l(1206),B=l(219),F=l(8814);let Y=(()=>{class o{constructor(n){this.apiService=n,this.apiURL=n.apiURL,this.data$=new h.X(null),this.message$=new h.X(null)}get questionObs(){return this.data$.asObservable()}get messageObs(){return this.message$.asObservable()}get(n,t,i,s){let u="";""!==i&&(u=""!=i.sortField?`sort=${i.sortField}&order=${1===i.sortOrder?"ASC":"DESC"}`:"");const g=""!==u&&""!==s?u+"&"+s:""!==u&&""===s?u:""===u&&""!==s?s:"";this.apiService.get(`questions/get/${n}/${t}${""!==g?"?"+g:""}`).subscribe({next:c=>{this.data$.next(c)},error:c=>{this.message$.next(c)}})}getBySearch(n,t){let i="";""!==t&&(i=""!=t.sortField?`?sort=${t.sortField}&order=${1===t.sortOrder?"ASC":"DESC"}`:""),this.apiService.get(`questions/search/${n}${i}`).subscribe({next:s=>{this.data$.next(s)},error:s=>{this.message$.next(s)}})}getBySearchQuery(n){this.apiService.get(`questions/searchquery?${n}`).subscribe({next:t=>{this.data$.next(t)},error:t=>{this.message$.next(t)}})}create(n){this.apiService.post("questions/create/",n).subscribe({next:t=>{this.message$.next({severity:"success",summary:"Sikeres k\xe9rd\xe9s r\xf6gz\xedt\xe9s",detail:`${n.translations.hu} r\xf6gz\xedtve`})},error:t=>{this.message$.next(t)}})}update(n){this.apiService.put(`questions/update/${n.id}`,n).subscribe({next:()=>{this.message$.next({severity:"success",summary:"Sikeres k\xe9rd\xe9s m\xf3dos\xedt\xe1s",detail:`${n.translations.hu} m\xf3dos\xedtva`})},error:t=>{this.message$.next(t)}})}delete(n){this.apiService.delete(`questions/delete/${n.id}`).subscribe({next:t=>{this.message$.next({severity:"success",summary:"Sikeres k\xe9rd\xe9s t\xf6rl\xe9s",detail:`${n.translations.hu} t\xf6r\xf6lve`})},error:t=>{this.message$.next(t)}})}bulkdelete(n){let t={ids:n.map(i=>i.id)};this.apiService.post("question/bulkdelete",t).subscribe({next:i=>{this.message$.next({severity:"success",summary:"Sikeres k\xe9rd\xe9s t\xf6rl\xe9s",detail:`${n.length} k\xe9rd\xe9s t\xf6r\xf6lve`})},error:i=>{this.message$.next(i)}})}static#e=this.\u0275fac=function(t){return new(t||o)(e.LFG(F.s))};static#t=this.\u0275prov=e.Yz7({token:o,factory:o.\u0275fac,providedIn:"root"})}return o})();var G=l(3139),m=l(9664),x=l(707),A=l(4480),q=l(4104),U=l(3714),y=l(7213),N=l(9246),E=l(7680),k=l(4204),M=l(3259),S=l(3212),R=l(7939),O=l(117);const d=function(){return["Super Admin","Nagy Admin"]};function P(o,r){if(1&o){const n=e.EpF();e.TgZ(0,"div",58)(1,"h5",59),e._uU(2,"Konferenci\xe1k"),e.qZA(),e.TgZ(3,"span",60),e._UZ(4,"i",61),e.TgZ(5,"input",62),e.NdJ("input",function(i){e.CHM(n);const s=e.oxw(),u=e.MAs(4);return e.KtG(s.onGlobalFilter(u,i))}),e.qZA()(),e.TgZ(6,"span",63)(7,"button",64),e.NdJ("click",function(){e.CHM(n);const i=e.oxw();return e.KtG(i.create())}),e.qZA(),e.TgZ(8,"button",65),e.NdJ("click",function(){e.CHM(n);const i=e.oxw();return e.KtG(i.bulkDeleteDialog=!0)}),e.qZA()()()}if(2&o){const n=e.oxw();e.xp6(7),e.Q6J("disabled",!n.userService.hasRole(e.DdM(2,d))),e.xp6(1),e.Q6J("disabled",!n.selected||!n.selected.length||!n.userService.hasRole(e.DdM(3,d)))}}function H(o,r){if(1&o){const n=e.EpF();e.TgZ(0,"tr"),e._UZ(1,"th"),e.TgZ(2,"th",66),e._uU(3,"N\xe9v "),e._UZ(4,"p-sortIcon",67),e.qZA(),e.TgZ(5,"th",68),e._uU(6,"Kezdete "),e._UZ(7,"p-sortIcon",69),e.qZA(),e.TgZ(8,"th",70),e._uU(9,"Els\u0151 \xe9tkez\xe9s "),e._UZ(10,"p-sortIcon",69),e.qZA(),e.TgZ(11,"th",71),e._uU(12,"V\xe9ge "),e._UZ(13,"p-sortIcon",72),e.qZA(),e.TgZ(14,"th",73),e._uU(15,"Utols\xf3 \xe9tkez\xe9s "),e._UZ(16,"p-sortIcon",72),e.qZA(),e._UZ(17,"th"),e.qZA(),e.TgZ(18,"tr")(19,"th",74),e._UZ(20,"p-tableHeaderCheckbox"),e.qZA(),e.TgZ(21,"th")(22,"input",75),e.NdJ("input",function(i){e.CHM(n);const s=e.oxw();return e.KtG(s.onFilter(i,"name"))}),e.qZA()(),e.TgZ(23,"th")(24,"p-calendar",76),e.NdJ("onSelect",function(i){e.CHM(n);const s=e.oxw();return e.KtG(s.onFilter(i,"beginDate"))})("onClearClick",function(i){e.CHM(n);const s=e.oxw();return e.KtG(s.onFilter(i,"beginDate"))}),e.qZA()(),e.TgZ(25,"th")(26,"app-meal-selector",77),e.NdJ("change",function(i){e.CHM(n);const s=e.oxw();return e.KtG(s.onFilter(i,"firstMeal"))}),e.qZA()(),e.TgZ(27,"th")(28,"p-calendar",76),e.NdJ("onSelect",function(i){e.CHM(n);const s=e.oxw();return e.KtG(s.onFilter(i,"endDate"))})("onClearClick",function(i){e.CHM(n);const s=e.oxw();return e.KtG(s.onFilter(i,"endDate"))}),e.qZA()(),e.TgZ(29,"th")(30,"app-meal-selector",77),e.NdJ("change",function(i){e.CHM(n);const s=e.oxw();return e.KtG(s.onFilter(i,"lastMeal"))}),e.qZA()(),e._UZ(31,"th"),e.qZA()}2&o&&(e.xp6(24),e.Q6J("showButtonBar",!0),e.xp6(2),e.Q6J("showNothing",!1)("showClear",!0),e.xp6(2),e.Q6J("showButtonBar",!0),e.xp6(2),e.Q6J("showNothing",!1)("showClear",!0))}const j=function(){return["Szervezo"]};function V(o,r){if(1&o){const n=e.EpF();e.TgZ(0,"tr")(1,"td"),e._UZ(2,"p-tableCheckbox",78),e.qZA(),e.TgZ(3,"td",79)(4,"span",80),e._uU(5,"N\xe9v"),e.qZA(),e._uU(6),e.qZA(),e.TgZ(7,"td",81)(8,"span",80),e._uU(9,"Kezdete"),e.qZA(),e.TgZ(10,"span",82),e._UZ(11,"i",83),e._uU(12),e.ALo(13,"date"),e.qZA()(),e.TgZ(14,"td",81)(15,"span",80),e._uU(16,"Els\u0151 \xe9tkez\xe9s"),e.qZA(),e.TgZ(17,"span",84),e._uU(18),e.qZA()(),e.TgZ(19,"td",81)(20,"span",80),e._uU(21,"V\xe9ge"),e.qZA(),e.TgZ(22,"span",82),e._UZ(23,"i",83),e._uU(24),e.ALo(25,"date"),e.qZA()(),e.TgZ(26,"td",81)(27,"span",80),e._uU(28,"Utols\xf3 \xe9tkez\xe9s"),e.qZA(),e.TgZ(29,"span",84),e._uU(30),e.qZA()(),e.TgZ(31,"td")(32,"div",85)(33,"button",86),e.NdJ("click",function(){const s=e.CHM(n).$implicit,u=e.oxw();return e.KtG(u.copyUrl(s.formUrl))}),e.qZA(),e.TgZ(34,"button",87),e.NdJ("click",function(){const s=e.CHM(n).$implicit,u=e.oxw();return e.KtG(u.navigateToConferenceForm(s))}),e.qZA(),e.TgZ(35,"button",88),e.NdJ("click",function(){const s=e.CHM(n).$implicit,u=e.oxw();return e.KtG(u.editQuestions(s))}),e.qZA(),e.TgZ(36,"button",89),e.NdJ("click",function(){const s=e.CHM(n).$implicit,u=e.oxw();return e.KtG(u.edit(s))}),e.qZA(),e.TgZ(37,"button",90),e.NdJ("click",function(){const s=e.CHM(n).$implicit,u=e.oxw();return u.tableItem=s,e.KtG(u.deleteDialog=!0)}),e.qZA()()()()}if(2&o){const n=r.$implicit,t=e.oxw();e.xp6(2),e.Q6J("value",n),e.xp6(4),e.hij(" ",n.name," "),e.xp6(6),e.hij(" ",e.xi3(13,12,n.beginDate,"yyyy.MM.dd")," "),e.xp6(5),e.Q6J("ngClass","meal-badge "+t.getMealStyle(n.firstMeal)),e.xp6(1),e.hij(" ",n.firstMeal," "),e.xp6(6),e.hij(" ",e.xi3(25,15,n.endDate,"yyyy.MM.dd")," "),e.xp6(5),e.Q6J("ngClass","meal-badge "+t.getMealStyle(n.lastMeal)),e.xp6(1),e.hij(" ",n.lastMeal," "),e.xp6(3),e.Q6J("disabled",!n.formUrl),e.xp6(2),e.Q6J("disabled",t.userService.hasRole(e.DdM(18,j))&&n.organizer_user_id!==t.userService.getUserId()),e.xp6(1),e.Q6J("disabled",!t.userService.hasRole(e.DdM(19,d))),e.xp6(1),e.Q6J("disabled",!t.userService.hasRole(e.DdM(20,d)))}}function X(o,r){1&o&&(e.TgZ(0,"tr")(1,"td",91),e._uU(2,"Nincs tal\xe1lat..."),e.qZA()()),2&o&&(e.xp6(1),e.uIk("colspan",7))}function W(o,r){1&o&&(e.TgZ(0,"span",92),e._uU(1,"Konferencia adatai"),e.qZA())}function ee(o,r){1&o&&(e.TgZ(0,"div",93),e._uU(1,"K\xf6telez\u0151 kit\xf6lteni "),e.qZA())}function te(o,r){1&o&&(e.TgZ(0,"div",93),e._uU(1,"K\xf6telez\u0151 kit\xf6lteni"),e.qZA())}function ne(o,r){1&o&&(e.TgZ(0,"div",93),e._uU(1,"K\xf6telez\u0151 kit\xf6lteni"),e.qZA())}function re(o,r){1&o&&(e.TgZ(0,"div",93),e._uU(1,"K\xf6telez\u0151 kit\xf6lteni"),e.qZA())}function oe(o,r){1&o&&(e.TgZ(0,"div",93),e._uU(1,"K\xf6telez\u0151 kit\xf6lteni"),e.qZA())}function ie(o,r){1&o&&(e.TgZ(0,"div",93),e._uU(1,"K\xf6telez\u0151 kit\xf6lteni"),e.qZA())}function se(o,r){1&o&&(e.TgZ(0,"div",93),e._uU(1," K\xf6telez\u0151 kit\xf6lteni"),e.qZA())}function le(o,r){1&o&&(e.TgZ(0,"div",93),e._uU(1,"K\xf6telez\u0151 kit\xf6lteni"),e.qZA())}function ae(o,r){1&o&&(e.TgZ(0,"div",93),e._uU(1,"K\xf6telez\u0151 kit\xf6lteni"),e.qZA())}function ue(o,r){1&o&&(e.TgZ(0,"div",93),e._uU(1,"K\xf6telez\u0151 kit\xf6lteni"),e.qZA())}function ce(o,r){1&o&&(e.TgZ(0,"div",93),e._uU(1," K\xf6telez\u0151 kit\xf6lteni"),e.qZA())}function me(o,r){1&o&&(e.TgZ(0,"div",93),e._uU(1," K\xf6telez\u0151 kit\xf6lteni"),e.qZA())}function pe(o,r){1&o&&(e.TgZ(0,"div",93),e._uU(1,"Nem megfelel\u0151 email form\xe1tum"),e.qZA())}function de(o,r){1&o&&(e.TgZ(0,"div",93),e._uU(1,"K\xf6telez\u0151 kit\xf6lteni"),e.qZA())}function ge(o,r){if(1&o){const n=e.EpF();e.TgZ(0,"div",94)(1,"button",95),e.NdJ("click",function(){e.CHM(n);const i=e.oxw();return e.KtG(i.cancel())}),e.qZA(),e.TgZ(2,"button",96),e.NdJ("click",function(){e.CHM(n);const i=e.oxw();return e.KtG(i.save())}),e.qZA()()}if(2&o){const n=e.oxw();e.xp6(1),e.Q6J("disabled",!n.conferenceForm.dirty),e.xp6(1),e.Q6J("disabled",!n.conferenceForm.valid||!n.conferenceForm.dirty)}}function fe(o,r){1&o&&(e.TgZ(0,"span",92),e._uU(1,"Szerverz\u0151 k\xe9rd\xe9sei"),e.qZA())}function he(o,r){if(1&o&&(e.TgZ(0,"div",97)(1,"label",98),e._uU(2),e.qZA(),e.TgZ(3,"div",99)(4,"i"),e._UZ(5,"img",100),e.qZA(),e._UZ(6,"input",101),e.qZA(),e.TgZ(7,"div",99)(8,"i"),e._UZ(9,"img",102),e.qZA(),e._UZ(10,"input",103),e.qZA()()),2&o){const n=r.index;e.Q6J("formGroupName",n),e.xp6(1),e.MGl("for","en-",n,""),e.xp6(1),e.hij(" ",n+1,". k\xe9rd\xe9s "),e.xp6(4),e.MGl("id","hu-",n,""),e.xp6(4),e.MGl("id","en-",n,"")}}function _e(o,r){if(1&o){const n=e.EpF();e.TgZ(0,"div",94)(1,"button",95),e.NdJ("click",function(){e.CHM(n);const i=e.oxw();return e.KtG(i.cancelQuestions())}),e.qZA(),e.TgZ(2,"button",96),e.NdJ("click",function(){e.CHM(n);const i=e.oxw();return e.KtG(i.saveQuestions())}),e.qZA()()}if(2&o){const n=e.oxw();e.xp6(1),e.Q6J("disabled",!n.questionsForm.dirty),e.xp6(1),e.Q6J("disabled",!n.questionsForm.valid||!n.questionsForm.dirty)}}function be(o,r){if(1&o&&(e.TgZ(0,"span"),e._uU(1,"Biztosan t\xf6r\xf6lni akarja a(z) "),e.TgZ(2,"b"),e._uU(3),e.qZA(),e._uU(4," konferenci\xe1t?"),e.qZA()),2&o){const n=e.oxw();e.xp6(3),e.Oqu(n.tableItem.name)}}function Ze(o,r){if(1&o){const n=e.EpF();e.TgZ(0,"div",94)(1,"button",104),e.NdJ("click",function(){e.CHM(n);const i=e.oxw();return e.KtG(i.deleteDialog=!1)}),e.qZA(),e.TgZ(2,"button",105),e.NdJ("click",function(){e.CHM(n);const i=e.oxw();return e.KtG(i.delete())}),e.qZA()()}}function Ce(o,r){if(1&o){const n=e.EpF();e.TgZ(0,"div",94)(1,"button",104),e.NdJ("click",function(){e.CHM(n);const i=e.oxw();return e.KtG(i.bulkDeleteDialog=!1)}),e.qZA(),e.TgZ(2,"button",105),e.NdJ("click",function(){e.CHM(n);const i=e.oxw();return e.KtG(i.deleteSelected())}),e.qZA()()}}const ve=function(){return["name","beginDate","endDate"]},Te=function(){return{"min-height":"calc(100vh - 320px)"}},L=function(){return{width:"450px"}};T.locale("hu");let b=class C{constructor(r,n,t,i,s,u,g,Z){this.userService=r,this.router=n,this.formBuilder=t,this.conferenceService=i,this.questionService=s,this.mealService=u,this.apiService=g,this.messageService=Z,this.loading=!0,this.cols=[],this.tableItem={},this.tableData=[],this.rowsPerPageOptions=[20,50,100],this.rowsPerPage=20,this.totalRecords=0,this.page=0,this.sortField="",this.sortOrder=1,this.globalFilter="",this.filterValues={},this.debounce={},this.sidebar=!1,this.questionsSidebar=!1,this.deleteDialog=!1,this.bulkDeleteDialog=!1,this.selected=[],this.meals=[],this.formChanges$=new J.x,this.conferenceForm=this.formBuilder.group({id:[""],name:["",a.kI.required],beginDate:["",a.kI.required],endDate:["",a.kI.required],firstMeal:["",a.kI.required],lastMeal:["",a.kI.required],contractorName:["",a.kI.required],contractorAdress:["",a.kI.required],contractorTaxNumber:["",[a.kI.required]],contactName:["",a.kI.required],contactEmail:["",[a.kI.required,(0,w.u)()]],contactPhone:["",a.kI.required],formUrl:["",a.kI.required],registrationEndDate:["",a.kI.required],organizer_user_id:[""]}),this.isFormValid$=new h.X(!1),this.conferenceForm.get("name")?.valueChanges.subscribe(c=>{const Je=this.apiService.productionURL;let ze=this.slugify(c);this.conferenceForm.patchValue({formUrl:`${Je}/#/conference-form/${ze}`})}),this.initializeQuestionsForm()}ngOnInit(){this.conferenceObs$=this.conferenceService.conferenceObs,this.conferenceObs$.subscribe(r=>{this.loading=!1,r&&(this.tableData=r.rows||[],this.totalRecords=r.totalItems||0,this.page=r.currentPage||0)}),this.meals=this.mealService.getMealsForSelector(),this.isFormValid$=this.formChanges$.pipe((0,z.b)(300),(0,I.x)(),(0,Q.U)(()=>this.conferenceForm.valid)),this.conferenceForm.valueChanges.subscribe(()=>this.formChanges$.next()),this.serviceMessageObs$=this.conferenceService.messageObs,this.serviceMessageObs$.subscribe(r=>this.handleMessage(r)),this.questionMessageObs$=this.questionService.messageObs,this.questionMessageObs$.subscribe(r=>this.handleMessage(r))}get name(){return this.conferenceForm.get("name")}get beginDate(){return this.conferenceForm.get("beginDate")}get endDate(){return this.conferenceForm.get("endDate")}get firstMeal(){return this.conferenceForm.get("firstMeal")}get lastMeal(){return this.conferenceForm.get("lastMeal")}get contractorName(){return this.conferenceForm.get("contractorName")}get contractorAdress(){return this.conferenceForm.get("contractorAdress")}get contractorTaxNumber(){return this.conferenceForm.get("contractorTaxNumber")}get contactName(){return this.conferenceForm.get("contactName")}get contactEmail(){return this.conferenceForm.get("contactEmail")}get contactPhone(){return this.conferenceForm.get("contactPhone")}get formUrl(){return this.conferenceForm.get("formUrl")}get registrationEndDate(){return this.conferenceForm.get("registrationEndDate")}get questions(){return this.questionsForm.get("questions")}doQuery(){this.loading=!0;const n=Object.keys(this.filterValues).map(t=>this.filterValues[t].length>0?`${t}=${this.filterValues[t]}`:"").filter(t=>t.length>0).join("&");return""!==this.globalFilter?this.conferenceService.getBySearch(this.globalFilter,{sortField:this.sortField,sortOrder:this.sortOrder}):this.conferenceService.get(this.page,this.rowsPerPage,{sortField:this.sortField,sortOrder:this.sortOrder},n)}onFilter(r,n){let i="";r instanceof Date?i=T(r).format("YYYY.MM.DD"):r&&(r.value||r.target?.value)?i="rfid"==n&&10==r.target?.value.length?r.target?.value.replaceAll("\xf6","0"):r.value||r.target?.value:this.filterValues[n]="",this.filterValues[n]=i,["beginDate","endDate","firstMeal","lastMeal"].includes(n)?this.filterValues[n]===i&&this.doQuery():(this.debounce[n]&&clearTimeout(this.debounce[n]),this.debounce[n]=setTimeout(()=>{this.filterValues[n]===i&&this.doQuery()},500))}onLazyLoad(r){this.page=r.first/r.rows,this.rowsPerPage=r.rows??this.rowsPerPage,this.sortField=r.sortField??"",this.sortOrder=r.sortOrder??1,this.globalFilter=r.globalFilter??"",this.doQuery()}onGlobalFilter(r,n){r.filterGlobal(n.target.value,"contains")}handleMessage(r){this.loading=!1,"ERROR"==r?this.messageService.add({severity:"error",summary:"Error",detail:"Hiba t\xf6rt\xe9nt!"}):(this.messageService.add(r),this.tableItem={},this.selected=[],this.doQuery())}initializeQuestionsForm(){const r=this.tableItem.questions,t=r&&r.length&&r[0].translations?r[0].translations:[];this.questionsForm=this.formBuilder.group({conferenceid:[this.tableItem.id],questions:this.formBuilder.array([])}),t.forEach(s=>{this.questions.push(this.formBuilder.group({hu:[s.hu],en:[s.en]}))});const i=5-this.questions.length;for(let s=0;s<i;s++)this.questions.push(this.formBuilder.group({hu:[""],en:[""]}));this.originalQuestionsFormValues=this.questionsForm.value}setFormUrl(){let r=this.tableItem.name||"";r=this.slugify(r),this.tableItem.formUrl=`/conference-form/${r}`}navigateToConferenceForm(r){const n=this.slugify(r.name);this.router.navigate(["/conference-form",n])}create(){this.conferenceForm.reset(),this.sidebar=!0}edit(r){this.conferenceForm.reset(),this.conferenceForm.patchValue(r),this.originalFormValues=this.conferenceForm.value,this.sidebar=!0}delete(){this.loading=!0,this.deleteDialog=!1,this.conferenceService.delete(this.tableItem)}deleteSelected(){this.loading=!0,this.deleteDialog=!1,this.conferenceService.bulkdelete(this.selected)}save(){if(this.conferenceForm.valid){this.loading=!0;const r=this.conferenceForm.value;r.id?this.conferenceService.update(r):this.conferenceService.create(r),this.sidebar=!1}}cancel(){this.conferenceForm.reset(this.originalFormValues)}editQuestions(r){this.tableItem=r,this.questionsForm.reset(),this.initializeQuestionsForm(),this.questionsSidebar=!0}saveQuestions(){this.loading=!0,this.questionService.update({id:this.tableItem.questions[0].id,conferenceid:this.tableItem.id,translations:this.questionsForm.value.questions}),this.questionsSidebar=!1}cancelQuestions(){this.questionsForm.reset(this.originalQuestionsFormValues)}slugify(r){return r?r=(r=(r=r.trim()).toLowerCase()).replace(/[^a-z0-9 -]/g,"").replace(/\s+/g,"-").replace(/-+/g,"-"):""}copyUrl(r){navigator.clipboard.writeText(r),this.messageService.add({severity:"success",summary:"Regisztr\xe1ci\xf3s link v\xe1g\xf3lapra m\xe1solva",detail:r})}getMealStyle(r){switch(r){case"reggeli":return"breakfast";case"eb\xe9d":return"lunch";case"vacsora":return"dinner";default:return"nothing"}}ngOnDestroy(){}static#e=this.\u0275fac=function(n){return new(n||C)(e.Y36(K.K),e.Y36(f.F0),e.Y36(a.qu),e.Y36(B.Z),e.Y36(Y),e.Y36(G.Q),e.Y36(F.s),e.Y36(_.ez))};static#t=this.\u0275cmp=e.Xpm({type:C,selectors:[["conferencelist"]],features:[e._Bn([_.ez])],decls:111,vars:52,consts:[[1,"grid"],[1,"col-12"],[1,"card","px-0","py-0"],["dataKey","id","responsiveLayout","scroll","currentPageReportTemplate","{first} - {last} bejegyz\xe9s a(z) {totalRecords}-b\xf3l megjelen\xedt\xe9se","selectionMode","multiple",3,"value","rows","totalRecords","globalFilterFields","paginator","rowsPerPageOptions","showCurrentPageReport","selection","tableStyle","rowHover","lazy","selectionChange","onLazyLoad"],["dt",""],["pTemplate","caption"],["pTemplate","header"],["pTemplate","body"],["pTemplate","emptymessage"],["id","sidebar","position","right","styleClass","p-sidebar-md",3,"visible","visibleChange"],["novalidate","",1,"grid","formgrid","p-fluid",3,"formGroup","ngSubmit"],["formControlName","id","type","hidden"],[1,"field","mb-4","col-12"],["for","name",1,"font-medium","text-900"],["id","name","type","text","pInputText","","formControlName","name"],["class","block p-error",4,"ngIf"],["for","formUrl",1,"font-medium","text-900"],[1,"block","mt-2","md:mt-0","p-input-icon-right"],[1,"pi","pi-copy","cursor-pointer","hover:text-blue-500",3,"click"],["id","formUrl","type","text","pInputText","","formControlName","formUrl","readonly",""],[1,"field","mb-4","col-12","lg:col-6"],["for","beginDate",1,"font-medium","text-900"],["formControlName","beginDate","appendTo","body","dataType","string","dateFormat","yy-mm-dd",3,"showButtonBar"],["for","firstMeal",1,"font-medium","text-900"],["controlName","firstMeal",3,"parentForm"],["for","endDate",1,"font-medium","text-900"],["formControlName","endDate","appendTo","body","dataType","string","dateFormat","yy-mm-dd",3,"showButtonBar"],["for","lastMeal",1,"font-medium","text-900"],["controlName","lastMeal",3,"parentForm"],["for","contractorName",1,"font-medium","text-900"],["id","contractorName","type","text","pInputText","","formControlName","contractorName"],["for","contractorTaxNumber",1,"font-medium","text-900"],["id","contractorTaxNumber","type","text","pInputText","","formControlName","contractorTaxNumber"],[1,"field","mb-4","col-6"],["for","contractorAdress",1,"font-medium","text-900"],["id","contractorAdress","type","text","pInputText","","formControlName","contractorAdress"],["for","organizer",1,"font-medium","text-900"],["controlName","user_id",3,"parentForm","user_rolesid"],["for","contactName",1,"font-medium","text-900"],["id","contactName","type","text","pInputText","","formControlName","contactName"],["for","contactPhone",1,"font-medium","text-900"],["id","contactPhone","type","text","pInputText","","formControlName","contactPhone"],["for","contactEmail",1,"font-medium","text-900"],["id","contactEmail","type","text","pInputText","","formControlName","contactEmail"],["for","registrationEndDate",1,"font-medium","text-900"],["formControlName","registrationEndDate","appendTo","body","dataType","string","dateFormat","yy-mm-dd",3,"showButtonBar"],["pTemplate","footer"],["id","questionsSidebar","position","right","styleClass","p-sidebar-md",3,"visible","visibleChange"],[1,"block","text-sm","mb-0"],["novalidate","",1,"p-fluid",3,"formGroup","ngSubmit"],["formControlName","conferenceid","type","hidden"],["formArrayName","questions",1,"flex","flex-wrap","w-full"],["class","w-full mt-3",3,"formGroupName",4,"ngFor","ngForOf"],["header","T\xf6rl\xe9s",3,"visible","modal","visibleChange"],[1,"flex","align-items-center","justify-content-center"],[1,"pi","pi-exclamation-triangle","mr-3",2,"font-size","2rem"],[4,"ngIf"],[3,"autoZIndex","blocked"],[1,"flex","flex-column","md:flex-row","md:justify-content-between","md:align-items-center"],[1,"m-0"],[1,"block","mt-2","md:mt-0","p-input-icon-left"],[1,"pi","pi-search"],["pInputText","","type","text","placeholder","Keres\xe9s...",1,"w-full","sm:w-auto",3,"input"],[1,"block","mt-2","md:mt-0"],["pButton","","pRipple","","label","\xdaj","icon","pi pi-plus",1,"p-button-success","mr-2",3,"disabled","click"],["pButton","","pRipple","","label","T\xf6rl\xe9s","icon","pi pi-trash",1,"p-button-danger","mr-2",3,"disabled","click"],["pSortableColumn","name"],["field","name"],["pSortableColumn","beginDate"],["field","beginDate"],["pSortableColumn","firstMeal"],["pSortableColumn","endDate"],["field","endDate"],["pSortableColumn","lastMeal"],[2,"width","3rem"],["pInputText","","type","text","placeholder","Keres\xe9s...",2,"width","40%","min-width","22rem",3,"input"],["appendTo","body","dataType","string","placeholder","Keres\xe9s...",3,"showButtonBar","onSelect","onClearClick"],["placeholder","Keres\xe9s...",3,"showNothing","showClear","change"],[3,"value"],[2,"width","30%","min-width","15rem"],[1,"p-column-title"],[2,"width","14%","min-width","10rem"],[1,"calendar-badge"],[1,"pi","pi-calendar","mr-1"],[3,"ngClass"],[1,"flex"],["pButton","","pRipple","","icon","pi pi-copy","pTooltip","Regisztr\xe1ci\xf3s link m\xe1sol\xe1sa v\xe1g\xf3lapra","tooltipPosition","top",1,"p-button-rounded","p-button-success","mr-2",3,"disabled","click"],["pButton","","pRipple","","icon","pi pi-search","pTooltip","Regisztr\xe1ci\xf3s \u0171rlap megnyit\xe1sa","tooltipPosition","top",1,"p-button-rounded","p-button-success","mr-2",3,"click"],["pButton","","pRipple","","icon","pi pi-question","pTooltip","Extra k\xe9rd\xe9sek be\xe1ll\xedt\xe1sa","tooltipPosition","top",1,"p-button-rounded","p-button-success","mr-2",3,"disabled","click"],["pButton","","pRipple","","icon","pi pi-pencil","pTooltip","Konferencia szerkeszt\xe9se","tooltipPosition","top",1,"p-button-rounded","p-button-success","mr-2",3,"disabled","click"],["pButton","","pRipple","","icon","pi pi-trash","pTooltip","Konferencia t\xf6rl\xe9se","tooltipPosition","top",1,"p-button-rounded","p-button-warning",3,"disabled","click"],[1,"text-center"],[1,"font-semibold","text-xl"],[1,"block","p-error"],[1,"flex","justify-content-end","ap-2"],["pButton","","pRipple","","label","M\xe9gsem","icon","pi pi-times",1,"p-button-outlined",3,"disabled","click"],["pButton","","pRipple","","label","Ment\xe9s","icon","pi pi-check",1,"p-button","ml-2",3,"disabled","click"],[1,"w-full","mt-3",3,"formGroupName"],[1,"font-medium","text-900","mb-2",3,"for"],[1,"block","mt-2","p-input-icon-left"],["src","assets/demo/images/flag/flag_placeholder.png",1,"flag","flag-hu",2,"width","18px","margin-top","-8px"],["type","text","pInputText","","formControlName","hu",1,"w-full",3,"id"],["src","assets/demo/images/flag/flag_placeholder.png",1,"flag","flag-gb",2,"width","18px","margin-top","-8px"],["type","text","pInputText","","formControlName","en",1,"w-full",3,"id"],["pButton","","pRipple","","label","Nem","icon","pi pi-times",1,"p-button-outlined",3,"click"],["pButton","","pRipple","","label","Igen","icon","pi pi-check",1,"p-button","ml-2",3,"click"]],template:function(n,t){1&n&&(e.TgZ(0,"div",0)(1,"div",1)(2,"div",2)(3,"p-table",3,4),e.NdJ("selectionChange",function(s){return t.selected=s})("onLazyLoad",function(s){return t.onLazyLoad(s)}),e.YNc(5,P,9,4,"ng-template",5),e.YNc(6,H,32,6,"ng-template",6),e.YNc(7,V,38,21,"ng-template",7),e.YNc(8,X,3,1,"ng-template",8),e.qZA()(),e.TgZ(9,"p-sidebar",9),e.NdJ("visibleChange",function(s){return t.sidebar=s}),e.YNc(10,W,2,0,"ng-template",6),e.TgZ(11,"form",10),e.NdJ("ngSubmit",function(){return t.save()}),e._UZ(12,"input",11),e.TgZ(13,"div",12)(14,"label",13),e._uU(15,"Konferencia neve"),e.qZA(),e._UZ(16,"input",14),e.YNc(17,ee,2,0,"div",15),e.qZA(),e.TgZ(18,"div",12)(19,"label",16),e._uU(20,"Regisztr\xe1ci\xf3s \u0171rlap link"),e.qZA(),e.TgZ(21,"span",17)(22,"i",18),e.NdJ("click",function(){return t.copyUrl(null==t.formUrl?null:t.formUrl.value)}),e.qZA(),e._UZ(23,"input",19),e.qZA(),e.YNc(24,te,2,0,"div",15),e.qZA(),e.TgZ(25,"div",20)(26,"label",21),e._uU(27,"Kezdete"),e.qZA(),e._UZ(28,"p-calendar",22),e.YNc(29,ne,2,0,"div",15),e.qZA(),e.TgZ(30,"div",20)(31,"label",23),e._uU(32,"Els\u0151 \xe9tkez\xe9s"),e.qZA(),e._UZ(33,"app-meal-selector",24),e.YNc(34,re,2,0,"div",15),e.qZA(),e.TgZ(35,"div",20)(36,"label",25),e._uU(37,"V\xe9ge"),e.qZA(),e._UZ(38,"p-calendar",26),e.YNc(39,oe,2,0,"div",15),e.qZA(),e.TgZ(40,"div",20)(41,"label",27),e._uU(42,"Utols\xf3 \xe9tkez\xe9s"),e.qZA(),e._UZ(43,"app-meal-selector",28),e.YNc(44,ie,2,0,"div",15),e.qZA(),e.TgZ(45,"div",20)(46,"label",29),e._uU(47,"Szerz\u0151d\u0151 neve"),e.qZA(),e._UZ(48,"input",30),e.YNc(49,se,2,0,"div",15),e.qZA(),e.TgZ(50,"div",20)(51,"label",31),e._uU(52,"Szerz\u0151d\u0151 ad\xf3sz\xe1ma"),e.qZA(),e._UZ(53,"input",32),e.YNc(54,le,2,0,"div",15),e.qZA(),e.TgZ(55,"div",33)(56,"label",34),e._uU(57,"Szerz\u0151d\u0151 c\xedme"),e.qZA(),e._UZ(58,"input",35),e.YNc(59,ae,2,0,"div",15),e.qZA(),e.TgZ(60,"div",20)(61,"label",36),e._uU(62,"Szervez\u0151"),e.qZA(),e._UZ(63,"app-user-selector",37),e.qZA(),e.TgZ(64,"div",20)(65,"label",38),e._uU(66,"Kapcsolattart\xf3 neve"),e.qZA(),e._UZ(67,"input",39),e.YNc(68,ue,2,0,"div",15),e.qZA(),e.TgZ(69,"div",20)(70,"label",40),e._uU(71,"Kapcsolattart\xf3 telefonsz\xe1ma"),e.qZA(),e._UZ(72,"input",41),e.YNc(73,ce,2,0,"div",15),e.qZA(),e.TgZ(74,"div",20)(75,"label",42),e._uU(76,"Kapcsolattart\xf3 e-mail c\xedme"),e.qZA(),e._UZ(77,"input",43),e.YNc(78,me,2,0,"div",15),e.YNc(79,pe,2,0,"div",15),e.qZA(),e.TgZ(80,"div",20)(81,"label",44),e._uU(82,"Regisztr\xe1ci\xf3 v\xe9ge"),e.qZA(),e._UZ(83,"p-calendar",45),e.YNc(84,de,2,0,"div",15),e.qZA()(),e.YNc(85,ge,3,2,"ng-template",46),e.qZA(),e.TgZ(86,"p-sidebar",47),e.NdJ("visibleChange",function(s){return t.questionsSidebar=s}),e.YNc(87,fe,2,0,"ng-template",6),e.TgZ(88,"p",48),e._uU(89," \u0170rlaponk\xe9nt az alap\xe9rtelmezett mez\u0151k\xf6n fel\xfcl 5 extra k\xe9rd\xe9s tehet\u0151 fel."),e._UZ(90,"br"),e._uU(91," Az \xfcresen hagyott k\xe9rd\xe9sek nem fognak megjelenni az \u0171rlapon. "),e.qZA(),e.TgZ(92,"form",49),e.NdJ("ngSubmit",function(){return t.saveQuestions()}),e._UZ(93,"input",50),e.TgZ(94,"div",51),e.YNc(95,he,11,5,"div",52),e.qZA()(),e.YNc(96,_e,3,2,"ng-template",46),e.qZA(),e.TgZ(97,"p-dialog",53),e.NdJ("visibleChange",function(s){return t.deleteDialog=s}),e.TgZ(98,"div",54),e._UZ(99,"i",55),e.YNc(100,be,5,1,"span",56),e.qZA(),e.YNc(101,Ze,3,0,"ng-template",46),e.qZA(),e.TgZ(102,"p-dialog",53),e.NdJ("visibleChange",function(s){return t.bulkDeleteDialog=s}),e.TgZ(103,"div",54),e._UZ(104,"i",55),e.TgZ(105,"span"),e._uU(106,"Biztosan t\xf6r\xf6lni akarja a kiv\xe1lasztott konferenci\xe1kat?"),e.qZA()(),e.YNc(107,Ce,3,0,"ng-template",46),e.qZA()()(),e.TgZ(108,"p-blockUI",57),e._UZ(109,"p-progressSpinner"),e.qZA(),e._UZ(110,"p-toast")),2&n&&(e.xp6(3),e.Q6J("value",t.tableData)("rows",t.rowsPerPage)("totalRecords",t.totalRecords)("globalFilterFields",e.DdM(48,ve))("paginator",!0)("rowsPerPageOptions",t.rowsPerPageOptions)("showCurrentPageReport",!0)("selection",t.selected)("tableStyle",e.DdM(49,Te))("rowHover",!0)("lazy",!0),e.xp6(6),e.Q6J("visible",t.sidebar),e.xp6(2),e.Q6J("formGroup",t.conferenceForm),e.xp6(6),e.Q6J("ngIf",(null==t.name?null:t.name.dirty)&&(null==t.name||null==t.name.errors?null:t.name.errors.required)),e.xp6(7),e.Q6J("ngIf",(null==t.formUrl?null:t.formUrl.dirty)&&(null==t.formUrl||null==t.formUrl.errors?null:t.formUrl.errors.required)),e.xp6(4),e.Q6J("showButtonBar",!0),e.xp6(1),e.Q6J("ngIf",(null==t.beginDate?null:t.beginDate.dirty)&&(null==t.beginDate||null==t.beginDate.errors?null:t.beginDate.errors.required)),e.xp6(4),e.Q6J("parentForm",t.conferenceForm),e.xp6(1),e.Q6J("ngIf",(null==t.firstMeal?null:t.firstMeal.dirty)&&(null==t.firstMeal||null==t.firstMeal.errors?null:t.firstMeal.errors.required)),e.xp6(4),e.Q6J("showButtonBar",!0),e.xp6(1),e.Q6J("ngIf",(null==t.endDate?null:t.endDate.dirty)&&(null==t.endDate||null==t.endDate.errors?null:t.endDate.errors.required)),e.xp6(4),e.Q6J("parentForm",t.conferenceForm),e.xp6(1),e.Q6J("ngIf",(null==t.lastMeal?null:t.lastMeal.dirty)&&(null==t.lastMeal||null==t.lastMeal.errors?null:t.lastMeal.errors.required)),e.xp6(5),e.Q6J("ngIf",(null==t.contractorName?null:t.contractorName.dirty)&&(null==t.contractorName||null==t.contractorName.errors?null:t.contractorName.errors.required)),e.xp6(5),e.Q6J("ngIf",(null==t.contractorTaxNumber?null:t.contractorTaxNumber.dirty)&&(null==t.contractorTaxNumber||null==t.contractorTaxNumber.errors?null:t.contractorTaxNumber.errors.required)),e.xp6(5),e.Q6J("ngIf",(null==t.contractorAdress?null:t.contractorAdress.dirty)&&(null==t.contractorAdress||null==t.contractorAdress.errors?null:t.contractorAdress.errors.required)),e.xp6(4),e.Q6J("parentForm",t.conferenceForm)("user_rolesid",4),e.xp6(5),e.Q6J("ngIf",(null==t.contactName?null:t.contactName.dirty)&&(null==t.contactName||null==t.contactName.errors?null:t.contactName.errors.required)),e.xp6(5),e.Q6J("ngIf",(null==t.contactPhone?null:t.contactPhone.dirty)&&(null==t.contactPhone||null==t.contactPhone.errors?null:t.contactPhone.errors.required)),e.xp6(5),e.Q6J("ngIf",(null==t.contactEmail?null:t.contactEmail.dirty)&&(null==t.contactEmail||null==t.contactEmail.errors?null:t.contactEmail.errors.required)),e.xp6(1),e.Q6J("ngIf",(null==t.contactEmail?null:t.contactEmail.dirty)&&(null==t.contactEmail||null==t.contactEmail.errors?null:t.contactEmail.errors.invalidEmail)),e.xp6(4),e.Q6J("showButtonBar",!0),e.xp6(1),e.Q6J("ngIf",(null==t.registrationEndDate?null:t.registrationEndDate.dirty)&&(null==t.registrationEndDate||null==t.registrationEndDate.errors?null:t.registrationEndDate.errors.required)),e.xp6(2),e.Q6J("visible",t.questionsSidebar),e.xp6(6),e.Q6J("formGroup",t.questionsForm),e.xp6(3),e.Q6J("ngForOf",t.questions.controls),e.xp6(2),e.Akn(e.DdM(50,L)),e.Q6J("visible",t.deleteDialog)("modal",!0),e.xp6(3),e.Q6J("ngIf",t.tableItem),e.xp6(2),e.Akn(e.DdM(51,L)),e.Q6J("visible",t.bulkDeleteDialog)("modal",!0),e.xp6(6),e.Q6J("autoZIndex",!0)("blocked",t.loading))},dependencies:[p.mk,p.sg,p.O5,m.iA,_.jx,m.lQ,m.fz,m.UA,m.Mo,x.Hq,a._Y,a.Fj,a.JJ,a.JL,a.sg,a.u,a.x0,a.CE,A.H,q.FN,U.o,y.V,N.Y,E.G,k.b,M.u,S.f,R.H,O.T,p.uU]})};b=(0,D.gn)([(0,$.k)()],b);let Fe=(()=>{class o{static#e=this.\u0275fac=function(t){return new(t||o)};static#t=this.\u0275mod=e.oAB({type:o});static#n=this.\u0275inj=e.cJS({imports:[f.Bz.forChild([{path:"",component:b}]),f.Bz]})}return o})();var xe=l(3743),Ae=l(6340),qe=l(6022),Ue=l(6218),ye=l(2352),Ne=l(1865),Ee=l(9653),ke=l(6263),Me=l(5389),Se=l(8057),Le=l(2285);let De=(()=>{class o{static#e=this.\u0275fac=function(t){return new(t||o)};static#t=this.\u0275mod=e.oAB({type:o});static#n=this.\u0275inj=e.cJS({imports:[p.ez,Fe,m.U$,xe.O,a.UX,x.hJ,A.T,q.EV,Ae.V,qe.Xt,U.j,Ue.A,ye.kW,Ne.cc,Ee.L$,y.S,N.l,E.L,k.u,ke.W,Me.dp,M.z,Se.nD,S._8,Le.L]})}return o})()}}]);