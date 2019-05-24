<template>
  <div class="Auth-login">
    <div class="Auth-login__container">
      <div class="Auth-login__title">
        <span>登入</span>
        <hr />
      </div>
      <form class="Auth-login__detail" action="/login" method="post">
        <div class="login__detail">
          <div class="login__detail--email">
            <span>信箱</span>
            <input type="text" name="" value="" placeholder="請輸入信箱" />
          </div>
          <div class="login__detail--code">
            <span>密碼</span>
            <input type="password" name="" value="" placeholder="請輸入密碼" />
          </div>
          <button type="submit" name="button">登入</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "Auth_login"
};
</script>
<style scoped lang="scss">
.Auth-login {
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
.login__detail {
  width: 100%;
  font-size: 1rem;
  text-align: left;
  span {
    display: block;
    margin: 1rem 0;
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
