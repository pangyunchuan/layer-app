import {defineConfig} from "vite";
import * as path from "path";

// https://vitejs.dev/config/
export default defineConfig(() => {
    return {
        build: {
            lib: {
                entry: path.resolve(__dirname, 'lib/index.ts'),
                name: 'MyLib',
                fileName: (format) => `dist.${format}.js`
            }
        }
    };
});
