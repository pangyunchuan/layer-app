import vue from "@vitejs/plugin-vue";

import {defineConfig} from "vite";
// import vitePluginMyMockServe from "layer-app/optional/vitePluginMyMockServe";
import vitePluginMyMockServe from "./vitePluginMyMockServe";

export default defineConfig({
    plugins: [
        vue({reactivityTransform: true}),
        vitePluginMyMockServe()
    ],
    // 配置别名

    resolve: {
        alias: [
            {
                find: "@/",
                replacement: "src/"
            },
            {
                find: 'root/',
                replacement: "/"
            }
        ]
    },
    build: {
        outDir: 'package',
        rollupOptions: {
            output: {
                // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
                globals: {
                    vue: 'Vue'
                }
            }
        }
    },
    server: {
        host: "0.0.0.0",
        // port: 3002,
    }
});
