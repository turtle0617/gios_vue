<template>
  <div class="menu_list">
    <Header />
    <div class="container">
      <Addmenu />
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import Addmenu from "@/components/Addmenu.vue";
export default {
  name: "menu_list",
  components: {
    Header,
    Addmenu
  }
};
</script>
<style scoped lang="scss"></style>
