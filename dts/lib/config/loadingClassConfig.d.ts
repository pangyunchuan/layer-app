declare let base: {
    default: typeof import("../Loading/ElPlusLoading").default;
    vantToast: typeof import("../Loading/VantToastLoading").default;
    elPlus: typeof import("../Loading/ElPlusLoading").default;
};
export declare type loadingKeys = keyof typeof base;
export declare type getLoadingInstanceByKey = {
    [K in loadingKeys]: InstanceType<(typeof base)[K]>;
};
export declare type loadingOptionsType = {
    [K in loadingKeys]: getLoadingInstanceByKey[K]["_options"];
};
export default base;
