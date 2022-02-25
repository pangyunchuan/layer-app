import BaseController from "./BaseController";
declare type NormalManController<C extends BaseController> = {
    value: C;
};
export default class Controller extends BaseController {
    static use<C extends typeof BaseController>(this: C, key?: string | number): NormalManController<InstanceType<C>>;
    protected createRefInst(): NormalManController<this>;
}
export {};
