<template>
  <header class="header">
    <div class="header__container">
      <a href="#" class="logo">田阿姨便當</a>
      <nav class="menuNavbar">
        <a href="/bill">收錢</a>
        <a href="/addmenu">新增菜單</a>
        <a href="/statistic">訂單</a>
        <a href="/history">歷史訂單</a>
        <a href="/logout">登出</a>
      </nav>
    </div>
  </header>
</template>

<script>
export default {
  name: "Header_user"
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
