<template>
  <div class="profile">
    <Header />
    <div class="container">
      <div class="columns profile-header__title">
        <div class="column">
          <h1 class=" title is-2 ">個人檔案</h1>
        </div>
      </div>
      <div class="profile-account">
        <Profile_account />
      </div>
      <div class="">
        <Profile_code />
      </div>
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import Profile_account from "@/components/Profile_account.vue";
import Profile_code from "@/components/Profile_code.vue";
export default {
  name: "profile",
  components: {
    Header,
    Profile_account,
    Profile_code
  }
};
</script>
<style lang="scss">
.profile-header__title {
  text-align: center;
  padding-top: 4rem;
}
</style>
