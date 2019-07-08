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
        :to="{ name: 'order_menu' }"
      >
        上一頁
      </router-link>
      <button
        type="button"
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
          quantity: item.quantity,
          note: item.note
        };
        if (item.flavor_id) filtered["flavor_id"] = item.flavor_id;
        if (item.user_rice) filtered["user_rice"] = item.user_rice;
        if (item.user_vegetable)
          filtered["user_vegetable"] = item.user_vegetable;
        return filtered;
      });
    },
    async addMemberOrder() {
      try {
        const filtered_orders = this.filterNotToNeedPostValue();
        await this.$store.dispatch("addMemberOrder", {
          menuArray: filtered_orders
        });
        this.$router.push({ name: "purchase" });
      } catch (e) {
        console.error(e);
        if(e === "over order time") {
          alert("超過時間囉~");
          this.$router.push({name:"order_menu"})
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
  }
}
</style>
