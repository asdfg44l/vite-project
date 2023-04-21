import { defineAsyncComponent } from 'vue'
import { useModal, useModalSlot } from 'vue-final-modal'

function _initState() {
  return {
    TestModal: {
      key: Symbol.for('TestModal'),
    },
  }
}

// function _modal_factory(
//   component,
//   attrs = {},
//   title = '',
//   slots = {},
//   storePath = '',
//   submit = () => {}
// ) {
//   const { open, close } = useModal({
//     component,
//     attrs,
//     slots
//   })
// }

export default {
  state: _initState(),
  actions: {
    // OPEN-
    OPEN_FORM_MODAL(
      { commit },
      { layout = {}, slots = {}, storePath = '', submit = () => {} } = {}
    ) {
      const { open, close } = useModal({
        component: defineAsyncComponent(() =>
          import(
            /* @vite-ignore */ `../../components/Modal/${layout.component}.vue`
          )
        ),
        attrs: {
          'overlay-transition': 'vfm-fade',
          'content-transition': 'vfm-fade',
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
              onConfirm(value) {
                // submit value
                // if submit success send close event
                submit(value)
                close()
              },
              onCancel() {
                close()
              },
              // 接收表單輸入的資料，並存在 store中
              'onUpdate:userForm': function (value) {
                commit(storePath, value, { root: true })
              },
              haveButton: true,
              ...slots.default.attrs,
            },
          }),
        },
      })
      open()
    },
    OPEN_USER_MODAL({ dispatch }, { layout }) {
      dispatch('OPEN_FORM_MODAL', {
        layout,
        slots: {
          default: {
            component: 'UserForm',
          },
        },
        storePath: 'profile/SetUserProfile',
      })
    },
  },
}
