import {loadingClassConfig} from "root/modelConfig/modelConfig";

export type loadingKeys = keyof typeof loadingClassConfig

export type getLoadingInstanceByKey = {
    [K in loadingKeys]: InstanceType<(typeof loadingClassConfig)[K]>
}

export type loadingOptionsType = {
    [K in loadingKeys]: getLoadingInstanceByKey[K]["_options"]
}
export default loadingClassConfig;
