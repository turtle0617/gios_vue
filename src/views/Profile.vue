<template>
  <div class="profile">
    <Header />
    <div class="container">
      <div class="row profile-account">
        <Profile_account />
      </div>
      <div class="row ">
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
