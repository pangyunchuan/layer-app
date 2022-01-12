import BaseRequest, { IRequestConfig } from "./BaseRequest";
import loadingClassConfig, {
  loadingOptionsType,
  loadingKeys
} from "../../config/loadingClassConfig";
import BaseLoading from "../Loading/BaseLoading";
import RequestModel from "../Models/RequestModel";
import { omit } from "lodash-es";


export default abstract class LoadingRequest extends BaseRequest {
  //todo 配置文件
  //是否默认使用loading
  protected isDefaultUseLoading = true;

  setUseLoading(use: boolean = true): this {
    this.isDefaultUseLoading = use;
    return this;
  }

  //loading设置
  private loading: BaseLoading<any, any> | undefined;

  setLoading<K extends loadingKeys = "default">(
    options: loadingOptionsType[K] = {}, type: K = <K>"default"
  ): this {
    this.loading = new loadingClassConfig[type](options);
    return this;
  }

  private getLoading():BaseLoading<any, any> | undefined {
    if (!this.loading && this.isDefaultUseLoading) {
      this.setLoading();
    }
    return this.loading;
  }


  //数据模型设置

  protected model: RequestModel<object> | undefined;

  setModel<ReqM extends RequestModel<{}> = RequestModel<{}>>(model: ReqM): this {
    this.model = model;
    return this;
  }

  getModel<ReqM extends RequestModel<{}> = RequestModel<{}>>(): ReqM {
    if (!this.model) {
      throw new Error("请先设置模型");
    }
    return <ReqM>this.model;
  }


  //请求

  request<ResData = any>(config: IRequestConfig = {}): Promise<ResData> {
    let loading = this.getLoading();
    loading?.startLoading();
    return super.request(config).then((r) => {
      loading?.endLoading();
      return r;
    }).catch((er) => {
      loading?.endLoading();
      throw er;
    });
  }

  /**
   * 请求并返回单个模型
   * @param Model
   * @param call  创建回调,可以进行模型初始化处理
   */
  reqOne<M extends RequestModel<{}>, MD = Required<M["_dataType"]>>(
    Model: new() => M, call?: (inst: M) => void
  ) {
    return this.request().then(res => {
      return this.getModel().newFromReq<M, MD>(Model, res, call);
    });
  }

  /**
   * 请求并返回单模型和其他数据
   * @param Model
   * @param dataKey  模型数据所在字段
   * @param call
   */
   reqOneOther<ApiData extends object,
    DK extends keyof ApiData,
    M extends RequestModel<any>,
    MD = Required<M["_dataType"]>>(
    Model: new() => M, dataKey: DK, call?: (inst: M) => void
  ) {
    return this.request().then(res => {
      const data = res[dataKey];
      const model = this.getModel().newFromReq<M, MD>(Model, data, call);
      return { ...<Omit<ApiData, DK>>omit(res, dataKey), model };
    });
  }

  /**
   * 请求并返回模型数据
   * @param Model
   * @param call
   */
   reqMany<M extends RequestModel<{}>, MD = Required<M["_dataType"]>>(Model: new() => M, call?: (inst: M) => void) {
    return this.request().then(res => {
      let models = [];
      for (const da of res) {
        models.push(this.getModel().newFromReq<M, MD>(Model, da, call));
      }
      return models;
    });
  }

  /**
   * 返回模型数组和其他字段
   * @param Model
   * @param dataKey  模型数据所在字段
   * @param call
   */
   reqManyOther<ApiData extends object,
    DK extends keyof ApiData,
    M extends RequestModel<{}>,
    MD = Required<M["_dataType"]>>(
    Model: new() => M, dataKey: DK, call?: (inst: M) => void
  ) {
    return this.request().then(res => {
      const data = res[dataKey];
      const models = [];
      for (const da of data) {
        models.push(this.getModel().newFromReq<M, MD>(Model, da, call));
      }
      return { ...<Omit<ApiData, DK>>omit(res, dataKey), models };
    });
  }
}
