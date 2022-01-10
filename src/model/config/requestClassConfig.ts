import DemoRequest from "@/packages/Request/DemoRequest";
import loadingClassConfig from "@/model/config/loadingClassConfig";

const defaultConfig = {
    default: DemoRequest,
    demo: DemoRequest
};
let userConfig = {}

let requestClassConfig = {...defaultConfig, ...userConfig}

export function updateConfig(s: any) {
    userConfig = s;
    Object.assign(loadingClassConfig,defaultConfig,userConfig)
}

export type reqKeys = keyof typeof requestClassConfig

export type instanceTypeByKey = {
    [P in reqKeys]: InstanceType<(typeof requestClassConfig)[P]>
}

export default requestClassConfig;
