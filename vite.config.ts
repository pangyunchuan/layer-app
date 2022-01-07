import {defineConfig, loadEnv} from "vite";
import vue from "@vitejs/plugin-vue";
import {name} from "./package.json";
import dayjs from "dayjs";
import viteCompression from "vite-plugin-compression";
import * as path from "path";

const daytime = dayjs().format("YYMMDD_HHmm");

const assetsDir = `${name}${daytime}`;
// https://vitejs.dev/config/
export default defineConfig(({mode}) => {
    let env = loadEnv(mode, "");
    return {
        plugins: [
            vue({reactivityTransform: true}),
            //生成gzip文件,默认不压缩
            viteCompression({
                filter: /\.(js|mjs|json|css|png|jpg|jpeg)$/i, //要压缩的文件
                threshold: 5 * 1024, //超过该值得才压缩 （字节）
                disable: true, //是否停用压缩
                deleteOriginFile: false //压缩后是否删除源文件
            })
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
                    find: /^~@/,
                    replacement: "/src"
                },
                {
                    find: "@/",
                    replacement: "/src/"
                },
                {
                    find: "WebOrm/",
                    replacement: "/src/"
                }
            ],
            extensions: [".mjs", ".js", ".ts", ".jsx", ".tsx", ".json", ".vue"]
        },
        css: {},
        build: {
            assetsDir: assetsDir,
            rollupOptions: {
                output: {
                    assetFileNames: `${assetsDir}/[ext]/[name]-[hash][extname]`,
                    chunkFileNames: `${assetsDir}/js/[name]-[hash].js`,
                }
            },
            lib: {
                entry: path.resolve(__dirname, 'lib/main.ts'),
                name: 'MyLib',
                fileName: (format) => `my-lib.${format}.js`
            }
        }
    };
});
