"use strict";(self.webpackChunkapollo_ng=self.webpackChunkapollo_ng||[]).push([[9502],{4825:(y,f,c)=>{c.d(f,{H:()=>_});var p=c(5592),u=c(6321),e=c(671);function _(r=0,n,i=u.P){let a=-1;return null!=n&&((0,e.K)(n)?i=n:a=n),new p.y(m=>{let h=function d(r){return r instanceof Date&&!isNaN(r)}(r)?+r-i.now():r;h<0&&(h=0);let T=0;return i.schedule(function(){m.closed||(m.next(T++),0<=a?this.schedule(void 0,a):m.complete())},h)})}},1954:(y,f,c)=>{c.d(f,{o:()=>_});var p=c(7394);class u extends p.w0{constructor(n,i){super()}schedule(n,i=0){return this}}const e={setInterval(r,n,...i){const{delegate:a}=e;return a?.setInterval?a.setInterval(r,n,...i):setInterval(r,n,...i)},clearInterval(r){const{delegate:n}=e;return(n?.clearInterval||clearInterval)(r)},delegate:void 0};var d=c(9039);class _ extends u{constructor(n,i){super(n,i),this.scheduler=n,this.work=i,this.pending=!1}schedule(n,i=0){var a;if(this.closed)return this;this.state=n;const m=this.id,h=this.scheduler;return null!=m&&(this.id=this.recycleAsyncId(h,m,i)),this.pending=!0,this.delay=i,this.id=null!==(a=this.id)&&void 0!==a?a:this.requestAsyncId(h,this.id,i),this}requestAsyncId(n,i,a=0){return e.setInterval(n.flush.bind(n,this),a)}recycleAsyncId(n,i,a=0){if(null!=a&&this.delay===a&&!1===this.pending)return i;null!=i&&e.clearInterval(i)}execute(n,i){if(this.closed)return new Error("executing a cancelled action");this.pending=!1;const a=this._execute(n,i);if(a)return a;!1===this.pending&&null!=this.id&&(this.id=this.recycleAsyncId(this.scheduler,this.id,null))}_execute(n,i){let m,a=!1;try{this.work(n)}catch(h){a=!0,m=h||new Error("Scheduled action threw falsy error")}if(a)return this.unsubscribe(),m}unsubscribe(){if(!this.closed){const{id:n,scheduler:i}=this,{actions:a}=i;this.work=this.state=this.scheduler=null,this.pending=!1,(0,d.P)(a,this),null!=n&&(this.id=this.recycleAsyncId(i,n,null)),this.delay=null,super.unsubscribe()}}}},9931:(y,f,c)=>{c.d(f,{v:()=>e});const p={now:()=>(p.delegate||Date).now(),delegate:void 0};class u{constructor(_,r=u.now){this.schedulerActionCtor=_,this.now=r}schedule(_,r=0,n){return new this.schedulerActionCtor(this,_).schedule(n,r)}}u.now=p.now;class e extends u{constructor(_,r=u.now){super(_,r),this.actions=[],this._active=!1}flush(_){const{actions:r}=this;if(this._active)return void r.push(_);let n;this._active=!0;do{if(n=_.execute(_.state,_.delay))break}while(_=r.shift());if(this._active=!1,n){for(;_=r.shift();)_.unsubscribe();throw n}}}},6321:(y,f,c)=>{c.d(f,{P:()=>d,z:()=>e});var p=c(1954);const e=new(c(9931).v)(p.o),d=e},9502:(y,f,c)=>{c.d(f,{$:()=>N,V:()=>Y});var p=c(6825),u=c(6814),e=c(4769),d=c(5219),_=c(2591),r=c(2736),n=c(3823),i=c(7778),a=c(8468),m=c(4480),h=c(4825);function T(t,g){if(1&t&&e._UZ(0,"span"),2&t){const s=e.oxw().$implicit;e.Tol("p-message-icon pi "+s.icon)}}function x(t,g){1&t&&e._UZ(0,"CheckIcon")}function I(t,g){1&t&&e._UZ(0,"InfoCircleIcon")}function E(t,g){1&t&&e._UZ(0,"TimesCircleIcon")}function C(t,g){1&t&&e._UZ(0,"ExclamationTriangleIcon")}function b(t,g){if(1&t&&(e.TgZ(0,"span",10),e.ynx(1),e.YNc(2,x,1,0,"CheckIcon",11),e.YNc(3,I,1,0,"InfoCircleIcon",11),e.YNc(4,E,1,0,"TimesCircleIcon",11),e.YNc(5,C,1,0,"ExclamationTriangleIcon",11),e.BQk(),e.qZA()),2&t){const s=e.oxw().$implicit;e.xp6(2),e.Q6J("ngIf","success"===s.severity),e.xp6(1),e.Q6J("ngIf","info"===s.severity),e.xp6(1),e.Q6J("ngIf","error"===s.severity),e.xp6(1),e.Q6J("ngIf","warn"===s.severity)}}function O(t,g){if(1&t&&e._UZ(0,"span",14),2&t){const s=e.oxw(2).$implicit;e.Q6J("innerHTML",s.summary,e.oJD)}}function A(t,g){if(1&t&&e._UZ(0,"span",15),2&t){const s=e.oxw(2).$implicit;e.Q6J("innerHTML",s.detail,e.oJD)}}function w(t,g){if(1&t&&(e.ynx(0),e.YNc(1,O,1,1,"span",12),e.YNc(2,A,1,1,"span",13),e.BQk()),2&t){const s=e.oxw().$implicit;e.xp6(1),e.Q6J("ngIf",s.summary),e.xp6(1),e.Q6J("ngIf",s.detail)}}function D(t,g){if(1&t&&(e.TgZ(0,"span",18),e._uU(1),e.qZA()),2&t){const s=e.oxw(2).$implicit;e.xp6(1),e.Oqu(s.summary)}}function P(t,g){if(1&t&&(e.TgZ(0,"span",19),e._uU(1),e.qZA()),2&t){const s=e.oxw(2).$implicit;e.xp6(1),e.Oqu(s.detail)}}function S(t,g){if(1&t&&(e.YNc(0,D,2,1,"span",16),e.YNc(1,P,2,1,"span",17)),2&t){const s=e.oxw().$implicit;e.Q6J("ngIf",s.summary),e.xp6(1),e.Q6J("ngIf",s.detail)}}function L(t,g){if(1&t){const s=e.EpF();e.TgZ(0,"button",20),e.NdJ("click",function(){e.CHM(s);const l=e.oxw().index,v=e.oxw(2);return e.KtG(v.removeMessage(l))}),e._UZ(1,"TimesIcon",21),e.qZA()}2&t&&(e.xp6(1),e.Q6J("styleClass","p-message-close-icon"))}const k=function(t,g){return{showTransitionParams:t,hideTransitionParams:g}},Q=function(t){return{value:"visible",params:t}};function J(t,g){if(1&t&&(e.TgZ(0,"div",4)(1,"div",5),e.YNc(2,T,1,2,"span",6),e.YNc(3,b,6,4,"span",7),e.YNc(4,w,3,2,"ng-container",1),e.YNc(5,S,2,2,"ng-template",null,8,e.W1O),e.YNc(7,L,2,1,"button",9),e.qZA()()),2&t){const s=g.$implicit,o=e.MAs(6),l=e.oxw(2);e.Tol("p-message p-message-"+s.severity),e.Q6J("@messageAnimation",e.VKq(11,Q,e.WLB(8,k,l.showTransitionOptions,l.hideTransitionOptions))),e.xp6(2),e.Q6J("ngIf",s.icon),e.xp6(1),e.Q6J("ngIf",!s.icon),e.xp6(1),e.Q6J("ngIf",!l.escape)("ngIfElse",o),e.xp6(3),e.Q6J("ngIf",l.closable)}}function B(t,g){if(1&t&&(e.ynx(0),e.YNc(1,J,8,13,"div",3),e.BQk()),2&t){const s=e.oxw();e.xp6(1),e.Q6J("ngForOf",s.messages)}}function U(t,g){1&t&&e.GkF(0)}function Z(t,g){if(1&t&&(e.TgZ(0,"div",22)(1,"div",5),e.YNc(2,U,1,0,"ng-container",23),e.qZA()()),2&t){const s=e.oxw();e.Q6J("ngClass","p-message p-message-"+s.severity),e.xp6(2),e.Q6J("ngTemplateOutlet",s.contentTemplate)}}let Y=(()=>{class t{messageService;el;cd;set value(s){this.messages=s,this.startMessageLifes(this.messages)}closable=!0;style;styleClass;enableService=!0;key;escape=!0;severity;showTransitionOptions="300ms ease-out";hideTransitionOptions="200ms cubic-bezier(0.86, 0, 0.07, 1)";valueChange=new e.vpe;templates;messages;messageSubscription;clearSubscription;timerSubscriptions=[];contentTemplate;constructor(s,o,l){this.messageService=s,this.el=o,this.cd=l}ngAfterContentInit(){this.templates?.forEach(s=>{s.getType(),this.contentTemplate=s.template}),this.messageService&&this.enableService&&!this.contentTemplate&&(this.messageSubscription=this.messageService.messageObserver.subscribe(s=>{if(s){Array.isArray(s)||(s=[s]);const o=s.filter(l=>this.key===l.key);this.messages=this.messages?[...this.messages,...o]:[...o],this.startMessageLifes(o),this.cd.markForCheck()}}),this.clearSubscription=this.messageService.clearObserver.subscribe(s=>{s?this.key===s&&(this.messages=null):this.messages=null,this.cd.markForCheck()}))}hasMessages(){let s=this.el.nativeElement.parentElement;return!(!s||!s.offsetParent)&&(null!=this.contentTemplate||this.messages&&this.messages.length>0)}clear(){this.messages=[],this.valueChange.emit(this.messages)}removeMessage(s){this.messages=this.messages?.filter((o,l)=>l!==s),this.valueChange.emit(this.messages)}get icon(){const s=this.severity||(this.hasMessages()?this.messages[0].severity:null);if(this.hasMessages())switch(s){case"success":return"pi-check";case"info":default:return"pi-info-circle";case"error":return"pi-times";case"warn":return"pi-exclamation-triangle"}return null}ngOnDestroy(){this.messageSubscription&&this.messageSubscription.unsubscribe(),this.clearSubscription&&this.clearSubscription.unsubscribe(),this.timerSubscriptions?.forEach(s=>s.unsubscribe())}startMessageLifes(s){s?.forEach(o=>o.life&&this.startMessageLife(o))}startMessageLife(s){const o=(0,h.H)(s.life).subscribe(()=>{this.messages=this.messages?.filter(l=>l!==s),this.timerSubscriptions=this.timerSubscriptions?.filter(l=>l!==o),this.valueChange.emit(this.messages),this.cd.markForCheck()});this.timerSubscriptions.push(o)}static \u0275fac=function(o){return new(o||t)(e.Y36(d.ez,8),e.Y36(e.SBq),e.Y36(e.sBO))};static \u0275cmp=e.Xpm({type:t,selectors:[["p-messages"]],contentQueries:function(o,l,v){if(1&o&&e.Suo(v,d.jx,4),2&o){let M;e.iGM(M=e.CRH())&&(l.templates=M)}},hostAttrs:[1,"p-element"],inputs:{value:"value",closable:"closable",style:"style",styleClass:"styleClass",enableService:"enableService",key:"key",escape:"escape",severity:"severity",showTransitionOptions:"showTransitionOptions",hideTransitionOptions:"hideTransitionOptions"},outputs:{valueChange:"valueChange"},decls:4,vars:5,consts:[["role","alert",1,"p-messages","p-component",3,"ngStyle"],[4,"ngIf","ngIfElse"],["staticMessage",""],["role","alert",3,"class",4,"ngFor","ngForOf"],["role","alert"],[1,"p-message-wrapper"],[3,"class",4,"ngIf"],["class","p-message-icon",4,"ngIf"],["escapeOut",""],["class","p-message-close p-link","type","button","pRipple","",3,"click",4,"ngIf"],[1,"p-message-icon"],[4,"ngIf"],["class","p-message-summary",3,"innerHTML",4,"ngIf"],["class","p-message-detail",3,"innerHTML",4,"ngIf"],[1,"p-message-summary",3,"innerHTML"],[1,"p-message-detail",3,"innerHTML"],["class","p-message-summary",4,"ngIf"],["class","p-message-detail",4,"ngIf"],[1,"p-message-summary"],[1,"p-message-detail"],["type","button","pRipple","",1,"p-message-close","p-link",3,"click"],[3,"styleClass"],["role","alert",3,"ngClass"],[4,"ngTemplateOutlet"]],template:function(o,l){if(1&o&&(e.TgZ(0,"div",0),e.YNc(1,B,2,1,"ng-container",1),e.YNc(2,Z,3,2,"ng-template",null,2,e.W1O),e.qZA()),2&o){const v=e.MAs(3);e.Tol(l.styleClass),e.Q6J("ngStyle",l.style),e.xp6(1),e.Q6J("ngIf",!l.contentTemplate)("ngIfElse",v)}},dependencies:function(){return[u.mk,u.sg,u.O5,u.tP,u.PC,m.H,_.n,n.u,a.x,r.L,i.q]},styles:[".p-message-wrapper{display:flex;align-items:center}.p-message-close{display:flex;align-items:center;justify-content:center}.p-message-close.p-link{margin-left:auto;overflow:hidden;position:relative}.p-messages .p-message.ng-animating{overflow:hidden}\n"],encapsulation:2,data:{animation:[(0,p.X$)("messageAnimation",[(0,p.eR)(":enter",[(0,p.oB)({opacity:0,transform:"translateY(-25%)"}),(0,p.jt)("{{showTransitionParams}}")]),(0,p.eR)(":leave",[(0,p.jt)("{{hideTransitionParams}}",(0,p.oB)({height:0,marginTop:0,marginBottom:0,marginLeft:0,marginRight:0,opacity:0}))])])]},changeDetection:0})}return t})(),N=(()=>{class t{static \u0275fac=function(o){return new(o||t)};static \u0275mod=e.oAB({type:t});static \u0275inj=e.cJS({imports:[u.ez,m.T,_.n,n.u,a.x,r.L,i.q]})}return t})()}}]);