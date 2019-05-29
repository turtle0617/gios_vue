<template>
  <div class="order">
    <GIOS_Header />
    <div class="container">
      <Statistic_admin />
    </div>
  </div>
</template>

<script>
import GIOS_Header from "@/components/GIOS_Header.vue";
import Statistic_admin from "@/components/Statistic_admin.vue";
export default {
  name: "order",
  components: {
    GIOS_Header,
    Statistic_admin
  }
};
</script>
<style scoped lang="scss"></style>
