<template>
<div class="Auth-register form__container">
  <div class="Auth-register__title form__title">
    <span>註冊</span>
    <hr />
  </div>
  <form class="Auth-register__detail form__detail" action="/register" method="post">
    <div class="register__detail--userid">
      <span>使用者名稱</span>
      <input type="text" name="" value="" placeholder="請輸入使用者名稱" />
    </div>
    <div class="register__detail--email">
      <span>信箱</span>
      <input type="text" name="" value="" placeholder="請輸入信箱" />
    </div>
    <div class="register__detail--code">
      <span>密碼</span>
      <input type="password" name="" value="" placeholder="請輸入密碼" />
    </div>
    <div class="register__detail--group">
      <span>團體</span>
      <select class="group--select" name="groupName">
        <option value="好想工作室">好想工作室</option>
        <option value="Howard家">Howard家</option>
        <option value="大灣">大灣</option>
        <option value="佳音">佳音</option>
        <option value="個人">個人</option>
      </select>
    </div>
    <button type="submit" name="button">註冊</button>
    <a href="/login">
      <span>登入</span>
    </a>
  </form>
</div>
</template>

<script>
export default {
  name: "Auth_register"
};
</script>
