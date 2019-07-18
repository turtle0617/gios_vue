<template>
  <div class="groups">
    <Header />
    <Groups_detail />
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
