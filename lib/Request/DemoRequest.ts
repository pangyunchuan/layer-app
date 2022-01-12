import LoadingRequest from "./LoadingRequest";


export default class DemoRequest extends LoadingRequest {
  protected requestHandle() {
    let { config } = this;
    if (!config.headers) {
      config.headers = {};
    }
  }

  protected responseHandle() {
    const { response } = this;
    if (!response) {
      throw response;
    }
    return response.data.returnContent;
  }

  protected errorHandle() {
    return this.error;
  }
}
