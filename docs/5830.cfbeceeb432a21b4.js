"use strict";(self.webpackChunknfc_reserve=self.webpackChunknfc_reserve||[]).push([[5830],{5830:(D,Z,o)=>{o.r(Z),o.d(Z,{ConferenceListModule:()=>K});var l=o(6814),t=o(258),b=o(5219),e=o(5879),k=o(3981),d=o(8140),y=o(4480),u=o(707),f=o(3714),p=o(9552),v=o(4104),_=o(1312);function a(s,x){if(1&s){const n=e.EpF();e.TgZ(0,"div",13)(1,"h5",14),e._uU(2,"Konferenci\xe1k"),e.qZA(),e.TgZ(3,"span",15),e._UZ(4,"i",16),e.TgZ(5,"input",17),e.NdJ("input",function(i){e.CHM(n);const m=e.oxw(),g=e.MAs(5);return e.KtG(m.onGlobalFilter(g,i))}),e.qZA()(),e.TgZ(6,"span",18)(7,"a",19),e._UZ(8,"i",20),e._uU(9," \xdaj "),e.qZA(),e.TgZ(10,"button",21),e.NdJ("click",function(){e.CHM(n);const i=e.oxw();return e.KtG(i.deleteSelectedKonferencia())}),e.qZA()()()}if(2&s){const n=e.oxw();e.xp6(10),e.Q6J("disabled",!n.selectedKonferencia||!n.selectedKonferencia.length)}}function C(s,x){1&s&&(e.TgZ(0,"tr")(1,"th",22),e._UZ(2,"p-tableHeaderCheckbox"),e.qZA(),e.TgZ(3,"th",23),e._uU(4,"N\xe9v "),e._UZ(5,"p-sortIcon",24),e.qZA(),e.TgZ(6,"th",25),e._uU(7,"\xc1r "),e._UZ(8,"p-sortIcon",26),e.qZA(),e.TgZ(9,"th",27),e._uU(10,"Kezdete "),e._UZ(11,"p-sortIcon",28),e.qZA(),e.TgZ(12,"th",29),e._uU(13,"V\xe9ge "),e._UZ(14,"p-sortIcon",30),e.qZA(),e.TgZ(15,"th",31),e._uU(16,"L\xe9tsz\xe1m "),e._UZ(17,"p-sortIcon",32),e.qZA(),e._UZ(18,"th"),e.qZA())}function c(s,x){if(1&s){const n=e.EpF();e.TgZ(0,"tr")(1,"td"),e._UZ(2,"p-tableCheckbox",33),e.qZA(),e.TgZ(3,"td",34)(4,"span",35),e._uU(5,"Konferencia neve"),e.qZA(),e._uU(6),e.qZA(),e.TgZ(7,"td",36)(8,"span",35),e._uU(9,"\xc1r"),e.qZA(),e._uU(10),e.qZA(),e.TgZ(11,"td",37)(12,"span",35),e._uU(13,"Kezdete"),e.qZA(),e._uU(14),e.qZA(),e.TgZ(15,"td",37)(16,"span",35),e._uU(17,"V\xe9ge"),e.qZA(),e._uU(18),e.qZA(),e.TgZ(19,"td",37)(20,"span",35),e._uU(21,"L\xe9tsz\xe1m"),e.qZA(),e._uU(22),e.qZA(),e.TgZ(23,"td")(24,"div",38)(25,"button",39),e.NdJ("click",function(){const m=e.CHM(n).$implicit,g=e.oxw();return e.KtG(g.navigateToConferenceForm(m))}),e.qZA(),e.TgZ(26,"button",40),e.NdJ("click",function(){const m=e.CHM(n).$implicit,g=e.oxw();return e.KtG(g.editProduct(m))}),e.qZA(),e.TgZ(27,"button",41),e.NdJ("click",function(){const m=e.CHM(n).$implicit,g=e.oxw();return e.KtG(g.deleteProduct(m))}),e.qZA()()()()}if(2&s){const n=x.$implicit;e.xp6(2),e.Q6J("value",n),e.xp6(4),e.hij(" ",n.name," "),e.xp6(4),e.hij(" ",n.price," Ft "),e.xp6(4),e.hij(" ",n.beginDate," "),e.xp6(4),e.hij(" ",n.endDate," "),e.xp6(4),e.hij(" ",n.attendees," ")}}function h(s,x){if(1&s&&(e.TgZ(0,"span"),e._uU(1,"Are you sure you want to delete "),e.TgZ(2,"b"),e._uU(3),e.qZA(),e._uU(4,"?"),e.qZA()),2&s){const n=e.oxw();e.xp6(3),e.Oqu(n.konferencia.name)}}function T(s,x){if(1&s){const n=e.EpF();e.TgZ(0,"button",42),e.NdJ("click",function(){e.CHM(n);const i=e.oxw();return e.KtG(i.deleteProductDialog=!1)}),e.qZA(),e.TgZ(1,"button",43),e.NdJ("click",function(){e.CHM(n);const i=e.oxw();return e.KtG(i.confirmDelete())}),e.qZA()}}function S(s,x){if(1&s){const n=e.EpF();e.TgZ(0,"button",42),e.NdJ("click",function(){e.CHM(n);const i=e.oxw();return e.KtG(i.deleteProductsDialog=!1)}),e.qZA(),e.TgZ(1,"button",43),e.NdJ("click",function(){e.CHM(n);const i=e.oxw();return e.KtG(i.confirmDeleteSelected())}),e.qZA()}}const A=function(){return["name","country.name","representative.name","status"]},E=function(){return[10,20,30]},M=function(){return{width:"450px"}};let P=(()=>{class s{constructor(n,r,i,m){this.konferenciaService=n,this.messageService=r,this.customerService=i,this.router=m,this.customers=[],this.productDialog=!1,this.deleteProductDialog=!1,this.deleteProductsDialog=!1,this.konferenciak=[],this.konferencia={},this.selectedKonferencia=[],this.submitted=!1,this.cols=[],this.statuses=[],this.canBeBooked=[],this.rowsPerPageOptions=[5,10,20]}ngOnInit(){this.customerService.getCustomersLarge().then(n=>this.customers=n),this.konferenciaService.getKonferenciak().then(n=>this.konferenciak=n),this.cols=[{field:"product",header:"Product"},{field:"price",header:"Price"},{field:"category",header:"Category"},{field:"rating",header:"Reviews"},{field:"inventoryStatus",header:"Status"}],this.statuses=[{label:"FOGLALHATO",value:"FOGLALHATO"},{label:"MAJDNEMTELE",value:"MAJDNEMTELE"},{label:"MEGTELT",value:"MEGTELT"}],this.canBeBooked=[{label:"can be booked",value:"can be booked"},{label:"almost full",value:"almost full"},{label:"full",value:"full"}]}onGlobalFilter(n,r){n.filterGlobal(r.target.value,"contains")}navigateToConferenceForm(n){console.log("navigateToConferenceForm",n),this.router.navigateByUrl("/conference-form")}navigateToCreateUser(){this.router.navigate(["conference/create"])}openNew(){this.konferencia={},this.submitted=!1,this.productDialog=!0}deleteSelectedKonferencia(){this.deleteProductsDialog=!0}editProduct(n){this.konferencia={...n},this.productDialog=!0}deleteProduct(n){this.deleteProductDialog=!0,this.konferencia={...n}}confirmDeleteSelected(){this.deleteProductsDialog=!1,this.konferenciak=this.konferenciak.filter(n=>!this.selectedKonferencia.includes(n)),this.messageService.add({severity:"success",summary:"Successful",detail:"Products Deleted",life:3e3}),this.selectedKonferencia=[]}confirmDelete(){this.deleteProductDialog=!1,this.konferenciak=this.konferenciak.filter(n=>n.id!==this.konferencia.id),this.messageService.add({severity:"success",summary:"Successful",detail:"Product Deleted",life:3e3}),this.konferencia={}}hideDialog(){this.productDialog=!1,this.submitted=!1}saveProduct(){this.submitted=!0,this.konferencia.name?.trim()&&(this.konferencia.id?(this.product.inventoryStatus=this.product.inventoryStatus.value?this.konferencia.inventoryStatus.value:this.konferencia.inventoryStatus,this.konferenciak[this.findIndexById(this.konferencia.id)]=this.konferencia,this.messageService.add({severity:"success",summary:"Successful",detail:"Product Updated",life:3e3})):(this.konferencia.id=this.createId(),this.konferencia.code=this.createId(),this.konferencia.image="product-placeholder.svg",this.product.inventoryStatus=this.product.inventoryStatus?this.product.inventoryStatus.value:"FOGLALHATO",this.konferenciak.push(this.konferencia),this.messageService.add({severity:"success",summary:"Successful",detail:"Product Created",life:3e3})),this.konferenciak=[...this.konferenciak],this.productDialog=!1,this.konferencia={})}findIndexById(n){let r=-1;for(let i=0;i<this.konferenciak.length;i++)if(this.konferenciak[i].id===n){r=i;break}return r}createId(){let n="";for(let i=0;i<5;i++)n+="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".charAt(Math.floor(62*Math.random()));return n}static#e=this.\u0275fac=function(r){return new(r||s)(e.Y36(k.g),e.Y36(b.ez),e.Y36(d.v),e.Y36(t.F0))};static#t=this.\u0275cmp=e.Xpm({type:s,selectors:[["ng-component"]],features:[e._Bn([b.ez])],decls:20,vars:22,consts:[[1,"grid"],[1,"col-12"],[1,"card","px-0","py-0"],["responsiveLayout","scroll","currentPageReportTemplate","Showing {first} to {last} of {totalRecords} entries","selectionMode","multiple","dataKey","id",3,"value","columns","rows","globalFilterFields","paginator","rowsPerPageOptions","showCurrentPageReport","selection","rowHover","selectionChange"],["dt",""],["pTemplate","caption"],["pTemplate","header"],["pTemplate","body"],["header","Confirm",3,"visible","modal","visibleChange"],[1,"flex","align-items-center","justify-content-center"],[1,"pi","pi-exclamation-triangle","mr-3",2,"font-size","2rem"],[4,"ngIf"],["pTemplate","footer"],[1,"flex","flex-column","md:flex-row","md:justify-content-between","md:align-items-center"],[1,"m-0"],[1,"block","mt-2","md:mt-0","p-input-icon-left"],[1,"pi","pi-search"],["pInputText","","type","text","placeholder","Keres\xe9s...",1,"w-full","sm:w-auto",3,"input"],[1,"block","mt-2","md:mt-0"],["routerLink","/conference/create",1,"p-button","p-button-success","p-ripple","font-normal","mr-2","hover:bg-green-600","hover:border-green-600"],[1,"pi","pi-plus","x","mr-2"],["pButton","","pRipple","","label","T\xf6rl\xe9s","icon","pi pi-trash",1,"p-button-danger","mr-2",3,"disabled","click"],[2,"width","3rem"],["pSortableColumn","name"],["field","name"],["pSortableColumn","price"],["field","price"],["pSortableColumn","beginDate"],["field","beginDate"],["pSortableColumn","endDate"],["field","endDate"],["pSortableColumn","inventoryStatus"],["field","inventoryStatus"],[3,"value"],[2,"width","24%","min-width","14rem"],[1,"p-column-title"],[2,"width","14%","min-width","8rem"],[2,"width","14%","min-width","10rem"],[1,"flex"],["pButton","","pRipple","","icon","pi pi-search",1,"p-button-rounded","p-button-success","mr-2",3,"click"],["pButton","","pRipple","","icon","pi pi-pencil",1,"p-button-rounded","p-button-success","mr-2",3,"click"],["pButton","","pRipple","","icon","pi pi-trash",1,"p-button-rounded","p-button-warning",3,"click"],["pButton","","pRipple","","icon","pi pi-times","label","No",1,"p-button-text",3,"click"],["pButton","","pRipple","","icon","pi pi-check","label","Yes",1,"p-button-text",3,"click"]],template:function(r,i){1&r&&(e.TgZ(0,"div",0)(1,"div",1)(2,"div",2),e._UZ(3,"p-toast"),e.TgZ(4,"p-table",3,4),e.NdJ("selectionChange",function(g){return i.selectedKonferencia=g}),e.YNc(6,a,11,1,"ng-template",5),e.YNc(7,C,19,0,"ng-template",6),e.YNc(8,c,28,6,"ng-template",7),e.qZA()(),e.TgZ(9,"p-dialog",8),e.NdJ("visibleChange",function(g){return i.deleteProductDialog=g}),e.TgZ(10,"div",9),e._UZ(11,"i",10),e.YNc(12,h,5,1,"span",11),e.qZA(),e.YNc(13,T,2,0,"ng-template",12),e.qZA(),e.TgZ(14,"p-dialog",8),e.NdJ("visibleChange",function(g){return i.deleteProductsDialog=g}),e.TgZ(15,"div",9),e._UZ(16,"i",10),e.TgZ(17,"span"),e._uU(18,"Are you sure you want to delete selected products?"),e.qZA()(),e.YNc(19,S,2,0,"ng-template",12),e.qZA()()()),2&r&&(e.xp6(4),e.Q6J("value",i.konferenciak)("columns",i.cols)("rows",10)("globalFilterFields",e.DdM(18,A))("paginator",!0)("rowsPerPageOptions",e.DdM(19,E))("showCurrentPageReport",!0)("selection",i.selectedKonferencia)("rowHover",!0),e.xp6(5),e.Akn(e.DdM(20,M)),e.Q6J("visible",i.deleteProductDialog)("modal",!0),e.xp6(3),e.Q6J("ngIf",i.konferencia),e.xp6(2),e.Akn(e.DdM(21,M)),e.Q6J("visible",i.deleteProductsDialog)("modal",!0))},dependencies:[l.O5,t.rH,y.H,u.Hq,b.jx,f.o,p.iA,p.lQ,p.fz,p.UA,p.Mo,v.FN,_.V],encapsulation:2})}return s})(),L=(()=>{class s{static#e=this.\u0275fac=function(r){return new(r||s)};static#t=this.\u0275mod=e.oAB({type:s});static#n=this.\u0275inj=e.cJS({imports:[t.Bz.forChild([{path:"",component:P}]),t.Bz]})}return s})();var U=o(3722),I=o(6340),F=o(6022),B=o(6218),w=o(3965),O=o(1865),J=o(5167),z=o(6760),H=o(6651);let K=(()=>{class s{static#e=this.\u0275fac=function(r){return new(r||s)};static#t=this.\u0275mod=e.oAB({type:s});static#n=this.\u0275inj=e.cJS({imports:[l.ez,L,y.T,u.hJ,f.j,p.U$,H.q,U.O,v.EV,I.V,F.Xt,B.A,w.kW,O.cc,J.L$,_.S,z._8]})}return s})()},6218:(D,Z,o)=>{o.d(Z,{A:()=>k,g:()=>e});var l=o(5879),t=o(6814),b=o(6223);let e=(()=>{class d{el;ngModel;control;cd;autoResize;onResize=new l.vpe;filled;cachedScrollHeight;ngModelSubscription;ngControlSubscription;constructor(u,f,p,v){this.el=u,this.ngModel=f,this.control=p,this.cd=v}ngOnInit(){this.ngModel&&(this.ngModelSubscription=this.ngModel.valueChanges.subscribe(()=>{this.updateState()})),this.control&&(this.ngControlSubscription=this.control.valueChanges.subscribe(()=>{this.updateState()}))}ngAfterViewInit(){this.autoResize&&this.resize(),this.updateFilledState(),this.cd.detectChanges()}onInput(u){this.updateState()}updateFilledState(){this.filled=this.el.nativeElement.value&&this.el.nativeElement.value.length}onFocus(u){this.autoResize&&this.resize(u)}onBlur(u){this.autoResize&&this.resize(u)}resize(u){this.el.nativeElement.style.height="auto",this.el.nativeElement.style.height=this.el.nativeElement.scrollHeight+"px",parseFloat(this.el.nativeElement.style.height)>=parseFloat(this.el.nativeElement.style.maxHeight)?(this.el.nativeElement.style.overflowY="scroll",this.el.nativeElement.style.height=this.el.nativeElement.style.maxHeight):this.el.nativeElement.style.overflow="hidden",this.onResize.emit(u||{})}updateState(){this.updateFilledState(),this.autoResize&&this.resize()}ngOnDestroy(){this.ngModelSubscription&&this.ngModelSubscription.unsubscribe(),this.ngControlSubscription&&this.ngControlSubscription.unsubscribe()}static \u0275fac=function(f){return new(f||d)(l.Y36(l.SBq),l.Y36(b.On,8),l.Y36(b.a5,8),l.Y36(l.sBO))};static \u0275dir=l.lG2({type:d,selectors:[["","pInputTextarea",""]],hostAttrs:[1,"p-inputtextarea","p-inputtext","p-component","p-element"],hostVars:4,hostBindings:function(f,p){1&f&&l.NdJ("input",function(_){return p.onInput(_)})("focus",function(_){return p.onFocus(_)})("blur",function(_){return p.onBlur(_)}),2&f&&l.ekj("p-filled",p.filled)("p-inputtextarea-resizable",p.autoResize)},inputs:{autoResize:"autoResize"},outputs:{onResize:"onResize"}})}return d})(),k=(()=>{class d{static \u0275fac=function(f){return new(f||d)};static \u0275mod=l.oAB({type:d});static \u0275inj=l.cJS({imports:[t.ez]})}return d})()},6340:(D,Z,o)=>{o.d(Z,{V:()=>_,o:()=>v});var l=o(6814),t=o(5879),b=o(5219);function e(a,C){1&a&&t.GkF(0)}function k(a,C){if(1&a&&(t.TgZ(0,"div",4),t.YNc(1,e,1,0,"ng-container",5),t.qZA()),2&a){const c=t.oxw();t.xp6(1),t.Q6J("ngTemplateOutlet",c.startTemplate)}}function d(a,C){1&a&&t.GkF(0)}function y(a,C){if(1&a&&(t.TgZ(0,"div",6),t.YNc(1,d,1,0,"ng-container",5),t.qZA()),2&a){const c=t.oxw();t.xp6(1),t.Q6J("ngTemplateOutlet",c.centerTemplate)}}function u(a,C){1&a&&t.GkF(0)}function f(a,C){if(1&a&&(t.TgZ(0,"div",7),t.YNc(1,u,1,0,"ng-container",5),t.qZA()),2&a){const c=t.oxw();t.xp6(1),t.Q6J("ngTemplateOutlet",c.endTemplate)}}const p=["*"];let v=(()=>{class a{el;style;styleClass;templates;startTemplate;endTemplate;centerTemplate;constructor(c){this.el=c}getBlockableElement(){return this.el.nativeElement.children[0]}ngAfterContentInit(){this.templates.forEach(c=>{switch(c.getType()){case"left":this.startTemplate=c.template;break;case"right":this.endTemplate=c.template;break;case"center":this.centerTemplate=c.template}})}static \u0275fac=function(h){return new(h||a)(t.Y36(t.SBq))};static \u0275cmp=t.Xpm({type:a,selectors:[["p-toolbar"]],contentQueries:function(h,T,S){if(1&h&&t.Suo(S,b.jx,4),2&h){let A;t.iGM(A=t.CRH())&&(T.templates=A)}},hostAttrs:[1,"p-element"],inputs:{style:"style",styleClass:"styleClass"},ngContentSelectors:p,decls:5,vars:7,consts:[["role","toolbar",3,"ngClass","ngStyle"],["class","p-toolbar-group-left p-toolbar-group-start",4,"ngIf"],["class","p-toolbar-group-center",4,"ngIf"],["class","p-toolbar-group-right p-toolbar-group-end",4,"ngIf"],[1,"p-toolbar-group-left","p-toolbar-group-start"],[4,"ngTemplateOutlet"],[1,"p-toolbar-group-center"],[1,"p-toolbar-group-right","p-toolbar-group-end"]],template:function(h,T){1&h&&(t.F$t(),t.TgZ(0,"div",0),t.Hsn(1),t.YNc(2,k,2,1,"div",1),t.YNc(3,y,2,1,"div",2),t.YNc(4,f,2,1,"div",3),t.qZA()),2&h&&(t.Tol(T.styleClass),t.Q6J("ngClass","p-toolbar p-component")("ngStyle",T.style),t.xp6(2),t.Q6J("ngIf",T.startTemplate),t.xp6(1),t.Q6J("ngIf",T.centerTemplate),t.xp6(1),t.Q6J("ngIf",T.endTemplate))},dependencies:[l.mk,l.O5,l.tP,l.PC],styles:[".p-toolbar{display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap}.p-toolbar-group-start,.p-toolbar-group-center,.p-toolbar-group-end,.p-toolbar-group-left,.p-toolbar-group-right{display:flex;align-items:center}\n"],encapsulation:2,changeDetection:0})}return a})(),_=(()=>{class a{static \u0275fac=function(h){return new(h||a)};static \u0275mod=t.oAB({type:a});static \u0275inj=t.cJS({imports:[l.ez]})}return a})()}}]);