const fs = require("fs");
const path = require("path");

const rootPath = process.cwd()

const useConfigPath = path.resolve(rootPath, 'modelConfig/modelConfig.ts')
if (!fs.existsSync(useConfigPath)) {
    fs.copyFileSync(path.resolve(__dirname, 'modelConfig.ts'), useConfigPath)
}
