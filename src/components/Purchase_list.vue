<template>
<section class="purchase section">
  <div class="purchase__title columns content ">
    <div class="purchase-title__date column ">
      <label for="purchaseDate">日期</label>
      <div class="select ">
        <select class="group--select" name="purchaseDate" v-model="choose_date">
          <option v-for="(date, index) in date_range" :value="date" :key="index">{{ date }}</option>
        </select>
      </div>
    </div>
  </div>
  <div class="columns purchase__detailContainer">
    <div class="member-purchase column">
      <div class="member-purchase__header columns">
        <div class="column is-two-fifths purchase-header purchase-header__name">
          名稱
        </div>
        <div class="column purchase-header purchase-header__amount">
          數量
        </div>
        <div class="column purchase-header purchase-header__rice">
          飯量
        </div>
        <div class="column purchase-header purchase-header__vegetable">
          菜量
        </div>
        <div class="column purchase-header purchase-header__flavor">
          口味
        </div>
        <div class="column purchase-header purchase-header__note">
          備註
        </div>
      </div>
      <div v-if="purchase_list.length" class="member-purchase__list ">
        <div v-for="(meal, index) in purchase_list" :key="index" class="purchase-list__items columns ">
          <div class="list-item list-item__name column is-two-fifths ">
            {{ meal.menu_name }}
          </div>
          <div class="list-item list-item__amount column">
            {{ meal.quantity }}
          </div>
          <div class="list-item list-item__rice column">
            {{converRice(meal.user_rice)}}
          </div>
          <div class="list-item list-item__vegetable column">
            {{converVegetable(meal.user_vegetable)}}
          </div>
          <div class="column list-item list-item__flavor">
            {{meal.flavor_choice}}
          </div>
          <div class="column list-item list-item__note">
            {{meal.note}}
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
</template>

<script>
export default {
  name: "order_table",
  data() {
    return {
      choose_date: ""
    };
  },
  created() {
    const first_date = this.date_range[0];
    const formated_date = this.Date.parse(first_date).toString("yyyy/MM/dd");
    this.choose_date = this.date_range[0];
  },
  computed: {
    date_range() {
      return this.$store.getters.date_range;
    },
    purchase_list() {
      return this.$store.getters.purchase_list;
    }
  },
  watch: {
    choose_date: function(date) {
      const formated_date = this.Date.parse(date).toString("yyyy/MM/dd");
      this.$store.dispatch("retrievePurchaseList", {
        start_date: formated_date,
        end_date: formated_date
      });
    }
  },
  methods: {
    converRice(rice) {
      let conver_rice;
      switch (rice) {
        case 1:
          conver_rice = "正常";
          break;
        case 2:
          conver_rice = "1/2飯";
          break;
        case 3:
          conver_rice = "1/3飯";
          break;
        case 4:
          conver_rice = "2/3飯";
          break;
        case 5:
          conver_rice = "1/4飯";
          break;
        case 6:
          conver_rice = "不飯";
          break;
        case 7:
          conver_rice = "多飯";
          break;
        default:
          conver_rice = "無";
      }
      return conver_rice;
    },
    converVegetable(vegetable) {
      let conver_vegetable;
      switch (vegetable) {
        case 1:
          conver_vegetable = "正常";
          break;
        case 2:
          conver_vegetable = "多菜";
          break;
        case 3:
          conver_vegetable = "少菜";
          break;
        case 4:
          conver_vegetable = "不菜";
          break;
        default:
          conver_vegetable = "無";
      }
      return conver_vegetable;
    }
  }
};
</script>

<style scoped lang="scss">
.purchase-title {
    &__date {
        label {
            margin-right: 1rem;
            font-size: 1.5rem;
        }
    }
    &__deadline {
        font-size: 2rem;
    }
}
.member-purchase {
    &__header {
        border: 1px solid;
    }
    &__list {
        position: relative;
        & > div {
            border: 1px solid;
            border-top: none;
        }
    }
    &__next {
        position: fixed;
        bottom: 1rem;
        right: 1rem;
        box-shadow: 6px 5px 10px 0 rgba(0, 0, 0, 0.3);
    }
}
.purchase-header {
    border-right: 1px solid;
    &:last-child {
        border: none;
    }
}
.list-item {
    display: flex;
    align-items: center;
    padding-top: 1rem;
    padding-bottom: 1rem;

}
@media screen and (max-width: 768px) {
    @mixin mealTitle($name) {
        &::before {
            content: $name;
            display: block;
            margin-right: 2rem;
        }
    }
    .member-purchase__header {
        display: none;
    }
    .member-purchase__list {
        > div:first-of-type {
            border-top: 1px solid;
        }
    }
    .list-item {
        &__name {
            @include mealTitle("名稱")
        }
        &__amount {
            @include mealTitle("數量")
        }
        &__rice {
            @include mealTitle("飯量")
        }
        &__vegetable {
            @include mealTitle("菜量")
        }
        &__flavor {
            @include mealTitle("口味")
        }
        &__note {
            @include mealTitle("備註")
        }
    }
}
</style>
