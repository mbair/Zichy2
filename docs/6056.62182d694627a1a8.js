"use strict";(self.webpackChunkZichy2=self.webpackChunkZichy2||[]).push([[6056],{6056:(f,r,i)=>{i.r(r),i.d(r,{ButtonDemoModule:()=>l});var d=i(6895),o=i(9624),t=i(1571),c=i(5593),g=i(1795),h=i(7463);class s{constructor(){this.items=[],this.loading=[!1,!1,!1,!1]}ngOnInit(){this.items=[{label:"Update",icon:"pi pi-refresh"},{label:"Delete",icon:"pi pi-times"},{label:"Angular.io",icon:"pi pi-info",url:"http://angular.io"},{separator:!0},{label:"Setup",icon:"pi pi-cog"}]}load(e){this.loading[e]=!0,setTimeout(()=>this.loading[e]=!1,1e3)}}s.\u0275fac=function(e){return new(e||s)},s.\u0275cmp=t.Xpm({type:s,selectors:[["ng-component"]],decls:140,vars:9,consts:[[1,"grid"],[1,"col-12","md:col-6"],[1,"card"],[1,"flex","flex-wrap","gap-2"],["pButton","","pRipple","","label","Submit"],["pButton","","pRipple","","label","Disabled","disabled","true"],["label","Link","styleClass","p-button-link"],["pButton","","pRipple","","type","button","label","Primary"],["pButton","","pRipple","","type","button","label","Secondary",1,"p-button-secondary"],["pButton","","pRipple","","type","button","label","Success",1,"p-button-success"],["pButton","","pRipple","","type","button","label","Info",1,"p-button-info"],["pButton","","pRipple","","type","button","label","Warning",1,"p-button-warning"],["pButton","","pRipple","","type","button","label","Help",1,"p-button-help"],["pButton","","pRipple","","type","button","label","Danger",1,"p-button-danger"],["pButton","","pRipple","","type","button","label","Primary",1,"p-button-text"],["pButton","","pRipple","","type","button","label","Secondary",1,"p-button-secondary","p-button-text"],["pButton","","pRipple","","type","button","label","Success",1,"p-button-success","p-button-text"],["pButton","","pRipple","","type","button","label","Info",1,"p-button-info","p-button-text"],["pButton","","pRipple","","type","button","label","Warning",1,"p-button-warning","p-button-text"],["pButton","","pRipple","","type","button","label","Help",1,"p-button-help","p-button-text"],["pButton","","pRipple","","type","button","label","Danger",1,"p-button-danger","p-button-text"],["pButton","","pRipple","","type","button","label","Plain",1,"p-button-text","p-button-plain"],["pButton","","pRipple","","type","button","label","Primary",1,"p-button-outlined"],["pButton","","pRipple","","type","button","label","Secondary",1,"p-button-outlined","p-button-secondary"],["pButton","","pRipple","","type","button","label","Success",1,"p-button-outlined","p-button-success"],["pButton","","pRipple","","type","button","label","Info",1,"p-button-outlined","p-button-info"],["pButton","","pRipple","","type","button","label","Warning",1,"p-button-outlined","p-button-warning"],["pButton","","pRipple","","type","button","label","Help",1,"p-button-outlined","p-button-help"],["pButton","","pRipple","","type","button","label","Danger",1,"p-button-outlined","p-button-danger"],[1,"p-buttonset"],["pButton","","pRipple","","label","Save","icon","pi pi-check"],["pButton","","pRipple","","label","Delete","icon","pi pi-trash"],["label","Save","icon","pi pi-plus","styleClass","p-button-info",3,"model"],["label","Save","icon","pi pi-plus","styleClass","p-button-success",3,"model"],["label","Save","icon","pi pi-plus","styleClass","p-button-warning",3,"model"],["label","Save","icon","pi pi-plus","styleClass","p-button-help",3,"model"],["label","Save","icon","pi pi-plus","styleClass","p-button-danger",3,"model"],["alt","logo","src","https://primefaces.org/primeng/assets/showcase/images/primeng-icon.svg",2,"width","1.5rem"],["styleClass","p-button-outlined"],[1,"ml-2","font-bold"],["pButton","","pRipple","","icon","pi pi-star-fill"],["pButton","","pRipple","","label","Submit","icon","pi pi-bookmark"],["pButton","","pRipple","","label","Submit","icon","pi pi-bookmark","iconPos","right"],["pButton","","pRipple","","type","button","label","Primary",1,"p-button-raised"],["pButton","","pRipple","","type","button","label","Secondary",1,"p-button-raised","p-button-secondary"],["pButton","","pRipple","","type","button","label","Success",1,"p-button-raised","p-button-success"],["pButton","","pRipple","","type","button","label","Info",1,"p-button-raised","p-button-info"],["pButton","","pRipple","","type","button","label","Warning",1,"p-button-raised","p-button-warning"],["pButton","","pRipple","","type","button","label","Help",1,"p-button-raised","p-button-help"],["pButton","","pRipple","","type","button","label","Danger",1,"p-button-raised","p-button-danger"],["pButton","","pRipple","","type","button","label","Primary",1,"p-button-rounded"],["pButton","","pRipple","","type","button","label","Secondary",1,"p-button-rounded","p-button-secondary"],["pButton","","pRipple","","type","button","label","Success",1,"p-button-rounded","p-button-success"],["pButton","","pRipple","","type","button","label","Info",1,"p-button-rounded","p-button-info"],["pButton","","pRipple","","type","button","label","Warning",1,"p-button-rounded","p-button-warning"],["pButton","","pRipple","","type","button","label","Help",1,"p-button-rounded","p-button-help"],["pButton","","pRipple","","type","button","label","Danger",1,"p-button-rounded","p-button-danger"],["pButton","","pRipple","","type","button","icon","pi pi-check",1,"p-button-rounded"],["pButton","","pRipple","","type","button","icon","pi pi-bookmark",1,"p-button-rounded","p-button-secondary"],["pButton","","pRipple","","type","button","icon","pi pi-search",1,"p-button-rounded","p-button-success"],["pButton","","pRipple","","type","button","icon","pi pi-user",1,"p-button-rounded","p-button-info"],["pButton","","pRipple","","type","button","icon","pi pi-bell",1,"p-button-rounded","p-button-warning"],["pButton","","pRipple","","type","button","icon","pi pi-heart",1,"p-button-rounded","p-button-help"],["pButton","","pRipple","","type","button","icon","pi pi-times",1,"p-button-rounded","p-button-danger"],["pButton","","pRipple","","type","button","icon","pi pi-check",1,"p-button-rounded","p-button-text"],["pButton","","pRipple","","type","button","icon","pi pi-bookmark",1,"p-button-rounded","p-button-secondary","p-button-text"],["pButton","","pRipple","","type","button","icon","pi pi-search",1,"p-button-rounded","p-button-success","p-button-text"],["pButton","","pRipple","","type","button","icon","pi pi-user",1,"p-button-rounded","p-button-info","p-button-text"],["pButton","","pRipple","","type","button","icon","pi pi-bell",1,"p-button-rounded","p-button-warning","p-button-text"],["pButton","","pRipple","","type","button","icon","pi pi-heart",1,"p-button-rounded","p-button-help","p-button-text"],["pButton","","pRipple","","type","button","icon","pi pi-times",1,"p-button-rounded","p-button-danger","p-button-text"],["pButton","","pRipple","","type","button","icon","pi pi-filter",1,"p-button-rounded","p-button-text","p-button-plain"],["pButton","","pRipple","","type","button","icon","pi pi-check",1,"p-button-rounded","p-button-outlined"],["pButton","","pRipple","","type","button","icon","pi pi-bookmark",1,"p-button-rounded","p-button-secondary","p-button-outlined"],["pButton","","pRipple","","type","button","icon","pi pi-search",1,"p-button-rounded","p-button-success","p-button-outlined"],["pButton","","pRipple","","type","button","icon","pi pi-user",1,"p-button-rounded","p-button-info","p-button-outlined"],["pButton","","pRipple","","type","button","icon","pi pi-bell",1,"p-button-rounded","p-button-warning","p-button-outlined"],["pButton","","pRipple","","type","button","icon","pi pi-heart",1,"p-button-rounded","p-button-help","p-button-outlined"],["pButton","","pRipple","","type","button","icon","pi pi-times",1,"p-button-rounded","p-button-danger","p-button-outlined"],["label","Search","icon","pi pi-search",3,"loading","onClick"],["label","Search","icon","pi pi-search","iconPos","right",3,"loading","onClick"],["icon","pi pi-search",3,"loading","onClick"],["label","Search",3,"loading","onClick"]],template:function(e,p){1&e&&(t.TgZ(0,"div",0)(1,"div",1)(2,"div",2)(3,"h5"),t._uU(4,"Default"),t.qZA(),t.TgZ(5,"div",3),t._UZ(6,"button",4)(7,"button",5)(8,"p-button",6),t.qZA()(),t.TgZ(9,"div",2)(10,"h5"),t._uU(11,"Severities"),t.qZA(),t.TgZ(12,"div",3),t._UZ(13,"button",7)(14,"button",8)(15,"button",9)(16,"button",10)(17,"button",11)(18,"button",12)(19,"button",13),t.qZA()(),t.TgZ(20,"div",2)(21,"h5"),t._uU(22,"Text"),t.qZA(),t.TgZ(23,"div",3),t._UZ(24,"button",14)(25,"button",15)(26,"button",16)(27,"button",17)(28,"button",18)(29,"button",19)(30,"button",20)(31,"button",21),t.qZA()(),t.TgZ(32,"div",2)(33,"h5"),t._uU(34,"Outlined"),t.qZA(),t.TgZ(35,"div",3),t._UZ(36,"button",22)(37,"button",23)(38,"button",24)(39,"button",25)(40,"button",26)(41,"button",27)(42,"button",28),t.qZA()(),t.TgZ(43,"div",2)(44,"h5"),t._uU(45,"Button Set"),t.qZA(),t.TgZ(46,"span",29),t._UZ(47,"button",30)(48,"button",31),t.qZA()(),t.TgZ(49,"div",2)(50,"h5"),t._uU(51,"SplitButton"),t.qZA(),t.TgZ(52,"div",3),t._UZ(53,"p-splitButton",32)(54,"p-splitButton",33)(55,"p-splitButton",34)(56,"p-splitButton",35)(57,"p-splitButton",36),t.qZA()(),t.TgZ(58,"div",2)(59,"h5"),t._uU(60,"Templating"),t.qZA(),t.TgZ(61,"div",3)(62,"p-button"),t._UZ(63,"img",37),t.qZA(),t.TgZ(64,"p-button",38),t._UZ(65,"img",37),t.TgZ(66,"span",39),t._uU(67,"PrimeNG"),t.qZA()()()()(),t.TgZ(68,"div",1)(69,"div",2)(70,"h5"),t._uU(71,"Icons"),t.qZA(),t.TgZ(72,"div",3),t._UZ(73,"button",40)(74,"button",41)(75,"button",42),t.qZA()(),t.TgZ(76,"div",2)(77,"h5"),t._uU(78,"Raised"),t.qZA(),t.TgZ(79,"div",3),t._UZ(80,"button",43)(81,"button",44)(82,"button",45)(83,"button",46)(84,"button",47)(85,"button",48)(86,"button",49),t.qZA()(),t.TgZ(87,"div",2)(88,"h5"),t._uU(89,"Rounded"),t.qZA(),t.TgZ(90,"div",3),t._UZ(91,"button",50)(92,"button",51)(93,"button",52)(94,"button",53)(95,"button",54)(96,"button",55)(97,"button",56),t.qZA()(),t.TgZ(98,"div",2)(99,"h5"),t._uU(100,"Rounded Icons"),t.qZA(),t.TgZ(101,"div",3),t._UZ(102,"button",57)(103,"button",58)(104,"button",59)(105,"button",60)(106,"button",61)(107,"button",62)(108,"button",63),t.qZA()(),t.TgZ(109,"div",2)(110,"h5"),t._uU(111,"Rounded Text"),t.qZA(),t.TgZ(112,"div",3),t._UZ(113,"button",64)(114,"button",65)(115,"button",66)(116,"button",67)(117,"button",68)(118,"button",69)(119,"button",70)(120,"button",71),t.qZA()(),t.TgZ(121,"div",2)(122,"h5"),t._uU(123,"Rounded Outlined"),t.qZA(),t.TgZ(124,"div",3),t._UZ(125,"button",72)(126,"button",73)(127,"button",74)(128,"button",75)(129,"button",76)(130,"button",77)(131,"button",78),t.qZA()(),t.TgZ(132,"div",2)(133,"h5"),t._uU(134,"Loading"),t.qZA(),t.TgZ(135,"div",3)(136,"p-button",79),t.NdJ("onClick",function(){return p.load(0)}),t.qZA(),t.TgZ(137,"p-button",80),t.NdJ("onClick",function(){return p.load(1)}),t.qZA(),t.TgZ(138,"p-button",81),t.NdJ("onClick",function(){return p.load(2)}),t.qZA(),t.TgZ(139,"p-button",82),t.NdJ("onClick",function(){return p.load(3)}),t.qZA()()()()()),2&e&&(t.xp6(53),t.Q6J("model",p.items),t.xp6(1),t.Q6J("model",p.items),t.xp6(1),t.Q6J("model",p.items),t.xp6(1),t.Q6J("model",p.items),t.xp6(1),t.Q6J("model",p.items),t.xp6(79),t.Q6J("loading",p.loading[0]),t.xp6(1),t.Q6J("loading",p.loading[1]),t.xp6(1),t.Q6J("loading",p.loading[2]),t.xp6(1),t.Q6J("loading",p.loading[3]))},dependencies:[c.Hq,c.zx,g.H,h.a],encapsulation:2});class b{}b.\u0275fac=function(e){return new(e||b)},b.\u0275mod=t.oAB({type:b}),b.\u0275inj=t.cJS({imports:[o.Bz.forChild([{path:"",component:s}]),o.Bz]});var y=i(1167);class l{}l.\u0275fac=function(e){return new(e||l)},l.\u0275mod=t.oAB({type:l}),l.\u0275inj=t.cJS({imports:[d.ez,b,c.hJ,g.T,h.l,y.KZ]})},1167:(f,r,i)=>{i.d(r,{CO:()=>l,KZ:()=>a});var d=i(6895),o=i(1571),t=i(433),c=i(1795);const g=function(e,p){return{"p-button-icon":!0,"p-button-icon-left":e,"p-button-icon-right":p}};function h(e,p){if(1&e&&o._UZ(0,"span",3),2&e){const n=o.oxw();o.Tol(n.checked?n.onIcon:n.offIcon),o.Q6J("ngClass",o.WLB(3,g,"left"===n.iconPos,"right"===n.iconPos))}}function s(e,p){if(1&e&&(o.TgZ(0,"span",4),o._uU(1),o.qZA()),2&e){const n=o.oxw();o.xp6(1),o.Oqu(n.checked?n.hasOnLabel?n.onLabel:"":n.hasOffLabel?n.offLabel:"")}}const b=function(e,p,n){return{"p-button p-togglebutton p-component":!0,"p-button-icon-only":e,"p-highlight":p,"p-disabled":n}},y={provide:t.JU,useExisting:(0,o.Gpc)(()=>l),multi:!0};let l=(()=>{class e{constructor(n){this.cd=n,this.iconPos="left",this.onChange=new o.vpe,this.checked=!1,this.onModelChange=()=>{},this.onModelTouched=()=>{}}toggle(n){this.disabled||(this.checked=!this.checked,this.onModelChange(this.checked),this.onModelTouched(),this.onChange.emit({originalEvent:n,checked:this.checked}),this.cd.markForCheck())}onBlur(){this.onModelTouched()}writeValue(n){this.checked=n,this.cd.markForCheck()}registerOnChange(n){this.onModelChange=n}registerOnTouched(n){this.onModelTouched=n}setDisabledState(n){this.disabled=n,this.cd.markForCheck()}get hasOnLabel(){return this.onLabel&&this.onLabel.length>0}get hasOffLabel(){return this.onLabel&&this.onLabel.length>0}}return e.\u0275fac=function(n){return new(n||e)(o.Y36(o.sBO))},e.\u0275cmp=o.Xpm({type:e,selectors:[["p-toggleButton"]],hostAttrs:[1,"p-element"],inputs:{onLabel:"onLabel",offLabel:"offLabel",onIcon:"onIcon",offIcon:"offIcon",ariaLabelledBy:"ariaLabelledBy",disabled:"disabled",style:"style",styleClass:"styleClass",inputId:"inputId",tabindex:"tabindex",iconPos:"iconPos"},outputs:{onChange:"onChange"},features:[o._Bn([y])],decls:3,vars:12,consts:[["role","checkbox","pRipple","",3,"ngClass","ngStyle","click","keydown.enter"],[3,"class","ngClass",4,"ngIf"],["class","p-button-label",4,"ngIf"],[3,"ngClass"],[1,"p-button-label"]],template:function(n,u){1&n&&(o.TgZ(0,"div",0),o.NdJ("click",function(m){return u.toggle(m)})("keydown.enter",function(m){return u.toggle(m)}),o.YNc(1,h,1,6,"span",1),o.YNc(2,s,2,1,"span",2),o.qZA()),2&n&&(o.Tol(u.styleClass),o.Q6J("ngClass",o.kEZ(8,b,u.onIcon&&u.offIcon&&!u.hasOnLabel&&!u.hasOffLabel,u.checked,u.disabled))("ngStyle",u.style),o.uIk("tabindex",u.disabled?null:"0")("aria-checked",u.checked),o.xp6(1),o.Q6J("ngIf",u.onIcon||u.offIcon),o.xp6(1),o.Q6J("ngIf",u.onLabel||u.offLabel))},dependencies:[d.mk,d.O5,d.PC,c.H],styles:['.p-button[_ngcontent-%COMP%]{margin:0;display:inline-flex;cursor:pointer;-webkit-user-select:none;user-select:none;align-items:center;vertical-align:bottom;text-align:center;overflow:hidden;position:relative}.p-button-label[_ngcontent-%COMP%]{flex:1 1 auto}.p-button-icon-right[_ngcontent-%COMP%]{order:1}.p-button[_ngcontent-%COMP%]:disabled{cursor:default}.p-button-icon-only[_ngcontent-%COMP%]{justify-content:center}.p-button-icon-only[_ngcontent-%COMP%]:after{content:"p";visibility:hidden;clip:rect(0 0 0 0);width:0}.p-button-vertical[_ngcontent-%COMP%]{flex-direction:column}.p-button-icon-bottom[_ngcontent-%COMP%]{order:2}.p-buttonset[_ngcontent-%COMP%]   .p-button[_ngcontent-%COMP%]{margin:0}.p-buttonset[_ngcontent-%COMP%]   .p-button[_ngcontent-%COMP%]:not(:last-child){border-right:0 none}.p-buttonset[_ngcontent-%COMP%]   .p-button[_ngcontent-%COMP%]:not(:first-of-type):not(:last-of-type){border-radius:0}.p-buttonset[_ngcontent-%COMP%]   .p-button[_ngcontent-%COMP%]:first-of-type{border-top-right-radius:0;border-bottom-right-radius:0}.p-buttonset[_ngcontent-%COMP%]   .p-button[_ngcontent-%COMP%]:last-of-type{border-top-left-radius:0;border-bottom-left-radius:0}.p-buttonset[_ngcontent-%COMP%]   .p-button[_ngcontent-%COMP%]:focus{position:relative;z-index:1}'],changeDetection:0}),e})(),a=(()=>{class e{}return e.\u0275fac=function(n){return new(n||e)},e.\u0275mod=o.oAB({type:e}),e.\u0275inj=o.cJS({imports:[d.ez,c.T]}),e})()}}]);