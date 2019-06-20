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
      },
      beforeEnter: (to, from, next) => {
        console.log("beforeEnter > ", store);
        next();
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
        isBoss: true
      }
    },
    {
      path: "/addmenu",
      name: "addmenu",
      component: Addmenu,
      meta: {
        requiresAuth: true,
        isBoss: true
      }
    },
    {
      path: "/bill",
      name: "bill",
      component: Bill,
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

const noAuth = ["home", "adminLogin", "register"];
const memberAuth = ["profile", "order", "history", "logout"];
const traderAuth = [
  "statistic",
  "addmenu",
  "bill",
  "groups",
  "history",
  "logout"
];

router.beforeEach((to, from, next) => {
  const loggedIn = store.getters.loggedIn;
  if (!loggedIn) {
    const canPass = noAuth.includes(to.name);
    if (canPass) {
      console.log(loggedIn, "canPass");
      return next();
    } else {
      console.log(loggedIn, "! canPass");
      return next({ name: "home" });
    }
  } else if (loggedIn === "member") {
    const canPass = memberAuth.includes(to.name);
    if (canPass) {
      console.log(loggedIn, "canPass");
      return next();
    } else {
      console.log(loggedIn, "! canPass");
      return next({ name: "order" });
    }
  } else if (loggedIn === "boss") {
    const canPass = traderAuth.includes(to.name);
    if (canPass) {
      console.log(loggedIn, "canPass");
      return next();
    } else {
      console.log(loggedIn, "! canPass");
      return next({ name: "statistic" });
    }
  }
});

export default router;
