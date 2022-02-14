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
    set<Key extends keyof Config>(key: Key, val: Config[Key]): this;
    setConfig(config: Partial<Config>): this;
    private setNoData;
    private setHasData;
    setGet(url: string, params?: any, config?: Partial<Config>): this;
    setDelete(url: string, params?: any, config?: Partial<Config>): this;
    setHead(url: string, params?: any, config?: Partial<Config>): this;
    setOptions(url: string, params?: any, config?: Partial<Config>): this;
    setPost(url: string, data?: any, params?: any, config?: Partial<Config>): this;
    setPut(url: string, data?: any, params?: any, config?: Partial<Config>): this;
    setPatch(url: string, data?: any, params?: any, config?: Partial<Config>): this;
}
