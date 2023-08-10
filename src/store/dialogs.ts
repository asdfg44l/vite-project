import { defineStore } from 'pinia'
import { defineAsyncComponent } from 'vue'
import { useModal, useModalSlot, useVfm } from 'vue-final-modal'

interface DIALOGS_STATE {
  TestModal: Record<string, any>
  Spinner: Record<string, any>
  cacheModal: Record<string, any>
}

function _initState(): DIALOGS_STATE {
  return {
    TestModal: {
      key: Symbol.for('BasicFormModal'),
    },
    Spinner: {
      key: Symbol.for('Spinner'),
    },
    cacheModal: {},
  }
}

interface FORM_MODAL_PAYLOAD {
  layout?: any
  innerForm: {
    location?: 'common' | 'views'
    viewName?: string
    formName: string
  }
  slotAttrs?: Record<string, any>
  keepAlive?: boolean
  haveButton?: boolean
  useStore?: () => Record<string, any>
  stateName?: string
  resetAction?: string
  submitAction?: string
}

export default defineStore('dialogs', {
  state: (): DIALOGS_STATE => _initState(),
  actions: {
    async GENERATE_FORM_MODAL<T extends FORM_MODAL_PAYLOAD>(payload: T) {
      // checkout is logged
      //   const loginStore = useLoginStore()
      //   const isLogged = !!loginStore.token
      //   if (!isLogged) return

      // init payload
      const {
        layout = {
          component: '',
          attrs: {},
        },
        innerForm = {
          location: 'common', // common | views
          viewName: '', // pass layout's or view's dir name
          formName: '',
        },
        slotAttrs = {},
        keepAlive = false,
        haveButton = true,
        useStore = (): Record<string, any> => ({}), // 取得要存取的 store
        stateName = '', // 存取的 state名稱
        resetAction = '', // 重置的 actions名稱
        submitAction = '', // 表單送出時要 call哪個 action
      } = payload
      // get form slot path
      const getSlotPath = () => {
        switch (innerForm.location) {
          case 'views':
            return import(
              /* @vite-ignore */ `../views/${innerForm.viewName}/${innerForm.formName}.vue`
            )
          default:
            return import(
              /* @vite-ignore */ `../components/Form/${innerForm.formName}.vue`
            )
        }
      }

      const modalStore = useStore()

      // create Modal
      const { open, close, destroy } = useModal({
        keepAlive,
        component: defineAsyncComponent(
          () =>
            import(
              /* @vite-ignore */ `../components/Modal/${layout!.component}.vue`
            )
        ),
        attrs: {
          'overlay-transition': 'vfm-fade',
          'content-transition': 'vfm-fade',
          onClosed: () => {
            if (resetAction) modalStore[resetAction]()
            this.REMOVE_MODAL_CACHE({ componentName: innerForm.formName })
            destroy()
          },
          // for closed by clicking the .vfm element.
          onBeforeClose() {
            const needResetStore = !keepAlive && resetAction
            if (needResetStore) modalStore[resetAction]()
          },
          ...layout!.attrs,
        },
        slots: {
          default: useModalSlot({
            component: defineAsyncComponent(getSlotPath),
            attrs: {
              // 接收表單輸入的資料，並存在 store中
              'onUpdate:TForm': function (value: any) {
                Object.assign(modalStore[stateName], value)
              },
              // 送出已驗證成功的資料
              onConfirm: (value: any) => {
                // if submit success send close event
                if (submitAction) modalStore[submitAction](value)
                destroy()
                this.REMOVE_MODAL_CACHE({ componentName: innerForm.formName })
              },
              onClosed() {
                destroy()
                if (!resetAction) return
                modalStore[resetAction]()
              },
              haveButton,
              ...slotAttrs,
            },
          }),
        },
      })
      // 新增 Modal至cacheModal
      if (keepAlive)
        this.ADD_MODAL_CACHE({ componentName: innerForm.formName, open, close })
      open()
    },
    OPEN_FORM_MODAL<
      T extends FORM_MODAL_PAYLOAD & {
        title: string
        attrs?: Record<string, any>
        outerModal?: string
        size?: string
      }
    >(payload: T) {
      const {
        title = '',
        attrs = {},
        outerModal = 'TestModal',
        size = 'lg',
        innerForm,
        slotAttrs = {},
        useStore = () => ({}),
        stateName = '',
        resetAction = '',
        submitAction = '',
        keepAlive = false,
        haveButton = true,
      } = payload
      const isCached = !!this.cacheModal[innerForm.formName]
      if (isCached) {
        this.cacheModal[innerForm.formName].open()
        return
      }

      this.GENERATE_FORM_MODAL({
        layout: {
          component: outerModal,
          attrs: {
            title,
            size,
            ...attrs,
          },
        },
        innerForm,
        slotAttrs,
        useStore,
        stateName,
        resetAction,
        submitAction,
        keepAlive,
        haveButton,
      })
    },
    GENERATE_INFO_MODAL({
      type = '',
      info = '',
      title = '',
      handleConfirm = () => {},
      handleClosed = () => {},
    }) {
      //
      const { open, close } = useModal({
        component: defineAsyncComponent(
          () => import(/* @vite-ignore */ `../components/Modal/TestModal.vue`)
        ),
        attrs: {
          'overlay-transition': 'vfm-fade',
          'content-transition': 'vfm-fade',
          onConfirm() {
            handleConfirm()
            close()
          },
          onClosed() {
            handleClosed()
            close()
          },
          type,
          title,
          info,
        },
      })
      open()
    },
    OPEN_SPINNER() {
      // const {
      //   Spinner: { key: modalId },
      // } = state
      const modalId = this.Spinner.key

      const vfm = useVfm()
      const { open } = vfm

      /**
       * Issue,
       * 為了避免重複開啟Spinner，且因為open()是非同步的，所以不能用 useModal 的做法
       *
       * 改把 Spinner 放在 DialogGroup裡面
       */
      return open(modalId)
    },
    async CLOSE_SPINNER() {
      // const {
      //   Spinner: { key: modalId },
      // } = state
      const modalId = this.Spinner.key

      const vfm = useVfm()
      const { close } = vfm

      return close(modalId)
    },
    ADD_MODAL_CACHE({ componentName, open, close }: Record<string, any>) {
      this.cacheModal = {
        ...this.cacheModal,
        [componentName]: { open, close },
      }
    },
    REMOVE_MODAL_CACHE({ componentName }: Record<string, any>) {
      const isCached = !!this.cacheModal[componentName]
      if (isCached) {
        const { cacheModal }: any = { ...this }
        delete cacheModal[componentName]
        this.cacheModal = { ...cacheModal }
      }
    },
  },
})
