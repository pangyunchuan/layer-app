import { requestClassConfig } from "root/modelConfig/modelConfig";
export declare type reqKeys = keyof typeof requestClassConfig;
export declare type instanceTypeByKey = {
    [P in reqKeys]: InstanceType<(typeof requestClassConfig)[P]>;
};
export default requestClassConfig;
