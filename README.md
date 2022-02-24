## 项目介绍

```text
layer-app 一套可选的，用于支持js/ts代码面向对象，mvc分层架构以及模块化组织代码的渐进式框架。建议使用ts。
主要用vue3 setup项目说明。
本项目中 页面 和 组件 有所区分,页面主要指与路由对应,业务耦合度高,复用性低的组件。
仅为页面所用的组件为页面组件
页面组件往往是因为页面复杂，而将一个页面拆分为多个部分，没有复用性。
普通组件参考 各种ui组件库的组件。

下面介绍本项目中核心概念 v c m 分层。

首先是v，由于mvvm中的v vm 总是一一对应,(.vue 中 vm 与 v在一起) 所以我们将其统一视为 v。

然后是 c，本项目提供一个控制器基类，用用于向 v 提供数据,响应事件,与后端控制器有所差别的是，它还可以是复用的，响应式的。
因为一个业务数据,往往会在前端多个组件,或页面中使用
如一个UserController 可以获取用户信息,但他获取的用户信息在一个页面多个后代组件中使用,此时需要一份数据共享使用,且需要响应式。后续具体说明。

最后m， 本项目提供一个模型基类，接受c调用，完成与接口交互，获取变更数据。

其他内容,request，请求类，对axios的封装，使用时，需要实现其抽象类，并实现类似axios的请求/响应拦截处理。
他可以当成一个请求封装库直接使用,但在这里主要是用于被 m 调用,完成数据获取。
loading，加载类，用于被request类使用，用于接口请求较慢时展示加载效果。使用时，需要实现其抽象类，可实现 elementui vant 等不同ui组件库的加载展示。

mvc是基础的分层,在其中要遵循一些规则
1.上层调用下层,也就是,v->c->m 不能反向调用。
2.业务简单可以跨层调用。
3.业务复杂时，可以增加更多的层，如上面的 request,或者增加一个service 专注业务逻辑
4.同层可以互相调用,也就是v中可以使用其他v,比如页面中使用很多后代组件，但应少用。



当这样分层后，我们甚至可能实现，一段用户逻辑的多端(pc,mobile)复用。
比如一个用户详情的业务逻辑，不论在哪里，都是 用户昵称，用户id等内容，操作也是，变更状态，修改性别等等。
然而不同终端页面样式差异却很大，不仅如此，在pc页面中，除了用户详情的内容，还会有其他内容。
当分层后，一个Controller却可以同时支持不同终端。当然可能需要打包进行一些处理，不同终端页面分别打包，但业务却是共享的。


虽然每个功能都是可选使用的
但在使用m时，必须要实现request，且需要完成下面将会提到的 layerAppStart/index.ts 中的配置。
具体使用,查看 layerAppStart  中的示例文件
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


//设置 element-plus 加载类 默认配置设置,使用前,需要安装element-plus
ElPlusLoading.setDefaultConfig({
    target: 'body',
    text: '加载中',
    // lock: true,
    spinner: "el-icon-loading",
    // background: "transparent"
    background: "rgba(50, 50, 50, 0.5)"
})
//设置 vant.toast 加载类 默认配置设置,使用前,需要安装vant
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


### 可选项
```text
vitePluginMockServe
```


```text
建议目录结构,待增加

```
