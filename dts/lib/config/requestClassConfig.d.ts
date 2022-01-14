import { requestClassConfig } from "root/modelConfig/modelConfigType";
export declare type reqKeys = keyof requestClassConfig;
export declare type instanceTypeByKey = {
    [P in reqKeys]: InstanceType<requestClassConfig[P]>;
};
export default function getRequestMap(): requestClassConfig;
export declare function setRequestMap(map: any): void;
