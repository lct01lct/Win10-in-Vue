var K=Object.defineProperty;var j=(s,e,o)=>e in s?K(s,e,{enumerable:!0,configurable:!0,writable:!0,value:o}):s[e]=o;var p=(s,e,o)=>(j(s,typeof e!="symbol"?e+"":e,o),o);import{R as V,_ as g,S as M}from"./index.vue_vue_type_style_index_0_lang-3aac06d8.js";import{u as k,r as Q,_ as E,h as Z,m as O,a as N,d as G,b as T}from"./index-242fb8bc.js";import{t as X,g as m,j as z,y as J,d as L,a as r,m as i,q as n,B as d,C as u,u as t,s as c,w as R,x as H,o as W,r as Y,v as _,D as $,E as q,F as P,c as D}from"./vendor-632b05af.js";const ee=""+new URL("wifi-fe345c04.png",import.meta.url).href,se="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAYAAACOEfKtAAAACXBIWXMAAAsSAAALEgHS3X78AAAD9UlEQVR4nO2di3HbMAyGQV0HcCdoR/AGcSeoR/AI6QTNCp3A7QTJBk4msDdIPIG8AXrKwa2iABQoUSQU8bvzXXzRA/oFEqQE0A4ygohfAWBNny8A0Hxf0XeOEwBcAOAFAM70/eSce8l1FUkFRMRGnC0A3ADAhgSLQSPgIwA8AcCDc+6S8romBxF3iHiP6WjOtZ27aCtEvEPEOqFwXZ7JhpUBSXQYEa5LPZWQUftARLwFgJ8UCLSc6HOmfgwoMFw6x24Hlw0FnbUn4HA0x/zhnPsd87pHg4hrRDwEeMOe+sXRHkEev6Vjar3+QCOA/DReF2D0LsHN3ClvZk0tJg905zWRtfGMkGYWS8g1nVtjX9og07g/Ih4VHrdJahhvq6Z7OSYTkQzy9TV1iqYaCvWTfXZ7Wwq3U5AZCvHuLY+5FN2OV8RRAirEy9chB9IT+EQRBwtIfZ4kXj3HaVNPk665ljRIQHJ7KWD09huW6WlV7wLLUAGlPmPW4l3pEXHf2TZMQE9f8SHEu9Ij4q61nV5AOqjEvB8VMVCfKDnL67QvVEBp8DmbaBsKPbHhOECIgJ6me2/4+qPgcZydSkCKulx/wIb2yMbr7vC0NkjX/6wVUHLjFE9SsgsI/5/oqOjuKKl/SGS4CQHB35Rl+zzel+SpijEBN0ME5Nr5XjxLfKPNCAhKL/zU2ngnvKf9ldbsaYl9U6rW39+Z/z86504Zr9c8rwK2Mga6/Fm6QH1cPZAT72Lu9Z9BrgLeMKY9LFoZJdcgwg1TnsxZGwHnXNyEKnrazJH83Ya1YYyGSkiNeJdaUeARBSx66agoSafL2bjdZqiE2cejUXvNUQWmohU6OCHSfc4RRDhbog87IsMKmMvoOQpYKbYpFAGnw7yA5l/gW5nGeWwxnQVRCbOOXAZzkb+5mQerIlaC0bn4NjcRK6oz65Ilt5leH8xKxEqY93Lz4yTMTkQhK+lowC5fypmdwGLpgSpj22xE5F6omyhVsCBiq5RsyzqWUNGTLCOhj9wiMmnOxzfpLkI2Uj2lUaHkEpESrji2mo1MVRzlEFHtXEI2fpK0thBSiyiUeLzv3jxJheZG/6lE9KS48Un2glFmgkkbhYijC6qF9LZn3w5ZEyxD8Yg4+qZ7vE+uUsid4jsERsQoLUbwvv5E+5xJ5kNpiRhLPCke3Gl2zlbmMIZYi0j0lDnorr8U2kRogaXU6w3hMaAUG/5j+JColLsOaLrMwUvB9cgTlJL/CCcqi05EOOHilz2JceJFL7wTy4jFLv0U05iy+FgEwxa//F0sQ8sCjGNZ8hKgZRFaayxtGeTJaAnJrreSiPktxM3xkZeCLz9GMJLycxhjAIC/KgJsVeivKMYAAAAASUVORK5CYII=",{username:I,password:S}=X(k()),y=m(!1),w=m(!0),U=z({username:I.value,password:"123456789"}),v=async()=>{await te()?Q.push({name:"Home"}):(y.value=!0,w.value=!1)},te=async()=>{var e;const s=await V({username:"admin",password:S.value});if(s){const{status:o}=s;if(o==="failed")return!1;const a=k();return a.setUser((e=s.data)==null?void 0:e.user),a.setToken(s.token??""),!0}else if(S.value==="123456789")return!0;return!1},x=()=>{w.value=!0,J(()=>{document.getElementsByClassName("login-ipt")[0].focus()})},h=m(!1),A=()=>{h.value=!0},oe=()=>{const s=[];let e=0;const o=a=>{s.push(a)};return document.addEventListener("keydown",a=>{if(a.keyCode===13){const l=s.length;s[e++%l]()}}),{addEnterListener:o}},C=s=>(R("data-v-b98702c9"),s=s(),H(),s),ne={class:"options-wrapper"},ae={class:"options-btn wifi-btn"},re=C(()=>n("img",{src:ee,alt:""},null,-1)),ie={key:0,class:"options-btn easy-use-btn"},le=C(()=>n("img",{src:se,alt:""},null,-1)),ce=C(()=>n("img",{src:M,alt:""},null,-1)),de=L({__name:"options",setup(s){const e=()=>{location.reload()};return(o,a)=>(r(),i("div",ne,[n("div",ae,[d(g,null,{default:u(()=>[re]),_:1})]),t(h)?(r(),i("div",ie,[d(g,null,{default:u(()=>[le]),_:1})])):c("",!0),n("div",{class:"options-btn shutdown-btn",onClick:e},[d(g,null,{default:u(()=>[ce]),_:1})])]))}});const B=E(de,[["__scopeId","data-v-b98702c9"]]),_e=""+new URL("user_avatar_default-98817a57.png",import.meta.url).href,pe=""+new URL("right-arrow-a30094ac.svg",import.meta.url).href,b=s=>(R("data-v-0e7f8579"),s=s(),H(),s),ue={class:"login-wrapper"},he={class:"avatar-wrapper"},me=b(()=>n("img",{src:_e,alt:"",class:"avatar-img"},null,-1)),ge={class:"username"},we={key:0,class:"password-ipt"},fe=b(()=>n("img",{src:pe,alt:""},null,-1)),ve={key:1,class:"error-tip"},Ae={key:0},ye={key:1},ke={key:2,class:"passwordIsErrorTip"},Ee=b(()=>n("span",null,"密码不正确，请再试一次",-1)),Le=L({__name:"login-form",setup(s){const{addEnterListener:e}=oe();e(v),e(x);const o=m(null);return W(()=>{o.value.focus()}),k(),(a,l)=>{const F=Y("WinBtn");return r(),i("div",ue,[d(B,{class:"options-wrapper"}),n("div",he,[me,n("span",ge,_(t(I)),1)]),t(w)?(r(),i("div",we,[$(n("input",{type:"password",placeholder:"密码",class:"login-ipt","onUpdate:modelValue":l[0]||(l[0]=f=>t(U).password=f),ref_key:"passwordIptRef",ref:o},null,512),[[q,t(U).password]]),n("button",{class:"login-btn",onClick:l[1]||(l[1]=(...f)=>t(v)&&t(v)(...f))},[d(g,null,{default:u(()=>[fe]),_:1})])])):c("",!0),t(w)?(r(),i("div",ve,[t(y)?(r(),i("span",Ae,"密码提示：无")):c("",!0),t(y)?(r(),i("span",ye,"重置密码")):c("",!0)])):(r(),i("div",ke,[Ee,d(F,{class:"check-btn",onClick:t(x),bgColor:"#99977e",borderStyle:"2px solid #e6e6e6",height:34,width:180},{default:u(()=>[P(" 确认 ")]),_:1},8,["onClick"])]))])}}});const Ce=E(Le,[["__scopeId","data-v-0e7f8579"]]);class be{constructor(){p(this,"thenCbs",[]);p(this,"res",Promise.resolve(0));p(this,"cb",()=>{});p(this,"docKeydownHandler");this.docKeydownHandler=e=>{e.keyCode===13&&this.cb()},document.addEventListener("keydown",this.docKeydownHandler)}addEnterListener(e){return this.thenCbs.push(()=>new Promise(o=>{this.cb=()=>{e(),o(0)}})),this}addLastEnterListener(e){return this.addEnterListener(()=>{e(),document.removeEventListener("keydown",this.docKeydownHandler)}),this}notify(){for(let e=0;e<this.thenCbs.length;e++)this.res=this.res.then(this.thenCbs[e]);return this}}const Se=""+new URL("login-bg-370ea698.jpg",import.meta.url).href,Ue={key:0,class:"login-page-load"},xe=["src"],Re={key:1,class:"clock-wrapper"},He={class:"minute-second"},Ie={class:"date"},Be={key:0,class:"mask"},Fe=L({__name:"index",setup(s){new be().addLastEnterListener(A).notify();const e=m(!1);return(o,a)=>(r(),i("div",null,[n("section",{class:"login-wallpaper-wrapper",onClick:a[1]||(a[1]=(...l)=>t(A)&&t(A)(...l))},[t(e)?c("",!0):(r(),i("h1",Ue,"loading...")),n("img",{src:t(Se),alt:"",id:"login-wallpaper",onLoad:a[0]||(a[0]=l=>e.value=!0)},null,40,xe),t(h)?c("",!0):(r(),i("div",Re,[n("div",He,_(t(Z))+" : "+_(t(O)),1),n("div",Ie,_(t(N))+"月"+_(t(G))+"日，"+_(t(T)),1)])),t(h)?c("",!0):(r(),D(B,{key:2}))]),t(h)?(r(),i("section",Be,[d(Ce)])):c("",!0)]))}});const Qe=E(Fe,[["__scopeId","data-v-45d20f8d"]]);export{Qe as default};
