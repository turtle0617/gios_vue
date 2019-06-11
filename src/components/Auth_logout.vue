<template>
  <div class="logout"></div>
</template>

<script>
export default {
  name: "Auth_logout",
  created() {
    const login_role = this.$store.getters.loggedIn;
    if (login_role === "customer") {
      this.$store.dispatch("destroyCustomerToken").then(res => {
        this.$router.push({
          name: "home"
        });
      });
    } else {
      this.$store.dispatch("destroyTraderToken").then(res => {
        this.$router.push({
          name: "adminLogin"
        });
      });
    }
  }
};
</script>
