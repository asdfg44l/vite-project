import { configure, defineRule } from 'vee-validate'
import NativeRules from '@vee-validate/rules'
import CustomRules from './_rules'

import i18n from '@/plugins/I18n'

// 自定義 VeeValidate wording
// 擴展規則: 在 wording中以 fields > name > rules這三個順序做分層
configure({
  generateMessage: (context) => {
    const currentLocale = i18n.global.locale
    const isRuleWordingExist = (key = '') => {
      return i18n.global.te(`fields.${key}`, currentLocale)
    }
    // 根據專一性取得要使用的 wording
    // ex: email.required會優先於 required的 wording
    const ruleName = isRuleWordingExist(
      `${context.field}.${context.rule?.name}`
    )
      ? `${context.field}.${context.rule?.name}`
      : isRuleWordingExist(context.rule?.name)
      ? context.rule?.name
      : ''

    if (ruleName) return i18n.global.t(`fields.${ruleName}`)

    return `The field ${context.field} is invalid`
  },
})

// 合併並引入自定義和預設驗證規則
function initVeeValidateRules() {
  type MergeRules = typeof NativeRules
  const mergedRules: MergeRules = {
    ...NativeRules,
    ...(CustomRules as MergeRules),
  }

  Object.keys(mergedRules).forEach((rule) => {
    defineRule(rule, mergedRules[rule])
  })
}

export default initVeeValidateRules
