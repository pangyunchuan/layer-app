import { Ref, UnwrapRef } from "@vue/reactivity";
import BaseController from "./BaseController";
export default class Vue3Controller extends BaseController {
    /**
     * 使用或新建指定控制器
     * @param key
     */
    static use<C extends BaseController>(this: new () => C, key?: string | number): Ref<UnwrapRef<C>>;
    protected createRefInst(): Ref<UnwrapRef<this>>;
    /***
     * 组件销毁前，从管理列表销毁组件引用，vue3 setup 快捷写法。
     * 应该保证只在主页面使用destroy,或其他确定不会影响正在使用的controller地方。
     */
    destroyOnBeforeUnmount(): void;
}
