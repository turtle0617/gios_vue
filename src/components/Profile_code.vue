<template>
<section class="code-detail col-sm-12 col-md-6 col-lg-4 ">
  <form @submit.prevent="changeCode">
    <fieldset id="changecode__form">
      <legend>更改密碼</legend>
      <div v-if="success" class="row update-success">
        <div class="col-sm-12 col-md-12">
          <label>
            成功儲存變更
          </label>
        </div>
      </div>
      <div v-if="error" class="row update-success">
        <div class="col-sm-12 col-md-12">
          <label>
            所輸入的舊密碼與已保存的密碼不符
          </label>
        </div>
      </div>
      <div class="row">
        <div class="col-sm-12 col-md-12 input-box">
          <input type="password" id="account__code" v-model="old_password" :class="{empty:old_is_empty}" />
          <label for="account__code">現有密碼</label>
          <!-- <span>請輸入密碼</span> -->
        </div>
      </div>
      <div class="row">
        <div class="col-sm-12 col-md-12 input-box">
          <input type="password" id="account__code-check" v-model="new_password" :class="{empty:new_is_empty}" />
          <label for="account__code-check">新密碼</label>
          <!-- <span>請輸入新密碼</span> -->
        </div>
      </div>
      <button class="primary large" type="submit">更改</button>
    </fieldset>
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
    }
  },
  methods: {
    changeCode() {
      if (!this.old_password || !this.new_password) {
        this.is_empty = true;
      }

    }
  }
};
</script>
<style scoped lang="scss">
@import "@/assets/form.scss";

</style>
