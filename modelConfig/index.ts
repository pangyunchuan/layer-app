import ElPlusLoading from "reqorm/example/ElPlusLoading";
import VantToastLoading from "reqorm/example/VantToastLoading";
import DemoRequest from "reqorm/example/DemoRequest";
import {setLoadingMap, setRequestMap} from "reqorm";


const loadingClassMap = {
    "default": ElPlusLoading,
    "vantToast": VantToastLoading,
    "elPlus": ElPlusLoading
}


const requestClassMap = {
    "default": DemoRequest,
    "demo": DemoRequest
}



setLoadingMap(loadingClassMap)
setRequestMap(requestClassMap)
export type loadingClassConfig = typeof loadingClassMap
export type requestClassConfig = typeof requestClassMap
