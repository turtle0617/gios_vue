<template>
  <header class="header">
    <div class="header__container">
      <a href="#" class="logo">田阿姨便當</a>
      <div class="header__account button">
        <font-awesome-icon icon="user-circle" size="2x"></font-awesome-icon>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: "GIOS_Header"
};
</script>
<style scoped lang="scss">
.header {
  &__container {
    width: 90%;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>
