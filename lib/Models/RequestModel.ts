import BaseModel from "./BaseModel";
import getRequestMap, {instanceTypeByKey, reqKeys} from "../config/requestClassConfig";
import {loadingConfig} from "../config/loadingClassConfig";
import LoadingRequest from "root/lib/Request/LoadingRequest";
import {omit, trim} from "lodash-es";

/**
 * 接口请求基础模型，用户定义接口对应的模型，并完成接口交互
 * 接口请求方式  Model.setReq(this.newReq().setGet('url','params')).reqOne()
 */
export default abstract class RequestModel<ModelData extends object> extends BaseModel<ModelData> {
    /**
     * 该字段为  model.url 模型url，它将与 req.url(请求实例url) 配合，以确定请求地址
     * model.url req.url 的 首尾 '/' 可要可不要，
     * 但当 req.url  不包含 '/' 时    结果为  model.url + req.url，req.url  包含 '/' 时 结果 为 req.url
     * req.url 在 配置模型请求时使用 如: this.newReq().setGet('url');
     *
     * 非 restful 列子
     * model.url = /a/user/;req.url = list; =>  /a/user/list。
     * req.url = /user; => /user。这对模型对应的某个接口地址不规则时有用。
     *
     * restfull接口
     * model.url = /a/user;req.url = '';this.newReq().setGet(); => get /a/user。
     * model.url = /a/user;req.url = '';this.newReq().setPost(); => post /a/user。
     * @protected
     */
    protected abstract url: string

    /**
     * 是否 默认启用loading，初始以配置值，单个模型可覆盖该值，手动设置loading时，该字段无效
     * @protected
     */
    protected useLoading: boolean = loadingConfig.use;

    /**
     * 新建请求实例
     * @param reqType
     * @protected
     */
    protected static newReq<Child extends RequestModel<any>, ReqType extends reqKeys = "default">(
        reqType: ReqType = <ReqType>"default"
    ): instanceTypeByKey[ReqType] {
        const reqMap = getRequestMap()
        const reqClass = new reqMap[reqType];
        if (!reqClass) {
            throw new Error(`${reqType} 请求类 不存在`);
        }
        return <instanceTypeByKey[ReqType]>reqClass;
    }

    /**
     * 新建请求实例
     * @param reqType
     * @protected
     */
    protected newReq<ReqType extends reqKeys = "default">(
        reqType: ReqType = <ReqType>"default"
    ): instanceTypeByKey[ReqType] {
        return RequestModel.newReq(reqType);
    }


    private _req?: LoadingRequest;

    private get req(): LoadingRequest {
        if (!this._req) {
            throw new Error(`请求类 未设置`);
        }
        let base = this.url;
        const url = this._req.get('url') || '';
        if (!url && !base) {
            throw new Error(`未设置请求地址`);
        }

        if (url.includes('/')) {
            base = '';
        }

        this._req.set('url', /*'/' +*/ trim(`${trim(base, '/')}/${trim(url, '/')}`, '/'));

        return this._req;
    }

    /**
     * 设置 请求实例，发起请求前必须设置
     * @param req
     * @protected
     */
    protected static setReq<M extends RequestModel<{}>>(this: new() => M, req: LoadingRequest): M {
        return new this().setReq(req)
    }

    private setReq(req: LoadingRequest): this {
        this._req = req.setUseLoading(this.useLoading);
        return this
    }

    /**
     * 发起请求，返回单个模型实例
     * @param call
     * @protected
     */
    protected async reqOne<MD extends ModelData = ModelData>(
        call?: (inst: this & MD) => void
    ): Promise<this & MD> {
        return this.req.request().then(res => {
            return this.createModel<MD>(res, call, true)
        });
    }

    /**
     * 发起请求，返回包含单个实例的对象，其中 model 字段为模型实例
     * @param dataKey  响应数据中 模型数据所在字段
     * @param call     模型实例创建后执行额回调函数
     * @protected
     */
    protected async reqOneOther<ApiData extends object,
        DK extends keyof ApiData,
        MD extends ModelData = ModelData,
        M extends RequestModel<{}> = this>(
        dataKey: DK,
        call?: (inst: M & MD) => void
    ): Promise<{ model: (M & MD) } & Omit<ApiData, DK>> {
        return this.req.request().then(res => {
            const data = res[dataKey];
            const model: M & MD = this.createModel(data, call, true);
            return {model, ...omit(res, dataKey)};
        });
    }

    /**
     * 发起请求，返回模型实例组成的数组
     * @param call  每个模型实例创建后执行的回调函数
     * @protected
     */
    protected async reqMany<MD extends ModelData = ModelData>(call?: (inst: this & MD) => void): Promise<(this & MD)[]> {
        return this.req.request().then(res => {
            let models = [];
            for (const da of res) {
                models.push(this.createModel<MD>(da, <any>call, true));
            }
            return models;
        });
    }

    /**
     * 发起请求并返回包含模型实例数组的对象,其中  models 字段为模型实例数组
     * @param dataKey  接口返回数据中，模型数据数组所在字段
     * @param call     每个模型实例创建后执行的回调函数
     * @protected
     */
    protected async reqManyOther<ApiData extends object,
        DK extends keyof ApiData,
        MD extends ModelData = ModelData,
        M extends RequestModel<{}> = this>(
        dataKey: DK,
        call?: (inst: M & MD) => void
    ): Promise<{ models: (M & MD)[] } & Omit<ApiData, DK>> {
        return this.req.request().then(res => {
            const dataList = res[dataKey];
            let models: (M & MD)[] = [];
            for (const data of dataList) {
                models.push(this.createModel(data, call, true));
            }
            return {models, ...omit(res, dataKey)};
        });
    }
}
