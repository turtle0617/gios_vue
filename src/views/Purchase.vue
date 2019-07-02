<template>
  <div class="purchase-container ">
    <Header />
    <Purchase_list />
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import Purchase_list from "@/components/Purchase_list.vue";
export default {
  name: "purchase",
  components: {
    Header,
    Purchase_list
  }
};
</script>
