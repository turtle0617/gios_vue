<template>
  <div class="order-container ">
    <Header />
    <Order_menu />
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import Order_menu from "@/components/Order_menu.vue";
export default {
  name: "order",
  components: {
    Header,
    Order_menu
  }
};
</script>
