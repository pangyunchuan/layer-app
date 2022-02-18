export default abstract class BaseController<ManType extends {
    value: any;
}> {
    /**
     * 控制器实例 map,按 classname 和 key 分类存放
     * @private
     */
    private static map;
    /**
     * 使用指定控制器
     * @param key  视图模型标记 默认 default
     */
    static useController<C extends BaseController<any>>(this: new () => C, key?: string | number): NonNullable<C["_type"]>;
    /**
     * 模型 标记 key
     * @private
     */
    protected key: string | number;
    /**
     * 是否设置销毁
     * @private
     */
    protected isSetDestroy: boolean;
    /**
     * 类型提示,无用
     */
    _type?: ManType;
    /**
     * 创建响控制器管理对象,或响应式对象(如 vue3 ref)
     */
    protected abstract createManType(): ManType;
    private static resetCallList;
    /**
     * 设置 重置回调函数
     * @param call
     */
    setResetCall(call: () => void): void;
    /**
     * 重置 控制器
     */
    reset(): void;
    /**
     * 从管理列表中清除当前组件，
     * 这意味着，再次使用use将会得到一个新的controller,
     * 应请谨慎使用
     * 应该保证只在主页面使用destroy,或其他确定不会影响正在使用的controller地方。
     */
    destroy(): void;
}
