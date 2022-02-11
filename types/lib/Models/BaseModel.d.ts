export default abstract class BaseModel<ModelData extends object = {}> {
    protected abstract data: ModelData;
    private isProxyData;
    proxyData<MD = ModelData>(): this & MD;
}
