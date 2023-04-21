function _initProfile() {
  return {
    userAccount: '',
    userEmail: '',
  }
}
export default {
  state: _initProfile(),
  mutations: {
    SetUserProfile: (state, { account, email }) => {
      state.userAccount = account
      state.userEmail = email
    },
  },
}
