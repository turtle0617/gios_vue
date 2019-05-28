<template>
  <div class="order">
    <GIOS_Header />
    <div class="container">
      <Order_table />
    </div>
  </div>
</template>

<script>
import GIOS_Header from "@/components/GIOS_Header.vue";
import Order_table from "@/components/Order_table.vue";
export default {
  name: "order",
  components: {
    GIOS_Header,
    Order_table
  }
};
</script>
<style scoped lang="scss"></style>
