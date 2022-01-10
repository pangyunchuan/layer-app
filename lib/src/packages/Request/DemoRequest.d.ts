import LoadingRequest from "@/packages/Request/LoadingRequest";
export default class DemoRequest extends LoadingRequest {
    protected requestHandle(): void;
    protected responseHandle(): any;
    protected errorHandle(): unknown;
}
