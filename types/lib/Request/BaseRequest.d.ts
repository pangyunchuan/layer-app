import { AxiosError, AxiosRequestConfig, AxiosResponse, Cancel, CancelTokenSource } from "axios";
export interface IRequestConfig extends AxiosRequestConfig {
    cancelMark?: string;
}
/**
 * 接口请求基类，用于完成接口请求
 */
export default abstract class BaseRequest<Config extends IRequestConfig = IRequestConfig> {
    protected static cancelMapByMark: {
        [key: string]: CancelTokenSource;
    };
    protected setCancel(): void;
    /**
     * 取消给定标记的未完成的请求 , 默认 'default'
     * 传入空字符串，该请求将无法取消
     * @param mark
     */
    static cancelByMark(mark?: string): void;
    /**
     * 请求配置，继承 axios config
     * @protected
     */
    protected config: Partial<Config>;
    protected response: AxiosResponse | undefined;
    protected error: AxiosError | Cancel | unknown | undefined;
    /**
     * 设置请求拦截
     * @protected
     */
    protected abstract requestHandle(): void;
    /**
     * 设置响应拦截，当响应数据不符合要求时  throw this.response
     * @protected
     */
    protected abstract responseHandle(): any;
    /**
     * 设置响应异常处理，总是
     * @protected
     */
    protected abstract errorHandle(): Error;
    /**
     * 发起请求
     * @param config
     */
    request<ResData = any>(config?: Partial<Config>): Promise<ResData>;
    set<Key extends keyof Config>(key: Key, val: Config[Key]): this;
    get<Key extends keyof Config>(key: Key): Config[Key] | undefined;
    setConfig(config: Partial<Config>): this;
    private setNoData;
    private setHasData;
    setGet(url?: string, params?: any, config?: Partial<Config>): this;
    setDelete(url?: string, params?: any, config?: Partial<Config>): this;
    setHead(url?: string, params?: any, config?: Partial<Config>): this;
    setOptions(url?: string, params?: any, config?: Partial<Config>): this;
    setPost(url?: string, data?: any, params?: any, config?: Partial<Config>): this;
    setPut(url?: string, data?: any, params?: any, config?: Partial<Config>): this;
    setPatch(url?: string, data?: any, params?: any, config?: Partial<Config>): this;
}
