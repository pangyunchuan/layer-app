import DemoRequest from "@/packages/Request/DemoRequest";

const requestClassConfig = {
  default: DemoRequest,
  demo: DemoRequest
};

export type reqKeys = keyof typeof requestClassConfig

export type instanceTypeByKey = {
  [P in reqKeys]: InstanceType<(typeof requestClassConfig)[P]>
}

export default requestClassConfig;
