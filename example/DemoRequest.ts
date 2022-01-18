import {LoadingRequest} from "web-orm";
import axios from "axios";


export default class DemoRequest extends LoadingRequest {
    protected requestHandle() {
        //请求必要参数处理
        let {config} = this;
        if (!config.headers) {
            config.headers = {};
        }
    }

    protected responseHandle() {
        const {response} = this;
        if (!response) {
            throw response;
        }
        const responseData = response.data;
        //假定 接口格式  {code:0,msg:"成功",returnContent:'接口数据,任意内容'}
        //code 1  未登录
        //code 2  必须注册手机号才能访问 等
        if (responseData.code !== 0) {
            //  todo 业务异常处理
        //    这里异常 使用 抛出  throw
        }
        return response.data.returnContent;
    }

    protected errorHandle() {
        //todo 测试这里异常,正常返回
        if (axios.isAxiosError(this.error)) {
            //http  状态码 错误处理
            this.error.code
        }

        return this.error;
    }
}
