import Params from "./child/Params";
import { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import Loading from "./child/Loading";
import Model from "./Model";
import Request from "./child/Request";
import CancelMan from "./child/CancelMan";
export declare type ApiRequestMid<This extends ApiModel = ApiModel> = (m: This, r: AxiosRequestConfig) => AxiosRequestConfig | Promise<AxiosRequestConfig>;
export declare type ApiResponseMid<This extends ApiModel = ApiModel> = (m: This, r: AxiosResponse) => AxiosResponse | Promise<AxiosResponse>;
export declare type ApiFinallyMid<This extends ApiModel = ApiModel> = (m: This, re?: any) => void | Promise<void>;
export default abstract class ApiModel extends Model {
    readonly http: AxiosInstance;
    abstract url: string;
    readonly defaultConfig: AxiosRequestConfig;
    params?: Params<any>;
    data?: Params<any>;
    readonly cancelMan?: CancelMan;
    loading?: boolean | Loading<any, any>;
    readonly reqMid: ApiRequestMid[];
    readonly resMid: ApiResponseMid[];
    readonly finallyMid: ApiFinallyMid[];
    resData: any | undefined;
    readonly request: Request;
    constructor();
    getResData(c?: AxiosRequestConfig): Promise<AxiosResponse<any, any>>;
}
