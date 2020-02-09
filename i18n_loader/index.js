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
  this.callback(null, code, map)
}



module.exports = i18nLoader
