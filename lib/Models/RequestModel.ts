import BaseModel from "./BaseModel";
import getRequestMap, {instanceTypeByKey, reqKeys} from "../config/requestClassConfig";
import {loadingConfig} from "../config/loadingClassConfig";
import LoadingRequest from "root/lib/Request/LoadingRequest";
import {omit} from "lodash-es";

//接口请求模型
export default abstract class RequestModel<ModelData extends object> extends BaseModel<ModelData> {
    //是否默认启用loading
    protected useLoading = loadingConfig.use;

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
        return this._req
    }

    protected static setReq<M extends RequestModel<{}>>(this: new() => M, req: LoadingRequest): M {
        return new this().setReq(req)
    }

    private setReq(req: LoadingRequest): this {
        this._req =  req.setUseLoading(this.useLoading);
        return this
    }

    protected async reqOne<MD extends ModelData = ModelData>(
        call?: (inst: this & MD) => void
    ): Promise<this & MD> {
        return this.req.request().then(res => {
            return this.createModel<MD>(res, call)
        });
    }

    protected async reqOneOther<ApiData extends object,
        DK extends keyof ApiData,
        MD extends ModelData = ModelData,
        M extends RequestModel<{}> = this>(
        dataKey: DK,
        call?: (inst: M & MD) => void
    ): Promise<{ model: (M & MD) } & Omit<ApiData, DK>> {
        return this.req.request().then(res => {
            const data = res[dataKey];
            const model: M & MD = this.createModel(data, call);
            return {model, ...omit(res, dataKey)};
        });
    }

    /**
     * 请求并返回模型数据
     * @param call
     */
    protected async reqMany<MD extends ModelData = ModelData>(call?: (inst: this & MD) => void): Promise<(this & MD)[]> {
        return this.req.request().then(res => {
            let models = [];
            for (const da of res) {
                models.push(this.createModel<MD>(res, <any>call));
            }
            return models;
        });
    }

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
                models.push(this.createModel(data, call));
            }
            return {models, ...omit(res, dataKey)};
        });
    }
}
