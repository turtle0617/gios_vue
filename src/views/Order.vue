<template>
  <div class="order-container ">
    <Header />
    <router-view></router-view>
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
export default {
  name: "order",
  components: {
    Header
  }
};
</script>
