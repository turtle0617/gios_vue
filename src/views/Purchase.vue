<template>
  <div class="purchase-container ">
    <Header />
    <Purchase_list :order_date="order_date" />
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import Purchase_list from "@/components/Purchase_list.vue";
export default {
  name: "purchase",
  props: ["order_date"],
  components: {
    Header,
    Purchase_list
  }
};
</script>
