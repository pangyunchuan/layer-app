import ElPlusLoading from "web-orm/example/ElPlusLoading";
import VantToastLoading from "web-orm/example/VantToastLoading";
import DemoRequest from "web-orm/example/DemoRequest";
import {setLoadingMap, setRequestMap, setLoadingConfig} from "web-orm";


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
// setLoadingConfig({use: true})
export type loadingClassConfig = typeof loadingClassMap
export type requestClassConfig = typeof requestClassMap
