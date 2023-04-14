# Vue3 + Vite + Typescript

這個模板是為了快速建置一個 Vue3 Web App 所做，預先將一些必要的 modules 添加進來，避免每次新增專案都必須重複繁瑣的初始化設定，

## 已安裝的 Modules

請使用 Node v16.16.0

### Vue 生態系

- [vue](https://github.com/vuejs/core/tree/main/packages/vue#readme)
- [vite](https://github.com/vitejs/vite/tree/main/#readme)
- [vue-router](https://github.com/vuejs/router#readme)
- [vuex](https://github.com/vuejs/vuex#readme)
- [vuex-map-fields](https://github.com/maoberlehner/vuex-map-fields)
- [vue-final-modal](https://vue-final-modal.org/)
- [vue-tsc](github.com/johnsoncodehk/volar#readme)
- [mitt](github.com/developit/mitt)

### 擴充函式庫

- [lodash](https://lodash.com/)
- [uuid](github.com/uuidjs/uuid#readme) _For the creation of RFC4122 UUIDs_

### 伺服器請求

- [axios](https://axios-http.com/)

### 資源自動引入

- [unplugin-auto-import](github.com/antfu/unplugin-auto-import#readme)
- [unplugin-vue-components](https://github.com/antfu/unplugin-vue-components)
- [vite-plugin-svg-icons](https://github.com/anncwb/vite-plugin-svg-icons/tree/master/#readme)

### 表單驗證, 文字、數字及時間格式化

- [vueI18n](https://github.com/intlify/vue-i18n-next/tree/master/packages/vue-i18n#readme)
- [bigNumber.js](https://github.com/MikeMcl/bignumber.js#readme)
- [day.js](day.js.org)
- [Vee-Validate] _form validate_

### SCSS

- [sass](github.com/sass/dart-sass)
- [windicss](https://windicss.org/)
- [@headlessui/vue](https://github.com/tailwindlabs/headlessui#readme)
- [vite-plugin-windicss](https://github.com/antfu/vite-plugin-windicss)

### 補丁

- [@type/node](https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/node)

## 自定義擴充功能

放置了一些常用的功能像是 layout 或是 svgIcon，以避免重複開發功能．

### Components

| 名稱      | 功能描述                                                              |
| --------- | --------------------------------------------------------------------- |
| TIcon     | 使用自動引入的 svg icon                                               |
| TSuspense | 封裝原生 Suspense，並可傳入 resolve, pending 兩個 props 作為 callback |

### Function

- Page Layout: 可以透過設定 router 的 meta.layoutName 來決定該頁面的 layout．
- store/modulesLoader: 自動根據資料夾生成對應的 store modules 結構
- router/modulesLoader: 自動引用並生成 router List

## Pre-commit

- [Prettier + ESlint](https://juejin.cn/post/7142815651294511135)
- [@antfu/eslint-config](https://github.com/antfu/eslint-config)

## Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar)
