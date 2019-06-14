<template>
  <section class="login-detail col-sm-12 col-md-6 col-lg-4 ">
    <form @submit.prevent="login">
      <fieldset id="login__form">
        <legend>登入</legend>
        <div class="row">
          <div class="col-sm-12 col-md-12 input-box">
            <input
              type="text"
              id="login__account"
              placeholder=" "
              v-model="account"
            />
            <label for="login__account">使用者帳戶</label>
          </div>
        </div>
        <div class="row">
          <div class="col-sm-12 col-md-12 input-box">
            <input
              type="password"
              id="login__userCode"
              placeholder=" "
              v-model="password"
            />
            <label for="login__userCode">密碼</label>
          </div>
        </div>
        <button class="primary large" type="submit">登入</button>
        <a href="/register">
          註冊
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
      account: this.$route.params.account || "",
      password: ""
    };
  },
  methods: {
    login() {
      this.$store
        .dispatch("retrieveMemberToken", {
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
    }
  }
};
</script>

<style scoped lang="scss">
@import "@/assets/form.scss";
</style>
