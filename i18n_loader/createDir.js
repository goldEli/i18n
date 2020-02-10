const fs = require("fs")
const createDir = () => {
  fs.mkdirSync("../i18n")  
  fs.mkdirSync("../i18n/zh")  
  fs.mkdirSync("../i18n/en")  
  fs.writeFileSync("../i18n/zh/index.js",``) 
  fs.writeFileSync("../i18n/en/index.js", ``)
  fs.writeFileSync("../i18n/index.js", `
/**
 * 此文件请勿修改
 * Do not modify this file
*/
import zh from "./zh/index"
import en from "./en/index"

const o = {zh, en}

export const setI18nLan = (lan) => {
  window.i18n = o[lan]
}
  `)
}
module.exports = createDir