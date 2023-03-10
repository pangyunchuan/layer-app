/**
 * 参数管理类
 * 提供数据还原重置操作
 */
export default class Params<D extends Record<string | number, any>> {
    d: D;
    /**
     * @param f   数据获取方法，避免直接给数据时 引用 对重置等造成的干扰
     */
    constructor(f: () => D);
    /**
     * 原始数据获取方法
     * @protected
     */
    protected oriFun: () => D;
    /**
     * 设置自定义的重置方法，优先级最高,可覆盖创建时设置的原始值,且会立即执行
     * @param fun
     */
    protected _myResetCall?: () => Partial<D>;
    set myResetCall(call: (() => Partial<D>) | undefined);
    /**
     * 转换回调函数
     */
    protected _transformCall?: () => any;
    /**
     * 设置如何转换数据，不转换时，原样返回
     * @param call
     */
    set transformCall(call: (() => any) | undefined);
    /**
     * 转换方法，发送请求时需要的数据，比如创文件时，需要 FormData 对象
     */
    transform(): any;
    /**
     * 将数据重置还原
     */
    reset(): void;
}
