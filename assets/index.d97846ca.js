import{d as y,a as p,g,h as f,D as E,n as $,E as S,F as l,x,v as D,G as b}from"./vendor.b1cf85ea.js";const B=y({__name:"index",props:{className:{type:String,default:"icon"},width:{type:Number,default:25},height:{type:Number,default:25},size:{type:Number}},setup(e){return(s,r)=>(p(),g("div",{alt:"",class:E(e.className+" system-icon"),style:$(`width: ${e.size||e.width}px; height: ${e.size||e.height}px`)},[f(s.$slots,"default")],6))}});const c=S.create({baseURL:"http://127.0.0.1:3000/api/v1",timeout:2e3,withCredentials:!0});c.interceptors.request.use(e=>e);c.interceptors.response.use(e=>Promise.resolve(e),e=>Promise.reject(e));const w=["get","post","delete","patch","put"],i=e=>Promise.resolve(null);w.forEach(e=>{i[e]=(s,r,v)=>i({method:e,url:s,data:r,...v})});const _=["\u65E5","\u4E00","\u4E8C","\u4E09","\u56DB","\u4E94","\u516D"],d=()=>l(new Date),t=e=>e<10?"0"+e:String(e),m=e=>`\u661F\u671F${_[e]}`,P=(e,s,r="day")=>l(e).diff(s,r),R=(e=l())=>`${e.year()}-${t(e.month()+1)}-${t(e.date())}`,h=[];setInterval(()=>{h.forEach(e=>e())},24*60*60*1e3);const U=e=>{h.push(e)},a=d(),z=x({hour:t(a.hour()),minute:t(a.minute()),second:t(a.second()),year:String(a.year()),month:t(a.month()+1),date:t(a.date()),day:m(a.day()),lunar:"\u4E00\u6708\u521D\u4E00"}),{hour:F,minute:N,month:n,date:u,day:T,year:o,second:C,lunar:k}=D(z);setInterval(()=>{const e=d();F.value=t(e.hour()),N.value=t(e.minute()),o.value=String(e.year()),n.value=t(e.month()+1),u.value=t(e.date()),T.value=m(e.day()),C.value=t(e.second()),k.value=b.getLunar(o.value,n.value,u.value).dateStr},1e3);const j=e=>t(e.date())===u.value&&t(e.month()+1)===n.value&&String(e.year())===o.value,I=`${o.value}-${n.value}-${u.value}`;export{B as _,n as a,T as b,C as c,u as d,P as e,R as g,F as h,j as i,k as l,N as m,t as p,i as r,U as s,I as t,o as y};