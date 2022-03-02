import {BaseLoading} from 'layer-app'
import {LoadingOptions} from "element-plus/es/components/loading/src/types";
import {ElLoading} from "element-plus";
import {LoadingInstance} from "element-plus/es/components/loading/src/loading";

export default class ElPlusLoading extends BaseLoading<LoadingOptions, LoadingInstance> {
    protected getIsFull(): boolean {
        if (!this.options.target) {
            return true;
        }
        const {target} = this.options;
        return (target instanceof HTMLElement ? target.nodeName : target) === "body";
    }

    protected buildLoading(): LoadingInstance {
        const inst = ElLoading.service(this.options);
        document.querySelector("body")?.classList.remove("el-loading-parent--relative");
        return inst;
    }

    protected closeLoading(inst?: LoadingInstance) {
        inst?.close();
    }

    protected upText(text: string, inst?: LoadingInstance) {
        inst?.setText(text);
    }
}


