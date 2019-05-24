<template>
  <div class="Auth-register">
    <div class="Auth-register__container">
      <div class="Auth-register__title">
        <span>註冊</span>
        <hr />
      </div>
      <form class="Auth-register__detail" action="/register" method="post">
        <div class="register__detail">
          <div class="register__detail--userid">
            <span>使用者名稱</span>
            <input
              type="text"
              name=""
              value=""
              placeholder="請輸入使用者名稱"
            />
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
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "Auth_register"
};
</script>
<style scoped lang="scss">
.Auth-register {
  font-size: 1rem;
  padding-top: 100px;
  &__container {
    width: 40%;
    margin: 0 auto;
  }
  &__title {
    text-align: center;
  }
  &__detail {
    margin-top: 50px;
    padding: 40px;
    box-shadow: 1px 1px 8px 0 rgba(0, 0, 0, 0.1);
  }
}
.register__detail {
  width: 100%;
  font-size: 1rem;
  text-align: left;
  span {
    display: block;
    margin: 1rem 0;
  }
  select {
    width: 100%;
    height: 44px;
    border: 1px solid #dbe2e8;
    border-radius: 6px;
    padding: 0 15px;
    box-sizing: border-box;
  }
  input {
    width: 100%;
    height: 44px;
    border: 1px solid #dbe2e8;
    border-radius: 6px;
    padding: 0 15px;
    box-sizing: border-box;
  }
  button {
    width: 100%;
    background-color: skyblue;
    color: white;
    padding: 20px 0;
    margin-top: 1rem;
  }
}
</style>
