## 使用layer-app搭建项目

```shell
# 根据提示选择 
$ npm init layer-app

# npm 6.x
$ npm init layer-app <project-name> --template vite-vue3-setup-ts

# npm 7+，需要加上额外的双短横线
$ npm init layer-app <project-name> -- --template vite-vue3-setup-ts

# 完成后 进入项目
$ cd <project-name>
$ npm install
$ npm run dev

#推荐使用npm 7 以上版本,否则某些第三方依赖不会自动安装
```

## 项目介绍

```text
layer-app 一套可选的，用于支持js/ts代码面向对象，mvc分层架构以及模块化组织代码的渐进式框架。建议使用ts。
支持 tree-shaking;
主要用vue3 setup项目说明。

本项目将代码分为  v(template) vm(script) page m 四层。
其中v 与 vm 耦合在一起,为 .vue文件。
page 为与一个路由对应的 一组.vue文件 中的 共享数据和相同的业务逻辑。
  假设路由仅对应一个简单的 .vue 文件,page也可以不存在。
  page通常是单例的。
m 为数据模型,也是本项目核心内容，接受page 或 vm 调用，完成与接口交互，获取和变更数据。

使用模型前,需要配置请求类
请求类是对axios的封装，使用时，需要实现其抽象类，并实现类似axios的请求/响应拦截处理。
他可以当成一个请求封装库直接使用,但在这里主要是用于被 m 调用,完成数据获取。

loading，加载类，用于被request类使用，用于接口请求较慢时展示加载效果。使用时，需要实现其抽象类，可实现 elementui vant 等不同ui组件库的加载展示。
```

## 安装和使用准备

```text
npm install layer-app

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
2. 项目增加 layer-app 入口 文件,需要在项目根目录下增加layerAppStart目录,可通过如下方式添加
2-1. 项目根目录下执行命令 node .\node_modules\.bin\createLayerAppStart.cmd
2-2. package.json 中 scripts 增加  {"createLayerAppStart":"createLayerAppStart"}  之后执行 npm run createLayerAppStart
2-3. 手动复制 node_modules/layer-app/ 下的 layerAppStart 目录  到项目根目录(连同目录一起复制)

3. 在项目使用 layer-app 前引入 layerAppStart 如在 main.ts 中 import "root/layerAppStart";
```

```typescript
// layerAppStart/index.ts
//主要是模型相关的配置

import ElPlusLoading from "./ElPlusLoading";
import VantToastLoading from "./VantToastLoading";
import DemoRequest from "./DemoRequest";
import {setLoadingMap, setRequestMap, setLoadingConfig} from "layer-app";
//demoModel 仅供参考,不应再  layerAppStart中调用.
//这里配置项都供参考,用不到就删掉.


//设置 element-plus 加载类 默认配置设置,使用前,需要自行安装element-plus
ElPlusLoading.setDefaultConfig({
    target: 'body',
    text: '加载中',
    // lock: true,
    spinner: "el-icon-loading",
    // background: "transparent"
    background: "rgba(50, 50, 50, 0.5)"
})
//设置 vant.toast 加载类 默认配置设置,使用前,需要自行安装vant
VantToastLoading.setDefaultConfig({
    message: '加载中'
})

/**
 * 加载类配置，在请求类中被使用时，传入键名确定加载类，具体使用后续介绍
 * default 必须设置,其他可删除
 * 请注意 这两种ui加载效果，使用前需要安装ui库
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
 * default 必须设置,其他可删除
 */
const requestClassMap = {
    default: DemoRequest,
    demo: DemoRequest
}
setRequestMap(requestClassMap)


//用于ts类型提示,使用ts时,必备。
export type loadingClassMapType = typeof loadingClassMap
export type requestClassMapType = typeof requestClassMap

```

### 项目 class 说明
```typescript
import {Page, PageVue3,  BaseLoading, BaseRequest, LoadingRequest, RequestModel, setLoadingMap, setLoadingConfig, setRequestMap} from 'layer-app'
// Page, PageVue3 页面类,没有太多内容因为页面通常是单例的，所以提供了一个 reset方法,用于在页面关闭和页面复用时(动态路由) 重置page ,
// PageVue3  仅仅是在 vue3的基础上 针对性的提供了个方法 resetWhenUnmount  用于在页面关闭时,重置页面

// BaseLoading  loading基类 接口请求时,展示loading效果,实现自己的loading效果时,需要实现它

//BaseRequest  请求基类。  使用Model 前,一定要实现它,配置好 请求前,请求完成,请求异常的处理,且需要让返回数据仅返回模型数据部分
//LoadingRequest  加载效果的请求基类，在请求基类的基础上实现了BaseLoading的接入。默认使用这个请求基类。

// RequestModel  接口请求模型，与接口完成交互的模型基类。
```

###### ##### 目录结构参考 以 vite + vue3 为例

```text
index.html   vite 入口文件 
vite.config.ts vite配置文件
mock  模拟接口 文件
buildConfig    vite打包配置拆分文件
layerAppStart   layer-app 启动文件  
public
src  项目文件
-- main.ts 入口文件
-- App.vue vue根组件
-- components  通用 ui 组件
-- router  路由
-- models 通用模型设置
-- modules  模块目录 一个模块是一个业务功能集合, 模块中可含有路由,模型,页面,组件等任意模块相关内容,甚至可以含有子模块
---- module1
------ components  模块通用组件
------ models  模块模型
------ services 模块服务层,根据情况增加
------ views 模块页面
-------- page1
---------- Page1.vue
---------- Header.vue
---------- Content.vue
---------- page1.ts   页面class 实例,用于page1页面
-------- page2
-------- route.ts  页面路由
------ helpers 模块辅助函数
-------- module1-1 子模块
----- module2 模块2

目录层级越高的,说明通用性越强
```
