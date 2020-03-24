// * Global
import Vue from "vue";
import Toasted from "vue-toasted";
import vClickOutside from "v-click-outside";
import App from "@project_src/App.vue";
// * Modules
import store from "@project_src/store";
// * Assets
import "@project_src/assets/styles/theme.scss";

Vue.use(Toasted);
Vue.use(vClickOutside);

new Vue({
  store,
  render: (h) => h(App),
}).$mount("#app");
