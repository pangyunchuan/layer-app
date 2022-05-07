import BaseModel from "./BaseModel";
import { instanceTypeByKey, reqKeys } from "../config/requestClassConfig";
import LoadingRequest from "../Request/LoadingRequest";
import BaseRequest from "../Request/BaseRequest";
/**
 * 接口请求基础模型，用户定义接口对应的模型，并完成接口交互
 * 接口请求方式  Model.setReq(this.newReq().setGet('url','params')).reqOne()
 */
export default abstract class RequestModel<ModelData extends object> extends BaseModel<ModelData> {
    /**
     * 该字段为  model.url 模型url，它将与 req.url(请求实例url) 配合，以确定请求地址
     * 当 req.url  不包含 '/' 时 请求地址为  model.url + req.url；req.url  包含 '/' 时 请求地址为 req.url 自身
     * req.url 在 配置模型请求时使用 如: this.newReq().setGet('url');
     *
     * 非 restful 列子
     * model.url = /a/user/;req.url = list; =>  /a/user/list。
     * model.url = a/user;req.url = list; =>  a/user/list。
     * req.url = /user; => /user。req.url = /user/list/; => /user/list。  这对模型对应的某个接口地址不规则时有用。
     *
     * restfull接口
     * model.url = /a/user;req.url = '';this.newReq().setGet(); => get /a/user。
     * model.url = /a/user/;req.url = '';this.newReq().setPost(); => post /a/user。
     * @protected
     */
    protected static url: string;
    protected get url(): string;
    /**
     * 是否 默认启用loading，初始以配置值，单个模型可覆盖该值，手动设置loading时，该字段无效
     * 为true 时,,请求类 必须为 LoadingRequest 后代
     * @protected
     */
    protected useLoading: boolean;
    /**
     * 新建请求实例
     * @param reqType
     * @protected
     */
    protected static newReq<Child extends RequestModel<any>, ReqType extends reqKeys = "default">(reqType?: ReqType): instanceTypeByKey[ReqType];
    /**
     * 新建请求实例
     * @param reqType
     * @protected
     */
    protected newReq<ReqType extends reqKeys = "default">(reqType?: ReqType): instanceTypeByKey[ReqType];
    private _req?;
    private get req();
    /**
     * 合并 model.url  req.url，当在模型中，只使用req时，可使用该函数
     * @param end
     * @param prev  前缀
     * @protected
     */
    protected parseUrl(end?: string, prev?: string): string;
    /**
     * 合并 model.url  req.url，当在模型中，只使用req时，可使用该函数
     * @param end
     * @param prev
     * @protected
     */
    protected static parseUrl(end?: string, prev?: string): string;
    private static parseUrlHandle;
    /**
     * 设置 请求实例，发起请求前必须设置 会新建一个模型实例
     * @param req
     * @protected
     */
    protected static setReq<M extends RequestModel<{}>>(this: new () => M, req: LoadingRequest): M;
    /**
     * 设置 请求实例，发起请求前必须设置
     * @param req
     * @protected
     */
    protected setReq(req: LoadingRequest | BaseRequest): this;
    /**
     * 发起请求，返回单个模型实例
     * @protected
     */
    protected reqOne<MD extends Partial<ModelData> = ModelData>(): Promise<this & MD>;
    /**
     * 发起请求，返回包含单个实例的对象，其中 model 字段为模型实例
     * @param dataKey  响应数据中 模型数据所在字段
     * @protected
     */
    protected reqOneOther<ApiData extends object, DK extends keyof ApiData, MD extends Partial<ModelData> = ModelData, M extends RequestModel<{}> = this>(dataKey: DK): Promise<{
        model: (M & MD);
    } & Omit<ApiData, DK>>;
    /**
     * 发起请求，返回模型实例组成的数组
     * @param call  每个模型实例创建后执行的回调函数
     * @protected
     */
    protected reqMany<MD extends Partial<ModelData> = ModelData>(call?: (inst: this & MD) => void): Promise<(this & MD)[]>;
    /**
     * 发起请求并返回包含模型实例数组的对象,其中  models 字段为模型实例数组
     * @param dataKey  接口返回数据中，模型数据数组所在字段
     * @param call     每个模型实例创建后执行的回调函数
     * @protected
     */
    protected reqManyOther<ApiData extends object, DK extends keyof ApiData, MD extends Partial<ModelData> = ModelData, M extends RequestModel<{}> = this>(dataKey: DK, call?: (inst: M & MD) => void): Promise<{
        models: (M & MD)[];
    } & Omit<ApiData, DK>>;
    /**
     * 发起请求并 保存数据（新建，修改）, 要求接口会返回接口id,此时会修改模型id字段为，若接口不返回id，将不做操作
     * 请注意设置 primaryKey以及接口是否支持
     * @param idField  主键字段  默认模型主键
     * @protected
     */
    protected reqSave<MD extends Partial<ModelData> = ModelData>(idField?: string): Promise<string | number>;
}
