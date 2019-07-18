<template>
  <section class="statistic-boss section">
    <div class="menu-statistic__header">
      <div class="columns statistic-header__title">
        <div class="column">
          <h1 class=" title is-2 ">訂單</h1>
        </div>
      </div>
      <div class="columns  statistic-header__status">
        <div class="column  status status__date">
          <h1 class="title is-3">日期</h1>
          <div class="select">
            <select
              v-if="date_range"
              v-model="status_choose.date"
              class="group--select"
              name="historyDate"
            >
              <option
                v-for="(week, index) in date_range"
                :value="week"
                :key="index"
                >{{ week }}</option
              >
            </select>
          </div>
        </div>
        <div class="column  status status__group">
          <h1 class="title is-3">團體</h1>
          <div class="select">
            <select
              v-if="groups"
              v-model.number="status_choose.group"
              class="group--select"
              name="historyDate"
            >
              <option value="all">全體</option>
              <option
                v-for="(group, index) in groups"
                :value="group.id"
                :key="index"
                >{{ group.name }}</option
              >
            </select>
          </div>
        </div>
      </div>
    </div>
    <div v-if="specialDay" class="specialDay">
      <h1 class="title is-1">紫米飯日</h1>
    </div>
    <div class="menu-statistic__meal" v-if="menu_statistic.statistic">
      <div class="statistic-meal__header columns">
        <div class="column is-4 meal-header meal-header__name">
          名稱
        </div>
        <div class="column is-4 meal-header meal-header__amount">
          總數量
        </div>
        <div class="column is-4 meal-header meal-header__price">
          總價
        </div>
      </div>
      <div
        class="statistic-meal__list columns"
        v-for="(meal, index) in menu_statistic.statistic"
        :key="index"
      >
        <div class="column is-4 meal-list meal-list__name">
          {{ meal.menu_name }}
        </div>
        <div class="column is-4 meal-list meal-list__amount">
          {{ meal.total_amount }}
        </div>
        <div class="column is-4 meal-list meal-list__price">
          {{ meal.total_price }}
        </div>
      </div>
    </div>
    <div class="menu-statistic__rice columns">
      <div class="column is-2 statistic-rice statistic-rice__title">
        <span>飯量：</span>
      </div>
      <div class="column statistic-rice statistic-rice__amount">
        <span>{{ menu_statistic.total_rice }}</span>
      </div>
    </div>
    <div class="menu-statistic__receipt" v-if="menu_statistic.list">
      <div class="columns statistic-receipt statistic-receipt__title">
        <span class="column title is-3">明細：</span>
      </div>
      <div
        class="columns statistic-receipt statistic-receipt__byMember"
        v-for="(member, index) in menu_statistic.list"
        :key="index"
      >
        <div class="column receipt-member receipt-member__name">
          {{ member.name }}
        </div>
        <div class="column receipt-member receipt-member__meal">
          {{ member.menu_name }}
        </div>
        <div class="column receipt-member receipt-member__rice">
          {{ convertRice(member.user_rice) }}
        </div>
        <div class="column receipt-member receipt-member__vegetable">
          {{ convertVegetable(member.user_vegetable) }}
        </div>
        <div class="column receipt-member receipt-member__note">
          {{ member.note }}
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "statistic_admin",
  data() {
    return {
      status_choose: {
        date: "",
        group: "all"
      },
      specialDay: false
    };
  },
  created() {
    if (this.isSpecialDay("wednesday")) {
      this.specialDay = true;
    }
    this.status_choose.date = this.date_range[0];
    this.$store.dispatch("retrieveGroups");
  },
  computed: {
    date_range() {
      return this.$store.getters.date_range;
    },
    groups() {
      return this.$store.getters.groups;
    },
    menu_statistic() {
      if (!this.$store.getters.boss_menu_statistic) return false;
      return this.$store.getters.boss_menu_statistic;
    }
  },
  watch: {
    status_choose: {
      handler: function({ date, group }) {
        date = this.Date.parse(date).toString("yyyy/MM/dd");
        const statistic_parameter = {
          date: date
        };
        if (Number.isInteger(group)) statistic_parameter["group_id"] = group;
        this.$store
          .dispatch("retrieveBossMenuStatistic", statistic_parameter)
          .then(res => {
            const member_list_length = res.list.length;
          })
          .catch(e => {
            console.error(e);
          });
      },
      deep: true
    }
  },
  methods: {
    convertRice(rice) {
      let conver_rice;
      switch (rice) {
        case 1:
          conver_rice = "正常飯";
          break;
        case 2:
          conver_rice = "1/2 飯";
          break;
        case 3:
          conver_rice = "1/3 飯";
          break;
        case 4:
          conver_rice = "2/3 飯";
          break;
        case 5:
          conver_rice = "1/4 飯";
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
    convertVegetable(vegetable) {
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
    },
    isSpecialDay(day) {
      switch (day) {
        case "monday":
          return Date.today()
            .is()
            .monday();
        case "tuesday":
          return Date.today()
            .is()
            .tuesday();
        case "wednesday":
          return Date.today()
            .is()
            .wednesday();
        case "thursday":
          return Date.today()
            .is()
            .thursday();
        case "friday":
          return Date.today()
            .is()
            .friday();
        case "saturday":
          return Date.today()
            .is()
            .saturday();
        case "sunday":
          return Date.today()
            .is()
            .sunday();
        default:
          return "not match";
      }
    }
  }
};
</script>

<style scoped lang="scss">
.specialDay {
  margin-bottom: 2rem;
  .title {
    color: purple;
    font-family: cursive;
    text-align: center;
  }
}
.statistic-boss {
  padding: 3rem 5rem;
  width: 80%;
  margin: 0 auto;
}
.status {
  display: flex;
  h1 {
    margin-right: 1rem;
  }
}

.statistic-header__title {
  text-align: center;
}
.meal-header {
  border-bottom: 1px solid black;
}
.statistic-meal__list {
  border-bottom: 1px solid black;
  align-items: center;
}
.meal-list {
  padding-top: 1.5rem;
  padding-bottom: 1.5rem;
  &__amount {
    font-weight: bold;
    font-size: 1.5rem;
  }
}
.menu-statistic__rice {
  margin-top: 1rem;
  justify-content: flex-start;
  border-bottom: 1px solid black;
}
.statistic-rice {
  font-size: 1.5rem;
  &__amount {
    font-weight: bold;
  }
}
.menu-statistic__receipt {
  margin-top: 2rem;
}
.statistic-receipt__byMember {
  border-bottom: 1px solid black;
  padding-top: 1.2rem;
  padding-bottom: 1.2rem;
}
@media screen and (max-width: 768px) {
  @mixin mealTitle($name) {
    &::before {
      content: $name;
      display: block;
      margin-right: 2rem;
    }
  }
  .statistic-boss {
    padding: 3rem 2rem;
  }
  .statistic-meal__header {
    display: none;
  }
  .meal-list {
    display: flex;

    &__name {
      @include mealTitle("名稱");
    }
    &__amount {
      @include mealTitle("總數量");
    }
    &__price {
      @include mealTitle("總價");
    }
  }
  .statistic-receipt__byMember {
    border: 1px solid black;
    margin-top: 1rem;
  }
  .receipt-member {
    display: flex;
    &__name {
      @include mealTitle("訂購者");
    }
    &__meal {
      @include mealTitle("餐點");
    }
    &__rice {
      @include mealTitle("飯量");
    }
    &__vegetable {
      @include mealTitle("菜量");
    }
    &__note {
      @include mealTitle("備註");
    }
  }
}
</style>
