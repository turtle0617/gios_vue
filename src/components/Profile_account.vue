<template>
  <section class="account-detail section">
    <form @submit.prevent="changeProfile">
      <h1>我的帳戶</h1>
      <div v-if="success" class="field update-success">
        <div class="control">
          <label>
            成功儲存變更
          </label>
        </div>
      </div>
      <div v-if="error" class="field update-error">
        <div class="control">
          <label>
            密碼錯誤
          </label>
        </div>
      </div>
      <div class="field name">
        <div class="control input-box">
          <input
            class="input"
            v-model="member_profile.name"
            type="text"
            id="account__name"
            @focus="hideSuccesMessage"
            placeholder=" "
          />
          <label for="account__name">使用者名稱</label>
        </div>
      </div>
      <div class="field account">
        <div class="control input-box">
          <input
            class="input"
            v-model="member_profile.account"
            type="text"
            id="account__account"
            @focus="hideSuccesMessage"
            placeholder=" "
          />
          <label for="account__account">使用者帳戶</label>
        </div>
      </div>
      <div class="field group">
        <div class="control input-box select">
          <select
            v-model="member_profile.group_id"
            class="group--select"
            @focus="hideSuccesMessage"
            name="account__group"
          >
            <option v-for="group in groups" :value="group.id" :key="group.id">{{
              group.name
            }}</option>
          </select>
          <label for="account__group">團體</label>
        </div>
      </div>
      <div class="field rice">
        <div class="control input-box select">
          <select
            v-model="member_profile.rice"
            class="group--select"
            @focus="hideSuccesMessage"
            name="account__group"
          >
            <option value="7">多飯</option>
            <option value="1">正常</option>
            <option value="2">1/2飯</option>
            <option value="3">1/3飯</option>
            <option value="4">2/3飯</option>
            <option value="5">1/4飯</option>
            <option value="6">不飯</option>
          </select>
          <label for="account__name">飯量</label>
        </div>
      </div>
      <div class="field vegetable">
        <div class="control input-box select">
          <select
            v-model="member_profile.vegetable"
            class="group--select"
            @focus="hideSuccesMessage"
            name="account__group"
          >
            <option value="2">多菜</option>
            <option value="1">正常</option>
            <option value="3">少菜</option>
            <option value="4">不菜</option>
          </select>
          <label for="account__vegetable">菜量</label>
        </div>
      </div>
      <div class="field remark">
        <div class="control input-box">
          <input
            class="input"
            v-model="member_profile.note"
            type="text"
            id="account__Remark"
            @focus="hideSuccesMessage"
            placeholder=" "
          />
          <label for="account__Remark">備註</label>
        </div>
      </div>
      <div class="field code">
        <div class="control input-box">
          <input
            class="input"
            v-bind:class="{ empty: isEmpty }"
            type="password"
            placeholder=" "
            v-model="member_password"
            @blur="checkPassword"
            @focus="hideAllMessage"
          />
          <label for="account__code">
            密碼
            <span>*</span>
            <span v-if="isEmpty">密碼為必填</span>
          </label>
        </div>
      </div>
      <button class="button is-info" type="submit">儲存變更</button>
    </form>
  </section>
</template>

<script>
export default {
  name: "Profile_account",
  data() {
    return {
      member_profile: null,
      original_profile: null,
      member_password: "",
      isEmpty: false,
      success: false,
      error: false
    };
  },
  created() {
    this.$store.dispatch("retrieveGroups");
    this.member_profile = Object.assign({}, this.$store.getters.member_profile);
    this.original_profile = Object.assign(
      {},
      this.$store.getters.member_profile
    );
  },
  computed: {
    groups() {
      return this.$store.getters.groups;
    }
  },
  methods: {
    changeProfile() {
      if (!this.member_password) {
        this.isEmpty = true;
        return;
      }
      const profile = this.filterDifferentData(
        this.original_profile,
        this.member_profile
      );
      if (!Object.keys(profile).length) return;
      profile["yourpassword"] = this.member_password;
      this.$store
        .dispatch("updateMemberProfile", Object.assign({}, profile))
        .then(res => {
          this.success = !this.success;
        })
        .catch(err => {
          if (err === "error password") {
            this.error = !this.error;
          }
          throw new Error(err);
        });
    },
    hideSuccesMessage() {
      this.success = false;
    },
    hideAllMessage() {
      this.success = false;
      this.isEmpty = false;
      this.error = false;
    },
    checkPassword() {
      if (!this.member_password) {
        this.isEmpty = true;
        return;
      }
      this.isEmpty = false;
    },
    filterDifferentData(original, comparison) {
      return Object.keys(original).reduce((acc, curr) => {
        if (original[curr] !== comparison[curr]) {
          acc[curr] = comparison[curr];
          return acc;
        }
        return acc;
      }, {});
    }
  }
};
</script>
<style scoped lang="scss">
@import "@/assets/scss/form.scss";
span {
  color: red;
}
.section {
  padding-top: 1rem;
}
</style>
