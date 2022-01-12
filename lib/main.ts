import RequestModel from "./Models/RequestModel";
import LoadingRequest from "./Request/LoadingRequest";
import {setLoadingClassConfig} from "./config/loadingClassConfig";
import {setRequestClassConfig} from "./config/requestClassConfig";
import BaseLoading from "./Loading/BaseLoading";


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
