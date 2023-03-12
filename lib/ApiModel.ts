import Params from "./child/Params";
import axios, {AxiosInstance, AxiosRequestConfig, AxiosResponse} from "axios";
import Loading from "./child/Loading";
import Model from "./Model";
import Request from "./child/Request";
import CancelMan from "./child/CancelMan";

export type ApiRequestMid<This extends ApiModel = ApiModel> = (m: This, r: AxiosRequestConfig) => AxiosRequestConfig | Promise<AxiosRequestConfig>
export type ApiResponseMid<This extends ApiModel = ApiModel> = (m: This, r: AxiosResponse) => AxiosResponse | Promise<AxiosResponse>
export type ApiFinallyMid<This extends ApiModel = ApiModel> = (m: This, re?: any) => void | Promise<void>

export default abstract class ApiModel extends Model {
    readonly http: AxiosInstance = axios.create()
    abstract url: string
    //可配置一些通用请求配置
    readonly defaultConfig: AxiosRequestConfig = {}
    //请求数据
    params?: Params<any>
    //请求data
    data?: Params<any>
    readonly cancelMan?: CancelMan
    //加载控制
    loading?: boolean | Loading<any, any>
    //请求拦截
    readonly reqMid: ApiRequestMid[] = []
    //响应拦截
    readonly resMid: ApiResponseMid[] = []
    //结束拦截
    readonly finallyMid: ApiFinallyMid[] = []

    //响应数据
    resData: any | undefined

    //请求类
    readonly request: Request

    constructor() {
        super();
        this.request = new Request(this)
    }

    //获取模型数据
    async getResData(c?: AxiosRequestConfig) {
        return this.request.getResData(c)
    }
}