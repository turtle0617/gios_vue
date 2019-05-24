<template>
  <div class="header">
    <div class="header__container">
      <div class="header__title">
        <h1>田阿姨便當</h1>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "GIOS_Header"
};
</script>
<style scoped lang="scss">
.header {
  box-shadow: 0px 5px 20px 0px rgba(0, 0, 0, 0.1);
  &__container {
    width: 90%;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
  }
}
</style>
