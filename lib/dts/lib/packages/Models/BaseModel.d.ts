export default abstract class BaseModel<ModelData extends object = {}> {
    _dataType: Partial<ModelData>;
    protected abstract data: ModelData;
    proxyData<MD = ModelData>(): this & MD;
}
