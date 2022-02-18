import BaseController from "./BaseController";

type NormalManController = { value: Controller }
export default class Controller extends BaseController<NormalManController> {
    /**
     * 创建响控制器管理对象
     */
    protected createManType(): NormalManController {
        return {value: this}
    }
}

// Controller.findOrCreate().value.setOrGetDestroyFun()
