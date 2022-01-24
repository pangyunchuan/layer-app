## 项目介绍

```text
web-api-orm 是一个，使用typescript，面向对象的，web端的对象关系映射器（ORM）。
让web项目能有简单的模型功能，也能便于前端项目代码分层。
由于做后端时，使用php的laravel框架，所以该orm参考与laravel，当然由于从接口获取数据与从数据查询数据的差异，
无法实现后端orm查询方法那样的高度封装，只能实现简单的模型功能。
如果项目使用的RESTFUL风格接口，可能会有更接近后端的体验。

laravel中 模型 有 $attributes 保存模型属性，web-api-orm中 使用 data 属性。
laravel中 可定义模型关联, web-api-orm中 需要手动实现模型关联,demo中有示例。
laravel中 查询多个结果会得到 集合,web-api-orm 会得到 模型数组。
laravel中 可定义属性修改器,其中访问器修改器（getter，setter），ts的语法自带；
然后属性转换，自定义类型转换，也能通过自定义转换自己实现。
laravel中预定义的属性转换，可能就日期类型有用点，比如php 数字 分为 integer,float,double。而ts中都是number。
总之属性转换这块，可能后续会增加这个功能，但通常自定义处理也能满足。

总之目前作为一个针对接口的基础ORM已经可以使用，更多功能需要根据实际项目进行扩展。

必要依赖
axios
lodash-es
可选依赖(仅在使用这两种种加载效果时必要)
element-plus
vant
```

## 安装和使用准备

```text
npm install web-api-orm

使用准备
1. 项目中增加 root 别名 指向项目根目录,webpack,vite 自行配置, tsconfig 参考如下
{
  "compilerOptions": {
    "rootDir": ".",
    "baseUrl": ".",
    "paths": {
      "root/*": [
        "*"
      ]
    }
  }
}
2. 项目增加模型配置文件,项目根目录增加  modelConfig/index.ts  可通过如下方式初始化配置文件
2-1. 项目根目录下执行命令 node .\node_modules\.bin\orminit.cmd
2-2. package.json 中 scripts 增加  {"orminit":"orminit"}  之后执行 npm run orminit
2-3. 手动复制 node_modules/web-api-orm/ 下的 modelConfig 目录  到项目根目录(连同目录一起复制)
```

## 功能介绍与前期准备

```typescript
/**
 * 后续介绍，假定使用初始的modelConfig,接口返回数据格式为 {code:0,msg:"成功",data:'接口数据,任意内容'}
 * 项目内容如下
 */
import {BaseLoading, RequestModel, LoadingRequest, setLoadingMap, setLoadingConfig, setRequestMap} from "web-api-orm";


/**
 后续将分为  加载类  BaseLoading  ,请求类 LoadingRequest, 模型 RequestModel 三个部分介绍。
 setLoadingMap,setLoadingConfig,setRequestMap为配置项，在modelConfig/index.ts中被使用
 其初始内容如下，使用时根据项目实际情况修改配置。
 */

/**
 * 加载类配置，在请求类中被使用时，传入键名确定加载类，具体使用后续介绍
 */
const loadingClassMap = {
    default: ElPlusLoading,
    vantToast: VantToastLoading,
    elPlus: ElPlusLoading
}
setLoadingMap(loadingClassMap)
//配置默认情况是否使用加载功能
setLoadingConfig({use: true})

/**
 * 请求类配置，在模型类中被使用时，传入键名确定请求类
 */
const requestClassMap = {
    default: DemoRequest,
    demo: DemoRequest
}
setRequestMap(requestClassMap)
```

## 加载类

```text
加载类主要为请求时间时间较长时展示加载效果，主要在接口调用时被使用。
主要分为两种，全屏加载和局部加载。
全屏加载为，某个时间端内请求的所有未完成的全局接口，展示这些接口的总数和已完成数，展示进度。
局部加载：页面某个局部区域数据加载情况,对应单个接口。

BaseLoading 加载效果抽象类,所有的加载类，都需要实现它。
在  web-api-orm/example 中 实现了  ElPlusLoading 和 VantToastLoading 两种加载类，若使用这两种ui库展示加载，可直接使用，
但需要自行安装ui库，web-api-orm 自身不依赖UI库。若采用其他ui库或自行实现加载效果，可参考它们，实现新的加载类。
```


