"use strict";(self.webpackChunknfc_reserve=self.webpackChunknfc_reserve||[]).push([[7134],{1200:(J,g,a)=>{a.r(g),a.d(g,{FoodCounterModule:()=>G});var u=a(6814),d=a(258),h=a(5219),o=a(6676),e=a(5879),f=a(746),v=a(8645);let p=(()=>{class i{constructor(){this.mealChanged=new v.x,this.meals={breakfast:{begin:7,end:10},lunch:{begin:11,end:15},dinner:{begin:17,end:20}},this.checkMealStart(),setInterval(()=>{this.checkMealStart()},2e4)}checkMealStart(){const t=(new Date).getHours();for(const n of Object.keys(this.meals)){const r=this.meals[n];if(t>=r.begin&&t<r.end)return void this.mealChanged.next(n)}}getMealNameByTime(s){const t=s.getHours();for(const n in this.meals){const r=this.meals[n];if(t>=r.begin&&t<=r.end)return this.translateMealName(n)}return"Jelenleg nincs \xe9tkeztet\xe9s"}translateMealName(s){return{breakfast:"reggeli",lunch:"eb\xe9d",dinner:"vacsora"}[s]||s}isOpen(){const s=(new Date).getHours();for(const t in this.meals){const n=this.meals[t];if(s>=n.begin&&s<n.end)return!0}return!1}static#e=this.\u0275fac=function(t){return new(t||i)};static#t=this.\u0275prov=e.Yz7({token:i,factory:i.\u0275fac,providedIn:"root"})}return i})();var b=a(3763),m=a(4104);function C(i,c){1&i&&(e.TgZ(0,"button",16)(1,"span",17),e._uU(2," \xc9tel kiadva "),e.qZA()())}function y(i,c){1&i&&(e.TgZ(0,"button",18)(1,"span",17),e._uU(2," Nincs el\u0151fizetve "),e.qZA()())}function M(i,c){1&i&&(e.TgZ(0,"button",18)(1,"span",17),e._uU(2," M\xe1r \xe1tvett \xe9tel "),e.qZA()())}function E(i,c){1&i&&(e.TgZ(0,"button",18)(1,"span",17),e._uU(2," Jelenleg nincs \xe9tkeztet\xe9s "),e.qZA()())}o.locale("hu");let w=(()=>{class i{constructor(s,t,n,r,l){this.router=s,this.guestService=t,this.mealService=n,this.logService=r,this.messageService=l,this.mealsNumber=0,this.loading=!1,this.alreadyRecievedFood=!1,this.canEat=!1,this.ageGroup="",this.scanTemp="",this.scannedCode="",this.backgroundColor="surface-ground",this.windowWidth=window.innerWidth||document.documentElement.clientWidth,this.windowHeight=window.innerHeight||document.documentElement.clientHeight}ngOnInit(){this.guestsObs$=this.guestService.guestObs,this.guestsObs$.subscribe(s=>{this.loading=!1,s&&(this.guests=s,this.setCurrentMealsNumber())}),this.mealService.mealChanged.subscribe(()=>{this.updateCurrentMeal()}),this.updateCurrentMeal(),this.resetGuest()}resetGuest(){this.ageGroup="",this.guest={lastName:"",firstName:"",diet:"",conferenceName:""}}keyEvent(s){if("Enter"===s.key)this.scannedCode=this.scanTemp,this.scanTemp="",console.log("scannedCode",this.scannedCode),this.logService.createLog({name:"FoodCounter scannedCode: "+this.scannedCode+" | Lang: "+navigator.language,capacity:0}),this.resetGuest(),this.getGuestByRFID(this.scannedCode);else if("\xf6"===s.key)this.scanTemp+="0";else{if(!/^[0-9]$/i.test(s.key))return;this.scanTemp+=s.key}}onResize(s){this.windowWidth=window.innerWidth||document.documentElement.clientWidth,this.windowHeight=window.innerHeight||document.documentElement.clientHeight}updateCurrentMeal(){this.isOpen=this.mealService.isOpen();let s=this.mealService.getMealNameByTime(new Date);s!==this.currentMeal&&(this.currentMeal=s,this.mealsNumber=0)}getGuestByRFID(s){this.guestService.getByRFID(s).subscribe({next:t=>{this.guest=t,this.setAgeGroup(this.guest.birthDate);let n=o(),r=o(new Date(t.dateOfArrival).setHours(0)),l=o(new Date(t.dateOfDeparture).setHours(24));if(r<=n&&n<=l&&(r.isSame(n,"day")&&("reggeli"==this.currentMeal?"reggeli"==t.firstMeal&&(this.canEat=!0):"eb\xe9d"==this.currentMeal?("reggeli"==t.firstMeal||"eb\xe9d"==t.firstMeal)&&(this.canEat=!0):"vacsora"==this.currentMeal&&("reggeli"==t.firstMeal||"eb\xe9d"==t.firstMeal||"vacsora"==t.firstMeal)&&(this.canEat=!0)),r!==n&&n!==l&&(this.canEat=!0),l.isSame(n,"day")&&("reggeli"==this.currentMeal&&("reggeli"==t.lastMeal||"eb\xe9d"==t.lastMeal||"vacsora"==t.lastMeal)&&(this.canEat=!0),"eb\xe9d"==this.currentMeal?("eb\xe9d"==t.lastMeal||"vacsora"==t.lastMeal)&&(this.canEat=!0):"vacsora"==this.currentMeal&&"vacsora"==t.lastMeal&&(this.canEat=!0))),this.alreadyRecievedFood=!1,t.lastRfidUsage){let k=new Date(t.lastRfidUsage),I=this.mealService.getMealNameByTime(k);this.currentMeal==I&&(this.alreadyRecievedFood=!0,this.logService.createLog({name:"FoodCounter Already received food: "+this.guest.lastName+" "+this.guest.firstName+" "+this.scannedCode+" | Lang: "+navigator.language,capacity:0}))}this.mealsNumber++,this.guest.lastRfidUsage=o().format("YYYY-MM-DD HH:mm:ss"),this.guestService.updateGuest(this.guest),this.backgroundColor=this.getDietColor(this.guest.diet)},error:t=>{console.error("Error:",t),404===t.status&&(this.guest={lastName:"ISMERETLEN",firstName:"ESZK\xd6Z"},this.logService.createLog({name:"FoodCounter Unknown Device: "+this.scannedCode+" | Lang: "+navigator.language,capacity:0}))}})}setAgeGroup(s){if(s){let t=o(new Date(s)),r=o.duration(o(new Date).diff(t)).asYears();this.ageGroup=r>=10?"feln\u0151tt":"gyermek"}else this.ageGroup="Hib\xe1s d\xe1tum"}setCurrentMealsNumber(){this.guests.map(s=>{if("G\xe1bris"!==s.lastName&&s.lastRfidUsage){let t=o(new Date(s.lastRfidUsage)),n=o();if(t.isSame(n,"day")){let r=this.mealService.getMealNameByTime(new Date(s.lastRfidUsage));this.currentMeal==r&&this.mealsNumber++}}})}getDietColor(s){switch(this.guest.diet){case"tejmentes":case"lakt\xf3zmentes":return"blue-400";case"glut\xe9nmentes":return"yellow-300";case"glut\xe9n-, lakt\xf3z-, tejmentes":return"red-500";case"veget\xe1ri\xe1nus":return"teal-500";case"nem k\xe9r \xe9tkez\xe9st":return"gray-300";default:return"gray-700"}}ngOnDestroy(){}static#e=this.\u0275fac=function(t){return new(t||i)(e.Y36(d.F0),e.Y36(f.Q),e.Y36(p),e.Y36(b.$),e.Y36(h.ez))};static#t=this.\u0275cmp=e.Xpm({type:i,selectors:[["food-counter"]],hostBindings:function(t,n){1&t&&e.NdJ("keypress",function(l){return n.keyEvent(l)},!1,e.Jf7)("resize",function(l){return n.onResize(l)},!1,e.Jf7)},features:[e._Bn([h.ez])],decls:59,vars:16,consts:[[1,"relative","overflow-hidden","flex","flex-column","justify-content-center"],[1,"header",3,"ngClass"],[1,"p-1","font-medium","text-center","text-2xl","text-white","white-space-nowrap"],[1,"absolute","top-0","right-0","p-2","text-white","text-sm"],[1,"px-4","py-4",3,"ngClass"],[1,"grid"],[1,"col-12","md:col-12","lg:col-6","p-2"],[1,"info-box","surface-card","shadow-2","p-3","border-round","border-teal-500"],[1,"flex","justify-content-between"],[1,"block","text-500","text-xl","font-medium","mb-3"],[1,"text-900","font-medium","text-2xl"],[1,"grid","mt-1"],[1,"surface-card","shadow-2","border-round"],[1,"flex","align-items-center","justify-content-center","gap-2"],["class","flex align-items-center justify-content-center w-full h-fullgap-2 bg-teal-500 shadow-1 border-round-sm border-none cursor-pointer hover:bg-teal-600 transition-duration-200","style","min-height: 80px;",4,"ngIf"],["class","flex align-items-center justify-content-center w-full h-fullgap-2 bg-red-500 shadow-1 border-round-sm border-none cursor-pointer hover:bg-red-600 transition-duration-200","style","min-height: 80px;",4,"ngIf"],[1,"flex","align-items-center","justify-content-center","w-full","h-fullgap-2","bg-teal-500","shadow-1","border-round-sm","border-none","cursor-pointer","hover:bg-teal-600","transition-duration-200",2,"min-height","80px"],[1,"font-medium","text-2xl","text-white","white-space-nowrap"],[1,"flex","align-items-center","justify-content-center","w-full","h-fullgap-2","bg-red-500","shadow-1","border-round-sm","border-none","cursor-pointer","hover:bg-red-600","transition-duration-200",2,"min-height","80px"]],template:function(t,n){1&t&&(e.TgZ(0,"div",0)(1,"div",1)(2,"div",2),e._uU(3),e.ALo(4,"titlecase"),e.qZA(),e.TgZ(5,"div",3),e._uU(6),e.qZA()(),e.TgZ(7,"div",4)(8,"div",5)(9,"div",6)(10,"div",7)(11,"div",8)(12,"div")(13,"span",9),e._uU(14,"Vend\xe9g"),e.qZA(),e.TgZ(15,"div",10),e._uU(16),e.qZA()()()()(),e.TgZ(17,"div",6)(18,"div",7)(19,"div",8)(20,"div")(21,"span",9),e._uU(22,"\xc9trend"),e.qZA(),e.TgZ(23,"div",10),e._uU(24),e.qZA()()()()()(),e.TgZ(25,"div",11)(26,"div",6)(27,"div",7)(28,"div",8)(29,"div")(30,"span",9),e._uU(31,"Koroszt\xe1ly"),e.qZA(),e.TgZ(32,"div",10),e._uU(33),e.qZA()()()()(),e.TgZ(34,"div",6)(35,"div",7)(36,"div",8)(37,"div")(38,"span",9),e._uU(39,"Konferencia"),e.qZA(),e.TgZ(40,"div",10),e._uU(41),e.qZA()()()()()(),e.TgZ(42,"div",11)(43,"div",6)(44,"div",7)(45,"div",8)(46,"div")(47,"span",9),e._uU(48,"M\xe1r kiadott \xe9telek sz\xe1ma"),e.qZA(),e.TgZ(49,"div",10),e._uU(50),e.qZA()()()()(),e.TgZ(51,"div",6)(52,"div",12)(53,"div",13),e.YNc(54,C,3,0,"button",14),e.YNc(55,y,3,0,"button",15),e.YNc(56,M,3,0,"button",15),e.YNc(57,E,3,0,"button",15),e.qZA()()()()()(),e._UZ(58,"p-toast")),2&t&&(e.xp6(1),e.Q6J("ngClass",n.isOpen?"bg-teal-500":"bg-red-500"),e.xp6(2),e.hij(" ",n.isOpen?e.lcZ(4,14,n.currentMeal):"Jelenleg nincs \xe9tkeztet\xe9s!"," "),e.xp6(3),e.hij(" ",n.scannedCode," "),e.xp6(1),e.Q6J("ngClass","bg-"+n.backgroundColor),e.xp6(9),e.AsE(" ",n.guest.lastName," ",n.guest.firstName,"\xa0 "),e.xp6(8),e.hij("",n.guest.diet,"\xa0"),e.xp6(9),e.hij("",n.ageGroup,"\xa0"),e.xp6(8),e.hij("",n.guest.conferenceName,"\xa0"),e.xp6(9),e.Oqu(n.mealsNumber),e.xp6(4),e.Q6J("ngIf",n.isOpen&&n.canEat&&!n.alreadyRecievedFood),e.xp6(1),e.Q6J("ngIf",n.isOpen&&!n.canEat),e.xp6(1),e.Q6J("ngIf",n.isOpen&&n.canEat&&n.alreadyRecievedFood),e.xp6(1),e.Q6J("ngIf",!n.isOpen))},dependencies:[u.mk,u.O5,m.FN,u.rS]})}return i})();var N=a(9502);let T=(()=>{class i{static#e=this.\u0275fac=function(t){return new(t||i)};static#t=this.\u0275mod=e.oAB({type:i});static#n=this.\u0275inj=e.cJS({imports:[d.Bz.forChild([{path:"",component:w}]),N.$,d.Bz]})}return i})();var A=a(707),x=a(1913),F=a(1567),S=a(6223),U=a(3714),D=a(8057),O=a(6760),z=a(3965),H=a(4532),R=a(3722),j=a(1865),B=a(3259);let G=(()=>{class i{static#e=this.\u0275fac=function(t){return new(t||i)};static#t=this.\u0275mod=e.oAB({type:i});static#n=this.\u0275inj=e.cJS({imports:[u.ez,T,S.UX,U.j,D.nD,O._8,z.kW,H.d,R.O,A.hJ,j.cc,d.Bz,x.l,F.h,m.EV,B.z]})}return i})()}}]);