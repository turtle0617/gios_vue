<template>
  <div class="history">
    <Header />
    <div class="container">
      <Bill_table />
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import Bill_table from "@/components/Bill_table.vue";
export default {
  name: "history",
  components: {
    Header,
    Bill_table
  }
};
</script>
<style scoped lang="scss"></style>
