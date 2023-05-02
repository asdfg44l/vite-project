/* eslint-disable */
/* prettier-ignore */
// @ts-nocheck

import '@vue/runtime-core'
export declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $format: typeof import('./plugins/format/index')['format']
  }
}
