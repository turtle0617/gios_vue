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
import moment from "moment";
import DatePicker from "vue2-datepicker";
import Date from "./assets/js/date.js";
library.add(faUserCircle, faPlusCircle, faMinusCircle);
Vue.prototype.moment = moment;
Vue.prototype.date = Date;

Vue.component("font-awesome-icon", FontAwesomeIcon);
Vue.config.productionTip = false;
Vue.use(DatePicker);
// Vue.component("vue-timepicker", VueTimepicker);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
