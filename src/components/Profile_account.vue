<template>
  <section class="account-detail col-sm-12 col-md-6 col-lg-4 ">
    <form @submit.prevent="changeProfile">
      <fieldset id="account__form">
        <legend>我的帳戶</legend>
        <div class="row">
          <div class="col-sm-12 col-md-12">
            <label for="account__name">使用者名稱</label>
          </div>
          <div class="col-sm-12 col-md-12">
            <input
              v-model="user_datail.name"
              type="text"
              id="account__name"
              placeholder="請輸入使用者名稱"
            />
          </div>
        </div>
        <div class="row">
          <div class="col-sm-12 col-md-12">
            <label for="account__account">信箱</label>
          </div>
          <div class="col-sm-12 col-md-12">
            <input
              v-model="user_datail.account"
              type="text"
              id="account__account"
              placeholder="請輸入信箱"
            />
          </div>
        </div>
        <div class="row">
          <div class="col-sm-12 col-md-12">
            <label for="account__group">團體</label>
          </div>
          <div class="col-sm-12 col-md-12">
            <select
              v-model="user_datail.group_id"
              class="group--select"
              name="account__group"
            >
              <option value=""></option>
              <option value="1">好想工作室</option>
              <option value="2">Howard家</option>
              <option value="3">大灣</option>
              <option value="4">佳音</option>
              <option value="5">個人</option>
            </select>
          </div>
        </div>
        <div class="row">
          <div class="col-sm-12 col-md-12">
            <label for="account__name">飯量</label>
          </div>
          <div class="col-sm-12 col-md-12">
            <select
              v-model="user_datail.rice"
              class="group--select"
              name="account__group"
            >
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
        <div class="row">
          <div class="col-sm-12 col-md-12">
            <label for="account__vegetable">菜量</label>
          </div>
          <div class="col-sm-12 col-md-12">
            <select
              v-model="user_datail.vegetable"
              class="group--select"
              name="account__group"
            >
              <option value="2">多菜</option>
              <option value="1">正常</option>
              <option value="3">少菜</option>
              <option value="4">不菜</option>
            </select>
          </div>
        </div>
        <div class="row">
          <div class="col-sm-12 col-md-12">
            <label for="account__Remark">備註</label>
          </div>
          <div class="col-sm-12 col-md-12">
            <input
              v-model="user_datail.note"
              type="text"
              id="account__Remark"
              placeholder="請輸入備註"
            />
          </div>
        </div>
        <div class="row">
          <div class="col-sm-12 col-md-12">
            <label for="account__code">
              密碼
              <span>*</span>
              <span v-if="isEmpty">密碼為必填</span>
            </label>
          </div>
          <div class="col-sm-12 col-md-12">
            <input
              v-bind:class="{ active: isEmpty }"
              type="password"
              placeholder="請輸入密碼"
              v-model="user_password"
              @blur="checkPassword"
            />
          </div>
        </div>
        <button class="primary large" type="submit">儲存變更</button>
      </fieldset>
    </form>
  </section>
</template>

<script>
export default {
  name: "Profile_account",
  data() {
    return {
      user_datail: null,
      user_password: "",
      isEmpty: false
    };
  },
  created() {
    this.user_datail = this.$store.state.user_datail;
  },
  methods: {
    changeProfile() {
      if (!this.user_password) {
        this.isEmpty = true;
        return;
      }
    },
    checkPassword() {
      if (!this.user_password) {
        this.isEmpty = true;
        return;
      }
      this.isEmpty = false;
    }
  }
};
</script>
<style scoped lang="scss">
@import "@/assets/form.scss";
span {
  color: red;
}
.active {
  background-color: rgba(255, 0, 0, 0.1);
  border: 1px solid red;
}
</style>
