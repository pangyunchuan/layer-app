import ElPlusLoading from "reqorm/lib/Loading/ElPlusLoading";
import VantToastLoading from "reqorm/lib/Loading/VantToastLoading";
import DemoRequest from "reqorm/lib/Request/DemoRequest";

export const loadingClassConfig = {
    default: ElPlusLoading,
    vantToast: VantToastLoading,
    elPlus: ElPlusLoading
}


export const requestClassConfig = {
    default: DemoRequest,
    demo: DemoRequest
}
