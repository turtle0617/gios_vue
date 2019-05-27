<template>
  <section class="code-detail col-sm-12 col-md-4 ">
    <form>
      <fieldset id="account__form">
        <legend>更改密碼</legend>
        <div class="row">
          <div class="col-sm-12 col-md-12">
            <label for="account__code">舊密碼</label>
          </div>
          <div class="col-sm-12 col-md-12">
            <input
              type="password"
              id="account__code"
              placeholder="請輸入舊密碼"
            />
          </div>
        </div>
        <div class="row">
          <div class="col-sm-12 col-md-12">
            <label for="account__code-check">新密碼</label>
          </div>
          <div class="col-sm-12 col-md-12">
            <input
              type="password"
              id="account__code-check"
              placeholder="請輸入新密碼"
            />
          </div>
        </div>
        <button class="primary large" type="submit">更改</button>
      </fieldset>
    </form>
  </section>
</template>

<script>
export default {
  name: "Profile_code"
};
</script>
<style scoped lang="scss">
@import "@/assets/form.scss";
</style>
