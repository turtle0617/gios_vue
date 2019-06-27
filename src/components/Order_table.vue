<template>
  <table class="order-table hoverable">
    <caption class="order-table__title ">
      <div class="order-table__date">
        <label for="orderDate">日期</label>
        <select class="group--select" name="orderDate">
          <option
            v-for="(date, index) in date_range"
            :value="date"
            :key="index"
            >{{ date }}</option
          >
        </select>
      </div>
      <div class="order-table__deadline">
        <h2>收單時間 ： 16:00</h2>
      </div>
    </caption>
    <thead>
      <tr>
        <th class="order-table__name">名稱</th>
        <th class="order-table__price">價格</th>
        <th class="order-table__amount">數量</th>
        <th class="order-table__rice">飯量</th>
        <th class="order-table__vegetable">菜量</th>
        <th class="order-table__flavor">口味</th>
        <th class="order-table__note">備註</th>
      </tr>
    </thead>
    <tbody v-if="member_order_menu.length">
      <template v-for="(meal, index) in member_order_menu">
        <tr :key="index">
          <td
            data-label="名稱"
            :rowspan="meal.amount + 2"
            class="order-table__name"
          >
            <span class="order-name__title">{{ meal.name }}</span>
            <span v-if="meal.meal_note" class="order-name__note">{{
              meal.meal_note
            }}</span>
          </td>
          <td
            data-label="價格"
            :rowspan="meal.amount + 2"
            class="order-table__price"
          >
            {{ meal.price }}
          </td>
          <td
            data-label="數量"
            :rowspan="meal.amount + 2"
            class="order-table__amount"
          >
            <font-awesome-icon
              icon="plus-circle"
              size="lg"
              @click="addMeal(index, meal.id)"
            ></font-awesome-icon>
            <label for="quantity">{{ meal.amount }}</label>
            <font-awesome-icon
              icon="minus-circle"
              size="lg"
              @click="minusMeal(index, meal.id)"
            ></font-awesome-icon>
          </td>
        </tr>
        <tr v-if="meal.orders.length" v-for="order in meal.orders">
          <!-- <td class="order-table__name"></td>
        <td class="order-table__price"></td>
        <td class="order-table__amount"></td> -->
          <td data-label="飯量" class="order-table__rice">
            <select
              class="rice--select"
              name="rice__group"
              v-model.number="order.user_rice"
            >
              <option value="7">多飯</option>
              <option value="1">正常</option>
              <option value="2">1/2飯</option>
              <option value="3">1/3飯</option>
              <option value="4">2/3飯</option>
              <option value="5">1/4飯</option>
              <option value="6">不飯</option>
            </select>
          </td>
          <td data-label="菜量" class="order-table__vegetable">
            <select
              class="vegetable--select"
              name="vegetable__group"
              v-model.number="order.user_vegetable"
            >
              <option value="2">多菜</option>
              <option value="1">正常</option>
              <option value="3">少菜</option>
              <option value="4">不菜</option>
            </select>
          </td>
          <td data-label="口味" class="order-table__flavor">
            <select
              v-if="order.flavors"
              class="flavor--select"
              name="flavor__group"
            >
              <option
                v-for="(flavor, index) in order.flavors"
                :value="flavor.choice"
                :key="index"
                >{{ flavor.choice }}</option
              >
            </select>
          </td>
          <td data-label="備註" class="order-table__note">
            <input
              type="text"
              id="noteText"
              placeholder=""
              v-model="order.note"
            />
          </td>
        </tr>
      </template>
    </tbody>

    <tfoot class="order-table__checkout">
      <span>金額： 0</span>
      <button class="primary ">提交</button>
    </tfoot>
  </table>
</template>

<script>
export default {
  name: "order_table",
  data() {
    return {};
  },
  created() {
    const first_date = this.$store.getters.date_range[0];
    const formated_date = this.Date.parse(first_date).toString("yyyy/MM/dd");
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
        status: "decrease"
      };
      this.$store.commit("updateMemberOrderAmountStatistic", meal_amount);
      this.$store.commit("updateMemberOrderDetailStatistic", meal_detail);
    }
  }
};
</script>

<style scoped lang="scss">
@mixin tableColWidth($grow, $minWidth) {
  flex-grow: $grow;
  min-width: $minWidth;
}
%flexContainer {
  display: flex;
  align-items: center;
}
.order-table {
  max-height: none;
  input:not([type="checkbox"]) {
    width: 100%;
  }
  thead {
    z-index: 1;
  }
  &__title {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-wrap: wrap;
  }
  &__date {
    margin-right: 100px;
  }
  &__name {
    // display: flex;
    // flex-direction: column;
    // align-items: flex-start;
    // justify-content: center;
    // @include tableColWidth(0, 120px);
  }
  &__price {
    // @include tableColWidth(0, 35px);
    // @extend %flexContainer;
  }
  &__amount {
    // @extend %flexContainer;

    font-size: 1rem;
    svg {
      cursor: pointer;
    }
  }
  &__rice {
    // @extend %flexContainer;
  }
  &__vegetable {
    // @extend %flexContainer;
  }
  &__flavor {
    // @extend %flexContainer;
    // @include tableColWidth(0, 90px);
  }
  &__note {
    // @extend %flexContainer;
    // @include tableColWidth(2, 100px);
  }
}
.rowspan {
  background-color: skyblue;
  vertical-align: middle;
}
.order-name {
  &__title {
    display: block;
  }
  &__note {
    display: block;
    margin-top: 0.5rem;
    font-size: 0.8rem;
    line-height: 1.5rem;
  }
}
</style>
