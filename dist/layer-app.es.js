var __defProp = Object.defineProperty;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
import { omit, debounce } from "lodash-es";
import axios from "axios";
import { ref, onBeforeUnmount } from "vue";
class BaseModel {
  constructor() {
    __publicField(this, "isProxyData", false);
  }
  proxyData() {
    if (this.isProxyData) {
      return this;
    }
    this.isProxyData = true;
    return new Proxy(this, {
      get(target, p) {
        if (p in target) {
          return target[p];
        }
        if (target.data) {
          return target.data[p];
        }
        return void 0;
      },
      set(target, p, value) {
        if (p in target) {
          target[p] = value;
          return true;
        }
        if (target.data && p in target.data) {
          target.data[p] = value;
          return true;
        }
        target[p] = value;
        return true;
      },
      has(target, p) {
        return p in target || target.data && p in target.data;
      }
    });
  }
}
let requestMap = {};
function getRequestMap() {
  return requestMap;
}
function setRequestMap(map) {
  requestMap = map;
}
let loadingMap = {};
function getLoadingMap() {
  return loadingMap;
}
function setLoadingMap(map) {
  loadingMap = map;
}
let loadingConfig = {
  use: true
};
function setLoadingConfig(config) {
  loadingConfig = __spreadValues(__spreadValues({}, loadingConfig), config);
}
class RequestModel extends BaseModel {
  constructor() {
    super(...arguments);
    __publicField(this, "useLoading", loadingConfig.use);
    __publicField(this, "_req");
  }
  static newReq(reqType = "default") {
    const reqMap = getRequestMap();
    const reqClass = new reqMap[reqType]();
    if (!reqClass) {
      throw new Error(`${reqType} \u8BF7\u6C42\u7C7B \u4E0D\u5B58\u5728`);
    }
    return reqClass;
  }
  newReq(reqType = "default") {
    return RequestModel.newReq(reqType);
  }
  get req() {
    if (!this._req) {
      throw new Error(` \u8BF7\u6C42\u7C7B \u672A\u8BBE\u7F6E`);
    }
    return this._req;
  }
  static setReq(req) {
    return new this().setReq(req);
  }
  setReq(req) {
    this._req = req.setUseLoading(this.useLoading);
    return this;
  }
  async reqOne(call) {
    return this.req.request().then((res) => {
      return this.newFromReq(res, call);
    });
  }
  async reqOneOther(dataKey, call) {
    return this.req.request().then((res) => {
      const data = res[dataKey];
      const model = this.newFromReq(data, call);
      return __spreadValues({ model }, omit(res, dataKey));
    });
  }
  async reqMany(call) {
    return this.req.request().then((res) => {
      let models = [];
      for (const da of res) {
        models.push(this.newFromReq(res, call));
      }
      return models;
    });
  }
  async reqManyOther(dataKey, call) {
    return this.req.request().then((res) => {
      const dataList = res[dataKey];
      let models = [];
      for (const data of dataList) {
        models.push(this.newFromReq(data, call));
      }
      return __spreadValues({ models }, omit(res, dataKey));
    });
  }
  newFromReq(data, call) {
    if (!data) {
      throw new Error(`\u6A21\u578B\u6570\u636E\u6709\u8BEF:${data}`);
    }
    const model = new this.constructor(data).proxyData();
    model.data = data;
    call && call(model);
    return model;
  }
}
const _BaseRequest = class {
  constructor() {
    __publicField(this, "config", {});
    __publicField(this, "response");
    __publicField(this, "error");
  }
  setCancel() {
    let { config } = this;
    if (config.cancelMark === "") {
      return;
    }
    let mark;
    config.cancelMark = mark = config.cancelMark || "default";
    let { cancelMapByMark: map } = _BaseRequest;
    let cancelSource = map[mark] = map[mark] || axios.CancelToken.source();
    config.cancelToken = cancelSource.token;
  }
  static cancelByMark(mark) {
    let { cancelMapByMark: map } = _BaseRequest;
    if (!map[mark]) {
      return;
    }
    map[mark].cancel();
    delete map[mark];
  }
  async request(config = {}) {
    this.config = __spreadValues(__spreadValues({}, this.config), config);
    this.requestHandle();
    this.setCancel();
    return axios.request(this.config).then((response) => {
      this.response = response;
      return this.responseHandle();
    }).catch((error) => {
      this.error = error;
      throw this.errorHandle();
    });
  }
  set(key, val) {
    this.config[key] = val;
    return this;
  }
  setConfig(config) {
    this.config = __spreadValues(__spreadValues({}, this.config), config);
    return this;
  }
  setNoData(url, params = {}, config = {}) {
    return this.set("url", url).set("params", params).setConfig(config);
  }
  setHasData(url, data = {}, params = {}, config = {}) {
    return this.set("url", url).set("data", data).set("params", params).setConfig(config);
  }
  setGet(url, params = {}, config = {}) {
    return this.set("method", "get").setNoData(url, params, config);
  }
  setDelete(url, params = {}, config = {}) {
    return this.set("method", "delete").setNoData(url, params, config);
  }
  setHead(url, params = {}, config = {}) {
    return this.set("method", "head").setNoData(url, params, config);
  }
  setOptions(url, params = {}, config = {}) {
    return this.set("method", "options").setNoData(url, params, config);
  }
  setPost(url, data = {}, params = {}, config = {}) {
    return this.set("method", "post").setHasData(url, data, params, config);
  }
  setPut(url, data = {}, params = {}, config = {}) {
    return this.set("method", "put").setHasData(url, data, params, config);
  }
  setPatch(url, data = {}, params = {}, config = {}) {
    return this.set("method", "patch").setHasData(url, data, params, config);
  }
};
let BaseRequest = _BaseRequest;
__publicField(BaseRequest, "cancelMapByMark", {});
class LoadingRequest extends BaseRequest {
  constructor() {
    super(...arguments);
    __publicField(this, "useLoading", loadingConfig.use);
    __publicField(this, "loading");
  }
  setUseLoading(use = loadingConfig.use) {
    this.useLoading = use;
    return this;
  }
  setLoading(options = {}, type = "default") {
    const map = getLoadingMap();
    this.loading = new map[type](options);
    return this;
  }
  getLoading() {
    if (!this.loading && this.useLoading) {
      this.setLoading();
    }
    return this.loading;
  }
  async request(config = {}) {
    let loading = this.getLoading();
    loading == null ? void 0 : loading.startLoading();
    return super.request(config).then((r) => {
      loading == null ? void 0 : loading.endLoading();
      return r;
    }).catch((er) => {
      loading == null ? void 0 : loading.endLoading();
      throw er;
    });
  }
}
const _BaseLoading = class {
  constructor(inputConfig = {}) {
    __publicField(this, "needWaitLoading", true);
    __publicField(this, "reqIngNum", 0);
    __publicField(this, "reqCount", 0);
    __publicField(this, "fullLoadingSingleInst");
    __publicField(this, "loadingInst");
    __publicField(this, "_options", {});
    __publicField(this, "options", {});
    __publicField(this, "_waitLoading");
    __publicField(this, "_waitClose");
    const defaultConfig = _BaseLoading.defaultConfigByClassName[this.classname] || {};
    this.options = __spreadValues(__spreadValues(__spreadValues({}, this.options), defaultConfig), inputConfig);
    return this;
  }
  get isFull() {
    return this.getIsFull();
  }
  get classname() {
    return this.constructor.name;
  }
  static setDefaultConfig(options) {
    _BaseLoading.defaultConfigByClassName[this.name] = options;
  }
  get fullInst() {
    const className = this.constructor.name;
    if (!_BaseLoading._firstFullInstMapByClassName[className]) {
      _BaseLoading._firstFullInstMapByClassName[className] = this;
    }
    return _BaseLoading._firstFullInstMapByClassName[className];
  }
  startLoading() {
    if (!this.isFull) {
      this.loadingInst = this.buildLoading();
      return;
    }
    this.fullStart();
  }
  endLoading() {
    if (!this.isFull) {
      this.closeLoading(this.loadingInst);
      return;
    }
    this.fullClose();
  }
  fullStart() {
    const fullInst = this.fullInst;
    fullInst.reqIngNum++;
    fullInst.reqCount++;
    if (fullInst.needWaitLoading) {
      fullInst.waitLoading();
      fullInst.needWaitLoading = false;
    }
    this.upText(this.getText());
    fullInst.waitClose.cancel();
  }
  get waitLoading() {
    const fullInst = this.fullInst;
    if (!fullInst._waitLoading) {
      fullInst._waitLoading = debounce(() => {
        fullInst.fullLoadingSingleInst = this.buildLoading();
      }, 1e3);
    }
    return fullInst._waitLoading;
  }
  get waitClose() {
    const fullInst = this.fullInst;
    if (!fullInst._waitClose) {
      fullInst._waitClose = debounce(() => {
        fullInst.reqIngNum = 0;
        fullInst.reqCount = 0;
        fullInst.needWaitLoading = true;
        this.closeLoading(fullInst.fullLoadingSingleInst);
      }, 800);
    }
    return fullInst._waitClose;
  }
  fullClose() {
    const fullInst = this.fullInst;
    fullInst.reqIngNum--;
    this.upText(this.getText());
    if (fullInst.reqIngNum <= 0) {
      fullInst.waitLoading.cancel();
      fullInst.waitClose();
    }
  }
  getText(text = "\u52A0\u8F7D\u4E2D") {
    let { reqCount, reqIngNum } = this.fullInst;
    if (reqCount > 1) {
      let percent = 1 - reqIngNum / reqCount;
      percent = (percent * 100).toFixed(0);
      text = `\u5DF2\u52A0\u8F7D ${percent}%`;
    }
    return text;
  }
};
let BaseLoading = _BaseLoading;
__publicField(BaseLoading, "defaultConfigByClassName", {});
__publicField(BaseLoading, "_firstFullInstMapByClassName", {});
const _Vue3Controller = class {
  constructor() {
    __publicField(this, "key", "default");
    __publicField(this, "isSetDestroy", false);
  }
  static findOrCreate(key = "default") {
    var _a, _b;
    _Vue3Controller.map[this.name] = (_a = _Vue3Controller.map[this.name]) != null ? _a : {};
    _Vue3Controller.map[this.name][key] = (_b = _Vue3Controller.map[this.name][key]) != null ? _b : ref(new this());
    const controller = _Vue3Controller.map[this.name][key].value;
    controller.key = key;
    return _Vue3Controller.map[this.name][key];
  }
  reset() {
    const newController = new this.constructor();
    newController.key = this.key;
    newController.isSetDestroy = this.isSetDestroy;
    _Vue3Controller.map[this.constructor.name][this.key].value = newController;
  }
  setDestroy() {
    if (this.isSetDestroy) {
      return;
    }
    this.isSetDestroy = true;
    const key = this.key;
    const classname = this.constructor.name;
    onBeforeUnmount(() => {
      delete _Vue3Controller.map[classname][key];
    });
  }
};
let Vue3Controller = _Vue3Controller;
__publicField(Vue3Controller, "map", {});
export { BaseLoading, BaseRequest, LoadingRequest, RequestModel, Vue3Controller, setLoadingConfig, setLoadingMap, setRequestMap };
