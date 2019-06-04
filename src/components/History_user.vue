<template>
  <table class="history-table hoverable">
    <caption class="history-table__title ">
      <div class="history-table__date">
        <label for="historyDate">周日期</label>
        <select class="group--select" name="historyDate">
          <option value="5/27~6/2">5/27~6/2</option>
          <option value="6/3~6/9">6/3~6/9</option>
          <option value="6/10~6/16">6/10~6/16</option>
          <option value="6/17~6/23">6/17~6/23</option>
        </select>
      </div>
    </caption>
    <thead>
      <tr>
        <th>日期</th>
        <th>名稱</th>
        <th>數量</th>
        <th>詳細資訊</th>
        <th>價格</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td data-label="日期">5/27</td>
        <td data-label="名稱">印度豬肉咖哩飯</td>
        <td data-label="數量">
          <span> 1 </span>
        </td>
        <td data-label="詳細資訊" class="history-table__remark">
          <span>1/4 飯，菜多，謝謝阿姨跟季蓉</span>
        </td>
        <td data-label="價錢" class="history-table__price">70</td>
      </tr>
      <tr>
        <td data-label="日期">5/27</td>
        <td data-label="名稱">印度豬肉咖哩飯</td>
        <td data-label="數量">
          <span> 1 </span>
        </td>
        <td data-label="詳細資訊" class="history-table__remark">
          <span>1/4 飯，菜多，謝謝阿姨跟季蓉</span>
        </td>
        <td data-label="價錢" class="history-table__price">70</td>
      </tr>
      <tr>
        <td data-label="日期">5/27</td>
        <td data-label="名稱">印度豬肉咖哩飯</td>
        <td data-label="數量">
          <span> 1 </span>
        </td>
        <td data-label="詳細資訊" class="history-table__remark">
          <span>1/4 飯，菜多，謝謝阿姨跟季蓉</span>
        </td>
        <td data-label="價錢" class="history-table__price">70</td>
      </tr>
      <tr>
        <td data-label="日期">5/27</td>
        <td data-label="名稱">印度豬肉咖哩飯</td>
        <td data-label="數量">
          <span> 1 </span>
        </td>
        <td data-label="詳細資訊" class="history-table__remark">
          <span>1/4 飯，菜多，謝謝阿姨跟季蓉</span>
        </td>
        <td data-label="價錢" class="history-table__price">70</td>
      </tr>
      <tr>
        <td data-label="日期">5/27</td>
        <td data-label="名稱">印度豬肉咖哩飯</td>
        <td data-label="數量">
          <span> 1 </span>
        </td>
        <td data-label="詳細資訊" class="history-table__remark">
          <span>1/4 飯，菜多，謝謝阿姨跟季蓉</span>
        </td>
        <td data-label="價錢" class="history-table__price">70</td>
      </tr>
      <tr>
        <td data-label="日期">5/27</td>
        <td data-label="名稱">印度豬肉咖哩飯</td>
        <td data-label="數量">
          <span> 1 </span>
        </td>
        <td data-label="詳細資訊" class="history-table__remark">
          <span>1/4 飯，菜多，謝謝阿姨跟季蓉</span>
        </td>
        <td data-label="價錢" class="history-table__price">70</td>
      </tr>
    </tbody>
    <tfoot class="history-table__checkout">
      <h2>總計： 0</h2>
    </tfoot>
  </table>
</template>

<script>
export default {
  name: "history_table"
};
</script>

<style scoped lang="scss">
.history-table {
  max-height: none;
  thead {
    z-index: 1;
  }
  &__title {
    text-align: left;
  }
  &__checkout {
    width: 100%;
    text-align: right;
    padding-right: 300px;
  }
}
</style>
