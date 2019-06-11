<template>
  <section class="login-detail col-sm-12 col-md-6 col-lg-4 ">
    <form @submit.prevent="login">
      <fieldset id="login__form">
        <legend>登入</legend>
        <div class="row">
          <div class="col-sm-12 col-md-12">
            <label for="login__account">使用者帳戶</label>
          </div>
          <div class="col-sm-12 col-md-12">
            <input
              type="text"
              id="login__account"
              placeholder="請輸入使用者名稱"
              v-model="account"
            />
          </div>
        </div>
        <div class="row">
          <div class="col-sm-12 col-md-12">
            <label for="login__userCode">密碼</label>
          </div>
          <div class="col-sm-12 col-md-12">
            <input
              type="password"
              id="login__userCode"
              placeholder="請輸入密碼"
              v-model="password"
            />
          </div>
        </div>
        <div class="row">
          <div class="col-sm-12 col-md-12">
            <label for="login__role">角色</label>
          </div>
          <div class="col-sm-12 col-md-12">
            <select v-model="role_id" class="group--select">
              <option value="customer">顧客</option>
              <option value="trader">店家</option>
            </select>
          </div>
        </div>
        <button class="primary large" type="submit">登入</button>
        <a href="/register">
          <span>註冊</span>
        </a>
      </fieldset>
    </form>
  </section>
</template>

<script>
export default {
  name: "Auth_login",
  data() {
    return {
      account: "",
      password: "",
      role_id: "customer"
    };
  },
  methods: {
    login() {
      if (this.role_id === "customer") {
        console.log("customer");
        this.$store
          .dispatch("retriveCustomerToken", {
            account: this.account,
            password: this.password
          })
          .then(response => {
            this.$router.push({
              name: "order"
            });
          })
          .catch(err => {
            console.error("login ERROR", err);
          });
      } else {
        console.log("trader");
        this.$store
          .dispatch("retriveTraderToken", {
            account: this.account,
            password: this.password
          })
          .then(response => {
            this.$router.push({
              name: "statistic"
            });
          })
          .catch(err => {
            console.error("login ERROR", err);
          });
      }
    }
  }
};
</script>

<style scoped lang="scss">
@import "@/assets/form.scss";
</style>
