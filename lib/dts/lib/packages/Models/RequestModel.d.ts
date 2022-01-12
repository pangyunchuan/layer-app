import BaseModel from "./BaseModel";
import { instanceTypeByKey, reqKeys } from "../../config/requestClassConfig";
export default abstract class RequestModel<ModelData extends object> extends BaseModel<ModelData> {
    protected defaultUseLoading: boolean;
    protected static newReq<Child extends RequestModel<any>, ReqType extends reqKeys = "default">(this: new () => Child, reqType?: ReqType): instanceTypeByKey[ReqType];
    protected newReq<ReqType extends reqKeys = "default">(reqType?: ReqType): instanceTypeByKey[ReqType];
    newFromReq<Mo extends RequestModel<ModelData> = RequestModel<any>, MD = Required<Mo["_dataType"]>>(Model: new () => Mo, data: any, call?: (inst: Mo) => void): Mo & MD;
}
