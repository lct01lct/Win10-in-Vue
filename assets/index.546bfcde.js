var K=Object.defineProperty;var j=(s,e,o)=>e in s?K(s,e,{enumerable:!0,configurable:!0,writable:!0,value:o}):s[e]=o;var _=(s,e,o)=>(j(s,typeof e!="symbol"?e+"":e,o),o);import{R as V,_ as w,S as M,h as Q,m as Z,a as O,d as N,b as z}from"./index.ef81d0c2.js";import{u as F,r as G,_ as y,a as T}from"./index.1a154921.js";import{v as X,g as m,x as D,q as J,d as k,a as r,i,k as n,y as d,z as p,u as t,l as c,p as R,m as U,o as W,r as Y,t as u,A as $,B as q,C as P,c as ee}from"./vendor.f3bb6034.js";const se=""+new URL("wifi.fe345c04.png",import.meta.url).href,te="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAYAAACOEfKtAAAACXBIWXMAAAsSAAALEgHS3X78AAAD9UlEQVR4nO2di3HbMAyGQV0HcCdoR/AGcSeoR/AI6QTNCp3A7QTJBk4msDdIPIG8AXrKwa2iABQoUSQU8bvzXXzRA/oFEqQE0A4ygohfAWBNny8A0Hxf0XeOEwBcAOAFAM70/eSce8l1FUkFRMRGnC0A3ADAhgSLQSPgIwA8AcCDc+6S8romBxF3iHiP6WjOtZ27aCtEvEPEOqFwXZ7JhpUBSXQYEa5LPZWQUftARLwFgJ8UCLSc6HOmfgwoMFw6x24Hlw0FnbUn4HA0x/zhnPsd87pHg4hrRDwEeMOe+sXRHkEev6Vjar3+QCOA/DReF2D0LsHN3ClvZk0tJg905zWRtfGMkGYWS8g1nVtjX9og07g/Ih4VHrdJahhvq6Z7OSYTkQzy9TV1iqYaCvWTfXZ7Wwq3U5AZCvHuLY+5FN2OV8RRAirEy9chB9IT+EQRBwtIfZ4kXj3HaVNPk665ljRIQHJ7KWD09huW6WlV7wLLUAGlPmPW4l3pEXHf2TZMQE9f8SHEu9Ij4q61nV5AOqjEvB8VMVCfKDnL67QvVEBp8DmbaBsKPbHhOECIgJ6me2/4+qPgcZydSkCKulx/wIb2yMbr7vC0NkjX/6wVUHLjFE9SsgsI/5/oqOjuKKl/SGS4CQHB35Rl+zzel+SpijEBN0ME5Nr5XjxLfKPNCAhKL/zU2ngnvKf9ldbsaYl9U6rW39+Z/z86504Zr9c8rwK2Mga6/Fm6QH1cPZAT72Lu9Z9BrgLeMKY9LFoZJdcgwg1TnsxZGwHnXNyEKnrazJH83Ya1YYyGSkiNeJdaUeARBSx66agoSafL2bjdZqiE2cejUXvNUQWmohU6OCHSfc4RRDhbog87IsMKmMvoOQpYKbYpFAGnw7yA5l/gW5nGeWwxnQVRCbOOXAZzkb+5mQerIlaC0bn4NjcRK6oz65Ilt5leH8xKxEqY93Lz4yTMTkQhK+lowC5fypmdwGLpgSpj22xE5F6omyhVsCBiq5RsyzqWUNGTLCOhj9wiMmnOxzfpLkI2Uj2lUaHkEpESrji2mo1MVRzlEFHtXEI2fpK0thBSiyiUeLzv3jxJheZG/6lE9KS48Un2glFmgkkbhYijC6qF9LZn3w5ZEyxD8Yg4+qZ7vE+uUsid4jsERsQoLUbwvv5E+5xJ5kNpiRhLPCke3Gl2zlbmMIZYi0j0lDnorr8U2kRogaXU6w3hMaAUG/5j+JColLsOaLrMwUvB9cgTlJL/CCcqi05EOOHilz2JceJFL7wTy4jFLv0U05iy+FgEwxa//F0sQ8sCjGNZ8hKgZRFaayxtGeTJaAnJrreSiPktxM3xkZeCLz9GMJLycxhjAIC/KgJsVeivKMYAAAAASUVORK5CYII=",{username:H,password:B}=X(F()),C=m(!1),A=m(!0),S=D({username:H.value,password:"123456789"}),v=async()=>{await oe()?G.push({name:"Home"}):(C.value=!0,A.value=!1)},oe=async()=>{var e,o,a;const s=await V({username:"admin",password:B.value});if(s){const{status:l}=s;if(l==="failed")return!1;const g=F();return g.user=(o=(e=s.data)==null?void 0:e.user)!=null?o:null,g.setToken((a=s.token)!=null?a:""),!0}else if(B.value==="123456789")return!0;return!1},x=()=>{A.value=!0,J(()=>{document.getElementsByClassName("login-ipt")[0].focus()})},h=m(!1),E=()=>{h.value=!0},ne=()=>{const s=[];let e=0;const o=a=>{s.push(a)};return document.addEventListener("keydown",a=>{if(a.keyCode===13){const l=s.length;s[e++%l]()}}),{addEnterListener:o}},L=s=>(R("data-v-b98702c9"),s=s(),U(),s),ae={class:"options-wrapper"},re={class:"options-btn wifi-btn"},ie=L(()=>n("img",{src:se,alt:""},null,-1)),le={key:0,class:"options-btn easy-use-btn"},ce=L(()=>n("img",{src:te,alt:""},null,-1)),de=L(()=>n("img",{src:M,alt:""},null,-1)),ue=k({__name:"options",setup(s){const e=()=>{location.reload()};return(o,a)=>(r(),i("div",ae,[n("div",re,[d(w,null,{default:p(()=>[ie]),_:1})]),t(h)?(r(),i("div",le,[d(w,null,{default:p(()=>[ce]),_:1})])):c("",!0),n("div",{class:"options-btn shutdown-btn",onClick:e},[d(w,null,{default:p(()=>[de]),_:1})])]))}});const I=y(ue,[["__scopeId","data-v-b98702c9"]]),_e=""+new URL("right-arrow.a30094ac.svg",import.meta.url).href,b=s=>(R("data-v-85bf9919"),s=s(),U(),s),pe={class:"login-wrapper"},he={class:"avatar-wrapper"},me=b(()=>n("img",{src:T,alt:"",class:"avatar-img"},null,-1)),ge={class:"username"},we={key:0,class:"password-ipt"},Ae=b(()=>n("img",{src:_e,alt:""},null,-1)),fe={key:1,class:"error-tip"},ve={key:0},Ee={key:1},Ce={key:2,class:"passwordIsErrorTip"},ye=b(()=>n("span",null,"\u5BC6\u7801\u4E0D\u6B63\u786E\uFF0C\u8BF7\u518D\u8BD5\u4E00\u6B21",-1)),ke=k({__name:"login-form",setup(s){const{addEnterListener:e}=ne();e(v),e(x);const o=m(null);return W(()=>{o.value.focus()}),(a,l)=>{const g=Y("WinBtn");return r(),i("div",pe,[d(I,{class:"options-wrapper"}),n("div",he,[me,n("span",ge,u(t(H)),1)]),t(A)?(r(),i("div",we,[$(n("input",{type:"password",placeholder:"\u5BC6\u7801",class:"login-ipt","onUpdate:modelValue":l[0]||(l[0]=f=>t(S).password=f),ref_key:"passwordIptRef",ref:o},null,512),[[q,t(S).password]]),n("button",{class:"login-btn",onClick:l[1]||(l[1]=(...f)=>t(v)&&t(v)(...f))},[d(w,null,{default:p(()=>[Ae]),_:1})])])):c("",!0),t(A)?(r(),i("div",fe,[t(C)?(r(),i("span",ve,"\u5BC6\u7801\u63D0\u793A\uFF1A\u65E0")):c("",!0),t(C)?(r(),i("span",Ee,"\u91CD\u7F6E\u5BC6\u7801")):c("",!0)])):(r(),i("div",Ce,[ye,d(g,{class:"check-btn",onClick:t(x),bgColor:"#99977e",borderStyle:"2px solid #e6e6e6",height:34,width:180},{default:p(()=>[P(" \u786E\u8BA4 ")]),_:1},8,["onClick"])]))])}}});const Le=y(ke,[["__scopeId","data-v-85bf9919"]]);class be{constructor(){_(this,"thenCbs",[]);_(this,"res",Promise.resolve(0));_(this,"cb",()=>{});_(this,"docKeydownHandler");this.docKeydownHandler=e=>{e.keyCode===13&&this.cb()},document.addEventListener("keydown",this.docKeydownHandler)}addEnterListener(e){return this.thenCbs.push(()=>new Promise(o=>{this.cb=()=>{e(),o(0)}})),this}addLastEnterListener(e){return this.addEnterListener(()=>{e(),document.removeEventListener("keydown",this.docKeydownHandler)}),this}notify(){for(let e=0;e<this.thenCbs.length;e++)this.res=this.res.then(this.thenCbs[e]);return this}}const Be=""+new URL("login-bg.370ea698.jpg",import.meta.url).href,Se={key:0,class:"login-page-load"},xe=["src"],Fe={key:1,class:"clock-wrapper"},Re={class:"minute-second"},Ue={class:"date"},He={key:0,class:"mask"},Ie=k({__name:"index",setup(s){new be().addLastEnterListener(E).notify();const e=m(!1);return(o,a)=>(r(),i("div",null,[n("section",{class:"login-wallpaper-wrapper",onClick:a[1]||(a[1]=(...l)=>t(E)&&t(E)(...l))},[t(e)?c("",!0):(r(),i("h1",Se,"loading...")),n("img",{src:t(Be),alt:"",id:"login-wallpaper",onLoad:a[0]||(a[0]=l=>e.value=!0)},null,40,xe),t(h)?c("",!0):(r(),i("div",Fe,[n("div",Re,u(t(Q))+" : "+u(t(Z)),1),n("div",Ue,u(t(O))+"\u6708"+u(t(N))+"\u65E5\uFF0C"+u(t(z)),1)])),t(h)?c("",!0):(r(),ee(I,{key:2}))]),t(h)?(r(),i("section",He,[d(Le)])):c("",!0)]))}});const Qe=y(Ie,[["__scopeId","data-v-ae001a1a"]]);export{Qe as default};
