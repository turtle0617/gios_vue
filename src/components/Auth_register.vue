<template>
  <section class="register-detail col-sm-12 col-md-6 col-lg-4 ">
    <form @submit.prevent="register">
      <fieldset id="register__form">
        <legend>註冊</legend>
        <div class="row">
          <div class="col-sm-12 col-md-12 input-box">
            <input
              type="text"
              :class="{ error: empty_error.name }"
              v-model.trim="member.name"
              id="register__name"
              placeholder=" "
            />
            <span v-if="empty_error.name">不得為空</span>
            <label for="register__name">使用者名稱</label>
          </div>
        </div>
        <div class="row">
          <div class="col-sm-12 col-md-12 input-box">
            <input
              type="text"
              :class="{ error: empty_error.account }"
              v-model.trim="member.account"
              id="register__account"
              placeholder=" "
            />
            <span v-if="empty_error.account">不得為空</span>
            <label for="register__account">使用者帳戶</label>
          </div>
        </div>
        <div class="row">
          <div class="col-sm-12 col-md-12 input-box">
            <input
              type="password"
              :class="{ error: empty_error.password }"
              v-model.trim="member.password"
              id="register__code"
              placeholder=" "
            />
            <span v-if="empty_error.password">不得為空</span>
            <label for="register__code">密碼</label>
          </div>
        </div>
        <div class="row">
          <div class="col-sm-12 col-md-12 input-box">
            <select
              v-model="member.group_id"
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
            <label for="register__group">團體</label>
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
      member: {
        name: "",
        account: "",
        password: "",
        group_id: null
      },
      empty_error: {
        name: false,
        account: false,
        password: false
      }
    };
  },
  created() {
    this.$store.dispatch("retrieveGroups").then(res => {
      if (!res) return;
      this.member.group_id = res[0].id;
    });
  },
  computed: {
    groups() {
      return this.$store.getters.groups;
    }
  },
  methods: {
    register() {
      const is_empty = this.detectEmpty();
      console.log(is_empty);
      if (is_empty) return;
      this.$store
        .dispatch("register", this.member)
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
    },
    detectEmpty() {
      const detected = {
        name: this.member.name,
        account: this.member.account,
        password: this.member.password
      };
      if (!detected.name) this.empty_error.name = true;
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
