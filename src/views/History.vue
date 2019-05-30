<template>
  <div class="history">
    <Header_user />
    <div class="container">
      <History_admin />
    </div>
  </div>
</template>

<script>
import Header_user from "@/components/Header_user.vue";
import History_admin from "@/components/History_admin.vue";
export default {
  name: "history",
  components: {
    Header_user,
    History_admin
  }
};
</script>
<style scoped lang="scss"></style>
