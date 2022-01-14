import { loadingClassConfig } from "root/modelConfig/modelConfigType";
export declare type loadingKeys = keyof loadingClassConfig;
export declare type getLoadingInstanceByKey = {
    [K in loadingKeys]: InstanceType<loadingClassConfig[K]>;
};
export declare type loadingOptionsType = {
    [K in loadingKeys]: getLoadingInstanceByKey[K]["_options"];
};
export default function getLoadingMap(): loadingClassConfig;
export declare function setLoadingMap(map: any): void;
