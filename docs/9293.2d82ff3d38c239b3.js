"use strict";(self.webpackChunknfc_reserve=self.webpackChunknfc_reserve||[]).push([[9293],{9293:(M,S,i)=>{i.r(S),i.d(S,{FoodSensitivitiesModule:()=>R});var l=i(6814),e=i(95),v=i(5628),b=i(5219),t=i(9468),m=i(981),y=i(9552),g=i(3722),h=i(707),f=i(4480),_=i(4104),o=i(3714),s=i(6263);function u(p,E){if(1&p){const n=t.EpF();t.TgZ(0,"div",8)(1,"h5",9),t._uU(2,"\xc9trendek"),t.qZA(),t.TgZ(3,"span",10),t._UZ(4,"i",11),t.TgZ(5,"input",12),t.NdJ("input",function(r){t.CHM(n);const P=t.oxw(),A=t.MAs(5);return t.KtG(P.onGlobalFilter(A,r))}),t.qZA()(),t.TgZ(6,"span",13)(7,"button",14),t.NdJ("click",function(){t.CHM(n);const r=t.oxw();return t.KtG(r.openNew())}),t.qZA(),t.TgZ(8,"button",15),t.NdJ("click",function(){t.CHM(n);const r=t.oxw();return t.KtG(r.deleteSelectedProducts())}),t.qZA(),t._UZ(9,"p-fileUpload",16),t.TgZ(10,"button",17),t.NdJ("click",function(){t.CHM(n),t.oxw();const r=t.MAs(5);return t.KtG(r.exportCSV())}),t.qZA()()()}if(2&p){const n=t.oxw();t.xp6(8),t.Q6J("disabled",!n.selectedProducts||!n.selectedProducts.length),t.xp6(1),t.Q6J("maxFileSize",1e6)}}function a(p,E){1&p&&(t.TgZ(0,"tr")(1,"th",18),t._UZ(2,"p-tableHeaderCheckbox"),t.qZA(),t.TgZ(3,"th",19),t._uU(4,"\xc9trend neve "),t._UZ(5,"p-sortIcon",20),t.qZA(),t.TgZ(6,"th",21),t._uU(7,"Enged\xe9lyezve "),t._UZ(8,"p-sortIcon",22),t.qZA(),t._UZ(9,"th"),t.qZA())}function d(p,E){if(1&p){const n=t.EpF();t.TgZ(0,"tr")(1,"td"),t._UZ(2,"p-tableCheckbox",23),t.qZA(),t.TgZ(3,"td",24)(4,"span",25),t._uU(5,"\xc9rz\xe9kenys\xe9g neve"),t.qZA(),t._uU(6),t.qZA(),t.TgZ(7,"td",24)(8,"span",25),t._uU(9,"Enged\xe9lyezett"),t.qZA(),t._UZ(10,"p-tag",26),t.qZA(),t.TgZ(11,"td")(12,"div",27)(13,"button",28),t.NdJ("click",function(){t.CHM(n);const r=t.oxw();return t.KtG(r.editProduct(r.product))}),t.qZA(),t.TgZ(14,"button",29),t.NdJ("click",function(){t.CHM(n);const r=t.oxw();return t.KtG(r.deleteProduct(r.product))}),t.qZA()()()()}if(2&p){const n=E.$implicit;t.xp6(2),t.Q6J("value",n),t.xp6(4),t.hij(" ",n.name," "),t.xp6(4),t.Q6J("value",1==n.enabled?"Igen":"Nem")("severity",n.enabled)}}const T=function(){return["name","country.name","representative.name","status"]},C=function(){return[10,20,30]};let x=(()=>{class p{constructor(n,c){this.productService=n,this.messageService=c,this.productDialog=!1,this.deleteProductDialog=!1,this.deleteProductsDialog=!1,this.products=[],this.product={},this.FoodSensitivities=[],this.foodSensitivity=[],this.selectedProducts=[],this.submitted=!1,this.cols=[],this.statuses=[],this.rowsPerPageOptions=[5,10,20]}ngOnInit(){this.productService.getProducts().then(n=>this.products=n),this.cols=[{field:"product",header:"Product"},{field:"price",header:"Price"},{field:"category",header:"Category"},{field:"rating",header:"Reviews"},{field:"inventoryStatus",header:"Status"}],this.statuses=[{label:"FOGLALHATO",value:"FOGLALHATO"},{label:"MAJDNEMTELE",value:"MAJDNEMTELE"},{label:"MEGTELT",value:"MEGTELT"}],this.FoodSensitivities=[{id:"1",name:"Norm\xe1l",enabled:!0},{id:"2",name:"Glut\xe9nmentes",enabled:!0},{id:"3",name:"Lakt\xf3zmentes",enabled:!0},{id:"4",name:"Tejmentes",enabled:!0},{id:"5",name:"Glut\xe9n \xe9s tej/lakt\xf3zmentes",enabled:!0},{id:"6",name:"Veget\xe1ri\xe1nus",enabled:!0}]}openNew(){this.product={},this.submitted=!1,this.productDialog=!0}deleteSelectedProducts(){this.deleteProductsDialog=!0}editProduct(n){this.product={...n},this.productDialog=!0}deleteProduct(n){this.deleteProductDialog=!0,this.product={...n}}confirmDeleteSelected(){this.deleteProductsDialog=!1,this.products=this.products.filter(n=>!this.selectedProducts.includes(n)),this.messageService.add({severity:"success",summary:"Successful",detail:"Products Deleted",life:3e3}),this.selectedProducts=[]}confirmDelete(){this.deleteProductDialog=!1,this.products=this.products.filter(n=>n.id!==this.product.id),this.messageService.add({severity:"success",summary:"Successful",detail:"Product Deleted",life:3e3}),this.product={}}hideDialog(){this.productDialog=!1,this.submitted=!1}saveProduct(){this.submitted=!0,this.product.name?.trim()&&(this.product.id?(this.product.inventoryStatus=this.product.inventoryStatus.value?this.product.inventoryStatus.value:this.product.inventoryStatus,this.products[this.findIndexById(this.product.id)]=this.product,this.messageService.add({severity:"success",summary:"Successful",detail:"Product Updated",life:3e3})):(this.product.id=this.createId(),this.product.code=this.createId(),this.product.image="product-placeholder.svg",this.product.inventoryStatus=this.product.inventoryStatus?this.product.inventoryStatus.value:"FOGLALHATO",this.products.push(this.product),this.messageService.add({severity:"success",summary:"Successful",detail:"Product Created",life:3e3})),this.products=[...this.products],this.productDialog=!1,this.product={})}findIndexById(n){let c=-1;for(let r=0;r<this.products.length;r++)if(this.products[r].id===n){c=r;break}return c}createId(){let n="";for(let r=0;r<5;r++)n+="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".charAt(Math.floor(62*Math.random()));return n}onGlobalFilter(n,c){n.filterGlobal(c.target.value,"contains")}static#t=this.\u0275fac=function(c){return new(c||p)(t.Y36(m.M),t.Y36(b.ez))};static#e=this.\u0275cmp=t.Xpm({type:p,selectors:[["ng-component"]],features:[t._Bn([b.ez])],decls:9,vars:11,consts:[[1,"grid"],[1,"col-12"],[1,"card","px-0","py-0"],["responsiveLayout","scroll","currentPageReportTemplate","Showing {first} to {last} of {totalRecords} entries","selectionMode","multiple","dataKey","id",3,"value","columns","rows","globalFilterFields","paginator","rowsPerPageOptions","showCurrentPageReport","selection","rowHover","selectionChange"],["dt",""],["pTemplate","caption"],["pTemplate","header"],["pTemplate","body"],[1,"flex","flex-column","md:flex-row","md:justify-content-between","md:align-items-center"],[1,"m-0"],[1,"block","mt-2","md:mt-0","p-input-icon-left"],[1,"pi","pi-search"],["pInputText","","type","text","placeholder","Keres\xe9s...",1,"w-full","sm:w-auto",3,"input"],[1,"block","mt-2","md:mt-0"],["pButton","","pRipple","","label","\xdaj","icon","pi pi-plus",1,"p-button-success","mr-2",3,"click"],["pButton","","pRipple","","label","T\xf6rl\xe9s","icon","pi pi-trash",1,"p-button-danger","mr-2",3,"disabled","click"],["mode","basic","accept","image/*","label","Import","chooseLabel","Import",1,"mr-2","inline-block",3,"maxFileSize"],["pButton","","pRipple","","label","Export","icon","pi pi-upload",1,"p-button-help",3,"click"],[2,"width","3rem"],["pSortableColumn","name"],["field","name"],["pSortableColumn","enabled"],["field","enabled"],[3,"value"],[2,"width","14%","min-width","10rem"],[1,"p-column-title"],[3,"value","severity"],[1,"flex"],["pButton","","pRipple","","icon","pi pi-pencil",1,"p-button-rounded","p-button-success","mr-2",3,"click"],["pButton","","pRipple","","icon","pi pi-trash",1,"p-button-rounded","p-button-warning",3,"click"]],template:function(c,r){1&c&&(t.TgZ(0,"div",0)(1,"div",1)(2,"div",2),t._UZ(3,"p-toast"),t.TgZ(4,"p-table",3,4),t.NdJ("selectionChange",function(A){return r.selectedProducts=A}),t.YNc(6,u,11,2,"ng-template",5),t.YNc(7,a,10,0,"ng-template",6),t.YNc(8,d,15,4,"ng-template",7),t.qZA()()()()),2&c&&(t.xp6(4),t.Q6J("value",r.FoodSensitivities)("columns",r.cols)("rows",10)("globalFilterFields",t.DdM(9,T))("paginator",!0)("rowsPerPageOptions",t.DdM(10,C))("showCurrentPageReport",!0)("selection",r.selectedProducts)("rowHover",!0))},dependencies:[y.iA,b.jx,y.lQ,y.fz,y.UA,y.Mo,g.p,h.Hq,f.H,_.FN,o.o,s.V],encapsulation:2})}return p})(),Z=(()=>{class p{static#t=this.\u0275fac=function(c){return new(c||p)};static#e=this.\u0275mod=t.oAB({type:p});static#n=this.\u0275inj=t.cJS({imports:[v.Bz.forChild([{path:"",component:x}]),v.Bz]})}return p})();var D=i(6340),F=i(6022),I=i(6218),O=i(3965),B=i(1865),z=i(7279),J=i(1312);let R=(()=>{class p{static#t=this.\u0275fac=function(c){return new(c||p)};static#e=this.\u0275mod=t.oAB({type:p});static#n=this.\u0275inj=t.cJS({imports:[l.ez,Z,y.U$,g.O,e.u5,h.hJ,f.T,_.EV,D.V,F.Xt,o.j,I.A,O.kW,B.cc,z.L$,J.S,s.W]})}return p})()},6218:(M,S,i)=>{i.d(S,{A:()=>t,g:()=>b});var l=i(9468),e=i(6814),v=i(95);let b=(()=>{class m{el;ngModel;control;cd;autoResize;onResize=new l.vpe;filled;cachedScrollHeight;ngModelSubscription;ngControlSubscription;constructor(g,h,f,_){this.el=g,this.ngModel=h,this.control=f,this.cd=_}ngOnInit(){this.ngModel&&(this.ngModelSubscription=this.ngModel.valueChanges.subscribe(()=>{this.updateState()})),this.control&&(this.ngControlSubscription=this.control.valueChanges.subscribe(()=>{this.updateState()}))}ngAfterViewInit(){this.autoResize&&this.resize(),this.updateFilledState(),this.cd.detectChanges()}onInput(g){this.updateState()}updateFilledState(){this.filled=this.el.nativeElement.value&&this.el.nativeElement.value.length}onFocus(g){this.autoResize&&this.resize(g)}onBlur(g){this.autoResize&&this.resize(g)}resize(g){this.el.nativeElement.style.height="auto",this.el.nativeElement.style.height=this.el.nativeElement.scrollHeight+"px",parseFloat(this.el.nativeElement.style.height)>=parseFloat(this.el.nativeElement.style.maxHeight)?(this.el.nativeElement.style.overflowY="scroll",this.el.nativeElement.style.height=this.el.nativeElement.style.maxHeight):this.el.nativeElement.style.overflow="hidden",this.onResize.emit(g||{})}updateState(){this.updateFilledState(),this.autoResize&&this.resize()}ngOnDestroy(){this.ngModelSubscription&&this.ngModelSubscription.unsubscribe(),this.ngControlSubscription&&this.ngControlSubscription.unsubscribe()}static \u0275fac=function(h){return new(h||m)(l.Y36(l.SBq),l.Y36(v.On,8),l.Y36(v.a5,8),l.Y36(l.sBO))};static \u0275dir=l.lG2({type:m,selectors:[["","pInputTextarea",""]],hostAttrs:[1,"p-inputtextarea","p-inputtext","p-component","p-element"],hostVars:4,hostBindings:function(h,f){1&h&&l.NdJ("input",function(o){return f.onInput(o)})("focus",function(o){return f.onFocus(o)})("blur",function(o){return f.onBlur(o)}),2&h&&l.ekj("p-filled",f.filled)("p-inputtextarea-resizable",f.autoResize)},inputs:{autoResize:"autoResize"},outputs:{onResize:"onResize"}})}return m})(),t=(()=>{class m{static \u0275fac=function(h){return new(h||m)};static \u0275mod=l.oAB({type:m});static \u0275inj=l.cJS({imports:[e.ez]})}return m})()},6263:(M,S,i)=>{i.d(S,{V:()=>f,W:()=>_});var l=i(6814),e=i(9468),v=i(5219);function b(o,s){if(1&o&&e._UZ(0,"span",5),2&o){const u=e.oxw(2);e.Q6J("ngClass",u.icon)}}function t(o,s){if(1&o&&(e.ynx(0),e.YNc(1,b,1,1,"span",4),e.BQk()),2&o){const u=e.oxw();e.xp6(1),e.Q6J("ngIf",u.icon)}}function m(o,s){}function y(o,s){1&o&&e.YNc(0,m,0,0,"ng-template")}function g(o,s){if(1&o&&(e.TgZ(0,"span",6),e.YNc(1,y,1,0,null,7),e.qZA()),2&o){const u=e.oxw();e.xp6(1),e.Q6J("ngTemplateOutlet",u.iconTemplate)}}const h=["*"];let f=(()=>{class o{style;styleClass;severity;value;icon;rounded;templates;iconTemplate;ngAfterContentInit(){this.templates?.forEach(u=>{"icon"===u.getType()&&(this.iconTemplate=u.template)})}containerClass(){return{"p-tag p-component":!0,"p-tag-info":"info"===this.severity,"p-tag-success":"success"===this.severity,"p-tag-warning":"warning"===this.severity,"p-tag-danger":"danger"===this.severity,"p-tag-rounded":this.rounded}}static \u0275fac=function(a){return new(a||o)};static \u0275cmp=e.Xpm({type:o,selectors:[["p-tag"]],contentQueries:function(a,d,T){if(1&a&&e.Suo(T,v.jx,4),2&a){let C;e.iGM(C=e.CRH())&&(d.templates=C)}},hostAttrs:[1,"p-element"],inputs:{style:"style",styleClass:"styleClass",severity:"severity",value:"value",icon:"icon",rounded:"rounded"},ngContentSelectors:h,decls:6,vars:7,consts:[[3,"ngClass","ngStyle"],[4,"ngIf"],["class","p-tag-icon",4,"ngIf"],[1,"p-tag-value"],["class","p-tag-icon",3,"ngClass",4,"ngIf"],[1,"p-tag-icon",3,"ngClass"],[1,"p-tag-icon"],[4,"ngTemplateOutlet"]],template:function(a,d){1&a&&(e.F$t(),e.TgZ(0,"span",0),e.Hsn(1),e.YNc(2,t,2,1,"ng-container",1),e.YNc(3,g,2,1,"span",2),e.TgZ(4,"span",3),e._uU(5),e.qZA()()),2&a&&(e.Tol(d.styleClass),e.Q6J("ngClass",d.containerClass())("ngStyle",d.style),e.xp6(2),e.Q6J("ngIf",!d.iconTemplate),e.xp6(1),e.Q6J("ngIf",d.iconTemplate),e.xp6(2),e.Oqu(d.value))},dependencies:[l.mk,l.O5,l.tP,l.PC],styles:[".p-tag{display:inline-flex;align-items:center;justify-content:center}.p-tag-icon,.p-tag-value,.p-tag-icon.pi{line-height:1.5}.p-tag.p-tag-rounded{border-radius:10rem}\n"],encapsulation:2,changeDetection:0})}return o})(),_=(()=>{class o{static \u0275fac=function(a){return new(a||o)};static \u0275mod=e.oAB({type:o});static \u0275inj=e.cJS({imports:[l.ez,v.m8,v.m8]})}return o})()},6340:(M,S,i)=>{i.d(S,{V:()=>o,o:()=>_});var l=i(6814),e=i(9468),v=i(5219);function b(s,u){1&s&&e.GkF(0)}function t(s,u){if(1&s&&(e.TgZ(0,"div",4),e.YNc(1,b,1,0,"ng-container",5),e.qZA()),2&s){const a=e.oxw();e.xp6(1),e.Q6J("ngTemplateOutlet",a.startTemplate)}}function m(s,u){1&s&&e.GkF(0)}function y(s,u){if(1&s&&(e.TgZ(0,"div",6),e.YNc(1,m,1,0,"ng-container",5),e.qZA()),2&s){const a=e.oxw();e.xp6(1),e.Q6J("ngTemplateOutlet",a.centerTemplate)}}function g(s,u){1&s&&e.GkF(0)}function h(s,u){if(1&s&&(e.TgZ(0,"div",7),e.YNc(1,g,1,0,"ng-container",5),e.qZA()),2&s){const a=e.oxw();e.xp6(1),e.Q6J("ngTemplateOutlet",a.endTemplate)}}const f=["*"];let _=(()=>{class s{el;style;styleClass;templates;startTemplate;endTemplate;centerTemplate;constructor(a){this.el=a}getBlockableElement(){return this.el.nativeElement.children[0]}ngAfterContentInit(){this.templates.forEach(a=>{switch(a.getType()){case"left":this.startTemplate=a.template;break;case"right":this.endTemplate=a.template;break;case"center":this.centerTemplate=a.template}})}static \u0275fac=function(d){return new(d||s)(e.Y36(e.SBq))};static \u0275cmp=e.Xpm({type:s,selectors:[["p-toolbar"]],contentQueries:function(d,T,C){if(1&d&&e.Suo(C,v.jx,4),2&d){let x;e.iGM(x=e.CRH())&&(T.templates=x)}},hostAttrs:[1,"p-element"],inputs:{style:"style",styleClass:"styleClass"},ngContentSelectors:f,decls:5,vars:7,consts:[["role","toolbar",3,"ngClass","ngStyle"],["class","p-toolbar-group-left p-toolbar-group-start",4,"ngIf"],["class","p-toolbar-group-center",4,"ngIf"],["class","p-toolbar-group-right p-toolbar-group-end",4,"ngIf"],[1,"p-toolbar-group-left","p-toolbar-group-start"],[4,"ngTemplateOutlet"],[1,"p-toolbar-group-center"],[1,"p-toolbar-group-right","p-toolbar-group-end"]],template:function(d,T){1&d&&(e.F$t(),e.TgZ(0,"div",0),e.Hsn(1),e.YNc(2,t,2,1,"div",1),e.YNc(3,y,2,1,"div",2),e.YNc(4,h,2,1,"div",3),e.qZA()),2&d&&(e.Tol(T.styleClass),e.Q6J("ngClass","p-toolbar p-component")("ngStyle",T.style),e.xp6(2),e.Q6J("ngIf",T.startTemplate),e.xp6(1),e.Q6J("ngIf",T.centerTemplate),e.xp6(1),e.Q6J("ngIf",T.endTemplate))},dependencies:[l.mk,l.O5,l.tP,l.PC],styles:[".p-toolbar{display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap}.p-toolbar-group-start,.p-toolbar-group-center,.p-toolbar-group-end,.p-toolbar-group-left,.p-toolbar-group-right{display:flex;align-items:center}\n"],encapsulation:2,changeDetection:0})}return s})(),o=(()=>{class s{static \u0275fac=function(d){return new(d||s)};static \u0275mod=e.oAB({type:s});static \u0275inj=e.cJS({imports:[l.ez]})}return s})()}}]);