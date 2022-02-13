import { loadingClassMapType } from "root/layerAppStart";
import BaseLoading from "../Loading/BaseLoading";
export declare type loadingKeys = keyof loadingClassMapType;
export declare type getLoadingInstanceByKey = {
    [K in loadingKeys]: InstanceType<loadingClassMapType[K]>;
};
export declare type loadingOptionsType = {
    [K in loadingKeys]: getLoadingInstanceByKey[K]["_options"];
};
export default function getLoadingMap(): loadingClassMapType;
export declare function setLoadingMap(map: {
    [key: string]: new () => BaseLoading<any, any>;
}): void;
declare let loadingConfig: {
    use: boolean;
};
export { loadingConfig };
export declare function setLoadingConfig(config: Partial<typeof loadingConfig>): void;
