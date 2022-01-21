import BaseModel from "./BaseModel";
import getRequestMap, {instanceTypeByKey, reqKeys} from "../config/requestClassConfig";
import {loadingConfig} from "../config/loadingClassConfig";

//接口请求模型
export default abstract class RequestModel<ModelData extends object> extends BaseModel<ModelData> {

    //是否默认启用loading
    protected useLoading = loadingConfig.use;

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
        return <instanceTypeByKey[ReqType]>reqClass.setModel(this).setUseLoading(this.useLoading);
    }

    newFromReq<Mo extends RequestModel<ModelData> = RequestModel<any>, MD = Required<Mo["_dataType"]>>(
        Model: new () => Mo, data: any, call?: (inst: Mo & MD) => void
    ): Mo & MD {
        if (!data) {
            throw new Error(`模型数据有误:${data}`)
        }
        const model = <Mo & MD>(new Model()).proxyData();
        model.data = data;
        call && call(model);
        return model;
    }

}
