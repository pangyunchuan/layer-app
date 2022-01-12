import DemoRequest from "lib/packages/Request/DemoRequest";
declare let requestClassConfig: {
    default: typeof DemoRequest;
    demo: typeof DemoRequest;
};
export declare function updateConfig(s: any): void;
export declare type reqKeys = keyof typeof requestClassConfig;
export declare type instanceTypeByKey = {
    [P in reqKeys]: InstanceType<(typeof requestClassConfig)[P]>;
};
export default requestClassConfig;
