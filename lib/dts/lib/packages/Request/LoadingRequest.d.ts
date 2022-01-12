import BaseRequest, { IRequestConfig } from "./BaseRequest";
import { loadingOptionsType, loadingKeys } from "../../config/loadingClassConfig";
import RequestModel from "../Models/RequestModel";
export default abstract class LoadingRequest extends BaseRequest {
    protected isDefaultUseLoading: boolean;
    setUseLoading(use?: boolean): this;
    private loading;
    setLoading<K extends loadingKeys = "default">(options?: loadingOptionsType[K], type?: K): this;
    private getLoading;
    protected model: RequestModel<object> | undefined;
    setModel<ReqM extends RequestModel<{}> = RequestModel<{}>>(model: ReqM): this;
    getModel<ReqM extends RequestModel<{}> = RequestModel<{}>>(): ReqM;
    request<ResData = any>(config?: IRequestConfig): Promise<ResData>;
    /**
     * 请求并返回单个模型
     * @param Model
     * @param call  创建回调,可以进行模型初始化处理
     */
    reqOne<M extends RequestModel<{}>, MD = Required<M["_dataType"]>>(Model: new () => M, call?: (inst: M) => void): Promise<M & MD>;
    /**
     * 请求并返回单模型和其他数据
     * @param Model
     * @param dataKey  模型数据所在字段
     * @param call
     */
    reqOneOther<ApiData extends object, DK extends keyof ApiData, M extends RequestModel<any>, MD = Required<M["_dataType"]>>(Model: new () => M, dataKey: DK, call?: (inst: M) => void): Promise<Omit<ApiData, DK> & {
        model: M & MD;
    }>;
    /**
     * 请求并返回模型数据
     * @param Model
     * @param call
     */
    reqMany<M extends RequestModel<{}>, MD = Required<M["_dataType"]>>(Model: new () => M, call?: (inst: M) => void): Promise<(M & MD)[]>;
    /**
     * 返回模型数组和其他字段
     * @param Model
     * @param dataKey  模型数据所在字段
     * @param call
     */
    reqManyOther<ApiData extends object, DK extends keyof ApiData, M extends RequestModel<{}>, MD = Required<M["_dataType"]>>(Model: new () => M, dataKey: DK, call?: (inst: M) => void): Promise<Omit<ApiData, DK> & {
        models: (M & MD)[];
    }>;
}
