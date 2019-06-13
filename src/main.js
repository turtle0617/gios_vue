import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "mini.css/dist/mini-default.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faUserCircle,
  faPlusCircle,
  faMinusCircle
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(faUserCircle, faPlusCircle, faMinusCircle);

Vue.component("font-awesome-icon", FontAwesomeIcon);
Vue.config.productionTip = false;

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.getters.loggedIn) {
      next({
        name: "home"
      });
    } else {
      if (to.matched.some(record => record.meta.isAdmin)) {
        if (store.getters.loggedIn !== "boss") {
          console.log("not boss redirect order");
          next({
            name: "order"
          });
        } else {
          console.log("is boss");
          next();
        }
      } else {
        // if (store.getters.loggedIn === "member") {
        //   console.log("is member page and auth is member");
        next();
        // } else {
        //   console.log("is member page and auth is boss");
        //   next({ name: "statistic" });
        // }
      }
    }
  } else if (to.matched.some(record => record.meta.guest)) {
    if (store.getters.loggedIn) {
      next({
        name: "order"
      });
    } else {
      next();
    }
  }
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
