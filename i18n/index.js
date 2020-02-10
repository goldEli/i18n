
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
  