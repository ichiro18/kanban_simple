import { Structure } from "@project_src/common/const/structures";

export default {
  update({ commit }, payload) {
    return new Promise((resolve) => {
      const user = { ...Structure.USER };
      if (payload.post) {
        user.post = payload.post;
      }
      if (payload.date) {
        user.date = payload.date.toLocaleDateString();
      }
      user.name = payload.name;
      commit("update", user);
      localStorage.setItem("user", JSON.stringify(user));
      resolve(user);
    });
  },
};
