"use strict";(self.webpackChunknfc_reserve=self.webpackChunknfc_reserve||[]).push([[6929],{6929:(we,v,s)=>{s.r(v),s.d(v,{ConferenceListModule:()=>Ke});var g=s(6814),u=s(6223),d=s(9739),J=s(7582),M=s(8645),f=s(5619),S=s(3620),z=s(3997),K=s(7398),Q=s(4279),$=s(1836),h=s(5219),b=s(6676),e=s(2029),w=s(1206),Y=s(219),B=s(8814);let P=(()=>{class o{constructor(n){this.apiService=n,this.apiURL=n.apiURL,this.data$=new f.X(null),this.message$=new f.X(null)}get questionObs(){return this.data$.asObservable()}get messageObs(){return this.message$.asObservable()}get(n,t,r,l){let a="";""!==r&&(a=""!=r.sortField?`sort=${r.sortField}&order=${1===r.sortOrder?"ASC":"DESC"}`:"");const _=""!==a&&""!==l?a+"&"+l:""!==a&&""===l?a:""===a&&""!==l?l:"";this.apiService.get(`question/get/${n}/${t}${""!==_?"?"+_:""}`).subscribe({next:c=>{this.data$.next(c)},error:c=>{this.message$.next(c)}})}getBySearch(n,t){let r="";""!==t&&(r=""!=t.sortField?`?sort=${t.sortField}&order=${1===t.sortOrder?"ASC":"DESC"}`:""),this.apiService.get(`question/search/${n}${r}`).subscribe({next:l=>{this.data$.next(l)},error:l=>{this.message$.next(l)}})}getBySearchQuery(n){this.apiService.get(`question/searchquery?${n}`).subscribe({next:t=>{this.data$.next(t)},error:t=>{this.message$.next(t)}})}create(n){this.apiService.post("question/create/",n).subscribe({next:t=>{this.message$.next({severity:"success",summary:"Sikeres k\xe9rd\xe9s r\xf6gz\xedt\xe9s",detail:`${n.question} r\xf6gz\xedtve`})},error:t=>{this.message$.next(t)}})}update(n){this.apiService.put(`question/update/${n.id}`,n).subscribe({next:()=>{this.message$.next({severity:"success",summary:"Sikeres k\xe9rd\xe9s m\xf3dos\xedt\xe1s",detail:`${n.question} m\xf3dos\xedtva`})},error:t=>{this.message$.next(t)}})}delete(n){this.apiService.delete(`question/delete/${n.id}`).subscribe({next:t=>{this.message$.next({severity:"success",summary:"Sikeres k\xe9rd\xe9s t\xf6rl\xe9s",detail:`${n.question} t\xf6r\xf6lve`})},error:t=>{this.message$.next(t)}})}bulkdelete(n){let t={ids:n.map(r=>r.id)};this.apiService.post("question/bulkdelete",t).subscribe({next:r=>{this.message$.next({severity:"success",summary:"Sikeres k\xe9rd\xe9s t\xf6rl\xe9s",detail:`${n.length} k\xe9rd\xe9s t\xf6r\xf6lve`})},error:r=>{this.message$.next(r)}})}static#e=this.\u0275fac=function(t){return new(t||o)(e.LFG(B.s))};static#t=this.\u0275prov=e.Yz7({token:o,factory:o.\u0275fac,providedIn:"root"})}return o})();var R=s(3139),p=s(9664),T=s(707),F=s(4480),A=s(4104),U=s(3714),x=s(2352),y=s(7213),N=s(9246),k=s(7680),E=s(4204),I=s(3259),L=s(3212);const m=function(){return["Super Admin","Nagy Admin"]};function G(o,i){if(1&o){const n=e.EpF();e.TgZ(0,"div",70)(1,"h5",71),e._uU(2,"Konferenci\xe1k"),e.qZA(),e.TgZ(3,"span",47),e._UZ(4,"i",72),e.TgZ(5,"input",73),e.NdJ("input",function(r){e.CHM(n);const l=e.oxw(),a=e.MAs(4);return e.KtG(l.onGlobalFilter(a,r))}),e.qZA()(),e.TgZ(6,"span",74)(7,"button",75),e.NdJ("click",function(){e.CHM(n);const r=e.oxw();return e.KtG(r.create())}),e.qZA(),e.TgZ(8,"button",76),e.NdJ("click",function(){e.CHM(n);const r=e.oxw();return e.KtG(r.bulkDeleteDialog=!0)}),e.qZA()()()}if(2&o){const n=e.oxw();e.xp6(7),e.Q6J("disabled",!n.userService.hasRole(e.DdM(2,m))),e.xp6(1),e.Q6J("disabled",!n.selected||!n.selected.length||!n.userService.hasRole(e.DdM(3,m)))}}function H(o,i){if(1&o){const n=e.EpF();e.TgZ(0,"tr"),e._UZ(1,"th"),e.TgZ(2,"th",77),e._uU(3,"N\xe9v "),e._UZ(4,"p-sortIcon",78),e.qZA(),e.TgZ(5,"th",79),e._uU(6,"Kezdete "),e._UZ(7,"p-sortIcon",80),e.qZA(),e.TgZ(8,"th",81),e._uU(9,"Els\u0151 \xe9tkez\xe9s "),e._UZ(10,"p-sortIcon",80),e.qZA(),e.TgZ(11,"th",82),e._uU(12,"V\xe9ge "),e._UZ(13,"p-sortIcon",83),e.qZA(),e.TgZ(14,"th",84),e._uU(15,"Utols\xf3 \xe9tkez\xe9s "),e._UZ(16,"p-sortIcon",83),e.qZA(),e._UZ(17,"th"),e.qZA(),e.TgZ(18,"tr")(19,"th",85),e._UZ(20,"p-tableHeaderCheckbox"),e.qZA(),e.TgZ(21,"th")(22,"input",86),e.NdJ("input",function(r){e.CHM(n);const l=e.oxw();return e.KtG(l.onFilter(r,"name"))}),e.qZA()(),e.TgZ(23,"th")(24,"p-calendar",87),e.NdJ("onSelect",function(r){e.CHM(n);const l=e.oxw();return e.KtG(l.onFilter(r,"beginDate"))})("onClearClick",function(r){e.CHM(n);const l=e.oxw();return e.KtG(l.onFilter(r,"beginDate"))}),e.qZA()(),e.TgZ(25,"th")(26,"p-dropdown",88),e.NdJ("onChange",function(r){e.CHM(n);const l=e.oxw();return e.KtG(l.onFilter(r,"firstMeal"))}),e.qZA()(),e.TgZ(27,"th")(28,"p-calendar",87),e.NdJ("onSelect",function(r){e.CHM(n);const l=e.oxw();return e.KtG(l.onFilter(r,"endDate"))})("onClearClick",function(r){e.CHM(n);const l=e.oxw();return e.KtG(l.onFilter(r,"endDate"))}),e.qZA()(),e.TgZ(29,"th")(30,"p-dropdown",89),e.NdJ("onChange",function(r){e.CHM(n);const l=e.oxw();return e.KtG(l.onFilter(r,"lastMeal"))}),e.qZA()(),e._UZ(31,"th"),e.qZA()}if(2&o){const n=e.oxw();e.xp6(24),e.Q6J("showButtonBar",!0),e.xp6(2),e.Q6J("options",n.meals)("showClear",!0),e.xp6(2),e.Q6J("showButtonBar",!0),e.xp6(2),e.Q6J("options",n.meals)("showClear",!0)}}function O(o,i){if(1&o){const n=e.EpF();e.TgZ(0,"tr")(1,"td"),e._UZ(2,"p-tableCheckbox",90),e.qZA(),e.TgZ(3,"td",91)(4,"span",92),e._uU(5,"N\xe9v"),e.qZA(),e._uU(6),e.qZA(),e.TgZ(7,"td",93)(8,"span",92),e._uU(9,"Kezdete"),e.qZA(),e._uU(10),e.ALo(11,"date"),e.qZA(),e.TgZ(12,"td",93)(13,"span",92),e._uU(14,"Els\u0151 \xe9tkez\xe9s"),e.qZA(),e._uU(15),e.qZA(),e.TgZ(16,"td",93)(17,"span",92),e._uU(18,"V\xe9ge"),e.qZA(),e._uU(19),e.ALo(20,"date"),e.qZA(),e.TgZ(21,"td",93)(22,"span",92),e._uU(23,"Utols\xf3 \xe9tkez\xe9s"),e.qZA(),e._uU(24),e.qZA(),e.TgZ(25,"td")(26,"div",94)(27,"button",95),e.NdJ("click",function(){const l=e.CHM(n).$implicit,a=e.oxw();return e.KtG(a.copyUrl(l.formUrl))}),e.qZA(),e.TgZ(28,"button",96),e.NdJ("click",function(){const l=e.CHM(n).$implicit,a=e.oxw();return e.KtG(a.navigateToConferenceForm(l))}),e.qZA(),e.TgZ(29,"button",97),e.NdJ("click",function(){const l=e.CHM(n).$implicit,a=e.oxw();return e.KtG(a.questions(l))}),e.qZA(),e.TgZ(30,"button",98),e.NdJ("click",function(){const l=e.CHM(n).$implicit,a=e.oxw();return e.KtG(a.edit(l))}),e.qZA(),e.TgZ(31,"button",99),e.NdJ("click",function(){const l=e.CHM(n).$implicit,a=e.oxw();return a.tableItem=l,e.KtG(a.deleteDialog=!0)}),e.qZA()()()()}if(2&o){const n=i.$implicit,t=e.oxw();e.xp6(2),e.Q6J("value",n),e.xp6(4),e.hij(" ",n.name," "),e.xp6(4),e.hij(" ",e.xi3(11,9,n.beginDate,"yyyy.MM.dd")," "),e.xp6(5),e.hij(" ",n.firstMeal," "),e.xp6(4),e.hij(" ",e.xi3(20,12,n.endDate,"yyyy.MM.dd")," "),e.xp6(5),e.hij(" ",n.lastMeal," "),e.xp6(3),e.Q6J("disabled",!n.formUrl),e.xp6(3),e.Q6J("disabled",!t.userService.hasRole(e.DdM(15,m))),e.xp6(1),e.Q6J("disabled",!t.userService.hasRole(e.DdM(16,m)))}}function V(o,i){1&o&&(e.TgZ(0,"tr")(1,"td",100),e._uU(2,"Nincs tal\xe1lat..."),e.qZA()()),2&o&&(e.xp6(1),e.uIk("colspan",7))}function j(o,i){1&o&&(e.TgZ(0,"span",101),e._uU(1,"Konferencia adatai"),e.qZA())}function X(o,i){1&o&&(e.TgZ(0,"div",102),e._uU(1,"K\xf6telez\u0151 kit\xf6lteni"),e.qZA())}function W(o,i){1&o&&(e.TgZ(0,"div",102),e._uU(1,"K\xf6telez\u0151 kit\xf6lteni"),e.qZA())}function ee(o,i){1&o&&(e.TgZ(0,"div",102),e._uU(1,"K\xf6telez\u0151 kit\xf6lteni"),e.qZA())}function te(o,i){1&o&&(e.TgZ(0,"div",102),e._uU(1,"K\xf6telez\u0151 kit\xf6lteni"),e.qZA())}function ne(o,i){1&o&&(e.TgZ(0,"div",102),e._uU(1,"K\xf6telez\u0151 kit\xf6lteni"),e.qZA())}function ie(o,i){1&o&&(e.TgZ(0,"div",102),e._uU(1,"K\xf6telez\u0151 kit\xf6lteni"),e.qZA())}function oe(o,i){1&o&&(e.TgZ(0,"div",102),e._uU(1,"K\xf6telez\u0151 kit\xf6lteni"),e.qZA())}function re(o,i){1&o&&(e.TgZ(0,"div",102),e._uU(1,"K\xf6telez\u0151 kit\xf6lteni"),e.qZA())}function le(o,i){1&o&&(e.TgZ(0,"div",102),e._uU(1,"K\xf6telez\u0151 kit\xf6lteni"),e.qZA())}function se(o,i){1&o&&(e.TgZ(0,"div",102),e._uU(1,"K\xf6telez\u0151 kit\xf6lteni"),e.qZA())}function ue(o,i){1&o&&(e.TgZ(0,"div",102),e._uU(1,"K\xf6telez\u0151 kit\xf6lteni"),e.qZA())}function ae(o,i){1&o&&(e.TgZ(0,"div",102),e._uU(1,"K\xf6telez\u0151 kit\xf6lteni"),e.qZA())}function ce(o,i){1&o&&(e.TgZ(0,"div",102),e._uU(1,"Nem megfelel\u0151 email form\xe1tum"),e.qZA())}function pe(o,i){1&o&&(e.TgZ(0,"div",102),e._uU(1,"K\xf6telez\u0151 kit\xf6lteni"),e.qZA())}function de(o,i){if(1&o){const n=e.EpF();e.TgZ(0,"div",103)(1,"button",104),e.NdJ("click",function(){e.CHM(n);const r=e.oxw();return e.KtG(r.cancel())}),e.qZA(),e.TgZ(2,"button",105),e.NdJ("click",function(){e.CHM(n);const r=e.oxw();return e.KtG(r.save())}),e.qZA()()}if(2&o){const n=e.oxw();e.xp6(1),e.Q6J("disabled",!n.conferenceForm.dirty),e.xp6(1),e.Q6J("disabled",!n.conferenceForm.valid||!n.conferenceForm.dirty)}}function me(o,i){1&o&&(e.TgZ(0,"span",101),e._uU(1,"Szerverz\u0151 k\xe9rd\xe9sei"),e.qZA())}function _e(o,i){1&o&&(e.TgZ(0,"div",102),e._uU(1,"K\xf6telez\u0151 kit\xf6lteni"),e.qZA())}function ge(o,i){1&o&&(e.TgZ(0,"div",102),e._uU(1,"K\xf6telez\u0151 kit\xf6lteni"),e.qZA())}function fe(o,i){1&o&&(e.TgZ(0,"div",102),e._uU(1,"K\xf6telez\u0151 kit\xf6lteni"),e.qZA())}function he(o,i){1&o&&(e.TgZ(0,"div",102),e._uU(1,"K\xf6telez\u0151 kit\xf6lteni"),e.qZA())}function Ze(o,i){1&o&&(e.TgZ(0,"div",102),e._uU(1,"K\xf6telez\u0151 kit\xf6lteni"),e.qZA())}function qe(o,i){1&o&&(e.TgZ(0,"div",102),e._uU(1,"K\xf6telez\u0151 kit\xf6lteni"),e.qZA())}function Ce(o,i){1&o&&(e.TgZ(0,"div",102),e._uU(1,"K\xf6telez\u0151 kit\xf6lteni"),e.qZA())}function ve(o,i){1&o&&(e.TgZ(0,"div",102),e._uU(1,"K\xf6telez\u0151 kit\xf6lteni"),e.qZA())}function be(o,i){1&o&&(e.TgZ(0,"div",102),e._uU(1,"K\xf6telez\u0151 kit\xf6lteni"),e.qZA())}function Te(o,i){if(1&o){const n=e.EpF();e.TgZ(0,"div",103)(1,"button",104),e.NdJ("click",function(){e.CHM(n);const r=e.oxw();return e.KtG(r.cancelQuestions())}),e.qZA(),e.TgZ(2,"button",105),e.NdJ("click",function(){e.CHM(n);const r=e.oxw();return e.KtG(r.saveQuestions())}),e.qZA()()}if(2&o){const n=e.oxw();e.xp6(1),e.Q6J("disabled",!n.questionsForm.dirty),e.xp6(1),e.Q6J("disabled",!n.questionsForm.valid||!n.questionsForm.dirty)}}function Fe(o,i){if(1&o&&(e.TgZ(0,"span"),e._uU(1,"Biztosan t\xf6r\xf6lni akarja a(z) "),e.TgZ(2,"b"),e._uU(3),e.qZA(),e._uU(4," konferenci\xe1t?"),e.qZA()),2&o){const n=e.oxw();e.xp6(3),e.Oqu(n.tableItem.name)}}function Ae(o,i){if(1&o){const n=e.EpF();e.TgZ(0,"div",103)(1,"button",106),e.NdJ("click",function(){e.CHM(n);const r=e.oxw();return e.KtG(r.deleteDialog=!1)}),e.qZA(),e.TgZ(2,"button",107),e.NdJ("click",function(){e.CHM(n);const r=e.oxw();return e.KtG(r.delete())}),e.qZA()()}}function Ue(o,i){if(1&o){const n=e.EpF();e.TgZ(0,"div",103)(1,"button",106),e.NdJ("click",function(){e.CHM(n);const r=e.oxw();return e.KtG(r.bulkDeleteDialog=!1)}),e.qZA(),e.TgZ(2,"button",107),e.NdJ("click",function(){e.CHM(n);const r=e.oxw();return e.KtG(r.deleteSelected())}),e.qZA()()}}const xe=function(){return["name","beginDate","endDate"]},ye=function(){return{"min-height":"calc(100vh - 320px)"}},D=function(){return{width:"450px"}};b.locale("hu");let Z=class C{constructor(i,n,t,r,l,a,_,q){this.userService=i,this.router=n,this.route=t,this.formBuilder=r,this.conferenceService=l,this.questionService=a,this.mealService=_,this.messageService=q,this.loading=!0,this.cols=[],this.tableItem={},this.tableData=[],this.rowsPerPageOptions=[20,50,100],this.rowsPerPage=20,this.totalRecords=0,this.page=0,this.sortField="",this.sortOrder=1,this.globalFilter="",this.filterValues={},this.debounce={},this.sidebar=!1,this.questionsSidebar=!1,this.deleteDialog=!1,this.bulkDeleteDialog=!1,this.selected=[],this.meals=[],this.languages=[],this.formChanges$=new M.x,this.conferenceForm=this.formBuilder.group({id:[""],name:["",u.kI.required],beginDate:["",u.kI.required],endDate:["",u.kI.required],firstMeal:["",u.kI.required],lastMeal:["",u.kI.required],contractorName:["",u.kI.required],contractorAdress:["",u.kI.required],contractorTaxNumber:["",[u.kI.required]],contactName:["",u.kI.required],contactEmail:["",[u.kI.required,(0,$.u)()]],contactPhone:["",u.kI.required],formUrl:["",u.kI.required],registrationEndDate:["",u.kI.required]}),this.isFormValid$=new f.X(!1),this.conferenceForm.get("name")?.valueChanges.subscribe(c=>{const Qe=window.location.origin;let $e=this.slugify(c);this.conferenceForm.patchValue({formUrl:`${Qe}/#/conference-form/${$e}`})}),this.questionsForm=this.formBuilder.group({id:[""],conferenceId:[""],question_1_hu:["",u.kI.required],question_1_en:["",u.kI.required],question_2_hu:["",u.kI.required],question_2_en:["",u.kI.required],question_3_hu:["",u.kI.required],question_3_en:["",u.kI.required],question_4_hu:["",u.kI.required],question_4_en:["",u.kI.required],question_5_hu:["",u.kI.required],question_5_en:["",u.kI.required]})}ngOnInit(){this.conferenceObs$=this.conferenceService.conferenceObs,this.conferenceObs$.subscribe(i=>{this.loading=!1,i&&(this.tableData=i.rows||[],this.totalRecords=i.totalItems||0,this.page=i.currentPage||0)}),this.meals=this.mealService.getMealsForSelector(),this.languages=[{name:"Hungary",huname:"Magyarorsz\xe1g",nationality:"Hungarian",hunationality:"magyar",code:"HU"},{name:"United Kingdom",huname:"Egyes\xfclt Kir\xe1lys\xe1g",nationality:"brit",hunationality:"angol",code:"GB"}],this.isFormValid$=this.formChanges$.pipe((0,S.b)(300),(0,z.x)(),(0,K.U)(()=>this.conferenceForm.valid)),this.conferenceForm.valueChanges.subscribe(()=>this.formChanges$.next()),this.serviceMessageObs$=this.conferenceService.messageObs,this.serviceMessageObs$.subscribe(i=>{this.loading=!1,"ERROR"==i?this.messageService.add({severity:"error",summary:"Error",detail:"Hiba t\xf6rt\xe9nt!"}):(this.messageService.add(i),this.tableItem={},this.selected=[],this.doQuery())})}get name(){return this.conferenceForm.get("name")}get beginDate(){return this.conferenceForm.get("beginDate")}get endDate(){return this.conferenceForm.get("endDate")}get firstMeal(){return this.conferenceForm.get("firstMeal")}get lastMeal(){return this.conferenceForm.get("lastMeal")}get contractorName(){return this.conferenceForm.get("contractorName")}get contractorAdress(){return this.conferenceForm.get("contractorAdress")}get contractorTaxNumber(){return this.conferenceForm.get("contractorTaxNumber")}get contactName(){return this.conferenceForm.get("contactName")}get contactEmail(){return this.conferenceForm.get("contactEmail")}get contactPhone(){return this.conferenceForm.get("contactPhone")}get formUrl(){return this.conferenceForm.get("formUrl")}get registrationEndDate(){return this.conferenceForm.get("registrationEndDate")}get question_1_hu(){return this.questionsForm.get("question")}get question_1_en(){return this.questionsForm.get("question")}get question_2_hu(){return this.questionsForm.get("question")}get question_2_en(){return this.questionsForm.get("question")}get question_3_hu(){return this.questionsForm.get("question")}get question_3_en(){return this.questionsForm.get("question")}get question_4_hu(){return this.questionsForm.get("question")}get question_4_en(){return this.questionsForm.get("question")}get question_5_hu(){return this.questionsForm.get("question")}get question_5_en(){return this.questionsForm.get("question")}doQuery(){this.loading=!0;const n=Object.keys(this.filterValues).map(t=>this.filterValues[t].length>0?`${t}=${this.filterValues[t]}`:"").filter(t=>t.length>0).join("&");return""!==this.globalFilter?this.conferenceService.getBySearch(this.globalFilter,{sortField:this.sortField,sortOrder:this.sortOrder}):this.conferenceService.get(this.page,this.rowsPerPage,{sortField:this.sortField,sortOrder:this.sortOrder},n)}onFilter(i,n){let r="";i instanceof Date?r=b(i).format("YYYY.MM.DD"):i&&(i.value||i.target?.value)?r="rfid"==n&&10==i.target?.value.length?i.target?.value.replaceAll("\xf6","0"):i.value||i.target?.value:this.filterValues[n]="",this.filterValues[n]=r,["beginDate","endDate","firstMeal","lastMeal"].includes(n)?this.filterValues[n]===r&&this.doQuery():(this.debounce[n]&&clearTimeout(this.debounce[n]),this.debounce[n]=setTimeout(()=>{this.filterValues[n]===r&&this.doQuery()},500))}onLazyLoad(i){this.page=i.first/i.rows,this.rowsPerPage=i.rows??this.rowsPerPage,this.sortField=i.sortField??"",this.sortOrder=i.sortOrder??1,this.globalFilter=i.globalFilter??"",this.doQuery()}onGlobalFilter(i,n){i.filterGlobal(n.target.value,"contains")}setFormUrl(){let i=this.tableItem.name||"";i=this.slugify(i),this.tableItem.formUrl=`/conference-form/${i}`}navigateToConferenceForm(i){const n=this.slugify(i.name);this.router.navigate(["/conference-form",n])}navigateToCreateConference(){this.router.navigate(["conference/create"])}create(){this.conferenceForm.reset(),this.sidebar=!0}edit(i){this.conferenceForm.patchValue(i),this.originalFormValues=this.conferenceForm.value,this.sidebar=!0}delete(){this.loading=!0,this.deleteDialog=!1,this.conferenceService.delete(this.tableItem)}deleteSelected(){this.loading=!0,this.deleteDialog=!1,this.conferenceService.bulkdelete(this.selected)}save(){if(this.conferenceForm.valid){this.loading=!0;const i=this.conferenceForm.value;i.id?this.conferenceService.update(i):this.conferenceService.create(i),this.sidebar=!1}}cancel(){this.conferenceForm.reset(this.originalFormValues)}questions(i){this.questionsForm.patchValue(i),this.originalQuestionsFormValues=this.questionsForm.value,this.questionsSidebar=!0}saveQuestions(){this.questionsForm.valid&&(this.loading=!0,this.questionsSidebar=!1)}cancelQuestions(){this.questionsForm.reset(this.originalQuestionsFormValues)}slugify(i){return i?i=(i=(i=i.trim()).toLowerCase()).replace(/[^a-z0-9 -]/g,"").replace(/\s+/g,"-").replace(/-+/g,"-"):""}copyUrl(i){navigator.clipboard.writeText(i),this.messageService.add({severity:"success",summary:"Regisztr\xe1ci\xf3s link v\xe1g\xf3lapra m\xe1solva",detail:i})}ngOnDestroy(){}static#e=this.\u0275fac=function(n){return new(n||C)(e.Y36(w.K),e.Y36(d.F0),e.Y36(d.gz),e.Y36(u.qu),e.Y36(Y.Z),e.Y36(P),e.Y36(R.Q),e.Y36(h.ez))};static#t=this.\u0275cmp=e.Xpm({type:C,selectors:[["conferencelist"]],features:[e._Bn([h.ez])],decls:166,vars:58,consts:[[1,"grid"],[1,"col-12"],[1,"card","px-0","py-0"],["dataKey","id","responsiveLayout","scroll","currentPageReportTemplate","{first} - {last} bejegyz\xe9s a(z) {totalRecords}-b\xf3l megjelen\xedt\xe9se","selectionMode","multiple",3,"value","rows","totalRecords","globalFilterFields","paginator","rowsPerPageOptions","showCurrentPageReport","selection","tableStyle","rowHover","lazy","selectionChange","onLazyLoad"],["dt",""],["pTemplate","caption"],["pTemplate","header"],["pTemplate","body"],["pTemplate","emptymessage"],["id","sidebar","position","right","styleClass","p-sidebar-md",3,"visible","visibleChange"],["novalidate","",1,"grid","formgrid","p-fluid",3,"formGroup","ngSubmit"],["formControlName","id","type","hidden"],[1,"field","mb-4","col-12"],["for","name",1,"font-medium","text-900"],["id","name","type","text","pInputText","","formControlName","name"],["class","block p-error",4,"ngIf"],["for","formUrl",1,"font-medium","text-900"],[1,"block","mt-2","md:mt-0","p-input-icon-right"],[1,"pi","pi-copy","hover:cursor-pointer","hover:text-blue-500",3,"click"],["id","formUrl","type","text","pInputText","","formControlName","formUrl","readonly",""],[1,"field","mb-4","col-12","lg:col-6"],["for","beginDate",1,"font-medium","text-900"],["formControlName","beginDate","appendTo","body","dataType","string","dateFormat","yy-mm-dd",3,"showButtonBar"],["for","firstMeal",1,"font-medium","text-900"],["id","firstMealFilter","formControlName","firstMeal","placeholder","V\xe1lassz...",3,"options"],["for","endDate",1,"font-medium","text-900"],["formControlName","endDate","appendTo","body","dataType","string","dateFormat","yy-mm-dd",3,"showButtonBar"],["for","lastMeal",1,"font-medium","text-900"],["id","lastMealFilter","formControlName","lastMeal","placeholder","V\xe1lassz...",3,"options"],["for","contractorName",1,"font-medium","text-900"],["id","contractorName","type","text","pInputText","","formControlName","contractorName"],["for","contractorTaxNumber",1,"font-medium","text-900"],["id","contractorTaxNumber","type","text","pInputText","","formControlName","contractorTaxNumber"],["for","contractorAdress",1,"font-medium","text-900"],["id","contractorAdress","type","text","pInputText","","formControlName","contractorAdress"],["for","contactName",1,"font-medium","text-900"],["id","contactName","type","text","pInputText","","formControlName","contactName"],["for","contactPhone",1,"font-medium","text-900"],["id","contactPhone","type","text","pInputText","","formControlName","contactPhone"],["for","contactEmail",1,"font-medium","text-900"],["id","contactEmail","type","text","pInputText","","formControlName","contactEmail"],["for","registrationEndDate",1,"font-medium","text-900"],["formControlName","registrationEndDate","appendTo","body","dataType","string","dateFormat","yy-mm-dd",3,"showButtonBar"],["pTemplate","footer"],["id","questionsSidebar","position","right","styleClass","p-sidebar-md",3,"visible","visibleChange"],["formControlName","conferenceId","type","hidden"],["for","question_1_hu",1,"font-medium","text-900"],[1,"block","mt-2","md:mt-0","p-input-icon-left"],["src","assets/demo/images/flag/flag_placeholder.png",1,"flag","flag-hu",2,"width","18px","margin-top","-8px"],["id","question_1_hu","type","text","pInputText","","formControlName","question_1_hu"],[1,"block","mt-2","p-input-icon-left"],["src","assets/demo/images/flag/flag_placeholder.png",1,"flag","flag-gb",2,"width","18px","margin-top","-8px"],["id","question_1_en","type","text","pInputText","","formControlName","question_1_en"],["for","question_2_hu",1,"font-medium","text-900"],["id","question_2_hu","type","text","pInputText","","formControlName","question_2_hu"],["id","question_2_en","type","text","pInputText","","formControlName","question_2_en"],["for","question_3_hu",1,"font-medium","text-900"],["id","question_3_hu","type","text","pInputText","","formControlName","question_3_hu"],["id","question_3_en","type","text","pInputText","","formControlName","question_3_en"],["for","question_4_hu",1,"font-medium","text-900"],["id","question_4_hu","type","text","pInputText","","formControlName","question_4_hu"],["id","question_4_en","type","text","pInputText","","formControlName","question_4_en"],["for","question_5_hu",1,"font-medium","text-900"],["id","question_5_hu","type","text","pInputText","","formControlName","question_5_hu"],["id","question_5_en","type","text","pInputText","","formControlName","question_5_en"],["header","T\xf6rl\xe9s",3,"visible","modal","visibleChange"],[1,"flex","align-items-center","justify-content-center"],[1,"pi","pi-exclamation-triangle","mr-3",2,"font-size","2rem"],[4,"ngIf"],[3,"autoZIndex","blocked"],[1,"flex","flex-column","md:flex-row","md:justify-content-between","md:align-items-center"],[1,"m-0"],[1,"pi","pi-search"],["pInputText","","type","text","placeholder","Keres\xe9s...",1,"w-full","sm:w-auto",3,"input"],[1,"block","mt-2","md:mt-0"],["pButton","","pRipple","","label","\xdaj","icon","pi pi-plus",1,"p-button-success","mr-2",3,"disabled","click"],["pButton","","pRipple","","label","T\xf6rl\xe9s","icon","pi pi-trash",1,"p-button-danger","mr-2",3,"disabled","click"],["pSortableColumn","name"],["field","name"],["pSortableColumn","beginDate"],["field","beginDate"],["pSortableColumn","firstMeal"],["pSortableColumn","endDate"],["field","endDate"],["pSortableColumn","lastMeal"],[2,"width","3rem"],["pInputText","","type","text","placeholder","Keres\xe9s...",2,"width","40%","min-width","22rem",3,"input"],["appendTo","body","dataType","string","placeholder","Keres\xe9s...",3,"showButtonBar","onSelect","onClearClick"],["inputId","firstMealFilter","placeholder","Keres\xe9s...",3,"options","showClear","onChange"],["inputId","lastMealFilter","placeholder","Keres\xe9s...",3,"options","showClear","onChange"],[3,"value"],[2,"width","30%","min-width","15rem"],[1,"p-column-title"],[2,"width","14%","min-width","10rem"],[1,"flex"],["pButton","","pRipple","","icon","pi pi-copy","pTooltip","Regisztr\xe1ci\xf3s link m\xe1sol\xe1sa v\xe1g\xf3lapra","tooltipPosition","top",1,"p-button-rounded","p-button-success","mr-2",3,"disabled","click"],["pButton","","pRipple","","icon","pi pi-search","pTooltip","Regisztr\xe1ci\xf3s \u0171rlap megnyit\xe1sa","tooltipPosition","top",1,"p-button-rounded","p-button-success","mr-2",3,"click"],["pButton","","pRipple","","icon","pi pi-question","pTooltip","Extra k\xe9rd\xe9sek be\xe1ll\xedt\xe1sa","tooltipPosition","top",1,"p-button-rounded","p-button-success","mr-2",3,"click"],["pButton","","pRipple","","icon","pi pi-pencil","pTooltip","Konferencia szerkeszt\xe9se","tooltipPosition","top",1,"p-button-rounded","p-button-success","mr-2",3,"disabled","click"],["pButton","","pRipple","","icon","pi pi-trash","pTooltip","Konferencia t\xf6rl\xe9se","tooltipPosition","top",1,"p-button-rounded","p-button-warning",3,"disabled","click"],[1,"text-center"],[1,"font-semibold","text-xl"],[1,"block","p-error"],[1,"flex","justify-content-end","ap-2"],["pButton","","pRipple","","label","M\xe9gsem","icon","pi pi-times",1,"p-button-outlined",3,"disabled","click"],["pButton","","pRipple","","label","Ment\xe9s","icon","pi pi-check",1,"p-button","ml-2",3,"disabled","click"],["pButton","","pRipple","","label","Nem","icon","pi pi-times",1,"p-button-outlined",3,"click"],["pButton","","pRipple","","label","Igen","icon","pi pi-check",1,"p-button","ml-2",3,"click"]],template:function(n,t){1&n&&(e.TgZ(0,"div",0)(1,"div",1)(2,"div",2)(3,"p-table",3,4),e.NdJ("selectionChange",function(l){return t.selected=l})("onLazyLoad",function(l){return t.onLazyLoad(l)}),e.YNc(5,G,9,4,"ng-template",5),e.YNc(6,H,32,6,"ng-template",6),e.YNc(7,O,32,17,"ng-template",7),e.YNc(8,V,3,1,"ng-template",8),e.qZA()(),e.TgZ(9,"p-sidebar",9),e.NdJ("visibleChange",function(l){return t.sidebar=l}),e.YNc(10,j,2,0,"ng-template",6),e.TgZ(11,"form",10),e.NdJ("ngSubmit",function(){return t.save()}),e._UZ(12,"input",11),e.TgZ(13,"div",12)(14,"label",13),e._uU(15,"Konferencia neve"),e.qZA(),e._UZ(16,"input",14),e.YNc(17,X,2,0,"div",15),e.qZA(),e.TgZ(18,"div",12)(19,"label",16),e._uU(20,"Regisztr\xe1ci\xf3s \u0171rlap link"),e.qZA(),e.TgZ(21,"span",17)(22,"i",18),e.NdJ("click",function(){return t.copyUrl(null==t.formUrl?null:t.formUrl.value)}),e.qZA(),e._UZ(23,"input",19),e.qZA(),e.YNc(24,W,2,0,"div",15),e.qZA(),e.TgZ(25,"div",20)(26,"label",21),e._uU(27,"Kezdete"),e.qZA(),e._UZ(28,"p-calendar",22),e.YNc(29,ee,2,0,"div",15),e.qZA(),e.TgZ(30,"div",20)(31,"label",23),e._uU(32,"Els\u0151 \xe9tkez\xe9s"),e.qZA(),e._UZ(33,"p-dropdown",24),e.YNc(34,te,2,0,"div",15),e.qZA(),e.TgZ(35,"div",20)(36,"label",25),e._uU(37,"V\xe9ge"),e.qZA(),e._UZ(38,"p-calendar",26),e.YNc(39,ne,2,0,"div",15),e.qZA(),e.TgZ(40,"div",20)(41,"label",27),e._uU(42,"Utols\xf3 \xe9tkez\xe9s"),e.qZA(),e._UZ(43,"p-dropdown",28),e.YNc(44,ie,2,0,"div",15),e.qZA(),e.TgZ(45,"div",20)(46,"label",29),e._uU(47,"Szerz\u0151d\u0151 neve"),e.qZA(),e._UZ(48,"input",30),e.YNc(49,oe,2,0,"div",15),e.qZA(),e.TgZ(50,"div",20)(51,"label",31),e._uU(52,"Szerz\u0151d\u0151 ad\xf3sz\xe1ma"),e.qZA(),e._UZ(53,"input",32),e.YNc(54,re,2,0,"div",15),e.qZA(),e.TgZ(55,"div",12)(56,"label",33),e._uU(57,"Szerz\u0151d\u0151 c\xedme"),e.qZA(),e._UZ(58,"input",34),e.YNc(59,le,2,0,"div",15),e.qZA(),e.TgZ(60,"div",20)(61,"label",35),e._uU(62,"Kapcsolattart\xf3 neve"),e.qZA(),e._UZ(63,"input",36),e.YNc(64,se,2,0,"div",15),e.qZA(),e.TgZ(65,"div",20)(66,"label",37),e._uU(67,"Kapcsolattart\xf3 telefonsz\xe1ma"),e.qZA(),e._UZ(68,"input",38),e.YNc(69,ue,2,0,"div",15),e.qZA(),e.TgZ(70,"div",20)(71,"label",39),e._uU(72,"Kapcsolattart\xf3 e-mail c\xedme"),e.qZA(),e._UZ(73,"input",40),e.YNc(74,ae,2,0,"div",15),e.YNc(75,ce,2,0,"div",15),e.qZA(),e.TgZ(76,"div",20)(77,"label",41),e._uU(78,"Regisztr\xe1ci\xf3 v\xe9ge"),e.qZA(),e._UZ(79,"p-calendar",42),e.YNc(80,pe,2,0,"div",15),e.qZA()(),e.YNc(81,de,3,2,"ng-template",43),e.qZA(),e.TgZ(82,"p-sidebar",44),e.NdJ("visibleChange",function(l){return t.questionsSidebar=l}),e.YNc(83,me,2,0,"ng-template",6),e.TgZ(84,"form",10),e.NdJ("ngSubmit",function(){return t.saveQuestions()}),e._UZ(85,"input",11)(86,"input",45),e.TgZ(87,"div",12)(88,"label",46),e._uU(89,"1. k\xe9rd\xe9s"),e.qZA(),e.TgZ(90,"div",47)(91,"i"),e._UZ(92,"img",48),e.qZA(),e._UZ(93,"input",49),e.qZA(),e.YNc(94,_e,2,0,"div",15),e.TgZ(95,"div",50)(96,"i"),e._UZ(97,"img",51),e.qZA(),e._UZ(98,"input",52),e.qZA(),e.YNc(99,ge,2,0,"div",15),e.qZA(),e.TgZ(100,"div",12)(101,"label",53),e._uU(102,"2. k\xe9rd\xe9s"),e.qZA(),e.TgZ(103,"div",47)(104,"i"),e._UZ(105,"img",48),e.qZA(),e._UZ(106,"input",54),e.qZA(),e.YNc(107,fe,2,0,"div",15),e.TgZ(108,"div",50)(109,"i"),e._UZ(110,"img",51),e.qZA(),e._UZ(111,"input",55),e.qZA(),e.YNc(112,he,2,0,"div",15),e.qZA(),e.TgZ(113,"div",12)(114,"label",56),e._uU(115,"3. k\xe9rd\xe9s"),e.qZA(),e.TgZ(116,"div",47)(117,"i"),e._UZ(118,"img",48),e.qZA(),e._UZ(119,"input",57),e.qZA(),e.YNc(120,Ze,2,0,"div",15),e.TgZ(121,"div",50)(122,"i"),e._UZ(123,"img",51),e.qZA(),e._UZ(124,"input",58),e.qZA(),e.YNc(125,qe,2,0,"div",15),e.qZA(),e.TgZ(126,"div",12)(127,"label",59),e._uU(128,"4. k\xe9rd\xe9s"),e.qZA(),e.TgZ(129,"div",47)(130,"i"),e._UZ(131,"img",48),e.qZA(),e._UZ(132,"input",60),e.qZA(),e.YNc(133,Ce,2,0,"div",15),e.TgZ(134,"div",50)(135,"i"),e._UZ(136,"img",51),e.qZA(),e._UZ(137,"input",61),e.qZA(),e.YNc(138,ve,2,0,"div",15),e.qZA(),e.TgZ(139,"div",12)(140,"label",62),e._uU(141,"5. k\xe9rd\xe9s"),e.qZA(),e.TgZ(142,"div",47)(143,"i"),e._UZ(144,"img",48),e.qZA(),e._UZ(145,"input",63),e.qZA(),e.TgZ(146,"div",50)(147,"i"),e._UZ(148,"img",51),e.qZA(),e._UZ(149,"input",64),e.qZA(),e.YNc(150,be,2,0,"div",15),e.qZA()(),e.YNc(151,Te,3,2,"ng-template",43),e.qZA(),e.TgZ(152,"p-dialog",65),e.NdJ("visibleChange",function(l){return t.deleteDialog=l}),e.TgZ(153,"div",66),e._UZ(154,"i",67),e.YNc(155,Fe,5,1,"span",68),e.qZA(),e.YNc(156,Ae,3,0,"ng-template",43),e.qZA(),e.TgZ(157,"p-dialog",65),e.NdJ("visibleChange",function(l){return t.bulkDeleteDialog=l}),e.TgZ(158,"div",66),e._UZ(159,"i",67),e.TgZ(160,"span"),e._uU(161,"Biztosan t\xf6r\xf6lni akarja a kiv\xe1lasztott konferenci\xe1kat?"),e.qZA()(),e.YNc(162,Ue,3,0,"ng-template",43),e.qZA()()(),e.TgZ(163,"p-blockUI",69),e._UZ(164,"p-progressSpinner"),e.qZA(),e._UZ(165,"p-toast")),2&n&&(e.xp6(3),e.Q6J("value",t.tableData)("rows",t.rowsPerPage)("totalRecords",t.totalRecords)("globalFilterFields",e.DdM(54,xe))("paginator",!0)("rowsPerPageOptions",t.rowsPerPageOptions)("showCurrentPageReport",!0)("selection",t.selected)("tableStyle",e.DdM(55,ye))("rowHover",!0)("lazy",!0),e.xp6(6),e.Q6J("visible",t.sidebar),e.xp6(2),e.Q6J("formGroup",t.conferenceForm),e.xp6(6),e.Q6J("ngIf",(null==t.name?null:t.name.dirty)&&(null==t.name||null==t.name.errors?null:t.name.errors.required)),e.xp6(7),e.Q6J("ngIf",(null==t.formUrl?null:t.formUrl.dirty)&&(null==t.formUrl||null==t.formUrl.errors?null:t.formUrl.errors.required)),e.xp6(4),e.Q6J("showButtonBar",!0),e.xp6(1),e.Q6J("ngIf",(null==t.beginDate?null:t.beginDate.dirty)&&(null==t.beginDate||null==t.beginDate.errors?null:t.beginDate.errors.required)),e.xp6(4),e.Q6J("options",t.meals),e.xp6(1),e.Q6J("ngIf",(null==t.firstMeal?null:t.firstMeal.dirty)&&(null==t.firstMeal||null==t.firstMeal.errors?null:t.firstMeal.errors.required)),e.xp6(4),e.Q6J("showButtonBar",!0),e.xp6(1),e.Q6J("ngIf",(null==t.endDate?null:t.endDate.dirty)&&(null==t.endDate||null==t.endDate.errors?null:t.endDate.errors.required)),e.xp6(4),e.Q6J("options",t.meals),e.xp6(1),e.Q6J("ngIf",(null==t.lastMeal?null:t.lastMeal.dirty)&&(null==t.lastMeal||null==t.lastMeal.errors?null:t.lastMeal.errors.required)),e.xp6(5),e.Q6J("ngIf",(null==t.contractorName?null:t.contractorName.dirty)&&(null==t.contractorName||null==t.contractorName.errors?null:t.contractorName.errors.required)),e.xp6(5),e.Q6J("ngIf",(null==t.contractorTaxNumber?null:t.contractorTaxNumber.dirty)&&(null==t.contractorTaxNumber||null==t.contractorTaxNumber.errors?null:t.contractorTaxNumber.errors.required)),e.xp6(5),e.Q6J("ngIf",(null==t.contractorAdress?null:t.contractorAdress.dirty)&&(null==t.contractorAdress||null==t.contractorAdress.errors?null:t.contractorAdress.errors.required)),e.xp6(5),e.Q6J("ngIf",(null==t.contactName?null:t.contactName.dirty)&&(null==t.contactName||null==t.contactName.errors?null:t.contactName.errors.required)),e.xp6(5),e.Q6J("ngIf",(null==t.contactPhone?null:t.contactPhone.dirty)&&(null==t.contactPhone||null==t.contactPhone.errors?null:t.contactPhone.errors.required)),e.xp6(5),e.Q6J("ngIf",(null==t.contactEmail?null:t.contactEmail.dirty)&&(null==t.contactEmail||null==t.contactEmail.errors?null:t.contactEmail.errors.required)),e.xp6(1),e.Q6J("ngIf",(null==t.contactEmail?null:t.contactEmail.dirty)&&(null==t.contactEmail||null==t.contactEmail.errors?null:t.contactEmail.errors.invalidEmail)),e.xp6(4),e.Q6J("showButtonBar",!0),e.xp6(1),e.Q6J("ngIf",(null==t.registrationEndDate?null:t.registrationEndDate.dirty)&&(null==t.registrationEndDate||null==t.registrationEndDate.errors?null:t.registrationEndDate.errors.required)),e.xp6(2),e.Q6J("visible",t.questionsSidebar),e.xp6(2),e.Q6J("formGroup",t.questionsForm),e.xp6(10),e.Q6J("ngIf",(null==t.question_1_hu?null:t.question_1_hu.dirty)&&(null==t.question_1_hu||null==t.question_1_hu.errors?null:t.question_1_hu.errors.required)),e.xp6(5),e.Q6J("ngIf",(null==t.question_1_en?null:t.question_1_en.dirty)&&(null==t.question_1_en||null==t.question_1_en.errors?null:t.question_1_en.errors.required)),e.xp6(8),e.Q6J("ngIf",(null==t.question_2_hu?null:t.question_2_hu.dirty)&&(null==t.question_2_hu||null==t.question_2_hu.errors?null:t.question_2_hu.errors.required)),e.xp6(5),e.Q6J("ngIf",(null==t.question_2_en?null:t.question_2_en.dirty)&&(null==t.question_2_en||null==t.question_2_en.errors?null:t.question_2_en.errors.required)),e.xp6(8),e.Q6J("ngIf",(null==t.question_3_hu?null:t.question_3_hu.dirty)&&(null==t.question_3_hu||null==t.question_3_hu.errors?null:t.question_3_hu.errors.required)),e.xp6(5),e.Q6J("ngIf",(null==t.question_3_en?null:t.question_3_en.dirty)&&(null==t.question_3_en||null==t.question_3_en.errors?null:t.question_3_en.errors.required)),e.xp6(8),e.Q6J("ngIf",(null==t.question_4_hu?null:t.question_4_hu.dirty)&&(null==t.question_4_hu||null==t.question_4_hu.errors?null:t.question_4_hu.errors.required)),e.xp6(5),e.Q6J("ngIf",(null==t.question_4_en?null:t.question_4_en.dirty)&&(null==t.question_4_en||null==t.question_4_en.errors?null:t.question_4_en.errors.required)),e.xp6(12),e.Q6J("ngIf",(null==t.question_5_hu?null:t.question_5_hu.dirty)&&(null==t.question_5_hu||null==t.question_5_hu.errors?null:t.question_5_hu.errors.required)),e.xp6(2),e.Akn(e.DdM(56,D)),e.Q6J("visible",t.deleteDialog)("modal",!0),e.xp6(3),e.Q6J("ngIf",t.tableItem),e.xp6(2),e.Akn(e.DdM(57,D)),e.Q6J("visible",t.bulkDeleteDialog)("modal",!0),e.xp6(6),e.Q6J("autoZIndex",!0)("blocked",t.loading))},dependencies:[g.O5,p.iA,h.jx,p.lQ,p.fz,p.UA,p.Mo,T.Hq,u._Y,u.Fj,u.JJ,u.JL,u.sg,u.u,F.H,A.FN,U.o,x.Lt,y.V,N.Y,k.G,E.b,I.u,L.f,g.uU]})};Z=(0,J.gn)([(0,Q.k)()],Z);let Ne=(()=>{class o{static#e=this.\u0275fac=function(t){return new(t||o)};static#t=this.\u0275mod=e.oAB({type:o});static#n=this.\u0275inj=e.cJS({imports:[d.Bz.forChild([{path:"",component:Z}]),d.Bz]})}return o})();var ke=s(3743),Ee=s(6340),Ie=s(6022),Le=s(6218),De=s(1865),Je=s(9653),Me=s(6263),Se=s(5389),ze=s(8057);let Ke=(()=>{class o{static#e=this.\u0275fac=function(t){return new(t||o)};static#t=this.\u0275mod=e.oAB({type:o});static#n=this.\u0275inj=e.cJS({imports:[g.ez,Ne,p.U$,ke.O,u.UX,T.hJ,F.T,A.EV,Ee.V,Ie.Xt,U.j,Le.A,x.kW,De.cc,Je.L$,y.S,N.l,k.L,E.u,Me.W,Se.dp,I.z,ze.nD,L._8]})}return o})()}}]);