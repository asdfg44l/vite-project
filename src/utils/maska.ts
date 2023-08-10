/**
 * maska programmatic use
 * 可以在 Element plus input使用
 * 因為直接使用 v-maska 會導致Element plus input上的 v-model失去作用
 *
 * 所以轉向使用input的 formatter及 parser來解
 *
 */
import { Mask } from 'maska'

export const alphanumericMask = new Mask({
  mask: '#',
  tokens: { '#': { pattern: /[a-zA-Z0-9]/, repeated: true } },
})

export const numberOnly = new Mask({
  mask: '#',
  tokens: { '#': { pattern: /[0-9]/, repeated: true } },
})

export function numberFormatWithThousand(value: string) {
  const maska = new Mask({
    mask: '0.99',
    tokens: {
      '0': { pattern: /[0-9]/, multiple: true },
      '9': { pattern: /[0-9]/, optional: true },
    },
  })
  // preProcess
  const preProcess = (value: string) => value.replace(/[$,]/g, '')
  const postProcess = (value: any) => {
    if (!value) return ''
    if (value.replace('.', '').length > 12) value = value.slice(0, 12)
    const sub =
      3 - (value.includes('.') ? value.length - value.indexOf('.') : 0)

    return Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    })
      .format(value)
      .slice(1, sub ? -sub : undefined)
  }
  return {
    masked: postProcess(maska.masked(preProcess(value))),
    unmasked: postProcess(maska.unmasked(preProcess(value))),
    completed: maska.completed(value),
  }
}
