import DemoRequest from "@/packages/Request/DemoRequest";

const defaultConfig = {
    default: DemoRequest,
    demo: DemoRequest
};
let userConfig = {}

const requestClassConfig = {...defaultConfig, ...userConfig}

export function updateConfig(s: any) {
    userConfig = s;
}

export type reqKeys = keyof typeof requestClassConfig

export type instanceTypeByKey = {
    [P in reqKeys]: InstanceType<(typeof requestClassConfig)[P]>
}

export default requestClassConfig;
