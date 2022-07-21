import { createStore } from "vuex";

//modules
import apple from "./modules/apple";
import banana from "./modules/banana";

const store = createStore({
  state: () => ({
    msg: "hello",
  }),
  modules: {
    apple,
    banana,
  },
});

export default store;
