import Params from "./child/Params";
import axios, {AxiosInstance, AxiosRequestConfig, AxiosResponse} from "axios";
import Loading from "./child/Loading";
import Model from "./Model";

export type ApiRequestMid<This extends ApiModel = ApiModel> = (this: This, c: AxiosRequestConfig) => Promise<AxiosRequestConfig>
export type ApiRequestErrMid<This extends ApiModel = ApiModel> = (this: This, c: Error | AxiosRequestConfig | any) => Promise<any>
export type ApiResponseMid<This extends ApiModel = ApiModel> = (this: This, c: AxiosResponse) => Promise<AxiosResponse>
export type ApiResponseErrMid<This extends ApiModel = ApiModel> = (this: This, c: Error | AxiosResponse | any) => Promise<any>


export default abstract class ApiModel extends Model {
    protected readonly http: AxiosInstance = axios.create()
    abstract url: string
    //可配置一些通用请求配置
    protected axiosConfig: AxiosRequestConfig = {}
    params?: Params<any>
    data?: Params<any>
    res: any | undefined
    abortController?: AbortController
    loading?: boolean | Loading<any, any>
    protected reqMid: ApiRequestMid[] = []
    protected reqErrMid: ApiResponseErrMid[] = []
    protected resMid: ApiResponseMid[] = []
    protected resErrMid: ApiResponseErrMid[] = []

    async run<T = any, R = AxiosResponse<T>, D = any>(c: AxiosRequestConfig = {}) {
        const reqMidRun = new Promise<AxiosRequestConfig>((resolve) => {
            return resolve({
                ...this.axiosConfig,
                ...c,
                url: this.url,
                params: this.params?.transform(),
                data: this.data?.transform(),
                signal: this.abortController?.signal
            })
        })
        try {
            for (const reqMid of this.reqMid) {
                reqMidRun.then(<any>reqMid.bind(<any>this))
            }
            //如何跳出异常?
            for (const reqErr of this.reqErrMid) {
                reqMidRun.catch(reqErr.bind(<any>this))
            }
        } catch (e) {
            return Promise.reject(e);
        }

        const httpConfig = await reqMidRun;

        const req = this.http.request<T, R, D>(httpConfig);
        try {
            for (const resMidElement of this.resMid) {
                req.then(<any>resMidElement.bind(<any>this))
            }
            for (const resErrMid of this.resErrMid) {
                req.catch(resErrMid.bind(<any>this))
            }
        } catch (e) {
            return Promise.reject(e);
        }

        return req;
    }
}




