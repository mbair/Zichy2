"use strict";(self.webpackChunknfc_reserve=self.webpackChunknfc_reserve||[]).push([[7010],{7010:(V,c,a)=>{a.r(c),a.d(c,{FoodVouchersModule:()=>E});var Z=a(6814),b=a(6223),d=a(9739),r=a(5219),t=a(2029),n=a(9664),p=a(2610),m=a(707),h=a(4480),g=a(4104),f=a(3714);function z(s,u){if(1&s){const e=t.EpF();t.TgZ(0,"div",8)(1,"h5",9),t._uU(2,"\xc9tel Voucher"),t.qZA(),t.TgZ(3,"span",10),t._UZ(4,"i",11),t.TgZ(5,"input",12),t.NdJ("input",function(o){t.CHM(e);const y=t.oxw(),l=t.MAs(5);return t.KtG(y.onGlobalFilter(l,o))}),t.qZA()(),t.TgZ(6,"span",13)(7,"button",14),t.NdJ("click",function(){t.CHM(e);const o=t.oxw();return t.KtG(o.openNew())}),t.qZA(),t.TgZ(8,"button",15),t.NdJ("click",function(){t.CHM(e);const o=t.oxw();return t.KtG(o.deleteSelectedProducts())}),t.qZA(),t._UZ(9,"p-fileUpload",16),t.TgZ(10,"button",17),t.NdJ("click",function(){t.CHM(e),t.oxw();const o=t.MAs(5);return t.KtG(o.exportCSV())}),t.qZA()()()}if(2&s){const e=t.oxw();t.xp6(8),t.Q6J("disabled",!e.selectedProducts||!e.selectedProducts.length),t.xp6(1),t.Q6J("maxFileSize",1e6)}}function v(s,u){1&s&&(t.TgZ(0,"tr")(1,"th",18),t._UZ(2,"p-tableHeaderCheckbox"),t.qZA(),t.TgZ(3,"th",19),t._uU(4,"Szoba sz\xe1m "),t._UZ(5,"p-sortIcon",20),t.qZA(),t.TgZ(6,"th",21),t._uU(7,"Szoba k\xf3d "),t._UZ(8,"p-sortIcon",22),t.qZA(),t.TgZ(9,"th",23),t._uU(10,"\xc1gyak sz\xe1ma "),t._UZ(11,"p-sortIcon",24),t.qZA(),t.TgZ(12,"th",25),t._uU(13,"\xc9p\xfclet / folyos\xf3 "),t._UZ(14,"p-sortIcon",26),t.qZA(),t.TgZ(15,"th",27),t._uU(16,"\xc1gy t\xedpus "),t._UZ(17,"p-sortIcon",28),t.qZA(),t.TgZ(18,"th",29),t._uU(19,"Megjegyz\xe9s "),t._UZ(20,"p-sortIcon",30),t.qZA(),t._UZ(21,"th"),t.qZA())}function T(s,u){if(1&s){const e=t.EpF();t.TgZ(0,"tr")(1,"td"),t._UZ(2,"p-tableCheckbox",31),t.qZA(),t.TgZ(3,"td",32)(4,"span",33),t._uU(5,"Szoba sz\xe1m"),t.qZA(),t._uU(6),t.qZA(),t.TgZ(7,"td",32)(8,"span",33),t._uU(9,"Szoba k\xf3d"),t.qZA(),t._uU(10),t.qZA(),t.TgZ(11,"td",34)(12,"span",33),t._uU(13,"\xc1gyak sz\xe1ma"),t.qZA(),t._uU(14),t.qZA(),t.TgZ(15,"td",32)(16,"span",33),t._uU(17,"\xc9p\xfclet / folyos\xf3"),t.qZA(),t._uU(18),t.qZA(),t.TgZ(19,"td",32)(20,"span",33),t._uU(21,"\xc1gy t\xedpus"),t.qZA(),t._uU(22),t.qZA(),t.TgZ(23,"td",32)(24,"span",33),t._uU(25,"Megjegyz\xe9s"),t.qZA(),t._uU(26),t.qZA(),t.TgZ(27,"td")(28,"div",35)(29,"button",36),t.NdJ("click",function(){t.CHM(e);const o=t.oxw();return t.KtG(o.editProduct(o.product))}),t.qZA(),t.TgZ(30,"button",37),t.NdJ("click",function(){t.CHM(e);const o=t.oxw();return t.KtG(o.deleteProduct(o.product))}),t.qZA()()()()}if(2&s){const e=u.$implicit;t.xp6(2),t.Q6J("value",e),t.xp6(4),t.hij(" ",e.szobaszam," "),t.xp6(4),t.hij(" ",e.szobakod," "),t.xp6(4),t.hij(" ",e.agyakszama," "),t.xp6(4),t.hij(" ",e.epulet," "),t.xp6(4),t.hij(" ",e.agytipus," "),t.xp6(4),t.hij(" ",e.megjegyzes," ")}}const A=function(){return["name","country.name","representative.name","status"]},C=function(){return[10,20,30]};let F=(()=>{class s{constructor(e){this.messageService=e,this.productDialog=!1,this.deleteProductDialog=!1,this.deleteProductsDialog=!1,this.products=[],this.product={},this.FoodVouchers=[],this.foodVoucher=[],this.selectedProducts=[],this.submitted=!1,this.cols=[],this.statuses=[],this.rowsPerPageOptions=[5,10,20]}ngOnInit(){this.cols=[{field:"product",header:"Product"},{field:"price",header:"Price"},{field:"category",header:"Category"},{field:"rating",header:"Reviews"},{field:"inventoryStatus",header:"Status"}],this.statuses=[{label:"FOGLALHATO",value:"FOGLALHATO"},{label:"MAJDNEMTELE",value:"MAJDNEMTELE"},{label:"MEGTELT",value:"MEGTELT"}],this.FoodVouchers=[{id:"1",szobaszam:"101",szobakod:"MD",agyakszama:"2",epulet:"Maranatha fsz",agytipus:"k\xe9t\xe1gyas",megjegyzes:"kapcs.: 102"},{id:"2",szobaszam:"102",szobakod:"MB",agyakszama:"4",epulet:"Maranatha fsz",agytipus:"emeletes \xe1gy",megjegyzes:"kapcs.: 101"},{id:"3",szobaszam:"103",szobakod:"MQ",agyakszama:"2",epulet:"Maranatha fsz",agytipus:"francia\xe1gy",megjegyzes:"kapcs.: 104"},{id:"4",szobaszam:"104",szobakod:"MB",agyakszama:"4",epulet:"Maranatha fsz",agytipus:"emeletes \xe1gy",megjegyzes:"kapcs.: 103"},{id:"5",szobaszam:"105",szobakod:"MD",agyakszama:"2",epulet:"Maranatha fsz",agytipus:"k\xe9t\xe1gyas",megjegyzes:"kapcs.: 106"}]}openNew(){this.product={},this.submitted=!1,this.productDialog=!0}deleteSelectedProducts(){this.deleteProductsDialog=!0}editProduct(e){this.product={...e},this.productDialog=!0}deleteProduct(e){this.deleteProductDialog=!0,this.product={...e}}confirmDeleteSelected(){this.deleteProductsDialog=!1,this.products=this.products.filter(e=>!this.selectedProducts.includes(e)),this.messageService.add({severity:"success",summary:"Successful",detail:"Products Deleted",life:3e3}),this.selectedProducts=[]}confirmDelete(){this.deleteProductDialog=!1,this.products=this.products.filter(e=>e.id!==this.product.id),this.messageService.add({severity:"success",summary:"Successful",detail:"Product Deleted",life:3e3}),this.product={}}hideDialog(){this.productDialog=!1,this.submitted=!1}saveProduct(){this.submitted=!0,this.product.name?.trim()&&(this.product.id?(this.product.inventoryStatus=this.product.inventoryStatus.value?this.product.inventoryStatus.value:this.product.inventoryStatus,this.products[this.findIndexById(this.product.id)]=this.product,this.messageService.add({severity:"success",summary:"Successful",detail:"Product Updated",life:3e3})):(this.product.id=this.createId(),this.product.code=this.createId(),this.product.image="product-placeholder.svg",this.product.inventoryStatus=this.product.inventoryStatus?this.product.inventoryStatus.value:"FOGLALHATO",this.products.push(this.product),this.messageService.add({severity:"success",summary:"Successful",detail:"Product Created",life:3e3})),this.products=[...this.products],this.productDialog=!1,this.product={})}findIndexById(e){let i=-1;for(let o=0;o<this.products.length;o++)if(this.products[o].id===e){i=o;break}return i}createId(){let e="";for(let o=0;o<5;o++)e+="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".charAt(Math.floor(62*Math.random()));return e}onGlobalFilter(e,i){e.filterGlobal(i.target.value,"contains")}static#t=this.\u0275fac=function(i){return new(i||s)(t.Y36(r.ez))};static#e=this.\u0275cmp=t.Xpm({type:s,selectors:[["ng-component"]],features:[t._Bn([r.ez])],decls:9,vars:11,consts:[[1,"grid"],[1,"col-12"],[1,"card","px-0","py-0"],["responsiveLayout","scroll","currentPageReportTemplate","Showing {first} to {last} of {totalRecords} entries","selectionMode","multiple","dataKey","id",3,"value","columns","rows","globalFilterFields","paginator","rowsPerPageOptions","showCurrentPageReport","selection","rowHover","selectionChange"],["dt",""],["pTemplate","caption"],["pTemplate","header"],["pTemplate","body"],[1,"flex","flex-column","md:flex-row","md:justify-content-between","md:align-items-center"],[1,"m-0"],[1,"block","mt-2","md:mt-0","p-input-icon-left"],[1,"pi","pi-search"],["pInputText","","type","text","placeholder","Keres\xe9s...",1,"w-full","sm:w-auto",3,"input"],[1,"block","mt-2","md:mt-0"],["pButton","","pRipple","","label","\xdaj","icon","pi pi-plus",1,"p-button-success","mr-2",3,"click"],["pButton","","pRipple","","label","T\xf6rl\xe9s","icon","pi pi-trash",1,"p-button-danger","mr-2",3,"disabled","click"],["mode","basic","accept","image/*","label","Import","chooseLabel","Import",1,"mr-2","inline-block",3,"maxFileSize"],["pButton","","pRipple","","label","Export","icon","pi pi-upload",1,"p-button-help",3,"click"],[2,"width","3rem"],["pSortableColumn","szobaszam"],["field","szobaszam"],["pSortableColumn","szobakod"],["field","szobakod"],["pSortableColumn","agyakszama"],["field","agyakszama"],["pSortableColumn","epulet"],["field","epulet"],["pSortableColumn","agytipus"],["field","agytipus"],["pSortableColumn","megjegyzes"],["field","megjegyzes"],[3,"value"],[2,"width","14%","min-width","10rem"],[1,"p-column-title"],[2,"width","14%","min-width","8rem"],[1,"flex"],["pButton","","pRipple","","icon","pi pi-pencil",1,"p-button-rounded","p-button-success","mr-2",3,"click"],["pButton","","pRipple","","icon","pi pi-trash",1,"p-button-rounded","p-button-warning",3,"click"]],template:function(i,o){1&i&&(t.TgZ(0,"div",0)(1,"div",1)(2,"div",2),t._UZ(3,"p-toast"),t.TgZ(4,"p-table",3,4),t.NdJ("selectionChange",function(l){return o.selectedProducts=l}),t.YNc(6,z,11,2,"ng-template",5),t.YNc(7,v,22,0,"ng-template",6),t.YNc(8,T,31,7,"ng-template",7),t.qZA()()()()),2&i&&(t.xp6(4),t.Q6J("value",o.FoodVouchers)("columns",o.cols)("rows",10)("globalFilterFields",t.DdM(9,A))("paginator",!0)("rowsPerPageOptions",t.DdM(10,C))("showCurrentPageReport",!0)("selection",o.selectedProducts)("rowHover",!0))},dependencies:[n.iA,r.jx,n.lQ,n.fz,n.UA,n.Mo,p.p,m.Hq,h.H,g.FN,f.o],encapsulation:2})}return s})(),x=(()=>{class s{static#t=this.\u0275fac=function(i){return new(i||s)};static#e=this.\u0275mod=t.oAB({type:s});static#o=this.\u0275inj=t.cJS({imports:[d.Bz.forChild([{path:"",component:F}]),d.Bz]})}return s})();var S=a(6340),_=a(6022),M=a(6218),P=a(2352),U=a(1865),k=a(9653),D=a(7213);let E=(()=>{class s{static#t=this.\u0275fac=function(i){return new(i||s)};static#e=this.\u0275mod=t.oAB({type:s});static#o=this.\u0275inj=t.cJS({imports:[Z.ez,x,n.U$,p.O,b.u5,m.hJ,h.T,g.EV,S.V,_.Xt,f.j,M.A,P.kW,U.cc,k.L$,D.S]})}return s})()}}]);