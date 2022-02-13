import {Ref, UnwrapRef} from "@vue/reactivity";
import {onBeforeUnmount, ref} from "vue";

export default class Vue3Controller {
    /**
     * vm map,按 classname 和 key 分类存放
     * @private
     */
    private static map: Record<string, Record<string | number, Ref<UnwrapRef<Vue3Controller>>>> = {};

    // protected constructor() {
    // }

    /**
     * 创建视图模型
     * @param key  视图模型标记 默认 default
     */
    static findOrCreate<C extends Vue3Controller>(
        this: new() => C,
        key: string | number = "default"
    ): Ref<UnwrapRef<C>> {
        Vue3Controller.map[this.name] = Vue3Controller.map[this.name] ?? {};
        Vue3Controller.map[this.name][key] = Vue3Controller.map[this.name][key] ?? ref(new this);
        const controller = <C>Vue3Controller.map[this.name][key].value;
        controller.key = key;
        return <Ref<UnwrapRef<C>>>Vue3Controller.map[this.name][key];
    }

    /**
     * 模型 标记 key
     * @private
     */
    private key: string | number = "default";
    /**
     * 是否设置销毁
     * @private
     */
    private isSetDestroy = false;


    /**
     * 重置vm
     */
    reset() {
        const newController: this = new (<any>this.constructor)();
        newController.key = this.key;
        newController.isSetDestroy = this.isSetDestroy;
        Vue3Controller.map[this.constructor.name][this.key].value = newController;
    }

    /***
     * 设置自身跟随组件一起销毁，仅跟随第一个设置的组件
     */
    setDestroy() {
        if (this.isSetDestroy) {
            return;
        }
        this.isSetDestroy = true;
        const key = this.key;
        const classname = this.constructor.name;
        onBeforeUnmount(() => {
            delete Vue3Controller.map[classname][key];
        });
    }

    // /**
    //  * 销毁自身(暂时无用)
    //  */
    // destroy() {
    //     delete VmVue3.map[this.constructor.name][this.key];
    // }
}
