#!/usr/bin/env node
const fs = require("fs");
const path = require("path");

const rootPath = process.cwd();

const dirName = 'layerAppStart'

const useDir = path.resolve(rootPath, dirName);

const packageRootDir = path.resolve(path.dirname(__dirname), dirName);

if (!fs.existsSync(path.resolve(useDir, 'index.ts')) && !fs.existsSync(path.resolve(useDir, 'index.js'))) {
    if (!fs.existsSync(useDir)) {
        fs.mkdirSync(useDir)
    }
    const files = fs.readdirSync(packageRootDir)
    for (const file of files) {
        fs.copyFileSync(path.resolve(packageRootDir, file), path.resolve(useDir, file))
    }
}
