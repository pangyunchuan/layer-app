import ElPlusLoading from "reqorm/demo/ElPlusLoading";
import VantToastLoading from "reqorm/demo/VantToastLoading";
import DemoRequest from "reqorm/demo/DemoRequest";
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
