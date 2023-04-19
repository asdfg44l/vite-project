function _initProfile() {
  return {
    userAccount: '',
    userEmail: '',
  }
}
export default {
  namespaced: true,
  state: () => _initProfile(),
  mutations: {
    SetUserProfile: (state, { account, email }) => {
      state.userAccount = account
      state.userEmail = email
    },
  },
}
