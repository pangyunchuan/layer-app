import { AxiosError, AxiosRequestConfig, AxiosResponse, Cancel, CancelTokenSource } from "axios";
export interface IRequestConfig extends AxiosRequestConfig {
    cancelMark?: string;
}
export default abstract class BaseRequest<Config extends IRequestConfig = IRequestConfig> {
    protected static cancelMapByMark: {
        [key: string]: CancelTokenSource;
    };
    protected setCancel(): void;
    static cancelByMark(mark: string): void;
    protected config: Partial<Config>;
    protected response: AxiosResponse | undefined;
    protected error: AxiosError | Cancel | unknown | undefined;
    protected abstract requestHandle(): void;
    protected abstract responseHandle(): any;
    protected abstract errorHandle(): any;
    request<ResData = any>(config?: Partial<Config>): Promise<ResData>;
    setGet(url: string, params?: object, config?: Partial<Config>): this;
    setPost(url: string, data?: any, params?: object, config?: Partial<Config>): this;
    get<T = any>(url: string, params?: object, config?: Partial<Config>): Promise<T>;
    post<T = any>(url: string, data?: object, params?: object, config?: Partial<Config>): Promise<T>;
}
