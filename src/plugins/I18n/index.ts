import { createI18n } from "vue-i18n";
import enUS from "./locales/en-us.json";
import zhTW from "./locales/zh-tw.json";

type MessageSchema = typeof enUS
type LanguageList = 'en-us' | 'zh-tw'

const getUserLocales = () => {
  let locales = window.navigator.language.toLowerCase()
  //en 開頭的語系預設都是用 en-us
  switch(true) {
    case /(en-us)|(^en)/.test(locales):
      locales = "en-us"
      break;
    default:
      locales = locales
  }
  return locales
}

console.log(getUserLocales())

const i18n = createI18n<[MessageSchema], LanguageList>({
  legacy: false,
  locale: "zh-tw",
  fallbackLocale: "zh-tw",
  messages: {
    "en-us": enUS,
    "zh-tw": zhTW,
  },
});

export default i18n;
