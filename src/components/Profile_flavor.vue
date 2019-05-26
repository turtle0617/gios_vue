<template>
<div class="profile-code form__container">
  <div class="profile-code__title form__title">
    <span>密碼</span>
    <hr />
  </div>
  <form class="profile-code__detail form__detail" action="/code" method="post">
    <div class="code__detail--code">
      <span>舊密碼</span>
      <input type="password" name="" value="" placeholder="請輸入密碼" />
    </div>
    <div class="code__detail--new-code">
      <span>新密碼</span>
      <input type="password" name="" value="" placeholder="請輸入新密碼" />
    </div>
    <button type="submit" name="button">更改</button>
  </form>
</div>
</template>

<script>
export default {
  name: "Profile_code"
};
</script>
