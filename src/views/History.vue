<template>
  <div class="history">
    <Header_user />
    <div class="container">
      <History_user />
    </div>
  </div>
</template>

<script>
import Header_user from "@/components/Header_user.vue";
import History_user from "@/components/History_user.vue";
export default {
  name: "history",
  components: {
    Header_user,
    History_user
  }
};
</script>
<style scoped lang="scss">

</style>
