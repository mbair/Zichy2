"use strict";(self.webpackChunknfc_reserve=self.webpackChunknfc_reserve||[]).push([[2043],{2043:(g,E,t)=>{t.r(E),t.d(E,{AuthModule:()=>a});var e=t(6814),d=t(9739),h=t(2029);let m=(()=>{class n{static#t=this.\u0275fac=function(r){return new(r||n)};static#o=this.\u0275mod=h.oAB({type:n});static#s=this.\u0275inj=h.cJS({imports:[d.Bz.forChild([{path:"error",loadChildren:()=>t.e(5938).then(t.bind(t,5938)).then(o=>o.ErrorModule)},{path:"access",loadChildren:()=>t.e(2514).then(t.bind(t,2514)).then(o=>o.AccessdeniedModule)},{path:"login",loadChildren:()=>Promise.all([t.e(3521),t.e(4793),t.e(2105)]).then(t.bind(t,2105)).then(o=>o.LoginModule)},{path:"forgotpassword",loadChildren:()=>Promise.all([t.e(3521),t.e(8592),t.e(7851)]).then(t.bind(t,6476)).then(o=>o.ForgotPasswordModule)},{path:"register",loadChildren:()=>Promise.all([t.e(1111),t.e(4793),t.e(2426)]).then(t.bind(t,2426)).then(o=>o.RegisterModule)},{path:"newpassword",loadChildren:()=>Promise.all([t.e(3521),t.e(4793),t.e(5639)]).then(t.bind(t,5639)).then(o=>o.NewPasswordModule)},{path:"verification",loadChildren:()=>Promise.all([t.e(1111),t.e(8798)]).then(t.bind(t,8798)).then(o=>o.VerificationModule)},{path:"lockscreen",loadChildren:()=>Promise.all([t.e(1111),t.e(6446)]).then(t.bind(t,6446)).then(o=>o.LockScreenModule)},{path:"**",redirectTo:"/notfound"}]),d.Bz]})}return n})();var P=t(1850),M=t(9862);let a=(()=>{class n{static#t=this.\u0275fac=function(r){return new(r||n)};static#o=this.\u0275mod=h.oAB({type:n});static#s=this.\u0275inj=h.cJS({providers:[P.e],imports:[e.ez,m,M.JF]})}return n})()},1850:(g,E,t)=>{t.d(E,{e:()=>r});var e=t(9397),d=t(940),h=t(6306),m=t(6676),M=t(8504),a=t(2029),n=t(9862),f=t(8814),o=t(9739);m.locale("hu");let r=(()=>{class i{constructor(s,l,v){this.http=s,this.apiService=l,this.router=v,this.apiURL=this.apiService.apiURL}login(s,l){return this.http.post(`${this.apiURL}/users/login`,{email:s,password:l},{observe:"response"}).pipe((0,e.b)(v=>this.setSession(v)),(0,d.d)(),(0,h.K)(this.handleError))}logout(){localStorage.removeItem("token"),localStorage.removeItem("userRole"),localStorage.removeItem("fullName")}passwordReset(s){return this.http.get(`${this.apiURL}/users/forgotpassrequest/${s}`,{observe:"response"}).pipe((0,e.b)(l=>console.log(l)),(0,d.d)(),(0,h.K)(this.handleError))}passwordRenew(s){return this.http.get(`${this.apiURL}/users/xxxxxxxxxxxxx/${s}`,{observe:"response"}).pipe((0,e.b)(l=>console.log(l)),(0,d.d)(),(0,h.K)(this.handleError))}setSession(s){console.log("authResult",s),localStorage.setItem("token",s.headers.get("Authorization")||""),localStorage.setItem("userRole",s.body.role),localStorage.setItem("fullName",s.body.fullName)}handleError(s){return(0,M._)(JSON.parse(JSON.stringify(s)))}static#t=this.\u0275fac=function(l){return new(l||i)(a.LFG(n.eN),a.LFG(f.s),a.LFG(o.F0))};static#o=this.\u0275prov=a.Yz7({token:i,factory:i.\u0275fac})}return i})()}}]);