"use strict";(self.webpackChunkapollo_ng=self.webpackChunkapollo_ng||[]).push([[9293],{9293:(C,v,i)=>{i.r(v),i.d(v,{FoodSensitivitiesModule:()=>U});var l=i(6814),f=i(95),m=i(2129),g=i(5219),t=i(9468),a=i(981),h=i(9552),r=i(3722),u=i(707),d=i(4480),p=i(4104),c=i(3714),y=i(6263);function x(o,S){if(1&o){const e=t.EpF();t.TgZ(0,"div",8)(1,"h5",9),t._uU(2,"\xc9trendek"),t.qZA(),t.TgZ(3,"span",10),t._UZ(4,"i",11),t.TgZ(5,"input",12),t.NdJ("input",function(n){t.CHM(e);const T=t.oxw(),b=t.MAs(5);return t.KtG(T.onGlobalFilter(b,n))}),t.qZA()(),t.TgZ(6,"span",13)(7,"button",14),t.NdJ("click",function(){t.CHM(e);const n=t.oxw();return t.KtG(n.openNew())}),t.qZA(),t.TgZ(8,"button",15),t.NdJ("click",function(){t.CHM(e);const n=t.oxw();return t.KtG(n.deleteSelectedProducts())}),t.qZA(),t._UZ(9,"p-fileUpload",16),t.TgZ(10,"button",17),t.NdJ("click",function(){t.CHM(e),t.oxw();const n=t.MAs(5);return t.KtG(n.exportCSV())}),t.qZA()()()}if(2&o){const e=t.oxw();t.xp6(8),t.Q6J("disabled",!e.selectedProducts||!e.selectedProducts.length),t.xp6(1),t.Q6J("maxFileSize",1e6)}}function F(o,S){1&o&&(t.TgZ(0,"tr")(1,"th",18),t._UZ(2,"p-tableHeaderCheckbox"),t.qZA(),t.TgZ(3,"th",19),t._uU(4,"\xc9trend neve "),t._UZ(5,"p-sortIcon",20),t.qZA(),t.TgZ(6,"th",21),t._uU(7,"Enged\xe9lyezve "),t._UZ(8,"p-sortIcon",22),t.qZA(),t._UZ(9,"th"),t.qZA())}function M(o,S){if(1&o){const e=t.EpF();t.TgZ(0,"tr")(1,"td"),t._UZ(2,"p-tableCheckbox",23),t.qZA(),t.TgZ(3,"td",24)(4,"span",25),t._uU(5,"\xc9rz\xe9kenys\xe9g neve"),t.qZA(),t._uU(6),t.qZA(),t.TgZ(7,"td",24)(8,"span",25),t._uU(9,"Enged\xe9lyezett"),t.qZA(),t._UZ(10,"p-tag",26),t.qZA(),t.TgZ(11,"td")(12,"div",27)(13,"button",28),t.NdJ("click",function(){t.CHM(e);const n=t.oxw();return t.KtG(n.editProduct(n.product))}),t.qZA(),t.TgZ(14,"button",29),t.NdJ("click",function(){t.CHM(e);const n=t.oxw();return t.KtG(n.deleteProduct(n.product))}),t.qZA()()()()}if(2&o){const e=S.$implicit;t.xp6(2),t.Q6J("value",e),t.xp6(4),t.hij(" ",e.name," "),t.xp6(4),t.Q6J("value",1==e.enabled?"Igen":"Nem")("severity",e.enabled)}}const E=function(){return["name","country.name","representative.name","status"]},P=function(){return[10,20,30]};let Z=(()=>{class o{constructor(e,s){this.productService=e,this.messageService=s,this.productDialog=!1,this.deleteProductDialog=!1,this.deleteProductsDialog=!1,this.products=[],this.product={},this.FoodSensitivities=[],this.foodSensitivity=[],this.selectedProducts=[],this.submitted=!1,this.cols=[],this.statuses=[],this.rowsPerPageOptions=[5,10,20]}ngOnInit(){this.productService.getProducts().then(e=>this.products=e),this.cols=[{field:"product",header:"Product"},{field:"price",header:"Price"},{field:"category",header:"Category"},{field:"rating",header:"Reviews"},{field:"inventoryStatus",header:"Status"}],this.statuses=[{label:"FOGLALHATO",value:"FOGLALHATO"},{label:"MAJDNEMTELE",value:"MAJDNEMTELE"},{label:"MEGTELT",value:"MEGTELT"}],this.FoodSensitivities=[{id:"1",name:"Norm\xe1l",enabled:!0},{id:"2",name:"Glut\xe9nmentes",enabled:!0},{id:"3",name:"Lakt\xf3zmentes",enabled:!0},{id:"4",name:"Tejmentes",enabled:!0},{id:"5",name:"Glut\xe9n \xe9s tej/lakt\xf3zmentes",enabled:!0},{id:"6",name:"Veget\xe1ri\xe1nus",enabled:!0}]}openNew(){this.product={},this.submitted=!1,this.productDialog=!0}deleteSelectedProducts(){this.deleteProductsDialog=!0}editProduct(e){this.product={...e},this.productDialog=!0}deleteProduct(e){this.deleteProductDialog=!0,this.product={...e}}confirmDeleteSelected(){this.deleteProductsDialog=!1,this.products=this.products.filter(e=>!this.selectedProducts.includes(e)),this.messageService.add({severity:"success",summary:"Successful",detail:"Products Deleted",life:3e3}),this.selectedProducts=[]}confirmDelete(){this.deleteProductDialog=!1,this.products=this.products.filter(e=>e.id!==this.product.id),this.messageService.add({severity:"success",summary:"Successful",detail:"Product Deleted",life:3e3}),this.product={}}hideDialog(){this.productDialog=!1,this.submitted=!1}saveProduct(){this.submitted=!0,this.product.name?.trim()&&(this.product.id?(this.product.inventoryStatus=this.product.inventoryStatus.value?this.product.inventoryStatus.value:this.product.inventoryStatus,this.products[this.findIndexById(this.product.id)]=this.product,this.messageService.add({severity:"success",summary:"Successful",detail:"Product Updated",life:3e3})):(this.product.id=this.createId(),this.product.code=this.createId(),this.product.image="product-placeholder.svg",this.product.inventoryStatus=this.product.inventoryStatus?this.product.inventoryStatus.value:"FOGLALHATO",this.products.push(this.product),this.messageService.add({severity:"success",summary:"Successful",detail:"Product Created",life:3e3})),this.products=[...this.products],this.productDialog=!1,this.product={})}findIndexById(e){let s=-1;for(let n=0;n<this.products.length;n++)if(this.products[n].id===e){s=n;break}return s}createId(){let e="";for(let n=0;n<5;n++)e+="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".charAt(Math.floor(62*Math.random()));return e}onGlobalFilter(e,s){e.filterGlobal(s.target.value,"contains")}static#t=this.\u0275fac=function(s){return new(s||o)(t.Y36(a.M),t.Y36(g.ez))};static#e=this.\u0275cmp=t.Xpm({type:o,selectors:[["ng-component"]],features:[t._Bn([g.ez])],decls:9,vars:11,consts:[[1,"grid"],[1,"col-12"],[1,"card","px-0","py-0"],["responsiveLayout","scroll","currentPageReportTemplate","Showing {first} to {last} of {totalRecords} entries","selectionMode","multiple","dataKey","id",3,"value","columns","rows","globalFilterFields","paginator","rowsPerPageOptions","showCurrentPageReport","selection","rowHover","selectionChange"],["dt",""],["pTemplate","caption"],["pTemplate","header"],["pTemplate","body"],[1,"flex","flex-column","md:flex-row","md:justify-content-between","md:align-items-center"],[1,"m-0"],[1,"block","mt-2","md:mt-0","p-input-icon-left"],[1,"pi","pi-search"],["pInputText","","type","text","placeholder","Keres\xe9s...",1,"w-full","sm:w-auto",3,"input"],[1,"block","mt-2","md:mt-0"],["pButton","","pRipple","","label","\xdaj","icon","pi pi-plus",1,"p-button-success","mr-2",3,"click"],["pButton","","pRipple","","label","T\xf6rl\xe9s","icon","pi pi-trash",1,"p-button-danger","mr-2",3,"disabled","click"],["mode","basic","accept","image/*","label","Import","chooseLabel","Import",1,"mr-2","inline-block",3,"maxFileSize"],["pButton","","pRipple","","label","Export","icon","pi pi-upload",1,"p-button-help",3,"click"],[2,"width","3rem"],["pSortableColumn","name"],["field","name"],["pSortableColumn","enabled"],["field","enabled"],[3,"value"],[2,"width","14%","min-width","10rem"],[1,"p-column-title"],[3,"value","severity"],[1,"flex"],["pButton","","pRipple","","icon","pi pi-pencil",1,"p-button-rounded","p-button-success","mr-2",3,"click"],["pButton","","pRipple","","icon","pi pi-trash",1,"p-button-rounded","p-button-warning",3,"click"]],template:function(s,n){1&s&&(t.TgZ(0,"div",0)(1,"div",1)(2,"div",2),t._UZ(3,"p-toast"),t.TgZ(4,"p-table",3,4),t.NdJ("selectionChange",function(b){return n.selectedProducts=b}),t.YNc(6,x,11,2,"ng-template",5),t.YNc(7,F,10,0,"ng-template",6),t.YNc(8,M,15,4,"ng-template",7),t.qZA()()()()),2&s&&(t.xp6(4),t.Q6J("value",n.FoodSensitivities)("columns",n.cols)("rows",10)("globalFilterFields",t.DdM(9,E))("paginator",!0)("rowsPerPageOptions",t.DdM(10,P))("showCurrentPageReport",!0)("selection",n.selectedProducts)("rowHover",!0))},dependencies:[h.iA,g.jx,h.lQ,h.fz,h.UA,h.Mo,r.p,u.Hq,d.H,p.FN,c.o,y.V],encapsulation:2})}return o})(),A=(()=>{class o{static#t=this.\u0275fac=function(s){return new(s||o)};static#e=this.\u0275mod=t.oAB({type:o});static#i=this.\u0275inj=t.cJS({imports:[m.Bz.forChild([{path:"",component:Z}]),m.Bz]})}return o})();var _=i(6340),z=i(6022),D=i(6218),I=i(3965),R=i(1865),B=i(7279),H=i(1312);let U=(()=>{class o{static#t=this.\u0275fac=function(s){return new(s||o)};static#e=this.\u0275mod=t.oAB({type:o});static#i=this.\u0275inj=t.cJS({imports:[l.ez,A,h.U$,r.O,f.u5,u.hJ,d.T,p.EV,_.V,z.Xt,c.j,D.A,I.kW,R.cc,B.L$,H.S,y.W]})}return o})()},6218:(C,v,i)=>{i.d(v,{A:()=>t,g:()=>g});var l=i(9468),f=i(6814),m=i(95);let g=(()=>{class a{el;ngModel;control;cd;autoResize;onResize=new l.vpe;filled;cachedScrollHeight;ngModelSubscription;ngControlSubscription;constructor(r,u,d,p){this.el=r,this.ngModel=u,this.control=d,this.cd=p}ngOnInit(){this.ngModel&&(this.ngModelSubscription=this.ngModel.valueChanges.subscribe(()=>{this.updateState()})),this.control&&(this.ngControlSubscription=this.control.valueChanges.subscribe(()=>{this.updateState()}))}ngAfterViewInit(){this.autoResize&&this.resize(),this.updateFilledState(),this.cd.detectChanges()}onInput(r){this.updateState()}updateFilledState(){this.filled=this.el.nativeElement.value&&this.el.nativeElement.value.length}onFocus(r){this.autoResize&&this.resize(r)}onBlur(r){this.autoResize&&this.resize(r)}resize(r){this.el.nativeElement.style.height="auto",this.el.nativeElement.style.height=this.el.nativeElement.scrollHeight+"px",parseFloat(this.el.nativeElement.style.height)>=parseFloat(this.el.nativeElement.style.maxHeight)?(this.el.nativeElement.style.overflowY="scroll",this.el.nativeElement.style.height=this.el.nativeElement.style.maxHeight):this.el.nativeElement.style.overflow="hidden",this.onResize.emit(r||{})}updateState(){this.updateFilledState(),this.autoResize&&this.resize()}ngOnDestroy(){this.ngModelSubscription&&this.ngModelSubscription.unsubscribe(),this.ngControlSubscription&&this.ngControlSubscription.unsubscribe()}static \u0275fac=function(u){return new(u||a)(l.Y36(l.SBq),l.Y36(m.On,8),l.Y36(m.a5,8),l.Y36(l.sBO))};static \u0275dir=l.lG2({type:a,selectors:[["","pInputTextarea",""]],hostAttrs:[1,"p-inputtextarea","p-inputtext","p-component","p-element"],hostVars:4,hostBindings:function(u,d){1&u&&l.NdJ("input",function(c){return d.onInput(c)})("focus",function(c){return d.onFocus(c)})("blur",function(c){return d.onBlur(c)}),2&u&&l.ekj("p-filled",d.filled)("p-inputtextarea-resizable",d.autoResize)},inputs:{autoResize:"autoResize"},outputs:{onResize:"onResize"}})}return a})(),t=(()=>{class a{static \u0275fac=function(u){return new(u||a)};static \u0275mod=l.oAB({type:a});static \u0275inj=l.cJS({imports:[f.ez]})}return a})()}}]);