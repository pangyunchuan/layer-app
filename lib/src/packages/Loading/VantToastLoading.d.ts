import BaseLoading from "@/packages/Loading/BaseLoading";
import { ToastOptions } from "vant";
import { ComponentInstance } from "vant/es/utils";
export default class VantToastLoading extends BaseLoading<ToastOptions, ComponentInstance> {
    protected getIsFull(): boolean;
    protected buildLoading(): ComponentInstance;
    protected closeLoading(inst?: ComponentInstance): void;
    protected upText(text: string, inst: ComponentInstance): void;
}
