import {loadingClassMapType} from "root/modelConfig";
import BaseLoading from "../Loading/BaseLoading";

export type loadingKeys = keyof loadingClassMapType

export type getLoadingInstanceByKey = {
    [K in loadingKeys]: InstanceType<loadingClassMapType[K]>
}

export type loadingOptionsType = {
    [K in loadingKeys]: getLoadingInstanceByKey[K]["_options"]
}

let loadingMap: any = {}
export default function getLoadingMap(): loadingClassMapType {
    return loadingMap;
}

export function setLoadingMap(map: { [key: string]: new () => BaseLoading<any, any> }) {
    loadingMap = map
}

let loadingConfig = {
    use: true
}

export {loadingConfig}

export function setLoadingConfig(config: Partial<typeof loadingConfig>) {
    loadingConfig = {...loadingConfig, ...config}
}
