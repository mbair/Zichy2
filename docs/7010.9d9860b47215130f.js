"use strict";(self.webpackChunknfc_reserve=self.webpackChunknfc_reserve||[]).push([[7010],{7010:(S,z,s)=>{s.r(z),s.d(z,{FoodVouchersModule:()=>B});var r=s(6814),e=s(6223),_=s(258),y=s(5219),t=s(5879),p=s(981),b=s(9552),c=s(3722),d=s(707),g=s(4480),f=s(4104),m=s(3714);function n(l,x){if(1&l){const o=t.EpF();t.TgZ(0,"div",8)(1,"h5",9),t._uU(2,"\xc9tel Voucher"),t.qZA(),t.TgZ(3,"span",10),t._UZ(4,"i",11),t.TgZ(5,"input",12),t.NdJ("input",function(i){t.CHM(o);const A=t.oxw(),M=t.MAs(5);return t.KtG(A.onGlobalFilter(M,i))}),t.qZA()(),t.TgZ(6,"span",13)(7,"button",14),t.NdJ("click",function(){t.CHM(o);const i=t.oxw();return t.KtG(i.openNew())}),t.qZA(),t.TgZ(8,"button",15),t.NdJ("click",function(){t.CHM(o);const i=t.oxw();return t.KtG(i.deleteSelectedProducts())}),t.qZA(),t._UZ(9,"p-fileUpload",16),t.TgZ(10,"button",17),t.NdJ("click",function(){t.CHM(o),t.oxw();const i=t.MAs(5);return t.KtG(i.exportCSV())}),t.qZA()()()}if(2&l){const o=t.oxw();t.xp6(8),t.Q6J("disabled",!o.selectedProducts||!o.selectedProducts.length),t.xp6(1),t.Q6J("maxFileSize",1e6)}}function T(l,x){1&l&&(t.TgZ(0,"tr")(1,"th",18),t._UZ(2,"p-tableHeaderCheckbox"),t.qZA(),t.TgZ(3,"th",19),t._uU(4,"Szoba sz\xe1m "),t._UZ(5,"p-sortIcon",20),t.qZA(),t.TgZ(6,"th",21),t._uU(7,"Szoba k\xf3d "),t._UZ(8,"p-sortIcon",22),t.qZA(),t.TgZ(9,"th",23),t._uU(10,"\xc1gyak sz\xe1ma "),t._UZ(11,"p-sortIcon",24),t.qZA(),t.TgZ(12,"th",25),t._uU(13,"\xc9p\xfclet / folyos\xf3 "),t._UZ(14,"p-sortIcon",26),t.qZA(),t.TgZ(15,"th",27),t._uU(16,"\xc1gy t\xedpus "),t._UZ(17,"p-sortIcon",28),t.qZA(),t.TgZ(18,"th",29),t._uU(19,"Megjegyz\xe9s "),t._UZ(20,"p-sortIcon",30),t.qZA(),t._UZ(21,"th"),t.qZA())}function u(l,x){if(1&l){const o=t.EpF();t.TgZ(0,"tr")(1,"td"),t._UZ(2,"p-tableCheckbox",31),t.qZA(),t.TgZ(3,"td",32)(4,"span",33),t._uU(5,"Szoba sz\xe1m"),t.qZA(),t._uU(6),t.qZA(),t.TgZ(7,"td",32)(8,"span",33),t._uU(9,"Szoba k\xf3d"),t.qZA(),t._uU(10),t.qZA(),t.TgZ(11,"td",34)(12,"span",33),t._uU(13,"\xc1gyak sz\xe1ma"),t.qZA(),t._uU(14),t.qZA(),t.TgZ(15,"td",32)(16,"span",33),t._uU(17,"\xc9p\xfclet / folyos\xf3"),t.qZA(),t._uU(18),t.qZA(),t.TgZ(19,"td",32)(20,"span",33),t._uU(21,"\xc1gy t\xedpus"),t.qZA(),t._uU(22),t.qZA(),t.TgZ(23,"td",32)(24,"span",33),t._uU(25,"Megjegyz\xe9s"),t.qZA(),t._uU(26),t.qZA(),t.TgZ(27,"td")(28,"div",35)(29,"button",36),t.NdJ("click",function(){t.CHM(o);const i=t.oxw();return t.KtG(i.editProduct(i.product))}),t.qZA(),t.TgZ(30,"button",37),t.NdJ("click",function(){t.CHM(o);const i=t.oxw();return t.KtG(i.deleteProduct(i.product))}),t.qZA()()()()}if(2&l){const o=x.$implicit;t.xp6(2),t.Q6J("value",o),t.xp6(4),t.hij(" ",o.szobaszam," "),t.xp6(4),t.hij(" ",o.szobakod," "),t.xp6(4),t.hij(" ",o.agyakszama," "),t.xp6(4),t.hij(" ",o.epulet," "),t.xp6(4),t.hij(" ",o.agytipus," "),t.xp6(4),t.hij(" ",o.megjegyzes," ")}}const h=function(){return["name","country.name","representative.name","status"]},v=function(){return[10,20,30]};let C=(()=>{class l{constructor(o,a){this.productService=o,this.messageService=a,this.productDialog=!1,this.deleteProductDialog=!1,this.deleteProductsDialog=!1,this.products=[],this.product={},this.FoodVouchers=[],this.foodVoucher=[],this.selectedProducts=[],this.submitted=!1,this.cols=[],this.statuses=[],this.rowsPerPageOptions=[5,10,20]}ngOnInit(){this.productService.getProducts().then(o=>this.products=o),this.cols=[{field:"product",header:"Product"},{field:"price",header:"Price"},{field:"category",header:"Category"},{field:"rating",header:"Reviews"},{field:"inventoryStatus",header:"Status"}],this.statuses=[{label:"FOGLALHATO",value:"FOGLALHATO"},{label:"MAJDNEMTELE",value:"MAJDNEMTELE"},{label:"MEGTELT",value:"MEGTELT"}],this.FoodVouchers=[{id:"1",szobaszam:"101",szobakod:"MD",agyakszama:"2",epulet:"Maranatha fsz",agytipus:"k\xe9t\xe1gyas",megjegyzes:"kapcs.: 102"},{id:"2",szobaszam:"102",szobakod:"MB",agyakszama:"4",epulet:"Maranatha fsz",agytipus:"emeletes \xe1gy",megjegyzes:"kapcs.: 101"},{id:"3",szobaszam:"103",szobakod:"MQ",agyakszama:"2",epulet:"Maranatha fsz",agytipus:"francia\xe1gy",megjegyzes:"kapcs.: 104"},{id:"4",szobaszam:"104",szobakod:"MB",agyakszama:"4",epulet:"Maranatha fsz",agytipus:"emeletes \xe1gy",megjegyzes:"kapcs.: 103"},{id:"5",szobaszam:"105",szobakod:"MD",agyakszama:"2",epulet:"Maranatha fsz",agytipus:"k\xe9t\xe1gyas",megjegyzes:"kapcs.: 106"}]}openNew(){this.product={},this.submitted=!1,this.productDialog=!0}deleteSelectedProducts(){this.deleteProductsDialog=!0}editProduct(o){this.product={...o},this.productDialog=!0}deleteProduct(o){this.deleteProductDialog=!0,this.product={...o}}confirmDeleteSelected(){this.deleteProductsDialog=!1,this.products=this.products.filter(o=>!this.selectedProducts.includes(o)),this.messageService.add({severity:"success",summary:"Successful",detail:"Products Deleted",life:3e3}),this.selectedProducts=[]}confirmDelete(){this.deleteProductDialog=!1,this.products=this.products.filter(o=>o.id!==this.product.id),this.messageService.add({severity:"success",summary:"Successful",detail:"Product Deleted",life:3e3}),this.product={}}hideDialog(){this.productDialog=!1,this.submitted=!1}saveProduct(){this.submitted=!0,this.product.name?.trim()&&(this.product.id?(this.product.inventoryStatus=this.product.inventoryStatus.value?this.product.inventoryStatus.value:this.product.inventoryStatus,this.products[this.findIndexById(this.product.id)]=this.product,this.messageService.add({severity:"success",summary:"Successful",detail:"Product Updated",life:3e3})):(this.product.id=this.createId(),this.product.code=this.createId(),this.product.image="product-placeholder.svg",this.product.inventoryStatus=this.product.inventoryStatus?this.product.inventoryStatus.value:"FOGLALHATO",this.products.push(this.product),this.messageService.add({severity:"success",summary:"Successful",detail:"Product Created",life:3e3})),this.products=[...this.products],this.productDialog=!1,this.product={})}findIndexById(o){let a=-1;for(let i=0;i<this.products.length;i++)if(this.products[i].id===o){a=i;break}return a}createId(){let o="";for(let i=0;i<5;i++)o+="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".charAt(Math.floor(62*Math.random()));return o}onGlobalFilter(o,a){o.filterGlobal(a.target.value,"contains")}static#t=this.\u0275fac=function(a){return new(a||l)(t.Y36(p.M),t.Y36(y.ez))};static#e=this.\u0275cmp=t.Xpm({type:l,selectors:[["ng-component"]],features:[t._Bn([y.ez])],decls:9,vars:11,consts:[[1,"grid"],[1,"col-12"],[1,"card","px-0","py-0"],["responsiveLayout","scroll","currentPageReportTemplate","Showing {first} to {last} of {totalRecords} entries","selectionMode","multiple","dataKey","id",3,"value","columns","rows","globalFilterFields","paginator","rowsPerPageOptions","showCurrentPageReport","selection","rowHover","selectionChange"],["dt",""],["pTemplate","caption"],["pTemplate","header"],["pTemplate","body"],[1,"flex","flex-column","md:flex-row","md:justify-content-between","md:align-items-center"],[1,"m-0"],[1,"block","mt-2","md:mt-0","p-input-icon-left"],[1,"pi","pi-search"],["pInputText","","type","text","placeholder","Keres\xe9s...",1,"w-full","sm:w-auto",3,"input"],[1,"block","mt-2","md:mt-0"],["pButton","","pRipple","","label","\xdaj","icon","pi pi-plus",1,"p-button-success","mr-2",3,"click"],["pButton","","pRipple","","label","T\xf6rl\xe9s","icon","pi pi-trash",1,"p-button-danger","mr-2",3,"disabled","click"],["mode","basic","accept","image/*","label","Import","chooseLabel","Import",1,"mr-2","inline-block",3,"maxFileSize"],["pButton","","pRipple","","label","Export","icon","pi pi-upload",1,"p-button-help",3,"click"],[2,"width","3rem"],["pSortableColumn","szobaszam"],["field","szobaszam"],["pSortableColumn","szobakod"],["field","szobakod"],["pSortableColumn","agyakszama"],["field","agyakszama"],["pSortableColumn","epulet"],["field","epulet"],["pSortableColumn","agytipus"],["field","agytipus"],["pSortableColumn","megjegyzes"],["field","megjegyzes"],[3,"value"],[2,"width","14%","min-width","10rem"],[1,"p-column-title"],[2,"width","14%","min-width","8rem"],[1,"flex"],["pButton","","pRipple","","icon","pi pi-pencil",1,"p-button-rounded","p-button-success","mr-2",3,"click"],["pButton","","pRipple","","icon","pi pi-trash",1,"p-button-rounded","p-button-warning",3,"click"]],template:function(a,i){1&a&&(t.TgZ(0,"div",0)(1,"div",1)(2,"div",2),t._UZ(3,"p-toast"),t.TgZ(4,"p-table",3,4),t.NdJ("selectionChange",function(M){return i.selectedProducts=M}),t.YNc(6,n,11,2,"ng-template",5),t.YNc(7,T,22,0,"ng-template",6),t.YNc(8,u,31,7,"ng-template",7),t.qZA()()()()),2&a&&(t.xp6(4),t.Q6J("value",i.FoodVouchers)("columns",i.cols)("rows",10)("globalFilterFields",t.DdM(9,h))("paginator",!0)("rowsPerPageOptions",t.DdM(10,v))("showCurrentPageReport",!0)("selection",i.selectedProducts)("rowHover",!0))},dependencies:[b.iA,y.jx,b.lQ,b.fz,b.UA,b.Mo,c.p,d.Hq,g.H,f.FN,m.o],encapsulation:2})}return l})(),Z=(()=>{class l{static#t=this.\u0275fac=function(a){return new(a||l)};static#e=this.\u0275mod=t.oAB({type:l});static#o=this.\u0275inj=t.cJS({imports:[_.Bz.forChild([{path:"",component:C}]),_.Bz]})}return l})();var F=s(6340),E=s(6022),P=s(6218),D=s(3965),I=s(1865),U=s(5167),k=s(1312);let B=(()=>{class l{static#t=this.\u0275fac=function(a){return new(a||l)};static#e=this.\u0275mod=t.oAB({type:l});static#o=this.\u0275inj=t.cJS({imports:[r.ez,Z,b.U$,c.O,e.u5,d.hJ,g.T,f.EV,F.V,E.Xt,m.j,P.A,D.kW,I.cc,U.L$,k.S]})}return l})()},6218:(S,z,s)=>{s.d(z,{A:()=>t,g:()=>y});var r=s(5879),e=s(6814),_=s(6223);let y=(()=>{class p{el;ngModel;control;cd;autoResize;onResize=new r.vpe;filled;cachedScrollHeight;ngModelSubscription;ngControlSubscription;constructor(c,d,g,f){this.el=c,this.ngModel=d,this.control=g,this.cd=f}ngOnInit(){this.ngModel&&(this.ngModelSubscription=this.ngModel.valueChanges.subscribe(()=>{this.updateState()})),this.control&&(this.ngControlSubscription=this.control.valueChanges.subscribe(()=>{this.updateState()}))}ngAfterViewInit(){this.autoResize&&this.resize(),this.updateFilledState(),this.cd.detectChanges()}onInput(c){this.updateState()}updateFilledState(){this.filled=this.el.nativeElement.value&&this.el.nativeElement.value.length}onFocus(c){this.autoResize&&this.resize(c)}onBlur(c){this.autoResize&&this.resize(c)}resize(c){this.el.nativeElement.style.height="auto",this.el.nativeElement.style.height=this.el.nativeElement.scrollHeight+"px",parseFloat(this.el.nativeElement.style.height)>=parseFloat(this.el.nativeElement.style.maxHeight)?(this.el.nativeElement.style.overflowY="scroll",this.el.nativeElement.style.height=this.el.nativeElement.style.maxHeight):this.el.nativeElement.style.overflow="hidden",this.onResize.emit(c||{})}updateState(){this.updateFilledState(),this.autoResize&&this.resize()}ngOnDestroy(){this.ngModelSubscription&&this.ngModelSubscription.unsubscribe(),this.ngControlSubscription&&this.ngControlSubscription.unsubscribe()}static \u0275fac=function(d){return new(d||p)(r.Y36(r.SBq),r.Y36(_.On,8),r.Y36(_.a5,8),r.Y36(r.sBO))};static \u0275dir=r.lG2({type:p,selectors:[["","pInputTextarea",""]],hostAttrs:[1,"p-inputtextarea","p-inputtext","p-component","p-element"],hostVars:4,hostBindings:function(d,g){1&d&&r.NdJ("input",function(m){return g.onInput(m)})("focus",function(m){return g.onFocus(m)})("blur",function(m){return g.onBlur(m)}),2&d&&r.ekj("p-filled",g.filled)("p-inputtextarea-resizable",g.autoResize)},inputs:{autoResize:"autoResize"},outputs:{onResize:"onResize"}})}return p})(),t=(()=>{class p{static \u0275fac=function(d){return new(d||p)};static \u0275mod=r.oAB({type:p});static \u0275inj=r.cJS({imports:[e.ez]})}return p})()},6340:(S,z,s)=>{s.d(z,{V:()=>m,o:()=>f});var r=s(6814),e=s(5879),_=s(5219);function y(n,T){1&n&&e.GkF(0)}function t(n,T){if(1&n&&(e.TgZ(0,"div",4),e.YNc(1,y,1,0,"ng-container",5),e.qZA()),2&n){const u=e.oxw();e.xp6(1),e.Q6J("ngTemplateOutlet",u.startTemplate)}}function p(n,T){1&n&&e.GkF(0)}function b(n,T){if(1&n&&(e.TgZ(0,"div",6),e.YNc(1,p,1,0,"ng-container",5),e.qZA()),2&n){const u=e.oxw();e.xp6(1),e.Q6J("ngTemplateOutlet",u.centerTemplate)}}function c(n,T){1&n&&e.GkF(0)}function d(n,T){if(1&n&&(e.TgZ(0,"div",7),e.YNc(1,c,1,0,"ng-container",5),e.qZA()),2&n){const u=e.oxw();e.xp6(1),e.Q6J("ngTemplateOutlet",u.endTemplate)}}const g=["*"];let f=(()=>{class n{el;style;styleClass;templates;startTemplate;endTemplate;centerTemplate;constructor(u){this.el=u}getBlockableElement(){return this.el.nativeElement.children[0]}ngAfterContentInit(){this.templates.forEach(u=>{switch(u.getType()){case"left":this.startTemplate=u.template;break;case"right":this.endTemplate=u.template;break;case"center":this.centerTemplate=u.template}})}static \u0275fac=function(h){return new(h||n)(e.Y36(e.SBq))};static \u0275cmp=e.Xpm({type:n,selectors:[["p-toolbar"]],contentQueries:function(h,v,C){if(1&h&&e.Suo(C,_.jx,4),2&h){let Z;e.iGM(Z=e.CRH())&&(v.templates=Z)}},hostAttrs:[1,"p-element"],inputs:{style:"style",styleClass:"styleClass"},ngContentSelectors:g,decls:5,vars:7,consts:[["role","toolbar",3,"ngClass","ngStyle"],["class","p-toolbar-group-left p-toolbar-group-start",4,"ngIf"],["class","p-toolbar-group-center",4,"ngIf"],["class","p-toolbar-group-right p-toolbar-group-end",4,"ngIf"],[1,"p-toolbar-group-left","p-toolbar-group-start"],[4,"ngTemplateOutlet"],[1,"p-toolbar-group-center"],[1,"p-toolbar-group-right","p-toolbar-group-end"]],template:function(h,v){1&h&&(e.F$t(),e.TgZ(0,"div",0),e.Hsn(1),e.YNc(2,t,2,1,"div",1),e.YNc(3,b,2,1,"div",2),e.YNc(4,d,2,1,"div",3),e.qZA()),2&h&&(e.Tol(v.styleClass),e.Q6J("ngClass","p-toolbar p-component")("ngStyle",v.style),e.xp6(2),e.Q6J("ngIf",v.startTemplate),e.xp6(1),e.Q6J("ngIf",v.centerTemplate),e.xp6(1),e.Q6J("ngIf",v.endTemplate))},dependencies:[r.mk,r.O5,r.tP,r.PC],styles:[".p-toolbar{display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap}.p-toolbar-group-start,.p-toolbar-group-center,.p-toolbar-group-end,.p-toolbar-group-left,.p-toolbar-group-right{display:flex;align-items:center}\n"],encapsulation:2,changeDetection:0})}return n})(),m=(()=>{class n{static \u0275fac=function(h){return new(h||n)};static \u0275mod=e.oAB({type:n});static \u0275inj=e.cJS({imports:[r.ez]})}return n})()}}]);