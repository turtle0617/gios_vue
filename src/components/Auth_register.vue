<template>
  <section class="register-detail col-sm-12 col-md-6 col-lg-4 ">
    <form @submit.prevent="register">
      <fieldset id="register__form">
        <legend>註冊</legend>
        <div v-if="error" class="row">
          <span>請填寫完整</span>
        </div>
        <div class="row">
          <div class="col-sm-12 col-md-12">
            <label for="register__name">使用者名稱</label>
          </div>
          <div class="col-sm-12 col-md-12">
            <input
              type="text"
              v-bind:class="{ error: error }"
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
              <option
                v-for="group in groups"
                :value="group.id"
                :key="group.id"
                >{{ group.name }}</option
              >
            </select>
          </div>
        </div>

        <button class="primary large" type="submit">註冊</button>
        <a href="/">登入</a>
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
      group_id: "1",
      error: false
    };
  },
  created() {
    this.$store.dispatch("retrieveGroups");
  },
  computed: {
    groups() {
      return this.$store.state.groups;
    }
  },
  methods: {
    register() {
      if (!this.name || !this.account || !this.password) {
        this.error = true;
        return;
      }
      this.$store
        .dispatch("register", {
          name: this.name,
          account: this.account,
          password: this.password,
          group_id: this.group_id
        })
        .then(res => {
          this.$router.push({
            name: "home",
            params: {
              account: res.account
            }
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
