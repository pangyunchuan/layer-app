import BaseController from "./BaseController";

type NormalManController<C extends Controller> = { value: C }
export default class Controller extends BaseController {

    _type?: NormalManController<this>

    /**
     * 创建响控制器管理对象
     */
    protected createManType(): NormalManController<this> {
        return {value: this}
    }
}
