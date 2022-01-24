import {requestClassMapType} from "root/modelConfig";
import LoadingRequest from "../Request/LoadingRequest";

export type reqKeys = keyof requestClassMapType

export type instanceTypeByKey = {
    [P in reqKeys]: InstanceType<requestClassMapType[P]>
}

let requestMap: any = {}
export default function getRequestMap(): requestClassMapType {
    return requestMap;
}

export function setRequestMap(map: { [key: string]: new () => LoadingRequest }) {
    requestMap = map
}
