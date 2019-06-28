<template>
  <div class="menu">
    <Header />
    <div class="menu-date container">
      <div class="menutable__date">
        <label for="orderDate">日期</label>
        <select class="group--select" name="orderDate" v-model="choose_date">
          <option
            v-for="(day, index) in date_range"
            :key="index"
            :value="day"
            >{{ day }}</option
          >
        </select>
      </div>
    </div>
    <div class="container">
      <Addmenu :choose_date="choose_date" />
    </div>
    <div class="container">
      <Menu_ListTable :choose_date="choose_date" />
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
  },
  data() {
    return {
      choose_date: null
    };
  },
  created() {
    this.choose_date = this.date_range[0];
    this.$store.dispatch("retrieveGroups").then(res => {
      this.groups = res;
    });
  },
  computed:{
    date_range() {
      return this.$store.getters.date_range;
    }
  },
  watch: {
    choose_date: function(date) {
      this.$store
        .dispatch("retrieveDailyMenu", {
          menu_date: this.Date.parse(date).toString("yyyy/MM/dd")
        })
        .catch(err => {
          console.error(err);
        });
    }
  }
};
</script>
<style scoped lang="scss">
.menu-date {
  margin-top: 50px;
  margin-bottom: 1rem;
}
</style>
