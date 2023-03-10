import {debounce} from "lodash-es";
import {DebouncedFunc} from "lodash-es/debounce";

type ApiOption = {
    //开始延时时间
    delayStartMs: number,
    //结束延时时间
    delayCloseMs: number,
}

export default class Loading<Inst, Option extends Record<string, any>> {
    protected waitStart: DebouncedFunc<any>
    protected waitClose: DebouncedFunc<any>
    protected inst?: any

    /**
     * 创建一个加载控制器
     * @param getInstAndStartCall   获取加载实例,并开始加载的回调函数
     * @param closeCall              关闭加载的回调函数
     * @param option     选项
     */
    constructor(
        getInstAndStartCall: (o: Option) => Inst,
        closeCall: (c: Inst) => void,
        option: ApiOption = {
            delayStartMs: 800,
            delayCloseMs: 500,
        }
    ) {
        this.waitStart = debounce(() => {
            this.inst = getInstAndStartCall(this.option);
        }, 1000)
        this.waitClose = debounce(() => {
            closeCall(this.inst)
        }, 500)
    }

    /**
     * 开始加载
     */
    start() {
        this.waitClose?.cancel();
        this.waitStart();
    }

    /**
     * 关闭加载
     */
    close() {
        this.waitStart.cancel();
        this.waitClose();
    }

    protected option: Option = {} as Option

    /**
     * 设置加载配置
     * @param o
     */
    setOption(o: Option) {
        this.option = o;
    }
}
