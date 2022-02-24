import BaseRequest, {IRequestConfig} from "./BaseRequest";
import getLoadingMap, {
    loadingOptionsType,
    loadingKeys, loadingConfig
} from "../config/loadingClassConfig";
import BaseLoading from "../Loading/BaseLoading";

/**
 * 附带加载效果的请求基类，在请求基类的基础上增加了加载效果管理
 */
export default abstract class LoadingRequest extends BaseRequest {
    //是否默认使用loading
    protected useLoading = loadingConfig.use;

    setUseLoading(use: boolean = loadingConfig.use): this {
        this.useLoading = use;
        return this;
    }

    //loading设置
    private loading: BaseLoading<any, any> | undefined;

    setLoading<K extends loadingKeys = "default">(
        options: loadingOptionsType[K] = {}, type: K = <K>"default"
    ): this {
        const map = getLoadingMap();
        this.loading = new map[type](options);
        return this;
    }

    private getLoading(): BaseLoading<any, any> | undefined {
        if (!this.loading && this.useLoading) {
            this.setLoading();
        }
        return this.loading;
    }


    //请求
    async request<ResData = any>(config: IRequestConfig = {}): Promise<ResData> {
        let loading = this.getLoading();
        loading?.startLoading();
        return super.request(config).then((r) => {
            loading?.endLoading();
            return r;
        }).catch((er) => {
            loading?.endLoading();
            throw er;
        });
    }
}
