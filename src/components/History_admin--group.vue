<template>
  <div class="group">
    <div class="columns group__header">
      <div class="column is-3  group-name">
        <h1 class="title is-3 ">{{ group_name }}</h1>
      </div>
      <div class="column is-6 group-income">
        <h1 class="title is-1 group-income__title">
          {{ count_statistic.statistic.total_price || 0 }}
        </h1>
        <p class="subtitle group-income__unit">
          <span>收益</span>
          <span>元</span>
        </p>
      </div>
      <div class="column is-3 group-paymentStatus">
        <div class="paidStatus group-paymentStatus__paid">
          <span> 已收：{{ count_statistic.statistic.paid || 0 }}元 </span>
        </div>
        <div class="paidStatus group-paymentStatus__unpaid">
          <span> 未收：{{ count_statistic.statistic.unpaid || 0 }} 元 </span>
        </div>
      </div>
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
.group {
  color: rgba(87, 87, 87, 1);
}
.title {
  color: rgba(87, 87, 87, 1);
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

.group-income {
  display: flex;
  align-items: flex-end;
  justify-content: center;
  h1 {
    font-size: 6rem;
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

.group-paymentStatus {
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

.member {
  cursor: pointer;
  position: relative;
  border: 1px solid;
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
.member:nth-of-type(3n + 1) {
  border-color: #e9e9e9 #000000 #e9e9e9 #e9e9e9;
}
.member:nth-of-type(3n + 2) {
  border-color: #e9e9e9 #e9e9e9 #e9e9e9 #000000;
}
.member:nth-of-type(3n + 3) {
  border-color: #e9e9e9 #e9e9e9 #e9e9e9 #000000;
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
