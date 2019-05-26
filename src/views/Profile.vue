<template>
  <div class="profile">
    <GIOS_Header />
    <div class="profile__container">
      <Profile_account />
      <Profile_code />
    </div>
  </div>
</template>

<script>
import GIOS_Header from "@/components/GIOS_Header.vue";
import Profile_account from "@/components/Profile_account.vue";
import Profile_code from "@/components/Profile_code.vue";
export default {
  name: "profile",
  components: {
    GIOS_Header,
    Profile_account,
    Profile_code
  }
};
</script>
<style scoped lang="scss">
.profile__container {
    max-width: 570px;
    margin: 0 auto;
}
</style>
