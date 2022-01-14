import {LoadingRequest} from "reqorm";
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
        }
        return response.data.returnContent;
    }

    protected errorHandle() {
        if (axios.isAxiosError(this.error)) {
            //http  状态码 错误处理
            this.error.code
        }

        return this.error;
    }
}
