import{d as m,o as v,f as y,g as h,D as g,n as f,E as o,l as p,v as E,F as _}from"./vendor.02ed9579.js";const N=m({__name:"index",props:{className:{type:String,default:"icon"},width:{type:Number,default:25},height:{type:Number,default:25}},setup(e){return(u,l)=>(v(),y("div",{alt:"",class:g(e.className+" system-icon"),style:f(`width: ${e.width}px; height: ${e.height}px`)},[h(u.$slots,"default")],6))}});const $=["\u65E5","\u4E00","\u4E8C","\u4E09","\u56DB","\u4E94","\u516D"],d=()=>o(new Date),a=e=>e<10?"0"+e:String(e),c=e=>`\u661F\u671F${$[e]}`,k=(e,u,l="day")=>o(e).diff(u,l),B=(e=o())=>`${e.year()}-${a(e.month()+1)}-${a(e.date())}`,i=[];setInterval(()=>{i.forEach(e=>e())},24*60*60*1e3);const C=e=>{i.push(e)},t=d(),S=p({hour:a(t.hour()),minute:a(t.minute()),second:a(t.second()),year:String(t.year()),month:a(t.month()+1),date:a(t.date()),day:c(t.day()),lunar:"\u4E00\u6708\u521D\u4E00"}),{hour:D,minute:w,month:s,date:n,day:x,year:r,second:b,lunar:F}=E(S);setInterval(()=>{const e=d();D.value=a(e.hour()),w.value=a(e.minute()),r.value=String(e.year()),s.value=a(e.month()+1),n.value=a(e.date()),x.value=c(e.day()),b.value=a(e.second()),F.value=_.getLunar(r.value,s.value,n.value).dateStr},1e3);const z=e=>a(e.date())===n.value&&a(e.month()+1)===s.value&&String(e.year())===r.value,I=`${r.value}-${s.value}-${n.value}`;export{N as _,s as a,x as b,b as c,n as d,k as e,B as g,D as h,z as i,F as l,w as m,a as p,C as s,I as t,r as y};
