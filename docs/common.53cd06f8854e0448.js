"use strict";(self.webpackChunknfc_reserve=self.webpackChunknfc_reserve||[]).push([[8592],{7744:(x,y,a)=>{a.d(y,{T:()=>d});var t=a(5879),e=a(9862);let d=(()=>{class _{constructor(i){this.http=i}getCountries(){return this.http.get("assets/demo/data/countries.json").toPromise().then(i=>i.data).then(i=>i)}static#e=this.\u0275fac=function(C){return new(C||_)(t.LFG(e.eN))};static#t=this.\u0275prov=t.Yz7({token:_,factory:_.\u0275fac,providedIn:"root"})}return _})()},8140:(x,y,a)=>{a.d(y,{v:()=>d});var t=a(5879),e=a(9862);let d=(()=>{class _{constructor(i){this.http=i}getCustomersSmall(){return this.http.get("assets/demo/data/customers-small.json").toPromise().then(i=>i.data).then(i=>i)}getCustomersMedium(){return this.http.get("assets/demo/data/customers-medium.json").toPromise().then(i=>i.data).then(i=>i)}getCustomersLarge(){return this.http.get("assets/demo/data/customers-large.json").toPromise().then(i=>i.data).then(i=>i)}static#e=this.\u0275fac=function(C){return new(C||_)(t.LFG(e.eN))};static#t=this.\u0275prov=t.Yz7({token:_,factory:_.\u0275fac,providedIn:"root"})}return _})()},7159:(x,y,a)=>{a.d(y,{F:()=>_});var t=a(5619),e=a(5879),d=a(8814);let _=(()=>{class v{constructor(C){this.apiService=C,this.dietData$=new t.X(null),this.serviceMessage$=new t.X(null)}get dietObs(){return this.dietData$.asObservable()}get serviceMessageObs(){return this.serviceMessage$.asObservable()}getDiets(C,r,p){let o="";""!==p&&(o=""!=p.sortField?`?sort=${p.sortField}&order=${1===p.sortOrder?"ASC":"DESC"}`:""),this.apiService.get(`diet/get/${""!==o?0:C}/${r}${o}`).subscribe({next:u=>{this.dataCache=u.rows?u.rows:null,this.dietData$.next(u)},error:u=>{this.serviceMessage$.next(u)}})}getDietColor(C){let r="";return this.dataCache.map(p=>{C?.toLowerCase()==p.name?.toLowerCase()&&(r=p.color??"")}),r}static#e=this.\u0275fac=function(r){return new(r||v)(e.LFG(d.s))};static#t=this.\u0275prov=e.Yz7({token:v,factory:v.\u0275fac,providedIn:"root"})}return v})()},981:(x,y,a)=>{a.d(y,{M:()=>d});var t=a(5879),e=a(9862);let d=(()=>{class _{constructor(i){this.http=i}getProductsSmall(){return this.http.get("assets/demo/data/products-small.json").toPromise().then(i=>i.data).then(i=>i)}getProducts(){return this.http.get("assets/demo/data/products.json").toPromise().then(i=>i.data).then(i=>i)}getProductsMixed(){return this.http.get("assets/demo/data/products-mixed.json").toPromise().then(i=>i.data).then(i=>i)}getProductsWithOrdersSmall(){return this.http.get("assets/demo/data/products-orders-small.json").toPromise().then(i=>i.data).then(i=>i)}getProductsWithOrdersLarge(){return this.http.get("assets/demo/data/products-orders.json").toPromise().then(i=>i.data).then(i=>i)}static#e=this.\u0275fac=function(C){return new(C||_)(t.LFG(e.eN))};static#t=this.\u0275prov=t.Yz7({token:_,factory:_.\u0275fac,providedIn:"root"})}return _})()},4532:(x,y,a)=>{a.d(y,{Z:()=>E,d:()=>D});var t=a(6814),e=a(5879),d=a(5219);function _(m,g){1&m&&e.GkF(0)}function v(m,g){if(1&m&&(e.TgZ(0,"div",8),e.Hsn(1,1),e.YNc(2,_,1,0,"ng-container",6),e.qZA()),2&m){const f=e.oxw();e.xp6(2),e.Q6J("ngTemplateOutlet",f.headerTemplate)}}function i(m,g){1&m&&e.GkF(0)}function C(m,g){if(1&m&&(e.TgZ(0,"div",9),e._uU(1),e.YNc(2,i,1,0,"ng-container",6),e.qZA()),2&m){const f=e.oxw();e.xp6(1),e.hij(" ",f.header," "),e.xp6(1),e.Q6J("ngTemplateOutlet",f.titleTemplate)}}function r(m,g){1&m&&e.GkF(0)}function p(m,g){if(1&m&&(e.TgZ(0,"div",10),e._uU(1),e.YNc(2,r,1,0,"ng-container",6),e.qZA()),2&m){const f=e.oxw();e.xp6(1),e.hij(" ",f.subheader," "),e.xp6(1),e.Q6J("ngTemplateOutlet",f.subtitleTemplate)}}function o(m,g){1&m&&e.GkF(0)}function u(m,g){1&m&&e.GkF(0)}function h(m,g){if(1&m&&(e.TgZ(0,"div",11),e.Hsn(1,2),e.YNc(2,u,1,0,"ng-container",6),e.qZA()),2&m){const f=e.oxw();e.xp6(2),e.Q6J("ngTemplateOutlet",f.footerTemplate)}}const b=["*",[["p-header"]],[["p-footer"]]],M=["*","p-header","p-footer"];let E=(()=>{class m{el;header;subheader;style;styleClass;headerFacet;footerFacet;templates;headerTemplate;titleTemplate;subtitleTemplate;contentTemplate;footerTemplate;constructor(f){this.el=f}ngAfterContentInit(){this.templates.forEach(f=>{switch(f.getType()){case"header":this.headerTemplate=f.template;break;case"title":this.titleTemplate=f.template;break;case"subtitle":this.subtitleTemplate=f.template;break;case"content":default:this.contentTemplate=f.template;break;case"footer":this.footerTemplate=f.template}})}getBlockableElement(){return this.el.nativeElement.children[0]}static \u0275fac=function(n){return new(n||m)(e.Y36(e.SBq))};static \u0275cmp=e.Xpm({type:m,selectors:[["p-card"]],contentQueries:function(n,c,s){if(1&n&&(e.Suo(s,d.h4,5),e.Suo(s,d.$_,5),e.Suo(s,d.jx,4)),2&n){let l;e.iGM(l=e.CRH())&&(c.headerFacet=l.first),e.iGM(l=e.CRH())&&(c.footerFacet=l.first),e.iGM(l=e.CRH())&&(c.templates=l)}},hostAttrs:[1,"p-element"],inputs:{header:"header",subheader:"subheader",style:"style",styleClass:"styleClass"},ngContentSelectors:M,decls:9,vars:9,consts:[[3,"ngClass","ngStyle"],["class","p-card-header",4,"ngIf"],[1,"p-card-body"],["class","p-card-title",4,"ngIf"],["class","p-card-subtitle",4,"ngIf"],[1,"p-card-content"],[4,"ngTemplateOutlet"],["class","p-card-footer",4,"ngIf"],[1,"p-card-header"],[1,"p-card-title"],[1,"p-card-subtitle"],[1,"p-card-footer"]],template:function(n,c){1&n&&(e.F$t(b),e.TgZ(0,"div",0),e.YNc(1,v,3,1,"div",1),e.TgZ(2,"div",2),e.YNc(3,C,3,2,"div",3),e.YNc(4,p,3,2,"div",4),e.TgZ(5,"div",5),e.Hsn(6),e.YNc(7,o,1,0,"ng-container",6),e.qZA(),e.YNc(8,h,3,1,"div",7),e.qZA()()),2&n&&(e.Tol(c.styleClass),e.Q6J("ngClass","p-card p-component")("ngStyle",c.style),e.xp6(1),e.Q6J("ngIf",c.headerFacet||c.headerTemplate),e.xp6(2),e.Q6J("ngIf",c.header||c.titleTemplate),e.xp6(1),e.Q6J("ngIf",c.subheader||c.subtitleTemplate),e.xp6(3),e.Q6J("ngTemplateOutlet",c.contentTemplate),e.xp6(1),e.Q6J("ngIf",c.footerFacet||c.footerTemplate))},dependencies:[t.mk,t.O5,t.tP,t.PC],styles:[".p-card-header img{width:100%}\n"],encapsulation:2,changeDetection:0})}return m})(),D=(()=>{class m{static \u0275fac=function(n){return new(n||m)};static \u0275mod=e.oAB({type:m});static \u0275inj=e.cJS({imports:[t.ez,d.m8]})}return m})()},2169:(x,y,a)=>{a.d(y,{A:()=>g,o:()=>f});var t=a(6814),e=a(5879),d=a(5219),_=a(8468);function v(n,c){if(1&n){const s=e.EpF();e.TgZ(0,"img",6),e.NdJ("error",function(T){e.CHM(s);const w=e.oxw(2);return e.KtG(w.imageError(T))}),e.qZA()}if(2&n){const s=e.oxw(2);e.Q6J("src",s.image,e.LSH)}}function i(n,c){if(1&n&&e._UZ(0,"span",8),2&n){const s=e.oxw(3);e.Tol(s.icon),e.Q6J("ngClass","p-chip-icon")}}function C(n,c){if(1&n&&e.YNc(0,i,1,3,"span",7),2&n){const s=e.oxw(2);e.Q6J("ngIf",s.icon)}}function r(n,c){if(1&n&&(e.TgZ(0,"div",9),e._uU(1),e.qZA()),2&n){const s=e.oxw(2);e.xp6(1),e.Oqu(s.label)}}function p(n,c){if(1&n){const s=e.EpF();e.TgZ(0,"span",13),e.NdJ("click",function(T){e.CHM(s);const w=e.oxw(4);return e.KtG(w.close(T))})("keydown.enter",function(T){e.CHM(s);const w=e.oxw(4);return e.KtG(w.close(T))}),e.qZA()}if(2&n){const s=e.oxw(4);e.Tol(s.removeIcon),e.Q6J("ngClass","pi-chip-remove-icon")}}function o(n,c){if(1&n){const s=e.EpF();e.TgZ(0,"TimesCircleIcon",14),e.NdJ("click",function(T){e.CHM(s);const w=e.oxw(4);return e.KtG(w.close(T))})("keydown.enter",function(T){e.CHM(s);const w=e.oxw(4);return e.KtG(w.close(T))}),e.qZA()}2&n&&(e.Q6J("styleClass","pi-chip-remove-icon"),e.uIk("tabindex",0))}function u(n,c){if(1&n&&(e.ynx(0),e.YNc(1,p,1,3,"span",11),e.YNc(2,o,1,2,"TimesCircleIcon",12),e.BQk()),2&n){const s=e.oxw(3);e.xp6(1),e.Q6J("ngIf",s.removeIcon),e.xp6(1),e.Q6J("ngIf",!s.removeIcon)}}function h(n,c){}function b(n,c){1&n&&e.YNc(0,h,0,0,"ng-template")}function M(n,c){if(1&n){const s=e.EpF();e.TgZ(0,"span",15),e.NdJ("click",function(T){e.CHM(s);const w=e.oxw(3);return e.KtG(w.close(T))})("keydown.enter",function(T){e.CHM(s);const w=e.oxw(3);return e.KtG(w.close(T))}),e.YNc(1,b,1,0,null,16),e.qZA()}if(2&n){const s=e.oxw(3);e.xp6(1),e.Q6J("ngTemplateOutlet",s.removeIconTemplate)}}function E(n,c){if(1&n&&(e.ynx(0),e.YNc(1,u,3,2,"ng-container",5),e.YNc(2,M,2,1,"span",10),e.BQk()),2&n){const s=e.oxw(2);e.xp6(1),e.Q6J("ngIf",!s.removeIconTemplate),e.xp6(1),e.Q6J("ngIf",s.removeIconTemplate)}}function D(n,c){if(1&n&&(e.TgZ(0,"div",1),e.Hsn(1),e.YNc(2,v,1,1,"img",2),e.YNc(3,C,1,1,"ng-template",null,3,e.W1O),e.YNc(5,r,2,1,"div",4),e.YNc(6,E,3,2,"ng-container",5),e.qZA()),2&n){const s=e.MAs(4),l=e.oxw();e.Tol(l.styleClass),e.Q6J("ngClass",l.containerClass())("ngStyle",l.style),e.xp6(2),e.Q6J("ngIf",l.image)("ngIfElse",s),e.xp6(3),e.Q6J("ngIf",l.label),e.xp6(1),e.Q6J("ngIf",l.removable)}}const m=["*"];let g=(()=>{class n{label;icon;image;style;styleClass;removable=!1;removeIcon;onRemove=new e.vpe;onImageError=new e.vpe;visible=!0;removeIconTemplate;templates;ngAfterContentInit(){this.templates.forEach(s=>{s.getType(),this.removeIconTemplate=s.template})}containerClass(){return{"p-chip p-component":!0,"p-chip-image":null!=this.image}}close(s){this.visible=!1,this.onRemove.emit(s)}imageError(s){this.onImageError.emit(s)}static \u0275fac=function(l){return new(l||n)};static \u0275cmp=e.Xpm({type:n,selectors:[["p-chip"]],contentQueries:function(l,T,w){if(1&l&&e.Suo(w,d.jx,4),2&l){let k;e.iGM(k=e.CRH())&&(T.templates=k)}},hostAttrs:[1,"p-element"],inputs:{label:"label",icon:"icon",image:"image",style:"style",styleClass:"styleClass",removable:"removable",removeIcon:"removeIcon"},outputs:{onRemove:"onRemove",onImageError:"onImageError"},ngContentSelectors:m,decls:1,vars:1,consts:[[3,"ngClass","class","ngStyle",4,"ngIf"],[3,"ngClass","ngStyle"],[3,"src","error",4,"ngIf","ngIfElse"],["iconTemplate",""],["class","p-chip-text",4,"ngIf"],[4,"ngIf"],[3,"src","error"],[3,"class","ngClass",4,"ngIf"],[3,"ngClass"],[1,"p-chip-text"],["class","pi-chip-remove-icon",3,"click","keydown.enter",4,"ngIf"],["tabindex","0",3,"class","ngClass","click","keydown.enter",4,"ngIf"],[3,"styleClass","click","keydown.enter",4,"ngIf"],["tabindex","0",3,"ngClass","click","keydown.enter"],[3,"styleClass","click","keydown.enter"],[1,"pi-chip-remove-icon",3,"click","keydown.enter"],[4,"ngTemplateOutlet"]],template:function(l,T){1&l&&(e.F$t(),e.YNc(0,D,7,8,"div",0)),2&l&&e.Q6J("ngIf",T.visible)},dependencies:function(){return[t.mk,t.O5,t.tP,t.PC,_.x]},styles:[".p-chip{display:inline-flex;align-items:center}.p-chip-text,.p-chip-icon.pi,.pi-chip-remove-icon.pi{line-height:1.5}.pi-chip-remove-icon{cursor:pointer}.p-chip img{border-radius:50%}\n"],encapsulation:2,changeDetection:0})}return n})(),f=(()=>{class n{static \u0275fac=function(l){return new(l||n)};static \u0275mod=e.oAB({type:n});static \u0275inj=e.cJS({imports:[t.ez,_.x,d.m8,d.m8]})}return n})()},5359:(x,y,a)=>{a.d(y,{i:()=>_,x:()=>v});var t=a(5879),e=a(6814);const d=["*"];let _=(()=>{class i{style;styleClass;layout="horizontal";type="solid";align;containerClass(){return{"p-divider p-component":!0,"p-divider-horizontal":"horizontal"===this.layout,"p-divider-vertical":"vertical"===this.layout,"p-divider-solid":"solid"===this.type,"p-divider-dashed":"dashed"===this.type,"p-divider-dotted":"dotted"===this.type,"p-divider-left":"horizontal"===this.layout&&(!this.align||"left"===this.align),"p-divider-center":"horizontal"===this.layout&&"center"===this.align||"vertical"===this.layout&&(!this.align||"center"===this.align),"p-divider-right":"horizontal"===this.layout&&"right"===this.align,"p-divider-top":"vertical"===this.layout&&"top"===this.align,"p-divider-bottom":"vertical"===this.layout&&"bottom"===this.align}}static \u0275fac=function(p){return new(p||i)};static \u0275cmp=t.Xpm({type:i,selectors:[["p-divider"]],hostAttrs:[1,"p-element"],inputs:{style:"style",styleClass:"styleClass",layout:"layout",type:"type",align:"align"},ngContentSelectors:d,decls:3,vars:4,consts:[["role","separator",3,"ngClass","ngStyle"],[1,"p-divider-content"]],template:function(p,o){1&p&&(t.F$t(),t.TgZ(0,"div",0)(1,"div",1),t.Hsn(2),t.qZA()()),2&p&&(t.Tol(o.styleClass),t.Q6J("ngClass",o.containerClass())("ngStyle",o.style))},dependencies:[e.mk,e.PC],styles:['.p-divider-horizontal{display:flex;width:100%;position:relative;align-items:center}.p-divider-horizontal:before{position:absolute;display:block;top:50%;left:0;width:100%;content:""}.p-divider-horizontal.p-divider-left{justify-content:flex-start}.p-divider-horizontal.p-divider-right{justify-content:flex-end}.p-divider-horizontal.p-divider-center{justify-content:center}.p-divider-content{z-index:1}.p-divider-vertical{min-height:100%;margin:0 1rem;display:flex;position:relative;justify-content:center}.p-divider-vertical:before{position:absolute;display:block;top:0;left:50%;height:100%;content:""}.p-divider-vertical.p-divider-top{align-items:flex-start}.p-divider-vertical.p-divider-center{align-items:center}.p-divider-vertical.p-divider-bottom{align-items:flex-end}.p-divider-solid.p-divider-horizontal:before{border-top-style:solid}.p-divider-solid.p-divider-vertical:before{border-left-style:solid}.p-divider-dashed.p-divider-horizontal:before{border-top-style:dashed}.p-divider-dashed.p-divider-vertical:before{border-left-style:dashed}.p-divider-dotted.p-divider-horizontal:before{border-top-style:dotted}.p-divider-dotted.p-divider-horizontal:before{border-left-style:dotted}\n'],encapsulation:2,changeDetection:0})}return i})(),v=(()=>{class i{static \u0275fac=function(p){return new(p||i)};static \u0275mod=t.oAB({type:i});static \u0275inj=t.cJS({imports:[e.ez]})}return i})()},427:(x,y,a)=>{a.d(y,{t:()=>_});var t=a(5879),e=a(4713),d=a(2332);let _=(()=>{class v extends e.s{pathId;ngOnInit(){this.pathId="url(#"+(0,d.Th)()+")"}static \u0275fac=function(){let C;return function(p){return(C||(C=t.n5z(v)))(p||v)}}();static \u0275cmp=t.Xpm({type:v,selectors:[["HomeIcon"]],standalone:!0,features:[t.qOj,t.jDz],decls:6,vars:7,consts:[["width","14","height","14","viewBox","0 0 14 14","fill","none","xmlns","http://www.w3.org/2000/svg"],["fill-rule","evenodd","clip-rule","evenodd","d","M13.4175 6.79971C13.2874 6.80029 13.1608 6.75807 13.057 6.67955L12.4162 6.19913V12.6073C12.4141 12.7659 12.3502 12.9176 12.2379 13.0298C12.1257 13.142 11.9741 13.206 11.8154 13.208H8.61206C8.61179 13.208 8.61151 13.208 8.61123 13.2081C8.61095 13.208 8.61068 13.208 8.6104 13.208H5.41076C5.40952 13.208 5.40829 13.2081 5.40705 13.2081C5.40581 13.2081 5.40458 13.208 5.40334 13.208H2.20287C2.04418 13.206 1.89257 13.142 1.78035 13.0298C1.66813 12.9176 1.60416 12.7659 1.60209 12.6073V6.19914L0.961256 6.67955C0.833786 6.77515 0.673559 6.8162 0.515823 6.79367C0.358086 6.77114 0.215762 6.68686 0.120159 6.55939C0.0245566 6.43192 -0.0164931 6.2717 0.00604063 6.11396C0.0285744 5.95622 0.112846 5.8139 0.240316 5.7183L1.83796 4.52007L1.84689 4.51337L6.64868 0.912027C6.75267 0.834032 6.87915 0.79187 7.00915 0.79187C7.13914 0.79187 7.26562 0.834032 7.36962 0.912027L12.1719 4.51372L12.1799 4.51971L13.778 5.7183C13.8943 5.81278 13.9711 5.94732 13.9934 6.09553C14.0156 6.24373 13.9816 6.39489 13.8981 6.51934C13.8471 6.60184 13.7766 6.67054 13.6928 6.71942C13.609 6.76831 13.5144 6.79587 13.4175 6.79971ZM6.00783 12.0065H8.01045V7.60074H6.00783V12.0065ZM9.21201 12.0065V6.99995C9.20994 6.84126 9.14598 6.68965 9.03375 6.57743C8.92153 6.46521 8.76992 6.40124 8.61123 6.39917H5.40705C5.24836 6.40124 5.09675 6.46521 4.98453 6.57743C4.8723 6.68965 4.80834 6.84126 4.80627 6.99995V12.0065H2.80366V5.29836L7.00915 2.14564L11.2146 5.29836V12.0065H9.21201Z","fill","currentColor"],[3,"id"],["width","14","height","14","fill","white"]],template:function(r,p){1&r&&(t.O4$(),t.TgZ(0,"svg",0)(1,"g"),t._UZ(2,"path",1),t.qZA(),t.TgZ(3,"defs")(4,"clipPath",2),t._UZ(5,"rect",3),t.qZA()()()),2&r&&(t.Tol(p.getClassNames()),t.uIk("aria-label",p.ariaLabel)("aria-hidden",p.ariaHidden)("role",p.role),t.xp6(1),t.uIk("clip-path",p.pathId),t.xp6(3),t.Q6J("id",p.pathId))},encapsulation:2})}return v})()},6058:(x,y,a)=>{a.d(y,{dJ:()=>C,lH:()=>i});var t=a(5879),e=a(6814);function _(r,p){if(1&r&&(t.O4$(),t.TgZ(0,"text",5),t._uU(1),t.qZA()),2&r){const o=t.oxw();t.uIk("x",50)("y",57)("fill",o.textColor)("name",o.name),t.xp6(1),t.Oqu(o.valueToDisplay())}}const v={provide:a(6223).JU,useExisting:(0,t.Gpc)(()=>i),multi:!0};let i=(()=>{class r{document;renderer;cd;el;styleClass;style;valueColor="var(--primary-color, Black)";rangeColor="var(--surface-border, LightGray)";textColor="var(--text-color-secondary, Black)";valueTemplate="{value}";name;size=100;step=1;min=0;max=100;strokeWidth=14;disabled;showValue=!0;readonly=!1;onChange=new t.vpe;radius=40;midX=50;midY=50;minRadians=4*Math.PI/3;maxRadians=-Math.PI/3;value=0;windowMouseMoveListener;windowMouseUpListener;windowTouchMoveListener;windowTouchEndListener;onModelChange=()=>{};onModelTouched=()=>{};constructor(o,u,h,b){this.document=o,this.renderer=u,this.cd=h,this.el=b}mapRange(o,u,h,b,M){return(o-u)*(M-b)/(h-u)+b}onClick(o){!this.disabled&&!this.readonly&&this.updateValue(o.offsetX,o.offsetY)}updateValue(o,u){let M=Math.atan2(this.size/2-u,o-this.size/2),E=-Math.PI/2-Math.PI/6;this.updateModel(M,E)}updateModel(o,u){let h;if(o>this.maxRadians)h=this.mapRange(o,this.minRadians,this.maxRadians,this.min,this.max);else{if(!(o<u))return;h=this.mapRange(o+2*Math.PI,this.minRadians,this.maxRadians,this.min,this.max)}let b=Math.round((h-this.min)/this.step)*this.step+this.min;this.value=b,this.onModelChange(this.value),this.onChange.emit(this.value)}onMouseDown(o){if(!this.disabled&&!this.readonly){const u=this.document.defaultView||"window";this.windowMouseMoveListener=this.renderer.listen(u,"mousemove",this.onMouseMove.bind(this)),this.windowMouseUpListener=this.renderer.listen(u,"mouseup",this.onMouseUp.bind(this)),o.preventDefault()}}onMouseUp(o){!this.disabled&&!this.readonly&&(this.windowMouseMoveListener&&(this.windowMouseMoveListener(),this.windowMouseUpListener=null),this.windowMouseUpListener&&(this.windowMouseUpListener(),this.windowMouseMoveListener=null),o.preventDefault())}onTouchStart(o){if(!this.disabled&&!this.readonly){const u=this.document.defaultView||"window";this.windowTouchMoveListener=this.renderer.listen(u,"touchmove",this.onTouchMove.bind(this)),this.windowTouchEndListener=this.renderer.listen(u,"touchend",this.onTouchEnd.bind(this)),o.preventDefault()}}onTouchEnd(o){!this.disabled&&!this.readonly&&(this.windowTouchMoveListener&&this.windowTouchMoveListener(),this.windowTouchEndListener&&this.windowTouchEndListener(),this.windowTouchMoveListener=null,this.windowTouchEndListener=null,o.preventDefault())}onMouseMove(o){!this.disabled&&!this.readonly&&(this.updateValue(o.offsetX,o.offsetY),o.preventDefault())}onTouchMove(o){if(!this.disabled&&!this.readonly&&o instanceof TouchEvent&&1===o.touches.length){const u=this.el.nativeElement.children[0].getBoundingClientRect(),h=o.targetTouches.item(0);h&&this.updateValue(h.clientX-u.left,h.clientY-u.top)}}writeValue(o){this.value=o,this.cd.markForCheck()}registerOnChange(o){this.onModelChange=o}registerOnTouched(o){this.onModelTouched=o}setDisabledState(o){this.disabled=o,this.cd.markForCheck()}containerClass(){return{"p-knob p-component":!0,"p-disabled":this.disabled}}rangePath(){return`M ${this.minX()} ${this.minY()} A ${this.radius} ${this.radius} 0 1 1 ${this.maxX()} ${this.maxY()}`}valuePath(){return`M ${this.zeroX()} ${this.zeroY()} A ${this.radius} ${this.radius} 0 ${this.largeArc()} ${this.sweep()} ${this.valueX()} ${this.valueY()}`}zeroRadians(){return this.mapRange(this.min>0&&this.max>0?this.min:0,this.min,this.max,this.minRadians,this.maxRadians)}valueRadians(){return this.mapRange(this._value,this.min,this.max,this.minRadians,this.maxRadians)}minX(){return this.midX+Math.cos(this.minRadians)*this.radius}minY(){return this.midY-Math.sin(this.minRadians)*this.radius}maxX(){return this.midX+Math.cos(this.maxRadians)*this.radius}maxY(){return this.midY-Math.sin(this.maxRadians)*this.radius}zeroX(){return this.midX+Math.cos(this.zeroRadians())*this.radius}zeroY(){return this.midY-Math.sin(this.zeroRadians())*this.radius}valueX(){return this.midX+Math.cos(this.valueRadians())*this.radius}valueY(){return this.midY-Math.sin(this.valueRadians())*this.radius}largeArc(){return Math.abs(this.zeroRadians()-this.valueRadians())<Math.PI?0:1}sweep(){return this.valueRadians()>this.zeroRadians()?0:1}valueToDisplay(){return this.valueTemplate.replace("{value}",this._value.toString())}get _value(){return null!=this.value?this.value:this.min}static \u0275fac=function(u){return new(u||r)(t.Y36(e.K0),t.Y36(t.Qsj),t.Y36(t.sBO),t.Y36(t.SBq))};static \u0275cmp=t.Xpm({type:r,selectors:[["p-knob"]],hostAttrs:[1,"p-element"],inputs:{styleClass:"styleClass",style:"style",valueColor:"valueColor",rangeColor:"rangeColor",textColor:"textColor",valueTemplate:"valueTemplate",name:"name",size:"size",step:"step",min:"min",max:"max",strokeWidth:"strokeWidth",disabled:"disabled",showValue:"showValue",readonly:"readonly"},outputs:{onChange:"onChange"},features:[t._Bn([v])],decls:5,vars:15,consts:[[3,"ngClass","ngStyle"],["viewBox","0 0 100 100",3,"click","mousedown","mouseup","touchstart","touchend"],[1,"p-knob-range"],[1,"p-knob-value"],["text-anchor","middle","class","p-knob-text",4,"ngIf"],["text-anchor","middle",1,"p-knob-text"]],template:function(u,h){1&u&&(t.TgZ(0,"div",0),t.O4$(),t.TgZ(1,"svg",1),t.NdJ("click",function(M){return h.onClick(M)})("mousedown",function(M){return h.onMouseDown(M)})("mouseup",function(M){return h.onMouseUp(M)})("touchstart",function(M){return h.onTouchStart(M)})("touchend",function(M){return h.onTouchEnd(M)}),t._UZ(2,"path",2)(3,"path",3),t.YNc(4,_,2,5,"text",4),t.qZA()()),2&u&&(t.Tol(h.styleClass),t.Q6J("ngClass",h.containerClass())("ngStyle",h.style),t.xp6(1),t.Udp("width",h.size+"px")("height",h.size+"px"),t.xp6(1),t.uIk("d",h.rangePath())("stroke-width",h.strokeWidth)("stroke",h.rangeColor),t.xp6(1),t.uIk("d",h.valuePath())("stroke-width",h.strokeWidth)("stroke",h.valueColor),t.xp6(1),t.Q6J("ngIf",h.showValue))},dependencies:[e.mk,e.O5,e.PC],styles:["@keyframes dash-frame{to{stroke-dashoffset:0}}.p-knob-range{fill:none;transition:stroke .1s ease-in}.p-knob-value{animation-name:dash-frame;animation-fill-mode:forwards;fill:none}.p-knob-text{font-size:1.3rem;text-align:center}\n"],encapsulation:2,changeDetection:0})}return r})(),C=(()=>{class r{static \u0275fac=function(u){return new(u||r)};static \u0275mod=t.oAB({type:r});static \u0275inj=t.cJS({imports:[e.ez]})}return r})()},9937:(x,y,a)=>{a.d(y,{a:()=>D,l:()=>m});var t=a(6814),e=a(5879),d=a(5219),_=a(707),v=a(6005),i=a(315);const C=["container"],r=["defaultbtn"],p=["menu"];function o(g,f){1&g&&e.GkF(0)}function u(g,f){if(1&g){const n=e.EpF();e.ynx(0),e.TgZ(1,"button",9),e.NdJ("click",function(s){e.CHM(n);const l=e.oxw();return e.KtG(l.onDefaultButtonClick(s))}),e.YNc(2,o,1,0,"ng-container",6),e.qZA(),e.BQk()}if(2&g){const n=e.oxw();e.xp6(1),e.Q6J("icon",n.icon)("iconPos",n.iconPos)("disabled",n.disabled),e.uIk("tabindex",n.tabindex),e.xp6(1),e.Q6J("ngTemplateOutlet",n.contentTemplate)}}function h(g,f){if(1&g){const n=e.EpF();e.TgZ(0,"button",10,11),e.NdJ("click",function(s){e.CHM(n);const l=e.oxw();return e.KtG(l.onDefaultButtonClick(s))}),e.qZA()}if(2&g){const n=e.oxw();e.Q6J("icon",n.icon)("iconPos",n.iconPos)("label",n.label)("disabled",n.disabled),e.uIk("tabindex",n.tabindex)}}function b(g,f){1&g&&e._UZ(0,"ChevronDownIcon")}function M(g,f){}function E(g,f){1&g&&e.YNc(0,M,0,0,"ng-template")}let D=(()=>{class g{model;icon;iconPos="left";label;style;styleClass;menuStyle;menuStyleClass;disabled;tabindex;appendTo;dir;expandAriaLabel;showTransitionOptions=".12s cubic-bezier(0, 0, 0.2, 1)";hideTransitionOptions=".1s linear";onClick=new e.vpe;onDropdownClick=new e.vpe;containerViewChild;buttonViewChild;menu;templates;contentTemplate;dropdownIconTemplate;ngAfterContentInit(){this.templates?.forEach(n=>{switch(n.getType()){case"content":default:this.contentTemplate=n.template;break;case"dropdownicon":this.dropdownIconTemplate=n.template}})}onDefaultButtonClick(n){this.onClick.emit(n)}onDropdownButtonClick(n){this.onDropdownClick.emit(n),this.menu?.toggle({currentTarget:this.containerViewChild?.nativeElement,relativeAlign:null==this.appendTo})}static \u0275fac=function(c){return new(c||g)};static \u0275cmp=e.Xpm({type:g,selectors:[["p-splitButton"]],contentQueries:function(c,s,l){if(1&c&&e.Suo(l,d.jx,4),2&c){let T;e.iGM(T=e.CRH())&&(s.templates=T)}},viewQuery:function(c,s){if(1&c&&(e.Gf(C,5),e.Gf(r,5),e.Gf(p,5)),2&c){let l;e.iGM(l=e.CRH())&&(s.containerViewChild=l.first),e.iGM(l=e.CRH())&&(s.buttonViewChild=l.first),e.iGM(l=e.CRH())&&(s.menu=l.first)}},hostAttrs:[1,"p-element"],inputs:{model:"model",icon:"icon",iconPos:"iconPos",label:"label",style:"style",styleClass:"styleClass",menuStyle:"menuStyle",menuStyleClass:"menuStyleClass",disabled:"disabled",tabindex:"tabindex",appendTo:"appendTo",dir:"dir",expandAriaLabel:"expandAriaLabel",showTransitionOptions:"showTransitionOptions",hideTransitionOptions:"hideTransitionOptions"},outputs:{onClick:"onClick",onDropdownClick:"onDropdownClick"},decls:10,vars:18,consts:[[3,"ngClass","ngStyle"],["container",""],[4,"ngIf","ngIfElse"],["defaultButton",""],["type","button","pButton","",1,"p-splitbutton-menubutton","p-button-icon-only",3,"disabled","click"],[4,"ngIf"],[4,"ngTemplateOutlet"],[3,"popup","model","styleClass","appendTo","showTransitionOptions","hideTransitionOptions"],["menu",""],["type","button","pButton","",1,"p-splitbutton-defaultbutton",3,"icon","iconPos","disabled","click"],["type","button","pButton","",1,"p-splitbutton-defaultbutton",3,"icon","iconPos","label","disabled","click"],["defaultbtn",""]],template:function(c,s){if(1&c&&(e.TgZ(0,"div",0,1),e.YNc(2,u,3,5,"ng-container",2),e.YNc(3,h,2,5,"ng-template",null,3,e.W1O),e.TgZ(5,"button",4),e.NdJ("click",function(T){return s.onDropdownButtonClick(T)}),e.YNc(6,b,1,0,"ChevronDownIcon",5),e.YNc(7,E,1,0,null,6),e.qZA(),e._UZ(8,"p-tieredMenu",7,8),e.qZA()),2&c){const l=e.MAs(4);e.Tol(s.styleClass),e.Q6J("ngClass","p-splitbutton p-component")("ngStyle",s.style),e.xp6(2),e.Q6J("ngIf",s.contentTemplate)("ngIfElse",l),e.xp6(3),e.Q6J("disabled",s.disabled),e.uIk("aria-label",s.expandAriaLabel),e.xp6(1),e.Q6J("ngIf",!s.dropdownIconTemplate),e.xp6(1),e.Q6J("ngTemplateOutlet",s.dropdownIconTemplate),e.xp6(1),e.Akn(s.menuStyle),e.Q6J("popup",!0)("model",s.model)("styleClass",s.menuStyleClass)("appendTo",s.appendTo)("showTransitionOptions",s.showTransitionOptions)("hideTransitionOptions",s.hideTransitionOptions)}},dependencies:function(){return[t.mk,t.O5,t.tP,t.PC,_.Hq,i.yp,v.v]},styles:[".p-splitbutton{display:inline-flex;position:relative}.p-splitbutton .p-splitbutton-defaultbutton,.p-splitbutton.p-button-rounded>.p-splitbutton-defaultbutton.p-button,.p-splitbutton.p-button-outlined>.p-splitbutton-defaultbutton.p-button{flex:1 1 auto;border-top-right-radius:0;border-bottom-right-radius:0;border-right:0 none}.p-splitbutton-menubutton,.p-splitbutton.p-button-rounded>.p-splitbutton-menubutton.p-button,.p-splitbutton.p-button-outlined>.p-splitbutton-menubutton.p-button{display:flex;align-items:center;justify-content:center;border-top-left-radius:0;border-bottom-left-radius:0}.p-splitbutton .p-menu{min-width:100%}.p-fluid .p-splitbutton{display:flex}\n"],encapsulation:2,changeDetection:0})}return g})(),m=(()=>{class g{static \u0275fac=function(c){return new(c||g)};static \u0275mod=e.oAB({type:g});static \u0275inj=e.cJS({imports:[t.ez,_.hJ,i.QK,v.v,_.hJ,i.QK]})}return g})()},1913:(x,y,a)=>{a.d(y,{h:()=>_,l:()=>v});var t=a(6814),e=a(5879),d=a(2076);let _=(()=>{class i{el;renderer;zone;constructor(r,p,o){this.el=r,this.renderer=p,this.zone=o}selector;enterClass;enterActiveClass;enterToClass;leaveClass;leaveActiveClass;leaveToClass;hideOnOutsideClick;toggleClass;hideOnEscape;eventListener;documentClickListener;documentKeydownListener;target;enterListener;leaveListener;animating;clickListener(){this.target=this.resolveTarget(),this.toggleClass?this.toggle():null===this.target.offsetParent?this.enter():this.leave()}toggle(){d.p.hasClass(this.target,this.toggleClass)?d.p.removeClass(this.target,this.toggleClass):d.p.addClass(this.target,this.toggleClass)}enter(){this.enterActiveClass?this.animating||(this.animating=!0,"slidedown"===this.enterActiveClass&&(this.target.style.height="0px",d.p.removeClass(this.target,"hidden"),this.target.style.maxHeight=this.target.scrollHeight+"px",d.p.addClass(this.target,"hidden"),this.target.style.height=""),d.p.addClass(this.target,this.enterActiveClass),this.enterClass&&d.p.removeClass(this.target,this.enterClass),this.enterListener=this.renderer.listen(this.target,"animationend",()=>{d.p.removeClass(this.target,this.enterActiveClass),this.enterToClass&&d.p.addClass(this.target,this.enterToClass),this.enterListener&&this.enterListener(),"slidedown"===this.enterActiveClass&&(this.target.style.maxHeight=""),this.animating=!1})):(this.enterClass&&d.p.removeClass(this.target,this.enterClass),this.enterToClass&&d.p.addClass(this.target,this.enterToClass)),this.hideOnOutsideClick&&this.bindDocumentClickListener(),this.hideOnEscape&&this.bindDocumentKeydownListener()}leave(){this.leaveActiveClass?this.animating||(this.animating=!0,d.p.addClass(this.target,this.leaveActiveClass),this.leaveClass&&d.p.removeClass(this.target,this.leaveClass),this.leaveListener=this.renderer.listen(this.target,"animationend",()=>{d.p.removeClass(this.target,this.leaveActiveClass),this.leaveToClass&&d.p.addClass(this.target,this.leaveToClass),this.leaveListener&&this.leaveListener(),this.animating=!1})):(this.leaveClass&&d.p.removeClass(this.target,this.leaveClass),this.leaveToClass&&d.p.addClass(this.target,this.leaveToClass)),this.hideOnOutsideClick&&this.unbindDocumentClickListener(),this.hideOnEscape&&this.unbindDocumentKeydownListener()}resolveTarget(){if(this.target)return this.target;switch(this.selector){case"@next":return this.el.nativeElement.nextElementSibling;case"@prev":return this.el.nativeElement.previousElementSibling;case"@parent":return this.el.nativeElement.parentElement;case"@grandparent":return this.el.nativeElement.parentElement.parentElement;default:return document.querySelector(this.selector)}}bindDocumentClickListener(){this.documentClickListener||(this.documentClickListener=this.renderer.listen(this.el.nativeElement.ownerDocument,"click",r=>{this.isVisible()&&"static"!==getComputedStyle(this.target).getPropertyValue("position")?this.isOutsideClick(r)&&this.leave():this.unbindDocumentClickListener()}))}bindDocumentKeydownListener(){this.documentKeydownListener||this.zone.runOutsideAngular(()=>{this.documentKeydownListener=this.renderer.listen(this.el.nativeElement.ownerDocument,"keydown",r=>{const{key:p,keyCode:o,which:u}=r;(!this.isVisible()||"static"===getComputedStyle(this.target).getPropertyValue("position"))&&this.unbindDocumentKeydownListener(),this.isVisible()&&"Escape"===p&&27===o&&27===u&&this.leave()})})}isVisible(){return null!==this.target.offsetParent}isOutsideClick(r){return!this.el.nativeElement.isSameNode(r.target)&&!this.el.nativeElement.contains(r.target)&&!this.target.contains(r.target)}unbindDocumentClickListener(){this.documentClickListener&&(this.documentClickListener(),this.documentClickListener=null)}unbindDocumentKeydownListener(){this.documentKeydownListener&&(this.documentKeydownListener(),this.documentKeydownListener=null)}ngOnDestroy(){this.target=null,this.eventListener&&this.eventListener(),this.unbindDocumentClickListener(),this.unbindDocumentKeydownListener()}static \u0275fac=function(p){return new(p||i)(e.Y36(e.SBq),e.Y36(e.Qsj),e.Y36(e.R0b))};static \u0275dir=e.lG2({type:i,selectors:[["","pStyleClass",""]],hostAttrs:[1,"p-element"],hostBindings:function(p,o){1&p&&e.NdJ("click",function(h){return o.clickListener(h)})},inputs:{selector:["pStyleClass","selector"],enterClass:"enterClass",enterActiveClass:"enterActiveClass",enterToClass:"enterToClass",leaveClass:"leaveClass",leaveActiveClass:"leaveActiveClass",leaveToClass:"leaveToClass",hideOnOutsideClick:"hideOnOutsideClick",toggleClass:"toggleClass",hideOnEscape:"hideOnEscape"}})}return i})(),v=(()=>{class i{static \u0275fac=function(p){return new(p||i)};static \u0275mod=e.oAB({type:i});static \u0275inj=e.cJS({imports:[t.ez]})}return i})()}}]);