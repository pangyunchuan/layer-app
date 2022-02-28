export default abstract class BaseModel<ModelData extends object = {}> {
    /**
     * 模型数据类型，只用于获取类型，无用途
     */
    _data?: ModelData;
    /**
     * 模型数据
     * @protected
     */
    protected abstract data: ModelData;
    /**
     * 模型主键
     * @protected
     */
    protected primaryKey: string;
    private isProxyData;
    /**
     * 创建一个代理模型数据的模型实例
     * @param data 模型数据
     * @param call
     */
    static createModel<M extends BaseModel, Da extends Partial<NonNullable<M['_data']>> = NonNullable<M['_data']>>(this: new () => M, data?: Da, call?: (model: M & Da) => void): M & Da;
    /**
     * 创建一个代理模型数据的模型实例
     * @param data 模型数据
     * @param call  模型建立后回调
     * @param newInst  是否新建模型
     */
    createModel<Da extends Partial<ModelData> = ModelData>(data?: Da, call?: (model: this & Da) => void, newInst?: boolean): this & Da;
    /**
     * 代理模型数据 data，让模型实例可以直接访问
     * @protected
     */
    protected proxyData<MD extends Partial<ModelData> = ModelData>(): this & MD;
}
