<template>
  <section class="history-boss  section">
    <div class="history-boss__header">
      <div class="columns boss-header__title">
        <div class="column">
          <h1 class=" title is-2 ">歷史統計</h1>
        </div>
      </div>
      <div class="columns boss-header__date">
        <div class="column date__container">
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
      </div>
      <div v-if="price_statistic" class="columns allGroupStatus">
        <div class="column is-3 allGroupStatus-title">
          <h2 class="title is-4">全體收益</h2>
        </div>

        <div class="column is-6 allGroupStatus-income">
          <h1 class="title is-1 allGroupStatus-income__title">
            {{ price_statistic.total_price || 0 }}
          </h1>
          <p class="subtitle allGroupStatus-income__unit">
            <span>收益</span>
            <span>元</span>
          </p>
        </div>

        <div class="column is-3 allGroupStatus-paidStatus">
          <div class="paidStatus allGroupStatus-paidStatus__paid">
            <span>已收：{{ price_statistic.paid || 0 }}元</span>
          </div>
          <div class="paidStatus allGroupStatus-paidStatus__unpaid">
            <span> 未收：{{ price_statistic.unpaid || 0 }} 元 </span>
          </div>
        </div>
      </div>
    </div>
    <template v-for="(group, group_name) in groups_statistic">
      <Group_statistic
        :count_statistic="group"
        :group_name="group_name"
        :start_date="start_date"
        :end_date="end_date"
        :key="group_name"
      />
    </template>
  </section>
</template>

<script>
import Group_statistic from "@/components/History_admin--group";
export default {
  name: "history_admin",
  components: {
    Group_statistic
  },
  data() {
    return {
      choose_date: ""
    };
  },
  created() {
    const lastWeek_index = this.week_range.length - 1;
    this.choose_date = this.week_range[lastWeek_index];
    if (!this.groups) this.$store.dispatch("retrieveGroups");
  },
  computed: {
    week_range() {
      return this.$store.getters.week_range;
    },
    groups() {
      return this.$store.getters.groups;
    },
    price_statistic() {
      return this.$store.getters.boss_history_statistic_all.statistic;
    },
    groups_statistic() {
      return this.$store.getters.boss_history_statistic_groups;
    },
    start_date() {
      return this.choose_date.split("~").map(date => {
        return this.Date.parse(date).toString("yyyy/MM/dd");
      })[0];
    },
    end_date() {
      return this.choose_date.split("~").map(date => {
        return this.Date.parse(date).toString("yyyy/MM/dd");
      })[1];
    }
  },
  watch: {
    choose_date: function(date) {
      const date_parameter = {
        start_date: this.start_date,
        end_date: this.end_date
      };
      this.retrieveHistoryStatisticWithAll(date_parameter);
      this.retrieveHistoryStatisticWithGroup(date_parameter);
    }
  },
  methods: {
    retrieveHistoryStatisticWithAll(date_parameter) {
      return this.$store
        .dispatch("retrieveBossHistoryStatisticAll", date_parameter)
        .catch(e => {
          console.error(e);
        });
    },
    retrieveHistoryStatisticWithGroup({ start_date, end_date }) {
      return Promise.all(
        this.groups.map(group => {
          const param_with_statictic = {
            start_date,
            end_date,
            group_id: group.id,
            group_name: group.name
          };
          return this.$store
            .dispatch(
              "retrieveBossHistoryStatisticWithGroup",
              param_with_statictic
            )
            .catch(e => {
              console.error(e);
            });
        })
      );
    }
  }
};
</script>

<style scoped lang="scss">
.history-boss {
  padding: 3rem 5rem;
  width: 80%;
  margin: 0 auto;
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
.date__container {
  display: flex;
  .title {
    margin-right: 1rem;
  }
}
.boss-header__title {
  text-align: center;
}

.allGroupStatus-income {
  display: flex;
  align-items: flex-end;
  justify-content: center;
  h1 {
    font-size: 7rem;
    margin: 0;
  }
  p {
    text-align: left;
    margin-bottom: 1rem;
    margin-left: 0.5rem;
    font-size: 1rem;
  }
  span {
    display: block;
  }
}

.allGroupStatus-paidStatus {
  font-size: 1rem;
  text-align: right;
  margin-top: auto;
  padding-bottom: 1rem;
  &__paid {
    width: 100%;
  }
  &__unpaid {
    width: 100%;
  }
}

@media screen and (max-width: 768px) {
  .history-boss {
    padding: 3rem 1.5rem;
  }
  .allPriceStatistic {
    display: flex;
  }
}
</style>
