<template>
  <div class="menu_list">
    <Header />
    <div class="container">
      <Addmenu />
    </div>
    <div class="container">
      <Menu_ListTable />
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import Addmenu from "@/components/Addmenu.vue";
import Menu_ListTable from "@/components/Menu_ListTable.vue";
export default {
  name: "menu_list",
  components: {
    Header,
    Addmenu,
    Menu_ListTable
  }
};
</script>
<style scoped lang="scss"></style>
