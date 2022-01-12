import BaseLoading from "./BaseLoading";
import { ILoadingInstance, ILoadingOptions } from "element-plus/packages/components/loading/src/loading.type";
export default class ElPlusLoading extends BaseLoading<ILoadingOptions, ILoadingInstance> {
    protected getIsFull(): boolean;
    protected buildLoading(): ILoadingInstance;
    protected closeLoading(inst?: ILoadingInstance): void;
    protected upText(text: string, inst?: ILoadingInstance): void;
}
