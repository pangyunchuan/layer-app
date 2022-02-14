import { Ref, UnwrapRef } from "@vue/reactivity";
export default class Vue3Controller {
    /**
     * vm map,按 classname 和 key 分类存放
     * @private
     */
    private static map;
    /**
     * 创建视图模型
     * @param key  视图模型标记 默认 default
     */
    static findOrCreate<C extends Vue3Controller>(this: new () => C, key?: string | number): Ref<UnwrapRef<C>>;
    /**
     * 模型 标记 key
     * @private
     */
    private key;
    /**
     * 是否设置销毁
     * @private
     */
    private isSetDestroy;
    /**
     * 重置vm
     */
    reset(): void;
    /***
     * 设置自身跟随组件一起销毁，仅跟随第一个设置的组件
     */
    setDestroy(): void;
}
