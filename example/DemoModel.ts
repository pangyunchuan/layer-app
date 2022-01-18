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

    static find(
        params: Required<Pick<IDemo, "id">>
    ) {
        const url =  "/tt/234";
        return this.newReq().setLoading().setGet(url, params).reqOne(this);
    }

    static findWithOther(
        params: Required<Pick<IDemo, "id">>
    ) {
        const url = "/demoapi/tt/t1";
        return this.newReq().setLoading().setGet(url, params)
            .reqOneOther<{ mdata: object, test: number }, "mdata", DemoModel>(this, "mdata");
    }

    static get() {
        const url = "/demoapi/tet1/1234";
        return this.newReq().setLoading().setGet(url).reqMany(this);
    }

    relationOne: RelationDataModel & IRelationData | undefined

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
        const url = "/demoapi/test/444";
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
