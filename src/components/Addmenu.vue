<template>
  <section class="addmenu row">
    <table class="menu__meal col-md-12">
      <caption class="menutable__title ">
        <div class="menutable__date">
          <label for="orderDate">日期</label>
          <select class="group--select" name="orderDate" v-model="choose_day">
            <option
              v-for="(day, index) in day_range"
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
          <th class="menutable__group">團體</th>
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
            <span v-if="empty_error.price">不得為空</span>
          </td>
          <td data-label="限量(份數)" class="menutable__limited">
            <input type="tel" v-model.number="meal.limited" />
          </td>
          <td data-label="團體" class="menutable__group">
            <select v-if="groups" class="group--select" v-model="meal.group">
              <option value="none" selected>否</option>
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
            <input type="text" v-model.trim="meal.flavor" />
          </td>
          <td data-label="備註">
            <input type="text" v-model.trim="meal.remark" />
          </td>
        </tr>
      </tbody>
      <tfoot>
        <button type="button" name="button" class="primary" @click="addMeal">
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
      day_range: null,
      choose_day: null,
      groups: null,
      meal: {
        name: null,
        price: null,
        limited: null,
        group: "none",
        flavor: null,
        remark: null
      },
      empty_error: {
        name: false,
        price: false
      }
    };
  },
  created() {
    this.day_range = this.generateDaysRange(7);
    this.choose_day = this.day_range[0];
    this.$store.dispatch("retrieveGroups").then(res => {
      this.groups = res;
    });
  },
  computed: {},
  methods: {
    addMeal() {
      const isEmpty = this.detectEmpty();
      if (isEmpty) return;
      console.log(this.meal);
    },
    generateDaysRange(num) {
      let range = new Array(num).fill(0);
      return range.map((item, index) => {
        const day = Date.today()
          .add(index)
          .day();
        return day.toString("M/d");
      });
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
  @include tableColWidth(0, 120px);
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
