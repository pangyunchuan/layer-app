import {requestClassConfig} from "root/modelConfig/modelConfig";


let base = {...requestClassConfig}

export type reqKeys = keyof typeof base

export type instanceTypeByKey = {
    [P in reqKeys]: InstanceType<(typeof base)[P]>
}

export default base;
