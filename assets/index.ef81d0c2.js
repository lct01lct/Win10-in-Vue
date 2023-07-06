import{d as g,a as v,i as p,j as y,D as w,n as f,E,F as i,x as B,v as C,G as D}from"./vendor.f3bb6034.js";import{u as P,r as R}from"./index.1a154921.js";const z="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAQAAAAkGDomAAACvklEQVRo3u2aS5mEMAyAkYAEJKwEJCChEioBCUhAAhIqYSWMBBxkD/sYCmmbV8seaG7zAfM3TdM0SQedmczwO2a7r3YP4AP4AD6AD+ADeBPgAAMZ8PpsZUAHGwCsZMAVADZwbQAdvH4wdjLg/vP7iw8phfseEwlwit5hQnJsLsB5rCTA9fJeoNskFc//LdN77OBJgDPhXRVgj+rAsdyMQ/XfWwD28HmBG0V+cLxAfpYRS3gfp+XZMyZOcdTu8r0PDeAZb8vOmHaS9LBxEPOLG+N5s6POnxB7CWBse/vJ52nP4imafMYW05/YOJYiCBZi89m4gJ6Nx49mYkTPARyiV6dq4dYUqWGgAwbG1tDFgz7yr0RAR7ENs4D1aOuOBviiOQAjwKMze1EAXX5GFUL+7D/m9Bea3UlCWoe52YzNAMe0DtNz4epPd6tL/u/Z/0ntTwt4XLkhDegP+7f1vXjHPW/KJy3NARfc98YPyTeIHvC4URKAiUeapT5Q9eAWGG4BDJgV4lYw3wI4YzsAn8Ek+gOtTNgK4oDjLYBjCfA9+lsAe2yT4oDdTfIAPoBoPNFMhhLgv3czQRELWogrAS416hyWR502WNBKMVgYb97HxXCrE+RjaoQKUCvk18lKCfl1lyadkC5NumunjYvJXjt1F3ebHRzqpT4szpBi6kOTPLLQXzF5pEm/WdgfIf0mT2BKA31mAlOeApaJIAUsTaJLRJREl5YhdMcbqwwhK+RwRVHIkZXCNHjsUpikmMhbXHUxkV+OlW0NcTmWX9Cm+j2zgja3JYB2api2BPCaKsohQYWmCmxRUm0pec1d21I2m7aUXGPPStjbE6y1G3vSrVG/2pzBwXg4CQYYwcGcecO8NQpvLpOMas1lFpDV2/NyJl8aoVWD49vOPLK7sbGBb90iGns3DwuEk04DBFjA6y9eX61IUuIMdVTmAAAAAElFTkSuQmCC",G=g({__name:"index",props:{className:{type:String,default:"icon"},width:{type:Number,default:25},height:{type:Number,default:25},size:{type:Number}},setup(e){return(a,s)=>(v(),p("div",{alt:"",class:w(e.className+" system-icon"),style:f(`width: ${e.size||e.width}px; height: ${e.size||e.height}px`)},[y(a.$slots,"default")],6))}});const c=E.create({baseURL:"http://127.0.0.1:3000/api/v1",timeout:2e3,withCredentials:!0});c.interceptors.request.use(e=>e);c.interceptors.response.use(e=>Promise.resolve(e),e=>{const a=e.response.status,s=P();switch(a){case 401:case 403:R.push("/"),s.user=null,s.setToken("Invalid token");break}return Promise.reject(e)});const S=["get","post","delete","patch","put"],n=e=>Promise.resolve(null);S.forEach(e=>{n[e]=(a,s,h)=>n({method:e,url:a,data:s,...h})});const O=async e=>await n.post("/auth/login",e),x=async()=>await n.get("/auth/logout"),J=async()=>await n.get("/users/me"),T=["\u65E5","\u4E00","\u4E8C","\u4E09","\u56DB","\u4E94","\u516D"],A=()=>i(new Date),t=e=>e<10?"0"+e:String(e),d=e=>`\u661F\u671F${T[e]}`,Q=(e,a,s="day")=>i(e).diff(a,s),W=(e=i())=>`${e.year()}-${t(e.month()+1)}-${t(e.date())}`,m=[];setInterval(()=>{m.forEach(e=>e())},24*60*60*1e3);const X=e=>{m.push(e)},r=A(),k=B({hour:t(r.hour()),minute:t(r.minute()),second:t(r.second()),year:String(r.year()),month:t(r.month()+1),date:t(r.date()),day:d(r.day()),lunar:"\u4E00\u6708\u521D\u4E00"}),{hour:N,minute:Y,month:o,date:u,day:b,year:l,second:U,lunar:L}=C(k);setInterval(()=>{const e=A();N.value=t(e.hour()),Y.value=t(e.minute()),l.value=String(e.year()),o.value=t(e.month()+1),u.value=t(e.date()),b.value=d(e.day()),U.value=t(e.second()),L.value=D.getLunar(l.value,o.value,u.value).dateStr},1e3);const F=e=>t(e.date())===u.value&&t(e.month()+1)===o.value&&String(e.year())===l.value,V=`${l.value}-${o.value}-${u.value}`;export{O as R,z as S,G as _,o as a,b,x as c,u as d,U as e,Q as f,W as g,N as h,F as i,J as j,L as l,Y as m,t as p,X as s,V as t,l as y};
