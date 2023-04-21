import { useModal, useModalSlot } from 'vue-final-modal'
// import { ActionContext, Commit } from 'vuex'
import { DIALOGS } from '@/utils/config'
import TestModal from '@/components/Modal/TestModal.vue'
// import Greeting from '@/components/Greeting.vue'
import TInputComposed from '@/components/TInputComposed.vue'
import UserForm from '@/components/Form/UserForm.vue'

function _initState() {
  return {
    TestModal: {
      key: Symbol.for('TestModal'),
    },
    callback: {
      ProfileEmail: (commit, value) =>
        commit('profile/SetUserProfile', value, { root: true }),
    },
  }
}

export default {
  state: _initState(),
  actions: {
    [DIALOGS.OPEN_TEST_MODAL](
      { commit },
      { title = '', slots = {}, callback = () => {} } = {}
    ) {
      const { open, close } = useModal({
        component: TestModal,
        attrs: {
          'overlay-transition': 'vfm-fade',
          'content-transition': 'vfm-fade',
          onConfirm() {
            close()
          },
          title,
        },
        slots: {
          default: useModalSlot({
            component: TInputComposed,
            attrs: {
              name: 'emailx',
              rules: 'required|email',
              // 接收表單回傳的資料，並存在 store中
              'onUpdate:modelValue': function (value) {
                callback(commit, value)
              },
            },
          }),
          ...slots,
        },
      })
      open()
    },
    [DIALOGS.OPEN_USER_MODAL](
      { commit },
      { title = '', slots = {}, callback = () => {}, submit = () => {} } = {}
    ) {
      const { open, close } = useModal({
        component: TestModal,
        attrs: {
          'overlay-transition': 'vfm-fade',
          'content-transition': 'vfm-fade',
          title,
        },
        slots: {
          default: useModalSlot({
            component: UserForm,
            attrs: {
              onConfirm(value) {
                // submit value
                // if submit success send confirm event
                submit(value)
                close()
              },
              // 接收表單輸入的資料，並存在 store中
              'onUpdate:userForm': function (value) {
                callback(commit, value)
              },
            },
          }),
          ...slots,
        },
      })
      open()
    },
  },
}
