<template>
  <div class="groups">
    <Header />
    <div class="container">
      <Groups_detail />
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import Groups_detail from "@/components/Groups_detail.vue";
export default {
  name: "groups",
  components: {
    Header,
    Groups_detail
  }
};
</script>
<style scoped lang="scss"></style>
