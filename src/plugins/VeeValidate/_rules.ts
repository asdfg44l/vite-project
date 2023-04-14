interface CustomRules {
  [key: string]: any
}

const rules: CustomRules = {
  validateEmail(values: string) {
    return !!values
  },
}

export default rules
