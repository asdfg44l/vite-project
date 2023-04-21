function _initProfile() {
  return {
    userAccount: '',
    userEmail: '',
  }
}
export default {
  state: _initProfile(),
  mutations: {
    updateField(state, payload) {
      state = { ...state, ...payload }
    },
    SetUserProfile: (state, { account, email }) => {
      state.userAccount = account
      state.userEmail = email
    },
  },
}
