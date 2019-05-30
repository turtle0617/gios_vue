<template>
  <div class="home">
    <Header_user />
    <div class="container">
      <div class="row ">
        <Auth_login />
      </div>
      <div class="row ">
        <Auth_register />
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Auth_login from "@/components/Auth_login.vue";
import Auth_register from "@/components/Auth_register.vue";
import Header_user from "@/components/Header_user.vue";

export default {
  name: "home",
  components: {
    Auth_login,
    Auth_register,
    Header_user
  }
};
</script>
<style scoped lang="scss">
.Auth__container {
  max-width: 570px;
  margin: 0 auto;
}
</style>
