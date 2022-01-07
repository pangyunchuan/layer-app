import RequestModel from "../src/packages/Models/RequestModel";
import BaseModel from "../src/packages/Models/BaseModel";
import LoadingRequest from "../src/packages/Request/LoadingRequest";
import {updateConfig as setLoadingClassConfig,getLoadingInstanceByKey,loadingOptionsType} from "../src/model/config/loadingClassConfig";
import {updateConfig as setRequestClassConfig} from "../src/model/config/requestClassConfig";


// const fs = require('fs')
// if (!fs.existsSync("./src/modelConfig/loadingClassConfig.ts")) {
//     fs.copyFileSync("reqorm/src/model/config/loadingClassConfig.ts", "./src/modelConfig/loadingClassConfig.ts");
// }
// if (!fs.existsSync("./src/modelConfig/requestClassConfig.ts")) {
//     fs.copyFileSync("reqorm/src/model/config/requestClassConfig.ts", "./src/modelConfig/requestClassConfig.ts");
// }

export {
    RequestModel,
    BaseModel,
    LoadingRequest,
    setLoadingClassConfig,
    setRequestClassConfig
}
