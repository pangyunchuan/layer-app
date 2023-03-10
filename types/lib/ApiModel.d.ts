import Params from "./child/Params";
import { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import Loading from "./child/Loading";
import Model from "./Model";
export declare type ApiRequestMid<This extends ApiModel = ApiModel> = (this: This, c: AxiosRequestConfig) => Promise<AxiosRequestConfig>;
export declare type ApiRequestErrMid<This extends ApiModel = ApiModel> = (this: This, c: Error | AxiosRequestConfig | any) => Promise<any>;
export declare type ApiResponseMid<This extends ApiModel = ApiModel> = (this: This, c: AxiosResponse) => Promise<AxiosResponse>;
export declare type ApiResponseErrMid<This extends ApiModel = ApiModel> = (this: This, c: Error | AxiosResponse | any) => Promise<any>;
export default abstract class ApiModel extends Model {
    protected readonly http: AxiosInstance;
    abstract url: string;
    protected axiosConfig: AxiosRequestConfig;
    params?: Params<any>;
    data?: Params<any>;
    res: any | undefined;
    abortController?: AbortController;
    loading?: boolean | Loading<any, any>;
    protected reqMid: ApiRequestMid[];
    protected reqErrMid: ApiResponseErrMid[];
    protected resMid: ApiResponseMid[];
    protected resErrMid: ApiResponseErrMid[];
    run<T = any, R = AxiosResponse<T>, D = any>(c?: AxiosRequestConfig): Promise<R>;
}
