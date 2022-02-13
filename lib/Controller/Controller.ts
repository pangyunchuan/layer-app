import {Ref, UnwrapRef} from "@vue/reactivity";

interface Rea<C extends Controller = Controller> {
    value: C
}


export default class Controller {
    /**
     * vm map,按 classname 和 key 分类存放
     * @private
     */
    protected static map: Record<string, Record<string | number, Rea>> = {};

    // protected constructor() {
    // }

    /**
     * 创建视图模型
     * @param key  视图模型标记 默认 default
     */

    static findOrCreate<C extends Controller>(
        this: new() => C,
        key: string | number = "default"
    ): ReturnType<C['toRef']> {
        Controller.map[this.name] = Controller.map[this.name] ?? {};
        Controller.map[this.name][key] = Controller.map[this.name][key] ?? new this().toRef();
        const controller = <C>Controller.map[this.name][key].value;
        controller.key = key;
        return <ReturnType<C['toRef']>>Controller.map[this.name][key];
    }

    // toRef(type:'default'):ReactiveControllerType<this>;
    // toRef(type: 'vue3'): Ref<UnwrapRef<this>>;
    toRef(): Rea<this> | Ref<UnwrapRef<this>> {
        return {value: this}
    }

    /**
     * 模型 标记 key
     * @private
     */
    protected key: string | number = "default";
    /**
     * 是否设置销毁
     * @private
     */
    protected isSetDestroy = false;


    /**
     * 重置vm
     */
    reset() {
        const newController: this = new (<any>this.constructor)();
        newController.key = this.key;
        newController.isSetDestroy = this.isSetDestroy;
        Controller.map[this.constructor.name][this.key].value = newController;
    }

    // /***
    //  * 设置自身跟随组件一起销毁，仅跟随第一个设置的组件
    //  */
    // setDestroy() {
    //     if (this.isSetDestroy) {
    //         return;
    //     }
    //     this.isSetDestroy = true;
    //     const key = this.key;
    //     const classname = this.constructor.name;
    //     onBeforeUnmount(() => {
    //         delete Controller.map[classname][key];
    //     });
    // }

    // /**
    //  * 销毁自身(暂时无用)
    //  */
    // destroy() {
    //     delete VmVue3.map[this.constructor.name][this.key];
    // }
}

// Controller.findOrCreate().value
