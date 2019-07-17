<template>
  <section class="addmenu section">
    <h1 class="title">
      主餐
      <font-awesome-icon
        icon="plus-circle"
        size="xs"
        class="addrow"
        @click="addRow('main_meals')"
      ></font-awesome-icon>
    </h1>
    <table class="main-meals table is-bordered">
      <thead>
        <tr>
          <th class="menu-header__name main-meals__name">名稱</th>
          <th class="menu-header__price main-meals__price">價格</th>
          <th class="menu-header__limited main-meals__limited">限量(份數)</th>
          <th class="menu-header__group main-meals__group">團體</th>
          <th class="menu-header__flavor main-meals__flavor">口味</th>
          <th class="menu-header__note main-meals__note">備註</th>
          <th class="menu-header__delete main-meals__delete"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(meal, index) in main_meals" :key="index">
          <td data-label="名稱" class="main-meals__name">
            <input class="input" type="text" v-model.trim="meal.name" />
          </td>
          <td data-label="價格" class="main-meals__price">
            <input class="input" type="tel" v-model.number="meal.price" />
          </td>
          <td data-label="限量(份數)" class="main-meals__limited">
            <input
              class="input"
              type="tel"
              v-model.number="meal.quantity_limit"
            />
          </td>
          <td data-label="團體" class="main-meals__group">
            <div class="select">
              <select
                v-if="groups"
                class="group--select"
                v-model="meal.group_id"
              >
                <option value="null">全體</option>
                <option
                  v-for="group in groups"
                  :value="group.id"
                  :key="group.id"
                  >{{ group.name }}</option
                >
              </select>
            </div>
          </td>
          <td data-label="口味" class="main-meals__flavor flavors-list">
            <div class="main-meals__flavor--add flavors-list--add">
              <input
                class="input"
                type="text"
                v-model.trim="meal.flavor"
                @keypress.enter="addFlavor(meal)"
              />
              <button @click="addFlavor(meal)" class="button is-light">
                新增
              </button>
            </div>
            <div
              v-if="meal.flavor_group.length"
              class="main-meals__flavor--show flavors-list--show"
            >
              <div
                v-for="(flavor, index) in meal.flavor_group"
                :key="index"
                class="flavor--item"
              >
                <font-awesome-icon
                  icon="times"
                  size="lg"
                  @click="deleteFlavor(meal, index)"
                ></font-awesome-icon>
                <label>{{ flavor.choice }}</label>
              </div>
            </div>
          </td>
          <td data-label="備註" class="main-meals__note">
            <input class="input" type="text" v-model.trim="meal.note" />
          </td>
          <td class="main-meals__delete">
            <font-awesome-icon
              icon="trash-alt"
              size="lg"
              class="minusrow"
              @click="minusRow('main_meals', index)"
            ></font-awesome-icon>
          </td>
        </tr>
      </tbody>
    </table>
    <h1 class="title">
      加點
      <span class="subtitle">(不可選飯菜)</span>
      <font-awesome-icon
        icon="plus-circle"
        size="xs"
        class="addrow"
        @click="addRow('snacks')"
      ></font-awesome-icon>
    </h1>
    <table class="snacks table is-bordered">
      <thead>
        <tr>
          <th class="menu-header__name snack__name">名稱</th>
          <th class="menu-header__price snack__price">價格</th>
          <th class="menu-header__limited snack__limited">限量(份數)</th>
          <th class="menu-header__group snack__group">團體</th>
          <th class="menu-header__flavor snack__flavor">口味</th>
          <th class="menu-header__note snack__note">備註</th>
          <th class="menu-header__delete snack__delete"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(snack, index) in snacks" :key="index">
          <td data-label="名稱" class="snack__name">
            <input class="input" type="text" v-model.trim="snack.name" />
          </td>
          <td data-label="價格" class="snack__price">
            <input class="input" type="tel" v-model.number="snack.price" />
          </td>
          <td data-label="限量(份數)" class="snack__limited">
            <input
              class="input"
              type="tel"
              v-model.number="snack.quantity_limit"
            />
          </td>
          <td data-label="團體" class="snack__group">
            <div class="select">
              <select
                v-if="groups"
                class="group--select"
                v-model="snack.group_id"
              >
                <option value="null">全體</option>
                <option
                  v-for="group in groups"
                  :value="group.id"
                  :key="group.id"
                  >{{ group.name }}</option
                >
              </select>
            </div>
          </td>
          <td data-label="口味" class="flavors-list snack__flavor">
            <div class="snack__flavor--add flavors-list--add">
              <input
                class="input"
                type="text"
                v-model.trim="snack.flavor"
                @keypress.enter="addFlavor(snack)"
              />
              <button @click="addFlavor(snack)" class="button is-light">
                新增
              </button>
            </div>
            <div
              v-if="snack.flavor_group.length"
              class="snack__flavor--show flavors-list--show"
            >
              <div
                v-for="(flavor, index) in snack.flavor_group"
                :key="index"
                class="flavor--item"
              >
                <font-awesome-icon
                  icon="times"
                  size="lg"
                  @click="deleteFlavor(snack, index)"
                ></font-awesome-icon>
                <label>{{ flavor.choice }}</label>
              </div>
            </div>
          </td>
          <td data-label="備註" class="snack__note">
            <input class="input" type="text" v-model.trim="snack.note" />
          </td>
          <td class="snack__delete">
            <font-awesome-icon
              icon="trash-alt"
              size="lg"
              class="minusrow"
              @click="minusRow('snacks', index)"
            ></font-awesome-icon>
          </td>
        </tr>
      </tbody>
    </table>
    <button
      :class="{ 'is-loading': loading_status.addMeal }"
      :disabled="loading_status.addMeal"
      class="button is-info"
      @click.prevent="addMeal"
    >
      新增餐點
    </button>
  </section>
