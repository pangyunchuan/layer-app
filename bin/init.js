#!/usr/bin/env node
const fs = require("fs");
const path = require("path");

const rootPath = process.cwd();

const useConfigPath = path.resolve(rootPath, "modelConfig/index.ts");


const useDir = path.dirname(useConfigPath);

const packageRoot = path.dirname(__dirname);

if (!fs.existsSync(useConfigPath)) {
    if (!fs.existsSync(useDir)) {
        fs.mkdirSync(useDir)
    }
    fs.copyFileSync(path.resolve(packageRoot, "modelConfig/index.ts"), useConfigPath)
}
