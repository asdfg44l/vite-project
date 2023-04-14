import { defineRule } from 'vee-validate'
import NativeRules from '@vee-validate/rules'
import CustomRules from './rules'

function initVeeValidateRules() {
  const mergedRules = { ...NativeRules, ...CustomRules }

  Object.keys(mergedRules).forEach((rule) => {
    defineRule(rule, mergedRules[rule])
  })
}

export default initVeeValidateRules
