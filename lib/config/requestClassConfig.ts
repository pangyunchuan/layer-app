import DemoRequest from "../Request/DemoRequest";

let requestClassConfig = {
    default: DemoRequest,
    demo: DemoRequest
}

export function setRequestClassConfig(s: any) {
    Object.assign(requestClassConfig, s)
}

export type reqKeys = keyof typeof requestClassConfig

export type instanceTypeByKey = {
    [P in reqKeys]: InstanceType<(typeof requestClassConfig)[P]>
}

export default requestClassConfig;
