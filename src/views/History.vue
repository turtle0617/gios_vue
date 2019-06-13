<template>
  <div class="history">
    <Header />
    <div class="container">
      <template v-if="loggedIn === 'member'">
        <History_user />
      </template>
      <template v-else-if="loggedIn === 'boss'">
        <History_admin />
      </template>
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import History_user from "@/components/History_user.vue";
import History_admin from "@/components/History_admin.vue";
export default {
  name: "history",
  components: {
    Header,
    History_user,
    History_admin
  },
  computed: {
    loggedIn() {
      return this.$store.getters.loggedIn;
    }
  }
};
</script>
<style scoped lang="scss"></style>
