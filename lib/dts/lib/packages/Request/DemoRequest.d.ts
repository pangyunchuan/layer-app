import LoadingRequest from "./LoadingRequest";
export default class DemoRequest extends LoadingRequest {
    protected requestHandle(): void;
    protected responseHandle(): any;
    protected errorHandle(): unknown;
}
