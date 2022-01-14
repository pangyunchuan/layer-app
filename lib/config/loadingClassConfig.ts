import {loadingClassConfig} from "root/modelConfig/modelConfig";

let base = {...loadingClassConfig}

export type loadingKeys = keyof typeof base

export type getLoadingInstanceByKey = {
    [K in loadingKeys]: InstanceType<(typeof base)[K]>
}

export type loadingOptionsType = {
    [K in loadingKeys]: getLoadingInstanceByKey[K]["_options"]
}
export default base;
