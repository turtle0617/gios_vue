<template>
  <div class="home">
    <Header />
    <div class="container">
      <Auth_login />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Auth_login from "@/components/Auth_login.vue";
import Header from "@/components/Header.vue";

export default {
  name: "home",
  components: {
    Auth_login,
    Header
  }
};
</script>
<style scoped lang="scss">
.Auth__container {
  max-width: 570px;
  margin: 0 auto;
}
</style>
