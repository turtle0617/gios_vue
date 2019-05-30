<template>
  <table class="order-table hoverable">
    <caption class="order-table__title ">
      <div class="order-table__date">
        <label for="orderDate">日期</label>
        <select class="group--select" name="orderDate">
          <option value="6/1">6/1</option>
          <option value="6/2">6/2</option>
          <option value="6/3">6/3</option>
          <option value="6/4">6/4</option>
          <option value="6/5">6/5</option>
          <option value="6/6">6/6</option>
          <option value="6/7">6/7</option>
        </select>
      </div>
      <div class="order-table__deadline">
        <h2>收單時間 ： 16:00</h2>
      </div>
    </caption>
    <thead>
      <tr>
        <th class="order-table__flavor">常用</th>
        <th>名稱</th>
        <th class="order-table__price">價格</th>
        <th>數量</th>
        <th>飯量</th>
        <th>菜量</th>
        <th>口味</th>
        <th class="order-table__remark">備註</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td data-label="常用" class="order-table__flavor">
          <input
            type="checkbox"
            autocomplete="off"
            id="sf1-check"
            class="order-table__flavor--check"
          />
        </td>
        <td data-label="名稱">印度豬肉咖哩飯</td>
        <td data-label="價格" class="order-table__price">70</td>
        <td data-label="數量">
          <font-awesome-icon icon="minus-circle" size="lg"></font-awesome-icon>
          <label for="quantity">0</label>
          <font-awesome-icon icon="plus-circle" size="lg"></font-awesome-icon>
        </td>
        <td data-label="飯量">
          <select class="rice--select" name="rice__group">
            <option value="多飯">多飯</option>
            <option value="正常">正常</option>
            <option value="1/2飯">1/2飯</option>
            <option value="1/3飯">1/3飯</option>
            <option value="2/3飯">2/3飯</option>
            <option value="1/4飯">1/4飯</option>
            <option value="不飯">不飯</option>
          </select>
        </td>
        <td data-label="菜量">
          <select class="vegetable--select" name="vegetable__group">
            <option value="多菜">多菜</option>
            <option value="正常">正常</option>
            <option value="少菜">少菜</option>
            <option value="不菜">不菜</option>
          </select>
        </td>
        <td data-label="口味">
          <select class="flavor--select" name="flavor__group"> </select>
        </td>
        <td data-label="備註" class="order-table__remark">
          <input type="text" id="remarkText" placeholder="" />
        </td>
      </tr>
      <tr>
        <td data-label="常用" class="order-table__flavor">
          <input
            type="checkbox"
            autocomplete="off"
            id="sf1-check"
            class="order-table__flavor--check"
          />
        </td>
        <td data-label="名稱">印度豬肉咖哩飯</td>
        <td data-label="價格" class="order-table__price">70</td>
        <td data-label="數量">
          <font-awesome-icon icon="minus-circle" size="lg"></font-awesome-icon>
          <label for="quantity">0</label>
          <font-awesome-icon icon="plus-circle" size="lg"></font-awesome-icon>
        </td>
        <td data-label="飯量">
          <select class="rice--select" name="rice__group">
            <option value="多飯">多飯</option>
            <option value="正常">正常</option>
            <option value="1/2飯">1/2飯</option>
            <option value="1/3飯">1/3飯</option>
            <option value="2/3飯">2/3飯</option>
            <option value="1/4飯">1/4飯</option>
            <option value="不飯">不飯</option>
          </select>
        </td>
        <td data-label="菜量">
          <select class="vegetable--select" name="vegetable__group">
            <option value="多菜">多菜</option>
            <option value="正常">正常</option>
            <option value="少菜">少菜</option>
            <option value="不菜">不菜</option>
          </select>
        </td>
        <td data-label="口味">
          <select class="flavor--select" name="flavor__group"> </select>
        </td>
        <td data-label="備註" class="order-table__remark">
          <input type="text" id="remarkText" placeholder="" />
        </td>
      </tr>
      <tr>
        <td data-label="常用" class="order-table__flavor">
          <input
            type="checkbox"
            autocomplete="off"
            id="sf1-check"
            class="order-table__flavor--check"
          />
        </td>
        <td data-label="名稱">印度豬肉咖哩飯</td>
        <td data-label="價格" class="order-table__price">70</td>
        <td data-label="數量">
          <font-awesome-icon icon="minus-circle" size="lg"></font-awesome-icon>
          <label for="quantity">0</label>
          <font-awesome-icon icon="plus-circle" size="lg"></font-awesome-icon>
        </td>
        <td data-label="飯量">
          <select class="rice--select" name="rice__group">
            <option value="多飯">多飯</option>
            <option value="正常">正常</option>
            <option value="1/2飯">1/2飯</option>
            <option value="1/3飯">1/3飯</option>
            <option value="2/3飯">2/3飯</option>
            <option value="1/4飯">1/4飯</option>
            <option value="不飯">不飯</option>
          </select>
        </td>
        <td data-label="菜量">
          <select class="vegetable--select" name="vegetable__group">
            <option value="多菜">多菜</option>
            <option value="正常">正常</option>
            <option value="少菜">少菜</option>
            <option value="不菜">不菜</option>
          </select>
        </td>
        <td data-label="口味">
          <select class="flavor--select" name="flavor__group"> </select>
        </td>
        <td data-label="備註" class="order-table__remark">
          <input type="text" id="remarkText" placeholder="" />
        </td>
      </tr>
      <tr>
        <td data-label="常用" class="order-table__flavor">
          <input
            type="checkbox"
            autocomplete="off"
            id="sf1-check"
            class="order-table__flavor--check"
          />
        </td>
        <td data-label="名稱">印度豬肉咖哩飯</td>
        <td data-label="價格" class="order-table__price">70</td>
        <td data-label="數量">
          <font-awesome-icon icon="minus-circle" size="lg"></font-awesome-icon>
          <label for="quantity">0</label>
          <font-awesome-icon icon="plus-circle" size="lg"></font-awesome-icon>
        </td>
        <td data-label="飯量">
          <select class="rice--select" name="rice__group">
            <option value="多飯">多飯</option>
            <option value="正常">正常</option>
            <option value="1/2飯">1/2飯</option>
            <option value="1/3飯">1/3飯</option>
            <option value="2/3飯">2/3飯</option>
            <option value="1/4飯">1/4飯</option>
            <option value="不飯">不飯</option>
          </select>
        </td>
        <td data-label="菜量">
          <select class="vegetable--select" name="vegetable__group">
            <option value="多菜">多菜</option>
            <option value="正常">正常</option>
            <option value="少菜">少菜</option>
            <option value="不菜">不菜</option>
          </select>
        </td>
        <td data-label="口味">
          <select class="flavor--select" name="flavor__group"> </select>
        </td>
        <td data-label="備註" class="order-table__remark">
          <input type="text" id="remarkText" placeholder="" />
        </td>
      </tr>
      <tr>
        <td data-label="常用" class="order-table__flavor">
          <input
            type="checkbox"
            autocomplete="off"
            id="sf1-check"
            class="order-table__flavor--check"
          />
        </td>
        <td data-label="名稱">印度豬肉咖哩飯</td>
        <td data-label="價格" class="order-table__price">70</td>
        <td data-label="數量">
          <font-awesome-icon icon="minus-circle" size="lg"></font-awesome-icon>
          <label for="quantity">0</label>
          <font-awesome-icon icon="plus-circle" size="lg"></font-awesome-icon>
        </td>
        <td data-label="飯量">
          <select class="rice--select" name="rice__group">
            <option value="多飯">多飯</option>
            <option value="正常">正常</option>
            <option value="1/2飯">1/2飯</option>
            <option value="1/3飯">1/3飯</option>
            <option value="2/3飯">2/3飯</option>
            <option value="1/4飯">1/4飯</option>
            <option value="不飯">不飯</option>
          </select>
        </td>
        <td data-label="菜量">
          <select class="vegetable--select" name="vegetable__group">
            <option value="多菜">多菜</option>
            <option value="正常">正常</option>
            <option value="少菜">少菜</option>
            <option value="不菜">不菜</option>
          </select>
        </td>
        <td data-label="口味">
          <select class="flavor--select" name="flavor__group"> </select>
        </td>
        <td data-label="備註" class="order-table__remark">
          <input type="text" id="remarkText" placeholder="" />
        </td>
      </tr>
      <tr>
        <td data-label="常用" class="order-table__flavor">
          <input
            type="checkbox"
            autocomplete="off"
            id="sf1-check"
            class="order-table__flavor--check"
          />
        </td>
        <td data-label="名稱">印度豬肉咖哩飯</td>
        <td data-label="價格" class="order-table__price">70</td>
        <td data-label="數量">
          <font-awesome-icon icon="minus-circle" size="lg"></font-awesome-icon>
          <label for="quantity">0</label>
          <font-awesome-icon icon="plus-circle" size="lg"></font-awesome-icon>
        </td>
        <td data-label="飯量">
          <select class="rice--select" name="rice__group">
            <option value="多飯">多飯</option>
            <option value="正常">正常</option>
            <option value="1/2飯">1/2飯</option>
            <option value="1/3飯">1/3飯</option>
            <option value="2/3飯">2/3飯</option>
            <option value="1/4飯">1/4飯</option>
            <option value="不飯">不飯</option>
          </select>
        </td>
        <td data-label="菜量">
          <select class="vegetable--select" name="vegetable__group">
            <option value="多菜">多菜</option>
            <option value="正常">正常</option>
            <option value="少菜">少菜</option>
            <option value="不菜">不菜</option>
          </select>
        </td>
        <td data-label="口味">
          <select class="flavor--select" name="flavor__group"> </select>
        </td>
        <td data-label="備註" class="order-table__remark">
          <input type="text" id="remarkText" placeholder="" />
        </td>
      </tr>
      <tr>
        <td data-label="常用" class="order-table__flavor">
          <input
            type="checkbox"
            autocomplete="off"
            id="sf1-check"
            class="order-table__flavor--check"
          />
        </td>
        <td data-label="名稱">印度豬肉咖哩飯</td>
        <td data-label="價格" class="order-table__price">70</td>
        <td data-label="數量">
          <font-awesome-icon icon="minus-circle" size="lg"></font-awesome-icon>
          <label for="quantity">0</label>
          <font-awesome-icon icon="plus-circle" size="lg"></font-awesome-icon>
        </td>
        <td data-label="飯量">
          <select class="rice--select" name="rice__group">
            <option value="多飯">多飯</option>
            <option value="正常">正常</option>
            <option value="1/2飯">1/2飯</option>
            <option value="1/3飯">1/3飯</option>
            <option value="2/3飯">2/3飯</option>
            <option value="1/4飯">1/4飯</option>
            <option value="不飯">不飯</option>
          </select>
        </td>
        <td data-label="菜量">
          <select class="vegetable--select" name="vegetable__group">
            <option value="多菜">多菜</option>
            <option value="正常">正常</option>
            <option value="少菜">少菜</option>
            <option value="不菜">不菜</option>
          </select>
        </td>
        <td data-label="口味">
          <select class="flavor--select" name="flavor__group"> </select>
        </td>
        <td data-label="備註" class="order-table__remark">
          <input type="text" id="remarkText" placeholder="" />
        </td>
      </tr>
      <tr>
        <td data-label="常用" class="order-table__flavor">
          <input
            type="checkbox"
            autocomplete="off"
            id="sf1-check"
            class="order-table__flavor--check"
          />
        </td>
        <td data-label="名稱">印度豬肉咖哩飯</td>
        <td data-label="價格" class="order-table__price">70</td>
        <td data-label="數量">
          <font-awesome-icon icon="minus-circle" size="lg"></font-awesome-icon>
          <label for="quantity">0</label>
          <font-awesome-icon icon="plus-circle" size="lg"></font-awesome-icon>
        </td>
        <td data-label="飯量">
          <select class="rice--select" name="rice__group">
            <option value="多飯">多飯</option>
            <option value="正常">正常</option>
            <option value="1/2飯">1/2飯</option>
            <option value="1/3飯">1/3飯</option>
            <option value="2/3飯">2/3飯</option>
            <option value="1/4飯">1/4飯</option>
            <option value="不飯">不飯</option>
          </select>
        </td>
        <td data-label="菜量">
          <select class="vegetable--select" name="vegetable__group">
            <option value="多菜">多菜</option>
            <option value="正常">正常</option>
            <option value="少菜">少菜</option>
            <option value="不菜">不菜</option>
          </select>
        </td>
        <td data-label="口味">
          <select class="flavor--select" name="flavor__group"> </select>
        </td>
        <td data-label="備註" class="order-table__remark">
          <input type="text" id="remarkText" placeholder="" />
        </td>
      </tr>
      <tr>
        <td data-label="常用" class="order-table__flavor">
          <input
            type="checkbox"
            autocomplete="off"
            id="sf1-check"
            class="order-table__flavor--check"
          />
        </td>
        <td data-label="名稱">印度豬肉咖哩飯</td>
        <td data-label="價格" class="order-table__price">70</td>
        <td data-label="數量">
          <font-awesome-icon icon="minus-circle" size="lg"></font-awesome-icon>
          <label for="quantity">0</label>
          <font-awesome-icon icon="plus-circle" size="lg"></font-awesome-icon>
        </td>
        <td data-label="飯量">
          <select class="rice--select" name="rice__group">
            <option value="多飯">多飯</option>
            <option value="正常">正常</option>
            <option value="1/2飯">1/2飯</option>
            <option value="1/3飯">1/3飯</option>
            <option value="2/3飯">2/3飯</option>
            <option value="1/4飯">1/4飯</option>
            <option value="不飯">不飯</option>
          </select>
        </td>
        <td data-label="菜量">
          <select class="vegetable--select" name="vegetable__group">
            <option value="多菜">多菜</option>
            <option value="正常">正常</option>
            <option value="少菜">少菜</option>
            <option value="不菜">不菜</option>
          </select>
        </td>
        <td data-label="口味">
          <select class="flavor--select" name="flavor__group"> </select>
        </td>
        <td data-label="備註" class="order-table__remark">
          <input type="text" id="remarkText" placeholder="" />
        </td>
      </tr>
      <tr>
        <td data-label="常用" class="order-table__flavor">
          <input
            type="checkbox"
            autocomplete="off"
            id="sf1-check"
            class="order-table__flavor--check"
          />
        </td>
        <td data-label="名稱">印度豬肉咖哩飯</td>
        <td data-label="價格" class="order-table__price">70</td>
        <td data-label="數量">
          <font-awesome-icon icon="minus-circle" size="lg"></font-awesome-icon>
          <label for="quantity">0</label>
          <font-awesome-icon icon="plus-circle" size="lg"></font-awesome-icon>
        </td>
        <td data-label="飯量">
          <select class="rice--select" name="rice__group">
            <option value="多飯">多飯</option>
            <option value="正常">正常</option>
            <option value="1/2飯">1/2飯</option>
            <option value="1/3飯">1/3飯</option>
            <option value="2/3飯">2/3飯</option>
            <option value="1/4飯">1/4飯</option>
            <option value="不飯">不飯</option>
          </select>
        </td>
        <td data-label="菜量">
          <select class="vegetable--select" name="vegetable__group">
            <option value="多菜">多菜</option>
            <option value="正常">正常</option>
            <option value="少菜">少菜</option>
            <option value="不菜">不菜</option>
          </select>
        </td>
        <td data-label="口味">
          <select class="flavor--select" name="flavor__group"> </select>
        </td>
        <td data-label="備註" class="order-table__remark">
          <input type="text" id="remarkText" placeholder="" />
        </td>
      </tr>
      <tr>
        <td data-label="常用" class="order-table__flavor">
          <input
            type="checkbox"
            autocomplete="off"
            id="sf1-check"
            class="order-table__flavor--check"
          />
        </td>
        <td data-label="名稱">印度豬肉咖哩飯</td>
        <td data-label="價格" class="order-table__price">70</td>
        <td data-label="數量">
          <font-awesome-icon icon="minus-circle" size="lg"></font-awesome-icon>
          <label for="quantity">0</label>
          <font-awesome-icon icon="plus-circle" size="lg"></font-awesome-icon>
        </td>
        <td data-label="飯量">
          <select class="rice--select" name="rice__group">
            <option value="多飯">多飯</option>
            <option value="正常">正常</option>
            <option value="1/2飯">1/2飯</option>
            <option value="1/3飯">1/3飯</option>
            <option value="2/3飯">2/3飯</option>
            <option value="1/4飯">1/4飯</option>
            <option value="不飯">不飯</option>
          </select>
        </td>
        <td data-label="菜量">
          <select class="vegetable--select" name="vegetable__group">
            <option value="多菜">多菜</option>
            <option value="正常">正常</option>
            <option value="少菜">少菜</option>
            <option value="不菜">不菜</option>
          </select>
        </td>
        <td data-label="口味">
          <select class="flavor--select" name="flavor__group"> </select>
        </td>
        <td data-label="備註" class="order-table__remark">
          <input type="text" id="remarkText" placeholder="" />
        </td>
      </tr>
    </tbody>
    <tfoot class="order-table__checkout">
      <span>金額： 0</span>
      <button class="primary ">提交</button>
    </tfoot>
  </table>
</template>

<script>
export default {
  name: "order_table"
};
</script>

<style scoped lang="scss">
@mixin tableColWidth($grow, $minWidth) {
  flex-grow: $grow;
  min-width: $minWidth;
}
.order-table {
  max-height: 80vh;
  input:not([type="checkbox"]) {
    width: 100%;
  }
  thead {
    z-index: 1;
  }
  &__title {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-wrap: wrap;
  }
  &__date {
    margin-right: 100px;
  }
  &__flavor {
    @include tableColWidth(0, 35px);
  }
  &__price {
    @include tableColWidth(0, 35px);
  }
  &__remark {
    @include tableColWidth(2, 100px);
  }
  &__checkout {
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: flex-end;
    span {
      font-size: 1.5rem;
      margin-right: 100px;
    }
    button {
      padding: 10px 40px;
      border-radius: 6px;
    }
  }
}
</style>
