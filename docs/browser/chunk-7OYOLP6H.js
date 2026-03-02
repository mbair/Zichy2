function u(a,r){return n=>{let e=n.get(a)?.value,t=n.get(r)?.value;return e&&t&&(new Date(e)>new Date(t)||new Date(t)<new Date(e))?{dateRangeInvalid:!0}:null}}export{u as a};