## 请求类
```text
请求抽象类为 LoadingRequest，使用 axios 完成接口请求。,所有请求类都要实现它。
请求类中需要实现 请求处理,响应处理,异常处理。
其中响应处理中处理axios response，保证仅返回接口数据部分，根据demo接口约定为  response.data.data

axios中有取消请求功能，在 web-api-orm 中 增加了如下请求配置,已完成该功能
请求config参数
IRequestConfig extends AxiosRequestConfig {
  cancelMark?: string;// 为空 字符时，表示必要接口，不会被取消请求
}
其余与 axios config 一致

用于页面切换时,取消请求中的接口等操作。

用于完成请求的实例方法介绍
setUseLoading 设置本次请求是否使用加载效果,并返回自身，不调用时，根据modelConfig 中的配置决定是否使用。
setLoading(loadingKey,loadingOptions) 设置本次请求使用的加载类以及对加载类的配置，加载类在modelConfig 完成配置。
request(config: Partial<IRequestConfig> = {})   使用axios发起请求。可选参数
setGet(url: string, params: object = {}, config: Partial<Config> = {}):this   设置get请求
setPost(url: string, data: any = {}, params: object = {}, config: Partial<Config> = {}):this  设置post请求

至此，请求类已可以完成请求，获取数据 如 (new DemoRequest).setLoading().request().then(res=>{})
如果不需要模型功能，仅使用以上功能，或适用继承对接口分组，也是可行的。具体参考 modelConfig中的DemoRequest


用于配置模型的实例方法介绍
当接口返回数据为  {code:0,msg:"成功",data:'接口数据,任意内容'}
reqOne 请求接口并返回单个模型,要求data中都是模型数据
reqMany  请求接口返回模型数组,要求data中都是模型数据组成的数组

reqOneOther  请求接口并返回单个模型和其他数据,要求data中有一个字段是模型数据,其他字段不是模型数据, 
如接口数据 {test:1,modelData:{xx}} 其中modelData为模型数据 则返回  {test:1,model:DemoModel}

reqManyOther 请求接口并返回模型数组和其他数据,要求data中有一个字段是模型数据数组,其他字段不是模型数据,
如 接口数据 {total:100,modelDatas:[]}   则返回 {total:100,models"[]}

reqOneOther 必定含有model 字段 ,reqManyOther 必定含有 models 字段

更多细节,查看modelConfig 中的  DemoModel
```

## 模型类
```text
数据模型 是 某一种数据的模型,如用户模型，其中应当包含用户相关的数据处理，请求交互等内容。
RequestModel 是抽象模型类，所有的模型类都需要实现它。
所有模型都必须含有data 属性,用于存储模型数据,以区分模型数据与模型自身属性。
模型必须设置 模型数据泛型。如下
interface IDemo {
    id: string;
    name: string;
}
class DemoModel extends RequestModel<IDemo> {
    protected data: IDemo = {
        id: "", name: "",modelAttr:'data'
    };
    test:''
    get modelAttr(){
        return 'demoModel'
    }
    static find(id:string) {
        const url =  "/tt/234";
        return this.newReq().setLoading().setGet(url, {id}).reqOne(this);
    }
}

模型数据可直接通过模型访问
const demoModel = new DemoModel();
demoModel.id;demoModel.name;
当模型自身属性与 模型数据名称相同时,优先访问自身属性,如 modelAttr,如此,方便 getter,setter转换属性。
如 demoModel.modelAttr 的值 为  'demoModel' 而不是 'data'

请求数据并获取模型
静态方法find 中 展示了如何 请求数据获取模型。
newReq  静态方法newReq 会实例一个 请求类,接收参数为 请求中提到的,请求类键名。
其中 reqOne 方法 请求 中已经说明过。

建议在模型 静态方法中完成接口请求，实例方法中,扩展模型内容。

更多细节，参考 modelConfig 和 web-api-orm/example 中的内容
```
