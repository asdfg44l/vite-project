# Vue3 + Vite + Typescript

這個模板是為了快速建置一個 Vue3 Web App 所做，預先將一些必要的 modules 添加進來，避免每次新增專案都必須重複繁瑣的初始化設定，

## 資料夾結構

```
├── public
│   └── favicon.ico
├── src
│   ├── App.vue
│   ├── assets                           //放置圖檔、字型及SCSS
│   │   ├── card_club.svg
│   │   ├── card_diamond.svg
│   │   ├── card_heart.svg
│   │   ├── card_spade.svg
│   │   └── fonts                        //字型
│   │       ├── BrunoAce-Regular.ttf
│   │       └── _fontCSS.scss
│   ├── components                       //共用組件
│   │   ├── Async                        //async setup組件
│   │   │   └── UserList.vue
│   │   ├── Form                         //表單
│   │   │   ├── UserForm.vue
│   │   │   └── _useTForm.js             //所有表單共用的 Composition API，定義了所有表單都一定要有的行為
│   │   ├── Functional                   //Functional Components
│   │   │   └── TestFunctional.js
│   │   ├── Greeting.vue
│   │   ├── Modal                        //靜態彈窗
│   │   │   ├── DialogGroup.vue
│   │   │   └── TestModal.vue
│   │   ├── TIcon.vue                    //使用自動引入的 svg icon
│   │   ├── TInput.vue                   //配合 vee-validate的 Field使用，主要用於 input外觀客製化
│   │   ├── TInputComposed.vue           //使用 vee-validate的 composition API製作的 input元件，可以用於取代 Field
│   │   └── TSuspense.vue                //將帶有 async setup元件或是非同步元件當作 slot傳入，可以自定義加載狀態以及 pending和 resolve的行為
│   ├── env.d.ts
│   ├── layouts
│   │   ├── DefaultLayout.vue
│   │   ├── Layout.vue
│   │   └── NewLayout.vue
│   ├── locales                          //翻譯
│   │   ├── _global.json
│   │   ├── en-us.json
│   │   └── zh-tw.json
│   ├── main.js
│   ├── plugins
│   │   ├── Format                       //時間數字格式化功能
│   │   │   ├── bigNumber.ts
│   │   │   ├── date.ts
│   │   │   └── index.ts
│   │   ├── I18n.ts
│   │   ├── Vdirectives
│   │   │   └── IntersectionObserver.js  //非同步監聽特定元素是否進入可視範圍的工具
│   │   ├── VeeValidate                  //表單驗證相關設定
│   │   │   ├── _rules.ts
│   │   │   └── index.ts
│   │   ├── Web_worker
│   │   │   ├── multiply.js
│   │   │   └── websocket.js
│   │   ├── axios.js
│   │   ├── hello.ts
│   │   └── initial.js                   //插件入口
│   ├── router
│   │   ├── index.js
│   │   ├── modules
│   │   │   ├── main.js
│   │   │   └── user.js
│   │   └── modulesLoader.js             //自動引用並生成 router List
│   ├── store
│   │   ├── index.js
│   │   ├── modules
│   │   │   ├── banks
│   │   │   │   ├── HSBC.js
│   │   │   │   └── localbanks
│   │   │   │       └── THC.js
│   │   │   ├── dialogs.js               //管理動態彈窗狀態
│   │   │   └── profile.js
│   │   ├── modulesLoader.js             //自動根據資料夾生成對應的 store modules 結構
│   │   └── types
│   │       └── index.ts
│   ├── utils                            //共用工具，包含狀態基礎定義
│   │   ├── config.ts
│   │   ├── requestAnimationFrame.js
│   │   └── test.ts
│   └── views                            //各項功能的範例頁面
│       ├── Home.vue
│       ├── IntersectionObserver.vue
│       ├── LayoutTest.vue
│       ├── LayoutTestChild.vue
│       ├── Playground.vue
│       ├── Suspense.vue
│       ├── SvgIcon.vue
│       ├── VeeValidate.vue
│       ├── VueModal.vue
│       └── WebWorker.vue
├── tsconfig.json
├── tsconfig.node.json
├── vite.config.ts
└── windi.config.js
```

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
<!-- - [mitt](github.com/developit/mitt) -->

### 擴充函式庫

- [lodash](https://lodash.com/)
<!-- - [uuid](github.com/uuidjs/uuid#readme) _For the creation of RFC4122 UUIDs_ -->

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
- [Vee-Validate](https://vee-validate.logaretm.com/v4/) _form validate_

### SCSS

- [sass](github.com/sass/dart-sass)
- [windicss](https://windicss.org/)
- [vite-plugin-windicss](https://github.com/antfu/vite-plugin-windicss)

### 補丁

- [@type/node](https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/node)

## 自定義擴充功能

放置了一些常用的功能像是 layout 或是 svgIcon，以避免重複開發功能．

### Feature

- Page Layout: 可以透過設定 router 的 meta.layoutName 來決定該頁面的 layout．
- Dynamic Modal Form:
  > 結合 vee-validate，vue-final-modal 來實現動態彈出表單並通過 dialogs.js 來管理 <br>
  > 可以根據參數決定: 外層彈窗 layout，內部 Form，資料存取位置，發送資料的函式．
- Plugins with TypeScript: Plugins 現在被註記上型別，方便在 vue template 以及 script 中使用 Type Hint

## Notice

註記一些使用上偶爾會遇到的問題，以及其解法

### 關於 script 與 script setup 混用

有些 option 目前是不能使用在 script setup 上的(ex: inheritAttrs)，這時候就會需要混用 script(ex: TInputComposed.vue)<br>
不過這時候要注意，保持 script 在前 script setup 在後的宣告方式，並且將所有的 import 都移到 script 中，否則 eslint 會自動將 script 中的 export 項目合併到 script setup．<br>
(ex: Playground.vue)

## Pre-commit

- [Prettier + ESlint](https://juejin.cn/post/7142815651294511135)
- [@antfu/eslint-config](https://github.com/antfu/eslint-config)

## Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar)
