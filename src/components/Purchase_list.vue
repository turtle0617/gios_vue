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
        <div class="column purchase-header purchase-header__status">
        </div>
        <div class="column purchase-header purchase-header__name">
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
        <template v-for="(meal, index) in purchase_list">
          <div :key="index" v-if="modify !== index" class="purchase-list__item purchase-list__show columns ">
            <div class="list-item list-item__status column">
              <button class="button is-danger">
                刪除
              </button>
              <button class="button is-info" @click="modifyPurchaseMeal(meal,index)">
                修改
              </button>
            </div>
            <div class="list-item list-item__name column ">
              <span>
                {{ meal.menu_name }}
              </span>
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

          <div v-else class="purchase-list__item purchase-list__modify columns ">
            <div class="list-item list-item__status column">
              <button class="button is-info">
                送出
              </button>
              <button class="button is-light" @click="modifyPurchaseMeal(meal)">
                取消
              </button>
            </div>
            <div class="list-item list-item__name column ">
              <span>
                {{ meal.menu_name }}
              </span>
            </div>
            <div class="list-item list-item__amount column">
              {{ meal.quantity }}
            </div>
            <div class="list-item list-item__rice column">
              <div v-if="change_meal.rice" class="select">
                <select v-model.number="change_meal.rice">
                  <option value="7">多飯</option>
                  <option value="1">正常</option>
                  <option value="2">1/2飯</option>
                  <option value="3">1/3飯</option>
                  <option value="4">2/3飯</option>
                  <option value="5">1/4飯</option>
                  <option value="6">不飯</option>
                </select>
              </div>
            </div>
            <div class="list-item list-item__vegetable column">
              <div v-if="change_meal.vegetable" class="select">
                <select v-model.number="change_meal.vegetable">
                  <option value="2">多菜</option>
                  <option value="1">正常</option>
                  <option value="3">少菜</option>
                  <option value="4">不菜</option>
                </select>
              </div>
            </div>
            <div class="column list-item list-item__flavor">
              <div v-if="change_meal.flavor_id" class="select">
                <select v-model.number="change_meal.flavor_id">
                  <option v-for="(flavor, index) in change_meal.flavors" :value="flavor.id" :key="index">{{ flavor.choice }}</option>
                </select>
              </div>
            </div>
            <div class="column list-item list-item__note ">
              <input type="text" class="input" v-model="change_meal.note">
            </div>
          </div>

        </template>
      </div>
    </div>
  </div>
</section>
</template>

<script>
export default {
  name: "purchase_list",
  data() {
    return {
      choose_date: "",
      modify: null,
      change_meal: {
        rice: null,
        vegetable: null,
        flavor_id:null,
        flavors: null,
        note: null
      }
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
    },
    member_menu() {
      return this.$store.getters.member_menu;
    }
  },
  watch: {
    choose_date: function(date) {
      const formated_date = this.Date.parse(date).toString("yyyy/MM/dd");
      this.$store.dispatch("retrievePurchaseList", {
        start_date: formated_date,
        end_date: formated_date
      });
      this.$store.dispatch("retrieveMemberDailyMenu", {
        menu_date: formated_date
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
    },
    modifyPurchaseMeal(meal,index = null) {
      this.modify = index;
      this.clearObjectValue(this.change_meal)
      if(index === null) return;
      const menu = this.member_menu.filter(item=>item.id===meal.menu_id)[0];
      this.change_meal.rice = meal.user_rice;
      this.change_meal.vegetable = meal.user_vegetable;
      this.change_meal.note = meal.note;
      if(meal.flavor_choice){
        const choice = meal.flavor_choice;
        const choice_id = menu.flavors.filter(flavor=>choice===choice)[0].id
        this.change_meal.flavors = menu.flavors;
        this.change_meal.flavor_id = choice_id;
      }
    },
    clearObjectValue(object){
      for(let key in object){
        object[key] = null;
      }
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
    &:first-child {
        border: none;
    }
    &:last-child {
        border: none;
    }
}
.purchase-list__item {
    border: 1px solid;
    border-top: none;
}
.list-item {
    display: flex;
    align-items: center;
    padding-top: 1rem;
    padding-bottom: 1rem;
    &__status {
        button {
            margin-right: 1rem;
        }
    }

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

    .purchase-list__item {
        border: 1px solid;
        margin-top: 1rem;
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
