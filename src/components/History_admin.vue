<template>
  <section class="history-boss  section">
    <div class="history-boss__header">
      <div class="columns boss-header__title">
        <div class="column">
          <h1 class=" title is-2 ">歷史統計</h1>
        </div>
      </div>
      <div class="columns  boss-header__status">
        <div class="column  status status__date">
          <h1 class="title is-3">日期</h1>
          <div class="select">
            <select
              v-if="week_range"
              v-model="status_choose.date"
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

      <template v-if="price_statistic">
        <div class="columns history-boss-priceStatistic__total">
          <div class="column total__header">
            <h2 class="title is-4">收益</h2>
          </div>
          <div class="column total_price">
            <h1 class="title is-1">{{ price_statistic.total_price }}</h1>
          </div>
          <div class="column total__footer">
            <h2 class="title is-4">元</h2>
          </div>
        </div>
        <div class="columns history-boss-priceStatistic__paidStatus">
          <div class="column paidStatus paidStatus__paid">
            <h2 class="title is-4">已收：{{ price_statistic.paid || 0 }}元</h2>
          </div>
          <div class="column paidStatus paidStatus__unpaid">
            <h2 class="title is-4">
              未收：{{ price_statistic.unpaid || 0 }} 元
            </h2>
          </div>
        </div>
      </template>
    </div>
    <div
      v-if="member_statistic"
      class="history-boss__memberList columns is-multiline"
    >
      <div
        class="column is-3 member"
        v-for="(member, index) in member_statistic"
        :key="index"
      >
        <div class="member__name">使用者：{{ member.name }}</div>
        <div class="member__owe">
          金額：
          <span>
            {{ member.person_paid }}
          </span>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "history_admin",
  data() {
    return {
      status_choose: {
        date: "",
        group: "all"
      }
    };
  },
  created() {
    this.status_choose.date = this.week_range[0];
    this.$store.dispatch("retrieveGroups");
  },
  computed: {
    week_range() {
      return this.$store.getters.week_range;
    },
    groups() {
      return this.$store.getters.groups;
    },
    price_statistic() {
      return this.$store.getters.boss_history_statistic.statistic;
    },
    member_statistic() {
      if (!this.$store.getters.boss_history_statistic.list) return false;
      return this.$store.getters.boss_history_statistic.list;
    }
  },
  watch: {
    status_choose: {
      handler: function({ date, group }) {
        const [start_date, end_date] = date.split("~").map(date => {
          return this.Date.parse(date).toString("yyyy/MM/dd");
        });
        const statistic_parameter = {
          start_date: start_date,
          end_date: end_date
        };
        if (Number.isInteger(group)) statistic_parameter["group_id"] = group;
        this.$store.dispatch(
          "retrieveBossHistoryStatistic",
          statistic_parameter
        );
      },
      deep: true
    }
  }
};
</script>

<style scoped lang="scss">
.status {
  display: flex;
  h1 {
    margin-right: 1rem;
  }
}
.column {
  flex-basis: auto;
  flex-grow: 0;
}
.columns {
  justify-content: space-between;
}
.history-boss {
  padding: 3rem 5rem;
  &__header {
    border-bottom: 1px solid;
    padding-bottom: 5rem;
  }
  &__memberList {
    margin: 0;
    padding-top: 1rem;
    justify-content: flex-start;
  }
}
.boss-header__title {
  justify-content: center;
}
.total__footer {
  align-self: flex-end;
}
.member {
  border: 1px solid;
  &__owe {
    span {
      font-weight: bold;
    }
  }
}
@media screen and (max-width: 768px) {
  .history-boss {
    padding: 3rem 1.5rem;
    &-priceStatistic__total {
      display: flex;
    }
  }
}
</style>
