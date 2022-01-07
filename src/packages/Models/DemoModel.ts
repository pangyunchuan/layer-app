import RequestModel from "@/packages/Models/RequestModel";

export interface Demo {
  demoId: string;
  demoName: string;
}

export default class DemoModel extends RequestModel<Demo> {
  protected data = { demoId: "", demoName: "" };

  static async find(
    params: Required<Pick<Demo, "demoId">>
  ) {
    const _uri = "/index-service-desk/potal/tools/compositreportaction/";
    const url = _uri + "getReportDefined.do";
    return this.newReq().setLoading().setGet(url, params).reqOne(this);
  }

  static async findWithOther(
    params: Required<Pick<Demo, "demoId">>
  ) {
    const _uri = "/index-service-desk/potal/tools/compositreportaction/";
    const url = _uri + "getReportDefined.do";
    return this.newReq().setLoading().setGet(url, params)
      .reqOneOther<{ mdata: object, test: number }, "mdata", DemoModel>(this, "mdata");
  }

  static async get() {
    const _uri = "/index-service-desk/potal/tools/compositreportaction/";
    const url = _uri + "getReportDefined.do";
    return this.newReq().setLoading().setGet(url).reqMany(this);
  }

  //初始化
  protected init() {

  }

  static async getWithOther() {
    const _uri = "/index-service-desk/potal/tools/compositreportaction/";
    const url = _uri + "getReportDefined.do";
    return this.newReq().setLoading().setGet(url)
      .reqManyOther<{ mdata: object, ss: string }, "ss", DemoModel>(this, "ss", (model) => {
        model.init();
      });
  }
}

DemoModel.find(
  { demoId: "1123" }
).then(res => {

});
DemoModel.findWithOther(
  { demoId: "1123" }
).then(res => {

});
DemoModel.get().then(res => {

});
