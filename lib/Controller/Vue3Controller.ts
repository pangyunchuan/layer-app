import {Ref} from "@vue/reactivity";
import {onBeforeUnmount, ref} from "vue";
import BaseController from "./BaseController";

export default class Vue3Controller extends BaseController {
    _type?: Ref<this>

    /**
     * 创建 ref 控制器变量
     */
    protected createManType(): Ref<this> {
        return <Ref<this>>ref(this)
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
