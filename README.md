# scservebigdata(四川大数据服务平台)

## 创建人：庞云川

## 创建时间： 2020-04-01

## 所属公司： 成都东方国信

## npm 项目准备
```text
1.执行如下命令将npm镜像源设置为淘宝
  npm config set registry https://registry.npm.taobao.org
2.安装项目依赖
  npm install  
```


### 项目 命令介绍
```text
1.启动开发无服务器     npm run dev
2.打包代码            npm run build
3.预览打包后的代码     npm run preview
```

### 四川大数据服务平台仅供内部开发者使用

## 项目结构

### 项目使用 UI 框架为 vue3.x + vuex + iview&elementUI

###########目录结构描述
```text
├── Readme.md  说明
├── mock // 模拟接口 文件
├── src // 项目文件
│ ├── assets // 静态文件夹-存放图片，静态资源等
│ ├── axios // axios 访问拦截配置
│ ├── components // 组件
│ ├── modules // 模块目录 所有模块放在下面
    │ ├── module1 // 模块 1
    │ ├── components // 模块组件
    │ ├── route.js // 模块路由
    │ ├── xxxApi.js // 模块接口
    │ ├── xxx.vue // 模块页面
    │ ├── module1.1 // 子模块，通常不含有 route ，但也可以有
    │ ├── router // 项目路由配置
    │ ├── store // 数据状态管理
    │ └── utils // 公共处理方法
    ├── main.ts
    ├── App.vue   vue根组件
    ├── index.ts 项目配置文件 打包时，以 env 文件为准，调试时直接修改这里的值

├── index.html   vite 入口文件 
├── vue.index.ts //页面配置
```


### mockApi说明
````text
项目使用 自建的 vite-plugin 插件 钩子 configureServer 实现
启动开发服务器时，以 /apis 为前缀的接口 都将指向 mockapi 
不需要配置代理转发

mcok 文件默认 存放  <root>/mock 
mock文件 命名格式   [method]_apiname.[js|json]
mock文件内容 应为  符合接口要求的的json 该项目为  
    {
      "returnStatus": 1,  
      "returnCode": "SUC1000N",
      "returnContent": [
        "*"
      ]
    }

对接口请求处理为 根据请求地址和方法转换为 mock文件 路径 （相对于 mock存放目录）
接口为 get请求  /apis/dir1/a  对应   mock/apis/dir1/get_a.js
若文件不存在则不处理，存在则返回文件内容

````

```text
env 文件说明  

不要修改 .env 文件 而是创建 .env.local 更改自己本地的配置
默认的请求代理地址是 本地 mock api

env 文件配置项 （应以 VITE_ 前缀为准，VUE_APP 为 vue-cli 配置，即将废弃）
VUE_APP_baseApi= axios 请求前缀，可指定任意地址，但可能跨域
VUE_APP_inclueMockApi= 是否引入测试接口到项目中，引入后打包，可脱离后端演示运行
VUE_APP_devServer_port= 开发模式端口
VUE_APP_proxy_target= 请求代理地址
VUE_APP_proxy_target_port= 代理地址端口，代理地址没有端口，就不设置，也是 mockapi 端口
VUE_APP_localTest= 是否本地测试，设为 1 时，本地一些特殊调试处理
```

