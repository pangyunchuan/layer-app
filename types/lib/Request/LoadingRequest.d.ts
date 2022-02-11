import BaseRequest, { IRequestConfig } from "./BaseRequest";
import { loadingOptionsType, loadingKeys } from "../config/loadingClassConfig";
export default abstract class LoadingRequest extends BaseRequest {
    protected useLoading: boolean;
    setUseLoading(use?: boolean): this;
    private loading;
    setLoading<K extends loadingKeys = "default">(options?: loadingOptionsType[K], type?: K): this;
    private getLoading;
    request<ResData = any>(config?: IRequestConfig): Promise<ResData>;
}
