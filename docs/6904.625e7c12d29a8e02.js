"use strict";(self.webpackChunknfc_reserve=self.webpackChunknfc_reserve||[]).push([[6904],{6904:(U,E,s)=>{s.r(E),s.d(E,{LogsModule:()=>Ue});var _=s(6814),t=s(6223),y=s(1640),Z=s(7582),g=s(4279),k=s(5219),h=s(6676),e=s(2029),I=s(3763),D=s(1206),L=s(117),p=s(9664),u=s(707),T=s(4480),d=s(3714),v=s(2352),b=s(7680),w=s(4204),A=s(3212),a=s(2169);function M(i,o){1&i&&e._UZ(0,"i",22)}function r(i,o){1&i&&e._UZ(0,"i",23)}const m=function(){return["200","201"]},x=function(){return["400","500"]};function C(i,o){if(1&i&&(e.TgZ(0,"span",19),e.YNc(1,M,1,0,"i",20),e.YNc(2,r,1,0,"i",21),e._uU(3),e.qZA()),2&i){const n=o.$implicit;e.Q6J("ngClass","http-status-badge status-"+n.code),e.xp6(1),e.Q6J("ngIf",e.DdM(4,m).includes(n.code)),e.xp6(1),e.Q6J("ngIf",e.DdM(5,x).includes(n.code)),e.xp6(1),e.hij(" ",n.name," ")}}function O(i,o){1&i&&e._UZ(0,"i",22)}function P(i,o){1&i&&e._UZ(0,"i",23)}function Q(i,o){if(1&i&&(e.TgZ(0,"span",19),e.YNc(1,O,1,0,"i",20),e.YNc(2,P,1,0,"i",21),e._uU(3),e.qZA()),2&i){const n=e.oxw(2);e.Q6J("ngClass","http-status-badge status-"+n.filterValues.status),e.xp6(1),e.Q6J("ngIf",e.DdM(4,m).includes(n.filterValues.status)),e.xp6(1),e.Q6J("ngIf",e.DdM(5,x).includes(n.filterValues.status)),e.xp6(1),e.hij(" ",n.getStatusByCode(n.filterValues.status)," ")}}function F(i,o){if(1&i){const n=e.EpF();e.TgZ(0,"div",11)(1,"h5",12),e._uU(2,"Logok"),e.qZA(),e.TgZ(3,"p-dropdown",13),e.NdJ("onChange",function(c){e.CHM(n);const f=e.oxw();return e.KtG(f.onFilter(c,"status"))}),e.YNc(4,C,4,6,"ng-template",14),e.YNc(5,Q,4,6,"ng-template",15),e.qZA(),e.TgZ(6,"span",16),e._UZ(7,"i",17),e.TgZ(8,"input",18),e.NdJ("input",function(c){e.CHM(n);const f=e.oxw(),N=e.MAs(4);return e.KtG(f.onGlobalFilter(N,c))}),e.qZA()()()}if(2&i){const n=e.oxw();e.xp6(3),e.Q6J("options",n.statuses)("showClear",!0)}}function B(i,o){if(1&i&&(e.TgZ(0,"span"),e._UZ(1,"i",40),e.TgZ(2,"span",41),e._uU(3),e.qZA()()),2&i){const n=o.$implicit;e.xp6(1),e.Q6J("ngClass",n.icon),e.xp6(2),e.Oqu(n.name)}}function R(i,o){if(1&i&&(e.TgZ(0,"span"),e._UZ(1,"i",40),e.TgZ(2,"span",41),e._uU(3),e.qZA()()),2&i){const n=e.oxw(2);e.xp6(1),e.Q6J("ngClass",n.getModuleByTableName(n.filterValues.table_name).icon),e.xp6(2),e.Oqu(n.getModuleByTableName(n.filterValues.table_name).name)}}function Y(i,o){if(1&i&&(e.TgZ(0,"span",19),e._uU(1),e.qZA()),2&i){const n=o.$implicit;e.Q6J("ngClass","action-type-badge "+n),e.xp6(1),e.hij(" ",n," ")}}function z(i,o){if(1&i&&(e.TgZ(0,"span",19),e._uU(1),e.qZA()),2&i){const n=e.oxw(2);e.Q6J("ngClass","action-type-badge "+n.filterValues.action_type),e.xp6(1),e.hij(" ",n.filterValues.action_type," ")}}const K=function(){return{width:"20%",minWidth:"7rem"}},H=function(){return{minWidth:"5rem"}},j=function(){return{minWidth:"13rem"}};function W(i,o){if(1&i){const n=e.EpF();e.TgZ(0,"tr"),e._UZ(1,"th",24),e.TgZ(2,"th",25),e._uU(3,"R\xf6gz\xedtve "),e._UZ(4,"p-sortIcon",26),e.qZA(),e.TgZ(5,"th",27),e._uU(6,"Modul "),e._UZ(7,"p-sortIcon",28),e.qZA(),e.TgZ(8,"th",29),e._uU(9,"M\u0171velet "),e._UZ(10,"p-sortIcon",30),e.qZA(),e.TgZ(11,"th",31),e._uU(12,"V\xe1lasz "),e._UZ(13,"p-sortIcon",32),e.qZA(),e.TgZ(14,"th",33),e._uU(15,"Felhaszn\xe1l\xf3 "),e._UZ(16,"p-sortIcon",34),e.qZA()(),e.TgZ(17,"tr"),e._UZ(18,"th"),e.TgZ(19,"th")(20,"p-calendar",35),e.NdJ("onSelect",function(c){e.CHM(n);const f=e.oxw();return e.KtG(f.onFilter(c,"createdAt"))})("onClearClick",function(c){e.CHM(n);const f=e.oxw();return e.KtG(f.onFilter(c,"createdAt"))}),e.qZA()(),e.TgZ(21,"th")(22,"p-dropdown",36),e.NdJ("onChange",function(c){e.CHM(n);const f=e.oxw();return e.KtG(f.onFilter(c,"table_name"))}),e.YNc(23,B,4,2,"ng-template",14),e.YNc(24,R,4,2,"ng-template",15),e.qZA()(),e.TgZ(25,"th")(26,"p-dropdown",37),e.NdJ("onChange",function(c){e.CHM(n);const f=e.oxw();return e.KtG(f.onFilter(c,"action_type"))}),e.YNc(27,Y,2,2,"ng-template",14),e.YNc(28,z,2,2,"ng-template",15),e.qZA()(),e.TgZ(29,"th")(30,"input",38),e.NdJ("input",function(c){e.CHM(n);const f=e.oxw();return e.KtG(f.onFilter(c,"response_data"))}),e.qZA()(),e.TgZ(31,"th")(32,"app-user-selector",39),e.NdJ("change",function(c){e.CHM(n);const f=e.oxw();return e.KtG(f.onFilter(c,"userid"))}),e.qZA()()()}if(2&i){const n=e.oxw();e.xp6(20),e.Akn(e.DdM(11,K)),e.Q6J("showButtonBar",!0)("inputStyle",e.DdM(12,H)),e.xp6(2),e.Q6J("options",n.modules)("showClear",!0),e.xp6(4),e.Q6J("options",n.action_types)("showClear",!0),e.xp6(6),e.Akn(e.DdM(13,j)),e.Q6J("showClear",!0)}}function V(i,o){if(1&i&&e._UZ(0,"p-button",54),2&i){const n=e.oxw(),c=n.expanded;e.Q6J("pRowToggler",n.$implicit)("icon",c?"pi pi-chevron-down":"pi pi-chevron-right")}}function $(i,o){1&i&&e._UZ(0,"i",22)}function q(i,o){1&i&&e._UZ(0,"i",23)}function G(i,o){1&i&&e._UZ(0,"i",55)}function X(i,o){1&i&&e._UZ(0,"i",56)}function ee(i,o){1&i&&e._UZ(0,"i",57)}function te(i,o){1&i&&e._UZ(0,"i",56)}function ne(i,o){1&i&&e._UZ(0,"i",58)}function ie(i,o){1&i&&e._UZ(0,"i",59)}function oe(i,o){1&i&&e._UZ(0,"i",60)}function se(i,o){1&i&&e._UZ(0,"i",61)}function ae(i,o){1&i&&e._UZ(0,"i",62)}function le(i,o){1&i&&e._UZ(0,"i",62)}function re(i,o){1&i&&e._UZ(0,"i",63)}const ce=function(){return[200,201]},pe=function(){return[400,500]};function _e(i,o){if(1&i&&(e.TgZ(0,"tr")(1,"td"),e.YNc(2,V,1,2,"p-button",42),e.qZA(),e.TgZ(3,"td")(4,"span",43),e._uU(5,"R\xf6gz\xedtve"),e.qZA(),e._uU(6),e.ALo(7,"date"),e.qZA(),e.TgZ(8,"td")(9,"span",43),e._uU(10,"Modul"),e.qZA(),e._UZ(11,"i",40),e.TgZ(12,"span",41),e._uU(13),e.qZA()(),e.TgZ(14,"td")(15,"span",43),e._uU(16,"M\u0171velet"),e.qZA(),e.TgZ(17,"span",19),e.YNc(18,$,1,0,"i",20),e.YNc(19,q,1,0,"i",21),e.YNc(20,G,1,0,"i",44),e.YNc(21,X,1,0,"i",45),e.YNc(22,ee,1,0,"i",46),e.YNc(23,te,1,0,"i",45),e.YNc(24,ne,1,0,"i",47),e.YNc(25,ie,1,0,"i",48),e.YNc(26,oe,1,0,"i",49),e.YNc(27,se,1,0,"i",50),e.YNc(28,ae,1,0,"i",51),e.YNc(29,le,1,0,"i",51),e.YNc(30,re,1,0,"i",52),e._uU(31),e.qZA()(),e.TgZ(32,"td")(33,"span",43),e._uU(34,"V\xe1lasz"),e.qZA(),e._uU(35),e.qZA(),e.TgZ(36,"td")(37,"span",43),e._uU(38,"Felhaszn\xe1l\xf3"),e.qZA(),e._UZ(39,"p-chip",53),e.qZA()()),2&i){const n=o.$implicit,l=e.oxw();let c,f;e.xp6(2),e.Q6J("ngIf",l.canRowBeExpanded(n)),e.xp6(4),e.hij(" ",e.xi3(7,21,n.createdAt,"yyyy.MM.dd HH:mm:ss")," "),e.xp6(5),e.Q6J("ngClass",null==(c=l.getModuleByTableName(n.table_name))?null:c.icon),e.xp6(2),e.Oqu(null==(f=l.getModuleByTableName(n.table_name))?null:f.name),e.xp6(4),e.Q6J("ngClass","action-type-badge "+(null==n.action_type?null:n.action_type.toLowerCase())),e.xp6(1),e.Q6J("ngIf",e.DdM(24,ce).includes(n.status)),e.xp6(1),e.Q6J("ngIf",e.DdM(25,pe).includes(n.status)),e.xp6(1),e.Q6J("ngIf","scanned code"==n.action_type.toLowerCase()),e.xp6(1),e.Q6J("ngIf","assign tag"==n.action_type.toLowerCase()),e.xp6(1),e.Q6J("ngIf","unassign"==n.action_type.toLowerCase()),e.xp6(1),e.Q6J("ngIf","same code"==n.action_type.toLowerCase()),e.xp6(1),e.Q6J("ngIf","tag duplicate"==n.action_type.toLowerCase()),e.xp6(1),e.Q6J("ngIf","already received food"==n.action_type.toLowerCase()),e.xp6(1),e.Q6J("ngIf","unknown device"==n.action_type.toLowerCase()),e.xp6(1),e.Q6J("ngIf","import"==n.action_type.toLowerCase()),e.xp6(1),e.Q6J("ngIf","login success"==n.action_type.toLowerCase()),e.xp6(1),e.Q6J("ngIf","login failed"==n.action_type.toLowerCase()),e.xp6(1),e.Q6J("ngIf","logout"==n.action_type.toLowerCase()),e.xp6(1),e.hij(" ",n.action_type," "),e.xp6(4),e.hij(" ",n.response_data," "),e.xp6(4),e.Q6J("label",n.user_fullname)}}function ue(i,o){1&i&&(e.TgZ(0,"tr")(1,"th",70),e._uU(2,"Eredeti adat"),e.qZA()())}function ge(i,o){if(1&i&&(e.TgZ(0,"tr")(1,"td",71),e._uU(2),e.qZA(),e.TgZ(3,"td",72),e._uU(4),e.qZA()()),2&i){const n=o.$implicit;e.xp6(2),e.Oqu(n.key),e.xp6(2),e.Oqu(n.value)}}function me(i,o){if(1&i&&(e.TgZ(0,"div",68)(1,"p-table",69),e.YNc(2,ue,3,0,"ng-template",6),e.YNc(3,ge,5,2,"ng-template",7),e.qZA()()),2&i){const n=e.oxw(2).$implicit,l=e.oxw();e.xp6(1),e.Q6J("value",l.transformData(n.original_data))}}function de(i,o){1&i&&(e.TgZ(0,"tr")(1,"th",70),e._uU(2,"M\xf3dos\xedtott adat"),e.qZA()())}function fe(i,o){if(1&i&&(e.TgZ(0,"tr")(1,"td",71),e._uU(2),e.qZA(),e.TgZ(3,"td"),e._uU(4),e.qZA()()),2&i){const n=o.$implicit;e.xp6(2),e.Oqu(n.key),e.xp6(2),e.Oqu(n.value)}}function he(i,o){if(1&i&&(e.TgZ(0,"div",68)(1,"p-table",69),e.YNc(2,de,3,0,"ng-template",6),e.YNc(3,fe,5,2,"ng-template",7),e.qZA()()),2&i){const n=e.oxw(2).$implicit,l=e.oxw();e.xp6(1),e.Q6J("value",l.transformData(n.new_data))}}function ve(i,o){if(1&i&&(e.TgZ(0,"tr")(1,"td",65)(2,"div",66),e.YNc(3,me,4,1,"div",67),e.YNc(4,he,4,1,"div",67),e.qZA()()()),2&i){const n=e.oxw().$implicit;e.xp6(3),e.Q6J("ngIf",n.original_data),e.xp6(1),e.Q6J("ngIf",n.new_data)}}function xe(i,o){1&i&&e.YNc(0,ve,5,2,"tr",64),2&i&&e.Q6J("ngIf","food_counter"!==o.$implicit.table_name)}function Te(i,o){1&i&&(e.TgZ(0,"tr")(1,"td",73),e._uU(2,"Nincs tal\xe1lat..."),e.qZA()()),2&i&&(e.xp6(1),e.uIk("colspan",7))}const Ce=function(){return["action_type","status","table_name","user_fullname"]},ye=function(){return{"min-height":"calc(100vh - 320px)"}};h.locale("hu");let S=class J{constructor(o,n,l,c){this.logService=o,this.userService=n,this.messageService=l,this.fb=c,this.loading=!0,this.tableItem={},this.tableData=[],this.rowsPerPageOptions=[20,50,100],this.rowsPerPage=20,this.totalRecords=0,this.page=0,this.sortField="",this.sortOrder=1,this.globalFilter="",this.filterValues={},this.debounce={},this.dialog=!1,this.deleteDialog=!1,this.bulkDeleteDialog=!1,this.selected=[],this.action_types=[],this.modules=[],this.statuses=[]}ngOnInit(){this.logForm=this.fb.group({id:[""],action_type:[""],fullname:["",t.kI.required],table_name:["",[t.kI.required]],original_data:["",[t.kI.required]],new_data:["",[t.kI.required]],response_data:["",[t.kI.required]],user_fullname:["",[t.kI.required]],user_email:["",[t.kI.required]],status:["",[t.kI.required]],userid:["",[t.kI.required]]}),this.logObs$=this.logService.logObs,this.logObs$.subscribe(o=>{this.loading=!1,o&&(this.tableData=o.rows||[],this.totalRecords=o.totalItems||0,this.page=o.currentPage||0)}),this.modules=[{name:"\xc9telpult",code:"food_counter",icon:"pi pi-tablet"},{name:"Konferencia",code:"conference",icon:"pi pi-calendar"},{name:"Vend\xe9g",code:"guest",icon:"pi pi-user"},{name:"Szoba",code:"room",icon:"pi pi-building"},{name:"NFC c\xedmke",code:"rfid",icon:"pi pi-tags"},{name:"\xc9trend",code:"diet",icon:"pi pi-pencil"},{name:"Felhaszn\xe1l\xf3",code:"users",icon:"pi pi-users"},{name:"Napl\xf3",code:"logs",icon:"pi pi-list"}],this.action_types=["create","update","delete","bulkdelete","scanned code","assign tag","unassign","same code","tag duplicate","already received food","unknown device","import","login success","login failed","logout"],this.statuses=[{name:"200 - OK",code:"200",icon:"pi pi-check"},{name:"201 - Created",code:"201",icon:"pi pi-check"},{name:"400 - Bad request",code:"400",icon:"pi pi-times"},{name:"500 - Internal server Error",code:"500",icon:"pi pi-times"}],this.serviceMessageObs$=this.logService.messageObs,this.serviceMessageObs$.subscribe(o=>{this.loading=!1,"ERROR"==o?this.messageService.add({severity:"error",summary:"Error",detail:"Hiba t\xf6rt\xe9nt!"}):(this.messageService.add(o),this.tableItem={},this.selected=[],this.doQuery())})}doQuery(){this.loading=!0;const n=Object.keys(this.filterValues).map(l=>this.filterValues[l].length>0?`${l}=${this.filterValues[l]}`:"").filter(l=>l.length>0).join("&");return""!==this.globalFilter?this.logService.getBySearch(this.globalFilter,{sortField:this.sortField,sortOrder:this.sortOrder}):this.logService.get(this.page,this.rowsPerPage,{sortField:this.sortField,sortOrder:this.sortOrder},n)}onFilter(o,n){let c="";o instanceof Date?c=h(o).format("YYYY.MM.DD"):o&&(o.value||o.target?.value)&&(c="object"==typeof o.value?o.value.code:o.value||o.target?.value,c=c.toString()),this.filterValues[n]=c,["action_type","status","userid","table_name"].includes(n)?this.filterValues[n]===c&&this.doQuery():(this.debounce[n]&&clearTimeout(this.debounce[n]),this.debounce[n]=setTimeout(()=>{this.filterValues[n]===c&&this.doQuery()},500))}onLazyLoad(o){this.page=o.first/o.rows,this.rowsPerPage=o.rows??this.rowsPerPage,this.sortField=o.sortField??"",this.sortOrder=o.sortOrder??1,this.globalFilter=o.globalFilter??"",this.doQuery()}onGlobalFilter(o,n){o.filterGlobal(n.target.value,"contains")}create(){this.logForm.reset(),this.dialog=!0}edit(o){this.logForm.patchValue(o),this.dialog=!0}delete(){this.loading=!0,this.deleteDialog=!1,this.logService.delete(this.tableItem)}deleteSelected(){this.loading=!0,this.bulkDeleteDialog=!1,this.logService.bulkdelete(this.selected)}save(){if(this.logForm.valid){const o=this.logForm.value;o.id?this.logService.update(o):this.logService.create(o),this.dialog=!1}}cancel(){this.logForm.reset(),this.dialog=!1}getStatusByCode(o){let n=this.statuses.find(l=>l.code===o);return n?n.name:null}getModuleByTableName(o){return this.modules.find(l=>l.code===o)||null}transformData(o){if(o&&this.isValidJSON(o)){const n=JSON.parse(o);return Object.keys(n).map(c=>({key:c,value:n[c]}))}}isValidJSON(o){try{return JSON.parse(o),!0}catch{return!1}}canRowBeExpanded(o){return o.expandable}ngOnDestroy(){}static#e=this.\u0275fac=function(n){return new(n||J)(e.Y36(I.$),e.Y36(D.K),e.Y36(k.ez),e.Y36(t.qu))};static#t=this.\u0275cmp=e.Xpm({type:J,selectors:[["ng-component"]],features:[e._Bn([k.ez])],decls:12,vars:15,consts:[[1,"grid"],[1,"col-12"],[1,"card","px-0","py-0"],["dataKey","id","responsiveLayout","scroll","currentPageReportTemplate","{first} - {last} bejegyz\xe9s a(z) {totalRecords}-b\xf3l megjelen\xedt\xe9se","selectionMode","multiple",3,"value","rows","totalRecords","globalFilterFields","paginator","rowsPerPageOptions","showCurrentPageReport","selection","tableStyle","rowHover","lazy","selectionChange","onLazyLoad"],["dt",""],["pTemplate","caption"],["pTemplate","header"],["pTemplate","body"],["pTemplate","rowexpansion"],["pTemplate","emptymessage"],[3,"autoZIndex","blocked"],[1,"flex","flex-column","md:flex-row","md:justify-content-between","md:align-items-center"],[1,"m-0"],["inputId","statusfilter","optionLabel","name","placeholder","V\xe1lasszon st\xe1tuszt...","emptyMessage","Nincs tal\xe1lat...",3,"options","showClear","onChange"],["pTemplate","item"],["pTemplate","selectedItem"],[1,"block","mt-2","md:mt-0","p-input-icon-left"],[1,"pi","pi-search"],["pInputText","","type","text","placeholder","Keres\xe9s...",1,"w-full","sm:w-auto",3,"input"],[3,"ngClass"],["class","pi pi-check",4,"ngIf"],["class","pi pi-times",4,"ngIf"],[1,"pi","pi-check"],[1,"pi","pi-times"],[2,"width","3rem"],["pSortableColumn","createdAt"],["field","createdAt"],["pSortableColumn","table_name"],["field","table_name"],["pSortableColumn","action_type"],["field","action_type"],["pSortableColumn","response_data"],["field","response_data"],["pSortableColumn","user_fullname"],["field","user_fullname"],["placeholder","Keres\xe9s...","appendTo","body","dataType","string",3,"showButtonBar","inputStyle","onSelect","onClearClick"],["inputId","module_filter","optionLabel","name","placeholder","Keres\xe9s...","emptyMessage","Nincs tal\xe1lat...",3,"options","showClear","onChange"],["inputId","action_type_filter","placeholder","Keres\xe9s...","emptyMessage","Nincs tal\xe1lat...",3,"options","showClear","onChange"],["pInputText","","type","text","placeholder","Keres\xe9s...",2,"min-width","23rem",3,"input"],["placeholder","Keres\xe9s...",3,"showClear","change"],[2,"color","slateblue",3,"ngClass"],[1,"ml-2"],["type","button","styleClass","p-button-rounded p-button-text","pRipple","",3,"pRowToggler","icon",4,"ngIf"],[1,"p-column-title"],["class","pi pi-check-circle",4,"ngIf"],["class","pi pi-plus-circle",4,"ngIf"],["class","pi pi-minus-circle",4,"ngIf"],["class","pi pi-clone",4,"ngIf"],["class","pi pi-times-circle",4,"ngIf"],["class","pi pi-question-circle",4,"ngIf"],["class","pi pi-file-import",4,"ngIf"],["class","pi pi-sign-in",4,"ngIf"],["class","pi pi-sign-out",4,"ngIf"],["icon","pi pi-user","styleClass","m-1",3,"label"],["type","button","styleClass","p-button-rounded p-button-text","pRipple","",3,"pRowToggler","icon"],[1,"pi","pi-check-circle"],[1,"pi","pi-plus-circle"],[1,"pi","pi-minus-circle"],[1,"pi","pi-clone"],[1,"pi","pi-times-circle"],[1,"pi","pi-question-circle"],[1,"pi","pi-file-import"],[1,"pi","pi-sign-in"],[1,"pi","pi-sign-out"],[4,"ngIf"],["colspan","7"],[1,"grid","p-2"],["class","col-6",4,"ngIf"],[1,"col-6"],["responsiveLayout","scroll",3,"value"],["colspan","2"],[1,"font-semibold"],[1,"text-overflow-ellipsis"],[1,"text-center"]],template:function(n,l){1&n&&(e.TgZ(0,"div",0)(1,"div",1)(2,"div",2)(3,"p-table",3,4),e.NdJ("selectionChange",function(f){return l.selected=f})("onLazyLoad",function(f){return l.onLazyLoad(f)}),e.YNc(5,F,9,2,"ng-template",5),e.YNc(6,W,33,14,"ng-template",6),e.YNc(7,_e,40,26,"ng-template",7),e.YNc(8,xe,1,1,"ng-template",8),e.YNc(9,Te,3,1,"ng-template",9),e.qZA()()()(),e.TgZ(10,"p-blockUI",10),e._UZ(11,"p-progressSpinner"),e.qZA()),2&n&&(e.xp6(3),e.Q6J("value",l.tableData)("rows",l.rowsPerPage)("totalRecords",l.totalRecords)("globalFilterFields",e.DdM(13,Ce))("paginator",!0)("rowsPerPageOptions",l.rowsPerPageOptions)("showCurrentPageReport",!0)("selection",l.selected)("tableStyle",e.DdM(14,ye))("rowHover",!0)("lazy",!0),e.xp6(7),e.Q6J("autoZIndex",!0)("blocked",l.loading))},dependencies:[_.mk,_.O5,L.T,p.iA,k.jx,p.lQ,p.jB,p.fz,u.zx,T.H,d.o,v.Lt,b.G,w.b,A.f,a.A,_.uU],encapsulation:2})};S=(0,Z.gn)([(0,g.k)()],S);let be=(()=>{class i{static#e=this.\u0275fac=function(l){return new(l||i)};static#t=this.\u0275mod=e.oAB({type:i});static#n=this.\u0275inj=e.cJS({imports:[y.Bz.forChild([{path:"",component:S}]),y.Bz]})}return i})();var Ie=s(2285),Ee=s(4104),Ze=s(6340),Me=s(6218),ke=s(1865),Le=s(9653),we=s(7213),De=s(6263),Ae=s(9502);let Ue=(()=>{class i{static#e=this.\u0275fac=function(l){return new(l||i)};static#t=this.\u0275mod=e.oAB({type:i});static#n=this.\u0275inj=e.cJS({providers:[I.$],imports:[_.ez,be,Ie.L,p.U$,t.u5,t.UX,u.hJ,T.T,Ee.EV,Ze.V,d.j,Me.A,v.kW,ke.cc,Le.L$,we.S,De.W,Ae.$,b.L,w.u,A._8,a.o]})}return i})()},2285:(U,E,s)=>{s.d(E,{L:()=>h});var _=s(6814),t=s(6223),y=s(2169),Z=s(2352),g=s(9515),k=s(2029);let h=(()=>{class e{static#e=this.\u0275fac=function(L){return new(L||e)};static#t=this.\u0275mod=k.oAB({type:e});static#n=this.\u0275inj=k.cJS({imports:[_.ez,t.u5,t.UX,y.o,Z.kW,g.aw]})}return e})()},4204:(U,E,s)=>{s.d(E,{b:()=>L,u:()=>p});var _=s(6814),t=s(2029),y=s(5219),Z=s(2076),g=s(2332);const k=["mask"];function h(u,T){1&u&&t.GkF(0)}const e=function(u){return{"p-blockui-document":u,"p-blockui p-component-overlay p-component-overlay-enter":!0}},I=function(u){return{display:u}},D=["*"];let L=(()=>{class u{document;el;cd;config;renderer;target;autoZIndex=!0;baseZIndex=0;styleClass;get blocked(){return this._blocked}set blocked(d){this.mask&&this.mask.nativeElement?d?this.block():this.unblock():this._blocked=d}templates;mask;_blocked=!1;animationEndListener;contentTemplate;constructor(d,v,b,w,A){this.document=d,this.el=v,this.cd=b,this.config=w,this.renderer=A}ngAfterViewInit(){if(this.target&&!this.target.getBlockableElement)throw"Target of BlockUI must implement BlockableUI interface"}ngAfterContentInit(){this.templates.forEach(d=>{d.getType(),this.contentTemplate=d.template})}block(){this._blocked=!0,this.target?(this.target.getBlockableElement().appendChild(this.mask.nativeElement),this.target.getBlockableElement().style.position="relative"):this.renderer.appendChild(this.document.body,this.mask.nativeElement),this.autoZIndex&&g.P9.set("modal",this.mask.nativeElement,this.baseZIndex+this.config.zIndex.modal)}unblock(){this.mask&&(this.animationEndListener=this.renderer.listen(this.mask.nativeElement,"animationend",this.destroyModal.bind(this)),Z.p.addClass(this.mask.nativeElement,"p-component-overlay-leave"))}destroyModal(){this._blocked=!1,this.mask&&(Z.p.removeClass(this.mask.nativeElement,"p-component-overlay-leave"),g.P9.clear(this.mask.nativeElement),this.renderer.appendChild(this.el.nativeElement,this.mask.nativeElement)),this.unbindAnimationEndListener(),this.cd.markForCheck()}unbindAnimationEndListener(){this.animationEndListener&&this.mask&&(this.animationEndListener(),this.animationEndListener=null)}ngOnDestroy(){this.unblock(),this.destroyModal()}static \u0275fac=function(v){return new(v||u)(t.Y36(_.K0),t.Y36(t.SBq),t.Y36(t.sBO),t.Y36(y.b4),t.Y36(t.Qsj))};static \u0275cmp=t.Xpm({type:u,selectors:[["p-blockUI"]],contentQueries:function(v,b,w){if(1&v&&t.Suo(w,y.jx,4),2&v){let A;t.iGM(A=t.CRH())&&(b.templates=A)}},viewQuery:function(v,b){if(1&v&&t.Gf(k,5),2&v){let w;t.iGM(w=t.CRH())&&(b.mask=w.first)}},hostAttrs:[1,"p-element"],inputs:{target:"target",autoZIndex:"autoZIndex",baseZIndex:"baseZIndex",styleClass:"styleClass",blocked:"blocked"},ngContentSelectors:D,decls:4,vars:9,consts:[[3,"ngClass","ngStyle"],["mask",""],[4,"ngTemplateOutlet"]],template:function(v,b){1&v&&(t.F$t(),t.TgZ(0,"div",0,1),t.Hsn(2),t.YNc(3,h,1,0,"ng-container",2),t.qZA()),2&v&&(t.Tol(b.styleClass),t.Q6J("ngClass",t.VKq(5,e,!b.target))("ngStyle",t.VKq(7,I,b.blocked?"flex":"none")),t.xp6(3),t.Q6J("ngTemplateOutlet",b.contentTemplate))},dependencies:[_.mk,_.tP,_.PC],styles:[".p-blockui{position:absolute;top:0;left:0;width:100%;height:100%;background-color:transparent;transition-property:background-color;display:flex;align-items:center;justify-content:center}.p-blockui.p-component-overlay{position:absolute}.p-blockui-document.p-component-overlay{position:fixed}.p-blockui-leave.p-component-overlay{background-color:transparent}\n"],encapsulation:2,changeDetection:0})}return u})(),p=(()=>{class u{static \u0275fac=function(v){return new(v||u)};static \u0275mod=t.oAB({type:u});static \u0275inj=t.cJS({imports:[_.ez]})}return u})()},2169:(U,E,s)=>{s.d(E,{A:()=>w,o:()=>A});var _=s(6814),t=s(2029),y=s(5219),Z=s(8468);function g(a,M){if(1&a){const r=t.EpF();t.TgZ(0,"img",6),t.NdJ("error",function(x){t.CHM(r);const C=t.oxw(2);return t.KtG(C.imageError(x))}),t.qZA()}if(2&a){const r=t.oxw(2);t.Q6J("src",r.image,t.LSH)}}function k(a,M){if(1&a&&t._UZ(0,"span",8),2&a){const r=t.oxw(3);t.Tol(r.icon),t.Q6J("ngClass","p-chip-icon")}}function h(a,M){if(1&a&&t.YNc(0,k,1,3,"span",7),2&a){const r=t.oxw(2);t.Q6J("ngIf",r.icon)}}function e(a,M){if(1&a&&(t.TgZ(0,"div",9),t._uU(1),t.qZA()),2&a){const r=t.oxw(2);t.xp6(1),t.Oqu(r.label)}}function I(a,M){if(1&a){const r=t.EpF();t.TgZ(0,"span",13),t.NdJ("click",function(x){t.CHM(r);const C=t.oxw(4);return t.KtG(C.close(x))})("keydown.enter",function(x){t.CHM(r);const C=t.oxw(4);return t.KtG(C.close(x))}),t.qZA()}if(2&a){const r=t.oxw(4);t.Tol(r.removeIcon),t.Q6J("ngClass","pi-chip-remove-icon")}}function D(a,M){if(1&a){const r=t.EpF();t.TgZ(0,"TimesCircleIcon",14),t.NdJ("click",function(x){t.CHM(r);const C=t.oxw(4);return t.KtG(C.close(x))})("keydown.enter",function(x){t.CHM(r);const C=t.oxw(4);return t.KtG(C.close(x))}),t.qZA()}2&a&&(t.Q6J("styleClass","pi-chip-remove-icon"),t.uIk("tabindex",0))}function L(a,M){if(1&a&&(t.ynx(0),t.YNc(1,I,1,3,"span",11),t.YNc(2,D,1,2,"TimesCircleIcon",12),t.BQk()),2&a){const r=t.oxw(3);t.xp6(1),t.Q6J("ngIf",r.removeIcon),t.xp6(1),t.Q6J("ngIf",!r.removeIcon)}}function p(a,M){}function u(a,M){1&a&&t.YNc(0,p,0,0,"ng-template")}function T(a,M){if(1&a){const r=t.EpF();t.TgZ(0,"span",15),t.NdJ("click",function(x){t.CHM(r);const C=t.oxw(3);return t.KtG(C.close(x))})("keydown.enter",function(x){t.CHM(r);const C=t.oxw(3);return t.KtG(C.close(x))}),t.YNc(1,u,1,0,null,16),t.qZA()}if(2&a){const r=t.oxw(3);t.xp6(1),t.Q6J("ngTemplateOutlet",r.removeIconTemplate)}}function d(a,M){if(1&a&&(t.ynx(0),t.YNc(1,L,3,2,"ng-container",5),t.YNc(2,T,2,1,"span",10),t.BQk()),2&a){const r=t.oxw(2);t.xp6(1),t.Q6J("ngIf",!r.removeIconTemplate),t.xp6(1),t.Q6J("ngIf",r.removeIconTemplate)}}function v(a,M){if(1&a&&(t.TgZ(0,"div",1),t.Hsn(1),t.YNc(2,g,1,1,"img",2),t.YNc(3,h,1,1,"ng-template",null,3,t.W1O),t.YNc(5,e,2,1,"div",4),t.YNc(6,d,3,2,"ng-container",5),t.qZA()),2&a){const r=t.MAs(4),m=t.oxw();t.Tol(m.styleClass),t.Q6J("ngClass",m.containerClass())("ngStyle",m.style),t.xp6(2),t.Q6J("ngIf",m.image)("ngIfElse",r),t.xp6(3),t.Q6J("ngIf",m.label),t.xp6(1),t.Q6J("ngIf",m.removable)}}const b=["*"];let w=(()=>{class a{label;icon;image;style;styleClass;removable=!1;removeIcon;onRemove=new t.vpe;onImageError=new t.vpe;visible=!0;removeIconTemplate;templates;ngAfterContentInit(){this.templates.forEach(r=>{r.getType(),this.removeIconTemplate=r.template})}containerClass(){return{"p-chip p-component":!0,"p-chip-image":null!=this.image}}close(r){this.visible=!1,this.onRemove.emit(r)}imageError(r){this.onImageError.emit(r)}static \u0275fac=function(m){return new(m||a)};static \u0275cmp=t.Xpm({type:a,selectors:[["p-chip"]],contentQueries:function(m,x,C){if(1&m&&t.Suo(C,y.jx,4),2&m){let O;t.iGM(O=t.CRH())&&(x.templates=O)}},hostAttrs:[1,"p-element"],inputs:{label:"label",icon:"icon",image:"image",style:"style",styleClass:"styleClass",removable:"removable",removeIcon:"removeIcon"},outputs:{onRemove:"onRemove",onImageError:"onImageError"},ngContentSelectors:b,decls:1,vars:1,consts:[[3,"ngClass","class","ngStyle",4,"ngIf"],[3,"ngClass","ngStyle"],[3,"src","error",4,"ngIf","ngIfElse"],["iconTemplate",""],["class","p-chip-text",4,"ngIf"],[4,"ngIf"],[3,"src","error"],[3,"class","ngClass",4,"ngIf"],[3,"ngClass"],[1,"p-chip-text"],["class","pi-chip-remove-icon",3,"click","keydown.enter",4,"ngIf"],["tabindex","0",3,"class","ngClass","click","keydown.enter",4,"ngIf"],[3,"styleClass","click","keydown.enter",4,"ngIf"],["tabindex","0",3,"ngClass","click","keydown.enter"],[3,"styleClass","click","keydown.enter"],[1,"pi-chip-remove-icon",3,"click","keydown.enter"],[4,"ngTemplateOutlet"]],template:function(m,x){1&m&&(t.F$t(),t.YNc(0,v,7,8,"div",0)),2&m&&t.Q6J("ngIf",x.visible)},dependencies:function(){return[_.mk,_.O5,_.tP,_.PC,Z.x]},styles:[".p-chip{display:inline-flex;align-items:center}.p-chip-text,.p-chip-icon.pi,.pi-chip-remove-icon.pi{line-height:1.5}.pi-chip-remove-icon{cursor:pointer}.p-chip img{border-radius:50%}\n"],encapsulation:2,changeDetection:0})}return a})(),A=(()=>{class a{static \u0275fac=function(m){return new(m||a)};static \u0275mod=t.oAB({type:a});static \u0275inj=t.cJS({imports:[_.ez,Z.x,y.m8,y.m8]})}return a})()},6218:(U,E,s)=>{s.d(E,{A:()=>Z});var _=s(2029),t=s(6814);let Z=(()=>{class g{static \u0275fac=function(e){return new(e||g)};static \u0275mod=_.oAB({type:g});static \u0275inj=_.cJS({imports:[t.ez]})}return g})()},7680:(U,E,s)=>{s.d(E,{G:()=>y,L:()=>Z});var _=s(6814),t=s(2029);let y=(()=>{class g{styleClass;style;strokeWidth="2";fill="none";animationDuration="2s";static \u0275fac=function(e){return new(e||g)};static \u0275cmp=t.Xpm({type:g,selectors:[["p-progressSpinner"]],hostAttrs:[1,"p-element"],inputs:{styleClass:"styleClass",style:"style",strokeWidth:"strokeWidth",fill:"fill",animationDuration:"animationDuration"},decls:3,vars:6,consts:[["role","alert","aria-busy","true",1,"p-progress-spinner",3,"ngStyle","ngClass"],["viewBox","25 25 50 50",1,"p-progress-spinner-svg"],["cx","50","cy","50","r","20","stroke-miterlimit","10",1,"p-progress-spinner-circle"]],template:function(e,I){1&e&&(t.TgZ(0,"div",0),t.O4$(),t.TgZ(1,"svg",1),t._UZ(2,"circle",2),t.qZA()()),2&e&&(t.Q6J("ngStyle",I.style)("ngClass",I.styleClass),t.xp6(1),t.Udp("animation-duration",I.animationDuration),t.xp6(1),t.uIk("fill",I.fill)("stroke-width",I.strokeWidth))},dependencies:[_.mk,_.PC],styles:['.p-progress-spinner{position:relative;margin:0 auto;width:100px;height:100px;display:inline-block}.p-progress-spinner:before{content:"";display:block;padding-top:100%}.p-progress-spinner-svg{animation:p-progress-spinner-rotate 2s linear infinite;height:100%;transform-origin:center center;width:100%;position:absolute;inset:0;margin:auto}.p-progress-spinner-circle{stroke-dasharray:89,200;stroke-dashoffset:0;stroke:#d62d20;animation:p-progress-spinner-dash 1.5s ease-in-out infinite,p-progress-spinner-color 6s ease-in-out infinite;stroke-linecap:round}@keyframes p-progress-spinner-rotate{to{transform:rotate(360deg)}}@keyframes p-progress-spinner-dash{0%{stroke-dasharray:1,200;stroke-dashoffset:0}50%{stroke-dasharray:89,200;stroke-dashoffset:-35px}to{stroke-dasharray:89,200;stroke-dashoffset:-124px}}@keyframes p-progress-spinner-color{to,0%{stroke:#d62d20}40%{stroke:#0057e7}66%{stroke:#008744}80%,90%{stroke:#ffa700}}\n'],encapsulation:2,changeDetection:0})}return g})(),Z=(()=>{class g{static \u0275fac=function(e){return new(e||g)};static \u0275mod=t.oAB({type:g});static \u0275inj=t.cJS({imports:[_.ez]})}return g})()},6340:(U,E,s)=>{s.d(E,{V:()=>L});var _=s(6814),t=s(2029);let L=(()=>{class p{static \u0275fac=function(d){return new(d||p)};static \u0275mod=t.oAB({type:p});static \u0275inj=t.cJS({imports:[_.ez]})}return p})()}}]);