function i(n,r){return e=>{let t=e.get(n)?.value,a=e.get(r)?.value;return t&&a&&(new Date(t)>new Date(a)||new Date(a)<new Date(t))?{dateRangeInvalid:!0}:null}}export{i as a};
