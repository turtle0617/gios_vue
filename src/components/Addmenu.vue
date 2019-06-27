<template>
  <section class="addmenu row">
    <table class="menu__meal col-md-12">
      <thead>
        <tr>
          <th class="menutable__name">名稱</th>
          <th class="menutable__price">價格</th>
          <th class="menutable__limited">限量(份數)</th>
          <th class="menutable__group">團體</th>
          <th class="menu-list__flavor">口味</th>
          <th class="menutable__note">備註</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td data-label="名稱" class="menutable__name">
            <input
              type="text"
              :class="{ error: empty_error.name }"
              v-model.trim="meal.name"
            />
            <span v-if="empty_error.name">不得為空</span>
          </td>
          <td data-label="價格" class="menutable__price">
            <input
              type="tel"
              :class="{ error: empty_error.price }"
              v-model.number="meal.price"
            />
            <span v-if="empty_error.price">請填數字</span>
          </td>
          <td data-label="限量(份數)" class="menutable__limited">
            <input
              type="tel"
              v-model.number="meal.quantity_limit"
              :class="{ error: not_number_error }"
            />
            <span v-if="not_number_error">請填數字</span>
          </td>
          <td data-label="團體" class="menutable__group">
            <select v-if="groups" class="group--select" v-model="meal.group_id">
              <option value="all">全體</option>
              <option
                v-for="group in groups"
                :value="group.id"
                :key="group.id"
                >{{ group.name }}</option
              >
            </select>
          </td>
          <td data-label="口味" class="menutable__flavor">
            <div class="menutable__flavor--add">
              <input
                type="text"
                v-model.trim="flavor"
                @keypress.enter="addFlavor"
              />
              <button @click="addFlavor">新增</button>
            </div>
            <div v-if="flavor_group.length" class="menutable__flavor--show">
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
          <td data-label="備註" class="menutable__note">
            <input type="text" v-model.trim="meal.note" />
          </td>
        </tr>
      </tbody>
      <tfoot>
        <button
          type="button"
          name="button"
          class="primary"
          @click.prevent="addMeal"
        >
          送出
        </button>
      </tfoot>
    </table>
  </section>
</template>

<script>
export default {
  name: "addmenu",
  props: ["choose_date"],
  data() {
    return {
      meal: {
        name: null,
        price: null,
        quantity_limit: null,
        group_id: "all",
        note: null
      },
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
@mixin tableColWidth($grow, $minWidth) {
  flex-grow: $grow;
  min-width: $minWidth;
}
@mixin inputWidth($width) {
  input {
    width: $width;
    border-radius: 6px;
  }
}
.addmenu {
  table {
    width: 100%;
    overflow: visible;
    max-height: none;
    thead {
      z-index: 1;
      position: static;
    }

    select {
      height: 44px;
    }
    tfoot {
      width: 100%;
      text-align: right;
      button {
        border-radius: 6px;
        padding: 20px 40px;
      }
    }
  }
}
.menutable__name {
  @include inputWidth(100%);
}
.menutable__price {
  @include inputWidth(100%);
  @include tableColWidth(0, 60px);
}
.menutable__limited {
  @include inputWidth(100%);
  @include tableColWidth(0, 80px);
}
.menutable__group {
  @include inputWidth(100%);
  @include tableColWidth(0, 110px);
}
.menutable__flavor {
  display: flex;
  flex-wrap: wrap;
  @include tableColWidth(0, 180px);
  &--add {
    @include inputWidth(50%);
    display: flex;
    flex-wrap: nowrap;
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
.menutable__note {
  @include inputWidth(100%);
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
