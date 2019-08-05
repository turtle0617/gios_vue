<template>
  <section class="login-detail">
    <form @submit.prevent="login">
      <h1>店家登入</h1>
      <div v-if="error" class="field update-error">
        <span>你的帳號或密碼不正確，請稍後再試</span>
      </div>
      <div class="field">
        <div class="control">
          <label for="login__account">使用者帳戶</label>
        </div>
        <div class="">
          <input
            type="text"
            id="login__account"
            @keydown.enter.prevent
            placeholder="請輸入使用者名稱"
            class="input"
            v-model="account"
          />
        </div>
      </div>
      <div class="field">
        <div class="control">
          <label for="login__userCode">密碼</label>
        </div>
        <div class="">
          <input
            type="password"
            id="login__userCode"
            placeholder="請輸入密碼"
            class="input"
            v-model="password"
          />
        </div>
      </div>
      <button
        :class="{ 'is-loading': loading_status.login }"
        :disabled="loading_status.login"
        class="button is-info is-medium"
        type="submit"
      >
        登入
      </button>
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
      error: false,
      loading_status: {
        login: false
      }
    };
  },
  methods: {
    async login() {
      try {
        if (!this.account || !this.password) return;
        this.error = false;
        this.loading_status.login = true;
        await this.$store.dispatch("retrieveBossToken", {
          account: this.account,
          password: this.password
        });
        this.loading_status.login = false;
        this.$router.push({
          name: "statistic"
        });
      } catch (e) {
        this.loading_status.login = false;
        this.error = true;
        console.error("login ERROR", e);
      }
    }
  }
};
</script>

<style scoped lang="scss">
@import "@/assets/scss/form.scss";
</style>
