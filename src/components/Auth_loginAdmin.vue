<template>
  <section class="login-detail col-sm-12 col-md-6 col-lg-4 ">
    <form @submit.prevent="login">
      <fieldset id="login__form">
        <legend>店家登入</legend>
        <div v-if="error" class="row errorMessage">
          <span>你的帳號或密碼不正確，請稍後再試</span>
        </div>
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
        <button class="primary large" type="submit">登入</button>
      </fieldset>
    </form>
  </section>
</template>

<script>
export default {
  name: "Auth_loginAdmin",
  data() {
    return {
      account: "",
      password: "",
      error: false
    };
  },
  methods: {
    login() {
      this.$store
        .dispatch("retrieveBossToken", {
          account: this.account,
          password: this.password
        })
        .then(() => {
          this.$router.push({
            name: "statistic"
          });
        })
        .catch(err => {
          this.error = true;
          console.error("login ERROR", err);
        });
    }
  }
};
</script>

<style scoped lang="scss">
@import "@/assets/scss/form.scss";
</style>
