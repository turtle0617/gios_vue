<template>
  <section class="code-detail section ">
    <form @submit.prevent="changeCode">
      <h1>更改密碼</h1>
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
            所輸入的舊密碼與已保存的密碼不符
          </label>
        </div>
      </div>
      <div class="field">
        <div class="control input-box">
          <input
            class="input"
            @focus="hideMessage"
            placeholder=" "
            type="password"
            id="account__code"
            v-model="old_password"
            :class="{ empty: old_is_empty }"
          />
          <label for="account__code">現有密碼</label>
          <span v-if="old_is_empty">請輸入密碼</span>
        </div>
      </div>
      <div class="field">
        <div class="control input-box">
          <input
            class="input"
            @focus="hideMessage"
            placeholder=" "
            type="password"
            id="account__code-check"
            v-model="new_password"
            :class="{ empty: new_is_empty }"
          />
          <label for="account__code-check">新密碼</label>
          <span v-if="new_is_empty">請輸入新密碼</span>
        </div>
      </div>
      <button class="button is-info" type="submit">更改</button>
    </form>
  </section>
</template>

<script>
export default {
  name: "Profile_code",
  data() {
    return {
      old_password: "",
      new_password: "",
      success: false,
      error: false,
      old_is_empty: false,
      new_is_empty: false
    };
  },
  methods: {
    changeCode() {
      if (!this.old_password || !this.new_password) {
        if (!this.old_password) {
          this.old_is_empty = true;
        }
        if (!this.new_password) {
          this.new_is_empty = true;
        }
        return;
      }
      const profile = {
        yourpassword: this.old_password,
        password: this.new_password
      };
      this.$store
        .dispatch("updateMemberProfile", Object.assign({}, profile))
        .then(res => {
          this.success = !this.success;
          this.old_password = "";
          this.new_password = "";
        })
        .catch(err => {
          if (err === "error password") {
            this.error = !this.error;
            this.old_password = "";
            this.new_password = "";
          }
          throw new Error(err);
        });
    },
    hideMessage() {
      this.success = false;
      this.error = false;
      if (this.old_is_empty) {
        this.old_is_empty = false;
      }
      if (this.new_is_empty) {
        this.new_is_empty = false;
      }
    }
  }
};
</script>
<style scoped lang="scss">
@import "@/assets/scss/form.scss";
</style>
