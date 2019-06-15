import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Adminlogin from "./views/Home_admin.vue";
import Register from "./views/Register.vue";
import Profile from "./views/Profile.vue";
import Order from "./views/Order.vue";
import History from "./views/History.vue";
import Statistic from "./views/Statistic.vue";
import Addmenu from "./views/Addmenu.vue";
import Bill from "./views/Bill.vue";
import Groups from "./views/Groups.vue";
import Logout from "./components/Auth_logout.vue";

Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
      meta: {
        guest: true
      }
    },
    {
      path: "/admin",
      name: "adminLogin",
      component: Adminlogin,
      meta: {
        guest: true
      }
    },
    {
      path: "/register",
      name: "register",
      component: Register,
      meta: {
        guest: true
      }
    },
    {
      path: "/profile",
      name: "profile",
      component: Profile,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/order",
      name: "order",
      component: Order,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/history",
      name: "history",
      component: History,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/statistic",
      name: "statistic",
      component: Statistic,
      meta: {
        requiresAuth: true,
        isAdmin: true
      }
    },
    {
      path: "/addmenu",
      name: "addmenu",
      component: Addmenu,
      meta: {
        requiresAuth: true,
        isAdmin: true
      }
    },
    {
      path: "/bill",
      name: "bill",
      component: Bill,
      meta: {
        requiresAuth: true,
        isAdmin: true
      }
    },
    {
      path: "/groups",
      name: "groups",
      component: Groups,
      meta: {
        requiresAuth: true,
        isAdmin: true
      }
    },
    {
      path: "/logout",
      name: "logout",
      component: Logout,
      meta: {
        requiresAuth: true
      }
    }
  ]
});

export default router;
