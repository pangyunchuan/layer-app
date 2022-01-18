//request cache (localStorage sessionStorage)
//relation 关系?
//属性代理不太能搞定啊
// 先用代码 固定写
// 本次实例 有多少字段需要
// 查询参数只从实例转换？？
//对外维持属性统一  查询参数，返回数据？？


export default abstract class BaseModel<ModelData extends object = {}> {
    _dataType: Partial<ModelData> = {}; //仅用于动态类型获取
    protected abstract data: ModelData;

    //是否已代理数据
    private isProxyData: boolean = false;

    //代理 data 数据
    proxyData<MD = ModelData>(): this & MD {
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
                // throw new Error('不存在的属性')
                return true;
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
