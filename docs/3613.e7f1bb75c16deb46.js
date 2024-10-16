"use strict";(self.webpackChunknfc_reserve=self.webpackChunknfc_reserve||[]).push([[3613],{3613:(V,g,r)=>{r.r(g),r.d(g,{EcommerceDashboardModule:()=>F});var d=r(6814),v=r(9739),M=r(7582),A=r(4279),f=r(5219),U=r(6676),t=r(2029),b=r(5619),C=r(8814);let _=(()=>{class s{constructor(e){this.apiService=e,this.apiURL=e.apiURL,this.data$=new b.X(null),this.message$=new b.X(null)}get dashboardObs(){return this.data$.asObservable()}get messageObs(){return this.message$.asObservable()}getInformations(){this.apiService.get("dashboard/getinformations").subscribe({next:e=>{this.data$.next(e)},error:e=>{this.message$.next(e)}})}static#t=this.\u0275fac=function(i){return new(i||s)(t.LFG(C.s))};static#e=this.\u0275prov=t.Yz7({token:s,factory:s.\u0275fac,providedIn:"root"})}return s})(),E=(()=>{class s{constructor(e){this.apiService=e,this.activities=[{activityName:"Bejelentkez\xe9s",userName:"Timi",timestamp:new Date},{activityName:"Szoba hozz\xe1rendel\xe9s",userName:"Admin",timestamp:new Date},{activityName:"Jelentkez\xe9s elutas\xedt\xe1s",userName:"Admin",timestamp:new Date},{activityName:"Konyhanapt\xe1r megtekint\xe9se",userName:"Konyha admin",timestamp:new Date},{activityName:"Takar\xf3 hozz\xe1ad\xe1sa",userName:"Tak. admin",timestamp:new Date}]}getActivities(){return this.activities}addActivity(e){this.activities.push(e)}getInformation(){this.apiService.get("dashboard/getinformations").subscribe({next:e=>{},error:e=>{}})}static#t=this.\u0275fac=function(i){return new(i||s)(t.LFG(C.s))};static#e=this.\u0275prov=t.Yz7({token:s,factory:s.\u0275fac,providedIn:"root"})}return s})();var S=r(3859),y=r(707),w=r(4480),Z=r(2352),u=r(6223),h=r(9664),T=r(3714),x=r(9252);function D(s,n){if(1&s&&(t.O4$(),t.TgZ(0,"text",5),t._uU(1),t.qZA()),2&s){const e=t.oxw();t.uIk("x",50)("y",57)("fill",e.textColor)("name",e.name),t.xp6(1),t.Oqu(e.valueToDisplay())}}const q={provide:u.JU,useExisting:(0,t.Gpc)(()=>k),multi:!0};let k=(()=>{class s{document;renderer;cd;el;styleClass;style;valueColor="var(--primary-color, Black)";rangeColor="var(--surface-border, LightGray)";textColor="var(--text-color-secondary, Black)";valueTemplate="{value}";name;size=100;step=1;min=0;max=100;strokeWidth=14;disabled;showValue=!0;readonly=!1;onChange=new t.vpe;radius=40;midX=50;midY=50;minRadians=4*Math.PI/3;maxRadians=-Math.PI/3;value=0;windowMouseMoveListener;windowMouseUpListener;windowTouchMoveListener;windowTouchEndListener;onModelChange=()=>{};onModelTouched=()=>{};constructor(e,i,a,l){this.document=e,this.renderer=i,this.cd=a,this.el=l}mapRange(e,i,a,l,o){return(e-i)*(o-l)/(a-i)+l}onClick(e){!this.disabled&&!this.readonly&&this.updateValue(e.offsetX,e.offsetY)}updateValue(e,i){let o=Math.atan2(this.size/2-i,e-this.size/2),m=-Math.PI/2-Math.PI/6;this.updateModel(o,m)}updateModel(e,i){let a;if(e>this.maxRadians)a=this.mapRange(e,this.minRadians,this.maxRadians,this.min,this.max);else{if(!(e<i))return;a=this.mapRange(e+2*Math.PI,this.minRadians,this.maxRadians,this.min,this.max)}let l=Math.round((a-this.min)/this.step)*this.step+this.min;this.value=l,this.onModelChange(this.value),this.onChange.emit(this.value)}onMouseDown(e){if(!this.disabled&&!this.readonly){const i=this.document.defaultView||"window";this.windowMouseMoveListener=this.renderer.listen(i,"mousemove",this.onMouseMove.bind(this)),this.windowMouseUpListener=this.renderer.listen(i,"mouseup",this.onMouseUp.bind(this)),e.preventDefault()}}onMouseUp(e){!this.disabled&&!this.readonly&&(this.windowMouseMoveListener&&(this.windowMouseMoveListener(),this.windowMouseUpListener=null),this.windowMouseUpListener&&(this.windowMouseUpListener(),this.windowMouseMoveListener=null),e.preventDefault())}onTouchStart(e){if(!this.disabled&&!this.readonly){const i=this.document.defaultView||"window";this.windowTouchMoveListener=this.renderer.listen(i,"touchmove",this.onTouchMove.bind(this)),this.windowTouchEndListener=this.renderer.listen(i,"touchend",this.onTouchEnd.bind(this)),e.preventDefault()}}onTouchEnd(e){!this.disabled&&!this.readonly&&(this.windowTouchMoveListener&&this.windowTouchMoveListener(),this.windowTouchEndListener&&this.windowTouchEndListener(),this.windowTouchMoveListener=null,this.windowTouchEndListener=null,e.preventDefault())}onMouseMove(e){!this.disabled&&!this.readonly&&(this.updateValue(e.offsetX,e.offsetY),e.preventDefault())}onTouchMove(e){if(!this.disabled&&!this.readonly&&e instanceof TouchEvent&&1===e.touches.length){const i=this.el.nativeElement.children[0].getBoundingClientRect(),a=e.targetTouches.item(0);a&&this.updateValue(a.clientX-i.left,a.clientY-i.top)}}writeValue(e){this.value=e,this.cd.markForCheck()}registerOnChange(e){this.onModelChange=e}registerOnTouched(e){this.onModelTouched=e}setDisabledState(e){this.disabled=e,this.cd.markForCheck()}containerClass(){return{"p-knob p-component":!0,"p-disabled":this.disabled}}rangePath(){return`M ${this.minX()} ${this.minY()} A ${this.radius} ${this.radius} 0 1 1 ${this.maxX()} ${this.maxY()}`}valuePath(){return`M ${this.zeroX()} ${this.zeroY()} A ${this.radius} ${this.radius} 0 ${this.largeArc()} ${this.sweep()} ${this.valueX()} ${this.valueY()}`}zeroRadians(){return this.mapRange(this.min>0&&this.max>0?this.min:0,this.min,this.max,this.minRadians,this.maxRadians)}valueRadians(){return this.mapRange(this._value,this.min,this.max,this.minRadians,this.maxRadians)}minX(){return this.midX+Math.cos(this.minRadians)*this.radius}minY(){return this.midY-Math.sin(this.minRadians)*this.radius}maxX(){return this.midX+Math.cos(this.maxRadians)*this.radius}maxY(){return this.midY-Math.sin(this.maxRadians)*this.radius}zeroX(){return this.midX+Math.cos(this.zeroRadians())*this.radius}zeroY(){return this.midY-Math.sin(this.zeroRadians())*this.radius}valueX(){return this.midX+Math.cos(this.valueRadians())*this.radius}valueY(){return this.midY-Math.sin(this.valueRadians())*this.radius}largeArc(){return Math.abs(this.zeroRadians()-this.valueRadians())<Math.PI?0:1}sweep(){return this.valueRadians()>this.zeroRadians()?0:1}valueToDisplay(){return this.valueTemplate.replace("{value}",this._value.toString())}get _value(){return null!=this.value?this.value:this.min}static \u0275fac=function(i){return new(i||s)(t.Y36(d.K0),t.Y36(t.Qsj),t.Y36(t.sBO),t.Y36(t.SBq))};static \u0275cmp=t.Xpm({type:s,selectors:[["p-knob"]],hostAttrs:[1,"p-element"],inputs:{styleClass:"styleClass",style:"style",valueColor:"valueColor",rangeColor:"rangeColor",textColor:"textColor",valueTemplate:"valueTemplate",name:"name",size:"size",step:"step",min:"min",max:"max",strokeWidth:"strokeWidth",disabled:"disabled",showValue:"showValue",readonly:"readonly"},outputs:{onChange:"onChange"},features:[t._Bn([q])],decls:5,vars:15,consts:[[3,"ngClass","ngStyle"],["viewBox","0 0 100 100",3,"click","mousedown","mouseup","touchstart","touchend"],[1,"p-knob-range"],[1,"p-knob-value"],["text-anchor","middle","class","p-knob-text",4,"ngIf"],["text-anchor","middle",1,"p-knob-text"]],template:function(i,a){1&i&&(t.TgZ(0,"div",0),t.O4$(),t.TgZ(1,"svg",1),t.NdJ("click",function(o){return a.onClick(o)})("mousedown",function(o){return a.onMouseDown(o)})("mouseup",function(o){return a.onMouseUp(o)})("touchstart",function(o){return a.onTouchStart(o)})("touchend",function(o){return a.onTouchEnd(o)}),t._UZ(2,"path",2)(3,"path",3),t.YNc(4,D,2,5,"text",4),t.qZA()()),2&i&&(t.Tol(a.styleClass),t.Q6J("ngClass",a.containerClass())("ngStyle",a.style),t.xp6(1),t.Udp("width",a.size+"px")("height",a.size+"px"),t.xp6(1),t.uIk("d",a.rangePath())("stroke-width",a.strokeWidth)("stroke",a.rangeColor),t.xp6(1),t.uIk("d",a.valuePath())("stroke-width",a.strokeWidth)("stroke",a.valueColor),t.xp6(1),t.Q6J("ngIf",a.showValue))},dependencies:[d.mk,d.O5,d.PC],styles:["@keyframes dash-frame{to{stroke-dashoffset:0}}.p-knob-range{fill:none;transition:stroke .1s ease-in}.p-knob-value{animation-name:dash-frame;animation-fill-mode:forwards;fill:none}.p-knob-text{font-size:1.3rem;text-align:center}\n"],encapsulation:2,changeDetection:0})}return s})(),R=(()=>{class s{static \u0275fac=function(i){return new(i||s)};static \u0275mod=t.oAB({type:s});static \u0275inj=t.cJS({imports:[d.ez]})}return s})();function z(s,n){1&s&&(t.TgZ(0,"tr")(1,"th",43),t._uU(2,"N\xe9v "),t._UZ(3,"p-sortIcon",44),t.qZA(),t.TgZ(4,"th",45),t._uU(5,"Kateg\xf3ria "),t._UZ(6,"p-sortIcon",46),t.qZA(),t.TgZ(7,"th",47),t._uU(8,"\xc1r "),t._UZ(9,"p-sortIcon",48),t.qZA(),t.TgZ(10,"th",49),t._uU(11,"St\xe1tusz "),t._UZ(12,"p-sortIcon",50),t.qZA(),t._UZ(13,"th"),t.qZA())}function L(s,n){if(1&s&&(t.TgZ(0,"tr")(1,"td"),t._uU(2),t.qZA(),t.TgZ(3,"td")(4,"span",51),t._uU(5,"Kateg\xf3ria"),t.qZA(),t._uU(6),t.qZA(),t.TgZ(7,"td")(8,"span",51),t._uU(9,"\xc1r"),t.qZA(),t._uU(10),t.ALo(11,"currency"),t.qZA(),t.TgZ(12,"td")(13,"span",51),t._uU(14,"St\xe1tusz"),t.qZA(),t.TgZ(15,"span"),t._uU(16),t.qZA()(),t.TgZ(17,"td",52),t._UZ(18,"button",53),t.qZA()()),2&s){const e=n.$implicit;t.xp6(2),t.Oqu(e.name),t.xp6(4),t.hij(" ",e.category,""),t.xp6(4),t.hij(" ",t.xi3(11,6,e.price,"USD"),""),t.xp6(5),t.Tol("product-badge status-"+(null==e.inventoryStatus?null:e.inventoryStatus.toLowerCase())),t.xp6(1),t.Oqu(e.inventoryStatus)}}function O(s,n){1&s&&(t.TgZ(0,"tr")(1,"th"),t._uU(2,"Tev\xe9kenys\xe9g"),t.qZA(),t.TgZ(3,"th"),t._uU(4,"Felhaszn\xe1l\xf3"),t.qZA(),t.TgZ(5,"th"),t._uU(6,"Id\u0151pont"),t.qZA()())}function P(s,n){if(1&s&&(t.TgZ(0,"tr")(1,"td"),t._uU(2),t.qZA(),t.TgZ(3,"td"),t._uU(4),t.qZA(),t.TgZ(5,"td"),t._uU(6),t.ALo(7,"date"),t.qZA()()),2&s){const e=n.$implicit;t.xp6(2),t.Oqu(e.activityName),t.xp6(2),t.Oqu(e.userName),t.xp6(2),t.Oqu(t.xi3(7,3,e.timestamp,"yyyy-MM-dd HH:mm:ss"))}}const Y=function(){return["name","category","inventoryStatus"]};U.locale("hu");let c=class p{constructor(n,e,i){this.dashboardService=n,this.activityService=e,this.layoutService=i,this.loading=!0,this.activities=[],this.weeks=[],this.products=[],this.cols=[],this.rfidPercentage=85,this.conferences={active:0,inactive:0},this.guests={active:0,inactive:0},this.rooms={active:0,inactive:0},this.tags={active:0,inactive:0},this.adults=0,this.childrens=0,this.totals={active:{conferences:0,guests:0,rooms:0,tags:0}},this.subscription=this.layoutService.configUpdate$.subscribe(a=>{this.initCharts()})}ngOnInit(){this.dashboardObs$=this.dashboardService.dashboardObs,this.dashboardObs$.subscribe(n=>{console.log("data",n),this.loading=!1,n&&(console.log("data",n),this.conferences=n.conferences,this.guests=n.guests,this.rooms.active=106,this.tags=n.tags,this.rfidPercentage=Number((n.tags.used/n.tags.active*100).toFixed(0)),this.adults=Number(this.guests.guestsAge[0].adults),this.childrens=parseFloat(this.guests.guestsAge[0].childrens),this.initCharts())}),this.dashboardService.getInformations(),this.activities=this.activityService.getActivities(),this.information=this.activityService.getInformation(),this.weeks=[{label:"El\u0151z\u0151 h\xe9t",value:0,data:[[65,59,80,81,56,55,40],[28,48,40,19,86,27,90]]},{label:"Aktu\xe1lis h\xe9t",value:1,data:[[35,19,40,61,16,55,30],[48,78,10,29,76,77,10]]}],this.selectedWeek=this.weeks[0],this.initCharts(),this.cols=[{header:"N\xe9v",field:"name"},{header:"Kateg\xf3ria",field:"category"},{header:"\xc1r",field:"price"},{header:"St\xe1tusz",field:"inventoryStatus"}]}initCharts(){const n=getComputedStyle(document.documentElement),e=n.getPropertyValue("--text-color"),i=n.getPropertyValue("--text-color-secondary"),a=n.getPropertyValue("--surface-border");this.barData={labels:["H\xc9T","KED","SZE","CS\xdc","P\xc9N","SZO","VAS"],datasets:[{label:"Bev\xe9tel",backgroundColor:n.getPropertyValue("--primary-500"),barThickness:12,borderRadius:12,data:this.selectedWeek.data[0]},{label:"Profit",backgroundColor:n.getPropertyValue("--primary-200"),barThickness:12,borderRadius:12,data:this.selectedWeek.data[1]}]},this.pieData={labels:["Feln\u0151tt","Gyerek"],datasets:[{data:[this.adults,this.childrens],backgroundColor:[n.getPropertyValue("--primary-700"),n.getPropertyValue("--primary-100")],hoverBackgroundColor:[n.getPropertyValue("--primary-600"),n.getPropertyValue("--primary-300"),n.getPropertyValue("--primary-200")]}]},this.barOptions={animation:{duration:0},plugins:{legend:{labels:{color:e,usePointStyle:!0,font:{weight:700},padding:28},position:"bottom"}},scales:{x:{ticks:{color:i,font:{weight:500}},grid:{display:!1,drawBorder:!1}},y:{ticks:{color:i},grid:{color:a,drawBorder:!1}}}},this.pieOptions={animation:{duration:0},plugins:{legend:{labels:{color:e,usePointStyle:!0,font:{weight:700},padding:28},position:"bottom"}}}}onWeekChange(){let n={...this.barData};n.datasets[0].data=this.selectedWeek.data[0],n.datasets[1].data=this.selectedWeek.data[1],this.barData=n}onGlobalFilter(n,e){n.filterGlobal(e.target.value,"contains")}ngOnDestroy(){}static#t=this.\u0275fac=function(e){return new(e||p)(t.Y36(_),t.Y36(E),t.Y36(S.P))};static#e=this.\u0275cmp=t.Xpm({type:p,selectors:[["ng-component"]],features:[t._Bn([f.ez])],decls:93,vars:22,consts:[[1,"grid"],[1,"col-12","md:col-6","xl:col-3"],[1,"card","h-full"],[1,"font-semibold","text-lg"],[1,"flex","justify-content-between","align-items-start","mt-3"],[1,"w-6"],[1,"text-4xl","font-bold","text-900"],[1,"text-green-500"],[1,"font-medium"],[1,"pi","pi-arrow-up","text-xs","ml-2"],["width","100%","viewBox","0 0 258 96","fill","none","xmlns","http://www.w3.org/2000/svg"],["d","M1 93.9506L4.5641 94.3162C8.12821 94.6817 15.2564 95.4128 22.3846 89.6451C29.5128 83.8774 36.641 71.6109 43.7692 64.4063C50.8974 57.2018 58.0256 55.0592 65.1538 58.9268C72.2821 62.7945 79.4103 72.6725 86.5385 73.5441C93.6667 74.4157 100.795 66.2809 107.923 65.9287C115.051 65.5765 122.179 73.0068 129.308 66.8232C136.436 60.6396 143.564 40.8422 150.692 27.9257C157.821 15.0093 164.949 8.97393 172.077 6.43766C179.205 3.9014 186.333 4.86425 193.462 12.0629C200.59 19.2616 207.718 32.696 214.846 31.0487C221.974 29.4014 229.103 12.6723 236.231 5.64525C243.359 -1.38178 250.487 1.29325 254.051 2.63076L257.615 3.96827","stroke","10",2,"stroke-width","2px","stroke","var(--primary-color)"],["width","100%","viewBox","0 0 115 41","fill","none","xmlns","http://www.w3.org/2000/svg"],["d","M1 35.6498L2.24444 32.4319C3.48889 29.214 5.97778 22.7782 8.46667 20.3627C10.9556 17.9473 13.4444 19.5522 15.9333 21.7663C18.4222 23.9803 20.9111 26.8035 23.4 30.6606C25.8889 34.5176 28.3778 39.4085 30.8667 37.2137C33.3556 35.0189 35.8444 25.7383 38.3333 26.3765C40.8222 27.0146 43.3111 37.5714 45.8 38.9013C48.2889 40.2311 50.7778 32.3341 53.2667 31.692C55.7556 31.0499 58.2444 37.6628 60.7333 39.4617C63.2222 41.2607 65.7111 38.2458 68.2 34.9205C70.6889 31.5953 73.1778 27.9597 75.6667 23.5955C78.1556 19.2313 80.6444 14.1385 83.1333 13.8875C85.6222 13.6365 88.1111 18.2272 90.6 20.2425C93.0889 22.2578 95.5778 21.6977 98.0667 18.8159C100.556 15.9341 103.044 10.7306 105.533 7.37432C108.022 4.01806 110.511 2.50903 111.756 1.75451L113 1",2,"stroke-width","1px","stroke","var(--primary-color)"],[1,"text-pink-500"],[1,"pi","pi-arrow-down","text-xs","ml-2"],["d","M1.5 1L2.74444 2.61495C3.98889 4.2299 6.47778 7.4598 8.96667 9.07151C11.4556 10.6832 13.9444 10.6767 16.4333 11.6127C18.9222 12.5487 21.4111 14.4271 23.9 16.6724C26.3889 18.9178 28.8778 21.5301 31.3667 20.1977C33.8556 18.8652 36.3444 13.5878 38.8333 11.3638C41.3222 9.13969 43.8111 9.96891 46.3 11.9894C48.7889 14.0099 51.2778 17.2217 53.7667 16.2045C56.2556 15.1873 58.7444 9.9412 61.2333 11.2783C63.7222 12.6155 66.2111 20.5359 68.7 21.4684C71.1889 22.401 73.6778 16.3458 76.1667 16.0009C78.6556 15.6561 81.1444 21.0217 83.6333 24.2684C86.1222 27.515 88.6111 28.6428 91.1 27.4369C93.5889 26.2311 96.0778 22.6916 98.5667 22.7117C101.056 22.7317 103.544 26.3112 106.033 29.7859C108.522 33.2605 111.011 36.6302 112.256 38.3151L113.5 40",2,"stroke-width","1px","stroke","var(--pink-500)"],[1,"w-6","text-right"],["valueTemplate","{value}%","styleClass","-mt-5",3,"ngModel","readonly","strokeWidth","size","ngModelChange"],[1,"col-12","xl:col-9"],[1,"flex","align-items-start","justify-content-between","mb-6"],[1,"text-900","text-xl","font-semibold"],["styleClass","w-10rem","optionLabel","label",3,"options","ngModel","ngModelChange","onChange"],["type","bar","height","300px",3,"data","options"],[1,"col-12","xl:col-3"],[1,"text-900","text-xl","font-semibold","mb-6"],["type","pie","height","300px",3,"data","options"],[1,"col-12","lg:col-8"],[1,"card"],[1,"flex","flex-column","md:flex-row","md:align-items-start","md:justify-content-between","mb-3"],[1,"text-900","text-xl","font-semibold","mb-3","md:mb-0"],[1,"inline-flex","align-items-center"],[1,"p-input-icon-left","flex-auto"],[1,"pi","pi-search"],["pInputText","","type","text","placeholder","Search",1,"w-full",2,"border-radius","2rem",3,"input"],["pButton","","pRipple","","icon","pi pi-upload",1,"p-button-rounded","mx-3",3,"click"],["responsiveLayout","scroll",3,"value","columns","paginator","rows","globalFilterFields"],["dt",""],["pTemplate","header"],["pTemplate","body"],[1,"col-12","lg:col-4"],[1,"text-900","text-xl","font-semibold","mb-3"],[3,"value"],["pSortableColumn","name",1,"white-space-nowrap",2,"min-width","12rem"],["field","name"],["pSortableColumn","category",1,"white-space-nowrap",2,"min-width","10rem"],["field","category"],["pSortableColumn","price",1,"white-space-nowrap",2,"min-width","10rem"],["field","price"],["pSortableColumn","inventoryStatus",1,"white-space-nowrap",2,"min-width","10rem"],["field","inventoryStatus"],[1,"p-column-title"],[2,"text-align","center"],["pButton","","type","button","icon","pi pi-search",1,"p-button-outlined","p-button-rounded"]],template:function(e,i){if(1&e){const a=t.EpF();t.TgZ(0,"div",0)(1,"div",1)(2,"div",2)(3,"span",3),t._uU(4,"Konferenci\xe1k"),t.qZA(),t.TgZ(5,"div",4)(6,"div",5)(7,"span",6),t._uU(8),t.qZA(),t.TgZ(9,"div",7)(10,"span",8),t._uU(11,"+00%"),t.qZA(),t._UZ(12,"i",9),t.qZA()(),t.TgZ(13,"div",5),t.O4$(),t.TgZ(14,"svg",10),t._UZ(15,"path",11),t.qZA()()()()(),t.kcU(),t.TgZ(16,"div",1)(17,"div",2)(18,"span",3),t._uU(19,"Vend\xe9gek"),t.qZA(),t.TgZ(20,"div",4)(21,"div",5)(22,"span",6),t._uU(23),t.qZA(),t.TgZ(24,"div",7)(25,"span",8),t._uU(26,"+00%"),t.qZA(),t._UZ(27,"i",9),t.qZA()(),t.TgZ(28,"div",5),t.O4$(),t.TgZ(29,"svg",12),t._UZ(30,"path",13),t.qZA()()()()(),t.kcU(),t.TgZ(31,"div",1)(32,"div",2)(33,"span",3),t._uU(34,"Szob\xe1k"),t.qZA(),t.TgZ(35,"div",4)(36,"div",5)(37,"span",6),t._uU(38),t.qZA(),t.TgZ(39,"div",14)(40,"span",8),t._uU(41,"+00%"),t.qZA(),t._UZ(42,"i",15),t.qZA()(),t.TgZ(43,"div",5),t.O4$(),t.TgZ(44,"svg",12),t._UZ(45,"path",16),t.qZA()()()()(),t.kcU(),t.TgZ(46,"div",1)(47,"div",2)(48,"span",3),t._uU(49,"RFID C\xedmk\xe9k"),t.qZA(),t.TgZ(50,"div",4)(51,"div",5)(52,"span",6),t._uU(53),t.qZA(),t.TgZ(54,"div",7)(55,"span",8),t._uU(56,"+00%"),t.qZA(),t._UZ(57,"i",9),t.qZA()(),t.TgZ(58,"div",17)(59,"p-knob",18),t.NdJ("ngModelChange",function(o){return i.rfidPercentage=o}),t.qZA()()()()(),t.TgZ(60,"div",19)(61,"div",2)(62,"div",20)(63,"span",21),t._uU(64,"Bev\xe9telek \xe1ttekint\xe9se"),t.qZA(),t.TgZ(65,"p-dropdown",22),t.NdJ("ngModelChange",function(o){return i.selectedWeek=o})("onChange",function(){return i.onWeekChange()}),t.qZA()(),t._UZ(66,"p-chart",23),t.qZA()(),t.TgZ(67,"div",24)(68,"div",2)(69,"div",25),t._uU(70,"Koroszt\xe1lyok"),t.qZA(),t._UZ(71,"p-chart",26),t.qZA()(),t.TgZ(72,"div",27)(73,"div",28)(74,"div",29)(75,"div",30),t._uU(76,"Legut\xf3bbi \xe9rt\xe9kes\xedt\xe9sek"),t.qZA(),t.TgZ(77,"div",31)(78,"span",32),t._UZ(79,"i",33),t.TgZ(80,"input",34),t.NdJ("input",function(o){t.CHM(a);const m=t.MAs(83);return t.KtG(i.onGlobalFilter(m,o))}),t.qZA()(),t.TgZ(81,"button",35),t.NdJ("click",function(){t.CHM(a);const o=t.MAs(83);return t.KtG(o.exportCSV())}),t.qZA()()(),t.TgZ(82,"p-table",36,37),t.YNc(84,z,14,0,"ng-template",38),t.YNc(85,L,19,9,"ng-template",39),t.qZA()()(),t.TgZ(86,"div",40)(87,"div",2)(88,"div",41),t._uU(89,"Tev\xe9kenys\xe9gek"),t.qZA(),t.TgZ(90,"p-table",42),t.YNc(91,O,7,0,"ng-template",38),t.YNc(92,P,8,6,"ng-template",39),t.qZA()()()()}2&e&&(t.xp6(8),t.Oqu(i.conferences.active||0),t.xp6(15),t.Oqu(i.guests.active||0),t.xp6(15),t.Oqu(i.rooms.active||0),t.xp6(15),t.AsE("",i.tags.used||0," / ",(null==i.tags?null:i.tags.active)||0,""),t.xp6(6),t.Q6J("ngModel",i.rfidPercentage)("readonly",!0)("strokeWidth",2)("size",90),t.xp6(6),t.Q6J("options",i.weeks)("ngModel",i.selectedWeek),t.xp6(1),t.Q6J("data",i.barData)("options",i.barOptions),t.xp6(5),t.Q6J("data",i.pieData)("options",i.pieOptions),t.xp6(11),t.Q6J("value",i.products)("columns",i.cols)("paginator",!0)("rows",5)("globalFilterFields",t.DdM(21,Y)),t.xp6(8),t.Q6J("value",i.activities))},dependencies:[y.Hq,f.jx,w.H,Z.Lt,u.JJ,u.On,h.iA,h.lQ,h.fz,T.o,x.C,k,d.H9,d.uU],encapsulation:2})};c=(0,M.gn)([(0,A.k)()],c);let $=(()=>{class s{static#t=this.\u0275fac=function(i){return new(i||s)};static#e=this.\u0275mod=t.oAB({type:s});static#i=this.\u0275inj=t.cJS({imports:[v.Bz.forChild([{path:"",component:c}]),v.Bz]})}return s})();var N=r(6218),B=r(6022);let F=(()=>{class s{static#t=this.\u0275fac=function(i){return new(i||s)};static#e=this.\u0275mod=t.oAB({type:s});static#i=this.\u0275inj=t.cJS({imports:[d.ez,$,y.hJ,w.T,Z.kW,u.u5,h.U$,T.j,N.A,x.S,B.Xt,R]})}return s})()}}]);