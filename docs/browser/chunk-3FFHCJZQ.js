import{a as G}from"./chunk-DVWK7FMF.js";import"./chunk-A3TTW2T7.js";import{a as H}from"./chunk-DYACDRTW.js";import"./chunk-BBNPNTXL.js";import{a as W}from"./chunk-LBQMIAMK.js";import"./chunk-FLRY46M6.js";import"./chunk-6X6OGU4S.js";import"./chunk-SGK5MUO6.js";import"./chunk-IY2HFRSH.js";import{a as R,c as z}from"./chunk-DXRXM6XG.js";import{a as O}from"./chunk-DGHG6252.js";import"./chunk-DG72BJVU.js";import"./chunk-6CXNYZRV.js";import{f as F,j as N,w as Z}from"./chunk-RLBYZDRI.js";import"./chunk-EZGN3KU7.js";import{b as L,c as P,d as T}from"./chunk-WNZYY74E.js";import"./chunk-YO3EMRP3.js";import"./chunk-34QZ2XZI.js";import"./chunk-NWO6NVGN.js";import"./chunk-QL2D4KBU.js";import"./chunk-NUM5UM42.js";import"./chunk-WJBJMXAA.js";import"./chunk-542WA43O.js";import{$b as _,Ab as s,Bb as e,Cb as t,Db as a,Mb as v,Nb as y,Ob as B,Pa as r,Pb as V,Xc as j,aa as u,ac as i,ba as p,bb as g,bc as S,gc as C,hb as w,hc as E,ic as M,jd as q,ka as m,ld as I,od as A,qc as x,vd as b}from"./chunk-7CIMIMFD.js";import"./chunk-LG6SK6BE.js";var K=["*"],U=d=>["min-w-28 flex items-center gap-1 justify-center px-4 py-2 rounded-2xl transition-all duration-200 font-medium cursor-pointer",d],D=d=>["absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-300 leading-none",d];function Q(d,o){d&1&&(e(0,"span",22),i(1,"Free"),t())}function X(d,o){if(d&1&&(e(0,"div",23),V(1),t()),d&2){let n=y();_(n.containerClass),s("ngStyle",n.previewStyle)}}function ee(d,o){if(d&1&&(e(0,"div")(1,"pre",24)(2,"code"),i(3),t()()()),d&2){let n=y();r(3),S(n.code)}}var J=(n=>(n[n.PREVIEW=0]="PREVIEW",n[n.CODE=1]="CODE",n))(J||{}),h=class d{constructor(){this.free=!0;this.new=!1;this.BlockView=J;this.blockView=m(0);this.codeCopyLoading=m(!1);this.codeCopied=m(!1)}activateView(o,n){this.blockView.set(n),o.preventDefault()}async copyCode(o){this.codeCopyLoading.set(!0),o.preventDefault(),await navigator.clipboard.writeText(this.code),this.codeCopyLoading.set(!1),this.codeCopied.set(!0),setTimeout(()=>{this.codeCopied.set(!1)},2e3)}static{this.\u0275fac=function(n){return new(n||d)}}static{this.\u0275cmp=g({type:d,selectors:[["block-viewer"]],inputs:{header:"header",code:"code",containerClass:"containerClass",previewStyle:"previewStyle",free:[2,"free","free",j],new:[2,"new","new",j]},ngContentSelectors:K,decls:31,vars:20,consts:[[1,"mb-16","overflow-hidden"],[1,"flex","flex-col","lg:flex-row","justify-between","py-4","gap-4","lg:gap-2","px-4","bg-surface-0","dark:bg-surface-900","border","border-surface-200","dark:border-surface-700","rounded-xl","rounded-b-none!","border-b-0"],[1,"flex","items-center","gap-2"],[1,"font-medium","text-xl"],["class","flex items-center justify-center px-1.5 py-1 w-fit bg-emerald-500 text-emerald-100 dark:bg-emerald-400 dark:text-emerald-800 rounded-md leading-none! text-xs md:text-sm",4,"ngIf"],[1,"inline-flex","border","border-surface-200","dark:border-surface-700","rounded-2xl","overflow-hidden","min-h-10"],[3,"click","ngClass"],[1,"h-6","w-px","bg-surface-200","dark:bg-surface-700","hidden","lg:block"],[1,"flex","items-center","gap-2","grow","lg:grow-0","justify-end","lg:justify-start"],[1,"relative","w-10","h-10","border","border-surface-200","dark:border-surface-700","rounded-full","hover:bg-surface-100","dark:hover:bg-surface-800","transition-all","focus-visible:outline-none","focus-visible:ring-1","focus-visible:ring-primary","focus-visible:ring-offset-2","focus-visible:ring-offset-surface-0","dark:focus-visible:ring-offset-surface-900","cursor-pointer","disabled:cursor-wait",3,"click","disabled"],[3,"ngClass"],[1,"pi","pi-spinner","animate-spin","text-surface-700","dark:text-surface-300",2,"font-size","1.25rem"],["xmlns","http://www.w3.org/2000/svg","viewBox","0 0 24 24",1,"w-5","h-5","fill-green-600","dark:fill-green-400"],["id","check"],["d","M9,18.25A.74.74,0,0,1,8.47,18l-5-5A.75.75,0,1,1,4.53,12L9,16.44,19.47,6A.75.75,0,0,1,20.53,7l-11,11A.74.74,0,0,1,9,18.25Z"],["xmlns","http://www.w3.org/2000/svg","viewBox","0 0 24 24",1,"w-5","h-5","fill-surface-700","dark:fill-surface-300"],["id","clone"],["d","M14,16.75H6A2.75,2.75,0,0,1,3.25,14V6A2.75,2.75,0,0,1,6,3.25h8A2.75,2.75,0,0,1,16.75,6v8A2.75,2.75,0,0,1,14,16.75Zm-8-12A1.25,1.25,0,0,0,4.75,6v8A1.25,1.25,0,0,0,6,15.25h8A1.25,1.25,0,0,0,15.25,14V6A1.25,1.25,0,0,0,14,4.75Z"],["d","M18,20.75H10A2.75,2.75,0,0,1,7.25,18V16h1.5v2A1.25,1.25,0,0,0,10,19.25h8A1.25,1.25,0,0,0,19.25,18V10A1.25,1.25,0,0,0,18,8.75H16V7.25h2A2.75,2.75,0,0,1,20.75,10v8A2.75,2.75,0,0,1,18,20.75Z"],[1,"p-0","border","border-surface-200","dark:border-surface-700","rounded-xl","rounded-t-none!","overflow-hidden"],[3,"class","ngStyle",4,"ngIf"],[4,"ngIf"],[1,"flex","items-center","justify-center","px-1.5","py-1","w-fit","bg-emerald-500","text-emerald-100","dark:bg-emerald-400","dark:text-emerald-800","rounded-md","leading-none!","text-xs","md:text-sm"],[3,"ngStyle"],[1,"app-code"]],template:function(n,l){n&1&&(B(),e(0,"div",0)(1,"div",1)(2,"div",2)(3,"span",3),i(4),t(),w(5,Q,2,0,"span",4),t(),e(6,"div",2)(7,"div",5)(8,"button",6),v("click",function(c){return l.activateView(c,l.BlockView.CODE)}),e(9,"span"),i(10,"Code"),t()(),e(11,"button",6),v("click",function(c){return l.activateView(c,l.BlockView.PREVIEW)}),e(12,"span"),i(13,"Preview"),t()()(),a(14,"div",7),e(15,"div",8)(16,"button",9),v("click",function(c){return l.copyCode(c)}),e(17,"span",10),a(18,"i",11),t(),e(19,"span",10),u(),e(20,"svg",12)(21,"g",13),a(22,"path",14),t()()(),p(),e(23,"span",10),u(),e(24,"svg",15)(25,"g",16),a(26,"path",17)(27,"path",18),t()()()()()()(),p(),e(28,"div",19),w(29,X,2,3,"div",20)(30,ee,4,1,"div",21),t()()),n&2&&(r(4),S(l.header),r(),s("ngIf",l.free),r(3),s("ngClass",x(10,U,l.blockView()===l.BlockView.CODE?"bg-primary text-primary-contrast":"text-surface-600 dark:text-surface-400 hover:text-surface-900 dark:hover:text-surface-0")),r(3),s("ngClass",x(12,U,l.blockView()===l.BlockView.PREVIEW?"bg-primary text-primary-contrast":"text-surface-600 dark:text-surface-400 hover:text-surface-900 dark:hover:text-surface-0")),r(5),s("disabled",l.codeCopyLoading()),r(),s("ngClass",x(14,D,l.codeCopyLoading()?"opacity-100 scale-100 z-10":"opacity-0 scale-50 -z-2")),r(2),s("ngClass",x(16,D,l.codeCopied()&&!l.codeCopyLoading()?"opacity-100 scale-100 z-10":"opacity-0 scale-50 -z-2")),r(4),s("ngClass",x(18,D,!l.codeCopied()&&!l.codeCopyLoading()?"opacity-100 scale-100 z-10":"opacity-0 scale-50 -z-2")),r(6),s("ngIf",l.blockView()===l.BlockView.PREVIEW),r(),s("ngIf",l.blockView()===l.BlockView.CODE))},dependencies:[b,q,I,A],encapsulation:2})}};var k=class d{constructor(){this.password="";this.checked=!1;this.block1=`<div class="relative min-h-160 lg:min-h-0 bg-surface-0 dark:bg-surface-900 flex lg:flex-row flex-col">
    <div class="flex lg:flex lg:flex-row flex-col justify-center md:justify-normal h-full flex-1">
        <div class="relative flex-1 z-20 flex items-center justify-center">
            <div class="flex items-center justify-center h-full">
                <div class="w-full max-w-2xl px-6 py-12 lg:p-12 xl:p-16 text-center lg:text-left">
                    <h1 class="text-4xl xl:text-5xl font-bold text-surface-0 lg:text-surface-900 dark:text-surface-0 mb-6 leading-tight!">
                        <span class="block">Create the screens your</span>
                        <span class="block text-primary">visitors deserve to see</span>
                    </h1>

                    <p class="text-surface-0/90 lg:text-surface-700 dark:text-surface-200 text-xl leading-normal mb-8 max-w-xl lg:max-w-none">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    </p>

                    <div class="flex items-center gap-4 justify-center lg:justify-start">
                        <p-button label="Learn More" type="button"></p-button>
                        <p-button label="Live Demo" type="button" [outlined]="true"></p-button>
                    </div>
                </div>
            </div>
        </div>

        <div class="absolute lg:relative inset-0 lg:inset-auto flex-1">
            <div class="absolute lg:hidden inset-0 bg-surface-900/60 dark:bg-surface-900/80 z-10"></div>
            <img src="https://fqjltiegiezfetthbags.supabase.co/storage/v1/render/image/public/block.images/blocks/hero/hero-1.png" alt="hero-1" class="h-full w-full object-cover xl:[clip-path:polygon(12%_0,100%_0%,100%_100%,0_100%)]" />
        </div>
    </div>
</div>`;this.block2=`<div class="bg-surface-0 dark:bg-surface-950 px-6 md:px-12 lg:px-20 py-20 text-center">
    <div class="flex flex-col gap-6">
        <div class="flex flex-col items-center gap-4">
            <div class="font-bold text-3xl leading-tight">
                <span class="text-surface-900 dark:text-surface-0">One Product, </span>
                <span class="text-primary-500 dark:text-primary-400">Many Solutions</span>
            </div>
            <div class="text-surface-500 dark:text-surface-400 leading-tight">Ac turpis egestas maecenas pharetra convallis posuere morbi leo urna.</div>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div class="w-full rounded-md p-4">
                <span class="mb-4 flex h-16 w-16 items-center justify-center rounded-lg bg-surface-0 dark:bg-surface-800 shadow mx-auto">
                    <i class="pi pi-desktop text-2xl! lg:text-3xl! text-primary-500 dark:text-primary-400"></i>
                </span>
                <div class="flex flex-col gap-1">
                    <div class="text-surface-900 dark:text-surface-0 text-xl font-medium leading-tight">Built for Developers</div>
                    <p class="text-surface-500 dark:text-surface-400 leading-normal">Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
                </div>
            </div>
            <div class="w-full rounded-md p-4">
                <span class="mb-4 flex h-16 w-16 items-center justify-center rounded-lg bg-surface-0 dark:bg-surface-800 shadow mx-auto">
                    <i class="pi pi-lock text-2xl! lg:text-3xl! text-primary-500 dark:text-primary-400"></i>
                </span>
                <div class="flex flex-col gap-1">
                    <div class="text-surface-900 dark:text-surface-0 text-xl font-medium leading-tight">End-to-End Encryption</div>
                    <p class="text-surface-500 dark:text-surface-400 leading-normal">Risus nec feugiat in fermentum posuere urna nec. Posuere sollicitudin aliquam ultrices sagittis.</p>
                </div>
            </div>
            <div class="w-full rounded-md p-4">
                <span class="mb-4 flex h-16 w-16 items-center justify-center rounded-lg bg-surface-0 dark:bg-surface-800 shadow mx-auto">
                    <i class="pi pi-face-smile text-2xl! lg:text-3xl! text-primary-500 dark:text-primary-400"></i>
                </span>
                <div class="flex flex-col gap-1">
                    <div class="text-surface-900 dark:text-surface-0 text-xl font-medium leading-tight">Easy to Use</div>
                    <p class="text-surface-500 dark:text-surface-400 leading-normal">Ornare suspendisse sed nisi lacus sed viverra tellus. Neque volutpat ac tincidunt vitae semper.</p>
                </div>
            </div>
            <div class="w-full rounded-md p-4">
                <span class="mb-4 flex h-16 w-16 items-center justify-center rounded-lg bg-surface-0 dark:bg-surface-800 shadow mx-auto">
                    <i class="pi pi-globe text-2xl! lg:text-3xl! text-primary-500 dark:text-primary-400"></i>
                </span>
                <div class="flex flex-col gap-1">
                    <div class="text-surface-900 dark:text-surface-0 text-xl font-medium leading-tight">Fast & Global Support</div>
                    <p class="text-surface-500 dark:text-surface-400 leading-normal">Fermentum et sollicitudin ac orci phasellus egestas tellus rutrum tellus.</p>
                </div>
            </div>
            <div class="w-full rounded-md p-4">
                <span class="mb-4 flex h-16 w-16 items-center justify-center rounded-lg bg-surface-0 dark:bg-surface-800 shadow mx-auto">
                    <i class="pi pi-github text-2xl! lg:text-3xl! text-primary-500 dark:text-primary-400"></i>
                </span>
                <div class="flex flex-col gap-1">
                    <div class="text-surface-900 dark:text-surface-0 text-xl font-medium leading-tight">Open Source</div>
                    <p class="text-surface-500 dark:text-surface-400 leading-normal">Nec tincidunt praesent semper feugiat. Sed adipiscing diam donec adipiscing tristique risus nec feugiat.</p>
                </div>
            </div>
            <div class="w-full rounded-md p-4">
                <span class="mb-4 flex h-16 w-16 items-center justify-center rounded-lg bg-surface-0 dark:bg-surface-800 shadow mx-auto">
                    <i class="pi pi-shield text-2xl! lg:text-3xl! text-primary-500 dark:text-primary-400"></i>
                </span>
                <div class="flex flex-col gap-1">
                    <div class="text-surface-900 dark:text-surface-0 text-xl font-medium leading-tight">Trusted Security</div>
                    <p class="text-surface-500 dark:text-surface-400 leading-normal">Mattis rhoncus urna neque viverra justo nec ultrices. Id cursus metus aliquam eleifend.</p>
                </div>
            </div>
        </div>
    </div>
</div>`;this.block3=`<div
        class="px-6 py-20 md:px-20 lg:px-80 flex items-center justify-center backdrop-blur-3xl bg-cover! bg-center! bg-no-repeat!"
        style="background-image: url('https://fqjltiegiezfetthbags.supabase.co/storage/v1/object/public/block.images/blocks/signin/signin-glass.jpg')"
    >
        <div class="px-8 md:px-12 lg:px-20 py-12 flex flex-col items-center gap-12 w-full backdrop-blur-2xl rounded-2xl bg-white/10 border border-white/10 max-w-xl">
            <div class="flex flex-col items-center gap-4 w-full">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-14 w-14" width="33" height="32" viewBox="0 0 33 32" fill="none">
                    <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M7.09219 2.87829C5.94766 3.67858 4.9127 4.62478 4.01426 5.68992C7.6857 5.34906 12.3501 5.90564 17.7655 8.61335C23.5484 11.5047 28.205 11.6025 31.4458 10.9773C31.1517 10.087 30.7815 9.23135 30.343 8.41791C26.6332 8.80919 21.8772 8.29127 16.3345 5.51998C12.8148 3.76014 9.71221 3.03521 7.09219 2.87829ZM28.1759 5.33332C25.2462 2.06 20.9887 0 16.25 0C14.8584 0 13.5081 0.177686 12.2209 0.511584C13.9643 0.987269 15.8163 1.68319 17.7655 2.65781C21.8236 4.68682 25.3271 5.34013 28.1759 5.33332ZM32.1387 14.1025C28.2235 14.8756 22.817 14.7168 16.3345 11.4755C10.274 8.44527 5.45035 8.48343 2.19712 9.20639C2.0292 9.24367 1.86523 9.28287 1.70522 9.32367C1.2793 10.25 0.939308 11.2241 0.695362 12.2356C0.955909 12.166 1.22514 12.0998 1.50293 12.0381C5.44966 11.161 11.0261 11.1991 17.7655 14.5689C23.8261 17.5991 28.6497 17.561 31.9029 16.838C32.0144 16.8133 32.1242 16.7877 32.2322 16.7613C32.2441 16.509 32.25 16.2552 32.25 16C32.25 15.358 32.2122 14.7248 32.1387 14.1025ZM31.7098 20.1378C27.8326 20.8157 22.5836 20.5555 16.3345 17.431C10.274 14.4008 5.45035 14.439 2.19712 15.1619C1.475 15.3223 0.825392 15.5178 0.252344 15.7241C0.250782 15.8158 0.25 15.9078 0.25 16C0.25 24.8366 7.41344 32 16.25 32C23.6557 32 29.8862 26.9687 31.7098 20.1378Z"
                        class="fill-surface-0"
                    />
                </svg>
                <div class="flex flex-col gap-2 w-full">
                    <div class="text-center text-3xl font-medium text-white leading-tight">Welcome Back</div>
                    <div class="text-center">
                        <span class="text-white/80">Don't have an account? </span>
                        <a class="text-white/80 cursor-pointer hover:text-white/90 underline">Sign up</a>
                    </div>
                </div>
            </div>
            <div class="flex flex-col items-center gap-8 w-full">
                <div class="flex flex-col gap-6 w-full">
                    <p-iconfield>
                        <p-inputicon styleClass="pi pi-user text-white/70!" />
                        <input pInputText type="text" class="appearance-none! border! border-white/10! w-full! outline-0! bg-white/10! text-white! placeholder:text-white/70! rounded-3xl! shadow-sm!" placeholder="Username" />
                    </p-iconfield>
                    <p-iconfield>
                        <p-inputicon styleClass="pi pi-lock text-white/70!" />
                        <input pInputText type="password" class="appearance-none! border! border-white/10! w-full! outline-0! bg-white/10! text-white! placeholder:text-white/70! rounded-3xl! shadow-sm!" placeholder="Password" />
                    </p-iconfield>
                </div>
                <p-button label="Sign In" class="flex-1 self-start w-full" styleClass="w-full! rounded-3xl! bg-surface-950! border! border-surface-950! text-white! hover:bg-surface-950/80!"></p-button>
            </div>
            <a class="text-white/80 cursor-pointer hover:text-white/90">Forgot Password?</a>
        </div>
    </div>`;this.block4=`<div class="bg-surface-50 dark:bg-surface-950 px-6 py-20 md:px-12 lg:px-20">
    <div class="flex flex-col gap-4 items-center justify-center mb-12">
        <div class="text-surface-900 dark:text-surface-0 font-bold text-4xl lg:text-5xl text-center leading-tight">Pricing Plans</div>
        <div class="text-surface-500 dark:text-surface-400 text-lg text-center leading-normal">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Velit numquam eligendi quos.</div>
    </div>

    <div class="flex lg:flex-row flex-col gap-8 max-w-7xl mx-auto">
        <div class="w-full flex-1 p-8 flex rounded-2xl flex-col bg-surface-0 dark:bg-surface-800 shadow-sm gap-6">
            <div class="flex flex-col gap-2">
                <h4 class="text-surface-900 dark:text-surface-0 font-medium text-xl leading-tight">Basic</h4>
                <p class="text-surface-500 dark:text-surface-400 leading-normal">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Velit numquam eligendi quos.</p>
            </div>

            <div class="w-full h-px bg-surface-200 dark:bg-surface-700"></div>
            <div class="flex items-center gap-2">
                <span class="font-bold text-3xl text-surface-900 dark:text-surface-0 leading-tight">$9</span>
                <span class="font-medium text-surface-500 dark:text-surface-400 leading-tight">per month</span>
            </div>
            <div class="w-full h-px bg-surface-200 dark:bg-surface-600"></div>
            <ul class="list-none flex flex-col gap-4 flex-1">
                <li class="flex items-center gap-2">
                    <i class="pi pi-check-circle text-lg! text-green-500"></i>
                    <span class="text-surface-800 dark:text-surface-100 leading-tight">Arcu vitae elementum</span>
                </li>
                <li class="flex items-center gap-2">
                    <i class="pi pi-check-circle text-lg! text-green-500"></i>
                    <span class="text-surface-800 dark:text-surface-100 leading-tight">Dui faucibus in ornare</span>
                </li>
                <li class="flex items-center gap-2">
                    <i class="pi pi-check-circle text-lg! text-green-500"></i>
                    <span class="text-surface-800 dark:text-surface-100 leading-tight">Morbi tincidunt augue</span>
                </li>
            </ul>
            <p-button label="Buy Now" [rounded]="true" styleClass="w-full"></p-button>
        </div>
        <div class="w-full flex-1 p-8 flex rounded-2xl flex-col bg-surface-0 dark:bg-surface-800 shadow-sm gap-6">
            <div class="flex flex-col gap-2">
                <h4 class="text-surface-900 dark:text-surface-0 font-medium text-xl leading-tight">Premium</h4>
                <p class="text-surface-500 dark:text-surface-400 leading-normal">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Velit numquam eligendi quos.</p>
            </div>

            <div class="w-full h-px bg-surface-200 dark:bg-surface-700"></div>
            <div class="flex items-center gap-2">
                <span class="font-bold text-3xl text-surface-900 dark:text-surface-0 leading-tight">$29</span>
                <span class="font-medium text-surface-500 dark:text-surface-400 leading-tight">per month</span>
            </div>
            <div class="w-full h-px bg-surface-200 dark:bg-surface-600"></div>
            <ul class="list-none flex flex-col gap-4 flex-1">
                <li class="flex items-center gap-2">
                    <i class="pi pi-check-circle text-lg! text-green-500"></i>
                    <span class="text-surface-800 dark:text-surface-100 leading-tight">Arcu vitae elementum</span>
                </li>
                <li class="flex items-center gap-2">
                    <i class="pi pi-check-circle text-lg! text-green-500"></i>
                    <span class="text-surface-800 dark:text-surface-100 leading-tight">Dui faucibus in ornare</span>
                </li>
                <li class="flex items-center gap-2">
                    <i class="pi pi-check-circle text-lg! text-green-500"></i>
                    <span class="text-surface-800 dark:text-surface-100 leading-tight">Morbi tincidunt augue</span>
                </li>
                <li class="flex items-center gap-2">
                    <i class="pi pi-check-circle text-lg! text-green-500"></i>
                    <span class="text-surface-800 dark:text-surface-100 leading-tight">Duis ultricies lacus sed</span>
                </li>
            </ul>
            <p-button label="Buy Now" [rounded]="true" styleClass="w-full"></p-button>
        </div>
        <div class="w-full flex-1 p-8 flex rounded-2xl flex-col bg-surface-0 dark:bg-surface-800 shadow-sm gap-6">
            <div class="flex flex-col gap-2">
                <h4 class="text-surface-900 dark:text-surface-0 font-medium text-xl leading-tight">Enterprise</h4>
                <p class="text-surface-500 dark:text-surface-400 leading-normal">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Velit numquam eligendi quos.</p>
            </div>

            <div class="w-full h-px bg-surface-200 dark:bg-surface-700"></div>
            <div class="flex items-center gap-2">
                <span class="font-bold text-3xl text-surface-900 dark:text-surface-0 leading-tight">$49</span>
                <span class="font-medium text-surface-500 dark:text-surface-400 leading-tight">per month</span>
            </div>
            <div class="w-full h-px bg-surface-200 dark:bg-surface-600"></div>
            <ul class="list-none flex flex-col gap-4 flex-1">
                <li class="flex items-center gap-2">
                    <i class="pi pi-check-circle text-lg! text-green-500"></i>
                    <span class="text-surface-800 dark:text-surface-100 leading-tight">Arcu vitae elementum</span>
                </li>
                <li class="flex items-center gap-2">
                    <i class="pi pi-check-circle text-lg! text-green-500"></i>
                    <span class="text-surface-800 dark:text-surface-100 leading-tight">Dui faucibus in ornare</span>
                </li>
                <li class="flex items-center gap-2">
                    <i class="pi pi-check-circle text-lg! text-green-500"></i>
                    <span class="text-surface-800 dark:text-surface-100 leading-tight">Morbi tincidunt augue</span>
                </li>
                <li class="flex items-center gap-2">
                    <i class="pi pi-check-circle text-lg! text-green-500"></i>
                    <span class="text-surface-800 dark:text-surface-100 leading-tight">Duis ultricies lacus sed</span>
                </li>
                <li class="flex items-center gap-2">
                    <i class="pi pi-check-circle text-lg! text-green-500"></i>
                    <span class="text-surface-800 dark:text-surface-100 leading-tight">Imperdiet proin</span>
                </li>
            </ul>
            <p-button label="Buy Now" [rounded]="true" styleClass="w-full"></p-button>
        </div>
    </div>
</div>`;this.block5=`<div class="bg-surface-0 dark:bg-surface-950 px-6 py-20 md:px-12 lg:px-20">
    <div class="text-surface-700 dark:text-surface-100 text-center flex flex-col items-center gap-4">
        <div class="text-primary font-bold text-lg leading-tight"><i class="pi pi-discord text-lg! leading-none!"></i>&nbsp;POWERED BY DISCORD</div>
        <div class="text-surface-900 dark:text-surface-0 font-bold text-4xl leading-tight">Join our design community</div>
        <div class="text-surface-700 dark:text-surface-100 text-xl leading-normal">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Velit numquam eligendi quos.</div>
        <p-button label="Join Now" icon="pi pi-discord" [rounded]="true" class="mt-4"></p-button>
    </div>
</div>`;this.block6=`<div class="pb-20 bg-surface-0 dark:bg-surface-950">
    <div class="bg-surface-900 text-surface-100 py-4 px-6 lg:px-20 flex justify-between items-center flex-wrap">
        <div class="font-bold">\u{1F525} Hot Deals!</div>
        <div class="inline-flex gap-1 items-center">
            <span class="hidden lg:flex leading-normal">Libero voluptatum atque exercitationem praesentium provident odit.</span>
            <a class="text-surface-0 underline font-bold" href="#">Learn More</a>
        </div>
        <p-button icon="pi pi-times" [text]="true" [rounded]="true" severity="secondary" styleClass="text-surface-0! hover:bg-surface-500/20!"></p-button>
    </div>
</div>`;this.block7=`<div class="bg-surface-0 dark:bg-surface-950 px-6 py-8 md:px-12 lg:px-20">
    <ul class="list-none p-0 m-0 flex items-center font-medium mb-5">
        <li>
            <a class="text-surface-500 dark:text-surface-300 no-underline leading-normal cursor-pointer">Application</a>
        </li>
        <li class="px-2">
            <i class="pi pi-angle-right text-surface-500 dark:text-surface-300 text-sm! leading-normal!"></i>
        </li>
        <li>
            <span class="text-surface-900 dark:text-surface-0 leading-normal">Analytics</span>
        </li>
    </ul>
    <div class="flex items-start flex-col md:justify-between md:flex-row">
        <div>
            <div class="font-bold text-3xl text-surface-900 dark:text-surface-0 mb-4">Customers</div>
            <div class="flex items-center text-surface-700 dark:text-surface-300 flex-wrap gap-8">
                <div class="flex items-center gap-2">
                    <i class="pi pi-users text-base! leading-normal!"></i>
                    <span>332 Active Users</span>
                </div>
                <div class="flex items-center gap-2">
                    <i class="pi pi-globe text-base! leading-normal!"></i>
                    <span>9.402 Sessions</span>
                </div>
                <div class="flex items-center gap-2">
                    <i class="pi pi-clock text-base! leading-normal!"></i>
                    <span>2.32m Avg. Duration</span>
                </div>
            </div>
        </div>
        <div class="mt-6 md:mt-0 flex items-center">
            <p-button label="Add" class="mr-3" [outlined]="true" icon="pi pi-user-plus"></p-button>
            <p-button label="Save Changes" icon="pi pi-check" styleClass="whitespace-nowrap"></p-button>
        </div>
    </div>
</div>`;this.block8=`<div class="bg-surface-50 dark:bg-surface-950 px-6 py-8 md:px-12 lg:px-20">
    <div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
        <div class="bg-surface-0 dark:bg-surface-900 shadow-sm p-5 rounded-2xl">
            <div class="flex justify-between gap-4">
                <div class="flex flex-col gap-2">
                    <span class="text-surface-700 dark:text-surface-300 font-normal leading-tight">Messages</span>
                    <div class="text-surface-900 dark:text-surface-0 font-semibold text-2xl! leading-tight!">152</div>
                </div>
                <div class="flex items-center justify-center bg-linear-to-b from-cyan-400 dark:from-cyan-300 to-cyan-600 dark:to-cyan-500 rounded-lg w-10 h-10">
                    <i class="pi pi-envelope text-surface-0 dark:text-surface-900 text-xl! leading-none!"></i>
                </div>
            </div>
            <div class="mt-4">
                <span class="text-surface-600 dark:text-surface-300 font-medium leading-tight">24 new</span>
                <span class="text-surface-500 dark:text-surface-300 leading-tight"> since last visit</span>
            </div>
        </div>

        <div class="bg-surface-0 dark:bg-surface-900 shadow-sm p-5 rounded-2xl">
            <div class="flex justify-between gap-4">
                <div class="flex flex-col gap-2">
                    <span class="text-surface-700 dark:text-surface-300 font-normal leading-tight">Check-ins</span>
                    <div class="text-surface-900 dark:text-surface-0 font-semibold text-2xl! leading-tight!">532</div>
                </div>
                <div class="flex items-center justify-center bg-linear-to-b from-orange-400 dark:from-orange-300 to-orange-600 dark:to-orange-500 rounded-lg w-10 h-10">
                    <i class="pi pi-map-marker text-surface-0 dark:text-surface-900 text-xl! leading-none!"></i>
                </div>
            </div>
            <div class="mt-4">
                <span class="text-surface-600 dark:text-surface-300 font-medium leading-tight">48 new</span>
                <span class="text-surface-500 dark:text-surface-300 leading-tight"> since last visit</span>
            </div>
        </div>

        <div class="bg-surface-0 dark:bg-surface-900 shadow-sm p-5 rounded-2xl">
            <div class="flex justify-between gap-4">
                <div class="flex flex-col gap-2">
                    <span class="text-surface-700 dark:text-surface-300 font-normal leading-tight">Files Synced</span>
                    <div class="text-surface-900 dark:text-surface-0 font-semibold text-2xl! leading-tight!">28.441</div>
                </div>
                <div class="flex items-center justify-center bg-linear-to-b from-slate-400 dark:from-slate-300 to-slate-600 dark:to-slate-500 rounded-lg w-10 h-10">
                    <i class="pi pi-file text-surface-0 dark:text-surface-900 text-xl! leading-none!"></i>
                </div>
            </div>
            <div class="mt-4">
                <span class="text-surface-500 dark:text-surface-300 leading-tight">32,56 / 250 GB</span>
            </div>
        </div>

        <div class="bg-surface-0 dark:bg-surface-900 shadow-sm p-5 rounded-2xl">
            <div class="flex justify-between gap-4">
                <div class="flex flex-col gap-2">
                    <span class="text-surface-700 dark:text-surface-300 font-normal leading-tight">Users Online</span>
                    <div class="text-surface-900 dark:text-surface-0 font-semibold text-2xl! leading-tight!">25.660</div>
                </div>
                <div class="flex items-center justify-center bg-linear-to-b from-violet-400 dark:from-violet-300 to-violet-600 dark:to-violet-500 rounded-lg w-10 h-10">
                    <i class="pi pi-users text-surface-0 dark:text-surface-900 text-xl! leading-none!"></i>
                </div>
            </div>
            <div class="mt-4">
                <span class="text-surface-600 dark:text-surface-300 font-medium leading-tight">72 new</span>
                <span class="text-surface-500 dark:text-surface-300 leading-tight"> user this week</span>
            </div>
        </div>
    </div>
</div>`;this.block9=`<div class="bg-surface-50 dark:bg-surface-950 px-6 py-20 md:px-12 lg:px-20 flex items-center justify-center">
    <div class="bg-surface-0 dark:bg-surface-900 p-8 md:p-12 shadow-sm rounded-2xl w-full max-w-xl mx-auto flex flex-col gap-8">
        <div class="flex flex-col items-center gap-4">
            <div class="flex items-center gap-4">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-14 w-14" width="33" height="32" viewBox="0 0 33 32" fill="none">
                    <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M7.09219 2.87829C5.94766 3.67858 4.9127 4.62478 4.01426 5.68992C7.6857 5.34906 12.3501 5.90564 17.7655 8.61335C23.5484 11.5047 28.205 11.6025 31.4458 10.9773C31.1517 10.087 30.7815 9.23135 30.343 8.41791C26.6332 8.80919 21.8772 8.29127 16.3345 5.51998C12.8148 3.76014 9.71221 3.03521 7.09219 2.87829ZM28.1759 5.33332C25.2462 2.06 20.9887 0 16.25 0C14.8584 0 13.5081 0.177686 12.2209 0.511584C13.9643 0.987269 15.8163 1.68319 17.7655 2.65781C21.8236 4.68682 25.3271 5.34013 28.1759 5.33332ZM32.1387 14.1025C28.2235 14.8756 22.817 14.7168 16.3345 11.4755C10.274 8.44527 5.45035 8.48343 2.19712 9.20639C2.0292 9.24367 1.86523 9.28287 1.70522 9.32367C1.2793 10.25 0.939308 11.2241 0.695362 12.2356C0.955909 12.166 1.22514 12.0998 1.50293 12.0381C5.44966 11.161 11.0261 11.1991 17.7655 14.5689C23.8261 17.5991 28.6497 17.561 31.9029 16.838C32.0144 16.8133 32.1242 16.7877 32.2322 16.7613C32.2441 16.509 32.25 16.2552 32.25 16C32.25 15.358 32.2122 14.7248 32.1387 14.1025ZM31.7098 20.1378C27.8326 20.8157 22.5836 20.5555 16.3345 17.431C10.274 14.4008 5.45035 14.439 2.19712 15.1619C1.475 15.3223 0.825392 15.5178 0.252344 15.7241C0.250782 15.8158 0.25 15.9078 0.25 16C0.25 24.8366 7.41344 32 16.25 32C23.6557 32 29.8862 26.9687 31.7098 20.1378Z"
                        class="fill-surface-700 dark:fill-surface-200"
                    />
                </svg>
            </div>
            <div class="flex flex-col items-center gap-2 w-full">
                <div class="text-surface-900 dark:text-surface-0 text-2xl font-semibold leading-tight text-center w-full">Welcome Back</div>
                <div class="text-center w-full">
                    <span class="text-surface-700 dark:text-surface-200 leading-normal">Don't have an account?</span>
                    <a class="text-primary font-medium ml-1 cursor-pointer hover:text-primary-emphasis">Create today!</a>
                </div>
            </div>
        </div>
        <div class="flex flex-col gap-6 w-full">
            <div class="flex flex-col gap-2 w-full">
                <label for="email1" class="text-surface-900 dark:text-surface-0 font-medium leading-normal">Email Address</label>
                <input pInputText id="email1" type="text" placeholder="Email address" class="w-full px-3 py-2 shadow-sm rounded-lg" />
            </div>
            <div class="flex flex-col gap-2 w-full">
                <label for="password1" class="text-surface-900 dark:text-surface-0 font-medium leading-normal">Password</label>
                <p-password id="password1" [(ngModel)]="password" placeholder="Password" [toggleMask]="true" [feedback]="false" inputStyleClass="w-full!"></p-password>
            </div>
            <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between w-full gap-3 sm:gap-0">
                <div class="flex items-center gap-2">
                    <p-checkbox inputId="rememberme1" [(ngModel)]="checked" [binary]="true"></p-checkbox>
                    <label for="rememberme1" class="text-surface-900 dark:text-surface-0 leading-normal">Remember me</label>
                </div>
                <a class="text-primary font-medium cursor-pointer hover:text-primary-emphasis">Forgot your password?</a>
            </div>
        </div>
        <p-button label="Sign In" icon="pi pi-user" styleClass="w-full py-2 rounded-lg flex justify-center items-center gap-2"></p-button>
    </div>
</div>`;this.block10=`<div class="bg-surface-0 dark:bg-surface-950 px-8 md:px-20 py-12 md:py-20 lg:px-80">
    <div class="flex flex-col gap-4">
        <div class="flex flex-col gap-2 pb-4">
            <div class="font-semibold text-xl text-surface-900 dark:text-surface-0 leading-tight">Movie Information</div>
            <div class="text-surface-500 dark:text-surface-300 text-base leading-tight">Morbi tristique blandit turpis. In viverra ligula id nulla hendrerit rutrum.</div>
        </div>

        <div class="border-t border-surface-200 dark:border-surface-700"></div>

        <div class="flex flex-col gap-4">
            <div class="flex flex-col md:flex-row gap-4">
                <div class="flex items-center gap-4 flex-1">
                    <div class="w-[140px] text-surface-900 dark:text-surface-0 font-medium text-base leading-tight">Title</div>
                    <div class="flex-1 text-surface-900 dark:text-surface-0 text-base leading-tight">Heat</div>
                </div>
                <div class="flex justify-end">
                    <p-button icon="pi pi-pen-to-square" [rounded]="true" [outlined]="true" severity="secondary" styleClass="shrink-0"></p-button>
                </div>
            </div>

            <div class="border-t border-surface-200 dark:border-surface-700"></div>

            <div class="flex flex-col md:flex-row gap-4">
                <div class="flex items-center gap-4 flex-1">
                    <div class="w-[140px] text-surface-900 dark:text-surface-0 font-medium text-base leading-tight">Genre</div>
                    <div class="flex-1 flex flex-wrap gap-2">
                        <p-chip label="Crime"></p-chip>
                        <p-chip label="Drama"></p-chip>
                        <p-chip label="Thriller"></p-chip>
                    </div>
                </div>
                <div class="flex justify-end">
                    <p-button icon="pi pi-pen-to-square" [rounded]="true" [outlined]="true" severity="secondary" styleClass="shrink-0"></p-button>
                </div>
            </div>

            <div class="border-t border-surface-200 dark:border-surface-700"></div>

            <div class="flex flex-col md:flex-row gap-4">
                <div class="flex items-center gap-4 flex-1">
                    <div class="w-[140px] text-surface-900 dark:text-surface-0 font-medium text-base leading-tight">Director</div>
                    <div class="flex-1 text-surface-900 dark:text-surface-0 text-base leading-tight">Michael Mann</div>
                </div>
                <div class="flex justify-end">
                    <p-button icon="pi pi-pen-to-square" [rounded]="true" [outlined]="true" severity="secondary" styleClass="shrink-0"></p-button>
                </div>
            </div>

            <div class="border-t border-surface-200 dark:border-surface-700"></div>

            <div class="flex flex-col md:flex-row gap-4">
                <div class="flex items-center gap-4 flex-1">
                    <div class="w-[140px] text-surface-900 dark:text-surface-0 font-medium text-base leading-tight">Writer</div>
                    <div class="flex-1 text-surface-900 dark:text-surface-0 text-base leading-tight">Michael Mann</div>
                </div>
                <div class="flex justify-end">
                    <p-button icon="pi pi-pen-to-square" [rounded]="true" [outlined]="true" severity="secondary" styleClass="shrink-0"></p-button>
                </div>
            </div>

            <div class="border-t border-surface-200 dark:border-surface-700"></div>

            <div class="flex flex-col md:flex-row gap-4">
                <div class="flex items-start gap-4 flex-1">
                    <div class="w-[140px] text-surface-900 dark:text-surface-0 font-medium text-base leading-tight">Plot</div>
                    <div class="flex-1 text-surface-900 dark:text-surface-0 text-base leading-normal">A group of professional bank robbers start to feel the heat from police when they unknowingly leave a clue at their latest heist.</div>
                </div>
                <div class="flex justify-end">
                    <p-button icon="pi pi-pen-to-square" [rounded]="true" [outlined]="true" severity="secondary" styleClass="shrink-0"></p-button>
                </div>
            </div>

            <div class="border-t border-surface-200 dark:border-surface-700"></div>
        </div>
    </div>
</div>`;this.block11=`<div class="bg-surface-50 dark:bg-surface-950 px-6 py-20 md:px-12 lg:px-20">
    <div class="bg-surface-0 dark:bg-surface-900 p-6 shadow rounded-2xl flex flex-col gap-4">
        <div class="flex gap-4">
            <div class="flex flex-col gap-2 flex-1">
                <div class="text-2xl leading-tight font-semibold text-surface-900 dark:text-surface-0">Card Title</div>
                <div class="text-base leading-tight text-surface-500 dark:text-surface-300">Vivamus id nisl interdum, blandit augue sit amet, eleifend mi.</div>
            </div>
        </div>
        <div class="flex flex-1">
            <div class="flex-1 border-2 border-dashed border-surface-200 dark:border-surface-700 rounded-lg h-[150px]"></div>
        </div>
    </div>
</div>`}static{this.\u0275fac=function(n){return new(n||d)}}static{this.\u0275cmp=g({type:d,selectors:[["app-blocks"]],decls:427,vars:34,consts:[[1,"bg-surface-0","dark:bg-surface-900","border","border-surface","rounded-xl","p-8","bg-[url('/demo/images/blocks/landing-blocks.jpg')]","dark:bg-[url('/demo/images/blocks/landing-blocks-dark.jpg')]","bg-cover","bg-no-repeat","h-[440px]","flex","mb-8"],[1,"flex","flex-col","gap-4","items-center","sm:items-start","justify-center","sm:max-w-144"],[1,"bg-surface-950","text-white","px-2","py-1","font-bold","rounded-md","text-sm"],[1,"flex","items-center","gap-4"],[1,"font-bold","text-4xl","text-surface-950","dark:text-surface-0"],[1,"text-surface-700","dark:text-surface-300","text-lg","text-center","sm:text-start"],[1,"flex","gap-2"],["pButton","","label","Explore Blocks","href","https://primeblocks.org","target","_blank","rel","noopener"],["header","Hero","free","",3,"code"],[1,"relative","min-h-160","lg:min-h-0","bg-surface-0","dark:bg-surface-900","flex","lg:flex-row","flex-col"],[1,"flex","lg:flex","lg:flex-row","flex-col","justify-center","md:justify-normal","h-full","flex-1"],[1,"relative","flex-1","z-20","flex","items-center","justify-center"],[1,"flex","items-center","justify-center","h-full"],[1,"w-full","max-w-2xl","px-6","py-12","lg:p-12","xl:p-16","text-center","lg:text-left"],[1,"text-4xl","xl:text-5xl","font-bold","text-surface-0","lg:text-surface-900","dark:text-surface-0","mb-6","leading-tight!"],[1,"block"],[1,"block","text-primary"],[1,"text-surface-0/90","lg:text-surface-700","dark:text-surface-200","text-xl","leading-normal","mb-8","max-w-xl","lg:max-w-none"],[1,"flex","items-center","gap-4","justify-center","lg:justify-start"],["label","Learn More","type","button"],["label","Live Demo","type","button",3,"outlined"],[1,"absolute","lg:relative","inset-0","lg:inset-auto","flex-1"],[1,"absolute","lg:hidden","inset-0","bg-surface-900/60","dark:bg-surface-900/80","z-10"],["src","https://fqjltiegiezfetthbags.supabase.co/storage/v1/render/image/public/block.images/blocks/hero/hero-1.png","alt","hero-1",1,"h-full","w-full","object-cover","xl:[clip-path:polygon(12%_0,100%_0%,100%_100%,0_100%)]"],["header","Feature","free","",3,"code"],[1,"bg-surface-0","dark:bg-surface-950","px-6","md:px-12","lg:px-20","py-20","text-center"],[1,"flex","flex-col","gap-6"],[1,"flex","flex-col","items-center","gap-4"],[1,"font-bold","text-3xl","leading-tight"],[1,"text-surface-900","dark:text-surface-0"],[1,"text-primary-500","dark:text-primary-400"],[1,"text-surface-500","dark:text-surface-400","leading-tight"],[1,"grid","grid-cols-1","md:grid-cols-2","lg:grid-cols-3","gap-4"],[1,"w-full","rounded-md","p-4"],[1,"mb-4","flex","h-16","w-16","items-center","justify-center","rounded-lg","bg-surface-0","dark:bg-surface-800","shadow","mx-auto"],[1,"pi","pi-desktop","text-2xl!","lg:text-3xl!","text-primary-500","dark:text-primary-400"],[1,"flex","flex-col","gap-1"],[1,"text-surface-900","dark:text-surface-0","text-xl","font-medium","leading-tight"],[1,"text-surface-500","dark:text-surface-400","leading-normal"],[1,"pi","pi-lock","text-2xl!","lg:text-3xl!","text-primary-500","dark:text-primary-400"],[1,"pi","pi-face-smile","text-2xl!","lg:text-3xl!","text-primary-500","dark:text-primary-400"],[1,"pi","pi-globe","text-2xl!","lg:text-3xl!","text-primary-500","dark:text-primary-400"],[1,"pi","pi-github","text-2xl!","lg:text-3xl!","text-primary-500","dark:text-primary-400"],[1,"pi","pi-shield","text-2xl!","lg:text-3xl!","text-primary-500","dark:text-primary-400"],["header","Card","free","",3,"code"],[1,"px-6","py-20","md:px-20","lg:px-80","flex","items-center","justify-center","backdrop-blur-3xl","bg-cover!","bg-center!","bg-no-repeat!",2,"background-image","url('https://fqjltiegiezfetthbags.supabase.co/storage/v1/object/public/block.images/blocks/signin/signin-glass.jpg')"],[1,"px-8","md:px-12","lg:px-20","py-12","flex","flex-col","items-center","gap-12","w-full","backdrop-blur-2xl","rounded-2xl","bg-white/10","border","border-white/10","max-w-xl"],[1,"flex","flex-col","items-center","gap-4","w-full"],["xmlns","http://www.w3.org/2000/svg","width","33","height","32","viewBox","0 0 33 32","fill","none",1,"h-14","w-14"],["fill-rule","evenodd","clip-rule","evenodd","d","M7.09219 2.87829C5.94766 3.67858 4.9127 4.62478 4.01426 5.68992C7.6857 5.34906 12.3501 5.90564 17.7655 8.61335C23.5484 11.5047 28.205 11.6025 31.4458 10.9773C31.1517 10.087 30.7815 9.23135 30.343 8.41791C26.6332 8.80919 21.8772 8.29127 16.3345 5.51998C12.8148 3.76014 9.71221 3.03521 7.09219 2.87829ZM28.1759 5.33332C25.2462 2.06 20.9887 0 16.25 0C14.8584 0 13.5081 0.177686 12.2209 0.511584C13.9643 0.987269 15.8163 1.68319 17.7655 2.65781C21.8236 4.68682 25.3271 5.34013 28.1759 5.33332ZM32.1387 14.1025C28.2235 14.8756 22.817 14.7168 16.3345 11.4755C10.274 8.44527 5.45035 8.48343 2.19712 9.20639C2.0292 9.24367 1.86523 9.28287 1.70522 9.32367C1.2793 10.25 0.939308 11.2241 0.695362 12.2356C0.955909 12.166 1.22514 12.0998 1.50293 12.0381C5.44966 11.161 11.0261 11.1991 17.7655 14.5689C23.8261 17.5991 28.6497 17.561 31.9029 16.838C32.0144 16.8133 32.1242 16.7877 32.2322 16.7613C32.2441 16.509 32.25 16.2552 32.25 16C32.25 15.358 32.2122 14.7248 32.1387 14.1025ZM31.7098 20.1378C27.8326 20.8157 22.5836 20.5555 16.3345 17.431C10.274 14.4008 5.45035 14.439 2.19712 15.1619C1.475 15.3223 0.825392 15.5178 0.252344 15.7241C0.250782 15.8158 0.25 15.9078 0.25 16C0.25 24.8366 7.41344 32 16.25 32C23.6557 32 29.8862 26.9687 31.7098 20.1378Z",1,"fill-surface-0"],[1,"flex","flex-col","gap-2","w-full"],[1,"text-center","text-3xl","font-medium","text-white","leading-tight"],[1,"text-center"],[1,"text-white/80"],[1,"text-white/80","cursor-pointer","hover:text-white/90","underline"],[1,"flex","flex-col","items-center","gap-8","w-full"],[1,"flex","flex-col","gap-6","w-full"],["styleClass","pi pi-user text-white/70!"],["pInputText","","type","text","placeholder","Username",1,"appearance-none!","border!","border-white/10!","w-full!","outline-0!","bg-white/10!","text-white!","placeholder:text-white/70!","rounded-3xl!","shadow-sm!"],["styleClass","pi pi-lock text-white/70!"],["pInputText","","type","password","placeholder","Password",1,"appearance-none!","border!","border-white/10!","w-full!","outline-0!","bg-white/10!","text-white!","placeholder:text-white/70!","rounded-3xl!","shadow-sm!"],["label","Sign In","styleClass","w-full! rounded-3xl! bg-surface-950! border! border-surface-950! text-white! hover:bg-surface-950/80!",1,"flex-1","self-start","w-full"],[1,"text-white/80","cursor-pointer","hover:text-white/90"],["header","Pricing","free","",3,"code"],[1,"bg-surface-50","dark:bg-surface-950","px-6","py-20","md:px-12","lg:px-20"],[1,"flex","flex-col","gap-4","items-center","justify-center","mb-12"],[1,"text-surface-900","dark:text-surface-0","font-bold","text-4xl","lg:text-5xl","text-center","leading-tight"],[1,"text-surface-500","dark:text-surface-400","text-lg","text-center","leading-normal"],[1,"flex","lg:flex-row","flex-col","gap-8","max-w-7xl","mx-auto"],[1,"w-full","flex-1","p-8","flex","rounded-2xl","flex-col","bg-surface-0","dark:bg-surface-800","shadow-sm","gap-6"],[1,"flex","flex-col","gap-2"],[1,"text-surface-900","dark:text-surface-0","font-medium","text-xl","leading-tight"],[1,"w-full","h-px","bg-surface-200","dark:bg-surface-700"],[1,"flex","items-center","gap-2"],[1,"font-bold","text-3xl","text-surface-900","dark:text-surface-0","leading-tight"],[1,"font-medium","text-surface-500","dark:text-surface-400","leading-tight"],[1,"w-full","h-px","bg-surface-200","dark:bg-surface-600"],[1,"list-none","flex","flex-col","gap-4","flex-1"],[1,"pi","pi-check-circle","text-lg!","text-green-500"],[1,"text-surface-800","dark:text-surface-100","leading-tight"],["label","Buy Now","styleClass","w-full",3,"rounded"],["header","Call to Action","free","",3,"code"],[1,"bg-surface-0","dark:bg-surface-950","px-6","py-20","md:px-12","lg:px-20"],[1,"text-surface-700","dark:text-surface-100","text-center","flex","flex-col","items-center","gap-4"],[1,"text-primary","font-bold","text-lg","leading-tight"],[1,"pi","pi-discord","text-lg!","leading-none!"],[1,"text-surface-900","dark:text-surface-0","font-bold","text-4xl","leading-tight"],[1,"text-surface-700","dark:text-surface-100","text-xl","leading-normal"],["label","Join Now","icon","pi pi-discord",1,"mt-4",3,"rounded"],["header","Banner","containerClass","bg-surface-0 dark:bg-surface-950","free","",3,"code"],[1,"pb-20","bg-surface-0","dark:bg-surface-950"],[1,"bg-surface-900","text-surface-100","py-4","px-6","lg:px-20","flex","justify-between","items-center","flex-wrap"],[1,"font-bold"],[1,"inline-flex","gap-1","items-center"],[1,"hidden","lg:flex","leading-normal"],["href","#",1,"text-surface-0","underline","font-bold"],["icon","pi pi-times","severity","secondary","styleClass","text-surface-0! hover:bg-surface-500/20!",3,"text","rounded"],["header","Page Heading","free","",3,"code"],[1,"bg-surface-0","dark:bg-surface-950","px-6","py-8","md:px-12","lg:px-20"],[1,"list-none","p-0","m-0","flex","items-center","font-medium","mb-5"],[1,"text-surface-500","dark:text-surface-300","no-underline","leading-normal","cursor-pointer"],[1,"px-2"],[1,"pi","pi-angle-right","text-surface-500","dark:text-surface-300","text-sm!","leading-normal!"],[1,"text-surface-900","dark:text-surface-0","leading-normal"],[1,"flex","items-start","flex-col","md:justify-between","md:flex-row"],[1,"font-bold","text-3xl","text-surface-900","dark:text-surface-0","mb-4"],[1,"flex","items-center","text-surface-700","dark:text-surface-300","flex-wrap","gap-8"],[1,"pi","pi-users","text-base!","leading-normal!"],[1,"pi","pi-globe","text-base!","leading-normal!"],[1,"pi","pi-clock","text-base!","leading-normal!"],[1,"mt-6","md:mt-0","flex","items-center"],["label","Add","icon","pi pi-user-plus",1,"mr-3",3,"outlined"],["label","Save Changes","icon","pi pi-check","styleClass","whitespace-nowrap"],["header","Stats","free","",3,"code"],[1,"bg-surface-50","dark:bg-surface-950","px-6","py-8","md:px-12","lg:px-20"],[1,"grid","grid-cols-1","gap-8","md:grid-cols-2","lg:grid-cols-4"],[1,"bg-surface-0","dark:bg-surface-900","shadow-sm","p-5","rounded-2xl"],[1,"flex","justify-between","gap-4"],[1,"text-surface-700","dark:text-surface-300","font-normal","leading-tight"],[1,"text-surface-900","dark:text-surface-0","font-semibold","text-2xl!","leading-tight!"],[1,"flex","items-center","justify-center","bg-linear-to-b","from-cyan-400","dark:from-cyan-300","to-cyan-600","dark:to-cyan-500","rounded-lg","w-10","h-10"],[1,"pi","pi-envelope","text-surface-0","dark:text-surface-900","text-xl!","leading-none!"],[1,"mt-4"],[1,"text-surface-600","dark:text-surface-300","font-medium","leading-tight"],[1,"text-surface-500","dark:text-surface-300","leading-tight"],[1,"flex","items-center","justify-center","bg-linear-to-b","from-orange-400","dark:from-orange-300","to-orange-600","dark:to-orange-500","rounded-lg","w-10","h-10"],[1,"pi","pi-map-marker","text-surface-0","dark:text-surface-900","text-xl!","leading-none!"],[1,"flex","items-center","justify-center","bg-linear-to-b","from-slate-400","dark:from-slate-300","to-slate-600","dark:to-slate-500","rounded-lg","w-10","h-10"],[1,"pi","pi-file","text-surface-0","dark:text-surface-900","text-xl!","leading-none!"],[1,"flex","items-center","justify-center","bg-linear-to-b","from-violet-400","dark:from-violet-300","to-violet-600","dark:to-violet-500","rounded-lg","w-10","h-10"],[1,"pi","pi-users","text-surface-0","dark:text-surface-900","text-xl!","leading-none!"],["header","Sign-In","containerClass","","free","",3,"code"],[1,"bg-surface-50","dark:bg-surface-950","px-6","py-20","md:px-12","lg:px-20","flex","items-center","justify-center"],[1,"bg-surface-0","dark:bg-surface-900","p-8","md:p-12","shadow-sm","rounded-2xl","w-full","max-w-xl","mx-auto","flex","flex-col","gap-8"],["fill-rule","evenodd","clip-rule","evenodd","d","M7.09219 2.87829C5.94766 3.67858 4.9127 4.62478 4.01426 5.68992C7.6857 5.34906 12.3501 5.90564 17.7655 8.61335C23.5484 11.5047 28.205 11.6025 31.4458 10.9773C31.1517 10.087 30.7815 9.23135 30.343 8.41791C26.6332 8.80919 21.8772 8.29127 16.3345 5.51998C12.8148 3.76014 9.71221 3.03521 7.09219 2.87829ZM28.1759 5.33332C25.2462 2.06 20.9887 0 16.25 0C14.8584 0 13.5081 0.177686 12.2209 0.511584C13.9643 0.987269 15.8163 1.68319 17.7655 2.65781C21.8236 4.68682 25.3271 5.34013 28.1759 5.33332ZM32.1387 14.1025C28.2235 14.8756 22.817 14.7168 16.3345 11.4755C10.274 8.44527 5.45035 8.48343 2.19712 9.20639C2.0292 9.24367 1.86523 9.28287 1.70522 9.32367C1.2793 10.25 0.939308 11.2241 0.695362 12.2356C0.955909 12.166 1.22514 12.0998 1.50293 12.0381C5.44966 11.161 11.0261 11.1991 17.7655 14.5689C23.8261 17.5991 28.6497 17.561 31.9029 16.838C32.0144 16.8133 32.1242 16.7877 32.2322 16.7613C32.2441 16.509 32.25 16.2552 32.25 16C32.25 15.358 32.2122 14.7248 32.1387 14.1025ZM31.7098 20.1378C27.8326 20.8157 22.5836 20.5555 16.3345 17.431C10.274 14.4008 5.45035 14.439 2.19712 15.1619C1.475 15.3223 0.825392 15.5178 0.252344 15.7241C0.250782 15.8158 0.25 15.9078 0.25 16C0.25 24.8366 7.41344 32 16.25 32C23.6557 32 29.8862 26.9687 31.7098 20.1378Z",1,"fill-surface-700","dark:fill-surface-200"],[1,"flex","flex-col","items-center","gap-2","w-full"],[1,"text-surface-900","dark:text-surface-0","text-2xl","font-semibold","leading-tight","text-center","w-full"],[1,"text-center","w-full"],[1,"text-surface-700","dark:text-surface-200","leading-normal"],[1,"text-primary","font-medium","ml-1","cursor-pointer","hover:text-primary-emphasis"],["for","email1",1,"text-surface-900","dark:text-surface-0","font-medium","leading-normal"],["pInputText","","id","email1","type","text","placeholder","Email address",1,"w-full","px-3","py-2","shadow-sm","rounded-lg"],["for","password1",1,"text-surface-900","dark:text-surface-0","font-medium","leading-normal"],["id","password1","placeholder","Password","inputStyleClass","w-full!",3,"ngModelChange","ngModel","toggleMask","feedback"],[1,"flex","flex-col","sm:flex-row","items-start","sm:items-center","justify-between","w-full","gap-3","sm:gap-0"],["inputId","rememberme1",3,"ngModelChange","ngModel","binary"],["for","rememberme1",1,"text-surface-900","dark:text-surface-0","leading-normal"],[1,"text-primary","font-medium","cursor-pointer","hover:text-primary-emphasis"],["label","Sign In","icon","pi pi-user","styleClass","w-full py-2 rounded-lg flex justify-center items-center gap-2"],["header","Description List","free","",3,"code"],[1,"bg-surface-0","dark:bg-surface-950","px-8","md:px-20","py-12","md:py-20","lg:px-80"],[1,"flex","flex-col","gap-4"],[1,"flex","flex-col","gap-2","pb-4"],[1,"font-semibold","text-xl","text-surface-900","dark:text-surface-0","leading-tight"],[1,"text-surface-500","dark:text-surface-300","text-base","leading-tight"],[1,"border-t","border-surface-200","dark:border-surface-700"],[1,"flex","flex-col","md:flex-row","gap-4"],[1,"flex","items-center","gap-4","flex-1"],[1,"w-[140px]","text-surface-900","dark:text-surface-0","font-medium","text-base","leading-tight"],[1,"flex-1","text-surface-900","dark:text-surface-0","text-base","leading-tight"],[1,"flex","justify-end"],["icon","pi pi-pen-to-square","severity","secondary","styleClass","shrink-0",3,"rounded","outlined"],[1,"flex-1","flex","flex-wrap","gap-2"],["label","Crime"],["label","Drama"],["label","Thriller"],[1,"flex","items-start","gap-4","flex-1"],[1,"flex-1","text-surface-900","dark:text-surface-0","text-base","leading-normal"],[1,"bg-surface-0","dark:bg-surface-900","p-6","shadow","rounded-2xl","flex","flex-col","gap-4"],[1,"flex","gap-4"],[1,"flex","flex-col","gap-2","flex-1"],[1,"text-2xl","leading-tight","font-semibold","text-surface-900","dark:text-surface-0"],[1,"text-base","leading-tight","text-surface-500","dark:text-surface-300"],[1,"flex","flex-1"],[1,"flex-1","border-2","border-dashed","border-surface-200","dark:border-surface-700","rounded-lg","h-[150px]"]],template:function(n,l){n&1&&(e(0,"div")(1,"div",0)(2,"div",1)(3,"span",2),i(4,"TailwindCSS v4"),t(),e(5,"div",3)(6,"span",4),i(7,"PrimeBlocks"),t()(),e(8,"p",5),i(9," Ready-to-use UI blocks for building beautiful applications. A comprehensive collection of components designed to speed up your development process. "),t(),e(10,"div",6),a(11,"a",7),t()()(),e(12,"block-viewer",8)(13,"div",9)(14,"div",10)(15,"div",11)(16,"div",12)(17,"div",13)(18,"h1",14)(19,"span",15),i(20,"Create the screens your"),t(),e(21,"span",16),i(22,"visitors deserve to see"),t()(),e(23,"p",17),i(24," Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. "),t(),e(25,"div",18),a(26,"p-button",19)(27,"p-button",20),t()()()(),e(28,"div",21),a(29,"div",22)(30,"img",23),t()()()(),e(31,"block-viewer",24)(32,"div",25)(33,"div",26)(34,"div",27)(35,"div",28)(36,"span",29),i(37,"One Product, "),t(),e(38,"span",30),i(39,"Many Solutions"),t()(),e(40,"div",31),i(41,"Ac turpis egestas maecenas pharetra convallis posuere morbi leo urna."),t()(),e(42,"div",32)(43,"div",33)(44,"span",34),a(45,"i",35),t(),e(46,"div",36)(47,"div",37),i(48,"Built for Developers"),t(),e(49,"p",38),i(50,"Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."),t()()(),e(51,"div",33)(52,"span",34),a(53,"i",39),t(),e(54,"div",36)(55,"div",37),i(56,"End-to-End Encryption"),t(),e(57,"p",38),i(58,"Risus nec feugiat in fermentum posuere urna nec. Posuere sollicitudin aliquam ultrices sagittis."),t()()(),e(59,"div",33)(60,"span",34),a(61,"i",40),t(),e(62,"div",36)(63,"div",37),i(64,"Easy to Use"),t(),e(65,"p",38),i(66,"Ornare suspendisse sed nisi lacus sed viverra tellus. Neque volutpat ac tincidunt vitae semper."),t()()(),e(67,"div",33)(68,"span",34),a(69,"i",41),t(),e(70,"div",36)(71,"div",37),i(72,"Fast & Global Support"),t(),e(73,"p",38),i(74,"Fermentum et sollicitudin ac orci phasellus egestas tellus rutrum tellus."),t()()(),e(75,"div",33)(76,"span",34),a(77,"i",42),t(),e(78,"div",36)(79,"div",37),i(80,"Open Source"),t(),e(81,"p",38),i(82,"Nec tincidunt praesent semper feugiat. Sed adipiscing diam donec adipiscing tristique risus nec feugiat."),t()()(),e(83,"div",33)(84,"span",34),a(85,"i",43),t(),e(86,"div",36)(87,"div",37),i(88,"Trusted Security"),t(),e(89,"p",38),i(90,"Mattis rhoncus urna neque viverra justo nec ultrices. Id cursus metus aliquam eleifend."),t()()()()()()(),e(91,"block-viewer",44)(92,"div",45)(93,"div",46)(94,"div",47),u(),e(95,"svg",48),a(96,"path",49),t(),p(),e(97,"div",50)(98,"div",51),i(99,"Welcome Back"),t(),e(100,"div",52)(101,"span",53),i(102,"Don't have an account? "),t(),e(103,"a",54),i(104,"Sign up"),t()()()(),e(105,"div",55)(106,"div",56)(107,"p-iconfield"),a(108,"p-inputicon",57)(109,"input",58),t(),e(110,"p-iconfield"),a(111,"p-inputicon",59)(112,"input",60),t()(),a(113,"p-button",61),t(),e(114,"a",62),i(115,"Forgot Password?"),t()()()(),e(116,"block-viewer",63)(117,"div",64)(118,"div",65)(119,"div",66),i(120,"Pricing Plans"),t(),e(121,"div",67),i(122,"Lorem ipsum dolor sit, amet consectetur adipisicing elit. Velit numquam eligendi quos."),t()(),e(123,"div",68)(124,"div",69)(125,"div",70)(126,"h4",71),i(127,"Basic"),t(),e(128,"p",38),i(129,"Lorem ipsum dolor sit, amet consectetur adipisicing elit. Velit numquam eligendi quos."),t()(),a(130,"div",72),e(131,"div",73)(132,"span",74),i(133,"$9"),t(),e(134,"span",75),i(135,"per month"),t()(),a(136,"div",76),e(137,"ul",77)(138,"li",73),a(139,"i",78),e(140,"span",79),i(141,"Arcu vitae elementum"),t()(),e(142,"li",73),a(143,"i",78),e(144,"span",79),i(145,"Dui faucibus in ornare"),t()(),e(146,"li",73),a(147,"i",78),e(148,"span",79),i(149,"Morbi tincidunt augue"),t()()(),a(150,"p-button",80),t(),e(151,"div",69)(152,"div",70)(153,"h4",71),i(154,"Premium"),t(),e(155,"p",38),i(156,"Lorem ipsum dolor sit, amet consectetur adipisicing elit. Velit numquam eligendi quos."),t()(),a(157,"div",72),e(158,"div",73)(159,"span",74),i(160,"$29"),t(),e(161,"span",75),i(162,"per month"),t()(),a(163,"div",76),e(164,"ul",77)(165,"li",73),a(166,"i",78),e(167,"span",79),i(168,"Arcu vitae elementum"),t()(),e(169,"li",73),a(170,"i",78),e(171,"span",79),i(172,"Dui faucibus in ornare"),t()(),e(173,"li",73),a(174,"i",78),e(175,"span",79),i(176,"Morbi tincidunt augue"),t()(),e(177,"li",73),a(178,"i",78),e(179,"span",79),i(180,"Duis ultricies lacus sed"),t()()(),a(181,"p-button",80),t(),e(182,"div",69)(183,"div",70)(184,"h4",71),i(185,"Enterprise"),t(),e(186,"p",38),i(187,"Lorem ipsum dolor sit, amet consectetur adipisicing elit. Velit numquam eligendi quos."),t()(),a(188,"div",72),e(189,"div",73)(190,"span",74),i(191,"$49"),t(),e(192,"span",75),i(193,"per month"),t()(),a(194,"div",76),e(195,"ul",77)(196,"li",73),a(197,"i",78),e(198,"span",79),i(199,"Arcu vitae elementum"),t()(),e(200,"li",73),a(201,"i",78),e(202,"span",79),i(203,"Dui faucibus in ornare"),t()(),e(204,"li",73),a(205,"i",78),e(206,"span",79),i(207,"Morbi tincidunt augue"),t()(),e(208,"li",73),a(209,"i",78),e(210,"span",79),i(211,"Duis ultricies lacus sed"),t()(),e(212,"li",73),a(213,"i",78),e(214,"span",79),i(215,"Imperdiet proin"),t()()(),a(216,"p-button",80),t()()()(),e(217,"block-viewer",81)(218,"div",82)(219,"div",83)(220,"div",84),a(221,"i",85),i(222,"\xA0POWERED BY DISCORD"),t(),e(223,"div",86),i(224,"Join our design community"),t(),e(225,"div",87),i(226,"Lorem ipsum dolor sit, amet consectetur adipisicing elit. Velit numquam eligendi quos."),t(),a(227,"p-button",88),t()()(),e(228,"block-viewer",89)(229,"div",90)(230,"div",91)(231,"div",92),i(232,"\u{1F525} Hot Deals!"),t(),e(233,"div",93)(234,"span",94),i(235,"Libero voluptatum atque exercitationem praesentium provident odit."),t(),e(236,"a",95),i(237,"Learn More"),t()(),a(238,"p-button",96),t()()(),e(239,"block-viewer",97)(240,"div",98)(241,"ul",99)(242,"li")(243,"a",100),i(244,"Application"),t()(),e(245,"li",101),a(246,"i",102),t(),e(247,"li")(248,"span",103),i(249,"Analytics"),t()()(),e(250,"div",104)(251,"div")(252,"div",105),i(253,"Customers"),t(),e(254,"div",106)(255,"div",73),a(256,"i",107),e(257,"span"),i(258,"332 Active Users"),t()(),e(259,"div",73),a(260,"i",108),e(261,"span"),i(262,"9.402 Sessions"),t()(),e(263,"div",73),a(264,"i",109),e(265,"span"),i(266,"2.32m Avg. Duration"),t()()()(),e(267,"div",110),a(268,"p-button",111)(269,"p-button",112),t()()()(),e(270,"block-viewer",113)(271,"div",114)(272,"div",115)(273,"div",116)(274,"div",117)(275,"div",70)(276,"span",118),i(277,"Messages"),t(),e(278,"div",119),i(279,"152"),t()(),e(280,"div",120),a(281,"i",121),t()(),e(282,"div",122)(283,"span",123),i(284,"24 new"),t(),e(285,"span",124),i(286," since last visit"),t()()(),e(287,"div",116)(288,"div",117)(289,"div",70)(290,"span",118),i(291,"Check-ins"),t(),e(292,"div",119),i(293,"532"),t()(),e(294,"div",125),a(295,"i",126),t()(),e(296,"div",122)(297,"span",123),i(298,"48 new"),t(),e(299,"span",124),i(300," since last visit"),t()()(),e(301,"div",116)(302,"div",117)(303,"div",70)(304,"span",118),i(305,"Files Synced"),t(),e(306,"div",119),i(307,"28.441"),t()(),e(308,"div",127),a(309,"i",128),t()(),e(310,"div",122)(311,"span",124),i(312,"32,56 / 250 GB"),t()()(),e(313,"div",116)(314,"div",117)(315,"div",70)(316,"span",118),i(317,"Users Online"),t(),e(318,"div",119),i(319,"25.660"),t()(),e(320,"div",129),a(321,"i",130),t()(),e(322,"div",122)(323,"span",123),i(324,"72 new"),t(),e(325,"span",124),i(326," user this week"),t()()()()()(),e(327,"block-viewer",131)(328,"div",132)(329,"div",133)(330,"div",27)(331,"div",3),u(),e(332,"svg",48),a(333,"path",134),t()(),p(),e(334,"div",135)(335,"div",136),i(336,"Welcome Back"),t(),e(337,"div",137)(338,"span",138),i(339,"Don't have an account?"),t(),e(340,"a",139),i(341,"Create today!"),t()()()(),e(342,"div",56)(343,"div",50)(344,"label",140),i(345,"Email Address"),t(),a(346,"input",141),t(),e(347,"div",50)(348,"label",142),i(349,"Password"),t(),e(350,"p-password",143),M("ngModelChange",function(c){return E(l.password,c)||(l.password=c),c}),t()(),e(351,"div",144)(352,"div",73)(353,"p-checkbox",145),M("ngModelChange",function(c){return E(l.checked,c)||(l.checked=c),c}),t(),e(354,"label",146),i(355,"Remember me"),t()(),e(356,"a",147),i(357,"Forgot your password?"),t()()(),a(358,"p-button",148),t()()(),e(359,"block-viewer",149)(360,"div",150)(361,"div",151)(362,"div",152)(363,"div",153),i(364,"Movie Information"),t(),e(365,"div",154),i(366,"Morbi tristique blandit turpis. In viverra ligula id nulla hendrerit rutrum."),t()(),a(367,"div",155),e(368,"div",151)(369,"div",156)(370,"div",157)(371,"div",158),i(372,"Title"),t(),e(373,"div",159),i(374,"Heat"),t()(),e(375,"div",160),a(376,"p-button",161),t()(),a(377,"div",155),e(378,"div",156)(379,"div",157)(380,"div",158),i(381,"Genre"),t(),e(382,"div",162),a(383,"p-chip",163)(384,"p-chip",164)(385,"p-chip",165),t()(),e(386,"div",160),a(387,"p-button",161),t()(),a(388,"div",155),e(389,"div",156)(390,"div",157)(391,"div",158),i(392,"Director"),t(),e(393,"div",159),i(394,"Michael Mann"),t()(),e(395,"div",160),a(396,"p-button",161),t()(),a(397,"div",155),e(398,"div",156)(399,"div",157)(400,"div",158),i(401,"Writer"),t(),e(402,"div",159),i(403,"Michael Mann"),t()(),e(404,"div",160),a(405,"p-button",161),t()(),a(406,"div",155),e(407,"div",156)(408,"div",166)(409,"div",158),i(410,"Plot"),t(),e(411,"div",167),i(412,"A group of professional bank robbers start to feel the heat from police when they unknowingly leave a clue at their latest heist."),t()(),e(413,"div",160),a(414,"p-button",161),t()(),a(415,"div",155),t()()()(),e(416,"block-viewer",44)(417,"div",64)(418,"div",168)(419,"div",169)(420,"div",170)(421,"div",171),i(422,"Card Title"),t(),e(423,"div",172),i(424,"Vivamus id nisl interdum, blandit augue sit amet, eleifend mi."),t()()(),e(425,"div",173),a(426,"div",174),t()()()()()),n&2&&(r(12),s("code",l.block1),r(15),s("outlined",!0),r(4),s("code",l.block2),r(60),s("code",l.block3),r(25),s("code",l.block4),r(34),s("rounded",!0),r(31),s("rounded",!0),r(35),s("rounded",!0),r(),s("code",l.block5),r(10),s("rounded",!0),r(),s("code",l.block6),r(10),s("text",!0)("rounded",!0),r(),s("code",l.block7),r(29),s("outlined",!0),r(2),s("code",l.block8),r(57),s("code",l.block9),r(23),C("ngModel",l.password),s("toggleMask",!0)("feedback",!1),r(3),C("ngModel",l.checked),s("binary",!0),r(6),s("code",l.block10),r(17),s("rounded",!0)("outlined",!0),r(11),s("rounded",!0)("outlined",!0),r(9),s("rounded",!0)("outlined",!0),r(9),s("rounded",!0)("outlined",!0),r(9),s("rounded",!0)("outlined",!0),r(2),s("code",l.block11))},dependencies:[b,h,T,L,P,G,O,W,H,R,z,Z,F,N],encapsulation:2})}};var we=[{path:"",data:{breadcrumb:"Free Blocks"},component:k}];export{we as default};
