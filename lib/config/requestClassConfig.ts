import {requestClassConfig} from "root/modelConfig/modelConfig";

export type reqKeys = keyof typeof requestClassConfig

export type instanceTypeByKey = {
    [P in reqKeys]: InstanceType<(typeof requestClassConfig)[P]>
}

export default requestClassConfig;
