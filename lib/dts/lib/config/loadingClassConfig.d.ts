import ElPlusLoading from "../Loading/ElPlusLoading";
import VantToastLoading from "../Loading/VantToastLoading";
declare let loadingClassConfig: {
    default: typeof ElPlusLoading;
    vantToast: typeof VantToastLoading;
    elPlus: typeof ElPlusLoading;
};
export declare function setLoadingClassConfig(s: any): void;
export declare type loadingKeys = keyof typeof loadingClassConfig;
export declare type getLoadingInstanceByKey = {
    [K in loadingKeys]: InstanceType<(typeof loadingClassConfig)[K]>;
};
export declare type loadingOptionsType = {
    [K in loadingKeys]: getLoadingInstanceByKey[K]["_options"];
};
export default loadingClassConfig;
