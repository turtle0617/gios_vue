<template>
  <section class="menu section">
    <div class="menu__title columns content ">
      <div class="menu-title__date column is-two-fifths">
        <label for="menuDate">日期</label>
        <div class="select ">
          <select class="group--select" name="menuDate" v-model="choose_date">
            <option
              v-for="(date, index) in date_range"
              :value="date"
              :key="index"
              >{{ date }}</option
            >
          </select>
        </div>
      </div>
      <div class="menu-title__deadline column">
        <label>收單時間 ： 16:00</label>
      </div>
    </div>
    <div class="columns menu__detailContainer">
      <div class="member-menu column">
        <div class="member-menu__header columns is-mobile">
          <div class="column is-two-fifths menu-header__name">
            名稱
          </div>
          <div class="column menu-header__price">
            價格
          </div>
          <div class="column menu-header__amount">
            數量
          </div>
        </div>
        <div v-if="member_order_menu.length" class="member-menu__list ">
          <div
            v-for="(meal, index) in member_order_menu"
            :key="index"
            class="menu-list__items columns is-mobile"
          >
            <div class="list-item list-item__name column is-two-fifths ">
              <div class="menu-name__title">
                <span>{{ meal.name }}</span
                ><br />
              </div>
              <div
                v-if="meal.meal_note"
                class="menu-name__note content is-small"
              >
                <span>{{ meal.meal_note }}</span>
              </div>
            </div>
            <div class="list-item list-item__price column">
              {{ meal.price }}
            </div>
            <div class="list-item list-item__amount column">
              <font-awesome-icon
                @click="addMeal(index, meal.id)"
                icon="plus-circle"
                size="lg"
              ></font-awesome-icon>
              <label for="quantity">{{ meal.amount }}</label>
              <font-awesome-icon
                icon="minus-circle"
                size="lg"
                @click="minusMeal(index, meal.id)"
              ></font-awesome-icon>
            </div>
          </div>
          <button
            type="button"
            @click="checkDetail"
            class="button is-link member-menu__next"
          >
            下一頁
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "order_table",
  data() {
    return {
      choose_date: ""
    };
  },
  created() {
    const first_date = this.date_range[0];
    const formated_date = this.Date.parse(first_date).toString("yyyy/MM/dd");
    this.choose_date = this.date_range[0];
    this.$store.dispatch("retrieveMemberDailyMenu", {
      menu_date: formated_date
    });
  },
  computed: {
    date_range() {
      return this.$store.getters.date_range;
    },
    member_order_menu() {
      return this.$store.getters.member_order_menu;
    },
    member_order_check() {
      return this.$store.getters.member_order_check;
    }
  },
  watch: {
    choose_date: function(date) {
      const formated_date = this.Date.parse(date).toString("yyyy/MM/dd");
      this.$store.dispatch("retrieveMemberDailyMenu", {
        menu_date: formated_date
      });
    }
  },
  methods: {
    addMeal(index, id) {
      const member_order_menu = this.member_order_menu[index];
      const meal_amount = {
        index: index,
        amount: 1
      };
      const meal_detail = {
        meal_id: id,
        meal_name: member_order_menu.name,
        status: "increase"
      };
      this.$store.commit("updateMemberOrderAmountStatistic", meal_amount);
      this.$store.commit("updateMemberOrderDetailStatistic", meal_detail);
    },
    minusMeal(index, id) {
      if (this.member_order_menu[index].amount <= 0) return;
      const member_order_menu = this.member_order_menu[index];
      const meal_amount = {
        index: index,
        amount: -1
      };
      const meal_detail = {
        meal_id: id,
        meal_name: member_order_menu.name,
        status: "decrease"
      };
      this.$store.commit("updateMemberOrderAmountStatistic", meal_amount);
      this.$store.commit("updateMemberOrderDetailStatistic", meal_detail);
    },
    checkDetail() {
      if (!this.member_order_check.length) {
        alert("請新增餐點");
        return;
      }
      this.$router.push({
        name: "order_check"
      });
    }
  }
};
</script>

<style scoped lang="scss">
.menu__title {
  align-items: flex-end;
}
.menu-title {
  &__date {
    label {
      margin-right: 1rem;
      font-size: 1.5rem;
    }
  }
  &__deadline {
    font-size: 2rem;
  }
}
.member-menu {
  &__header {
    border: 1px solid;
  }
  &__list {
    position: relative;
    & > div {
      border: 1px solid;
      border-top: none;
    }
  }
  &__next {
    position: fixed;
    bottom: 1rem;
    right: 1rem;
    box-shadow: 6px 5px 10px 0 rgba(0, 0, 0, 0.3);
  }
}
.menu-header__price {
  border-left: 1px solid;
  border-right: 1px solid;
}
.list-item {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  padding-top: 1rem;
  padding-bottom: 1rem;
  &__name {
    > div {
      width: 100%;
    }
  }
  &__amount {
    justify-content: space-between;
  }
  &__price {
    border-left: 1px solid;
    border-right: 1px solid;
  }
}
.menu-name__note {
  color: #7b4a4a;
  font-weight: 900;
}
</style>
