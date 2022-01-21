import {BaseLoading} from "web-api-orm";

import {Toast, ToastOptions} from "vant";
import {ComponentInstance} from "vant/es/utils";

export default class VantToastLoading extends BaseLoading<ToastOptions, ComponentInstance> {
    protected getIsFull(): boolean {
        return true;
    }

    protected buildLoading(): ComponentInstance {
        return Toast.loading(this.options);
    }

    protected closeLoading(inst?: ComponentInstance) {
        inst?.clear();
    }

    protected upText(text: string, inst: ComponentInstance) {
        if (inst) {
            inst.messate = text;
        }
    }
}


