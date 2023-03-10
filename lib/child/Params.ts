/**
 * 参数管理类
 * 提供数据还原重置操作
 */
export default class Params<D extends Record<string | number, any>> {
    d: D;

    /**
     * @param f   数据获取方法，避免直接给数据时 引用 对重置等造成的干扰
     */
    constructor(f: () => D) {
        this.oriFun = f;
        this.d = f();
    }

    /**
     * 原始数据获取方法
     * @protected
     */
    protected oriFun: () => D

    /**
     * 设置自定义的重置方法，优先级最高,可覆盖创建时设置的原始值,且会立即执行
     * @param fun
     */
    protected _myResetCall?: () => Partial<D>
    set myResetCall(call: (() => Partial<D>) | undefined) {
        this._myResetCall = call;
        this.reset();
    }

    /**
     * 转换回调函数
     */
    protected _transformCall?: () => any
    /**
     * 设置如何转换数据，不转换时，原样返回
     * @param call
     */
    set transformCall(call: (() => any) | undefined) {
        this._transformCall = call;
    }

    /**
     * 转换方法，发送请求时需要的数据，比如创文件时，需要 FormData 对象
     */
    transform(): any {
        if (this._transformCall) {
            return this._transformCall()
        }
        return this.d
    }

    /**
     * 将数据重置还原
     */
    reset() {
        let mF: Partial<D> = (this._myResetCall ?? (() => ({})))();
        this.d = {
            ...this.oriFun(),
            ...mF
        }
    }
}
