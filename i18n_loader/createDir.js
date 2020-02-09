const fs = require("fs")
const createDir = () => {
  fs.mkdirSync("./src/i18n")  
  fs.mkdirSync("./src/i18n/zh")  
  fs.mkdirSync("./src/i18n/en")  
  fs.writeFileSync("./src/i18n/zh/index.js",`
/**
 * 此文件请勿修改
 * Do not modify this file
*/
const md = {
}
export default md
  `) 
  fs.writeFileSync("./src/i18n/en/index.js", `
/**
 * 此文件请勿修改
 * Do not modify this file
*/
const md = {
}
export default md
  `)
  fs.writeFileSync("./src/i18n/index.js", `
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