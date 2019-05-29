<template>
  <div class="addmenu">
    <GIOS_Header />
    <div class="container">
      <Menu />
    </div>
  </div>
</template>

<script>
import GIOS_Header from "@/components/GIOS_Header.vue";
import Menu from "@/components/Menu.vue";
export default {
  name: "addmenu",
  components: {
    GIOS_Header,
    Menu
  }
};
</script>
<style scoped lang="scss"></style>
