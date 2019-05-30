<template>
  <section class="menu row">
    <table class="menu__meal col-md-12">
      <caption class="menutable__title ">
        <div class="menutable__date">
          <label for="orderDate">日期</label>
          <select class="group--select" name="orderDate">
            <option value="6/1">6/1</option>
            <option value="6/2">6/2</option>
            <option value="6/3">6/3</option>
            <option value="6/4">6/4</option>
            <option value="6/5">6/5</option>
            <option value="6/6">6/6</option>
            <option value="6/7">6/7</option>
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
        <tr
          v-for="meal in menu"
          v-bind:key="meal.name"
          @change.once="addMeal()"
        >
          <td data-label="名稱">
            <input type="text" v-model="meal.name" />
          </td>
          <td data-label="價格" class="menutable__price">
            <input type="text" v-model="meal.price" />
          </td>
          <td data-label="限量(份數)" class="menutable__limited">
            <input type="text" v-model="meal.limited" />
          </td>
          <td data-label="團體" class="menutable__group">
            <select class="group--select" v-model="meal.group">
              <option value=""></option>
              <option value="好想工作室">好想工作室</option>
              <option value="Howard家">Howard家</option>
              <option value="大灣">大灣</option>
              <option value="佳音">佳音</option>
              <option value="個人">個人</option>
            </select>
          </td>
          <td data-label="口味(用 / 區隔)">
            <input type="text" v-model="meal.flavor" />
          </td>
          <td data-label="備註">
            <input type="text" v-model="meal.remark" />
          </td>
        </tr>
      </tbody>
      <tfoot>
        <button type="button" name="button" class="primary">送出</button>
      </tfoot>
    </table>
  </section>
</template>

<script>
export default {
  name: "order_table",
  data() {
    return {
      menu: []
    };
  },
  mounted() {
    this.addMeal();
  },
  methods: {
    addMeal() {
      this.menu.push({
        name: null,
        price: null,
        limited: null,
        group: null,
        flavor: null,
        remark: null
      });
    }
  }
};
</script>

<style scoped lang="scss">
@mixin tableColWidth($grow, $minWidth) {
  flex-grow: $grow;
  min-width: $minWidth;
}
.menu {
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
</style>
