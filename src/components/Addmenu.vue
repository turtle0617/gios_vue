<template>
  <section class="addmenu row">
    <table class="menu__meal col-md-12">
      <caption class="menutable__title ">
        <div class="menutable__date">
          <label for="orderDate">日期</label>
          <select class="group--select" name="orderDate" v-model="choose_date">
            <option
              v-for="(day, index) in date_range"
              :key="index"
              :value="day"
              >{{ day }}</option
            >
          </select>
        </div>
      </caption>
      <thead>
        <tr>
          <th>名稱</th>
          <th class="menutable__price">價格</th>
          <th class="menutable__limited">限量(份數)</th>
          <th class="menutable__group">團體(需先填限量)</th>
          <th>口味(用 / 區隔)</th>
          <th>備註</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td data-label="名稱">
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
          <td data-label="口味(用 / 區隔)">
            <input type="text" v-model.trim="flavor" />
          </td>
          <td data-label="備註">
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
  data() {
    return {
      date_range: null,
      choose_date: null,
      groups: null,
      meal: {
        name: null,
        price: null,
        quantity_limit: null,
        group_id: "all",
        note: null
      },
      flavor: null,
      empty_error: {
        name: false,
        price: false
      },
      not_number_error: false
    };
  },
  created() {
    this.date_range = this.generateDateRange(7);
    this.choose_date = this.date_range[0];
    this.$store.dispatch("retrieveGroups").then(res => {
      this.groups = res;
    });
  },
  watch: {
    choose_date: function(val, oldval) {
      console.log("hi", val, oldval);
      this.$store
        .dispatch("retrieveDailyMenu", {
          menu_date: this.date.parse(val).toString("yyyy/MM/d")
        })
        .catch(err => {
          console.error(err);
        });
    }
  },
  methods: {
    async addMeal() {
      this.hideAllError();

      const isEmpty = this.detectEmpty();
      const isPriceNum = Number.isInteger(this.meal.price);
      if (isEmpty) return;
      if (!isPriceNum) {
        this.empty_error.price = true;
        return;
      }
      let meal = Object.assign({}, this.meal);
      const formated_date = this.date
        .parse(this.choose_date)
        .toString("yyyy/MM/d");
      meal["menu_date"] = formated_date;
      if (meal.group_id === "all") meal.group_id = null;

      if (meal.quantity_limit && !Number.isInteger(meal.quantity_limit)) {
        this.not_number_error = true;
        console.log("hi");
        return;
      }

      meal = this.removeOptionIsNull(meal);
      try {
        const menu_id = await this.$store.dispatch("addDailyMenu", meal);
        // console.log("await addDailyMenu",menu_id);
        this.resetMealForm();
        if (this.flavor) {
          await this.$store.dispatch("addMenuFlavor", {
            menu_id: menu_id,
            choice: this.flavor
          });
          // console.log("await flavor");
        }
        // console.log("dispatch retrieveDailyMenu");
        this.$store.dispatch("retrieveDailyMenu", {
          menu_date: formated_date
        });
      } catch (e) {
        console.error(e);
      }
    },
    generateDateRange(num) {
      let range = new Array(num).fill(0);
      return range.map((item, index) => {
        const date = Date.today()
          .add(index + 1)
          .day();
        return date.toString("M/d");
      });
    },
    removeOptionIsNull(meal) {
      return Object.fromEntries(
        Object.entries(meal).filter(item => item[1] !== "" && item[1] !== null)
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
      this.flavor = null;
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
.addmenu {
  table {
    width: 100%;
    overflow: visible;
    max-height: none;
    thead {
      z-index: 1;
    }
    caption {
      text-align: left;
    }
    input {
      max-width: 100%;
      border-radius: 6px;
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
.menutable__price {
  @include tableColWidth(0, 60px);
}
.menutable__limited {
  @include tableColWidth(0, 120px);
}
.menutable__group {
  @include tableColWidth(0, 130px);
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
