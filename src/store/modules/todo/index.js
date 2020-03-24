import state from "@project_src/store/modules/todo/state";
import getters from "@project_src/store/modules/todo/getters";
import mutations from "@project_src/store/modules/todo/mutations";
import actions from "@project_src/store/modules/todo/actions";

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
