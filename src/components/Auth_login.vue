<template>
  <section class="login-detail col-sm-12 col-md-4 ">
    <form @submit.prevent="login">
      <fieldset id="login__form">
        <legend>登入</legend>
        <div class="row">
          <div class="col-sm-12 col-md-12">
            <label for="login__userAccount">使用者帳戶</label>
          </div>
          <div class="col-sm-12 col-md-12">
            <input
              type="text"
              id="login__userAccount"
              placeholder="請輸入使用者名稱"
              v-model="useraccount"
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
        <a href="/login">
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
      useraccount: "",
      password: ""
    };
  },
  methods: {
    login() {
      this.$store
        .dispatch("retriveToken", {
          useraccount: this.useraccount,
          password: this.password
        })
        .then(response => {
          console.log(response);
          this.$router.push({
            name: "order"
          });
        });
    }
  }
};
</script>

<style scoped lang="scss">
@import "@/assets/form.scss";
</style>
