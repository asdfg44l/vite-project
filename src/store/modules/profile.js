function _initProfile() {
  return {
    user: {
      account: '',
      email: '',
    },
  }
}
export default {
  state: _initProfile(),
  actions: {
    SEND_PROFILE(_, payload) {
      console.log('send: ', payload)
    },
  },
  mutations: {
    RESET_ALL(state) {
      state = _initProfile()
    },
    UPDATE_FIELD(state, payload) {
      state = { ...state, ...payload }
    },
    SET_USER_PROFILE(state, payload) {
      state.user = { ...payload }
    },
    RESET_USER_PROFILE(state) {
      state.user.account = ''
      state.user.email = ''
    },
  },
}
