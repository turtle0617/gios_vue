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
      <button
        class="button is-info"
        :class="{ 'is-loading': loading_status.changeCode }"
        :disabled="loading_status.changeCode"
        type="submit"
      >
        更改
      </button>
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
      new_is_empty: false,
      loading_status: {
        changeCode: false
      }
    };
  },
  methods: {
    async changeCode() {
      try {
        if (this.detectEmpty()) return;
        const profile = {
          yourpassword: this.old_password,
          password: this.new_password
        };
        this.success = false;
        this.loading_status.changeCode = true;
        await this.$store.dispatch(
          "updateMemberProfile",
          Object.assign({}, profile)
        );
        this.loading_status.changeCode = false;
        this.success = true;
        this.old_password = "";
        this.new_password = "";
      } catch (e) {
        this.loading_status.changeCode = false;
        if (e === "error password") {
          this.error = !this.error;
          this.old_password = "";
          this.new_password = "";
        }
        console.error(e);
      }
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
    },
    detectEmpty() {
      if (!this.old_password || !this.new_password) {
        if (!this.old_password) {
          this.old_is_empty = true;
          return true;
        }
        if (!this.new_password) {
          this.new_is_empty = true;
          return true;
        }
      }
      return false;
    }
  }
};
</script>
<style scoped lang="scss">
@import "@/assets/scss/form.scss";
</style>
