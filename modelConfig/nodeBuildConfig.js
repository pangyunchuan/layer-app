const fs = require("fs");
const path = require("path");

const rootPath = process.cwd()

const useConfigPath = path.resolve(rootPath, 'modelConfig/modelConfig.ts')
console.log(1, fs.existsSync(useConfigPath), useConfigPath)
console.log(2, fs.existsSync(path.dirname(useConfigPath)), path.dirname(useConfigPath))
console.log(3, path.resolve(__dirname, 'modelConfig.ts'))
if (!fs.existsSync(useConfigPath)) {
    if (!fs.existsSync(path.dirname(useConfigPath))) {
        fs.mkdirSync(path.dirname(useConfigPath))
    }
    fs.copyFileSync(path.resolve(__dirname, 'modelConfig.ts'), useConfigPath)
}
