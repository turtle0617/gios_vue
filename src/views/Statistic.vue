<template>
  <div class="statistic">
    <Header_user />
    <div class="container">
      <Statistic_admin />
    </div>
  </div>
</template>

<script>
import Header_user from "@/components/Header_user.vue";
import Statistic_admin from "@/components/Statistic_admin.vue";
export default {
  name: "statistic",
  components: {
    Header_user,
    Statistic_admin
  }
};
</script>
<style scoped lang="scss"></style>
