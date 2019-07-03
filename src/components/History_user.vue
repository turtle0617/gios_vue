<template>
  <section class="section">
    <div class="columns  member-history__status">
      <div class="column is-one-third status status__date">
        <h1 class="title is-3">日期</h1>
        <div class="select">
          <select
            v-if="week_range"
            v-model="choose_date"
            class="group--select"
            name="historyDate"
          >
            <option
              v-for="(week, index) in week_range"
              :value="week"
              :key="index"
              >{{ week }}</option
            >
          </select>
        </div>
      </div>
      <div
        :class="{
          'status__totalPrice--Paid': member_history_list.payment_status
        }"
        class="column is-half status status__totalPrice"
      >
        <h1 class="title is-3">總金額</h1>
        <span class="title is-3">{{ member_history_list.total_price }}</span>
      </div>
    </div>
    <div class="member-history__header columns">
      <div class="column history-header history-header__date">
        日期
      </div>
      <div class="column history-header history-header__name">
        名稱
      </div>
      <div class="column history-header history-header__detail">
        詳細資訊
      </div>
      <div class="column history-header history-header__price">
        價格
      </div>
    </div>
    <div v-if="member_history_list.list.length" class="member-history__list">
      <div
        class="list-meal__container columns"
        v-for="meal in member_history_list.list"
        :key="meal.id"
      >
        <div class="list-meal list-meal__date column">{{ meal.menu_date }}</div>
        <div class="list-meal list-meal__name column">{{ meal.menu_name }}</div>
        <div class="list-meal list-meal__detail column">
          <div class="detail-container">
            <span v-if="meal.user_rice"
              >{{ converRice(meal.user_rice) }}，</span
            >
            <span v-if="meal.user_vegetable"
              >{{ converVegetable(meal.user_vegetable) }}，</span
            >
            <span v-if="meal.flavor_choice">{{ meal.flavor_choice }}，</span>
            <span>{{ meal.note }}</span>
          </div>
        </div>
        <div class="list-meal list-meal__price column">
          {{ meal.menu_price }}
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "history_table",
  data() {
    return {
      choose_date: ""
    };
  },
  created() {
    this.choose_date = this.week_range[0];
  },
  computed: {
    week_range() {
      return this.$store.getters.week_range;
    },
    member_history_list() {
      return this.$store.getters.member_history_list;
    }
  },
  watch: {
    choose_date: function(date) {
      // console.log(date);
      const [start_date, end_date] = date.split("~").map(date => {
        return this.Date.parse(date).toString("yyyy/MM/dd");
      });
      this.$store.dispatch("retrieveMemberHistoryList", {
        start_date: start_date,
        end_date: end_date
      });
    }
  },
  methods: {
    converRice(rice) {
      let conver_rice;
      switch (rice) {
        case 1:
          conver_rice = "正常飯";
          break;
        case 2:
          conver_rice = "1/2飯";
          break;
        case 3:
          conver_rice = "1/3飯";
          break;
        case 4:
          conver_rice = "2/3飯";
          break;
        case 5:
          conver_rice = "1/4飯";
          break;
        case 6:
          conver_rice = "不飯";
          break;
        case 7:
          conver_rice = "多飯";
          break;
        default:
          conver_rice = "無";
      }
      return conver_rice;
    },
    converVegetable(vegetable) {
      let conver_vegetable;
      switch (vegetable) {
        case 1:
          conver_vegetable = "正常菜";
          break;
        case 2:
          conver_vegetable = "多菜";
          break;
        case 3:
          conver_vegetable = "少菜";
          break;
        case 4:
          conver_vegetable = "不菜";
          break;
        default:
          conver_vegetable = "無";
      }
      return conver_vegetable;
    }
  }
};
</script>

<style scoped lang="scss">
.status {
  display: flex;
  h1 {
    margin-right: 1rem;
    margin-bottom: 0;
  }
  span {
    color: red;
  }
  &__totalPrice--Paid {
    span {
      color: green;
    }
  }
}
.member-history__header {
  border: 1px solid;
}
.history-header {
  &__detail {
    min-width: 350px;
  }
}
.list-meal__container {
  border: 1px solid;
}
.list-meal {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  padding-top: 1.5rem;
  padding-bottom: 1.5rem;
  &__detail {
    min-width: 350px;
  }
}
@media screen and (max-width: 768px) {
  @mixin mealTitle($name) {
    &::before {
      content: $name;
      display: block;
      margin-right: 2rem;
      font-weight: bolder;
    }
  }
  .member-history__header {
    display: none;
  }
  .list-meal__container {
    margin-top: 1rem;
  }
  .list-meal {
    &__date {
      @include mealTitle("日期");
    }
    &__name {
      @include mealTitle("名稱");
    }
    &__amount {
      @include mealTitle("數量");
    }
    &__detail {
      min-width: initial;
      @include mealTitle("詳細資訊");
    }
    &__price {
      @include mealTitle("價格");
    }
  }
}
</style>
