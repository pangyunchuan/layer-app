declare let base: {
    default: typeof import("../Request/DemoRequest").default;
    demo: typeof import("../Request/DemoRequest").default;
};
export declare type reqKeys = keyof typeof base;
export declare type instanceTypeByKey = {
    [P in reqKeys]: InstanceType<(typeof base)[P]>;
};
export default base;
