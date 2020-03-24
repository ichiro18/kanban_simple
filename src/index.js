// * Global
import Vue from "vue";
import Toasted from "vue-toasted";
import App from "@project_src/App.vue";
// * Modules
import store from "@project_src/store";
// * Assets
import "@project_src/assets/styles/theme.scss";

Vue.use(Toasted);

new Vue({
  store,
  render: (h) => h(App),
}).$mount("#app");
