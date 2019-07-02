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
            <input
              class="input"
              type="text"
              :class="{ error: empty_error.name }"
              v-model.trim="meal.name"
            />
            <span v-if="empty_error.name">不得為空</span>
          </td>
          <td data-label="價格" class="main-meals__price">
            <input
              class="input"
              type="tel"
              :class="{ error: empty_error.price }"
              v-model.number="meal.price"
            />
            <span v-if="empty_error.price">請填數字</span>
          </td>
          <td data-label="限量(份數)" class="main-meals__limited">
            <input
              class="input"
              type="tel"
              v-model.number="meal.quantity_limit"
              :class="{ error: not_number_error }"
            />
            <span v-if="not_number_error">請填數字</span>
          </td>
          <td data-label="團體" class="main-meals__group">
            <div class="select">
              <select
                v-if="groups"
                class="group--select"
                v-model="meal.group_id"
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
          <td data-label="口味" class="main-meals__flavor flavors-list">
            <div class="main-meals__flavor--add flavors-list--add">
              <input
                class="input"
                type="text"
                v-model.trim="flavor"
                @keypress.enter="addFlavor"
              />
              <button @click="addFlavor" class="button is-light">新增</button>
            </div>
            <div
              v-if="flavor_group.length"
              class="main-meals__flavor--show flavors-list--show"
            >
              <div
                v-for="(flavor, index) in flavor_group"
                :key="index"
                class="flavor--item"
              >
                <font-awesome-icon
                  icon="times"
                  size="lg"
                  @click="deleteFlavor(index)"
                ></font-awesome-icon>
                <label>{{ flavor }}</label>
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
            <input
              class="input"
              type="text"
              :class="{ error: empty_error.name }"
              v-model.trim="snack.name"
            />
            <span v-if="empty_error.name">不得為空</span>
          </td>
          <td data-label="價格" class="snack__price">
            <input
              class="input"
              type="tel"
              :class="{ error: empty_error.price }"
              v-model.number="snack.price"
            />
            <span v-if="empty_error.price">請填數字</span>
          </td>
          <td data-label="限量(份數)" class="snack__limited">
            <input
              class="input"
              type="tel"
              v-model.number="snack.quantity_limit"
              :class="{ error: not_number_error }"
            />
            <span v-if="not_number_error">請填數字</span>
          </td>
          <td data-label="團體" class="snack__group">
            <div class="select">
              <select
                v-if="groups"
                class="group--select"
                v-model="snack.group_id"
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
          <td data-label="口味" class="flavors-list snack__flavor">
            <div class="snack__flavor--add flavors-list--add">
              <input
                class="input"
                type="text"
                v-model.trim="flavor"
                @keypress.enter="addFlavor"
              />
              <button @click="addFlavor" class="button is-light">新增</button>
            </div>
            <div
              v-if="flavor_group.length"
              class="snack__flavor--show flavors-list--show"
            >
              <div
                v-for="(flavor, index) in flavor_group"
                :key="index"
                class="flavor--item"
              >
                <font-awesome-icon
                  icon="times"
                  size="lg"
                  @click="deleteFlavor(index)"
                ></font-awesome-icon>
                <label>{{ flavor }}</label>
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
      type="button"
      name="button"
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
      main_meals: [
        {
          type: 0,
          name: null,
          price: null,
          quantity_limit: null,
          group_id: "all",
          note: null
        }
      ],
      snacks: [
        {
          type: 1,
          name: null,
          price: null,
          quantity_limit: null,
          group_id: "all",
          note: null
        }
      ],
      flavor: null,
      flavor_group: [],
      empty_error: {
        name: false,
        price: false
      },
      not_number_error: false
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
        group_id: "all",
        note: null
      };
      if (name === "main_meals") {
        meal["type"] = 0;
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
        this.hideAllError();

        const isEmpty = this.detectEmpty();
        const isPriceNum = Number.isInteger(this.meal.price);
        if (isEmpty || !isPriceNum) {
          if (!isPriceNum) this.empty_error.price = true;
          return;
        }
        let meal = Object.assign({}, this.meal);
        let copy_flavor_group = this.flavor_group.slice();
        const formated_date = this.Date.parse(this.choose_date).toString(
          "yyyy/MM/d"
        );
        meal["menu_date"] = formated_date;

        if (meal.group_id === "all") meal.group_id = null;
        meal = this.removeOptionIsNull(meal);
        const menu_id = await this.$store.dispatch("addDailyMenu", meal);

        this.resetMealForm();
        if (copy_flavor_group) {
          await this.addMenuFlavor(copy_flavor_group, menu_id);
        }
        this.$store.dispatch("retrieveDailyMenu", {
          menu_date: formated_date
        });
      } catch (e) {
        console.error(e);
      }
    },
    removeOptionIsNull(meal) {
      return Object.fromEntries(
        Object.entries(meal).filter(item => item[1] !== "" && item[1] !== null)
      );
    },
    addFlavor() {
      if (!this.flavor) return;
      this.flavor_group.push(this.flavor);
      this.flavor = "";
    },
    deleteFlavor(index) {
      this.flavor_group.splice(index, 1);
    },
    addMenuFlavor(flavor_group, menu_id) {
      return Promise.all(
        flavor_group.map(flavor => {
          return this.$store.dispatch("addMenuFlavor", {
            menu_id: menu_id,
            choice: flavor
          });
        })
      );
    },
    resetMealForm() {
      this.meal = {
        name: null,
        price: null,
        quantity_limit: null,
        group_id: "all",
        note: null
      };
      this.flavors = null;
      this.flavor_group = [];
    },
    hideAllError() {
      this.not_number_error = false;
      this.empty_error.name = false;
      this.empty_error.price = false;
    },
    detectEmpty() {
      const detected = {
        name: this.meal.name,
        price: this.meal.price
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
</style>
