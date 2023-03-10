import Loading from "../../child/Loading";
import ApiModel, {ApiRequestErrMid, ApiResponseErrMid, ApiResponseMid} from "../../ApiModel";

export default <ApiRequestErrMid | ApiResponseMid | ApiResponseErrMid>async function (this: ApiModel, r: any) {
    if (typeof this.loading === 'boolean') {
        this.loading = false;
    } else if (this.loading instanceof Loading) {
        this.loading.close()
    }
    return r;
}
