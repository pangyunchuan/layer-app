import BaseModel from "./BaseModel";
import getRequestMap, {instanceTypeByKey, reqKeys} from "../config/requestClassConfig";

//接口请求模型
export default abstract class RequestModel<ModelData extends object> extends BaseModel<ModelData> {

    //是否默认启用loading
    protected defaultUseLoading = true;

    protected static newReq<Child extends RequestModel<any>, ReqType extends reqKeys = "default">(
        this: new () => Child,
        reqType: ReqType = <ReqType>"default"
    ): instanceTypeByKey[ReqType] {
        const self = new this;
        return self.newReq(reqType);
    }

    protected newReq<ReqType extends reqKeys = "default">(
        reqType: ReqType = <ReqType>"default"
    ): instanceTypeByKey[ReqType] {
        const reqMap = getRequestMap()
        const reqClass = new reqMap[reqType];
        if (!reqClass) {
            throw new Error(`${reqType} 请求类 不存在`);
        }
        return <instanceTypeByKey[ReqType]>reqClass.setModel(this).setUseLoading(this.defaultUseLoading);
    }

    newFromReq<Mo extends RequestModel<ModelData> = RequestModel<any>, MD = Required<Mo["_dataType"]>>(
        Model: new () => Mo, data: any, call?: (inst: Mo) => void
    ): Mo & MD {
        const model = new Model();
        model.data = data;
        call && call(model);
        return <Mo & MD>model.proxyData();
    }

}
