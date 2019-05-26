<template>
<div class="profile-account form__container">
    <div class="profile-account__title form__title" >
      <span>我的帳戶</span>
      <hr />
    </div>
    <form class="profile-account__detail form__detail" action="/account" method="post">
      <div class="account__detail--userid form__userid">
        <span>使用者名稱</span>
        <input type="text" name="" value="" placeholder="請輸入使用者名稱" />
      </div>
      <div class="account__detail--email form__email">
        <span>信箱</span>
        <input type="text" name="" value="" placeholder="請輸入信箱" />
      </div>
      <div class="account__detail--group form__group">
        <span>團體</span>
        <select class="group--select" name="groupName">
          <option value="好想工作室">好想工作室</option>
          <option value="Howard家">Howard家</option>
          <option value="大灣">大灣</option>
          <option value="佳音">佳音</option>
          <option value="個人">個人</option>
        </select>
      </div>
      <button type="submit" name="button">更改</button>
    </form>
</div>
</template>

<script>
export default {
  name: "Profile_account"
};
</script>
