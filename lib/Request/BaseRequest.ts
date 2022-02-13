import axios, {AxiosError, AxiosRequestConfig, AxiosResponse, Cancel, CancelTokenSource} from "axios";

export interface IRequestConfig extends AxiosRequestConfig {
    cancelMark?: string;// 为空 字符时，表示必要接口，不会被取消请求
}

export default abstract class BaseRequest<Config extends IRequestConfig = IRequestConfig> {
    protected static cancelMapByMark: { [key: string]: CancelTokenSource } = {};

    //设置取消信息
    protected setCancel(): void {
        let {config} = this;
        // 必要请求，不能取消，如 登录
        if (config.cancelMark === "") {
            return;
        }
        let mark: string;
        config.cancelMark = mark = config.cancelMark || "default";
        let {cancelMapByMark: map} = BaseRequest;

        let cancelSource = map[mark] = map[mark] || axios.CancelToken.source();
        config.cancelToken = cancelSource.token;
    }

    //取消请求
    static cancelByMark(mark: string): void {
        let {cancelMapByMark: map} = BaseRequest;
        //todo 必要请求，不能取消
        if (!map[mark]) {
            return;
        }
        map[mark].cancel();
        delete map[mark];
    }

    protected config: Partial<Config> = {};
    protected response: AxiosResponse | undefined;
    protected error: AxiosError | Cancel | unknown | undefined;

    //请求拦截
    protected abstract requestHandle(): void

    //响应拦截
    protected abstract responseHandle(): any

    protected abstract errorHandle(): any

    async request<ResData = any>(config: Partial<Config> = {}): Promise<ResData> {
        this.config = {...this.config, ...config};

        this.requestHandle();

        this.setCancel();

        return axios.request(this.config).then(response => {
            this.response = response;
            // 判断响应成功失败
            // if (false) {
            //   throw response;
            // }
            // return response.data.returnContent;
            return this.responseHandle();
        }).catch(error => {
            this.error = error;
            //可以进行以下分类处理
            // if (axios.isAxiosError(error)) {
            //   //处理
            // }
            // if (axios.isCancel(error)) {
            //   // 处理
            // }
            // //处理 response reject
            throw this.errorHandle()
        });
    }

    set<Key extends keyof Config>(key: Key, val: Config[Key]): this {
        this.config[key] = val
        return this
    }

    setConfig(config: Partial<Config>): this {
        this.config = {...this.config, ...config};
        return this
    }

    private setNoData(url: string, params: any = {}, config: Partial<Config> = {}): this {
        return this.set('url', url).set("params", params).setConfig(config)
    }

    private setHasData(url: string, data: any = {}, params: any = {}, config: Partial<Config> = {}): this {
        return this.set('url', url).set('data', data).set("params", params).setConfig(config)
    }

    setGet(url: string, params: any = {}, config: Partial<Config> = {}): this {
        return this.set('method', 'get').setNoData(url, params, config)
    }

    setDelete(url: string, params: any = {}, config: Partial<Config> = {}): this {
        return this.set('method', 'delete').setNoData(url, params, config)
    }

    setHead(url: string, params: any = {}, config: Partial<Config> = {}): this {
        return this.set('method', 'head').setNoData(url, params, config)
    }

    setOptions(url: string, params: any = {}, config: Partial<Config> = {}): this {
        return this.set('method', 'options').setNoData(url, params, config)
    }

    setPost(url: string, data: any = {}, params: any = {}, config: Partial<Config> = {}): this {
        return this.set('method', 'post').setHasData(url, data, params, config)
    }

    setPut(url: string, data: any = {}, params: any = {}, config: Partial<Config> = {}): this {
        return this.set('method', 'put').setHasData(url, data, params, config)
    }

    setPatch(url: string, data: any = {}, params: any = {}, config: Partial<Config> = {}): this {
        return this.set('method', 'patch').setHasData(url, data, params, config)
    }
}
