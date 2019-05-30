<template>
  <div class="order">
    <Header_user />
    <div class="container">
      <Order_table />
    </div>
  </div>
</template>

<script>
import Header_user from "@/components/Header_user.vue";
import Order_table from "@/components/Order_table.vue";
export default {
  name: "order",
  components: {
    Header_user,
    Order_table
  }
};
</script>
<style scoped lang="scss"></style>
