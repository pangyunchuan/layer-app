import ElPlusLoading from "../lib/Loading/ElPlusLoading";
import VantToastLoading from "../lib/Loading/VantToastLoading";
import DemoRequest from "../lib/Request/DemoRequest";

export const loadingClassConfig = {
    default: ElPlusLoading,
    vantToast: VantToastLoading,
    elPlus: ElPlusLoading
}


export const requestClassConfig = {
    default: DemoRequest,
    demo: DemoRequest
}
