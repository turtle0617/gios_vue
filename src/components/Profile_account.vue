<template>
  <section class="account-detail col-sm-12 col-md-4 ">
    <form>
      <fieldset id="account__form">
        <legend>我的帳戶</legend>
        <div class="row">
          <div class="col-sm-12 col-md-12">
            <label for="account__username">使用者名稱</label>
          </div>
          <div class="col-sm-12 col-md-12">
            <input
              type="text"
              id="account__username"
              placeholder="請輸入使用者名稱"
            />
          </div>
        </div>
        <div class="row">
          <div class="col-sm-12 col-md-12">
            <label for="account__mail">信箱</label>
          </div>
          <div class="col-sm-12 col-md-12">
            <input type="text" id="account__mail" placeholder="請輸入信箱" />
          </div>
        </div>
        <div class="row">
          <div class="col-sm-12 col-md-12">
            <label for="account__group">團體</label>
          </div>
          <div class="col-sm-12 col-md-12">
            <select class="group--select" name="account__group">
              <option value="好想工作室">好想工作室</option>
              <option value="Howard家">Howard家</option>
              <option value="大灣">大灣</option>
              <option value="佳音">佳音</option>
              <option value="個人">個人</option>
            </select>
          </div>
        </div>
        <button class="primary large" type="submit">更改</button>
      </fieldset>
    </form>
  </section>
</template>

<script>
export default {
  name: "Profile_account"
};
</script>
<style scoped lang="scss">
@import "@/assets/form.scss";
</style>
