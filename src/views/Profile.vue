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
<style lang="scss">
.profile__container {
  max-width: 570px;
  margin: 0 auto;
}
.update-success {
  background-color: rgba(96, 255, 22, 0.08);
  padding: 10px 0;
  border-left: 5px solid lightgreen;
  color: rgba(0, 128, 0, 0.65);
}
.empty {
  background-color: rgba(255, 0, 0, 0.1) !important;
  border: 1px solid red !important ;
}
</style>
