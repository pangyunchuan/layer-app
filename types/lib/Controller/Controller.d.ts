import BaseController from "./BaseController";
declare type NormalManController = {
    value: Controller;
};
export default class Controller extends BaseController<NormalManController> {
    /**
     * 创建响控制器管理对象
     */
    protected createManType(): NormalManController;
}
export {};
