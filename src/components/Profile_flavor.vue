<template>
  <section class="flavor-detail col-sm-12 col-md-6 col-lg-4 ">
    <form>
      <fieldset id="account__form">
        <legend>常用口味</legend>
        <div class="field">
          <div class="control">
            <label for="account__name">飯量</label>
          </div>
          <div class="control select">
            <select class=" group--select" name="account__group">
              <option value="多飯">多飯</option>
              <option value="正常">正常</option>
              <option value="1/2飯">1/2飯</option>
              <option value="1/3飯">1/3飯</option>
              <option value="2/3飯">2/3飯</option>
              <option value="1/4飯">1/4飯</option>
              <option value="不飯">不飯</option>
            </select>
          </div>
        </div>
        <div class="field">
          <div class="control">
            <label for="account__mail">菜量</label>
          </div>
          <div class="control">
            <select class="group--select" name="account__group">
              <option value="多菜">多菜</option>
              <option value="正常">正常</option>
              <option value="少菜">少菜</option>
              <option value="不菜">不菜</option>
            </select>
          </div>
        </div>
        <div class="field">
          <div class="control">
            <label for="account__Remark">備註</label>
          </div>
          <div class="control">
            <input type="text" id="account__Remark" placeholder="請輸入備註" />
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
@import "@/assets/scss/form.scss";
</style>
