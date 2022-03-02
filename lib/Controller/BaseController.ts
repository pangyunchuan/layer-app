export default abstract class BaseController {
    /**
     * 控制器实例 map,按 classname 和 key 分类存放
     * @private
     */
    private static map: Record<string, Record<string | number, any>> = {};

    /**
     * 控制器实例管理
     * @param Controller  控制器class
     * @param key 控制器标记 默认 default
     * @protected
     */
    protected static baseUse<C extends typeof BaseController>(
        Controller: C,
        key: string | number = "default"
    ) {
        const name = Controller.name;
        BaseController.map[name] = BaseController.map[name] ?? {};
        BaseController.map[name][key] = BaseController.map[name][key]
            ?? (<BaseController>new (<any>Controller)()).createRefInst();
        const controller = <BaseController>BaseController.map[name][key].value;
        controller.key = key;
        return BaseController.map[name][key];
    }

    /**
     * 模型 标记 key
     * @private
     */
    protected key: string | number = "default"
    /**
     * 是否设置销毁
     * @private
     */
    protected isSetDestroy = false;

    /**
     * 创建响控制器管理对象,或响应式对象(如 vue3 ref)
     */
    protected abstract createRefInst(): any


    private static resetCallList: Record<string, Record<string | number, (() => void)[]>> = {};

    /**
     * 设置 重置回调函数
     * @param call
     */
    setResetCall(call: () => void) {
        const name = this.constructor.name
        const key = this.key
        BaseController.resetCallList[name] = BaseController.resetCallList[name] ?? {};
        BaseController.resetCallList[name][key] = BaseController.resetCallList[name][key] || []
        BaseController.resetCallList[name][key].push(call)
    }


    /**
     * 重置 控制器
     */
    reset() {
        const name = this.constructor.name;
        const key = this.key;
        const isSetDestroy = this.isSetDestroy;
        const newController: this = new (<any>this.constructor)();
        newController.key = key;
        newController.isSetDestroy = isSetDestroy;
        BaseController.map[name][key].value = newController;

        const cMap = BaseController.resetCallList[name]
        if (cMap && cMap[key] && Array.isArray(cMap[key])) {
            for (const resetCall of cMap[key]) {
                resetCall();
            }
        }
    }

    /**
     * 从管理列表中清除当前组件，
     * 这意味着，再次使用use将会得到一个新的controller,
     * 应请谨慎使用
     * 应该保证只在主页面使用destroy,或其他确定不会影响正在使用的controller地方。
     */
    destroy() {
        const name = this.constructor.name;
        const key = this.key;

        //清除实例管理
        const controllerMap =  BaseController.map[name] ?? {};
        delete controllerMap[key];
        if (!Object.keys(controllerMap).length) {
            delete BaseController.map[name];
        }

        //清除 call list
        const controllerResetCallMap = BaseController.resetCallList[name] ?? {};
        delete controllerResetCallMap[key];
        if (!Object.keys(controllerResetCallMap).length) {
            delete BaseController.resetCallList[name];
        }
    }
}
