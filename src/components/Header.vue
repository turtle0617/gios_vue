<template>
  <header class="header hero">
    <div class="header__notification notification">
      <template v-if="loggedIn === 'member'">
        <router-link :to="{ name: 'home' }" class="logo"
          >田阿姨便當</router-link
        >
        <div
          @click="visible = !visible"
          ref="dropdownMenu"
          class="dropdown header__account"
        >
          <font-awesome-icon icon="user-circle" size="2x"></font-awesome-icon>
          <div v-if="visible" class="dropdown-content">
            <router-link :to="{ name: 'profile' }">個人檔案</router-link>
            <router-link :to="{ name: 'order_menu' }">訂餐</router-link>
            <router-link :to="{ name: 'history' }">歷史訂單</router-link>
            <router-link :to="{ name: 'logout' }">登出</router-link>
          </div>
        </div>
      </template>
      <template v-else-if="loggedIn === 'boss'">
        <div class="navbar">
          <router-link :to="{ name: 'statistic' }" class="logo navbar-brand"
            >田阿姨便當</router-link
          >
        </div>

        <nav class="menuNavbar navbar">
          <div class="navbar-menu">
            <router-link class="navbar-item" :to="{ name: 'bill' }"
              >收錢</router-link
            >
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
        </nav>

        <div class="link-select navbar-burger burger " @click="showDropDown">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <div v-if="is_show" class="navbar mobile-nav">
            <router-link class="navbar-item" :to="{ name: 'bill' }"
              >收錢</router-link
            >
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
      </template>
      <template v-else>
        <router-link :to="{ name: 'home' }" class="logo"
          >田阿姨便當</router-link
        >
      </template>
    </div>
  </header>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {
      visible: false,
      is_show: false
    };
  },
  destroyed() {
    document.removeEventListener("click", this.documentClick);
  },
  computed: {
    loggedIn() {
      if (this.$store.getters.loggedIn === "member") {
        document.addEventListener("click", this.documentClick);
      }
      return this.$store.getters.loggedIn;
    }
  },
  methods: {
    documentClick(e) {
      let el = this.$refs.dropdownMenu;
      let target = e.target;
      if (el !== target && !el.contains(target)) {
        this.visible = false;
      }
    },
    showDropDown() {
      this.is_show = !this.is_show;
    }
  }
};
</script>
<style scoped lang="scss">
.header__notification {
  display: flex;
  justify-content: space-between;
  align-items: center;
  a:not(.button):not(.dropdown-item) {
    text-decoration: none;
  }
}
.logo {
  font-size: 2rem;
}
.dropdown {
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
}
.menuNavbar {
  border: none;
  margin-left: auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  a {
    display: inline-block;
  }
}
</style>
