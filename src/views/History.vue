<template>
  <div class="order">
    <GIOS_Header />
    <div class="container">
      <History_admin />
    </div>
  </div>
</template>

<script>
import GIOS_Header from "@/components/GIOS_Header.vue";
import History_admin from "@/components/History_admin.vue";
export default {
  name: "order",
  components: {
    GIOS_Header,
    History_admin
  }
};
</script>
<style scoped lang="scss"></style>
