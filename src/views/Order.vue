<template>
  <div class="order">
    <Header />
    <div class="container">
      <Order_table />
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import Order_table from "@/components/Order_table.vue";
export default {
  name: "order",
  components: {
    Header,
    Order_table
  }
};
</script>
<style scoped lang="scss"></style>
