import DemoRequest from "../packages/Request/DemoRequest";

let requestClassConfig = {
    default: DemoRequest,
    demo: DemoRequest
}

export function updateConfig(s: any) {
    requestClassConfig = s;
}

export type reqKeys = keyof typeof requestClassConfig

export type instanceTypeByKey = {
    [P in reqKeys]: InstanceType<(typeof requestClassConfig)[P]>
}

export default requestClassConfig;
