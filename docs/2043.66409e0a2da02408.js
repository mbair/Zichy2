"use strict";(self.webpackChunknfc_reserve=self.webpackChunknfc_reserve||[]).push([[2043],{2043:(P,m,o)=>{o.r(m),o.d(m,{AuthModule:()=>a});var h=o(6814),d=o(9739),e=o(2029);let g=(()=>{class l{static#o=this.\u0275fac=function(r){return new(r||l)};static#t=this.\u0275mod=e.oAB({type:l});static#s=this.\u0275inj=e.cJS({imports:[d.Bz.forChild([{path:"error",loadChildren:()=>o.e(5938).then(o.bind(o,5938)).then(t=>t.ErrorModule)},{path:"access",loadChildren:()=>o.e(2514).then(o.bind(o,2514)).then(t=>t.AccessdeniedModule)},{path:"login",loadChildren:()=>Promise.all([o.e(3521),o.e(1423),o.e(2105)]).then(o.bind(o,2105)).then(t=>t.LoginModule)},{path:"forgotpassword",loadChildren:()=>Promise.all([o.e(3521),o.e(8592),o.e(7851)]).then(o.bind(o,6476)).then(t=>t.ForgotPasswordModule)},{path:"register",loadChildren:()=>Promise.all([o.e(1423),o.e(1111),o.e(2426)]).then(o.bind(o,2426)).then(t=>t.RegisterModule)},{path:"newpassword",loadChildren:()=>Promise.all([o.e(3521),o.e(1423),o.e(8592),o.e(8632)]).then(o.bind(o,4632)).then(t=>t.NewPasswordModule)},{path:"verification",loadChildren:()=>Promise.all([o.e(1111),o.e(8798)]).then(o.bind(o,8798)).then(t=>t.VerificationModule)},{path:"lockscreen",loadChildren:()=>Promise.all([o.e(1111),o.e(6446)]).then(o.bind(o,6446)).then(t=>t.LockScreenModule)},{path:"**",redirectTo:"/notfound"}]),d.Bz]})}return l})();var M=o(1850),E=o(9862);let a=(()=>{class l{static#o=this.\u0275fac=function(r){return new(r||l)};static#t=this.\u0275mod=e.oAB({type:l});static#s=this.\u0275inj=e.cJS({providers:[M.e],imports:[h.ez,g,E.JF]})}return l})()},1850:(P,m,o)=>{o.d(m,{e:()=>r});var h=o(9397),d=o(940),e=o(6306),g=o(6676),E=o(8504),a=o(2029),l=o(9862),I=o(8814),t=o(9739);g.locale("hu");let r=(()=>{class i{constructor(s,n,v){this.http=s,this.apiService=n,this.router=v,this.apiURL=this.apiService.apiURL}login(s,n){return this.http.post(`${this.apiURL}/users/login`,{email:s,password:n},{observe:"response"}).pipe((0,h.b)(v=>this.setSession(v)),(0,d.d)(),(0,e.K)(this.handleError))}logout(){localStorage.removeItem("token"),localStorage.removeItem("userid"),localStorage.removeItem("fullname"),localStorage.removeItem("email"),localStorage.removeItem("phone"),localStorage.removeItem("userrole"),localStorage.removeItem("user_rolesid")}passwordReset(s){return this.http.get(`${this.apiURL}/users/forgotpassrequest/${s}`,{observe:"response"}).pipe((0,h.b)(n=>console.log(n)),(0,d.d)(),(0,e.K)(this.handleError))}passwordRenew(s){return this.http.get(`${this.apiURL}/users/xxxxxxxxxxxxx/${s}`,{observe:"response"}).pipe((0,h.b)(n=>console.log(n)),(0,d.d)(),(0,e.K)(this.handleError))}setSession(s){console.log("authResult",s),localStorage.setItem("token",s.headers.get("Authorization")||""),localStorage.setItem("userid",s.body.id),localStorage.setItem("fullname",s.body.fullname),localStorage.setItem("email",s.body.email),localStorage.setItem("phone",s.body.phone),localStorage.setItem("userrole",s.body.role),localStorage.setItem("user_rolesid",s.body.user_rolesid)}handleError(s){return(0,E._)(JSON.parse(JSON.stringify(s)))}static#o=this.\u0275fac=function(n){return new(n||i)(a.LFG(l.eN),a.LFG(I.s),a.LFG(t.F0))};static#t=this.\u0275prov=a.Yz7({token:i,factory:i.\u0275fac})}return i})()}}]);