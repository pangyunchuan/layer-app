import {RequestModel} from "layer-app";
import {pick} from "lodash-es";

interface IDemoBase {
    t: string,
    state: string
}

//模型基础配置说明
class DemoBaseModel extends RequestModel<IDemoBase> {
    //模型数据,必要
    protected data: IDemoBase = {t: '', state: ''}
    //模型 url 前缀 发起请求时需要使用,必要
    protected static url = '/23/'
    //模型主键 默认id 可选  使用模型实例方法 reqSave 时,更新模型实例的id值,单要求接口返回格式为 {[primaryKey]:v}
    protected primaryKey = 't'

    //模型请求默认是否需要使用 loading, 为true,且为 LoadingRequest 时才有用
    // protected useLoading = false

    //静态方法通常用于获取模型实例
    static async getD() {
        return this.setReq(this.newReq().setGet('11')).reqOne()
    }

    //实例方法,主要用于更新修改模型数据
    async changeState() {
        return this.newReq().setPost(this.parseUrl('savedd'), {state: this.data.state}).request()
    }

    //使用reqSave 保存,数据,并变更模型主键id
    async save() {
        return this.setReq(this.newReq().setPost('save', this.data)).reqSave()
    }

}


//模型数据类型
interface IDemo {
    demoId: string;
    demoName: string;
    demoField: string,
    collect: 0 | 1,//是否收藏
    modelAttr: string;
    relationData?: IRelationData
}

//关联模型数据
interface IRelationData {
    demoId: string,
    id: string,
    name: string,
}

// 通过 reqOne reqMany等方法 得到模型会代理 data
// 应当使用 Model.createModel 方法创建模型实例, 使用new 未代理模型数据data
export default class DemoModel extends RequestModel<IDemo> {
    //模型数据   data 中的数据,可通过 模型直接访问
    // 也是 (new DemoModel()).id; 结果为 id
    protected data: IDemo = {
        demoId: "id", demoName: "", collect: 0, demoField: '11', modelAttr: 'data'
    };

    /**
     * 模型主键
     */
    primaryKey = 'demoId'


    //url
    protected static url = '/demo-api/'

    get modelAttr() {
        // 模型自身属性名 与 data 中的属性名相同时,优先访问自身属性 也就是
        // (new DemoModel()).modelAttr  结果为  demoModel  而不是  data
        return 'demoModel'
    }

    //  collect 转文案
    get collectText() {
        return this.data.collect ? '已收藏' : '未收藏'
    }

    //是否收藏,当为  文本状态时有用
    get isCollect() {
        return !!this.data.collect
    }

    //关系模型 使用展示
    relationOne: RelationDataModel & IRelationData = RelationDataModel.createModel()


    protected async init2() {
        return this.relationOne.findOne(this.data.demoId).then(relation => {
            this.relationOne = relation
            return this;
        })
    }

    //单个模型
    static async findOne() {
        return this.setReq(this.newReq().setGet('detail', {id: 1})).reqOne()
    }

    //单个模型,关联2
    static async findOne2() {
        return this.setReq(this.newReq().setGet('detail', {id: 1})).reqOne().then(r => {
            return r.init2()
        })
    }

    //多个模型
    static async getList() {
        return this.setReq(this.newReq().setGet('list', {ageLt: 1})).reqMany()
    }

    //多个模型与其他参数
    static async getListOther() {
        return this.setReq(this.newReq().setGet('list', {ageLt: 1}))
            .reqManyOther<{ data: any, total: number, nowPage: number }, 'data'>('data')
    }

    //单个模型与其他参数
    static async findOneOther() {
        return this.setReq(this.newReq().setGet('list', {ageLt: 1}))
            .reqOneOther<{ data: any, t: string }, 'data'>('data')
    }

    //实例方法中
    async getList1() {
        //实例方法中,使用断言,标记this为当前类否自,call,或 结果类型提示有一定问题
        return (<DemoModel>this).setReq(this.newReq().setGet('list', {ageLt: 1}))
            .reqOneOther<{ data: any, t: string }, 'data'>('data')
    }


    //改变收藏状态
    async upCollect() {
        return this.newReq().setPost(this.parseUrl('upCollect'), {id: this.data.demoId, collect: this.data.collect});
    }

    async upName() {
        // lodash  pick  会丢失字段类型提示，无用使用编辑器，统一修改字段
        return this.newReq().setPost(this.parseUrl('upName'), pick(this.data, ['id', 'demoName'])).request();
    }

    //创建或修改数据
    async save() {
        //创建,并返回id
        //save 一定要用使用 当前模型实例 的 setReq
        // 静态方法或新建一个模型实例
        return (<DemoModel>this).setReq(this.newReq().setPost('save', this.data)).reqSave()
    }
}

//关系模型,不会从接口获取数据
class RelationDataModel extends RequestModel<IRelationData> {
    protected static url = '/demo-api/relation/'
    protected data: IRelationData = {
        demoId: '', id: '', name: ''
    }

    async findOne(demoId: string) {
        return this.setReq(this.newReq().setGet('detail', {demoId})).reqOne()
    }
}
