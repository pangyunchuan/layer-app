export default abstract class BaseModel<ModelData extends object = {}> {
    /**
     * 模型数据类型，只用于获取类型，无用途
     */
    _data?: ModelData;

    // protected abstract table: string
    //
    // protected abstract getTable(): string

    /**
     * 模型数据
     * @protected
     */
    protected abstract data: ModelData;

    /**
     * 模型主键
     * @protected
     */
    protected primaryKey:string = 'id';

    //是否已代理数据
    private isProxyData: boolean = false;

    //无法做到,会让后代提示,this类型问题
    // constructor() {
    //     // super(props);
    //     return this.proxyData()
    // }

    /**
     * 创建一个代理模型数据的模型实例
     * @param data 模型数据
     * @param call
     */
    static createModel<M extends BaseModel, Da extends Partial<NonNullable<M['_data']>> = NonNullable<M['_data']>>(
        this: new () => M, data?: Da, call?: (model: M & Da) => void
    ): M & Da {
        return new this().createModel(data, call)
    }

    /**
     * 创建一个代理模型数据的模型实例
     * @param data 模型数据
     * @param call  模型建立后回调
     * @param newInst  是否新建模型
     */
    createModel<Da extends Partial<ModelData> = ModelData>(data?: Da, call?: (model: this & Da) => void, newInst = false): this & Da {
        const self = newInst ? <this>new (<any>this.constructor)() : this;
        const selfProxyData = self.proxyData<Da>()
        data && (selfProxyData.data = <any>data);
        call && call(selfProxyData)
        return selfProxyData
    }


    /**
     * 代理模型数据 data，让模型实例可以直接访问
     * @protected
     */
    protected proxyData<MD extends Partial<ModelData> = ModelData>(): this & MD {
        if (this.isProxyData) {
            return <this & MD>this
        }
        this.isProxyData = true;
        return <this & MD>new Proxy(this, {
            get(target: any, p: string | symbol) {
                if (p in target) {
                    return target[p];
                }
                if (target.data) {
                    return target.data[p];
                }
                return undefined;
            },
            set(target: any, p: string | symbol, value: any) {
                if (p in target) {
                    target[p] = value;
                    return true;
                }
                if (target.data && p in target.data) {
                    target.data[p] = value;
                    return true;
                }
                target[p] = value;
                return true;
                // throw new Error('不存在的属性')
                // return true;
            },
            has(target: any, p: string | symbol) {
                return (p in target) || (target.data && p in target.data);
            }
            // deleteProperty(target: any, p: string | symbol): boolean {
            //   if (p in target) {
            //     delete target[p];
            //     return true;
            //   }
            //   if (p in target.data) {
            //     delete target.data[p];
            //     return true;
            //   }
            //   return false;
            // }
        });
    }
}
