import {BaseLoading} from 'layer-app'
import {LoadingOptions} from "element-plus/es/components/loading/src/types";
import {ElLoadingService} from "element-plus/es/components/loading";
import {ElLoading} from "element-plus";

type Inst = ReturnType<typeof ElLoadingService>

export default class ElPlusLoading extends BaseLoading<LoadingOptions, Inst> {
    protected getIsFull(): boolean {
        if (!this.options.target) {
            return true;
        }
        const {target} = this.options;
        return (target instanceof HTMLElement ? target.nodeName : target) === "body";
    }

    protected buildLoading(): Inst {
        const inst = ElLoading.service(this.options);
        document.querySelector("body")?.classList.remove("el-loading-parent--relative");
        return inst;
    }

    protected closeLoading(inst?: Inst) {
        inst?.close();
    }

    protected upText(text: string, inst?: Inst) {
        inst?.setText(text);
    }
}


