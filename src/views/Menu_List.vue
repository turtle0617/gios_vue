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
      date_range: null,
      choose_date: null
    };
  },
  created() {
    this.date_range = this.generateDateRange(7);
    this.choose_date = this.date_range[0];
    this.$store.dispatch("retrieveGroups").then(res => {
      this.groups = res;
    });
  },
  watch: {
    choose_date: function(val, oldval) {
      console.log("hi", val, oldval);
      this.$store
        .dispatch("retrieveDailyMenu", {
          menu_date: this.Date.parse(val).toString("yyyy/MM/d")
        })
        .catch(err => {
          console.error(err);
        });
    }
  },
  methods: {
    generateDateRange(num) {
      let range = new Array(num).fill(0);
      return range.map((item, index) => {
        const date = Date.today()
          .add(index)
          .day();
        return date.toString("M/d");
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
