<template>
  <div class="register">
    <Header />
    <div class="row ">
      <Auth_register />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Auth_register from "@/components/Auth_register.vue";
import Header from "@/components/Header.vue";

export default {
  name: "register",
  components: {
    Auth_register,
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
