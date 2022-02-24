import BaseRequest, { IRequestConfig } from "./BaseRequest";
import { loadingOptionsType, loadingKeys } from "../config/loadingClassConfig";
/**
 * 附带加载效果的请求基类，在请求基类的基础上增加了加载效果管理
 */
export default abstract class LoadingRequest extends BaseRequest {
    protected useLoading: boolean;
    setUseLoading(use?: boolean): this;
    private loading;
    setLoading<K extends loadingKeys = "default">(options?: loadingOptionsType[K], type?: K): this;
    private getLoading;
    request<ResData = any>(config?: IRequestConfig): Promise<ResData>;
}
