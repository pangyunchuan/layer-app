import {AxiosError, AxiosRequestConfig, AxiosResponse, Cancel, CancelTokenSource} from "axios";

declare interface IRequestConfig extends AxiosRequestConfig {
    cancelMark?: string;// 为空 字符时，表示必要接口，不会被取消请求
}

declare abstract class BaseRequest<Config extends IRequestConfig = IRequestConfig> {
    protected static cancelMapByMark: { [key: string]: CancelTokenSource } = {};

    //设置取消信息
    protected setCancel(): void

    //取消请求
    static cancelByMark(mark: string): void

    protected config: Partial<Config> = {};
    protected response: AxiosResponse | undefined;
    protected error: AxiosError | Cancel | unknown | undefined;

    //请求拦截
    protected abstract requestHandle(): void

    //响应拦截
    protected abstract responseHandle(): any

    protected abstract errorHandle(): any

    request<ResData = any>(config: Partial<Config> = {}): Promise<ResData>

    setGet(url: string, params: object = {}, config: Partial<Config> = {}): this

    setPost(url: string, data: any = {}, params: object = {}, config: Partial<Config> = {}): this


    get<T = any>(url: string, params: object = {}, config: Partial<Config> = {}): Promise<T>

    post<T = any>(url: string, data: object = {}, params: object = {}, config: Partial<Config> = {}): Promise<T>
}


import BaseRequest, {IRequestConfig} from "@/packages/Request/BaseRequest";
import loadingClassConfig, {
    loadingOptionsType,
    loadingKeys
} from "@/model/config/loadingClassConfig";
import BaseLoading from "@/packages/Loading/BaseLoading";
import RequestModel from "@/packages/Models/RequestModel";


declare abstract class LoadingRequest extends BaseRequest {
    //todo 配置文件
    //是否默认使用loading
    protected isDefaultUseLoading = true;

    setUseLoading(use: boolean = true): this

    //loading设置
    private loading: BaseLoading<any, any> | undefined;

    setLoading<K extends loadingKeys = "default">(
        options: loadingOptionsType[K] = {}, type: K = <K>"default"
    ): this

    private getLoading(): void


    //数据模型设置

    protected model: RequestModel<object> | undefined;

    setModel<ReqM extends RequestModel<{}> = RequestModel<{}>>(model: ReqM): this

    getModel<ReqM extends RequestModel<{}> = RequestModel<{}>>(): ReqM


    //请求

    request<ResData = any>(config: IRequestConfig = {}): Promise<ResData>

    /**
     * 请求并返回单个模型
     * @param Model
     * @param call  创建回调,可以进行模型初始化处理
     */
    reqOne<M extends RequestModel<{}>, MD = Required<M["_dataType"]>>(
        Model: new() => M, call?: (inst: M) => void
    ): Promise<M & MD>

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
    ): Promise<Omit<ApiData, DK>>

    /**
     * 请求并返回模型数据
     * @param Model
     * @param call
     */
    reqMany<M extends RequestModel<{}>, MD = Required<M["_dataType"]>>(
        Model: new() => M, call?: (inst: M) => void
    ): Promise<(M & MD)[]>

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
    ): Promise<Omit<ApiData, DK> & { models: (M & MD)[] }>
}


declare abstract class BaseModel<ModelData extends object = {}> {
    _dataType: Partial<ModelData> = {}; //仅用于动态类型获取
    protected abstract data: ModelData;

    //代理 data 数据
    proxyData<MD = ModelData>(): this & MD
}

import {instanceTypeByKey, reqKeys} from "@/model/config/requestClassConfig";

//接口请求模型
declare abstract class RequestModel<ModelData1 extends object> extends BaseModel<ModelData1> {

    //是否默认启用loading
    protected defaultUseLoading = true;

    protected static newReq<Child extends RequestModel<any>, ReqType extends reqKeys = "default">(
        this: new () => Child,
        reqType: ReqType = <ReqType>"default"
    ): instanceTypeByKey[ReqType]

    protected newReq<ReqType extends reqKeys = "default">(
        reqType: ReqType = <ReqType>"default"
    ): instanceTypeByKey[ReqType]

    newFromReq<Mo extends RequestModel<ModelData> = RequestModel<any>, MD = Required<Mo["_dataType"]>>(
        Model: new () => Mo, data: any, call?: (inst: Mo) => void
    ): Mo & MD
}

