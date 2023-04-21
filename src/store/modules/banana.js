export default {
  state: () => ({
    name: 'banana',
  }),
  getters: {
    GetBanana(state) {
      return state.name
    },
  },
}
