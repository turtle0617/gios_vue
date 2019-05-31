<template>
  <div class="history">
    <Header_user />
    <div class="container">
      <Bill_table />
    </div>
  </div>
</template>

<script>
import Header_user from "@/components/Header_user.vue";
import Bill_table from "@/components/Bill_table.vue";
export default {
  name: "history",
  components: {
    Header_user,
    Bill_table
  }
};
</script>
<style scoped lang="scss"></style>
