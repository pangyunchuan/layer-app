import { loadingClassConfig } from "root/modelConfig";
import BaseLoading from "../Loading/BaseLoading";
export declare type loadingKeys = keyof loadingClassConfig;
export declare type getLoadingInstanceByKey = {
    [K in loadingKeys]: InstanceType<loadingClassConfig[K]>;
};
export declare type loadingOptionsType = {
    [K in loadingKeys]: getLoadingInstanceByKey[K]["_options"];
};
export default function getLoadingMap(): loadingClassConfig;
export declare function setLoadingMap(map: {
    [key: string]: new () => BaseLoading<any, any>;
}): void;
declare let loadingConfig: {
    use: boolean;
};
export { loadingConfig };
export declare function setLoadingConfig(config: Partial<typeof loadingConfig>): void;
