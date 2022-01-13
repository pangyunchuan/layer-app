var N=Object.defineProperty,x=Object.defineProperties;var D=Object.getOwnPropertyDescriptors;var M=Object.getOwnPropertySymbols;var _=Object.prototype.hasOwnProperty,R=Object.prototype.propertyIsEnumerable;var L=(s,i,a)=>i in s?N(s,i,{enumerable:!0,configurable:!0,writable:!0,value:a}):s[i]=a,u=(s,i)=>{for(var a in i||(i={}))_.call(i,a)&&L(s,a,i[a]);if(M)for(var a of M(i))R.call(i,a)&&L(s,a,i[a]);return s},h=(s,i)=>x(s,D(i));var r=(s,i,a)=>(L(s,typeof i!="symbol"?i+"":i,a),a);(function(s,i){typeof exports=="object"&&typeof module!="undefined"?i(exports,require("root/modelConfig/modelConfig"),require("axios"),require("lodash-es")):typeof define=="function"&&define.amd?define(["exports","root/modelConfig/modelConfig","axios","lodash-es"],i):(s=typeof globalThis!="undefined"?globalThis:s||self,i(s.MyLib={},s["root/modelConfig/modelConfig"],s.axios,s["lodash-es"]))})(this,function(s,i,a,c){"use strict";function p(l){return l&&typeof l=="object"&&"default"in l?l:{default:l}}var w=p(a);class I{constructor(){r(this,"_dataType",{})}proxyData(){return new Proxy(this,{get(e,t){if(t in e)return e[t];if(e.data)return e.data[t]},set(e,t,n){return t in e?(e[t]=n,!0):(e.data&&t in e.data&&(e.data[t]=n),!0)},has(e,t){return t in e||e.data&&t in e.data}})}}class y extends I{constructor(){super(...arguments);r(this,"defaultUseLoading",!0)}static newReq(e="default"){return new this().newReq(e)}newReq(e="default"){const t=new i.requestClassConfig[e];if(!t)throw new Error(`${e} \u8BF7\u6C42\u7C7B \u4E0D\u5B58\u5728`);return t.setModel(this).setUseLoading(this.defaultUseLoading)}newFromReq(e,t,n){const o=new e;return o.data=t,n&&n(o),o.proxyData()}}const m=class{constructor(){r(this,"config",{});r(this,"response");r(this,"error")}setCancel(){let{config:e}=this;if(e.cancelMark==="")return;let t;e.cancelMark=t=e.cancelMark||"default";let{cancelMapByMark:n}=m,o=n[t]=n[t]||w.default.CancelToken.source();e.cancelToken=o.token}static cancelByMark(e){let{cancelMapByMark:t}=m;!t[e]||(t[e].cancel(),delete t[e])}request(e={}){return this.config=u(u({},this.config),e),this.requestHandle(),this.setCancel(),w.default.request(this.config).then(t=>(this.response=t,this.responseHandle())).catch(t=>{throw this.error=t,this.errorHandle()})}setGet(e,t={},n={}){return this.config=u(h(u({},this.config),{url:e,params:t}),n),this}setPost(e,t={},n={},o={}){return this.config=u(h(u({},this.config),{url:e,data:t,params:n}),o),this}get(e,t={},n={}){return this.request(u({method:"get",url:e,params:t},n))}post(e,t={},n={},o={}){return this.request(u({method:"post",url:e,data:t},o))}};let C=m;r(C,"cancelMapByMark",{});class F extends C{constructor(){super(...arguments);r(this,"isDefaultUseLoading",!0);r(this,"loading");r(this,"model")}setUseLoading(e=!0){return this.isDefaultUseLoading=e,this}setLoading(e={},t="default"){return this.loading=new i.loadingClassConfig[t](e),this}getLoading(){return!this.loading&&this.isDefaultUseLoading&&this.setLoading(),this.loading}setModel(e){return this.model=e,this}getModel(){if(!this.model)throw new Error("\u8BF7\u5148\u8BBE\u7F6E\u6A21\u578B");return this.model}request(e={}){let t=this.getLoading();return t==null||t.startLoading(),super.request(e).then(n=>(t==null||t.endLoading(),n)).catch(n=>{throw t==null||t.endLoading(),n})}reqOne(e,t){return this.request().then(n=>this.getModel().newFromReq(e,n,t))}reqOneOther(e,t,n){return this.request().then(o=>{const f=o[t],q=this.getModel().newFromReq(e,f,n);return h(u({},c.omit(o,t)),{model:q})})}reqMany(e,t){return this.request().then(n=>{let o=[];for(const f of n)o.push(this.getModel().newFromReq(e,f,t));return o})}reqManyOther(e,t,n){return this.request().then(o=>{const f=o[t],q=[];for(const B of f)q.push(this.getModel().newFromReq(e,B,n));return h(u({},c.omit(o,t)),{models:q})})}}const d=class{constructor(e={}){r(this,"needWaitLoading",!0);r(this,"reqIngNum",0);r(this,"reqCount",0);r(this,"fullLoadingSingleInst");r(this,"isFull",!1);r(this,"loadingInst");r(this,"_options",{});r(this,"options",{});r(this,"_waitLoading");r(this,"_waitClose");const t=d.defaultConfigByClassName[this.classname]||{};return this.options=u(u(u({},this.options),t),e),this.isFull=this.getIsFull(),this}get classname(){return this.constructor.name}setDefaultConfig(e){d.defaultConfigByClassName[this.classname]=e}get fullInst(){const e=this.constructor.name;return d._firstFullInstMapByClassName[e]||(d._firstFullInstMapByClassName[e]=this),d._firstFullInstMapByClassName[e]}startLoading(){if(!this.isFull){this.loadingInst=this.buildLoading();return}this.fullStart()}endLoading(){if(!this.isFull){this.closeLoading(this.loadingInst);return}this.fullClose()}fullStart(){const e=this.fullInst;e.reqIngNum++,e.reqCount++,e.needWaitLoading&&(e.waitLoading(),e.needWaitLoading=!1),this.upText(this.getText()),e.waitClose.cancel()}get waitLoading(){const e=this.fullInst;return e._waitLoading||(e._waitLoading=c.debounce(()=>{e.fullLoadingSingleInst=this.buildLoading()},1e3)),e._waitLoading}get waitClose(){const e=this.fullInst;return e._waitClose||(e._waitClose=c.debounce(()=>{e.reqIngNum=0,e.reqCount=0,e.needWaitLoading=!0,this.closeLoading(e.fullLoadingSingleInst)},800)),e._waitClose}fullClose(){const e=this.fullInst;e.reqIngNum--,this.upText(this.getText()),e.reqIngNum<=0&&(e.waitLoading.cancel(),e.waitClose())}getText(e="\u52A0\u8F7D\u4E2D"){let{reqCount:t,reqIngNum:n}=this.fullInst;if(t>1){let o=1-n/t;o=(o*100).toFixed(0),e=`\u5DF2\u52A0\u8F7D ${o}%`}return e}};let g=d;r(g,"defaultConfigByClassName",{}),r(g,"_firstFullInstMapByClassName",{}),s.BaseLoading=g,s.LoadingRequest=F,s.RequestModel=y,Object.defineProperty(s,"__esModule",{value:!0}),s[Symbol.toStringTag]="Module"});