</template>

<script>
export default {
  name: "addmenu",
  props: ["choose_date"],
  data() {
    return {
      loading_status: {
        addMeal: false
      },
      main_meals: [
        {
          type: 0,
          name: null,
          price: 70,
          quantity_limit: null,
          group_id: null,
          flavor: null,
          flavor_group: [],
          note: null
        }
      ],
      snacks: [
        {
          type: 1,
          name: null,
          price: null,
          quantity_limit: null,
          group_id: null,
          flavor: null,
          flavor_group: [],
          note: null
        }
      ]
    };
  },
  computed: {
    groups() {
      return this.$store.getters.groups;
    }
  },
  methods: {
    addRow(name) {
      const meal = {
        name: null,
        price: null,
        quantity_limit: null,
        group_id: null,
        flavor: null,
        flavor_group: [],
        note: null
      };
      if (name === "main_meals") {
        meal["type"] = 0;
        meal["price"] = 70;
        this.main_meals.push(meal);
      } else {
        meal["type"] = 1;
        this.snacks.push(meal);
      }
    },
    minusRow(name, index) {
      if (name === "main_meals") {
        if (this.main_meals.length === 1) return;
        this.main_meals.splice(index, 1);
      } else {
        if (this.snacks.length === 1) return;
        this.snacks.splice(index, 1);
      }
    },
    async addMeal() {
      try {
        let menu = [...this.main_meals, ...this.snacks];
        menu = this.removeEmptyRow(menu);
        menu = this.removeValueIsNull(menu);
        if (menu.length === 0) {
          alert("至少輸入一筆");
          return;
        }
        const all_price_Interger = menu.every(meal =>
          Number.isInteger(meal.price)
        );
        const all_limite_Interger = menu.every(meal => {
          if (!meal.quantity_limit) return true;
          if (meal.quantity_limit && Number.isInteger(meal.quantity_limit)) {
            return true;
          }
          return false;
        });
        const formated_date = this.Date.parse(this.choose_date).toString(
          "yyyy/MM/d"
        );
        if (!all_price_Interger) {
          alert("請檢查格式");
          return;
        }
        if (!all_limite_Interger) {
          alert("限量需填數字");
          return;
        }
        menu = this.mealAddDate(menu);
        this.loading_status.addMeal = true;
        await Promise.all(
          menu.map(async meal => {
            const meal_id = await this.$store.dispatch("addDailyMenu", meal);
            if (!meal.flavor_group.length) return meal_id;
            return this.addMenuFlavor(meal.flavor_group, meal_id);
          })
        );
        this.resetMealForm();
        await this.$store.dispatch("retrieveDailyMenu", {
          menu_date: formated_date
        });
        this.loading_status.addMeal = false;
      } catch (e) {
        console.error(e);
        this.loading_status.addMeal = false;
      }
    },
    removeEmptyRow(menu) {
      return menu.filter(meal => {
        return !!meal.name && !!meal.price;
      });
    },
    removeValueIsNull(menu) {
      return menu.map(meal => {
        const filtered_meal = Object.fromEntries(
          Object.entries(meal).filter(
            item => item[1] !== "" && item[1] !== null
          )
        );
        return filtered_meal;
      });
    },
    addFlavor(meal) {
      if (!meal.flavor) return;
      meal.flavor_group.push({
        choice: meal.flavor
      });
      meal.flavor = "";
    },
    deleteFlavor(meal, index) {
      meal.flavor_group.splice(index, 1);
    },
    addMenuFlavor(flavor_group, menu_id) {
      flavor_group = flavor_group.map(flavor => {
        flavor["menu_id"] = menu_id;
        return flavor;
      });
      return this.$store.dispatch("addMenuFlavor", {
        flavorArray: flavor_group
      });
    },
    resetMealForm() {
      this.main_meals = [
        {
          type: 0,
          name: null,
          price: null,
          quantity_limit: null,
          group_id: null,
          flavor: null,
          flavor_group: [],
          note: null
        }
      ];
      this.snacks = [
        {
          type: 1,
          name: null,
          price: null,
          quantity_limit: null,
          group_id: null,
          flavor: null,
          flavor_group: [],
          note: null
        }
      ];
    },
    mealAddDate(menu) {
      const formated_date = this.Date.parse(this.choose_date).toString(
        "yyyy/MM/d"
      );
      return menu.map(meal => {
        meal["menu_date"] = formated_date;
        return meal;
      });
    }
  }
};
</script>

<style scoped lang="scss">
.addrow {
  cursor: pointer;
  margin-left: 1rem;
  &:hover {
    opacity: 0.5;
  }
}
.flavors-list {
  display: flex;
  flex-wrap: wrap;
  &--add {
    display: flex;
    flex-wrap: nowrap;
    button {
      margin-left: 1rem;
    }
  }
  &--show {
    padding: 0 1rem;
    text-align: left;
    label {
      padding-left: 1rem;
    }
  }
}
.flavor--item {
  & > :first-child {
    color: red;
    cursor: pointer;
  }
  &:hover {
    background-color: #e2e2e28f;
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
@media screen and (max-width: 767px) {
  .section {
    overflow: scroll;
  }
}
</style>
