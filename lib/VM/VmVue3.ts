import {Ref, UnwrapRef} from "@vue/reactivity";
import {onBeforeUnmount, ref} from "vue";

export default class VmVue3 {
    /**
     * vm map,按 classname 和 key 分类存放
     * @private
     */
    private static map: Record<string, Record<string | number, Ref<UnwrapRef<VmVue3>>>> = {};

    /**
     * 创建视图模型
     * @param key   视图模型标记 默认 default
     * @param destroy   与主视图(初次实例的视图)一起销毁
     */
    static create<VM extends VmVue3>(
        this: new() => VM,
        key: string | number = "default",
        destroy = true
    ): Ref<UnwrapRef<VM>> {
        VmVue3.map[this.name] = VmVue3.map[this.name] ?? {};
        VmVue3.map[this.name][key] = VmVue3.map[this.name][key] ?? ref(new this);
        const vm = <VM>VmVue3.map[this.name][key].value;
        vm.key = key;
        vm.setDestroy(key, destroy);
        return <Ref<UnwrapRef<VM>>>VmVue3.map[this.name][key];
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
    private isDestroy = false;


    /**
     * 重置vm
     */
    reset() {
        const newVm: this = new (<any>this.constructor)();
        newVm.key = this.key;
        newVm.isDestroy = this.isDestroy;
        VmVue3.map[this.constructor.name][this.key].value = newVm;
    }

    /***
     * 设置销毁自身
     * @param key
     * @param destroy
     * @private
     */
    private setDestroy(key: string | number, destroy: boolean) {
        if (this.isDestroy || !destroy) {
            return;
        }
        this.isDestroy = true;
        const classname = this.constructor.name;
        onBeforeUnmount(() => {
            delete VmVue3.map[classname][key];
        });
    }

    // /**
    //  * 销毁自身(暂时无用)
    //  */
    // destroy() {
    //     delete VmVue3.map[this.constructor.name][this.key];
    // }
}
