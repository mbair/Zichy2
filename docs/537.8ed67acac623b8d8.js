"use strict";(self.webpackChunknfc_reserve=self.webpackChunknfc_reserve||[]).push([[537],{537:(A,u,o)=>{o.r(u),o.d(u,{FoodSensitivitiesModule:()=>B});var g=o(6814),f=o(6223),v=o(9739),h=o(5219),t=o(2029),C=o(9862);let b=(()=>{class i{constructor(e){this.http=e}getFoodSensitivities(){return this.http.get("assets/demo/data/foodsensitivities.json").toPromise().then(e=>e.data).then(e=>e)}static#t=this.\u0275fac=function(s){return new(s||i)(t.LFG(C.eN))};static#e=this.\u0275prov=t.Yz7({token:i,factory:i.\u0275fac,providedIn:"root"})}return i})();var c=o(9664),y=o(3743),_=o(707),T=o(4480),n=o(4104),r=o(3714),a=o(6263);function d(i,x){if(1&i){const e=t.EpF();t.TgZ(0,"div",8)(1,"h5",9),t._uU(2,"\xc9trendek"),t.qZA(),t.TgZ(3,"span",10),t._UZ(4,"i",11),t.TgZ(5,"input",12),t.NdJ("input",function(l){t.CHM(e);const m=t.oxw(),p=t.MAs(5);return t.KtG(m.onGlobalFilter(p,l))}),t.qZA()(),t.TgZ(6,"span",13)(7,"button",14),t.NdJ("click",function(){t.CHM(e);const l=t.oxw();return t.KtG(l.openNew())}),t.qZA(),t.TgZ(8,"button",15),t.NdJ("click",function(){t.CHM(e);const l=t.oxw();return t.KtG(l.deleteSelectedFoodsensitivities())}),t.qZA(),t._UZ(9,"p-fileUpload",16),t.TgZ(10,"button",17),t.NdJ("click",function(){t.CHM(e),t.oxw();const l=t.MAs(5);return t.KtG(l.exportCSV())}),t.qZA()()()}if(2&i){const e=t.oxw();t.xp6(8),t.Q6J("disabled",!e.selectedFoodSensitivities||!e.selectedFoodSensitivities.length),t.xp6(1),t.Q6J("maxFileSize",1e6)}}function S(i,x){1&i&&(t.TgZ(0,"tr")(1,"th",18),t._UZ(2,"p-tableHeaderCheckbox"),t.qZA(),t.TgZ(3,"th",19),t._uU(4,"\xc9trend neve "),t._UZ(5,"p-sortIcon",20),t.qZA(),t.TgZ(6,"th",21),t._uU(7,"Karszalag sz\xedn "),t._UZ(8,"p-sortIcon",22),t.qZA(),t.TgZ(9,"th",23),t._uU(10,"Enged\xe9lyezve "),t._UZ(11,"p-sortIcon",24),t.qZA(),t._UZ(12,"th"),t.qZA())}function F(i,x){if(1&i){const e=t.EpF();t.TgZ(0,"tr")(1,"td"),t._UZ(2,"p-tableCheckbox",25),t.qZA(),t.TgZ(3,"td",26)(4,"span",27),t._uU(5,"\xc9rz\xe9kenys\xe9g neve"),t.qZA(),t._uU(6),t.qZA(),t.TgZ(7,"td",28)(8,"span",27),t._uU(9,"Karszalag sz\xedn"),t.qZA(),t.TgZ(10,"span",29),t._uU(11),t.qZA()(),t.TgZ(12,"td",30)(13,"span",27),t._uU(14,"Enged\xe9lyezett"),t.qZA(),t._UZ(15,"p-tag",31),t.qZA(),t.TgZ(16,"td")(17,"div",32)(18,"button",33),t.NdJ("click",function(){const m=t.CHM(e).$implicit,p=t.oxw();return t.KtG(p.editFoodsensitivity(m))}),t.qZA(),t.TgZ(19,"button",34),t.NdJ("click",function(){const m=t.CHM(e).$implicit,p=t.oxw();return t.KtG(p.deleteFoodsensitivity(m))}),t.qZA()()()()}if(2&i){const e=x.$implicit;t.xp6(2),t.Q6J("value",e),t.xp6(4),t.hij(" ",e.name," "),t.xp6(4),t.Q6J("ngClass","bg-"+e.color),t.xp6(1),t.hij(" ",e.color," "),t.xp6(4),t.Q6J("value",1==e.enabled?"Igen":"Nem")("severity",e.enabled)}}const Z=function(){return["name","color"]},E=function(){return[10,20,30]};let D=(()=>{class i{constructor(e,s){this.foodSensitivityService=e,this.messageService=s,this.foodSensitivities=[],this.foodSensitivityDialog=!1,this.deletefoodSensitivityDialog=!1,this.deletefoodSensitivitiesDialog=!1,this.selectedFoodSensitivities=[],this.submitted=!1,this.cols=[],this.rowsPerPageOptions=[5,10,20]}ngOnInit(){this.foodSensitivityService.getFoodSensitivities().then(e=>this.foodSensitivities=e),this.cols=[{field:"name",header:"\xc9trend neve"},{field:"color",header:"Karszalag sz\xedn"},{field:"enabled",header:"Enged\xe9lyezve"}]}openNew(){this.foodSensitivity={},this.submitted=!1,this.foodSensitivityDialog=!0}deleteSelectedFoodsensitivities(){this.deletefoodSensitivitiesDialog=!0}editFoodsensitivity(e){this.foodSensitivityDialog=!0}deleteFoodsensitivity(e){this.deletefoodSensitivityDialog=!0,this.foodSensitivity={...e}}confirmDeleteSelected(){this.deletefoodSensitivityDialog=!1,this.foodSensitivities=this.foodSensitivities.filter(e=>!this.selectedFoodSensitivities.includes(e)),this.messageService.add({severity:"success",summary:"Successful",detail:"Foodsensitivity Deleted",life:3e3}),this.selectedFoodSensitivities=[]}confirmDelete(){this.deletefoodSensitivityDialog=!1,this.foodSensitivities=this.foodSensitivities.filter(e=>e.id!==this.foodSensitivity.id),this.messageService.add({severity:"success",summary:"Successful",detail:"Foodsensitivity Deleted",life:3e3}),this.foodSensitivity={}}hideDialog(){this.foodSensitivityDialog=!1,this.submitted=!1}findIndexById(e){let s=-1;for(let l=0;l<this.foodSensitivities.length;l++)if(this.foodSensitivities[l].id===e){s=l;break}return s}onGlobalFilter(e,s){e.filterGlobal(s.target.value,"contains")}static#t=this.\u0275fac=function(s){return new(s||i)(t.Y36(b),t.Y36(h.ez))};static#e=this.\u0275cmp=t.Xpm({type:i,selectors:[["ng-component"]],features:[t._Bn([h.ez])],decls:9,vars:11,consts:[[1,"grid"],[1,"col-12"],[1,"card","px-0","py-0"],["responsiveLayout","scroll","currentPageReportTemplate","{first} - {last} bejegyz\xe9s a(z) {totalRecords}-b\xf3l megjelen\xedt\xe9se","selectionMode","multiple","dataKey","id",3,"value","columns","rows","globalFilterFields","paginator","rowsPerPageOptions","showCurrentPageReport","selection","rowHover","selectionChange"],["dt",""],["pTemplate","caption"],["pTemplate","header"],["pTemplate","body"],[1,"flex","flex-column","md:flex-row","md:justify-content-between","md:align-items-center"],[1,"m-0"],[1,"block","mt-2","md:mt-0","p-input-icon-left"],[1,"pi","pi-search"],["pInputText","","type","text","placeholder","Keres\xe9s...",1,"w-full","sm:w-auto",3,"input"],[1,"block","mt-2","md:mt-0"],["pButton","","pRipple","","label","\xdaj","icon","pi pi-plus",1,"p-button-success","mr-2",3,"click"],["pButton","","pRipple","","label","T\xf6rl\xe9s","icon","pi pi-trash",1,"p-button-danger","mr-2",3,"disabled","click"],["mode","basic","accept","image/*","label","Import","chooseLabel","Import",1,"mr-2","inline-block",3,"maxFileSize"],["pButton","","pRipple","","label","Export","icon","pi pi-upload",1,"p-button-help",3,"click"],[2,"width","3rem"],["pSortableColumn","name"],["field","name"],["pSortableColumn","color"],["field","color"],["pSortableColumn","enabled"],["field","enabled"],[3,"value"],[2,"width","25%","min-width","20rem"],[1,"p-column-title"],[2,"width","14%","min-width","10rem"],[3,"ngClass"],[1,"text-center",2,"width","14%","min-width","10rem"],[3,"value","severity"],[1,"flex"],["pButton","","pRipple","","icon","pi pi-pencil",1,"p-button-rounded","p-button-success","mr-2",3,"click"],["pButton","","pRipple","","icon","pi pi-trash",1,"p-button-rounded","p-button-warning",3,"click"]],template:function(s,l){1&s&&(t.TgZ(0,"div",0)(1,"div",1)(2,"div",2),t._UZ(3,"p-toast"),t.TgZ(4,"p-table",3,4),t.NdJ("selectionChange",function(p){return l.selectedFoodSensitivities=p}),t.YNc(6,d,11,2,"ng-template",5),t.YNc(7,S,13,0,"ng-template",6),t.YNc(8,F,20,6,"ng-template",7),t.qZA()()()()),2&s&&(t.xp6(4),t.Q6J("value",l.foodSensitivities)("columns",l.cols)("rows",10)("globalFilterFields",t.DdM(9,Z))("paginator",!0)("rowsPerPageOptions",t.DdM(10,E))("showCurrentPageReport",!0)("selection",l.selectedFoodSensitivities)("rowHover",!0))},dependencies:[g.mk,c.iA,h.jx,c.lQ,c.fz,c.UA,c.Mo,y.p,_.Hq,T.H,n.FN,r.o,a.V],encapsulation:2})}return i})(),M=(()=>{class i{static#t=this.\u0275fac=function(s){return new(s||i)};static#e=this.\u0275mod=t.oAB({type:i});static#i=this.\u0275inj=t.cJS({imports:[v.Bz.forChild([{path:"",component:D}]),v.Bz]})}return i})();var I=o(6340),U=o(6022),w=o(6218),z=o(2352),N=o(1865),J=o(9653),j=o(7213);let B=(()=>{class i{static#t=this.\u0275fac=function(s){return new(s||i)};static#e=this.\u0275mod=t.oAB({type:i});static#i=this.\u0275inj=t.cJS({imports:[g.ez,M,c.U$,y.O,f.u5,_.hJ,T.T,n.EV,I.V,U.Xt,r.j,w.A,z.kW,N.cc,J.L$,j.S,a.W]})}return i})()},6340:(A,u,o)=>{o.d(u,{V:()=>T});var g=o(6814),f=o(2029);let T=(()=>{class n{static \u0275fac=function(d){return new(d||n)};static \u0275mod=f.oAB({type:n});static \u0275inj=f.cJS({imports:[g.ez]})}return n})()}}]);