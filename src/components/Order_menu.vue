<template>
  <section class="menu section">
    <div class="columns menu-header__title">
      <div class="column">
        <h1 class=" title is-2 ">訂餐</h1>
      </div>
    </div>
    <div class="menu__title columns content ">
      <div class="menu-title__date column is-two-fifths">
        <label for="menuDate">日期</label>
        <div class="select ">
          <select class="group--select" name="menuDate" v-model="choose_date">
            <option
              v-for="(date, index) in date_range"
              :value="date"
              :key="index"
            >
              {{ date_rang_with_note[index] }}</option
            >
          </select>
        </div>
      </div>
      <div v-if="member_order_timeLimit" class="menu-title__deadline column">
        <label>收單時間 ： {{ member_order_timeLimit }}</label>
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
            :class="{ 'sold-out': meal.quantity_limit === 0 }"
            class="menu-list__items columns is-mobile"
          >
            <div class="list-item list-item__name column is-two-fifths ">
              <div class="menu-name__title">
                <span>{{ meal.name }}</span
                ><br />
              </div>
              <div v-if="meal.meal_note" class="menu-name__note">
                <span>{{ meal.meal_note }}</span>
              </div>
              <div
                v-if="Number.isInteger(meal.quantity_limit)"
                class="menu-name__quantityLimit"
              >
                <span v-if="meal.quantity_limit"
                  >限量 {{ meal.quantity_limit }} 份</span
                >
                <span v-else>已售完</span>
              </div>
            </div>
            <div class="list-item list-item__price column">
              {{ meal.price }}
            </div>
            <div class="list-item list-item__amount column">
              <font-awesome-icon
                class="amount__button amount__button--plus"
                @click="addMeal(index, meal.id, meal.quantity_limit)"
                icon="plus-circle"
                size="lg"
              ></font-awesome-icon>
              <label for="quantity">{{ meal.amount }}</label>
              <font-awesome-icon
                class="amount__button amount__button--minus"
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
  name: "orderMenu",
  data() {
    return {
      choose_date: ""
    };
  },
  created() {
    this.choose_date = this.date_range[0];
    this.$store.dispatch("retrieveGroups");
  },
  computed: {
    date_range() {
      const over_order_time = Date.compare(
        Date.today().setTimeToNow(),
        Date.parse(this.member_order_timeLimit)
      );
      if (over_order_time && this.member_order_timeLimit) {
        return this.moveDayOfDayRange(this.$store.getters.date_range);
      }
      return this.$store.getters.date_range;
    },
    date_rang_with_note() {
      const over_order_time = Date.compare(
        Date.today().setTimeToNow(),
        Date.parse(this.member_order_timeLimit)
      );
      if (over_order_time && this.member_order_timeLimit) {
        return this.moveDayOfDayRangeNote(
          this.$store.getters.date_rang_with_note
        );
      }
      return this.$store.getters.date_rang_with_note;
    },
    member_order_menu() {
      return this.$store.getters.member_order_menu;
    },
    member_order_timeLimit() {
      return this.$store.getters.member_order_timeLimit;
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
    addMeal(index, id, limit) {
      const member_order_menu = this.member_order_menu[index];
      if (limit && member_order_menu.amount >= limit) return;
      const meal_amount = {
        index: index,
        amount: 1
      };
      this.$store.dispatch("updateMemberOrderAmount", meal_amount);
    },
    minusMeal(index, id) {
      if (this.member_order_menu[index].amount <= 0) return;
      const member_order_menu = this.member_order_menu[index];
      const meal_amount = {
        index: index,
        amount: -1
      };
      this.$store.dispatch("updateMemberOrderAmount", meal_amount);
    },
    checkDetail() {
      const not_choose = this.member_order_menu.every(
        item => item.amount === 0
      );
      if (not_choose) {
        alert("請新增餐點");
        return;
      }
      this.$store.dispatch("generateOrderDetailStatistic");
      this.$router.push({
        name: "order_check",
        params: {
          choose_date: this.choose_date
        }
      });
    },
    moveDayOfDayRange(date_range) {
      const move_day = Date.today()
        .add(1)
        .day()
        .toString("MM/dd");
      const move_dayIndex = date_range.indexOf(move_day);
      if (move_dayIndex !== -1)
        date_range[move_dayIndex] = Date.parse(date_range[6])
          .add(1)
          .day()
          .toString("MM/dd");
      return date_range.sort((a, b) => {
        return Date.compare(Date.parse(a), Date.parse(b));
      });
    },
    moveDayOfDayRangeNote(date_range_note) {
      const move_day = Date.today()
        .add(1)
        .day()
        .toString("MM/dd(ddd)");
      const move_dayIndex = date_range_note.indexOf(move_day);
      if (move_dayIndex !== -1)
        date_range_note[move_dayIndex] = Date.parse(
          date_range_note[6].replace(/\(\w*\)/, "")
        )
          .add(1)
          .day()
          .toString("MM/dd(ddd)");
      return date_range_note.sort((a, b) => {
        a = a.replace(/\(\w*\)/, "");
        b = b.replace(/\(\w*\)/, "");
        return Date.compare(Date.parse(a), Date.parse(b));
      });
    }
  }
};
</script>

<style scoped lang="scss">
.section {
  padding-left: 5rem;
  padding-right: 5rem;
}
.menu-header__title {
  text-align: center;
}
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
    right: 5rem;
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
    position: relative;
  }
  &__amount {
    justify-content: space-between;
  }
  &__price {
    border-left: 1px solid;
    border-right: 1px solid;
  }
}
.amount__button {
  cursor: pointer;
  &:active {
    opacity: 0.5;
  }
}
.menu-name {
  &__title {
    width: 100%;
  }
  &__note {
    color: #7b4a4a;
    font-weight: 900;
    font-size: 0.9rem;
    width: 100%;
  }
  &__quantityLimit {
    width: auto;
    color: red;
    font-weight: 900;
    position: absolute;
    top: 30%;
    right: 20%;
  }
}
.sold-out {
  pointer-events: none;
  background-color: rgba(122, 122, 122, 0.4);
}
@media screen and (max-width: 767px) {
  .section {
    padding-left: 1.5rem;
    padding-right: 1.5rem;
  }
  .member-menu__next {
    right: 1rem;
  }
  .menu-name__quantityLimit {
    position: static;
  }
}
</style>
