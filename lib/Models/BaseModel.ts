export default abstract class BaseModel<D extends object = {}> {
    /**
     * 模型数据
     */
    abstract data: D;

    /**
     * 创建一个代理模型数据的模型实例
     * @param data 模型数据
     */
    static create<M extends BaseModel>(
        this: new () => M, data?: Partial<M["data"]>
    ): M {
        return new this().create(data)
    }

    /**
     * 创建一个代理模型数据的模型实例
     * @param data 模型数据
     * @param newInst  是否新建模型
     */
    create(data?: Partial<D>, newInst = true): this {
        const self = newInst ? <this>new (<any>this.constructor)() : this;
        data && Object.assign(self.data,data)
        self.init()
        return self
    }

    /**
     * 模型初始化函数,会被createModel 调用
     * @protected
     */
    protected init() {

    }
}
