"use strict";(self.webpackChunkapollo_ng=self.webpackChunkapollo_ng||[]).push([[4170],{2752:(y,g,p)=>{p.r(g),p.d(g,{ButtonDemoModule:()=>f});var e=p(6814),n=p(2129),t=p(9468),a=p(707),h=p(4480),d=p(9937);let c=(()=>{class s{constructor(){this.items=[],this.loading=[!1,!1,!1,!1]}ngOnInit(){this.items=[{label:"Update",icon:"pi pi-refresh"},{label:"Delete",icon:"pi pi-times"},{label:"Angular.io",icon:"pi pi-info",url:"http://angular.io"},{separator:!0},{label:"Setup",icon:"pi pi-cog"}]}load(r){this.loading[r]=!0,setTimeout(()=>this.loading[r]=!1,1e3)}static#t=this.\u0275fac=function(o){return new(o||s)};static#n=this.\u0275cmp=t.Xpm({type:s,selectors:[["ng-component"]],decls:140,vars:9,consts:[[1,"grid"],[1,"col-12","md:col-6"],[1,"card"],[1,"flex","flex-wrap","gap-2"],["pButton","","pRipple","","label","Submit"],["pButton","","pRipple","","label","Disabled","disabled","true"],["label","Link","styleClass","p-button-link"],["pButton","","pRipple","","type","button","label","Primary"],["pButton","","pRipple","","type","button","label","Secondary",1,"p-button-secondary"],["pButton","","pRipple","","type","button","label","Success",1,"p-button-success"],["pButton","","pRipple","","type","button","label","Info",1,"p-button-info"],["pButton","","pRipple","","type","button","label","Warning",1,"p-button-warning"],["pButton","","pRipple","","type","button","label","Help",1,"p-button-help"],["pButton","","pRipple","","type","button","label","Danger",1,"p-button-danger"],["pButton","","pRipple","","type","button","label","Primary",1,"p-button-text"],["pButton","","pRipple","","type","button","label","Secondary",1,"p-button-secondary","p-button-text"],["pButton","","pRipple","","type","button","label","Success",1,"p-button-success","p-button-text"],["pButton","","pRipple","","type","button","label","Info",1,"p-button-info","p-button-text"],["pButton","","pRipple","","type","button","label","Warning",1,"p-button-warning","p-button-text"],["pButton","","pRipple","","type","button","label","Help",1,"p-button-help","p-button-text"],["pButton","","pRipple","","type","button","label","Danger",1,"p-button-danger","p-button-text"],["pButton","","pRipple","","type","button","label","Plain",1,"p-button-text","p-button-plain"],["pButton","","pRipple","","type","button","label","Primary",1,"p-button-outlined"],["pButton","","pRipple","","type","button","label","Secondary",1,"p-button-outlined","p-button-secondary"],["pButton","","pRipple","","type","button","label","Success",1,"p-button-outlined","p-button-success"],["pButton","","pRipple","","type","button","label","Info",1,"p-button-outlined","p-button-info"],["pButton","","pRipple","","type","button","label","Warning",1,"p-button-outlined","p-button-warning"],["pButton","","pRipple","","type","button","label","Help",1,"p-button-outlined","p-button-help"],["pButton","","pRipple","","type","button","label","Danger",1,"p-button-outlined","p-button-danger"],[1,"p-buttonset"],["pButton","","pRipple","","label","Save","icon","pi pi-check"],["pButton","","pRipple","","label","Delete","icon","pi pi-trash"],["label","Save","icon","pi pi-plus","styleClass","p-button-info",3,"model"],["label","Save","icon","pi pi-plus","styleClass","p-button-success",3,"model"],["label","Save","icon","pi pi-plus","styleClass","p-button-warning",3,"model"],["label","Save","icon","pi pi-plus","styleClass","p-button-help",3,"model"],["label","Save","icon","pi pi-plus","styleClass","p-button-danger",3,"model"],["alt","logo","src","https://primefaces.org/cdn/primeng/images/primeng-icon.svg",2,"width","1.5rem"],["styleClass","p-button-outlined"],[1,"ml-2","font-bold"],["pButton","","pRipple","","icon","pi pi-star-fill"],["pButton","","pRipple","","label","Submit","icon","pi pi-bookmark"],["pButton","","pRipple","","label","Submit","icon","pi pi-bookmark","iconPos","right"],["pButton","","pRipple","","type","button","label","Primary",1,"p-button-raised"],["pButton","","pRipple","","type","button","label","Secondary",1,"p-button-raised","p-button-secondary"],["pButton","","pRipple","","type","button","label","Success",1,"p-button-raised","p-button-success"],["pButton","","pRipple","","type","button","label","Info",1,"p-button-raised","p-button-info"],["pButton","","pRipple","","type","button","label","Warning",1,"p-button-raised","p-button-warning"],["pButton","","pRipple","","type","button","label","Help",1,"p-button-raised","p-button-help"],["pButton","","pRipple","","type","button","label","Danger",1,"p-button-raised","p-button-danger"],["pButton","","pRipple","","type","button","label","Primary",1,"p-button-rounded"],["pButton","","pRipple","","type","button","label","Secondary",1,"p-button-rounded","p-button-secondary"],["pButton","","pRipple","","type","button","label","Success",1,"p-button-rounded","p-button-success"],["pButton","","pRipple","","type","button","label","Info",1,"p-button-rounded","p-button-info"],["pButton","","pRipple","","type","button","label","Warning",1,"p-button-rounded","p-button-warning"],["pButton","","pRipple","","type","button","label","Help",1,"p-button-rounded","p-button-help"],["pButton","","pRipple","","type","button","label","Danger",1,"p-button-rounded","p-button-danger"],["pButton","","pRipple","","type","button","icon","pi pi-check",1,"p-button-rounded"],["pButton","","pRipple","","type","button","icon","pi pi-bookmark",1,"p-button-rounded","p-button-secondary"],["pButton","","pRipple","","type","button","icon","pi pi-search",1,"p-button-rounded","p-button-success"],["pButton","","pRipple","","type","button","icon","pi pi-user",1,"p-button-rounded","p-button-info"],["pButton","","pRipple","","type","button","icon","pi pi-bell",1,"p-button-rounded","p-button-warning"],["pButton","","pRipple","","type","button","icon","pi pi-heart",1,"p-button-rounded","p-button-help"],["pButton","","pRipple","","type","button","icon","pi pi-times",1,"p-button-rounded","p-button-danger"],["pButton","","pRipple","","type","button","icon","pi pi-check",1,"p-button-rounded","p-button-text"],["pButton","","pRipple","","type","button","icon","pi pi-bookmark",1,"p-button-rounded","p-button-secondary","p-button-text"],["pButton","","pRipple","","type","button","icon","pi pi-search",1,"p-button-rounded","p-button-success","p-button-text"],["pButton","","pRipple","","type","button","icon","pi pi-user",1,"p-button-rounded","p-button-info","p-button-text"],["pButton","","pRipple","","type","button","icon","pi pi-bell",1,"p-button-rounded","p-button-warning","p-button-text"],["pButton","","pRipple","","type","button","icon","pi pi-heart",1,"p-button-rounded","p-button-help","p-button-text"],["pButton","","pRipple","","type","button","icon","pi pi-times",1,"p-button-rounded","p-button-danger","p-button-text"],["pButton","","pRipple","","type","button","icon","pi pi-filter",1,"p-button-rounded","p-button-text","p-button-plain"],["pButton","","pRipple","","type","button","icon","pi pi-check",1,"p-button-rounded","p-button-outlined"],["pButton","","pRipple","","type","button","icon","pi pi-bookmark",1,"p-button-rounded","p-button-secondary","p-button-outlined"],["pButton","","pRipple","","type","button","icon","pi pi-search",1,"p-button-rounded","p-button-success","p-button-outlined"],["pButton","","pRipple","","type","button","icon","pi pi-user",1,"p-button-rounded","p-button-info","p-button-outlined"],["pButton","","pRipple","","type","button","icon","pi pi-bell",1,"p-button-rounded","p-button-warning","p-button-outlined"],["pButton","","pRipple","","type","button","icon","pi pi-heart",1,"p-button-rounded","p-button-help","p-button-outlined"],["pButton","","pRipple","","type","button","icon","pi pi-times",1,"p-button-rounded","p-button-danger","p-button-outlined"],["label","Search","icon","pi pi-search",3,"loading","onClick"],["label","Search","icon","pi pi-search","iconPos","right",3,"loading","onClick"],["icon","pi pi-search",3,"loading","onClick"],["label","Search",3,"loading","onClick"]],template:function(o,u){1&o&&(t.TgZ(0,"div",0)(1,"div",1)(2,"div",2)(3,"h5"),t._uU(4,"Default"),t.qZA(),t.TgZ(5,"div",3),t._UZ(6,"button",4)(7,"button",5)(8,"p-button",6),t.qZA()(),t.TgZ(9,"div",2)(10,"h5"),t._uU(11,"Severities"),t.qZA(),t.TgZ(12,"div",3),t._UZ(13,"button",7)(14,"button",8)(15,"button",9)(16,"button",10)(17,"button",11)(18,"button",12)(19,"button",13),t.qZA()(),t.TgZ(20,"div",2)(21,"h5"),t._uU(22,"Text"),t.qZA(),t.TgZ(23,"div",3),t._UZ(24,"button",14)(25,"button",15)(26,"button",16)(27,"button",17)(28,"button",18)(29,"button",19)(30,"button",20)(31,"button",21),t.qZA()(),t.TgZ(32,"div",2)(33,"h5"),t._uU(34,"Outlined"),t.qZA(),t.TgZ(35,"div",3),t._UZ(36,"button",22)(37,"button",23)(38,"button",24)(39,"button",25)(40,"button",26)(41,"button",27)(42,"button",28),t.qZA()(),t.TgZ(43,"div",2)(44,"h5"),t._uU(45,"Button Set"),t.qZA(),t.TgZ(46,"span",29),t._UZ(47,"button",30)(48,"button",31),t.qZA()(),t.TgZ(49,"div",2)(50,"h5"),t._uU(51,"SplitButton"),t.qZA(),t.TgZ(52,"div",3),t._UZ(53,"p-splitButton",32)(54,"p-splitButton",33)(55,"p-splitButton",34)(56,"p-splitButton",35)(57,"p-splitButton",36),t.qZA()(),t.TgZ(58,"div",2)(59,"h5"),t._uU(60,"Templating"),t.qZA(),t.TgZ(61,"div",3)(62,"p-button"),t._UZ(63,"img",37),t.qZA(),t.TgZ(64,"p-button",38),t._UZ(65,"img",37),t.TgZ(66,"span",39),t._uU(67,"PrimeNG"),t.qZA()()()()(),t.TgZ(68,"div",1)(69,"div",2)(70,"h5"),t._uU(71,"Icons"),t.qZA(),t.TgZ(72,"div",3),t._UZ(73,"button",40)(74,"button",41)(75,"button",42),t.qZA()(),t.TgZ(76,"div",2)(77,"h5"),t._uU(78,"Raised"),t.qZA(),t.TgZ(79,"div",3),t._UZ(80,"button",43)(81,"button",44)(82,"button",45)(83,"button",46)(84,"button",47)(85,"button",48)(86,"button",49),t.qZA()(),t.TgZ(87,"div",2)(88,"h5"),t._uU(89,"Rounded"),t.qZA(),t.TgZ(90,"div",3),t._UZ(91,"button",50)(92,"button",51)(93,"button",52)(94,"button",53)(95,"button",54)(96,"button",55)(97,"button",56),t.qZA()(),t.TgZ(98,"div",2)(99,"h5"),t._uU(100,"Rounded Icons"),t.qZA(),t.TgZ(101,"div",3),t._UZ(102,"button",57)(103,"button",58)(104,"button",59)(105,"button",60)(106,"button",61)(107,"button",62)(108,"button",63),t.qZA()(),t.TgZ(109,"div",2)(110,"h5"),t._uU(111,"Rounded Text"),t.qZA(),t.TgZ(112,"div",3),t._UZ(113,"button",64)(114,"button",65)(115,"button",66)(116,"button",67)(117,"button",68)(118,"button",69)(119,"button",70)(120,"button",71),t.qZA()(),t.TgZ(121,"div",2)(122,"h5"),t._uU(123,"Rounded Outlined"),t.qZA(),t.TgZ(124,"div",3),t._UZ(125,"button",72)(126,"button",73)(127,"button",74)(128,"button",75)(129,"button",76)(130,"button",77)(131,"button",78),t.qZA()(),t.TgZ(132,"div",2)(133,"h5"),t._uU(134,"Loading"),t.qZA(),t.TgZ(135,"div",3)(136,"p-button",79),t.NdJ("onClick",function(){return u.load(0)}),t.qZA(),t.TgZ(137,"p-button",80),t.NdJ("onClick",function(){return u.load(1)}),t.qZA(),t.TgZ(138,"p-button",81),t.NdJ("onClick",function(){return u.load(2)}),t.qZA(),t.TgZ(139,"p-button",82),t.NdJ("onClick",function(){return u.load(3)}),t.qZA()()()()()),2&o&&(t.xp6(53),t.Q6J("model",u.items),t.xp6(1),t.Q6J("model",u.items),t.xp6(1),t.Q6J("model",u.items),t.xp6(1),t.Q6J("model",u.items),t.xp6(1),t.Q6J("model",u.items),t.xp6(79),t.Q6J("loading",u.loading[0]),t.xp6(1),t.Q6J("loading",u.loading[1]),t.xp6(1),t.Q6J("loading",u.loading[2]),t.xp6(1),t.Q6J("loading",u.loading[3]))},dependencies:[a.Hq,a.zx,h.H,d.a],encapsulation:2})}return s})(),b=(()=>{class s{static#t=this.\u0275fac=function(o){return new(o||s)};static#n=this.\u0275mod=t.oAB({type:s});static#o=this.\u0275inj=t.cJS({imports:[n.Bz.forChild([{path:"",component:c}]),n.Bz]})}return s})();var m=p(6804);let f=(()=>{class s{static#t=this.\u0275fac=function(o){return new(o||s)};static#n=this.\u0275mod=t.oAB({type:s});static#o=this.\u0275inj=t.cJS({imports:[e.ez,b,a.hJ,h.T,d.l,m.KZ]})}return s})()},1239:(y,g,p)=>{p.d(g,{o:()=>t});var e=p(9468),n=p(4713);let t=(()=>{class a extends n.s{static \u0275fac=function(){let d;return function(b){return(d||(d=e.n5z(a)))(b||a)}}();static \u0275cmp=e.Xpm({type:a,selectors:[["AngleRightIcon"]],standalone:!0,features:[e.qOj,e.jDz],decls:2,vars:5,consts:[["width","14","height","14","viewBox","0 0 14 14","fill","none","xmlns","http://www.w3.org/2000/svg"],["d","M5.25 11.1728C5.14929 11.1694 5.05033 11.1455 4.9592 11.1025C4.86806 11.0595 4.78666 10.9984 4.72 10.9228C4.57955 10.7822 4.50066 10.5916 4.50066 10.3928C4.50066 10.1941 4.57955 10.0035 4.72 9.86283L7.72 6.86283L4.72 3.86283C4.66067 3.71882 4.64765 3.55991 4.68275 3.40816C4.71785 3.25642 4.79932 3.11936 4.91585 3.01602C5.03238 2.91268 5.17819 2.84819 5.33305 2.83149C5.4879 2.81479 5.64411 2.84671 5.78 2.92283L9.28 6.42283C9.42045 6.56346 9.49934 6.75408 9.49934 6.95283C9.49934 7.15158 9.42045 7.34221 9.28 7.48283L5.78 10.9228C5.71333 10.9984 5.63193 11.0595 5.5408 11.1025C5.44966 11.1455 5.35071 11.1694 5.25 11.1728Z","fill","currentColor"]],template:function(c,b){1&c&&(e.O4$(),e.TgZ(0,"svg",0),e._UZ(1,"path",1),e.qZA()),2&c&&(e.Tol(b.getClassNames()),e.uIk("aria-label",b.ariaLabel)("aria-hidden",b.ariaHidden)("role",b.role))},encapsulation:2})}return a})()},6005:(y,g,p)=>{p.d(g,{v:()=>t});var e=p(9468),n=p(4713);let t=(()=>{class a extends n.s{static \u0275fac=function(){let d;return function(b){return(d||(d=e.n5z(a)))(b||a)}}();static \u0275cmp=e.Xpm({type:a,selectors:[["ChevronDownIcon"]],standalone:!0,features:[e.qOj,e.jDz],decls:2,vars:5,consts:[["width","14","height","14","viewBox","0 0 14 14","fill","none","xmlns","http://www.w3.org/2000/svg"],["d","M7.01744 10.398C6.91269 10.3985 6.8089 10.378 6.71215 10.3379C6.61541 10.2977 6.52766 10.2386 6.45405 10.1641L1.13907 4.84913C1.03306 4.69404 0.985221 4.5065 1.00399 4.31958C1.02276 4.13266 1.10693 3.95838 1.24166 3.82747C1.37639 3.69655 1.55301 3.61742 1.74039 3.60402C1.92777 3.59062 2.11386 3.64382 2.26584 3.75424L7.01744 8.47394L11.769 3.75424C11.9189 3.65709 12.097 3.61306 12.2748 3.62921C12.4527 3.64535 12.6199 3.72073 12.7498 3.84328C12.8797 3.96582 12.9647 4.12842 12.9912 4.30502C13.0177 4.48162 12.9841 4.662 12.8958 4.81724L7.58083 10.1322C7.50996 10.2125 7.42344 10.2775 7.32656 10.3232C7.22968 10.3689 7.12449 10.3944 7.01744 10.398Z","fill","currentColor"]],template:function(c,b){1&c&&(e.O4$(),e.TgZ(0,"svg",0),e._UZ(1,"path",1),e.qZA()),2&c&&(e.Tol(b.getClassNames()),e.uIk("aria-label",b.ariaLabel)("aria-hidden",b.ariaHidden)("role",b.role))},encapsulation:2})}return a})()},6804:(y,g,p)=>{p.d(g,{CO:()=>f,KZ:()=>s});var e=p(6814),n=p(9468),t=p(95),a=p(4480);const h=function(l,r){return{"p-button-icon":!0,"p-button-icon-left":l,"p-button-icon-right":r}};function d(l,r){if(1&l&&n._UZ(0,"span",3),2&l){const o=n.oxw();n.Tol(o.checked?o.onIcon:o.offIcon),n.Q6J("ngClass",n.WLB(3,h,"left"===o.iconPos,"right"===o.iconPos))}}function c(l,r){if(1&l&&(n.TgZ(0,"span",4),n._uU(1),n.qZA()),2&l){const o=n.oxw();n.xp6(1),n.Oqu(o.checked?o.hasOnLabel?o.onLabel:"":o.hasOffLabel?o.offLabel:"")}}const b=function(l,r,o){return{"p-button p-togglebutton p-component":!0,"p-button-icon-only":l,"p-highlight":r,"p-disabled":o}},m={provide:t.JU,useExisting:(0,n.Gpc)(()=>f),multi:!0};let f=(()=>{class l{cd;onLabel;offLabel;onIcon;offIcon;ariaLabelledBy;disabled;style;styleClass;inputId;tabindex;iconPos="left";onChange=new n.vpe;checked=!1;onModelChange=()=>{};onModelTouched=()=>{};constructor(o){this.cd=o}toggle(o){this.disabled||(this.checked=!this.checked,this.onModelChange(this.checked),this.onModelTouched(),this.onChange.emit({originalEvent:o,checked:this.checked}),this.cd.markForCheck())}onBlur(){this.onModelTouched()}writeValue(o){this.checked=o,this.cd.markForCheck()}registerOnChange(o){this.onModelChange=o}registerOnTouched(o){this.onModelTouched=o}setDisabledState(o){this.disabled=o,this.cd.markForCheck()}get hasOnLabel(){return this.onLabel&&this.onLabel.length>0}get hasOffLabel(){return this.onLabel&&this.onLabel.length>0}static \u0275fac=function(u){return new(u||l)(n.Y36(n.sBO))};static \u0275cmp=n.Xpm({type:l,selectors:[["p-toggleButton"]],hostAttrs:[1,"p-element"],inputs:{onLabel:"onLabel",offLabel:"offLabel",onIcon:"onIcon",offIcon:"offIcon",ariaLabelledBy:"ariaLabelledBy",disabled:"disabled",style:"style",styleClass:"styleClass",inputId:"inputId",tabindex:"tabindex",iconPos:"iconPos"},outputs:{onChange:"onChange"},features:[n._Bn([m])],decls:3,vars:12,consts:[["role","checkbox","pRipple","",3,"ngClass","ngStyle","click","keydown.enter"],[3,"class","ngClass",4,"ngIf"],["class","p-button-label",4,"ngIf"],[3,"ngClass"],[1,"p-button-label"]],template:function(u,i){1&u&&(n.TgZ(0,"div",0),n.NdJ("click",function(_){return i.toggle(_)})("keydown.enter",function(_){return i.toggle(_)}),n.YNc(1,d,1,6,"span",1),n.YNc(2,c,2,1,"span",2),n.qZA()),2&u&&(n.Tol(i.styleClass),n.Q6J("ngClass",n.kEZ(8,b,i.onIcon&&i.offIcon&&!i.hasOnLabel&&!i.hasOffLabel,i.checked,i.disabled))("ngStyle",i.style),n.uIk("tabindex",i.disabled?null:"0")("aria-checked",i.checked),n.xp6(1),n.Q6J("ngIf",i.onIcon||i.offIcon),n.xp6(1),n.Q6J("ngIf",i.onLabel||i.offLabel))},dependencies:[e.mk,e.O5,e.PC,a.H],styles:['.p-button[_ngcontent-%COMP%]{margin:0;display:inline-flex;cursor:pointer;-webkit-user-select:none;user-select:none;align-items:center;vertical-align:bottom;text-align:center;overflow:hidden;position:relative}.p-button-label[_ngcontent-%COMP%]{flex:1 1 auto}.p-button-icon-right[_ngcontent-%COMP%]{order:1}.p-button[_ngcontent-%COMP%]:disabled{cursor:default;pointer-events:none}.p-button-icon-only[_ngcontent-%COMP%]{justify-content:center}.p-button-icon-only[_ngcontent-%COMP%]:after{content:"p";visibility:hidden;clip:rect(0 0 0 0);width:0}.p-button-vertical[_ngcontent-%COMP%]{flex-direction:column}.p-button-icon-bottom[_ngcontent-%COMP%]{order:2}.p-buttonset[_ngcontent-%COMP%]   .p-button[_ngcontent-%COMP%]{margin:0}.p-buttonset[_ngcontent-%COMP%]   .p-button[_ngcontent-%COMP%]:not(:last-child){border-right:0 none}.p-buttonset[_ngcontent-%COMP%]   .p-button[_ngcontent-%COMP%]:not(:first-of-type):not(:last-of-type){border-radius:0}.p-buttonset[_ngcontent-%COMP%]   .p-button[_ngcontent-%COMP%]:first-of-type{border-top-right-radius:0;border-bottom-right-radius:0}.p-buttonset[_ngcontent-%COMP%]   .p-button[_ngcontent-%COMP%]:last-of-type{border-top-left-radius:0;border-bottom-left-radius:0}.p-buttonset[_ngcontent-%COMP%]   .p-button[_ngcontent-%COMP%]:focus{position:relative;z-index:1}'],changeDetection:0})}return l})(),s=(()=>{class l{static \u0275fac=function(u){return new(u||l)};static \u0275mod=n.oAB({type:l});static \u0275inj=n.cJS({imports:[e.ez,a.T]})}return l})()}}]);