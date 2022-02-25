import {Ref, UnwrapRef} from "@vue/reactivity";
import {onBeforeUnmount, ref} from "vue";
import BaseController from "./BaseController";

export default class Vue3Controller extends BaseController {

    /**
     * 使用或新建指定控制器
     * @param key
     */
    static use<C extends BaseController>(
        this: new () => C,
        key: string | number = "default"
    ): Ref<UnwrapRef<C>> {
        return BaseController.baseUse(<any>this, key);
    }

    protected createRefInst(): Ref<UnwrapRef<this>> {
        return ref(this)
    }

    /***
     * 组件销毁前，从管理列表销毁组件引用，vue3 setup 快捷写法。
     * 应该保证只在主页面使用destroy,或其他确定不会影响正在使用的controller地方。
     */
    destroyOnBeforeUnmount() {
        onBeforeUnmount(() => {
            this.destroy()
        });
    }
}
