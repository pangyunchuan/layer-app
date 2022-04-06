import {debounce} from "lodash-es";
import {DebouncedFunc} from "lodash-es/debounce";

export default abstract class BaseLoading<Options extends {}, InstType> {
    protected abstract getIsFull(): boolean

    protected abstract buildLoading(): InstType

    protected abstract closeLoading(inst?: InstType): void

    protected abstract upText(text: string, inst?: InstType): void

    //loading 控制
    private needWaitLoading = true;
    private reqIngNum = 0;
    private reqCount = 0;

    private get isFull() {
        return this.getIsFull()
    }

    protected loadingInst: InstType | undefined;

    private get classname(): string {
        return this.constructor.name;
    }


    protected static defaultConfigByClassName: { [key: string]: BaseLoading<any, any>["options"] } = {};

    static setDefaultConfig<Loading extends BaseLoading<any, any>>(this: new() => Loading, options: Loading['_options']) {
        BaseLoading.defaultConfigByClassName[this.name] = options
    }

    //用于类型提示
    _options: Options = <Options>{};
    protected options: Options = <Options>{};

    constructor(inputConfig: Options = <Options>{}) {
        const defaultConfig = BaseLoading.defaultConfigByClassName[this.classname] || {};
        this.options = {...this.options, ...defaultConfig, ...inputConfig};
        return this;
    }

    //首个全屏实例，用来管理全屏信息
    protected static _firstFullInstMapByClassName: { [key: string]: BaseLoading<any, any> } = {};

    protected get fullInst() {
        const className = this.constructor.name;
        if (!BaseLoading._firstFullInstMapByClassName[className]) {
            BaseLoading._firstFullInstMapByClassName[className] = this;
        }
        return BaseLoading._firstFullInstMapByClassName[className];
    }

    startLoading() {
        if (!this.isFull) {
            this.loadingInst = this.buildLoading();
            return;
        }
        this.fullStart();
    }

    endLoading() {
        if (!this.isFull) {
            this.closeLoading(this.loadingInst);
            return;
        }
        this.fullClose();
    }


    private fullStart() {
        const fullInst = this.fullInst;
        fullInst.reqIngNum++;
        fullInst.reqCount++;
        if (fullInst.needWaitLoading) {
            fullInst.waitLoading();
            fullInst.needWaitLoading = false;
        }

        fullInst.upText(fullInst.getText(), fullInst.loadingInst);
        fullInst.waitClose.cancel();
    }

    //等待开启全屏loading
    private _waitLoading: undefined | DebouncedFunc<any>;
    //等待关闭全屏loading
    private _waitClose: undefined | DebouncedFunc<any>;

    protected get waitLoading(): DebouncedFunc<any> {
        const fullInst = this.fullInst;
        if (!fullInst._waitLoading) {
            fullInst._waitLoading = debounce(() => {
                fullInst.loadingInst = fullInst.buildLoading();
            }, 1500);
        }
        return fullInst._waitLoading;
    }

    protected get waitClose(): DebouncedFunc<any> {
        const fullInst = this.fullInst;
        if (!fullInst._waitClose) {
            fullInst._waitClose = debounce(() => {
                fullInst.waitLoading.cancel();
                fullInst.reqIngNum = 0;
                fullInst.reqCount = 0;
                fullInst.needWaitLoading = true;
                this.closeLoading(fullInst.loadingInst);
                fullInst.loadingInst = undefined;
                //请求完成,清除实单例
                delete BaseLoading._firstFullInstMapByClassName[this.constructor.name];
            }, 1000);
        }
        return fullInst._waitClose;
    }


    private fullClose() {
        const fullInst = this.fullInst;
        fullInst.reqIngNum--;
        fullInst.upText(fullInst.getText(), fullInst.loadingInst);
        if (fullInst.reqIngNum <= 0) {
            fullInst.waitClose();
        }
    }


    protected getText(text = "加载中") {
        let {reqCount, reqIngNum} = this.fullInst;
        if (reqCount > 1) {
            let percent: number | string = 1 - reqIngNum / reqCount;
            percent = (percent * 100).toFixed(0);
            text = `已加载 ${percent}%`;
        }
        return text;
    }
}


