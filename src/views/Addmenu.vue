<template>
  <div class="addmenu">
    <Header />
    <div class="container">
      <Menu />
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import Menu from "@/components/Menu.vue";
export default {
  name: "addmenu",
  components: {
    Header,
    Menu
  }
};
</script>
<style scoped lang="scss"></style>
