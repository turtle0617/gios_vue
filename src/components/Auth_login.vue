<template>
  <section class="login-detail section">
    <form @submit.prevent="login">
      <h1 class="form__title">登入</h1>
      <div v-if="error" class="field update-error">
        <div class="">
          <label>
            帳號或密碼不符
          </label>
        </div>
      </div>
      <div class="field user-account">
        <div class="input-box control" :class="{ error: empty_error.account }">
          <input
            type="text"
            class=" input"
            id="login__account"
            placeholder=" "
            @focus="empty_error.account = false"
            v-model="account"
          />
          <span v-if="empty_error.account">不得為空</span>
          <label for="login__account">使用者帳戶</label>
        </div>
      </div>
      <div class="field user-password">
        <div class="input-box control" :class="{ error: empty_error.password }">
          <input
            type="password"
            id="login__userCode"
            placeholder=" "
            @focus="empty_error.password = false"
            v-model="password"
          />
          <span v-if="empty_error.password">不得為空</span>
          <label for="login__userCode">密碼</label>
        </div>
      </div>
      <button class="button is-info" type="submit">登入</button>
      <router-link :to="{ name: 'register' }">
        註冊
      </router-link>
    </form>
  </section>
</template>

<script>
export default {
  name: "Auth_login",
  data() {
    return {
      account: this.$route.params.account || "",
      password: "",
      empty_error: {
        account: false,
        password: false
      },
      error: false
    };
  },
  methods: {
    login() {
      const is_empty = this.detectEmpty();
      if (is_empty) return;
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
          this.error = !this.error;
          console.error("login ERROR", err);
        });
    },
    detectEmpty() {
      const detected = {
        account: this.account,
        password: this.password
      };
      if (!detected.account) this.empty_error.account = true;
      if (!detected.password) this.empty_error.password = true;
      return Object.entries(detected).some(item => !item[1]);
    }
  }
};
</script>

<style scoped lang="scss">
@import "@/assets/scss/form.scss";
</style>
