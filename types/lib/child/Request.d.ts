import { AxiosRequestConfig, AxiosResponse } from "axios";
import ApiModel from "../ApiModel";
export default class Request {
    protected readonly apiModel: ApiModel;
    constructor(m: ApiModel);
    protected error: any | undefined;
    isError(v: any): v is Error;
    isAxiosConfig(v: any): v is AxiosRequestConfig;
    isAxiosResponse(v: any): v is AxiosResponse;
    private composeAsync;
    private changeLoading;
    protected getConfig(important: boolean, c?: AxiosRequestConfig): AxiosRequestConfig;
    protected run<T = any, R = AxiosResponse<T>, D = any>(c: AxiosRequestConfig): Promise<R>;
    getResData(c?: AxiosRequestConfig): Promise<AxiosResponse<any, any>>;
    request<T = any, R = AxiosResponse<T>, D = any>(c?: AxiosRequestConfig): Promise<R>;
    getUri(config?: AxiosRequestConfig): string;
    private reqNoData;
    get<T = any, R = AxiosResponse<T>, D = any>(url: string, config?: AxiosRequestConfig<D>): Promise<R>;
    delete<T = any, R = AxiosResponse<T>, D = any>(url: string, config?: AxiosRequestConfig<D>): Promise<R>;
    head<T = any, R = AxiosResponse<T>, D = any>(url: string, config?: AxiosRequestConfig<D>): Promise<R>;
    options<T = any, R = AxiosResponse<T>, D = any>(url: string, config?: AxiosRequestConfig<D>): Promise<R>;
    private reqWithData;
    post<T = any, R = AxiosResponse<T>, D = any>(url: string, data?: D, config?: AxiosRequestConfig<D>): Promise<R>;
    put<T = any, R = AxiosResponse<T>, D = any>(url: string, data?: D, config?: AxiosRequestConfig<D>): Promise<R>;
    patch<T = any, R = AxiosResponse<T>, D = any>(url: string, data?: D, config?: AxiosRequestConfig<D>): Promise<R>;
    postForm<T = any, R = AxiosResponse<T>, D = any>(url: string, data?: D, config?: AxiosRequestConfig<D>): Promise<R>;
    putForm<T = any, R = AxiosResponse<T>, D = any>(url: string, data?: D, config?: AxiosRequestConfig<D>): Promise<R>;
    patchForm<T = any, R = AxiosResponse<T>, D = any>(url: string, data?: D, config?: AxiosRequestConfig<D>): Promise<R>;
}
