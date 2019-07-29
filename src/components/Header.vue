<template>
  <header class="header hero">
    <template v-if="loggedIn === 'member'">
      <div class="header__notification header__notification--member">
        <router-link :to="{ name: 'home' }" class="logo"
          >田阿姨便當</router-link
        >
        <div
          @click="visible = !visible"
          ref="dropdownMenu"
          class="dropdown--member header__account"
        >
          <font-awesome-icon icon="user-circle" size="2x"></font-awesome-icon>
          <div v-if="visible" class="dropdown-content header__dropdown">
            <router-link :to="{ name: 'profile' }">個人檔案</router-link>
            <router-link :to="{ name: 'order_menu' }">訂餐</router-link>
            <router-link :to="{ name: 'purchase' }">訂單資訊</router-link>
            <router-link :to="{ name: 'history' }">歷史訂單</router-link>
            <router-link :to="{ name: 'logout' }">登出</router-link>
          </div>
        </div>
      </div>
    </template>
    <template v-else-if="loggedIn === 'boss'">
      <div class="header__notification header__notification--boss">
        <div class="navbar">
          <router-link :to="{ name: 'statistic' }" class="logo navbar-brand"
            >田阿姨便當</router-link
          >
        </div>
        <nav class="menuNavbar navbar">
          <div class="navbar-menu">
            <router-link class="navbar-item" :to="{ name: 'groups' }"
              >管理團體</router-link
            >
            <router-link class="navbar-item" :to="{ name: 'menu' }"
              >新增菜單</router-link
            >
            <router-link class="navbar-item" :to="{ name: 'statistic' }"
              >訂單</router-link
            >
            <router-link class="navbar-item" :to="{ name: 'history' }"
              >歷史統計</router-link
            >
            <router-link class="navbar-item" :to="{ name: 'logout' }"
              >登出</router-link
            >
          </div>
        </nav>
        <div
          class="link-select navbar-burger burger"
          ref="dropdownMenu"
          @click="visible = !visible"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <div v-if="visible" class="navbar mobile-nav header__dropdown">
            <router-link class="navbar-item" :to="{ name: 'groups' }"
              >管理團體</router-link
            >
            <router-link class="navbar-item" :to="{ name: 'menu' }"
              >新增菜單</router-link
            >
            <router-link class="navbar-item" :to="{ name: 'statistic' }"
              >訂單</router-link
            >
            <router-link class="navbar-item" :to="{ name: 'history' }"
              >歷史訂單</router-link
            >
            <router-link class="navbar-item" :to="{ name: 'logout' }"
              >登出</router-link
            >
          </div>
        </div>
      </div>
    </template>
    <template v-else>
      <div
        class="header__notification header__notification--guest notification"
      >
        <router-link :to="{ name: 'home' }" class="logo"
          >田阿姨便當</router-link
        >
      </div>
    </template>
  </header>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {
      visible: false
    };
  },
  destroyed() {
    const role = this.loggedIn;
    if (role !== "guest") {
      document.removeEventListener("click", this.documentClick);
    }
  },
  computed: {
    loggedIn() {
      const role = this.$store.getters.loggedIn;
      if (role !== "guest") {
        document.addEventListener("click", this.documentClick);
      }
      return this.$store.getters.loggedIn;
    }
  },
  methods: {
    documentClick(e) {
      let el = this.$refs.dropdownMenu;
      let target = e.target;
      if (!el) return;
      if (el !== target && !el.contains(target)) {
        this.visible = false;
      }
    }
  }
};
</script>
<style scoped lang="scss">
.header {
  background-color: whitesmoke;
}
.header__notification {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem 5rem;
  a:not(.button):not(.dropdown-item) {
    text-decoration: none;
  }
  a {
    color: #585656;
  }
  &--boss {
    width: 80%;
    margin: 0 auto;
  }
}
.logo {
  font-size: 2rem;
}
.header__dropdown .router-link-active {
  background-color: rgba(0, 0, 0, 0.2);
}
.dropdown--member {
  position: relative;
  display: inline-block;
  cursor: pointer;
}
.dropdown-content {
  display: block;
  position: absolute;
  right: 0;
  z-index: 999;
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
  a {
    display: block;
    padding: 12px 16px;
    text-decoration: none;
    &:hover {
      background-color: rgba(0, 0, 0, 0.2);
    }
  }
}
.burger .mobile-nav {
  position: absolute;
  top: 40px;
  right: 0;
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
  a:hover {
    background-color: rgba(0, 0, 0, 0.2);
  }
}
.menuNavbar {
  border: none;
  margin-left: auto;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  a {
    display: inline-block;
  }
  .router-link-active {
    font-weight: bold;
    color: black;
  }
}
@media screen and (max-width: 768px) {
  .header__notification {
    padding: 2rem 1rem;
  }
}
</style>
