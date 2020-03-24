import state from "@project_src/store/modules/kanban/state";
import getters from "@project_src/store/modules/kanban/getters";
import mutations from "@project_src/store/modules/kanban/mutations";
import actions from "@project_src/store/modules/kanban/actions";

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
