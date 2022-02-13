import {defineConfig, loadEnv} from "vite";
import * as path from "path";

// https://vitejs.dev/config/
export default defineConfig(({mode}) => {
    let env = loadEnv(mode, "");
    return {
        // 配置别名
        resolve: {
            alias: [
                {
                    find: "root/",
                    replacement: "/"
                }
            ],
            extensions: [".mjs", ".js", ".ts", ".jsx", ".tsx", ".json", ".vue"]
        },
        build: {
            rollupOptions: {
                // 确保外部化处理那些你不想打包进库的依赖
                external: ['element-plus', 'vant', 'lodash-es', 'axios', 'vue'],
                output: {
                    // // // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
                    globals: {
                        'element-plus': 'element-plus',
                        'vant': 'vant',
                        'lodash-es': 'lodash-es',
                        'axios': 'axios',
                        'vue': 'vue'
                    }
                },
            },
            lib: {
                entry: path.resolve(__dirname, 'lib/index.ts'),
                name: 'MyLib',
                fileName: (format) => `layer-app.${format}.js`
            }
        }
    };
});
