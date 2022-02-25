import BaseController from "./BaseController";
import {Ref} from "@vue/reactivity";
import {UnwrapRef} from "vue";

type NormalManController<C extends BaseController> = { value: C }
export default class Controller extends BaseController {

    static use<C extends typeof BaseController>(
        this: C,
        key: string | number = "default"
    ): NormalManController<InstanceType<C>> {
        return BaseController.baseUse(this, key);
    }

    protected createRefInst(): NormalManController<this> {
        return {value: this}
    }
}
