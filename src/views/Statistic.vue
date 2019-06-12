<template>
  <div class="statistic">
    <Header />
    <div class="container">
      <Statistic_admin />
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import Statistic_admin from "@/components/Statistic_admin.vue";
export default {
  name: "statistic",
  components: {
    Header,
    Statistic_admin
  }
};
</script>
<style scoped lang="scss"></style>
