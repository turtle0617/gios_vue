<template>
  <section class="register-detail col-sm-12 col-md-4 ">
    <form action="/profile" method="post">
      <fieldset id="register__form">
        <legend>註冊</legend>
        <div class="row">
          <div class="col-sm-12 col-md-12">
            <label for="register__username">使用者名稱</label>
          </div>
          <div class="col-sm-12 col-md-12">
            <input
              type="text"
              id="register__username"
              placeholder="請輸入使用者名稱"
            />
          </div>
        </div>
        <div class="row">
          <div class="col-sm-12 col-md-12">
            <label for="register__mail">信箱</label>
          </div>
          <div class="col-sm-12 col-md-12">
            <input type="text" id="register__mail" placeholder="請輸入信箱" />
          </div>
        </div>
        <div class="row">
          <div class="col-sm-12 col-md-12">
            <label for="register__code">密碼</label>
          </div>
          <div class="col-sm-12 col-md-12">
            <input
              type="password"
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
            <select class="group--select" name="register__group">
              <option value="好想工作室">好想工作室</option>
              <option value="Howard家">Howard家</option>
              <option value="大灣">大灣</option>
              <option value="佳音">佳音</option>
              <option value="個人">個人</option>
            </select>
          </div>
        </div>

        <button class="primary large" type="submit">註冊</button>
        <a href="/login">
          <span>登入</span>
        </a>
      </fieldset>
    </form>
  </section>
</template>

<script>
export default {
  name: "Auth_register"
};
</script>

<style scoped lang="scss">
@import "@/assets/form.scss";
</style>
