## 安装

``` 
安装
npm install
```

## 简要说明

```text
一个ts的对于api的orm。
参考数据库orm，将一个接口视为一个模型，底层使用axios发起请求。虽然通常一组接口对应一张表。但由于接口的性质，也只能如此了。

主要提供一个 ApiModel 类，用于配置请求配置，管理响应数据，配置拦截器中间件（同axios，但会按顺序执行，可拆分处理逻辑）。

```

##基础使用
```typescript
import ApiModel from "http-api-orm";
class MyApiModel extends ApiModel{
    url = 'xxx/1.json'
}

const f = new MyApiModel()
f.run().then(r=>{
    
})
```

## ApiModel 配置说明
|  字段   | 说明  |
|  ----  | ----  |
| url  | 请求地址 |
| http  | axios实例，默然创建一个 |
| axiosConfig  | 模型的axios默认配置 |
| params  | 请求的get参数 |
| data  | 请求的data参数 |
| res  | 模型数据也是请求响应数据 |
| abortController  | 用于终止请求 |
| loading  | 接口loading控制 |
| reqMid  | 请求中间件 |
| reqErrMid  | 请求异常中间件 |
| resMid  | 响应中间件 |
| resErrMid  | 响应异常中间件 |



## 完整配置使用说明
```typescript
//响应成功时 模型如何获取数据中间件
const apiDataGet:ApiResponseMid = async function (r){
    this.res = r.data.apiContent
    return r;
}

class MyApiModel extends ApiModel {
    url = 'xxxx'
    params = new Params(() => ({test: 1, test1: '55'}))
    res = {d11: '123', t: false, count: 0}
    // loading = false
    loading = new Loading(function (a) {
        //返回loaidng实例,以elmentPlus 为例
        return ElLoading.service(a)
    }, function (i) {
        //关闭加载
        i.close()
    }, {
        delayStartMs: 1000,
        delayCloseMs: 800
    })
    
    //加载控制,当使用loading 时 需要按如下配置 loading中间件,以启用和关闭
    //由于各个项目响应数据获取方式不一致,需自行配置响应数据获取,建议创建一个中间件以处理
    reqMid = [loadingStart]
    reqErrMid = [loadingClose]
    resMid = [loadingClose,apiDataGet]
    resErrMid = [loadingClose]


    //以下均为模型数据 res 的操作

    //设置响应转换
    get tText() {
        return this.res.t ? '有效' : '无效'
    }

    updateState(v: boolean) {
        this.res.t = !v;
        this.res.count++
    }
}

const api = new MyApiModel()

//使用参数
api.params.d.test
//设置 参数 test1 初始和重置值 回调
api.params.myResetCall = () => {
    return {
        test1: '123'
    }
}
//设置 参数 转换 回调; 将请求数据转为formData
api.params.transformCall = () => {
    const f = new FormData()
    f.set('ttt', api.params.d.test1)
    return f
}

api.run().then(r=>{
  //  使用模型
  api.res.t;
  api.tText
})
```


