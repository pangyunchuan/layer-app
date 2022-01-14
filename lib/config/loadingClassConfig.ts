import {loadingClassConfig} from "root/modelConfig";

export type loadingKeys = keyof loadingClassConfig

export type getLoadingInstanceByKey = {
    [K in loadingKeys]: InstanceType<loadingClassConfig[K]>
}

export type loadingOptionsType = {
    [K in loadingKeys]: getLoadingInstanceByKey[K]["_options"]
}

let loadingMap: any = {}
export default function getLoadingMap(): loadingClassConfig {
    return loadingMap;
}

export function setLoadingMap(map: object) {
    loadingMap = map
}
