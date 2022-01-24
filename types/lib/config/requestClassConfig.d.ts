import { requestClassMapType } from "root/modelConfig";
import LoadingRequest from "../Request/LoadingRequest";
export declare type reqKeys = keyof requestClassMapType;
export declare type instanceTypeByKey = {
    [P in reqKeys]: InstanceType<requestClassMapType[P]>;
};
export default function getRequestMap(): requestClassMapType;
export declare function setRequestMap(map: {
    [key: string]: new () => LoadingRequest;
}): void;
