"use strict";(self.webpackChunkZichy2=self.webpackChunkZichy2||[]).push([[894],{894:(Z,M,o)=>{o.r(M),o.d(M,{FoodSensitivitiesModule:()=>E});var c=o(6895),e=o(433),b=o(9624),S=o(805),t=o(1571),h=o(6122),v=o(99),u=o(3388),C=o(5593),x=o(1795),y=o(2453),F=o(1383),I=o(1740),A=o(6679);function R(g,a){if(1&g){const l=t.EpF();t.TgZ(0,"div",11)(1,"button",12),t.NdJ("click",function(){t.CHM(l);const _=t.oxw();return t.KtG(_.openNew())}),t.qZA(),t.TgZ(2,"button",13),t.NdJ("click",function(){t.CHM(l);const _=t.oxw();return t.KtG(_.deleteSelectedProducts())}),t.qZA()()}if(2&g){const l=t.oxw();t.xp6(2),t.Q6J("disabled",!l.selectedProducts||!l.selectedProducts.length)}}function O(g,a){if(1&g){const l=t.EpF();t._UZ(0,"p-fileUpload",14),t.TgZ(1,"button",15),t.NdJ("click",function(){t.CHM(l),t.oxw();const _=t.MAs(8);return t.KtG(_.exportCSV())}),t.qZA()}2&g&&t.Q6J("maxFileSize",1e6)}function i(g,a){if(1&g){const l=t.EpF();t.TgZ(0,"div",16)(1,"h5",17),t._uU(2,"\xc9tel\xe9rz\xe9kenys\xe9gek"),t.qZA(),t.TgZ(3,"span",18),t._UZ(4,"i",19),t.TgZ(5,"input",20),t.NdJ("input",function(_){t.CHM(l);const B=t.oxw(),z=t.MAs(8);return t.KtG(B.onGlobalFilter(z,_))}),t.qZA()()()}}function p(g,a){1&g&&(t.TgZ(0,"tr")(1,"th",21),t._UZ(2,"p-tableHeaderCheckbox"),t.qZA(),t.TgZ(3,"th",22),t._uU(4,"\xc9rz\xe9kenys\xe9g neve "),t._UZ(5,"p-sortIcon",23),t.qZA(),t.TgZ(6,"th",24),t._uU(7,"Enged\xe9lyezve "),t._UZ(8,"p-sortIcon",25),t.qZA(),t._UZ(9,"th"),t.qZA())}function n(g,a){if(1&g){const l=t.EpF();t.TgZ(0,"tr")(1,"td"),t._UZ(2,"p-tableCheckbox",26),t.qZA(),t.TgZ(3,"td",27)(4,"span",28),t._uU(5,"\xc9rz\xe9kenys\xe9g neve"),t.qZA(),t._uU(6),t.qZA(),t.TgZ(7,"td",27)(8,"span",28),t._uU(9,"Enged\xe9lyezett"),t.qZA(),t._UZ(10,"p-tag",29),t.qZA(),t.TgZ(11,"td")(12,"div",30)(13,"button",31),t.NdJ("click",function(){t.CHM(l);const _=t.oxw();return t.KtG(_.editProduct(_.product))}),t.qZA(),t.TgZ(14,"button",32),t.NdJ("click",function(){t.CHM(l);const _=t.oxw();return t.KtG(_.deleteProduct(_.product))}),t.qZA()()()()}if(2&g){const l=a.$implicit;t.xp6(2),t.Q6J("value",l),t.xp6(4),t.hij(" ",l.name," "),t.xp6(4),t.Q6J("value",1==l.enabled?"Igen":"Nem")("severity",l.enabled)}}const s=function(){return["name","country.name","representative.name","status"]},r=function(){return[10,20,30]};class d{constructor(a,l){this.productService=a,this.messageService=l,this.productDialog=!1,this.deleteProductDialog=!1,this.deleteProductsDialog=!1,this.products=[],this.product={},this.FoodSensitivities=[],this.foodSensitivity=[],this.selectedProducts=[],this.submitted=!1,this.cols=[],this.statuses=[],this.rowsPerPageOptions=[5,10,20]}ngOnInit(){this.productService.getProducts().then(a=>this.products=a),this.cols=[{field:"product",header:"Product"},{field:"price",header:"Price"},{field:"category",header:"Category"},{field:"rating",header:"Reviews"},{field:"inventoryStatus",header:"Status"}],this.statuses=[{label:"FOGLALHATO",value:"FOGLALHATO"},{label:"MAJDNEMTELE",value:"MAJDNEMTELE"},{label:"MEGTELT",value:"MEGTELT"}],this.FoodSensitivities=[{id:"1",name:"Lakt\xf3z intolerancia",enabled:!0},{id:"2",name:"Glut\xe9n intolerancia",enabled:!0},{id:"3",name:"Toj\xe1s intolerancia",enabled:!0}]}openNew(){this.product={},this.submitted=!1,this.productDialog=!0}deleteSelectedProducts(){this.deleteProductsDialog=!0}editProduct(a){this.product={...a},this.productDialog=!0}deleteProduct(a){this.deleteProductDialog=!0,this.product={...a}}confirmDeleteSelected(){this.deleteProductsDialog=!1,this.products=this.products.filter(a=>!this.selectedProducts.includes(a)),this.messageService.add({severity:"success",summary:"Successful",detail:"Products Deleted",life:3e3}),this.selectedProducts=[]}confirmDelete(){this.deleteProductDialog=!1,this.products=this.products.filter(a=>a.id!==this.product.id),this.messageService.add({severity:"success",summary:"Successful",detail:"Product Deleted",life:3e3}),this.product={}}hideDialog(){this.productDialog=!1,this.submitted=!1}saveProduct(){this.submitted=!0,this.product.name?.trim()&&(this.product.id?(this.product.inventoryStatus=this.product.inventoryStatus.value?this.product.inventoryStatus.value:this.product.inventoryStatus,this.products[this.findIndexById(this.product.id)]=this.product,this.messageService.add({severity:"success",summary:"Successful",detail:"Product Updated",life:3e3})):(this.product.id=this.createId(),this.product.code=this.createId(),this.product.image="product-placeholder.svg",this.product.inventoryStatus=this.product.inventoryStatus?this.product.inventoryStatus.value:"FOGLALHATO",this.products.push(this.product),this.messageService.add({severity:"success",summary:"Successful",detail:"Product Created",life:3e3})),this.products=[...this.products],this.productDialog=!1,this.product={})}findIndexById(a){let l=-1;for(let f=0;f<this.products.length;f++)if(this.products[f].id===a){l=f;break}return l}createId(){let a="";const l="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";for(let f=0;f<5;f++)a+=l.charAt(Math.floor(Math.random()*l.length));return a}onGlobalFilter(a,l){a.filterGlobal(l.target.value,"contains")}}d.\u0275fac=function(a){return new(a||d)(t.Y36(h.M),t.Y36(S.ez))},d.\u0275cmp=t.Xpm({type:d,selectors:[["ng-component"]],features:[t._Bn([S.ez])],decls:12,vars:11,consts:[[1,"grid"],[1,"col-12"],[1,"card","px-6","py-6"],["styleClass","mb-4"],["pTemplate","left"],["pTemplate","right"],["responsiveLayout","scroll","currentPageReportTemplate","Showing {first} to {last} of {totalRecords} entries","selectionMode","multiple","dataKey","id",3,"value","columns","rows","globalFilterFields","paginator","rowsPerPageOptions","showCurrentPageReport","selection","rowHover","selectionChange"],["dt",""],["pTemplate","caption"],["pTemplate","header"],["pTemplate","body"],[1,"my-2"],["pButton","","pRipple","","label","\xdaj","icon","pi pi-plus",1,"p-button-success","mr-2",3,"click"],["pButton","","pRipple","","label","T\xf6rl\xe9s","icon","pi pi-trash",1,"p-button-danger",3,"disabled","click"],["mode","basic","accept","image/*","label","Import","chooseLabel","Import",1,"mr-2","inline-block",3,"maxFileSize"],["pButton","","pRipple","","label","Export","icon","pi pi-upload",1,"p-button-help",3,"click"],[1,"flex","flex-column","md:flex-row","md:justify-content-between","md:align-items-center"],[1,"m-0"],[1,"block","mt-2","md:mt-0","p-input-icon-left"],[1,"pi","pi-search"],["pInputText","","type","text","placeholder","Keres\xe9s...",1,"w-full","sm:w-auto",3,"input"],[2,"width","3rem"],["pSortableColumn","name"],["field","name"],["pSortableColumn","enabled"],["field","enabled"],[3,"value"],[2,"width","14%","min-width","10rem"],[1,"p-column-title"],[3,"value","severity"],[1,"flex"],["pButton","","pRipple","","icon","pi pi-pencil",1,"p-button-rounded","p-button-success","mr-2",3,"click"],["pButton","","pRipple","","icon","pi pi-trash",1,"p-button-rounded","p-button-warning",3,"click"]],template:function(a,l){1&a&&(t.TgZ(0,"div",0)(1,"div",1)(2,"div",2),t._UZ(3,"p-toast"),t.TgZ(4,"p-toolbar",3),t.YNc(5,R,3,1,"ng-template",4),t.YNc(6,O,2,1,"ng-template",5),t.qZA(),t.TgZ(7,"p-table",6,7),t.NdJ("selectionChange",function(_){return l.selectedProducts=_}),t.YNc(9,i,6,0,"ng-template",8),t.YNc(10,p,10,0,"ng-template",9),t.YNc(11,n,15,4,"ng-template",10),t.qZA()()()()),2&a&&(t.xp6(7),t.Q6J("value",l.FoodSensitivities)("columns",l.cols)("rows",10)("globalFilterFields",t.DdM(9,s))("paginator",!0)("rowsPerPageOptions",t.DdM(10,r))("showCurrentPageReport",!0)("selection",l.selectedProducts)("rowHover",!0))},dependencies:[v.iA,S.jx,v.lQ,v.fz,v.UA,v.Mo,u.p,C.Hq,x.H,y.FN,F.o,I.o,A.V],encapsulation:2});class m{}m.\u0275fac=function(a){return new(a||m)},m.\u0275mod=t.oAB({type:m}),m.\u0275inj=t.cJS({imports:[b.Bz.forChild([{path:"",component:d}]),b.Bz]});var T=o(6408),k=o(3054),w=o(2210),P=o(613),D=o(5047),J=o(1493);class E{}E.\u0275fac=function(a){return new(a||E)},E.\u0275mod=t.oAB({type:E}),E.\u0275inj=t.cJS({imports:[c.ez,m,v.U$,u.O,e.u5,C.hJ,x.T,y.EV,F.V,T.Xt,I.j,k.A,w.kW,P.cc,D.L$,J.S,A.W]})},3054:(Z,M,o)=>{o.d(M,{A:()=>t,g:()=>S});var c=o(1571),e=o(6895),b=o(433);let S=(()=>{class h{constructor(u,C,x,y){this.el=u,this.ngModel=C,this.control=x,this.cd=y,this.onResize=new c.vpe}ngOnInit(){this.ngModel&&(this.ngModelSubscription=this.ngModel.valueChanges.subscribe(()=>{this.updateState()})),this.control&&(this.ngControlSubscription=this.control.valueChanges.subscribe(()=>{this.updateState()}))}ngAfterViewInit(){this.autoResize&&this.resize(),this.updateFilledState(),this.cd.detectChanges()}onInput(u){this.updateState()}updateFilledState(){this.filled=this.el.nativeElement.value&&this.el.nativeElement.value.length}onFocus(u){this.autoResize&&this.resize(u)}onBlur(u){this.autoResize&&this.resize(u)}resize(u){this.el.nativeElement.style.height="auto",this.el.nativeElement.style.height=this.el.nativeElement.scrollHeight+"px",parseFloat(this.el.nativeElement.style.height)>=parseFloat(this.el.nativeElement.style.maxHeight)?(this.el.nativeElement.style.overflowY="scroll",this.el.nativeElement.style.height=this.el.nativeElement.style.maxHeight):this.el.nativeElement.style.overflow="hidden",this.onResize.emit(u||{})}updateState(){this.updateFilledState(),this.autoResize&&this.resize()}ngOnDestroy(){this.ngModelSubscription&&this.ngModelSubscription.unsubscribe(),this.ngControlSubscription&&this.ngControlSubscription.unsubscribe()}}return h.\u0275fac=function(u){return new(u||h)(c.Y36(c.SBq),c.Y36(b.On,8),c.Y36(b.a5,8),c.Y36(c.sBO))},h.\u0275dir=c.lG2({type:h,selectors:[["","pInputTextarea",""]],hostAttrs:[1,"p-inputtextarea","p-inputtext","p-component","p-element"],hostVars:4,hostBindings:function(u,C){1&u&&c.NdJ("input",function(y){return C.onInput(y)})("focus",function(y){return C.onFocus(y)})("blur",function(y){return C.onBlur(y)}),2&u&&c.ekj("p-filled",C.filled)("p-inputtextarea-resizable",C.autoResize)},inputs:{autoResize:"autoResize"},outputs:{onResize:"onResize"}}),h})(),t=(()=>{class h{}return h.\u0275fac=function(u){return new(u||h)},h.\u0275mod=c.oAB({type:h}),h.\u0275inj=c.cJS({imports:[e.ez]}),h})()},6408:(Z,M,o)=>{o.d(M,{Xt:()=>O,iG:()=>R});var c=o(6895),e=o(1571),b=o(433),S=o(805);function t(i,p){if(1&i){const n=e.EpF();e.TgZ(0,"span",5),e.NdJ("click",function(r){e.CHM(n);const d=e.oxw(2);return e.KtG(d.clear(r))})("keydown.enter",function(r){e.CHM(n);const d=e.oxw(2);return e.KtG(d.clear(r))}),e.qZA()}if(2&i){const n=e.oxw(2);e.Q6J("ngClass",n.iconCancelClass)("ngStyle",n.iconCancelStyle),e.uIk("tabindex",n.disabled||n.readonly?null:"0")}}function h(i,p){if(1&i){const n=e.EpF();e.TgZ(0,"span",6),e.NdJ("click",function(r){const m=e.CHM(n).index,T=e.oxw(2);return e.KtG(T.rate(r,m))})("keydown.enter",function(r){const m=e.CHM(n).index,T=e.oxw(2);return e.KtG(T.rate(r,m))}),e.qZA()}if(2&i){const n=p.index,s=e.oxw(2);e.Q6J("ngClass",!s.value||n>=s.value?s.iconOffClass:s.iconOnClass)("ngStyle",!s.value||n>=s.value?s.iconOffStyle:s.iconOnStyle),e.uIk("tabindex",s.disabled||s.readonly?null:"0")}}function v(i,p){if(1&i&&(e.ynx(0),e.YNc(1,t,1,3,"span",3),e.YNc(2,h,1,3,"span",4),e.BQk()),2&i){const n=e.oxw();e.xp6(1),e.Q6J("ngIf",n.cancel),e.xp6(1),e.Q6J("ngForOf",n.starsArray)}}function u(i,p){1&i&&e.GkF(0)}function C(i,p){if(1&i){const n=e.EpF();e.TgZ(0,"span",9),e.NdJ("click",function(r){e.CHM(n);const d=e.oxw(2);return e.KtG(d.clear(r))})("keydown.enter",function(r){e.CHM(n);const d=e.oxw(2);return e.KtG(d.clear(r))}),e.YNc(1,u,1,0,"ng-container",10),e.qZA()}if(2&i){const n=e.oxw(2);e.Q6J("ngStyle",n.iconCancelStyle),e.uIk("tabindex",n.disabled||n.readonly?null:"0"),e.xp6(1),e.Q6J("ngTemplateOutlet",n.cancelIconTemplate)}}function x(i,p){1&i&&e.GkF(0)}function y(i,p){if(1&i){const n=e.EpF();e.TgZ(0,"span",11),e.NdJ("click",function(r){const m=e.CHM(n).index,T=e.oxw(2);return e.KtG(T.rate(r,m))})("keydown.enter",function(r){const m=e.CHM(n).index,T=e.oxw(2);return e.KtG(T.rate(r,m))}),e.YNc(1,x,1,0,"ng-container",10),e.qZA()}if(2&i){const n=p.index,s=e.oxw(2);e.uIk("tabindex",s.disabled||s.readonly?null:"0"),e.xp6(1),e.Q6J("ngTemplateOutlet",s.getIconTemplate(n))}}function F(i,p){if(1&i&&(e.YNc(0,C,2,3,"span",7),e.YNc(1,y,2,2,"span",8)),2&i){const n=e.oxw();e.Q6J("ngIf",n.cancel),e.xp6(1),e.Q6J("ngForOf",n.starsArray)}}const I=function(i,p){return{"p-readonly":i,"p-disabled":p}},A={provide:b.JU,useExisting:(0,e.Gpc)(()=>R),multi:!0};let R=(()=>{class i{constructor(n){this.cd=n,this.isCustomCancelIcon=!0,this.stars=5,this.cancel=!0,this.iconOnClass="pi pi-star-fill",this.iconOffClass="pi pi-star",this.iconCancelClass="pi pi-ban",this.onRate=new e.vpe,this.onCancel=new e.vpe,this.onModelChange=()=>{},this.onModelTouched=()=>{}}ngOnInit(){this.starsArray=[];for(let n=0;n<this.stars;n++)this.starsArray[n]=n}ngAfterContentInit(){this.templates.forEach(n=>{switch(n.getType()){case"onicon":this.onIconTemplate=n.template;break;case"officon":this.offIconTemplate=n.template;break;case"cancel":this.cancelIconTemplate=n.template}})}getIconTemplate(n){return!this.value||n>=this.value?this.offIconTemplate:this.onIconTemplate}rate(n,s){!this.readonly&&!this.disabled&&(this.value=s+1,this.onModelChange(this.value),this.onModelTouched(),this.onRate.emit({originalEvent:n,value:s+1})),n.preventDefault()}clear(n){!this.readonly&&!this.disabled&&(this.value=null,this.onModelChange(this.value),this.onModelTouched(),this.onCancel.emit(n)),n.preventDefault()}writeValue(n){this.value=n,this.cd.detectChanges()}registerOnChange(n){this.onModelChange=n}registerOnTouched(n){this.onModelTouched=n}setDisabledState(n){this.disabled=n,this.cd.markForCheck()}get isCustomIcon(){return this.templates&&this.templates.length>0}}return i.\u0275fac=function(n){return new(n||i)(e.Y36(e.sBO))},i.\u0275cmp=e.Xpm({type:i,selectors:[["p-rating"]],contentQueries:function(n,s,r){if(1&n&&e.Suo(r,S.jx,4),2&n){let d;e.iGM(d=e.CRH())&&(s.templates=d)}},hostAttrs:[1,"p-element"],inputs:{isCustomCancelIcon:"isCustomCancelIcon",index:"index",disabled:"disabled",readonly:"readonly",stars:"stars",cancel:"cancel",iconOnClass:"iconOnClass",iconOnStyle:"iconOnStyle",iconOffClass:"iconOffClass",iconOffStyle:"iconOffStyle",iconCancelClass:"iconCancelClass",iconCancelStyle:"iconCancelStyle"},outputs:{onRate:"onRate",onCancel:"onCancel"},features:[e._Bn([A])],decls:4,vars:6,consts:[[1,"p-rating",3,"ngClass"],[4,"ngIf","ngIfElse"],["customTemplate",""],["class","p-rating-icon p-rating-cancel",3,"ngClass","ngStyle","click","keydown.enter",4,"ngIf"],["class","p-rating-icon",3,"ngClass","ngStyle","click","keydown.enter",4,"ngFor","ngForOf"],[1,"p-rating-icon","p-rating-cancel",3,"ngClass","ngStyle","click","keydown.enter"],[1,"p-rating-icon",3,"ngClass","ngStyle","click","keydown.enter"],["class","p-rating-icon p-rating-cancel",3,"ngStyle","click","keydown.enter",4,"ngIf"],["class","p-rating-icon",3,"click","keydown.enter",4,"ngFor","ngForOf"],[1,"p-rating-icon","p-rating-cancel",3,"ngStyle","click","keydown.enter"],[4,"ngTemplateOutlet"],[1,"p-rating-icon",3,"click","keydown.enter"]],template:function(n,s){if(1&n&&(e.TgZ(0,"div",0),e.YNc(1,v,3,2,"ng-container",1),e.YNc(2,F,2,2,"ng-template",null,2,e.W1O),e.qZA()),2&n){const r=e.MAs(3);e.Q6J("ngClass",e.WLB(3,I,s.readonly,s.disabled)),e.xp6(1),e.Q6J("ngIf",!s.isCustomIcon)("ngIfElse",r)}},dependencies:[c.mk,c.sg,c.O5,c.tP,c.PC],styles:[".p-rating-icon{cursor:pointer;display:inline-flex}.p-rating.p-rating-readonly .p-rating-icon{cursor:default}\n"],encapsulation:2,changeDetection:0}),i})(),O=(()=>{class i{}return i.\u0275fac=function(n){return new(n||i)},i.\u0275mod=e.oAB({type:i}),i.\u0275inj=e.cJS({imports:[c.ez,S.m8]}),i})()}}]);