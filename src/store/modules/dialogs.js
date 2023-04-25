import { defineAsyncComponent } from 'vue'
import { useModal, useModalSlot } from 'vue-final-modal'

function _initState() {
  return {
    TestModal: {
      key: Symbol.for('TestModal'),
    },
    cacheModal: {},
  }
}

export default {
  state: _initState(),
  actions: {
    GENERATE_FORM_MODAL(
      { dispatch, commit },
      {
        layout = {},
        slots = {},
        keepAlive = false,
        haveButton = true,
        storePath, // 存取的 mutation名稱
        resetPath, // 重置的 mutation名稱
        submitPath, // 表單送出時要 call哪個 action
      } = {}
    ) {
      // create Modal
      const { open, close, destroy } = useModal({
        keepAlive,
        component: defineAsyncComponent(() =>
          import(
            /* @vite-ignore */ `../../components/Modal/${layout.component}.vue`
          )
        ),
        attrs: {
          'overlay-transition': 'vfm-fade',
          'content-transition': 'vfm-fade',
          onClosed() {
            if (resetPath) commit(resetPath, null, { root: true })
            commit('REMOVE_MODAL_CACHE', {
              componentName: slots.default.component,
            })
            destroy()
          },
          // for closed by clicking the .vfm element.
          onBeforeClose() {
            const needResetStore = !keepAlive && resetPath
            if (needResetStore) commit(resetPath, null, { root: true })
          },
          ...layout.attrs,
        },
        slots: {
          default: useModalSlot({
            component: defineAsyncComponent(() =>
              import(
                /* @vite-ignore */ `../../components/Form/${slots.default.component}.vue`
              )
            ),
            attrs: {
              // 接收表單輸入的資料，並存在 store中
              'onUpdate:TForm': function (value) {
                if (storePath) commit(storePath, value, { root: true })
              },
              // 送出已驗證成功的資料
              onConfirm(value) {
                // if submit success send close event
                if (submitPath) dispatch(submitPath, value, { root: true })
                destroy()
                commit('REMOVE_CACHE', {
                  componentName: slots.default.component,
                })
              },
              haveButton,
              ...slots.default.attrs,
            },
          }),
        },
      })
      // 新增 Modal至cacheModal
      if (keepAlive)
        commit('ADD_MODAL_CACHE', {
          componentName: slots.default.component,
          open,
          close,
        })
      open()
    },
    OPEN_FORM_MODAL(
      { state, dispatch },
      {
        title,
        submitPath,
        attrs = {},
        outerModal = 'TestModal',
        size = 'md',
        innerForm = '',
        storePath = '',
        resetPath = '',
        keepAlive = false,
        haveButton = true,
      }
    ) {
      const isCached = !!state.cacheModal[innerForm]
      if (isCached) {
        state.cacheModal[innerForm].open()
        return
      }
      dispatch('GENERATE_FORM_MODAL', {
        layout: {
          component: outerModal,
          attrs: {
            title,
            size,
            ...attrs,
          },
        },
        slots: {
          default: {
            component: innerForm,
          },
        },
        storePath,
        resetPath,
        submitPath,
        keepAlive,
        haveButton,
      })
    },
  },
  mutations: {
    ADD_MODAL_CACHE(state, { componentName, open, close }) {
      state.cacheModal = {
        ...state.cacheModal,
        [componentName]: { open, close },
      }
    },
    REMOVE_MODAL_CACHE(state, { componentName }) {
      const isCached = !!state.cacheModal[componentName]
      if (isCached) {
        const { cacheModal } = { ...state }
        delete cacheModal[componentName]
        state.cacheModal = { ...cacheModal }
      }
    },
  },
}
