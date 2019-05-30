<template>
  <div class="profile">
    <Header_user />
    <div class="container">
      <div class="row profile-account">
        <Profile_account />
      </div>
      <div class="row ">
        <Profile_code />
      </div>
      <div class="row ">
        <Profile_flavor />
      </div>
    </div>
  </div>
</template>

<script>
import Header_user from "@/components/Header_user.vue";
import Profile_account from "@/components/Profile_account.vue";
import Profile_code from "@/components/Profile_code.vue";
import Profile_flavor from "@/components/Profile_flavor.vue";
export default {
  name: "profile",
  components: {
    Header_user,
    Profile_account,
    Profile_code,
    Profile_flavor
  }
};
</script>
<style scoped lang="scss">
.profile__container {
  max-width: 570px;
  margin: 0 auto;
}
</style>
