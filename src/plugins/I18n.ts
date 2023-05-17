import { createI18n } from 'vue-i18n'

function getLocales() {
  const locales = import.meta.glob<any>('../locales/*.json', { eager: true })
  const localeMaps = Object.fromEntries(
    Object.entries(locales).map(([path, locale]) => [
      path.match(/([\w-]*)\.json$/)?.[1],
      locale.default,
    ])
  )

  const mergeNormalWithGlobal = (
    list: Record<string, Record<string, string>>
  ) => {
    const { _global, ...others } = list

    for (const key in others) {
      others[key] = { ..._global, ...others[key] }
    }
    return others
  }

  return mergeNormalWithGlobal(localeMaps)
}

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

const i18n = createI18n({
  legacy: false,
  locale: getUserLocales(),
  fallbackLocale: 'zh-tw',
  messages: {
    ...getLocales(),
  },
})

export default i18n
