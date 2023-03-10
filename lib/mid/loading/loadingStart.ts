import Loading from "../../child/Loading";
import ApiModel, {ApiRequestMid} from "../../ApiModel";

export default <ApiRequestMid>async function (this:ApiModel, r) {
    if (typeof this.loading === 'boolean') {
        this.loading = true;
    } else if (this.loading instanceof Loading) {
        this.loading.start()
    }
    return r;
}
