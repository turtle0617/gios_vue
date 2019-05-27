<template>
  <div class="profile">
    <GIOS_Header />
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
import GIOS_Header from "@/components/GIOS_Header.vue";
import Profile_account from "@/components/Profile_account.vue";
import Profile_code from "@/components/Profile_code.vue";
import Profile_flavor from "@/components/Profile_flavor.vue";
export default {
  name: "profile",
  components: {
    GIOS_Header,
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
