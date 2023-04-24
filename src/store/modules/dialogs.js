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
    // OPEN-
    OPEN_FORM_MODAL(
      { dispatch, commit },
      {
        layout = {},
        slots = {},
        storePath, // 存取的 mutation名稱
        resetPath, // 重置的 mutation名稱
        submitPath, // 表單送出時要 call哪個 action
        keepAlive = false,
      } = {}
    ) {
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
            destroy()
            commit('REMOVE_CACHE', {
              componentName: slots.default.component,
            })
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
              haveButton: true,
              ...slots.default.attrs,
            },
          }),
        },
      })
      // 新增至cache
      if (keepAlive)
        commit('ADD_NEW_CACHE', {
          componentName: slots.default.component,
          open,
          close,
        })
      open()
    },
    OPEN_USER_MODAL(
      { state, dispatch },
      {
        layout,
        title,
        submitPath,
        size = 'md',
        storePath = '',
        resetPath = '',
        keepAlive = false,
      }
    ) {
      const isCached = !!state.cacheModal.UserForm
      if (isCached) {
        state.cacheModal.UserForm.open()
        return
      }
      dispatch('OPEN_FORM_MODAL', {
        layout: {
          component: 'TestModal',
          attrs: {
            title,
            size,
          },
          ...layout,
        },
        slots: {
          default: {
            component: 'UserForm',
          },
        },
        storePath,
        resetPath,
        submitPath,
        keepAlive,
      })
    },
  },
  mutations: {
    ADD_NEW_CACHE(state, { componentName, open, close }) {
      state.cacheModal = {
        ...state.cacheModal,
        [componentName]: { open, close },
      }
    },
    REMOVE_CACHE(state, { componentName }) {
      const isCached = !!state.cacheModal[componentName]
      if (isCached) {
        const { cacheModal } = { ...state }
        delete cacheModal[componentName]
        state.cacheModal = { ...cacheModal }
      }
    },
  },
}
