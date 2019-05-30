<template>
  <div class="addmenu">
    <Header_user />
    <div class="container">
      <Menu />
    </div>
  </div>
</template>

<script>
import Header_user from "@/components/Header_user.vue";
import Menu from "@/components/Menu.vue";
export default {
  name: "addmenu",
  components: {
    Header_user,
    Menu
  }
};
</script>
<style scoped lang="scss"></style>
