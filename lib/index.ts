// import Controller from "./Controller/Controller";
// import Vue3Controller from "./Controller/Vue3Controller";
import RequestModel from "./Models/RequestModel";
import LoadingRequest from "./Request/LoadingRequest";
import BaseLoading from "./Loading/BaseLoading";
import {setLoadingMap, setLoadingConfig} from "./config/loadingClassConfig";
import {setRequestMap} from "./config/requestClassConfig";
import BaseRequest from "./Request/BaseRequest";
import Page from "./Page/Page";
import PageVue3 from "./Page/PageVue3";

export {
    Page,
    PageVue3,
    // Controller,
    // Vue3Controller,
    BaseLoading,
    BaseRequest,
    LoadingRequest,
    RequestModel,
    setLoadingMap,
    setLoadingConfig,
    setRequestMap,

}
