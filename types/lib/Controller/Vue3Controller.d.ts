import { Ref, UnwrapRef } from "@vue/reactivity";
import BaseController from "./BaseController";
declare type Vue3RefController = Ref<UnwrapRef<Vue3Controller>>;
export default class Vue3Controller extends BaseController<Vue3RefController> {
    /**
     * 创建 ref 控制器变量
     */
    protected createManType(): Vue3RefController;
    /***
     * 组件销毁前，从管理列表销毁组件引用，vue3 setup 快捷写法,同 destroy 一样谨慎使用。
     */
    destroyOnBeforeUnmount(): void;
}
export {};
