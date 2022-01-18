import {RequestModel} from "web-orm";

interface IDemo {
    id: string;
    name: string;
    relationData?: IRelationData
}

interface IRelationData {
    demoId: string,
    id: string,
    name: string,
}


class DemoModel extends RequestModel<IDemo> {
    protected data: IDemo = {
        id: "", name: ""
    };

    relationOne: RelationDataModel & IRelationData | undefined

    static find(
        params: Required<Pick<IDemo, "id">>
    ) {
        const _uri = "/index-service-desk/potal/tools/compositreportaction/";
        const url = _uri + "getReportDefined.do";
        return this.newReq().setLoading().setGet(url, params).reqOne(this);
    }

    static findWithOther(
        params: Required<Pick<IDemo, "id">>
    ) {
        const _uri = "/index-service-desk/potal/tools/compositreportaction/";
        const url = _uri + "getReportDefined.do";
        return this.newReq().setLoading().setGet(url, params)
            .reqOneOther<{ mdata: object, test: number }, "mdata", DemoModel>(this, "mdata");
    }

    static get() {
        const _uri = "/index-service-desk/potal/tools/compositreportaction/";
        const url = _uri + "getReportDefined.do";
        return this.newReq().setLoading().setGet(url).reqMany(this);
    }

    //初始化
    protected init() {
        const relationData = this.data.relationData
        if (relationData) {
            this.relationOne = (new RelationDataModel).newFromReq(RelationDataModel, relationData,(model)=>{
                // model.demoId
            })
            // this.relationOne.demoId
        }
    }

    static getWithOther() {
        const _uri = "/index-service-desk/potal/tools/compositreportaction/";
        const url = _uri + "getReportDefined.do";
        return this.newReq().setLoading().setGet(url)
            .reqManyOther<{ mdata: object, ss: string }, "ss", DemoModel>(this, "ss", (model) => {
                model.init();
            });
    }
}

class RelationDataModel extends RequestModel<IRelationData> {
    protected data: IRelationData = {
        demoId: '', id: '', name: ''
    }
}

DemoModel.find(
    {id: "1123"}
).then(res => {

});
DemoModel.findWithOther(
    {id: "1123"}
).then(res => {

});
DemoModel.get().then(res => {

});
