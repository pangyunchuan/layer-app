var P=Object.defineProperty;var I=Object.getOwnPropertySymbols;var O=Object.prototype.hasOwnProperty,b=Object.prototype.propertyIsEnumerable;var C=(n,a,o)=>a in n?P(n,a,{enumerable:!0,configurable:!0,writable:!0,value:o}):n[a]=o,l=(n,a)=>{for(var o in a||(a={}))O.call(a,o)&&C(n,o,a[o]);if(I)for(var o of I(a))b.call(a,o)&&C(n,o,a[o]);return n};var i=(n,a,o)=>(C(n,typeof a!="symbol"?a+"":a,o),o);(function(n,a){typeof exports=="object"&&typeof module!="undefined"?a(exports,require("lodash-es"),require("axios"),require("vue")):typeof define=="function"&&define.amd?define(["exports","lodash-es","axios","vue"],a):(n=typeof globalThis!="undefined"?globalThis:n||self,a(n.MyLib={},n["lodash-es"],n.axios,n.vue))})(this,function(n,a,o,w){"use strict";function B(u){return u&&typeof u=="object"&&"default"in u?u:{default:u}}var y=B(o);class F{constructor(){i(this,"isProxyData",!1)}proxyData(){return this.isProxyData?this:(this.isProxyData=!0,new Proxy(this,{get(t,e){if(e in t)return t[e];if(t.data)return t.data[e]},set(t,e,s){return e in t?(t[e]=s,!0):t.data&&e in t.data?(t.data[e]=s,!0):(t[e]=s,!0)},has(t,e){return e in t||t.data&&e in t.data}}))}}let M={};function N(){return M}function R(u){M=u}let D={};function S(){return D}function k(u){D=u}let d={use:!0};function x(u){d=l(l({},d),u)}class p extends F{constructor(){super(...arguments);i(this,"useLoading",d.use);i(this,"_req")}static newReq(t="default"){const e=N(),s=new e[t];if(!s)throw new Error(`${t} \u8BF7\u6C42\u7C7B \u4E0D\u5B58\u5728`);return s}newReq(t="default"){return p.newReq(t)}get req(){if(!this._req)throw new Error(" \u8BF7\u6C42\u7C7B \u672A\u8BBE\u7F6E");return this._req}static setReq(t){return new this().setReq(t)}setReq(t){return this._req=t.setUseLoading(this.useLoading),this}async reqOne(t){return this.req.request().then(e=>this.newFromReq(e,t))}async reqOneOther(t,e){return this.req.request().then(s=>{const r=s[t],q=this.newFromReq(r,e);return l({model:q},a.omit(s,t))})}async reqMany(t){return this.req.request().then(e=>{let s=[];for(const r of e)s.push(this.newFromReq(e,t));return s})}async reqManyOther(t,e){return this.req.request().then(s=>{const r=s[t];let q=[];for(const H of r)q.push(this.newFromReq(H,e));return l({models:q},a.omit(s,t))})}newFromReq(t,e){if(!t)throw new Error(`\u6A21\u578B\u6570\u636E\u6709\u8BEF:${t}`);const s=new this.constructor(t).proxyData();return s.data=t,e&&e(s),s}}const m=class{constructor(){i(this,"config",{});i(this,"response");i(this,"error")}setCancel(){let{config:t}=this;if(t.cancelMark==="")return;let e;t.cancelMark=e=t.cancelMark||"default";let{cancelMapByMark:s}=m,r=s[e]=s[e]||y.default.CancelToken.source();t.cancelToken=r.token}static cancelByMark(t){let{cancelMapByMark:e}=m;!e[t]||(e[t].cancel(),delete e[t])}async request(t={}){return this.config=l(l({},this.config),t),this.requestHandle(),this.setCancel(),y.default.request(this.config).then(e=>(this.response=e,this.responseHandle())).catch(e=>{throw this.error=e,this.errorHandle()})}set(t,e){return this.config[t]=e,this}setConfig(t){return this.config=l(l({},this.config),t),this}setNoData(t,e={},s={}){return this.set("url",t).set("params",e).setConfig(s)}setHasData(t,e={},s={},r={}){return this.set("url",t).set("data",e).set("params",s).setConfig(r)}setGet(t,e={},s={}){return this.set("method","get").setNoData(t,e,s)}setDelete(t,e={},s={}){return this.set("method","delete").setNoData(t,e,s)}setHead(t,e={},s={}){return this.set("method","head").setNoData(t,e,s)}setOptions(t,e={},s={}){return this.set("method","options").setNoData(t,e,s)}setPost(t,e={},s={},r={}){return this.set("method","post").setHasData(t,e,s,r)}setPut(t,e={},s={},r={}){return this.set("method","put").setHasData(t,e,s,r)}setPatch(t,e={},s={},r={}){return this.set("method","patch").setHasData(t,e,s,r)}};let f=m;i(f,"cancelMapByMark",{});class T extends f{constructor(){super(...arguments);i(this,"useLoading",d.use);i(this,"loading")}setUseLoading(t=d.use){return this.useLoading=t,this}setLoading(t={},e="default"){const s=S();return this.loading=new s[e](t),this}getLoading(){return!this.loading&&this.useLoading&&this.setLoading(),this.loading}async request(t={}){let e=this.getLoading();return e==null||e.startLoading(),super.request(t).then(s=>(e==null||e.endLoading(),s)).catch(s=>{throw e==null||e.endLoading(),s})}}const c=class{constructor(t={}){i(this,"needWaitLoading",!0);i(this,"reqIngNum",0);i(this,"reqCount",0);i(this,"fullLoadingSingleInst");i(this,"loadingInst");i(this,"_options",{});i(this,"options",{});i(this,"_waitLoading");i(this,"_waitClose");const e=c.defaultConfigByClassName[this.classname]||{};return this.options=l(l(l({},this.options),e),t),this}get isFull(){return this.getIsFull()}get classname(){return this.constructor.name}static setDefaultConfig(t){c.defaultConfigByClassName[this.name]=t}get fullInst(){const t=this.constructor.name;return c._firstFullInstMapByClassName[t]||(c._firstFullInstMapByClassName[t]=this),c._firstFullInstMapByClassName[t]}startLoading(){if(!this.isFull){this.loadingInst=this.buildLoading();return}this.fullStart()}endLoading(){if(!this.isFull){this.closeLoading(this.loadingInst);return}this.fullClose()}fullStart(){const t=this.fullInst;t.reqIngNum++,t.reqCount++,t.needWaitLoading&&(t.waitLoading(),t.needWaitLoading=!1),this.upText(this.getText()),t.waitClose.cancel()}get waitLoading(){const t=this.fullInst;return t._waitLoading||(t._waitLoading=a.debounce(()=>{t.fullLoadingSingleInst=this.buildLoading()},1e3)),t._waitLoading}get waitClose(){const t=this.fullInst;return t._waitClose||(t._waitClose=a.debounce(()=>{t.reqIngNum=0,t.reqCount=0,t.needWaitLoading=!0,this.closeLoading(t.fullLoadingSingleInst)},800)),t._waitClose}fullClose(){const t=this.fullInst;t.reqIngNum--,this.upText(this.getText()),t.reqIngNum<=0&&(t.waitLoading.cancel(),t.waitClose())}getText(t="\u52A0\u8F7D\u4E2D"){let{reqCount:e,reqIngNum:s}=this.fullInst;if(e>1){let r=1-s/e;r=(r*100).toFixed(0),t=`\u5DF2\u52A0\u8F7D ${r}%`}return t}};let g=c;i(g,"defaultConfigByClassName",{}),i(g,"_firstFullInstMapByClassName",{});const h=class{constructor(){i(this,"key","default");i(this,"isSetDestroy",!1)}static findOrCreate(t="default"){var s,r;h.map[this.name]=(s=h.map[this.name])!=null?s:{},h.map[this.name][t]=(r=h.map[this.name][t])!=null?r:w.ref(new this);const e=h.map[this.name][t].value;return e.key=t,h.map[this.name][t]}reset(){const t=new this.constructor;t.key=this.key,t.isSetDestroy=this.isSetDestroy,h.map[this.constructor.name][this.key].value=t}setDestroy(){if(this.isSetDestroy)return;this.isSetDestroy=!0;const t=this.key,e=this.constructor.name;w.onBeforeUnmount(()=>{delete h.map[e][t]})}};let L=h;i(L,"map",{}),n.BaseLoading=g,n.BaseRequest=f,n.LoadingRequest=T,n.RequestModel=p,n.Vue3Controller=L,n.setLoadingConfig=x,n.setLoadingMap=k,n.setRequestMap=R,Object.defineProperty(n,"__esModule",{value:!0}),n[Symbol.toStringTag]="Module"});
