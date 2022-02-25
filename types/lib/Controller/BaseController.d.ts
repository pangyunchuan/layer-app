export default abstract class BaseController {
    /**
     * 控制器实例 map,按 classname 和 key 分类存放
     * @private
     */
    private static map;
    /**
     * 控制器实例管理
     * @param Controller  控制器class
     * @param key 控制器标记 默认 default
     * @protected
     */
    protected static baseUse<C extends typeof BaseController>(Controller: C, key?: string | number): any;
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
     * 创建响控制器管理对象,或响应式对象(如 vue3 ref)
     */
    protected abstract createRefInst(): any;
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
