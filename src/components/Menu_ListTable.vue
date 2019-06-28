<template>
  <section class="section">
    <table class="menu-list table is-fullwidth">
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
            <td class="menu-list__button">
              <div class="list-button">
                <button class="button is-danger" @click="deleteMeal(index)">
                  刪除
                </button>
                <button class="button is-info" @click="modifyMeal(meal, index)">
                  修改
                </button>
              </div>
            </td>
            <td class="menu-list__name">{{ meal.name }}</td>
            <td class="menu-list__price">{{ meal.price }}</td>
            <td class="menu-list__limited">
              {{ meal.quantity_limit }}
            </td>
            <td class="menu-list__group">
              {{ convertGroupName(meal.group_id) }}
            </td>
            <td data-label="口味(用 / 區隔)" class="menu-list__flavor">
              <div v-if="meal.flavors" class="flavor--item">
                <span
                  v-for="(flavor, index) in meal.flavors"
                  :key="index"
                  class="flavor--item"
                >
                  {{ flavor.choice }}
                </span>
              </div>
            </td>
            <td class="menu-list__note">{{ meal.note }}</td>
          </tr>
          <tr v-else class="meal-modify" :key="meal.id">
            <td class="menu-list__button">
              <div class="list-button">
                <button class="button is-info" @click="updateMeal(index)">
                  送出
                </button>
                <button class="button is-light" @click="modifyMeal(meal)">
                  取消
                </button>
              </div>
            </td>
            <td class="menu-list__name">
              <input
                class="input"
                type="text"
                :class="{ error: empty_error.name }"
                v-model.trim="change_meal.name"
              />
              <span v-if="empty_error.name">不得為空</span>
            </td>
            <td class="menu-list__price">
              <input
                class="input"
                type="tel"
                :class="{ error: empty_error.price }"
                v-model.number="change_meal.price"
              />
              <span v-if="empty_error.price">請填數字</span>
            </td>
            <td class="menu-list__limited">
              <input
                class="input"
                type="tel"
                v-model.number="change_meal.quantity_limit"
                :class="{ error: not_number_error }"
              />
              <span v-if="not_number_error">請填數字</span>
            </td>
            <td class="menu-list__group">
              <div class="select">
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
              </div>
            </td>
            <td class="menu-list__flavor">
              <div class="change-flavor--add">
                <input class="input" type="text" />
                <button class="button is-light">新增</button>
              </div>
              <div v-if="change_flavors" class="change-flavor--list">
                <div
                  v-for="(flavor, index) in change_flavors"
                  :key="index"
                  class="change-flavor--item"
                >
                  <font-awesome-icon
                    icon="times"
                    size="lg"
                    @click="deleteChangeFlavor(index)"
                  ></font-awesome-icon>
                  <span> {{ flavor.choice }} </span>
                </div>
              </div>
            </td>
            <td class="menu-list__note">
              <input
                class="input"
                type="text"
                v-model.trim="change_meal.note"
              />
            </td>
          </tr>
        </template>
      </tbody>
    </table>
  </section>
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
      console.log("computed dailymenu");
      return this.$store.getters.daily_menu;
    },
    groups() {
      return this.$store.getters.groups;
    }
  },
  methods: {
    convertFlavor(flavor, index) {
      if (flavor.length > 0) {
        const flavor_name = flavor.map(item => item["choice"]).join("/");
        return flavor_name;
      }
      return null;
    },
    modifyMeal(original_meal, index = null) {
      this.modify = index;
      for (let key in this.change_meal) {
        this.change_meal[key] = original_meal[key];
      }
      if (!this.change_meal.group_id) this.change_meal.group_id = "all";

      this.change_flavors = JSON.parse(JSON.stringify(original_meal.flavors));
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
    deleteChangeFlavor(index) {
      this.change_flavors.splice(index, 1);
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
      const formated_date = this.Date.parse(this.choose_date).toString(
        "yyyy/MM/d"
      );
      try {
        const flavors = this.daily_menu[meal_index].flavors.slice();
        await this.$store.dispatch("deleteDailyMeal", {
          id: this.daily_menu[meal_index].id,
          index: meal_index
        });
        if (flavors.length > 0) {
          await this.deleteFlavor(flavors);
        }
        this.$store.dispatch("retrieveDailyMenu", {
          menu_date: formated_date
        });
      } catch (e) {
        this.$store.dispatch("retrieveDailyMenu", {
          menu_date: formated_date
        });
        console.error(e);
      }
    },
    deleteFlavor(flavors) {
      return Promise.all(
        flavors.map(flavor => this.$store.dispatch("deleteFlavor", flavor.id))
      );
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
.menu-list {
  td {
    vertical-align: middle;
  }
}
.list-button {
  display: flex;
  button {
    margin-right: 0.5rem;
  }
}
.change-flavor {
  &--add {
    display: flex;
  }
  &--item {
    width: 100%;
    & > :first-child {
      color: red;
      margin-right: 0.5rem;
      cursor: pointer;
    }
    &:hover {
      background-color: #e2e2e28f;
    }
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
