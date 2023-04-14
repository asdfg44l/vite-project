export default {
  namespaced: true,
  state: () => ({
    name: 'apple',
  }),
  getters: {
    GetApple(state) {
      return state.name
    },
  },
  actions: {
    runCommand() {
      return new Promise((resolve, reject) => {
        return resolve('hiii')
      })
    },
  },
}
