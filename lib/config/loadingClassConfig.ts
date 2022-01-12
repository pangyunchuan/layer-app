import ElPlusLoading from "../../lib/packages/Loading/ElPlusLoading";
import VantToastLoading from "../../lib/packages/Loading/VantToastLoading";


let loadingClassConfig = {
    default: ElPlusLoading,
    vantToast: VantToastLoading,
    elPlus: ElPlusLoading
}

export function updateConfig(s: any) {
    loadingClassConfig = s;
}

//使用配置文件
(new ElPlusLoading()).setDefaultConfig({
    target: 'body',
    text: '加载中',
    // lock: true,
    spinner: "el-icon-loading",
    // background: "transparent"
    background: "rgba(50, 50, 50, 0.5)"
})

export type loadingKeys = keyof typeof loadingClassConfig

export type getLoadingInstanceByKey = {
    [K in loadingKeys]: InstanceType<(typeof loadingClassConfig)[K]>
}

export type loadingOptionsType = {
    [K in loadingKeys]: getLoadingInstanceByKey[K]["_options"]
}
export default loadingClassConfig;
