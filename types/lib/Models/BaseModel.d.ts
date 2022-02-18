export default abstract class BaseModel<ModelData extends object = {}> {
    /**
     * 获取类型,未使用
     */
    _data?: ModelData;
    protected abstract data: ModelData;
    private isProxyData;
    /**
     * 创建模型
     * @param data
     * @param call
     */
    static createModel<M extends BaseModel, Da extends NonNullable<M['_data']> = NonNullable<M['_data']>>(this: new () => M, data?: Da, call?: (model: M & Da) => void): M & Da;
    /**
     * 创建模型
     * @param data
     * @param call
     */
    createModel<Da extends ModelData>(data?: Da, call?: (model: this & Da) => void): this & Da;
    protected proxyData<MD = ModelData>(): this & MD;
}
