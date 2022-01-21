import {LoadingRequest} from "web-api-orm";
import axios from "axios";


export default class DemoRequest extends LoadingRequest {
    protected requestHandle() {
        //请求必要参数处理
        let {config} = this;
        if (!config.headers) {
            config.headers = {};
        }
        //token设置
        config.headers['token'] = 'token'
    }

    protected responseHandle() {
        const {response} = this;
        if (!response) {
            throw response;
        }
        const responseData = response.data;
        //假定 接口格式  {code:0,msg:"成功",data:'接口数据,任意内容'}
        //code 1  未登录
        //code 2  必须注册手机号才能访问 等
        if (responseData.code !== 0) {
            //  todo 业务异常处理
            //    这里异常 使用 抛出  throw
        }
        return response.data.data;
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

//直接使用 请求类 示例,每次请求都需要示例一个请求类
class UserApi extends DemoRequest {
    getList() {
        return this.setGet('url', {}).request()
    }

    static getList1(){
        return (new this).setLoading({},'vantToast').setGet('url').request()
    }
}
(new UserApi).setLoading().getList().then(res => {
})
UserApi.getList1().then(res=>{})
