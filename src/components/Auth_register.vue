<template>
  <section class="register-detail col-sm-12 col-md-6 col-lg-4 ">
    <form @submit.prevent="register">
      <fieldset id="register__form">
        <legend>註冊</legend>
        <div class="row">
          <div class="col-sm-12 col-md-12">
            <label for="register__name">使用者名稱</label>
          </div>
          <div class="col-sm-12 col-md-12">
            <input
              type="text"
              v-model="name"
              id="register__name"
              placeholder="請輸入使用者名稱"
            />
          </div>
        </div>
        <div class="row">
          <div class="col-sm-12 col-md-12">
            <label for="register__account">使用者帳戶</label>
          </div>
          <div class="col-sm-12 col-md-12">
            <input
              type="text"
              v-model="account"
              id="register__account"
              placeholder="請輸入使用者帳戶"
            />
          </div>
        </div>
        <div class="row">
          <div class="col-sm-12 col-md-12">
            <label for="register__code">密碼</label>
          </div>
          <div class="col-sm-12 col-md-12">
            <input
              type="password"
              v-model="password"
              id="register__code"
              placeholder="請輸入密碼"
            />
          </div>
        </div>
        <div class="row">
          <div class="col-sm-12 col-md-12">
            <label for="register__group">團體</label>
          </div>
          <div class="col-sm-12 col-md-12">
            <select
              v-model="group_id"
              class="group--select"
              name="register__group"
            >
              <option value="1">好想工作室</option>
              <option value="2">Howard家</option>
              <option value="3">大灣</option>
              <option value="4">佳音</option>
              <option value="5">個人</option>
            </select>
          </div>
        </div>

        <button class="primary large" type="submit">註冊</button>
        <a href="/">
          <span>登入</span>
        </a>
      </fieldset>
    </form>
  </section>
</template>

<script>
export default {
  name: "Auth_register",
  data() {
    return {
      name: "",
      account: "",
      password: "",
      group_id: ""
    };
  },
  methods: {
    register() {
      this.$store
        .dispatch("register", {
          name: this.name,
          account: this.account,
          password: this.password,
          group_id: this.group_id,
          rice: "1",
          vegetable: "1",
          note: ""
        })
        .then(res => {
          this.$router.push({
            name: "home"
          });
        })
        .catch(err => {
          console.error("register ERROR", err);
        });
    }
  }
};
</script>

<style scoped lang="scss">
@import "@/assets/form.scss";
</style>
