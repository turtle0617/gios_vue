<template>
  <div class="group">
    <div class="group__header">
      <div class="columns group-header__title">
        <div class="column">
          <h1 class=" title is-2 ">團體：{{ group_name }}</h1>
        </div>
      </div>
      <template v-if="count_statistic.statistic">
        <div class="columns group-priceStatistic">
          <div class="column priceStatistic__header">
            <h2 class="title is-4">收益</h2>
          </div>
          <div class="column priceStatistic_price">
            <h1 class="title is-1">
              {{ count_statistic.statistic.total_price || 0 }}
            </h1>
          </div>
          <div class="column priceStatistic__footer">
            <h2 class="title is-4">元</h2>
          </div>
        </div>
        <div class="columns group-priceStatistic__paidStatus">
          <div class="column paidStatus paidStatus__paid">
            <h2 class="title is-4">
              已收：{{ count_statistic.statistic.paid || 0 }}元
            </h2>
          </div>
          <div class="column paidStatus paidStatus__unpaid">
            <h2 class="title is-4">
              未收：{{ count_statistic.statistic.unpaid || 0 }} 元
            </h2>
          </div>
        </div>
      </template>
    </div>
    <div
      v-if="count_statistic.list"
      class="group__memberList columns is-multiline"
    >
      <div
        class="column is-4 member"
        v-for="(member, index) in count_statistic.list"
        :key="index"
        @click="changePaidStatus(index, member.user_id)"
        :class="{ isPaying: paying_status[index] }"
      >
        <div class="member__name">使用者：{{ member.name }}</div>
        <div class="member__owe">
          金額：
          <span>
            {{ member.person_paid }}
          </span>
        </div>
        <div class="member__paymentStatus">
          <div
            v-if="member.payment_status"
            class="paymentStatus paymentStatus--paid"
          >
            已付款
          </div>
          <div v-else class="paymentStatus paymentStatus--unpaid">
            未付款
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "group__statistic",
  props: ["count_statistic", "group_name", "start_date", "end_date"],
  data() {
    return {
      paying_status: []
    };
  },
  created() {
    const number_of_member = this.count_statistic.list.length;
    this.paying_status = new Array(number_of_member).fill(0);
  },
  methods: {
    async changePaidStatus(index, member_id) {
      try {
        const is_this_week = Date.today().between(
          this.Date.parse(this.start_date),
          this.Date.parse(this.end_date)
        );
        if (is_this_week) {
          alert("當週還不能付款喔");
          return;
        }
        this.$set(this.paying_status, index, true);
        this.$store.commit("updateMemberPaidStatus", {
          group_name: this.group_name,
          index
        });
        await this.$store.dispatch("updateMemberPaidStatus", {
          start_date: this.start_date,
          end_date: this.end_date,
          member_id: [member_id]
        });
        this.$set(this.paying_status, index, false);
      } catch (e) {
        console.error(e);
      }
    }
  }
};
</script>

<style scoped lang="scss">
.column {
  flex-basis: auto;
  flex-grow: 0;
}
.columns {
  justify-content: space-between;
}
.group-header__title {
  justify-content: flex-start;
}
.group {
  margin-top: 3rem;
  &__header {
    padding-bottom: 2rem;
  }
  &__memberList {
    margin: 0;
    padding-top: 1rem;
    justify-content: flex-start;
    padding-bottom: 2rem;
    border-bottom: 1px solid;
  }
}

.priceStatistic__footer {
  align-self: flex-end;
}
.member {
  border: 1px solid;
  cursor: pointer;
  position: relative;
  &__owe {
    span {
      font-weight: bold;
    }
  }
  &:hover {
    background-color: #ffdd574f;
  }
  &__paymentStatus {
    position: absolute;
    top: 35%;
    right: 5%;
  }
}
.paymentStatus {
  font-weight: bold;
  &--paid {
    color: green;
  }
  &--unpaid {
    color: red;
  }
}
.isPaying {
  pointer-events: none;
}
@media screen and (max-width: 768px) {
  .group {
    padding: 3rem 1.5rem;
    &-priceStatistic__total {
      display: flex;
    }
  }
}
</style>
