<template>
  <div class="logout"></div>
</template>

<script>
export default {
  name: "Auth_logout",
  created() {
    const login_role = this.$store.getters.loggedIn;
    this.$store.dispatch("destroyAuthDetail", login_role).then(res => {
      this.$router.push({
        name: "home"
      });
    });
  }
};
</script>
