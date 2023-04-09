import { createStore } from "vuex";
import modules from "./modulesLoader";

const store = createStore({
  state: () => ({
    msg: "hello",
  }),
  modules,
});

export default store;
