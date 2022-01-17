const fs = require("fs");
const path = require("path");

const rootPath = process.cwd()

const useConfigPath = path.resolve(rootPath, 'modelConfig/index.ts')

console.log('需要文件', useConfigPath)

const useDir = path.dirname(useConfigPath)

const packageRoot = path.dirname(__dirname)

if (!fs.existsSync(useConfigPath)) {
    if (!fs.existsSync(useDir)) {
        console.log('创建目录', useDir)
        fs.mkdirSync(useDir)
    }
    console.log('原始文件', path.resolve(packageRoot, 'index.ts'))
    fs.copyFileSync(path.resolve(packageRoot, 'index.ts'), useConfigPath)
}
