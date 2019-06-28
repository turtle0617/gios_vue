<template>
  <section class="register-detail col-sm-12 col-md-6 col-lg-4 ">
    <form @submit.prevent="register">
      <h1>註冊</h1>
      <div class="field">
        <div class="input-box control" :class="{ error: empty_error.name }">
          <input
            type="text"
            v-model.trim="member.name"
            @focus="empty_error.name = false"
            id="register__name"
            class="input"
            placeholder=" "
          />
          <span v-if="empty_error.name">不得為空</span>
          <label for="register__name">使用者名稱</label>
        </div>
      </div>
      <div class="field">
        <div class="input-box control" :class="{ error: empty_error.account }">
          <input
            type="text"
            v-model.trim="member.account"
            @focus="empty_error.account = false"
            id="register__account"
            class="input"
            placeholder=" "
          />
          <span v-if="empty_error.account">不得為空</span>
          <label for="register__account">使用者帳戶</label>
        </div>
      </div>
      <div class="field">
        <div class="input-box" :class="{ error: empty_error.password }">
          <input
            type="password"
            v-model.trim="member.password"
            @focus="empty_error.password = false"
            id="register__code"
            class="input"
            placeholder=" "
          />
          <span v-if="empty_error.password">不得為空</span>
          <label for="register__code">密碼</label>
        </div>
      </div>
      <div class="field">
        <div class="input-box control select">
          <select
            v-model="member.group_id"
            class="group--select"
            name="register__group"
          >
            <option v-for="group in groups" :value="group.id" :key="group.id">{{
              group.name
            }}</option>
          </select>
          <label for="register__group">團體</label>
        </div>
      </div>
      <button class="button is-info" type="submit">註冊</button>
      <router-link :to="{ name: 'home' }">
        登入
      </router-link>
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
