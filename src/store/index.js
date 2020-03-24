// * Global
import Vue from "vue";
import Vuex from "vuex";
// * Modules
import UserModule from "@project_src/store/modules/user";
import TodoModule from "@project_src/store/modules/todo";

// eslint-disable-next-line no-undef
const debug = process.env.NODE_ENV !== "production";

Vue.use(Vuex);

export default new Vuex.Store({
  strict: debug,
  modules: {
    user: UserModule,
    todo: TodoModule,
  },
});
