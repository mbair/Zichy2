"use strict";(self.webpackChunknfc_reserve=self.webpackChunknfc_reserve||[]).push([[6011],{6011:(J,v,l)=>{l.r(v),l.d(v,{VendegekModule:()=>Ce});var r=l(6814),m=l(95),_=l(5628),k=l(7582),f=function(n){return"function"==typeof n},g=function(n){n&&f(n.unsubscribe)&&n.unsubscribe()},u=l(5219),e=l(9468),h=l(746),p=l(9552),Z=l(707),G=l(9502),A=l(4480),M=l(4104),E=l(3714),U=l(3965),D=l(7279),N=l(1312);let R=(()=>{class n{styleClass;style;strokeWidth="2";fill="none";animationDuration="2s";static \u0275fac=function(s){return new(s||n)};static \u0275cmp=e.Xpm({type:n,selectors:[["p-progressSpinner"]],hostAttrs:[1,"p-element"],inputs:{styleClass:"styleClass",style:"style",strokeWidth:"strokeWidth",fill:"fill",animationDuration:"animationDuration"},decls:3,vars:6,consts:[["role","alert","aria-busy","true",1,"p-progress-spinner",3,"ngStyle","ngClass"],["viewBox","25 25 50 50",1,"p-progress-spinner-svg"],["cx","50","cy","50","r","20","stroke-miterlimit","10",1,"p-progress-spinner-circle"]],template:function(s,i){1&s&&(e.TgZ(0,"div",0),e.O4$(),e.TgZ(1,"svg",1),e._UZ(2,"circle",2),e.qZA()()),2&s&&(e.Q6J("ngStyle",i.style)("ngClass",i.styleClass),e.xp6(1),e.Udp("animation-duration",i.animationDuration),e.xp6(1),e.uIk("fill",i.fill)("stroke-width",i.strokeWidth))},dependencies:[r.mk,r.PC],styles:['.p-progress-spinner{position:relative;margin:0 auto;width:100px;height:100px;display:inline-block}.p-progress-spinner:before{content:"";display:block;padding-top:100%}.p-progress-spinner-svg{animation:p-progress-spinner-rotate 2s linear infinite;height:100%;transform-origin:center center;width:100%;position:absolute;inset:0;margin:auto}.p-progress-spinner-circle{stroke-dasharray:89,200;stroke-dashoffset:0;stroke:#d62d20;animation:p-progress-spinner-dash 1.5s ease-in-out infinite,p-progress-spinner-color 6s ease-in-out infinite;stroke-linecap:round}@keyframes p-progress-spinner-rotate{to{transform:rotate(360deg)}}@keyframes p-progress-spinner-dash{0%{stroke-dasharray:1,200;stroke-dashoffset:0}50%{stroke-dasharray:89,200;stroke-dashoffset:-35px}to{stroke-dasharray:89,200;stroke-dashoffset:-124px}}@keyframes p-progress-spinner-color{to,0%{stroke:#d62d20}40%{stroke:#0057e7}66%{stroke:#008744}80%,90%{stroke:#ffa700}}\n'],encapsulation:2,changeDetection:0})}return n})(),O=(()=>{class n{static \u0275fac=function(s){return new(s||n)};static \u0275mod=e.oAB({type:n});static \u0275inj=e.cJS({imports:[r.ez]})}return n})();var q=l(2076),S=l(2332);const F=["mask"];function B(n,o){1&n&&e.GkF(0)}const H=function(n){return{"p-blockui-document":n,"p-blockui p-component-overlay p-component-overlay-enter":!0}},K=function(n){return{display:n}},Q=["*"];let L=(()=>{class n{document;el;cd;config;renderer;target;autoZIndex=!0;baseZIndex=0;styleClass;get blocked(){return this._blocked}set blocked(t){this.mask&&this.mask.nativeElement?t?this.block():this.unblock():this._blocked=t}templates;mask;_blocked=!1;animationEndListener;contentTemplate;constructor(t,s,i,a,c){this.document=t,this.el=s,this.cd=i,this.config=a,this.renderer=c}ngAfterViewInit(){if(this.target&&!this.target.getBlockableElement)throw"Target of BlockUI must implement BlockableUI interface"}ngAfterContentInit(){this.templates.forEach(t=>{t.getType(),this.contentTemplate=t.template})}block(){this._blocked=!0,this.target?(this.target.getBlockableElement().appendChild(this.mask.nativeElement),this.target.getBlockableElement().style.position="relative"):this.renderer.appendChild(this.document.body,this.mask.nativeElement),this.autoZIndex&&S.P9.set("modal",this.mask.nativeElement,this.baseZIndex+this.config.zIndex.modal)}unblock(){this.mask&&(this.animationEndListener=this.renderer.listen(this.mask.nativeElement,"animationend",this.destroyModal.bind(this)),q.p.addClass(this.mask.nativeElement,"p-component-overlay-leave"))}destroyModal(){this._blocked=!1,this.mask&&(q.p.removeClass(this.mask.nativeElement,"p-component-overlay-leave"),S.P9.clear(this.mask.nativeElement),this.renderer.appendChild(this.el.nativeElement,this.mask.nativeElement)),this.unbindAnimationEndListener(),this.cd.markForCheck()}unbindAnimationEndListener(){this.animationEndListener&&this.mask&&(this.animationEndListener(),this.animationEndListener=null)}ngOnDestroy(){this.unblock(),this.destroyModal()}static \u0275fac=function(s){return new(s||n)(e.Y36(r.K0),e.Y36(e.SBq),e.Y36(e.sBO),e.Y36(u.b4),e.Y36(e.Qsj))};static \u0275cmp=e.Xpm({type:n,selectors:[["p-blockUI"]],contentQueries:function(s,i,a){if(1&s&&e.Suo(a,u.jx,4),2&s){let c;e.iGM(c=e.CRH())&&(i.templates=c)}},viewQuery:function(s,i){if(1&s&&e.Gf(F,5),2&s){let a;e.iGM(a=e.CRH())&&(i.mask=a.first)}},hostAttrs:[1,"p-element"],inputs:{target:"target",autoZIndex:"autoZIndex",baseZIndex:"baseZIndex",styleClass:"styleClass",blocked:"blocked"},ngContentSelectors:Q,decls:4,vars:9,consts:[[3,"ngClass","ngStyle"],["mask",""],[4,"ngTemplateOutlet"]],template:function(s,i){1&s&&(e.F$t(),e.TgZ(0,"div",0,1),e.Hsn(2),e.YNc(3,B,1,0,"ng-container",2),e.qZA()),2&s&&(e.Tol(i.styleClass),e.Q6J("ngClass",e.VKq(5,H,!i.target))("ngStyle",e.VKq(7,K,i.blocked?"flex":"none")),e.xp6(3),e.Q6J("ngTemplateOutlet",i.contentTemplate))},dependencies:[r.mk,r.tP,r.PC],styles:[".p-blockui{position:absolute;top:0;left:0;width:100%;height:100%;background-color:transparent;transition-property:background-color;display:flex;align-items:center;justify-content:center}.p-blockui.p-component-overlay{position:absolute}.p-blockui-document.p-component-overlay{position:fixed}.p-blockui-leave.p-component-overlay{background-color:transparent}\n"],encapsulation:2,changeDetection:0})}return n})(),P=(()=>{class n{static \u0275fac=function(s){return new(s||n)};static \u0275mod=e.oAB({type:n});static \u0275inj=e.cJS({imports:[r.ez]})}return n})();var z=l(6263);function Y(n,o){if(1&n){const t=e.EpF();e.TgZ(0,"div",23)(1,"h5",24),e._uU(2,"Vend\xe9gek"),e.qZA(),e.TgZ(3,"span",25),e._UZ(4,"i",26),e.TgZ(5,"input",27),e.NdJ("input",function(i){e.CHM(t);const a=e.oxw(),c=e.MAs(11);return e.KtG(a.onGlobalFilter(c,i))}),e.qZA()(),e.TgZ(6,"span",28)(7,"button",29),e.NdJ("click",function(){e.CHM(t);const i=e.oxw();return e.KtG(i.openNew())}),e.qZA(),e.TgZ(8,"button",30),e.NdJ("click",function(){e.CHM(t);const i=e.oxw();return e.KtG(i.deleteSelectedGuests())}),e.qZA(),e.TgZ(9,"button",31),e.NdJ("click",function(){e.CHM(t),e.oxw();const i=e.MAs(11);return e.KtG(i.exportCSV())}),e.qZA()()()}if(2&n){const t=e.oxw();e.xp6(8),e.Q6J("disabled",!t.selectedGuests||!t.selectedGuests.length)}}function j(n,o){1&n&&(e.TgZ(0,"tr")(1,"th",32),e._UZ(2,"p-tableHeaderCheckbox"),e.qZA(),e._UZ(3,"th",32),e.TgZ(4,"th",33),e._uU(5,"N\xe9v "),e._UZ(6,"p-sortIcon",34),e.qZA(),e.TgZ(7,"th",35),e._uU(8,"Szoba "),e._UZ(9,"p-sortIcon",36),e.qZA(),e.TgZ(10,"th",37),e._uU(11,"\xc9trend "),e._UZ(12,"p-sortIcon",38),e.qZA(),e.TgZ(13,"th",39),e._uU(14,"RFID "),e._UZ(15,"p-sortIcon",40),e.qZA(),e.TgZ(16,"th",41),e._uU(17,"RFID haszn\xe1lat"),e._UZ(18,"p-sortIcon",42),e.qZA(),e.TgZ(19,"th",43),e._uU(20,"\xc9rkez\xe9s "),e._UZ(21,"p-sortIcon",44),e.qZA(),e.TgZ(22,"th",45),e._uU(23,"T\xe1voz\xe1s "),e._UZ(24,"p-sortIcon",46),e.qZA(),e._UZ(25,"th"),e.qZA())}function $(n,o){1&n&&e._UZ(0,"span",59)}const W=function(n){return{background:n}};function X(n,o){if(1&n){const t=e.EpF();e.TgZ(0,"tr")(1,"td"),e._UZ(2,"p-tableCheckbox",47),e.qZA(),e.TgZ(3,"td"),e._UZ(4,"p-button",48),e.qZA(),e.TgZ(5,"td",49)(6,"span",50),e._uU(7,"N\xe9v"),e.qZA(),e._uU(8),e.YNc(9,$,1,0,"span",51),e.qZA(),e.TgZ(10,"td",52)(11,"span",50),e._uU(12,"Szoba"),e.qZA(),e._uU(13),e.qZA(),e.TgZ(14,"td",53)(15,"span",50),e._uU(16,"\xc9trend"),e.qZA(),e._UZ(17,"p-tag",47),e.qZA(),e.TgZ(18,"td")(19,"span",50),e._uU(20,"RFID"),e.qZA(),e._uU(21),e.qZA(),e.TgZ(22,"td",49)(23,"span",50),e._uU(24,"Utols\xf3 RFID haszn\xe1lat"),e.qZA(),e._uU(25),e.ALo(26,"date"),e.qZA(),e.TgZ(27,"td",54)(28,"span",50),e._uU(29,"\xc9rkez\xe9s"),e.qZA(),e._uU(30),e.ALo(31,"date"),e.qZA(),e.TgZ(32,"td",54)(33,"span",50),e._uU(34,"T\xe1voz\xe1s"),e.qZA(),e._uU(35),e.ALo(36,"date"),e.qZA(),e.TgZ(37,"td")(38,"div",55)(39,"button",56),e.NdJ("click",function(){const a=e.CHM(t).$implicit,c=e.oxw();return e.KtG(c.assignTag(a))}),e.qZA(),e.TgZ(40,"button",57),e.NdJ("click",function(){e.CHM(t);const i=e.oxw();return e.KtG(i.editProduct(i.product))}),e.qZA(),e.TgZ(41,"button",58),e.NdJ("click",function(){const a=e.CHM(t).$implicit,c=e.oxw();return e.KtG(c.deleteGuest(a))}),e.qZA()()()()}if(2&n){const t=o.$implicit,s=o.expanded,i=e.oxw();e.xp6(2),e.Q6J("value",t),e.xp6(2),e.Q6J("pRowToggler",t)("icon",s?"pi pi-chevron-down":"pi pi-chevron-right"),e.xp6(4),e.AsE(" ",t.lastName," ",t.firstName," "),e.xp6(1),e.Q6J("ngIf",t.rfid),e.xp6(4),e.hij(" ",t.roomNum," "),e.xp6(4),e.Akn(e.VKq(24,W,i.getDietColor(t.diet))),e.Q6J("value",t.diet),e.xp6(4),e.hij(" ",t.rfid," "),e.xp6(4),e.hij(" ",e.Dn7(26,14,t.lastRfidUsage,"yyyy.MM.dd HH:mm:ss","UTC")," "),e.xp6(5),e.hij(" ",e.xi3(31,18,t.dateOfArrival,"yyyy.MM.dd")," "),e.xp6(5),e.hij(" ",e.xi3(36,21,t.dateOfDeparture,"yyyy.MM.dd")," ")}}function ee(n,o){if(1&n&&(e.TgZ(0,"tr")(1,"td",60)(2,"div",61)(3,"table",62)(4,"tr")(5,"td",63),e._uU(6,"Sz\xfclet\xe9si d\xe1tum"),e.qZA(),e.TgZ(7,"td"),e._uU(8),e.ALo(9,"date"),e.qZA()(),e.TgZ(10,"tr")(11,"td",63),e._uU(12,"Nem:"),e.qZA(),e.TgZ(13,"td"),e._uU(14),e.qZA()(),e.TgZ(15,"tr")(16,"td",63),e._uU(17,"Nemzetis\xe9g:"),e.qZA(),e.TgZ(18,"td"),e._uU(19),e.qZA()(),e.TgZ(20,"tr")(21,"td",63),e._uU(22,"Orsz\xe1g:"),e.qZA(),e.TgZ(23,"td"),e._uU(24),e.qZA()(),e.TgZ(25,"tr")(26,"td",63),e._uU(27,"Ir\xe1ny\xedt\xf3sz\xe1m:"),e.qZA(),e.TgZ(28,"td"),e._uU(29),e.qZA()(),e.TgZ(30,"tr")(31,"td",63),e._uU(32,"SZ\xc9P k\xe1rtya:"),e.qZA(),e.TgZ(33,"td"),e._uU(34),e.qZA()(),e.TgZ(35,"tr")(36,"td",63),e._uU(37,"Els\u0151 \xe9tkez\xe9s:"),e.qZA(),e.TgZ(38,"td"),e._uU(39),e.qZA()(),e.TgZ(40,"tr")(41,"td",63),e._uU(42,"Utols\xf3 \xe9tkez\xe9s:"),e.qZA(),e.TgZ(43,"td"),e._uU(44),e.qZA()(),e.TgZ(45,"tr")(46,"td",63),e._uU(47,"Extra:"),e.qZA(),e.TgZ(48,"td"),e._uU(49),e.qZA()()()()()()),2&n){const t=o.$implicit;e.xp6(8),e.Oqu(e.xi3(9,9,t.birthDate,"yyyy.MM.dd")),e.xp6(6),e.Oqu(1==t.gender?"F\xe9rfi":"N\u0151"),e.xp6(5),e.Oqu(t.nationality),e.xp6(5),e.Oqu(t.country),e.xp6(5),e.Oqu(t.zipCode),e.xp6(5),e.Oqu(1==t.szepCard?"Igen":"Nem"),e.xp6(5),e.Oqu(t.firstMeal),e.xp6(5),e.Oqu(t.lastMeal),e.xp6(5),e.Oqu(t.accommodationExtra)}}function te(n,o){if(1&n&&e._UZ(0,"img",76),2&n){const t=e.oxw(2);e.Q6J("src","assets/demo/images/product/"+t.product.image,e.LSH)("alt",t.product.image)}}function ne(n,o){if(1&n&&(e.TgZ(0,"span"),e._uU(1),e.qZA()),2&n){const t=e.oxw(3);e.Tol("product-badge status-"+t.product.inventoryStatus.toString().toLowerCase()),e.xp6(1),e.Oqu(t.product.inventoryStatus)}}function se(n,o){if(1&n&&e.YNc(0,ne,2,3,"span",77),2&n){const t=e.oxw(2);e.Q6J("ngIf",t.product&&t.product.inventoryStatus)}}function ie(n,o){if(1&n&&(e.TgZ(0,"span"),e._uU(1),e.qZA()),2&n){const t=o.$implicit;e.Tol("product-badge status-"+t.value),e.xp6(1),e.Oqu(t.label)}}function oe(n,o){if(1&n){const t=e.EpF();e.YNc(0,te,1,2,"img",64),e.TgZ(1,"div",65)(2,"div",66)(3,"label",67),e._uU(4,"Vezet\xe9kn\xe9v"),e.qZA(),e.TgZ(5,"p-inputNumber",68),e.NdJ("ngModelChange",function(i){e.CHM(t);const a=e.oxw();return e.KtG(a.product.price=i)}),e.qZA()(),e.TgZ(6,"div",66)(7,"label",69),e._uU(8,"Keresztn\xe9v"),e.qZA(),e.TgZ(9,"p-inputNumber",70),e.NdJ("ngModelChange",function(i){e.CHM(t);const a=e.oxw();return e.KtG(a.product.quantity=i)}),e.qZA()()(),e.TgZ(10,"div",65)(11,"div",66)(12,"label",67),e._uU(13,"Szoba"),e.qZA(),e.TgZ(14,"p-inputNumber",68),e.NdJ("ngModelChange",function(i){e.CHM(t);const a=e.oxw();return e.KtG(a.product.price=i)}),e.qZA()(),e.TgZ(15,"div",66)(16,"label",69),e._uU(17,"\xc9trend"),e.qZA(),e.TgZ(18,"p-inputNumber",70),e.NdJ("ngModelChange",function(i){e.CHM(t);const a=e.oxw();return e.KtG(a.product.quantity=i)}),e.qZA()()(),e.TgZ(19,"div",71)(20,"label",72),e._uU(21,"\xc9trend"),e.qZA(),e.TgZ(22,"p-dropdown",73),e.NdJ("ngModelChange",function(i){e.CHM(t);const a=e.oxw();return e.KtG(a.product.inventoryStatus=i)}),e.YNc(23,se,1,1,"ng-template",74),e.YNc(24,ie,2,3,"ng-template",75),e.qZA()(),e.TgZ(25,"div",65)(26,"div",66)(27,"label",67),e._uU(28,"Gy\xfclekezet"),e.qZA(),e.TgZ(29,"p-inputNumber",68),e.NdJ("ngModelChange",function(i){e.CHM(t);const a=e.oxw();return e.KtG(a.product.price=i)}),e.qZA()(),e.TgZ(30,"div",66)(31,"label",69),e._uU(32,"Telefon"),e.qZA(),e.TgZ(33,"p-inputNumber",70),e.NdJ("ngModelChange",function(i){e.CHM(t);const a=e.oxw();return e.KtG(a.product.quantity=i)}),e.qZA()()(),e.TgZ(34,"div",65)(35,"div",66)(36,"label",67),e._uU(37,"\xc9rkez\xe9s"),e.qZA(),e.TgZ(38,"p-inputNumber",68),e.NdJ("ngModelChange",function(i){e.CHM(t);const a=e.oxw();return e.KtG(a.product.price=i)}),e.qZA()(),e.TgZ(39,"div",66)(40,"label",69),e._uU(41,"T\xe1voz\xe1s"),e.qZA(),e.TgZ(42,"p-inputNumber",70),e.NdJ("ngModelChange",function(i){e.CHM(t);const a=e.oxw();return e.KtG(a.product.quantity=i)}),e.qZA()()()}if(2&n){const t=e.oxw();e.Q6J("ngIf",t.product.image),e.xp6(5),e.Q6J("ngModel",t.product.price),e.xp6(4),e.Q6J("ngModel",t.product.quantity),e.xp6(5),e.Q6J("ngModel",t.product.price),e.xp6(4),e.Q6J("ngModel",t.product.quantity),e.xp6(4),e.Q6J("ngModel",t.product.inventoryStatus)("options",t.statuses),e.xp6(7),e.Q6J("ngModel",t.product.price),e.xp6(4),e.Q6J("ngModel",t.product.quantity),e.xp6(5),e.Q6J("ngModel",t.product.price),e.xp6(4),e.Q6J("ngModel",t.product.quantity)}}function ae(n,o){if(1&n){const t=e.EpF();e.TgZ(0,"button",78),e.NdJ("click",function(){e.CHM(t);const i=e.oxw();return e.KtG(i.hideDialog())}),e.qZA(),e.TgZ(1,"button",79),e.NdJ("click",function(){e.CHM(t);const i=e.oxw();return e.KtG(i.saveProduct())}),e.qZA()}}function le(n,o){if(1&n&&(e.TgZ(0,"span"),e._uU(1,"Biztosan t\xf6r\xf6lni akarja "),e.TgZ(2,"b"),e._uU(3),e.qZA(),e._uU(4,"?"),e.qZA()),2&n){const t=e.oxw();e.xp6(3),e.Oqu(t.product.name)}}function re(n,o){if(1&n){const t=e.EpF();e.TgZ(0,"button",80),e.NdJ("click",function(){e.CHM(t);const i=e.oxw();return e.KtG(i.deleteGuestDialog=!1)}),e.qZA(),e.TgZ(1,"button",81),e.NdJ("click",function(){e.CHM(t);const i=e.oxw();return e.KtG(i.confirmDelete())}),e.qZA()}}function ue(n,o){if(1&n){const t=e.EpF();e.TgZ(0,"button",80),e.NdJ("click",function(){e.CHM(t);const i=e.oxw();return e.KtG(i.deleteGuestsDialog=!1)}),e.qZA(),e.TgZ(1,"button",81),e.NdJ("click",function(){e.CHM(t);const i=e.oxw();return e.KtG(i.confirmDeleteSelected())}),e.qZA()}}function de(n,o){if(1&n){const t=e.EpF();e.TgZ(0,"p-messages",82),e.NdJ("valueChange",function(i){e.CHM(t);const a=e.oxw();return e.KtG(a.messages1=i)}),e.qZA(),e.TgZ(1,"div",65)(2,"div",66)(3,"label",83),e._uU(4,"C\xedmke azonos\xedt\xf3"),e.qZA(),e.TgZ(5,"input",84),e.NdJ("ngModelChange",function(i){e.CHM(t);const a=e.oxw();return e.KtG(a.scannedCode=i)}),e.qZA()()(),e.TgZ(6,"div",85)(7,"button",86),e.NdJ("click",function(){e.CHM(t);const i=e.oxw();return e.KtG(i.unAssignTag())}),e.qZA()()}if(2&n){const t=e.oxw();e.Q6J("value",t.messages1)("enableService",!1)("closable",!1),e.xp6(5),e.Q6J("ngModel",t.scannedCode),e.xp6(2),e.Q6J("disabled",!(null!=t.guest.rfid&&t.guest.rfid.length))}}function pe(n,o){if(1&n){const t=e.EpF();e.TgZ(0,"button",78),e.NdJ("click",function(){e.CHM(t);const i=e.oxw();return e.KtG(i.hideTagDialog())}),e.qZA(),e.TgZ(1,"button",79),e.NdJ("click",function(){e.CHM(t);const i=e.oxw();return e.KtG(i.save())}),e.qZA()}}const ge=function(){return{background:"linear-gradient(-225deg,#AC32E4 0%,#7918F2 48%,#4801FF 100%)"}},me=function(){return["firstName","lastName","rfid","roomNum","diet","birthDate","dateOfArrival","dateOfDeparture","firstMeal","lastMeal"]},b=function(){return{width:"450px"}};let C=class y{constructor(o,t){this.guestService=o,this.messageService=t,this.loading=!0,this.tag={},this.tagDialog=!1,this.productDialog=!1,this.deleteGuestDialog=!1,this.deleteGuestsDialog=!1,this.products=[],this.product={},this.guests=[],this.guest={},this.selectedGuests=[],this.submitted=!1,this.cols=[],this.statuses=[],this.rowsPerPageOptions=[20,50,100],this.tagColors=[],this.messages1=[],this.successfullMessage=[],this.scanTemp="",this.scannedCode="",this.expandedRows={}}ngOnInit(){this.guestsObs$=this.guestService.guestObs,this.guestsObs$.subscribe(o=>{this.loading=!1,o&&(this.guests=o.filter(t=>"G\xe1bris"!==t.lastName))}),this.loading=!0,this.guestService.getGuests(),this.serviceMessageObs$=this.guestService.serviceMessageObs,this.serviceMessageObs$.subscribe(o=>{this.loading=!1,o&&(this.messages1=this.successfullMessage)}),this.cols=[{field:"name",header:"N\xe9v"},{field:"roomNum",header:"Szoba"},{field:"diet",header:"\xc9trend"},{field:"rfid",header:"RFID"},{field:"lastRfidUsage",header:"RFID haszn\xe1lat"},{field:"dateOfArrival",header:"\xc9rkez\xe9s"},{field:"dateOfDeparture",header:"T\xe1voz\xe1s"}],this.tagColors=[{name:"fekete",code:"black"},{name:"s\xe1rga",code:"yellow"},{name:"piros",code:"red"},{name:"z\xf6ld",code:"green"},{name:"k\xe9k",code:"blue"}],this.statuses=[{label:"FOGLALHATO",value:"FOGLALHATO"},{label:"MAJDNEMTELE",value:"MAJDNEMTELE"},{label:"MEGTELT",value:"MEGTELT"}],this.guests=[{vezeteknev:"Szab\xf3",keresztnev:"D\xf3ra",szoba:"L13B",fizmod:"Banki",etrend:"veget\xe1ri\xe1nus",gyulekezet:"Golgota Budapest",nem:"n\u0151",email:"szabodora@gmail.com",telefon:"06201234567",szuldatum:"1989.01.01.",korcsoport:"18 \xe9v feletti",allampolgarsag:"HU",orszag:"Hungary",irsz:"2233",erkezesDate:"2022.08.07.",elsoEtkezes:"vacsora",tavozasDate:"2022.08.12.",utolsoEtkezes:"eb\xe9d",pentekEbed:"Igen, k\xe9rek",szallasTipus:"Apartman",szobaIgeny:"",babaAgy:"nem",tamogatas:"teljes",indok:"szervez\u0151"}]}expandAll(){this.expandedRows={}}collapseAll(){this.expandedRows={}}onRowExpand(o){}onRowCollapse(o){}openNew(){this.product={},this.submitted=!1,this.productDialog=!0}deleteSelectedGuests(){this.deleteGuestsDialog=!0}editProduct(o){this.product={...o},this.productDialog=!0}deleteGuest(o){this.deleteGuestDialog=!0,this.guest={...o}}confirmDeleteSelected(){this.loading=!0,this.deleteGuestsDialog=!1,this.guestService.deleteGuests(this.selectedGuests),this.guests=this.guests.filter(o=>!this.selectedGuests.includes(o)),this.messageService.add({severity:"success",summary:"Sikeres t\xf6rl\xe9s",detail:"Vend\xe9gek t\xf6r\xf6lve",life:3e3}),this.selectedGuests=[],this.loading=!1}confirmDelete(){this.loading=!0,this.deleteGuestDialog=!1,this.guests=this.guests.filter(o=>o.id!==this.guest.id),this.guestService.deleteGuest(this.guest),this.messageService.add({severity:"success",summary:"Sikeres t\xf6rl\xe9s",detail:"Vend\xe9g t\xf6r\xf6lve",life:3e3}),this.guest={},this.loading=!1}hideDialog(){this.productDialog=!1,this.submitted=!1}hideTagDialog(){this.tagDialog=!1,this.submitted=!1}saveProduct(){this.submitted=!0,this.product.name?.trim()&&(this.product.id?(this.product.inventoryStatus=this.product.inventoryStatus.value?this.product.inventoryStatus.value:this.product.inventoryStatus,this.products[this.findIndexById(this.product.id)]=this.product,this.messageService.add({severity:"success",summary:"Successful",detail:"Product Updated",life:3e3})):(this.product.id=this.createId(),this.product.code=this.createId(),this.product.image="product-placeholder.svg",this.product.inventoryStatus=this.product.inventoryStatus?this.product.inventoryStatus.value:"FOGLALHATO",this.products.push(this.product),this.messageService.add({severity:"success",summary:"Successful",detail:"Product Created",life:3e3})),this.products=[...this.products],this.productDialog=!1,this.product={})}findIndexById(o){let t=-1;for(let s=0;s<this.guests.length;s++)if(this.guests[s].id===o){t=s;break}return t}createId(){let o="";for(let s=0;s<5;s++)o+="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".charAt(Math.floor(62*Math.random()));return o}onGlobalFilter(o,t){o.filterGlobal(t.target.value,"contains")}assignTag(o){this.scanTemp="",this.scannedCode=this.guest.rfid||"",this.guest={...o},this.messages1=[{severity:"info",summary:"",detail:"Tartsa az RFID c\xedmk\xe9t az olvas\xf3hoz..."}],this.tagDialog=!0}unAssignTag(){this.guest.rfid="",this.guest.lastRfidUsage="",this.guestService.updateGuest(this.guest);let o=JSON.parse(JSON.stringify(this.guests));o[this.findIndexById(this.guest.id)]=this.guest,this.guests=o,this.submitted=!0,this.successfullMessage=[{severity:"success",summary:"",detail:"A c\xedmk\xe9t elt\xe1vol\xedtottuk a vend\xe9gt\u0151l!"}],setTimeout(()=>{this.tagDialog=!1},200)}save(){this.scannedCode&&(this.guest.rfid=this.scannedCode,this.guestService.updateGuest2(this.guest).subscribe(()=>{let o=JSON.parse(JSON.stringify(this.guests));o[this.findIndexById(this.guest.id)]=this.guest,this.guests=o,this.submitted=!0,this.scannedCode="",this.guest={},this.successfullMessage=[{severity:"success",summary:"",detail:"Sikeresen hozz\xe1rendelte a c\xedmk\xe9t a vend\xe9ghez!"}],setTimeout(()=>{this.tagDialog=!1},200)}))}getDietColor(o){switch(o){case"tejmentes":case"lakt\xf3zmentes":return"blue";case"glut\xe9nmentes":return"yellow";case"glut\xe9n-, lakt\xf3z-, tejmentes":return"red";case"veget\xe1ri\xe1nus":return"green";case"nem k\xe9r \xe9tkez\xe9st":return"silver";default:return"black"}}keyEvent(o){if("Enter"===o.key)this.scannedCode=this.scanTemp,this.scanTemp="",console.log("scannedCode",this.scannedCode);else if("\xf6"===o.key)this.scanTemp+="0";else{if(!/^[0-9]$/i.test(o.key))return;this.scanTemp+=o.key}}ngOnDestroy(){}static#e=this.\u0275fac=function(t){return new(t||y)(e.Y36(h.Q),e.Y36(u.ez))};static#t=this.\u0275cmp=e.Xpm({type:y,selectors:[["guests"]],hostBindings:function(t,s){1&t&&e.NdJ("keypress",function(a){return s.keyEvent(a)},!1,e.Jf7)},features:[e._Bn([u.ez])],decls:35,vars:36,consts:[[1,"grid"],[1,"col-12"],[1,"col-12","px-0"],[1,"flex","align-items-center","gap-2"],[1,"pi","pi-calendar",2,"font-size","1rem"],[1,"text-base"],[1,"card","px-0","py-0"],["dataKey","id","responsiveLayout","scroll","currentPageReportTemplate","{first} - {last} bejegyz\xe9s a(z) {totalRecords}-b\xf3l megjelen\xedt\xe9se","selectionMode","multiple",3,"value","rows","globalFilterFields","paginator","rowsPerPageOptions","showCurrentPageReport","selection","rowHover","expandedRowKeys","selectionChange","onRowExpand","onRowCollapse"],["dt",""],["pTemplate","caption"],["pTemplate","header"],["pTemplate","body"],["pTemplate","rowexpansion"],["header","Vend\xe9g adatai",1,"p-fluid",3,"visible","modal","visibleChange"],["pTemplate","content"],["pTemplate","footer"],["header","T\xf6rl\xe9s",3,"visible","modal","visibleChange"],[1,"flex","align-items-center","justify-content-center"],[1,"pi","pi-exclamation-triangle","mr-3",2,"font-size","2rem"],[4,"ngIf"],["header","Confirm",3,"visible","modal","visibleChange"],["header","RFID c\xedmke vend\xe9ghez rendel\xe9s",1,"p-fluid",3,"visible","modal","visibleChange"],[3,"autoZIndex","blocked"],[1,"flex","flex-column","md:flex-row","md:justify-content-between","md:align-items-center"],[1,"m-0"],[1,"block","mt-2","md:mt-0","p-input-icon-left"],[1,"pi","pi-search"],["pInputText","","type","text","placeholder","Keres\xe9s...",1,"w-full","sm:w-auto",3,"input"],[1,"block","mt-2","md:mt-0"],["pButton","","pRipple","","label","\xdaj","icon","pi pi-plus",1,"p-button-success","mr-2",3,"click"],["pButton","","pRipple","","label","T\xf6rl\xe9s","icon","pi pi-trash",1,"p-button-danger","mr-2",3,"disabled","click"],["pButton","","pRipple","","label","Export","icon","pi pi-upload",1,"p-button-help",3,"click"],[2,"width","3rem"],["pSortableColumn","lastName"],["field","lastName"],["pSortableColumn","roomNum"],["field","roomNum"],["pSortableColumn","diet"],["field","diet"],["pSortableColumn","rfid"],["field","rfid"],["pSortableColumn","lastRfidUsage"],["field","lastRfidUsage"],["pSortableColumn","dateOfArrival"],["field","dateOfArrival"],["pSortableColumn","dateOfDeparture"],["field","dateOfDeparture"],[3,"value"],["type","button","styleClass","p-button-rounded p-button-text","pRipple","",3,"pRowToggler","icon"],[2,"width","14%","min-width","10rem"],[1,"p-column-title"],["class","pi pi-tag",4,"ngIf"],[1,"text-center",2,"width","8%","min-width","6rem"],[2,"width","12%","min-width","9rem"],[2,"width","9%","min-width","8rem"],[1,"flex"],["pButton","","pRipple","","icon","pi pi-tags",1,"p-button-rounded","p-button-success","mr-2",3,"click"],["pButton","","pRipple","","icon","pi pi-pencil",1,"p-button-rounded","p-button-success","mr-2",3,"click"],["pButton","","pRipple","","icon","pi pi-trash",1,"p-button-rounded","p-button-warning",3,"click"],[1,"pi","pi-tag"],["colspan","10"],[1,"p-2"],["cellspacing","0","cellpadding","5"],[1,"font-medium"],["width","150","class","mt-0 mx-auto mb-5 block shadow-2",3,"src","alt",4,"ngIf"],[1,"formgrid","grid"],[1,"field","col"],["for","price"],["id","price","mode","currency","currency","USD","locale","en-US",3,"ngModel","ngModelChange"],["for","quantity"],["id","quantity",3,"ngModel","ngModelChange"],[1,"field"],["for","status"],["inputId","inventoryStatus","optionValue","label","placeholder","V\xe1lasszon \xe9trendet...",3,"ngModel","options","ngModelChange"],["pTemplate","selectedItem"],["pTemplate","item"],["width","150",1,"mt-0","mx-auto","mb-5","block","shadow-2",3,"src","alt"],[3,"class",4,"ngIf"],["pButton","","pRipple","","label","M\xe9gsem","icon","pi pi-times",1,"p-button-text",3,"click"],["pButton","","pRipple","","label","Ment\xe9s","icon","pi pi-check",1,"p-button-text",3,"click"],["pButton","","pRipple","","icon","pi pi-times","label","Nem",1,"p-button-text",3,"click"],["pButton","","pRipple","","icon","pi pi-check","label","Igen",1,"p-button-text",3,"click"],[3,"value","enableService","closable","valueChange"],["for","identifier"],["pInputText","","type","text","id","identifier","readonly","","autofocus","",3,"ngModel","ngModelChange"],[1,"text-center"],["pButton","","pRipple","","label","C\xedmke visszav\xe9tel","icon","pi pi-trash",1,"p-button-danger",3,"disabled","click"]],template:function(t,s){1&t&&(e.TgZ(0,"div",0)(1,"div",1)(2,"div",2)(3,"p-tag")(4,"div",3),e._UZ(5,"i",4),e.TgZ(6,"span",5),e._uU(7,"20240510-20240512 - Golgota N\u0151i h\xe9tv\xe9ge"),e.qZA()()()(),e.TgZ(8,"div",6),e._UZ(9,"p-toast"),e.TgZ(10,"p-table",7,8),e.NdJ("selectionChange",function(a){return s.selectedGuests=a})("onRowExpand",function(a){return s.onRowExpand(a)})("onRowCollapse",function(a){return s.onRowCollapse(a)}),e.YNc(12,Y,10,1,"ng-template",9),e.YNc(13,j,26,0,"ng-template",10),e.YNc(14,X,42,26,"ng-template",11),e.YNc(15,ee,50,12,"ng-template",12),e.qZA()(),e.TgZ(16,"p-dialog",13),e.NdJ("visibleChange",function(a){return s.productDialog=a}),e.YNc(17,oe,43,11,"ng-template",14),e.YNc(18,ae,2,0,"ng-template",15),e.qZA(),e.TgZ(19,"p-dialog",16),e.NdJ("visibleChange",function(a){return s.deleteGuestDialog=a}),e.TgZ(20,"div",17),e._UZ(21,"i",18),e.YNc(22,le,5,1,"span",19),e.qZA(),e.YNc(23,re,2,0,"ng-template",15),e.qZA(),e.TgZ(24,"p-dialog",20),e.NdJ("visibleChange",function(a){return s.deleteGuestsDialog=a}),e.TgZ(25,"div",17),e._UZ(26,"i",18),e.TgZ(27,"span"),e._uU(28,"Biztosan t\xf6r\xf6lni akarja a kiv\xe1lasztott vend\xe9geket?"),e.qZA()(),e.YNc(29,ue,2,0,"ng-template",15),e.qZA(),e.TgZ(30,"p-dialog",21),e.NdJ("visibleChange",function(a){return s.tagDialog=a}),e.YNc(31,de,8,5,"ng-template",14),e.YNc(32,pe,2,0,"ng-template",15),e.qZA()()(),e.TgZ(33,"p-blockUI",22),e._UZ(34,"p-progressSpinner"),e.qZA()),2&t&&(e.xp6(3),e.Akn(e.DdM(30,ge)),e.xp6(7),e.Q6J("value",s.guests)("rows",20)("globalFilterFields",e.DdM(31,me))("paginator",!0)("rowsPerPageOptions",s.rowsPerPageOptions)("showCurrentPageReport",!0)("selection",s.selectedGuests)("rowHover",!0)("expandedRowKeys",s.expandedRows),e.xp6(6),e.Akn(e.DdM(32,b)),e.Q6J("visible",s.productDialog)("modal",!0),e.xp6(3),e.Akn(e.DdM(33,b)),e.Q6J("visible",s.deleteGuestDialog)("modal",!0),e.xp6(3),e.Q6J("ngIf",s.product),e.xp6(2),e.Akn(e.DdM(34,b)),e.Q6J("visible",s.deleteGuestsDialog)("modal",!0),e.xp6(6),e.Akn(e.DdM(35,b)),e.Q6J("visible",s.tagDialog)("modal",!0),e.xp6(3),e.Q6J("autoZIndex",!0)("blocked",s.loading))},dependencies:[r.O5,p.iA,u.jx,p.lQ,p.jB,p.fz,p.UA,p.Mo,Z.Hq,Z.zx,G.V,m.Fj,m.JJ,m.On,A.H,M.FN,E.o,U.Lt,D.Rn,N.V,R,L,z.V,r.uU],encapsulation:2})};C=(0,k.gn)([function d(n){var o=void 0===n?{}:n,t=o.blackList,s=void 0===t?[]:t,i=o.arrayName,a=void 0===i?"":i,c=o.event,w=void 0===c?"ngOnDestroy":c;return function(T){var x=T.prototype[w];if(!f(x))throw new Error(T.name+" is using @AutoUnsubscribe but does not implement OnDestroy");T.prototype[w]=function(){if(f(x)&&x.apply(this,arguments),a)!function(n){Array.isArray(n)&&n.forEach(g)}(this[a]);else for(var I in this)s.includes(I)||g(this[I])}}}()],C);let he=(()=>{class n{static#e=this.\u0275fac=function(s){return new(s||n)};static#t=this.\u0275mod=e.oAB({type:n});static#n=this.\u0275inj=e.cJS({imports:[_.Bz.forChild([{path:"",component:C}]),_.Bz]})}return n})();var _e=l(3722),fe=l(6340),ve=l(6022),be=l(6218),ke=l(1865),Ze=l(3514);let Ce=(()=>{class n{static#e=this.\u0275fac=function(s){return new(s||n)};static#t=this.\u0275mod=e.oAB({type:n});static#n=this.\u0275inj=e.cJS({imports:[r.ez,he,p.U$,_e.O,m.u5,Z.hJ,A.T,M.EV,fe.V,ve.Xt,E.j,be.A,U.kW,ke.cc,D.L$,N.S,O,P,z.W,Ze.dp]})}return n})()},6218:(J,v,l)=>{l.d(v,{A:()=>f,g:()=>k});var r=l(9468),m=l(6814),_=l(95);let k=(()=>{class g{el;ngModel;control;cd;autoResize;onResize=new r.vpe;filled;cachedScrollHeight;ngModelSubscription;ngControlSubscription;constructor(d,u,e,h){this.el=d,this.ngModel=u,this.control=e,this.cd=h}ngOnInit(){this.ngModel&&(this.ngModelSubscription=this.ngModel.valueChanges.subscribe(()=>{this.updateState()})),this.control&&(this.ngControlSubscription=this.control.valueChanges.subscribe(()=>{this.updateState()}))}ngAfterViewInit(){this.autoResize&&this.resize(),this.updateFilledState(),this.cd.detectChanges()}onInput(d){this.updateState()}updateFilledState(){this.filled=this.el.nativeElement.value&&this.el.nativeElement.value.length}onFocus(d){this.autoResize&&this.resize(d)}onBlur(d){this.autoResize&&this.resize(d)}resize(d){this.el.nativeElement.style.height="auto",this.el.nativeElement.style.height=this.el.nativeElement.scrollHeight+"px",parseFloat(this.el.nativeElement.style.height)>=parseFloat(this.el.nativeElement.style.maxHeight)?(this.el.nativeElement.style.overflowY="scroll",this.el.nativeElement.style.height=this.el.nativeElement.style.maxHeight):this.el.nativeElement.style.overflow="hidden",this.onResize.emit(d||{})}updateState(){this.updateFilledState(),this.autoResize&&this.resize()}ngOnDestroy(){this.ngModelSubscription&&this.ngModelSubscription.unsubscribe(),this.ngControlSubscription&&this.ngControlSubscription.unsubscribe()}static \u0275fac=function(u){return new(u||g)(r.Y36(r.SBq),r.Y36(_.On,8),r.Y36(_.a5,8),r.Y36(r.sBO))};static \u0275dir=r.lG2({type:g,selectors:[["","pInputTextarea",""]],hostAttrs:[1,"p-inputtextarea","p-inputtext","p-component","p-element"],hostVars:4,hostBindings:function(u,e){1&u&&r.NdJ("input",function(p){return e.onInput(p)})("focus",function(p){return e.onFocus(p)})("blur",function(p){return e.onBlur(p)}),2&u&&r.ekj("p-filled",e.filled)("p-inputtextarea-resizable",e.autoResize)},inputs:{autoResize:"autoResize"},outputs:{onResize:"onResize"}})}return g})(),f=(()=>{class g{static \u0275fac=function(u){return new(u||g)};static \u0275mod=r.oAB({type:g});static \u0275inj=r.cJS({imports:[m.ez]})}return g})()}}]);