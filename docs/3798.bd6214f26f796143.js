"use strict";(self.webpackChunkapollo_ng=self.webpackChunkapollo_ng||[]).push([[3798],{3798:(T,r,s)=>{s.r(r),s.d(r,{LandingModule:()=>f});var m=s(6814),a=s(2129),e=s(4769),p=s(3859),d=s(707),c=s(1913),g=s(1111);let u=(()=>{class t{constructor(o,i){this.el=o,this.renderer=i,this.documentScrollListener=null,this.loadListener=()=>{},this.entered=!1,this.visibilityHidden=!0}ngOnInit(){this.isImage()&&(this.loadListener=this.renderer.listen(this.el.nativeElement,"load",()=>{this.bind()}))}ngAfterViewInit(){this.isImage()||this.bind()}bind(){this.isInViewPort()&&this.enter(),this.entered||(this.documentScrollListener=this.renderer.listen("window","scroll",()=>{this.isInViewPort()&&this.documentScrollListener&&(this.enter(),this.documentScrollListener(),this.documentScrollListener=null)}))}shouldEnter(){return!this.entered&&this.isInViewPort()}isInViewPort(){let o=this.el.nativeElement.parentElement.parentElement.parentElement.getBoundingClientRect(),n=document.documentElement.clientHeight;return!(o.top>0)||o.top>=0&&n>=o.top}enter(){this.el.nativeElement.classList.add("hidden",this.animation),this.el.nativeElement.classList.remove("visibility-hidden","hidden"),this.entered=!0}isImage(){return"IMG"===this.el.nativeElement.tagName}ngOnDestroy(){this.documentScrollListener&&this.documentScrollListener(),this.loadListener&&this.loadListener()}static#e=this.\u0275fac=function(i){return new(i||t)(e.Y36(e.SBq),e.Y36(e.Qsj))};static#t=this.\u0275dir=e.lG2({type:t,selectors:[["","animateEnter",""]],hostVars:2,hostBindings:function(i,n){2&i&&e.ekj("visibility-hidden",n.visibilityHidden)},inputs:{animation:["animateEnter","animation"]}})}return t})(),Z=(()=>{class t{constructor(o,i){this.router=o,this.layoutService=i,this.darkMode=!1,this.subscription=this.layoutService.configUpdate$.subscribe(n=>{this.darkMode="dark"===n.colorScheme||"dim"===n.colorScheme})}ngOnDestroy(){this.subscription.unsubscribe()}static#e=this.\u0275fac=function(i){return new(i||t)(e.Y36(a.F0),e.Y36(p.P))};static#t=this.\u0275cmp=e.Xpm({type:t,selectors:[["ng-component"]],decls:257,vars:6,consts:[[1,"relative","overflow-hidden","flex","flex-column","justify-content-center"],[1,"bg-circle","opacity-50",2,"top","-200px","left","-700px"],[1,"bg-circle","hidden","lg:flex",2,"top","50px","right","-800px","transform","rotate(60deg)"],[1,"landing-wrapper"],[1,"flex","align-items-center","justify-content-between","relative","lg:static","py-6","px-4","mx-0","md:px-7","lg:px-8","lg:py-6","lg:mx-8"],[1,"cursor-pointer",3,"click"],["width","124","height","22","viewBox","0 0 124 22","fill","none","xmlns","http://www.w3.org/2000/svg"],["d","M10.4851 0L0 20.9465H3.53702L10.4856 6.07843L17.2944 20.9465H20.9715L10.4851 0Z","fill","var(--primary-color)"],["d","M13.84 15.7927L16.2077 21.0016H11.7682L13.84 15.7927Z","fill","var(--primary-color)"],["d","M9.04645 21.0016L6.67875 15.7927L4.60701 21.0016H9.04645Z","fill","var(--primary-color)"],["d","M40.9033 14.5217H34.771L33.1753 18.0007H30.8467L37.9346 2.77661L44.772 18.0007H42.4062L40.9033 14.5217ZM40.022 12.49L37.8975 7.61938L35.6709 12.49H40.022Z","fill","var(--primary-color)"],["d","M52.4927 12.1838V18.0007H50.3311V3.67651H52.7803C53.9802 3.67651 54.8862 3.76001 55.4985 3.927C56.117 4.09399 56.6613 4.40942 57.1314 4.87329C57.954 5.67733 58.3652 6.69165 58.3652 7.91626C58.3652 9.22746 57.9261 10.2665 57.0479 11.0334C56.1696 11.8004 54.9852 12.1838 53.4946 12.1838H52.4927ZM52.4927 10.1799H53.2998C55.2852 10.1799 56.2778 9.4161 56.2778 7.88843C56.2778 6.41024 55.2542 5.67114 53.207 5.67114H52.4927V10.1799Z","fill","var(--primary-color)"],["d","M63.6367 10.7737C63.6367 8.75741 64.3758 7.02563 65.854 5.57837C67.326 4.1311 69.0949 3.40747 71.1607 3.40747C73.2017 3.40747 74.952 4.13729 76.4116 5.59692C77.8775 7.05656 78.6104 8.80998 78.6104 10.8572C78.6104 12.9167 77.8744 14.664 76.4024 16.0989C74.9242 17.54 73.1398 18.2605 71.0493 18.2605C69.2001 18.2605 67.5394 17.6204 66.0674 16.3401C64.447 14.9237 63.6367 13.0683 63.6367 10.7737ZM65.8169 10.8015C65.8169 12.3848 66.3488 13.6868 67.4126 14.7073C68.4702 15.7278 69.6918 16.238 71.0772 16.238C72.5801 16.238 73.848 15.7185 74.8809 14.6794C75.9138 13.628 76.4302 12.3477 76.4302 10.8386C76.4302 9.31095 75.9199 8.03068 74.8994 6.9978C73.8851 5.95874 72.6296 5.43921 71.1328 5.43921C69.6423 5.43921 68.3836 5.95874 67.357 6.9978C66.3303 8.0245 65.8169 9.2924 65.8169 10.8015Z","fill","var(--primary-color)"],["d","M87.2495 3.67651V15.969H91.4615V18.0007H85.0879V3.67651H87.2495Z","fill","var(--primary-color)"],["d","M99.4327 3.67651V15.969H103.645V18.0007H97.271V3.67651H99.4327Z","fill","var(--primary-color)"],["d","M108.146 10.7737C108.146 8.75741 108.885 7.02563 110.363 5.57837C111.835 4.1311 113.604 3.40747 115.67 3.40747C117.711 3.40747 119.461 4.13729 120.921 5.59692C122.387 7.05656 123.12 8.80998 123.12 10.8572C123.12 12.9167 122.384 14.664 120.912 16.0989C119.433 17.54 117.649 18.2605 115.559 18.2605C113.709 18.2605 112.049 17.6204 110.577 16.3401C108.956 14.9237 108.146 13.0683 108.146 10.7737ZM110.326 10.8015C110.326 12.3848 110.858 13.6868 111.922 14.7073C112.98 15.7278 114.201 16.238 115.586 16.238C117.089 16.238 118.357 15.7185 119.39 14.6794C120.423 13.628 120.94 12.3477 120.94 10.8386C120.94 9.31095 120.429 8.03068 119.409 6.9978C118.394 5.95874 117.139 5.43921 115.642 5.43921C114.152 5.43921 112.893 5.95874 111.866 6.9978C110.84 8.0245 110.326 9.2924 110.326 10.8015Z","fill","var(--primary-color)"],["pRipple","","pStyleClass","@next","enterClass","ng-hidden","enterActiveClass","px-fadein","leaveToClass","ng-hidden","leaveActiveClass","px-fadeout",1,"cursor-pointer","block","md:hidden","text-700","text-primary",3,"hideOnOutsideClick"],[1,"pi","pi-bars","text-4xl"],[1,"list-none","p-3","md:p-0","justify-content-end","ng-hidden","md:flex","absolute","md:static","w-full","md:w-6","md:px-0","z-3","shadow-2","md:shadow-none","surface-card","md:surface-ground",2,"top","80px","right","0%"],["menu",""],["pRipple","","pRipple","","pStyleClass","@parent","enterClass","ng-hidden","enterActiveClass","px-fadein","leaveToClass","ng-hidden","leaveActiveClass","px-fadeout",1,"cursor-pointer","block","md:hidden","text-700","text-primary","absolute","z-5",2,"top","1.5rem","right","1.5rem"],[1,"pi","pi-times","text-3xl"],[1,"md:mt-0"],["pRipple","","pStyleClass","@grandparent","enterClass","ng-hidden","enterActiveClass","px-fadein","leaveToClass","ng-hidden",1,"flex","m-0","md:ml-5","px-0","py-3","text-900","font-medium","line-height-3","cursor-pointer",3,"click"],[1,"flex","align-items-center"],["pButton","","pRipple","","type","button","pStyleClass","@grandparent","enterClass","ng-hidden","enterActiveClass","px-fadein","leaveToClass","ng-hidden","label","Buy Now",1,"m-0","mt-3","md:mt-0","md:ml-5","white-space-nowrap"],[1,"py-4","px-4","mx-0","md:mx-6","lg:mx-8","lg:px-8","z-2"],["id","home",1,"grid","grid-nogutter","justify-content-between","align-items-center","mb-6","py-6","md:mb-8","md:py-8"],[1,"col-12","md:col-4","flex","flex-column","gap-4","flex-order-1","md:flex-order-0","align-items-center","md:align-items-start","text-center","md:text-left"],[1,"block","text-900","font-bold","text-4xl"],[1,"block","text-700","text-lg"],[1,"flex","flex-wrap","gap-5","list-none","p-0"],[1,"p-1","border-circle","bg-green-400","inline-block","mr-2"],[1,"text-900","font-semibold"],["pButton","","pRipple","","type","button","label","Live Preview","icon","pi pi-arrow-right","iconPos","right",1,"w-12rem","p-button-outlined"],[1,"col-12","md:col-7","flex-order-0","md:flex-order-1","mb-6","md:mb-0","border-round"],["animateEnter","moveinright","alt","",1,"w-full","h-full","border-round","shadow-2","animation-duration-1000","animation-ease-out",3,"src"],["id","apps",1,"my-6","md:my-8"],[1,"text-900","block","font-bold","text-5xl","mb-4","text-center"],[1,"text-700","block","text-xl","mb-8","text-center","line-height-3"],[1,"flex","flex-column","lg:flex-row","align-items-center","justify-content-between","mt-8","gap-8"],[1,"flex","flex-column","align-items-center"],["animateEnter","scalein","alt","chat",1,"w-full","h-full","border-round","surface-border","shadow-2","animation-duration-500","origin-top",3,"src"],[1,"block","text-900","text-lg","font-semibold","mt-4"],["id","pricing",1,"my-6","py-6","md:my-8","md:py-8"],[1,"text-900","font-bold","text-5xl","mb-4","text-center"],[1,"text-700","text-xl","mb-8","text-center","line-height-3"],[1,"grid","grid-nogutter","justify-content-center","mt-8"],[1,"col-12","lg:col-6","xl:col-4"],[1,"p-3","h-full"],[1,"shadow-2","p-6","h-full","flex","flex-column","surface-card",2,"border-radius","6px"],[1,"text-900","block","font-medium","text-xl","mb-2","text-center"],[1,"font-bold","block","text-2xl","text-900","text-center"],[1,"list-none","p-0","m-0","flex-grow-1","mt-6"],[1,"flex","align-items-center","mb-3"],[1,"pi","pi-check","text-green-500","mr-2"],[1,"pi","pi-times","text-red-500","mr-2"],["pButton","","pRipple","","label","Choose Plan","icon","pi pi-arrow-right","iconPos","right",1,"px-5","w-full","mt-6","p-button-outlined"],["id","features",1,"my-6","py-6","md:my-8","md:py-8"],[1,"grid","mt-8"],[1,"col-12","md:col-6","xl:col-3","flex","justify-content-center","p-3"],[1,"box","p-4","w-full","surface-card","surface-border","border-1","border-round"],["src","assets/demo/images/landing/icon-components.svg","alt","components icon",1,"block","mb-3"],[1,"text-900","block","font-semibold","mb-3","text-lg"],[1,"m-0","text-secondary","text-700"],["src","assets/demo/images/landing/icon-community.svg","alt","components icon",1,"block","mb-3"],["src","assets/demo/images/landing/icon-productivity.svg","alt","components icon",1,"block","mb-3"],["src","assets/demo/images/landing/icon-accessibility.svg","alt","components icon",1,"block","mb-3"],["src","assets/demo/images/landing/icon-support.svg","alt","components icon",1,"block","mb-3"],["src","assets/demo/images/landing/icon-mobile.svg","alt","components icon",1,"block","mb-3"],["src","assets/demo/images/landing/icon-theme.svg","alt","components icon",1,"block","mb-3"],["src","assets/demo/images/landing/icon-ts.svg","alt","components icon",1,"block","mb-3"],[1,"grid","justify-content-between","my-6","pt-4","md:my-8"],[1,"col-12","md:col-2","text-center","md:text-left"],["href","#",1,"cursor-pointer"],[1,"col-12","md:col-10","lg:col-7"],[1,"grid","text-center","md:text-left"],[1,"col-12","md:col-3"],[1,"font-medium","text-xl","line-height-3","mb-3","text-900"],[1,"line-height-3","block","cursor-pointer","mb-2","text-700"],[1,"line-height-3","block","cursor-pointer","text-700"],[1,"col-12","md:col-3","mt-4","md:mt-0"],[3,"minimal"]],template:function(i,n){1&i&&(e.TgZ(0,"div",0),e._UZ(1,"div",1)(2,"div",2),e.TgZ(3,"div",3)(4,"div",4)(5,"a",5),e.NdJ("click",function(){return n.router.navigate(["/landing"])}),e.O4$(),e.TgZ(6,"svg",6),e._UZ(7,"path",7)(8,"path",8)(9,"path",9)(10,"path",10)(11,"path",11)(12,"path",12)(13,"path",13)(14,"path",14)(15,"path",15),e.qZA()(),e.kcU(),e.TgZ(16,"a",16),e._UZ(17,"i",17),e.qZA(),e.TgZ(18,"ul",18,19)(20,"a",20),e._UZ(21,"i",21),e.qZA(),e.TgZ(22,"li",22)(23,"a",23),e.NdJ("click",function(){return n.router.navigate(["/landing"],{fragment:"home"})}),e.TgZ(24,"span"),e._uU(25,"Home"),e.qZA()()(),e.TgZ(26,"li")(27,"a",23),e.NdJ("click",function(){return n.router.navigate(["/landing"],{fragment:"apps"})}),e.TgZ(28,"span"),e._uU(29,"Apps"),e.qZA()()(),e.TgZ(30,"li")(31,"a",23),e.NdJ("click",function(){return n.router.navigate(["/landing"],{fragment:"pricing"})}),e.TgZ(32,"span"),e._uU(33,"Pricing"),e.qZA()()(),e.TgZ(34,"li")(35,"a",23),e.NdJ("click",function(){return n.router.navigate(["/landing"],{fragment:"features"})}),e.TgZ(36,"span"),e._uU(37,"Features"),e.qZA()()(),e.TgZ(38,"li",24),e._UZ(39,"button",25),e.qZA()()(),e.TgZ(40,"div",26)(41,"div",27)(42,"div",28)(43,"span",29),e._uU(44,"Modern, stylish and clean"),e.qZA(),e.TgZ(45,"span",30),e._uU(46,"The ultimate collection of design-agnostic, flexible and accessible UI Components."),e.qZA(),e.TgZ(47,"ul",31)(48,"li",24),e._UZ(49,"div",32),e.TgZ(50,"span",33),e._uU(51,"Javascript"),e.qZA()(),e.TgZ(52,"li",24),e._UZ(53,"div",32),e.TgZ(54,"span",33),e._uU(55,"TypeScript"),e.qZA()(),e.TgZ(56,"li",24),e._UZ(57,"div",32),e.TgZ(58,"span",33),e._uU(59,"Angular"),e.qZA()()(),e._UZ(60,"button",34),e.qZA(),e.TgZ(61,"div",35),e._UZ(62,"img",36),e.qZA()(),e.TgZ(63,"div",37)(64,"span",38),e._uU(65,"Apps"),e.qZA(),e.TgZ(66,"span",39),e._uU(67,"Lorem ipsum dolor sit, amet consectetur adipisicing elit. Velit numquam eligendi quos."),e.qZA(),e.TgZ(68,"div",40)(69,"div",41),e._UZ(70,"img",42),e.TgZ(71,"span",43),e._uU(72,"Chat"),e.qZA()(),e.TgZ(73,"div",41),e._UZ(74,"img",42),e.TgZ(75,"span",43),e._uU(76,"Mail"),e.qZA()(),e.TgZ(77,"div",41),e._UZ(78,"img",42),e.TgZ(79,"span",43),e._uU(80,"Kanban"),e.qZA()()()(),e.TgZ(81,"div",44)(82,"div",45),e._uU(83,"Pricing Plans"),e.qZA(),e.TgZ(84,"div",46),e._uU(85,"Choose a plan that works best for you and your team."),e.qZA(),e.TgZ(86,"div",47)(87,"div",48)(88,"div",49)(89,"div",50)(90,"span",51),e._uU(91,"Basic Licence"),e.qZA(),e.TgZ(92,"span",52),e._uU(93,"$29"),e.qZA(),e.TgZ(94,"ul",53)(95,"li",54),e._UZ(96,"i",55),e.TgZ(97,"span"),e._uU(98,"Up to 10 Active Users"),e.qZA()(),e.TgZ(99,"li",54),e._UZ(100,"i",55),e.TgZ(101,"span"),e._uU(102,"Up to 30 Project Integrations"),e.qZA()(),e.TgZ(103,"li",54),e._UZ(104,"i",55),e.TgZ(105,"span"),e._uU(106,"Analytics Module"),e.qZA()(),e.TgZ(107,"li",54),e._UZ(108,"i",56),e.TgZ(109,"span"),e._uU(110,"Finance Module"),e.qZA()()(),e._UZ(111,"button",57),e.qZA()()(),e.TgZ(112,"div",48)(113,"div",49)(114,"div",50)(115,"span",51),e._uU(116,"Extended Licence"),e.qZA(),e.TgZ(117,"span",52),e._uU(118,"$49"),e.qZA(),e.TgZ(119,"ul",53)(120,"li",54),e._UZ(121,"i",55),e.TgZ(122,"span"),e._uU(123,"Up to 10 Active Users"),e.qZA()(),e.TgZ(124,"li",54),e._UZ(125,"i",55),e.TgZ(126,"span"),e._uU(127,"Up to 30 Project Integrations"),e.qZA()(),e.TgZ(128,"li",54),e._UZ(129,"i",55),e.TgZ(130,"span"),e._uU(131,"Analytics Module"),e.qZA()(),e.TgZ(132,"li",54),e._UZ(133,"i",56),e.TgZ(134,"span"),e._uU(135,"Finance Module"),e.qZA()()(),e._UZ(136,"button",57),e.qZA()()()()(),e.TgZ(137,"div",58)(138,"span",38),e._uU(139,"Features"),e.qZA(),e.TgZ(140,"span",39),e._uU(141,"PrimeTek Informatics is the author of PrimeReact, a UI Component vendor with well known vastly popular projects including PrimeFaces, PrimeNG and PrimeVue."),e.qZA(),e.TgZ(142,"div",59)(143,"div",60)(144,"div",61),e._UZ(145,"img",62),e.TgZ(146,"span",63),e._uU(147,"90+ UI Components"),e.qZA(),e.TgZ(148,"p",64),e._uU(149,"The ultimate set of UI Components to assist you with 90+ impressive Angular Components."),e.qZA()()(),e.TgZ(150,"div",60)(151,"div",61),e._UZ(152,"img",65),e.TgZ(153,"span",63),e._uU(154,"Community"),e.qZA(),e.TgZ(155,"p",64),e._uU(156,"Connect with the other open source community members, collaborate and have a voice in the project roadmap."),e.qZA()()(),e.TgZ(157,"div",60)(158,"div",61),e._UZ(159,"img",66),e.TgZ(160,"span",63),e._uU(161,"Productivity"),e.qZA(),e.TgZ(162,"p",64),e._uU(163,"Boost your productivity by achieving more in less time and accomplish amazing results."),e.qZA()()(),e.TgZ(164,"div",60)(165,"div",61),e._UZ(166,"img",67),e.TgZ(167,"span",63),e._uU(168,"Accessibility"),e.qZA(),e.TgZ(169,"p",64),e._uU(170,"The ultimate set of UI Components to assist you with 90+ impressive Angular Components."),e.qZA()()(),e.TgZ(171,"div",60)(172,"div",61),e._UZ(173,"img",68),e.TgZ(174,"span",63),e._uU(175,"Enterprise Support"),e.qZA(),e.TgZ(176,"p",64),e._uU(177,"Exceptional support service featuring response within 1 business day and option to request enhancements and new features for the library."),e.qZA()()(),e.TgZ(178,"div",60)(179,"div",61),e._UZ(180,"img",69),e.TgZ(181,"span",63),e._uU(182,"Mobile"),e.qZA(),e.TgZ(183,"p",64),e._uU(184,"First class support for responsive design led by touch optimized elements."),e.qZA()()(),e.TgZ(185,"div",60)(186,"div",61),e._UZ(187,"img",70),e.TgZ(188,"span",63),e._uU(189,"Themes"),e.qZA(),e.TgZ(190,"p",64),e._uU(191,"Built on a design-agnostic api, choose from a vast amount of themes such as material, bootstrap, custom or develop your own."),e.qZA()()(),e.TgZ(192,"div",60)(193,"div",61),e._UZ(194,"img",71),e.TgZ(195,"span",63),e._uU(196,"Typescript"),e.qZA(),e.TgZ(197,"p",64),e._uU(198,"Top-notch support for Typescript with types and tooling assistance."),e.qZA()()()()(),e.TgZ(199,"div",72)(200,"div",73)(201,"a",74),e.O4$(),e.TgZ(202,"svg",6),e._UZ(203,"path",7)(204,"path",8)(205,"path",9)(206,"path",10)(207,"path",11)(208,"path",12)(209,"path",13)(210,"path",14)(211,"path",15),e.qZA()()(),e.kcU(),e.TgZ(212,"div",75)(213,"div",76)(214,"div",77)(215,"h4",78),e._uU(216,"Company"),e.qZA(),e.TgZ(217,"a",79),e._uU(218,"About Us"),e.qZA(),e.TgZ(219,"a",79),e._uU(220,"News"),e.qZA(),e.TgZ(221,"a",79),e._uU(222,"Investor Relations"),e.qZA(),e.TgZ(223,"a",79),e._uU(224,"Careers"),e.qZA(),e.TgZ(225,"a",80),e._uU(226,"Media Kit"),e.qZA()(),e.TgZ(227,"div",81)(228,"h4",78),e._uU(229,"Resources"),e.qZA(),e.TgZ(230,"a",79),e._uU(231,"Get Started"),e.qZA(),e.TgZ(232,"a",79),e._uU(233,"Learn"),e.qZA(),e.TgZ(234,"a",80),e._uU(235,"Case Studies"),e.qZA()(),e.TgZ(236,"div",81)(237,"h4",78),e._uU(238,"Community"),e.qZA(),e.TgZ(239,"a",79),e._uU(240,"Discord"),e.qZA(),e.TgZ(241,"a",79),e._uU(242,"Events"),e.qZA(),e.TgZ(243,"a",79),e._uU(244,"FAQ"),e.qZA(),e.TgZ(245,"a",80),e._uU(246,"Blog"),e.qZA()(),e.TgZ(247,"div",81)(248,"h4",78),e._uU(249,"Legal"),e.qZA(),e.TgZ(250,"a",79),e._uU(251,"Brand Policy"),e.qZA(),e.TgZ(252,"a",79),e._uU(253,"Privacy Policy"),e.qZA(),e.TgZ(254,"a",80),e._uU(255,"Terms of Service"),e.qZA()()()()()()()(),e._UZ(256,"app-config",82)),2&i&&(e.xp6(16),e.Q6J("hideOnOutsideClick",!0),e.xp6(46),e.MGl("src","assets/demo/images/landing/",n.darkMode?"dashboard-dark":"dashboard-light",".png",e.LSH),e.xp6(8),e.MGl("src","assets/demo/images/landing/",n.darkMode?"chat-dark":"chat-light",".png",e.LSH),e.xp6(4),e.MGl("src","assets/demo/images/landing/",n.darkMode?"mail-dark":"mail-light",".png",e.LSH),e.xp6(4),e.MGl("src","assets/demo/images/landing/",n.darkMode?"kanban-dark":"kanban-light",".png",e.LSH),e.xp6(178),e.Q6J("minimal",!0))},dependencies:[d.Hq,c.h,g.P,u],styles:[".bg-circle[_ngcontent-%COMP%]{width:1000px;height:1000px;border-radius:50%;background-image:linear-gradient(140deg,var(--primary-color),var(--surface-ground) 80%);position:absolute;opacity:.25;z-index:-1}.visibility-hidden[_ngcontent-%COMP%]{visibility:hidden}.moveinright[_ngcontent-%COMP%]{animation:_ngcontent-%COMP%_moveinright .15s linear}@keyframes _ngcontent-%COMP%_moveinright{0%{opacity:0;transform:translate(50px);transition:transform .12s cubic-bezier(0,0,.2,1),opacity .12s cubic-bezier(0,0,.2,1)}to{opacity:1;transform:translate(0)}}"]})}return t})(),h=(()=>{class t{static#e=this.\u0275fac=function(i){return new(i||t)};static#t=this.\u0275mod=e.oAB({type:t});static#i=this.\u0275inj=e.cJS({imports:[a.Bz.forChild([{path:"",component:Z}]),a.Bz]})}return t})();var v=s(1567);let f=(()=>{class t{static#e=this.\u0275fac=function(i){return new(i||t)};static#t=this.\u0275mod=e.oAB({type:t});static#i=this.\u0275inj=e.cJS({imports:[m.ez,h,d.hJ,a.Bz,c.l,v.h]})}return t})()}}]);