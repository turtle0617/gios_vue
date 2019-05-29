<template>
  <section class="history-admin row">
    <div class="history__date col-sm-12 col-md-6">
      <label for="historyDate">周日期</label>
      <select class="group--select" name="historyDate">
        <option value="5/27~6/2">5/27~6/2</option>
        <option value="6/3~6/9">6/3~6/9</option>
        <option value="6/10~6/16">6/10~6/16</option>
        <option value="6/17~6/23">6/17~6/23</option>
      </select>
    </div>
    <div class="history__group col-sm-12 col-md-6">
      <label for="historyDate">團體</label>
      <select>
        <option value="好想工作室">好想工作室</option>
        <option value="Howard家">Howard家</option>
        <option value="大灣">大灣</option>
        <option value="佳音">佳音</option>
        <option value="個人">個人</option>
      </select>
    </div>
    <div class="income-statistic row col-sm-12">
      <h3>收益</h3>
      <h2>9999</h2>
      <h3>元</h3>
    </div>
    <div class="person-statistic row col-sm-12">
      <div class="col-sm-12 col-md-4">
        <span>Howard</span>
        <span>1000</span>
      </div>
      <div class="col-sm-12 col-md-4">
        <span>chris</span>
        <span>1000</span>
      </div>
      <div class="col-sm-12 col-md-4">
        <span>john</span>
        <span>1000</span>
      </div>
      <div class="col-sm-12 col-md-4">
        <span>john</span>
        <span>1000</span>
      </div>
      <div class="col-sm-12 col-md-4">
        <span>john</span>
        <span>1000</span>
      </div>
      <div class="col-sm-12 col-md-4">
        <span>john</span>
        <span>1000</span>
      </div>
      <div class="col-sm-12 col-md-4">
        <span>john</span>
        <span>1000</span>
      </div>
      <div class="col-sm-12 col-md-4">
        <span>john</span>
        <span>1000</span>
      </div>
      <div class="col-sm-12 col-md-4">
        <span>john</span>
        <span>1000</span>
      </div>
      <div class="col-sm-12 col-md-4">
        <span>john</span>
        <span>1000</span>
      </div>
      <div class="col-sm-12 col-md-4">
        <span>john</span>
        <span>1000</span>
      </div>
      <div class="col-sm-12 col-md-4">
        <span>john</span>
        <span>1000</span>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "history_admin"
};
</script>

<style scoped lang="scss">
.history-admin {
  padding-top: 50px;
  text-align: center;
  max-width: 1024px;
  margin: 0 auto;
}
.income-statistic {
  justify-content: space-evenly;
  margin: 50px 0;
}
.person-statistic > div {
  border: 1px solid;
  padding: 20px 40px;
  justify-content: space-around;
  display: flex;
}
</style>
