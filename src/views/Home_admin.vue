<template>
  <div class="home">
    <Header />
    <div class="container">
      <Auth_loginAdmin />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Auth_loginAdmin from "@/components/Auth_loginAdmin.vue";
import Header from "@/components/Header.vue";

export default {
  name: "home",
  created() {
    this.$store.dispatch("retrieveGroups");
  },
  components: {
    Auth_loginAdmin,
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
