import { createI18n } from 'vue-i18n'
import global from '@/I18n/locales/_global.json'
import enUS from '@/I18n/locales/en-us.json'
import zhTW from '@/I18n/locales/zh-tw.json'

const en_us = { ...global, ...enUS }
const zh_tw = { ...global, ...zhTW }

type MessageSchema = typeof en_us
type LanguageList = 'en-us' | 'zh-tw'

function getUserLocales() {
  let locales = window.navigator.language.toLowerCase()
  // en 開頭的語系預設都是用 en-us
  switch (true) {
    case /(en-us)|(^en)/.test(locales):
      locales = 'en-us'
      break
    default:
      break
  }
  return locales
}

const i18n = createI18n<[MessageSchema], LanguageList>({
  legacy: false,
  locale: getUserLocales(),
  fallbackLocale: 'zh-tw',
  messages: {
    'en-us': en_us,
    'zh-tw': zh_tw,
  },
})

export default i18n
