import {defineConfig, loadEnv} from "vite";
import vue from "@vitejs/plugin-vue";
import {name} from "./package.json";
import dayjs from "dayjs";
import * as path from "path";

const daytime = dayjs().format("YYMMDD_HHmm");

const assetsDir = `${name}${daytime}`;
// https://vitejs.dev/config/
export default defineConfig(({mode}) => {
    let env = loadEnv(mode, "");
    return {
        plugins: [
            vue({reactivityTransform: true})
        ],
        // base 不能配置 ./
        base: "",
        server: {
            host: "0.0.0.0",
        },
        // 配置别名
        resolve: {
            alias: [
                {
                    find: "@/",
                    replacement: "/src/"
                },
                {
                    find: "root/",
                    replacement: "/"
                }
            ],
            extensions: [".mjs", ".js", ".ts", ".jsx", ".tsx", ".json", ".vue"]
        },
        css: {},
        build: {
            assetsDir: assetsDir,
            rollupOptions: {
                // 确保外部化处理那些你不想打包进库的依赖
                external: ['element-plus','vant','lodash-es','axios'],
                output: {
                    // // // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
                    globals: {
                        'element-plus': 'element-plus',
                        'vant': 'vant',
                        'lodash-es': 'lodash-es',
                        'axios':'axios'
                    },
                    assetFileNames: `${assetsDir}/[ext]/[name]-[hash][extname]`,
                    chunkFileNames: `${assetsDir}/js/[name]-[hash].js`,
                },

            },
            lib: {
                entry: path.resolve(__dirname, 'lib/main.ts'),
                name: 'MyLib',
                fileName: (format) => `my-lib.${format}.js`
            }
        }
    };
});
