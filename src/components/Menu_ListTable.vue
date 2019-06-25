<template>
  <table class="menu-list">
    <thead>
      <tr>
        <th class="menu-list__button"></th>
        <th class="menu-list__name">名稱</th>
        <th class="menu-list__price">價格</th>
        <th class="menu-list__limited">限量</th>
        <th class="menu-list__group">團體</th>
        <th class="menu-list__flavor">口味</th>
        <th class="menu-list__note">備註</th>
      </tr>
    </thead>
    <tbody>
      <template v-for="(meal, index) in daily_menu">
        <tr v-if="modify !== index" class="meal-show" :key="meal.id">
          <td data-label="" class="menu-list__button">
            <button class="secondary" @click="deleteMeal(index)">刪除</button>
            <button class="primary" @click="modifyMeal(meal, index)">
              修改
            </button>
          </td>
          <td data-label="名稱" class="menu-list__name">{{ meal.name }}</td>
          <td data-label="價格" class="menu-list__price">{{ meal.price }}</td>
          <td data-label="限量(份數)" class="menu-list__limited">
            {{ meal.quantity_limit }}
          </td>
          <td data-label="團體" class="menu-list__group">
            {{ convertGroupName(meal.group_id) }}
          </td>
          <td data-label="口味(用 / 區隔)" class="menu-list__flavor">
            {{ convertFlavor(meal.flavors, index) }}
          </td>
          <td data-label="備註" class="menu-list__note">{{ meal.note }}</td>
        </tr>
        <tr v-else class="meal-modify" :key="meal.id">
          <td data-label="" class="menu-list__button">
            <button class="primary" @click="updateMeal(index)">送出</button>
            <button @click="modifyMeal(meal)">取消</button>
          </td>
          <td data-label="名稱" class="menu-list__name">
            <input
              type="text"
              :class="{ error: empty_error.name }"
              v-model.trim="change_meal.name"
            />
            <span v-if="empty_error.name">不得為空</span>
          </td>
          <td data-label="價格" class="menu-list__price">
            <input
              type="tel"
              :class="{ error: empty_error.price }"
              v-model.number="change_meal.price"
            />
            <span v-if="empty_error.price">請填數字</span>
          </td>
          <td data-label="限量(份數)" class="menu-list__limited">
            <input
              type="tel"
              v-model.number="change_meal.quantity_limit"
              :class="{ error: not_number_error }"
            />
            <span v-if="not_number_error">請填數字</span>
          </td>
          <td data-label="團體" class="menu-list__group">
            <select
              v-if="groups"
              class="group--select"
              v-model="change_meal.group_id"
            >
              <option value="all">全體</option>
              <option
                v-for="group in groups"
                :value="group.id"
                :key="group.id"
                >{{ group.name }}</option
              >
            </select>
          </td>
          <td data-label="口味(用 / 區隔)" class="menu-list__flavor">
            <input type="text" v-model.trim="change_flavors" />
          </td>
          <td data-label="備註" class="menu-list__note">
            <input type="text" v-model.trim="change_meal.note" />
          </td>
        </tr>
      </template>
    </tbody>
  </table>
</template>

