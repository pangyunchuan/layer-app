import {AxiosRequestConfig, AxiosResponse} from "axios";
import Loading from "./Loading";
import ApiModel, {ApiFinallyMid, ApiRequestMid, ApiResponseMid} from "../ApiModel";

export default class Request {
    protected readonly apiModel: ApiModel

    constructor(m: ApiModel) {
        this.apiModel = m
    }

    protected error: any | undefined

    isError(v: any): v is Error {
        return typeof v === 'object' && v instanceof Error
    }

    isAxiosConfig(v: any): v is AxiosRequestConfig {
        return typeof v === 'object' && ('url' in v) && ('method' in v) && ('params' in v) && ('data' in v)
    }

    isAxiosResponse(v: any): v is AxiosResponse {
        return typeof v === 'object' && ('config' in v) && ('status' in v) && ('data' in v)
    }

    //返回一个顺序执行，链式调用的方法，接受一个初始值
    private composeAsync(type: 'then' | 'catch' | 'finally', ...calls: (ApiRequestMid | ApiResponseMid | ApiFinallyMid)[]) {
        return (startPromise: Promise<any>) => {
            return calls.reduce((lastPromise, f) => {
                return (<any>lastPromise[type])((i?: any) => {
                    return f(this.apiModel, type === 'then' ? i : this.error)
                })
            }, startPromise)
        }
    }

    private changeLoading(state: boolean) {
        if (this.apiModel.loading === undefined) {
            return
        } else if (typeof this.apiModel.loading === 'boolean') {
            this.apiModel.loading = state;
        } else if (this.apiModel.loading instanceof Loading) {
            this.apiModel.loading[state ? 'start' : 'close']()
        }
    }

    //获取配置
    protected getConfig(important: boolean, c: AxiosRequestConfig = {}): AxiosRequestConfig {
        let importantConfig;
        let unimportantConfig;
        important ? (importantConfig = c) : (unimportantConfig = c);
        return {
            ...this.apiModel.defaultConfig,
            ...unimportantConfig,
            url: this.apiModel.url,
            params: this.apiModel.params?.transform(),
            data: this.apiModel.data?.transform(),
            signal: this.apiModel.cancelMan?.signal,
            ...importantConfig,
        }
    }

    //执行请求
    protected async run<T = any, R = AxiosResponse<T>, D = any>(c: AxiosRequestConfig): Promise<R> {
        this.error = undefined
        //执行请求中间件
        const req = this.composeAsync('then', ...this.apiModel.reqMid)(
            Promise.resolve(c)
        ).then(config => {
            this.changeLoading(true)
            //执行响应中间件
            return this.composeAsync('then', ...this.apiModel.resMid)(
                this.apiModel.http.request<T, R, D>(config)
            )
        }).catch(e => {
            //捕获异常
            this.error = e;
            return Promise.reject(e)
        })

        //执行 finally 中间件
        this.composeAsync('finally', ...this.apiModel.finallyMid)(
            req.finally(() => {
                    this.changeLoading(false)
                }
            )
        )

        return req
    }

    //获取模型数据
    getResData(c: AxiosRequestConfig = {}) {
        return this.run(this.getConfig(false, c))
    }


    //发送独立请求，此时传入的配置有最高优先级，可覆盖模型配置参数,后续均与axios一致的，别名方法
    request<T = any, R = AxiosResponse<T>, D = any>(c: AxiosRequestConfig = {}): Promise<R> {
        return this.run<T, R, D>(this.getConfig(true, c))
    }

    getUri(config: AxiosRequestConfig = {}) {
        return this.apiModel.http.getUri(this.getConfig(true, config))
    }

    private reqNoData<T = any, R = AxiosResponse<T>, D = any>(url: string, config: AxiosRequestConfig<D> = {}): Promise<R> {
        return this.request({
            ...config,
            url
        })
    }

    get<T = any, R = AxiosResponse<T>, D = any>(url: string, config?: AxiosRequestConfig<D>): Promise<R> {
        return this.reqNoData(url, config)
    }

    delete<T = any, R = AxiosResponse<T>, D = any>(url: string, config?: AxiosRequestConfig<D>): Promise<R> {
        return this.reqNoData(url, config)
    }

    head<T = any, R = AxiosResponse<T>, D = any>(url: string, config?: AxiosRequestConfig<D>): Promise<R> {
        return this.reqNoData(url, config)
    }

    options<T = any, R = AxiosResponse<T>, D = any>(url: string, config?: AxiosRequestConfig<D>): Promise<R> {
        return this.reqNoData(url, config)
    }

    private reqWithData<T = any, R = AxiosResponse<T>, D = any>(url: string, data?: D, config: AxiosRequestConfig<D> = {}): Promise<R> {
        return this.request({
            ...config,
            url,
            data,
        })
    }

    post<T = any, R = AxiosResponse<T>, D = any>(url: string, data?: D, config?: AxiosRequestConfig<D>): Promise<R> {
        return this.reqWithData<T, R, D>(url, data, config)
    }

    put<T = any, R = AxiosResponse<T>, D = any>(url: string, data?: D, config?: AxiosRequestConfig<D>): Promise<R> {
        return this.reqWithData<T, R, D>(url, data, config)
    }

    patch<T = any, R = AxiosResponse<T>, D = any>(url: string, data?: D, config?: AxiosRequestConfig<D>): Promise<R> {
        return this.reqWithData<T, R, D>(url, data, config)
    }

    postForm<T = any, R = AxiosResponse<T>, D = any>(url: string, data?: D, config?: AxiosRequestConfig<D>): Promise<R> {
        return this.reqWithData<T, R, D>(url, data, config)
    }

    putForm<T = any, R = AxiosResponse<T>, D = any>(url: string, data?: D, config?: AxiosRequestConfig<D>): Promise<R> {
        return this.reqWithData<T, R, D>(url, data, config)
    }

    patchForm<T = any, R = AxiosResponse<T>, D = any>(url: string, data?: D, config?: AxiosRequestConfig<D>): Promise<R> {
        return this.reqWithData<T, R, D>(url, data, config)
    }
}