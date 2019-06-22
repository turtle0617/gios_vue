<template>
  <header class="header">
    <div class="header__container">
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
            <router-link :to="{ name: 'order' }">訂餐</router-link>
            <router-link :to="{ name: 'history' }">歷史訂單</router-link>
            <router-link :to="{ name: 'logout' }">登出</router-link>
          </div>
        </div>
      </template>
      <template v-else-if="loggedIn === 'boss'">
        <router-link :to="{ name: 'statistic' }" class="logo"
          >田阿姨便當</router-link
        >
        <nav class="menuNavbar">
          <router-link :to="{ name: 'bill' }">收錢</router-link>
          <router-link :to="{ name: 'groups' }">管理團體</router-link>
          <router-link :to="{ name: 'menu' }">新增菜單</router-link>
          <router-link :to="{ name: 'statistic' }">訂單</router-link>
          <router-link :to="{ name: 'history' }">歷史訂單</router-link>
          <router-link :to="{ name: 'logout' }">登出</router-link>
        </nav>
      </template>
    </div>
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
    }
  }
};
</script>
<style scoped lang="scss">
.header {
  overflow: visible;
  height: auto;
  &__container {
    width: 90%;
    margin: 0 auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
  }
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
