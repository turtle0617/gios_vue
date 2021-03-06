import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Adminlogin from "./views/Home_admin.vue";
import Register from "./views/Register.vue";
import Profile from "./views/Profile.vue";
import Order from "./views/Order.vue";
import order_menu from "./components/Order_menu.vue";
import order_check from "./components/Order_check.vue";
import Purchase from "./views/Purchase.vue";
import History from "./views/History.vue";
import Statistic from "./views/Statistic.vue";
import Menu_List from "./views/Menu_List.vue";
import Groups from "./views/Groups.vue";
import Logout from "./components/Auth_logout.vue";
import store from "./store";

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
      path: "/admin",
      name: "adminLogin",
      component: Adminlogin
    },
    {
      path: "/register",
      name: "register",
      component: Register
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
      },
      children: [
        {
          path: "menu",
          name: "order_menu",
          props: route => ({
            notReload: route.params.notReload ? route.params.notReload : false,
            date: route.params.date ? route.params.date : null
          }),
          component: order_menu,
          beforeEnter(to, from, next) {
            if (from.name === "register") {
              alert("可以到個人檔案填寫常用資訊喔！");
              return next();
            }
            if (from.name === "order_check") return next();
            store.dispatch("retrieveGroups").then(() => {
              next();
            });
          }
        },
        {
          path: "check",
          name: "order_check",
          component: order_check,
          props: route => ({ choose_date: route.params.choose_date }),
          beforeEnter(to, from, next) {
            if (!store.getters.member_order_check.length) {
              next({ name: "order_menu" });
              return;
            }
            next();
          }
        }
      ]
    },
    {
      path: "/purchase",
      name: "purchase",
      component: Purchase,
      props: route => ({ order_date: route.params.order_date }),
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
        isBoss: true
      }
    },
    {
      path: "/menu",
      name: "menu",
      component: Menu_List,
      meta: {
        requiresAuth: true,
        isBoss: true
      }
    },
    {
      path: "/groups",
      name: "groups",
      component: Groups,
      meta: {
        requiresAuth: true,
        isBoss: true
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

const role = {
  guest: ["home", "adminLogin", "register"],
  member: [
    "order_menu",
    "order_check",
    "profile",
    "history",
    "logout",
    "purchase"
  ],
  boss: ["statistic", "menu", "groups", "history", "logout"]
};
router.beforeEach((to, from, next) => {
  if (to.params.tokenExist) {
    store.dispatch("clearToken");
  }
  const loggedIn = store.getters.loggedIn;
  const pages = role[loggedIn];
  if (pages.includes(to.name)) {
    return next();
  }
  return next({ name: pages[0] });
});

export default router;
