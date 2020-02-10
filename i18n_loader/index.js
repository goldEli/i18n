const parser = require("@babel/parser")
const traverse = require("@babel/traverse").default
const babel = require("@babel/core")
const fs = require("fs")
const createDir = require("./createDir")
const { resolve } = require('path');
const { readdir } = require('fs').promises;
const md5 = require("md5")


console.log("开始生成国际化资源")
if (!fs.existsSync("../i18n")) {
  createDir()
}

async function getFiles(dir) {
  const dirents = await readdir(dir, { withFileTypes: true });
  const files = await Promise.all(dirents.map((dirent) => {
    const res = resolve(dir, dirent.name);
    return dirent.isDirectory() ? getFiles(res) : res;
  }));
  return Array.prototype.concat(...files).filter(item => item.includes(".js"));

}

async function extractChineseFromFile(filename) {
  const code = fs.readFileSync(filename, "utf-8");
  const ast = codeToAst(code)
  const o = {}
  // 遍历语法树
  traverse(ast, {
    StringLiteral({node}) {
      if (node) {
        const text = node.value
        if (isChineseChar(text)) {
          o[md5(text)] = text
        }
      }
    }
  })
  return o
}
/**
 * 是否含有中文（也包含日文和韩文）
 * @param {*} str
 */
function isChineseChar(str) {
  var reg = /[\u4E00-\u9FA5\uF900-\uFA2D]/
  return reg.test(str)
}
/**
 * 代码字符串转成语法树
 * @param {*} code
 */
function codeToAst(code) {
  const ast = parser.parse(code, {
    sourceType: "module", // 识别ES Module
    plugins: [
      "jsx", // enable jsx
      "classProperties",
      "dynamicImport",
      "optionalChaining",
      "decorators-legacy"
    ]
  })
  return ast
}

async function getAllChinese(files) {
  let o = {}
  for (let file of files) {
    o = {...o, ...await extractChineseFromFile(file)}
  }
  return o
}
function createSource(type, allChinese) {

  fs.writeFileSync(`../i18n/${type}/index.js`,`
  /**
   * 此文件请勿修改
   * Do not modify this file
  */
  const md = {
    ${Object.keys(allChinese).map(key => `"${key}":"${type === "zh" ? allChinese[key]: "待翻译"}"`).join(",\n")} 
  }
  export default md
  `) 
}
async function main() {

  const files = await getFiles("../src")
  const allChinese = await getAllChinese(files) 
  createSource("zh",allChinese)
  createSource("en",allChinese)
}

main()