interface CustomRules {
  [key: string]: (v: string) => boolean
}

const rules: CustomRules = {
  validateEmail(values: string) {
    return !!values
  },
}

export default rules
