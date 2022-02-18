import BaseModel from "./BaseModel";
import { instanceTypeByKey, reqKeys } from "../config/requestClassConfig";
import LoadingRequest from "root/lib/Request/LoadingRequest";
export default abstract class RequestModel<ModelData extends object> extends BaseModel<ModelData> {
    protected useLoading: boolean;
    protected static newReq<Child extends RequestModel<any>, ReqType extends reqKeys = "default">(reqType?: ReqType): instanceTypeByKey[ReqType];
    protected newReq<ReqType extends reqKeys = "default">(reqType?: ReqType): instanceTypeByKey[ReqType];
    private _req?;
    private get req();
    protected static setReq<M extends RequestModel<{}>>(this: new () => M, req: LoadingRequest): M;
    private setReq;
    protected reqOne<MD extends ModelData = ModelData>(call?: (inst: this & MD) => void): Promise<this & MD>;
    protected reqOneOther<ApiData extends object, DK extends keyof ApiData, MD extends ModelData = ModelData, M extends RequestModel<{}> = this>(dataKey: DK, call?: (inst: M & MD) => void): Promise<{
        model: (M & MD);
    } & Omit<ApiData, DK>>;
    /**
     * 请求并返回模型数据
     * @param call
     */
    protected reqMany<MD extends ModelData = ModelData>(call?: (inst: this & MD) => void): Promise<(this & MD)[]>;
    protected reqManyOther<ApiData extends object, DK extends keyof ApiData, MD extends ModelData = ModelData, M extends RequestModel<{}> = this>(dataKey: DK, call?: (inst: M & MD) => void): Promise<{
        models: (M & MD)[];
    } & Omit<ApiData, DK>>;
}
