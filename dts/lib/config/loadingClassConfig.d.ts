import { loadingClassConfig } from "root/modelConfig/modelConfig";
export declare type loadingKeys = keyof typeof loadingClassConfig;
export declare type getLoadingInstanceByKey = {
    [K in loadingKeys]: InstanceType<(typeof loadingClassConfig)[K]>;
};
export declare type loadingOptionsType = {
    [K in loadingKeys]: getLoadingInstanceByKey[K]["_options"];
};
export default loadingClassConfig;
