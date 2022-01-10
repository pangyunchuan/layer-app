import RequestModel from "@/packages/Models/RequestModel";
export interface Demo {
    demoId: string;
    demoName: string;
}
export default class DemoModel extends RequestModel<Demo> {
    protected data: {
        demoId: string;
        demoName: string;
    };
    static find(params: Required<Pick<Demo, "demoId">>): Promise<DemoModel & Required<Partial<Demo>>>;
    static findWithOther(params: Required<Pick<Demo, "demoId">>): Promise<Omit<{
        mdata: object;
        test: number;
    }, "mdata"> & {
        model: DemoModel & Required<Partial<Demo>>;
    }>;
    static get(): Promise<(DemoModel & Required<Partial<Demo>>)[]>;
    protected init(): void;
    static getWithOther(): Promise<Omit<{
        mdata: object;
        ss: string;
    }, "ss"> & {
        models: (DemoModel & Required<Partial<Demo>>)[];
    }>;
}