<script>
export default {
  name: "menuListTable",
  props: ["choose_date"],
  data() {
    return {
      modify: null,
      change_meal: {
        name: null,
        price: null,
        quantity_limit: null,
        group_id: "all",
        note: null
      },
      change_flavors: null,
      empty_error: {
        name: false,
        price: false
      },
      not_number_error: false
    };
  },
  computed: {
    daily_menu() {
      return this.$store.getters.daily_menu;
    },
    groups() {
      return this.$store.getters.groups;
    }
  },
  methods: {
    convertFlavor(flavor, index) {
      // console.log("convertFlavor",index);
      if (flavor.length > 0) {
        const flavor_name = flavor.map(item => item["choice"]).join("/");
        return flavor_name;
      }
      return null;
    },
    modifyMeal(original_meal, index = null) {
      this.modify = index;
      const original_flavor = original_meal.flavors.length
        ? original_meal.flavors.map(flavor => flavor.choice).join("/")
        : null;
      for (let key in this.change_meal) {
        this.change_meal[key] = original_meal[key];
      }
      if (!this.change_meal.group_id) this.change_meal.group_id = "all";

      this.change_flavors = original_flavor;
    },
    async updateMeal(index) {
      try {
        this.hideAllError();
        const isEmpty = this.detectEmpty();
        const isPriceNum = Number.isInteger(this.change_meal.price);
        // const isLimiteNum = Number.isInteger(this.change_meal.quantity_limit);
        if (isEmpty || !isPriceNum) {
          if (!isPriceNum) this.empty_error.price = true;
          // if (!isLimiteNum)
          //   this.not_number_error = true;
          return;
        }
        let filtered_change_meal = this.filterSameKey(index, this.change_meal);
        const meal_same = Object.keys(filtered_change_meal).length === 0;
        const original_daily_menu = Object.assign({}, this.daily_menu[index]);
        const original_meal_id = original_daily_menu.id;
        const original_flavors = original_daily_menu.flavors;
        const formated_date = this.Date.parse(this.choose_date).toString(
          "yyyy/MM/d"
        );
        console.log("before method updateMenuFlavor");
        const updateMenuFlavor = this.updateMenuFlavors(original_flavors);
        console.log("after method updateMenuFlavor", updateMenuFlavor);
        // if (meal_same) {
        //   this.modify = null;
        //   console.log("meal_same");
        //   return;
        // }
        filtered_change_meal["menu_date"] = formated_date;

        console.log("filtered_change_meal", filtered_change_meal);
        this.modify = null;
        // await this.$store.dispatch("updateDailyMenu", {
        //   meal_id:original_meal_id,
        //   change_meal:filtered_change_meal
        // });

        console.log("dispatch retrieveDailyMenu");
        this.$store.dispatch("retrieveDailyMenu", {
          menu_date: formated_date
        });
      } catch (e) {
        console.error(e);
      }
    },
    updateMenuFlavors(original_flavors) {
      if (original_flavors.length) {
        const original_flavors_choice = original_flavors.map(
          flavor => flavor["choice"]
        );

        const change_flavors = this.change_flavors.split("/");
        const filtered_change = change_flavors.filter(
          flavor => original_flavors_choice.indexOf(flavor) === -1
        );

        if (!filtered_change.length) {
          console.log("flavor same");
          return false;
        }
        const filtered_original = original_flavors.filter(flavor => {
          return change_flavors.indexOf(flavor.choice) === -1;
        });

        const patch_array = filtered_original.map((flavor, index) => {
          return this.$store.dispatch("updateMenuFlavor", {
            flavor_id: flavor.id,
            change_flavor: filtered_change[index]
          });
        });
        Promise.all(patch_array).then(res => console.log("res", res));
      } else {
        if (this.change_flavors === original_flavors) return;
      }
      // if (this.flavor !== original_meal_flavors) {
      //   if (original_daily_menu.flavors.length > 0) {
      //     console.log(
      //       "has flavor,await updateMenuFlavor",
      //       original_daily_menu.flavors[0].id
      //     );
      //     await this.$store.dispatch("updateMenuFlavor", {
      //       flavor_id: original_daily_menu.flavors[0].id,
      //       change_flavor: this.flavor
      //     });
      //   } else {
      //     console.log(
      //       "hasn't flavor,await addMenuFlavor",
      //       original_meal_flavors
      //     );
      //     await this.$store.dispatch("addMenuFlavor", {
      //       menu_id: original_meal_id,
      //       choice: this.flavor
      //     });
      //   }
      // }
    },
    async deleteMeal(meal_index) {
      try {
        const flavors = this.daily_menu[meal_index].flavors;
        const formated_date = this.Date.parse(this.choose_date).toString(
          "yyyy/MM/d"
        );
        console.log("await deleteDailyMeal", meal_index);
        await this.$store.dispatch(
          "deleteDailyMeal",
          this.daily_menu[meal_index].id
        );
        if (flavors.length > 0) {
          console.log("await deleteflavor");
          await this.deleteFlavor(flavors);
        }
        this.$store.dispatch("retrieveDailyMenu", {
          menu_date: formated_date
        });
      } catch (e) {
        console.error(e);
      }
    },
    deleteFlavor(flavors) {
      flavors = flavors.map(flavor =>
        this.$store.dispatch("deleteFlavor", flavor.id)
      );
      return Promise.all(flavors);
    },
    filterSameKey(index, data) {
      const change_meal = Object.entries(data);
      const original_daily_menu = Object.assign({}, this.daily_menu[index]);
      return Object.fromEntries(
        change_meal.filter(item => {
          let key = item[0];
          let value = item[1];
          if (value === "all") value = null;
          return original_daily_menu[key] !== value;
        })
      );
    },
    convertGroupName(group_id) {
      if (!Number.isInteger(group_id)) {
        return "全體";
      }
      const group_index = this.groups.findIndex(
        item => item["id"] === group_id
      );
      return this.groups[group_index].name;
    },
    hideAllError() {
      this.not_number_error = false;
      this.empty_error.name = false;
      this.empty_error.price = false;
    },
    detectEmpty() {
      const detected = {
        name: this.change_meal.name,
        price: this.change_meal.price
      };
      this.empty_error = Object.fromEntries(
        Object.entries(this.empty_error).map(item => {
          item[1] = false;
          return item;
        })
      );
      if (!detected.name) this.empty_error.name = true;
      if (!detected.price) this.empty_error.price = true;
      return Object.entries(detected).some(item => !item[1]);
    }
  }
};
</script>

<style scoped lang="scss">
@mixin tableColWidth($grow, $minWidth) {
  flex-grow: $grow;
  min-width: $minWidth;
}
.menu-list {
  width: 100%;
  overflow: visible;
  max-height: none;
  input {
    max-width: 100%;
    border-radius: 6px;
  }
  select {
    height: 44px;
  }
  td {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    border: 1px solid black;
    &:before {
      margin-right: 1rem;
    }
  }
  &__button {
    @include tableColWidth(0, 75px);
  }
  &__price {
    @include tableColWidth(0, 60px);
  }
  &__limited {
    @include tableColWidth(0, 60px);
  }
  &__group {
    @include tableColWidth(0, 100px);
  }
}

.error {
  border: 1px solid red;
  ~ span {
    font-size: 0.8rem;
    position: relative;
    color: red;
    &::before {
      position: absolute;
      content: "";
      top: -10px;
      left: 13px;
      border-color: transparent;
      border-top: red;
      border-style: solid;
      border-width: 0.5rem;
    }
  }
  ~ label {
    color: red;
  }
}
</style>
