
  import zh from "./zh/index"
import en from "./en/index"

const o = {zh, en}

export const setI18nLan = (lan) => {
  window.i18n = o[lan]
}
  