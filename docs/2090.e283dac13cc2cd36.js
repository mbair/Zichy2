"use strict";(self.webpackChunkapollo_ng=self.webpackChunkapollo_ng||[]).push([[2090],{2090:(k,u,n)=>{n.r(u),n.d(u,{BankingDashboardModule:()=>C});var s=n(6814),g=n(707),p=n(9552),d=n(7279),c=n(9252),Z=n(4480),f=n(6263),v=n(3259),x=n(2129),t=n(9468),h=n(3859),T=n(5219);function U(e,r){1&e&&(t.TgZ(0,"tr")(1,"th",73),t._uU(2,"Name"),t.qZA(),t.TgZ(3,"th",73),t._uU(4,"Amount"),t.qZA(),t.TgZ(5,"th",73),t._uU(6,"Date"),t.qZA(),t.TgZ(7,"th",73),t._uU(8,"Status"),t.qZA()())}function A(e,r){1&e&&t._UZ(0,"p-tag",77)}function y(e,r){1&e&&t._UZ(0,"p-tag",78)}function q(e,r){if(1&e&&(t.TgZ(0,"tr")(1,"td"),t._uU(2),t.qZA(),t.TgZ(3,"td"),t._uU(4),t.ALo(5,"currency"),t.qZA(),t.TgZ(6,"td"),t._uU(7),t.qZA(),t.TgZ(8,"td",74),t.YNc(9,A,1,0,"p-tag",75),t.YNc(10,y,1,0,"p-tag",76),t.qZA()()),2&e){const a=r.$implicit;t.xp6(2),t.Oqu(a.name),t.xp6(2),t.Oqu(t.lcZ(5,5,a.amount)),t.xp6(3),t.Oqu(a.date),t.xp6(2),t.Q6J("ngIf",a.paid),t.xp6(1),t.Q6J("ngIf",!a.paid)}}let _=(()=>{class e{constructor(a){this.layoutService=a,this.payments=[],this.subscription=this.layoutService.configUpdate$.subscribe(i=>{this.initChart()})}ngOnInit(){this.initChart(),this.payments=[{name:"Electric Bill",amount:75.6,paid:!0,date:"06/04/2022"},{name:"Water Bill",amount:45.5,paid:!0,date:"07/04/2022"},{name:"Gas Bill",amount:45.2,paid:!1,date:"12/04/2022"},{name:"Internet Bill",amount:25.9,paid:!0,date:"17/04/2022"},{name:"Streaming",amount:40.9,paid:!1,date:"20/04/2022"}]}initChart(){const a=getComputedStyle(document.documentElement),i=a.getPropertyValue("--text-color"),o=a.getPropertyValue("--text-color-secondary"),b=a.getPropertyValue("--surface-border");this.chartData={labels:["January","February","March","April","May","June","July"],datasets:[{label:"Income",data:[6500,5900,8e3,8100,5600,5500,4e3],fill:!1,tension:.4,borderColor:a.getPropertyValue("--green-500")},{label:"Expenses",data:[1200,5100,6200,3300,2100,6200,4500],fill:!0,borderColor:"#6366f1",tension:.4,backgroundColor:"rgba(99,102,220,0.2)"}]},this.chartOptions={animation:{duration:0},plugins:{legend:{labels:{color:i}},tooltip:{callbacks:{label:function(m){let l=m.dataset.label||"";return l&&(l+=": "),null!==m.parsed.y&&(l+=new Intl.NumberFormat("en-US",{style:"currency",currency:"USD"}).format(m.parsed.y)),l}}}},scales:{x:{ticks:{color:o},grid:{color:b}},y:{ticks:{color:o},grid:{color:b}}}}}ngOnDestroy(){this.subscription&&this.subscription.unsubscribe()}static#t=this.\u0275fac=function(i){return new(i||e)(t.Y36(h.P))};static#e=this.\u0275cmp=t.Xpm({type:e,selectors:[["ng-component"]],decls:160,vars:3,consts:[[1,"grid"],[1,"col-12"],[1,"flex","flex-column","sm:flex-row","align-items-center","gap-4"],[1,"flex","flex-column","sm:flex-row","align-items-center","gap-3"],["src","assets/demo/images/avatar/circle/avatar-f-1.png",1,"w-4rem","h-4rem","flex-shrink-0"],[1,"flex","flex-column","align-items-center","sm:align-items-start"],[1,"text-900","font-bold","text-4xl"],[1,"text-600","m-0"],[1,"flex","gap-2","sm:ml-auto"],["type","button","pButton","","pTooltip","Exchange","tooltipPosition","bottom","icon","pi pi-arrows-h",1,"p-button-rounded","p-button-outlined"],["type","button","pButton","","pTooltip","Withdraw","tooltipPosition","bottom","icon","pi pi-download",1,"p-button-rounded","p-button-outlined"],["type","button","pButton","","pTooltip","Send","tooltipPosition","bottom","icon","pi pi-send",1,"p-button-rounded"],[1,"col-12","md:col-6","xl:col-4"],[1,"card","h-full","relative","overflow-hidden"],["id","visual","viewBox","0 0 900 600","xmlns","http://www.w3.org/2000/svg",0,"xmlns","xlink","http://www.w3.org/1999/xlink","version","1.1","preserveAspectRatio","none",1,"absolute","left-0","top-0","h-full","w-full","z-1"],["x","0","y","0","width","900","height","600","fill","var(--primary-600)"],["d","M0 400L30 386.5C60 373 120 346 180 334.8C240 323.7 300 328.3 360 345.2C420 362 480 391 540 392C600 393 660 366 720 355.2C780 344.3 840 349.7 870 352.3L900 355L900 601L870 601C840 601 780 601 720 601C660 601 600 601 540 601C480 601 420 601 360 601C300 601 240 601 180 601C120 601 60 601 30 601L0 601Z","fill","var(--primary-500)","stroke-linecap","round","stroke-linejoin","miter"],[1,"z-2","relative","text-white"],[1,"text-xl","font-semibold","mb-3"],[1,"mb-1","font-semibold"],[1,"text-2xl","mb-5","font-bold"],[1,"flex","align-items-center","justify-content-between"],[1,"text-lg"],[1,"font-medium","text-lg"],[1,"card","h-full"],[1,"flex","align-items-center","justify-content-between","mb-3"],[1,"text-900","text-xl","font-semibold"],["src","assets/demo/images/banking/visa.svg",1,"h-1rem"],[1,"text-600","mb-1","font-semibold"],[1,"text-900","text-2xl","text-primary","mb-5","font-bold"],[1,"text-900","text-lg"],[1,"text-600","font-medium","text-lg"],[1,"col-12","md:col-6","xl:col-2"],[1,"card","h-full","flex","flex-column","align-items-center","justify-content-center"],[1,"pi","pi-dollar","text-primary","text-4xl","mb-4"],[1,"text-900","text-lg","mb-4","font-medium"],[1,"text-900","text-2xl","text-primary","font-bold"],[1,"pi","pi-euro","text-primary","text-4xl","mb-4"],[1,"col-12","xl:col-4"],[1,"card"],[1,"text-900","text-xl","font-semibold","mb-3"],[1,"list-none","p-0","m-0"],[1,"flex","align-items-center","p-3","mb-3","border-bottom-1","surface-border"],["src","assets/demo/images/banking/airbnb.png",1,"w-3rem","flex-shrink-0","mr-3"],[1,"flex","flex-column"],[1,"text-xl","font-medium","text-900","mb-1"],[1,"text-xl","text-900","ml-auto","font-semibold"],["src","assets/demo/images/banking/amazon.png",1,"w-3rem","flex-shrink-0","mr-3"],["src","assets/demo/images/banking/nike.svg",1,"w-3rem","flex-shrink-0","mr-3","border-circle"],["src","assets/demo/images/banking/starbucks.svg",1,"w-3rem","flex-shrink-0","mr-3"],[1,"flex","align-items-center","p-3","mb-3"],[1,"col-12","xl:col-8"],["type","line",3,"data","options"],[1,"col-12","lg:col-6"],["pButton","","pRipple","","type","button","icon","pi pi-plus","label","Add New",1,"p-button-outlined","p-button-sm"],[1,"flex","flex-column","row-gap-3"],[1,"flex","flex-column","lg:flex-row","gap-3"],[1,"w-full","lg:w-6","p-3","border-1","border-round","surface-border","flex","align-items-center","hover:surface-100","cursor-pointer","border-radius"],["src","assets/demo/images/avatar/circle/avatar-f-1.png",1,"w-2rem","flex-shrink-0","mr-2"],[1,"text-900","text-lg","font-medium"],["src","assets/demo/images/avatar/circle/avatar-f-2.png",1,"w-2rem","flex-shrink-0","mr-2"],["src","assets/demo/images/avatar/circle/avatar-m-1.png",1,"w-2rem","flex-shrink-0","mr-2"],["src","assets/demo/images/avatar/circle/avatar-f-3.png",1,"w-2rem","flex-shrink-0","mr-2"],["src","assets/demo/images/avatar/circle/avatar-m-2.png",1,"w-2rem","flex-shrink-0","mr-2"],[1,"w-full","lg:w-6","p-3","border-1","border-round","surface-border","flex","align-items-center","hover:surface-100","cursor-pointer"],["src","assets/demo/images/avatar/circle/avatar-f-4.png",1,"w-2rem","flex-shrink-0","mr-2"],[1,"flex","flex-column","sm:flex-row","gap-3","mt-5"],[1,"flex-1","p-fluid"],["type","text","mode","currency","currency","USD","locale","en-US"],["type","button","pButton","","label","Send"],["responsiveLayout","scroll",3,"value"],["pTemplate","header"],["pTemplate","body"],[1,"white-space-nowrap","w-4"],[1,"text-right"],["value","COMPLETED","severity","success",4,"ngIf"],["value","PENDING","severity","warning",4,"ngIf"],["value","COMPLETED","severity","success"],["value","PENDING","severity","warning"]],template:function(i,o){1&i&&(t.TgZ(0,"div",0)(1,"div",1)(2,"div",2)(3,"div",3),t._UZ(4,"img",4),t.TgZ(5,"div",5)(6,"span",6),t._uU(7,"Welcome Isabel"),t.qZA(),t.TgZ(8,"p",7),t._uU(9,"Your last login was on 04/05/2022 at 10:24 am"),t.qZA()()(),t.TgZ(10,"div",8),t._UZ(11,"button",9)(12,"button",10)(13,"button",11),t.qZA()()(),t.TgZ(14,"div",12)(15,"div",13),t.O4$(),t.TgZ(16,"svg",14),t._UZ(17,"rect",15)(18,"path",16),t.qZA(),t.kcU(),t.TgZ(19,"div",17)(20,"div",18),t._uU(21,"Debit Card"),t.qZA(),t.TgZ(22,"div",19),t._uU(23,"Balance"),t.qZA(),t.TgZ(24,"div",20),t._uU(25,"$2.000,00"),t.qZA(),t.TgZ(26,"div",21)(27,"span",22),t._uU(28,"**** **** **** 1412"),t.qZA(),t.TgZ(29,"span",23),t._uU(30,"12/26"),t.qZA()()()()(),t.TgZ(31,"div",12)(32,"div",24)(33,"div",25)(34,"div",26),t._uU(35,"Credit Card"),t.qZA(),t._UZ(36,"img",27),t.qZA(),t.TgZ(37,"div",28),t._uU(38,"Debt"),t.qZA(),t.TgZ(39,"div",29),t._uU(40,"$1.500,00"),t.qZA(),t.TgZ(41,"div",21)(42,"span",30),t._uU(43,"**** **** **** 1231"),t.qZA(),t.TgZ(44,"span",31),t._uU(45,"12/24"),t.qZA()()()(),t.TgZ(46,"div",32)(47,"div",33),t._UZ(48,"i",34),t.TgZ(49,"span",35),t._uU(50,"Primary"),t.qZA(),t.TgZ(51,"span",36),t._uU(52,"$24,345.21"),t.qZA()()(),t.TgZ(53,"div",32)(54,"div",33),t._UZ(55,"i",37),t.TgZ(56,"span",35),t._uU(57,"Currency"),t.qZA(),t.TgZ(58,"span",36),t._uU(59,"$10,416.11"),t.qZA()()(),t.TgZ(60,"div",38)(61,"div",39)(62,"div",40),t._uU(63,"Recent Transactions"),t.qZA(),t.TgZ(64,"ul",41)(65,"li",42),t._UZ(66,"img",43),t.TgZ(67,"div",44)(68,"span",45),t._uU(69,"Airbnb"),t.qZA(),t.TgZ(70,"span"),t._uU(71,"05/23/2022"),t.qZA()(),t.TgZ(72,"span",46),t._uU(73,"$250.00"),t.qZA()(),t.TgZ(74,"li",42),t._UZ(75,"img",47),t.TgZ(76,"div",44)(77,"span",45),t._uU(78,"Amazon"),t.qZA(),t.TgZ(79,"span"),t._uU(80,"04/12/2022"),t.qZA()(),t.TgZ(81,"span",46),t._uU(82,"$50.00"),t.qZA()(),t.TgZ(83,"li",42),t._UZ(84,"img",48),t.TgZ(85,"div",44)(86,"span",45),t._uU(87,"Nike Store"),t.qZA(),t.TgZ(88,"span"),t._uU(89,"04/29/2022"),t.qZA()(),t.TgZ(90,"span",46),t._uU(91,"$60.00"),t.qZA()(),t.TgZ(92,"li",42),t._UZ(93,"img",49),t.TgZ(94,"div",44)(95,"span",45),t._uU(96,"Starbucks"),t.qZA(),t.TgZ(97,"span"),t._uU(98,"04/15/2022"),t.qZA()(),t.TgZ(99,"span",46),t._uU(100,"$15.24"),t.qZA()(),t.TgZ(101,"li",50),t._UZ(102,"img",47),t.TgZ(103,"div",44)(104,"span",45),t._uU(105,"Amazon"),t.qZA(),t.TgZ(106,"span"),t._uU(107,"04/12/2022"),t.qZA()(),t.TgZ(108,"span",46),t._uU(109,"$12.50"),t.qZA()()()()(),t.TgZ(110,"div",51)(111,"div",39)(112,"div",40),t._uU(113,"Overview"),t.qZA(),t._UZ(114,"p-chart",52),t.qZA()(),t.TgZ(115,"div",53)(116,"div",24)(117,"div",25)(118,"div",26),t._uU(119,"Recent Transactions"),t.qZA(),t._UZ(120,"button",54),t.qZA(),t.TgZ(121,"div",55)(122,"div",56)(123,"div",57),t._UZ(124,"img",58),t.TgZ(125,"span",59),t._uU(126,"Aisha Williams"),t.qZA()(),t.TgZ(127,"div",57),t._UZ(128,"img",60),t.TgZ(129,"span",59),t._uU(130,"Jane Watson"),t.qZA()()(),t.TgZ(131,"div",56)(132,"div",57),t._UZ(133,"img",61),t.TgZ(134,"span",59),t._uU(135,"Brad Curry"),t.qZA()(),t.TgZ(136,"div",57),t._UZ(137,"img",62),t.TgZ(138,"span",59),t._uU(139,"Claire Dunphy"),t.qZA()()(),t.TgZ(140,"div",56)(141,"div",57),t._UZ(142,"img",63),t.TgZ(143,"span",59),t._uU(144,"Kevin James"),t.qZA()(),t.TgZ(145,"div",64),t._UZ(146,"img",65),t.TgZ(147,"span",59),t._uU(148,"Sarah McTamish"),t.qZA()()()(),t.TgZ(149,"div",66)(150,"div",67),t._UZ(151,"p-inputNumber",68),t.qZA(),t._UZ(152,"button",69),t.qZA()()(),t.TgZ(153,"div",53)(154,"div",39)(155,"div",40),t._uU(156,"Monthly Payments"),t.qZA(),t.TgZ(157,"p-table",70),t.YNc(158,U,9,0,"ng-template",71),t.YNc(159,q,11,7,"ng-template",72),t.qZA()()()()),2&i&&(t.xp6(114),t.Q6J("data",o.chartData)("options",o.chartOptions),t.xp6(43),t.Q6J("value",o.payments))},dependencies:[s.O5,g.Hq,T.jx,Z.H,f.V,v.u,p.iA,d.Rn,c.C,s.H9],encapsulation:2})}return e})(),w=(()=>{class e{static#t=this.\u0275fac=function(i){return new(i||e)};static#e=this.\u0275mod=t.oAB({type:e});static#a=this.\u0275inj=t.cJS({imports:[x.Bz.forChild([{path:"",component:_}]),x.Bz]})}return e})(),C=(()=>{class e{static#t=this.\u0275fac=function(i){return new(i||e)};static#e=this.\u0275mod=t.oAB({type:e});static#a=this.\u0275inj=t.cJS({imports:[s.ez,g.hJ,Z.T,f.W,v.z,p.U$,d.L$,c.S,w]})}return e})()}}]);