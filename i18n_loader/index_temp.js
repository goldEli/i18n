const parser = require("@babel/parser")
const traverse = require("@babel/traverse").default
const babel = require("@babel/core")
const fs = require("fs")
const createDir = require("./createDir")
// const md5 = require("md5")

// const chineseSource = require("../../../i18n/zh/businessLanguage.js")

/**
 * 在调用 this.callback 前，对 code 进行国际化处理
 * @param {string} code
 * @param {不知道是啥} map
 */
console.log("Start i18n")
if (!fs.existsSync("./src/i18n")) {
  createDir()
}
function i18nLoader(code, map) {
  getChinese(code)
  this.callback(null, code, map)
}
const getChinese = (code) => {
  // 该文件代码是否忽略国际化
  if (isIgnore(code)) {
    return code
  }

  // 代码转语法树
  const ast = codeToAst(code)

  // 处理语法树
  handleAst(ast)
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
/**
 * 遍历语法树，将中文替换成变量
 * @param {*} ast
 */
function handleAst(ast) {
  // 遍历语法树
  traverse(ast, {
    StringLiteral({node}) {
      if (node) {
        const text = node.value
        if (isChineseChar(text)) {
          console.log(text)
        }
      }
    }
  })
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
 * 如果代码中包含 i18nIgnore 关键字，则该文件忽略国际化
 * @param {*} code
 */
function isIgnore(code) {
  return code.includes("i18nIgnore")
}

module.exports = i18nLoader
