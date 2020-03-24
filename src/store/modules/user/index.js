import state from "@project_src/store/modules/user/state";
import getters from "@project_src/store/modules/user/getters";
import mutations from "@project_src/store/modules/user/mutations";
import actions from "@project_src/store/modules/user/actions";

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
