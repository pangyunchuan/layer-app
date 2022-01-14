import {requestClassConfig} from "root/modelConfig";

export type reqKeys = keyof requestClassConfig

export type instanceTypeByKey = {
    [P in reqKeys]: InstanceType<requestClassConfig[P]>
}

let requestMap: any = {}
export default function getRequestMap(): requestClassConfig {
    return requestMap;
}

export function setRequestMap(map: object) {
    requestMap = map
}
