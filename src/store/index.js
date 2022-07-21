import { createStore } from "vuex";

//modules
import apple from './modules/apple'
import banana from "./modules/banana";

export default createStore({
    state: () => ({
        msg: 'hello'
    }),
    modules: {
        apple,
        banana
    }
})