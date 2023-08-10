import { addMethod, setLocale, string } from 'yup'
import i18n from '@/plugins/I18n'

// 合併並引入自定義和預設驗證規則
function initVeeValidateRules() {
  // yup
  // ${path}${value} or name, like ${min} ${max}
  setLocale({
    mixed: {
      required: (obj) => {
        // console.log(obj);
        return i18n.global.t('common.formError.required')
      },
      notType: (obj) => {
        return 'noType'
      },
    },
    string: {
      min: (obj) => {
        return i18n.global.t('common.formError.minLength', { min: obj.min })
      },
    },
    number: {
      // : 'dddd'
    },
  })
  /**
   * yup的鏈式順序有問題，所以這裡才新增了這個新規則...
   * username: Yup.string().sequence([
   *     () => Yup.string().max(20).required('Username is required'), // check format first
   *     () => Yup.string().unique('Username is already taken', uniqueUsername),  // check uniqe via api
   *   ])
   */
  addMethod(string, 'sequence', function test(funcList) {
    return this.test(async (value, context) => {
      try {
        for (const func of funcList) {
          await func().validate(value)
        }
      } catch (e: any) {
        const message = e.message as any
        return context.createError({ message })
      }
      return true
    })
  })
  // // custom rule
  // // chain rule
  // addMethod(number, 'chainRule', () => {
  //   return number().min(10).max(30)
  // })
  // // with test
  // addMethod(string, 'wordOnly', () => {
  //   return string().test('', 'wordOnly!!', (value, context) => {
  //     if (!value) return false
  //     const re = /[^a-zA-Z0-9]/g
  //     return !re.test(value)
  //   })
  // })
  // // with matches
  // addMethod(string, 'endWithHello', () => {
  //   return string().matches(/hello$/)
  // })
  // // transform
  // // yup.string().append('aaaa').cast('suprise ')
  // addMethod(string, 'append', function append(appendString: string) {
  //   return string().transform((value) => `${value}${appendString}`)
  // })
}

export default initVeeValidateRules
