export default {
  namespaced: true,
  state: () => ({
    name: 'banana',
  }),
  getters: {
    GetBanana(state) {
      return state.name
    },
  },
}
