<template>
<div class="Auth-login form__container">
  <div class="Auth-login__title form__title">
    <span>登入</span>
    <hr />
  </div>
  <form class="Auth-login__detail form__detail" action="/login" method="post">
    <div class="login__detail--email">
      <span>信箱</span>
      <input type="text" name="" value="" placeholder="請輸入信箱" />
    </div>
    <div class="login__detail--code">
      <span>密碼</span>
      <input type="password" name="" value="" placeholder="請輸入密碼" />
    </div>
    <button type="submit" name="button">登入</button>
    <a href="/register">
      <span>註冊</span>
    </a>
  </form>
</div>
</template>

<script>
export default {
  name: "Auth_login"
};
</script>
