import RequestModel from "./packages/Models/RequestModel";
import LoadingRequest from "./packages/Request/LoadingRequest";
import {updateConfig as setLoadingClassConfig} from "./config/loadingClassConfig";
import {updateConfig as setRequestClassConfig} from "./config/requestClassConfig";
import BaseLoading from "./packages/Loading/BaseLoading";


// const fs = require('fs')
// if (!fs.existsSync("./src/modelConfig/loadingClassConfig.ts")) {
//     fs.copyFileSync("reqorm/src/model/config/loadingClassConfig.ts", "./src/modelConfig/loadingClassConfig.ts");
// }
// if (!fs.existsSync("./src/modelConfig/requestClassConfig.ts")) {
//     fs.copyFileSync("reqorm/src/model/config/requestClassConfig.ts", "./src/modelConfig/requestClassConfig.ts");
// }

export {
    BaseLoading,
    RequestModel,
    LoadingRequest,
    setLoadingClassConfig,
    setRequestClassConfig
}
