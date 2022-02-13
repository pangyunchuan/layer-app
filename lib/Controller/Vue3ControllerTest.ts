import {Ref, UnwrapRef} from "@vue/reactivity";
import {onBeforeUnmount, ref} from "vue";
import Controller from "root/lib/Controller/Controller";

export default class Vue3ControllerTest extends Controller {


    // protected constructor() {
    // }
    //
    // protected static toRef<C extends Controller>(c: C):Ref<UnwrapRef<C>> {
    //     return ref(c)
    // }
    // toRef(type: 'vue3'): Ref<UnwrapRef<this>>;
    // toRef(type:'default' = 'default'):ReactiveControllerType<this> {
    //     return <ReactiveControllerType<this>>{value: this}
    // }
    toRef():Ref<UnwrapRef<this>> {
        return <Ref<UnwrapRef<this>>>ref(this)
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
            delete Vue3ControllerTest.map[classname][key];
        });
    }

    // /**
    //  * 销毁自身(暂时无用)
    //  */
    // destroy() {
    //     delete VmVue3.map[this.constructor.name][this.key];
    // }
}

Vue3ControllerTest.findOrCreate().value
