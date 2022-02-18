import Mock from "mockjs";
import {Plugin, ResolvedConfig} from "vite";
const url = require('url')
const fs = require('fs')
const path = require('path')

/**
 * 模拟mock 接口 插件
 * @param config
 */
export default function (
    config = {
        path: "mock", // mock 目录，相对于vite项目 跟目录
        baseApi: "/apis", //mockApi 前缀
    }
): Plugin {
    let viteConfig: ResolvedConfig;
    return <Plugin>{
        name: "vite-plugin-layer-app-mock-serve",
        apply: "serve",
        enforce: "post",
        configResolved(resolvedConfig) {
            // 存储最终解析的配置
            viteConfig = resolvedConfig;
        },
        configureServer(server) {
            // import.meta.globEager()
            const mockRoot = path.resolve(viteConfig.root, config.path);
            //前置中间件
            server.middlewares.use((req, res, next) => {
                //获取url path
                let pathname = <string>url.parse(<string>req.url, true).pathname;

                //检查是否访问模拟api
                if (config.baseApi && !pathname.includes(config.baseApi)) {
                    return next();
                }

                //获取请求方法并转为小写
                let method = <string>req.method;
                method = method.toLowerCase();

                //根据请求路径，获取文件相对路径
                let pathArr = pathname.split("/");
                let lastName = <string>pathArr.pop();
                let fileName =
                    method + "_" + lastName;

                //发送响应数据
                function sendRes(fileData: {}) {
                    res.statusCode = 200;
                    res.setHeader("Content-Type", "application/json");
                    res.end(JSON.stringify(fileData));
                    //  原始node request 用了 end 就不能 next()了
                }

                //查找文件
                function findFileSend(ext: string) {
                    //json文件
                    let file = fileName + `.${ext}`;
                    let truePath = path.join(
                        mockRoot,
                        [...pathArr, file].join("/")
                    );
                    if (fs.existsSync(truePath)) {
                        //清除 require 缓存
                        delete require.cache[truePath];
                        sendRes(Mock.mock(require(truePath)));
                        return true;
                    }
                    return false;
                }

                for (let ext of ["json", "ts", "js"]) {
                    if (findFileSend(ext)) {
                        return;
                    }
                }

                next();
            });
            //后置中间件
            // return () => {
            //   server.middlewares.use((req, res, next) => {
            //     // 自定义请求处理...
            //   })
            // }
        }
    };
};
