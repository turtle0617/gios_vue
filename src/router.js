import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Profile from "./views/Profile.vue";
import Order from "./views/Order.vue";
import History from "./views/History.vue";
import Statistic from "./views/Statistic.vue";
import Addmenu from "./views/Addmenu.vue";
import Bill from "./views/Bill.vue";
import Logout from "./components/Auth_logout.vue";

Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/profile",
      name: "profile",
      component: Profile
    },
    {
      path: "/order",
      name: "order",
      component: Order
    },
    {
      path: "/history",
      name: "history",
      component: History
    },
    {
      path: "/statistic",
      name: "statistic",
      component: Statistic
    },
    {
      path: "/addmenu",
      name: "addmenu",
      component: Addmenu
    },
    {
      path: "/bill",
      name: "bill",
      component: Bill
    },
    {
      path: "/logout",
      name: "logout",
      component: Logout
    }
  ]
});

// router.beforeEach((to, from, next) => {
//   console.log(this.$store.state.access_token);
//   next();
// });

export default router;
