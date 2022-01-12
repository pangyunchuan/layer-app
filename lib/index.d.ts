import RequestModel from "./dts/lib/packages/Models/RequestModel";
import BaseLoading from "./dts/lib/packages/Loading/BaseLoading";
import LoadingRequest from "./dts/lib/packages/Request/LoadingRequest";
import {updateConfig as setLoadingClassConfig} from "./dts/lib/config/requestClassConfig";
import {updateConfig as setRequestClassConfig} from "./dts/lib/config/loadingClassConfig";


export {
    RequestModel,
    BaseLoading,
    LoadingRequest,
    setLoadingClassConfig,
    setRequestClassConfig
}
