/// <reference types="lodash" />
import { DebouncedFunc } from "lodash-es/debounce";
export default abstract class BaseLoading<Options extends {}, InstType> {
    protected abstract getIsFull(): boolean;
    protected abstract buildLoading(): InstType;
    protected abstract closeLoading(inst?: InstType): void;
    protected abstract upText(text: string, inst?: InstType): void;
    private needWaitLoading;
    private reqIngNum;
    private reqCount;
    private fullLoadingSingleInst;
    private get isFull();
    protected loadingInst: InstType | undefined;
    private get classname();
    protected static defaultConfigByClassName: {
        [key: string]: BaseLoading<any, any>["options"];
    };
    static setDefaultConfig<Loading extends BaseLoading<any, any>>(this: new () => Loading, options: Loading['_options']): void;
    _options: Options;
    protected options: Options;
    constructor(inputConfig?: Options);
    protected static _firstFullInstMapByClassName: {
        [key: string]: BaseLoading<any, any>;
    };
    protected get fullInst(): BaseLoading<any, any>;
    startLoading(): void;
    endLoading(): void;
    private fullStart;
    private _waitLoading;
    private _waitClose;
    protected get waitLoading(): DebouncedFunc<any>;
    protected get waitClose(): DebouncedFunc<any>;
    private fullClose;
    protected getText(text?: string): string;
}
