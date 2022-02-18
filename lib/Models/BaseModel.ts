//request cache (localStorage sessionStorage)
//relation 关系?
//属性代理不太能搞定啊
// 先用代码 固定写
// 本次实例 有多少字段需要
// 查询参数只从实例转换？？
//对外维持属性统一  查询参数，返回数据？？


export default abstract class BaseModel<ModelData extends object = {}> {
    /**
     * 获取类型,未使用
     */
    _data?: ModelData;

    protected abstract data: ModelData;

    //是否已代理数据
    private isProxyData: boolean = false;

    //无法做到,会让后代提示,this类型问题
    // constructor() {
    //     // super(props);
    //     return this.proxyData()
    // }

    /**
     * 创建模型
     * @param data
     * @param call
     */
    static createModel<M extends BaseModel, Da extends NonNullable<M['_data']> = NonNullable<M['_data']>>(
        this: new () => M, data?: Da, call?: (model: M & Da) => void
    ): M & Da {
        return new this().createModel(data, call)
    }

    /**
     * 创建模型
     * @param data
     * @param call
     */
    createModel<Da extends ModelData>(data?: Da, call?: (model: this & Da) => void): this & Da {
        const self = this.proxyData<Da>()
        data && (self.data = data);
        call && call(self)
        return self
    }


    //代理 data 数据
    protected proxyData<MD = ModelData>(): this & MD {
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
