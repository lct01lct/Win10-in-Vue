import{d as f,a as w,g as E,h as C,C as B,n as D,D as k,i as l,E as T,F as d,v as S,s as U,G as P}from"./vendor.71caa00a.js";import{r as R}from"./index.aecbba1f.js";const K="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAQAAAAkGDomAAACvklEQVRo3u2aS5mEMAyAkYAEJKwEJCChEioBCUhAAhIqYSWMBBxkD/sYCmmbV8seaG7zAfM3TdM0SQedmczwO2a7r3YP4AP4AD6AD+ADeBPgAAMZ8PpsZUAHGwCsZMAVADZwbQAdvH4wdjLg/vP7iw8phfseEwlwit5hQnJsLsB5rCTA9fJeoNskFc//LdN77OBJgDPhXRVgj+rAsdyMQ/XfWwD28HmBG0V+cLxAfpYRS3gfp+XZMyZOcdTu8r0PDeAZb8vOmHaS9LBxEPOLG+N5s6POnxB7CWBse/vJ52nP4imafMYW05/YOJYiCBZi89m4gJ6Nx49mYkTPARyiV6dq4dYUqWGgAwbG1tDFgz7yr0RAR7ENs4D1aOuOBviiOQAjwKMze1EAXX5GFUL+7D/m9Bea3UlCWoe52YzNAMe0DtNz4epPd6tL/u/Z/0ntTwt4XLkhDegP+7f1vXjHPW/KJy3NARfc98YPyTeIHvC4URKAiUeapT5Q9eAWGG4BDJgV4lYw3wI4YzsAn8Ek+gOtTNgK4oDjLYBjCfA9+lsAe2yT4oDdTfIAPoBoPNFMhhLgv3czQRELWogrAS416hyWR502WNBKMVgYb97HxXCrE+RjaoQKUCvk18lKCfl1lyadkC5NumunjYvJXjt1F3ebHRzqpT4szpBi6kOTPLLQXzF5pEm/WdgfIf0mT2BKA31mAlOeApaJIAUsTaJLRJREl5YhdMcbqwwhK+RwRVHIkZXCNHjsUpikmMhbXHUxkV+OlW0NcTmWX9Cm+j2zgja3JYB2api2BPCaKsohQYWmCmxRUm0pec1d21I2m7aUXGPPStjbE6y1G3vSrVG/2pzBwXg4CQYYwcGcecO8NQpvLpOMas1lFpDV2/NyJl8aoVWD49vOPLK7sbGBb90iGns3DwuEk04DBFjA6y9eX61IUuIMdVTmAAAAAElFTkSuQmCC",V=f({__name:"index",props:{className:{type:String,default:"icon"},width:{type:Number,default:25},height:{type:Number,default:25},size:{type:Number}},setup(e){return(a,s)=>(w(),E("div",{alt:"",class:B(e.className+" system-icon"),style:D(`width: ${e.size||e.width}px; height: ${e.size||e.height}px`)},[C(a.$slots,"default")],6))}});var g=(e=>(e.Admin="admin",e.User="user",e))(g||{});const N=""+new URL("user.98817a57.png",import.meta.url).href,A="token",Y=k("user",()=>{const e=l("user"),a=l("123456789"),s=l(null),n=l("");return{username:e,password:a,user:s,token:n,setToken:u=>{n.value=u,localStorage.setItem(A,u)},getToken:()=>n.value||localStorage.getItem(A),setUser:u=>{s.value=u||b}}}),b={_id:String(Math.random()),username:"user",avatar:N,email:"user@qq.com",role:g.User},h=T.create({baseURL:"http://127.0.0.1:3000/api/v1",timeout:2e3,withCredentials:!0});h.interceptors.request.use(e=>e);h.interceptors.response.use(e=>Promise.resolve(e),e=>{const a=e.response.status,s=Y();switch(a){case 401:case 403:R.push("/"),s.user=null,s.setToken("Invalid token");break}return Promise.reject(e)});const L=["get","post","delete","patch","put"],o=e=>Promise.resolve(null);L.forEach(e=>{o[e]=(a,s,n)=>o({method:e,url:a,data:s,...n})});const _=async e=>await o.post("/auth/login",e),H=async()=>await o.get("/auth/logout"),Z=async()=>await o.get("/users/me"),M=["\u65E5","\u4E00","\u4E8C","\u4E09","\u56DB","\u4E94","\u516D"],v=()=>d(new Date),t=e=>e<10?"0"+e:String(e),p=e=>`\u661F\u671F${M[e]}`,q=(e,a,s="day")=>d(e).diff(a,s),$=(e=d())=>`${e.year()}-${t(e.month()+1)}-${t(e.date())}`,y=[];setInterval(()=>{y.forEach(e=>e())},24*60*60*1e3);const ee=e=>{y.push(e)},r=v(),O=S({hour:t(r.hour()),minute:t(r.minute()),second:t(r.second()),year:String(r.year()),month:t(r.month()+1),date:t(r.date()),day:p(r.day()),lunar:"\u4E00\u6708\u521D\u4E00"}),{hour:z,minute:G,month:c,date:i,day:j,year:m,second:I,lunar:J}=U(O);setInterval(()=>{const e=v();z.value=t(e.hour()),G.value=t(e.minute()),m.value=String(e.year()),c.value=t(e.month()+1),i.value=t(e.date()),j.value=p(e.day()),I.value=t(e.second()),J.value=P.getLunar(m.value,c.value,i.value).dateStr},1e3);const te=e=>t(e.date())===i.value&&t(e.month()+1)===c.value&&String(e.year())===m.value,se=`${m.value}-${c.value}-${i.value}`;export{_ as R,K as S,V as _,N as a,c as b,j as c,i as d,H as e,I as f,$ as g,z as h,te as i,q as j,Z as k,J as l,G as m,t as p,ee as s,se as t,Y as u,m as y};
