import ElPlusLoading from "reqorm/demo/ElPlusLoading";
import VantToastLoading from "root/demo/VantToastLoading";
import DemoRequest from "root/demo/DemoRequest";


export type loadingClassConfig = {
    default: typeof ElPlusLoading,
    vantToast: typeof VantToastLoading,
    elPlus: typeof ElPlusLoading
}

export type requestClassConfig = {
    default: typeof DemoRequest,
    demo: typeof DemoRequest
}

// export const loadingClassConfig = {
//     default: ElPlusLoading,
//     vantToast: VantToastLoading,
//     elPlus: ElPlusLoading
// }
//
//
// export const requestClassConfig = {
//     default: DemoRequest,
//     demo: DemoRequest
// }
