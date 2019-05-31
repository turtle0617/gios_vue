<template>
  <div class="logout"></div>
</template>

<script>
export default {
  name: "Auth_logout",
  methods: {
    created() {
      this.$store.dispatch("destroyToken").then(res => {
        this.$router.push({
          name: "home"
        });
      });
    }
  }
};
</script>
