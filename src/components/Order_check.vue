<template>
  <section class="check section">
    <div
      class="meal__container columns "
      v-for="(meal, index) in member_order_check"
      :key="index"
    >
      <div class="meal-title column is-full">
        <h1 class="subtitle">{{ meal.name }}</h1>
        <div class="columns meal-option">
          <div v-if="meal.user_rice" class="meal-rice column">
            <div class="select input-box">
              <select
                :value="meal.user_rice"
                @change="updateDetail($event, index, 'user_rice')"
              >
                <option value="7">多飯</option>
                <option value="1">正常</option>
                <option value="2">1/2飯</option>
                <option value="3">1/3飯</option>
                <option value="4">2/3飯</option>
                <option value="5">1/4飯</option>
                <option value="6">不飯</option>
              </select>
              <label>飯量</label>
            </div>
          </div>
          <div v-if="meal.user_vegetable" class="meal-vegetable  column">
            <div class="select input-box">
              <select
                :value="meal.user_vegetable"
                @change="updateDetail($event, index, 'user_vegetable')"
              >
                <option value="2">多菜</option>
                <option value="1">正常</option>
                <option value="3">少菜</option>
                <option value="4">不菜</option>
              </select>
              <label>菜量</label>
            </div>
          </div>
          <div v-if="meal.flavors.length" class="meal-flavors column">
            <div class="select input-box">
              <select
                :value="meal.flavor_id"
                @change="updateDetail($event, index, 'flavor_id')"
              >
                <option
                  v-for="(flavor, index) in meal.flavors"
                  :value="flavor.id"
                  :key="index"
                  >{{ flavor.choice }}</option
                >
              </select>
              <label>口味</label>
            </div>
          </div>
          <div class="meal-note column ">
            <div class="input-box">
              <input
                type="text"
                class="input"
                :value="meal.note"
                @input="updateDetail($event, index, 'note')"
              />
              <label>備註</label>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="button__container columns">
      <router-link
        class="button is-light is-medium"
        :disabled="loading_status.addMemberOrder"
        :to="{
          name: 'order_menu',
          params: { notReload: true, date: choose_date }
        }"
      >
        上一頁
      </router-link>
      <button
        type="button"
        :class="{ 'is-loading': loading_status.addMemberOrder }"
        :disabled="loading_status.addMemberOrder"
        class="button is-info is-medium"
        @click="addMemberOrder"
      >
        送出
      </button>
    </div>
  </section>
</template>

<script>
export default {
  name: "order_check",
  props: ["choose_date"],
  data() {
    return {
      over_time: false,
      loading_status: {
        addMemberOrder: false
      }
    };
  },
  computed: {
    member_order_check() {
      return this.$store.getters.member_order_check;
    }
  },
  methods: {
    updateDetail(e, index, key_name) {
      const value = e.target.value;
      this.$store.dispatch("updateOrderDetailStatistic", {
        index: index,
        name: key_name,
        value: value
      });
    },
    filterNotToNeedPostValue() {
      return this.member_order_check.map(item => {
        const filtered = {
          menu_id: item.menu_id,
          quantity: item.quantity
        };
        if (item.flavor_id) filtered["flavor_id"] = item.flavor_id;
        if (item.user_rice) filtered["user_rice"] = item.user_rice;
        if (item.user_vegetable)
          filtered["user_vegetable"] = item.user_vegetable;
        if (item.note) filtered["note"] = item.note;
        return filtered;
      });
    },
    async checkQuantityLimite(order) {
      const merge_same_meal = order.reduce((acc, cur) => {
        if (!acc[cur.menu_id]) {
          acc[cur.menu_id] = 1;
        } else {
          acc[cur.menu_id] += 1;
        }
        return acc;
      }, {});
      const formated_date = this.Date.parse(this.choose_date).toString(
        "yyyy/MM/dd"
      );
      const filterd_menu_has_limite = await this.$store
        .dispatch("retrieveMemberDailyMenu", {
          menu_date: formated_date
        })
        .then(menu => menu.filter(menu => menu.quantity_limit));
      // if true mean some meal out of limite
      return filterd_menu_has_limite.some(meal => {
        if (merge_same_meal[meal.id]) {
          if (merge_same_meal[meal.id] > meal.quantity_limit) {
            return true;
          } else {
            return false;
          }
        }
        return false;
      });
    },
    async addMemberOrder() {
      try {
        this.loading_status.addMemberOrder = true;
        const filtered_orders = this.filterNotToNeedPostValue();
        const out_of_limite = await this.checkQuantityLimite(filtered_orders);
        if (out_of_limite) {
          alert("限量商品低於下單數量，請重新下單喔~");
          this.$router.push({
            name: "order_menu"
          });
          return;
        }
        await this.$store.dispatch("addMemberOrder", {
          menuArray: filtered_orders
        });
        this.loading_status.addMemberOrder = false;
        this.$router.push({
          name: "purchase",
          params: {
            order_date: this.choose_date
          }
        });
      } catch (e) {
        console.error(e);
        this.loading_status.addMemberOrder = false;
        if (e === "over order time") {
          alert("超過時間囉~");
          this.$router.push({
            name: "order_menu"
          });
        }
        if (e.includes("remain")) {
          alert("限量商品低於下單數量，請重新下單喔~");
          this.$router.push({
            name: "order_menu"
          });
        }
      }
    }
  }
};
</script>

<style scoped lang="scss">
@import "@/assets/scss/form.scss";
.meal__container {
  border: 1px solid;
}
.button__container {
  justify-content: flex-end;
  margin-top: 1rem;
  :first-child {
    margin-right: 1rem;
    display: inline-flex;
  }
}
@media screen and(max-width:768px) {
  .button__container {
    text-align: center;
  }
  .meal__container {
    margin-top: 1rem;
  }
}
</style>
